// Motor de motion (GSAP) como mejora progresiva (doc 05 + ADR 0009 v2).
// Capas: intro "arranque" con el nombre (una vez por sesion), fondo de
// circuito con senales en movimiento y deriva suave hacia el cursor, boot del
// hero, revelado por seccion con stagger interno ([data-stagger]), bloques del
// diagrama y separadores trazados. El contenido nace visible en el HTML; GSAP
// anima DESDE ese estado (from + autoAlpha + clearProps), asi que si el JS no
// corre todo sigue legible. La intro y el fondo se INSERTAN por JS: sin JS no
// existen. Reduced motion -> sin tweens ni capas nuevas.
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
    circuitBackground(context);

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

// Capa 2 (ADR 0009 v2, eleccion del dueno tras probar y descartar el trazo):
// fondo "circuito del sistema". Una capa fija DETRAS del contenido con rutas
// ortogonales tenues (el lenguaje del diagrama de arquitectura) que siempre
// llenan el fondo; senales de tinta recorren algunas rutas en bucle lento
// (movimiento propio constante) y toda la capa deriva unos pocos px hacia el
// cursor con easing largo (reacciona sin perseguir). Insertada por JS: sin JS
// no existe; con reduced motion no se crea.
function circuitBackground(context: gsap.Context): void {
  const svgNS = 'http://www.w3.org/2000/svg';
  const layer = document.createElement('div');
  layer.className = 'bg-circuit';
  layer.setAttribute('aria-hidden', 'true');

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1440 900');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

  // Rutas ortogonales fijas (disenadas para 1440x900, con sangrado en bordes).
  const routes = [
    'M -60 140 H 260 V 300 H 520',
    'M 1500 180 H 1150 V 80 H 900',
    'M 200 -60 V 180 H 60 V 420',
    'M 1500 520 H 1240 V 700 H 980 V 960',
    'M -60 620 H 180 V 780 H 430',
    'M 700 960 V 760 H 940 V 560 H 1180',
    'M 520 -60 V 120 H 780 V 260',
    'M -60 420 H 320 V 560 H 640 V 640',
    'M 1100 -60 V 200 H 1330 V 360',
    'M 860 380 H 1080 V 480',
    'M 380 960 V 720 H 160',
  ];
  // Indices de rutas que llevan senal viajera (movimiento propio constante).
  const signalRoutes = [0, 3, 5, 7, 8];
  // Nodos en los extremos interiores de las rutas.
  const nodes: [number, number][] = [
    [520, 300],
    [900, 80],
    [60, 420],
    [430, 780],
    [1180, 560],
    [780, 260],
    [640, 640],
    [1330, 360],
    [1080, 480],
    [160, 720],
  ];

  const signalPaths: SVGPathElement[] = [];
  routes.forEach((d, index) => {
    const base = document.createElementNS(svgNS, 'path');
    base.setAttribute('d', d);
    base.setAttribute('class', 'circuit-base');
    base.setAttribute('vector-effect', 'non-scaling-stroke');
    svg.appendChild(base);
    if (signalRoutes.includes(index)) {
      const signal = document.createElementNS(svgNS, 'path');
      signal.setAttribute('d', d);
      signal.setAttribute('class', 'circuit-signal');
      signal.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(signal);
      signalPaths.push(signal);
    }
  });
  for (const [cx, cy] of nodes) {
    const node = document.createElementNS(svgNS, 'circle');
    node.setAttribute('cx', String(cx));
    node.setAttribute('cy', String(cy));
    node.setAttribute('r', '3');
    node.setAttribute('class', 'circuit-node');
    svg.appendChild(node);
  }

  layer.appendChild(svg);
  document.body.appendChild(layer);

  // Senales: un guion corto recorre cada ruta en bucle lento y desfasado.
  signalPaths.forEach((path, index) => {
    const length = path.getTotalLength();
    const dash = 90;
    path.style.strokeDasharray = `${dash} ${length}`;
    gsap.fromTo(
      path,
      { strokeDashoffset: dash },
      {
        strokeDashoffset: -length,
        duration: 14 + index * 5,
        ease: 'none',
        repeat: -1,
        delay: index * 2.2,
      },
    );
  });

  // Deriva suave hacia el cursor (solo puntero fino): maximo ~12 px con easing
  // largo, reacciona sin perseguir (pedido del dueno).
  if (window.matchMedia('(pointer: fine)').matches) {
    const xTo = gsap.quickTo(layer, 'x', { duration: 1.8, ease: 'power3' });
    const yTo = gsap.quickTo(layer, 'y', { duration: 1.8, ease: 'power3' });
    const onMove = (event: PointerEvent) => {
      xTo((event.clientX / window.innerWidth - 0.5) * 24);
      yTo((event.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    context.add(() => () => window.removeEventListener('pointermove', onMove));
  }

  // Parallax minimo al scroll: profundidad sin marear (tambien en tactil).
  gsap.to(svg, {
    yPercent: -2.5,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.8 },
  });

  context.add(() => () => layer.remove());
}
