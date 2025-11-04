'use client';

interface IconProps {
  className?: string;
}

// Premium, unique icons with distinctive designs
export function StrategicVisionIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Unique vision/strategy icon - layered perspective */}
      <path d="M12 3L2 8l10 5 10-5-10-5z" />
      <path d="M2 12l10 5 10-5" opacity="0.7" />
      <path d="M2 16l10 5 10-5" opacity="0.4" />
      <path d="M12 12l4-4 4 4-4 4-4-4z" strokeWidth={1} />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function CreativeExcellenceIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Creative/design icon - palette with brush strokes representing artistry */}
      {/* Palette base */}
      <path d="M12 3L6 7v10l6 4 6-4V7l-6-4z" />
      {/* Brush handle */}
      <path d="M18 8l4 4v4l-4 4" strokeWidth={1.2} />
      {/* Color dots on palette */}
      <circle cx="10" cy="10" r="1.2" fill="currentColor" opacity="0.8" />
      <circle cx="14" cy="10" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" opacity="0.7" />
      {/* Brush strokes/creative marks */}
      <path d="M20 12l-2 2M20 14l-2 2M20 16l-2 2" strokeWidth={1} opacity="0.5" />
    </svg>
  );
}

export function InnovationFirstIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Unique innovation/tech icon - circuit/network design */}
      <path d="M3 12h18M12 3v18" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" strokeWidth={1} opacity="0.4" />
      <path d="M8 4v4M16 4v4M8 16v4M16 16v4M4 8h4M4 16h4M16 8h4M16 16h4" strokeWidth={1} opacity="0.3" />
    </svg>
  );
}

export function GlobalReachIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Unique global/network icon - connected nodes design */}
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" opacity="0.6" />
      <path d="M2 12h20" opacity="0.4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="6" cy="8" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="18" cy="8" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="6" cy="16" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="18" cy="16" r="1" fill="currentColor" opacity="0.6" />
      <path d="M6 8l6 4 6-4M6 16l6-4 6 4" strokeWidth={0.5} opacity="0.3" />
    </svg>
  );
}
