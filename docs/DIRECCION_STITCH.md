# Direccion visual "Blueprint" (capturada de Stitch)

Sistema de diseno semantico extraido de la interfaz que Google Stitch genero para el portfolio (archivo `interfaz_stitch.html`, ya eliminado del repo tras esta captura). Este doc es la fuente de verdad de la direccion elegida por el dueno para la ronda de rediseno visual (`PROMPT_REDISENO_VISUAL.md`); el mapeo a los tokens del sitio vive en el ADR 0011.

> Nota de proceso: este doc describe la maqueta de Stitch **tal como es** (paleta neon incluida). El sitio **NO adopta esa paleta**: por instruccion del dueno (2026-07-15, "sin colores neon") se toma solo la **forma** (layout, capa blueprint, geometria dura, motivos mono) sobre la paleta papel y tinta ya establecida (claro por defecto, azul tinta, verde de estado; ADR 0005/0010). La adaptacion vive en el ADR 0011.

## 1. Tema visual y atmosfera

**Plano de ingenieria de un sistema en produccion.** Oscuro, utilitario, tecnico. La pantalla se lee como un blueprint o un plano tecnico: lineas de referencia (datum lines), rectangulos y circulos de contorno tenue, etiquetas de coordenadas en monoespaciada (`COORD_REF: X15.Y20`, `BLPRNT_001`), folios de seccion (`SEC: 01 / FOLIO: 001`) y una capa sutil de grano de papel. Denso en anotaciones tecnicas pero con aire generoso: mucho negro de respiro entre pocos elementos grandes.

El caracter viene de la tension entre tres cosas: fondo casi negro, tipografia display enorme y condensada, y un unico acento lima de alto voltaje que funciona como "senal" (el color de lo que esta vivo/operativo). Profundidad brutalista: sombras duras desplazadas sin desenfoque y bordes rectos. La metafora no es "consola hacker" sino "sistema bien instrumentado": estado, version, build, coordenadas.

Mantiene la continuidad conceptual con la direccion "sistema en produccion" del sitio (linea `[.] EN PRODUCCION · V2026.07`, badges de estado, marquee de stack), pero la lleva a un registro mucho mas asertivo y oscuro.

## 2. Paleta de color y roles

Rampa de superficies casi negras, muy juntas, sobre la que flota un unico acento lima y un texto hueso.

### Superficies (de mas oscura a mas clara)

| Nombre descriptivo | Hex | Rol |
| --- | --- | --- |
| Negro tinta | `#0e0e10` | Fondo global (`background`, `surface-container-lowest`) |
| Casi negro | `#131315` | Superficie base / dim |
| Grafito profundo | `#1b1b1d` | Contenedor bajo, lineas datum |
| Grafito | `#1f1f21` | Contenedor de tarjeta |
| Grafito medio | `#2a2a2c` | Contenedor alto |
| Piedra oscura | `#353437` | Contenedor mas alto / variante de superficie |
| Piedra | `#39393b` | Superficie destacada, contornos geometricos tenues |

### Tinta (texto)

| Nombre descriptivo | Hex | Rol |
| --- | --- | --- |
| Hueso | `#e4e2e4` | Texto principal, titulares, iconos activos |
| Salvia grisacea | `#c4c9ac` | Texto secundario / labels mono (`on-surface-variant`), un gris con leve tinte oliva |
| Oliva apagado | `#8e9379` | Contornos medios (`outline`) |
| Oliva oscuro | `#444933` | Bordes y puntos de la reticula (`outline-variant`), lineas de plano |

### Acento y senal

| Nombre descriptivo | Hex | Rol |
| --- | --- | --- |
| Lima alto voltaje | `#c3f400` | Acento primario: estado activo del nav (borde izquierdo), texto de estado, hover de enlaces (fondo lima con texto oscuro), CTA firma |
| Lima electrico | `#ccff00` | Punto de estado pulsante (el `[.]` del hero), variante casi identica al primario |
| Lima segada | `#abd600` | Lima mas oscura para tintes/estados (`primary-fixed-dim`, `surface-tint`) |
| Verde musgo | `#556d00` | Lima muy oscura, para texto sobre lima o acento en superficie clara (`on-primary-container`) |
| Oliva noche | `#161e00` / `#283500` | Texto oscuro que va ENCIMA del lima (botones, badges) |

