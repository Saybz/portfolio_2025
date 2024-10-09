/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["var(--font)"],
        body: ["var(--font-body)"],
      },
      colors: {
        primary: "#7881F5",
        secondary: "#F5C378",
        dark: "#334155",
        light: "#F5EFE6",
        lightbody: "#F5EFE6",
        strokeline: "#B9B9B9",
      },
      maxWidth: {
        main: "1440px",
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
      big: "4rem",
      name: "36vw",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
  },
  plugins: [],
};
