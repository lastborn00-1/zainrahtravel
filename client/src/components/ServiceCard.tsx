import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="p-8 h-full glass hover-elevate active-elevate-2 transition-all duration-500 border-none group" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
            <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors duration-500" />
          </div>
          <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors" data-testid={`text-service-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-service-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>{description}</p>
        </div>
      </Card>
    </motion.div>
  );
}
