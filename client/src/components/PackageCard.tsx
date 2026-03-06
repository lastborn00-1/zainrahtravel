import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface PackageCardProps {
  id: number;
  image: string;
  name: string;
  destination: string;
  price: number;
  duration: string;
  description: string;
  category?: string;
  featured?: number;
}

export default function PackageCard({ id, image, name, destination, price, duration, description, category, featured }: PackageCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      layout
      className="h-full"
    >
      <Card className="overflow-hidden glass-dark hover-elevate transition-all duration-500 border-white/10 flex flex-col h-full group" data-testid={`card-package-${id}`}>
        <div className="aspect-video overflow-hidden relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured === 1 && (
              <Badge className="bg-yellow-400 text-yellow-900 border-none hover:bg-yellow-400 font-bold px-3 py-1 shadow-lg animate-pulse">
                FEATURED
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="glass border-white/20 text-white backdrop-blur-md px-3 py-1">
                {category}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 relative bg-background/40 backdrop-blur-lg">
          <div className="flex items-center gap-2 text-sm text-primary mb-2 font-medium">
            <MapPin className="h-4 w-4" />
            <span data-testid={`text-package-destination-${id}`}>{destination}</span>
          </div>

          <h3 className="font-bold text-2xl mb-2 group-hover:text-primary transition-colors duration-300" data-testid={`text-package-name-${id}`}>
            {name}
          </h3>

          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed" data-testid={`text-package-description-${id}`}>
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg">
              <Users className="h-4 w-4 text-primary" />
              <span>2-6 People</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-end">
            <Link href={`/booking?package=${id}`}>
              <Button className="rounded-full px-6 hover-elevate transition-all duration-300" data-testid={`button-book-package-${id}`}>
                Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
