import { NextRequest, NextResponse } from "next/server";
import { runQuery, getOne } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/email";
import { isSelfReferral, hasExistingReferral } from "@/lib/fraud-prevention";
import type { QuoteSubmissionRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const data: QuoteSubmissionRequest = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.phone) {
            return NextResponse.json(
                { success: false, message: "Name, email, and phone are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email address" },
                { status: 400 }
            );
        }

        // Check for referral code fraud if provided
        if (data.ref_code) {
            const referrer = await getOne<{ email: string; phone: string; is_blocked: number }>(
                "SELECT email, phone, is_blocked FROM referrers WHERE referral_code = $1",
                [data.ref_code]
            );

            if (!referrer) {
                // Invalid referral code - continue but don't associate
                data.ref_code = undefined;
            } else if (referrer.is_blocked) {
                // Blocked referrer - don't associate
                data.ref_code = undefined;
            } else if (isSelfReferral(referrer.email, referrer.phone, data.email, data.phone)) {
                return NextResponse.json(
                    { success: false, message: "Self-referrals are not allowed" },
                    { status: 400 }
                );
            } else if (await hasExistingReferral(data.email)) {
                // This email already has a referral - use first referral only
                data.ref_code = undefined;
            }
        }

        // Insert lead into database
        const result = await runQuery(
            `INSERT INTO leads (name, email, phone, company, project_type, budget, details, ref_code, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'New') RETURNING id`,
            [
                data.name,
                data.email,
                data.phone,
                data.company || null,
                data.project_type || null,
                data.budget || null,
                data.details || null,
                data.ref_code || null,
            ]
        );

        // Send email notification to admin
        try {
            await sendLeadNotificationEmail(data);
        } catch (emailError) {
            console.error("Failed to send lead notification email:", emailError);
            // Continue even if email fails
        }

        return NextResponse.json({
            success: true,
            message: "Quote request submitted successfully!",
            lead_id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error("Quote submission error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
