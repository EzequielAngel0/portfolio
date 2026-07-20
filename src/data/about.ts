// Copy de la pagina Sobre mi (doc 04): prosa larga y estructurada, transcrita y
// adaptada del "Acerca de" de LinkedIn y el README de perfil de GitHub del dueno
// (material ya redactado por el, en perfil-mejorado/, fuera de git) aplicando las
// reglas duras del doc 02: sin em dash, sin emojis, precision tecnica (el backend
// se describe con exactitud como dos APIs en Go, sin agregar piezas de stack que
// no existen) y solo datos verificables. Es contenido publico del sitio, por eso
// se versiona aqui. La microcopia global
// (nav, botones) vive en i18n/ui.ts; los enlaces cruzados los arma el componente.
import type { Locale } from '../i18n/ui';

// Un frente de "enfoque actual": lo que YA estudia va como real; lo que explora,
// como interes y aprendizaje (nunca como aptitud dominada). El stage lo marca con
// texto, no solo con color (doc 05).
interface Thread {
  stage: string;
  title: string;
  body: string;
  topics: string[];
}

interface AboutCopy {
  lead: string;
  intro: string[];
  journeyTitle: string;
  journey: string[];
  focusTitle: string;
  focusIntro: string;
  threads: Thread[];
  closingTitle: string;
  closing: string;
  photoAlt: string;
}

