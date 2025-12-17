import { NextRequest, NextResponse } from "next/server";
import { getOne } from "@/lib/db";
import { isValidReferralCode } from "@/lib/referral";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get("code");

        if (!code || !isValidReferralCode(code)) {
            return NextResponse.json(
                { valid: false, message: "Invalid referral code format" },
                { status: 400 }
            );
        }

        const referrer = getOne(
            "SELECT id, name, referral_code, is_blocked FROM referrers WHERE referral_code = ?",
            [code]
        );

        if (!referrer) {
            return NextResponse.json(
                { valid: false, message: "Referral code not found" },
                { status: 404 }
            );
        }

        if ((referrer as any).is_blocked) {
            return NextResponse.json(
                { valid: false, message: "This referral code is no longer active" },
                { status: 403 }
            );
        }

        return NextResponse.json({
            valid: true,
            referrer: {
                name: (referrer as any).name,
                code: (referrer as any).referral_code,
            },
        });
    } catch (error) {
        console.error("Referral validation error:", error);
        return NextResponse.json(
            { valid: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
