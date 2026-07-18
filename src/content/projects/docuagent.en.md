---
title: DocuAgent
slug: docuagent
locale: en
summary: RAG-powered AI agent for querying a company's internal documentation. Multilingual semantic search, source-cited answers, and anti-hallucination validation, live in production on Oracle Cloud with a public demo.
stack:
  - Python
  - FastAPI
  - LangGraph
  - RAG
  - Qdrant
  - PostgreSQL
  - Next.js
  - Podman
  - OCI
repoUrl: https://github.com/EzequielAngel0/DocuAgent
demoUrl: https://docuagent.angelezequiel.dev
status: production
dates: June 2026 - July 2026
featured: true
---

An AI agent that lets a company's employees query internal documentation (policies, procedures, regulations) through a chat interface. The RAG pipeline, orchestrated as a LangGraph state graph, embeds the query (multilingual Cohere Embed v3), retrieves candidates from the Qdrant vector database, reorders them with Cohere Rerank, and generates the answer citing document and page; an anti-hallucination validator forces an honest fallback when there is not enough evidence.

The chat streams tokens over WebSocket and takes questions in Spanish, English, or Portuguese. The admin panel requires login with Cloudflare Turnstile and TOTP 2FA; document uploads are validated by magic bytes and input is sanitized against prompt injection. The 5 services (FastAPI, Next.js, Qdrant, PostgreSQL, and the tunnel) run in containers on an ARM VM in Oracle Cloud with Cloudflare Tunnel as the only entry point: the VM exposes no ports to the internet.
