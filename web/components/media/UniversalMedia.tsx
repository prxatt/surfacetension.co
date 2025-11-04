'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// Lottie support - add when assets are available
import ReactPlayer from 'react-player';
import { MediaAsset, MediaLayerConfig } from '@/lib/media/types';
import { cn } from '@/lib/utils';

interface UniversalMediaProps {
  config: MediaLayerConfig;
  className?: string;
  priority?: boolean;
}

export function UniversalMedia({ config, className, priority = false }: UniversalMediaProps) {
  const { asset, layerIndex, behavior, animation, interactions } = config;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    behavior === 'parallax' ? [100, -100] : [0, 0]
  );

  // Base animation variants
  const baseVariants = {
    initial: {
      opacity: 0,
      scale: animation?.type === 'scale' ? 0.9 : 1,
      y: animation?.type === 'slide' ? 50 : 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: animation?.duration || 0.6,
        delay: animation?.delay || 0,
        ease: animation?.easing || 'easeOut',
      },
    },
    hover: interactions?.hover
      ? {
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeInOut' },
        }
      : {},
    expanded: {
      scale: 1.5,
      zIndex: 100,
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  const handleClick = () => {
    if (interactions?.click && behavior === 'click-expand') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        className={cn('relative overflow-hidden', className)}
        style={{
          y: behavior === 'parallax' ? parallaxY : 0,
          zIndex: layerIndex,
        }}
        variants={baseVariants}
        initial="initial"
        whileInView="animate"
        whileHover={isHovered ? 'hover' : undefined}
        viewport={{ once: true, margin: '-100px' }}
        onMouseEnter={() => interactions?.hover && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {asset.type === 'image' && (
          <ImageLayer asset={asset} priority={priority} isHovered={isHovered} />
        )}
        {asset.type === 'video' && (
          <VideoLayer asset={asset} autoPlay={behavior === 'hover-activate' && isHovered} />
        )}
        {asset.type === 'gif' && <GifLayer asset={asset} />}
        {asset.type === 'lottie' && (
          <LottieLayer asset={asset} play={behavior === 'hover-activate' ? isHovered : true} />
        )}
        {asset.type === 'model3d' && <Model3DLayer asset={asset} />}
        {asset.type === 'interactive' && (
          <InteractiveLayer asset={asset} isHovered={isHovered} />
        )}

        {/* Caption overlay */}
        {asset.caption && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-white/90">{asset.caption}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Expanded View (Layered, not popup) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {asset.type === 'image' && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset.src}
                  alt={asset.alt || ''}
                  className="w-full h-full object-contain"
                />
              )}
              {asset.type === 'video' && (
                <div className="relative aspect-video w-full">
                  <ReactPlayer
                    url={asset.src}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white hover:text-accent transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Individual layer components
function ImageLayer({
  asset,
  priority,
  isHovered,
}: {
  asset: MediaAsset;
  priority: boolean;
  isHovered: boolean;
}) {
  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.src}
        alt={asset.alt || ''}
        className={cn(
          'w-full h-full object-cover transition-all duration-700',
          isHovered && 'scale-105 brightness-110'
        )}
      />
      {/* Subtle overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}

function VideoLayer({ asset, autoPlay }: { asset: MediaAsset; autoPlay: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (autoPlay) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [autoPlay]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={asset.src}
        poster={asset.poster}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function GifLayer({ asset }: { asset: MediaAsset }) {
  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset.src} alt={asset.alt || ''} className="w-full h-full object-cover" />
    </div>
  );
}

function LottieLayer({ asset, play }: { asset: MediaAsset; play: boolean }) {
  // Lottie support - add when assets are available
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-accent/10 rounded">
      <span className="text-white/60 text-sm">Lottie animation</span>
    </div>
  );
}

function Model3DLayer({ asset }: { asset: MediaAsset }) {
  return (
    <div className="relative w-full h-full">
      <model-viewer
        src={asset.src}
        alt={asset.alt}
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

function InteractiveLayer({ asset, isHovered }: { asset: MediaAsset; isHovered: boolean }) {
  // Custom interactive content (could be SVG animations, Canvas, etc.)
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="text-white font-display text-4xl"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Interactive Element
      </motion.div>
    </div>
  );
}
