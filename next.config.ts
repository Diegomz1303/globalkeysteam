import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // <--- Esta es la única línea nueva añadida para solucionar tu error
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