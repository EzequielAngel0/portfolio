# 05 · Sistema de diseño

Elaborado siguiendo el proceso de la skill `frontend-design` (brainstorm, plan de tokens, autocrítica anti-default, construir), con el piso de calidad de `make-interfaces-feel-better`. La skill `web-design-guidelines` se usa como auditoría al final (doc 07, fase 6). La decisión de rumbo está registrada en [adr/0005-direccion-visual.md](adr/0005-direccion-visual.md).

## Fundamento (sujeto, audiencia, trabajo de la página)

- **Sujeto:** Angel, un ingeniero que construye y **opera** en solitario sistemas completos que ya están en producción. Lo que lo define no es un proyecto, es esa capacidad: llevar de la idea a un servidor que corre y se mantiene.
- **Audiencia:** reclutadores técnicos y desarrolladores senior que evalúan en segundos y desconfían de portfolios inflados.
- **Trabajo único de la página:** que en 30 segundos se entienda quién es y qué corre en producción, y que todo sea verificable con un clic.

**Lección de diseño (por qué NO el motivo boleto):** una versión anterior tematizaba el sitio como un boleto de autobús, tomando la estética de ACP. Se descartó: el portafolio es el contenedor de varios proyectos (ACP, SoloKey, futuros), no debe disfrazarse de uno de ellos. La identidad sale de Angel como ingeniero, no de un cliente.

## Dirección: "Sistema en producción"

El portafolio se presenta a sí mismo como **un sistema bien operado**. No como una app (no lo es), sino tomando prestado el vocabulario del software que corre y se monitorea: estado operativo, metadata, versiones, builds. Eso comunica, sin decirlo, exactamente el posicionamiento: "esta persona no solo escribe código, lo pone en producción y lo mantiene vivo".

Papel y tinta, no vidrio y neón. Superficie clara y silenciosa tipo papel, tinta densa, un solo acento verde y datos en monoespaciada. Coherencia clave: **el verde es el color de "operativo"** (como el verde de un healthcheck o un build en verde), así que el acento tiene significado, no es decoración.

### Elemento firma: el indicador de estado

El sitio lleva señales discretas de "sistema vivo", con datos REALES (nunca inventados, regla 5 del doc 02). Aparecen en tres lugares y en ninguno más (regla de Chanel: quitar un accesorio):

1. **Hero:** una línea de estado en monoespaciada sobre el titular, tipo `[●] en producción · v2026.07`, con un punto verde. Es lo primero que fija el tono.
2. **Tarjetas de proyecto:** cada proyecto muestra su estado real como badge, tomado del modelo de datos (doc 04): `en producción` (ACP) o `repo público` (SoloKey). El label codifica algo verdadero, no decora (principio de `frontend-design`).
3. **Footer como "estado del sistema":** una tira en mono con metadata real del propio sitio: `última actualización 2026-07 · sitio estático · build ok`.

Las cifras clave del case study (las 7 autorizadas del doc 02) se muestran como una franja de métricas en mono/tabular, en la línea del mismo lenguaje (un "panel" de números), pero eso vive en la página del case study, no cuenta como cuarta aparición del motivo.

Todo lo demás se mantiene quieto y disciplinado.

## Tokens

### Color

Tema claro ("papel"):

| Token | Hex | Uso |
| --- | --- | --- |
| `--color-paper` | `#F6F5F1` | Fondo |
| `--color-surface` | `#FFFFFF` | Tarjetas |
| `--color-ink` | `#17181A` | Texto principal, titulares |
| `--color-ink-soft` | `#4A4D52` | Texto secundario |
| `--color-accent` | `#1E6E4E` | Verde operativo: links, CTAs, punto de estado, badges "en producción". Contraste ~5.2:1 sobre paper, AA texto normal |
| `--color-signal` | `#B86E00` | Ámbar para marcas puntuales. ~3.5:1 sobre paper: **solo texto grande o elementos gráficos, nunca texto normal** |
| `--color-line` | `rgba(23,24,26,.14)` | Reglas, bordes de tabla, separadores |

