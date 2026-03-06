import { Card } from "@/components/ui/card";
import { Globe, Users, Award, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access to destinations worldwide with trusted partnerships",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Personalized service tailored to your unique travel needs",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Commitment to quality and exceptional travel experiences",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Honest, transparent, and reliable service you can trust",
    },
  ];

  return (
    <div>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }} data-testid="text-about-title">
            About Zainrah Travel and Tour
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-intro">
            Your trusted partner in creating unforgettable travel experiences since 2015
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }} data-testid="text-our-story-title">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p data-testid="text-our-story-p1">
                  Founded in 2015 in the heart of Ilorin, Kwara State, Nigeria, Zainrah Travel and Tour began 
                  with a simple mission: to make world-class travel accessible to everyone. What started as a 
                  small local agency has grown into a trusted name in the travel industry.
                </p>
                <p data-testid="text-our-story-p2">
                  Over the years, we've helped thousands of travelers explore destinations across the globe, 
                  from the scenic landscapes of Europe to the spiritual journey of Hajj and Umrah pilgrimages. 
                  Our commitment to excellence and customer satisfaction has made us a preferred choice for 
                  travelers throughout Nigeria.
                </p>
                <p data-testid="text-our-story-p3">
                  Today, we continue to expand our services, offering comprehensive travel solutions including 
                  flight bookings, visa assistance, hotel reservations, and customized tour packages. Our team 
                  of experienced travel professionals is dedicated to making your journey smooth and memorable.
                </p>
              </div>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6" data-testid="text-location-title">Our Location</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Head Office</h4>
                  <p className="text-muted-foreground" data-testid="text-location-address">
                    Ilorin, Kwara State<br />
                    Nigeria
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Office Hours</h4>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }} data-testid="text-values-title">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="p-6" data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" data-testid={`text-value-title-${value.title.toLowerCase().replace(/\s+/g, '-')}`}>{value.title}</h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-value-description-${value.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }} data-testid="text-stats-title">
                Our Track Record
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold mb-2" data-testid="text-stat-years">9+</div>
                  <div className="text-sm opacity-90">Years of Service</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2" data-testid="text-stat-customers">1000+</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2" data-testid="text-stat-destinations">50+</div>
                  <div className="text-sm opacity-90">Destinations</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
