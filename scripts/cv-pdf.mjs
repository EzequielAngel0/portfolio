// Regenera los CV en PDF desde sus fuentes HTML locales (perfil-mejorado/,
// gitignored) hacia public/cv/ (T10, doc de mantenimiento en PENDIENTES_AGENTE).
// Herramienta one-off: no es dependencia del proyecto ni corre en el build.
// Uso: npm i --no-save playwright-core && node scripts/cv-pdf.mjs
// Requiere Microsoft Edge instalado (channel msedge: no descarga navegador).
// Al terminar, verificar 1 pagina por CV y los links internos (subdominio).
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const jobs = [
  { src: 'perfil-mejorado/CV_Angel_Barbosa.html', out: 'public/cv/Angel_Barbosa_CV.pdf' },
  { src: 'perfil-mejorado/CV_Angel_Barbosa_ES.html', out: 'public/cv/Angel_Barbosa_CV_ES.pdf' },
];

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
for (const job of jobs) {
  await page.goto(pathToFileURL(job.src).href, { waitUntil: 'networkidle' });
  await page.pdf({ path: job.out, preferCSSPageSize: true, printBackground: true });
  console.log(`ok ${job.out}`);
}
await browser.close();
