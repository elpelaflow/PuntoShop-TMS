---
title: "Descripción general"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue
module: extension-development
---

Vistas de recursos

Catálogo de registros

# Descripción general

Cada registro de vista de recursos, declarado por los motores incorporados, tiene una página por motor, con los nombres de registro, los ids incorporados y un enlace a la fuente que lo conecta.

# Catálogo de registros

El catálogo enumera todos los registros declarados por los motores incorporados. Úselo para encontrar:

* **El nombre del registro**
  para la vista que desea agregar;
* **Los ids incorporados**
  en cada slot, para colocar sus elementos
  `antes`
  o
  `después`
  ;
* **El archivo de origen**
  que renderiza la vista, para ver exactamente cómo está conectada.

| Motor | Recursos | Página |
|---|---|---|
| Fleet-Ops | 25 | [Registros de Fleet-Ops](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops) |
| Ledger | 7 | [Registros de Ledger](https://fleetbase.io/docs/extension-development/resource-views/catalogue/ledger) |
| IAM | 4 | [Registros de IAM](https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam) |
| Desarrolladores | 5 | [Registros de Desarrolladores](https://fleetbase.io/docs/extension-development/resource-views/catalogue/developers) |

## Leer la página de un motor

Cada página comienza con una tabla de sus recursos:

| Columna | Muestra |
|---|---|
| **Recurso** | El nombre del recurso en el registro, que enlaza a su sección a continuación |
| **Vista** | La pantalla en la que se encuentra, tal como la conocen los usuarios |
| **Tabla, Detalles, Barra lateral** | Los archivos de origen que pasan el registro a cada vista, en GitHub. Un guion significa que el recurso no tiene ese tipo de vista |

Debajo de la tabla, cada recurso se abre para mostrar sus registros e ids incorporados:

| Slot | Registro | ids incorporados |
|---|---|---|
| Columnas | `fleet-ops:driver:table:columns` | `name`, `public-id`, `phone`, ... |
| Acciones de fila | `fleet-ops:driver:table:row-actions` | `view`, `edit`, `assign-vehicle`, ... `delete` |

Un guion en
**ids incorporados**
significa que el slot no tiene elementos incorporados con ids: sus elementos siguen renderizándose en la ubicación predeterminada del
[slot](https://fleetbase.io/docs/extension-development/resource-views/placement#default-spots)
.

## Notas que se aplican en todas partes

* **Filas de detalles**
  (botones de encabezado, elementos de menú, pestañas) solo aparecen para los recursos con una vista de detalles.
* **Los ids siguen dos reglas**
  : el id de una columna es su
  `valuePath`
  con guiones (
  `created_at`
  →
  `created-at`
  ); el id de una acción es el nombre del controlador correspondiente (
  `assignVehicle`
  →
  `assign-vehicle`
  ). La acción de eliminar siempre es
  `delete`
  .
* **Enlaces de origen**
  apuntan a la rama
  `main`
  de cada motor. El diseño de un archivo puede cambiar entre versiones; los nombres y ids de registro son los que permanecen estables.

## Su propio motor

Si las vistas de su extensión son extensibles, documente sus registros de la misma manera. Consulte
[Hacer que sus vistas sean extensibles](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
.

[Pestañas

Agregue una pestaña a la vista de detalles de otro motor con MenuItem — un componente de su motor, renderizado con el registro, las rutas que utiliza, los argumentos que recibe y los alias de las pestañas de detalles.](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
[Fleet-Ops

Cada registro de vista de recursos declarado por Fleet-Ops — los nombres de registro para cada tabla y vista de detalles, donde cada uno está conectado en la fuente de Fleet-Ops, y los ids incorporados para colocar sus elementos.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops)