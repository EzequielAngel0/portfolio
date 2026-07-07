# 0009 · Motion ampliado: fondo interactivo, intro con el nombre y GSAP en todo el sitio

- **Fecha:** 2026-07-06
- **Estado:** Aceptada (OK del dueno 2026-07-06: las 3 capas, con el fondo "trazo de tinta tras el cursor" elegido entre las alternativas; la rejilla interactiva se descarto). Revisa el ADR 0005 y la seccion de motion del doc 05.

## Contexto

Tras el lanzamiento, el dueno pidio un sitio "mas visual": mas GSAP aplicado en todo el sitio, un fondo con animacion interactiva que reaccione al usuario y una intro de entrada con su nombre (T9 de la ronda post-lanzamiento). Esto amplia la direccion "motion sobrio con un momento rico" del ADR 0005 y del doc 05, que limitaba el alcance a boot del hero, revelado por seccion y el carrusel. El dueno otorga libertad creativa amplia con UN requisito duro: sostener ~60fps medidos. La unica prohibicion estetica que sigue firme es el glassmorphism (blur de fondo, orbes de gradiente flotantes, particulas).

## Que se mantiene (no negociable, viene del doc 06 y de los gates ya publicados)

1. **Sin glassmorphism**: nada de blur de fondo, orbes de gradiente ni particulas.
2. **Mejora progresiva**: el contenido nace visible en el HTML; sin JS todo se lee y navega. Nada queda en `opacity: 0` esperando un script.
3. **`prefers-reduced-motion`**: apaga TODO el motion con estado final instantaneo (via `gsap.matchMedia()` y CSS), incluida la intro y el fondo.
4. **LCP movil < 1.8 s**: el titular nace pintado; la intro solo lo REVELA (cortina que se retira), nunca lo hace aparecer desde cero.
5. **JS < 60 KB gzip**: GSAP core + ScrollTrigger + Draggable ya viajan; no se agregan plugins nuevos (la particion del nombre para la intro se hace en build, en el HTML, no con SplitText).
6. **60fps demostrados**: medicion en DevTools (scroll y carga) sobre el build de produccion (preview o contenedor Podman en `http://portfolio:4321`), evidencia en el tracker. Si una propiedad cara se anima, se mide o se descarta.

## Que se amplia respecto al ADR 0005

El criterio deja de ser "solo transform/opacity en 3 gestos" y pasa a ser "lo que sostenga 60fps, demostrado con medicion". GSAP puede tocar todas las secciones, no solo el hero.

## Decision propuesta: tres capas de motion coherentes con "sistema en produccion"

### Capa 1 · Intro "arranque del sistema" con el nombre

Overlay a pantalla completa en el color del papel con el nombre en el centro: los caracteres de "ANGEL BARBOSA" (partidos en `<span>` en build, aria-hidden, con el nombre real en sr-only) entran con stagger tipo "encendido" (autoAlpha + y, en mono con el cursor de bloque del vocabulario del sitio), una linea de estado breve debajo, y la cortina se retira con `clipPath`/transform revelando el hero ya pintado.

- Corre UNA vez por sesion (`sessionStorage`); en visitas siguientes no aparece.
- Dura menos de 1.6 s y se puede saltar con clic/tecla/scroll.
- El overlay es CSS puro presente en el HTML solo en la primera carga logica: para no violar mejora progresiva ni LCP, el overlay se INSERTA por JS (si no hay JS, no hay overlay y el sitio es el actual); el hero sigue siendo el LCP porque el overlay usa el mismo fondo papel y el titular nace pintado debajo.
- Reduced motion: no se inserta.

### Capa 2 · Fondo "circuito del sistema" (v2, 2026-07-06)

> Historial: la v1 de esta capa fue el "trazo de tinta tras el cursor". El dueno la probo en el build real y la descarto (el fondo seguia sintiendose vacio); pidio "algo en movimiento constante, con algo del cursor pero que no lo persiga". La v2 lo resuelve asi:

Una capa fija DETRAS del contenido con rutas ortogonales tenues de tinta (el mismo lenguaje del diagrama de arquitectura del case study): el fondo queda lleno SIEMPRE, no depende del cursor.

