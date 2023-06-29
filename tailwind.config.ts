import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["matrice", "system-ui", "sans-serif"],
      second: ["proto", "system-ui", "sans-serif"],
      emphasis: ["yapari-trial", "system-ui", "sans-serif"],
      supplement: ["din", "system-ui", "sans-serif"],
    },
    extend: {
      zIndex: {
        "100": "100",
      },
      colors: {
        primary: "#c4fa00",
        second: "#ff91af",
        dark: "#453f3c",
        light: "#F8F2E6",
        darkGray: "#898989",
        bronze: "#c9a063",
        pink:"#FF91AF",
        green:"#C4FA00",
      },
      width: {
        '320': '320px'
      },
      height: {
        '320': '320px',
        '100': '100%'
      },
      maxHeight: {
        '500': '500px',
        '600': '600px'
      }
    },
  },
  variants: {
    extend: {
      objectFit: ["responsive"],
    },
  },
  plugins: [],
} satisfies Config;