Tema oscuro (oscuro neutro, sin morados ni orbes):

| Token | Hex |
| --- | --- |
| `--color-paper` | `#121417` |
| `--color-surface` | `#1A1D21` |
| `--color-ink` | `#EDEBE6` |
| `--color-ink-soft` | `#A7A9AC` |
| `--color-accent` | `#4CC38A` (~8:1 sobre fondo) |
| `--color-signal` | `#E0A63E` |
| `--color-line` | `rgba(237,235,230,.14)` |

Implementación: Tailwind 4 `@theme` + override de variables bajo `[data-theme="dark"]`. Verificar cada par texto/fondo nuevo con un checker de contraste antes de usarlo (el doc 06 fija AA como gate).

### Tipografía

Dos familias, self-hosted:

| Rol | Fuente | Uso |
| --- | --- | --- |
| Display + texto | **Archivo** (variable, ejes wght y wdth) | Titulares en 600-800, grotesca técnica y confiada; cuerpo en 400. Es una grotesca precisa, no un serif editorial: alinea con el tono de "sistema/ingeniería" |
| Datos | **IBM Plex Mono** (400/500) | Estado, cifras, etiquetas, versiones, stack, código. Siempre `tabular-nums` en cifras |

Escala fluida con `clamp()`: `display` (~2.6-4.5rem, Archivo 700, `text-wrap: balance`), `h2` (~1.6-2.2rem), `body` (1rem/1.65, `text-wrap: pretty`), `label-mono` (0.8125rem, mayúsculas con tracking ancho para eyebrows y líneas de estado tipo "EN PRODUCCIÓN · V2026.07").

### Espaciado, radios, sombras

- Contenedor máx. `72rem`, secciones con respiración generosa (`clamp(4rem, 10vh, 7.5rem)` vertical).
- Radios pequeños y serios: 4-10px. Radios concéntricos en anidados: `exterior = interior + padding` (principio 1 de `make-interfaces-feel-better`).
- Profundidad por sombras suaves en capas con transparencia, no por bordes duros; imágenes con outline `1px` `rgba(0,0,0,.1)` / `rgba(255,255,255,.1)` según tema.

## Wireframes (texto)

### Home

```text
+--------------------------------------------------------------+
| ANGEL BARBOSA          Inicio · Case study · Contacto  ES|EN *|  header quieto, sticky
+--------------------------------------------------------------+
|  [*] en produccion · v2026.07                                |  linea de estado (mono)
|                                                              |
|  Llevo sistemas completos                                    |  hero: titular grande
|  de la idea a produccion.                                    |  (Archivo 700)
|                                                              |
|  Go · Flutter · React · Cloud (OCI)                          |  subtitulo
|  [ Ver case study ]  [ Descargar CV (PDF) ]                  |  CTAs
+--------------------------------------------------------------+
|  ACP SUITE                                    [en produccion]|  resumen: problema/solucion
|  3-4 bullets · franja de cifras (mono):                      |  + badge de estado real
|  6 UIs · 2 APIs · 1 dev · 150+ pruebas · p95<100ms           |
|  [ Leer case study completo -> ]                             |
+--------------------------------------------------------------+
|  PROYECTOS                                                   |
|  SoloKey                                      [repo publico] |  tarjeta con stack + badge
|  (diseñada para admitir futuros proyectos)                   |
+--------------------------------------------------------------+
|  SKILLS: 5 grupos en lista tipografica (no nube de logos)    |
+--------------------------------------------------------------+
|  CERTIFICACIONES: 3 tarjetas sobrias                         |
|  [Ver credencial] [Ver credencial] [Ver credencial]          |
+--------------------------------------------------------------+
|  CONTACTO: mailto grande + LinkedIn · GitHub · X             |
+--------------------------------------------------------------+
|  ultima actualizacion 2026-07 · sitio estatico · build ok    |  footer = estado del sistema
+--------------------------------------------------------------+
```

