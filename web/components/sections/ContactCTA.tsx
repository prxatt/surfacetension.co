'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import Confetti from 'react-confetti';
import { Logo } from '@/components/ui/Logo';
import { InstagramIcon, TwitterIcon, TikTokIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import {
  StrategicVisionIcon,
  CreativeExcellenceIcon,
  InnovationFirstIcon,
  GlobalReachIcon,
} from '@/components/ui/FeatureIcons';
import home from '@/content/home.json';

interface SocialLink {
  label: string;
  href: string;
}

interface TitleAlign {
  justify: string;
  align: string;
  offsetY: number;
}

interface HomeData {
  title?: string;
  subtitle?: string;
  titleAlign?: TitleAlign;
  connectLink?: string;
  socials?: SocialLink[];
}

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const homeData: HomeData = home;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current && sectionRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1,
          },
          y: 80,
          opacity: 0,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setCursorPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCTAClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const features = [
    {
      icon: StrategicVisionIcon,
      label: 'Strategic Vision',
      description: 'Cultural insights that drive decisions',
    },
    {
      icon: CreativeExcellenceIcon,
      label: 'Creative Excellence',
      description: 'Boundary-pushing creative direction',
    },
    {
      icon: InnovationFirstIcon,
      label: 'Innovation First',
      description: 'Cutting-edge technology integration',
    },
    {
      icon: GlobalReachIcon,
      label: 'Global Reach',
      description: 'Experiences that transcend borders',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-black text-white overflow-hidden py-24 lg:py-32"
      onMouseMove={handleMouseMove}
    >
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && windowSize.width > 0 && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            colors={['#FF4500', '#00FFFF', '#FFFF00', '#FF00FF']}
            numberOfPieces={200}
            recycle={false}
          />
        )}
      </AnimatePresence>

      {/* Subtle background - no gradients */}
      <motion.div className="absolute inset-0 opacity-[0.015]" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </motion.div>

      {/* Floating cursor element - minimal */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/3 blur-3xl pointer-events-none"
        animate={{
          x: cursorPosition.x - 128,
          y: cursorPosition.y - 128,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      />

      <div className="container-custom relative z-10 w-full">
        {/* Top Section: Heading & Description */}
        <div ref={textRef} className="mb-24 lg:mb-32">
          {/* Responsive heading */}
          <motion.h2
            className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] leading-[0.85] mb-12 lg:mb-16 tracking-tight font-light"
            style={{ fontSize: 'clamp(3rem, 8vw, 10rem)' }}
          >
            {["LET'S", 'CREATE', 'SOMETHING', 'REMARKABLE'].map((word, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Refined description - no repetition */}
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="font-sans text-xl lg:text-2xl text-gray-300 mb-6 leading-relaxed font-light">
              Ready to build cultural momentum? Let&apos;s explore the dimensions of possibility and create
              experiences that resonate.
            </p>
          </motion.div>
        </div>

        {/* Middle Section: Features Grid & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 lg:mb-32">
          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {features.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="mb-4 text-white/60 group-hover:text-accent transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans text-sm uppercase tracking-[0.15em] mb-2 font-medium text-white">
                    {feature.label}
                  </h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col justify-center gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link href="/contact" className="group relative inline-block overflow-hidden" onClick={handleCTAClick}>
              <motion.div
                className="px-10 py-5 bg-accent text-white text-center text-sm uppercase tracking-[0.2em] relative z-10 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Start a Project</span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  Start a Project
                </span>
              </motion.div>
            </Link>

            <motion.a
              href="mailto:connect.surfacetension@gmail.com"
              className="group px-10 py-5 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-center text-sm uppercase tracking-[0.2em] relative overflow-hidden font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Email Us</span>
            </motion.a>

            {/* Connect With Us Link */}
            <Link
              href={homeData.connectLink || '/contact'}
              className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors group font-sans text-sm uppercase tracking-[0.15em] font-medium pt-4"
            >
              <span>Connect With Us</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Footer Section */}
        <motion.footer
          className="border-t border-white/10 pt-16 lg:pt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 mb-16">
            {/* Column 1: Brand Info with Logo */}
            <div className="md:col-span-2">
              <div className="mb-8">
                {/* Surface Tension Logo */}
                <div className="mb-8 inline-block">
                  <Logo className="w-16 h-16" variant="inline" position="left" />
                </div>
                <p className="font-sans text-base text-white/70 leading-relaxed mb-6 max-w-md font-light">
                  Multi-dimensional experiential brand. Where dimensions connect through invisible forces.
                </p>
              </div>
            </div>

            {/* Column 2: Work */}
            <div>
              <h4 className="font-sans text-sm uppercase tracking-[0.15em] mb-6 text-white font-medium">Work</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Featured', href: '/work' },
                  { label: 'Experiential', href: '/work?category=experiential' },
                  { label: 'Digital', href: '/work?category=digital' },
                  { label: 'Content', href: '/work?category=content' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/50 hover:text-accent transition-colors uppercase tracking-[0.1em] font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="font-sans text-sm uppercase tracking-[0.15em] mb-6 text-white font-medium">Resources</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Studio', href: '/studio' },
                  { label: 'Case Studies', href: '/work' },
                  { label: 'Insights', href: '/insights' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/50 hover:text-accent transition-colors uppercase tracking-[0.1em] font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Company & Social */}
            <div>
              <h4 className="font-sans text-sm uppercase tracking-[0.15em] mb-6 text-white font-medium">Company</h4>
              <ul className="space-y-3 mb-8">
                {[
                  { label: 'About', href: '/studio' },
                  { label: 'Capabilities', href: '/#capabilities' },
                  { label: 'Careers', href: '/careers' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/50 hover:text-accent transition-colors uppercase tracking-[0.1em] font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Icons */}
              <div className="flex gap-3">
                {homeData.socials?.map((social) => {
                  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                    Instagram: InstagramIcon,
                    TikTok: TikTokIcon,
                    X: TwitterIcon,
                    Twitter: TwitterIcon,
                    Facebook: FacebookIcon,
                  };

                  const Icon = iconMap[social.label] || null;
                  if (!Icon) return null;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 hover:border-accent hover:bg-accent/10 flex items-center justify-center text-white/50 hover:text-accent transition-all group"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-white/30 font-light">
              © {new Date().getFullYear()} Surface Tension LLC. All rights reserved.
            </p>
            <p className="font-sans text-xs text-white/30 font-light">
              Created by{' '}
              <a
                href="https://pratt.work"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                pratt.work
              </a>
            </p>
          </div>

          {/* Easter egg */}
          <motion.div
            className="mt-12 text-center text-xs text-white/10 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 2 }}
          >
            &quot;Where dimensions connect through invisible forces&quot;
          </motion.div>
        </motion.footer>
      </div>
    </section>
  );
}
