// Diccionario tipado de microtextos de UI y copy corto del home (doc 04). El
// contenido largo (case study, proyectos) vive en src/content/. La paridad ES/EN
// la fuerza el tipo UiKey en build. Sin em dash ni emojis (doc 02); los strings en
// mono (estado, footer) evitan acentos por consistencia con el resto de la tira.

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
    'a11y.nav': 'Navegación principal',
    'a11y.skip': 'Saltar al contenido',
    'a11y.themeToDark': 'Cambiar a tema oscuro',
    'a11y.themeToLight': 'Cambiar a tema claro',
    'a11y.switchLang': 'Switch to English',

    // Hero
    'hero.status': 'en producción · v2026.07',
    'hero.title': 'Llevo sistemas completos de la idea a producción.',
    'hero.subtitle': 'Go · Flutter · React · Cloud (OCI)',
    'hero.ctaCase': 'Ver case study',
    'hero.ctaCv': 'Descargar CV (PDF)',

    // Secciones del home
    'projects.title': 'Proyectos',
    'projects.viewRepo': 'Ver repositorio',
    'skills.title': 'Skills',
    'certifications.title': 'Certificaciones',
    'certifications.view': 'Ver credencial',

    // Case study (home y pagina /acp-suite)
    'caseStudy.eyebrow': 'Case study · Repo privado (proyecto de cliente)',
    'caseStudy.keyNumbers': 'Cifras clave',
    'caseStudy.stack': 'Stack',
    'caseStudy.readFull': 'Leer case study completo',

    // Badges de estado real (doc 05)
    'badge.production': 'en producción',
    'badge.publicRepo': 'repo público',

    // Contacto
    'contact.title': 'Contacto',
    'contact.anchor': 'contacto',
    'contact.lead':
      'Si buscas a alguien que se haga cargo de un problema de punta a punta y lo deje corriendo en producción, escríbeme.',
    'contact.email': 'Enviar correo',

    'footer.status': 'ultima actualizacion 2026-07 · sitio estatico · build ok',
  },
  en: {
    'site.title': 'Angel Barbosa',
    'nav.home': 'Home',
    'nav.caseStudy': 'Case study',
    'nav.contact': 'Contact',
    'a11y.nav': 'Main navigation',
    'a11y.skip': 'Skip to content',
    'a11y.themeToDark': 'Switch to dark theme',
    'a11y.themeToLight': 'Switch to light theme',
    'a11y.switchLang': 'Cambiar a espanol',

    // Hero
    'hero.status': 'in production · v2026.07',
    'hero.title': 'I take complete systems from idea to production.',
    'hero.subtitle': 'Go · Flutter · React · Cloud (OCI)',
    'hero.ctaCase': 'View case study',
    'hero.ctaCv': 'Download CV (PDF)',

    // Home sections
    'projects.title': 'Projects',
    'projects.viewRepo': 'View repository',
    'skills.title': 'Skills',
    'certifications.title': 'Certifications',
    'certifications.view': 'View credential',

    // Case study (home and /acp-suite page)
    'caseStudy.eyebrow': 'Case study · Private repo (client project)',
    'caseStudy.keyNumbers': 'Key numbers',
    'caseStudy.stack': 'Stack',
    'caseStudy.readFull': 'Read the full case study',

    // Real status badges (doc 05)
    'badge.production': 'in production',
    'badge.publicRepo': 'public repo',

    // Contact
    'contact.title': 'Contact',
    'contact.anchor': 'contact',
    'contact.lead':
      "If you're looking for someone who can own a problem end-to-end and leave it running in production, get in touch.",
    'contact.email': 'Send email',

    'footer.status': 'last updated 2026-07 · static site · build ok',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];
