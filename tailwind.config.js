/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        black1: "#0A1018",
        black2: "#0D131B",
        black3: "#191E26",
        black4: "#1C1F22",
        primaryText:"#ADABAA",
        s1:"#00010D",
        s2:"#010A26",
        s3:"#011640",
        s4:"#034C8C",
        s5:"#03588C"
      }
    },
  },
  plugins: [],
}
