# Ronda 2026-07-20 · pagina Experiencia (rol en ACP)

Segundo lote de las paginas nuevas (el primero fue Educacion + Sobre mi, mismo dia): la pagina de Experiencia profesional. Rol en ACP en clave de puesto y logros (LinkedIn-style), que COMPLEMENTA, no repite, el detalle tecnico del case study de `/acp/`. Una pagina de contenido no llega al umbral de ADR (doc 08); sin ADR, reusa tokens y componentes. Rama `feat/pagina-experiencia` desde `develop`.

## Decisiones

- **Nombre de la empresa:** se nombra "Autocamiones del Pacifico (ACP)", consistente con la prosa del case study (`acp-suite.es/en.md` ya la cita). El tagline del case study sigue anonimizado a "una empresa de transporte foraneo de pasajeros"; nombrar la empresa no es dato nuevo ni sensible (ya es publico en el case study y el LinkedIn del dueno).
- **Fechas:** "Diciembre 2025 - Actualidad", el dato verificable del CV (`perfil-mejorado/CV_contenido_EN.md`). Si el dueno tiene otra fecha de inicio, la corrige (mismo criterio que la ingenieria en Educacion).
- **Nav:** Experiencia NO va al header (ya apretado); va al footer, agrupada junto al case study (ambas son de ACP). Descubrimiento reforzado con enlaces cruzados: desde el case study ("Ver mi rol en este proyecto"), desde Sobre mi ("Ver mi experiencia") y de vuelta desde Experiencia al case study y a Sobre mi.
- **Contenido:** orientado a rol/impacto (ownership de punta a punta, backend Go de dos APIs, auth propia, 6 interfaces, offline-first, pagos, infra/CI-CD, calidad). El detalle tecnico profundo se deja al case study; aqui van los logros del puesto. Copy transcrito del apartado de experiencia del CV y LinkedIn (reglas duras doc 02: dos APIs en Go, sin Redis/Supabase/OAuth2).

## Hecho

- `src/data/experience.ts`: rol ES/EN tipado (lead, role, company, meta, intro, achievements[]).
- `src/components/exp/ExperienceTimeline.astro`: ficha de puesto blueprint (rail + folio, `Badge` de produccion, rol/empresa/periodo, intro y logros como lista con marcador accent) y enlaces cruzados. `<ol>` preparado para admitir mas puestos a futuro.
- Paginas `src/pages/experiencia.astro` y `src/pages/en/experience.astro` (envuelven `Base`, OG e `Seo` por idioma).
- i18n: `nav.experience`, `experience.*` y `about.viewExperience`, `caseStudy.viewRole` en `ui.ts`; par `experiencia`<->`experience` en `localizedRoutes` y helper `experiencePath` en `utils.ts`.
- Nav/cruces: `footerNavItems` en `Base.astro` incluye Experiencia; enlace en `CaseStudyArticle.astro` (tras la franja de cifras) y en `AboutStory.astro` (cierre).
- SEO: `serialize` del sitemap con el par nuevo; dos OG (`experiencia.es/en.png`) generadas con `--no-save` (lockfile intacto).

## Verificacion

- `npm run check`: 0 errores (2 hints preexistentes ajenos).
- `npm run build`: 13 paginas (las 2 nuevas incluidas).
- `npm run preview`: `/experiencia/` y `/en/experience/` responden 200.
- Verificacion contenedorizada (`podman compose up --build`, Node 24, gate `check` + `build`): construye y sirve en `:4321`.
- hreflang/canonical y alternates del sitemap correctos; toggle `/experiencia/` <-> `/en/experience/`.
- Cross-link case study -> Experiencia y Sobre mi -> Experiencia presentes en el HTML.
- Reglas duras por grep: sin em dash, emojis ni terminos prohibidos en lo nuevo.

## Pendiente / notas

- Verificacion manual del dueno: pase visual claro/oscuro, teclado + lector, ~60fps, responsive.
- Si el dueno prefiere una fecha de inicio distinta o mas puestos, se editan en `experience.ts`.
- Con esto quedan hechas las tres paginas planeadas (Educacion, Sobre mi, Experiencia). Backlog de paginas del agente: cerrado.

## Al cerrar

Actualizados `PENDIENTES_AGENTE.md` (Experiencia a hecho), `docs/canon/04-arquitectura.md` (rutas), `docs/README.md` y este tracker. Merge de la rama a `develop`; a `master` decide el dueno.
