import type { Config } from "tailwindcss"

const config = {
  important: true,
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
        'main_shadow' : '3px 3px 4px 2px',
        'input_shadow': '0 0 10px 0 ',
        'button_shadow': '0 0 5px 0 ',
        'shadown_hover': '1px 1px 3px 0',
      },
      colors: {
        blue:{
         1: '#11cdef'
        },
        green:{
         1: '#2dce89'
        },
        red:{
         1: '#f5365c'
        },
        yellow:{
         1: '#ff9800'
        },
        purple: {
          1: '#5e72e4'
        },
        orange: {
          1: '#fb6340'
        },
        gray: {
          1: '#344767'
        },
        blur_bg: 'rgba(0, 0, 0, 0.6)',
        blur_bg_white: 'rgba(255, 255, 255, 19%)',
        dark: {
          bg: "#051139",
          bg_2: "#111c44",
          text: "#fff",
          textSoft: "#b7bac1",
          error: "#CF6679",
          success: "#1f7a33",
          warning: "#FFEB3B",
          primaryColor: "#BB86FC",
          secondaryColor: "#03DAC6",
          primaryColorVariant: "#3700B3",
        },
        light: {
          bg: "#eff4f7",
          bg_2: "#fff",
          text: "#000000",
          textSoft: "#4B2E2E",
          error: "#B00020",
          success: "#28a745",
          warning: "#FFC107",
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
