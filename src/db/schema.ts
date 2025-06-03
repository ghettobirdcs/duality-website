import {
  sqliteTable,
  text,
  integer,
  foreignKey,
} from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  discordId: text("discord_id").notNull().unique(),
  role: text("role"), // optional: e.g. entry, support
});

export const maps = sqliteTable("maps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const setups = sqliteTable("setups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mapId: integer("map_id")
    .notNull()
    .references(() => maps.id),
  side: text("side").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});
