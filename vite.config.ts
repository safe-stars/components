import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(() => {
  return {
    plugins: [react(), nodePolyfills(), cssInjectedByJsPlugin()],
    build: {
      lib: {
        entry: resolve(__dirname, "index.ts"),
        name: "@safe-stars/components",
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "esm" : "cjs"}.js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "@reown/appkit",
          "@reown/appkit-adapter-wagmi",
          "@tanstack/react-query",
          "@telegram-apps/sdk-react",
          "@ton/core",
          "@ton/crypto",
          "@ton/ton",
          "@tonconnect/ui-react",
          "viem",
          "wagmi",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "react/jsx-runtime",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'style.css';
            return assetInfo.name || 'assets/[name].[ext]';
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
      cssCodeSplit: false,
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    server: {
      port: 3000,
      host: '127.0.0.1'
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
      },
    },
  };
});
