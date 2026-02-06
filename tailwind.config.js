/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        // Cinematic/Premium Palette can be defined here if needed
        // For now, reliance on standard palette + custom usage
      },
      animation: {
        'slow-spin': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
}
