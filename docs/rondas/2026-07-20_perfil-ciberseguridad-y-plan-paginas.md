# Ronda 2026-07-20 · perfil ciberseguridad, reorganizacion de docs y plan de paginas

Ronda de perfil y documentacion (no toca `src/`). Origen: el dueno decidio estudiar ciberseguridad y hacking etico, y pidio reflejar esa direccion en su presencia publica, ademas de ordenar `docs/` y dejar preparado el siguiente trabajo del portfolio. Todo lo de `perfil-mejorado/` esta en `.gitignore`.

## Contexto y decisiones del dueno

- **Formacion elegida:** ruta Cisco "Junior Cybersecurity Analyst" (career path) + curso "Ethical Hacker" de Cisco (ambos gratuitos, netacad), sobre el curso de Udemy (descartado por contenido de nivel bajo y enfoque no profesional). Practica complementaria recomendada y aceptada: PortSwigger Web Security Academy, TryHackMe y Hack The Box. Angulo: builder que suma la perspectiva del atacante para defender lo que construye.
- **CV:** NO se toca en esta ronda (instruccion explicita del dueno). La ciberseguridad entra al CV mas adelante, cuando haya un certificado en mano.
- **Portfolio:** la ronda de rediseno visual "blueprint" (ADR 0011) YA estaba hecha y mergeada a `develop` desde 2026-07-15/16; no habia rediseno pendiente (la nota de estado que lo decia habia quedado desactualizada). Por eso las paginas nuevas no esperan a nada.
- **Educacion (dato confirmado):** CETI, Tecnologo en Desarrollo de Software (ago 2022 - jun 2026, egresado, promedio 94.50/100) e Ingenieria en Desarrollo de Software (ago 2026 - jun 2029, ingreso directo a 3er semestre).

## Hecho

### Perfil de GitHub (`perfil-mejorado/GITHUB_PROFILE_README.md`)

- Rediseno: narrativa "construyo sistemas en produccion y los construyo para ser atacados"; typing SVG con linea de seguridad; linea `// now` con la formacion actual; separadores arcoiris cambiados por reglas limpias, paleta azul tinta coherente con el portfolio.
- Bloque "Currently Learning" nuevo: "AppSec & Ethical Hacking" (Cisco Junior Cybersecurity Analyst + Ethical Hacker + PortSwigger + THM/HTB), con fila "exploring" de herramientas marcada como aprendizaje, no como dominio. Se conservo FastAPI.
- Contribution snake retirada; en su lugar un contribution activity graph (misma idea, sin depender del Action del snake). Alternativa mas parecida (3D contrib calendar via Action) queda ofrecida por si el dueno la prefiere.
- Datos corregidos: link del portfolio al subdominio `portfolio.angelezequiel.dev`; SoloKey actualizado a multiplataforma (Android + companion Windows, sync P2P E2EE); DocuAgent agregado (RAG en produccion con demo). ACP a ancho completo, DocuAgent y SoloKey en fila de dos.

### LinkedIn (`perfil-mejorado/LinkedIn_ES_EN.md`)

- "Acerca de" (ES y EN): el parrafo de aprendizaje continuo sumo la seguridad de aplicaciones y hacking etico (ruta Cisco + PortSwigger + THM/HTB), enmarcado como formacion en curso, no como aptitud dominada. Recomendacion registrada: el certificado de Cisco va a "Licencias y certificaciones" cuando se termine; no agregar "Cybersecurity" a Aptitudes todavia.

### Reorganizacion de `docs/`

- Carpeta nueva `docs/prompts/` para los prompts de handoff de ronda y su material fuente. Movidos: `PROMPT_MEJORAS_POST_LANZAMIENTO.md`, `PROMPT_REDISENO_VISUAL.md`, `DIRECCION_STITCH.md`. `PROMPT_DESARROLLO.md` se elimino y su bitacora se plego, compacta, dentro de `PENDIENTES_AGENTE.md`, que queda como unico doc vivo (estado + backlog); se agrego al doc 08 la regla de podar los pendientes al cerrar cada ronda.
- `docs/README.md` reescrito: indice actual con taxonomia de los seis tipos de doc (estado vivo, backlogs, canon 01-08, ADR, rondas, prompts), estado del proyecto al dia y correccion de datos viejos (Astro 7 no 5, subdominio, ADRs 0001-0012).
- Referencias actualizadas en: PENDIENTES_AGENTE, PENDIENTES_DUENO, 08-convenciones, ADR 0011, trackers 2026-07-06 y 2026-07-15, `.gitignore` y las autorreferencias de los archivos movidos. `.gitignore` ademas ignora `PROMPTS_CIBERSEGURIDAD.md` (material personal, no versionar).

## Planeado (paginas nuevas del portfolio)

Una pagina de contenido NO llega al umbral de ADR del doc 08 ("cambia la direccion o una familia tipografica = ADR"): van en rama `feat/` desde `develop`, con OG regenerada y docs vivos al dia. Prompt de handoff de las dos primeras: [`../prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md`](../prompts/PROMPT_PAGINAS_EDUCACION_SOBRE_MI.md).

- [ ] **Educacion** (`/educacion/` + `/en/education/`): las dos etapas del CETI.
- [ ] **Sobre mi / historia**: bio ampliada, trayectoria y foto.
- [ ] **Experiencia profesional (rol en ACP)**: timeline tipo LinkedIn, complementa el case study (segundo lote, sin prompt aun).

## Verificacion

Ronda de documentacion y de material gitignored: no corre build. Se verifico que no queden enlaces rotos a las rutas viejas de los archivos movidos (grep). El perfil de GitHub y LinkedIn los publica el dueno (D5/D6 de `PENDIENTES_DUENO.md`); el build del sitio no depende de `perfil-mejorado/`.

## Al cerrar

Actualizados `PENDIENTES_AGENTE.md` (compactado a estado + backlog, con `PROMPT_DESARROLLO.md` eliminado y plegado dentro), `docs/README.md` y este tracker. Merge de la rama de trabajo a `develop`; a `master` decide el dueno. Pendiente del agente: las paginas nuevas cuando el dueno de la senal (prompt listo para educacion + sobre mi).
