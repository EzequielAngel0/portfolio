# Pendientes del DUEÑO · solo Angel

Cosas que el asistente no puede hacer: respaldos externos, decisiones, publicar en cuentas propias, merges a producción. Contraparte: [PENDIENTES_AGENTE.md](PENDIENTES_AGENTE.md). Actualizado: 2026-07-06.

## Antes de empezar a desarrollar

- [hecho] **D1 · Respaldar `perfil-mejorado/` y `plantilla-proyecto/` fuera del repo.** Confirmado por el dueño. Desbloquea la fase F0.
- [resuelto] **D2 · Titular del hero (H1):** "Llevo sistemas completos de la idea a producción." con subtítulo "Go · Flutter · React · Cloud (OCI)". (El headline largo de LinkedIn es aparte, para esa red, no para el H1 del sitio.)

## Durante / al final

- [hecho] **D3 · Merge de `develop` a `master`**. Resuelto el 2026-07-06: el dueño autorizó y el agente ejecutó el fast-forward `20dbf85..9390c0e`; el workflow de deploy terminó en verde.
- [ ] **D4 · Verificar el deploy** en <https://angelezequiel.dev>: la parte automatizable ya pasó el 2026-07-06 (título e H1 nuevos, `/en/` y `/acp-suite/` en 200, 404 real, CSS y CV en 200, beacon presente). Queda el pase visual del dueño: idioma, tema, descarga de CV, links de credenciales, y en unos días confirmar visitas en Web Analytics.
- [ ] **D5 · Publicar el README de perfil de GitHub** (`GITHUB_PROFILE_README.md`) en el repo `EzequielAngel0/EzequielAngel0`.
- [ ] **D6 · Actualizar LinkedIn** con el titular y "Acerca de" de `LinkedIn_ES_EN.md`.
- [hecho] **D7 · Activar Cloudflare Web Analytics** para `angelezequiel.dev` y pasar el token del beacon (ADR 0006). Resuelto el 2026-07-06: el sitio ya existía en Web Analytics, se cambió a modo "JS Snippet installation" (con DNS only no hay auto-inyección) y el token se entregó; beacon + CSP integrados en `Base.astro` (doc 06, `docs/rondas/2026-07-06_d7-beacon.md`). Verificar visitas en el panel unos días después del deploy.
- [ ] **D8 · Pasar las capturas de pantalla** (a futuro, opcional, no bloquea el lanzamiento): ACP (panel admin y apps) **anonimizadas** (sin datos personales, hosts, IPs ni tokens visibles; usar demo o difuminar) y SoloKey. Al agregarlas aparece el carrusel (doc 05, doc 02 regla 3).
- [ ] **D10 · Explorar la dirección visual nueva** (2026-07-06): el dueño no quedó satisfecho con el estilo/colores actuales. Usar los prompts autocontenidos de `PROMPTS_DISENO.md` (raíz, gitignored) en v0/Lovable/Replit/Stitch/Realtime Colors, elegir una dirección y traer al siguiente chat capturas + hex con roles + fuentes (o URLs de Realtime Colors). Ese chat sigue `docs/PROMPT_REDISENO_VISUAL.md` (ADR 0011 antes de codificar).
- [hecho] **D9 · Configurar el dominio** `angelezequiel.dev` (ADR 0007). Resuelto el 2026-07-06: apex y `www` apuntando a `ezequielangel0.github.io` en modo DNS only, custom domain guardado en GitHub Pages y "DNS check successful"; certificado TLS en emisión al cierre. Queda solo activar **Enforce HTTPS** cuando el certificado termine (checkbox en Settings, Pages).
- [ ] **D11 · Mudanza a `portfolio.angelezequiel.dev`** (ADR 0012, decidida el 2026-07-16; el código ya está listo en `develop`, el agente NO lo sube a `master` hasta el paso 2). Orden para mínimo downtime:
  1. En Cloudflare DNS: crear `CNAME portfolio -> ezequielangel0.github.io` (DNS only / nube gris).
  2. Avisar al agente para que haga el merge a `master` (el deploy publica el `CNAME` nuevo).
  3. En GitHub Settings, Pages: verificar custom domain `portfolio.angelezequiel.dev`, esperar el certificado y activar **Enforce HTTPS**.
  4. En Cloudflare, Rules: redirect 301 `angelezequiel.dev/*` (y `www`) hacia `https://portfolio.angelezequiel.dev/$1`, el puente hasta que el hub tome la raíz (mantiene vivos los links de LinkedIn y de los CV en PDF).
  5. En Cloudflare Web Analytics: actualizar el hostname del sitio del beacon (si el token cambia, pasarlo al agente para `Base.astro`).

## Decisiones resueltas en la entrevista

- [resuelto] **Alcance v1:** lanzamiento bilingüe completo (home + case study, ES y EN) antes del merge a `master`.
- [resuelto] **Dirección visual:** "Sistema en producción" sobre base papel-y-tinta, sin motivo boleto (ADR 0005).
- [resuelto] **T2 · Hero:** 100% tipográfico, sin foto. No se usa `public/hero-setup.jpg` (se elimina en la limpieza F0).
- [resuelto] **Contacto:** mailto + redes (LinkedIn, GitHub, X). Sin formulario. Correo público: `barbosalomeliangelezequiel@gmail.com`.
- [resuelto] **Diagrama del case study:** SVG artesanal tematizado (doc 04).
- [resuelto] **Dominio:** `angelezequiel.dev` (Cloudflare), base en raíz (ADR 0007). Falta configurarlo (D9).
- [resuelto] **Analítica:** Cloudflare Web Analytics (ADR 0006); falta activarla (D7).
- [resuelto] **Capturas:** opcionales, a futuro (D8), con carrusel animado accesible (doc 05).
