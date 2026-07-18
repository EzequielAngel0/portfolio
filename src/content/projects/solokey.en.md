---
title: SoloKey
slug: solokey
locale: en
summary: Local-first, cross-platform password manager, an Android app plus a Windows desktop companion, with end-to-end encrypted P2P sync over the local network, no cloud. Argon2id + AES-256-GCM, built-in TOTP, and security auditing.
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
dates: February 2026 - July 2026
featured: true
---

A local-first password manager built in Flutter with Clean Architecture: an Android app and a Windows desktop companion sharing the same logic and encrypted vault. Everything lives on the devices, with no cloud servers; sync is optional, peer-to-peer, and end-to-end encrypted over the local network (QR pairing with X25519 key exchange, an AES-256-GCM channel, and last-write-wins conflict resolution).

The vault is protected with an Argon2id-derived key and AES-256-GCM encryption, holding sensitive material in the native secure store. It stores passwords, TOTP codes, SSH keys, notes, and encrypted files; the desktop can be unlocked with the phone's biometrics (the master password never travels). It includes auditing for reused, weak, and breached passwords (HaveIBeenPwned with k-anonymity, opt-in) and a net of 510 automated tests with a coverage floor enforced in CI.
