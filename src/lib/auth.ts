import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

/**
 * Compare a password with a hash
 */
export async function verifyPassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token for an admin user
 */
export function generateToken(payload: {
    id: number;
    email: string;
    role: string;
}): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): {
    id: number;
    email: string;
    role: string;
} | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: number;
            email: string;
            role: string;
        };
        return decoded;
    } catch (error) {
        return null;
    }
}

/**
 * Extract token from Authorization header or cookies
 */
export function extractToken(request: Request): string | null {
    // Check Authorization header
    const authHeader = request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.substring(7);
    }

    // Check cookies
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader) {
        const cookies = cookieHeader.split(";").map((c) => c.trim());
        const tokenCookie = cookies.find((c) => c.startsWith("admin_token="));
        if (tokenCookie) {
            return tokenCookie.split("=")[1];
        }
    }

    return null;
}
