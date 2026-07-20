# Prompt para la ronda de paginas: Educacion + Sobre mi (copiar y pegar en un chat nuevo)

Redactado el 2026-07-20. Contexto: el portfolio esta en produccion en `portfolio.angelezequiel.dev` (F0-F7, rondas post-lanzamiento, rediseno blueprint ADR 0011 y mudanza a subdominio ADR 0012 hechas). El dueno quiere dos paginas nuevas para dejar el sitio mas completo: **Educacion** y **Sobre mi / historia**. Una tercera pagina (Experiencia profesional, rol en ACP) queda para un segundo lote y NO entra en esta ronda.

## Version corta (recomendada): pega SOLO esto en un chat nuevo abierto en el repo

> Chat nuevo en este repo (portfolio en produccion en `portfolio.angelezequiel.dev`; `develop` va adelante de `master`). Vas a agregar DOS paginas bilingues nuevas: Educacion (`/educacion/` + `/en/education/`) y Sobre mi (`/sobre-mi/` + `/en/about/`), espejando como esta montada la pagina de certificaciones. Lee y sigue `docs/prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md` completo, y el canon que referencia (04 arquitectura, 05 diseno, 06 SEO/a11y, 08 proceso) y los ADR 0005/0010/0011 (direccion visual vigente: papel y tinta azul + capa blueprint). Reglas duras del doc 02 (sin em dash, sin emojis, sin glassmorphism, precision tecnica, solo datos verificables) y proceso del doc 08 (commits de una linea sin acentos ni firma de IA; rama corta `feat/` desde `develop`; a `master` NUNCA haces merge). ANTES de codificar, proponme el plan (rutas, componentes, datos, OG, nav) y espera mi OK. Verifica con `npm run build` + `preview` o `podman compose up --build`.

La version larga de abajo es la fuente de verdad que ese chat leera del disco; no hace falta pegarla.

---

Vas a agregar dos paginas de contenido al portfolio YA LANZADO. Antes de tocar codigo lee `docs/README.md`, `docs/canon/04-arquitectura.md`, `docs/canon/05-diseno.md`, `docs/canon/06-seo-rendimiento-a11y.md`, `docs/canon/08-convenciones-y-proceso.md` y los ADR 0005 (direccion visual), 0010 (paleta) y 0011 (motivos blueprint). No re-decidas lo ya decidido: una pagina de contenido NO llega al umbral de ADR (doc 08: "cambia la direccion o una familia tipografica = ADR"), asi que va sin ADR, pero si algo te obliga a cambiar un token o la forma visual, para y propon el ADR.

## Reglas duras (doc 02, no negociables)

1. Sin em dash. Sin emojis (SVG propio si). Sin glassmorphism, orbes ni particulas.
2. Precision tecnica y **solo datos verificables**: no inventes fechas, materias, promedios ni logros. Usa exactamente los datos de este prompt y el copy que apruebe el dueno.
3. Commits de una linea, `tipo(ambito): descripcion`, español SIN acentos, SIN pie de firma de IA.
4. Rama corta `feat/...` desde `develop`; a `master` NUNCA hace merge el asistente.
5. Verificar con `npm run build` + `npm run preview` (no solo dev), sin JS y ~60fps. Reglas duras por grep al cerrar.
6. Coherencia visual con la direccion vigente (papel y tinta azul, capa blueprint, mono para datos/cifras, geometria dura). Reusa tokens y componentes existentes; no introduzcas estilos nuevos de fondo.

## La referencia: como se monto la pagina de certificaciones

Copia ese patron (es una pagina bilingue nueva ya resuelta en el repo):

