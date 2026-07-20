# Prompt para la ronda de mejoras post-lanzamiento (copiar y pegar en un chat nuevo)

Redactado el 2026-07-06 a partir de los pedidos del dueño tras ver el sitio en producción.

> **RONDA EJECUTADA el 2026-07-06**: T1-T11 hechas en `develop` (merge a `master` lo decide el dueño). Estado y decisiones en `docs/rondas/2026-07-06_mejoras-post-lanzamiento.md`; la tabla de abajo queda marcada. Este archivo se conserva como registro de la orden original.

## Versión corta (recomendada): pega SOLO esto en un chat nuevo abierto en el repo

> Chat nuevo en este repo (portfolio ya lanzado en angelezequiel.dev, F0-F7 hechas). Vas a hacer una ronda de mejoras post-lanzamiento. La lista de tareas (T1-T11), sus restricciones y el inventario de certificados están en `docs/prompts/PROMPT_MEJORAS_POST_LANZAMIENTO.md`: léelo completo y sigue lo que dice, incluyendo los docs que referencia (05, 06, 08 y los ADR). Respeta las reglas duras del doc 02 (sin em dash, sin emojis, sin glassmorphism, precisión técnica, solo métricas autorizadas) y las de proceso del doc 08 (commits de una línea sin acentos ni firma de IA; rama corta desde `develop`; a `master` NUNCA haces merge, lo hace el dueño). Antes de codificar, proponme el plan de la ronda y espera mi OK; T9 (motion) requiere redactar y aprobar el ADR 0009 antes de tocar código, y T3 (certificados) requiere mi curación. Verifica con `npm run build` + `preview` o `podman compose up --build`.

La versión larga de abajo es la fuente de verdad que ese chat leerá del disco; no hace falta pegarla.

---

Vas a hacer una ronda de mejoras sobre el portfolio YA LANZADO en <https://angelezequiel.dev> (F0 a F7 hechas, ver `docs/PENDIENTES_AGENTE.md`). Antes de tocar código lee `docs/README.md`, `docs/canon/05-diseno.md`, `docs/canon/06-seo-rendimiento-a11y.md`, `docs/canon/08-convenciones-y-proceso.md` y los ADR. No re-decidas lo ya decidido: si una tarea pide algo que contradice un ADR, propone un ADR nuevo y espera el OK del dueño antes de codificar.

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

### T3 · Certificaciones: PÁGINA propia en el nav + cargar las nuevas

Decisión del dueño (2026-07-06): las certificaciones son MUCHAS (ver inventario al final de este archivo), así que ya no caben como sección de la home. Crear una **página dedicada** enlazada desde la barra de navegación, como tenía el sitio anterior (que era `/certificados`; ese código se borró en F0, se rehace con el sistema nuevo).

- Rutas nuevas bilingües: `/certificaciones/` y `/en/certifications/` (o el par que decida el dueño), con su par ES/EN, hreflang, canonical, entrada en el sitemap y en el nav de `Base.astro` (junto a Inicio, Case study, Contacto). Ver cómo F4 montó `/acp-suite/` como referencia de página nueva bilingüe.
- Migrar la sección `Certifications.astro` de la home: decidir con el dueño si en la home quedan solo las 2-3 destacadas con un enlace "Ver todas" a la página, o si se retira de la home y vive solo en su página. Recomendación: dejar las destacadas (OCI Foundations Associate, Google Cybersecurity, Programa ONE Tech Advanced) en la home y el catálogo completo en la página.
- Datos: `src/data/certifications.json` hoy tiene 3 entradas (`{ name, issuer, year, url }`, link verificable obligatorio). Cargar las nuevas del inventario. Estructura sugerida para escalar: agregar `category` (p. ej. "Certificación", "Formación ONE", "Curso", "Inmersión IA") y `featured: boolean`, y agrupar en la página por categoría.
- URLs de verificación: los certificados Alura tienen URL pública con patrón `https://app.aluracursos.com/certificate/angelezequiel/<slug>` (visible en el encabezado de impresión de cada PDF; ejemplo real extraído: Oracle Autonomous Database -> `.../angelezequiel/oracle-autonomous-database`). Cada slug se saca leyendo el PDF correspondiente en `C:\Users\Angel Ezequiel\Downloads\Oracle ONE` (las URLs van comprimidas en el binario, no se extraen por grep; hay que abrir el PDF o pedir al dueño el perfil público de Alura que las lista). Solo publicar credenciales con URL verificable (doc 02, regla 5).
- Diseño de la página con `frontend-design` + `responsive-design`: catálogo de N entradas agrupado, con filtros o secciones plegables si son muchas; hit areas >= 40x40, `sr-only` de pestaña nueva, AA, y coherente con "papel y tinta". Iconos por emisor con SVG propio (T6).
- Curación (recomendación al dueño): mostrar los ~60 cursos individuales completos puede leerse como ruido para un reclutador (doc 01: entender en 30 s). Alternativa fuerte: destacar las FORMACIONES y CERTIFICACIONES (las cabecera) y listar los cursos agrupados/plegados debajo. Es decisión del dueño; el inventario de abajo separa cabeceras de cursos para facilitarlo.

