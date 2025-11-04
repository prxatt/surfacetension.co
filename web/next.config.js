/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizePackageImports: ['three', '@studio-freight/lenis']
  }
};

module.exports = nextConfig;