- **Movimiento propio constante:** senales cortas de tinta (en el acento azul) recorren 5 de las 11 rutas en bucle lento y desfasado (`stroke-dashoffset` con GSAP, 14-34 s por ciclo). Es el unico bucle nuevo; se mide su costo de fps explicitamente.
- **Reaccion suave al cursor (sin perseguirlo):** toda la capa deriva un maximo de ~12 px hacia la posicion del puntero con `gsap.quickTo` y easing largo (1.8 s): responde a la presencia del usuario sin ser un seguidor. Solo con `(pointer: fine)`.
- **Scroll:** parallax minimo (yPercent -2.5 con scrub) para profundidad, tambien en tactil.
- Implementacion: `div.bg-circuit` fijo con `z-index: -1` (pinta sobre el canvas del body y bajo TODO el contenido; tarjetas y header opacos la tapan y la legibilidad del texto no se compromete), SVG 1440x900 con `slice` y `vector-effect: non-scaling-stroke`. Insertada por JS: sin JS no existe. Reduced motion: no se crea.
- NO es glassmorphism: sin blur, sin orbes de color, sin particulas (las senales viajan por rutas fijas de un esquema, no flotan aleatorias); todo es tinta monocroma + el acento.

### Capa 3 · GSAP ampliado por seccion

- **Home**: revelado por seccion ya existente, ahora con stagger interno (titulo, cuerpo, tarjetas en cascada corta); las cifras clave del teaser entran en cascada (sin contadores: son strings mixtos como "p95 < 100 ms" y un contador seria artificial); hover con lift sutil (CSS) en tarjetas de proyecto/certificacion.
- **Case study**: el diagrama de arquitectura entra por bloques (grupos del SVG con autoAlpha + y stagger via ScrollTrigger); las filas del corte de caja entran en cascada; los separadores de seccion se "trazan" (scaleX 0 -> 1, transform, no width).
- **Certificaciones**: el carrusel ya es rico (Draggable); las filas del catalogo entran con stagger por grupo.
- **Microinteracciones**: siguen en CSS (interrumpibles); exits mas suaves que enters; sin `transition: all`.

## Alternativas consideradas

- **A. Solo capa 3 (GSAP ampliado, sin fondo ni intro)** · el menor riesgo y costo, pero no cumple los pedidos explicitos del dueno (fondo interactivo + intro con nombre).
- **B. Fondo con canvas/WebGL (malla de nodos con fisica, estilo "constelacion")** · maximo impacto visual, pero es exactamente la clase de decoracion (canvas + rAF en bucle) que tiro los fps del sitio viejo (doc 06) y roza "particulas". Descartada.
- **C. Snap de secciones + parallax profundo multi-capa** · vistoso pero secuestra el scroll (mala a11y percibida en un sitio de lectura) y el scrub continuo compite con la lectura del reclutador (doc 01: 30 segundos). Se toma solo el parallax minimo de la trama.
- **D. Fondo "rejilla del sistema"** (trama de puntos tipo papel milimetrico con mascara que sigue el cursor) · propuesta original de esta capa; el dueno la descarto en favor del trazo de tinta.
- **La eleccion final (intro + trazo de tinta + GSAP por seccion)** equilibra el pedido del dueno con los gates: todo se compone en GPU salvo el repintado local del trazo (medido), nada corre en bucle salvo ese trazo mientras el puntero se mueve y el pulso de estado ya permitido.

## Costo estimado

- JS propio nuevo: ~4-6 KB min (intro + rejilla + triggers nuevos); sin plugins GSAP nuevos. Presupuesto total sigue < 60 KB gzip (a verificar en dist).
- Riesgo de fps: bajo (transform/opacity/mask-position); la mascara del puntero es el unico movimiento continuo y se mide explicitamente en DevTools; si no sostiene 60fps en movil, se degrada a mascara anclada (solo scroll).
- LCP: sin cambio esperado (la intro se inserta post-parse solo en primera visita; se mide igual).

## Consecuencias

- Se gana: el "mas visual" pedido, con una identidad de motion propia (arranque de sistema, papel tecnico que reacciona) en lugar de efectos genericos.
- Se paga: mas superficie de codigo de motion que mantener y medir; la verificacion de cada ronda futura debe incluir fps con el fondo activo.
- Queda obligado: medicion de fps y LCP tras implementar (evidencia en `docs/rondas/`), auditoria con `review-animations`, prueba sin JS y con reduced motion, y actualizar doc 05 (seccion Motion) para reflejar esta ampliacion.
