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
    const visitorTrends = await getAll(`
      SELECT 
        CAST(first_visit AS DATE) as date,
        COUNT(DISTINCT visitor_id) as unique_visitors,
        SUM(page_views) as total_pageviews
      FROM visitors
      WHERE first_visit >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY CAST(first_visit AS DATE)
      ORDER BY date DESC
    `);

    // Geographic distribution
    const geoDistribution = await getAll(`
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
    const trafficSources = await getAll(`
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
    const deviceBreakdown = await getAll(`
      SELECT 
        device,
        COUNT(DISTINCT visitor_id) as visitor_count
      FROM visitors
      GROUP BY device
      ORDER BY visitor_count DESC
    `);

    // Referral performance
    const referralPerformance = await getAll(`
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
      visitor_trends: visitorTrends.map((t: any) => ({
        ...t,
        unique_visitors: Number(t.unique_visitors),
        total_pageviews: Number(t.total_pageviews || 0),
      })),
      geo_distribution: geoDistribution.map((g: any) => ({
        ...g,
        visitor_count: Number(g.visitor_count),
      })),
      traffic_sources: trafficSources.map((t: any) => ({
        ...t,
        visitor_count: Number(t.visitor_count),
      })),
      device_breakdown: deviceBreakdown.map((d: any) => ({
        ...d,
        visitor_count: Number(d.visitor_count),
      })),
      referral_performance: referralPerformance.map((r: any) => ({
        ...r,
        visitors: Number(r.visitors),
        leads: Number(r.leads),
        clients: Number(r.clients),
        total_value: Number(r.total_value || 0),
      })),
    });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
