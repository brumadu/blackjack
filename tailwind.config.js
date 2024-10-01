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
    },
  },
  plugins: [],
};
