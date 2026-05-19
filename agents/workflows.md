# Flujos de Trabajo

## Agregar una nueva sección

1. Crear `sections/nombre-seccion.liquid` con el schema al final (`{% schema %}`)
2. Si necesita JS: crear `assets/nombre-seccion.js` con el guard de carga y el componente Alpine
3. Referenciar el script en `layout/theme.liquid` si debe cargarse en todas las páginas, o
   cargarlo con `deferScriptLoad()` si es opcional
4. Agregar la sección al template JSON correspondiente en `templates/`

## Modificar el carrito

- El drawer del carrito se controla con `Alpine.store('xMiniCart')`
- Para forzar recarga después de una mutación: `Alpine.store('xMiniCart').needReload = true`
- Para mostrar el toast de "agregado": `$store.xCartNoti.setItem(items)`
- Sección del carrito: `sections/cart-drawer.liquid`

## Agregar estilos nuevos

1. Clases utilitarias simples → usar Tailwind con prefijo `tw-` directamente en el Liquid
2. Estilos de componente → `{% style %}` dentro del `.liquid` correspondiente
3. Estilos globales propios → `src/css/main.css` (compilado a `assets/main.css`)
4. Nunca editar `assets/main.css` directamente (es output de Mix)

## Debug en development

```bash
npm run start          # arranca todo (Mix watch + shopify theme dev)
npm run pull           # sincroniza settings_data.json desde el customizer
```

- La URL de preview la entrega `shopify theme dev` al arrancar
- Cambios en `.liquid`, `.json` de templates/sections se reflejan sin rebuild
- Cambios en `src/js/` o `src/css/` requieren que Mix recompile (automático con `npm run start`)

## Deploy a producción

1. `npm run pull` — sincronizar settings recientes
2. Verificar cambios en preview del ambiente development
3. `npm run push` — sube al tema live de development
4. Para producción: publicar el tema desde el admin de Shopify (no hay comando CLI para esto)

## Agregar texto traducible

1. Agregar la key en `locales/en.default.json`
2. Agregar la traducción en `locales/es.json`
3. Usar en Liquid: `{{ 'seccion.key' | t }}`
