# 0012 · El portfolio se mueve a portfolio.angelezequiel.dev (la raiz queda para el hub)

- **Fecha:** 2026-07-16
- **Estado:** Aceptada (decision del dueno, 2026-07-16). **Actualiza** [0007](0007-dominio-y-base.md): mismo dominio y misma base en raiz, cambia el hostname.
- **Relacion:** materializa la decision del ecosistema de tres repos (2026-07-15): la landing/hub tomara la RAIZ `angelezequiel.dev` (y `www`), y el portfolio vive en un subdominio propio.

## Contexto

El ADR 0007 puso el portfolio en el apex `angelezequiel.dev` porque era el unico sitio del dominio. El 2026-07-15 el dueno decidio un ecosistema de tres repos (portfolio, landing/hub, admin) donde el hub central toma la raiz y enlaza al resto. Instruccion del dueno (2026-07-16): el portfolio queda en **`portfolio.angelezequiel.dev`**; raiz y `www` se reservan al hub.

## Decision

Servir el sitio en **`https://portfolio.angelezequiel.dev`** (GitHub Pages, custom domain por subdominio), conservando `base: '/'` y `trailingSlash: 'always'`. La base NO cambia: las rutas internas siguen saliendo de `import.meta.env.BASE_URL`.

## Piezas tocadas (repo)

- `public/CNAME`: `portfolio.angelezequiel.dev`.
- `astro.config.mjs`: `site` nuevo + las 2 URLs de certificaciones del `serialize` del sitemap.
- `public/robots.txt`: URL del sitemap.
- `src/layouts/Base.astro`: dominio visible en la tira del footer.
- `scripts/og-images.mjs`: dominio del pie de las OG + 6 OG regeneradas (canonical/OG/JSON-LD derivan de `site`, se actualizan solos en build).

## Pasos del dueno (orden para minimo downtime)

1. **Cloudflare DNS:** crear `CNAME portfolio -> ezequielangel0.github.io` (recomendado "DNS only"/nube gris hasta que el certificado emita; ADR 0007 explica el porque).
2. Avisar al agente: merge de esta rama a `master` -> el deploy publica el `CNAME` nuevo y Pages cambia el custom domain.
3. **GitHub Pages:** verificar que el custom domain quedo en `portfolio.angelezequiel.dev` (Settings -> Pages), esperar el certificado y activar **Enforce HTTPS**.
4. **Cloudflare Redirect Rule (puente hasta que exista el hub):** `angelezequiel.dev/*` (y `www`) -> `https://portfolio.angelezequiel.dev/$1` (301). Mantiene vivos los links ya compartidos (LinkedIn, CVs impresos) y la raiz no queda muerta; se retira cuando el hub tome la raiz.
5. **Cloudflare Web Analytics:** actualizar el hostname del sitio del beacon (o crear sitio nuevo y actualizar el token en `Base.astro` si cambia).

## Consecuencias

- Se gana: la raiz queda libre para el hub del ecosistema; cada pieza con su hostname.
- Se paga: los links absolutos ya publicados apuntan a la raiz; el redirect 301 del paso 4 los cubre. SEO: el sitio re-indexa bajo el hostname nuevo (301 preserva la mayor parte).
- **Pendiente menor:** los 2 CV en PDF (`public/cv/`) embeben `https://angelezequiel.dev/` y `/en/acp/`; funcionan via redirect, pero al proximo retoque del CV se regeneran con el subdominio (fuentes en `perfil-mejorado/`, proceso en `PENDIENTES_AGENTE.md`).
- El ADR 0007 sigue siendo la referencia de la mecanica DNS/Pages; este solo cambia el hostname y el reparto raiz/subdominio.
