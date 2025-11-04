/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'interaction-prompt'?: 'auto' | 'when-focused' | 'none';
        'exposure'?: string;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        'skybox-image'?: string;
        'ar'?: boolean;
        'ar-modes'?: string;
        'ar-scale'?: string;
        'ios-src'?: string;
        'poster'?: string;
        'loading'?: 'auto' | 'lazy' | 'eager';
        'reveal'?: 'auto' | 'interaction' | 'manual';
        'animation-name'?: string;
        'animation-crossfade-duration'?: string;
      },
      HTMLElement
    >;
  }
}