- Rutas: `src/pages/certificaciones.astro` (ES) y `src/pages/en/certifications.astro` (EN), cada una envuelve `Base.astro` y monta un componente de catalogo (`src/components/certs/CertificationsCatalog.astro`) con `locale`.
- Slug localizado ES/EN mapeado en `src/i18n/utils.ts` (para hreflang, canonical y el toggle de idioma). Revisa como estan mapeados `certificaciones` <-> `certifications` y `acp` y agrega los pares nuevos.
- Datos en `src/data/*.json` (ej. `certifications.json`). El texto de UI localizado vive en `src/i18n/ui.ts`.
- OG por pagina/idioma en `scripts/og-images.mjs` (genera los PNG de `src/assets/og/`). Al agregar paginas hay que agregar sus entradas y REGENERAR.
- Entrada en el nav de `Base.astro` (con `aria-current`) y en el sitemap (automatico via `@astrojs/sitemap` si la ruta existe; verifica hreflang/canonical en el build).

## Tarea 1 · Pagina de Educacion

Rutas: `/educacion/` (ES) y `/en/education/` (EN).

Contenido (datos confirmados por el dueno, NO cambiar):

- **CETI (Centro de Ensenanza Tecnica Industrial)** - Tecnologo en Desarrollo de Software (Computer Software Engineering). Ago 2022 - Jun 2026. **Egresado.** Promedio 94.50/100.
- **CETI (Centro de Ensenanza Tecnica Industrial)** - Ingenieria en Desarrollo de Software. Ago 2026 - Jun 2029. Ingreso directo a 3er semestre (en curso / proximo).

Sugerencias de implementacion:

