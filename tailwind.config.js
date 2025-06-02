export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      fontSize: {
        'h1': '2.25rem',    // 36px
        'h2': '1.875rem',   // 30px
        'h3': '1.5rem',     // 24px
        'h4': '1.25rem',    // 20px
        'h5': '1.125rem',   // 18px
        'h6': '1rem',       // 16px
        'base': '1rem',     // 16px
        'sm': '0.875rem',   // 14px
        'xs': '0.75rem',    // 12px
      },
      colors: {
        background: "#1C1C1C",
        primary: "#8F5CE9",
        secondary: "#A855F7",
        accent: "#7E22CE",
        success: "#10B981",
        danger: "#EF4444",
        dark: {
          900: "#121212",
          800: "#1E1E1E",
          700: "#2D2D2D",
          600: "#3D3D3D",
          500: "#4D4D4D",
        },
        fg: {
          DEFAULT: "#FFFFFF",    // Default foreground color (white)
          alt: "#D1D5DB",        // Alternative foreground (gray-300)
          muted: "#9CA3AF",      // Muted text (gray-400)
          subtle: "#6B7280",     // Subtle text (gray-500)
        },
      },
    },
  },
};
