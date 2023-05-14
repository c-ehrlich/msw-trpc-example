/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    react({
      exclude: /\.stories\.(t|j)sx?$/,
      include: "**/*.tsx",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__test__/setup.tsx"],
  },
});
