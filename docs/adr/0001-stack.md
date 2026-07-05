# 0001 · Astro 5 + Tailwind 4 como stack

- **Fecha:** 2026-07-05
- **Estado:** Aceptada (reevaluada el 2026-07-05 contra Next.js y SvelteKit, reafirmada). Revisable: cualquier ADR posterior puede reemplazarla.

## Contexto

El portfolio es contenido estático (no una aplicación) que debe desplegarse en GitHub Pages, ser bilingüe, tematizable y alcanzar Lighthouse 90+. El sitio actual usa Astro 4 + Tailwind 3 con estilos inline y sin i18n ni tema. Ver doc 03 para el análisis completo.

El dueño pidió no fijar el stack por defecto y cambiarlo si otro es mejor. Se reevaluó explícitamente frente a Next.js 15 y SvelteKit (ver Alternativas). También surgió la duda de si Astro causa los FPS bajos del sitio actual: no. El sitio actual ya es Astro; los FPS bajos vienen de la capa decorativa (4 orbes en bucle infinito + canvas de partículas con `requestAnimationFrame` + grid), no del framework. Astro envía casi cero JS y no puede causar bajos FPS por sí mismo. El rediseño elimina esa capa (diagnóstico H1/H3), así que la fluidez mejora radicalmente en el mismo Astro; cambiar de framework no arreglaría los FPS.

## Decisión

Reescribir sobre **Astro 5** (zero JS por defecto, i18n routing nativo, content collections tipadas) con **Tailwind CSS 4** vía `@tailwindcss/vite` (tokens CSS-first con `@theme`, sin config JS), TypeScript estricto y fuentes self-hosted.

## Alternativas consideradas

- **Next.js 15 con `output: export`** · el runtime de React penaliza el presupuesto de JS de un sitio sin interactividad real, no trae i18n routing en modo export (habría que rehacerlo a mano) y hace más difícil Lighthouse 95+ y el deploy a Pages. El skill Next.js ya queda acreditado por el sitio público de ACP Suite. Motivo legítimo para elegirlo igual: querer que el repo del portafolio sea vitrina directa de React/Next (decisión de producto, no técnica); el dueño optó por el fit técnico.
- **SvelteKit (adaptador estático)** · muy buen rendimiento, pero i18n con rutas requiere librería externa (sin ventaja sobre Astro), está fuera del stack del dueño (Go/Flutter/React/Next) y agrega curva de aprendizaje sin upside claro aquí.
- **Quedarse en Astro 4 y solo rediseñar UI** · se pagaría el rediseño sin llevarse i18n nativo maduro, content layer ni tokens CSS de Tailwind 4.

## Consecuencias

- Se gana: sitio ligero, i18n y tema de primera clase, contenido tipado con validación en build.
- Se paga: migración de major (4 → 5) y cambio de integración de Tailwind (se abandona `@astrojs/tailwind`, deprecada).
- Queda obligado: cero estilos inline (todo por tokens); toda ruta interna vía `import.meta.env.BASE_URL` (la base es raíz con el dominio propio, ADR 0007, pero se mantiene BASE_URL por portabilidad).
