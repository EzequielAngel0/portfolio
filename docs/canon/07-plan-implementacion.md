# 07 · Plan de implementación

Fases pensadas para que el sitio viejo siga en línea hasta que el nuevo esté completo. El trabajo se integra en `develop` (ya creada) y se hace merge a `master` solo al final de la fase 6 (el workflow despliega `master`).

## Fase 0 · Limpieza y respaldo · [hecho] 2026-07-06

- [x] Respaldar `perfil-mejorado/` y `plantilla-proyecto/` fuera del repo (D1 del dueño, confirmado).
- [x] `.gitignore`: ignorar `perfil-mejorado/` y `plantilla-proyecto/`.
- [x] Rama `develop` creada (integración).
- [x] Borrar: `downloaded.html`, `remote_cert.json`, `public/admin/`, `src/pages/admin.astro`, `src/pages/certificados.astro` (H6/H7 del doc 01), y `public/hero-setup.jpg` (hero sin foto, T2).

## Fase 1 · Bootstrap del stack (doc 03) · [hecho] 2026-07-06

- [x] Migrar a **Astro 7 + Node 24 LTS** (ADR 0008; el plan original decía Astro 5 + Node 22) + Tailwind 4 (`@tailwindcss/vite`), TypeScript strict, prettier + plugin.
- [x] `astro.config.mjs`: `site: 'https://angelezequiel.dev'`, base en raíz (sin `base`), `trailingSlash: 'always'`, `i18n` (doc 04), `@astrojs/sitemap` con alternates.
- [x] `public/CNAME` con `angelezequiel.dev` (dominio propio de Pages, ADR 0007).
- [x] `styles/tokens.css` con los tokens del doc 05 (ambos temas) y `global.css` (reset, focus, reduced motion, skip link).
- [x] Fuentes self-hosted subset latin: 3 `.woff2` en `public/fonts/` (Archivo variable + Plex Mono 400/500), `@font-face` a mano y preload del display (doc 03/06).
- [x] `Base.astro` con scripts anti-FOUC de tema (claro por defecto) e idioma (detección solo home ES, guarda anti ping-pong) + `Seo.astro` esqueleto (title, description, canonical, hreflang, OG básico) + i18n tipado (`ui.ts`, `utils.ts`) + entry GSAP diferido (`scripts/motion.ts`, mejora progresiva).
- [x] Workflow deploy: `withastro/action@v6` con `node-version: 24`.
- [x] **Workflow CI en `develop`** (`ci.yml`): en cada push/PR a `develop`, `setup-node` (`.nvmrc`) + `npm ci` + `astro check` + `astro build`. No despliega; solo valida. (Lighthouse CI se suma cuando haya páginas reales, F3+.)
- [x] **Verificación en contenedor Podman** (ADR 0008): `Containerfile` + `compose.yaml` corren el gate (`npm ci` + `check` + `build`) y sirven el preview en Node 24, aislados del equipo local.
- Verificación [hecha]: `npm run build` + `preview` sirven el "hola" tematizable en `/` y `/en/` (HTTP 200, contenido visible sin JS); canonical/hreflang consistentes; `podman compose up --build` replica el gate y sirve igual. CI de `develop`: se valida al primer push de la rama.

## Fase 2 · Contenido (docs 02 y 04) · [hecho] 2026-07-06

- [x] `content.config.ts` con esquemas Zod (`projects`, `case-study`) y validación de pares ES/EN por slug (helper `src/lib/content.ts`; gate de build al cablearlo en los `getStaticPaths` de F3/F4).
- [x] Transcribir el case study ES/EN desde `perfil-mejorado/CASE_STUDY_ACP_ES_EN.md` (tal cual, sin cambiar datos). El Mermaid queda como marcador; el SVG artesanal es F4.
- [x] Redactar `solokey.es.md` / `solokey.en.md`, `certifications.json`, `skills.json`, diccionario `ui.ts`. Borrados los 4 JSON viejos huérfanos de `src/data/`.
- [x] Copiar el CV nuevo a `public/cv/Angel_Barbosa_CV.pdf` (y borrar el viejo `public/Angel_Ezequiel_Barbosa_Resume.pdf`).
- [x] Dejar el contenido listo SIN capturas (son opcionales, se agregan a futuro con D8): esquemas con `screenshots?`/`image?` opcionales.
- [x] **Pase de reglas duras (doc 02)**: grep sobre `src/`, cero de "Redis", "Supabase", "OAuth2", em dash y emojis. "microservic" solo aparece como la negación deliberada del case study ("no microservicios" / "not microservices"), que es el encuadre que pide la regla 2, no una violación (detalle en `docs/rondas/2026-07-06_f2.md`).

## Fase 3 · Home (docs 04 y 05) · [hecho] 2026-07-06

