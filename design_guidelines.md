# Zainrah Travel and Tour - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from leading travel platforms (Airbnb, Booking.com, Expedia) with adaptations for Nigerian travel market. Emphasis on trust-building, visual storytelling, and seamless booking experience.

**Core Principle**: Create an aspirational yet accessible travel experience that balances wanderlust-inducing imagery with practical booking functionality.

## Typography
- **Primary Font**: Inter or DM Sans (Google Fonts) - clean, professional
- **Accent Font**: Playfair Display for headlines - adds elegance
- **Hierarchy**:
  - H1: 3xl-4xl (48-56px), accent font, medium weight
  - H2: 2xl-3xl (32-40px), primary font, semibold
  - H3: xl-2xl (24-32px), primary font, semibold  
  - Body: base-lg (16-18px), primary font, regular
  - Small: sm (14px), primary font, regular

## Layout System
**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 md:py-24
- Container max-width: max-w-7xl
- Card spacing: gap-6 md:gap-8
- Element margins: mb-4, mb-6, mb-8

## Color Guidance
Blue and gold theme with supporting neutrals:
- Primary blue for CTAs, links, trust elements
- Gold for accents, highlights, premium features
- Neutral grays for text hierarchy
- White backgrounds with subtle texture overlays

## Navigation
**Top Navigation**: 
- Sticky header with logo left, nav center, "Book Now" CTA right
- Links: Home, About, Services, Packages, Contact
- Mobile: Hamburger menu with full-screen overlay
- Height: 80px desktop, 64px mobile

**Footer**:
- 4-column layout (desktop): Company Info, Quick Links, Services, Contact & Social
- Newsletter signup section above footer
- Trust badges (if available): Payment methods, certifications
- Copyright and location (Ilorin, Kwara State)

## Page-Specific Layouts

### Home Page (6-7 sections)
1. **Hero Section**: Full-viewport (90vh) with large background image of exotic destination
   - Overlay gradient for text readability
   - Centered headline + tagline + "Book Now" CTA with blurred background
   - Trust indicator: "Serving travelers since [year]" or "500+ Happy Travelers"

2. **Featured Destinations**: 3x3 grid (desktop), stacked (mobile)
   - Cards with destination images, names, "from $XXX" pricing
   - Hover effect: slight scale and overlay

3. **Why Choose Us**: 3-column features
   - Icons + headlines + brief descriptions
   - Benefits: Expert Guidance, Best Prices, Visa Assistance

4. **Popular Packages**: Horizontal scrollable cards (4 packages)
   - Large images, destination name, price, duration, "View Details" button

5. **Mission Statement**: Full-width section with background pattern
   - Centered text, max-width prose

6. **Testimonials**: 3-column cards with customer photos, quotes, names, locations

7. **CTA Section**: "Ready to explore?" with booking form preview or button

### About Us Page (3-4 sections)
- Hero: Company image with overlay text
- Story: 2-column (image left, text right)
- Team: Grid of team members with photos, names, roles
- Values: Icon-based grid (3-4 columns)

### Services Page
- Hero with services overview
- Service cards: 2-column grid (desktop), full-width cards with icons, descriptions
- Each service expandable or linked to detail view

### Packages Page
- Filter bar: Destination, Price range, Duration dropdowns
- Grid layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Package cards: Large image, destination badge, price prominent, description, "Book Now" CTA

### Booking Page
- 2-column layout (desktop): Form left (60%), summary/info right (40%)
- Form sections: Personal Info, Travel Details, Special Requests
- Progress indicator if multi-step
- Sticky summary sidebar showing selected package

### Contact Page
- 2-column: Contact form (left), Info + map placeholder (right)
- Contact methods: Phone, Email, WhatsApp (prominent), Office address
- Business hours display
- Social media links

### Admin Dashboard
- Sidebar navigation (Packages, Bookings, Settings)
- Tables with search, sort, pagination
- Action buttons: Edit, Delete, Add New
- Utilitarian design: focus on functionality over aesthetics

## Component Library

**Cards**: 
- Rounded corners (rounded-lg)
- Shadow on hover
- Image aspect ratio 4:3 for destinations, 16:9 for packages

**Buttons**:
- Primary: Blue background, white text, hover darken
- Secondary: Gold border, transparent background
- Icon buttons for social links

**Forms**:
- Floating labels
- Input fields: border-gray-300, focus blue ring
- Required field indicators
- Validation messages below fields

**Images**:
- Hero: Large exotic destination (beach, city skyline, or landmark)
- Featured destinations: 8 high-quality images (Sweden, Portugal, Germany, Spain, Dubai, London, Finland, Canada)
- Package cards: Destination-specific images
- About page: Team photo, office exterior
- Testimonial photos: Customer portraits (use placeholders)
- Icons: Heroicons for UI elements

## Animations
Minimal, purposeful only:
- Smooth scroll for anchor links
- Fade-in on scroll for section reveals
- Hover states: scale 1.05 for cards, color transitions for buttons
- No autoplay carousels or parallax effects

## Key Differentiators
- Trust-building: Prominently display location, contact info, certifications
- Cultural relevance: Include pilgrimage packages (Umrah/Hajj) prominently
- Mobile-first: Many Nigerian users access via mobile
- WhatsApp integration: Primary contact method for local market
- Price transparency: Clear pricing on all packages
SUpabase database password: mattis-5gUmty-wimmir