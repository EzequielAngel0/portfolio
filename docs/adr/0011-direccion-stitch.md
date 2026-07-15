# 0011 - Motivos "Blueprint" (de Stitch) sobre la paleta papel y tinta

- **Fecha:** 2026-07-15
- **Estado:** Aceptada e implementada (2026-07-15) en la rama `feat/direccion-blueprint` desde `develop`. Pendiente el pase visual del dueno en Podman y el merge a `develop`.
- **Relacion:** **Extiende** [0005](0005-direccion-visual.md) y **conserva** la paleta del [0010](0010-paleta-azul-tinta.md). NO la sustituye. **Fusiona** su capa de fondo con el fondo circuito del [0009](0009-motion-ampliado.md) v2. Puede tocar el presupuesto de fuentes del doc 06 (ver consecuencias).

## Contexto

El dueno trajo una direccion generada con Google Stitch y pidio aplicar su estilo. La captura completa esta en [`../DIRECCION_STITCH.md`](../DIRECCION_STITCH.md). La maqueta tiene mucho caracter (plano de ingenieria: lineas datum, coordenadas, folios, geometria dura, marquee, sombras duras), pero su **paleta es neon** (lima `#c3f400`) y **oscura por defecto**: justo lo que el sitio ya habia descartado (ADR 0010: "tenue, nada neon"; ADR 0005 anti-default: evitar "negro + acento acido / terminal", base clara).

Instruccion del dueno (2026-07-15): adaptar el diseno a lo ya discutido, sin colores neon. Por lo tanto **se adopta la FORMA de Stitch, no su color**.

## Decision

Aplicar los **motivos blueprint** de Stitch como capa estructural y grafica del portfolio, **manteniendo intacta la paleta papel y tinta** (claro por defecto + oscuro, azul tinta interactivo, verde reservado al estado; tokens del ADR 0010 sin cambios).

### Se adopta de Stitch (forma)

- **Capa de fondo blueprint FUSIONADA con el circuito:** lineas datum (verticales/horizontales tenues), dos o tres contornos geometricos (rectangulos y circulos), etiquetas de alta precision en mono (`COORD_REF: X..`, folios `SEC: 01 / FOLIO: 001`) y grano de papel sutil, **combinadas con el fondo circuito existente** (ADR 0009 v2). Se dibuja con `--line`/`--ink-soft` a baja opacidad, calibrada por tema para que la suma circuito + blueprint no sea ruidosa (gate: legible en ambos temas, no distrae).
- **Geometria mas dura:** bordes rectos y radios pequenos existentes (4-10px), bordes tecnicos de 1px con `--line`.
- **Sombra dura firma:** utilidad nueva `--shadow-hard: 10px 10px 0 rgb(0 0 0 / .18)` (claro) / `rgb(0 0 0 / .5)` (oscuro), sin blur, SOLO para la pieza firma del hero. Cumple "sin glassmorphism" (regla 7 doc 02): sombra dura desplazada, no difusa.
- **Riel lateral de secciones** (desktop): rail de secciones numeradas (`01 / IDENTITY`...) con etiqueta de referencia rotada, **accesible** (SVG inline, no fuente de iconos; labels visibles y operables por teclado, no solo hover). Degrada/oculta en movil sin perder navegacion. En CSS: no suma JS.
- **Marquee de stack** (mono, sobrio) y **lenguaje mono amplificado**: eyebrows, linea de estado, folios y coordenadas en mono mayuscula con tracking ancho.

### NO se adopta de Stitch (se rechaza explicitamente)

- El acento **lima neon** `#c3f400`/`#ccff00`: se conserva el **azul tinta** del ADR 0010 (`#33618f` claro / `#7fa9d4` oscuro).
- El **oscuro por defecto**: se conserva **claro por defecto** + oscuro sin FOUC.
- El lima como acento Y estado a la vez: se conserva la separacion `accent` (interaccion) vs `status` (verde, estado real).
- Iconos con fuente Material Symbols, Tailwind/fuentes por CDN, textura externa y el `.blob { blur(80px) }`: fuera.

### Paleta (sin cambios respecto al ADR 0010)

| Token | Claro | Oscuro |
| --- | --- | --- |
| `--paper` | `#f6f5f1` | `#121417` |
| `--surface` | `#ffffff` | `#1f242b` |
| `--ink` | `#17181a` | `#edebe6` |
| `--ink-soft` | `#4a4d52` | `#a7a9ac` |
| `--accent` (azul tinta) | `#33618f` | `#7fa9d4` |
| `--status` (verde operativo) | `#1e6e4e` | `#4cc38a` |
| `--signal` (ambar) | `#b86e00` | `#e0a63e` |
| `--line` | `rgb(23 24 26 / .22)` | `rgb(237 235 230 / .22)` |

Se agrega solo `--shadow-hard`. El color base no cambia: sin reverificacion masiva de contraste, solo de las piezas nuevas.

### Tipografia (con la display condensada del dueno)

| Rol | Antes | Ahora |
| --- | --- | --- |
| Display (solo nombre/hero, footer) | Archivo 700 | **Condensada mayuscula tipo Bebas Neue** (SIL OFL) |
| Titulares secundarios + cuerpo | Archivo | Archivo (se conserva) |
| Datos/labels | IBM Plex Mono | IBM Plex Mono (se conserva) |

La condensada se usa SOLO para el titular grande (no sirve de cuerpo: mayuscula, muy estrecha). Restriccion de presupuesto (doc 06, max 3 woff2): Archivo variable (1) + Plex Mono 400/500 (2) ya suman 3; sumar Bebas obliga a una de dos, a decidir en implementacion:

