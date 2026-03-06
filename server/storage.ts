import {
  type Package,
  type InsertPackage,
  type Booking,
  type InsertBooking,
  type Admin,
  type InsertAdmin,
  packages,
  bookings,
  admins
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc } from "drizzle-orm";

export interface IStorage {
  // Package methods
  getAllPackages(filters?: { category?: string, featured?: number }): Promise<Package[]>;
  getPackageById(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined>;
  deletePackage(id: number): Promise<boolean>;

  // Booking methods
  getAllBookings(): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Admin methods
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;

  // Dashboard stats
  getStats(): Promise<{
    totalPackages: number;
    totalBookings: number;
    recentBookings: Booking[];
  }>;
}

export class PostgresStorage implements IStorage {
  // Package methods
  async getAllPackages(filters?: { category?: string, featured?: number }): Promise<Package[]> {
    let query = db.select().from(packages);

    if (filters?.category) {
      // @ts-ignore
      query = query.where(eq(packages.category, filters.category));
    }

    if (filters?.featured !== undefined) {
      // @ts-ignore
      query = query.where(eq(packages.featured, filters.featured));
    }

    return await query;
  }

  async getPackageById(id: number): Promise<Package | undefined> {
    const result = await db.select().from(packages).where(eq(packages.id, id));
    return result[0];
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const result = await db.insert(packages).values(pkg).returning();
    return result[0];
  }

  async updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined> {
    const result = await db.update(packages).set(pkg).where(eq(packages.id, id)).returning();
    return result[0];
  }

  async deletePackage(id: number): Promise<boolean> {
    const result = await db.delete(packages).where(eq(packages.id, id)).returning();
    return result.length > 0;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async getStats(): Promise<{
    totalPackages: number;
    totalBookings: number;
    recentBookings: Booking[];
  }> {
    const [packagesCount] = await db.select({ count: sql<number>`count(*)` }).from(packages);
    const [bookingsCount] = await db.select({ count: sql<number>`count(*)` }).from(bookings);
    const recent = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(5);

    return {
      totalPackages: Number(packagesCount.count),
      totalBookings: Number(bookingsCount.count),
      recentBookings: recent,
    };
  }

  // Admin methods
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const result = await db.select().from(admins).where(eq(admins.username, username));
    return result[0];
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const result = await db.insert(admins).values(admin).returning();
    return result[0];
  }
}

export const storage = new PostgresStorage();
