# Pendientes del AGENTE · lo que Claude puede ejecutar

Código, contenido y config que ejecuta el asistente. Contraparte: [PENDIENTES_DUENO.md](PENDIENTES_DUENO.md). Actualizado: 2026-07-05.

Marcadores: `[ ]` pendiente · `[wip]` en curso · `[hecho]` · `[bloqueado]` (espera algo del dueño). El detalle de cada fase está en [07-plan-implementacion.md](07-plan-implementacion.md); esto es el checklist vivo.

## Estado: documentación (previo al desarrollo)

- [hecho] docs 01-08 redactados
- [hecho] ADR 0001-0004
- [hecho] `.gitignore`: ignora `perfil-mejorado/` y `plantilla-proyecto/`
- [hecho] rama `develop` creada (integración; ver doc 08)

## Plan por fases (resumen; detalle en doc 07)

| Fase | Entregable | Verificación | Estado |
| --- | --- | --- | --- |
| F0 | Limpieza (borrar CMS y basura de raíz) sobre `develop` | repo limpio | `[ ]` listo para empezar (D1 hecho) |
| F1 | Bootstrap Astro 5 + Tailwind 4 + tokens + fuentes + GSAP + Base.astro + CI en develop | `build` + `preview` sirven `/` y `/en/` tematizables; CI de develop en verde | `[ ]` |
| F2 | Contenido: esquemas Zod, case study ES/EN, SoloKey, skills, certs, i18n | pase de reglas duras en verde (grep) | `[ ]` |
| F3 | Home: componentes ui/ y secciones en orden | home ES/EN responsive, ambos temas | `[ ]` |
| F4 | Case study + SVG del diagrama tematizado | páginas `/acp-suite` ES/EN | `[ ]` |
| F5 | SEO: Seo.astro, OG, JSON-LD, sitemap, robots, 404 | JSON-LD y OG validados | `[ ]` |
| F6 | Pulido + QA (a11y, Lighthouse, animaciones, code review) | gates del doc 06 en verde | `[ ]` |
| F7 | Merge de `develop` a `master` + README nuevo | deploy verificado en la URL real | `[bloqueado]` merge a master lo hace el dueño |

## Reglas continuas

- Cada ítem en rama corta desde `develop`; a `master` solo el dueño.
- Pase de reglas duras (doc 02) antes de cerrar F2 y de nuevo en F6: grep de "microservicio", "Redis", "Supabase", "OAuth2", em dash y emojis sobre `src/`.
- Al cerrar cada fase: actualizar este doc + el doc del área + tracker de ronda si aplica.
