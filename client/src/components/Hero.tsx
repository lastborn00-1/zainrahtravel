import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

const heroImage = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop";

export default function Hero() {
  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
      </motion.div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          style={{ fontFamily: 'Playfair Display' }}
          data-testid="text-hero-title"
        >
          Explore the World <br /> with Zainrah Travel
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          Your gateway to unforgettable journeys. From exotic destinations to sacred pilgrimages, we make your travel dreams come true.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/booking">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-primary/90 backdrop-blur border border-primary-border hover-elevate active-elevate-2 shadow-2xl rounded-full"
              data-testid="button-hero-book"
            >
              Book Your Trip Now
            </Button>
          </Link>
          <Link href="/packages">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg bg-white/10 backdrop-blur border-white/30 text-white hover-elevate active-elevate-2 rounded-full"
              data-testid="button-hero-packages"
            >
              View Packages
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm shadow-xl" data-testid="text-hero-trust">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Serving travelers since 2015 • 1000+ Happy Customers
          </div>
        </motion.div>
      </div>
    </div>
  );
}
