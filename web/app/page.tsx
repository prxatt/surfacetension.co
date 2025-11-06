'use client';

import { useEffect } from 'react';
import CinematicBackground from '@/components/quantum/CinematicBackground';
import { Logo } from '@/components/ui/Logo';
import { ContactCTA } from '@/components/sections/ContactCTA';
import home from '@/content/home.json';

interface HomeData {
  title: string;
  subtitle: string;
  titleAlign: {
    justify: string;
    align: 'center' | 'left' | 'right';
    offsetY: number;
  };
  connectLink: string;
  socials: { label: string; href: string }[];
}

export default function HomePage() {
  const homeData: HomeData = home as HomeData;

  // Prevent scroll jump to ContactCTA
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="relative min-h-screen bg-black">
        {/* Surface Tension Logo - Fixed top-left, links to homepage */}
        <Logo position="left" />

        <CinematicBackground />

        <div
          className="relative z-10 flex min-h-screen items-center"
          style={{ justifyContent: homeData.titleAlign?.justify || 'center' }}
        >
          <div
            className="select-none pointer-events-none px-6"
            style={{
              width: '100%',
              textAlign: homeData.titleAlign?.align || 'center',
              transform: `translateY(${homeData.titleAlign?.offsetY || 0}px)`,
            }}
          >
            {/* Brand name ONLY in Ivy Presto */}
            <h1 className="font-display text-display tracking-tight">{homeData.title}</h1>
            {homeData.subtitle && (
              <p className="mt-6 uppercase tracking-[0.2em] text-white/60 font-sans font-light w-fit max-w-[80vw] mx-auto text-[clamp(0.75rem,1.5vw,1rem)]">
                {homeData.subtitle}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* ContactCTA Section - Now part of the landing page */}
      <ContactCTA />
    </>
  );
}
