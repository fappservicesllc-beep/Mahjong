# The Grand Mahjong Master-Key — Funnel

Landing page bilingüe + checkout que redirige a Shopify, construida con
Vite + React + TypeScript + Tailwind en el frontend y Express en el servidor.

## Documentos

- **`MIGRATION.md`** — cómo migrar a hosting propio: versiones, build, variables
  de entorno, servicios externos y dependencias de HeyLloyd.
- **`HANDOFF.md`** — catálogo completo de permalinks de Shopify, inventario del
  Meta Pixel, assets y URLs en vivo.
- **`.env.example`** — nombres de variables de entorno, sin valores.

## Requisitos

- Node.js 20 o superior (probado en 20.20.2; **no** usar Node 18)
- npm 10 o superior

## Cómo levantarlo en local

```
npm install
npm run dev
```

El sitio queda en http://localhost:5173

## Scripts

| Script          | Qué hace                                                    |
| --------------- | ----------------------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo con Vite en middleware y HMR           |
| `npm run build` | Compila el frontend a `dist/public` y el servidor a `dist`    |
| `npm start`     | Corre la build de producción                                  |
| `npm run db:push` | Aplica `shared/schema.ts` a Postgres (requiere DATABASE_URL) |

## Estructura

```
client/
  index.html            Pixel base de Meta y punto de entrada
  public/               Imágenes del sitio (se sirven desde la raíz)
  src/
    App.tsx             Router (wouter) y disparo de PageView por ruta
    index.css           Tokens de Tailwind y variables de tema
    components/         Modal de salida, ticker, SEO, motivos de tiles
    components/ui/      Primitivas shadcn
    lib/pixel.ts        Helper del Meta Pixel (único dueño de los eventos)
    pages/              Una página por ruta
server/
  index.ts              Arranque de Express + HTTP server
  vite.ts               Middleware de Vite en dev, estáticos en producción
  routes.ts             Rutas de API bajo /api
shared/
  schema.ts             Tablas de Drizzle
scripts/
  make-zip.py           Empaqueta el proyecto en ZIP descargable
```

## Rutas del sitio

| Ruta             | Descripción                           |
| ---------------- | ------------------------------------- |
| `/`              | Redirige a `/english`                 |
| `/english`       | Landing en inglés                     |
| `/espanol`       | Landing en español                    |
| `/checkout`      | Checkout en inglés con order bumps    |
| `/checkout-es`   | Checkout en español con order bumps   |
| `/thank-you`     | Página de agradecimiento en inglés    |
| `/gracias`       | Página de agradecimiento en español   |
| `/master-key`    | Material instruccional en inglés      |
| `/llave-maestra` | Material instruccional en español     |

## Meta Pixel

El ID vive en dos lugares y debe coincidir: el snippet base en
`client/index.html` y la constante `PIXEL_ID` en `client/src/lib/pixel.ts`.

Eventos que dispara el sitio:

- **PageView** — en la carga inicial y en cada cambio de ruta de la SPA
- **ViewContent** — en las landings y los checkouts
- **InitiateCheckout** — en los botones que redirigen a Shopify

`Purchase` **no** se dispara desde este sitio a propósito: la conversión real
la reporta la integración nativa de Shopify. El rastreo automático de Meta
está desactivado con `autoConfig false` antes del `init`.

## Regenerar el ZIP del proyecto

```
python3 scripts/make-zip.py
```

Deja los archivos en `client/public/download/`.
