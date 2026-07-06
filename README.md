# Portfolio · angelezequiel.dev

Código fuente del portfolio de Angel Ezequiel Barbosa Lomeli. Sitio estático bilingüe (ES/EN) con un objetivo: que un reclutador técnico entienda en 30 segundos quién es Angel y qué ha llevado a producción, verificable con un clic. Pieza central: el case study de ACP Suite.

**Sitio en vivo:** [angelezequiel.dev](https://angelezequiel.dev/) (español) · [angelezequiel.dev/en/](https://angelezequiel.dev/en/) (English)

## Stack

- [Astro 7](https://astro.build/): generación estática pura, sin islas de framework, sin CMS.
- Node 24 LTS (`.nvmrc`).
- [Tailwind 4](https://tailwindcss.com/) vía `@tailwindcss/vite`, con tokens de diseño en `@theme` (`src/styles/tokens.css`).
- TypeScript en modo strict, colecciones de contenido validadas con Zod.
- GSAP 3 (core + ScrollTrigger) como mejora progresiva: el contenido nunca depende de JavaScript.
- Fuentes self-hosted (Archivo variable + IBM Plex Mono, subset latin, 3 woff2).
- Analítica: Cloudflare Web Analytics, beacon sin cookies, única pieza de terceros y solo en producción.

## Características

- Bilingüe ES/EN por rutas (`/` y `/en/`) con detección de idioma en el cliente (una vez, con guarda anti ping-pong).
- Tema claro/oscuro sin FOUC, claro por defecto, persistente.
- Mejora progresiva: sin JavaScript todo el contenido es visible y navegable.
- Accesibilidad AA: contraste verificado en ambos temas, operable por teclado, skip link, `prefers-reduced-motion` respetado.
- Lighthouse 99-100 (móvil y desktop) en performance, accesibilidad, SEO y best practices; JS ~45 KB gzip en páginas animadas, ~1 KB donde no hay nada que animar.
- SEO técnico: canonical, hreflang, Open Graph con imagen por página e idioma, JSON-LD, sitemap con alternates.
- CSP vía meta: orígenes restringidos a `self` más el beacon.

## Desarrollo

Requisitos: Node 24 (`nvm use` toma la versión del `.nvmrc`).

```bash
npm ci
npm run dev       # servidor de desarrollo en http://localhost:4321
npm run check     # astro check (tipos y plantillas)
npm run build     # build de producción en dist/
npm run preview   # sirve dist/ (la verificación real se hace aquí, no en dev)
```

Verificación aislada en contenedor (Node 24, corre `check` + `build` y sirve el preview en `:4321`):

```bash
podman compose up --build
```

## Estructura

```text
src/
  components/     # secciones de la home, case study, diagramas SVG y ui/
  content/        # colecciones Markdown ES/EN (case study ACP Suite, proyectos)
  i18n/           # diccionario tipado y helpers de rutas por idioma
  layouts/        # Base.astro: head, anti-FOUC de tema e idioma, header, footer
  pages/          # /, /en/, /acp-suite/, /en/acp-suite/ y 404
  scripts/        # motion.ts (GSAP diferido)
  styles/         # tokens.css (@theme, ambos temas) y global.css
public/           # CNAME, fuentes woff2, favicons, robots.txt, CV en PDF
scripts/          # generadores one-off (imágenes OG, favicons)
docs/             # decisiones y proceso: docs 01-08, ADR 0001-0008, QA por rondas
```

## Documentación y proceso

El rediseño completo está documentado en [`docs/`](docs/README.md): diagnóstico del sitio anterior, reglas de contenido, decisión de stack, arquitectura, dirección visual, gates de SEO/rendimiento/accesibilidad, plan por fases y convenciones de trabajo. Las decisiones con alternativas y consecuencias viven en [`docs/adr/`](docs/adr/) y la evidencia de QA de cada fase en [`docs/rondas/`](docs/rondas/).

## Deploy

GitHub Pages con dominio propio. Cada push a `master` dispara `.github/workflows/deploy.yml` (build con Node 24 y publicación); `develop` es la rama de integración y su CI (`ci.yml`) valida `check` + `build` en cada push.
