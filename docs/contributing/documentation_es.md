---
title: "Documentación"
url: https://fleetbase.io/docs/contributing/documentation
module: contributing
---

# Documentación

Cómo contribuir a la documentación de Fleetbase: corregir errores tipográficos, añadir ejemplos, capturar capturas de pantalla y escribir nuevas páginas.

# Contribuciones a la documentación

La documentación que estás leyendo ahora se encuentra en el
[`fleetbase/fleetbase.io`](https://github.com/elpelaflow/PuntoShop-TMS.io)
repositorio. Cada página es editable. Si algo está mal, no es claro o falta, envía una solicitud de extracción (PR).

## Dónde se encuentra la documentación

```
fleetbase.io/
├── content/
│   └── docs/
│       ├── platform/         # Documentación de la plataforma (esta sección)
│       ├── fleet-ops/        # Documentación de Fleet-Ops
│       ├── ledger/           # Documentación de Ledger
│       ├── community/        # Documentación de la comunidad y soporte
│       ├── contributing/     # ← Aquí estás
│       └── ...
└── public/images/screenshots/
    ├── fleet-ops/
    └── ...
```

Cada página es un archivo
`.mdx`
— Markdown con incrustaciones opcionales de componentes de React.

## Correcciones rápidas

Para un error tipográfico, un enlace roto o una pequeña aclaración, busca la página en GitHub, haz clic en
**Editar este archivo**, realiza el cambio y envía una solicitud de extracción directamente a través de la interfaz de usuario de GitHub. No se requiere configuración local.

En cada página de documentación hay un enlace "Editar esta página" en la parte inferior que te lleva directamente al archivo correcto.

## Configuración local para cambios más importantes

Para cualquier cambio más sustancial: añadir una sección, reorganizar una página, capturar capturas de pantalla, clona el repositorio y ejecuta el sitio localmente.

### Clona el sitio de documentación

```
git clone https://github.com/elpelaflow/PuntoShop-TMS.io.git
cd PuntoShop-TMS.io
```

### Instala las dependencias

```
pnpm install
```

### Ejecuta el servidor de desarrollo

```
pnpm dev
```

Abre
<http://localhost:3000/docs>
y encuentra la página que estás editando. El "hot reload" está activado: tus cambios aparecen a medida que guardas.

### Edita el MDX

Encuentra el archivo bajo
`content/docs/...`
que corresponda a la URL de la página. Realiza tus cambios.

### Verifica que se compile

```
pnpm build
```

Un "build" limpio significa que MDX, frontmatter y enlaces son válidos.

## Convenciones de escritura

### Frontmatter

Cada página comienza con frontmatter:

```
---
title: Título de la página
description: Descripción de una frase utilizada para el SEO y el encabezado de la página.
sidebarTitle: Título corto opcional  # solo si es diferente al título
---
```

La
`description`
debe ser una frase completa: aparece debajo del H1 de la página y como meta-descripción para la búsqueda.

### Tono

Mantén el tono existente:
**directo, sencillo, factual**
. Evita:

* Jerga de marketing ("sin esfuerzo", "potente", "robusto")
* Expresiones de duda ("podrías considerar", "tal vez")
* Frases innecesarias ("en lugar de" → "para"; "debido al hecho de que" → "porque")

### Encabezados

Utiliza el formato de encabezado:
**no Title Case**
:

> ✅ "Configurar campos personalizados"
> ❌ "Configurar Campos Personalizados"

Excepción: Los títulos de página H1 pueden usar cualquiera, pero deben coincidir con la sección en la que te encuentras.

### Muestras de código

* Siempre especifica el lenguaje para el resaltado de sintaxis:

  ```
  ```bash
  pnpm install
  ```
  ```
* Utiliza valores de ejemplo realistas (
  `order_a1b2c3`
  , no
  `order_xxxxx`
  )
* Incluye el lenguaje en el delimitador incluso para la salida simple

### Enlaces

* Los enlaces internos utilizan rutas absolutas desde
  `/docs/`
  :
  `[Fleet-Ops](/docs/fleet-ops)`
* Los enlaces externos se abren en una nueva pestaña automáticamente: no añadas
  `target="_blank"`
* Utiliza texto de enlace descriptivo: nunca "haz clic aquí"

### Imágenes

* Coloca las capturas de pantalla en
  `public/images/screenshots/<área>/<nombre-descriptivo>.webp`
* Utiliza el formato
  `.webp`
  — convierte desde PNG con
  `cwebp -q 85`
* Referencia con rutas absolutas:
  `![Texto alternativo](/images/screenshots/fleet-ops/fleet-ops-orders-list.webp)`
* Incluye texto alternativo significativo que describa lo que muestra la captura de pantalla

## Capturar capturas de pantalla

Si estás añadiendo capturas de pantalla:

* **Resolución**
  : captura a 1440×900 o superior; el sitio escala las capturas para pantallas de alta resolución
* **Elementos de la ventana**
  : oculta a menos que añada contexto (barra de estado, etc.)
* **Zoom del navegador**
  : 100% — el sitio de documentación escala las capturas automáticamente
* **Datos confidenciales**
  : elimina las claves de API, los nombres reales de los clientes, las ubicaciones reales de los conductores
* **Tema**
  : captura en modo oscuro para mantener la coherencia con las capturas de pantalla existentes, a menos que se demuestre explícitamente el modo claro

## Documentación de la API

Las páginas
`/docs/api/*`
están
**generadas automáticamente**
a partir de
el submódulo de Postman
. No las edites directamente: tus cambios se sobrescribirán en el próximo build.

Para mejorar la documentación de la API:

* Para la
  **documentación de los endpoints, parámetros y ejemplos**
  → edita los archivos YAML en
  `postman`
  y envía una solicitud de extracción allí
* Para
  **la renderización, el diseño y la navegación del menú lateral**
  → edita los componentes bajo
  `src/components/api-reference/`
  en este repositorio
* Para
  **la narrativa de introducción / autenticación / errores**
  → edita
  `content/docs/api/index.mdx`
  (esta es la que se escribe a mano)

Consulta
[`scripts/README.md`](https://github.com/elpelaflow/PuntoShop-TMS.io/blob/main/scripts/README.md)
en el repositorio de documentación para la arquitectura completa del generador.

## Qué hace que una solicitud de extracción de documentación sea buena

* **Una página por solicitud de extracción**
  es lo ideal: facilita la revisión
* **Capturas de pantalla**
  para cualquier explicación de la interfaz
* **Un plan de pruebas**
  en la descripción de la solicitud de extracción: "He leído la página en localhost; el contenido de la tabla de contenidos se actualiza; la nueva captura de pantalla se carga; el enlace a /docs/fleet-ops funciona"
* **Sin cambios de formato no relacionados**
  — mantén los cambios enfocados

## Envío

Sigue las mismas convenciones de solicitud de extracción para las contribuciones de código: consulta
[Código →](https://fleetbase.io/docs/contributing/code)
para las convenciones de ramificación, mensajes de commit y formato de la descripción de la solicitud de extracción. Utiliza
`docs(<área>): <qué>`
para el mensaje de commit:

```
docs(fleet-ops): añadir receta para campos personalizados
docs(api): aclarar la verificación de la firma del webhook
docs: corregir enlaces rotos en la sección de comunidad
```