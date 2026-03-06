import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const packages = pgTable("packages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  destination: text("destination").notNull(),
  price: integer("price").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull().default("General"),
  featured: integer("featured").notNull().default(0), // 0 for false, 1 for true (using integer for simplicity with some PG drivers if boolean is tricky, but let's stick to text or integer)
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPackageSchema = createInsertSchema(packages, {
  name: z.string().min(1),
  destination: z.string().min(1),
  price: z.number().positive(),
  duration: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  category: z.string().min(1),
  featured: z.number().int().min(0).max(1),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;

export const bookings = pgTable("bookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  destination: text("destination").notNull(),
  travelDate: text("travel_date").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  destination: z.string().min(1),
  travelDate: z.string().min(1),
  message: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export const admins = pgTable("admins", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdminSchema = createInsertSchema(admins, {
  username: z.string().min(3),
  password: z.string().min(6),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;
