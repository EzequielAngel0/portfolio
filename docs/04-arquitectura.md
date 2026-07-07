# 04 · Arquitectura del sitio

## Rutas

| Ruta | Página | Idioma |
| --- | --- | --- |
| `/` | Home: hero, resumen ACP, proyectos, skills, certificaciones destacadas, contacto | ES (idioma por defecto, sin prefijo) |
| `/acp/` | Case study completo de ACP (hasta 2026-07-06 fue `/acp-suite/`; la ruta vieja quedó en 404, sin puente, decisión del dueño) | ES |
| `/certificaciones/` | Catálogo completo de certificaciones (carrusel de destacadas + grupos), agregada en la ronda post-lanzamiento | ES |
| `/en/` | Home | EN |
| `/en/acp/` | Case study | EN |
| `/en/certifications/` | Certifications (slug localizado; el par ES/EN se mapea explícito en `i18n/utils.ts` y en el `serialize` del sitemap) | EN |
| `/404` | Error con dirección (link al home en ambos idiomas) | ES/EN |

Decisiones:

- **Las certificaciones fueron sección del home hasta la ronda post-lanzamiento (2026-07-06): al crecer el inventario (77 credenciales verificables) se promovieron a página propia**, tal como preveía esta nota. El home conserva las 3 destacadas con un enlace "Ver todas".
- **El case study sí es página propia**: tiene profundidad (problema, solución, arquitectura, seguridad, operación, calidad, lecciones), necesita su propio SEO (JSON-LD, OG específico) y es EL link que se comparte con reclutadores.
- Redirect de GitHub Pages para rutas viejas (`/certificados`): no hay redirects de servidor; se deja una página mínima con `<meta http-equiv="refresh">` al home solo si preocupan links externos existentes. Por defecto, no.

## Internacionalización (ES/EN)

Config Astro:

```js
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'en'],
  routing: { prefixDefaultLocale: false },
}
```

- **Contenido**: cada página tiene su archivo por idioma (contenido en colecciones separadas por locale, ver modelo de datos). Los microtextos de UI (nav, botones, labels) viven en `src/i18n/ui.ts` como diccionario tipado.
- **Toggle**: enlace al equivalente exacto de la página en el otro idioma (no al home). Al usarlo se guarda la preferencia en `localStorage` (`lang-pref`).
- **Detección de navegador**: GitHub Pages no puede redirigir en servidor. Script inline mínimo en el `<head>` del home ES: si no hay `lang-pref` guardada y `navigator.language` no empieza con `es`, redirige a la ruta `/en/` equivalente y guarda la preferencia. Nunca se ejecuta en visitas siguientes ni en páginas EN (evita ping-pong).
- **`lang` correcto en `<html>`** por página, y pares `hreflang` (`es`, `en`, `x-default` → ES) en ambas versiones (doc 06).

## Tema claro/oscuro

- Atributo `data-theme="light|dark"` en `<html>`; los tokens CSS cambian por ese atributo (doc 05).
- Script inline anti-FOUC en el `<head>` (antes del CSS): lee `localStorage.theme`; si no existe, usa `prefers-color-scheme`; y si el sistema no expresa preferencia, **claro por defecto** (la identidad base "papel", ver doc 05).
- Toggle en el header: botón accesible (aria-label por idioma), persiste en `localStorage`, sin transición de color global en el cambio (evita el "flash animado").

## Estructura de carpetas propuesta

```text
src/
├── components/
│   ├── ui/            # Piezas: Button, Tag, Badge, Icon, Section, CredentialLink, Carousel (solo con capturas, D8)
│   ├── sections/      # Secciones del home: Hero, CaseStudyTeaser, Projects, Skills, Certifications, Contact
│   ├── case-study/    # CaseStudyArticle.astro: cabecera, corte de caja, TOC y prosa
│   └── diagrams/      # AcpArchitecture.astro: SVG artesanal del diagrama (geometria unica, etiquetas por locale)
├── content/
│   ├── case-study/    # acp-suite.es.md · acp-suite.en.md (frontmatter tipado + cuerpo markdown)
│   └── projects/      # solokey.es.md · solokey.en.md · (futuros)
├── data/
│   ├── certifications.json   # nombre, emisor, año, url de credencial, ids i18n
│   ├── skills.json           # grupos y items (doc 02)
│   └── site.ts               # contacto canónico locale-neutral: email, redes, ubicación (doc 02)
├── i18n/
│   ├── ui.ts          # diccionario tipado de microtextos ES/EN
│   └── utils.ts       # helpers: getLocale, localizePath, alternates
├── layouts/
│   └── Base.astro     # head completo (Seo.astro), scripts de tema/idioma, header, footer
├── components/Seo.astro       # title, description, OG, JSON-LD, canonical, hreflang
├── pages/
│   ├── index.astro
│   ├── acp-suite.astro
│   ├── en/index.astro
│   ├── en/acp-suite.astro
│   └── 404.astro
├── styles/
│   ├── tokens.css     # @theme: colores, tipografía, espaciado, radios (doc 05)
│   └── global.css     # reset ligero, focus visible, reduced motion, utilidades propias
└── assets/
    └── og/            # imágenes OG 1200x630 por página e idioma
public/
├── cv/Angel_Barbosa_CV.pdf    # desde perfil-mejorado/Angel_Barbosa_Resume.pdf
├── favicon.svg · favicon.ico · apple-touch-icon.png
└── robots.txt
```

