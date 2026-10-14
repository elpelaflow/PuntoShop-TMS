---
title: "Nombres de los Registros"
url: https://fleetbase.io/docs/extension-development/resource-views/registry-names
module: extension-development
---

Vistas de Recursos

# Nombres de los Registros

Cómo se construyen los nombres de los registros de las vistas de recursos: extensión, recurso, superficie y ranura, el número de ranuras que tiene cada superficie, cómo encontrar el nombre para cualquier vista, y los alias de las pestañas.

# Nombres de los Registros

En cualquier lugar donde se pueda añadir, hay un nombre de cuatro partes, separados por dos puntos:

```
<extensión>:<recurso>:<superficie>:<ranura>
```

Léalo como una ruta, desde la parte más general hasta la más específica:
**¿qué motor?**
,
**¿qué recurso?**
,
**¿qué vista?**
,
**¿qué parte de la vista?**
.

```
fleet-ops:driver:table:columns       las columnas de la tabla de conductores de Fleet-Ops
ledger:invoice:details:menu          el menú "…" de los detalles de la factura de Ledger
iam:user:table:row-actions           cada menú de fila en la tabla de usuarios de IAM
fleet-ops:order:details:actions      los botones de encabezado de los detalles de la orden de Fleet-Ops
```

## Las Cuatro Partes

### Extensión

El motor que
**posee la vista**, no la extensión que la añade. Siempre es la sección del motor en la URL de la consola, por lo que puede leerse de la barra de direcciones:

| Estás en | Extensión |
| --- | --- |
| `/console/fleet-ops/management/drivers` | `fleet-ops` |
| `/console/ledger/billing/invoices` | `ledger` |
| `/console/iam/users` | `iam` |
| `/console/developers/api-keys` | `developers` |

Una extensión que añade una columna a la tabla de conductores de Fleet-Ops siempre usa
`fleet-ops:`
, independientemente de su propio nombre.

### Recurso

El tipo de registro que muestra la vista:
**singular**,
**en minúsculas**
y
**con guiones**, sin el prefijo del motor.

| Vista | Recurso | No |
| --- | --- | --- |
| Órdenes de trabajo de Fleet-Ops | `work-order` | `work-orders`, `workOrder` |
| Facturas de Ledger | `invoice` | `ledger-invoice` |
| Claves de API de Desarrolladores | `api-key` | `api-credential` |

