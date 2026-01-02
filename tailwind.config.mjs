/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main brand (extracted from logo navy #3A4477)
        brand: {
          50: "#eff0f4",
          100: "#dfe1e9",
          200: "#c4c7d6",
          300: "#a6abc2",
          400: "#7f85a7",
          500: "#3a4477",
          600: "#313a65",
          700: "#293053",
          800: "#202541",
          900: "#171b30",
        },

        // Accent (extracted from logo dot ~#C9D596)
        accent: {
          50: "#f9faf2",
          100: "#f3f6e8",
          200: "#eaefd7",
          300: "#e2e8c6",
          400: "#d8e1b3",
          500: "#c9d596",
          600: "#abb580",
          700: "#8d9569",
          800: "#6f7552",
          900: "#50553c",
        },

        // Neutrals tuned to the logo (paper + cool grays)
        paper: "#ede8e6", // off-white background
        ink: "#1a1c21", // near-black for text on light bg
        slateLogo: {
          400: "#939dbc", // light cool gray-blue
          600: "#606886", // mid gray-blue
        },
      },

      // Optional: nice defaults for a clinic look
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
