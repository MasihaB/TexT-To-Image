import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const generations = pgTable("generations", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  style: text("style").notNull(),
  imageUrl: text("image_url").notNull(),
  metadata: jsonb("metadata").$type<{ width: number; height: number }>(),
});

export const insertGenerationSchema = createInsertSchema(generations).pick({
  prompt: true,
  style: true,
  imageUrl: true,
  metadata: true,
});

export type InsertGeneration = z.infer<typeof insertGenerationSchema>;
export type Generation = typeof generations.$inferSelect;

export const generateSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  style: z.string().min(1, "Style is required"),
});

export type GenerateRequest = z.infer<typeof generateSchema>;
