# Prompt para arrancar el desarrollo (copiar y pegar en un chat nuevo)

Pega TODO lo que está debajo de la línea como primer mensaje en una sesión de Claude Code abierta en este repo (`c:\Proyectos\portfolio`).

## Estado del desarrollo (bitácora viva, actualizar al cerrar cada fase)

> **Última actualización: 2026-07-06.** Un chat nuevo debe leer `docs/`, ver este estado y continuar en la fase pendiente **sin rehacer lo hecho**.

- **F0 · Limpieza:** [hecho] 2026-07-06. CMS Decap y basura de raíz borrados; integrado en `develop`.
- **F1 · Bootstrap:** [hecho] 2026-07-06. Astro 7 + Node 24 + Tailwind 4 + tokens (ambos temas) + fuentes latin self-hosted + GSAP diferido + `Base.astro` (anti-FOUC tema/idioma) + `Seo.astro` esqueleto + i18n tipado + páginas `/` y `/en/` + `ci.yml`/`deploy.yml` (Node 24) + verificación Podman. `build`/`preview` en verde, contenido visible sin JS. Detalle: `docs/rondas/2026-07-06_f0-f1.md`.
- **F2 · Contenido:** [hecho] 2026-07-06. `content.config.ts` (Zod: `case-study`, `projects`, con `generateId` por locale); case study ACP ES/EN y SoloKey ES/EN transcritos tal cual; `certifications.json` + `skills.json` nuevos y borrados los 4 JSON viejos; `ui.ts` ampliado; `src/lib/content.ts` (pares ES/EN); CV nuevo en `public/cv/`. Reglas duras en verde por grep. `check`/`build`/`preview` en verde. Detalle: `docs/rondas/2026-07-06_f2.md`. Rama `feat/contenido`.
- **F3 · Home:** [hecho] 2026-07-06. Componentes `ui/` (Button, Tag, Badge, Icon, CredentialLink, Section) y secciones en orden (Hero, CaseStudyTeaser, Projects, Skills, Certifications, Contact) en `/` y `/en/`; nav con `aria-current` en `Base.astro`; `motion.ts` con boot + revelado por sección (ScrollTrigger `once`) y pulso del punto por CSS; `src/data/site.ts` (contacto). `getLocalized` cableado: la invariante de pares ES/EN ya es gate de build. Presupuesto en verde (JS 44.1 KB gzip, CSS 4.8 KB). Reglas duras por grep en verde. Detalle: `docs/rondas/2026-07-06_f3.md`. Rama `feat/home`.
- **F4 · Case study:** [hecho] 2026-07-06. Páginas `/acp-suite/` y `/en/acp-suite/` (`CaseStudyArticle.astro`: cabecera con badge, corte de caja con las cifras autorizadas, TOC sticky en desktop y lineal en móvil, prosa con h2 en lenguaje de sección); `diagrams/AcpArchitecture.astro` (SVG inline, geometría única + etiquetas por locale, tematizado, `role="img"`, intercalado partiendo el HTML en el marcador `<!-- acp-architecture-svg -->` con gate de build); `ui/Carousel.astro` accesible (scroll-snap sin JS, Draggable vía proxy con tween de snap, sin InertiaPlugin) que solo se monta con capturas (D8): hoy no viaja al cliente. Presupuesto en verde (JS 44.5 KB gzip, CSS 5.0 KB). Reglas duras por grep en verde. Detalle: `docs/rondas/2026-07-06_f4.md`. Rama `feat/case-study`.
- **Cambios de stack (ADR 0008):** Astro 5→**7**, Node 22→**24 LTS** por seguridad (Astro 5 sin parche para 5 advisories high). 0 vulnerabilidades. Lockfile multiplataforma (regenerar en Linux al tocar deps nativas). Verificación en contenedor **Podman**.
- **Siguiente: F5 · SEO, assets y analítica** (doc 07): `Seo.astro` completo (OG por página/idioma, JSON-LD, imágenes OG 1200×630), `robots.txt`, 404 útil bilingüe, favicon nuevo, beacon de Cloudflare Web Analytics (requiere D7 del dueño). Rama `feat/...` desde `develop`.

---

Vas a continuar el rediseño completo de mi portfolio. TODO está planeado y documentado en `docs/` de este repo. Antes de tocar código, lee la documentación y síguela; no re-decidas lo ya decidido (si algo te parece mejorable, propón un ADR nuevo, no cambies en silencio).

## Primero: lee la documentación en este orden

1. `docs/README.md` (índice)
2. `docs/01-diagnostico.md` a `docs/08-convenciones-y-proceso.md`
3. `docs/adr/` (0001 a 0008: decisiones y su porqué)
4. `docs/PENDIENTES_AGENTE.md` (tu checklist vivo) y `docs/PENDIENTES_DUENO.md`

