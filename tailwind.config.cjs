/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./404.html", "./assets/app.js"],
  safelist: [
    "animate-fade-up", "animate-fade-left", "animate-fade-right", "animate-jump-in",
    "animate-once", "animate-fill-both", "animate-duration-700",
    "animate-delay-100", "animate-delay-200", "animate-delay-300",
    "animate-delay-500", "animate-delay-700"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"]
      },
      colors: {
        cream: "#F7F5F0",
        paper: "#FFFEFB",
        ink: "#14211D",
        forest: "#1F5A4A",
        mint: "#DDF1E9",
        cobalt: "#2756FF",
        sand: "#E9E3D8",
        copper: "#C67C52"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(20, 33, 29, 0.10)",
        card: "0 14px 40px rgba(20, 33, 29, 0.08)"
      }
    }
  },
  plugins: [require("tailwindcss-animated")]
};
