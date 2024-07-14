import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/test/testResultsLab/**", "node_modules"],
    pool: "forks",
    environmentOptions: {
      // You can set a default value here
      BLOCK_STDOUT: process.env.BLOCK_STDOUT === "true",
    },
  },
  optimizeDeps: {
    exclude: ["child_process"],
  },
  build: {
    commonjsOptions: {
      ignoreTryCatch: (id) => id !== "stream",
    },
  },
});
