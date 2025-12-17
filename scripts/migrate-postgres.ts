
import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function migrate() {
    if (!process.env.POSTGRES_URL) {
        console.error("Missing POSTGRES_URL in .env.local");
        process.exit(1);
    }

    console.log("Connecting to database...");
    // Strip ?sslmode=... part to avoid conflicts, let pg handle it via config object
    const connectionString = process.env.POSTGRES_URL?.split('?')[0];

    const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        const client = await pool.connect();
        console.log("Connected successfully.");

        const schemaPath = join(process.cwd(), 'src', 'lib', 'schema.sql');
        console.log(`Reading schema from ${schemaPath}...`);
        const schema = readFileSync(schemaPath, 'utf-8');

        console.log("Applying schema...");
        await client.query(schema);
        console.log("Schema applied successfully!");

        client.release();
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await pool.end();
    }
}

migrate();
