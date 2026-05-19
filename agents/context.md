# Contexto del Proyecto

## Qué es este proyecto

Tema Shopify para **MisJoyas** (`misjoyascl.myshopify.com`), tienda chilena de joyería.
Fork del tema upstream **Eurus**. No es una app — es un tema de tienda online.

## Stack

| Capa | Tecnología |
|------|-----------|
| Templating | Liquid (Shopify) |
| Interactividad | Alpine.js (sin React, sin jQuery) |
| CSS | Tailwind CSS con prefijo `tw-` + estilos upstream del tema |
| Build | Laravel Mix → `assets/main.js` y `assets/main.css` |
| CLI | Shopify CLI (`shopify theme dev`) |

## Ambiente de desarrollo

- Store: `misjoyascl.myshopify.com`, environment `development`
- Comandos principales:
  - `npm run start` — Mix + Shopify theme dev en paralelo
  - `npm run pull` — baja última versión del tema desde Shopify
  - `npm run push` — sube al tema live del ambiente development

## Estructura de archivos clave

```
layout/theme.liquid      ← layout principal, inicializa window.Eurus
sections/                ← secciones reutilizables con su JS en assets/
snippets/                ← helpers puros (solo renderizan, no tienen lógica)
templates/               ← JSON que conectan secciones con páginas
assets/theme.js          ← JS upstream del tema (no refactorizar)
assets/theme.css.liquid  ← CSS upstream del tema (no refactorizar)
src/js/main.js           ← JS propio del proyecto (editar libremente)
src/css/main.css         ← CSS propio del proyecto (editar libremente)
config/settings_schema.json ← opciones del customizer de Shopify
locales/en.default.json  ← strings de UI (fuente de verdad)
```

## Límites claros

- `assets/theme.js`, `assets/theme.css.liquid`, `assets/vendors.js` son archivos **upstream**. Solo cambios quirúrgicos mínimos.
- Todo lo nuevo va en `src/js/main.js`, `src/css/main.css`, o en nuevas secciones/snippets.
- El estado del carrito vive en `Alpine.store('xMiniCart')`.
- El toast de "agregado al carrito" usa `Alpine.store('xCartNoti')`.
