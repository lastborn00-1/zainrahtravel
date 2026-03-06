import PackageCard from '../PackageCard'
import { Card, CardContent } from "@/components/ui/card";
const dubaiImage = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop";

export default function PackageCardExample() {
  return (
    <div className="w-96">
      <PackageCard
        id={1}
        image={dubaiImage}
        name="Dubai Luxury Experience"
        destination="Dubai, UAE"
        price={3500}
        duration="7 Days"
        description="Explore the magnificent city of Dubai with luxury hotels, desert safari, and exclusive tours of iconic landmarks."
      />
    </div>
  )
}
