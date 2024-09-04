import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || "postgresql://neondb_owner:RZqo7bO4fetD@ep-summer-heart-a53s5s4u.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require";

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });