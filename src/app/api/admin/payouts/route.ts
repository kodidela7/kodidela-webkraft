import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";
import { getAll, runQuery } from "@/lib/db";
import { stringify } from "csv-stringify/sync";

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const format = searchParams.get("format");

        const payouts = await getAll(`
      SELECT 
        p.*,
        r.name as referrer_name,
        r.email as referrer_email,
        r.payout_method,
        c.name as client_name,
        c.project_value
      FROM referral_payouts p
      JOIN referrers r ON p.referrer_id = r.id
      JOIN clients c ON p.client_id = c.id
      ORDER BY p.created_at DESC
    `);

        const formattedPayouts = payouts.map((p: any) => ({
            ...p,
            amount: Number(p.amount),
            project_value: Number(p.project_value || 0),
        }));

        // CSV export
        if (format === "csv") {
            const csv = stringify(formattedPayouts, {
                header: true,
                columns: [
                    "id",
                    "referrer_name",
                    "referrer_email",
                    "client_name",
                    "amount",
                    "status",
                    "paid_at",
                    "transaction_id",
                    "created_at",
                ],
            });

            return new Response(csv, {
                headers: {
                    "Content-Type": "text/csv",
                    "Content-Disposition": `attachment; filename="payouts_${Date.now()}.csv"`,
                },
            });
        }

        return NextResponse.json({ payouts: formattedPayouts });
    } catch (error) {
        console.error("Payouts fetch error:", error);
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

        const { referrer_id, client_id, amount, notes } = await request.json();

        if (!referrer_id || !client_id || !amount) {
            return NextResponse.json(
                { error: "Referrer ID, client ID, and amount are required" },
                { status: 400 }
            );
        }

        const result = await runQuery(
            `INSERT INTO referral_payouts (referrer_id, client_id, amount, status, notes)
       VALUES ($1, $2, $3, 'Pending', $4) RETURNING id`,
            [referrer_id, client_id, amount, notes || null]
        );

        return NextResponse.json({
            success: true,
            payout_id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error("Payout creation error:", error);
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

        const { id, transaction_id, notes } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Payout ID is required" },
                { status: 400 }
            );
        }

        await runQuery(
            `UPDATE referral_payouts 
       SET status = 'Paid', paid_at = CURRENT_TIMESTAMP, transaction_id = $1, notes = $2
       WHERE id = $3`,
            [transaction_id || null, notes || null, id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Payout update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
