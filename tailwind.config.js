import("tailwindcss").Config;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#19181F",
        primary: "#F0803C",
        typography: "#FFFFFF",
        supporting: "#9794AA",
        success: "#10B981",
        error: "#EF4444",
      },
      fontFamily: {
        body: ["Quicksand"],
      },
    },
  },
  plugins: [],
};
