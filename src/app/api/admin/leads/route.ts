import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";
import { getAll, runQuery, getOne } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const ref_code = searchParams.get("ref_code");

        let query = "SELECT * FROM leads";
        const params: any[] = [];
        const conditions: string[] = [];

        if (status) {
            conditions.push("status = ?");
            params.push(status);
        }

        if (ref_code) {
            conditions.push("ref_code = ?");
            params.push(ref_code);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY created_at DESC";

        const leads = getAll(query, params);

        return NextResponse.json({ leads });
    } catch (error) {
        console.error("Leads fetch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json(
                { error: "Lead ID and status are required" },
                { status: 400 }
            );
        }

        runQuery("UPDATE leads SET status = ? WHERE id = ?", [status, id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Lead update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { lead_id, project_value } = await request.json();

        if (!lead_id) {
            return NextResponse.json(
                { error: "Lead ID is required" },
                { status: 400 }
            );
        }

        // Get lead details
        const lead = getOne<any>("SELECT * FROM leads WHERE id = ?", [lead_id]);

        if (!lead) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        // Create client record
        const result = runQuery(
            `INSERT INTO clients (lead_id, name, email, phone, company, project_value, service_type, ref_code, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Active')`,
            [
                lead_id,
                lead.name,
                lead.email,
                lead.phone,
                lead.company,
                project_value || null,
                lead.project_type,
                lead.ref_code,
            ]
        );

        // Update lead status
        runQuery("UPDATE leads SET status = 'Converted to Client' WHERE id = ?", [
            lead_id,
        ]);

        // If there's a referral, create payout record
        if (lead.ref_code && project_value) {
            const referrer = getOne<any>(
                "SELECT id FROM referrers WHERE referral_code = ?",
                [lead.ref_code]
            );

            if (referrer) {
                // Calculate commission (e.g., 10% of project value)
                const commission = project_value * 0.1;

                runQuery(
                    `INSERT INTO referral_payouts (referrer_id, client_id, amount, status)
           VALUES (?, ?, ?, 'Pending')`,
                    [referrer.id, result.lastInsertRowid, commission]
                );
            }
        }

        return NextResponse.json({
            success: true,
            client_id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error("Lead to client conversion error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
