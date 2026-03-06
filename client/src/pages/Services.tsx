import { Card } from "@/components/ui/card";
import { Plane, FileCheck, Hotel, Users } from "lucide-react";
import meccaImage from "@assets/generated_images/Mecca_Hajj_pilgrimage_af569257.png";

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Book domestic and international flights at competitive prices. We work with major airlines to get you the best deals and most convenient flight schedules.",
      features: [
        "Domestic and international flights",
        "Competitive pricing",
        "Multiple airline options",
        "Flexible booking and cancellation",
      ],
    },
    {
      icon: FileCheck,
      title: "Visa Assistance",
      description: "Navigate the complex visa application process with ease. Our experienced team helps you prepare and submit visa applications for various countries.",
      features: [
        "Expert visa consultation",
        "Document preparation support",
        "Application submission assistance",
        "Travel insurance guidance",
      ],
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description: "Find and book the perfect accommodation for your trip. From budget-friendly options to luxury hotels, we help you secure the best rates.",
      features: [
        "Wide range of accommodation options",
        "Best price guarantee",
        "Verified hotel reviews",
        "24/7 booking support",
      ],
    },
    {
      icon: Users,
      title: "Umrah & Hajj Packages",
      description: "Fulfill your spiritual journey with our comprehensive Umrah and Hajj packages. We handle all arrangements for a peaceful and meaningful pilgrimage.",
      features: [
        "Complete pilgrimage packages",
        "Experienced guides",
        "Comfortable accommodation near Haram",
        "Group and individual packages",
      ],
    },
  ];

  return (
    <div>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }} data-testid="text-services-title">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-services-subtitle">
            Comprehensive travel solutions tailored to your needs
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`p-8 ${index % 2 === 0 ? '' : 'bg-muted/30'}`}
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3" data-testid={`text-service-title-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground" data-testid={`text-service-description-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {service.description}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-4">What We Offer:</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={meccaImage}
                alt="Hajj Pilgrimage"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }} data-testid="text-pilgrimage-title">
                Pilgrimage Services
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="text-pilgrimage-description">
                Experience a spiritual journey of a lifetime with our expertly organized Umrah and Hajj packages. 
                We understand the importance of this sacred pilgrimage and ensure every detail is handled with 
                care and respect.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">All-Inclusive Packages</h4>
                    <p className="text-sm text-muted-foreground">
                      Flights, accommodation, transportation, and guidance included
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Experienced Guides</h4>
                    <p className="text-sm text-muted-foreground">
                      Knowledgeable guides to assist you throughout your journey
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Comfort & Convenience</h4>
                    <p className="text-sm text-muted-foreground">
                      Quality accommodation near Masjid al-Haram and Masjid an-Nabawi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
