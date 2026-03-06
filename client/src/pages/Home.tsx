import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import DestinationCard from "@/components/DestinationCard";
import PackageCard from "@/components/PackageCard";
import ServiceCard from "@/components/ServiceCard";
import { Plane, Globe, Hotel, Award, Users, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Package } from "@shared/schema";
import { useState, useEffect } from "react";

const allDestinations = [
  { name: "Dubai, UAE", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2940&auto=format&fit=crop", category: "Luxury" },
  { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop", category: "Romance" },
  { name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=3065&auto=format&fit=crop", category: "Beach" },
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=3087&auto=format&fit=crop", category: "Culture" },
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2000&auto=format&fit=crop", category: "Relaxation" },
  { name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2000&auto=format&fit=crop", category: "City Break" },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop", category: "Adventure" },
  { name: "Rome, Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2000&auto=format&fit=crop", category: "Culture" },
  { name: "Sydney, Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000&auto=format&fit=crop", category: "Adventure" },
  { name: "Swiss Alps", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop", category: "Nature" },
  { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop", category: "Culture" },
  { name: "Cape Town, SA", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000&auto=format&fit=crop", category: "Nature" }
];

export default function Home() {
  const { data: featuredPackages = [], isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages", { featured: 1 }],
    queryFn: async () => {
      const res = await fetch("/api/packages?featured=1");
      if (!res.ok) throw new Error("Failed to fetch featured packages");
      return res.json();
    }
  });

  const [randomDestinations, setRandomDestinations] = useState<typeof allDestinations>([]);

  useEffect(() => {
    // Select 4 random destinations on mount
    const shuffled = [...allDestinations].sort(() => 0.5 - Math.random());
    setRandomDestinations(shuffled.slice(0, 4));
  }, []);

  const features = [
    {
      icon: Award,
      title: "Expert Guidance",
      description: "Professional travel consultants to help plan your perfect journey",
    },
    {
      icon: Shield,
      title: "Best Prices",
      description: "Competitive rates and exclusive deals for our valued customers",
    },
    {
      icon: Users,
      title: "Trusted Service",
      description: "1000+ satisfied customers and counting since 2015",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      <Hero />

      {/* Popular Destinations Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display' }} data-testid="text-destinations-title">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover amazing places around the world with our carefully curated travel packages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {randomDestinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <DestinationCard image={dest.image} name={dest.name} category={dest.category} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-muted/10 rounded-3xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display' }} data-testid="text-packages-title">
            Featured Tour Packages
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exclusive deals on our most popular travel experiences
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg: Package, index: number) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <PackageCard {...pkg} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link href="/packages">
            <span data-testid="button-view-packages">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg hover-elevate transition-all">
                View All Packages <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </span>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display' }} data-testid="text-why-choose-title">
              Why Choose Zainrah Travel?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to making your travel experience seamless and unforgettable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <ServiceCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight" style={{ fontFamily: 'Playfair Display' }} data-testid="text-mission-title">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-light" data-testid="text-mission-content">
              At Zainrah Travel and Tour, we are dedicated to creating exceptional travel experiences for our clients.
              Based in Ilorin, Kwara State, Nigeria, we combine local expertise with global connections to offer
              personalized travel solutions. Whether you're seeking adventure, relaxation, or spiritual fulfillment
              through pilgrimage, we're here to turn your travel dreams into reality.
            </p>
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-xl" data-testid="button-learn-more">
                Learn More About Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tight"
            style={{ fontFamily: 'Playfair Display' }}
            data-testid="text-cta-title"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 opacity-90 font-light"
            data-testid="text-cta-subtitle"
          >
            Book your dream vacation today and let us handle all the details
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <Link href="/booking">
              <Button
                size="lg"
                className="h-16 px-10 text-xl bg-secondary text-secondary-foreground hover-elevate transition-all rounded-full shadow-2xl font-bold"
                data-testid="button-cta-book"
              >
                Book Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-xl border-primary-foreground text-primary-foreground hover:bg-white/10 transition-all rounded-full"
                data-testid="button-cta-contact"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