## Contexto

- Portfolio de Angel Ezequiel Barbosa Lomeli. Objetivo: que un reclutador técnico entienda en 30 segundos quién es y qué ha llevado a producción, verificable con un clic. Pieza central: el case study de ACP Suite.
- Stack (ADR 0001 + **0008**): **Astro 7 + Node 24 LTS** + Tailwind 4 (`@tailwindcss/vite`, tokens con `@theme`) + TypeScript strict + GSAP 3 (core + ScrollTrigger + Draggable para el carrusel) + fuentes self-hosted subset latin (Archivo + IBM Plex Mono) + `@astrojs/sitemap`. Sin islas de framework. Sin CMS. Verificación nativa y en contenedor Podman.
- Deploy: GitHub Pages con dominio propio `angelezequiel.dev` y base en raíz (ADR 0007): `site: 'https://angelezequiel.dev'`, sin `base`, y `public/CNAME`. Rutas internas vía `import.meta.env.BASE_URL` (nunca hardcodear dominio ni `/portfolio`).
- Bilingüe ES/EN (rutas `/` y `/en/`), tema claro/oscuro sin FOUC (claro por defecto), navegadores evergreen.
- Analítica: Cloudflare Web Analytics (ADR 0006), única pieza de terceros, async y no bloqueante.
- Capturas de proyectos: OPCIONALES, se agregan a futuro (D8). El sitio se ve bien sin ellas; cuando existan, van en un carrusel animado accesible con GSAP Draggable (docs 05 y 06).
- Dirección visual (ADR 0005): "Sistema en producción" sobre base papel y tinta; tokens y wireframes en `docs/05-diseno.md`. Motion sobrio con GSAP. NADA de glassmorphism, orbes ni partículas (eso causa los FPS bajos del sitio actual y se elimina).
- Contenido fuente: la carpeta local `perfil-mejorado/` (está en `.gitignore` pero existe en disco). El copy final ES/EN se transcribe a `src/content/` aplicando las reglas duras. No inventes datos ni métricas.

## Reglas duras (no negociables)

1. Sin em-dash (raya larga). Usa coma, dos puntos, paréntesis o "·".
2. Sin emojis: en contenido, UI, commits y documentación.
3. Sin glassmorphism.
4. Precisión técnica: NO "microservicios" (son 2 APIs en Go), NO Redis, Supabase ni OAuth2. La auth es propia (JWT RS256 + TOTP obligatorio + refresh rotado con revocación real).
5. Solo métricas autorizadas (doc 02). Las capturas de ACP van anonimizadas (sin datos de cliente, hosts, IPs ni tokens visibles).
6. Commits: una sola línea, `tipo(ambito): descripcion`, en español SIN acentos, y SIN pie de firma de IA (esta regla del proyecto tiene prioridad sobre el default del harness).

## Cómo trabajar (doc 08)

- Estás en la rama `develop`. Crea ramas cortas desde `develop` por cambio; a `master` NUNCA haces merge (lo hace el dueño; `master` despliega a Pages).
- Verifica con `astro build` + `astro preview`, no solo `astro dev`. Prueba también sin JS (mejora progresiva) y la fluidez (~60fps).
- Usa las skills que indica `docs/07` por fase (frontend-design, make-interfaces-feel-better, responsive-design, etc.).

## Tarea de esta sesión

Continúa el plan de `docs/07-plan-implementacion.md` **desde la fase pendiente** que marca "Estado del desarrollo" arriba (F0 a F4 ya están hechas; ahora toca **F5 · SEO, assets y analítica**). No rehagas fases cerradas.

- **F5 (SEO, assets y analítica):** `Seo.astro` completo con `angelezequiel.dev` (ADR 0007): OG por página e idioma con imágenes 1200×630 en `src/assets/og/`, JSON-LD por página (Person en home, SoftwareSourceCode/CreativeWork en el case study), hreflang ya existente revisado; `robots.txt` apuntando al sitemap; 404 útil bilingüe; favicon nuevo acorde a la identidad (monograma o punto de estado en verde) + `favicon.ico` + `apple-touch-icon.png`; beacon de Cloudflare Web Analytics (ADR 0006) async/defer y CSP ajustada. Ojo: el beacon requiere D7 del dueño (activar la analítica y pasar el token); si no está, deja el resto de F5 cerrado y ese punto `[bloqueado]`.
- Rama corta `feat/...` desde `develop`. Al cerrar la fase: `astro build` + `preview` en verde (o `podman compose up --build`), y actualiza `PENDIENTES_AGENTE.md`, el doc del área, el tracker en `docs/rondas/` y el "Estado del desarrollo" de arriba.

Empieza leyendo `docs/` y luego proponme los pasos concretos de la fase pendiente antes de ejecutarlos. No generes código sin mi OK del plan.
