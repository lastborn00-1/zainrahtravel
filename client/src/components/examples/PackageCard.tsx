import PackageCard from '../PackageCard'
import dubaiImage from "@assets/generated_images/Dubai_UAE_destination_ebb3645a.png";

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
