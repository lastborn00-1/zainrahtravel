import { storage } from "./storage";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Starting database seeding...");

  // Create default admin account
  try {
    const existingAdmin = await storage.getAdminByUsername("admin");
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await storage.createAdmin({
        username: "admin",
        password: hashedPassword,
      });
      console.log("✓ Admin account created (username: admin, password: admin123)");
    } else {
      console.log("✓ Admin account already exists");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }

  // Create sample packages
  const samplePackages = [
    {
      name: "Scandinavian Adventure",
      destination: "Stockholm, Sweden",
      price: 2500,
      duration: "7 Days",
      description: "Explore the beautiful capital of Sweden with guided tours of historic sites, museums, and the stunning archipelago.",
      image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=2000&auto=format&fit=crop",
      category: "City Break",
      featured: 1
    },
    {
      name: "Portuguese Coastal Tour",
      destination: "Porto, Portugal",
      price: 2200,
      duration: "6 Days",
      description: "Discover the charm of Porto with wine tasting tours, historic landmarks, and breathtaking coastal views.",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2000&auto=format&fit=crop",
      category: "Relaxation",
      featured: 1
    },
    {
      name: "Bavarian Castle Experience",
      destination: "Munich, Germany",
      price: 2800,
      duration: "8 Days",
      description: "Visit fairy-tale castles, enjoy Bavarian culture, and explore the historic city of Munich.",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000&auto=format&fit=crop",
      category: "Adventure",
      featured: 0
    },
    {
      name: "Spanish Heritage Tour",
      destination: "Barcelona, Spain",
      price: 2300,
      duration: "7 Days",
      description: "Experience Gaudí's masterpieces, Mediterranean beaches, and vibrant Spanish culture in Barcelona.",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2000&auto=format&fit=crop",
      category: "City Break",
      featured: 0
    },
    {
      name: "Dubai Luxury Package",
      destination: "Dubai, UAE",
      price: 3500,
      duration: "5 Days",
      description: "Luxury hotels, desert safari, Burj Khalifa, and exclusive shopping experiences in the city of gold.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
      category: "Relaxation",
      featured: 1
    },
    {
      name: "British Heritage Tour",
      destination: "London, UK",
      price: 3000,
      duration: "6 Days",
      description: "Explore iconic landmarks, royal palaces, world-class museums, and British culture in London.",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop",
      category: "City Break",
      featured: 0
    },
    {
      name: "Northern Lights Experience",
      destination: "Lapland, Finland",
      price: 3200,
      duration: "5 Days",
      description: "Chase the aurora borealis, enjoy winter activities, and experience the magic of Finnish Lapland.",
      image: "https://images.unsplash.com/photo-1594279761639-cb1787798b52?q=80&w=2000&auto=format&fit=crop",
      category: "Adventure",
      featured: 1
    },
    {
      name: "Canadian Rockies Adventure",
      destination: "Banff, Canada",
      price: 3800,
      duration: "8 Days",
      description: "Breathtaking mountain scenery, pristine lakes, wildlife encounters, and outdoor adventures.",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2000&auto=format&fit=crop",
      category: "Adventure",
      featured: 0
    },
    {
      name: "Umrah Package",
      destination: "Mecca & Medina",
      price: 2800,
      duration: "10 Days",
      description: "Complete Umrah package with flights, 5-star hotels near Haram, guided tours, and experienced support.",
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=2000&auto=format&fit=crop",
      category: "Spiritual",
      featured: 1
    },
    // NEW VISA PACKAGES
    {
      name: "US Tourist Visa Application",
      destination: "USA",
      price: 500,
      duration: "B1/B2 Visa",
      description: "Comprehensive assistance for US B1/B2 tourist visa applications, including document readiness and interview preparation.",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000&auto=format&fit=crop",
      category: "Visa Services",
      featured: 1
    },
    {
      name: "UK Student Visa Processing",
      destination: "United Kingdom",
      price: 850,
      duration: "Tier 4 Visa",
      description: "End-to-end guidance for securing your UK Tier 4 Student Visa, handling CAS generation, financial proof, and submission.",
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2000&auto=format&fit=crop",
      category: "Visa Services",
      featured: 1
    },
    {
      name: "Schengen Visiting Visa",
      destination: "Europe",
      price: 350,
      duration: "Short Stay",
      description: "Assistance with documentation, itinerary planning, and application processing for the Schengen area visiting visa.",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop",
      category: "Visa Services",
      featured: 0
    },
    {
      name: "Canada Work Permit Consultation",
      destination: "Canada",
      price: 1200,
      duration: "Work Visa",
      description: "Expert consultation and filing support for Canada Work Permits and LMIA-based application processes.",
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop",
      category: "Visa Services",
      featured: 1
    },
    {
      name: "Australia Tourist Visa",
      destination: "Australia",
      price: 450,
      duration: "Subclass 600",
      description: "Visitor visa (Subclass 600) assistance ensuring your application presents strong ties and clear intent of travel.",
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2000&auto=format&fit=crop",
      category: "Visa Services",
      featured: 0
    }
  ];

  try {
    const existingPackages = await storage.getAllPackages();
    if (existingPackages.length > 0) {
      console.log(`Deleting ${existingPackages.length} existing packages to reseed...`);
      for (const pkg of existingPackages) {
        await storage.deletePackage(pkg.id);
      }
    }

    for (const pkg of samplePackages) {
      await storage.createPackage(pkg);
    }
    console.log(`✓ Created ${samplePackages.length} sample packages (including Visa packages)`);
  } catch (error) {
    console.error("Error creating packages:", error);
  }

  console.log("Database seeding completed!");
}

seed().catch(console.error);
