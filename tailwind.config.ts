import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Estas rutas deben coincidir EXACTAMENTE con tu estructura de carpetas
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}" // Línea de seguridad extra
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF6600',
        'brand-dark': '#0F0F0F',
        'brand-gray': '#1A1A1A',
      },
    },
  },
  plugins: [],
};
export default config;