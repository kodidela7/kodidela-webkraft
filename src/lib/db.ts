
import { Pool, PoolClient, QueryResult } from 'pg';

const globalWithDb = global as typeof globalThis & {
  _pool?: Pool;
};

export function getDatabase(): Pool {
  if (!globalWithDb._pool) {
    console.log("Initializing Postgres Pool...");
    const connectionString = process.env.POSTGRES_URL?.split('?')[0];
    globalWithDb._pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return globalWithDb._pool;
}

export async function closeDatabase() {
  if (globalWithDb._pool) {
    await globalWithDb._pool.end();
    globalWithDb._pool = undefined;
  }
}

export interface RunResult {
  changes: number;
  lastInsertRowid?: number | string; // Postgres returns IDs as typically string or need RETURNING
  rows: any[];
}

// Helper functions for common operations
export async function runQuery<T>(
  query: string,
  params: any[] = []
): Promise<RunResult> {
  const pool = getDatabase();
  const result = await pool.query(query, params);

  // Try to detect inserted ID if returned
  let lastId: number | string | undefined;
  if (result.rows.length > 0 && result.rows[0].id) {
    lastId = result.rows[0].id;
  } else if (result.rows.length > 0 && result.rows[0].ID) {
    lastId = result.rows[0].ID;
  }

  return {
    changes: result.rowCount || 0,
    lastInsertRowid: lastId,
    rows: result.rows
  };
}

export async function getOne<T>(query: string, params: any[] = []): Promise<T | undefined> {
  const pool = getDatabase();
  const result = await pool.query(query, params);
  return result.rows[0] as T | undefined;
}

export async function getAll<T>(query: string, params: any[] = []): Promise<T[]> {
  const pool = getDatabase();
  const result = await pool.query(query, params);
  return result.rows as T[];
}

export default getDatabase;
