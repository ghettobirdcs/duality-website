import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite", // <-- use 'sqlite' for SQLite, 'pg' for Postgres
  dbCredentials: {
    url: "./sqlite.db",
  },
} satisfies Config;
