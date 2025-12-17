import { UAParser } from "ua-parser-js";

/**
 * Parse user agent string to extract device, browser, and OS information
 */
export function parseUserAgent(userAgent: string): {
    device: string;
    browser: string;
    os: string;
} {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
        device: result.device.type || "desktop",
        browser: `${result.browser.name || "Unknown"} ${result.browser.version || ""}`.trim(),
        os: `${result.os.name || "Unknown"} ${result.os.version || ""}`.trim(),
    };
}

/**
 * Get geolocation data from IP address using a free API
 * Note: For production, consider using a paid service for better accuracy
 */
export async function getGeolocation(ip: string): Promise<{
    country?: string;
    city?: string;
}> {
    try {
        // Skip for localhost/private IPs
        if (
            !ip ||
            ip === "::1" ||
            ip === "127.0.0.1" ||
            ip.startsWith("192.168.") ||
            ip.startsWith("10.")
        ) {
            return { country: "Local", city: "Local" };
        }

        // Using ip-api.com (free, no API key required, 45 requests/minute)
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();

        if (data.status === "success") {
            return {
                country: data.country,
                city: data.city,
            };
        }
    } catch (error) {
        console.error("Geolocation lookup failed:", error);
    }

    return {};
}

/**
 * Generate a unique visitor ID
 */
export function generateVisitorId(): string {
    return `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Extract IP address from request headers
 */
export function getClientIp(request: Request): string | undefined {
    // Try various headers that might contain the real IP
    const headers = request.headers;

    return (
        headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headers.get("x-real-ip") ||
        headers.get("cf-connecting-ip") || // Cloudflare
        undefined
    );
}
