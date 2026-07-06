// Motor de motion (GSAP) como mejora progresiva (doc 05).
// F1: solo la entrada "boot" escalonada del contenido marcado con [data-boot].
// El contenido nace visible en el HTML; GSAP anima DESDE ese estado (from + autoAlpha),
// asi que si el JS no corre, todo sigue legible. Reduced motion -> sin tweens.
import gsap from 'gsap';

const mm = gsap.matchMedia();

mm.add(
  {
    animate: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const { animate } = context.conditions as { animate: boolean; reduce: boolean };
    if (!animate) return; // reduced motion: estado final instantaneo, sin animacion

    const targets = gsap.utils.toArray<HTMLElement>('[data-boot]');
    if (targets.length === 0) return;

    gsap.from(targets, {
      autoAlpha: 0,
      y: 12,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
      clearProps: 'all',
    });
  },
);
