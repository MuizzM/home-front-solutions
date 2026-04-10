/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        slate: "#525252",
        line: "#E5E5E5",
        mist: "#FAFAFA",
        accent: "#000000",
        accentDeep: "#171717",
      },
      fontFamily: {
        sans: ["Inter", "'Segoe UI'", "Arial", "sans-serif"],
        display: ["Inter", "'Segoe UI'", "Arial", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
    },
  },
  plugins: [],
};
