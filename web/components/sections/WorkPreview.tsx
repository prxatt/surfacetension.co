'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { UniversalMedia } from '@/components/media/UniversalMedia';
import { MediaLayerConfig } from '@/lib/media/types';
import { cn } from '@/lib/utils';

interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  media: MediaLayerConfig[];
  tags: string[];
  accent: string;
  description?: string;
}

interface WorkPreviewProps {
  projects?: Project[];
}

export function WorkPreview({ projects = defaultProjects }: WorkPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current && sectionRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          y: 80,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white overflow-hidden py-32 lg:py-48">
      {/* Looping video background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-150"
          style={{ filter: 'blur(60px)' }}
        >
          <source src="/work/work-bg-loop.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-40 lg:mb-64">
          <motion.div
            className="inline-block mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="h-[2px] bg-accent" />
          </motion.div>
          
          {/* Brand name only in Ivy Presto, rest in Inter */}
          <h2 className="font-display text-8xl lg:text-[14rem] leading-[0.8] mb-12 tracking-tight">
            SELECTED
            <br />
            <span className="text-accent">WORK</span>
          </h2>
          
          <motion.p
            className="font-sans text-2xl lg:text-4xl text-gray-300 max-w-4xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Case studies of cultural moments we&apos;ve created across experiential, digital, and content verticals.
          </motion.p>

          <Link
            href="/work"
            className="group inline-flex items-center gap-4 mt-16 text-lg uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors"
          >
            <span>View All Projects</span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </div>

        <div className="space-y-64 lg:space-y-96">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [200, -200] : [-200, 200]);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-300px' }}
      transition={{ duration: 1.5 }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center', isReversed && 'lg:grid-flow-dense')}>
          {/* Large looping video/media */}
          <div className={cn('lg:col-span-8', isReversed && 'lg:col-start-5')}>
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-950 group-hover:scale-[1.01] transition-transform duration-1000">
              {project.media[0] && (
                <UniversalMedia config={project.media[0]} className="w-full h-full" />
              )}

              {/* Looping video overlay on hover */}
              {project.media[1] && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <UniversalMedia config={project.media[1]} className="w-full h-full" />
                </div>
              )}

              {/* Animated accent border */}
              <motion.div
                className="absolute inset-0 border-[2px] pointer-events-none"
                style={{ borderColor: project.accent }}
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 0.995, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          {/* Large text content - Inter font */}
          <motion.div
            className={cn('lg:col-span-4', isReversed && 'lg:col-start-1 lg:row-start-1')}
            style={{ y: yOffset }}
          >
            {/* Year & Category - Large */}
            <div className="flex items-center gap-6 mb-10 text-lg uppercase tracking-[0.2em] text-gray-400 font-medium">
              <span className="font-sans text-2xl font-light">{project.year}</span>
              <span className="w-px h-6 bg-gray-600" />
              <span>{project.category}</span>
            </div>

            {/* Extra large project title - Inter */}
            <h3 className="font-sans text-5xl lg:text-7xl leading-[1.1] mb-8 group-hover:text-accent transition-colors font-light tracking-tight">
              {project.title}
            </h3>

            {/* Client - Large */}
            <p className="font-sans text-2xl lg:text-3xl text-gray-300 mb-10 font-light">{project.client}</p>

            {/* Description if available */}
            {project.description && (
              <p className="font-sans text-lg lg:text-xl text-gray-400 mb-10 leading-relaxed font-light">
                {project.description}
              </p>
            )}

            {/* Tags - Larger */}
            <div className="flex flex-wrap gap-3 mb-12">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2.5 text-sm uppercase tracking-[0.15em] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent transition-all font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Project Link - Larger */}
            <div className="flex items-center gap-4 text-lg uppercase tracking-[0.2em] group-hover:text-accent transition-colors font-medium">
              <span>View Case Study</span>
              <motion.svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 10 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

const defaultProjects: Project[] = [
  {
    slug: 'immersive-installation-2025',
    title: 'Immersive Installation',
    client: 'Surface Tension',
    category: 'Experiential',
    year: '2025',
    accent: '#FF4500',
    tags: ['3D', 'Interactive', 'Large-Scale', 'Music'],
    description: 'Our inaugural immersive experience featuring the Coffee Rave Series, creating cultural moments through music, community, and cutting-edge visual technology.',
    media: [
      {
        asset: {
          id: 'project-1-hero',
          type: 'video',
          src: '/work/immersive-installation-hero.mp4',
          poster: '/work/immersive-installation-poster.jpg',
          caption: 'Large-scale projection mapping installation with live music',
        },
        layerIndex: 1,
        behavior: 'hover-activate',
        animation: { type: 'fade', duration: 1 },
        interactions: { hover: true, click: true },
      },
      {
        asset: {
          id: 'project-1-coffee-rave',
          type: 'video',
          src: '/work/coffee-rave-series.mp4',
          poster: '/work/coffee-rave-poster.jpg',
          caption: 'Coffee Rave Series - Part of the Immersive Installation',
        },
        layerIndex: 2,
        behavior: 'hover-activate',
        animation: { type: 'scale', duration: 0.8 },
        interactions: { hover: true },
      },
    ],
  },
];
