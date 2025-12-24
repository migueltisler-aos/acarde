import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'fall-1': {
          '0%': {
            transform: 'translateY(-10vh) translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(110vh) translateX(20px)',
            opacity: '0.8'
          },
        },
        'fall-2': {
          '0%': {
            transform: 'translateY(-10vh) translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(110vh) translateX(-30px)',
            opacity: '0.6'
          },
        },
        'fall-3': {
          '0%': {
            transform: 'translateY(-10vh) translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(110vh) translateX(15px)',
            opacity: '0.7'
          },
        },
      },
      animation: {
        'fall-1': 'fall-1 10s linear infinite',
        'fall-2': 'fall-2 12s linear infinite',
        'fall-3': 'fall-3 15s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
