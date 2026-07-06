# 06 · SEO, rendimiento y accesibilidad

Gates de calidad del sitio. Nada de esto es "mejora futura": es parte de la definición de terminado (doc 07).

## SEO técnico

Componente único `Seo.astro` usado por todas las páginas:

| Elemento | Detalle |
| --- | --- |
| `<title>` + meta description | Únicos por página Y por idioma. Home ES ejemplo: "Angel Barbosa · Full-Stack Developer (Go, Flutter, React, OCI)" |
| Canonical | URL absoluta con `site` = `https://angelezequiel.dev` y base raíz (ADR 0007); sin prefijo `/portfolio` |
| hreflang | Pares `es` ↔ `en` por página + `x-default` → versión ES |
| Open Graph + Twitter card | `og:title`, `og:description`, `og:image` (1200×630, estática por página/idioma en `src/assets/og/`), `og:locale` (`es_MX` / `en_US`), `summary_large_image` |
| JSON-LD | Home: `Person` (nombre, jobTitle, sameAs: LinkedIn, GitHub, X). Case study: `SoftwareSourceCode`/`CreativeWork` para ACP Suite. SoloKey: `SoftwareSourceCode` con `codeRepository` |
| Sitemap | `@astrojs/sitemap` con alternates de idioma; `robots.txt` apuntando al sitemap |
| Idioma | `<html lang>` correcto por página (H2 del diagnóstico) |

Regla de contenido: los datos estructurados usan SOLO datos del doc 02 (nada inventado, regla 5).

## Presupuesto de rendimiento

Objetivo Lighthouse (móvil, throttling por defecto): **Performance ≥ 95 · Accessibility = 100 · SEO = 100 · Best practices = 100**. El brief pide 90+; el presupuesto interno deja margen.

| Recurso | Presupuesto | Cómo se cumple |
| --- | --- | --- |
| JS enviado al cliente | < 60 KB gzip total | GSAP core + ScrollTrigger + Draggable (~45 KB gzip, este último para el carrusel) + scripts propios de tema/idioma/menú (~10 KB); sin islas de framework. Sin SplitText ni DrawSVG (doc 05) |
| CSS | < 50 KB | Tailwind 4 purga por defecto; sin frameworks de componentes |
| Fuentes | ≤ 3 archivos woff2, subset latin | `@fontsource-variable/archivo` + IBM Plex Mono 400/500; `font-display: swap`; preload solo la variable del display |
| Imágenes | AVIF/WebP vía `astro:assets`, `width`/`height` explícitos, lazy bajo el fold | El hero es tipográfico (sin bitmap crítico) y el diagrama es SVG, pero SÍ hay capturas de ACP y SoloKey (case study y tarjetas de proyecto): se optimizan con `astro:assets`, se sirven responsive y perezosas, y llevan dimensiones para no generar CLS |
| LCP | < 1.8 s | El LCP debe ser el titular (texto), no una imagen. GSAP se carga `defer`/al final para no bloquear el render del contenido crítico |
| CLS | ≈ 0 | Dimensiones explícitas en todo media; `tabular-nums`; sin banners que empujen; las animaciones de entrada de GSAP parten del layout final (no refluyen la página) |
| TBT | < 150 ms | GSAP se inicializa después de `DOMContentLoaded`, no compite con el parse del HTML crítico; ScrollTrigger crea sus triggers en un solo `context` |
| Requests externos | 1 (beacon de analítica) | Fuentes, CSS, JS e imágenes self-hosted (se eliminan los 2 requests actuales al CDN de Google Fonts). La única excepción deliberada es el beacon de analítica sin cookies (ADR 0006), que carga async y no bloquea nada |

Verificación: Lighthouse CI local (`npx lighthouse` contra `astro preview`) en fase 6, y revisión del peso del build (`dist/`) por si algo se cuela.

## Accesibilidad (AA como mínimo)

