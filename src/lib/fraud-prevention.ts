import { getOne } from "./db";

/**
 * Check if a referral is a self-referral (same email or phone)
 */
export function isSelfReferral(
    referrerEmail: string,
    referrerPhone: string | undefined,
    leadEmail: string,
    leadPhone: string
): boolean {
    if (referrerEmail.toLowerCase() === leadEmail.toLowerCase()) {
        return true;
    }

    if (referrerPhone && leadPhone && referrerPhone === leadPhone) {
        return true;
    }

    return false;
}

/**
 * Check if a client already has a referral (one referral per client rule)
 */
export async function hasExistingReferral(email: string): Promise<boolean> {
    const existingLead = await getOne(
        "SELECT id FROM leads WHERE email = $1 AND ref_code IS NOT NULL LIMIT 1",
        [email]
    );

    if (existingLead) {
        return true;
    }

    const existingClient = await getOne(
        "SELECT id FROM clients WHERE email = $1 AND ref_code IS NOT NULL LIMIT 1",
        [email]
    );

    return !!existingClient;
}

/**
 * Check rate limit for referral registrations (max 5 per hour per IP)
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, maxRequests = 5): boolean {
    const now = Date.now();
    const hourInMs = 60 * 60 * 1000;

    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + hourInMs });
        return true;
    }

    if (record.count >= maxRequests) {
        return false;
    }

    record.count++;
    return true;
}

/**
 * Validate referrer data before registration
 */
export async function validateReferrerData(data: {
    name: string;
    email: string;
    phone?: string;
    payout_method: string;
}): Promise<{ valid: boolean; error?: string }> {
    if (!data.name || data.name.trim().length < 2) {
        return { valid: false, error: "Name must be at least 2 characters" };
    }

    if (!data.email || !isValidEmail(data.email)) {
        return { valid: false, error: "Invalid email address" };
    }

    if (!data.payout_method || !["UPI", "Bank", "PayPal"].includes(data.payout_method)) {
        return { valid: false, error: "Invalid payout method" };
    }

    // Check if email already registered
    const existing = await getOne("SELECT id FROM referrers WHERE email = $1", [data.email]);
    if (existing) {
        return { valid: false, error: "Email already registered as referrer" };
    }

    return { valid: true };
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
