# Pendientes del DUEÑO · solo Angel

Cosas que el asistente no puede hacer: respaldos externos, decisiones, publicar en cuentas propias, merges a producción. Contraparte: [PENDIENTES_AGENTE.md](PENDIENTES_AGENTE.md). Actualizado: 2026-07-20.

Marcadores: `[ ]` abierto · `[hecho]`/`[resuelto]`. Este doc también se poda: lo resuelto se compacta abajo (doc 08).

## Abierto (lo que falta)

- [ ] **D4 · Verificar el deploy** en `https://portfolio.angelezequiel.dev`: pase visual (idioma, tema, descarga de CV, links de credenciales) y, en unos días, confirmar visitas en Cloudflare Web Analytics. La parte automatizable ya pasó.
- [ ] **D5 · Publicar el README de perfil de GitHub** (`perfil-mejorado/GITHUB_PROFILE_README.md`) en el repo `EzequielAngel0/EzequielAngel0`. Nota: la versión 2026-07-20 trae el rediseño y la nueva dirección de ciberseguridad.
- [ ] **D6 · Actualizar LinkedIn** con el titular y el "Acerca de" de `perfil-mejorado/LinkedIn_ES_EN.md` (ES y EN). El "Acerca de" 2026-07-20 ya incluye la dirección de ciberseguridad; el certificado de Cisco va a Licencias y certificaciones cuando se termine.
- [ ] **D8 · Pasar capturas de pantalla** (opcional, no bloquea): ACP (panel y apps) y SoloKey, **anonimizadas** (sin datos de clientes, hosts, IPs ni tokens). Al agregarlas se activa el carrusel que ya está construido (doc 05, doc 02 regla 3).

## Resuelto (compacto; detalle en su ronda de `rondas/`)

- [resuelto] **D1** respaldar `perfil-mejorado/` y `plantilla-proyecto/` fuera del repo.
- [resuelto] **D2** titular del hero (H1): "Llevo sistemas completos de la idea a producción."
- [hecho] **D3** merge de `develop` a `master` (2026-07-06, ff `20dbf85..9390c0e`); deploy en verde.
- [hecho] **D7** Cloudflare Web Analytics + token del beacon (ADR 0006), integrado en `Base.astro` con su CSP.
- [hecho] **D9** dominio `angelezequiel.dev` configurado (2026-07-06).
- [resuelto] **D10** explorar la dirección visual nueva: el dueño trajo la maqueta de Google Stitch, ejecutada como el rediseño blueprint (ADR 0011).
- [hecho] **D11** mudanza a `portfolio.angelezequiel.dev` (ADR 0012): DNS, merge, deploy y token del beacon; subdominio vivo con certificado y Enforce HTTPS.

## Decisiones base (referencia)

Alcance v1 bilingüe (home + case study) antes del primer merge. Dirección papel y tinta con capa blueprint (ADR 0005/0010/0011). Hero 100% tipográfico, sin foto. Contacto mailto + redes (LinkedIn, GitHub, X) y WhatsApp; sin formulario. Diagrama del case study en SVG artesanal tematizado (doc 04). Subdominio `portfolio.angelezequiel.dev`, raíz para el hub del ecosistema (ADR 0012). Analítica: Cloudflare Web Analytics (ADR 0006).
