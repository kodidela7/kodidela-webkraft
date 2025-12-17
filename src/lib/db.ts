import Database from "better-sqlite3";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const dbPath = join(process.cwd(), "data", "referral.db");
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    try {
      // Ensure data directory exists with proper permissions
      const dataDir = join(process.cwd(), "data");
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true, mode: 0o755 });
        console.log(`Created data directory: ${dataDir}`);
      }

      // Create or open database
      db = new Database(dbPath);
      db.pragma("journal_mode = WAL");

      // Check if tables exist, if not initialize schema
      const tablesExist = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='referrers'"
        )
        .get();

      if (!tablesExist) {
        console.log("Initializing database schema...");
        const schemaPath = join(process.cwd(), "src", "lib", "schema.sql");

        if (!existsSync(schemaPath)) {
          console.error(`Schema file not found: ${schemaPath}`);
          throw new Error("Schema file not found");
        }

        const schema = readFileSync(schemaPath, "utf-8");
        db.exec(schema);
        console.log("Database schema initialized successfully");
      }
    } catch (error) {
      console.error("Database initialization error:", error);
      throw error;
    }
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
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
