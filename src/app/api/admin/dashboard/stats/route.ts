import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";
import { getOne } from "@/lib/db";
import type { DashboardStats } from "@/lib/types";

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get total visitors
        const visitorsResult = await getOne<{ count: string | number }>(
            "SELECT COUNT(DISTINCT visitor_id) as count FROM visitors"
        );

        // Get total leads
        const leadsResult = await getOne<{ count: string | number }>(
            "SELECT COUNT(*) as count FROM leads"
        );

        // Get total referrals
        const referralsResult = await getOne<{ count: string | number }>(
            "SELECT COUNT(*) as count FROM referrers WHERE is_blocked = 0"
        );

        // Get converted clients
        const clientsResult = await getOne<{ count: string | number }>(
            "SELECT COUNT(*) as count FROM clients"
        );

        // Get total revenue
        const revenueResult = await getOne<{ total: string | number }>(
            "SELECT COALESCE(SUM(project_value), 0) as total FROM clients"
        );

        // Get pending payouts
        const payoutsResult = await getOne<{ total: string | number }>(
            "SELECT COALESCE(SUM(amount), 0) as total FROM referral_payouts WHERE status = 'Pending'"
        );

        const stats: DashboardStats = {
            total_visitors: Number(visitorsResult?.count || 0),
            total_leads: Number(leadsResult?.count || 0),
            total_referrals: Number(referralsResult?.count || 0),
            converted_clients: Number(clientsResult?.count || 0),
            revenue_generated: Number(revenueResult?.total || 0),
            referral_payouts_pending: Number(payoutsResult?.total || 0),
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
