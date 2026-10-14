---
title: "Desarrolladores"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/developers
module: extension-development
---

Vistas de recursos

Catálogo de registros

# Desarrolladores

Cada registro de vistas de recursos para Desarrolladores declara — los nombres de los registros para cada tabla y vista de detalles, donde cada uno está conectado a la fuente de Desarrolladores, y los identificadores incorporados para colocar sus elementos.

# Registros de Desarrolladores

Desarrolladores (
`@fleetbase/dev-engine`
, desde la versión 0.2.17) declara registros para
**5 recursos**. Cada nombre comienza con
`developers:`
y sigue el formato
`developers:<recurso>:<superficie>:<ranura>`
.

La tabla enumera cada recurso y el archivo de origen que lo conecta. Abra un recurso a continuación para obtener sus nombres de registro e identificadores incorporados.

| Recurso | Vista | Tabla | Detalles | Panel lateral |
|---|---|---|---|---|
| [`api-key`](#api-key) | Claves de API | `index.hbs` | — | — |
| [`webhook`](#webhook) | Webhooks | `index.hbs` | `view.js` | — |
| [`event`](#event) | Eventos | `index.hbs` | `view.js` | — |
| [`log`](#log) | Registros de solicitudes | `index.hbs` | `view.js` | — |
| [`socket`](#socket) | Sockets | `index.hbs` | `view.js` | — |

## Recursos

### api-key — Claves de API

### webhook — Webhooks

### event — Eventos

### log — Registros de solicitudes

### socket — Sockets

[IAM

Cada registro de vistas de recursos para IAM declara — los nombres de los registros para cada tabla y vista de detalles, donde cada uno está conectado a la fuente de IAM, y los identificadores incorporados para colocar sus elementos.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam)
[Descripción general

Permita que otras extensiones agreguen columnas, acciones, botones y pestañas a las tablas y vistas de detalles de su propio motor — lo que implica, en cinco pasos, y una lista de verificación.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)