### Case study (`/acp-suite`)

```text
+--------------------------------------------------------------+
| <- Inicio                                             ES|EN * |
|  CASE STUDY · REPO PRIVADO (PROYECTO DE CLIENTE)             |  eyebrow mono
|  ACP Suite                                     [en produccion]|
|  Plataforma de boletaje y paqueteria... (tagline)            |
|  panel de cifras clave (mono, tabular)                       |
+--------------------------------------------------------------+
|  El problema | La solucion (6 interfaces) | Arquitectura     |
|  [ SVG del diagrama, tematizado claro/oscuro ]               |
|  Seguridad | Operacion | Calidad | Lecciones | Stack         |
|  TOC lateral sticky en desktop, lineal en movil              |
+--------------------------------------------------------------+
```

La estructura del case study usa los encabezados reales del contenido (problema, solución, arquitectura...): la numeración o los marcadores solo si codifican secuencia real (las 4 lecciones sí son una lista numerada en el original; se respeta).

## Imágenes y capturas

Habrá capturas reales de ACP (panel admin, apps Flutter) y de SoloKey. **Son opcionales y se agregan a futuro** (pendiente D8): el sitio se construye para verse bien sin ellas y sumarlas después sin rediseñar.

- **Carrusel dinámico (elemento interactivo firma):** las capturas se muestran en un carrusel animado con GSAP (Draggable): arrastrable, con inercia, transiciones suaves y avance con controles. Es el único momento de motion "rico" del sitio (el resto sigue sobrio): aquí se concentra la boldness, todo lo demás queda quieto. Aparece en el case study (galería de interfaces de ACP) y puede reutilizarse en las tarjetas de proyecto.
- **Accesibilidad del carrusel (obligatoria):** controles de anterior/siguiente reales y operables por teclado, foco visible, `aria-roledescription="carousel"` y estado anunciado; el auto-avance (si lo hay) se pausa al hover/focus y **se desactiva por completo con `prefers-reduced-motion`**; nunca es la única forma de ver el contenido. Sin JS degrada a una tira con scroll nativo (scroll-snap).
- **Tarjetas de proyecto:** cuando haya captura, va como thumbnail encima del título, stack y badge de estado; sin captura, la tarjeta es tipográfica.
- **Regla dura de seguridad (doc 02, regla 3):** las capturas de ACP van **anonimizadas**: sin datos personales de pasajeros/clientes, sin hostnames internos, IPs ni tokens visibles. Usar datos de demo o difuminar. Requisito, no opcional (proyecto de cliente + LFPDPPP).
- Marco limpio con outline `1px` (tokens), radio del sistema, `astro:assets` para AVIF/WebP + dimensiones (doc 06), `alt` descriptivo. Si una captura no se puede anonimizar bien, no se publica: mejor texto que filtrar datos.

## Motion (motor: GSAP)

GSAP 3 es el motor de animación del sitio (decisión del doc 03). Poco y con intención: nada de partículas, orbes ni loops infinitos. GSAP se usa para lo orquestado, CSS para lo interactivo. La dirección "sistema en producción" sugiere un motivo natural: **la carga del hero como un arranque/boot** (los elementos aparecen en secuencia, como un sistema que entra en línea), sin caricaturizarlo.

**Nivel elegido: sobrio, con un momento rico.** El alcance base es: entrada escalonada del hero (boot), revelado suave por sección al scroll, micro-interacciones en botones/links y el pulso sutil del punto de estado. **El único momento de motion rico es el carrusel de capturas** (GSAP Draggable con inercia): ahí se concentra la boldness. **Quedan fuera:** split del titular por letras (SplitText), trazado del diagrama (DrawSVG) y parallax. GSAP queda en core + ScrollTrigger + Draggable.

**División de trabajo GSAP vs CSS:**

