import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DestinationCardProps {
  image: string;
  name: string;
  price: string;
  category?: string;
}

export default function DestinationCard({ image, name, price, category }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="overflow-hidden glass hover-elevate active-elevate-2 cursor-pointer group h-full border-none" data-testid={`card-destination-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <div className="absolute top-2 left-2 glass-dark text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border-none">
              {category}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 relative bg-card/50 backdrop-blur-sm">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors" data-testid={`text-destination-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>{name}</h3>
        </div>
      </Card>
    </motion.div>
  );
}
