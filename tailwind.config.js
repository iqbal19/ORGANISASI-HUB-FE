module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      neutral: {
        100: "#FFFFFF",
        200: "#F2F2F2",
        300: "#E5E5E5",
        400: "#CCCCCC",
        500: "#B3B3B3",
        600: "#808080",
        700: "#595959",
        800: "#333333",
        900: "#2b2b2b",
      },
      primary: {
        DEFAULT: "#3686FF",
        light: "#DFEEFF",
        "semi-dark": "#2C70CC",
        dark: "#2457A8",
      },
      secondary: {
        DEFAULT: "#6c757d",
        light: "#DEE4E8",
        "semi-dark": "#555D64",
        dark: "#3C4349",
      },
      danger: {
        DEFAULT: "#E55151",
        light: "#F6DBDB",
        "semi-dark": "#B04141",
        dark: "#802F2F",
      },
      warning: {
        DEFAULT: "#FFB936",
        light: "#FFF2D4",
        "semi-dark": "#CC942B",
        dark: "#996F21",
      },
      success: {
        DEFAULT: "#6DE271",
        light: "#DBF5E0",
        "semi-dark": "#57B75B",
        dark: "#3E8A44",
      },
      info: {
        DEFAULT: "#17a2b8",
        light: "#D6F2F7",
        "semi-dark": "#128597",
        dark: "#0C6070",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
