import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    // Worker threads start reliably on Windows, where forked workers can time out.
    pool: "threads",
    exclude: ["node_modules", ".next"],
  },
});
