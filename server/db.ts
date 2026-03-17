import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "../shared/schema.js";

if (!process.env.DATABASE_URL) {
  console.warn("WARNING: DATABASE_URL is missing. Database operations will fail.");
}

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});
export const db = drizzle(pool, { schema });
