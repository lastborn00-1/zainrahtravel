import { Link, useLocation } from "wouter";
import { Menu, X, Plane, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/packages", label: "Packages" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass dark:bg-black/40 border-b transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md -ml-3"
            data-testid="link-home"
          >
            <Plane className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground" style={{ fontFamily: 'Playfair Display' }}>Zainrah Travel</span>
              <span className="text-xs text-muted-foreground">Your Gateway to the World</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 ${location === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground"
                  }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover-elevate active-elevate-2 transition-transform duration-300 hover:rotate-12"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-yellow-500" />}
            </Button>
            <Link href="/booking">
              <span data-testid="button-book-now">
                <Button>Book Now</Button>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-yellow-500" />}
            </Button>
            <button
              className="p-2 hover-elevate active-elevate-2 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-4 py-3 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${location === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking">
              <span className="block mt-4" data-testid="button-mobile-book-now">
                <Button className="w-full">
                  Book Now
                </Button>
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
