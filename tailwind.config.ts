import type { Config } from "tailwindcss"

const config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      screens: {
        'sideBarScreen': '350px',
      },
      boxShadow: {
        'input_shadown': '0 0 10px 0 ',
        'shadown_hover': '1px 1px 3px 0 ',
      },
      colors: {
        blue:{
         1: '#11cdef'
        },
        blur_bg: 'rgba(0, 0, 0, 0.6)',
        blur_bg_white: 'rgba(255, 255, 255, 19%)',
        dark: {
          bg: "#051139",
          bg_2: "#111c44",
          text: "#fff",
          textSoft: "#b7bac1",
          error: "#CF6679",
          primaryColor: "#BB86FC",
          secondaryColor: "#03DAC6",
          primaryColorVariant: "#3700B3",
        },
        light: {
          bg: "#dfe2e4",
          bg_2: "#fff",
          text: "#000000",
          textSoft: "#b7bac1",
          error: "#B00020",
          primaryColor: "#6200EE",
          secondaryColor: "#03DAC6",
          primaryColorVariant: "#3700B3",
        },
      },
      spacing: {
        headerHeight: '80px', // Thay đổi giá trị này để điều chỉnh độ dài header
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
