import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  /** Preview/Deployed server */
  preview: {
    port: 3000,
  },
  /** Dev server */
  server: {
    port: 3000,
  },
});
