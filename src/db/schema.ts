import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Example: Players table
export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  discordId: text("discord_id").notNull().unique(),
  role: text("role"), // e.g., entry, support, etc.
});

// Example: Maps table (expand as needed)
export const maps = sqliteTable("maps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

// Example: Positions table
export const positions = sqliteTable("positions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  playerId: integer("player_id").references(() => players.id),
  mapId: integer("map_id").references(() => maps.id),
  position: text("position").notNull(), // e.g., "A site anchor"
});
