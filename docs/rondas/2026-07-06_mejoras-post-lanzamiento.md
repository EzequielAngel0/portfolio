# Ronda de mejoras post-lanzamiento (T1-T11) · 2026-07-06

Ejecuta `docs/PROMPT_MEJORAS_POST_LANZAMIENTO.md`. Ramas cortas desde `develop` (una por ola), merge a `develop` al cerrar cada una; a `master` decide el dueno.

## Estado por tarea

- [hecho] **T1 · Puntos sueltos en las pills del stack.** Causa: las secciones Stack y Capturas vivian DENTRO de `.cs-prose` y heredaban `list-style: disc` y el `padding-left` de la prosa. Fix estructural: `.cs-prose` ahora envuelve solo el markdown + diagrama; Stack/Capturas son hermanas. Verificado en dist: `list-style: none`, sin `::marker`. Rama `fix/case-study-layout`.
- [hecho] **T2 · Espacio en blanco antes de Stack.** Misma causa que T1: el `h2` de Stack recibia el `border-top + margin + padding` de `.cs-prose :global(h2)` ADEMAS del de `.cs-section` (doble separador con hueco). Con el fix de T1 queda un solo separador. Verificado con captura (1 borde entre Lecciones y Stack).
- [hecho] **T3 · Pagina de certificaciones.** Rutas `/certificaciones/` y `/en/certifications/` (slug localizado: mapeo explicito en `i18n/utils.ts` con `certsPath()` y `localizedRoutes` para hreflang/toggle, y `serialize` del sitemap para el par). Datos: `certifications.json` reescrito `{ featured, groups }` con TODO el catalogo del perfil publico de Alura (17 formaciones, 55 cursos + 1 inmersion, 2 programas, 2 certificaciones): 77 credenciales, CADA UNA con URL de verificacion (extraidas del DOM del perfil `app.aluracursos.com/user/angelezequiel` con Edge headless; muestras validadas HTTP 200). Curacion del dueno: home con 3 destacadas + "Ver todas"; pagina con carrusel de 6 destacadas + catalogo COMPLETO agrupado en filas densas. Componentes nuevos: `CertCard`, `CertCarousel` (mismo contrato `[data-carousel]`; la logica del carrusel se extrajo a `src/scripts/carousel.ts` compartido con `Carousel.astro`), `certs/CertificationsCatalog.astro`. Nav con entrada "Certificaciones" (oculta en movil para sostener 360px). OG propias por idioma. Rama `feat/certificaciones`.
- [hecho] **T4 · Telefono en contacto.** Decision del dueno: WhatsApp directo en lugar de `tel:`: link `https://wa.me/523320191633` con icono propio y `aria-label` localizado, en `site.ts` + `Contact.astro`. No se agrego al JSON-LD (el dueno prefirio mensajeria, no dato estructurado).
- [hecho] **T5 · Footer recortado.** `footer.status` ES/EN queda solo "ultima actualizacion 2026-07" / "last updated 2026-07" (copy confirmado por el dueno).
- [hecho] **T6 · Iconos nuevos.** `Icon.astro`: `download` (trazo, para header y CTA) y `whatsapp` (marca rellena), mismo viewBox 24 y lenguaje de los existentes.
- [hecho] **T7 · ACP Suite -> ACP y rutas `/acp/`.** Copy: title/tagline frontmatter ES/EN, `ui.ts` (404), titulos de pagina, JSON-LD name, titulos del diagrama ("plataforma de ACP" donde habia ambiguedad con la empresa). Rutas: `acp-suite.astro -> acp.astro` (ES/EN), todos los `localizePath('acp')`, sitemap/canonical/hreflang verificados en dist con `/acp/` y `/en/acp/`. SIN pagina puente (decision del dueno): `/acp-suite/` queda en 404. OG regeneradas (`scripts/og-images.mjs`, satori con `--no-save`, lockfile intacta). Grep de "ACP Suite" en dist: 0. Rama `feat/rename-acp`.
- [hecho] **T8 · Boton de CV en el header.** Link `download` en el bloque de toggles: icono solo hasta `lg` (aria-label localizado), icono + texto en pantallas anchas; hit area 40x40; verificado sin overflow a 360px.
- [hecho] **T9 · Motion ampliado (ADR 0009).** ADR redactado, presentado y ACEPTADO por el dueno (3 capas; el fondo "rejilla interactiva" se descarto y eligio "trazo de tinta tras el cursor"). Implementado en `motion.ts` + `global.css`: (1) intro "arranque" con el nombre por caracteres + linea de estado real y cortina, una vez por sesion (`sessionStorage`), saltable, insertada por JS (sin JS no existe; LCP intacto); (2) trazo de tinta tras el cursor: un `<path>` en capa fija, puntos que expiran (~0.7 s), `gsap.ticker`, solo `(pointer: fine)`; (3) staggers por seccion (`[data-stagger]` en cifras, stack, tarjetas, skills, filas del catalogo con `ScrollTrigger.batch` para listas largas), bloques del diagrama (nodos -> conexiones) y separadores trazados (`.rule-draw` scaleX, sin JS queda el border normal). Verificacion (Edge headless, build de produccion): 13/13 OK: intro aparece/se retira/hero visible, sin intro en 2a pagina, trazo pinta y se desvanece, 0 nodos ocultos tras scroll (home y catalogo), **~61 fps medidos durante scroll continuo con puntero activo**, sin JS 0 nodos ocultos y sin capas nuevas, reduced motion sin intro/trazo y hero visible. Rama `feat/motion`.
- [hecho] **T10 · CV bilingue.** `cvPath(locale)` en `i18n/utils.ts`; hero y header sirven `Angel_Barbosa_CV_ES.pdf` en `/` y `Angel_Barbosa_CV.pdf` (nombre estable) en `/en/`. Ambos PDF regenerados con Edge headless (`page.pdf`, `preferCSSPageSize` + `printBackground`) DESPUES del cambio de rutas: links internos verificados en el binario (`/acp/` y `/en/acp/`), 1 pagina cada uno. HTML fuente EN actualizado ("ACP", link `/en/acp/`); el ES ya estaba aprobado por el dueno.
- [hecho] **T11 · Contenedor.** Usado como verificacion; el dueno lo consulta via `http://portfolio:4321` (entrada `127.0.0.1 portfolio` en su hosts; el mapeo `4321:4321` de `compose.yaml` no cambio).