Cuando el nombre del recurso difiere del nombre del modelo (las claves de API de Desarrolladores son registros
`api-credential`
), el nombre que usa la vista es el que se encuentra en
[el catálogo](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
.

### Superficie

El tipo de vista:

| Superficie | Significado |
| --- | --- |
| `table` | La lista de registros: la tabla de índice y su encabezado |
| `details` | Un registro: el panel de detalles, el panel lateral, la página o el diálogo que lo muestra |

### Ranura

La parte de la vista. Cada superficie tiene un conjunto fijo:

| Superficie | Ranura | Añade | Contrato |
| --- | --- | --- | --- |
| `table` | `columns` | [Columnas de la tabla](https://fleetbase.io/docs/extension-development/resource-views/tables/columns) | `TableColumn` |
| `table` | `row-actions` | [Elementos en el menú "…" de cada fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) | `ResourceAction` |
| `table` | `bulk-actions` | [Elementos en el menú de Acciones Masivas](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) | `ResourceAction` |
| `table` | `actions` | [Botones en el encabezado de la tabla](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) | `ActionButton` |
| `details` | `actions` | [Botones en el encabezado de los detalles](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) | `ActionButton` |
| `details` | `menu` | [Elementos en el menú "…" del encabezado de los detalles](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) | `ResourceAction` |
| `details` | `tabs` | [Pestañas de detalles](https://fleetbase.io/docs/extension-development/resource-views/details/tabs) | `MenuItem` |

**`actions`
siempre significa botones de encabezado**, tanto en las superficies. Los elementos en un desplegable son
`row-actions`
,
`bulk-actions`
o
`menu`
.

## Un Nombre para un Recurso

Un recurso con ambas vistas tiene siete nombres. Para los conductores de Fleet-Ops:

```
fleet-ops:driver:table:columns
fleet-ops:driver:table:row-actions
fleet-ops:driver:table:bulk-actions
fleet-ops:driver:table:actions
fleet-ops:driver:details:actions
fleet-ops:driver:details:menu
fleet-ops:driver:details:tabs
```

El servicio puede listarlos para usted:

```
universe.getService('resource-view').resourceRegistryNames('fleet-ops', 'driver');
```

## Encontrar el Nombre que Necesita

1. **Encuentre el motor**
   de la URL de la consola.
2. **Encuentre el recurso**
   en la página del
   [Catálogo de Registros](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
   de ese motor. Cada recurso enumera sus nombres, los identificadores de sus elementos integrados y un enlace al archivo que lo conecta.
3. **Elija la ranura**
   para lo que está añadiendo, de la tabla anterior.

## Construir Nombres en Código

Puede escribir el nombre completo, o dejar que un ayudante lo construya a partir del motor y el recurso:

```
const views = universe.getService('resource-view');

// El nombre completo
views.register('fleet-ops:driver:table:row-actions', action);

// Un ayudante por ranura
views.registerRowAction('fleet-ops', 'driver', action);
```

| Ayudante | Registra en |
| --- | --- |
| `registerTableColumn(extension, resource, column)` | `<extensión>:<recurso>:table:columns` |
| `registerRowAction(extension, resource, action)` | `<extensión>:<recurso>:table:row-actions` |
| `registerBulkAction(extension, resource, action)` | `<extensión>:<recurso>:table:bulk-actions` |
| `registerTableAction(extension, resource, button)` | `<extensión>:<recurso>:table:actions` |
| `registerDetailsAction(extension, resource, button)` | `<extensión>:<recurso>:details:actions` |
| `registerDetailsMenuItem(extension, resource, action)` | `<extensión>:<recurso>:details:menu` |
| `registerDetailsTab(extension, resource, menuItem)` | `<extensión>:<recurso>:details:tabs` |

Los mismos ayudantes también están en el servicio Universe, como
`universe.registerRowAction(…)`
y así sucesivamente. Consulte
[Servicio de Vistas de Recursos](https://fleetbase.io/docs/extension-development/universe/resource-view-service)
para la API completa.

## Alias de las Pestañas de Detalles

Las pestañas de detalles existían antes de estos registros, con un nombre diferente:
`<extensión>:component:<recurso>:details`
, registradas a través del
[Servicio de Menús](https://fleetbase.io/docs/extension-development/universe/menu-service)
.

`<extensión>:<recurso>:details:tabs`
es un
**alias**
para ese registro. Ambos nombres apuntan a las mismas pestañas, por lo que puede usar el nuevo nombre y las extensiones que ya registran pestañas de la forma antigua seguirán funcionando. Consulte
[Pestañas](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
.

## Nombres Inválidos

Un nombre que no cumple con la regla es
**rechazado**: no se registra nada,
`register()`
devuelve
`false`
, y la consola muestra un mensaje de depuración. Esto evita que se registren errores de escritura que de otro modo se registrarían en una ranura que no se utiliza.

| Nombre | Problema |
| --- | --- |
| `fleet-ops:table:driver:columns` | La superficie viene antes del recurso |
| `fleet-ops:driver:table:column` | `column` no es una ranura; es `columns` |
| `fleet-ops:driver:details:columns` | Las vistas de detalles no tienen la ranura `columns` |
| `FleetOps:driver:table:columns` | Los nombres están en minúsculas y con guiones |

También se rechaza un elemento cuando su contrato no coincide con la ranura, por ejemplo, un
`ActionButton`
registrado en
`columns`
.

**Un nombre válido para una vista que no existe es aceptado.**
`fleet-ops:drivers:table:columns`
cumple con la regla, por lo que se registra, pero ninguna vista lo lee (el recurso es
`driver`
) y su elemento nunca aparece. Copie los nombres del
[catálogo](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
en lugar de escribirlos.

[Comenzar

Añada una columna a la tabla de conductores de Fleet-Ops, añada su propia celda, ponga donde quiera y añada una acción a cada fila — paso a paso.](https://fleetbase.io/docs/extension-development/resource-views/getting-started)
[Posicionamiento

Controle dónde aparecen sus columnas, acciones y botones entre los propios elementos de una vista: antes o después de otro elemento, en una posición o según la prioridad, y dónde van cuando no lo dice.](https://fleetbase.io/docs/extension-development/resource-views/placement)