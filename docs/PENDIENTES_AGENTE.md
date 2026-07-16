# Pendientes del AGENTE · lo que Claude puede ejecutar

Código, contenido y config que ejecuta el asistente. Contraparte: [PENDIENTES_DUENO.md](PENDIENTES_DUENO.md). Actualizado: 2026-07-06.

Marcadores: `[ ]` pendiente · `[wip]` en curso · `[hecho]` · `[bloqueado]` (espera algo del dueño). El detalle de cada fase está en [07-plan-implementacion.md](07-plan-implementacion.md); esto es el checklist vivo.

## Estado: documentación (previo al desarrollo)

- [hecho] docs 01-08 redactados
- [hecho] ADR 0001-0008
- [hecho] `.gitignore`: ignora `perfil-mejorado/` y `plantilla-proyecto/`
- [hecho] rama `develop` creada (integración; ver doc 08)

## Cambios de stack respecto al plan original (ADR 0008)

- **Astro 7.0.6** (no 5) y **Node 24 LTS** (no 22): Astro 5 quedó sin parche para 5 advisories `high`; el árbol final da 0 vulnerabilidades. Node local subido a 24 (autorizado).
- **Verificación en contenedor Podman** además de la nativa (`Containerfile` + `compose.yaml`).
- `package-lock.json` es multiplataforma (generada en Linux); al tocar deps con binarios nativos, regenerarla en el contenedor.

## Plan por fases (resumen; detalle en doc 07)

| Fase | Entregable | Verificación | Estado |
| --- | --- | --- | --- |
| F0 | Limpieza (borrar CMS y basura de raíz) sobre `develop` | repo limpio | `[hecho]` 2026-07-06 |
| F1 | Bootstrap Astro 7 + Node 24 + Tailwind 4 + tokens + fuentes + GSAP + Base.astro + CI + Podman | `build` + `preview` sirven `/` y `/en/` tematizables; contenedor sirve igual | `[hecho]` 2026-07-06 (CI se valida al primer push) |
| F2 | Contenido: esquemas Zod, case study ES/EN, SoloKey, skills, certs, i18n | pase de reglas duras en verde (grep) | `[hecho]` 2026-07-06 |
| F3 | Home: componentes ui/ y secciones en orden | home ES/EN responsive, ambos temas | `[hecho]` 2026-07-06 |
| F4 | Case study + SVG del diagrama tematizado | páginas `/acp-suite` ES/EN | `[hecho]` 2026-07-06 |
| F5 | SEO: Seo.astro, OG, JSON-LD, sitemap, robots, 404, favicon | JSON-LD y OG en dist verificados (validadores externos en F6) | `[hecho]` 2026-07-06 · beacon + CSP integrados 2026-07-06 (D7 resuelto) |
| F6 | Pulido + QA (a11y, Lighthouse, animaciones, code review) | gates del doc 06 en verde | `[hecho]` 2026-07-06 (pase NVDA y validadores externos: dueño, guiones en el tracker) |
| F7 | Merge de `develop` a `master` + README nuevo | deploy verificado en la URL real | `[hecho]` 2026-07-06: merge autorizado por el dueño y ejecutado (ff `20dbf85..9390c0e`), deploy en verde y URL real verificada |

## Reglas continuas

- Cada ítem en rama corta desde `develop`; a `master` solo el dueño.
- Pase de reglas duras (doc 02) antes de cerrar F2 y de nuevo en F6: grep de "microservicio", "Redis", "Supabase", "OAuth2", em dash y emojis sobre `src/`.
- Al cerrar cada fase: actualizar este doc + el doc del área + tracker de ronda si aplica.

## Ronda de mejoras post-lanzamiento (pedidos del dueño 2026-07-06)

`[hecho]` 2026-07-06 en `develop` (T1-T11 completas; merge a `master` lo decide el dueño). Detalle punto por punto y decisiones del dueño en [rondas/2026-07-06_mejoras-post-lanzamiento.md](rondas/2026-07-06_mejoras-post-lanzamiento.md); el prompt fuente queda marcado en [PROMPT_MEJORAS_POST_LANZAMIENTO.md](PROMPT_MEJORAS_POST_LANZAMIENTO.md). Piezas mayores: página de certificaciones bilingüe con catálogo completo verificable, renombrado a "ACP" con rutas `/acp/`, CV bilingüe por idioma, y motion ampliado (ADR 0009: intro con el nombre, trazo de tinta tras el cursor, GSAP por sección; ~61 fps medidos). Iteración 2 tras el pase visual del dueño (misma fecha, en el tracker): fondo circuito (ADR 0009 v2), paleta azul tinta con contraste subido (ADR 0010) y carrusel circular.