- [x] Componentes `ui/` (Button, Tag, Badge, Icon, CredentialLink, Section). ThemeToggle/LangToggle viven en `Base.astro` desde F1 (un solo uso); "Ticket" descartado, el motivo boleto se retiro en doc 05 y su rol lo cubren Badge y la linea de estado.
- [x] Secciones en orden: Hero (con la línea de estado firma), CaseStudyTeaser, Projects (con badges de estado real), Skills, Certifications, Contact. Footer (estado del sistema) ya estaba en `Base.astro` desde F1.
- [x] Header sticky con nav, toggles y estados `aria-current` (a 360px se oculta "Inicio" y se comprime el logo; sin menú móvil con solo 3 links).
- Verificación [hecha]: home ES/EN completa (build + preview 200, contenido íntegro sin JS), presupuesto JS/CSS en verde, reglas duras por grep. Detalle: `docs/rondas/2026-07-06_f3.md`. El QA visual profundo (Lighthouse, teclado, NVDA, fps) es F6.

## Fase 4 · Case study · [hecho] 2026-07-06

- [x] Página `/acp-suite` y `/en/acp-suite` con TOC sticky en desktop (lineal en móvil), renderizando la colección `case-study`.
- [x] SVG del diagrama de arquitectura a partir del Mermaid: componente único con geometría compartida y etiquetas por idioma (mismos trazos garantizados; ver doc 04 actualizado), tematizado por tokens, `role="img"` + `<title>`/`<desc>`.
- [x] Franja "corte de caja" con las cifras autorizadas del frontmatter.
- [x] Componente carrusel accesible (GSAP Draggable vía proxy, sin InertiaPlugin: tween de snap al soltar) que aparece solo si hay capturas; sin ellas no se renderiza y Draggable no entra al bundle. Degrada a scroll-snap sin JS (docs 05 y 06).
- Verificación [hecha]: `check`/`build`/`preview` en verde (4 páginas + sitemap, todas 200), anclas del TOC = ids reales, presupuesto JS 44.5 KB gzip / CSS 5.0 KB, reglas duras por grep. Detalle: `docs/rondas/2026-07-06_f4.md`.

## Fase 5 · SEO, assets y analítica (doc 06) · [hecho] 2026-07-06 (beacon integrado el mismo día al resolverse D7)

- [x] `Seo.astro` completo: canonical/OG/JSON-LD con `angelezequiel.dev` (ADR 0007), hreflang revisado, imágenes OG 1200×630 por página/idioma en `src/assets/og/` (generadas con `scripts/og-images.mjs`, one-off sin tocar dependencias), JSON-LD por página (Person + SoloKey en home, SoftwareSourceCode de ACP en el case study), og:type `article` en el case study.
- [x] `robots.txt` apuntando al sitemap, sitemap con alternates (sin la 404), 404 útil bilingüe (página única: GitHub Pages sirve un solo `404.html`; bloques ES/EN con `lang`, sin canonical/hreflang).
- [x] Favicon nuevo acorde a la identidad: monograma "A" + punto de estado en verde (`favicon.svg` tematizado con `prefers-color-scheme`), más `favicon.ico` (16/32/48) y `apple-touch-icon.png` (`scripts/favicons.mjs`).
- [x] Integrar el beacon de Cloudflare Web Analytics (ADR 0006) con su CSP: hecho el 2026-07-06 al entregar el dueño el token (D7). Beacon `defer` al final del `<body>` y meta CSP en `Base.astro`, ambos solo en producción (doc 06 actualizado). Verificado con Chrome headless: 0 violaciones de CSP en las 4 rutas, tema/motion intactos. Detalle: `docs/rondas/2026-07-06_d7-beacon.md`.
- Verificación [hecha]: `check`/`build`/`preview` en verde (5 páginas: 4 + `404.html`, todas 200 y la ruta inexistente 404), OG y JSON-LD presentes en `dist/`, reglas duras por grep, presupuesto intacto (sin JS nuevo al cliente, lockfile intacta). Validación externa de JSON-LD/OG queda en F6 (auditorías). Detalle: `docs/rondas/2026-07-06_f5.md`.

## Fase 6 · Pulido y QA (gate de merge) · [hecho] 2026-07-06 (pase NVDA y validadores externos quedan al dueño)

