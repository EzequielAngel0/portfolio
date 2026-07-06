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
| F4 | Case study + SVG del diagrama tematizado | páginas `/acp-suite` ES/EN | `[hecho]` 2026-07-06 |
| F5 | SEO: Seo.astro, OG, JSON-LD, sitemap, robots, 404, favicon | JSON-LD y OG en dist verificados (validadores externos en F6) | `[hecho]` 2026-07-06 · beacon + CSP integrados 2026-07-06 (D7 resuelto) |
| F6 | Pulido + QA (a11y, Lighthouse, animaciones, code review) | gates del doc 06 en verde | `[hecho]` 2026-07-06 (pase NVDA y validadores externos: dueño, guiones en el tracker) |
| F7 | Merge de `develop` a `master` + README nuevo | deploy verificado en la URL real | `[bloqueado]` merge a master lo hace el dueño |

## Reglas continuas

- Cada ítem en rama corta desde `develop`; a `master` solo el dueño.
- Pase de reglas duras (doc 02) antes de cerrar F2 y de nuevo en F6: grep de "microservicio", "Redis", "Supabase", "OAuth2", em dash y emojis sobre `src/`.
- Al cerrar cada fase: actualizar este doc + el doc del área + tracker de ronda si aplica.

## Chores opcionales post-lanzamiento (del code review de F6, no bloquean)

- [ ] Refactors de reutilización diferidos: `KeyNumbers.astro`, `ExternalLink.astro`, utilidad `eyebrow`, helper `getCaseStudy`, tokens/fuentes compartidos en `scripts/`, cache de geometría del carrusel. Detalle en `docs/rondas/2026-07-06_f6.md`.
- [ ] Regla de mantenimiento: si cambia el copy de `ui.ts` (hero) o el frontmatter del case study, regenerar las imágenes OG con `scripts/og-images.mjs` (espejan ese copy a mano).
