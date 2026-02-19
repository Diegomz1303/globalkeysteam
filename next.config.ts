import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com', // Servidor de imágenes de Steam
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;