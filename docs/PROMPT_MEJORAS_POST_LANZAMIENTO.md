# Prompt para la ronda de mejoras post-lanzamiento (copiar y pegar en un chat nuevo)

Pega TODO lo que está debajo de la línea como primer mensaje en una sesión de Claude Code abierta en este repo (`c:\Proyectos\portfolio`). Redactado el 2026-07-06 a partir de los pedidos del dueño tras ver el sitio en producción.

---

Vas a hacer una ronda de mejoras sobre el portfolio YA LANZADO en <https://angelezequiel.dev> (F0 a F7 hechas, ver `docs/PROMPT_DESARROLLO.md` y `docs/PENDIENTES_AGENTE.md`). Antes de tocar código lee `docs/README.md`, `docs/05-diseno.md`, `docs/06-seo-rendimiento-a11y.md`, `docs/08-convenciones-y-proceso.md` y los ADR. No re-decidas lo ya decidido: si una tarea pide algo que contradice un ADR, propone un ADR nuevo y espera el OK del dueño antes de codificar.

## Reglas duras (doc 02, no negociables)

1. Sin em dash. Sin emojis (SVG propio sí). Sin glassmorphism, orbes ni partículas.
2. Precisión técnica: NO "microservicios", NO Redis/Supabase/OAuth2. Solo métricas autorizadas.
3. Commits de una línea, `tipo(ambito): descripcion`, español sin acentos, sin pie de firma de IA.
4. Rama corta desde `develop` por cambio; a `master` NUNCA hace merge el asistente (lo hace el dueño).
5. Verificar con `npm run build` + `npm run preview` (no solo dev), sin JS y ~60fps. Reglas duras por grep al cerrar.
6. Si cambia el copy del hero (`ui.ts`) o el frontmatter del case study, REGENERAR las imágenes OG con `scripts/og-images.mjs` (espejan ese copy a mano; regla de mantenimiento de `PENDIENTES_AGENTE.md`).

## Tareas (en este orden sugerido: primero bugs, luego contenido, al final lo visual)

### T1 · Bug: puntos sueltos en las pills del stack del case study

En `/acp-suite/`, la sección "Stack" (`CaseStudyArticle.astro`, el `<ul class="mt-6 flex flex-wrap gap-2">` que pinta `Tag` por item del frontmatter) muestra un marcador de lista pegado a cada pill. Causa probable: los estilos de lista de la prosa scoped se filtran a este `ul` (los `li` conservan `display: list-item` y su `::marker`). Arreglar scoping (limitar los estilos de lista al contenedor de prosa o `list-none` en el ul de stack) y revisar que no pase lo mismo en otras listas fuera de la prosa.

### T2 · Bug: espacio en blanco grande antes de la sección Stack

En el case study hay un hueco vertical notorio entre el final de "Lecciones aprendidas" y "Stack" (se ven dos separadores con un bloque vacío en medio). Diagnosticar en `CaseStudyArticle.astro` (márgenes de `.cs-section`, borde/padding duplicado, o un contenedor vacío que solo debería existir con capturas) y corregir. Verificar en móvil y desktop.

### T3 · Certificaciones: escalar la sección y cargar las nuevas

Hoy hay 3 certificaciones en `src/data/certifications.json` (`{ name, issuer, year, url }` por entrada, link verificable obligatorio). El dueño tiene MUCHAS más por subir:

- Pedirle al dueño la lista completa (nombre exacto, emisor, año, URL de credencial verificable) y agregarlas al JSON en ambos idiomas si el nombre difiere (revisar cómo consume `ui.ts`/`Certifications.astro` el JSON).
- Rediseñar la sección para N entradas sin romper el ritmo de la home: opciones a evaluar con `frontend-design` (grid de 2-3 columnas, agrupación por emisor o año, o lista compacta con las destacadas arriba). Mantener hit areas >= 40x40, `sr-only` de pestaña nueva y AA.
- Criterio del doc 02: solo credenciales con URL verificable; nada inventado.

### T4 · Contacto: agregar el teléfono

Agregar el número `+52 33 2019 1633` (el mismo del CV) a la sección de contacto, ES y EN: en `src/data/site.ts` y el componente `sections/Contact.astro`, como link `tel:+523320191633` con icono propio (ver T6) y label localizado. Evaluar agregarlo también al JSON-LD `Person` (`telephone`) en `src/lib/jsonld.ts`: es dato ya público en el CV, decisión del dueño si lo quiere en datos estructurados.

