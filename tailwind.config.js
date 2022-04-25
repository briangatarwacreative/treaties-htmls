/** Utility Classes path Based on gulpfile.js */

const defaultTheme = require("tailwindcss/defaultTheme");

const orange650 = "#c70a07";

module.exports = {
  content: [
    "../src/**/*.html",
    "../src/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        neutral: {
          250: "#e9e9e9",
          320: "#cecece",
          350: "#b2b2b2",
        },
        sky: {
          180: "#abe0ff",
          250: "#84C1E4",
          350: "#3f8fd0",
          430: "#3bade0",
          450: "#4791D4",
          950: "#004b72",
        },
        blue: {
          80: "#E4F4FD",
          150: "#D3EBFB",
          250: "#92c6f5",
          950: "#0061BE",
        },
        orange: {
          550: "#f54a2f",
          650: orange650,
        },
        primary: "#022435",
        secondary: orange650,
        info: "#006EA7",
        success: "#00b169",
        light: "#D2DCE8",
        dark: "#022435",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      letterSpacing: {
        widestX: "0.2em",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin")],
};