- **(a)** subset minimo de Bebas (solo los glifos del titular) y consolidar Plex Mono a un solo peso (400) para quedar en 3, o
- **(b)** subir el presupuesto a 4 woff2 con justificacion en el doc 06.
Recomendacion: (a) si el subset de Bebas queda muy chico; (b) si se necesitan ambos pesos de mono.

## Decisiones resueltas (dueno, 2026-07-15)

1. **Alcance de la capa blueprint:** completo, **con riel lateral** (accesible).
2. **Fuente display condensada:** **si**, tipo Bebas Neue, solo para el hero.
3. **Fondo circuito (ADR 0009 v2):** **fusionar** con la capa blueprint.
4. **Presupuesto de fuentes:** opcion **(b)**, subir a **4 woff2**. Se conserva IBM Plex Mono 400/500 (la voz de sistema mono-500 se usa en todo el sitio) y se agrega la display; el 4to archivo se justifica porque el subset de Bebas es minusculo (6.4 KB, solo mayusculas/digitos del nombre).
5. **Display en el hero:** **nombre como ancla** (fiel a Stitch). Se agrega `ANGEL BARBOSA` gigante en la condensada; la **frase de valor sigue siendo el h1 en Archivo** (conserva SEO y el pitch de 30s). El footer se mantiene **recortado** (sin nombre gigante, respetando la ronda post-lanzamiento).

## Implementacion (2026-07-15)

- **Fuente:** `scripts/subset-display.mjs` (one-off, `subset-font` con `--no-save`, no toca la lockfile) genera `public/fonts/bebas-neue-latin-display.woff2` (6.4 KB, 43 glifos). `@font-face` con `unicode-range` limitado al subset (mayusculas/digitos/puntuacion): cualquier otro caracter cae limpio a Archivo. Preload en `Base.astro`. Total: 4 woff2.
- **Tokens:** `--font-display` y `--hard-shadow` (por tema: `.18` claro / `.5` oscuro) en `tokens.css`, cableados a `--font-display` y `--shadow-hard` en `@theme`. La paleta del ADR 0010 no cambia.
- **Capa blueprint:** `src/components/BlueprintBackdrop.astro`, SVG fijo `aria-hidden` (datum lines, contornos, coordenadas, folios) dibujado con `--line`/`--ink`/`--ink-soft` a baja opacidad, mas grano inline (feTurbulence, self-hosted). Es **estatica y visible sin JS**; el circuito animado (`motion.ts`, z -1) se pinta encima, la blueprint en z -2: asi quedan fusionados y calibrados. Estilos en `global.css` (`.bg-blueprint*`).
- **Hero:** `Hero.astro` enmarca la pieza firma en un panel `border-line` + `bg-surface` + `shadow-hard`; nombre en `.hero-name` (display), h1 en Archivo, linea de estado con folio mono `SEC 01 / IDENTITY`.
- **Riel lateral:** `src/components/SectionRail.astro`, `<nav>` fijo accesible (links reales con numero + label visibles, foco del sistema) que aparece solo `>= 80rem` (cabe en el gutter). Sin JS (sin scrollspy; acento en hover/focus). Anclas nuevas en las secciones del home (`#caso`, `#proyectos`, `#skills`, `#certs`).
- **Marquee:** `src/components/Marquee.astro`, tira de stack mono en bucle CSS (no suma JS), `aria-hidden`, montada en ambos home tras el hero; se detiene en hover/focus y se congela con reduced motion.
- **Verificacion:** `astro check` 0 errores, `astro build` 7 paginas en verde. Pase de reglas duras (sin em dash/emojis) en verde. Presupuesto JS intacto (blueprint/riel/marquee en CSS). Pendiente el pase visual del dueno en Podman.

## Consecuencias

- Se gana: caracter de plano de ingenieria coherente con el posicionamiento, SIN romper la paleta ni las reglas acordadas; el color base y el tema por defecto no cambian.
- Se paga: la capa de fondo fusionada (circuito + blueprint) hay que calibrarla para no saturar; el riel lateral es cambio de layout; sumar la display toca el pipeline de fuentes y el presupuesto (arriba).
- Piezas a tocar (checklist de `PROMPT_REDISENO_VISUAL.md`):
  - `src/styles/tokens.css`: agregar `--shadow-hard` y el token `--font-display` (condensada); `--font-sans`/`--font-mono` se conservan.
  - `src/styles/global.css`: fusion circuito + blueprint (`.bg-circuit*` + capa datum/anotaciones), `@font-face` de la display, `.shadow-hard`.
  - Fuentes: subset woff2 de la condensada en `public/fonts/`, `preload` del display en `Base.astro`, y resolver el presupuesto (a/b arriba).
  - Layout/componentes: riel lateral (nuevo), marquee, hero (display + sombra dura + linea de estado/folio), y aplicar los motivos a home, case study `/acp/` y `/certificaciones/`, en ambos temas y ES/EN.
  - `scripts/og-images.mjs`: la paleta NO cambia (no reverificar color), pero si el titular de las OG usa la condensada, cargar esa fuente en el script y REGENERAR las 6 OG. `Base.astro` `theme-color` y favicon NO cambian de color.
- Gates intactos (doc 06): AA en las piezas nuevas, sin glassmorphism/orbes/particulas, sin em dash/emojis, ~60fps, contenido sin JS, reduced motion, responsive a 360px, presupuesto JS (riel/marquee en CSS: no suman JS).
- Al cerrar la ronda: actualizar doc 05 (estructura/motivos y tipografia), tracker en `docs/rondas/`, `PENDIENTES_AGENTE.md` y el estado en `PROMPT_REDISENO_VISUAL.md`. Los ADR 0005 y 0010 NO se marcan sustituidos: 0011 los extiende.
