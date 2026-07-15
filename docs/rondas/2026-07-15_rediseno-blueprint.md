# Ronda 2026-07-15 · Rediseno visual "blueprint" (ADR 0011)

Implementacion de la direccion que el dueno trajo de Google Stitch, adaptada a las reglas del sitio: se adopta la **forma** blueprint (plano de ingenieria) **sobre la paleta papel y tinta** ya establecida (ADR 0010), **sin neon**. Fuente de la direccion: [`DIRECCION_STITCH.md`](../DIRECCION_STITCH.md). Decision y mapeo: [ADR 0011](../adr/0011-direccion-stitch.md). Prompt/proceso: [`PROMPT_REDISENO_VISUAL.md`](../PROMPT_REDISENO_VISUAL.md).

Rama: `feat/direccion-blueprint` (desde `develop`). **Pendiente:** pase visual del dueno en Podman y merge a `develop` (no lo hace el agente sin su OK).

## Decisiones del dueno (2026-07-15)

- Dentro de este chat: **presupuesto de fuentes (b)** 4 woff2 (se conserva Plex Mono 400/500; el subset de Bebas es minusculo) y **display en el hero = nombre como ancla** (la frase de valor sigue siendo el h1 en Archivo).
- Del chat anterior (ADR 0011 aceptada): capa blueprint completa **con riel lateral**, **sumar** display condensada tipo Bebas para el hero, y **fusionar** el fondo circuito (ADR 0009 v2) con la blueprint. Footer se mantiene recortado.

## Que se hizo

| Pieza | Detalle |
| --- | --- |
| Fuente display | `scripts/subset-display.mjs` (one-off, `subset-font` `--no-save`, no toca la lockfile) -> `public/fonts/bebas-neue-latin-display.woff2` (6.4 KB, 43 glifos). `@font-face` con `unicode-range` del subset, preload en `Base.astro`. 4 woff2 en total |
| Tokens | `--font-display` y `--hard-shadow` (por tema) en `tokens.css`, cableados a `--font-display`/`--shadow-hard` en `@theme`. Paleta ADR 0010 sin cambios |
| Capa blueprint | `BlueprintBackdrop.astro`: SVG fijo `aria-hidden` (datum, contornos, coordenadas, folios) + grano inline; estatica y visible sin JS; z -2 bajo el circuito (z -1). Estilos `.bg-blueprint*` en `global.css` |
| Hero | `Hero.astro`: panel firma (`border-line` + `bg-surface` + `shadow-hard`), nombre en `.hero-name` (display), h1 frase en Archivo, folio mono `SEC 01 / IDENTITY` |
| Riel lateral | `SectionRail.astro`: `<nav>` fijo accesible, links con numero + label visibles, solo `>= 80rem` (cabe en el gutter), sin JS. Anclas nuevas en el home: `#caso`, `#proyectos`, `#skills`, `#certs`. Clave i18n `a11y.sectionIndex` (ES/EN) |
| Marquee | `Marquee.astro`: stack mono en bucle CSS (sin JS), `aria-hidden`, montado en ambos home tras el hero; para en hover/focus, congelado con reduced motion |

## Verificacion

- `astro check`: 0 errores (queda el hint preexistente de `z.string().url()`).
- `astro build`: 7 paginas en verde.
- Pase de reglas duras (sin em dash, sin emojis) sobre lo tocado: en verde.
- `package.json` y `package-lock.json` intactos (dev deps con `--no-save`; el build solo necesita el woff2 ya committeado).
- Presupuesto JS intacto: blueprint, riel y marquee son CSS (no suman JS).

## Pendiente del dueno

- Pase visual en Podman (`podman compose up --build`, `http://portfolio:4321`): ambos temas, ES/EN, 360px, sin JS, reduced motion, ~60fps. Calibracion fina esperada (peso de la sombra dura del panel, intensidad de la blueprint, ritmo del marquee).
- Tras su OK: merge de `feat/direccion-blueprint` a `develop`.

## Notas para calibrar en la revision

- **Sombra dura del panel del hero:** si pesa mucho, se baja el alpha de `--hard-shadow` o se aplica solo al bloque del nombre.
- **Blueprint:** `.bp-line` va a `opacity: .55` sobre `--line`; subir/bajar segun se lea en ambos temas.
- **Riel:** aparece a `80rem`; si se quiere antes/despues, mover el breakpoint en `.section-rail`.
- **Regenerar OG (opcional):** la paleta no cambio, asi que las 6 OG siguen validas. Si se quiere el nombre en Bebas tambien en las OG, cargar la fuente en `scripts/og-images.mjs` y regenerar.