### T4 · Contacto: agregar el teléfono

Agregar el número `+52 33 2019 1633` (el mismo del CV) a la sección de contacto, ES y EN: en `src/data/site.ts` y el componente `sections/Contact.astro`, como link `tel:+523320191633` con icono propio (ver T6) y label localizado. Evaluar agregarlo también al JSON-LD `Person` (`telephone`) en `src/lib/jsonld.ts`: es dato ya público en el CV, decisión del dueño si lo quiere en datos estructurados.

### T5 · Footer: recortar la línea de estado

El footer dice "ultima actualizacion 2026-07 · sitio estatico · build ok" (`footer.status` en `src/i18n/ui.ts`, ES y EN). Quitar "sitio estatico" y "build ok"; dejar solo la última actualización (confirmar copy exacto con el dueño). Nota doc 05: el vocabulario "sistema" tiene límite de 3 apariciones con datos reales; al recortar el footer, revisar que la línea de estado del hero siga siendo coherente.

### T6 · Más iconos SVG

Ampliar `src/components/ui/Icon.astro` con iconos propios consistentes con los existentes (mismo grosor de trazo, mismo viewBox, `aria-hidden` cuando acompañan texto): al menos teléfono (T4), descarga (T8 y el botón de CV existente), y los que pidan T3/T7. Sin librerías externas: SVG artesanal inline, tematizado por `currentColor`. Sin emojis.

### T7 · Renombrar "ACP Suite" a "ACP" y CAMBIAR las rutas a /acp/ (portfolio Y CV)

Decisión del dueño (2026-07-06): el producto se nombra "ACP" a secas, Y las rutas cambian de `/acp-suite/` a `/acp/`.

- Copy en `src/`: buscar "ACP Suite" en `ui.ts`, contenido (`src/content/case-study/*.md`: title, tagline y cuerpo), `CaseStudyTeaser`, `jsonld.ts` (name del `SoftwareSourceCode`) y `Seo`/titles. OJO: "ACP" es también la empresa (Autocamiones del Pacífico); revisar frase por frase que no quede ambiguo (donde haga falta, "la plataforma de ACP").
- RUTAS: renombrar `src/pages/acp-suite.astro` -> `src/pages/acp.astro` y `src/pages/en/acp-suite.astro` -> `src/pages/en/acp.astro`; actualizar todos los links internos (helpers de `i18n/utils.ts`, `CaseStudyTeaser`, nav, `localizePath('acp-suite'...)` -> `'acp'`). El slug de la colección de contenido puede quedarse (`acp-suite.es.md`) o renombrarse; lo que importa es la ruta pública. Verificar que sitemap, canonical y hreflang salgan con `/acp/` y `/en/acp/`.
- Riesgo de rutas: el sitio ya está indexado con `/acp-suite/` y GitHub Pages no tiene redirects de servidor. Mitigación: como la ruta vieja quedará en 404, evaluar dejar una página puente en `src/pages/acp-suite.astro` con `<meta http-equiv="refresh">` + canonical a `/acp/` (y su par EN) para no romper enlaces ya compartidos; decisión del dueño. Documentar en el tracker.
- OG: al tocar title/tagline del case study, regenerar las imágenes OG (regla 6). Si cambian los nombres de archivo OG por slug, revisar `Seo.astro`.
- CV (DOS idiomas, ver T10): actualizar el link del case study a `angelezequiel.dev/acp/` (ES) y `angelezequiel.dev/en/acp/` (EN) en `perfil-mejorado/CV_Angel_Barbosa.html` y `..._ES.html`, y REGENERAR ambos PDF con Chrome headless (flujo en `docs/rondas/2026-07-06_d7-beacon.md` y la ronda del CV: playwright-core + `page.pdf` con `preferCSSPageSize`) DESPUÉS de que las rutas nuevas existan (si no, el link del PDF apunta a un 404). Reemplazar los PDF servidos en `public/cv/`. Verificar 1 página y links. NOTA: el PDF EN servido hoy apunta a `/en/acp-suite/`; queda desactualizado hasta esta regeneración.
- Pase de reglas duras al final (grep) y validación de que el JSON-LD sigue parseando.

