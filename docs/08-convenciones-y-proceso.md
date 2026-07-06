# 08 · Convenciones y proceso de trabajo

Destilado de tu kit `plantilla-proyecto/` (ignorado en git), quedándome con lo que aplica a un sitio estático de una persona y descartando lo pensado para plataformas con backend, infraestructura y operación. Esto fija CÓMO trabajamos, no QUÉ construimos (eso está en 01-07).

## Qué se rescata de la plantilla (y qué no)

| De la plantilla | Decisión aquí |
| --- | --- |
| Documentación primero (el agente lee docs antes de explorar) | **Se adopta.** Es justo lo que hacemos con `docs/` |
| Backlog partido por ejecutor (agente vs dueño) | **Se adopta.** Ver "Backlog" abajo |
| ADR: una decisión de arquitectura por archivo | **Se adopta.** Ver `docs/adr/` |
| Flujo de ramas y commits de una línea, sin firma de IA | **Se adopta, adaptado** a un repo solo (ver abajo) |
| "Cero datos mock: API real o error" | **Se adapta:** aquí no hay backend, pero el principio equivale a "solo datos verificados, cero inventados" (regla 5 del doc 02) |
| Verificar en el entorno real, no solo el build local | **Se adopta:** probar con `astro preview` (con `base`), no solo `astro dev` |
| Trackers de rondas en `docs/rondas/` | **Se adopta en versión ligera** (ver abajo) |
| GLOSARIO de dominio | **Se adopta** para los términos del case study |
| `SYSTEM_DESIGN`, `DATOS`/migraciones, `RUNBOOK`, `CUENTAS_SERVICIOS`, `GO_LIVE`, `ERRORES`, `SEGURIDAD` | **Se descartan:** no hay backend, base de datos, secretos ni operación en servidor. Su equivalente mínimo (deploy) vive en el doc 07 |
| Entrevista inicial por rondas (`PROMPT_INICIAL.md`) | **No aplica:** el producto ya está definido en 01-07 |
| Emojis como marcadores de estado (la plantilla usa varios) | **Se descartan:** regla 6 del doc 02. Marcadores en texto: `[ ]`, `[hecho]`, `[bloqueado]` |

## Flujo de ramas (`master` + `develop`, como tu plantilla)

El deploy a Pages se dispara con push a `master`, así que `master` cumple el rol de `main` de la plantilla:

- **`master` = producción.** Cada push despliega (workflow actual). Solo recibe merges de trabajo 100% terminado y probado. El merge a `master` lo hace el dueño.
- **`develop` = integración.** Rama de trabajo del rediseño; NO despliega. Todo el desarrollo de las fases 1-6 (doc 07) se integra aquí. Ya está creada.
- **Ramas cortas** desde `develop`, una por fase o cambio, con el tipo como prefijo (`feat/`, `fix/`, `docs/`, `chore/`, `infra/`) y el área en el nombre (`feat/home-hero`, `docs/adr-gsap`). Se borran al integrar en `develop`.
- Sin protección automática de rama (repo personal): la disciplina de "no mergear a `master` a medias" es **manual**.
- Push automático permitido a la rama de trabajo y a `develop`; a `master`, solo el dueño con merge de `develop`.
- Dos sesiones en el mismo working tree se aíslan con `git worktree`, no con ramas.

## Commits

- **Una sola línea:** `tipo(ambito): descripcion concreta`. Tipos: `feat | fix | docs | chore | infra`. En español **sin acentos** (compatibilidad de terminal).
- Concreto: qué componente, sección o regla exacta cambió. Nunca cuerpo multipárrafo ni resumen de sesión.
- **Sin pies de firma de IA** ni emojis. Esta regla del proyecto tiene prioridad sobre el default del harness (que añadiría `Co-Authored-By: Claude`); al commitear en este repo, omitirlo.
- Ejemplos: `feat(home): hero con linea de estado y CTAs`, `docs(adr): decision de stack astro5+tailwind4`, `chore: elimina cms decap y basura de raiz`.

## Backlog partido por ejecutor

Igual que la plantilla, se separa lo que puede hacer el agente de lo que solo puede hacer el dueño:

