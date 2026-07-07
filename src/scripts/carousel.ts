// Logica compartida de carruseles ([data-carousel]): controles prev/next con
// estado anunciado, sync por scroll y arrastre con GSAP Draggable via proxy.
// Extraida de Carousel.astro en T3 para reutilizarla en el carrusel de
// certificaciones sin duplicar codigo. Mejora progresiva: la base es una tira
// con scroll-snap nativo; reduced motion no crea Draggable ni tweens.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const carousels = document.querySelectorAll<HTMLElement>('[data-carousel]');

// gsap y Draggable solo se descargan si hay carrusel y sin reduced motion:
// los controles y el scroll-snap no los necesitan.
const loadGsap =
  carousels.length > 0 && !reduceMotion.matches
    ? Promise.all([import('gsap'), import('gsap/Draggable')]).then(([core, plugin]) => {
        core.default.registerPlugin(plugin.Draggable);
        return { gsap: core.default, Draggable: plugin.Draggable };
      })
    : null;

for (const root of carousels) {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const slides = Array.from(track?.children ?? []) as HTMLElement[];
  if (!track || slides.length === 0) continue;

  const controls = root.querySelector<HTMLElement>('[data-carousel-controls]');
  const status = root.querySelector<HTMLElement>('[data-carousel-status]');
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  const template = root.dataset.statusTemplate ?? '{current} / {total}';

  // Alineacion al INICIO de la tira (snap-align start en el CSS). El modelo
  // centrado anterior fallaba con tracks anchos (varias tarjetas visibles):
  // los targets de los primeros slides daban scroll negativo y "anterior"
  // nunca se movia. offsetLeft relativo al primer slide = target de cada uno;
  // el navegador clampa el scrollTo en los extremos.
  const firstOffset = () => slides[0]!.offsetLeft;
  const scrollTargetFor = (index: number) => slides[index]!.offsetLeft - firstOffset();
  const maxScroll = () => track.scrollWidth - track.clientWidth;
  const atStart = () => track.scrollLeft <= 2;
  const atEnd = () => track.scrollLeft >= maxScroll() - 2;

  const nearestIndex = () => {
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    slides.forEach((_, index) => {
      const distance = Math.abs(track.scrollLeft - scrollTargetFor(index));
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    return best;
  };

  // Indice anunciado: en los extremos se fija a primero/ultimo (con varias
  // tarjetas visibles el "mas cercano" nunca llegaria al ultimo).
  const currentIndex = () => (atEnd() ? slides.length - 1 : atStart() ? 0 : nearestIndex());

  let current = 0;
  const sync = () => {
    const index = currentIndex();
    if (index === current) return;
    current = index;
    if (status) {
      status.textContent = template
        .replace('{current}', String(current + 1))
        .replace('{total}', String(slides.length));
    }
  };

  let scrollTimer = 0;
  track.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(sync, 120);
  });

  const goTo = (index: number) => {
    track.scrollTo({
      left: scrollTargetFor(Math.max(0, Math.min(slides.length - 1, index))),
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
    });
  };
  // Circular (pedido del dueno): al no haber mas a la derecha, "siguiente"
  // vuelve al primero; al estar al inicio, "anterior" salta al ultimo. Por eso
  // los controles nunca se deshabilitan.
  prev?.addEventListener('click', () => (atStart() ? goTo(slides.length - 1) : goTo(nearestIndex() - 1)));
  next?.addEventListener('click', () => (atEnd() ? goTo(0) : goTo(nearestIndex() + 1)));
  controls?.removeAttribute('hidden');

  // Arrastre con Draggable sobre un proxy: el scroll real lo lleva la tira
  // (el DOM de la lista queda intacto) y al soltar se hace tween al slide
  // mas cercano. Con reduced motion no se crea: queda el scroll nativo.
  if (!loadGsap) continue;
  loadGsap.then(({ gsap, Draggable }) => {
    root.dataset.enhanced = '';
    const proxy = document.createElement('div');
    Draggable.create(proxy, {
      type: 'x',
      trigger: track,
      allowNativeTouchScrolling: true,
      onPress() {
        gsap.killTweensOf(track);
        track.classList.add('is-dragging');
      },
      onDrag(this: { deltaX: number }) {
        track.scrollLeft -= this.deltaX;
      },
      onRelease() {
        gsap.to(track, {
          scrollLeft: scrollTargetFor(nearestIndex()),
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => track.classList.remove('is-dragging'),
        });
      },
    });
  });
}

export {};
