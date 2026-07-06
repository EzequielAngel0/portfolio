# 0008 · Astro 7 + Node 24 LTS y verificacion en contenedor (Podman)

- **Fecha:** 2026-07-06
- **Estado:** Aceptada. Actualiza (no reemplaza) el nucleo de [0001](0001-stack.md): sigue siendo Astro + Tailwind 4; cambian la version mayor de Astro y la version de Node.

## Contexto

Al arrancar F1 (bootstrap) el dueno pidio "las dependencias mas actuales y seguras". Al fijar el stack aparecieron dos hechos:

1. **Astro 5 quedo sin parche para 5 advisories `high`.** El pin del doc 03 / ADR 0001 era `astro@^5`. `npm audit` reporto 5 vulnerabilidades altas (XSS en `define:vars`, replay de server islands, XSS por slot name, XSS por nombres de atributos en spread props, SSRF por Host header en la pagina de error prerenderizada). Verificado contra la base de GitHub Advisories: los parches existen solo en la linea 6.x (el ultimo, 6.4.6); **no hay backport a 5.x**. Para un sitio 100% estatico, sin input de usuario, sin server islands y sin SSR, la mayoria son practicamente inexplotables aqui, pero chocan con el requisito explicito de "actuales y seguras".
2. **Node.** Astro 6 y 7 exigen Node `>=22.12`. El Node local del dueno era 20.19.5. Al instalar el LTS activo (`OpenJS.NodeJS.LTS`) resolvio a **Node 24.18.0**: a julio 2026, Node 24 es el LTS activo y el 22 paso a mantenimiento.

El dueno tambien pregunto si la verificacion podia correr en contenedores para no depender del equipo local, y pidio **Podman** (ademas es parte del stack del dueno, doc 02).

## Decision

1. **Astro 7.0.6** (ultima mayor estable, totalmente parcheada; `npm audit` = 0 vulnerabilidades) en vez de Astro 5. Se mantiene todo lo demas del stack: Tailwind 4 via `@tailwindcss/vite`, TypeScript strict, GSAP, fuentes self-hosted, `@astrojs/sitemap`.
2. **Node 24 LTS** como version del proyecto (local, CI, contenedor y deploy). `engines.node >= 22.12.0` (piso real de Astro 7); `.nvmrc` = `24`. Reemplaza el "Node 22 LTS" del doc 03.
3. **Verificacion contenedorizada con Podman** como opcion aislada, ademas de la nativa: `Containerfile` (Node 24, `npm ci` + `astro check` + `astro build` dentro de la imagen) y `compose.yaml` (`podman compose up --build` construye, aplica el gate y sirve el preview en `:4321`). No sustituye `astro build` + `preview` nativos: los replica de forma identica al CI y sin tocar el Node local.

## Alternativas consideradas

- **Quedarse en Astro 5.18.2 (ADR 0001 tal cual).** No exige subir Node y respeta el pin documentado, pero acepta los 5 advisories sin parche. Descartada por el requisito explicito de seguridad y por ser un proyecto nuevo (no hay costo de migracion real: se bootstrapea desde cero).
- **Astro 6.4.8.** Parchea los 5 advisories y es mas conservadora frente a lo que asumian los docs. Valida, pero para un proyecto que arranca de cero conviene la mayor estable (mejor horizonte de soporte). Descartada a favor de 7.
- **Docker en vez de Podman.** Docker esta disponible en el equipo, pero el dueno pidio Podman explicitamente y encaja con su stack (doc 02).

## Consecuencias

- **Se gana:** 0 vulnerabilidades en el arbol de dependencias; stack en su ultima mayor; verificacion reproducible e identica al CI sin depender del Node local.
- **Se paga:** Node local subio de 20 a 24 (autorizado por el dueno). La lockfile debe ser multiplataforma: `package-lock.json` se genera en Linux para incluir los binarios opcionales de `@tailwindcss/oxide`, `lightningcss` y `sharp` de todas las plataformas (linux, win32, darwin), de modo que `npm ci` funcione en Windows local y en Linux (CI/contenedor). Al cambiar dependencias con binarios nativos, regenerar la lockfile en Linux (contenedor) y commitearla.
- **Queda obligado:** `withastro/action@v6` con `node-version: 24`; `ci.yml` con `actions/setup-node` leyendo `.nvmrc`; documentar en doc 03/07/08. Vigilar los changelogs de Astro 7 en fases siguientes por cambios de comportamiento (config estable, superficie de breaking baja al construir desde cero).
