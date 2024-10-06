/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      ssm: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "2560px",
      "ssm-max": { max: "320px" },
      "sm-max": { max: "640px" },
      "md-max": { max: "768px" },
      "lg-max": { max: "1024px" },
      "xl-max": { max: "1280px" },
      "xxl-max": { max: "2560px" },
    },
    extend: {
      keyframes: {
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        "border-spin": "border-spin 7s linear infinite",
      },
      height: {
        "100%": "100%",
        "95%": "95%",
        "90%": "90%",
        "85%": "85%",
        "10%": "10%",
        "5%": "5%",
      },
      width: {
        "100%": "100%",
        "95%": "95%",
        "90%": "90%",
        "85%": "85%",
        "10%": "10%",
        "5%": "5%",
      },
      colors: {
        "pool-green": "#176317",
      },
    },
  },
  plugins: [],
};
