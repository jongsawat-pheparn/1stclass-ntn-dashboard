/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0A2540',
        'secondary': '#0096C7',
        'accent': '#E0F7FA',
        'bg-sub': '#F0F4F8',
        'text-main': '#212529',
        'text-sub': '#5A6B7C',
      },
      borderRadius: {
        'card': '16px',
        'btn': '12px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.05)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.10)',
        'btn': '0 2px 8px rgba(0,150,199,0.3)',
      },
    },
  },
  plugins: [],
};