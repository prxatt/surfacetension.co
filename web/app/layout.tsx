export const metadata = {
  title: 'Surface Tension',
  description: 'Where dimensions connect',
  icons: {
    icon: '/icon.svg',
  },
};

import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

// Load Inter font - used for all body text and headings
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload Ivy Presto for brand name only */}
        <link
          rel="preload"
          href="/fonts/IvyPresto-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

