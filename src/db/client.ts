import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// SQLite DB file at project root
const sqlite = new Database("./sqlite.db");
export const db = drizzle(sqlite, { schema });
