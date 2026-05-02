/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "background": "var(--background)",
              "on-background": "var(--on-background)",
              "primary": "var(--primary)",
              "secondary": "var(--secondary)",
              "surface": "var(--surface)",
              "border": "var(--border)",
              "text-slate": "var(--text-slate)",
              // Retain these for specific UI elements if needed, or map them as well
              "primary-fixed-dim": "#00dbe9",
              "secondary-fixed-dim": "#ebb2ff",
      },
      "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
      },
      "spacing": {
              "margin-page": "64px",
              "container-max": "1280px",
              "gutter": "24px",
              "section-gap": "120px",
              "unit": "4px"
      },
      "fontFamily": {
              "body-md": ["Inter"],
              "label-caps": ["Space Grotesk"],
              "headline-lg": ["Space Grotesk"],
              "body-lg": ["Inter"],
              "headline-md": ["Space Grotesk"]
      },
      "fontSize": {
              "body-md": ["16px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
              "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.15em", "fontWeight": "600"}],
              "headline-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
              "body-lg": ["18px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
              "headline-md": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
