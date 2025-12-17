import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join } from "path";

const dbPath = join(process.cwd(), "data", "referral.db");

// Use global variable to store database instance in development
// to avoid creating multiple connections during HMR
const globalWithDb = global as typeof globalThis & {
  _db?: Database.Database;
};

export function getDatabase(): Database.Database {
  if (!globalWithDb._db) {
    // Ensure data directory exists
    const fs = require("fs");
    const dataDir = join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    try {
      console.log(`Initializing database at: ${dbPath}`);
      const db = new Database(dbPath);
      db.pragma("journal_mode = WAL");

      // Initialize schema
      const schema = readFileSync(
        join(process.cwd(), "src", "lib", "schema.sql"),
        "utf-8"
      );
      db.exec(schema);

      globalWithDb._db = db;
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }
  return globalWithDb._db;
}

export function closeDatabase() {
  if (globalWithDb._db) {
    globalWithDb._db.close();
    globalWithDb._db = undefined;
  }
}

// Helper functions for common operations
export function runQuery<T>(
  query: string,
  params: any[] = []
): Database.RunResult {
  const database = getDatabase();
  const stmt = database.prepare(query);
  return stmt.run(...params);
}

export function getOne<T>(query: string, params: any[] = []): T | undefined {
  const database = getDatabase();
  const stmt = database.prepare(query);
  return stmt.get(...params) as T | undefined;
}

export function getAll<T>(query: string, params: any[] = []): T[] {
  const database = getDatabase();
  const stmt = database.prepare(query);
  return stmt.all(...params) as T[];
}

export default getDatabase;
