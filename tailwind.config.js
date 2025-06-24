// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Inter', 'system-ui', 'sans-serif'],
          'display': ['Poppins', 'system-ui', 'sans-serif'],
        },
        fontSize: {
          'xs': ['0.75rem', { lineHeight: '1.5' }],
          'sm': ['0.875rem', { lineHeight: '1.5715' }],
          'base': ['1rem', { lineHeight: '1.5' }],
          'lg': ['1.125rem', { lineHeight: '1.5' }],
          'xl': ['1.25rem', { lineHeight: '1.5' }],
          '2xl': ['1.5rem', { lineHeight: '1.415' }],
          '3xl': ['1.875rem', { lineHeight: '1.333' }],
          '4xl': ['2.25rem', { lineHeight: '1.277' }],
          '5xl': ['3rem', { lineHeight: '1.2' }],
          '6xl': ['3.75rem', { lineHeight: '1.1' }],
        },
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#1e40af",
            "primary-focus": "#1e3a8a",
            "primary-content": "#ffffff",
            "secondary": "#f59e0b",
            "secondary-focus": "#d97706",
            "secondary-content": "#ffffff",
            "accent": "#37cdbe",
            "accent-focus": "#2aa79b",
            "accent-content": "#ffffff",
            "neutral": "#3d4451",
            "neutral-focus": "#2a2e37",
            "neutral-content": "#ffffff",
            "base-100": "#ffffff",
            "base-200": "#f9fafb",
            "base-300": "#d1d5db",
            "base-content": "#1f2937",
            "info": "#2094f3",
            "success": "#009485",
            "warning": "#ff9900",
            "error": "#ff5724",
          },
        },
      ],
    },
  };