### T8 · Botón de descarga del CV en el header

Agregar al nav de `Base.astro` un botón/link directo de descarga del CV (`/cv/Angel_Barbosa_CV.pdf` vía `BASE_URL`, atributo `download`, label localizado "Descargar CV (PDF)" / "Download CV (PDF)", doc 06). Consideraciones: el header ya se comprime a 360px (se oculta "Inicio" y el logo se acorta), así que decidir presentación responsive (icono de descarga con `aria-label` en móvil, texto en desktop) sin romper el ancho mínimo; hit area >= 40x40; mismo lenguaje visual que los toggles.

### T9 · Más motion en TODO el sitio: fondo interactivo, intro con el nombre, GSAP ampliado (REQUIERE ADR NUEVO ANTES DE CODIFICAR)

Cambio de dirección del dueño (2026-07-06): quiere el sitio "más visual", con más GSAP aplicado en todo el sitio y más animaciones. **Libertad creativa amplia**: NO está limitado a `transform`/`opacity`, puede proponer lo que quiera. **Único requisito duro del dueño: sostener ~60fps.** La única prohibición que sigue firme es el **glassmorphism** (sin blur de fondo, orbes de gradiente ni partículas). Esto reabre el ADR 0005 (papel y tinta, motion sobrio): NO se codifica hasta redactar y aprobar un **ADR 0009** que actualice explícitamente la dirección visual.

Alcance de lo que el dueño pidió:

1. **Fondo con animación interactiva** (que reaccione al usuario: puntero, scroll, hover).
2. **Intro de entrada con su nombre**.
3. **Más motion en general** por todo el sitio (secciones, tarjetas, transiciones, hovers, el diagrama del case study, el carrusel).

Proceso obligatorio:

1. Redactar **ADR 0009** que revise el ADR 0005: qué se mantiene (sin glassmorphism, mejora progresiva, reduced motion, contenido nace visible) y qué se amplía (paleta de motion, GSAP en más lugares). Proponer 2-3 direcciones de motion con costo/beneficio.
2. Presupuesto y límites que SIGUEN vigentes aunque haya libertad creativa (vienen del doc 06 y no del ADR 0005, no son negociables sin romper los gates que el sitio ya presume): (a) ~60fps medidos en DevTools durante scroll y carga (requisito explícito del dueño); (b) `prefers-reduced-motion` apaga todo con estado final instantáneo; (c) sin JS el contenido es visible y navegable (nada en `opacity:0` esperando JS); (d) el LCP móvil debe seguir < 1.8 s (hoy 1.7-1.8 s, poco margen: el nombre nace pintado y la intro solo lo REVELA, no lo hace aparecer desde cero); (e) el presupuesto JS < 60 KB gzip conviene cuidarlo (GSAP core+ScrollTrigger ya viajan; Draggable, Flip u otros plugins suman: medir); (f) animar en bucle propiedades caras (blur, box-shadow, width/height, colores de fondo grandes) fue la causa de los FPS bajos del sitio viejo (doc 06): si se usan, medir que no tiren los fps. Con libertad creativa el criterio deja de ser "solo transform/opacity" y pasa a ser "lo que sostenga 60fps, demostrado con medición".
3. Intro con el nombre: correr UNA vez, corta; considerar mostrarla solo en la primera visita de la sesión (`sessionStorage`) para no repetirla en cada navegación del reclutador (usuario objetivo, doc 01).
4. Presentar opciones al dueño y NO implementar hasta su OK explícito del ADR 0009.
5. Tras implementar: Lighthouse (objetivos doc 06, foco en LCP), medición de fps en DevTools (evidencia en el tracker), y verificación sin JS y con reduced motion. Auditar con `review-animations` (como en F6).

### T10 · CV bilingüe (ES en página ES, EN en página EN)

