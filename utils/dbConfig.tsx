import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL || "";

if (!databaseUrl) {
  throw new Error("No Database connection string was provided to `neon()`.");
}

console.log("Database URL:", databaseUrl); // Optional: For debugging

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