### T5 · Footer: recortar la línea de estado

El footer dice "ultima actualizacion 2026-07 · sitio estatico · build ok" (`footer.status` en `src/i18n/ui.ts`, ES y EN). Quitar "sitio estatico" y "build ok"; dejar solo la última actualización (confirmar copy exacto con el dueño). Nota doc 05: el vocabulario "sistema" tiene límite de 3 apariciones con datos reales; al recortar el footer, revisar que la línea de estado del hero siga siendo coherente.

### T6 · Más iconos SVG

Ampliar `src/components/ui/Icon.astro` con iconos propios consistentes con los existentes (mismo grosor de trazo, mismo viewBox, `aria-hidden` cuando acompañan texto): al menos teléfono (T4), descarga (T8 y el botón de CV existente), y los que pidan T3/T7. Sin librerías externas: SVG artesanal inline, tematizado por `currentColor`. Sin emojis.

### T7 · Renombrar "ACP Suite" a "ACP" (portfolio Y CV)

Decisión del dueño (2026-07-06): el producto se nombra "ACP" a secas.

- `src/`: buscar "ACP Suite" en `ui.ts`, contenido (`src/content/case-study/*.md`: title, tagline y cuerpo), `CaseStudyTeaser`, `jsonld.ts` (name del `SoftwareSourceCode`) y `Seo`/titles. OJO: "ACP" es también la empresa (Autocamiones del Pacífico); revisar frase por frase que no quede ambiguo (donde haga falta, "la plataforma de ACP").
- Las RUTAS `/acp-suite/` y `/en/acp-suite/` NO cambian: ya están impresas en el CV PDF, indexadas y GitHub Pages no tiene redirects de servidor. Documentar esta decisión en el tracker (el slug es identificador, no copy).
- Al tocar title/tagline del case study: regenerar las imágenes OG (regla 6 de arriba).
- CV: aplicar el mismo cambio en `perfil-mejorado/CV_Angel_Barbosa.html` (summary), regenerar el PDF con Chrome headless (flujo documentado en `docs/rondas/2026-07-06_d7-beacon.md` y la ronda del CV: playwright-core + `page.pdf` con `preferCSSPageSize`) y reemplazar `public/cv/Angel_Barbosa_CV.pdf`. Verificar 1 página y links.
- Pase de reglas duras al final (grep) y validación de que el JSON-LD sigue parseando.

### T8 · Botón de descarga del CV en el header

Agregar al nav de `Base.astro` un botón/link directo de descarga del CV (`/cv/Angel_Barbosa_CV.pdf` vía `BASE_URL`, atributo `download`, label localizado "Descargar CV (PDF)" / "Download CV (PDF)", doc 06). Consideraciones: el header ya se comprime a 360px (se oculta "Inicio" y el logo se acorta), así que decidir presentación responsive (icono de descarga con `aria-label` en móvil, texto en desktop) sin romper el ancho mínimo; hit area >= 40x40; mismo lenguaje visual que los toggles.

### T9 · Fondo con animación interactiva + intro con el nombre (REQUIERE ADR NUEVO ANTES DE CODIFICAR)

El dueño quiere el sitio "más visual": (a) algo de fondo con una animación interactiva y (b) una animación de intro con su nombre al entrar. Ambas tocan el ADR 0005 (papel y tinta, sin decoración en bucle) y las reglas de rendimiento del doc 06 (la decoración animada fue la causa de los FPS bajos del sitio viejo; además el LCP DEBE ser el titular/nombre en texto, así que una intro que retrase pintar el nombre es un riesgo directo de LCP). Proceso obligatorio:

