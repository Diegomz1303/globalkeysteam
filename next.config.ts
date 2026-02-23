import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.akamai.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'store.steampowered.com',
      },
      
      {
        protocol: 'https',
        hostname: '**', 
      }
    ],
  },
};

export default nextConfig;