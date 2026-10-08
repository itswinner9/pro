import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
          DEFAULT: "#0a1a72",
          foreground: "#FFFFFF",
        },
        "background-light": "#f8f6f6",
        "background-dark": "#0b0b0b",
        "surface-dark": "#161616",
        "border-dark": "#2d2d2d",
        "accent-gold": "#C5A059",
        "bg-off-white": "#FAF9F6",
        background: "#0b0b0b",
        dark: "#1a1a1a",
        success: "#16A34A",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        display: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        heading: ["var(--font-syncopate)", "Syncopate", "sans-serif"],
        quantum: ["var(--font-syncopate)", "Syncopate", "sans-serif"],
      },
      boxShadow: {
        "primary-glow": "0 0 40px -10px rgba(10, 26, 114, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
