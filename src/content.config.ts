// Colecciones de contenido (Content Layer, Astro 7). Esquemas Zod estrictos.
// Cada pieza tiene un archivo por idioma; el emparejamiento ES/EN es por `slug`
// (doc 04). La validacion cruzada de pares vive en src/lib/content.ts y se cablea
// en los getStaticPaths de las paginas (F3/F4): Zod valida por entrada, no entre
// entradas. Sin acentos, sin em dash, sin emojis (doc 02).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['es', 'en']);

// Case study de ACP Suite: cuerpo markdown + metadata tipada.
// tagline, keyNumbers y stack se pintan como panel/tira en la pagina (doc 05),
// por eso viven en el frontmatter y no en el cuerpo. screenshots es opcional (D8).
const caseStudy = defineCollection({
  // id unico por archivo (slug.locale): el glob loader, por defecto, colapsaria
  // acp-suite.es.md y acp-suite.en.md al mismo id y uno sobrescribiria al otro.
  loader: glob({
    pattern: '*.{es,en}.md',
    base: './src/content/case-study',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      locale,
      tagline: z.string(),
      keyNumbers: z.array(z.string()).min(1),
      stack: z.array(z.string()).min(1),
      screenshots: z.array(z.object({ src: image(), alt: z.string() })).optional(),
    }),
});

// Proyectos (SoloKey y futuros). image/imageAlt son opcionales: las tarjetas
// se ven bien sin captura y degradan a diseno tipografico (doc 04, D8).
const projects = defineCollection({
  loader: glob({
    pattern: '*.{es,en}.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      locale,
      summary: z.string(),
      stack: z.array(z.string()).min(1),
      repoUrl: z.string().url().nullable(),
      status: z.enum(['production', 'public-repo']),
      dates: z.string(),
      featured: z.boolean().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { 'case-study': caseStudy, projects };
