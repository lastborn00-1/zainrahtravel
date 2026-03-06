import DestinationCard from '../DestinationCard'
import { Card } from "@/components/ui/card";
const swedenImage = "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2000&auto=format&fit=crop";

export default function DestinationCardExample() {
  return (
    <div className="w-80">
      <DestinationCard
        image={swedenImage}
        name="Sweden"
        price="$2,500"
      />
    </div>
  )
}
