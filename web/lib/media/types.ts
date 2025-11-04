export type MediaType = 'image' | 'video' | 'gif' | 'lottie' | 'model3d' | 'interactive';

export interface MediaAsset {
  id: string;
  type: MediaType;
  src: string;
  alt?: string;
  poster?: string; // For videos
  caption?: string;
  metadata?: {
    width?: number;
    height?: number;
    duration?: number; // For videos/animations
    fileSize?: number;
    format?: string;
  };
}

export interface MediaLayerConfig {
  asset: MediaAsset;
  layerIndex?: number; // Z-index in the dimensional stack
  behavior?: 'static' | 'parallax' | 'scroll-reveal' | 'hover-activate' | 'click-expand';
  animation?: {
    type?: 'fade' | 'slide' | 'scale' | 'morph' | 'custom';
    duration?: number;
    delay?: number;
    easing?: string;
  };
  interactions?: {
    hover?: boolean;
    click?: boolean;
    drag?: boolean;
    zoom?: boolean;
  };
}

