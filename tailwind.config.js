/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E91E63",
          dark: "#C2185B",
        },
        hybrid: {
          pink: "#E91E63",
          purple: "#9C27B0",
          indigo: "#0c0a1d",
          dark: "#070617",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  keyframes: {
    orbit: {
      "0%": {
        transform: "rotate(var(--start-angle)) translateX(var(--orbit-radius))",
      },
      "100%": {
        transform:
          "rotate(calc(var(--start-angle) + 360deg)) translateX(var(--orbit-radius))",
      },
    },
    pulse: {
      "0%, 100%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.05)" },
    },
  },
  animation: {
    orbit: "orbit var(--orbit-speed) linear infinite",
    pulse: "pulse 3s ease-in-out infinite",
  },
  plugins: [],
};
