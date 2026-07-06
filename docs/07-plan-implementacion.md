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

## Fase 2 · Contenido (docs 02 y 04)

- [ ] `content.config.ts` con esquemas Zod (`projects`, `case-study`) y validación de pares ES/EN por slug.
- [ ] Transcribir el case study ES/EN desde `perfil-mejorado/CASE_STUDY_ACP_ES_EN.md` (tal cual, sin cambiar datos).
- [ ] Redactar `solokey.es.md` / `solokey.en.md`, `certifications.json`, `skills.json`, diccionario `ui.ts`.
- [ ] Copiar el CV nuevo a `public/cv/Angel_Barbosa_CV.pdf`.
- [ ] Dejar el contenido listo SIN capturas (son opcionales, se agregan a futuro con D8): tarjetas y case study deben verse bien sin imágenes.
- [ ] **Pase de reglas duras (doc 02)**: grep de "microservicio", "Redis", "Supabase", "OAuth2" y del carácter em dash sobre `src/`; cero resultados.

## Fase 3 · Home (docs 04 y 05)

- [ ] Componentes `ui/` (Button, Tag, Icon, ThemeToggle, LangToggle, Ticket, CredentialLink).
- [ ] Secciones en orden: Hero (con la línea de estado firma), CaseStudyTeaser, Projects (con badges de estado real), Skills, Certifications, Contact, Footer (metadata del sitio).
- [ ] Header sticky con nav, toggles y estados `aria-current`.
- Verificación: home ES/EN completa y responsive (360px+), ambos temas, sin JS de framework.

## Fase 4 · Case study

- [ ] Página `/acp-suite` y `/en/acp-suite` con TOC sticky en desktop.
- [ ] SVG del diagrama de arquitectura (uno por idioma, tematizado, accesible) a partir del Mermaid.
- [ ] Franja "corte de caja" con las cifras autorizadas.
- [ ] Componente carrusel accesible (GSAP Draggable) que aparece solo si hay capturas; sin ellas no se renderiza. Degrada a scroll-snap sin JS (docs 05 y 06).

## Fase 5 · SEO, assets y analítica (doc 06)

- [ ] `Seo.astro` completo: canonical/OG/JSON-LD con `angelezequiel.dev` (ADR 0007), hreflang, imágenes OG 1200×630, JSON-LD por página.
- [ ] `robots.txt`, sitemap con alternates, 404 útil bilingüe.
- [ ] Favicon nuevo acorde a la identidad (monograma o punto de estado en verde), más `favicon.ico` y `apple-touch-icon.png`.
- [ ] Integrar el beacon de Cloudflare Web Analytics (ADR 0006) async/defer; ajustar CSP. Requiere activarlo en Cloudflare (D7 del dueño).

## Fase 6 · Pulido y QA (gate de merge)

- [ ] Pase de polish con `make-interfaces-feel-better` (radios concéntricos, tabular-nums, hit areas, sombras, staggers) reportado en tablas antes/después.
- [ ] Auditoría con `web-design-guidelines` y con `review-animations`; corregir hallazgos.
- [ ] Lighthouse móvil/desktop ≥ objetivos del doc 06; presupuesto de peso revisado sobre `dist/`.
- [ ] Prueba manual de teclado + NVDA; validación de JSON-LD y OG.
- [ ] `frontend-code-review` sobre los archivos nuevos y `/code-review` del diff de la rama.
- [ ] Verificación end-to-end (skill `verify` / `run`): flujo real detección de idioma → toggle tema → case study → credenciales → descarga de CV, con `astro preview` (el `base` cambia rutas; probar ahí, no solo en dev).

## Fase 7 · Lanzamiento y perfil

- [ ] Merge a `master`, verificar el deploy de Pages en la URL real.
- [ ] Reescribir `README.md` del repo (el actual describe el sitio viejo).
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
