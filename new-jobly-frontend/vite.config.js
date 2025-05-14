import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(
  //({ command, mode }) =>
  {
    build: {
      rollupOptions: {
        input: {
          main: "index.html",
          // serviceWorker: "src/service-worker.js",
        }
      },
      sourcemap: true
    },
    // const env = loadEnv(mode, process.cwd(), '')
    //return
    // {
    plugins: [
      react(), //this plugin is needed to run React.js with Vite
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
    // define: {
    // __APP_ENV__: JSON.stringify(env.APP_ENV),
    // 'import.meta.env.VITE_REACT_APP_BASE_URL': JSON.stringify(env.VITE_REACT_APP_BASE_URL),
    // },
    server: {
      port: 5173,
      // ...(env.NODE_ENV !== 'production' && { host: 'localhost' }),
    },
    // }
  }
);
