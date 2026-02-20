import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- ¡ESTA LÍNEA ES VITAL!

const inter = Inter({ subsets: ["latin"] });

// METADATOS PROFESIONALES PARA SEO Y REDES SOCIALES
export const metadata: Metadata = {
  // 👇 AQUÍ ESTÁ LA LÍNEA NUEVA QUE SOLUCIONA EL WARNING
  metadataBase: new URL("https://globalkeysteam.com"), // Cambia esto por tu dominio real cuando lo tengas
  
  title: "GlobalKeySteam - Steam Keys al Instante",
  description: "La tienda de Steam Keys más rápida y segura de Latinoamérica. Juegos de PC baratos y entrega inmediata 24/7.",
  openGraph: {
    title: "GlobalKeySteam - Tus Juegos Al Instante",
    description: "Compra tus juegos favoritos de Steam a los mejores precios. ¡Entrega inmediata garantizada!",
    url: "https://globalkeysteam.com", // Cambia esto por tu dominio real cuando lo tengas
    siteName: "GlobalKeySteam",
    images: [
      {
        url: "/logo.png", // Next.js detectará tu logo en la carpeta public
        width: 1200,
        height: 630,
        alt: "GlobalKeySteam Banner Oficial",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalKeySteam - Steam Keys al Instante",
    description: "La tienda de Steam Keys más rápida y segura.",
    images: ["/logo.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}