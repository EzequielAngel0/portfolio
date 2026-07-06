// Utilidades de contenido con la invariante de pares ES/EN por slug (doc 04).
// Zod valida por entrada; el emparejamiento entre entradas se garantiza aqui y se
// cablea en los getStaticPaths de las paginas (F3/F4), de modo que el build falla
// si un slug existe en un idioma y no en el otro.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

type LocalizedCollection = 'case-study' | 'projects';

// Falla si algun slug no aparece en ambos idiomas.
export function assertLocalePairs<C extends LocalizedCollection>(
  collection: C,
  entries: CollectionEntry<C>[],
): void {
  const byLocale: Record<Locale, Set<string>> = { es: new Set(), en: new Set() };
  for (const entry of entries) {
    byLocale[entry.data.locale].add(entry.data.slug);
  }
  const missing: string[] = [];
  for (const slug of byLocale.es) {
    if (!byLocale.en.has(slug)) missing.push(`${collection}/${slug}: falta EN`);
  }
  for (const slug of byLocale.en) {
    if (!byLocale.es.has(slug)) missing.push(`${collection}/${slug}: falta ES`);
  }
  if (missing.length > 0) {
    throw new Error(`Pares de contenido incompletos (doc 04):\n  ${missing.join('\n  ')}`);
  }
}

// Entradas de una coleccion para un idioma, validando pares antes de filtrar.
export async function getLocalized<C extends LocalizedCollection>(
  collection: C,
  locale: Locale,
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection);
  assertLocalePairs(collection, all);
  return all.filter((entry) => entry.data.locale === locale);
}
