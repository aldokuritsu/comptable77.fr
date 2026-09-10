// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://comptable77.fr',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
