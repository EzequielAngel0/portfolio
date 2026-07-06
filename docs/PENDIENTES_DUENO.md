# Pendientes del DUEÑO · solo Angel

Cosas que el asistente no puede hacer: respaldos externos, decisiones, publicar en cuentas propias, merges a producción. Contraparte: [PENDIENTES_AGENTE.md](PENDIENTES_AGENTE.md). Actualizado: 2026-07-05.

## Antes de empezar a desarrollar

- [hecho] **D1 · Respaldar `perfil-mejorado/` y `plantilla-proyecto/` fuera del repo.** Confirmado por el dueño. Desbloquea la fase F0.
- [resuelto] **D2 · Titular del hero (H1):** "Llevo sistemas completos de la idea a producción." con subtítulo "Go · Flutter · React · Cloud (OCI)". (El headline largo de LinkedIn es aparte, para esa red, no para el H1 del sitio.)

## Durante / al final

- [ ] **D3 · Merge de `develop` a `master`** cuando la fase 6 esté en verde (el push a `master` dispara el deploy a Pages).
- [ ] **D4 · Verificar el deploy** en <https://angelezequiel.dev> tras el merge: idioma, tema, descarga de CV, links de credenciales.
- [ ] **D5 · Publicar el README de perfil de GitHub** (`GITHUB_PROFILE_README.md`) en el repo `EzequielAngel0/EzequielAngel0`.
- [ ] **D6 · Actualizar LinkedIn** con el titular y "Acerca de" de `LinkedIn_ES_EN.md`.
- [ ] **D7 · Activar Cloudflare Web Analytics** para `angelezequiel.dev` en el panel de Cloudflare y pasarme el token del beacon (ADR 0006). El resto de F5 cerró el 2026-07-06; este punto quedó `[bloqueado]` y se integra (beacon + CSP, doc 06) en cuanto llegue el token.
- [ ] **D8 · Pasar las capturas de pantalla** (a futuro, opcional, no bloquea el lanzamiento): ACP (panel admin y apps) **anonimizadas** (sin datos personales, hosts, IPs ni tokens visibles; usar demo o difuminar) y SoloKey. Al agregarlas aparece el carrusel (doc 05, doc 02 regla 3).
- [ ] **D9 · Configurar el dominio** `angelezequiel.dev` (ADR 0007): en GitHub repo Settings, Pages, custom domain = `angelezequiel.dev`; en Cloudflare DNS, registros a GitHub Pages (apex A/AAAA o CNAME flattening a `ezequielangel0.github.io`, y `www` CNAME). Recomendado DNS-only + Enforce HTTPS en GitHub. Necesario para F7 (deploy final).

## Decisiones resueltas en la entrevista

- [resuelto] **Alcance v1:** lanzamiento bilingüe completo (home + case study, ES y EN) antes del merge a `master`.
- [resuelto] **Dirección visual:** "Sistema en producción" sobre base papel-y-tinta, sin motivo boleto (ADR 0005).
- [resuelto] **T2 · Hero:** 100% tipográfico, sin foto. No se usa `public/hero-setup.jpg` (se elimina en la limpieza F0).
- [resuelto] **Contacto:** mailto + redes (LinkedIn, GitHub, X). Sin formulario. Correo público: `barbosalomeliangelezequiel@gmail.com`.
- [resuelto] **Diagrama del case study:** SVG artesanal tematizado (doc 04).
- [resuelto] **Dominio:** `angelezequiel.dev` (Cloudflare), base en raíz (ADR 0007). Falta configurarlo (D9).
- [resuelto] **Analítica:** Cloudflare Web Analytics (ADR 0006); falta activarla (D7).
- [resuelto] **Capturas:** opcionales, a futuro (D8), con carrusel animado accesible (doc 05).
