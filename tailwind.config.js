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
        light: "#FFFFFF",
        lightbody: "#B9B9B9",
        strokeline: "#B9B9B9",
      },

      spacing: {
        vmain: "6rem",
      },
      maxHeight: {
        desktop: "1440px",
      },
      boxShadow: {
        stroke: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      xxl: "1.563rem",
      "3xl": "2rem",
      big: "5rem",
      name: "36vw",
    },
  },
  plugins: [],
};
