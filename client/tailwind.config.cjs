/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#F5F7FA", 
        primary: "#8884d8",
        hover_menu: "#EFF2F6",
        black_500: "#141824",
        current: '#8884d8',
        last: '#82ca9d',
        view: '#D9FBD0',
        head: "#2b3445",
      },
      fontSize :{
        ph: '13px'
      },
      transitionDuration: {
        '0': '0ms',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require("@tailwindcss/forms"),
  ],
}
