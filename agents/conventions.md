# Convenciones de Código

## JavaScript (Alpine.js)

- Toda interactividad usa Alpine.js. No agregar React, Vue ni jQuery.
- Componentes: `Alpine.data('xNombreComponente', () => ({ ... }))`
- Estado global: `Alpine.store('xNombreStore', { ... })`
- Registrar siempre dentro de `document.addEventListener('alpine:init', () => { ... })`
- Guard contra doble carga: `if (!window.Eurus.loadedScript.includes('archivo.js')) { ... }`
- No usar `document.ready` ni `DOMContentLoaded` — usar `alpine:init`

## CSS / Tailwind

- Tailwind tiene prefijo `tw-`. Siempre: `tw-flex`, `tw-text-sm`, `tw-gap-4`, etc.
- Clases sin prefijo pertenecen al tema upstream — no usar en código nuevo.
- Variables CSS del tema base están en `assets/theme.css.liquid`. No duplicarlas.
- Para estilos scoped de una sección, usar `{% style %}` dentro del `.liquid`.

## Liquid

- Configuraciones del merchant: siempre `settings.*` (nunca hardcodear valores).
- Serializar datos para Alpine.js: `{{ variable | json }}` (nunca concatenar strings).
- Texto de UI: siempre `{{ 'key' | t }}` desde `locales/`. No hardcodear español en Liquid.
- `snippets/` son puros: reciben params via `{% render 'snippet', param: value %}` y solo renderizan.

## Commits y PRs

- Cambios en archivos upstream: commit separado con mensaje claro (ej. `fix(upstream): ...`).
- Cambios propios del proyecto: pueden ir juntos.
- No commitear `shopify.theme.toml` (está en `.gitignore`).
- Verificar en preview antes de `npm run push` a producción.

## Naming

- Archivos de sección: `kebab-case.liquid`
- Componentes Alpine: `xPascalCase` (prefijo `x` por convención del tema)
- Stores Alpine: `xPascalCase` (mismo prefijo)
- Clases Tailwind custom: siempre con `tw-`
