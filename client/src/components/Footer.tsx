import { Link } from "wouter";
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg" style={{ fontFamily: 'Playfair Display' }}>Zainrah Travel</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner for unforgettable travel experiences. Based in Ilorin, Kwara State, Nigeria.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 hover-elevate active-elevate-2 rounded-md" data-testid="link-facebook">
                <Facebook className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 hover-elevate active-elevate-2 rounded-md" data-testid="link-twitter">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 hover-elevate active-elevate-2 rounded-md" data-testid="link-instagram">
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 hover-elevate active-elevate-2 rounded-md" data-testid="link-youtube">
                <Youtube className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/packages">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-packages">
                    Travel Packages
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-contact">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Flight Booking</li>
              <li className="text-sm text-muted-foreground">Visa Assistance</li>
              <li className="text-sm text-muted-foreground">Hotel Reservations</li>
              <li className="text-sm text-muted-foreground">Umrah & Hajj Packages</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Ilorin, Kwara State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+2348039654478" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-phone">
                  +234 803 965 4478
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@zainrahtravel.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                  info@zainrahtravel.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <SiWhatsapp className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="https://wa.me/2348039654478" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-whatsapp">
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zainrah Travel and Tour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
