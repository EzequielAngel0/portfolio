import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://EzequielAngel0.github.io',
  base: '/portfolio',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
});
