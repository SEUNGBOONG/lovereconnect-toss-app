import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        "main-pink": "var(--color-main-pink)",
      },
      keyframes: {
        heartPulse: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.4)", opacity: "0.3" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        "heart-pulse": "heartPulse 1.6s ease-out infinite",
      },
    },
  },
  darkMode: "media",
  plugins: [animate],
};

export default config;
