// Subset de la fuente display condensada (Bebas Neue, SIL OFL) para el nombre
// del hero (ADR 0011). Herramienta one-off: no es dependencia del proyecto ni
// corre en el build (subset-font se instala con --no-save y no toca la lockfile).
// Uso: npm i --no-save @fontsource/bebas-neue subset-font && node scripts/subset-display.mjs
// La display solo pinta lineas cortas en mayuscula (el nombre), asi que el
// subset se limita a mayusculas, digitos y puntuacion de datos: unos pocos KB.
import { readFile, writeFile } from 'node:fs/promises';
import subsetFont from 'subset-font';

const SRC = '../node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2';
const OUT = '../public/fonts/bebas-neue-latin-display.woff2';
// Mayusculas + digitos + puntuacion de datos (·, punto, guion, barra, dos puntos, &).
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .·-/:&';

const src = await readFile(new URL(SRC, import.meta.url));
const out = await subsetFont(src, GLYPHS, { targetFormat: 'woff2' });
await writeFile(new URL(OUT, import.meta.url), out);
console.log(`ok bebas-neue-latin-display.woff2 (${(out.length / 1024).toFixed(1)} KB, ${[...new Set(GLYPHS)].length} glifos)`);
