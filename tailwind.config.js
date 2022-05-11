module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'underwater': "url('/underwater.png')",
        'overwater': "url('/overwater.png')",
      }
  },
  plugins: [],
  },
}
