import { ui, defaultLocale, type Locale, type UiKey } from './ui';

// Idioma de la pagina a partir de la URL (ES sin prefijo, EN bajo /en/).
export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split('/').filter(Boolean)[0];
  return segment === 'en' ? 'en' : 'es';
}

// t(key) tipado por idioma. La paridad ES/EN la garantiza el tipo UiKey en build.
export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key];
  };
}

// Ruta interna construida con BASE_URL (nunca hardcodear dominio ni base; ADR 0007).
// path se pasa sin prefijo de idioma; siempre devuelve con barra final (trailingSlash: 'always').
// localizePath('acp-suite', 'en') -> '/en/acp-suite/'; localizePath('', 'en') -> '/en/'.
export function localizePath(path: string, locale: Locale): string {
  const base = import.meta.env.BASE_URL; // '/' con base en raiz
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const prefix = locale === defaultLocale ? '' : `${locale}/`;
  const joined = `${base}${prefix}${clean}`.replace(/\/{2,}/g, '/');
  return joined.endsWith('/') ? joined : `${joined}/`;
}

// Path del idioma actual sin su prefijo, para emparejar el toggle y los hreflang.
export function stripLocale(url: URL): string {
  const locale = getLocaleFromUrl(url);
  if (locale === 'en') {
    return url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  }
  return url.pathname || '/';
}

// Ruta del CV por idioma (T10): ES en paginas ES, EN en paginas EN. El nombre
// del EN se mantiene estable (Angel_Barbosa_CV.pdf) para no romper links ya
// impresos/compartidos; el ES es un archivo aparte. Via BASE_URL (ADR 0007).
export function cvPath(locale: Locale): string {
  const base = import.meta.env.BASE_URL;
  const file = locale === 'en' ? 'Angel_Barbosa_CV.pdf' : 'Angel_Barbosa_CV_ES.pdf';
  return `${base}cv/${file}`.replace(/\/{2,}/g, '/');
}

// Pares de URL por idioma para el toggle (enlace al equivalente exacto) y hreflang.
export function getAlternates(url: URL): Record<Locale, string> {
  const rest = stripLocale(url);
  return {
    es: localizePath(rest, 'es'),
    en: localizePath(rest, 'en'),
  };
}
