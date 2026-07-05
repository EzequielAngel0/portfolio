# 03 · Decisión de stack

## Requisitos que el stack debe cumplir (del brief)

- Sitio 100% estático, desplegado en GitHub Pages con dominio propio `angelezequiel.dev` y base en raíz (ADR 0007).
- Bilingüe ES/EN con rutas por idioma y toggle.
- Tema claro/oscuro sin flash (FOUC).
- Lighthouse 90+ en performance, accesibilidad y SEO (objetivo interno: 95+ perf, 100 a11y, 100 SEO).
- Sin dependencias pesadas innecesarias; contacto por mailto (cero backend).
- Contenido mantenible en el repo (markdown/JSON tipado), sin CMS.

## Alternativas evaluadas

### Opción A (elegida): Astro 5 + Tailwind CSS 4

| A favor | En contra |
| --- | --- |
| Zero JS por defecto: el sitio es contenido, no aplicación | Astro no "exhibe" React/Next como skill (mitigado: el case study ya acredita Next.js y React en producción) |
| i18n routing nativo (`defaultLocale`, rutas `/en/...`) | |
| Content collections con esquema tipado (Zod) para proyectos y certificaciones | |
| Continuidad del pipeline de deploy actual (`withastro/action`) | |
| Tailwind 4: tokens CSS-first (`@theme`), sin config JS, integración oficial vía `@tailwindcss/vite` | |
| Markdown/MDX de primera clase para el case study | |
| GSAP es framework-agnostic: se integra directo en `<script>` de Astro, sin islas ni wrappers de React | |

### Opción B: Next.js 15 con `output: 'export'`

Descartada. Mostrar Next.js en el propio portfolio suena atractivo, pero: el runtime de React penaliza el presupuesto de JS para un sitio sin interactividad real; `output: export` no soporta el i18n routing integrado (habría que reconstruir `/en` a mano); y el deploy a Pages es menos directo. El skill Next.js ya queda acreditado por el sitio público de ACP Suite (export estático, SEO 100).

### Opción C: quedarse en Astro 4 y solo rediseñar UI

Descartada. Se pagaría el costo del rediseño sin llevarse las mejoras estructurales (i18n nativo maduro, content layer, Tailwind 4 con tokens CSS). El salto 4 → 5 es barato en un proyecto que se reescribe de todas formas.

## Stack final

| Capa | Elección | Nota |
| --- | --- | --- |
| Framework | **Astro 5** (`astro@^5`) | `site: 'https://angelezequiel.dev'`, base en raíz (sin `base` o `base: '/'`); ADR 0007 |
| Estilos | **Tailwind CSS 4** vía `@tailwindcss/vite` | Tokens en CSS con `@theme`; NO usar `@astrojs/tailwind` (deprecada) |
| Lenguaje | **TypeScript estricto** (`astro/tsconfigs/strict`) | Colecciones tipadas con Zod |
| Contenido | **Content collections** (markdown + JSON) | Ver modelo de datos en doc 04 |
| Fuentes | **Self-hosted** vía `@fontsource-variable/*` | 2 familias máximo (ver doc 05); nada de CDN de Google |
| Iconos | SVG inline propios (componente `Icon.astro`) | Sin librería de iconos como dependencia de runtime |
| Diagrama de arquitectura | SVG estático artesanal, derivado del Mermaid del case study | Control total de estilo, tematizable con `currentColor`/variables; sin JS de Mermaid en el cliente |
| SEO | `@astrojs/sitemap` + componente `Seo.astro` propio | OG, JSON-LD, canonical, hreflang (doc 06) |
| Animación | **GSAP 3** (core + ScrollTrigger + Draggable para el carrusel de capturas; SplitText/DrawSVG quedan fuera) | Instalado por npm y empaquetado en el build (nunca por CDN); un solo entry deferred; mejora progresiva (docs 05 y 06) |
| Interactividad | Vanilla JS inline mínimo (tema, idioma, menú móvil) | Sin islas de framework: no hay estado que lo justifique |
| Formato | Prettier + `prettier-plugin-astro` | |
| CI/CD | GitHub Actions actual (`withastro/action@v3` → `deploy-pages@v4`) | Fijar Node 22 LTS en el action |
| Node / gestor | Node 22 LTS · npm | Ya es lo que usa el repo |

## Dependencias de runtime esperadas (presupuesto)

`astro`, `@tailwindcss/vite`, `tailwindcss`, `@astrojs/sitemap`, `gsap`, `@fontsource-variable/…` (x2). Nada más sin justificarlo por escrito en este doc.

El JS del cliente queda dominado por GSAP (core + ScrollTrigger + Draggable ≈ 45 KB gzip); con los scripts propios (tema, idioma, menú, ~10 KB) el total queda bajo los 60 KB del doc 06. GSAP entra como **mejora progresiva**: el contenido es visible y usable aunque el JS no cargue (el carrusel degrada a una tira con scroll nativo).

## Reglas de implementación

1. Toda URL interna se construye con `import.meta.env.BASE_URL` (ahora devuelve `/`); mantenerlo hace el sitio portable si la base cambiara. Nunca hardcodear el dominio ni rutas absolutas a mano.
2. Cero estilos inline en atributos `style` (lección del diagnóstico H1): todo por tokens + utilidades.
3. El build no puede leer nada de `perfil-mejorado/` (no existe en CI). El contenido vive en `src/content/`.
4. Cualquier dependencia nueva se anota aquí con su justificación antes de instalarla.
5. **Soporte de navegadores: evergreen** (últimas 2 versiones de Chrome, Edge, Firefox, Safari). Se puede usar CSS moderno sin polyfills: container queries, `:has()`, nesting nativo, `text-wrap: balance/pretty`. No se soportan navegadores legacy.

## Nota sobre revisar el stack

Esta elección se reevaluó frente a Next.js y SvelteKit y se reafirmó (ADR 0001), pero no es dogma: si más adelante aparece una razón fuerte (un requisito nuevo, un cambio de objetivo), se cambia escribiendo un ADR que reemplace al 0001. Aclaración importante: los FPS bajos del sitio actual no son de Astro (el sitio actual ya es Astro), sino de su capa decorativa (orbes en bucle + canvas de partículas); el rediseño los elimina y la fluidez mejora en el mismo Astro.
