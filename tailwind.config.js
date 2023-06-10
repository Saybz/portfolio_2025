/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: "var(--head)",
        body: "var(--body)",
      },
    },
  },
  plugins: [],
};
