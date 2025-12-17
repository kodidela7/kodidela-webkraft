import { NextRequest, NextResponse } from "next/server";
import { runQuery, getOne } from "@/lib/db";
import {
    parseUserAgent,
    getGeolocation,
    getClientIp,
} from "@/lib/visitor-tracker";
import type { VisitorTrackingData } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const data: VisitorTrackingData = await request.json();

        if (!data.visitor_id) {
            return NextResponse.json(
                { success: false, message: "Visitor ID is required" },
                { status: 400 }
            );
        }

        // Get IP address
        const ip = getClientIp(request);

        // Parse user agent
        const userAgent = request.headers.get("user-agent") || "";
        const { device, browser, os } = parseUserAgent(userAgent);

        // Get geolocation
        let country, city;
        if (ip) {
            const geo = await getGeolocation(ip);
            country = geo.country;
            city = geo.city;
        }

        // Check if visitor exists
        const existingVisitor = await getOne(
            "SELECT id, page_views FROM visitors WHERE visitor_id = $1",
            [data.visitor_id]
        );

        if (existingVisitor) {
            // Update existing visitor
            await runQuery(
                `UPDATE visitors 
         SET page_views = page_views + 1,
             last_visit = CURRENT_TIMESTAMP,
             ref_code = COALESCE(ref_code, $1)
         WHERE visitor_id = $2`,
                [data.ref_code || null, data.visitor_id]
            );
        } else {
            // Insert new visitor
            await runQuery(
                `INSERT INTO visitors (visitor_id, ip, country, city, device, browser, os, ref_code, page_views)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1)`,
                [
                    data.visitor_id,
                    ip || null,
                    country || null,
                    city || null,
                    device,
                    browser,
                    os,
                    data.ref_code || null,
                ]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Visitor tracking error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