export const about: Record<Locale, AboutCopy> = {
  es: {
    lead: 'Diseño, construyo y opero sistemas completos: de la base de datos a la interfaz que toca el usuario, y de la primera línea de código al servidor en producción.',
    intro: [
      'Lo que más disfruto es tomar un problema real y desordenado y convertirlo en algo que funciona, escala y se puede operar y mantener en el tiempo. Trabajo cómodo en todo el stack (backend, web y móvil), con arquitectura limpia y seguridad por defecto.',
      'Mi forma de trabajar es de punta a punta y, casi siempre, en solitario: me hago cargo del backend, las interfaces, la infraestructura y el despliegue, y los construyo pensando en que serán atacados.',
    ],
    journeyTitle: 'Trayectoria',
    journey: [
      'Mi mejor prueba es ACP, una plataforma de boletaje y paquetería que desarrollé de principio a fin, yo solo, para una empresa de transporte foráneo de pasajeros, y que hoy corre en producción en Oracle Cloud. Reemplazó una operación totalmente manual con un backend en Go (dos APIs: pública e interna con control de acceso por roles), seis interfaces (panel administrativo en React, sitio público en Next.js y cuatro apps Flutter offline-first) e infraestructura como código sobre OCI.',
      'Reforcé esas bases al graduarme del programa Oracle Next Education (ONE), en su ruta Back-End y nivel Tech Advanced con OCI y MySQL, y al certificarme como OCI Foundations Associate. En paralelo estudio en el CETI, donde egresé como Tecnólogo en Desarrollo de Software con promedio de 94.50 y continúo con la ingeniería.',
    ],
    focusTitle: 'Enfoque actual',
    focusIntro:
      'Creo firmemente en el aprendizaje continuo. Ahora mismo avanzo en dos frentes que amplían lo que ya hago. Lo que ya estudio lo cuento como tal; lo que exploro, como interés y aprendizaje, no como algo dominado.',
    threads: [
      {
        stage: 'En aprendizaje',
        title: 'Ciberseguridad y AppSec',
        body: 'Sumo la perspectiva del atacante para auditar y endurecer lo que construyo. Tras completar el certificado de Google Cloud Cybersecurity, curso la ruta de Analista Junior en Ciberseguridad y el curso Ethical Hacker de Cisco, además de la PortSwigger Web Security Academy, con práctica en TryHackMe y Hack The Box. El enfoque es seguridad web y de APIs (OWASP, inyección, SSRF, fallos de autenticación) aplicada a mis propios sistemas en producción.',
        topics: ['OWASP', 'Web y APIs', 'PortSwigger', 'TryHackMe', 'Hack The Box'],
      },
      {
        stage: 'En exploración',
        title: 'Hardware y maker',
        body: 'Mi formación en el CETI no es solo software: incluye electrónica de base, sistemas embebidos, IoT y seguridad de hardware. Un ejemplo es Purificador, un proyecto escolar de purificador de aire IoT (app móvil, firmware en un microcontrolador ESP32, sensor de gas y control de un ventilador por PWM). A partir de ahí exploro el diseño de PCBs, el modelado e impresión 3D y el CAD, la domótica, la fabricación digital, la robótica y la conectividad IoT avanzada (LoRa, Matter), con la meta de llevar un prototipo hasta un producto fabricable. El marco es simple: de la PCB a la nube.',
        topics: ['Embebido', 'IoT', 'ESP32', 'PCB', 'CAD y 3D', 'LoRa · Matter'],
      },
    ],
    closingTitle: 'Hablemos',
    closing:
      'Estoy abierto a nuevas oportunidades como desarrollador. Si buscas a alguien que se haga cargo de un problema de punta a punta y lo deje corriendo en producción, escríbeme.',
    photoAlt: 'Retrato de Angel Ezequiel Barbosa Lomeli',
  },
  en: {
    lead: 'I design, build, and operate complete systems: from the database to the interface the end user touches, and from the first line of code to the server running in production.',
    intro: [
      'What I enjoy most is taking a real, messy problem and turning it into something that works, scales, and can be operated and maintained over time. I am comfortable across the full stack (backend, web, and mobile), leaning on clean architecture and security by default.',
      'The way I work is end-to-end and, most of the time, solo: I own the backend, the interfaces, the infrastructure, and the deployment, and I build them expecting they will be attacked.',
    ],
    journeyTitle: 'Background',
    journey: [
      'My strongest proof is ACP, a ticketing and parcel platform I built end-to-end, on my own, for an intercity passenger transport company, and which is live in production on Oracle Cloud today. It replaced fully manual operations with a Go backend (two APIs: public, and internal with role-based access control), six client surfaces (a React admin panel, a Next.js public site, and four offline-first Flutter apps), and infrastructure as code on OCI.',
      'I reinforced those foundations by graduating from the Oracle Next Education (ONE) program, Back-End track and Tech Advanced tier with OCI and MySQL, and by earning the OCI Foundations Associate certification. In parallel I study at CETI, where I graduated as a Software Development Technologist with a 94.50 average and continue with the engineering degree.',
    ],
    focusTitle: 'Current focus',
    focusIntro:
      'I am a firm believer in continuous learning. Right now I am moving forward on two fronts that extend what I already do. What I already study I present as such; what I explore, as interest and learning, not as something mastered.',
    threads: [
      {
        stage: 'Learning',
        title: 'Cybersecurity and AppSec',
        body: 'I am adding an attacker’s perspective to audit and harden what I build. After completing the Google Cloud Cybersecurity certificate, I am working through Cisco’s Junior Cybersecurity Analyst career path and Ethical Hacker course, alongside the PortSwigger Web Security Academy, with hands-on practice on TryHackMe and Hack The Box. The focus is web and API security (OWASP, injection, SSRF, authentication flaws) applied to my own production systems.',
        topics: ['OWASP', 'Web and APIs', 'PortSwigger', 'TryHackMe', 'Hack The Box'],
      },
      {
        stage: 'Exploring',
        title: 'Hardware and maker',
        body: 'My CETI education is not only software: it includes foundational electronics, embedded systems, IoT, and hardware security. One example is Purificador, a school project for an IoT air purifier (mobile app, firmware on an ESP32 microcontroller, a gas sensor, and PWM fan control). From there I explore PCB design, 3D modeling and printing and CAD, home automation, digital fabrication, robotics, and advanced IoT connectivity (LoRa, Matter), with the goal of taking a prototype all the way to a manufacturable product. The framing is simple: from the PCB to the cloud.',
        topics: ['Embedded', 'IoT', 'ESP32', 'PCB', 'CAD and 3D', 'LoRa · Matter'],
      },
    ],
    closingTitle: 'Let’s talk',
    closing:
      'I am open to new opportunities as a developer. If you are looking for someone who can own a problem end-to-end and leave it running in production, get in touch.',
    photoAlt: 'Portrait of Angel Ezequiel Barbosa Lomeli',
  },
};
