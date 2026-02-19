import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- ¡ESTA LÍNEA ES VITAL!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlobalKeySteam",
  description: "Tienda de Keys digitales",
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