# Documentación del rediseño del portfolio

Este directorio documenta el rediseño completo del portfolio (stack, arquitectura, diseño y contenido) ANTES de escribir código. La fuente de verdad del contenido personal es la carpeta `perfil-mejorado/` (ignorada en git, ver nota abajo).

## Índice

| Doc | Qué contiene | Estado |
| --- | --- | --- |
| [01-diagnostico.md](01-diagnostico.md) | Auditoría del sitio actual: qué hay, qué falla, qué se conserva | Listo |
| [02-contenido-y-reglas.md](02-contenido-y-reglas.md) | Inventario de contenido, mapeo `perfil-mejorado/` a sitio, reglas duras de redacción (incluye no emojis, no glassmorphism) | Listo |
| [03-stack.md](03-stack.md) | Decisión de stack (Astro 5 + Tailwind 4 + GSAP) con alternativas y justificación | Listo |
| [04-arquitectura.md](04-arquitectura.md) | Estructura del proyecto, rutas, i18n ES/EN, tema claro/oscuro, modelo de datos | Listo |
| [05-diseno.md](05-diseno.md) | Dirección visual, tokens (color, tipografía), wireframes, motion con GSAP, anti-defaults | Listo |
| [06-seo-rendimiento-a11y.md](06-seo-rendimiento-a11y.md) | SEO técnico (OG, JSON-LD, hreflang), presupuesto de rendimiento con GSAP, accesibilidad AA | Listo |
| [07-plan-implementacion.md](07-plan-implementacion.md) | Fases de implementación, qué skill usar en cada fase, definition of done, riesgos | Listo |
| [08-convenciones-y-proceso.md](08-convenciones-y-proceso.md) | Cómo trabajamos: ramas, commits, backlog por ejecutor, ADR, verificación (rescatado de tu plantilla) | Listo |

## Registros y backlog

| Archivo | Qué contiene |
| --- | --- |
| [adr/](adr/) | Architecture Decision Records: stack (0001), i18n (0002), GSAP (0003), sin CMS (0004), dirección visual (0005), analítica (0006), dominio y base (0007) |
| [PENDIENTES_AGENTE.md](PENDIENTES_AGENTE.md) | Checklist vivo de lo que ejecuta el asistente (fases F0-F7) |
| [PENDIENTES_DUENO.md](PENDIENTES_DUENO.md) | Lo que solo puede hacer Angel: respaldos, decisiones, merges, publicar perfil |

## Cómo usar esta documentación

1. Leer en orden 01 → 07 la primera vez.
2. Antes de implementar una fase, releer el doc correspondiente (03/04 para código, 05 para UI, 06 para el pase final).
3. Si una decisión cambia durante la implementación, actualizar el doc en el mismo commit que el código. La documentación desactualizada es peor que no tener documentación.
4. Opcional pero recomendado: correr la skill `grill-me` contra el plan (07) antes de la fase 1 para detectar huecos.

## Carpetas ignoradas (material personal, fuera de git)

Dos carpetas están en `.gitignore`: **no se versionan y no existirán en CI ni en otros clones**. Son la única copia local, así que **respáldalas fuera del repo antes de empezar** (ver D1 en pendientes del dueño).

- **`perfil-mejorado/`**: material redactado (case study ACP, CV, LinkedIn, prompt del portfolio) con datos personales y de cliente. El build nunca lee de aquí; el copy final ES/EN se transcribe a `src/content/` (doc 04).
- **`plantilla-proyecto/`**: tu kit de arranque de proyectos reutilizable. No es de este repo; de él se rescataron las convenciones de trabajo del doc 08 y la estructura de ADR/pendientes.

## Objetivo del rediseño (resumen)

Que un reclutador técnico entienda en 30 segundos quién es Angel y qué ha llevado a producción, y que pueda verificar todo con un clic. Pieza central: el case study de ACP Suite. Sitio estático en GitHub Pages con dominio propio `angelezequiel.dev` (base en raíz), bilingüe ES/EN, tema claro/oscuro, animado con GSAP (mejora progresiva), Lighthouse 90+ (objetivo interno 95+), accesible AA. Sin glassmorphism y sin emojis: dirección "papel y tinta" (doc 05).
