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
  // Allow dev origin for local network testing / HMR
  allowedDevOrigins: ['10.157.136.1', 'localhost:3000'],
  async rewrites() {
    return [
      {
        source: '/jasa-website-:location',
        destination: '/jasa-website/:location',
      },
    ];
  },
};

export default nextConfig;
