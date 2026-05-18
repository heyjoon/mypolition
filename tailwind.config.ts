import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        civic: {
          ink: "#17202a",
          muted: "#5d6b7a",
          line: "#d7dee7",
          panel: "#f6f8fb",
          blue: "#2463a7",
          teal: "#147a7e",
          green: "#31794d",
          amber: "#9a6615"
        }
      }
    }
  },
  plugins: []
};

export default config;
