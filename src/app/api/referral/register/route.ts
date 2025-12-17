import { NextRequest, NextResponse } from "next/server";
import { runQuery, getOne } from "@/lib/db";
import { generateUniqueReferralCode, createReferralLink } from "@/lib/referral";
import { sendReferralLinkEmail } from "@/lib/email";
import {
    validateReferrerData,
    checkRateLimit,
} from "@/lib/fraud-prevention";
import { getClientIp } from "@/lib/visitor-tracker";
import type { ReferrerRegistrationRequest, ReferrerRegistrationResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const data: ReferrerRegistrationRequest = await request.json();

        // Validate input
        const validation = validateReferrerData(data);
        if (!validation.valid) {
            return NextResponse.json<ReferrerRegistrationResponse>(
                { success: false, message: validation.error },
                { status: 400 }
            );
        }

        // Check rate limit
        const ip = getClientIp(request) || "unknown";
        if (!checkRateLimit(ip)) {
            return NextResponse.json<ReferrerRegistrationResponse>(
                {
                    success: false,
                    message: "Too many registration attempts. Please try again later.",
                },
                { status: 429 }
            );
        }

        // Generate unique referral code
        const referralCode = await generateUniqueReferralCode();

        // Insert referrer into database
        runQuery(
            `INSERT INTO referrers (name, email, phone, referral_code, payout_method)
       VALUES (?, ?, ?, ?, ?)`,
            [data.name, data.email, data.phone || null, referralCode, data.payout_method]
        );

        // Create referral link
        const referralLink = createReferralLink(referralCode);

        // Send email with referral link
        try {
            await sendReferralLinkEmail(
                data.email,
                data.name,
                referralCode,
                referralLink
            );
        } catch (emailError) {
            console.error("Failed to send referral email:", emailError);
            // Continue even if email fails - user still gets the code in response
        }

        return NextResponse.json<ReferrerRegistrationResponse>({
            success: true,
            referral_code: referralCode,
            referral_link: referralLink,
            message: "Registration successful! Check your email for your referral link.",
        });
    } catch (error) {
        console.error("Referral registration error:", error);
        return NextResponse.json<ReferrerRegistrationResponse>(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
