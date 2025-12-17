import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";
import { getAll, getOne } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Visitor trends (last 30 days)
        const visitorTrends = getAll(`
      SELECT 
        DATE(first_visit) as date,
        COUNT(DISTINCT visitor_id) as unique_visitors,
        SUM(page_views) as total_pageviews
      FROM visitors
      WHERE first_visit >= DATE('now', '-30 days')
      GROUP BY DATE(first_visit)
      ORDER BY date DESC
    `);

        // Geographic distribution
        const geoDistribution = getAll(`
      SELECT 
        country,
        COUNT(DISTINCT visitor_id) as visitor_count
      FROM visitors
      WHERE country IS NOT NULL
      GROUP BY country
      ORDER BY visitor_count DESC
      LIMIT 10
    `);

        // Traffic sources (referral vs direct)
        const trafficSources = getAll(`
      SELECT 
        CASE 
          WHEN ref_code IS NOT NULL THEN 'Referral'
          ELSE 'Direct'
        END as source,
        COUNT(DISTINCT visitor_id) as visitor_count
      FROM visitors
      GROUP BY source
    `);

        // Device breakdown
        const deviceBreakdown = getAll(`
      SELECT 
        device,
        COUNT(DISTINCT visitor_id) as visitor_count
      FROM visitors
      GROUP BY device
      ORDER BY visitor_count DESC
    `);

        // Referral performance
        const referralPerformance = getAll(`
      SELECT 
        r.referral_code,
        r.name as referrer_name,
        COUNT(DISTINCT v.visitor_id) as visitors,
        COUNT(DISTINCT l.id) as leads,
        COUNT(DISTINCT c.id) as clients,
        COALESCE(SUM(c.project_value), 0) as total_value
      FROM referrers r
      LEFT JOIN visitors v ON v.ref_code = r.referral_code
      LEFT JOIN leads l ON l.ref_code = r.referral_code
      LEFT JOIN clients c ON c.ref_code = r.referral_code
      WHERE r.is_blocked = 0
      GROUP BY r.id
      ORDER BY total_value DESC
      LIMIT 10
    `);

        return NextResponse.json({
            visitor_trends: visitorTrends,
            geo_distribution: geoDistribution,
            traffic_sources: trafficSources,
            device_breakdown: deviceBreakdown,
            referral_performance: referralPerformance,
        });
    } catch (error) {
        console.error("Analytics fetch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
