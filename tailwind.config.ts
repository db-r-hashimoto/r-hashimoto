import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            code: {
              color: "#EC4899",
              backgroundColor: "#F3F4F6",
              padding: "0.25rem 0.375rem",
              borderRadius: "0.375rem",
              fontWeight: "500",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