1. Proponer 2-3 opciones como borrador de **ADR 0009**, TODAS dentro de estos límites: sin glassmorphism/orbes/partículas, solo `transform`/`opacity` (nada de blur/box-shadow/color en bucle), sin canvas ni `requestAnimationFrame` decorativo permanente, interactiva mejor que infinita (que responda al usuario: puntero, scroll, hover), apagada con `prefers-reduced-motion`, presupuesto JS < 60 KB gzip intacto, ~60fps medidos.
2. Fondo, ideas candidatas coherentes con "sistema en producción": retícula/blueprint técnica sutil que reacciona al puntero por `transform` en celdas cercanas; el diagrama SVG del case study con estados interactivos al hover; microinteracciones GSAP en la línea de estado del hero. Son puntos de partida, no decisiones.
3. Intro con el nombre, restricciones específicas (además de las del punto 1): el nombre nace visible en el HTML (nunca `opacity:0` a la espera de JS, ya es regla de mejora progresiva), la animación solo mejora un contenido que ya está pintado (revelar por transform, no aparecer desde cero); debe correr UNA sola vez y ser muy corta (que no haga esperar al reclutador, que es el usuario objetivo del doc 01); considerar mostrarla solo en la primera visita de la sesión (guarda en `sessionStorage`) para no repetirla en cada navegación; medir que el LCP móvil siga < 1.8 s (hoy 1.7-1.8 s, hay poco margen). Si la intro compromete el LCP, se descarta o se degrada a una microinteracción del hero existente.
4. Presentar las opciones al dueño con costo/beneficio (peso, fps, ruido visual, impacto en LCP) y NO implementar hasta su OK explícito del ADR.
5. Tras implementar: re-correr Lighthouse (objetivos doc 06, con foco en LCP), medir fps en DevTools y verificar sin JS y reduced motion.

### T10 · CV bilingüe (ES en página ES, EN en página EN)

Idea del dueño (2026-07-06): servir un CV en español cuando el sitio está en español y en inglés cuando está en inglés. Hoy existe un solo CV en inglés (`perfil-mejorado/CV_Angel_Barbosa.html` -> `public/cv/Angel_Barbosa_CV.pdf`).

- Redactar la versión ES del CV a partir del contenido fuente (`perfil-mejorado/CV_contenido_EN.md` es la base EN; traducir aplicando reglas duras: sin acentos NO aplica al CV, que es contenido formal con acentos correctos, pero sí sin em dash y sin inventar datos). Mantener nombres propios de tecnologías en inglés.
- Generar dos PDFs (`Angel_Barbosa_CV_ES.pdf` y `..._EN.pdf`, o `.../es/` y `.../en/`) con el mismo pipeline de Chrome headless; decidir nombres estables (OJO: si cambia la ruta del PDF EN actual, ya está impresa en el PDF que circula; conservar un alias o mantener el nombre EN).
- Cablear el link de descarga (T8 y `sections/Contact.astro`) para que use el CV del idioma activo vía los helpers de `i18n/utils.ts`.
- Regla de mantenimiento nueva a documentar: el CV vive en DOS idiomas; al actualizar uno, actualizar el otro y regenerar ambos PDFs. Añadir esta regla a `PENDIENTES_AGENTE.md`.
- Aplicar aquí también el renombrado de T7 (ACP) en ambos idiomas.

## Datos que el dueño debe pegar en la sesión

- Lista completa de certificaciones nuevas: nombre exacto, emisor, año, URL de credencial (T3).
- Copy exacto que quiere en el footer (T5) si no le convence dejar solo "ultima actualizacion YYYY-MM".
- OK o ajustes al ADR 0009 (T9: fondo interactivo + intro con el nombre) antes de que se escriba código de esa tarea.
- Confirmación de si quiere el CV bilingüe (T10) y revisión de la traducción ES cuando esté redactada.

## Resumen de tareas

| ID | Tarea | Tipo | Bloqueo |
| --- | --- | --- | --- |
| T1 | Puntos sueltos en pills del stack | bug | no |
| T2 | Espacio en blanco antes de Stack | bug | no |
| T3 | Escalar y cargar más certificaciones | contenido | lista del dueño |
| T4 | Teléfono en contacto | contenido | no |
| T5 | Recortar footer (quitar "sitio estatico"/"build ok") | contenido | copy del dueño |
| T6 | Más iconos SVG | ui | no |
| T7 | Renombrar "ACP Suite" a "ACP" (sitio + CV) | contenido | no |
| T8 | Botón de descarga de CV en el header | ui | no |
| T9 | Fondo interactivo + intro con el nombre | visual | ADR 0009 + OK dueño |
| T10 | CV bilingüe ES/EN por idioma de página | contenido | OK dueño + traducción |

## Al cerrar la ronda

`check` + `build` + `preview` en verde (o `podman compose up --build`), e2e rápido del flujo (tema, idioma, case study, CV, 404), reglas duras por grep, y actualizar: `PENDIENTES_AGENTE.md`, el doc del área que cambie (05/06), tracker nuevo en `docs/rondas/`, el estado de `docs/PROMPT_DESARROLLO.md` y este archivo (marcar tareas hechas). Merge de la rama de trabajo a `develop` y push; el merge a `master` lo decide el dueño.
