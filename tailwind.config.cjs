module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}", // ← add this if needed
    ],
    theme: {
      extend: {
        lineClamp: {
          3: '3',
          2: '2',
          1: '1'
        },
      }
    },
    plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
  }