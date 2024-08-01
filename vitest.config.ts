import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      "**/test/testResultsLab/**",
      "**/test/testProject/**",
      "**/node_modules/**",
      "**/dist-esm/*",
      "**/types/**",
      "commitlint.config.js",
      "**/src/cli.ts",
    ],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "**/test/testResultsLab/**",
        "**/test/testProject/**",
        "**/node_modules/**",
        "**/dist-esm/*",
        "**/types/**",
        "commitlint.config.js",
        "**/typings/**",
        "**/src/cli.ts",
      ],
      reporter: ["text", "json-summary", "json", "cobertura"],
      // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
      reportOnFailure: true,
    },
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
