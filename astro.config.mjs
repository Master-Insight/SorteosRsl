// @ts-check
import { defineConfig, envField } from 'astro/config';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      BASE_URL: envField.string({ context: "server", access: "secret" }),
      ID_GOOGLE: envField.string({ context: "server", access: "secret" }),
      MP_PREFERENCE_ID: envField.string({ context: "server", access: "secret" }),
      SHEETS: envField.string({ context: "server", access: "secret" }),
      GOOGLE_SHEETS_ID: envField.string({ context: "server", access: "secret" }),
      GOOGLE_SERVICE_ACCOUNT_EMAIL: envField.string({ context: "server", access: "secret" }),
      GOOGLE_PRIVATE_KEY: envField.string({ context: "server", access: "secret" }),
      GOOGLE_SHEETS_PRODUCTS_ID: envField.string({ context: "server", access: "secret" }),
      SHEET_PRODUCTS_KEY: envField.string({ context: "server", access: "secret" })
    }
  }
});