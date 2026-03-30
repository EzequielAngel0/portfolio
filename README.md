# 🌐 Portfolio — Angel Ezequiel Barbosa Lomelí

Portfolio web personal construido con **Astro** y **Tailwind CSS**, desplegado en GitHub Pages.

## 🧠 Descripción general

Portafolio profesional que presenta mis proyectos, habilidades, certificaciones y trayectoria como **Desarrollador Back-End, Android y Desktop**.

### Tecnologías destacadas
- **C# (.NET / WPF / MVVM)**
- **Kotlin (Android Studio / Firestore)**
- **Lua (Roblox Studio)**
- **Arduino / ESP32**
- **SQL / Firebase**
- **UI/UX · Figma**

---

## 💻 Stack del proyecto

- **[Astro](https://astro.build)** — Framework web estático (Zero JS by default)
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS framework
- **TypeScript** — Tipado estricto en datos y lógica
- **GitHub Pages** — Hosting estático con CI/CD automático

---

## 🚀 Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build local
npm run preview
```

---

## 📁 Estructura del proyecto

```text
src/
├── components/     # Componentes reutilizables (Header, Hero, About, etc.)
├── data/           # Datos de certificados en TypeScript
├── layouts/        # Layout base con fondo animado y meta tags
├── pages/          # Páginas: index.astro y certificados.astro
└── styles/         # CSS global con animaciones personalizadas
public/
├── hero-setup.jpg  # Imagen del hero
├── favicon.svg     # Favicon
└── *.pdf           # Currículum
```

---

## 🔗 Deploy

El deploy a GitHub Pages se ejecuta automáticamente al hacer push a la rama `main` mediante GitHub Actions (`.github/workflows/deploy.yml`).

---

## ✅ Características

- ✅ Diseño responsive con dark mode nativo
- ✅ Animaciones fluidas (blobs, fade-in, gradient shift)
- ✅ Componentes modulares en Astro
- ✅ Certificaciones con enlaces externos (sin archivos locales)
- ✅ SEO optimizado con meta tags
- ✅ Deploy automático a GitHub Pages
- ✅ TypeScript estricto
