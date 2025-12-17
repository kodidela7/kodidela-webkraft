import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const token = extractToken(request);

        if (!token) {
            return NextResponse.json(
                { valid: false, message: "No token provided" },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return NextResponse.json(
                { valid: false, message: "Invalid or expired token" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            valid: true,
            admin: {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            },
        });
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.json(
            { valid: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