## Modelo de datos (content collections, esquema Zod)

**`projects`** (markdown por idioma):

```ts
{
  title: string,
  slug: string,            // compartido entre locales para emparejar el toggle
  locale: 'es' | 'en',
  summary: string,         // 1-2 líneas para la tarjeta
  stack: string[],
  repoUrl: string | null,  // null si es repo privado (ACP)
  status: 'production' | 'public-repo',
  dates: string,
  featured: boolean,
  image?: ImageMetadata,   // OPCIONAL: captura/thumbnail (astro:assets); ACP anonimizada (doc 02 regla 3)
  imageAlt?: string,       // alt descriptivo por idioma
}
```

**`case-study`** (markdown por idioma): frontmatter con `title`, `locale`, `tagline`, `keyNumbers: string[]` (solo las cifras autorizadas del doc 02), `stack: string[]`, y `screenshots?: { src: ImageMetadata, alt: string }[]` (galería opcional de capturas anonimizadas de ACP). El cuerpo se maqueta tal cual desde `CASE_STUDY_ACP_ES_EN.md`, sin alterar datos.

**Las imágenes son opcionales y se agregan a futuro** (pendiente D8): las tarjetas y el case study deben verse bien SIN capturas (degradan a diseño tipográfico), y el carrusel solo aparece cuando hay 1+ imágenes. Las imágenes viven en `src/assets/projects/` (optimizadas por `astro:assets`); las de ACP pasan el filtro de anonimización antes de entrar al repo (doc 02, regla 3).

**`certifications.json`**: `[{ id, name, issuer, year, credentialUrl }]` + textos por idioma en `ui.ts` si hiciera falta matizar.

Regla: el emparejamiento ES/EN se hace por `slug`, y el build falla (validación en `content.config.ts`) si un slug existe en un idioma y no en el otro.

## Diagrama de arquitectura (case study)

El Mermaid de `CASE_STUDY_ACP_ES_EN.md` se traduce UNA vez a un SVG artesanal. Implementación (F4): un solo componente `components/diagrams/AcpArchitecture.astro` con la geometría compartida (nodos y flechas como datos) y un diccionario de etiquetas por locale; así "mismos trazos, distintas etiquetas" queda garantizado por construcción, y el SVG va inline, que es lo que permite heredar los tokens del tema. Sustituye a los dos archivos `.svg` estáticos del plan original (un `.svg` externo no hereda variables CSS).

- Colores por variables CSS (hereda tema claro/oscuro), texto real `<text>` (seleccionable, accesible), `role="img"` + `<title>`/`<desc>`.
- Sin librería Mermaid en cliente ni en build: el diagrama es estable, no cambia con frecuencia, y el SVG manual da mejor tipografía y layout que el auto-generado.
- Respetar la regla 3 del doc 02: el diagrama nombra piezas (Cloudflare, nginx, PgBouncer, PostgreSQL), nunca hosts, IPs ni versiones.
- Inserción a mitad del cuerpo: los `.md` del case study llevan el marcador `<!-- acp-architecture-svg -->` bajo "Arquitectura"; la página parte el HTML renderizado en ese marcador e intercala el componente. Si el marcador falta en un idioma, el build falla con error explícito.

## Flujo de contenido desde `perfil-mejorado/`

`perfil-mejorado/` está fuera de git, así que es material de trabajo, no fuente del build:

1. El copy ES/EN se **transcribe** a `src/content/` y `src/i18n/ui.ts` aplicando las reglas del doc 02 (esto sí se versiona: es contenido público del sitio).
2. El PDF nuevo se copia a `public/cv/`.
3. Ante conflicto entre lo transcrito y `perfil-mejorado/`, gana `perfil-mejorado/` y se corrige la transcripción.