- [x] Pase de polish con `make-interfaces-feel-better` (radios concéntricos, tabular-nums, hit areas, sombras, staggers) reportado en tablas antes/después (skills cargadas desde `.agents/skills/`).
- [x] Auditoría con `web-design-guidelines` (guías frescas de Vercel) y con `review-animations` (veredicto Approve); hallazgos corregidos (meta theme-color, hovers, sr-only pestaña nueva, skip link sin animación, estado visual del toggle).
- [x] Lighthouse móvil/desktop ≥ objetivos del doc 06 (99-100 en todo; LCP móvil 1.7-1.8 s, CLS ~0, TBT 0 ms); presupuesto sobre `dist/` en verde (JS 44.7 KB gzip en páginas animadas, ~1 KB en 404/reduced motion tras el gate; CSS 5.3 KB; 3 woff2).
- [x] Teclado verificado (e2e automatizado); guion NVDA y validadores externos de JSON-LD/OG documentados para el dueño en el tracker; validación estructural local de JSON-LD/OG/hreflang/sitemap en verde (56 checks).
- [x] `frontend-code-review` sobre `src/` (sin hallazgos) y `/code-review` del diff `master..develop` (10 ángulos; 6 hallazgos corregidos, refactors de reutilización diferidos a chore post-lanzamiento; detalle en el tracker).
- [x] Verificación end-to-end con Playwright sobre `astro preview` (34 checks): detección de idioma con guarda, toggle de tema (persistencia + anti-FOUC), case study (TOC, diagrama), credenciales, descarga de CV, 404 real, sin JS íntegro, reduced motion.
- Verificación [hecha]: `check`/`build`/`preview` en verde; reglas duras por grep en verde; lockfile intacta (playwright/lighthouse via `--no-save`/`npx`). Detalle: `docs/rondas/2026-07-06_f6.md`. Rama `feat/pulido-qa`.

## Fase 7 · Lanzamiento y perfil · [hecho] 2026-07-06 (perfil D5/D6 y pase visual D4 quedan al dueño)

- [x] Merge a `master` (autorizado por el dueño el 2026-07-06, ejecutado como fast-forward `20dbf85..9390c0e`), deploy de Pages en verde y verificado en la URL real: título e H1 nuevos en `/`, `/en/` y `/acp-suite/` en 200, 404 real, CSS y CV en 200, beacon presente.
- [x] Reescribir `README.md` del repo: hecho el 2026-07-06 (describe el sitio nuevo: stack real, características, desarrollo, estructura y puntero a `docs/`).
- [ ] Publicar `GITHUB_PROFILE_README.md` en el repo de perfil y actualizar LinkedIn con `LinkedIn_ES_EN.md` (fuera de este repo).

## Qué skill usar en cada fase

| Skill | Fase | Para qué |
| --- | --- | --- |
| `grill-me` | antes de la 1 | Interrogar este plan y detectar huecos (recomendado) |
| `clean-code` | 1-4 | Nombres, funciones y componentes legibles |
| `typescript-advanced-types` | 2 | Esquemas y diccionario i18n tipados |
| `frontend-design` | 3-4 | Ejecutar la dirección del doc 05 sin caer en defaults |
| `responsive-design` | 3-4 | Layout fluido, container queries si aplican |
| `make-interfaces-feel-better` | 3-4 y 6 | Micro-detalles y pase de polish final |
| `animation-vocabulary` | 3-6 | Nombrar con precisión los efectos al implementarlos/revisarlos |
| `review-animations` | 6 | Auditoría del motion |
| `web-design-guidelines` | 6 | Auditoría de UI/a11y con reglas frescas |
| `frontend-code-review` / `code-review` | 6 | Revisión de código del diff |
| `verify` / `run` | 6-7 | Comprobar el flujo real end-to-end |
| `ui-skills-root`, `shadcn` | n/a | Solo si se agregaran islas React; el plan actual no las tiene |

## Riesgos y decisiones abiertas

| Riesgo | Mitigación |
| --- | --- |
| Rutas absolutas hardcodeadas | Regla doc 03: todo por `BASE_URL` (raíz) y nunca hardcodear dominio; probar SIEMPRE con `preview`, no solo `dev` |
| Dominio/DNS mal configurado (Cloudflare + Pages) | Seguir ADR 0007 (registros DNS, CNAME, HTTPS); el dueño configura (D9) y se verifica el deploy en `angelezequiel.dev` |
| GitHub Pages sin redirects de servidor | Detección de idioma client-side con guarda anti ping-pong (doc 04); aceptado |
| El vocabulario "sistema/monitoreo" puede volverse gimmick | Límite duro: 3 apariciones con datos reales (doc 05); si en el mirror final se siente disfraz, se reduce a la sola línea de estado del hero |
| Fecha "en producción desde junio 2026" vs hoy (julio 2026) | Correcta según el case study; revisar el copy "presente" en cada actualización futura |
| Contenido transcrito diverge de `perfil-mejorado/` | Regla doc 04: gana `perfil-mejorado/`; revisión cruzada en fase 2 |
| Em dash colándose por autocompletado | Grep del carácter en fase 2 y de nuevo en fase 6 |

## Definition of done (resumen)

Sitio bilingüe ES/EN con detección de navegador y toggle · tema claro/oscuro sin FOUC · home + case study + 404 · CV nuevo descargable · credenciales con link directo · Lighthouse ≥ 95/100/100 · AA verificado · cero requests externos · reglas duras del doc 02 en verde · deploy en Pages funcionando · README nuevo.
