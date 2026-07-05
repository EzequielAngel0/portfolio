# 02 · Contenido y reglas de redacción

Inventario del material fuente, mapeo hacia el sitio y las reglas duras que gobiernan TODO el texto publicado. Fuente de verdad: `perfil-mejorado/` (ignorada en git; el copy final se transcribe a `src/content/`, ver doc 04).

## Inventario de `perfil-mejorado/`

| Archivo | Qué es | Uso en el sitio |
| --- | --- | --- |
| `PROMPT_PORTFOLIO.md` | Brief completo del rediseño: narrativa, datos verificados, reglas, requisitos técnicos | Documento rector; este doc y el 05/06 lo desglosan |
| `CASE_STUDY_ACP_ES_EN.md` | Case study de ACP Suite listo, en ES y EN, con diagrama Mermaid | Página `/acp-suite` y `/en/acp-suite`, maquetado tal cual, sin cambiar datos |
| `CV_contenido_EN.md` | Contenido nuevo del CV (ACP como Experience, skills reagrupadas) | Referencia de narrativa; el PDF descargable sale de aquí |
| `Angel_Barbosa_Resume.pdf` | CV nuevo en PDF | Reemplaza a `public/Angel_Ezequiel_Barbosa_Resume.pdf` como descarga |
| `LinkedIn_ES_EN.md` | Titular y "Acerca de" ES/EN, con correcciones de precisión | Fuente del copy del hero y la sección "sobre mí" |
| `GITHUB_PROFILE_README.md` | README del perfil de GitHub | Post-lanzamiento, fuera del sitio (fase 7) |
| `CV_Angel_Barbosa.html` | CV en HTML | Solo referencia, no se publica |

## Identidad y narrativa (datos canónicos)

