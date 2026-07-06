---
title: SoloKey
slug: solokey
locale: es
summary: Gestor de contraseñas para Android, zero-trust y offline-first. Cifrado local con Argon2id y AES-256-GCM vía el Android KeyStore, generador TOTP integrado y auditoría de contraseñas débiles en tiempo real.
stack:
  - Flutter
  - Dart
  - Clean Architecture
  - Argon2id
  - AES-256-GCM
  - Android KeyStore
  - TOTP
repoUrl: https://github.com/EzequielAngel0/SoloKey
status: public-repo
dates: Febrero 2026 - Marzo 2026
featured: true
---

Gestor de contraseñas para Android con enfoque zero-trust y offline-first: todo vive cifrado en el dispositivo, sin servidor ni sincronización en la nube. Construido en Flutter con Clean Architecture para separar dominio, datos y presentación.

La bóveda se protege con una clave derivada por Argon2id y cifrado AES-256-GCM; el material sensible se resguarda en el Android KeyStore nativo. Incluye un generador TOTP integrado para segundos factores y una auditoría de contraseñas débiles en tiempo real que alerta sobre credenciales reutilizadas o frágiles.
