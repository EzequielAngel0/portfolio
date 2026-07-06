// JSON-LD por pagina (doc 06) con SOLO datos autorizados del doc 02 (regla 5):
// Person en el home, SoftwareSourceCode para SoloKey (repo publico) y para el
// case study de ACP Suite (sin codeRepository: es repo privado de cliente).
import type { CollectionEntry } from 'astro:content';
import { site } from '../data/site';

// Identidad canonica (doc 02).
const NAME = 'Angel Ezequiel Barbosa Lomeli';
const SHORT_NAME = 'Angel Barbosa';
const JOB_TITLE = 'Software Engineer | Full-Stack Developer';

type JsonLd = Record<string, unknown>;

// Referencia minima de autor para las obras (la ficha completa vive en el home).
function personRef(siteUrl: string): JsonLd {
  return { '@type': 'Person', name: NAME, url: siteUrl };
}

export function personJsonLd(siteUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: NAME,
    alternateName: SHORT_NAME,
    jobTitle: JOB_TITLE,
    url: siteUrl,
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressRegion: 'Jalisco', addressCountry: 'MX' },
    sameAs: site.socials.map((social) => social.url),
    knowsLanguage: ['es', 'en'],
  };
}

export function projectJsonLd(entry: CollectionEntry<'projects'>, siteUrl: string): JsonLd {
  const { title, summary, stack, repoUrl, locale } = entry.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description: summary,
    ...(repoUrl ? { codeRepository: repoUrl } : {}),
    keywords: stack.join(', '),
    inLanguage: locale,
    author: personRef(siteUrl),
  };
}

export function caseStudyJsonLd(
  entry: CollectionEntry<'case-study'>,
  pageUrl: string,
  siteUrl: string,
): JsonLd {
  const { title, tagline, stack, locale } = entry.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description: tagline,
    url: pageUrl,
    keywords: stack.join(', '),
    inLanguage: locale,
    author: personRef(siteUrl),
  };
}
