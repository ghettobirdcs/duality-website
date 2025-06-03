import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  discordId: text("discord_id").notNull().unique(),
  role: text("role"), // optional: e.g. entry, support
});
