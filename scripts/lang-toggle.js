export function setupLanguageToggle() {
  const translations = {
    en: {
      nav: {
        about: "About",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
        resume: "Resume",
        lang: "🌐 En"
      },
      hero: {
        title: "Hi, I'm Alex, a Product Designer",
        desc: "Crafting intuitive and engaging digital experiences that solve real-world problems."
      },
      about: {
        heading: "About Me",
        paragraph: "I'm a creative professional with a background in design and a knack for coding. I love bringing ideas to life through elegant and user-friendly interfaces. My goal is to create impactful digital solutions that resonate with users and meet their needs."
      },
      projects: {
        heading: "Featured Projects",
        cards: [
          {
            title: "Mobile App for Fitness Tracking",
            desc: "A fitness tracking app designed to help users achieve their health goals."
          },
          {
            title: "Web Platform for E-commerce",
            desc: "An e-commerce platform with a focus on user experience and seamless transactions."
          },
          {
            title: "Mobile App for Social Networking",
            desc: "A social networking app connecting people through shared interests."
          }
        ]
      },
      skills: {
        heading: "Skills",
        items: [
          "UX/UI Design", "Front-end Development", "Responsive Design",
          "User Research", "Prototyping", "Interaction Design"
        ]
      },
      contact: {
        heading: "Contact",
        emailPlaceholder: "Your email",
        messagePlaceholder: "Your message",
        send: "Send Message"
      }
    },
    es: {
      nav: {
        about: "Sobre mí",
        projects: "Proyectos",
        skills: "Habilidades",
        contact: "Contacto",
        resume: "Currículum",
        lang: "🌐 Es"
      },
      hero: {
        title: "Hola, soy Alex, Diseñador de Productos",
        desc: "Diseñando experiencias digitales intuitivas y atractivas que resuelven problemas reales."
      },
      about: {
        heading: "Sobre mí",
        paragraph: "Soy un profesional creativo con experiencia en diseño y afinidad por la programación. Me encanta dar vida a las ideas a través de interfaces elegantes y fáciles de usar. Mi objetivo es crear soluciones digitales impactantes que conecten con los usuarios y satisfagan sus necesidades."
      },
      projects: {
        heading: "Proyectos Destacados",
        cards: [
          {
            title: "App móvil para seguimiento fitness",
            desc: "Una aplicación de seguimiento físico para ayudar a los usuarios a alcanzar sus metas de salud."
          },
          {
            title: "Plataforma web de comercio electrónico",
            desc: "Una plataforma de e-commerce centrada en la experiencia del usuario y transacciones fluidas."
          },
          {
            title: "App móvil de red social",
            desc: "Una aplicación social que conecta personas a través de intereses compartidos."
          }
        ]
      },
      skills: {
        heading: "Habilidades",
        items: [
          "Diseño UX/UI", "Desarrollo Front-end", "Diseño responsivo",
          "Investigación de usuario", "Prototipado", "Diseño de interacción"
        ]
      },
      contact: {
        heading: "Contacto",
        emailPlaceholder: "Tu correo",
        messagePlaceholder: "Tu mensaje",
        send: "Enviar mensaje"
      }
    }
  };

  const langBtn = document.querySelector(".lang-switch");

  function applyLanguage(lang) {
    const t = translations[lang];

    // Navbar
    document.querySelector("a[href='#about']").textContent = t.nav.about;
    document.querySelector("a[href='#projects']").textContent = t.nav.projects;
    document.querySelector("a[href='#skills']").textContent = t.nav.skills;
    document.querySelector("a[href='#contact']").textContent = t.nav.contact;
    document.querySelector("a[href$='.pdf']").textContent = t.nav.resume;
    langBtn.textContent = t.nav.lang;

    // Hero
    document.querySelector(".hero-text h1").textContent = t.hero.title;
    document.querySelector(".hero-text p").textContent = t.hero.desc;

    // About
    document.querySelector("section.about h2").textContent = t.about.heading;
    document.querySelector("section.about p").textContent = t.about.paragraph;

    // Projects
    document.querySelector("section.projects h2").textContent = t.projects.heading;
    const projectCards = document.querySelectorAll(".project-card");
    t.projects.cards.forEach((card, index) => {
      const title = projectCards[index].querySelector("h3");
      const desc = projectCards[index].querySelector("p");
      if (title && desc) {
        title.textContent = card.title;
        desc.textContent = card.desc;
      }
    });

    // Skills
    document.querySelector("section.skills h2").textContent = t.skills.heading;
    const skillSpans = document.querySelectorAll(".skills-grid .skill");
    t.skills.items.forEach((skill, i) => {
      if (skillSpans[i]) skillSpans[i].textContent = skill;
    });

    // Contact
    document.querySelector("section.contact h2").textContent = t.contact.heading;
    document.querySelector("#email").placeholder = t.contact.emailPlaceholder;
    document.querySelector("#message").placeholder = t.contact.messagePlaceholder;
    document.querySelector(".send-button").textContent = t.contact.send;

    localStorage.setItem("lang", lang);
  }

  // Inicializar idioma
  let currentLang = localStorage.getItem("lang") || "en";
  applyLanguage(currentLang);

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    applyLanguage(currentLang);
  });
}
