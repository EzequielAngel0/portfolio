# 0003 · GSAP como motor de animación

- **Fecha:** 2026-07-05
- **Estado:** Aceptada

## Contexto

El rediseño quiere motion con carácter (entrada del hero, revelados por scroll, trazado del diagrama) pero sin caer en el glassmorphism con orbes y partículas del sitio actual, y sin comprometer rendimiento ni accesibilidad. Es un requisito explícito del dueño usar GSAP. Ver docs 03 y 05.

## Decisión

Usar **GSAP 3** (core + ScrollTrigger; SplitText y DrawSVG disponibles, gratuitos desde GSAP 3.13) como motor de lo orquestado, instalado por npm y empaquetado en el build. CSS transitions quedan para los estados interactivos (hover, focus, active, toggles) por ser interrumpibles. GSAP entra como mejora progresiva.

## Alternativas consideradas

- **Solo CSS / Web Animations API** · suficiente para micro-interacciones, pero incómodo para timelines escalonadas y scroll-driven; ScrollTrigger no tiene equivalente cómodo nativo.
- **Motion One / librería más ligera** · menor peso, pero el dueño pidió GSAP y ScrollTrigger cubre mejor el revelado por scroll y el trazado SVG.
- **GSAP por CDN** · descartado: rompe el objetivo de cero requests externos; se empaqueta por npm.

## Consecuencias

- Se gana: timelines y scroll-driven con control fino, un solo motor coherente.
- Se paga: ~40 KB gzip (core + ScrollTrigger) que dominan el presupuesto de JS; el techo del doc 06 sube a 60 KB.
- Queda obligado: contenido visible sin JS (nunca `opacity:0` esperando a GSAP); `gsap.matchMedia()` para `prefers-reduced-motion` (estado final instantáneo); un `context` por página con cleanup; carga `defer` para no bloquear el LCP.
