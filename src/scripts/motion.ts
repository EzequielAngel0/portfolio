// Motor de motion (GSAP) como mejora progresiva (doc 05 + ADR 0009).
// Capas: intro "arranque" con el nombre (una vez por sesion), trazo de tinta
// tras el cursor (solo puntero fino), boot del hero, revelado por seccion con
// stagger interno ([data-stagger]), bloques del diagrama y separadores trazados.
// El contenido nace visible en el HTML; GSAP anima DESDE ese estado (from +
// autoAlpha + clearProps), asi que si el JS no corre todo sigue legible. La
// intro y el trazo se INSERTAN por JS: sin JS no existen. Reduced motion ->
// sin tweens ni capas nuevas (el pulso de estado es CSS y lo apaga global.css).
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

    runIntro();
    inkTrail(context);

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
        delay: introDelay(),
      });
    }

    // Revelado por seccion: una vez (once), solo transform/opacity, sin reflujo.
    // El separador superior (border-t) se "traza" a la par via .rule-draw.
    for (const section of gsap.utils.toArray<HTMLElement>('[data-reveal]')) {
      section.classList.add('rule-draw');
      gsap.from(section, {
        autoAlpha: 0,
        y: 16,
        duration: 0.55,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
          onEnter: () => section.classList.add('is-drawn'),
        },
      });
    }

    // Cascadas internas ([data-stagger]): los hijos directos entran en serie
    // cuando el contenedor llega al viewport (tarjetas, cifras, filas, skills).
    // Las listas largas (catalogo de certificaciones) van por lotes de viewport
    // (ScrollTrigger.batch): asi ninguna fila espera una cascada de segundos.
    for (const group of gsap.utils.toArray<HTMLElement>('[data-stagger]')) {
      const items = Array.from(group.children) as HTMLElement[];
      if (items.length < 2) continue;
      if (items.length > 12) {
        gsap.set(items, { autoAlpha: 0, y: 10 });
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.04,
              clearProps: 'all',
            }),
        });
        continue;
      }
      gsap.from(items, {
        autoAlpha: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.05,
        clearProps: 'all',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
    }

    // Diagrama de arquitectura: los nodos entran por bloques y despues las
    // conexiones, como un sistema que se enciende pieza por pieza.
    for (const svg of gsap.utils.toArray<SVGSVGElement>('.diagram-svg')) {
      const nodes = svg.querySelectorAll(':scope > g');
      const edges = svg.querySelectorAll(':scope > path.edge, :scope > text.edge-label');
      if (nodes.length === 0) continue;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 80%', once: true },
      });
      tl.from(nodes, {
        autoAlpha: 0,
        y: 10,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.06,
        clearProps: 'all',
      }).from(
        edges,
        { autoAlpha: 0, duration: 0.5, ease: 'power1.out', stagger: 0.02, clearProps: 'all' },
        '-=0.2',
      );
    }
  },
);

// La intro retrasa el boot del hero para que el revelado encadene con la
// cortina; en visitas siguientes (o si se salto) no hay retraso.
let introRan = false;
function introDelay(): number {
  return introRan ? 0.55 : 0;
}

// Capa 1 (ADR 0009): intro "arranque del sistema". Overlay papel con el nombre
// en mono entrando por caracteres y cortina que se retira revelando el hero ya
// pintado. Una vez por sesion, corta (<1.6 s) y saltable con clic/tecla/rueda.
function runIntro(): void {
  try {
    if (sessionStorage.getItem('intro-seen')) return;
    sessionStorage.setItem('intro-seen', '1');
  } catch {
    return; // sin sessionStorage la intro se repetiria en cada pagina: mejor no
  }
  introRan = true;

  const overlay = document.createElement('div');
  overlay.className = 'intro-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const name = document.createElement('p');
  name.className = 'intro-name';
  for (const char of 'ANGEL BARBOSA') {
    const span = document.createElement('span');
    span.className = 'intro-char';
    span.textContent = char === ' ' ? ' ' : char;
    name.appendChild(span);
  }

  // Reusa la linea de estado real del hero si existe (bilingue, dato real).
  const statusSource = document.querySelector('[data-boot]');
  const status = document.createElement('p');
  status.className = 'intro-status';
  status.textContent = statusSource?.textContent?.trim() ?? '';

  overlay.append(name, status);
  document.body.appendChild(overlay);

  const chars = overlay.querySelectorAll('.intro-char');
  const tl = gsap.timeline({
    onComplete: () => overlay.remove(),
  });
  tl.from(chars, { autoAlpha: 0, y: 14, duration: 0.35, ease: 'power2.out', stagger: 0.035 })
    .from(status, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' }, '-=0.15')
    .to(overlay, { yPercent: -100, duration: 0.55, ease: 'power3.inOut', delay: 0.35 });

  // Saltable: cualquier gesto la termina al instante.
  const skip = () => tl.progress(1);
  const options = { once: true, passive: true } as AddEventListenerOptions;
  window.addEventListener('pointerdown', skip, options);
  window.addEventListener('keydown', skip, options);
  window.addEventListener('wheel', skip, options);
  window.addEventListener('touchstart', skip, options);
}

// Capa 2 (ADR 0009): trazo de tinta tras el cursor. Un solo <path> en una capa
// fija; los puntos expiran (~0.7 s) y la cola se contrae hacia la cabeza. Corre
// en gsap.ticker (el rAF que GSAP ya usa); si no hay puntos, no hace nada.
function inkTrail(context: gsap.Context): void {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'ink-trail');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svgNS, 'path');
  svg.appendChild(path);
  document.body.appendChild(svg);

  const LIFE = 700; // ms de vida de cada punto
  let points: { x: number; y: number; t: number }[] = [];
  let lastD = '';

  const onMove = (event: PointerEvent) => {
    points.push({ x: event.clientX, y: event.clientY, t: performance.now() });
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const update = () => {
    const now = performance.now();
    points = points.filter((p) => now - p.t < LIFE);
    if (points.length < 2) {
      if (lastD !== '') {
        lastD = '';
        path.setAttribute('d', '');
      }
      return;
    }
    // Suavizado con puntos medios cuadraticos: pluma, no poligono.
    const first = points[0]!;
    let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
    for (let i = 1; i < points.length - 1; i++) {
      const p = points[i]!;
      const nextPoint = points[i + 1]!;
      const mx = (p.x + nextPoint.x) / 2;
      const my = (p.y + nextPoint.y) / 2;
      d += ` Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    if (d !== lastD) {
      lastD = d;
      path.setAttribute('d', d);
    }
  };

  gsap.ticker.add(update);
  // Si el contexto se revierte (cambia la media query), limpiar capa y ticker.
  context.add(() => () => {
    gsap.ticker.remove(update);
    window.removeEventListener('pointermove', onMove);
    svg.remove();
  });
}