Idea del dueño (2026-07-06): servir un CV en español cuando el sitio está en español y en inglés cuando está en inglés. Hoy se sirve un solo CV en inglés (`perfil-mejorado/CV_Angel_Barbosa.html` -> `public/cv/Angel_Barbosa_CV.pdf`).

- **La versión ES ya está redactada** en `perfil-mejorado/CV_Angel_Barbosa_ES.html` (traducida del HTML EN el 2026-07-06, con el renombrado ACP ya aplicado y el link del case study apuntando a `/acp/`). Falta: revisarla con el dueño y generar su PDF. NO se generó su PDF todavía porque enlaza a `/acp/`, ruta que no existe hasta T7; generar ambos PDF DESPUÉS del cambio de rutas.
- Generar dos PDF con el mismo pipeline de Chrome headless (`preferCSSPageSize`, `printBackground`): `Angel_Barbosa_CV_ES.pdf` y mantener/renombrar el EN. Decidir nombres estables (el EN actual es `Angel_Barbosa_CV.pdf`; si se renombra, dejar el nombre viejo como copia o el link impreso previo apuntaría a un 404).
- Cablear el link de descarga (T8 y `sections/Contact.astro`) para que sirva el CV del idioma activo vía los helpers de `i18n/utils.ts` (ES en `/`, EN en `/en/`).
- Regla de mantenimiento nueva a documentar en `PENDIENTES_AGENTE.md`: el CV vive en DOS idiomas y DOS formatos (HTML fuente + PDF); al actualizar uno, actualizar el otro idioma y regenerar ambos PDF.

### T11 · Ver el sitio en contenedor (ya disponible, sin trabajo pendiente salvo usarlo en la verificación)

El dueño pidió ver el sitio en local dentro de contenedores. Ya funciona con lo que dejó F1 (`compose.yaml` + `Containerfile`, Podman):

```bash
podman compose up --build   # construye (corre check + build) y sirve en http://localhost:4321
podman compose down         # detiene y limpia
```

Verificado el 2026-07-06: construye y sirve el sitio en `http://localhost:4321`. Úsalo como entorno de verificación de esta ronda (además de `npm run preview`), sobre todo para medir fps de T9 en un build de producción real.

## Datos que el dueño debe pegar / decidir en la sesión

- Cuáles certificaciones del inventario mostrar y con qué nivel de detalle (T3): confirmar la curación (destacar cabeceras vs. listar los ~60 cursos) y, para las que no tienen URL aún en el JSON, la URL de verificación (o el perfil público de Alura que las lista).
- Rutas ES/EN de la página de certificaciones (T3) y si deja o no una página puente en `/acp-suite/` tras el cambio a `/acp/` (T7).
- Copy exacto del footer (T5) si no le convence dejar solo "ultima actualizacion YYYY-MM".
- OK o ajustes al **ADR 0009** (T9: más motion, fondo interactivo, intro con el nombre) antes de escribir código de esa tarea.
- Revisión de la traducción ES del CV ya redactada (T10).

## Resumen de tareas

| ID | Tarea | Tipo | Estado |
| --- | --- | --- | --- |
| T1 | Puntos sueltos en pills del stack | bug | [hecho] 2026-07-06 |
| T2 | Espacio en blanco antes de Stack | bug | [hecho] 2026-07-06 |
| T3 | Página propia de certificaciones en el nav + cargar el inventario | contenido | [hecho] 2026-07-06 (catálogo completo de 77 credenciales del perfil de Alura, carrusel + filas) |
| T4 | Teléfono en contacto | contenido | [hecho] 2026-07-06 (como WhatsApp wa.me, decisión del dueño) |
| T5 | Recortar footer (quitar "sitio estatico"/"build ok") | contenido | [hecho] 2026-07-06 |
| T6 | Más iconos SVG | ui | [hecho] 2026-07-06 (download, whatsapp) |
| T7 | Renombrar "ACP Suite" a "ACP" y rutas `/acp-suite/` -> `/acp/` (sitio + CV) | contenido/rutas | [hecho] 2026-07-06 (sin página puente; ruta vieja en 404) |
| T8 | Botón de descarga de CV en el header | ui | [hecho] 2026-07-06 |
| T9 | Más motion (fondo interactivo + intro con el nombre + GSAP ampliado, 60fps) | visual | [hecho] 2026-07-06 (ADR 0009 aceptado; fondo = trazo de tinta tras el cursor; ~61 fps medidos) |
| T10 | CV bilingüe ES/EN por idioma de página (ES ya redactado) | contenido | [hecho] 2026-07-06 |
| T11 | Ver el sitio en contenedor (ya disponible) | infra | [hecho] (el dueño lo consulta en `http://portfolio:4321` con entrada de hosts) |

