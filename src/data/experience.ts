// Copy de la pagina Experiencia (/experiencia/): el rol profesional en ACP
// orientado a puesto y logros (LinkedIn-style), que COMPLEMENTA, no repite, el
// detalle tecnico del case study de /acp/ (doc 04). Transcrito del apartado de
// experiencia del CV y de LinkedIn del dueno (perfil-mejorado/, gitignored)
// aplicando las reglas duras del doc 02: sin em dash, sin emojis, el backend se
// describe con exactitud como dos APIs en Go, y solo datos verificables (fechas
// del CV: diciembre 2025 - actualidad). La empresa se nombra igual que en la
// prosa del case study (acp-suite.es/en.md ya cita "Autocamiones del Pacifico").
import type { Locale } from '../i18n/ui';

interface ExperienceCopy {
  lead: string;
  role: string;
  company: string;
  meta: string;
  intro: string;
  achievements: string[];
}

export const experience: Record<Locale, ExperienceCopy> = {
  es: {
    lead: 'Mi rol y lo que entregué en ACP, en clave de puesto y logros. El detalle técnico completo (problema, arquitectura, seguridad) vive en el case study.',
    role: 'Desarrollador Full-Stack',
    company: 'Autocamiones del Pacífico (ACP)',
    meta: 'Desarrollador único · Jalisco, México (remoto) · Diciembre 2025 - Actualidad',
    intro:
      'Desarrollador único de ACP, la plataforma de boletaje y paquetería que reemplazó la operación totalmente manual de una empresa de transporte foráneo de pasajeros, hoy en producción en Oracle Cloud.',
    achievements: [
      'Me hice cargo de todo el ciclo, yo solo: requisitos, arquitectura, código, infraestructura en la nube, despliegue y documentación, sustituyendo una operación de papel por un sistema en producción.',
      'Construí el backend en Go: dos APIs REST (pública e interna con control de acceso por roles), venta transaccional de asientos y auditoría completa de cada cambio administrativo sobre PostgreSQL, con consultas tipadas (sqlc) y migraciones versionadas.',
      'Implementé la autenticación desde cero: JWT (RS256), 2FA TOTP obligatoria (RFC 6238) y refresh tokens rotados con revocación real de sesiones.',
      'Entregué 6 interfaces: panel administrativo en React, sitio público en Next.js y 4 apps Flutter offline-first (taquilla, chofer, paquetería y cliente) que comparten paquetes propios de design system, cliente de API e impresión.',
      'Diseñé la operación offline-first para el personal en campo: colas cifradas (AES-256-GCM), folios generados en el dispositivo, validación QR sin conexión y evidencia de entrega con foto y firma que sincroniza al recuperar señal.',
      'Integré pagos con Stripe, Mercado Pago y PayPal, confirmados únicamente por webhook verificado y con expiración automática de órdenes no pagadas.',
      'Aprovisioné y opero la producción en Oracle Cloud (4 VMs con balanceador, PostgreSQL primario y réplica) con Terraform y Ansible, y monté el CI/CD en GitHub Actions con escaneo de vulnerabilidades como gate obligatorio.',
      'Aseguré la calidad con más de 150 pruebas automatizadas, E2E de API y de interfaz (Playwright), línea base de carga con k6 (API pública p95 < 100 ms) y anonimización de datos personales conforme a la LFPDPPP.',
    ],
  },
  en: {
    lead: 'My role and what I delivered at ACP, framed around the position and its outcomes. The full technical detail (problem, architecture, security) lives in the case study.',
    role: 'Full-Stack Developer',
    company: 'Autocamiones del Pacífico (ACP)',
    meta: 'Sole developer · Jalisco, Mexico (remote) · December 2025 - Present',
    intro:
      'Sole developer of ACP, the ticketing and parcel platform that replaced the fully manual operations of an intercity passenger transport company, live in production on Oracle Cloud today.',
    achievements: [
      'I owned the entire cycle, on my own: requirements, architecture, code, cloud infrastructure, deployment, and documentation, replacing a paper-based operation with a system running in production.',
      'Built the backend in Go: two REST APIs (public, and internal with role-based access control), transactional seat sales, and a full audit trail on every admin change over PostgreSQL, with type-safe queries (sqlc) and versioned migrations.',
      'Implemented authentication from scratch: JWT (RS256), mandatory TOTP 2FA (RFC 6238), and rotated refresh tokens with real server-side session revocation.',
      'Delivered 6 client surfaces: a React admin panel, a Next.js public site, and 4 offline-first Flutter apps (ticket office, driver, parcels, customer) sharing in-house design-system, API-client, and printing packages.',
      'Engineered offline-first operation for field staff: encrypted queues (AES-256-GCM), on-device folio generation, offline QR validation, and photo + signature delivery evidence that syncs on reconnection.',
      'Integrated payments with Stripe, Mercado Pago, and PayPal, confirmed only through verified webhooks and with automatic expiration of unpaid orders.',
      'Provisioned and operate production on Oracle Cloud (4 VMs with a load balancer, PostgreSQL primary and replica) with Terraform and Ansible, and built the CI/CD on GitHub Actions with vulnerability scanning as a mandatory gate.',
      'Ensured quality with 150+ automated tests, API and UI E2E suites (Playwright), a k6 load baseline (public API p95 < 100 ms), and PII anonymization compliant with Mexico’s LFPDPPP.',
    ],
  },
};