- **Nombre:** Angel Ezequiel Barbosa Lomeli
- **Titular:** Software Engineer | Full-Stack Developer | Go · Flutter · React · Cloud (OCI)
- **Posicionamiento:** toma problemas reales y los lleva de requisitos a producción, de punta a punta y frecuentemente en solitario. La prueba es ACP Suite.
- **Contacto:** barbosalomeliangelezequiel@gmail.com · [linkedin.com/in/angelezequiel](https://linkedin.com/in/angelezequiel) · [github.com/EzequielAngel0](https://github.com/EzequielAngel0) · [x.com/Ezequiel27Angel](https://x.com/Ezequiel27Angel) · Jalisco, México
- **Formación:** Desarrollo de Software, CETI (2022-2026, promedio 94.24) · Oracle Next Education (ONE), ruta Back-End, nivel Tech Advanced
- **Idiomas:** Español nativo · Inglés B2

## Secciones del sitio y su fuente

Orden del home (según el brief):

1. **Hero**: titular + posicionamiento + CTAs ("Ver case study", "Descargar CV"). Fuente: `LinkedIn_ES_EN.md` (titular opción A/B) + brief.
2. **Case study ACP Suite** (resumen en home, página completa aparte): fuente `CASE_STUDY_ACP_ES_EN.md`. Cifras clave utilizables: 6 interfaces + 2 APIs · 1 desarrollador · en producción desde junio 2026 · 150+ pruebas · p95 < 100 ms · 0 vulnerabilidades HIGH/CRITICAL · costo de infra cercano a $0.
3. **Proyectos**: SoloKey (password manager Android, zero-trust y offline-first: Flutter, Clean Architecture, Argon2id + AES-256-GCM vía Android KeyStore, generador TOTP, auditoría de contraseñas débiles). Repo público: https://github.com/EzequielAngel0/SoloKey. Diseñar la sección para admitir futuros proyectos.
4. **Skills**: agrupadas, NO como nube de logos suelta:
   - Backend: Go (pgx, sqlc), Java/Spring Boot, REST APIs, PostgreSQL, JWT/RBAC, Clean Architecture
   - Mobile: Flutter/Dart (offline-first, almacenamiento cifrado), Kotlin, Android
   - Web: React, Next.js, TypeScript, Vite, Tailwind CSS, Angular
   - Cloud y DevOps: OCI, Terraform, Ansible, Podman/Docker, GitHub Actions, nginx, Cloudflare, Linux
   - Testing: Playwright, k6, vitest, integration testing en Go, Trivy
5. **Certificaciones** (cada una con botón "ver credencial"):
   - Oracle Cloud Infrastructure 2025 Certified Foundations Associate → [credencial](https://catalog-education.oracle.com/ords/certview/sharebadge?id=9E6AA54792091B7F8EAD1C3D4C0E00B4640759558EA9319193256E348344778E)
   - Google Cloud Cybersecurity Certificate → [credencial](https://www.credly.com/badges/6b602da5-95ea-4328-a5dd-03ba538dfbf9/linked_in_profile)
   - Programa ONE Tech Advanced G9, Back End (Alura Latam / Oracle) → [credencial](https://app.aluracursos.com/program/certificate/8a039e9d-447c-4d64-9a32-40a020f15bf5?lang)
6. **Contacto**: mailto grande + links a LinkedIn, GitHub y X. Sin formulario. GitHub Pages es estático (sin backend); un formulario solo sería posible delegando a un servicio externo (Formspree/Web3Forms), lo que añade dependencia y un request externo, así que se descarta. Correo público: `barbosalomeliangelezequiel@gmail.com`. Queda como opción futura el formulario-vía-servicio si se decide más adelante.

## Reglas duras (no negociables, aplican a TODO el texto del sitio)

1. **Nunca usar la raya larga (em dash)** en ningún texto. Usar coma, dos puntos, paréntesis o "·". (Esta documentación también la respeta.)
2. **Precisión técnica:** NO decir "microservicios" (son 2 APIs en Go). NO mencionar Redis, Supabase ni OAuth2: no están en el stack final. Lo correcto y defendible: "backend en Go con dos servicios", "autenticación propia construida desde cero (JWT RS256 + 2FA TOTP + refresh rotado con revocación real)".
3. **Seguridad operacional:** no publicar versiones exactas de software, hostnames internos, IPs ni ubicación de llaves. Nombrar algoritmos estándar (AES-256-GCM, RS256, TOTP) sí está permitido. **Aplica también a las capturas de pantalla:** las de ACP van anonimizadas (sin datos personales de clientes/pasajeros, sin hosts/IPs/tokens visibles); usar datos de demo o difuminar. Si una captura no se puede anonimizar bien, no se publica.
4. **Bilingüe ES/EN** con toggle; idioma inicial según el navegador.
5. **Solo las métricas listadas** en el case study y el brief. No inventar números, porcentajes ni testimonios.
6. **Cero emojis.** Ni en el contenido del sitio, ni en la UI, ni en commits, ni en esta documentación. Los estados y marcadores se expresan con texto (`[ ]`, `[hecho]`, `TODO`) o iconos SVG propios cuando la UI lo pida, nunca con emoji.
7. **Cero glassmorphism.** Decisión cerrada (ver diagnóstico H1 y doc 05): nada de vidrio esmerilado, blur de fondo, orbes de gradiente ni partículas. La dirección es "papel y tinta" (doc 05).

## Qué se retira a propósito (no reintroducir)

| Se quita | Motivo |
| --- | --- |
| ESP32 / embedded / "combine software and hardware" | Diluye el posicionamiento actual ("llevo plataformas completas a producción") |
| React Native como titular de mobile | Flutter es la carta fuerte, con proyecto en producción |
| Supabase, Redis, OAuth2, "microservicios" | No están en el stack final de ACP; invitan preguntas que restan (regla 2) |
| Cloudflare como "WAF" | Lo preciso: DNS + túnel Zero Trust; el endurecimiento real es nginx (rate limiting, CSP, headers) |

## Tono y escritura de interfaz

Siguiendo la skill `frontend-design` (sección de writing):

- Escribir desde el lado del usuario: los controles dicen exactamente lo que hacen ("Descargar CV (PDF)", "Ver credencial"), voz activa, sentence case.
- El copy es material de diseño, no decoración: cada texto tiene un solo trabajo.
- Estados vacíos y errores dan dirección, no ambiente (aplica poco aquí, pero vale para el 404).
- Específico gana a ingenioso. El titular no es un eslogan: es la respuesta a "¿quién es y qué ha hecho?".