## Inventario de certificaciones (extraído de `C:\Users\Angel Ezequiel\Downloads\Oracle ONE` el 2026-07-06)

Estructura real de la carpeta del dueño. NO todo tiene que ir al sitio: sirve para que el dueño cure. Las URLs de verificación Alura siguen el patrón `https://app.aluracursos.com/certificate/angelezequiel/<slug>` y hay que leer cada PDF para el slug exacto (van comprimidas, no se sacan por grep).

### Credenciales cabecera (recomendadas para destacar)

- **Oracle Cloud Infrastructure 2025 Certified Foundations Associate** · Oracle · 2025. Examen real (insignia `OCI25FNDCFA.jpeg`); URL de credencial ya en `certifications.json` (catalog-education.oracle.com). La credencial más fuerte.
- **Programa ONE Tech Advanced** · Oracle + Alura Latam · concluido 14 jun 2026, 58 h. Certificado de finalización del programa (`Angel...Programa - ONE Tech Advanced.pdf`). Ya en `certifications.json` como "Programa ONE Tech Advanced G9 - Back End".
- **Formación: Ruta hacia la certificación OCI Foundations Associate - ONE** · Alura · 14 jun 2026, 5 cursos, 58 h.
- **ONE Tech Foundation** (`ONETechFoundation.pdf`) · el programa base previo (cursos en las carpetas Principiante, JavaOO, JavaYSpring, IAYJava, Emprendimiento, Desarrollo personal).
- **Google Cloud Cybersecurity Certificate** · Google · 2026 (5 cursos). Ya en `certifications.json` (Credly). Nota: no está en esta carpeta pero ya está en el sitio.

### Cursos y formaciones (agrupados por carpeta; ~60 PDFs)

- **Tech Advanced / OCI y bases de datos**: Oracle Autonomous Database (slug `oracle-autonomous-database`), Low Code e IA con Oracle Apex, OCI implementación de una aplicación en la nube, OCI base de datos e infraestructura como código, Certificación OCI fundamentos clave y servicios esenciales, Certificación OCI gestión de datos seguridad y gobernanza, Redes y Protocolos fundamentos de la web, Introducción a SQL con MySQL, Entrega Certificación OCI Foundations Associate.
- **Inmersiones IA (Alura)**: Formación Inteligencia de Datos y RAG Avanzado (RAG y Agentes de IA, LangChain técnicas avanzadas de RAG, LangChain automatizando el análisis de datos con agentes), Ingeniería de Agentes y Automatización con IA (Agentes de IA con LangGraph, LangGraph orquestación de agentes y multiagentes, N8N crea automatizaciones inteligentes, Automatización de flujos integrando n8n e IA, n8n para devs, IA preparación para el mercado), inmersión Agentes de IA.
- **Tech Foundation (programa base)**: carpetas Principiante (11 cursos), JavaOO (7), JavaYSpring (10), IAYJava (2), Emprendimiento (5), Desarrollo personal (5). Son cursos individuales del ONE Tech Foundation.

Recomendación de curación (doc 01, 30 s): destacar las 4-5 cabeceras y, si el dueño quiere el catálogo completo, agruparlo plegado por programa/formación en la página de T3, no como lista plana de 60 items. El dueño decide el alcance final y aporta las URLs de verificación que falten.

## Al cerrar la ronda

`check` + `build` + `preview` en verde (o `podman compose up --build`, ya verificado que funciona), e2e rápido del flujo (tema, idioma, case study en su ruta nueva `/acp/`, página de certificaciones, CV por idioma, 404), medición de fps para T9, reglas duras por grep, y actualizar: `PENDIENTES_AGENTE.md`, el ADR 0009 y el doc del área que cambie (05/06), tracker nuevo en `docs/rondas/` y este archivo (marcar tareas hechas). Si cambian rutas (T7) o se agregan páginas (T3), revisar sitemap/hreflang/canonical. Merge de la rama de trabajo a `develop` y push; el merge a `master` lo decide el dueño.
