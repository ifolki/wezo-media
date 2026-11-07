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
          orange: "#F97316",
          red: "#E63B35",
          pink: "#E63B35",
          dark: "#101827",
          secondary: "#20242D",
          card: "#20242D",
          light: "#F5F6F8",
        },
        text: {
          primary: "#F5F6F8",
          muted: "#9CA3AF",
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
