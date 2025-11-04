'use client';

import Link from 'next/link';

export default function DevIndex() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-custom py-16">
        <h1 className="font-display text-4xl mb-8">Dev Routes</h1>
        <div className="space-y-4">
          <Link href="/dev/work-preview" className="block text-accent hover:underline">
            /dev/work-preview
          </Link>
          <Link href="/dev/capabilities" className="block text-accent hover:underline">
            /dev/capabilities
          </Link>
          <Link href="/dev/contact-cta" className="block text-accent hover:underline">
            /dev/contact-cta
          </Link>
        </div>
        <p className="mt-8 text-white/60 text-sm">
          Note: Make sure you&apos;re using the Next.js dev server (npm run dev), not the Python HTTP server.
          <br />
          Next.js typically runs on port 3000 or 62860.
        </p>
      </div>
    </main>
  );
}

