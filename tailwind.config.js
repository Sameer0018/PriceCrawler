/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  // enable dark mode via class strategy
  darkMode: 'class',

  theme: {
      extend: {
          colors: {
              background: "#daefef",
              "brand-white": "#e9f8f9",
              "brand-dark-gray": "#91b1b6",
              "brand-black": "#243437",
              "indicator-red": "#fa473c",
              "brand-green-selected": "#117575",
              powderblue: "#c9eaea",
              "brand-green-deselected": "#acd8d8",
              white: "#fff",
              "brand-gray": "#dbedec",
            },
          borderRadius: {
              xl: "20px",
              "11xl": "30px",
            },
          },
          fontSize: {
            lg: "18px",
            "5xl": "24px",
            base: "16px",
            inherit: "inherit",
          },
        },
          
}
