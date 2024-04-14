import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import vike from "vike/plugin";
import vikeSolid from "vike-solid/vite";

export default defineConfig({
  plugins: [vike(), vikeSolid({})],
  /** Preview/Deployed server */
  preview: {
    port: 3000,
  },
  /** Dev server */
  server: {
    port: 3000,
  },
});
