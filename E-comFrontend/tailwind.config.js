// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {  lg: { max: "2600px"  ,min:"1051px"} ,md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        amber: { 500: "var(--amber_500)", "500_01": "var(--amber_500_01)" },
        black: {
          900: "var(--black_900)",
          "900_01": "var(--black_900_01)",
          "900_19": "var(--black_900_19)",
        },
        blue: { 700: "var(--blue_700)", a200: "var(--blue_a200)" },
        blue_gray: {
          100: "var(--blue_gray_100)",
          200: "var(--blue_gray_200)",
          300: "var(--blue_gray_300)",
          400: "var(--blue_gray_400)",
          600: "var(--blue_gray_600)",
          700: "var(--blue_gray_700)",
          800: "var(--blue_gray_800)",
          900: "var(--blue_gray_900)",
          "100_01": "var(--blue_gray_100_01)",
          "200_01": "var(--blue_gray_200_01)",
          "900_01": "var(--blue_gray_900_01)",
          "900_0c": "var(--blue_gray_900_0c)",
        },
        gray: {
          50: "var(--gray_50)",
          100: "var(--gray_100)",
          200: "var(--gray_200)",
          300: "var(--gray_300)",
          400: "var(--gray_400)",
          500: "var(--gray_500)",
          600: "var(--gray_600)",
          800: "var(--gray_800)",
          "100_01": "var(--gray_100_01)",
          "200_01": "var(--gray_200_01)",
          "200_02": "var(--gray_200_02)",
          "300_01": "var(--gray_300_01)",
          "300_02": "var(--gray_300_02)",
          "400_01": "var(--gray_400_01)",
          "500_01": "var(--gray_500_01)",
          "500_02": "var(--gray_500_02)",
          "600_01": "var(--gray_600_01)",
          "600_99": "var(--gray_600_99)",
          "800_01": "var(--gray_800_01)",
          "800_02": "var(--gray_800_02)",
        },
        green: {
          400: "var(--green_400)",
          600: "var(--green_600)",
          700: "var(--green_700)",
          800: "var(--green_800)",
          900: "var(--green_900)",
          "600_01": "var(--green_600_01)",
          "900_01": "var(--green_900_01)",
        },
        red: {
          500: "var(--red_500)",
          600: "var(--red_600)",
          800: "var(--red_800)",
          "600_01": "var(--red_600_01)",
        },
        teal: { 400: "var(--teal_400)" },
        white: {
          a700: "var(--white_a700)",
          a700_4c: "var(--white_a700_4c)",
          a700_cc: "var(--white_a700_cc)",
        },
      },
      boxShadow: { xs: "0 2px 12px 0 #00000019" },
      fontFamily: { inter: "Inter", chivo: "Chivo" },
    },
  },
  plugins: [require("@tailwindcss/forms") , require('tailwind-scrollbar-hide')],
  
};
