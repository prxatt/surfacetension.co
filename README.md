# surfacetension.co

A multidimensional experiential brand website featuring immersive WebGL visualizations and audio-reactive experiences.

## Project Overview

This repository contains **two implementations** of the Surface Tension website:

1. **Static HTML Site** (root directory) - Standalone HTML pages with vanilla JavaScript
2. **Next.js Application** (`web/` directory) - Full-featured React application with TypeScript

Both implementations share the same design and functionality but serve different deployment needs.

## Project Structure

```
surfacetension.co/
├── index.html              # Static: Main landing page
├── qr.html                 # Static: QR code connection page
├── start-server.sh         # Static: Local development server script
├── .gitignore              # Git ignore file
├── vercel.json             # Vercel deployment configuration
├── README.md               # This file (overview)
│
└── web/                    # Next.js Application
    ├── app/                # Next.js app router pages
    ├── components/         # React components
    ├── content/            # JSON content files
    ├── lib/                # Utility libraries
    ├── package.json        # Next.js dependencies
    └── README.md           # Next.js setup instructions
```

## Quick Start

### For Static HTML Site

The root directory contains standalone HTML files that can be served with any static file server.

**Quick Start:**
```bash
./start-server.sh 4000
```

Then visit:
- Main page: http://localhost:4000/index.html
- QR page: http://localhost:4000/qr.html

**Alternative:**
```bash
python3 -m http.server 4000 --bind 127.0.0.1
```

See [SERVER.md](./SERVER.md) for detailed server setup instructions.

### For Next.js Application

The main application is in the `web/` directory. For setup and development instructions, see:

👉 **[web/README.md](./web/README.md)**

**Quick Start:**
```bash
cd web
npm install
npm run dev
```

The Next.js server will run on **http://localhost:4000**

## Features

Both implementations include:

- **Immersive WebGL Visualizations**: Real-time shader-based visual effects using Three.js
- **Audio-Reactive Visuals**: Optional microphone input for real-time audio visualization
- **Responsive Design**: Optimized for all devices with performance tier detection
- **Accessibility**: WCAG-compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Complete meta tags for search engines and social sharing

## Tech Stack

### Static Site (Root)
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with responsive design and reduced motion support
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **Three.js**: WebGL rendering and 3D graphics
- **GSAP**: Animation library for smooth transitions

### Next.js Application (web/)
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **React**: Component-based architecture
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first styling
- **Three.js**: WebGL rendering and 3D graphics
- **GSAP**: Animation library for scroll-triggered effects

## Code Quality

✅ **Clean & Production-Ready**
- No console errors
- Proper error handling
- Optimized performance
- Accessibility compliant (WCAG 2.1)
- SEO optimized

✅ **Standards Compliant**
- Semantic HTML5
- Modern CSS with fallbacks
- ES6+ JavaScript / TypeScript
- Cross-browser compatible
- Mobile-first responsive design

✅ **Best Practices**
- Proper meta tags for SEO
- Open Graph tags for social sharing
- Reduced motion support
- Keyboard navigation
- Screen reader friendly
- TypeScript type safety (Next.js app)

## Accessibility Features

- **Skip to Content Link**: Allows keyboard users to skip navigation
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Indicators**: Visible focus states for keyboard navigation
- **Reduced Motion**: Respects user's motion preferences
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

The project is configured for deployment on **Vercel**. The `vercel.json` file includes routing configuration for both static pages and the Next.js application.

### Static Site Deployment
Static HTML files can be deployed directly to Vercel or any static hosting service.

### Next.js Application Deployment
The `web/` directory is configured as a Next.js project and will be automatically detected by Vercel.

## Documentation

- **Static Site**: See [SERVER.md](./SERVER.md) for server setup
- **Next.js App**: See [web/README.md](./web/README.md) for detailed setup and development guide
- **Content Configuration**: See [web/README.md](./web/README.md#content-configuration) for JSON content files

## License

See [LICENSE](./LICENSE) file for details.

## Contact

For questions or collaboration inquiries, visit the [Connect With Us](https://surfacetension.co/qr) page.
