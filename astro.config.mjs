import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Subdominio propio en GitHub Pages, base en raiz (ADR 0012; la raiz del
// dominio queda reservada al hub/landing del ecosistema).
// Las rutas internas se construyen con import.meta.env.BASE_URL (ahora '/').
export default defineConfig({
  site: 'https://portfolio.angelezequiel.dev',
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
      // Paginas con slug localizado (certificaciones, educacion, sobre-mi): su
      // par ES/EN no lo arma el i18n por prefijo /en, asi que se corrige a mano
      // el alternate de esas URLs (T3 + ronda 2026-07-20).
      serialize(item) {
        const base = 'https://portfolio.angelezequiel.dev/';
        const localizedPairs = [
          { es: `${base}certificaciones/`, en: `${base}en/certifications/` },
          { es: `${base}educacion/`, en: `${base}en/education/` },
          { es: `${base}sobre-mi/`, en: `${base}en/about/` },
          { es: `${base}experiencia/`, en: `${base}en/experience/` },
        ];
        const pair = localizedPairs.find((p) => item.url === p.es || item.url === p.en);
        if (pair) {
          item.links = [
            { lang: 'es-MX', url: pair.es },
            { lang: 'en-US', url: pair.en },
          ];
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // El dueno consulta el preview del contenedor como http://portfolio:4321
    // (entrada en su archivo hosts); el server de preview valida el header
    // Host y sin esto responde "Blocked request". Solo afecta a preview.
    preview: {
      allowedHosts: ['portfolio'],
    },
  },
});
