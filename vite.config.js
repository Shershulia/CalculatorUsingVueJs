import { defineConfig } from "vite";
import viteVue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [viteVue()],
  server: {
    host: "0.0.0.0",
  },
  test: {
    globals: true,
  },
});
