import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'henryugochukwuporfolio-production.up.railway.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'henryugochukwuporfolio-production.up.railway.app'
      }
    ]
  }
};

export default nextConfig;
