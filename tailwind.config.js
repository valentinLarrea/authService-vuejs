/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#103754",
        secondary: "97d3cb",
        text: "#f17961",
        accent: "fece8c",
      }
    },
  },
  plugins: [],
}

