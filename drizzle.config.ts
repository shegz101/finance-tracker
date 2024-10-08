import { defineConfig } from 'drizzle-kit'

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export default defineConfig({
  schema: "./utils/schema.tsx",
  dialect: 'postgresql',
  out:'/drizzle',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
})