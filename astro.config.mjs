import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dominio propio en GitHub Pages, base en raiz (ADR 0007).
// Las rutas internas se construyen con import.meta.env.BASE_URL (ahora '/').
export default defineConfig({
  site: 'https://angelezequiel.dev',
  // Barra final consistente: coincide con la salida de Astro (/en/index.html)
  // y con como GitHub Pages sirve indices de directorio (evita 301 y hreflang dispares).
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
