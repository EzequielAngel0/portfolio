# 01 · Diagnóstico del sitio actual

Auditoría del portfolio existente (commit `20dbf85`, desplegado en https://ezequielangel0.github.io/portfolio/). Sirve para decidir qué se tira, qué se conserva y por qué el rediseño es desde cero y no incremental.

## Stack actual

| Pieza | Versión | Nota |
| --- | --- | --- |
| Astro | ^4.16 | Una major por detrás (Astro 5 salió en dic. 2024) |
| Tailwind CSS | ^3.4 | Vía `@astrojs/tailwind`, integración deprecada para Tailwind 4 |
| TypeScript | tsconfig base de Astro | Sin `strict` |
| Deploy | GitHub Actions (`withastro/action@v3`) → GitHub Pages | Funciona bien, se conserva |
| CMS | Decap CMS (`public/admin/` + `src/pages/admin.astro`) | Ver hallazgo H6 |

Estructura: 8 componentes `.astro` (Header, Hero, About, Projects, Skills, CertPreview, Contact, Footer), datos en JSON (`src/data/certificados.json`, `emisores.json`, `proyectos.json`, `tags.json`), 3 páginas (`index`, `certificados`, `admin`).

## Hallazgos

### H1. Estética genérica y pesada
El diseño actual es el look "glassmorphism oscuro" que hoy se lee como plantilla generada: 4 orbes de gradiente animados (morado, cyan, esmeralda, rosa), grid de fondo, canvas de partículas con JS propio, gradientes por todos lados. Además casi todo el estilo está inline en [Layout.astro](../../src/layouts/Layout.astro) (colores hardcodeados en atributos `style`), lo que hace imposible tematizar.

### H2. Sin bilingüe ni tema claro
Todo el sitio está solo en español y solo en oscuro (`<html lang="es">`, fondo `#07070d` fijo). El brief exige ES/EN con detección de idioma del navegador y tema claro/oscuro. No hay infraestructura para ninguna de las dos cosas: hay que construirla desde el layout.

### H3. Rendimiento y accesibilidad comprometidos por decoración
- Canvas de partículas + 4 animaciones infinitas de orbes: costo de CPU/GPU y batería sin valor informativo.
- No hay `prefers-reduced-motion`: las animaciones infinitas corren para todo el mundo.
- Texto base `#a1a1aa` sobre fondo animado con orbes: contraste AA no garantizado según qué orbe pase debajo.
- Fuentes desde el CDN de Google Fonts (2 requests externos render-blocking); deberían ser self-hosted.

### H4. SEO casi inexistente
Solo hay `title`, `description` y `author`. Faltan: Open Graph, Twitter cards, canonical, JSON-LD (Person, SoftwareSourceCode), sitemap, robots.txt, hreflang. Para un portfolio cuyo objetivo es ser encontrado y verificado, esto es de lo más rentable de arreglar.

### H5. Contenido desactualizado frente a `perfil-mejorado/`
- No existe el case study de ACP Suite, que es la pieza central del nuevo posicionamiento.
- El README y las secciones aún venden ESP32/embedded y React Native, que la narrativa nueva retira a propósito (ver doc 02).
- El CV publicado (`public/Angel_Ezequiel_Barbosa_Resume.pdf`) es la versión vieja; la nueva es `perfil-mejorado/Angel_Barbosa_Resume.pdf`.
- Faltan la certificación OCI Foundations Associate y el estado final del programa ONE (Tech Advanced).

### H6. Decap CMS: complejidad sin retorno
`public/admin/` + `admin.astro` montan un CMS para editar los JSON. Para un sitio personal de una persona, con el contenido viviendo en el mismo repo y desplegado por Actions, el CMS agrega superficie de ataque, mantenimiento y un flujo de OAuth que GitHub Pages no puede servir bien. Editar markdown/JSON en el repo (con este mismo asistente si hace falta) cubre el caso de uso. **Decisión: se elimina.**

### H7. Basura en la raíz del repo
- `downloaded.html` (43 KB): copia descargada de una página, no es código fuente.
- `remote_cert.json`: dato suelto de un certificado, duplicado de lo que hay en `src/data/`.

Ambos se eliminan en la fase 0 (ver doc 07).

## Qué se conserva

| Elemento | Por qué |
| --- | --- |
| Pipeline de deploy (`.github/workflows/deploy.yml`) | Ya hace build + deploy a Pages correctamente; solo se ajusta si cambia el gestor de paquetes o la versión de Node |
| Pipeline de deploy | Se conserva; el sitio pasa a dominio propio `angelezequiel.dev` con base en raíz (ADR 0007), así que `site`/`base` de `astro.config.mjs` se actualizan (ya no `/portfolio`) |
| `src/data/*.json` | Como referencia durante la migración de contenido (los datos de certificados y emisores se transcriben al nuevo modelo y luego se borran) |
| `public/favicon.svg` | Reemplazable después, no urge |
| Idea de "certificaciones con credencial verificable" | La página `certificados.astro` apunta bien; en el rediseño se integra al home con botón "ver credencial" por certificación |

## Veredicto

Rediseño desde cero justificado: el valor rescatable es el pipeline de deploy y parte de los datos, no el código de UI. El layout mezcla estilo inline con Tailwind, no hay tokens, no hay i18n, no hay tema, y la estética actual va en contra del posicionamiento ("ingeniería seria verificable" no se comunica con orbes y partículas).
