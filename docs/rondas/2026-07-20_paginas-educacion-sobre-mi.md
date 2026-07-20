# Ronda 2026-07-20 · paginas Educacion + Sobre mi

Ronda de contenido: dos paginas bilingues nuevas sobre el portfolio ya lanzado, espejando como esta montada la pagina de certificaciones. Ejecuta el prompt [`../prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md`](../prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md). Una pagina de contenido no llega al umbral de ADR (doc 08), asi que va sin ADR y sin tocar tokens ni la forma visual (ADR 0005/0010/0011 vigentes): reusa componentes y tokens existentes. Rama `feat/paginas-educacion-sobre-mi` desde `develop`.

## Decisiones del dueno en la sesion

- **Nav:** Sobre mi entra al header (oculto hasta `md` para no apretar el rango de 640px; los 360px siguen cubiertos por `max-sm:hidden`); Educacion NO va al header, solo al footer y por enlaces cruzados.
- **Foto de Sobre mi:** se usa el avatar de GitHub del dueno. No se hotlinkea (CSP `img-src 'self'` y presupuesto de 1 request externo, doc 06): se descargo a `src/assets/about/angel-barbosa.jpg` y se sirve local optimizado por `astro:assets` (WebP, 400x400 -> ~10 KB).
- **Purificador (7mo semestre del CETI):** se menciona como proyecto escolar (evidencia de que la formacion incluye hardware), SIN ficha de proyecto y SIN enlace al repo. Aparece en Educacion (bloque "Mas alla del software") y en Sobre mi (hilo hardware).
- **Home:** se agrega un enlace discreto a Sobre mi en el hero (enlace de texto tras los dos CTA, no un tercer boton).

## Hecho

### Datos

- `src/data/education.json`: dos etapas del CETI con variante de titulo por idioma, `start`/`end` (`YYYY-MM`), `status` (`graduated` / `upcoming`), `gpa` y `note` opcional. Datos confirmados: Tecnologo (ago 2022 - jun 2026, egresado, 94.50/100) e Ingenieria (ago 2026 - jun 2029, ingreso directo a 3er semestre). Nombre de la ingenieria usado tal cual ("Ingenieria en Desarrollo de Software"); el dueno lo corrige si difiere.
- `src/data/about.ts`: prosa ES/EN tipada (lead, intro, trayectoria, dos hilos de enfoque con `stage` por texto, cierre, alt de la foto), transcrita y adaptada del "Acerca de" de LinkedIn y el README de GitHub del dueno (`perfil-mejorado/`, gitignored) aplicando reglas duras. La microcopia global (nav, botones) vive en `i18n/ui.ts`.

### Componentes y paginas

- `src/components/edu/EducationTimeline.astro`: linea de tiempo de folios blueprint (rail datum, fechas y promedio en mono/tabular, estado por texto), bloque "Mas alla del software" (hardware/embebido/IoT + Purificador) y enlaces cruzados a certificaciones y Sobre mi.
- `src/components/about/AboutStory.astro`: header, foto (`astro:assets`) + intro, trayectoria en prosa, "Enfoque actual" en dos hilos (Ciberseguridad y AppSec = "En aprendizaje"; Hardware y maker = "En exploracion", con topics como chips), y cierre con CTA (Contacto, CV) y enlaces cruzados (case study, Educacion, GitHub).
- Paginas: `src/pages/educacion.astro`, `src/pages/en/education.astro`, `src/pages/sobre-mi.astro`, `src/pages/en/about.astro` (envuelven `Base`, montan el componente con `locale`, OG e `Seo` por pagina/idioma).

### i18n, nav y SEO

- `src/i18n/ui.ts`: claves `education.*`, `about.*`, `nav.about`, `nav.education` (paridad ES/EN forzada por el tipo `UiKey`).
- `src/i18n/utils.ts`: pares de slug `educacion`<->`education` y `sobre-mi`<->`about` en `localizedRoutes`, mas helpers `educationPath` / `aboutPath`. Con eso el toggle salta al par correcto y hreflang/canonical salen bien.
- `src/layouts/Base.astro`: Sobre mi al nav (nueva logica `hideBelow` 'sm'/'md'); footer con `footerNavItems` que incluye Educacion.
- `src/components/sections/Hero.astro`: enlace de texto a Sobre mi tras los CTA.
- `astro.config.mjs`: el `serialize` del sitemap ahora fija los alternates de los tres pares con slug localizado (certificaciones, educacion, sobre-mi).
- OG: cuatro entradas nuevas en `scripts/og-images.mjs` (`educacion.es/en.png`, `sobre-mi.es/en.png`) generadas con `--no-save` (no toca la lockfile). Las OG previas se regeneraron identicas.

## Verificacion

- `npm run check`: 0 errores (2 hints preexistentes en `content.config.ts`, ajenos).
- `npm run build`: 11 paginas, incluidas las 4 nuevas; foto optimizada a WebP (16 KB -> 10 KB).
- `npm run preview`: las 4 rutas responden 200.
- hreflang/canonical y alternates del sitemap correctos para los dos pares nuevos; toggle de idioma salta al par (`/sobre-mi/` <-> `/en/about/`, `/educacion/` <-> `/en/education/`).
- Foto servida local (`/_astro/...webp`), cumple CSP `img-src 'self'` y el presupuesto de 1 request externo.
- Contenido visible en el HTML estatico (prueba sin JS: reusa `data-boot`/`data-reveal`/`data-stagger`, el mecanismo ya probado que nace visible).
- Reglas duras por grep sobre `src/`: sin em dash, sin emojis, sin terminos prohibidos en lo nuevo (el unico match de "microservicios" es el pre-existente y deliberado del case study que lo niega).

## Pendiente / notas

- Verificacion manual que el agente no puede hacer headless: pase visual en claro/oscuro, teclado + lector, ~60fps y responsive a 360px/640px del header con la entrada nueva (el rango sm se protegio con `hideBelow: 'md'` en Sobre mi). Queda para el pase del dueno o una revision con navegador.
- Segundo lote (sin prompt aun): pagina de Experiencia profesional (rol en ACP), timeline tipo LinkedIn que complementa el case study.

## Al cerrar

Actualizados `PENDIENTES_AGENTE.md` (poda: Educacion y Sobre mi a una linea con puntero aqui), `docs/canon/04-arquitectura.md` (rutas), `docs/README.md` y el prompt de la ronda (marcado ejecutado), y este tracker. Merge de la rama a `develop`; a `master` decide el dueno.
