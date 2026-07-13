import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  devIndicators: {
    appIsrStatus: false,
  },
  // Allow dev origin for local network testing / HMR
  experimental: {
    allowedDevOrigins: ['10.157.136.1', 'localhost:3000'],
  }
};

export default nextConfig;
