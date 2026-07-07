# 0010 · Paleta revisada: acento azul tinta y verde reservado al estado

- **Fecha:** 2026-07-06
- **Estado:** Aceptada (pedido y eleccion del dueno en el pase visual post-lanzamiento)

## Contexto

En su pase visual sobre el build de produccion, el dueno reporto poca diferenciacion visual en AMBOS temas: tarjetas que apenas se separan del fondo, bordes casi invisibles e iconos tenues. Pidio ademas cambiar los acentos por colores nuevos "tenues, nada neon". Esto revisa los tokens de color del doc 05 (ADR 0005), manteniendo la direccion "papel y tinta".

## Decision

1. **Acento interactivo nuevo: azul tinta.** `--accent` pasa a `#33618F` en claro (~6:1 sobre paper, AA texto normal) y `#7FA9D4` en oscuro (~7.5:1). Lo usan links, CTAs, credenciales y el anillo de foco.
2. **El verde queda RESERVADO a la semantica de "operativo"** (coherente con el ADR 0005) en un token nuevo `--status` (`#1E6E4E` / `#4CC38A`): punto de estado del hero, badge "en produccion" y la linea de estado de la intro. Nada interactivo lo usa.
3. **Contraste estructural subido en ambos temas:** `--line` de 0.14 a 0.22 de opacidad; superficie oscura de `#1A1D21` a `#1F242B` (mas separada del papel `#121417`); sombras de tarjeta reforzadas (anillo claro 0.07 -> 0.1, oscuro 0.1 -> 0.14, capas de elevacion mas presentes).

## Alternativas consideradas

- **Verde petroleo** (`#20666A` / `#6FC0BE`) · cambio sutil dentro de la familia verde; el dueno prefirio un contraste de familia mayor.
- **Cobre apagado** (`#96522A` / `#D9A05B`) · calido y sobrio, pero colisiona con el ambar `--signal`; habria obligado a mover tambien ese token.
- **Solo subir contraste sin tocar el acento** · resolvia la legibilidad pero no el pedido explicito de acentos nuevos.

## Consecuencias

- Se gana: jerarquia visual mas legible en ambos temas y un acento interactivo diferenciado del estado; la semantica "verde = operativo" del ADR 0005 se conserva, ahora acotada y mas clara.
- Se paga: el doc 05 (tabla de tokens) queda superseded en esos valores y se actualiza; cualquier pieza nueva debe decidir entre `accent` (interaccion) y `status` (estado real).
- Sin impacto en las imagenes OG: su linea de estado usa el verde operativo, que no cambio.
