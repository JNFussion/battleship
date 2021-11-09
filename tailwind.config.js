module.exports = {
  purge: {
    enabled: true,
    content: ["./src/index.html", "./src/index.js"],
    options: {
      keyframes: true,
      fontFace: true,
      variables: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "eerie-black": "#1B1B1B",
      "android-green": "#AACC00",
      "spanish-viridian": {
        DEFAULT: "#007F5F",
        dark: "#00291F",
      },
    },
    fontFamily: {
      roboto: [
        "Roboto",
        "ui-sans-serif",
        "system-ui",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
      ],
      "black-ops": ["Black Ops One", "cursive"],
      "press-start-2p": ["'Press Start 2P'", "cursive"],
    },
    extend: {
      gridTemplateRows: {
        11: "repeat(11, minmax(0, 1fr))",
      },
      gridColumnEnd: {
        "grid-end": "-1",
      },
      gridRowEnd: {
        "grid-end": "-1",
      },
      width: {
        "500px": "500px",
        "87.5%": "87.5%",
      },
      height: {
        "500px": "500px",
      },
      spacing: {
        120: "30rem",
        140: "35rem",
      },
      inset: {
        "1/10": "10%",
      },
      screens: {
        "4xl": "1920px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
