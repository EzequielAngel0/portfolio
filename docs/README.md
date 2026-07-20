# Documentación del portfolio

Fuente de verdad del proyecto. **Lee y sigue la documentación; no re-decidas lo ya decidido.** Si algo parece mejorable, propón un ADR nuevo (no cambies en silencio). El contenido personal (copy, CV, LinkedIn) vive en `perfil-mejorado/` (ignorada en git, ver abajo); el build nunca lee de ahí.

Estado actual (2026-07-20): portfolio en producción en `https://portfolio.angelezequiel.dev`, bilingüe ES/EN, tema claro/oscuro, dirección visual "blueprint" sobre papel y tinta azul. F0-F7 y las rondas post-lanzamiento, rediseño blueprint (ADR 0011), mudanza a subdominio (ADR 0012) y proyectos DocuAgent/SoloKey estan hechas y en `develop`.

## Arquitectura de esta carpeta

La documentación se divide en cinco tipos, cada uno con su ciclo de vida. Saber a qué tipo pertenece un archivo dice cuándo se lee y cuándo se toca.

| Tipo | Dónde | Qué es | Ciclo de vida |
| --- | --- | --- | --- |
| **Estado vivo y backlog** | [`PENDIENTES_AGENTE.md`](PENDIENTES_AGENTE.md) · [`PENDIENTES_DUENO.md`](PENDIENTES_DUENO.md) | Estado del proyecto (compacto) y backlog abierto, partido por quién ejecuta (agente vs. dueño). Primera parada de un chat nuevo. | Se poda al cerrar cada ronda: lo hecho se compacta a una línea con puntero a `rondas/`. |
| **Canon de diseño** | [`canon/`](canon/) (`01`..`08`) | Decisiones de fondo tomadas antes de codificar (stack, arquitectura, diseño, SEO, proceso). | Se releen antes de cada fase; solo cambian si cambia la decisión. |
| **Decisiones (ADR)** | [`adr/`](adr/) | Una decisión estructural por archivo. No se editan al cambiar de opinión: se sustituyen con uno nuevo. | Inmutables. Índice en [`adr/README.md`](adr/README.md). |
| **Registros de ronda** | [`rondas/`](rondas/) | Bitácora fechada de lo ejecutado en cada tanda (qué, decisiones, verificación). | Histórico, no se reescribe. |
| **Prompts de handoff** | [`prompts/`](prompts/) | La instrucción autocontenida que un chat nuevo lee para ejecutar una ronda. Fuente de verdad del "qué hacer" de esa ronda. | Uno por ronda; se marca ejecutado al cerrar. |

Regla de oro (doc 08): cuando una ronda se prepara para otra sesión, su instrucción completa se guarda en `prompts/` y al dueño solo se le pasa un prompt corto que apunta a ese archivo, nunca el contenido completo.

## Empieza aquí

1. [`PENDIENTES_AGENTE.md`](PENDIENTES_AGENTE.md): estado del proyecto y backlog del agente. Continúa en lo abierto sin rehacer lo hecho.
2. [`PENDIENTES_DUENO.md`](PENDIENTES_DUENO.md): lo que solo puede hacer el dueño (merges, publicar, decisiones).
3. La primera vez, leer el canon 01 a 08 en orden y luego [`adr/`](adr/). El arranque de un chat nuevo lo cubre además `CLAUDE.md` (auto-cargado).

## Canon de diseño (01 a 08)

Decisiones de fondo tomadas antes de codificar; se leen en orden. Viven juntos en [`canon/`](canon/) para no ensuciar la raíz de `docs/`, y conservan el número: son un set fijo y cerrado que se lee de corrido y que todo el proyecto cita como "doc NN". Agrupados por tema: **contexto y contenido** (01-02), **decisiones técnicas** (03-04), **experiencia y calidad** (05-06) y **proceso** (07-08).

| Doc | Qué contiene |
| --- | --- |
| [01-diagnostico.md](canon/01-diagnostico.md) | Auditoría del sitio anterior: qué había, qué fallaba, qué se conserva |
| [02-contenido-y-reglas.md](canon/02-contenido-y-reglas.md) | Inventario de contenido, mapeo `perfil-mejorado/` a sitio, reglas duras de redacción (sin em dash, sin emojis, sin glassmorphism, precisión técnica, solo métricas autorizadas) |
| [03-stack.md](canon/03-stack.md) | Decisión de stack. Nota: el stack vigente es Astro 7 + Node 24 (ADR 0008 actualiza este doc) |
| [04-arquitectura.md](canon/04-arquitectura.md) | Estructura del proyecto, rutas, i18n ES/EN, tema claro/oscuro, modelo de datos y esquemas de contenido |
| [05-diseno.md](canon/05-diseno.md) | Dirección visual, tokens (color, tipografía), wireframes, motion. Vigente: papel y tinta azul + capa blueprint (ADR 0005/0010/0011) |
| [06-seo-rendimiento-a11y.md](canon/06-seo-rendimiento-a11y.md) | SEO técnico (OG, JSON-LD, hreflang), presupuesto de rendimiento, accesibilidad AA |
| [07-plan-implementacion.md](canon/07-plan-implementacion.md) | Fases de implementación, qué skill usar en cada fase, definition of done, riesgos |
| [08-convenciones-y-proceso.md](canon/08-convenciones-y-proceso.md) | Cómo trabajamos: ramas, commits, backlog por ejecutor, poda de pendientes, ADR, handoff, verificación |

