module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs320: "320px",
      xs375: "375px",
      xs425: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    extend: {
      fontFamily: {
        Inter: ["Inter", "cursive"],
        KohSantepheap: ["Koh Santepheap", "cursive"],
        Lato: ["Lato", "sans-serif"]
      },
    },
  },
  plugins: [],
};
