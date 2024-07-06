import("tailwindcss").Config;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#19181F",
        primary: "#F0803C",
        primaryHover: "#F0803CCC",
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
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
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