## Decisiones (adr/)

Catálogo completo con estado en [`adr/README.md`](adr/README.md). Vigentes 0001 a 0012; los últimos: 0009 (motion ampliado), 0010 (paleta azul tinta), 0011 (motivos blueprint sobre papel y tinta), 0012 (portfolio a `portfolio.angelezequiel.dev`, raíz para el hub del ecosistema).

## Registros de ronda (rondas/)

Bitácora fechada por tanda. De más reciente a más antigua: páginas Educación + Sobre mí (`2026-07-20`), perfil ciberseguridad + reorganización de docs (`2026-07-20`), proyectos DocuAgent + SoloKey (`2026-07-18`), rediseño blueprint (`2026-07-15`), mejoras post-lanzamiento (`2026-07-06`), beacon/D7 (`2026-07-06`) y las fases F0 a F6 (`2026-07-06_f0-f1` .. `_f6`).

## Prompts de handoff (prompts/)

| Archivo | Ronda | Estado |
| --- | --- | --- |
| [prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md](prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md) | Páginas Educación + Sobre mí | Ejecutada 2026-07-20 |
| [prompts/PROMPT_MEJORAS_POST_LANZAMIENTO.md](prompts/PROMPT_MEJORAS_POST_LANZAMIENTO.md) | Mejoras post-lanzamiento (T1-T11) | Ejecutada 2026-07-06 |
| [prompts/PROMPT_REDISENO_VISUAL.md](prompts/PROMPT_REDISENO_VISUAL.md) | Rediseño visual (blueprint, ADR 0011) | Ejecutada 2026-07-15/16 |
| [prompts/DIRECCION_STITCH.md](prompts/DIRECCION_STITCH.md) | Material fuente del rediseño (captura de Stitch) | Referencia |

El arranque genérico de un chat nuevo lo dan `CLAUDE.md` (auto-cargado) y `PENDIENTES_AGENTE.md` (estado + backlog); `prompts/` guarda solo los prompts de una ronda concreta.

## Cómo usar esta documentación

1. Un chat nuevo lee `PENDIENTES_AGENTE.md`, ve el estado y continúa en lo pendiente sin rehacer lo hecho.
2. Antes de implementar, releer el doc del área (03/04 para código, 05 para UI, 06 para el pase final) y los ADR relacionados.
3. Si una decisión cambia durante la implementación, actualizar el doc en el mismo commit que el código. La documentación desactualizada es peor que no tener documentación.
4. Al cerrar una ronda: actualizar `PENDIENTES_AGENTE.md` (estado + backlog, podando lo ya hecho), el doc del área, un registro nuevo en `rondas/` y (si la ronda tenía prompt) marcarlo ejecutado.

## Carpetas ignoradas (material personal, fuera de git)

Están en `.gitignore`: **no se versionan y no existirán en CI ni en otros clones**. Son la única copia local; respaldarlas fuera del repo.

- **`perfil-mejorado/`**: material redactado (case study ACP, CV, LinkedIn, README de perfil de GitHub) con datos personales y de cliente. El copy final ES/EN se transcribe a `src/content/` aplicando las reglas duras.
- **`plantilla-proyecto/`** (en `C:\Proyectos\plantilla-proyecto`): kit de arranque de proyectos reutilizable. No es de este repo; de él salieron las convenciones del doc 08. Ahí vive el checklist de cierre de proyecto (qué actualizar en portfolio, LinkedIn, GitHub y CV al terminar un proyecto).
- Prompts personales de exploración en la raíz (`PROMPTS_DISENO.md`, `PROMPTS_CIBERSEGURIDAD.md`): material de trabajo del dueño, ignorado.

## Objetivo del rediseño (resumen)

Que un reclutador técnico entienda en 30 segundos quién es Angel y qué ha llevado a producción, verificable con un clic. Pieza central: el case study de ACP. Sitio estático en GitHub Pages con subdominio propio `portfolio.angelezequiel.dev` (ADR 0012), bilingüe ES/EN, tema claro/oscuro, animado con GSAP (mejora progresiva), Lighthouse 90+, accesible AA. Sin glassmorphism y sin emojis: dirección papel y tinta con capa blueprint (docs 05, ADR 0011).
