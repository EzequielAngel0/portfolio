---
title: ACP Suite
slug: acp-suite
locale: es
tagline: Plataforma completa de boletaje y paquetería para una empresa de transporte foráneo de pasajeros, construida por una sola persona y en producción en Oracle Cloud.
keyNumbers:
  - 6 interfaces + 2 APIs
  - 1 desarrollador
  - En producción desde junio 2026
  - 150+ pruebas
  - p95 < 100 ms
  - 0 vulnerabilidades HIGH/CRITICAL en imágenes
  - Costo de infraestructura cercano a $0
stack:
  - Go
  - PostgreSQL
  - Flutter/Dart
  - React
  - Next.js
  - TypeScript
  - Terraform
  - Ansible
  - Podman
  - nginx
  - Cloudflare
  - OCI
  - GitHub Actions
  - Playwright
  - k6
---

Desarrollador único · Diciembre 2025 - presente · En producción desde junio de 2026 · Repositorio privado (proyecto de cliente)

## El problema

Autocamiones del Pacífico operaba de forma totalmente manual: venta de boletos en papel, cortes de caja a mano, paquetería sin rastreo y sin visibilidad centralizada de la operación ni de las finanzas. Necesitaba digitalizar taquillas, choferes y paquetería con tres restricciones duras: presupuesto mínimo, conectividad intermitente en carretera y en taquillas rurales, e impresoras térmicas como único hardware de impresión.

## La solución

Un monorepo con dos APIs en Go y seis interfaces, cada una para un rol real de la operación:

- **Panel administrativo (React):** CRUDs del catálogo, mapa de asientos en vivo, reportes comparativos, reembolsos con reglas por horario, auditoría con diff de cada cambio y exportación a Excel.
- **Sitio público (Next.js, export estático):** buscador origen a destino con precios reales, horarios, rastreo de paquetes y descarga de la app; SEO 100 en Lighthouse.
- **App de taquilla (Flutter, Windows y Android):** venta con selección de asiento, turnos con corte de caja, cola offline cifrada e impresión térmica.
- **App de chofer (Flutter):** manifiesto, abordaje con escaneo QR sin conexión, venta a bordo en ráfaga.
- **App de paquetería (Flutter):** registro con tarifa calculada, entrega con foto y firma como evidencia, llegadas en lote por escaneo.
- **App de cliente (Flutter):** horarios, precios y rastreo.

Las cuatro apps Flutter comparten paquetes propios de design system, cliente de API y una biblioteca de impresión térmica ESC/POS escrita en Dart puro (USB, red y Bluetooth, con QR nativo).

## Arquitectura

<!-- acp-architecture-svg -->

Decisiones de diseño que definieron el proyecto:

- **Dos binarios en Go, no microservicios.** Una API pública de solo lectura y una API interna con RBAC por namespace. Para un equipo de una persona, la simplicidad operativa vale más que la separación fina de servicios.
- **Una sola PostgreSQL con separación lógica.** Esquemas por dominio (operación e identidad), roles de base de datos de mínimo privilegio por servicio y row-level security como defensa en profundidad. Consultas tipadas generadas con sqlc y migraciones versionadas.
- **Offline-first como problema de datos, no de interfaz.** Folios generados en el dispositivo y validados por el servidor, ventas idempotentes, colas cifradas con AES-256-GCM, validación de boletos QR sin conexión (firmas ES256) y fusión de estado al recuperar señal.
- **Cero puertos de entrada.** Las VMs no tienen IP pública: el tráfico entra por túnel saliente de Cloudflare y el acceso operativo es solo por bastión. El estático se cachea en el edge y casi no toca el origen.

## Seguridad

- Autenticación propia construida desde cero: JWT (RS256) con JWKS, 2FA TOTP obligatoria para todo el personal, refresh tokens rotados con revocación real de sesiones y bloqueo por intentos fallidos.
- nginx endurecido: rate limiting por zona, CSP, headers de seguridad, límites de tamaño de petición; captcha en el login.
- Pagos (Stripe, Mercado Pago, PayPal) confirmados exclusivamente por webhook verificado, con expiración automática de órdenes; la venta pública se controla con un feature flag reversible.
- Cumplimiento LFPDPPP: datos residentes en región de México, anonimización programada de datos personales y endpoint de derecho al olvido.

## Operación

- Infraestructura como código con Terraform y Ansible: 4 VMs + load balancer dimensionados dentro del free tier del proveedor, con costo de infraestructura cercano a cero.
- PostgreSQL primario con réplica streaming y PgBouncer; respaldos cifrados con simulacros de restauración automatizados y cronometrados.
- CI/CD en GitHub Actions: builds multi-arquitectura, escaneo de vulnerabilidades como gate obligatorio (Trivy, 0 HIGH/CRITICAL), SBOM y despliegue rolling manual.

## Calidad

- Más de 150 pruebas automatizadas entre Go, Flutter y React.
- Suite E2E de API de 40 pasos (turno, venta, manifiesto, abordaje, paquetería, reembolso, RBAC negativo).
- E2E de interfaz con Playwright, incluyendo el enrolamiento 2FA real.
- Línea base de carga con k6: API pública con p95 menor a 100 ms, con umbrales de escalado documentados.

## Lecciones aprendidas

1. **Offline-first se diseña en el modelo de datos.** La idempotencia, los folios en dispositivo y la fusión de colas con el estado del servidor evitaron todas las clases de duplicados que una interfaz "con reintentos" no puede evitar.
2. **Lo que corre en contenedor se verifica en contenedor.** El build local puede dar falsos verdes; la verificación final siempre fue contra las imágenes reales en un entorno de staging espejo de producción.
3. **Las pruebas de carga encuentran el cuello real antes que los usuarios.** Un perfil con k6 mostró que una sola función de ocupación concentraba el 98% del tiempo de base de datos; quedó documentada con umbrales del tipo "si pasa X, escala Y".
4. **Las decisiones de producto deben ser reversibles.** Feature flags y tags de git permitieron pausar la venta pública sin borrar código ni reescribir nada el día que el negocio lo pidió.
