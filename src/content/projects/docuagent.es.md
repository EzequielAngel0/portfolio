---
title: DocuAgent
slug: docuagent
locale: es
summary: Agente de IA con RAG para consultar la documentación interna de una empresa. Búsqueda semántica multilingüe, respuestas con citación de fuentes y validación anti-alucinación, en producción sobre Oracle Cloud con demo pública.
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
dates: Junio 2026 - Julio 2026
featured: true
---

Agente de IA que permite a los colaboradores de una empresa consultar la documentación interna (políticas, procedimientos, normativas) desde un chat. El pipeline RAG, orquestado como grafo de estado con LangGraph, embebe la consulta (Cohere Embed v3 multilingüe), recupera candidatos de la base vectorial Qdrant, reordena con Cohere Rerank y genera la respuesta citando documento y página; un validador anti-alucinación fuerza un fallback honesto cuando no hay evidencia suficiente.

El chat responde en streaming por WebSocket y acepta preguntas en español, inglés o portugués. El panel de administración exige login con Cloudflare Turnstile y 2FA TOTP; las cargas de documentos se validan por magic bytes y la entrada se sanitiza contra prompt injection. Los 5 servicios (FastAPI, Next.js, Qdrant, PostgreSQL y el túnel) corren en contenedores sobre una VM ARM de Oracle Cloud con Cloudflare Tunnel como único punto de entrada: la VM no expone ningún puerto a internet.
