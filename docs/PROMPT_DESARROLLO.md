# Prompt para arrancar el desarrollo (copiar y pegar en un chat nuevo)

Pega TODO lo que está debajo de la línea como primer mensaje en una sesión de Claude Code abierta en este repo (`c:\Proyectos\portfolio`).

---

Vas a continuar el rediseño completo de mi portfolio. TODO está planeado y documentado en `docs/` de este repo. Antes de tocar código, lee la documentación y síguela; no re-decidas lo ya decidido (si algo te parece mejorable, propón un ADR nuevo, no cambies en silencio).

## Primero: lee la documentación en este orden

1. `docs/README.md` (índice)
2. `docs/01-diagnostico.md` a `docs/08-convenciones-y-proceso.md`
3. `docs/adr/` (0001 a 0007: decisiones y su porqué)
4. `docs/PENDIENTES_AGENTE.md` (tu checklist vivo) y `docs/PENDIENTES_DUENO.md`

## Contexto

- Portfolio de Angel Ezequiel Barbosa Lomeli. Objetivo: que un reclutador técnico entienda en 30 segundos quién es y qué ha llevado a producción, verificable con un clic. Pieza central: el case study de ACP Suite.
- Stack (ADR 0001): Astro 5 + Tailwind 4 (`@tailwindcss/vite`, tokens con `@theme`) + TypeScript strict + GSAP 3 (core + ScrollTrigger + Draggable para el carrusel) + fuentes self-hosted (Archivo + IBM Plex Mono) + `@astrojs/sitemap`. Sin islas de framework. Sin CMS.
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

Ejecuta el plan de `docs/07-plan-implementacion.md` desde el inicio:

- **Fase 0 (limpieza):** el respaldo de `perfil-mejorado/` y `plantilla-proyecto/` ya está hecho (D1 confirmado). Borra lo listado en F0: CMS Decap (`public/admin/`, `src/pages/admin.astro`), `downloaded.html`, `remote_cert.json`, `src/pages/certificados.astro` y `public/hero-setup.jpg`.
- **Fase 1 (bootstrap):** Astro 5 (`site: 'https://angelezequiel.dev'`, base raíz, `public/CNAME`) + Tailwind 4 + tokens del doc 05 (ambos temas) + fuentes self-hosted + GSAP + `Base.astro` con scripts anti-FOUC de tema e idioma + `Seo.astro` esqueleto + workflow de CI en `develop`.
- Al cerrar cada fase: `astro build` + `preview` en verde, y actualiza `PENDIENTES_AGENTE.md` y el doc del área.

Empieza leyendo `docs/` y luego proponme los pasos concretos de F0 y F1 antes de ejecutarlos. No generes código sin mi OK del plan de arranque.
