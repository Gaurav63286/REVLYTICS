import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1220",
        card: "#111827",
        primary: "#2563EB",
        secondary: "#06B6D4",
        text: "#F8FAFC",
        muted: "#94A3B8",
        positive: "#10B981",
        neutral: "#F59E0B",
        negative: "#EF4444",
      },
    },
  },
  plugins: [],
};
export default config;
