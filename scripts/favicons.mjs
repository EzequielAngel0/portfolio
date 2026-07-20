// Genera el favicon de la identidad: monograma "A" en la display condensada
// (Bebas Neue, la misma del nombre del hero desde el ADR 0011; antes Archivo 700)
// mas el punto verde de estado (elemento firma, doc 05), sobre papel.
// Salidas: public/favicon.svg (tematizado con prefers-color-scheme),
// public/favicon.ico (16/32/48, PNG embebido) y public/apple-touch-icon.png (180).
// Herramienta one-off: no es dependencia del proyecto ni corre en el build.
// Uso: npm i --no-save satori @fontsource/bebas-neue && node scripts/favicons.mjs
import { readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';

// Tokens de docs/canon/05-diseno.md (claro y oscuro; papel frio de la iteracion 2026-07-15).
const LIGHT = { paper: '#EEF1F5', ink: '#17181A', accent: '#1E6E4E' };
const DARK = { paper: '#121417', ink: '#EDEBE6', accent: '#4CC38A' };
const RX = 20; // radio del contenedor en viewBox 100

const bebas400 = await readFile(
  new URL(
    '../node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff',
    import.meta.url,
  ),
);

// satori convierte el texto en <path>: el SVG final no depende de la fuente.
const mark = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    children: {
      type: 'div',
      props: {
        style: { display: 'flex', alignItems: 'flex-end' },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontFamily: 'Bebas Neue',
                fontWeight: 400,
                // Bebas es condensada (mas angosta y alta que Archivo): sube el
                // cuerpo para conservar el peso visual del monograma en 100px.
                fontSize: 88,
                lineHeight: 1,
                color: LIGHT.ink,
              },
              children: 'A',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                width: 17,
                height: 17,
                borderRadius: 9,
                backgroundColor: LIGHT.accent,
                marginLeft: 7,
                marginBottom: 4,
              },
            },
          },
        ],
      },
    },
  },
};

const raw = await satori(mark, {
  width: 100,
  height: 100,
  fonts: [{ name: 'Bebas Neue', weight: 400, style: 'normal', data: bebas400 }],
});

const openTag = /(<svg[^>]*>)/;

// favicon.svg: clases + media query para seguir el tema del sistema.
const style =
  `<style>.bg{fill:${LIGHT.paper}}.fg{fill:${LIGHT.ink}}.dot{fill:${LIGHT.accent}}` +
  `@media (prefers-color-scheme:dark){.bg{fill:${DARK.paper}}.fg{fill:${DARK.ink}}.dot{fill:${DARK.accent}}}</style>`;
const themed = raw
  .replaceAll(`fill="${LIGHT.ink}"`, 'class="fg"')
  .replaceAll(`fill="${LIGHT.accent}"`, 'class="dot"')
  .replace(openTag, `$1${style}<rect class="bg" width="100" height="100" rx="${RX}"/>`);
await writeFile(new URL('../public/favicon.svg', import.meta.url), themed);

// Version con fills literales (tema claro) para rasterizar sin CSS.
const flat = raw.replace(
  openTag,
  `$1<rect fill="${LIGHT.paper}" width="100" height="100" rx="${RX}"/>`,
);
const rasterize = (size) =>
  sharp(Buffer.from(flat), { density: 400 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

// favicon.ico: contenedor ICO con PNGs embebidos (suficiente para evergreen).
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(rasterize));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
const entries = [];
let offset = 6 + 16 * sizes.length;
sizes.forEach((size, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0); // ancho
  entry.writeUInt8(size, 1); // alto
  entry.writeUInt16LE(1, 4); // planos de color
  entry.writeUInt16LE(32, 6); // bits por pixel
  entry.writeUInt32LE(pngs[i].length, 8);
  entry.writeUInt32LE(offset, 12);
  entries.push(entry);
  offset += pngs[i].length;
});
await writeFile(
  new URL('../public/favicon.ico', import.meta.url),
  Buffer.concat([header, ...entries, ...pngs]),
);

// apple-touch-icon: 180x180 a sangre completa (iOS aplica su propia mascara).
await sharp(Buffer.from(flat), { density: 400 })
  .resize(180, 180)
  .flatten({ background: LIGHT.paper })
  .png({ compressionLevel: 9 })
  .toFile(
    new URL('../public/apple-touch-icon.png', import.meta.url).pathname.replace(
      /^\/([A-Za-z]:)/,
      '$1',
    ),
  );

console.log('ok favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png');
