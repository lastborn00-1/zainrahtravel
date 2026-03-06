import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    message: "",
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking request submitted!",
        description: "Thank you! We'll contact you shortly to confirm your booking.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelDate: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "Please check your information and try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBookingMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }} data-testid="text-booking-title">
            Book Your Trip
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-booking-subtitle">
            Fill out the form below and we'll get back to you shortly
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      data-testid="input-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Preferred Destination *</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g., Dubai, London, Umrah"
                      required
                      data-testid="input-destination"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelDate">Preferred Travel Date *</Label>
                    <div className="relative">
                      <Input
                        id="travelDate"
                        name="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={handleChange}
                        required
                        data-testid="input-travel-date"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your travel preferences, number of travelers, etc."
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={createBookingMutation.isPending}
                    data-testid="button-submit-booking"
                  >
                    {createBookingMutation.isPending ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4" data-testid="text-booking-info-title">What Happens Next?</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">1</span>
                    </div>
                    <p>We'll review your booking request within 24 hours</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">2</span>
                    </div>
                    <p>Our travel consultant will contact you to discuss details</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">3</span>
                    </div>
                    <p>Receive a customized travel package with pricing</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">4</span>
                    </div>
                    <p>Confirm your booking and start your journey!</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground">
                <h3 className="font-semibold text-lg mb-3">Need Help?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Have questions about booking? Our team is here to help!
                </p>
                <div className="space-y-2 text-sm">
                  <p>📞 +234 803 965 4478</p>
                  <p>✉️ info@zainrahtravel.com</p>
                  <p>💬 WhatsApp Available</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