## QA responsive (pedido del dueno a mitad de ronda)

6 anchos (360, 390, 480, 768, 1024, 1440) x 7 paginas (`/`, `/acp/`, `/certificaciones/`, `/en/`, `/en/acp/`, `/en/certifications/`, 404): **sin overflow horizontal, sin animaciones sin terminar tras el scroll, hit areas del header >= 40px**. Dos falsos positivos documentados del propio QA: (a) `scroll-behavior: smooth` hace que `scrollTo` programatico rapido no llegue al fondo en desktop (se mide con `behavior: 'instant'`); (b) los items del nav con `max-sm:hidden` miden 0x0 (no interactivos, se excluyen).

## Presupuesto y gates

- JS gzip por pagina (peor caso `/certificaciones/`: gsap 26.5 + motion 18.1 + Draggable 12.8 + carousel 0.9 + base 1.1): **~59.4 KB, dentro del techo de 60 KB pero al limite**; home ~45.7 KB. Si una futura pieza suma JS, hay que recortar antes (nota en doc 06).
- fps: ~61 medidos en scroll con trazo activo (Edge headless, build de produccion). Pendiente razonable: medicion en hardware movil real del dueno.
- Reglas duras por grep sobre `src/`: sin em dash, sin emojis, sin "microservicios"/Redis/Supabase/OAuth2 (el unico hit es la frase autorizada "no microservicios" del case study).
- `check` + `build` en verde; e2e headless de intro/motion/certs/CV por idioma/hreflang/sitemap en verde (detalle arriba).
- Lockfile intacta (todas las herramientas one-off con `npm i --no-save`).

## Decisiones del dueno registradas

- Footer: solo "ultima actualizacion".
- Sin pagina puente en `/acp-suite/` (404 asumido).
- Telefono: WhatsApp directo (wa.me), no `tel:` ni JSON-LD.
- Certificaciones: rutas `/certificaciones/` + `/en/certifications/`; home 3 destacadas + "Ver todas"; catalogo COMPLETO listado (77 credenciales); URLs desde su perfil publico de Alura.
- ADR 0009 aceptado con fondo "trazo de tinta tras el cursor" (rejilla descartada).
- Contenedor: acceso via `http://portfolio:4321`.

## Deuda / seguimiento

- Presupuesto JS al limite en `/certificaciones/` (~59.4 KB gzip): vigilar en la proxima pieza.
- Lighthouse completo post-ronda (movil, foco LCP con la intro activa) queda para el siguiente pase del dueno o una ronda corta; la intro se inserta post-parse y no toca el LCP por diseno, verificado solo funcionalmente.
- Pase visual del dueno en su hardware (D4 ampliado con las paginas nuevas) y NVDA/validadores externos siguen pendientes de F6/F7.
