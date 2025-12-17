import { NextRequest, NextResponse } from "next/server";
import { getOne, runQuery } from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/auth";
import type { LoginRequest, LoginResponse, AdminUser } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const data: LoginRequest = await request.json();

        if (!data.email || !data.password) {
            return NextResponse.json<LoginResponse>(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find admin user
        const admin = getOne<AdminUser>(
            "SELECT * FROM admin_users WHERE email = ?",
            [data.email]
        );

        if (!admin) {
            return NextResponse.json<LoginResponse>(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await verifyPassword(data.password, admin.password_hash);

        if (!isValid) {
            return NextResponse.json<LoginResponse>(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Update last login
        runQuery("UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [
            admin.id,
        ]);

        // Generate JWT token
        const token = generateToken({
            id: admin.id,
            email: admin.email,
            role: admin.role,
        });

        // Create response with cookie
        const response = NextResponse.json<LoginResponse>({
            success: true,
            token,
            admin: {
                id: admin.id,
                email: admin.email,
                role: admin.role,
            },
        });

        // Set HTTP-only cookie
        response.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json<LoginResponse>(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
