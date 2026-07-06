// Diccionario tipado de microtextos de UI (doc 04). El copy de contenido
// (hero, secciones, case study) vive en src/content/ y se agrega en F2.
// Sin acentos donde el subset/consistencia lo pida; sin em dash ni emojis (doc 02).

export const defaultLocale = 'es';
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: 'Espanol',
  en: 'English',
};

// og:locale y <html lang> por idioma
export const ogLocale: Record<Locale, string> = {
  es: 'es_MX',
  en: 'en_US',
};

export const ui = {
  es: {
    'site.title': 'Angel Barbosa',
    'nav.home': 'Inicio',
    'nav.caseStudy': 'Case study',
    'nav.contact': 'Contacto',
    'a11y.skip': 'Saltar al contenido',
    'a11y.themeToDark': 'Cambiar a tema oscuro',
    'a11y.themeToLight': 'Cambiar a tema claro',
    'a11y.switchLang': 'Switch to English',
    'footer.status': 'ultima actualizacion 2026-07 · sitio estatico · build ok',
  },
  en: {
    'site.title': 'Angel Barbosa',
    'nav.home': 'Home',
    'nav.caseStudy': 'Case study',
    'nav.contact': 'Contact',
    'a11y.skip': 'Skip to content',
    'a11y.themeToDark': 'Switch to dark theme',
    'a11y.themeToLight': 'Switch to light theme',
    'a11y.switchLang': 'Cambiar a espanol',
    'footer.status': 'last updated 2026-07 · static site · build ok',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];
