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

## Iteracion 2 (2026-07-15, tras el 1er pase visual del dueno)

Feedback del dueno viendo la rama en Podman. Cambios:

| Pedido | Que se hizo |
| --- | --- |
| Hero se ve vacio -> compactar | Panel a `max-w-4xl` centrado, menos padding y menos `pt`, nombre mas chico (`.hero-name` a `clamp(3.5rem, 10vw, 7.5rem)`) y gaps mas ajustados. Sigue siendo el ancla, con menos vacio alrededor |
| Contacto/footer vacio -> enriquecer | Footer reconstruido como panel "estado del sistema": 3 columnas mono (identidad, estado del sistema, navegacion) con **datos reales** (rol, ubicacion, `sitio estatico`, ultima actualizacion, `v2026.07`) + tira final con redes y dominio. `mt-24` -> `mt-16`. Claves i18n nuevas: `footer.system/staticSite/role/nav` (ES/EN) |
| Tema claro no gusta -> mas colorido / menos brusco | `--paper` `#f6f5f1` (calido) -> `#eef1f5` (gris azulado frio) y `--surface` `#ffffff` -> `#f8fafc` (casi blanco frio, menos brillo). Tinte alineado al azul del acento; el salto claro/oscuro se siente menos brusco. `theme-color` hardcodeado en `Base.astro` actualizado a la par. Contraste AA se mantiene (accent ~5.8:1 sobre el nuevo paper) |
| Transicion al cambiar el tema (como la intro) | Crossfade de toda la pagina via **View Transitions API** en el toggle (`Base.astro`), duracion 0.4s (`global.css`). Degrada a cambio instantaneo sin soporte o con reduced motion. API nativa: no suma JS |
| Diagrama (case study) que se vea mejor | Restyle del bloque `<style>` de `AcpArchitecture.astro` (SIN tocar estructura ni etiquetas, precision intacta): fondo "hoja de plano" (papel + reticula de puntos), nodos como tarjetas elevadas (`fill: surface`), aristas y puntas con tinte del acento |

Pendiente del dueno: 2do pase visual en Podman y merge a `develop`.

## Notas para calibrar en la revision

- **Sombra dura del panel del hero:** si pesa mucho, se baja el alpha de `--hard-shadow` o se aplica solo al bloque del nombre.
- **Blueprint:** `.bp-line` va a `opacity: .55` sobre `--line`; subir/bajar segun se lea en ambos temas.
- **Riel:** aparece a `80rem`; si se quiere antes/despues, mover el breakpoint en `.section-rail`.
- **OG regeneradas (resuelto):** la iteracion 2 cambio el papel claro, asi que se actualizo `PAPER` en `scripts/og-images.mjs` (`#F6F5F1` -> `#EEF1F5`) y se regeneraron las 6 OG (satori + sharp, deps con `--no-save`, lockfile intacta). Si a futuro se quiere el nombre en Bebas en las OG, cargar la fuente en el script y regenerar de nuevo.
