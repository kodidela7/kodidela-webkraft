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
        const visitorsResult = getOne<{ count: number }>(
            "SELECT COUNT(DISTINCT visitor_id) as count FROM visitors"
        );

        // Get total leads
        const leadsResult = getOne<{ count: number }>(
            "SELECT COUNT(*) as count FROM leads"
        );

        // Get total referrals
        const referralsResult = getOne<{ count: number }>(
            "SELECT COUNT(*) as count FROM referrers WHERE is_blocked = 0"
        );

        // Get converted clients
        const clientsResult = getOne<{ count: number }>(
            "SELECT COUNT(*) as count FROM clients"
        );

        // Get total revenue
        const revenueResult = getOne<{ total: number }>(
            "SELECT COALESCE(SUM(project_value), 0) as total FROM clients"
        );

        // Get pending payouts
        const payoutsResult = getOne<{ total: number }>(
            "SELECT COALESCE(SUM(amount), 0) as total FROM referral_payouts WHERE status = 'Pending'"
        );

        const stats: DashboardStats = {
            total_visitors: visitorsResult?.count || 0,
            total_leads: leadsResult?.count || 0,
            total_referrals: referralsResult?.count || 0,
            converted_clients: clientsResult?.count || 0,
            revenue_generated: revenueResult?.total || 0,
            referral_payouts_pending: payoutsResult?.total || 0,
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
