# Pendientes del AGENTE · lo que Claude puede ejecutar

Código, contenido y config que ejecuta el asistente. Contraparte: [PENDIENTES_DUENO.md](PENDIENTES_DUENO.md). Actualizado: 2026-07-06.

Marcadores: `[ ]` pendiente · `[wip]` en curso · `[hecho]` · `[bloqueado]` (espera algo del dueño). El detalle de cada fase está en [07-plan-implementacion.md](07-plan-implementacion.md); esto es el checklist vivo.

## Estado: documentación (previo al desarrollo)

- [hecho] docs 01-08 redactados
- [hecho] ADR 0001-0008
- [hecho] `.gitignore`: ignora `perfil-mejorado/` y `plantilla-proyecto/`
- [hecho] rama `develop` creada (integración; ver doc 08)

## Cambios de stack respecto al plan original (ADR 0008)

- **Astro 7.0.6** (no 5) y **Node 24 LTS** (no 22): Astro 5 quedó sin parche para 5 advisories `high`; el árbol final da 0 vulnerabilidades. Node local subido a 24 (autorizado).
- **Verificación en contenedor Podman** además de la nativa (`Containerfile` + `compose.yaml`).
- `package-lock.json` es multiplataforma (generada en Linux); al tocar deps con binarios nativos, regenerarla en el contenedor.

## Plan por fases (resumen; detalle en doc 07)

| Fase | Entregable | Verificación | Estado |
| --- | --- | --- | --- |
| F0 | Limpieza (borrar CMS y basura de raíz) sobre `develop` | repo limpio | `[hecho]` 2026-07-06 |
| F1 | Bootstrap Astro 7 + Node 24 + Tailwind 4 + tokens + fuentes + GSAP + Base.astro + CI + Podman | `build` + `preview` sirven `/` y `/en/` tematizables; contenedor sirve igual | `[hecho]` 2026-07-06 (CI se valida al primer push) |
| F2 | Contenido: esquemas Zod, case study ES/EN, SoloKey, skills, certs, i18n | pase de reglas duras en verde (grep) | `[hecho]` 2026-07-06 |
| F3 | Home: componentes ui/ y secciones en orden | home ES/EN responsive, ambos temas | `[hecho]` 2026-07-06 |
| F4 | Case study + SVG del diagrama tematizado | páginas `/acp-suite` ES/EN | `[ ]` siguiente |
| F5 | SEO: Seo.astro, OG, JSON-LD, sitemap, robots, 404 | JSON-LD y OG validados | `[ ]` |
| F6 | Pulido + QA (a11y, Lighthouse, animaciones, code review) | gates del doc 06 en verde | `[ ]` |
| F7 | Merge de `develop` a `master` + README nuevo | deploy verificado en la URL real | `[bloqueado]` merge a master lo hace el dueño |

## Reglas continuas

- Cada ítem en rama corta desde `develop`; a `master` solo el dueño.
- Pase de reglas duras (doc 02) antes de cerrar F2 y de nuevo en F6: grep de "microservicio", "Redis", "Supabase", "OAuth2", em dash y emojis sobre `src/`.
- Al cerrar cada fase: actualizar este doc + el doc del área + tracker de ronda si aplica.
