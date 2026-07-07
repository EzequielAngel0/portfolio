# Prompt para la ronda de rediseño visual (copiar y pegar en un chat nuevo)

Redactado el 2026-07-06. Contexto: tras la ronda post-lanzamiento (T1-T11 + iteración 2: paleta azul tinta ADR 0010, fondo circuito ADR 0009 v2), el dueño sigue sin quedar satisfecho con el estilo/colores. Decidió explorar direcciones visuales en herramientas externas (v0, Lovable, Replit, Stitch, Realtime Colors) con los prompts autocontenidos de `PROMPTS_DISENO.md` (raíz del repo, gitignored, material personal). Esta ronda implementa (o pule) la dirección que el dueño traiga.

## Versión corta (recomendada): pega SOLO esto en un chat nuevo abierto en el repo

> Chat nuevo en este repo (portfolio en producción en angelezequiel.dev; `develop` va adelante de `master` con la ronda post-lanzamiento). Vas a implementar o pulir una NUEVA dirección visual que yo te voy a dar (capturas, hex con roles, fuentes o URLs de Realtime Colors, generadas con los prompts de `PROMPTS_DISENO.md`). Lee y sigue `docs/PROMPT_REDISENO_VISUAL.md` completo, incluyendo su checklist de piezas acopladas a la paleta. Reglas duras del doc 02 (sin em dash, sin emojis, sin glassmorphism salvo que yo lo reabra explícito, precisión técnica, solo métricas autorizadas) y proceso del doc 08 (commits de una línea sin acentos ni firma de IA; rama corta desde `develop`; a `master` NUNCA haces merge). ANTES de codificar: proponme el mapeo completo a tokens como ADR 0011 y espera mi OK. Verifica con `npm run build` + `preview` o `podman compose up --build` (yo lo veo en `http://portfolio:4321`).

---

## Proceso obligatorio

1. **Recibir el material del dueño.** Puede ser: capturas (claro y oscuro), lista de hex con roles, bloque de variables CSS generado por una herramienta, nombres de fuentes, o URLs de Realtime Colors (la URL codifica los hex: extraerlos de sus parámetros). Si falta el tema oscuro o algún rol, proponerlo derivado y marcarlo como propuesta.
2. **Proponer el ADR 0011 ANTES de tocar código**: mapeo token por token (tabla actual del doc 05 vs. propuesta), qué familia tipográfica entra y cuál sale, contraste AA verificado por par texto/fondo en AMBOS temas, y qué se conserva (semántica `--status` verde = operativo del ADR 0010, o su reemplazo explícito). Si la dirección elegida es solo un PULIDO de la actual (mismos colores base, ajustes de valores), no hace falta ADR: se registra en el tracker; el umbral es "cambia la dirección o una familia tipográfica = ADR".
3. **Esperar el OK explícito del dueño** al ADR/mapeo.
4. Implementar en rama corta desde `develop`.
5. Verificar TODO el checklist de abajo, actualizar docs y hacer merge + push a `develop`.

## Checklist de piezas acopladas a la paleta (NO es solo tokens.css)

- `src/styles/tokens.css`: fuente de verdad (`:root`, `[data-theme='dark']`, `@theme`). Mantener la estructura de tokens con rol (`paper`, `surface`, `ink`, `ink-soft`, `accent`, `status`, `signal`, `line`, `card-shadow`).
- `src/layouts/Base.astro`: los hex del papel están HARDCODEADOS en 3 lugares (meta `theme-color`, script anti-FOUC y el objeto `themeColors` del toggle). Actualizarlos a la par.
- `scripts/og-images.mjs`: PAPER/INK/INK_SOFT/ACCENT/LINE hardcodeados; tras cambiar la paleta REGENERAR las 6 imágenes OG (`npm i --no-save satori @fontsource/archivo playwright-core` + `node scripts/og-images.mjs`; si cambian las fuentes, actualizar también las que carga el script).
- Favicon (`public/favicon.svg` + `scripts/favicons.mjs`): usa colores de la identidad; revisar y regenerar si la paleta nueva lo pide.
- Fondo circuito (`global.css` `.bg-circuit*`): usa `--color-ink` y `--color-accent` con opacidades calibradas para la paleta actual; revisar visibilidad sobre la nueva (ni invisible ni ruidoso).
- Intro y motion: `.intro-overlay`/`.intro-status` usan `paper`/`ink`/`status`; verificar en ambos temas.
- **Si cambian las familias tipográficas**: subset latin en `public/fonts/` (máx 3 woff2, doc 06), `@font-face` en `global.css`, preload en `Base.astro`, `--font-sans`/`--font-mono` en `tokens.css`, y las fuentes que cargan `og-images.mjs` y `favicons.mjs`. La monoespaciada para datos/cifras es parte de la identidad (doc 05): si la dirección nueva la elimina, eso es decisión explícita del ADR.
- Docs al cerrar: ADR 0011, tabla de tokens del doc 05, tracker nuevo en `docs/rondas/`, `PENDIENTES_AGENTE.md`, estado en `docs/PROMPT_DESARROLLO.md` y este archivo (marcar ejecutada).

## Gates que NO se negocian (doc 02 y 06)

- Contraste AA en todo par texto/fondo, en ambos temas (verificar por token, no a ojo).
- Sin glassmorphism, orbes ni partículas: si la dirección elegida los trae, PARAR y confirmarlo con el dueño como reapertura explícita de la regla 7 del doc 02 (no asumirlo).
- Sin emojis, sin em dash, precisión técnica, solo métricas autorizadas.
- LCP móvil < 1.8 s, ~60fps medidos, contenido visible sin JS, reduced motion.
- Presupuesto JS: ya está AL LIMITE (~59.4 KB gzip en la peor página). El rediseño visual no debe sumar JS; si lo hace, recortar antes.
- Tema claro/oscuro sin FOUC; responsive hasta 360 px; pase de reglas duras por grep al cerrar.

## Estado

- [ ] Bloqueada: esperando que el dueño explore con `PROMPTS_DISENO.md` y traiga la dirección elegida (capturas/hex/fuentes/URLs).
