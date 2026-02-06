import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A1A72",
          foreground: "#FFFFFF",
        },
        'accent-gold': "#C5A059",
        'bg-off-white': "#FAF9F6",
        background: "#FAF9F6",
        dark: "#1a1a1a",
        success: "#16A34A",
      },
      borderRadius: {
        lg: "24px",
        md: "16px",
        sm: "8px",
        '3xl': "3rem",
      },
      fontFamily: {
        quantum: ['Syncopate', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

