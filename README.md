# surfacetension.co

A multidimensional experiential brand website featuring immersive WebGL visualizations and audio-reactive experiences.

## Features

- **Immersive WebGL Visualizations**: Real-time shader-based visual effects using Three.js
- **Audio-Reactive Visuals**: Optional microphone input for real-time audio visualization
- **Responsive Design**: Optimized for all devices with performance tier detection
- **Accessibility**: WCAG-compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Complete meta tags for search engines and social sharing

## Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with responsive design and reduced motion support
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **Three.js**: WebGL rendering and 3D graphics
- **GSAP**: Animation library for smooth transitions

## Project Structure

```
surfacetension.co/
├── index.html          # Main landing page
├── qr.html             # QR code connection page
├── start-server.sh     # Local development server script
├── .gitignore          # Git ignore file
├── vercel.json         # Vercel deployment configuration
└── README.md           # This file
```

## Local Development

### Quick Start

1. **Start the server:**
   ```bash
   ./start-server.sh 4000
   ```

2. **Access the site:**
   - Main page: http://localhost:4000/index.html
   - QR page: http://localhost:4000/qr.html

### Alternative: Manual Server

```bash
cd /path/to/surfacetension.co
python3 -m http.server 4000 --bind 127.0.0.1
```

### Using Different Ports

If port 4000 is in use, the script automatically handles conflicts. You can also specify a different port:

```bash
./start-server.sh 8080
```

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
- ES6+ JavaScript
- Cross-browser compatible
- Mobile-first responsive design

✅ **Best Practices**
- Proper meta tags for SEO
- Open Graph tags for social sharing
- Reduced motion support
- Keyboard navigation
- Screen reader friendly

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

The site is configured for deployment on Vercel. The `vercel.json` file includes routing configuration for the static pages.

## License

See LICENSE file for details.

## Contact

For questions or collaboration inquiries, visit the [Connect With Us](https://surfacetension.co/qr) page.
