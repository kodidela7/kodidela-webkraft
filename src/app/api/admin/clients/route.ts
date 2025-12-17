import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "@/lib/auth";
import { getAll, runQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const clients = await getAll(`
      SELECT c.*, l.project_type as original_project_type
      FROM clients c
      LEFT JOIN leads l ON c.lead_id = l.id
      ORDER BY c.created_at DESC
    `);

        return NextResponse.json({
            clients: clients.map((c: any) => ({
                ...c,
                project_value: Number(c.project_value || 0),
            })),
        });
    } catch (error) {
        console.error("Clients fetch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {
            name,
            email,
            phone,
            company,
            project_value,
            service_type,
            start_date,
        } = await request.json();

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        const result = await runQuery(
            `INSERT INTO clients (name, email, phone, company, project_value, service_type, start_date, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Active') RETURNING id`,
            [
                name,
                email,
                phone || null,
                company || null,
                project_value || null,
                service_type || null,
                start_date || null,
            ]
        );

        return NextResponse.json({
            success: true,
            client_id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error("Client creation error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Verify authentication
        const token = extractToken(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {
            id,
            name,
            email,
            phone,
            company,
            project_value,
            service_type,
            start_date,
            status,
        } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Client ID is required" },
                { status: 400 }
            );
        }

        await runQuery(
            `UPDATE clients 
       SET name = $1, email = $2, phone = $3, company = $4, project_value = $5, 
           service_type = $6, start_date = $7, status = $8
       WHERE id = $9`,
            [
                name,
                email,
                phone,
                company,
                project_value,
                service_type,
                start_date,
                status,
                id,
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Client update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
