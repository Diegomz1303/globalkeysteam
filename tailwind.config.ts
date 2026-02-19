import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6600",
          dark: "#050505",
          card: "#121212",
        },
      },
    },
  },
  plugins: [],
};
export default config;