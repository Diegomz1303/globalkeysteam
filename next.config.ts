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
      // Agrega aquí cualquier otro dominio de donde saques las URLs de las imágenes (ej. 'i.imgur.com')
      {
        protocol: 'https',
        hostname: '**', // Permite todas (útil en desarrollo, restringe esto en producción si lo deseas)
      }
    ],
  },
};

export default nextConfig;