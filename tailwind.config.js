/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        bone: "#f3ebdd",
        paper: "#faf6ee",
        pine: "#243a34",
        ink: "#242a27",
        mineral: "#637268",
        gold: "#826128",
        line: "#d8ccb8",
        "sage-panel": "#c8cec2",
        "forest-deep": "#192a25"
      },
      boxShadow: {
        soft: "0 24px 80px rgb(36 42 39 / 12%)",
        button: "0 12px 32px rgb(25 42 37 / 26%), 0 1px 0 rgb(245 229 189 / 18%) inset"
      }
    }
  },
  plugins: []
};