## Ronda: rediseño visual "blueprint" (ADR 0011)

`[hecho]` 2026-07-15/16 en `develop` (4 iteraciones; merge a `master` lo decide el dueño). Se implementó la FORMA blueprint (capa de plano fusionada con el circuito, geometría dura, sombra dura firma, riel lateral accesible, marquee de stack, mono amplificado) y el nombre del hero en una display condensada (Bebas Neue, subset propio, 4to woff2), SOBRE la paleta papel y tinta sin neón. Iteraciones tras los pases visuales del dueño: (2) hero compactado, footer "estado del sistema", tema claro enfriado (`--paper` `#eef1f5`; AA re-verificado), transición de tema (View Transitions) y restyle del diagrama ACP, con OG y favicons regenerados; (3) favicon con el monograma en Bebas y toggle de tema con sol/luna SVG; (4) hero con el NOMBRE COMPLETO en dos líneas + ficha técnica (conteo real de credenciales del catálogo), y contacto y footer como cajetín de plano (canales directos con hover de relleno). `check` + `build` + Podman + reglas duras en verde. Detalle: [rondas/2026-07-15_rediseno-blueprint.md](rondas/2026-07-15_rediseno-blueprint.md); decisión y mapeo: [ADR 0011](adr/0011-direccion-stitch.md).

## Mudanza a subdominio (ADR 0012)

`[hecho]` 2026-07-16, desplegada y verificada: `https://portfolio.angelezequiel.dev` vivo con certificado y Enforce HTTPS (http 301 a https), todas las rutas en 200, canonical/sitemap/OG con el subdominio, beacon con el token nuevo del dueño y la raíz liberada (404 de GitHub hasta que el hub la tome; sin redirect por decisión del dueño, ADR 0012). Los 2 CV en PDF se regeneraron con los links al subdominio (fuentes de `perfil-mejorado/` actualizadas; script one-off `scripts/cv-pdf.mjs`). D11 de [PENDIENTES_DUENO.md](PENDIENTES_DUENO.md) cerrado.

## Reglas de mantenimiento

- Si cambia el copy de `ui.ts` (hero) o el frontmatter del case study, regenerar las imágenes OG con `scripts/og-images.mjs` (espejan ese copy a mano). La página de certificaciones también tiene OG propia en ese script.
- **El CV vive en DOS idiomas y DOS formatos** (T10): fuente HTML en `perfil-mejorado/CV_Angel_Barbosa.html` (EN) y `..._ES.html` (ES), servidos como `public/cv/Angel_Barbosa_CV.pdf` (EN, nombre estable) y `..._CV_ES.pdf` (ES). Al actualizar un idioma, actualizar el otro y REGENERAR ambos PDF (Edge/Chrome headless, `page.pdf` con `preferCSSPageSize` + `printBackground`); verificar 1 página y los links internos (`/acp/`, `/en/acp/`).
- El catálogo de certificaciones (`src/data/certifications.json`) se cura contra el perfil público de Alura (`app.aluracursos.com/user/angelezequiel`): al terminar una formación nueva, agregarla con su URL de verificación (regla 5 del doc 02: solo credenciales verificables).

## Chores opcionales post-lanzamiento (del code review de F6, no bloquean)

- [ ] Refactors de reutilización diferidos: `KeyNumbers.astro`, `ExternalLink.astro`, utilidad `eyebrow`, helper `getCaseStudy`, tokens/fuentes compartidos en `scripts/`, cache de geometría del carrusel. Detalle en `docs/rondas/2026-07-06_f6.md`.
- [ ] Regla de mantenimiento: si cambia el copy de `ui.ts` (hero) o el frontmatter del case study, regenerar las imágenes OG con `scripts/og-images.mjs` (espejan ese copy a mano).
