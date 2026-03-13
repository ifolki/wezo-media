import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6B2B",
          pink: "#FF2D78",
          dark: "#0A0A0F",
        },
      },
      fontFamily: {
        tajawal: ['var(--font-tajawal)'],
        dmSans: ['var(--font-dm-sans)'],
        cairo: ['var(--font-cairo)'],
        syne: ['var(--font-syne)'],
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
}

export default config
