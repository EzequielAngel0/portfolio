# Estado y pendientes del AGENTE

Doc vivo del asistente: el estado del proyecto (compacto) y el backlog abierto de lo que ejecuta Claude. Contraparte del dueño: [PENDIENTES_DUENO.md](PENDIENTES_DUENO.md). Actualizado: 2026-07-20.

Marcadores: `[ ]` pendiente · `[wip]` en curso · `[hecho]` · `[bloqueado]` (espera algo del dueño). Este archivo se mantiene **compacto**: el detalle de cada ronda vive en [`rondas/`](rondas/), no aquí (ver la regla de poda abajo).

## Estado actual

Portfolio en producción en `https://portfolio.angelezequiel.dev`, bilingüe ES/EN, tema claro/oscuro, dirección papel y tinta azul con capa blueprint. `develop` va adelante de `master` (el merge a `master`, que despliega, lo hace el dueño). Stack vigente: Astro 7 + Node 24 + Tailwind 4 + GSAP (ADR 0008); lockfile multiplataforma (regenerar en Linux al tocar deps nativas). Última ronda: 2026-07-20 (perfil ciberseguridad + reorganización de docs).

**Abierto del agente ahora mismo:** la página de Experiencia profesional (rol en ACP) y los chores opcionales. Educación y Sobre mí quedaron hechas el 2026-07-20 (en `develop`, pendientes de merge a `master`). Todo lo demás está hecho.

## Hecho (resumen; detalle en docs/rondas/)

| Hito | Fecha | Detalle |
| --- | --- | --- |
| F0-F7: lanzamiento (limpieza, bootstrap, contenido, home, case study, SEO, QA, merge a `master`) | 2026-07-06 | [rondas/2026-07-06_f0-f1.md](rondas/2026-07-06_f0-f1.md) .. [`_f6.md`](rondas/2026-07-06_f6.md), beacon [`_d7-beacon.md`](rondas/2026-07-06_d7-beacon.md) |
| Mejoras post-lanzamiento (T1-T11): certificaciones bilingües, renombrado a "ACP" (`/acp/`), CV bilingüe, motion ampliado (ADR 0009), paleta azul tinta (ADR 0010) | 2026-07-06 | [rondas/2026-07-06_mejoras-post-lanzamiento.md](rondas/2026-07-06_mejoras-post-lanzamiento.md) |
| Rediseño visual "blueprint" (ADR 0011): capa de plano, display condensada en el hero, riel lateral, marquee, sobre papel y tinta | 2026-07-15/16 | [rondas/2026-07-15_rediseno-blueprint.md](rondas/2026-07-15_rediseno-blueprint.md) |
| Mudanza a `portfolio.angelezequiel.dev` (ADR 0012), desplegada y verificada | 2026-07-16 | (en el tracker de arriba; D11 del dueño cerrado) |
| DocuAgent + SoloKey v1.1.0: DocuAgent a proyectos (demo en vivo, campo `demoUrl`), SoloKey multiplataforma; CV regenerado | 2026-07-18 | [rondas/2026-07-18_proyectos-docuagent-solokey.md](rondas/2026-07-18_proyectos-docuagent-solokey.md) |
| Perfil ciberseguridad + reorganización de docs (README de GitHub, "Acerca de" de LinkedIn; carpeta `prompts/`, índice con taxonomía) | 2026-07-20 | [rondas/2026-07-20_perfil-ciberseguridad-y-plan-paginas.md](rondas/2026-07-20_perfil-ciberseguridad-y-plan-paginas.md) |
| Páginas Educación (`/educacion/` + `/en/education/`) y Sobre mí (`/sobre-mi/` + `/en/about/`): bilingües, OG propia, foto self-hosted, enlace en el home; prompt ejecutado | 2026-07-20 | [rondas/2026-07-20_paginas-educacion-sobre-mi.md](rondas/2026-07-20_paginas-educacion-sobre-mi.md) |

## Pendientes abiertos

### Páginas nuevas del portfolio (acordadas 2026-07-20)

Una página de contenido no llega al umbral de ADR (doc 08): rama `feat/` desde `develop`, con OG regenerada y este doc al día.

- [hecho] **Educación** y **Sobre mí** (bilingües), 2026-07-20: ver la fila de "Hecho" y [rondas/2026-07-20_paginas-educacion-sobre-mi.md](rondas/2026-07-20_paginas-educacion-sobre-mi.md). Prompt [prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md](prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md) ejecutado.
- [ ] **Experiencia profesional (rol en ACP)**: timeline tipo LinkedIn orientado a rol y logros; complementa (no repite) el case study de `/acp/`. Segundo lote, sin prompt aún.

### Chores opcionales (del code review de F6, no bloquean)

- [ ] Refactors de reutilización diferidos: `KeyNumbers.astro`, `ExternalLink.astro`, utilidad `eyebrow`, helper `getCaseStudy`, tokens/fuentes compartidos en `scripts/`, cache de geometría del carrusel. Detalle en [rondas/2026-07-06_f6.md](rondas/2026-07-06_f6.md).

## Reglas de trabajo continuas

- Cada cambio en rama corta desde `develop`; a `master` solo el dueño.
- Pase de reglas duras (doc 02) por grep antes de cerrar una ronda: "microservicio", "Redis", "Supabase", "OAuth2", em dash y emojis sobre `src/`.
- **Poda de pendientes (regla de proceso, doc 08):** al cerrar cada ronda, compactar en este doc lo que quedó `[hecho]` a UNA línea con puntero a su tracker de `rondas/`, y dejar el backlog vivo solo con lo abierto. El detalle histórico vive en `rondas/`, no en este archivo. Un backlog lleno de cosas hechas es ruido.
- Al cerrar una ronda: actualizar este doc (estado + backlog, aplicando la poda), el doc del área que cambie, un registro nuevo en `rondas/`, y marcar el prompt de la ronda como ejecutado (si tenía).

## Reglas de mantenimiento (piezas acopladas)

- Si cambia el copy de `ui.ts` (hero) o el frontmatter del case study, regenerar las imágenes OG con `scripts/og-images.mjs` (espejan ese copy a mano). Certificaciones, Educación y Sobre mí también tienen OG propia en ese script (su subtítulo se mantiene a mano ahí, no lee de `ui.ts`). Regenerar con `npm i --no-save satori @fontsource/archivo @fontsource/ibm-plex-mono && node scripts/og-images.mjs` (no toca la lockfile).
- **El CV vive en DOS idiomas y DOS formatos**: fuente HTML en `perfil-mejorado/CV_Angel_Barbosa.html` (EN) y `..._ES.html` (ES), servidos como `public/cv/Angel_Barbosa_CV.pdf` (EN) y `..._CV_ES.pdf` (ES). Al actualizar un idioma, actualizar el otro y REGENERAR ambos PDF (`scripts/cv-pdf.mjs`, Chrome headless con `preferCSSPageSize` + `printBackground`); verificar 1 página y los links internos (`/acp/`, `/en/acp/`).
- El catálogo de certificaciones (`src/data/certifications.json`) se cura contra el perfil público de Alura (`app.aluracursos.com/user/angelezequiel`): al terminar una formación nueva, agregarla con su URL de verificación (doc 02, regla 5: solo credenciales verificables).
