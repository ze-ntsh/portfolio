import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        background: "#0a0a0a",
        accent: "#262626",
        "grid-line-color": "#838383",
        foreground: "#ffffff",
        "text-primary": "#ffffff",
        "text-secondary": "#c5c5c5",
        "text-inverse": "#000000",
        "nav-shadow": "0 0 10px #fff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
