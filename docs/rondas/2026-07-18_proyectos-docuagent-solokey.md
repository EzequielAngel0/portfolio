# Ronda 2026-07-18 · DocuAgent y SoloKey v1.1.0 en portfolio, CV y LinkedIn

Pedido del dueño: subir DocuAgent (`C:\Proyectos\agentes`, repo público
<https://github.com/EzequielAngel0/DocuAgent>) y la versión nueva de SoloKey
(`C:\Proyectos\Flutter\SoloKey`, v1.1.0 del 2026-07-18) al portfolio y al CV,
crear un prompt autocontenido de publicación en `C:\Proyectos\plantilla-proyecto`
y preparar la publicación de LinkedIn de ambos.

## Cambios en el sitio

- `src/content/projects/docuagent.es/en.md` nuevos: agente RAG (LangGraph +
  FastAPI, Next.js 16, Cohere + Qdrant, PostgreSQL), `status: production`,
  featured, fechas Junio-Julio 2026.
- `src/content/projects/solokey.es/en.md` reescritos: multiplataforma
  (Android + companion Windows), sync P2P E2EE en LAN (X25519, LWW), 510
  pruebas, fechas extendidas a Julio 2026 (v1.1.0).
- **Esquema `projects` extendido con `demoUrl` opcional** (doc 04 actualizado):
  la tarjeta pinta "Ver demo en vivo" antes de "Ver repositorio"
  (`Projects.astro`, claves nuevas `projects.viewDemo` en `ui.ts`) y el
  JSON-LD agrega `url` cuando existe (`jsonld.ts`).
- Doc 02: sección Proyectos actualizada con ambos proyectos y el flujo de
  publicación; promedio CETI corregido a 94.50 (egresado, dato del dueño).

## CV (regla de mantenimiento de PENDIENTES_AGENTE)

- Ambos HTML de `perfil-mejorado/` actualizados: entra DocuAgent (con demo
  clicable), SoloKey pasa a multiplataforma con P2P E2EE, skills con
  Python (FastAPI) + fila nueva "IA aplicada", promedio 94.50.
- **C#/.NET salió del renglón de backend por espacio de 1 página** (sigue en
  `CV_contenido_EN.md` como nota reversible; decisión a validar por el dueño).
- Para conservar 1 página: proyectos en formato compacto (bullet con nombre y
  fechas), `line-height` 1.28, márgenes de sección apretados y `@page` a
  0.34in vertical. PDFs regenerados (`scripts/cv-pdf.mjs`) y verificados a
  1 página por idioma; copias locales de `perfil-mejorado/*.pdf` refrescadas.
- Todos los links del CV apuntan al subdominio `portfolio.angelezequiel.dev`
  (verificado a pedido del dueño; ningún link a la landing).

## perfil-mejorado (fuera del build)

- `LinkedIn_PROYECTOS.md` NUEVO: entradas listas para la sección Proyectos de
  LinkedIn (ES/EN), publicación de anuncio (ES/EN), aptitudes y checklist;
  criterio: proyectos personales van en Proyectos, no en Experiencia.
- `LinkedIn_ES_EN.md`: "Acerca de" actualizado (FastAPI ya en producción con
  DocuAgent) y extras apuntando al archivo nuevo.
- `CV_contenido_EN.md`: sección Projects y Skills al día.
- `GITHUB_PROFILE_README.md`: tarjeta de DocuAgent (badge LIVE), SoloKey
  reescrito multiplataforma y "Currently Learning" pasa a IA aplicada.

## Fuera de este repo

- `C:\Proyectos\plantilla-proyecto\PROMPT_PUBLICACION.md` NUEVO: prompt
  autocontenido que, pegado en el repo de un proyecto terminado, genera su
  kit de publicación (tarjeta del portfolio con el esquema exacto, entrada de
  CV, LinkedIn y perfil de GitHub) con las reglas duras incluidas.
  `LEEME.md` de la plantilla actualizado.

## Verificación

- `npm run check` (0 errores) + `npm run build` + `npm run preview` en verde;
  tarjetas ES/EN con demo y repo verificadas por curl.
- Pase de reglas duras sobre `src/`: sin em dash, sin emojis, sin términos
  vetados (la única mención de "microservicios" es la negación autorizada del
  case study).
- PDFs: 1 página por idioma, promedio 94.50, links al subdominio.

## Pendientes del dueño

- [ ] Pase visual de las tarjetas nuevas en `develop` y merge a `master`.
- [ ] Validar la salida de C#/.NET del CV (reversible).
- [ ] LinkedIn: cargar las entradas de Proyectos, Destacados y publicar el
      anuncio (`perfil-mejorado/LinkedIn_PROYECTOS.md`).
- [ ] Actualizar el README del perfil de GitHub con la versión nueva.
