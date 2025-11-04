'use client';

import config from '@/content/carousel.json';

export default function PrivateCarouselPage() {
  const enabled = (config as any).enabled === true;
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-custom py-16">
        <h1 className="font-display text-4xl">Private Carousel</h1>
        {!enabled && (
          <p className="mt-3 text-white/60">Hidden. Set "enabled": true in content/carousel.json to view locally.</p>
        )}
        {enabled && (
          <div className="mt-10 space-y-6">
            {(config as any).slides?.map((s: any, i: number) => (
              <div key={i} className="border border-white/10 p-4">
                {s.type === 'video' && (
                  <video
                    src={s.src}
                    poster={s.poster}
                    controls
                    muted={!!s.muted}
                    autoPlay={!!s.autoplay}
                    playsInline
                    className="w-full h-auto"
                  />
                )}
                {s.type === 'image' && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.src} alt="slide" className="w-full h-auto" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

