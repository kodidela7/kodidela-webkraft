import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";
import { getAll, runQuery, getOne, getDatabase } from "@/lib/db";

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
        let pIdx = 1;

        if (status) {
            conditions.push(`status = $${pIdx++}`);
            params.push(status);
        }

        if (ref_code) {
            conditions.push(`ref_code = $${pIdx++}`);
            params.push(ref_code);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY created_at DESC";

        const leads = await getAll(query, params);

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

        await runQuery("UPDATE leads SET status = $1 WHERE id = $2", [status, id]);

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

        const body = await request.json();
        console.log("Conversion request body:", body);

        const { lead_id, project_value } = body;

        if (!lead_id) {
            return NextResponse.json(
                { error: "Lead ID is required" },
                { status: 400 }
            );
        }

        // Sanitize project_value to ensure it's a number
        let cleanProjectValue = 0;
        if (project_value) {
            cleanProjectValue = Number(project_value);
            if (isNaN(cleanProjectValue)) {
                // Try parsing if string contains currency symbols
                if (typeof project_value === 'string') {
                    cleanProjectValue = parseFloat(project_value.replace(/[^0-9.]/g, ''));
                }
            }
        }
        if (isNaN(cleanProjectValue)) cleanProjectValue = 0;

        console.log(`Converting lead ${lead_id} with value ${cleanProjectValue}`);

        // dedicated client for transaction
        const client = await getDatabase().connect();
        let client_id: any;

        try {
            await client.query('BEGIN');

            // 1. Get lead details using the SAME client
            const leadRes = await client.query("SELECT * FROM leads WHERE id = $1", [lead_id]);
            const lead = leadRes.rows[0];

            if (!lead) {
                await client.query('ROLLBACK');
                return NextResponse.json({ error: "Lead not found" }, { status: 404 });
            }

            console.log("Found lead:", lead.email);

            // 2. Create client record
            const createClientRes = await client.query(
                `INSERT INTO clients (lead_id, name, email, phone, company, project_value, service_type, ref_code, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Active') RETURNING id`,
                [
                    lead_id,
                    lead.name,
                    lead.email,
                    lead.phone,
                    lead.company,
                    cleanProjectValue || null,
                    lead.project_type,
                    lead.ref_code,
                ]
            );

            client_id = createClientRes.rows[0].id;
            console.log("Client created with ID:", client_id);

            // 3. Update lead status
            await client.query("UPDATE leads SET status = 'Converted to Client' WHERE id = $1", [
                lead_id,
            ]);

            // 4. If there's a referral, create payout record
            if (lead.ref_code && cleanProjectValue > 0) {
                const referrerRes = await client.query(
                    "SELECT id FROM referrers WHERE referral_code = $1",
                    [lead.ref_code]
                );
                const referrer = referrerRes.rows[0];

                if (referrer) {
                    // Calculate commission (10%)
                    const commission = cleanProjectValue * 0.1;
                    console.log(`Creating payout for referrer ${referrer.id}: ${commission}`);

                    await client.query(
                        `INSERT INTO referral_payouts (referrer_id, client_id, amount, status)
               VALUES ($1, $2, $3, 'Pending')`,
                        [referrer.id, client_id, commission]
                    );
                }
            }

            await client.query('COMMIT');
            console.log("Transaction committed successfully");

        } catch (err) {
            await client.query('ROLLBACK');
            console.error("Transaction failed, rolled back:", err);
            throw err;
        } finally {
            client.release();
        }

        return NextResponse.json({
            success: true,
            client_id: client_id,
        });
    } catch (error) {
        console.error("Lead to client conversion error:", error);
        return NextResponse.json(
            { error: "Internal server error: " + (error instanceof Error ? error.message : String(error)) },
            { status: 500 }
        );
    }
}
