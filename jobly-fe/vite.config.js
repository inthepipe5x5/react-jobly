import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   injectRegister: false,

    //   pwaAssets: {
    //     disabled: false,
    //     config: true,
    //   },

    //   manifest: {
    //     name: "JoblyReact",
    //     short_name: "JoblyReact",
    //     description: "JoblyReact",
    //     theme_color: "#ffffff",
    //   },

    //   workbox: {
    //     globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
    //     cleanupOutdatedCaches: true,
    //     clientsClaim: true,
    //   },

    //   devOptions: {
    //     enabled: false,
    //     navigateFallback: "index.html",
    //     suppressWarnings: true,
    //     type: "module",
    //   },
    // }),
  ],
  server: {
    host: "127.0.0.1" || "localhost",
    port: 3000,
  },
});
