---
title: SoloKey
slug: solokey
locale: en
summary: Zero-trust, offline-first password manager for Android. Local encryption with Argon2id and AES-256-GCM through the Android KeyStore, a built-in TOTP generator, and real-time weak-password auditing.
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
dates: February 2026 - March 2026
featured: true
---

A zero-trust, offline-first password manager for Android: everything stays encrypted on the device, with no server and no cloud sync. Built in Flutter with Clean Architecture to separate domain, data, and presentation.

The vault is protected with an Argon2id-derived key and AES-256-GCM encryption; sensitive material is held in the native Android KeyStore. It includes a built-in TOTP generator for second factors and a real-time weak-password audit that flags reused or fragile credentials.
