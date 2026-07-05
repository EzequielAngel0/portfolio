# 0002 · i18n ES/EN con rutas y detección client-side

- **Fecha:** 2026-07-05
- **Estado:** Aceptada

## Contexto

El brief exige sitio bilingüe ES/EN con toggle e idioma inicial según el navegador. GitHub Pages sirve archivos estáticos: no puede redirigir ni negociar idioma en el servidor. Ver docs 02 y 04.

## Decisión

i18n nativo de Astro con `defaultLocale: 'es'` y `prefixDefaultLocale: false` (ES sin prefijo, EN bajo `/en/`). El emparejamiento entre idiomas se hace por `slug` y el build falla si un slug existe en un idioma y no en el otro. La detección de navegador es un script inline mínimo que solo corre en el home ES, solo si no hay preferencia guardada, con guarda anti ping-pong.

## Alternativas consideradas

- **Redirección en servidor por `Accept-Language`** · imposible en GitHub Pages (estático).
- **Un solo idioma con toggle que intercambia strings en cliente** · rompe SEO por idioma (una sola URL), impide hreflang correcto y JSON-LD por locale.

## Consecuencias

- Se gana: URLs reales por idioma (SEO, hreflang, compartibles), sin backend.
- Se paga: detección de idioma imperfecta (client-side, un frame posible antes del redirect en la primera visita).
- Queda obligado: pares `hreflang` (`es`, `en`, `x-default` → ES), `lang` correcto por página, y microtextos de UI en diccionario tipado `src/i18n/ui.ts`.