### Secundario (apenas usado)

| Nombre descriptivo | Hex | Rol |
| --- | --- | --- |
| Cian palido | `#d3fbff` | Secundario claro, casi no aparece en la pantalla capturada |
| Cian electrico | `#00eefc` / `#00dbe9` | Acento secundario disponible (contenedor secundario), reservado, sin uso real en el hero |
| Rojo suave | `#ffb4ab` | Error |

**Lectura de la paleta:** un solo protagonista de color (lima) sobre una escala monocroma de negros con tinte oliva. El cian existe en el sistema pero no se usa: es un secundario latente. El texto En produccion, el punto pulsante y el hover comparten el lima, es decir, en Stitch el lima hace de acento interactivo Y de senal de estado a la vez (esto choca con la separacion accent/status del sitio; se resuelve en el ADR 0011).

## 3. Tipografia

Tres familias con papeles muy separados.

| Rol | Fuente | Uso y caracter |
| --- | --- | --- |
| Display | **Bebas Neue** | Titular del hero (`ANGEL BARBOSA`) y footer. Condensada, altisima, todo mayusculas, sin peso variable. Da el golpe de escala: `display-xl` 120px (line-height 100px, tracking -0.02em), `display-xl-mobile` 64px, `headline-lg` 48px (tracking +0.05em) |
| Cuerpo | **Inter** | Texto corrido (400/500/600), `body-md` 16px/24px. Neutra y legible, hace de contrapunto silencioso al display y al mono |
| Datos / etiquetas | **JetBrains Mono** | Estado, folios, coordenadas, marquee, labels de nav, metadata. `mono-data` 14px/20px; `mono-label` 12px, mayusculas, tracking +0.1em (0.1em de letter-spacing). Es la voz "de sistema" |
| Iconos | Material Symbols Outlined (fuente de iconos) | person, account_tree, deployed_code, science, terminal, sensors. En la implementacion del sitio se reemplazan por SVG inline (regla del sitio) |

Jerarquia: escala brutal entre el display condensado enorme y el mono chico en mayusculas. El cuerpo Inter aparece poco. Las mayusculas con tracking ancho en mono son parte central del caracter (todo lo "de sistema" habla en mono-mayuscula).

## 4. Estilos de componentes

- **Botones / CTA:** rectos (sin redondeo real; el sistema define radios 4/8/12px pero el hero usa esquinas rectas). El hover invierte: fondo lima con texto oscuro y borde lima. El CTA de descarga va subrayado en lima. Estado por color, no por relleno suave.
- **Tarjetas / contenedores:** esquinas rectas (`rounded-none`), fondo grafito (`#1b1b1d`/`#1f1f21`), borde tecnico fino (`blueprint-border`: 1px `rgba(136,136,136,0.3)`) y, en la pieza firma (el enunciado del hero), una **sombra dura desplazada** `20px 20px 0 rgba(0,0,0,0.5)` sin desenfoque. Cero glassmorphism, cero sombras difusas: profundidad por desplazamiento y borde, no por blur.
- **Enlaces (footer):** cada enlace es una celda con padding y borde transparente; en hover se rellena de lima con texto oscuro y borde lima. Tratamiento de "tecla" mas que de texto subrayado.
- **Nav lateral (desktop):** riel de iconos de 80px de ancho, con una etiqueta rotada 90 grados (`REF. 2026-AB / SYS_OPERATIONS`) y secciones numeradas (`01 / IDENTITY` ... `05 / TERMINAL`). El activo lleva icono lima con borde izquierdo lima; los inactivos, tenues, revelan su etiqueta al hover. (En la implementacion accesible del sitio: labels visibles/operables por teclado, no solo hover.)
- **Barra superior:** fija, altura 64px, nombre en Bebas a la izquierda y a la derecha la linea de estado `[.] EN PRODUCCION · V2026.07` en lima + icono `sensors`. Borde inferior fino, sin sombra ("flat").
- **Indicador de estado:** punto lima de 8px con anillo que pulsa (`pulse-lime`, 2s), junto al texto de estado.
- **Marquee:** tira de stack en mono que se desplaza en bucle infinito (`GO // FLUTTER // REACT // POSTGRESQL // TERRAFORM // OCI //`), sobre la superficie mas oscura, con bordes datum arriba y abajo.

