import ServiceCard from '../ServiceCard'
import { Plane } from "lucide-react";

export default function ServiceCardExample() {
  return (
    <div className="w-80">
      <ServiceCard 
        icon={Plane}
        title="Flight Booking"
        description="Book domestic and international flights at competitive prices with our trusted airline partners."
      />
    </div>
  )
}
