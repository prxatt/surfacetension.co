'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import ContactBackground from '@/components/quantum/ContactBackground';
import { InstagramIcon, TwitterIcon, TikTokIcon, YouTubeIcon } from '@/components/ui/SocialIcons';

export default function ContactPage() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [clickedPlatforms, setClickedPlatforms] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  const platforms = [
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/surfacetension.co', icon: InstagramIcon },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@surfacetension.co', icon: TikTokIcon },
    { id: 'twitter', label: 'X', href: 'https://x.com/surfacetensi_o', icon: TwitterIcon },
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@DigitalDripRadio', icon: YouTubeIcon },
  ];

  useEffect(() => {
    // Calculate progress
    const progressPercent = (clickedPlatforms.size / platforms.length) * 100;
    setProgress(progressPercent);
    
    if (progressRef.current) {
      progressRef.current.style.width = `${progressPercent}%`;
    }
  }, [clickedPlatforms]);

  const handlePlatformClick = (id: string) => {
    setClickedPlatforms((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Visuals */}
      <ContactBackground />
      
      {/* Logo - Link to Homepage */}
      <Logo position="left" />

      <div className="container-custom relative z-10 py-16 lg:py-20">
        <header className="text-center mb-12 lg:mb-16">
          {/* Brand name ONLY in Ivy Presto */}
          <h1 className="font-display text-5xl lg:text-7xl mb-4 tracking-tight">SURFACE TENSION</h1>
          {/* Subtitle in Inter */}
          <h2 className="font-sans text-base lg:text-lg text-white/70 tracking-[0.2em] uppercase font-light">
            Connect With Us
          </h2>
        </header>

        {/* Brand Selling Point - Stand Out! */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="font-sans text-2xl lg:text-4xl xl:text-5xl text-white mb-6 leading-tight font-light tracking-tight">
            Multi Dimensional Experiential Brand.
          </p>
          <p className="font-sans text-2xl lg:text-4xl xl:text-5xl text-accent leading-tight font-light tracking-tight">
            Transforming the ordinary into the extraordinary.
          </p>
        </motion.div>

        {/* Description - Inter font */}
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <p className="font-sans text-base lg:text-lg text-white/80 leading-relaxed font-light">
            Join our <span className="text-accent font-medium">8.5K+</span> community across platforms for exclusive
            access to our next immersive experiences.
          </p>
        </div>

        {/* Stats - Accurate metrics from QR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="font-sans text-4xl lg:text-6xl mb-2 text-accent font-light">1</div>
            <div className="font-sans text-xs uppercase tracking-[0.15em] text-white/60 font-medium">Inaugural Event</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="font-sans text-4xl lg:text-6xl mb-2 text-accent font-light">8.5K</div>
            <div className="font-sans text-xs uppercase tracking-[0.15em] text-white/60 font-medium mb-1">Total Reach</div>
            <div className="font-sans text-xs text-white/40 font-light">4K+ IG · 4K+ Event · Website</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="font-sans text-4xl lg:text-6xl mb-2 text-accent font-light">4</div>
            <div className="font-sans text-xs uppercase tracking-[0.15em] text-white/60 font-medium">Platforms</div>
          </motion.div>
        </div>

        {/* Progress Section - Stunning and cohesive with background */}
        <section className="max-w-md mx-auto mb-8 lg:mb-10">
          <div className="font-sans text-xs uppercase tracking-[0.15em] mb-4 text-white/60 font-medium">
            Social Collection Progress
          </div>
          <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
            {/* Glow effect matching background colors */}
            <motion.div
              ref={progressRef}
              className="h-full rounded-full relative overflow-hidden"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Gradient matching background particle colors */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-[#00FFFF] to-accent opacity-80" />
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0 bg-accent opacity-50 blur-sm"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </div>
          <div className="mt-3 font-sans text-xs text-white/40 font-light text-center">
            {clickedPlatforms.size} of {platforms.length} platforms followed
          </div>
        </section>

        {/* Social Icons - Larger, same width to match progress bar */}
        <section className="max-w-md mx-auto mb-12 lg:mb-16">
          <div className="grid grid-cols-4 gap-3">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const isClicked = clickedPlatforms.has(platform.id);
              
              return (
                <motion.a
                  key={platform.id}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handlePlatformClick(platform.id)}
                  className={`w-full aspect-square rounded-lg border flex items-center justify-center transition-all relative overflow-hidden ${
                    isClicked
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'border-white/20 bg-white/5 text-white/50 hover:border-accent/50 hover:bg-accent/10 hover:text-accent'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={platform.label}
                >
                  {/* Glow effect on click */}
                  {isClicked && (
                    <motion.div
                      className="absolute inset-0 bg-accent/20 blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10 text-center">
          <p className="font-sans text-xs text-white/40 font-light">
            © {new Date().getFullYear()} Surface Tension LLC. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
