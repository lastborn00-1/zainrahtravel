import DestinationCard from '../DestinationCard'
import swedenImage from "@assets/generated_images/Stockholm_Sweden_destination_f8d986cf.png";

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
