---
title: SoloKey
slug: solokey
locale: es
summary: Gestor de contraseñas local-first multiplataforma, app Android y companion de escritorio en Windows, con sincronización P2P cifrada de extremo a extremo en red local, sin nube. Argon2id + AES-256-GCM, TOTP integrado y auditoría de seguridad.
stack:
  - Flutter
  - Dart
  - Clean Architecture
  - Argon2id
  - AES-256-GCM
  - X25519
  - TOTP
repoUrl: https://github.com/EzequielAngel0/SoloKey
status: public-repo
dates: Febrero 2026 - Julio 2026
featured: true
---

Gestor de contraseñas local-first construido en Flutter con Clean Architecture: app Android y companion de escritorio en Windows que comparten la misma lógica y bóveda cifrada. Todo vive en los dispositivos, sin servidores en la nube; la sincronización es opcional, punto a punto y cifrada de extremo a extremo sobre la red local (emparejamiento por QR con intercambio X25519, canal AES-256-GCM y resolución de conflictos last-write-wins).

La bóveda se protege con una clave derivada por Argon2id y cifrado AES-256-GCM, con el material sensible en el almacén seguro nativo. Guarda contraseñas, códigos TOTP, llaves SSH, notas y archivos cifrados; el escritorio puede desbloquearse con la biometría del celular (la contraseña maestra nunca viaja). Incluye auditoría de contraseñas repetidas, débiles y filtradas (HaveIBeenPwned con k-anonymity, opt-in) y una red de 510 pruebas automatizadas con piso de cobertura aplicado en CI.
