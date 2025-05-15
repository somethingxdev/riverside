// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        weights: ["300", "400", "500", "600", "700"],
        cssVariable: "--font-inter",
      },
      {
        provider: fontProviders.google(),
        name: "Bebas Neue",
        cssVariable: "--font-heading",
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
