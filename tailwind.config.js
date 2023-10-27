/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["var(--font-head)"],
        body: ["var(--font-body)"],
      },
      colors: {
        primary: "#E6A631",
        secondary: "#E6A631",
        dark: "#1E2225",
      },
      maxHeight: {
        desktop: "1440px",
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      xxl: "1.563rem",
      "3xl": "2rem",
      big: "4rem",
    },
  },
  plugins: [],
};