## 5. Geometria y profundidad

- **Esquinas:** predominan rectas. El sistema declara radios 4px (DEFAULT), 8px (lg), 12px (xl) y full, pero la pantalla capturada usa sobre todo bordes rectos; los circulos completos (`rounded-full`) aparecen solo como geometria decorativa de plano al fondo.
- **Profundidad:** sombra dura desplazada sin blur (`hard-shadow`) en la pieza firma; el resto es plano con borde de 1px. Nada de elevacion difusa.
- **Bordes:** finos y tecnicos (`blueprint-border`, 1px a ~30% de opacidad).

## 6. Capa decorativa firma (el "plano")

Es lo que le da identidad y hay que replicar con criterio (no saturar):

- **Lineas datum:** verticales al 15% / 55% / 80% y horizontales al 20% / 60% / 85%, en grafito muy tenue.
- **Contornos geometricos:** dos o tres rectangulos y dos circulos grandes de borde tenue, como cotas de un plano.
- **Etiquetas de alta precision (mono, ~9px, oliva):** `COORD_REF: X15.Y20`, `SEC_A`, `BLPRNT_001`, `SYS.GRID.MAIN`, y folios de seccion rotados `SEC: 01 / FOLIO: 001`.
- **Grano de papel:** textura sutil (tipo "stardust") a ~15% de opacidad con `mix-blend-overlay`. En el sitio va self-hosted, no desde URL externa.
- **Reticula de puntos** (`bg-grid`: radial-gradient de puntos cada 24px): disponible como alternativa al fondo de lineas.

## 7. Motion

- Punto de estado con pulso (anillo lima que crece y se desvanece, 2s en bucle). Es el unico loop.
- Marquee horizontal infinito del stack (20s lineales).
- Transiciones de color en hover (nav, enlaces).
- Todo debe respetar `prefers-reduced-motion` y la mejora progresiva del sitio (contenido visible sin JS).

## 8. Que NO traer tal cual a la implementacion

Cosas de la maqueta de Stitch que son artefactos de herramienta o chocan con las reglas del sitio, y no se copian:

- Tailwind por CDN, Google Fonts por CDN y textura desde URL externa: en el sitio las fuentes van self-hosted (subset) y los assets locales.
- Iconos con fuente Material Symbols: se reemplazan por SVG inline.
- Un `.blob { filter: blur(80px) }` definido en el CSS (roza glassmorphism, regla 7 del doc 02): NO se usa.
- Clases invalidas de Stitch (`Transition-all`, `flat no shadows`) y solo 1 de 5 secciones construidas: la maqueta es un concepto, no codigo de produccion.
- El lima haciendo de acento Y de estado a la vez: en el sitio se mantiene la separacion accent (interaccion) vs status (estado real). Ver ADR 0011.

## 9. Relacion con el sistema actual del sitio (que se adopta y que no)

- **Se adopta (forma):** la capa blueprint (lineas datum, contornos, coordenadas, folios, grano), la geometria dura, la sombra dura desplazada, el lenguaje mono amplificado y el marquee. Refuerzan el "sistema en produccion" que el sitio ya tiene.
- **NO se adopta (color/tono):** el lima neon (se conserva el azul tinta del ADR 0010), el oscuro por defecto (se conserva claro por defecto + oscuro) ni el colapso acento/estado (se conserva la separacion). Sin neon, por instruccion del dueno.
- **Tipografia:** por defecto se conservan Archivo + IBM Plex Mono; la display condensada tipo Bebas queda como opcion abierta. Ver ADR 0011.
