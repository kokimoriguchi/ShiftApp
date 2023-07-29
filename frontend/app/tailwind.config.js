/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "tracking-in-expand":
          "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        heartbeat: "heartbeat 1.5s ease  infinite both",
      },
      keyframes: {
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0",
          },
          "40%": {
            opacity: ".6",
          },
          to: {
            opacity: "1",
          },
        },
        heartbeat: {
          "0%": {
            transform: "scale(1)",
            "transform-origin": "center center",
            "animation-timing-function": "ease-out",
          },
          "10%": {
            transform: "scale(.91)",
            "animation-timing-function": "ease-in",
          },
          "17%": {
            transform: "scale(.98)",
            "animation-timing-function": "ease-out",
          },
          "33%": {
            transform: "scale(.87)",
            "animation-timing-function": "ease-in",
          },
          "45%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-out",
          },
        },
      },
    },
  },
  plugins: [],
};
