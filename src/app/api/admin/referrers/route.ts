import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";
import { getAll, runQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get all referrers with stats
        const referrers = await getAll(`
      SELECT 
        r.*,
        COUNT(DISTINCT l.id) as leads_count,
        COUNT(DISTINCT c.id) as converted_clients,
        COALESCE(SUM(CASE WHEN p.status = 'Paid' THEN p.amount ELSE 0 END), 0) as total_commission,
        COALESCE(SUM(CASE WHEN p.status = 'Pending' THEN p.amount ELSE 0 END), 0) as pending_commission
      FROM referrers r
      LEFT JOIN leads l ON l.ref_code = r.referral_code
      LEFT JOIN clients c ON c.ref_code = r.referral_code
      LEFT JOIN referral_payouts p ON p.referrer_id = r.id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `);

        return NextResponse.json({
            referrers: referrers.map((r: any) => ({
                ...r,
                leads_count: Number(r.leads_count),
                converted_clients: Number(r.converted_clients),
                total_commission: Number(r.total_commission || 0),
                pending_commission: Number(r.pending_commission || 0),
            })),
        });
    } catch (error) {
        console.error("Referrers fetch error:", error);
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

        const { id, is_blocked } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Referrer ID is required" },
                { status: 400 }
            );
        }

        await runQuery("UPDATE referrers SET is_blocked = $1 WHERE id = $2", [
            is_blocked ? 1 : 0,
            id,
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Referrer update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
