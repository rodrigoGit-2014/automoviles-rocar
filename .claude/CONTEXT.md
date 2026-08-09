# ROCAR — Contexto del proyecto

Landing page para ROCAR, compraventa de automóviles usados en Talca
(1 Norte 1678), fundada en 1986 por Héctor Rodrigo Cáceres Cornejo.
La más antigua de Talca, 40+ años en el rubro.

## Estructura

- `index.html` — página única (hero, vitrina de vehículos, por qué ROCAR,
  historia, ubicación/contacto, footer).
- `css/styles.css` — tokens de diseño en `:root`. Paleta sacada de las
  fotos históricas del local (letrero de zinc pintado, reja turquesa,
  muro azul): sand/paper de fondo, teal y brick de acento, blue-deep para
  secciones oscuras. Tipografía: Big Shoulders (títulos, estilo letrero),
  Public Sans (cuerpo), IBM Plex Mono (precios/specs/eyebrows).
- `js/main.js` — render dinámico de la vitrina desde `data/vehiculos-data.js`,
  filtros por categoría, menú móvil, generación de enlaces `wa.me`,
  formulario rápido que abre WhatsApp, reveal-on-scroll.
- `data/vehiculos-data.js` — inventario editable (array de objetos). **Datos
  de ejemplo, no reales** — hay que reemplazarlos por el stock real.
- `images/*-opt.jpg` — fotos históricas optimizadas (sips: máx 1600px,
  JPEG q68). Originales sin optimizar viven en `fotos/` (~7-8MB c/u,
  excluidas de git y de Vercel — ver `.gitignore` / `.vercelignore`).

## Pendientes / placeholders a confirmar con el cliente

- `js/main.js` → `CONFIG.whatsappNumber` y `CONFIG.phoneDisplay`: número de
  ejemplo (`56900000000` / `+56 9 0000 0000`), reemplazar por el real.
- `data/vehiculos-data.js`: inventario de ejemplo, reemplazar por vehículos
  reales.
- `index.html`, sección `#historia`: las leyendas de las 3 fotos (quién es
  quién) son una inferencia a partir de las imágenes — confirmar con el
  cliente cuál foto corresponde al fundador, cuál al local, etc.
- Horario de atención en `#contacto` es un placeholder.

## Deploy

- Vercel CLI (sin proyecto en Vercel Git Integration, deploy manual con
  `npx vercel --prod` desde esta carpeta).
- Proyecto: `rocar-talca`, org/team `rodrigocaceresv-8934s-projects`.
- URL de Vercel: https://rocar-talca.vercel.app
- Dominio propio: `automoviles-rocar.online` (comprado en Namecheap) +
  `www.automoviles-rocar.online`, agregados al proyecto vía
  `vercel domains add`.
- DNS en Namecheap (Advanced DNS) — registros A (no CNAME, para evitar
  conflicto con el A record):
  - `A @ 76.76.21.21`
  - `A www 76.76.21.21`
- Certificado SSL emitido automáticamente por Vercel tras verificar el DNS.
- Para redeploy tras cambios: `npx vercel --prod` desde la raíz del proyecto.
