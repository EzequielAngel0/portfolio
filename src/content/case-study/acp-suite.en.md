---
title: ACP
slug: acp-suite
locale: en
tagline: End-to-end ticketing and parcel platform for an intercity passenger transport company, built by one person and live in production on Oracle Cloud.
keyNumbers:
  - 6 interfaces + 2 APIs
  - 1 developer
  - In production since June 2026
  - 150+ tests
  - p95 < 100 ms
  - 0 HIGH/CRITICAL image vulnerabilities
  - Near-zero infrastructure cost
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

Sole developer · December 2025 - present · In production since June 2026 · Private repository (client project)

## The problem

Autocamiones del Pacífico ran fully manual operations: paper tickets, hand-made cash counts, parcels with no tracking, and no centralized visibility of operations or finances. It needed to digitalize ticket offices, drivers, and parcels under three hard constraints: minimal budget, intermittent connectivity on the road and at rural offices, and thermal printers as the only printing hardware.

## The solution

A monorepo with two Go APIs and six interfaces, one for each real role in the operation:

- **Admin panel (React):** catalog CRUDs, live seat map, comparative reports, time-based refund rules, audit log with a diff of every change, and Excel exports.
- **Public site (Next.js, static export):** origin-to-destination search with real prices, schedules, parcel tracking, and app download; Lighthouse SEO 100.
- **Ticket office app (Flutter, Windows and Android):** seat-level sales, shifts with cash close, encrypted offline queue, and thermal printing.
- **Driver app (Flutter):** manifest, offline QR boarding, rapid on-board sales.
- **Parcels app (Flutter):** registration with computed pricing, delivery with photo and signature evidence, batch arrivals by scanning.
- **Customer app (Flutter):** schedules, prices, and tracking.

The four Flutter apps share in-house packages: a design system, an API client, and an ESC/POS thermal printing library written in pure Dart (USB, network, and Bluetooth, with native QR).

## Architecture

<!-- acp-architecture-svg -->

Design decisions that shaped the project:

- **Two Go binaries, not microservices.** A read-only public API and an internal API with per-namespace RBAC. For a team of one, operational simplicity beats fine-grained service separation.
- **A single PostgreSQL with logical separation.** Domain schemas (operations and identity), least-privilege database roles per service, and row-level security as defense in depth. Type-safe queries generated with sqlc and versioned migrations.
- **Offline-first as a data problem, not a UI problem.** Folios generated on-device and validated server-side, idempotent sales, AES-256-GCM encrypted queues, offline QR ticket validation (ES256 signatures), and state merging on reconnection.
- **Zero inbound ports.** The VMs have no public IPs: traffic enters through an outbound Cloudflare tunnel and operational access is bastion-only. Static content is cached at the edge and rarely touches the origin.

## Security

- Authentication built from scratch: JWT (RS256) with JWKS, mandatory TOTP 2FA for all staff, rotated refresh tokens with real session revocation, and per-user lockout.
- Hardened nginx: per-zone rate limiting, CSP, security headers, request size limits; captcha on login.
- Payments (Stripe, Mercado Pago, PayPal) confirmed exclusively through verified webhooks, with automatic order expiration; public sales are controlled by a reversible feature flag.
- LFPDPPP compliance (Mexico's data protection law): data residency in a Mexican region, scheduled PII anonymization, and a right-to-be-forgotten endpoint.

## Operations

- Infrastructure as code with Terraform and Ansible: 4 VMs + a load balancer sized to fit the provider's free tier, with near-zero infrastructure cost.
- PostgreSQL primary with a streaming replica and PgBouncer; encrypted backups with automated, timed restore drills.
- CI/CD on GitHub Actions: multi-arch builds, vulnerability scanning as a mandatory gate (Trivy, 0 HIGH/CRITICAL), SBOM, and manual rolling deploys.

## Quality

- 150+ automated tests across Go, Flutter, and React.
- A 40-step API E2E suite (shift, sale, manifest, boarding, parcels, refund, negative RBAC).
- Playwright UI E2E, including real 2FA enrollment.
- k6 load baseline: public API p95 under 100 ms, with documented scaling thresholds.

## Lessons learned

1. **Offline-first is designed in the data model.** Idempotency, on-device folios, and queue merging with server state prevented entire classes of duplicates that a "retrying UI" cannot.
2. **What runs in a container gets verified in a container.** Local builds can give false greens; final verification always ran against the real images in a staging environment mirroring production.
3. **Load testing finds the real bottleneck before users do.** A k6 profile showed a single occupancy function concentrated 98% of database time; it is now documented with "if X happens, scale Y" thresholds.
4. **Product decisions must be reversible.** Feature flags and git tags made it possible to pause public sales without deleting code or rewriting anything the day the business asked for it.