| Área | Requisito |
| --- | --- |
| Contraste | AA en todo par texto/fondo, en AMBOS temas. `--color-signal` claro no alcanza AA para texto normal: restringido a texto grande y gráficos (doc 05) |
| Foco | `:focus-visible` con anillo de 2px en `--color-accent`, nunca `outline: none` sin reemplazo |
| Teclado | Todo operable por teclado: toggles de tema/idioma, menú móvil, skip link "Saltar al contenido" como primer foco |
| Semántica | Landmarks (`header`, `main`, `nav`, `footer`), un solo `h1` por página, jerarquía sin saltos, `aria-current="page"` en nav |
| Toggles | Botones reales con `aria-label` localizado ("Cambiar a tema oscuro" / "Switch to English"); el estado se comunica, no solo se pinta |
| Imágenes/SVG | `alt` descriptivo; el diagrama de arquitectura con `role="img"` + `<title>` + `<desc>` (y el contenido igual está en el texto del case study) |
| Motion | `prefers-reduced-motion` respetado globalmente vía `gsap.matchMedia()` (estado final instantáneo, no solo duración corta); ver doc 05 |
| Carrusel | Controles anterior/siguiente reales, operables por teclado y con foco visible; `aria-roledescription="carousel"`, estado anunciado; auto-avance (si lo hay) pausable y desactivado con reduced-motion; sin JS degrada a tira con scroll-snap. Nunca única vía al contenido (doc 05) |
| Sin JS | Mejora progresiva: con JavaScript deshabilitado, todo el contenido es visible y legible (GSAP nunca deja contenido en `opacity:0` a la espera). Prueba obligatoria en fase 6 |
| Hit areas | ≥ 40×40px en todo interactivo (extender con pseudo-elemento si el visual es menor) |
| PDF | El link al CV declara formato y que abre descarga: "Descargar CV (PDF)" |

## Rendimiento en runtime (fluidez / FPS)

Lighthouse mide la carga; esto cubre la fluidez una vez cargado, que es donde el sitio actual falla (orbes en bucle + canvas de partículas tiran los FPS). Reglas para mantener 60fps:

- **Solo se animan propiedades que la GPU compone barato:** `transform` y `opacity` (y `filter` con cuidado). Prohibido animar en bucle `blur`, `box-shadow`, `width/height`, `top/left` o colores de fondo grandes.
- **Cero animaciones infinitas por defecto:** el boot del hero corre una vez; el revelado por scroll usa `once: true`. El único bucle permitido es el pulso sutil del punto de estado, apagado por reduced-motion.
- **Sin canvas ni `requestAnimationFrame` propios** para decoración (era la causa principal del bajo FPS actual).
- `will-change` solo sobre `transform`/`opacity` y solo ante stutter medible; ScrollTriggers destruidos en el cleanup del `context` de GSAP.
- Verificación en fase 6: panel Rendimiento de DevTools (o la pestaña de FPS) en scroll y en carga; debe sostener ~60fps sin picos largos de main thread.

## Privacidad y analítica

- **Cloudflare Web Analytics** (ADR 0006): sin cookies, sin datos personales, sin banner de consentimiento. Elegida porque el dominio vive en Cloudflare (ADR 0007). D7 resuelto el 2026-07-06: beacon integrado en `Base.astro` (`defer`, al final del `<body>`), solo en build de producción para no registrar visitas de desarrollo. El sitio usa modo "JS Snippet installation" en el panel (con DNS only no hay auto-inyección).
- Es la única pieza de terceros del sitio. Carga defer y el sitio funciona igual sin ella (mejora progresiva).
- **CSP** (implementada 2026-07-06 junto con el beacon, D7): `<meta http-equiv="Content-Security-Policy">` en `Base.astro`, solo en producción (en dev, Vite inyecta scripts propios). Política: `default-src 'self'`; `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com`; `style-src 'self' 'unsafe-inline'`; `connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com` (el beacon hace POST a `cloudflareinsights.com/cdn-cgi/rum`); `img-src`, `font-src`, `base-uri` y `form-action` en `self`. El `'unsafe-inline'` es deliberado: los scripts anti-FOUC son inline por diseño y Astro inlinea scripts y estilos pequeños, así que los hashes serían frágiles (razonamiento de la decisión F5); el valor real de esta CSP en un sitio estático sin inputs es restringir los orígenes externos al beacon y nada más. Nota: el POST del beacon falla por CORS en `localhost` con puerto (Cloudflare responde `Allow-Origin: http://localhost` sin puerto); es del lado de Cloudflare, no de la CSP, y de paso evita que el preview local ensucie métricas.

## Auditorías programadas (fase 6, doc 07)

1. Skill `web-design-guidelines` sobre los componentes y páginas (trae las reglas frescas de Vercel y reporta `file:line`).
2. Skill `review-animations` sobre todo el motion.
3. Lighthouse móvil y desktop sobre `astro preview` (con `base` aplicado).
4. Prueba manual de teclado + lector (NVDA en Windows) del flujo: home → toggle idioma → case study → credencial externa → descargar CV.
5. Validar JSON-LD con el Rich Results Test y OG con un previewer.