- Datos en `src/data/education.json` (estructura tipo `{ institution, degree, degreeEn, start, end, status, note }`), leidos por un componente `src/components/edu/EducationTimeline.astro` (o `Section` existente) que pinte una linea de tiempo o fichas en el lenguaje blueprint (folios, mono para fechas y promedio, geometria dura). Reusa `ui/` (Section, Tag, Badge) y tokens; nada de fondos nuevos.
- Marca visualmente el estado con texto (egresado / en curso), no con color solo, y con el vocabulario de estado del sitio si aplica (doc 05 limita el vocabulario "sistema"; no lo abuses).
- No dupliques las certificaciones aqui: educacion es formacion academica formal (CETI); las certificaciones (OCI, Google, ONE) siguen en `/certificaciones/`. Si quieres, un enlace cruzado "Ver certificaciones" al pie.
- Relacion con LinkedIn (dato del dueno): LinkedIn no deja poner fecha de inicio futura para la ingenieria; el portfolio si la muestra. No es un problema tecnico del sitio, solo contexto.
- **Dimension hardware del CETI (dato del dueno 2026-07-20):** la formacion en el CETI no es solo software; incluye electronica de base, sistemas embebidos, IoT y seguridad de hardware. Evidencia real: el proyecto de 7mo semestre **Purificador** (purificador de aire IoT: app React Native/TS + firmware ESP32 en C++ + sensor de gas MQ135 + ventilador DC por PWM con MOSFET + WiFi + backend Supabase + PCB propia; <https://github.com/EzequielAngel0/Purificador>). Purificador NO se publica como project card ni como pagina propia (decision del dueno 2026-07-20): queda como evidencia INTERNA de que la formacion incluye hardware. Si el dueno quiere, puede aludirse en la narrativa de Sobre mi/educacion como proyecto escolar, pero sin ficha de proyecto. NO va en `/certificaciones/`.

## Tarea 2 · Pagina Sobre mi / historia

Rutas: `/sobre-mi/` (ES) y `/en/about/` (EN).

Objetivo: una pagina narrativa (bio ampliada, trayectoria, foto) que complemente el hero tipografico de la home sin repetir el case study. Es la pagina "quien soy" para el reclutador que quiere contexto humano.

- **Copy:** transcribe y adapta del material en `perfil-mejorado/` (el "Acerca de" de `LinkedIn_ES_EN.md` en ES y EN, y el CV) aplicando las reglas duras. NO inventes. Propon un borrador ES/EN al dueno y espera su OK antes de fijarlo en `src/content/` o `src/i18n/ui.ts`.
- **Foto:** el hero de la home es 100% tipografico por decision del dueno (no usa foto). Para esta pagina el dueno menciono una foto: pidesela (headshot profesional), definan formato/optimizacion (Astro `Image`, subset de tamanos, `loading="lazy"`, alt descriptivo) y ubicacion (`src/assets/`). Si el dueno no la trae, deja la pagina lista sin foto (bloque preparado) y no bloquees por eso.
- **Estructura sugerida:** intro breve (que hace y como trabaja), trayectoria (formacion + ONE + ACP en prosa, no bullets del case study), enfoque actual con dos hilos: (a) ciberseguridad/AppSec como aprendizaje en curso, coherente con el README de GitHub y el LinkedIn ya actualizados; (b) hardware/embebido y maker: sistemas embebidos, IoT, electronica y seguridad de hardware que YA estudia en el CETI (proyecto Purificador), mas areas que explora (diseno de PCBs, modelado 3D e impresion 3D, CAD, domotica, fabricacion digital, robotica, conectividad IoT avanzada tipo LoRa/Matter, y del prototipo al producto: diseno para fabricacion). Marco: "de la PCB a la nube", un builder full-stack que se extiende al hardware. Encuadre: lo que YA hace va como real; lo que explora, como interes/aprendizaje, nunca como aptitud dominada. Cierre con enlaces (contacto, CV, GitHub). Todo en el lenguaje visual vigente.
- Considera enlazar Sobre mi <-> Educacion entre si y desde el home/nav.

## Piezas transversales (para ambas)

- **i18n:** agrega los pares de slug en `src/i18n/utils.ts` (`educacion` <-> `education`, `sobre-mi` <-> `about`). Verifica que el toggle de idioma salte a la pagina equivalente y que hreflang/canonical salgan correctos en el build.
- **Nav:** el header ya trae Inicio, ACP/case study, Certificaciones, Contacto y el boton de CV, y se comprime a 360px. Sumar dos entradas mas puede saturar. Decide con el dueno que va en el nav principal y que va en el footer o en un menu (recomendacion: Sobre mi al nav, Educacion accesible desde Sobre mi y footer). Manten `aria-current`, hit areas >= 40x40 y el minimo de 360px sin romperse.
- **OG:** agrega las entradas de las paginas nuevas en `scripts/og-images.mjs` (ES/EN) y REGENERA los PNG (el script corre con `--no-save` para no tocar la lockfile; ver la regla de mantenimiento en `PENDIENTES_AGENTE.md`). `Seo.astro`: titulo, descripcion y ogImage por pagina/idioma; `og:type` website.
- **Sitemap/robots:** las rutas nuevas entran solas al sitemap; verifica que aparezcan y que no queden fuera por error.

## Datos que el dueno debe pegar / decidir en la sesion

- OK al borrador de copy de Sobre mi (ES y EN).
- La foto para Sobre mi (o confirmar que va sin foto por ahora).
- Nombre exacto y detalle final de la Ingenieria si difiere de "Ingenieria en Desarrollo de Software".
- Que entradas van en el nav principal vs. footer (para no saturar el header).
- Si en la home quiere un teaser/enlace a alguna de las dos paginas nuevas.
- Alcance de la seccion enfoque/intereses de Sobre mi (ciberseguridad + hardware/maker). Purificador NO entra como project card (decision del dueno 2026-07-20); a lo sumo se menciona como proyecto escolar en la narrativa.

## Al cerrar la ronda

`check` + `build` + `preview` en verde (o `podman compose up --build`), e2e rapido del flujo nuevo (ambas paginas en ES y EN, toggle de idioma salta al par correcto, tema claro/oscuro, sin JS, teclado, reduced motion, responsive a 360px), OG regeneradas y verificadas, reglas duras por grep, y actualizar: `PENDIENTES_AGENTE.md` (marcar las paginas hechas), el doc del area si cambia (04/05), tracker nuevo en `docs/rondas/` y este archivo (marcar ejecutado). Merge de la rama de trabajo a `develop` y push; el merge a `master` lo decide el dueno.