- **GSAP (timelines, ScrollTrigger):** secuencias contadas y disparadas por scroll. Casos concretos: entrada escalonada del hero al cargar (timeline con stagger entre línea de estado, titular, subtítulo y CTAs) y revelado por sección al entrar al viewport (ScrollTrigger, una sola vez con `once: true`). Un solo `context` de GSAP por página, con `gsap.matchMedia()` para el gate de reduced motion.
- **CSS transitions:** todo estado interactivo (hover, focus, active, toggles de tema/idioma). Deben ser interrumpibles, por eso van en CSS y NO en GSAP. Botones con `active:scale-[0.96]`, links con subrayado que aparece.
- **Punto de estado:** el `[●]` del hero y los badges pueden llevar un pulso muy sutil (opacidad, como un latido de "vivo"), apagado por reduced motion. Es el único loop permitido, y solo si no distrae.

**Reglas técnicas duras:**

- **Mejora progresiva:** el contenido nace visible en el HTML. GSAP solo puede animar DESDE un estado ya visible o usar `autoAlpha`/`from()` con un fallback que garantice visibilidad si el JS no corre. Nunca dejar contenido en `opacity:0` esperando a GSAP (si el script falla, la sección desaparece). Prueba obligatoria: cargar el sitio con JS deshabilitado; todo el contenido debe leerse.
- **Reduced motion:** `gsap.matchMedia()` con `(prefers-reduced-motion: reduce)` que reemplaza cada animación por su estado final instantáneo (sin desplazamientos, sin trazados, sin pulso). No basta con acortar la duración.
- **Interruptibilidad:** los estados interactivos van por CSS, no por tweens de GSAP, para que se puedan interrumpir a media animación (principio de `make-interfaces-feel-better`).
- Nunca `transition: all` (propiedades explícitas); exits más suaves que enters; `will-change` solo ante stutter medible; matar ScrollTriggers en el cleanup del `context`.
- **Presupuesto:** GSAP core + ScrollTrigger + Draggable (para el carrusel); no se instalan SplitText ni DrawSVG. Cuentan contra el presupuesto del doc 06.

Durante la implementación, `animation-vocabulary` sirve para nombrar con precisión los efectos al pedirlos o revisarlos, y `review-animations` audita el resultado (doc 07).

## Autocrítica anti-default (obligatoria antes de construir)

Defaults conocidos de diseño generado y cómo esta dirección se separa:

| Default a evitar | Riesgo aquí | Mitigación |
| --- | --- | --- |
| Crema `#F4F1EA` + serif de alto contraste + terracota | El fondo papel se le parece | El papel se combina con una grotesca técnica + mono + verde operativo, no serif + terracota. Si el resultado huele a ese default, el papel se ajusta a un neutro más frío |
| Negro casi puro + acento ácido (look "terminal") | La dirección "sistema" podría derivar en terminal-verde-neón sobre negro | La base es papel CLARO; el verde es medido (no neón), y significa "operativo". El oscuro es neutro cálido, no un terminal. La metáfora es "sistema bien operado", no "consola hacker" |
| Broadsheet: hairlines por todos lados, radio 0, columnas densas | La estructura técnica podría endurecerse de más | Las reglas existen solo como separadores puntuales; el resto respira |
| Glassmorphism + orbes + partículas (el sitio actual) | Regresión por nostalgia | Prohibido por diagnóstico H1/H3 y regla 7 del doc 02 |

El riesgo estético que se toma a propósito: usar el vocabulario de monitoreo/operación (estado, versión, build) en un sitio que no es una app. Se justifica porque describe literalmente lo que Angel hace (operar sistemas en producción) y se controla usándolo solo en los tres puntos señalados, con datos reales.

## Piso de calidad (no negociable, sin anunciarlo)

Responsive hasta 360px, foco visible en todo interactivo, hit areas >= 40x40px, contraste AA verificado por token, `tabular-nums` en cifras, `text-wrap: balance/pretty`, reduced motion respetado, tema y idioma sin FOUC.
