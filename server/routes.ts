import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPackageSchema, insertBookingSchema, insertAdminSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Public routes - Packages
  app.get("/api/packages", async (req, res) => {
    try {
      const { category, featured } = req.query;
      const filters: any = {};

      if (typeof category === "string") {
        filters.category = category;
      }

      if (featured === "1" || featured === "true") {
        filters.featured = 1;
      } else if (featured === "0" || featured === "false") {
        filters.featured = 0;
      }

      const packages = await storage.getAllPackages(filters);
      res.json(packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      res.status(500).json({ error: "Failed to fetch packages" });
    }
  });

  app.get("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pkg = await storage.getPackageById(id);
      if (!pkg) {
        return res.status(404).json({ error: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      console.error("Error fetching package:", error);
      res.status(500).json({ error: "Failed to fetch package" });
    }
  });

  // Public routes - Bookings
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);

      // Send email notification for new booking
      try {
        const { name, email, phone, destination, travelDate, message } = req.body;
        const htmlContent = `
          <h2>🧳 New Booking Request from ${name}</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Full Name</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Phone</td><td style="padding:8px;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Destination</td><td style="padding:8px;">${destination}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Travel Date</td><td style="padding:8px;">${travelDate}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Additional Info</td><td style="padding:8px;">${message || 'None'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Booking ID</td><td style="padding:8px;">#${booking.id}</td></tr>
          </table>
          <br/>
          <p style="color:#888;font-size:12px;">This booking was submitted via the Zainrah Travel website.</p>
        `;
        await resend.emails.send({
          from: 'Zainrah Travel <onboarding@resend.dev>',
          to: ['codecraft060@gmail.com'],
          subject: `📋 New Booking Request: ${destination} — ${name}`,
          html: htmlContent,
        });
      } catch (emailErr) {
        // Don't fail the booking if email fails — just log it
        console.error("Booking email notification failed:", emailErr);
      }

      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // Public route - Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message, visaType } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Format the message
      const htmlContent = `
        <h2>New Contact Request from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Visa Type Requested:</strong> ${visaType || 'General Inquiry'}</p>
        <br />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `;

      const data = await resend.emails.send({
        from: 'Zainrah Travel <onboarding@resend.dev>',
        to: ['codecraft060@gmail.com'], // The user needs to verify their domain to change the 'to' address freely, or use their registered Resend email here
        subject: `New Query: ${subject} - ${name}`,
        html: htmlContent,
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // @ts-ignore - session is added by express-session middleware
      req.session.adminId = admin.id;
      // @ts-ignore
      req.session.username = admin.username;

      res.json({
        id: admin.id,
        username: admin.username
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    // @ts-ignore
    if (req.session.adminId) {
      res.json({
        // @ts-ignore
        id: req.session.adminId,
        // @ts-ignore
        username: req.session.username
      });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  // Middleware to check if user is admin
  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.session.adminId) {
      return res.status(401).json({ error: "Admin authentication required" });
    }
    next();
  };

  // Admin routes - Package management
  app.post("/api/admin/packages", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(validatedData);
      res.status(201).json(pkg);
    } catch (error) {
      console.error("Error creating package:", error);
      res.status(400).json({ error: "Invalid package data" });
    }
  });

  app.put("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPackageSchema.partial().parse(req.body);
      const pkg = await storage.updatePackage(id, validatedData);
      if (!pkg) {
        return res.status(404).json({ error: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      console.error("Error updating package:", error);
      res.status(400).json({ error: "Invalid package data" });
    }
  });

  app.delete("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePackage(id);
      if (!success) {
        return res.status(404).json({ error: "Package not found" });
      }
      res.json({ message: "Package deleted successfully" });
    } catch (error) {
      console.error("Error deleting package:", error);
      res.status(500).json({ error: "Failed to delete package" });
    }
  });

  app.get("/api/admin/bookings", requireAdmin, async (_req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ error: "Failed to fetch admin stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
