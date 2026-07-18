/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft, feminine palette — dusty rose, blush, warm plum
        gold: {
          DEFAULT: "#c48ba3",
          light: "#e0b7c8",
          dark: "#a86682",
        },
        rose: {
          DEFAULT: "#c48ba3",
          light: "#f3dfe7",
          dark: "#a86682",
        },
        beige: {
          DEFAULT: "#fdf5f4",
          dark: "#f1dfe1",
        },
        ink: "#5b4750",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
        arabic: ["Cairo", "Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
