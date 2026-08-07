import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { localDbAdapter } from "@/lib/local-db";

const databaseUrl = process.env.DATABASE_URL;

/* eslint-disable @typescript-eslint/no-explicit-any */
let dbInstance: any;

if (databaseUrl) {
  const globalForDb = globalThis as typeof globalThis & {
    __arenaNextJsPostgresqlPool?: Pool;
  };

  const pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  dbInstance = drizzle(pool);
} else {
  dbInstance = localDbAdapter;
}

export const db = dbInstance;
