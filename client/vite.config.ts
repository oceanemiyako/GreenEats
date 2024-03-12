import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from '@vitejs/plugin-basic-ssl'

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "myapp",
        short_name: "app",
        icons: [
          {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png"
          },
          {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png"
          }
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone"
      }
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
