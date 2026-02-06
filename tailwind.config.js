/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./dream-team-preview.jsx",
    "./src/components/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FDF9F5",
          light: "#FEFCFA",
          warm: "#FBF7F2",
        },
        charcoal: {
          DEFAULT: "#0F0D0A",
          soft: "#1C1917",
          muted: "#44403C",
        },
        sage: {
          DEFAULT: "#A7BEAE",
          muted: "rgba(167, 190, 174, 0.15)",
          accent: "rgba(167, 190, 174, 0.2)",
        },
        terracotta: {
          DEFAULT: "#C19A6B",
          muted: "rgba(193, 154, 107, 0.12)",
          accent: "rgba(193, 154, 107, 0.2)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "EB Garamond", "Georgia", "serif"],
        sans: ["Inter Tight", "system-ui", "sans-serif"],
        script: ["Dancing Script", "cursive"],
      },
      letterSpacing: {
        "serif-tight": "-0.04em",
        "serif-tighter": "-0.02em",
      },
      fontSize: {
        "hero": ["clamp(3.5rem, 10vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "section": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "section": "20rem",
        "section-lg": "32rem",
        "gap-xl": "4rem",
        "gap-2xl": "6rem",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        "radial-soft": "radial-gradient(ellipse 80% 80% at 50% 50%, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)",
      },
      animation: {
        "breathe": "breathe 8s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