- **`docs/PENDIENTES_AGENTE.md`** (código, contenido, config ejecutable por Claude). Ya está esbozado como el plan por fases del doc 07; cuando arranque el desarrollo se materializa como checklist vivo.
- **`docs/PENDIENTES_DUENO.md`** (solo Angel): respaldar `perfil-mejorado/` fuera del repo, verificar el deploy en la URL real, publicar el README de perfil de GitHub, actualizar LinkedIn, y cualquier decisión `TBD` que aparezca. Ver el archivo para el detalle.

Regla continua: al cerrar cada bloque de trabajo, actualizar el tracker de la ronda + los dos `PENDIENTES_*` + el doc del área tocada.

## Trackers de ronda (versión ligera)

Cada sesión de trabajo con volumen (una fase del doc 07, una auditoría) deja un tracker en `docs/rondas/` con nombre `YYYY-MM-DD_TEMA.md`: orden de trabajo, hallazgos y estado punto por punto (`[ ]` / `[wip]` / `[hecho]`). Al cerrar, los pendientes que sobren se mueven a los `PENDIENTES_*` y el tracker se archiva. Para cambios pequeños no hace falta tracker: basta el commit.

## Handoff a un chat nuevo: prompt corto que apunta al doc, no pegar el contenido

Regla (2026-07-06): cuando una ronda de trabajo se prepara para ejecutarse en otra sesión, la instrucción para el chat nuevo se guarda como documento versionado en `docs/` (p. ej. `PROMPT_MEJORAS_POST_LANZAMIENTO.md`) y lo que el dueño pega en el chat nuevo es SOLO un prompt corto que le dice "lee ese archivo y sigue lo que dice", nunca el contenido completo del archivo.

- **Por qué, no por tokens:** el costo en tokens es casi idéntico en ambos casos (el contenido entra al contexto igual, se pegue o lo lea el modelo del disco; leerlo cuesta apenas una llamada de herramienta más). La razón real es operativa: el chat lee SIEMPRE la versión vigente del disco (no una copia pegada que envejece), se evita truncar o romper formato al pegar, y el dueño no carga con un pegado enorme.
- **El prompt corto (<= ~10 líneas)** debe incluir: contexto mínimo (repo, estado del proyecto), el nombre del archivo a leer y seguir, y los guardarraíles críticos por si el chat no lee con cuidado (reglas duras del doc 02, commits/ramas del doc 08, y sobre todo "a `master` NUNCA hace merge el asistente"). Puede vivir al inicio del propio archivo de prompt como "versión corta para pegar".
- **El archivo largo** es la fuente de verdad: tareas, restricciones, datos e inventarios. Se mantiene actualizado; el prompt corto solo lo referencia.

## ADR (Architecture Decision Records)

Las decisiones estructurales se registran una por archivo en `docs/adr/`, con la plantilla `NNNN-titulo.md` (contexto, decisión, alternativas, consecuencias). Sirven para que dentro de seis meses se sepa POR QUÉ, no solo QUÉ. Los ADR iniciales ya derivados de 01-07 están en esa carpeta.

## Verificación (adaptado: sin backend)

La plantilla exige "verificar en contenedor". Aquí el equivalente:

- **El build real es `astro build` + `astro preview`**, no `astro dev`. Aunque la base ahora es raíz (dominio propio, ADR 0007), `preview` sigue siendo la verificación fiel; las rutas se construyen con `BASE_URL`, nunca hardcodeadas.
- **Verificación en contenedor (Podman, ADR 0008):** además de la nativa, `podman compose up --build` construye la imagen (Node 24, `npm ci` + `astro check` + `astro build`) y sirve el `preview` en `:4321`. Es la verificación aislada del equipo local e idéntica al CI; el "verificar en contenedor" de la plantilla se cumple aquí de verdad. Recordatorio: la lockfile es multiplataforma (doc 03, regla 6); al tocar dependencias con binarios nativos, regenerarla en Linux (contenedor) y commitearla.
- **CI en `develop`** (`ci.yml`): cada push corre `astro check` + `astro build` (y Lighthouse CI cuando haya páginas). Es el gate automático antes de integrar; atrapa builds rotos y regresiones sin llegar a `master`.
- **Prueba sin JS:** cargar el sitio con JavaScript deshabilitado; todo el contenido debe leerse (mejora progresiva de GSAP, doc 06).
- **Prueba de fluidez:** verificar ~60fps en scroll y carga (panel Rendimiento de DevTools); es donde falla el sitio actual (doc 06).
- Antes de merge a `master`: Lighthouse, auditorías de a11y/animación y revisión de código (fase 6, doc 07).
