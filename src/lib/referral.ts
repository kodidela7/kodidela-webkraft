import { getOne } from "./db";

/**
 * Generate a unique referral code with KD prefix
 * Format: KD + 4-6 random digits
 */
export function generateReferralCode(): string {
    const digits = Math.floor(100000 + Math.random() * 900000); // 6 digits
    return `KD${digits}`;
}

/**
 * Generate a unique referral code that doesn't exist in the database
 */
export async function generateUniqueReferralCode(): Promise<string> {
    let code = generateReferralCode();
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const existing = await getOne("SELECT id FROM referrers WHERE referral_code = $1", [
            code,
        ]);

        if (!existing) {
            return code;
        }

        code = generateReferralCode();
        attempts++;
    }

    throw new Error("Failed to generate unique referral code");
}

/**
 * Create a full referral link from a referral code
 */
export function createReferralLink(referralCode: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kodidela-webkraft.vercel.app";
    return `${baseUrl}/?ref=${referralCode}`;
}

/**
 * Validate referral code format
 */
export function isValidReferralCode(code: string): boolean {
    return /^KD\d{4,6}$/.test(code);
}
