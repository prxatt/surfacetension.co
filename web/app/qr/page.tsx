'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InstagramIcon, TwitterIcon, TikTokIcon } from '@/components/ui/SocialIcons';

export default function QRPage() {
  const [clickedPlatforms, setClickedPlatforms] = useState<Set<string>>(new Set());

  const platforms = [
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/surfacetension.co', icon: InstagramIcon, description: 'Behind the scenes content' },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@surfacetension.co', icon: TikTokIcon, description: 'Short-form content' },
    { id: 'twitter', label: 'X (Twitter)', href: 'https://x.com/surfacetensi_o', icon: TwitterIcon, description: 'Updates & announcements' },
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@DigitalDripRadio', icon: null, description: 'Long-form content' },
    { id: 'website', label: 'Website', href: 'https://surfacetension.co', icon: null, description: 'Explore our work' },
  ];

  // Calculate progress as derived value
  const progressPercent = (clickedPlatforms.size / platforms.length) * 100;

  const handlePlatformClick = (id: string) => {
    setClickedPlatforms((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-custom py-24 lg:py-32">
        <header className="text-center mb-16 lg:mb-24">
          {/* Brand name ONLY in Ivy Presto */}
          <h1 className="font-display text-6xl lg:text-8xl mb-6 tracking-tight">SURFACE TENSION</h1>
          {/* Subtitle in Inter */}
          <h2 className="font-sans text-lg lg:text-xl text-white/70 tracking-[0.2em] uppercase font-light">
            Connect With Us
          </h2>
        </header>

        {/* Description - Inter font */}
        <p className="max-w-2xl mx-auto text-center text-white/80 mb-16 lg:mb-24 font-sans text-lg lg:text-xl leading-relaxed font-light">
          Multi Dimensional Experiential Brand. Transforming the ordinary into the extraordinary. Join our{' '}
          <span className="text-accent font-medium">8.5K+</span> community across platforms for exclusive access to our
          next immersive experiences.
        </p>

        {/* Stats - Accurate metrics from QR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto mb-20 lg:mb-32">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="font-sans text-5xl lg:text-7xl mb-4 text-accent font-light">1</div>
            <div className="font-sans text-sm uppercase tracking-[0.15em] text-white/60 font-medium">Inaugural Event</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="font-sans text-5xl lg:text-7xl mb-4 text-accent font-light">8.5K</div>
            <div className="font-sans text-sm uppercase tracking-[0.15em] text-white/60 font-medium mb-2">Total Reach</div>
            <div className="font-sans text-xs text-white/40 font-light">4K+ IG · 4K+ Event · Website</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="font-sans text-5xl lg:text-7xl mb-4 text-accent font-light">5</div>
            <div className="font-sans text-sm uppercase tracking-[0.15em] text-white/60 font-medium">Platforms</div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.p
            className="font-sans text-xl lg:text-2xl text-accent font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            🚀 Collect all our socials for exclusive content!
          </motion.p>
        </div>

        {/* Progress Section */}
        <section className="max-w-md mx-auto mb-16 lg:mb-24">
          <div className="font-sans text-sm uppercase tracking-[0.15em] mb-4 text-white/60 font-medium">
            Social Collection Progress
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-3 font-sans text-xs text-white/40 font-light">
            {clickedPlatforms.size} of {platforms.length} platforms followed
          </div>
        </section>

        {/* Social Links with SVG Icons */}
        <section className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto mb-20 lg:mb-32">
          {platforms.map((item, index) => {
            const Icon = item.icon;
            const isClicked = clickedPlatforms.has(item.id);
            return (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handlePlatformClick(item.id)}
                className={`flex items-center justify-between p-6 lg:p-8 border rounded-lg group transition-all ${
                  isClicked
                    ? 'border-accent bg-white/10'
                    : 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-accent'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  {Icon && (
                    <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center text-white/60 group-hover:text-accent transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <div className="font-sans text-lg font-medium mb-1">{item.label}</div>
                    {item.description && (
                      <div className="font-sans text-sm text-white/50 font-light">{item.description}</div>
                    )}
                  </div>
                </div>
                <div className="font-sans text-xs uppercase tracking-[0.15em] text-white/40 group-hover:text-accent transition-colors font-medium">
                  Open
                </div>
              </motion.a>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="mt-20 lg:mt-32 pt-12 border-t border-white/10 text-center">
          <p className="font-sans text-xs text-white/40 font-light">
            © {new Date().getFullYear()} Surface Tension LLC. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
