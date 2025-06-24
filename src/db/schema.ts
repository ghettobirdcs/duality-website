import {
  sqliteTable,
  text,
  integer,
  foreignKey,
} from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  discordId: text("discord_id").notNull().unique(),
  discordUsername: text("discord_username").notNull(),
  discordAvatar: text("discord_avatar"),
  role: text("role"), // TODO: Get player role from discord
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
