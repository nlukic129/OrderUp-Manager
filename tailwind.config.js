import("tailwindcss").Config;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#19181F",
        primary: "#F0803C",
        primaryHover: "#F0803CCC",
        primaryInactive: "#F0803C99",
        typography: "#FFFFFF",
        supporting: "#9794AA",
        supportingHover: "#FFFFFF80",
        success: "#10B981",
        error: "#EF4444",
        gold: "#FAC952",
        navBgColor: "#36353C",
      },
      fontFamily: {
        global: ["Quicksand"],
      },
      rotate: {
        270: "270deg",
      },
      width: {
        30: "30%",
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
