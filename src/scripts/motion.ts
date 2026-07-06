// Motor de motion (GSAP) como mejora progresiva (doc 05).
// Dos gestos: la entrada "boot" escalonada del hero ([data-boot]) y el revelado
// por seccion al scroll ([data-reveal], una sola vez). El contenido nace visible
// en el HTML; GSAP anima DESDE ese estado (from + autoAlpha + clearProps), asi
// que si el JS no corre todo sigue legible. Reduced motion -> sin tweens (el
// pulso del punto de estado es CSS y lo apaga global.css).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add(
  {
    animate: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const { animate } = context.conditions as { animate: boolean; reduce: boolean };
    if (!animate) return; // reduced motion: estado final instantaneo, sin animacion

    // Boot del hero: los elementos entran en secuencia, como un sistema en linea.
    const bootTargets = gsap.utils.toArray<HTMLElement>('[data-boot]');
    if (bootTargets.length > 0) {
      gsap.from(bootTargets, {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'all',
      });
    }

    // Revelado por seccion: una vez (once), solo transform/opacity, sin reflujo.
    for (const section of gsap.utils.toArray<HTMLElement>('[data-reveal]')) {
      gsap.from(section, {
        autoAlpha: 0,
        y: 16,
        duration: 0.55,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      });
    }
  },
);
