import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Track app unlocks
export const unlocks = pgTable("unlocks", {
  id: serial("id").primaryKey(),
  appName: text("app_name").notNull(),
  unlockedAt: text("unlocked_at").notNull(),
});

// Photos data
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  description: text("description").notNull(),
});

// Messages data  
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(),
  date: text("date").notNull(),
});

// Reasons data
export const reasons = pgTable("reasons", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
});

export const insertUnlockSchema = createInsertSchema(unlocks).pick({
  appName: true,
  unlockedAt: true,
});

export const insertPhotoSchema = createInsertSchema(photos);
export const insertMessageSchema = createInsertSchema(messages);
export const insertReasonSchema = createInsertSchema(reasons);

export type InsertUnlock = z.infer<typeof insertUnlockSchema>;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertReason = z.infer<typeof insertReasonSchema>;

export type Unlock = typeof unlocks.$inferSelect;
export type Photo = typeof photos.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Reason = typeof reasons.$inferSelect;
