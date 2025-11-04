'use client';

import config from '@/content/carousel.json';

interface Slide {
  type: 'video' | 'image';
  src: string;
  poster?: string;
  muted?: boolean;
  autoplay?: boolean;
}

interface CarouselConfig {
  enabled: boolean;
  title?: string;
  slides?: Slide[];
}

export default function PrivateCarouselPage() {
  const typedConfig = config as CarouselConfig;
  const enabled = typedConfig.enabled === true;
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-custom py-16">
        <h1 className="font-display text-4xl">Private Carousel</h1>
        {!enabled && (
          <p className="mt-3 text-white/60">Hidden. Set "enabled": true in content/carousel.json to view locally.</p>
        )}
        {enabled && (
          <div className="mt-10 space-y-6">
            {typedConfig.slides?.map((slide, i) => (
              <div key={i} className="border border-white/10 p-4">
                {slide.type === 'video' && (
                  <video
                    src={slide.src}
                    poster={slide.poster}
                    controls
                    muted={!!slide.muted}
                    autoPlay={!!slide.autoplay}
                    playsInline
                    className="w-full h-auto"
                  />
                )}
                {slide.type === 'image' && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={slide.src} alt="slide" className="w-full h-auto" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

