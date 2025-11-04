'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Capability {
  id: string;
  title: string;
  description: string;
  services: string[];
  icon: string;
  media?: {
    type: 'image' | 'video' | 'lottie';
    src: string;
  };
  accent: string;
}

interface CapabilitiesProps {
  capabilities?: Capability[];
}

export function Capabilities({ capabilities = defaultCapabilities }: CapabilitiesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white text-black overflow-hidden py-32 lg:py-48">
      {/* Subtle animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="mb-32 lg:mb-48">
          <motion.div
            className="inline-block mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="h-[2px] bg-black" />
          </motion.div>
          
          {/* Large heading - Inter font */}
          <h2 className="font-sans text-8xl lg:text-[14rem] leading-[0.8] mb-12 tracking-tight font-light">
            CAPABILITIES
          </h2>
          
          <motion.p
            className="font-sans text-2xl lg:text-4xl text-gray-600 max-w-4xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Four interconnected verticals that create comprehensive brand experiences.
          </motion.p>
        </div>

        {/* Large grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 bg-black/5">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={capability.id}
              capability={capability}
              index={index}
              isActive={activeIndex === index}
              isHovered={hoveredId === capability.id}
              onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
              onHover={(id) => setHoveredId(id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  capability,
  index,
  isActive,
  isHovered,
  onToggle,
  onHover,
  onLeave,
}: {
  capability: Capability;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onToggle: () => void;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      className="relative bg-white p-16 lg:p-20 overflow-hidden group cursor-pointer"
      onMouseEnter={() => onHover(capability.id)}
      onMouseLeave={onLeave}
      onClick={onToggle}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Accent border */}
      <motion.div
        className="absolute inset-0 border-[2px] pointer-events-none"
        style={{ borderColor: capability.accent }}
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.99 }}
        transition={{ duration: 0.5 }}
      />

      {/* Looping video background */}
      <AnimatePresence>
        {isActive && capability.media && (
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            {capability.media.type === 'video' && (
              <video
                src={capability.media.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            {capability.media.type === 'image' && (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${capability.media.src})` }}
              />
            )}
            {capability.media.type === 'lottie' && (
              <div className="w-full h-full bg-accent/10 rounded" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        {/* Large title - Inter */}
        <h3 className="font-sans text-5xl lg:text-7xl leading-[1.1] mb-8 flex items-center justify-between font-light tracking-tight">
          <span style={{ color: isActive ? capability.accent : 'black' }}>{capability.title}</span>
          <motion.span
            className="text-4xl font-light"
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.5 }}
          >
            +
          </motion.span>
        </h3>

        {/* Large description - Inter */}
        <motion.p
          className="font-sans text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10 font-light"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isActive ? 'auto' : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {capability.description}
        </motion.p>

        {/* Services - Larger */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {capability.services.map((service, i) => (
                <motion.div
                  key={service}
                  className="px-5 py-3.5 bg-black/5 text-sm uppercase tracking-[0.15em] text-center hover:bg-black hover:text-white transition-all duration-300 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                >
                  {service}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const defaultCapabilities: Capability[] = [
  {
    id: 'experiential',
    title: 'EXPERIENTIAL',
    description:
      'Large-scale events, installations, and brand activations that create cultural moments and lasting impressions.',
    services: ['Event Production', 'Pop-Up Experiences', 'Brand Activations', 'Immersive Installations'],
    icon: '/animations/experiential-icon.json',
    media: {
      type: 'video',
      src: '/capabilities/experiential-showcase.mp4',
    },
    accent: '#FF4500',
  },
  {
    id: 'content',
    title: 'CONTENT',
    description:
      'High-impact content across all formats: film, photography, VR/AR, and interactive experiences that tell your story.',
    services: ['Film Production', 'Photography', 'VR/AR Content', '3D Design', 'Motion Graphics'],
    icon: '/animations/content-icon.json',
    media: {
      type: 'video',
      src: '/capabilities/content-showcase.mp4',
    },
    accent: '#00FFFF',
  },
  {
    id: 'digital',
    title: 'DIGITAL',
    description:
      'Websites, apps, and digital products that push boundaries, deliver results, and create memorable user experiences.',
    services: ['Web Development', 'App Development', 'E-Commerce', 'WebGL/3D Experiences', 'AI Integration'],
    icon: '/animations/digital-icon.json',
    media: {
      type: 'video',
      src: '/capabilities/digital-showcase.mp4',
    },
    accent: '#FFFF00',
  },
  {
    id: 'strategy',
    title: 'STRATEGY',
    description:
      'Cultural insights and strategic thinking that informs every decision, ensuring your brand stays ahead of the curve.',
    services: ['Brand Strategy', 'Cultural Analysis', 'Trend Forecasting', 'Creative Direction', 'Market Intelligence'],
    icon: '/animations/strategy-icon.json',
    media: {
      type: 'video',
      src: '/capabilities/strategy-showcase.mp4',
    },
    accent: '#FF00FF',
  },
];
