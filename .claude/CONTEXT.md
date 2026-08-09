# ROCAR — Contexto del proyecto

Landing page para ROCAR, compraventa de automóviles usados en Talca
(1 Norte 1678), fundada en 1986 por Héctor Rodrigo Cáceres Cornejo.
La más antigua de Talca, 40+ años en el rubro.

## Concepto de diseño

**"El mismo patio, desde 1986."** El diferenciador real no es un
eslogan: son las fotografías del mismo terreno, el mismo letrero
pintado a mano y el fundador, hace cuarenta años. La mayoría de las
automotoras usa fotos de stock; ROCAR tiene un archivo. Por eso el
archivo *es* el hero: una fotografía histórica a sangre completa con
la tesis anclada abajo, y una franja oscura debajo que funciona como
ficha de registro del negocio.

Se descartó el "letrero de chapa corrugada" dibujado en CSS de la
primera versión: existiendo la fotografía del letrero real, la
imitación al lado sobraba.

## Sistema

- **Color** — sacado de las propias fotos. Base gris frío del hormigón
  del patio (`--patio #e8eae7`), verde de la reja como color de marca
  (`--verde #2e7d71`, `--verde-hondo #14403a`), y el rojo del letrero
  pintado (`--rojo #b03f2d`) reservado sólo para los precios.
  Deliberadamente NO se usa crema + terracota.
- **Tipografía** — `Archivo` variable en su eje ancho (`wdth` 105–118)
  para títulos: letras anchas y plantadas. `Instrument Sans` para
  lectura, `DM Mono` para datos, fichas y epígrafes.
- **Movimiento** — una sola secuencia orquestada al cargar el hero
  (la foto se asienta, el texto sube escalonado) y estados hover
  discretos. Nada más. `prefers-reduced-motion` respetado.

## Estructura

- `index.html` — hero, ficha de registro, vitrina, cómo funciona,
  historia, visítanos, pie.
- `css/styles.css` — tokens en `:root`. Un solo `.band` controla el
  ritmo vertical; los modificadores sólo cambian el fondo, para que
  los paddings nunca compitan.
- `js/main.js` — vitrina dinámica, filtros, barra sólida al hacer
  scroll, menú móvil, enlaces `wa.me` y formulario que abre WhatsApp.
- `data/vehiculos-data.js` — inventario editable. Cada objeto acepta
  `foto` (ruta a la foto real del auto); si es `null` se dibuja una
  silueta tenue según la categoría.
- `images/rocar-{1,2,3}-{1100,1900}.jpg` — las tres fotos históricas,
  recortadas para eliminar el mantel y los bordes del papel, en dos
  resoluciones para `srcset` (~850 KB en total). Los originales
  (~22 MB) viven en `fotos/`, fuera de git y de Vercel.

### Detalles no obvios del CSS

- `.hero` usa `min-height: clamp(520px, 84svh, 900px)`. No sirve
  `min-height` + `max-height`: cuando el mínimo supera al máximo gana
  el mínimo, y en pantallas altas `cover` recortaba la foto hasta
  perder el letrero.
- En ≤760px el hero se apila (foto completa sin recortar, texto
  debajo) y la barra pasa a ser sólida siempre, porque el logo blanco
  no se leía sobre la chapa clara. `#contenido` compensa con
  `padding-top`.
- `.story p` usa una medida en px, no en `ch`: con Instrument Sans el
  `ch` resulta mucho más ancho de lo esperado (62ch ≈ 890px).

## Pendientes / placeholders a confirmar con el cliente

- `js/main.js` → `CONTACTO.whatsapp` y `CONTACTO.telefono`: número de
  ejemplo (`56900000000`), reemplazar por el real.
- `data/vehiculos-data.js`: inventario de ejemplo, reemplazar por el
  stock real y agregar fotos de los autos en `foto`.
- Epígrafes de las tres fotos en `#historia`: están redactados de
  forma descriptiva a propósito, sin afirmar quién aparece en cada
  una. Confirmar con el cliente antes de nombrar a nadie.
- Horario de atención (lun a sáb, 10:00–19:00) es un supuesto.

## Deploy

- Vercel CLI, deploy manual: `npx vercel --prod` desde la raíz.
  (Si responde `Not authorized`, reintentar: suele pasar al primer
  intento tras un rato sin usar la CLI.)
- Proyecto `rocar-talca`, org `rodrigocaceresv-8934s-projects`.
- URLs: https://rocar-talca.vercel.app y https://automoviles-rocar.online
- Dominio en Namecheap, con registros A `@` y `www` → `76.76.21.21`.
  Certificado SSL emitido por Vercel.
- Repo: git@github.com:rodrigoGit-2014/automoviles-rocar.git
