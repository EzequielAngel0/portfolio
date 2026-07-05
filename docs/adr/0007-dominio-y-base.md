# 0007 · Dominio propio angelezequiel.dev y base en raíz

- **Fecha:** 2026-07-05
- **Estado:** Aceptada

## Contexto

El sitio se sirve en GitHub Pages desde un repo de proyecto (`EzequielAngel0/portfolio`), lo que forzaba `base: '/portfolio'` y prefijar todas las rutas. El dueño tiene el dominio `angelezequiel.dev` en Cloudflare y quiere usarlo, con el portfolio en la raíz (entrar a `angelezequiel.dev` y ver el sitio, sin `/portfolio`). Resuelve el TBD T1.

## Decisión

Servir el sitio en **`https://angelezequiel.dev`** como dominio propio de GitHub Pages, con **`base: '/'`** (raíz). En `astro.config.mjs`: `site: 'https://angelezequiel.dev'` y sin `base` (o `base: '/'`). Se agrega `public/CNAME` con `angelezequiel.dev`. DNS en Cloudflare apuntando a GitHub Pages.

## Alternativas consideradas

- **Seguir en `ezequielangel0.github.io/portfolio`** · gratis y cero configuración, pero URL menos profesional y el prefijo `/portfolio` complica todas las rutas.
- **Subdominio (`www` o `portfolio.angelezequiel.dev`)** · válido, pero el dueño quiere el apex limpio.

## Consecuencias

- Se gana: URL propia y profesional, base raíz, código más simple (sin prefijo constante).
- Se paga: configurar DNS en Cloudflare + custom domain en GitHub (pendiente del dueño, D9); dependencia del dominio (si se quita, revertir a `/portfolio`).
- Queda obligado: `public/CNAME`, `site` con el dominio nuevo, canonical/OG/sitemap con `angelezequiel.dev`. Se mantiene el uso de `import.meta.env.BASE_URL` para las rutas internas (ahora devuelve `/`), de modo que el sitio siga siendo portable si la base cambiara.
- **DNS (Cloudflare):** apex `angelezequiel.dev` con registros A/AAAA a las IPs de GitHub Pages (o CNAME flattening a `ezequielangel0.github.io`) y `www` como CNAME a `ezequielangel0.github.io`. Recomendado: registros en modo "DNS only" (nube gris) para que GitHub gestione el certificado HTTPS sin bucles de SSL; activar "Enforce HTTPS" en GitHub Pages. Si se prefiere proxied (nube naranja), usar SSL/TLS "Full".
