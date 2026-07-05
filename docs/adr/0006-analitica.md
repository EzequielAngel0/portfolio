# 0006 · Analítica de visitas sin cookies

- **Fecha:** 2026-07-05
- **Estado:** Aceptada

## Contexto

El dueño quiere medir visitas del portafolio, pero el sitio prioriza privacidad, rendimiento y cero requests externos (doc 06). Google Analytics queda descartado por cookies, peso, dependencia de consentimiento y perfil de privacidad. GitHub Pages no da métricas de tráfico útiles por sí solo.

## Decisión

Integrar una **analítica sin cookies y sin datos personales** (privacy-first), como única pieza de terceros del sitio. Herramienta: **Cloudflare Web Analytics** (gratis, sin cookies, sin banner de consentimiento), elegida porque el dominio ya vive en Cloudflare (ADR 0007), lo que la integra de forma natural. Carga async/defer, no bloquea el render y el sitio funciona igual sin ella.

## Alternativas consideradas

- **Sin analítica** · cero dependencias, pero el dueño quiere ver tráfico.
- **Google Analytics / GA4** · cookies, peso, banner de consentimiento, perfil de privacidad pobre. Descartada.
- **Analítica self-hosted (Umami/Plausible propio)** · control total, pero exige servidor que operar; no vale la pena para un portafolio estático.

## Consecuencias

- Se gana: métricas básicas de tráfico sin comprometer privacidad ni exigir banner de cookies.
- Se paga: rompe el objetivo de "cero requests externos" con exactamente 1 beacon (excepción documentada en doc 06); suma una entrada en la CSP; requiere que el dueño cree una cuenta.
- Queda obligado: la analítica es no bloqueante y no esencial (mejora progresiva); si la herramienta no carga, el sitio no se afecta. No se recogen datos personales.
