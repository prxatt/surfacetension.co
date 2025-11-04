# Surface Tension - Next.js Web App

## Setup & Running

1. **Install dependencies:**
   ```bash
   cd web
   npm install
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```
   The server will run on **http://localhost:4000**

3. **Important:** Make sure you stop any Python HTTP server running on port 4000:
   ```bash
   # Find and kill the Python server
   lsof -ti:4000 | xargs kill -9
   ```

## Dev Routes (for testing PRD sections)

- **http://localhost:4000/dev** - Dev routes index
- **http://localhost:4000/dev/work-preview** - WorkPreview section (full PRD implementation)
- **http://localhost:4000/dev/capabilities** - Capabilities section (full PRD implementation)
- **http://localhost:4000/dev/contact-cta** - ContactCTA section (full PRD implementation)

## Production Routes

- **http://localhost:4000/** - Homepage (cinematic hero + footer)
- **http://localhost:4000/qr** - QR page (ported from static)
- **http://localhost:4000/contact** - Contact page (duplicate of QR)
- **http://localhost:4000/work** - Work index (placeholder)
- **http://localhost:4000/work/[slug]** - Work detail (placeholder)
- **http://localhost:4000/studio** - Studio page (placeholder)

## Features Implemented

✅ **UniversalMedia Component** (Full PRD spec)
- Image, video, gif, Lottie, 3D model, interactive support
- Hover-activate, parallax, scroll-reveal behaviors
- Click-expand with layered overlay (not popup)
- Caption overlays

✅ **WorkPreview Section** (Full PRD implementation)
- GSAP ScrollTrigger animations
- Staggered grid with alternating layouts
- Parallax effects (alternate directions)
- Accent borders on hover
- Multiple media layers per project

✅ **Capabilities Section** (Full PRD implementation)
- Bento grid layout
- Accordion with smooth animations
- Background media on active
- Service tags with stagger
- Accent borders per capability

✅ **ContactCTA Section** (Full PRD implementation)
- Confetti animation on CTA click
- Floating cursor-following elements
- Split text reveal animation
- Magnetic button effects
- Quick links grid

## Content Configuration

Edit JSON files in `web/content/`:
- `home.json` - Homepage configuration
- `work.json` - Work projects data
- `carousel.json` - Private carousel (hidden until enabled)

## Notes

- Lottie animations are stubbed until assets are provided
- All sections follow PRD specifications exactly
- Homepage remains minimal (hero + footer) until sections are ready to reveal

