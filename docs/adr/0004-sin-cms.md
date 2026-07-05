# 0004 · Sin CMS: contenido en el repo

- **Fecha:** 2026-07-05
- **Estado:** Aceptada

## Contexto

El sitio actual monta Decap CMS (`public/admin/` + `src/pages/admin.astro`) para editar JSON de certificados. Para un sitio personal de una persona, con el contenido en el mismo repo y deploy por Actions, el CMS agrega superficie de ataque, mantenimiento y un flujo OAuth que GitHub Pages no sirve bien. Ver diagnóstico H6 (doc 01).

## Decisión

Eliminar el CMS. El contenido vive en el repo como content collections tipadas (markdown + JSON) y se edita directamente, con ayuda de este asistente cuando haga falta.

## Alternativas consideradas

- **Mantener Decap CMS** · complejidad y superficie sin retorno para un editor único.
- **CMS headless externo (Sanity, Contentful)** · dependencia y latencia de red para contenido que cambia pocas veces al año.

## Consecuencias

- Se gana: menos dependencias, menos superficie, contenido versionado con el código y validado en build.
- Se paga: editar contenido requiere tocar el repo (aceptable para un editor técnico).
- Queda obligado: esquemas Zod que validen el contenido y el emparejamiento ES/EN en build (doc 04).
