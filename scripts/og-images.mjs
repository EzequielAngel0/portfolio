// Genera las imagenes OG 1200x630 por pagina e idioma en src/assets/og/ (doc 06).
// Herramienta one-off: no es dependencia del proyecto ni corre en el build.
// Uso: npm i --no-save satori @fontsource/archivo && node scripts/og-images.mjs
// (sharp ya esta en el arbol como dependencia de Astro; la lockfile no cambia.)
// El copy es VERBATIM de src/i18n/ui.ts y del frontmatter del case study (doc 02
// regla 5: solo datos autorizados). Tokens del tema claro de docs/canon/05-diseno.md.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';

const PAPER = '#EEF1F5'; /* papel frio de la iteracion 2026-07-15 (tokens.css) */
const INK = '#17181A';
const INK_SOFT = '#4A4D52';
const ACCENT = '#1E6E4E';
const LINE = 'rgba(23,24,26,0.14)';

const font = (path) => readFile(new URL(`../node_modules/${path}`, import.meta.url));
const fonts = [
  {
    name: 'Archivo',
    weight: 400,
    data: await font('@fontsource/archivo/files/archivo-latin-400-normal.woff'),
  },
  {
    name: 'Archivo',
    weight: 700,
    data: await font('@fontsource/archivo/files/archivo-latin-700-normal.woff'),
  },
  {
    name: 'IBM Plex Mono',
    weight: 400,
    data: await font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'),
  },
  {
    name: 'IBM Plex Mono',
    weight: 500,
    data: await font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff'),
  },
].map((f) => ({ ...f, style: 'normal' }));

const el = (type, style, children) => ({ type, props: { style, children } });
const mono = (size, color, text, extra = {}) =>
  el(
    'div',
    { display: 'flex', fontFamily: 'IBM Plex Mono', fontSize: size, color, ...extra },
    text,
  );

// Linea de estado firma (doc 05): punto verde + texto mono.
const statusLine = (text) =>
  el('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
    el('div', { width: 16, height: 16, borderRadius: 8, backgroundColor: ACCENT }),
    mono(27, ACCENT, text, { letterSpacing: 1 }),
  ]);

// Pie comun: nombre y dominio sobre una regla fina.
const footer = () =>
  el(
    'div',
    {
      display: 'flex',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: LINE,
      paddingTop: 30,
    },
    [
      mono(27, INK, 'Angel Barbosa', { fontWeight: 500 }),
      mono(27, INK_SOFT, 'portfolio.angelezequiel.dev'),
    ],
  );

const homeCard = ({ status, title, subtitle }) =>
  el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: 72,
      backgroundColor: PAPER,
      fontFamily: 'Archivo',
    },
    [
      statusLine(status),
      el('div', { display: 'flex', flexDirection: 'column', gap: 34 }, [
        el(
          'div',
          {
            display: 'flex',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            color: INK,
            width: 1030,
          },
          title,
        ),
        mono(30, INK_SOFT, subtitle),
      ]),
      footer(),
    ],
  );

const caseCard = ({ status, eyebrow, title, tagline, numbers }) =>
  el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: 72,
      backgroundColor: PAPER,
      fontFamily: 'Archivo',
    },
    [
      el(
        'div',
        { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
        [mono(24, INK_SOFT, eyebrow, { letterSpacing: 3 }), statusLine(status)],
      ),
      el('div', { display: 'flex', flexDirection: 'column', gap: 26 }, [
        el(
          'div',
          { display: 'flex', fontSize: 104, fontWeight: 700, lineHeight: 1, color: INK },
          title,
        ),
        el(
          'div',
          { display: 'flex', fontSize: 29, lineHeight: 1.45, color: INK_SOFT, width: 1010 },
          tagline,
        ),
        mono(23, INK, numbers, { marginTop: 6, width: 1056 }),
      ]),
      footer(),
    ],
  );

// Copy verbatim: home de ui.ts (hero.status/title/subtitle), case study de su
// frontmatter (tagline y keyNumbers autorizadas).
const cards = [
  {
    file: 'home.es.png',
    tree: homeCard({
      status: 'en producción · v2026.07',
      title: 'Llevo sistemas completos de la idea a producción.',
      subtitle: 'Go · Flutter · React · Cloud (OCI)',
    }),
  },
  {
    file: 'home.en.png',
    tree: homeCard({
      status: 'in production · v2026.07',
      title: 'I take complete systems from idea to production.',
      subtitle: 'Go · Flutter · React · Cloud (OCI)',
    }),
  },
  {
    file: 'certificaciones.es.png',
    tree: homeCard({
      status: 'en producción · v2026.07',
      title: 'Certificaciones',
      subtitle: 'Formación continua verificable: cada credencial enlaza a su verificación oficial.',
    }),
  },
  {
    file: 'certificaciones.en.png',
    tree: homeCard({
      status: 'in production · v2026.07',
      title: 'Certifications',
      subtitle:
        'Verifiable continuous learning: every credential links to its official verification.',
    }),
  },
  {
    file: 'educacion.es.png',
    tree: homeCard({
      status: 'en producción · v2026.07',
      title: 'Educación',
      subtitle: 'CETI · del tecnólogo egresado a la ingeniería en curso.',
    }),
  },
  {
    file: 'educacion.en.png',
    tree: homeCard({
      status: 'in production · v2026.07',
      title: 'Education',
      subtitle: 'CETI · from the completed technologist to the engineering degree.',
    }),
  },
  {
    file: 'sobre-mi.es.png',
    tree: homeCard({
      status: 'en producción · v2026.07',
      title: 'Sobre mí',
      subtitle: 'De la idea a producción, y de la PCB a la nube.',
    }),
  },
  {
    file: 'sobre-mi.en.png',
    tree: homeCard({
      status: 'in production · v2026.07',
      title: 'About',
      subtitle: 'From idea to production, and from the PCB to the cloud.',
    }),
  },
  {
    file: 'experiencia.es.png',
    tree: homeCard({
      status: 'en producción · v2026.07',
      title: 'Experiencia',
      subtitle: 'Desarrollador Full-Stack en ACP, en producción en Oracle Cloud.',
    }),
  },
  {
    file: 'experiencia.en.png',
    tree: homeCard({
      status: 'in production · v2026.07',
      title: 'Experience',
      subtitle: 'Full-Stack Developer at ACP, live in production on Oracle Cloud.',
    }),
  },
  {
    file: 'acp-suite.es.png',
    tree: caseCard({
      status: 'en producción',
      eyebrow: 'CASE STUDY',
      title: 'ACP',
      tagline:
        'Plataforma completa de boletaje y paquetería para una empresa de transporte foráneo de pasajeros, construida por una sola persona y en producción en Oracle Cloud.',
      numbers: '6 interfaces + 2 APIs · 1 desarrollador · 150+ pruebas · p95 < 100 ms',
    }),
  },
  {
    file: 'acp-suite.en.png',
    tree: caseCard({
      status: 'in production',
      eyebrow: 'CASE STUDY',
      title: 'ACP',
      tagline:
        'End-to-end ticketing and parcel platform for an intercity passenger transport company, built by one person and live in production on Oracle Cloud.',
      numbers: '6 interfaces + 2 APIs · 1 developer · 150+ tests · p95 < 100 ms',
    }),
  },
];

const outDir = new URL('../src/assets/og/', import.meta.url);
await mkdir(outDir, { recursive: true });
for (const { file, tree } of cards) {
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(new URL(file, outDir), png);
  console.log(`ok ${file} (${Math.round(png.length / 1024)} KB)`);
}
