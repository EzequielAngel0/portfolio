// Diccionario tipado de microtextos de UI y copy corto del home (doc 04). El
// contenido largo (case study, proyectos) vive en src/content/. La paridad ES/EN
// la fuerza el tipo UiKey en build. Sin em dash ni emojis (doc 02); los strings en
// mono (estado, footer) evitan acentos por consistencia con el resto de la tira.

export const defaultLocale = 'es';
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

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
    'nav.certs': 'Certificaciones',
    'nav.contact': 'Contacto',
    'nav.downloadCv': 'Descargar CV (PDF)',
    'a11y.nav': 'Navegación principal',
    'a11y.skip': 'Saltar al contenido',
    'a11y.themeToDark': 'Cambiar a tema oscuro',
    'a11y.themeToLight': 'Cambiar a tema claro',
    'a11y.switchLang': 'Switch to English',
    'a11y.newTab': 'se abre en una pestaña nueva',
    'a11y.sectionIndex': 'Índice de secciones',

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
    'certifications.viewAll': 'Ver todas las certificaciones',
    'certifications.lead':
      'Formación continua verificable: cada credencial enlaza a su verificación oficial.',
    'certifications.featured': 'Destacadas',
    'certifications.groupCertificaciones': 'Certificaciones',
    'certifications.groupProgramas': 'Programas',
    'certifications.groupFormaciones': 'Formaciones',
    'certifications.groupCursos': 'Cursos',
    'certifications.carouselLabel': 'Certificaciones destacadas',
    'certifications.prev': 'Anterior',
    'certifications.next': 'Siguiente',
    'certifications.status': '{current} de {total}',

    // Case study (home y pagina /acp)
    'caseStudy.eyebrow': 'Case study · Repo privado (proyecto de cliente)',
    'caseStudy.keyNumbers': 'Cifras clave',
    'caseStudy.stack': 'Stack',
    'caseStudy.readFull': 'Leer case study completo',
    'caseStudy.toc': 'Contenido',

    // Capturas y carrusel (aparecen solo cuando hay capturas, D8)
    'screenshots.title': 'Capturas',
    'screenshots.anchor': 'capturas',
    'carousel.prev': 'Captura anterior',
    'carousel.next': 'Captura siguiente',
    'carousel.status': 'Captura {current} de {total}',

    // Badges de estado real (doc 05)
    'badge.production': 'en producción',
    'badge.publicRepo': 'repo público',

    // Contacto
    'contact.title': 'Contacto',
    'contact.anchor': 'contacto',
    'contact.lead':
      'Si buscas a alguien que se haga cargo de un problema de punta a punta y lo deje corriendo en producción, escríbeme.',
    'contact.whatsapp': 'Escríbeme por WhatsApp',

    // 404 (pagina unica bilingue: GitHub Pages sirve un solo 404.html, doc 04)
    'notFound.eyebrow': '404 · ruta no encontrada',
    'notFound.title': 'Esta página no existe.',
    'notFound.body':
      'La ruta que buscas no está en este sitio. Puede venir de un enlace viejo del portfolio anterior.',
    'notFound.home': 'Ir al inicio',
    'notFound.case': 'Ver el case study de ACP',

    'footer.status': 'ultima actualizacion 2026-07',
  },
  en: {
    'site.title': 'Angel Barbosa',
    'nav.home': 'Home',
    'nav.caseStudy': 'Case study',
    'nav.certs': 'Certifications',
    'nav.contact': 'Contact',
    'nav.downloadCv': 'Download CV (PDF)',
    'a11y.nav': 'Main navigation',
    'a11y.skip': 'Skip to content',
    'a11y.themeToDark': 'Switch to dark theme',
    'a11y.themeToLight': 'Switch to light theme',
    'a11y.switchLang': 'Cambiar a espanol',
    'a11y.newTab': 'opens in a new tab',
    'a11y.sectionIndex': 'Section index',

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
    'certifications.viewAll': 'View all certifications',
    'certifications.lead':
      'Verifiable continuous learning: every credential links to its official verification.',
    'certifications.featured': 'Highlights',
    'certifications.groupCertificaciones': 'Certifications',
    'certifications.groupProgramas': 'Programs',
    'certifications.groupFormaciones': 'Learning tracks',
    'certifications.groupCursos': 'Courses',
    'certifications.carouselLabel': 'Featured certifications',
    'certifications.prev': 'Previous',
    'certifications.next': 'Next',
    'certifications.status': '{current} of {total}',

    // Case study (home and /acp page)
    'caseStudy.eyebrow': 'Case study · Private repo (client project)',
    'caseStudy.keyNumbers': 'Key numbers',
    'caseStudy.stack': 'Stack',
    'caseStudy.readFull': 'Read the full case study',
    'caseStudy.toc': 'Contents',

    // Screenshots and carousel (rendered only when screenshots exist, D8)
    'screenshots.title': 'Screenshots',
    'screenshots.anchor': 'screenshots',
    'carousel.prev': 'Previous screenshot',
    'carousel.next': 'Next screenshot',
    'carousel.status': 'Screenshot {current} of {total}',

    // Real status badges (doc 05)
    'badge.production': 'in production',
    'badge.publicRepo': 'public repo',

    // Contact
    'contact.title': 'Contact',
    'contact.anchor': 'contact',
    'contact.lead':
      'If you’re looking for someone who can own a problem end-to-end and leave it running in production, get in touch.',
    'contact.whatsapp': 'Message me on WhatsApp',

    // 404 (single bilingual page: GitHub Pages serves one 404.html, doc 04)
    'notFound.eyebrow': '404 · route not found',
    'notFound.title': 'This page does not exist.',
    'notFound.body':
      'The path you are looking for is not on this site. It may come from an old link to the previous portfolio.',
    'notFound.home': 'Go to the home page',
    'notFound.case': 'View the ACP case study',

    'footer.status': 'last updated 2026-07',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];
