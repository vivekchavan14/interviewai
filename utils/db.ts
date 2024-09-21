import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'; // Ensure schema is properly defined and imported

// Ensure the environment variable is available and not undefined
if (!process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL) {
  throw new Error("Database URL is not defined in the environment variables.");
}

console.log(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL)

// Initialize Neon connection with the environment variable for database URL
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL);

// Initialize Drizzle ORM with Neon and schema
export const db = drizzle(sql, { schema });
