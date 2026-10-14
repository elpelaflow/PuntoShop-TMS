---
title: "Columnas"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/columns
module: extension-development
---

Vistas de Recursos

Vistas de Tablas

# Columnas

Agrega una columna a otra tabla de un motor utilizando TableColumn: todas las opciones y métodos de cadena, las celdas incorporadas que puedes usar, la ubicación, los permisos y de dónde proviene los datos de la columna.

# Columnas

Una columna registrada aparece en la tabla como cualquier otra columna incorporada. Los usuarios pueden ocultarla con el selector de columnas, redimensionarla y, si la haces configurable, filtrarla.

```
import { TableColumn } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:vehicle:table:columns',
    new TableColumn({ id: 'acme-odómetro', label: 'Odometer', valuePath: 'meta.odometer_km', width: 120 }).after('plate-number')
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:columns` |
| **Contract** | `TableColumn` , from `@fleetbase/ember-core/contracts` |
| **Ubicación predeterminada** | Just before the row actions ("…") column |
| **Sin permiso** | La columna se omite |

## Creando una Columna

Pasa las opciones al constructor, configúralas con métodos de cadena o combínalas. Los tres son la misma columna:

```
new TableColumn({ id: 'acme-odometer', label: 'Odometer', valuePath: 'meta.odometer_km', after: 'plate-number' });

new TableColumn({ id: 'acme-odometer' }).withLabel('Odometer').withValuePath('meta.odometer_km').after('plate-number');

new TableColumn({ id: 'acme-odometer', label: 'Odometer' }).withValuePath('meta.odometer_km').after('plate-number');
```

Cada método de cadena establece una opción y devuelve la columna, lo que permite encadenar llamadas. También funciona un objeto simple con las mismas claves, pero el contrato verifica que
`id`
está establecido tan pronto como se crea.

## Opciones

Propiedad

Tipo

`id`

string

`label
?`

string

`valuePath
?`

string

`cellComponent
?`

string | ExtensionComponent

`width
?`

number

`resizable
?`

boolean

`hidden
?`

boolean

`sticky
?`

'left' | 'right'

`cellClassNames
?`

string

`sortable
?`

boolean

`sortParam
?`

string

`filterable
?`

boolean

`filterParam
?`

string

`filterComponent
?`

string | ExtensionComponent

`permission
?`

string

`before
?`

string

`after
?`

string

`index
?`

number

`priority
?`

number

Cual otra clave se pasa a la columna tal cual, por lo que las opciones que leen las celdas incorporadas, como
`anchorText`
o
`humanize`
, también funcionan.

## Métodos

| Método | Establece | Ejemplo |
| --- | --- | --- |
| `withLabel(label)` | `label` | `.withLabel('Odometer')` |
| `withValuePath(path)` | `valuePath` | `.withValuePath('meta.odometer_km')` |
| `withCellComponent(component)` | `cellComponent` | `.withCellComponent(new ExtensionComponent('@acme/engine', 'cell/odometer'))` |
| `withFilter(param, component?, options?)` | `filterable: true` , `filterParam` , `filterComponent` (por defecto `filter/string` ), y todas las claves en `options` | `.withFilter('acme_odometer_min', 'filter/string')` |
| `before(id)` | `before` , eliminando `after` | `.before('status')` |
| `after(id)` | `after` , eliminando `before` | `.after('status')` |
| `withIndex(index)` | `index` | `.withIndex(1)` |
| `withPriority(priority)` | `priority` | `.withPriority(5)` |
| `withPermission(permission)` | `permission` | `.withPermission('acme view odometer')` |

## De dónde provienen los datos

`valuePath`
solo puede leer lo que ya está en el registro que carga la tabla. Esto significa que tienes tres opciones:

| Tus datos son | Usa |
| --- | --- |
| Un campo que ya devuelve la API | `valuePath: 'field_name'` |
| Algo que tu extensión puede almacenar en la clave `meta` del registro | `valuePath: 'meta.your_key'` , y escribe el valor desde el código del servidor de tu extensión |
| En las propias tablas de tu extensión | Una [celda personalizada](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells) que lo carga con `@row.id` |

Una celda que carga sus propios datos realiza una solicitud por cada fila visible. Para tablas grandes, agrupa las solicitudes en un servicio, o almacena un valor de resumen en
`meta`
para que
`valuePath`
pueda leerlo.

## Usando una Celda Incorporada

`cellComponent`
puede nombrar cualquier componente de celda del panel, y las claves de la columna lo configuran:

| `cellComponent` | Renderiza | Lee |
| --- | --- | --- |
| `table/cell/base` (predeterminado) | El valor como texto, o `-` | `humanize: true` para humanizar el valor |
| `table/cell/status` | El valor como un badge de estado |  |
| `table/cell/anchor` | El valor como un enlace que ejecuta una función | `action(row)` , `anchorText` , `anchorIcon` , `anchorClass` |
| `table/cell/link-to` | El valor como un enlace a una ruta | `route` , `linkClass` , `linkIcon` |
| `table/cell/currency` | El valor como dinero, en la moneda de la fila | `currency` para una moneda fija |
| `table/cell/country` | Un nombre y bandera de país |  |
| `table/cell/point` | Coordenadas |  |

```
new TableColumn({ id: 'acme-tier', label: 'Tier', valuePath: 'meta.acme_tier', cellComponent: 'table/cell/status' });

new TableColumn({
    id: 'acme-contract',
    label: 'Contract',
    valuePath: 'meta.acme_contract_ref',
    cellComponent: 'table/cell/anchor',
    action: (vehicle) => openContract(vehicle),
});
```

## Ejemplos

### Una Columna Oculta por Defecto

Útil para detalles que solo algunos usuarios necesitan:

```
new TableColumn({ id: 'acme-vin-check', label: 'VIN check', valuePath: 'meta.acme_vin_status', hidden: true, cellComponent: 'table/cell/status' });
```

### Una Columna Solo para Algunos Usuarios

```
new TableColumn({ id: 'acme-cost', label: 'Cost per km', valuePath: 'meta.acme_cost_per_km', cellComponent: 'table/cell/currency' })
    .withPermission('acme view costs');
```

### Columnas en Múltiples Tablas

Registra el mismo tipo de columna en varios recursos, iterando sobre ellos:

```
for (const resource of ['vehicle', 'trailer', 'equipment']) {
    views.registerTableColumn(
        'fleet-ops',
        resource,
        new TableColumn({ id: 'acme-asset-tag', label: 'Asset tag', valuePath: 'meta.acme_asset_tag', width: 110 })
    );
}
```

## Ordenamiento

Las columnas registradas **no son ordenables**
a menos que establezcas
`sortable: true`
. El ordenamiento solicita a la API que ordene por
`sortParam`
(o
`valuePath`
), así que solo actívalo cuando sea una columna real de la tabla del recurso:

```
new TableColumn({ id: 'acme-region', label: 'Region', valuePath: 'region', sortable: true, sortParam: 'region' });
```

Los valores en
`meta`
, o calculados por tu celda, no se pueden ordenar de esta manera.

## Relacionado

* [Custom Cells](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells)
  : renderiza tu propio componente en cada celda de una columna registrada, desde tu propio motor — los argumentos que recibe, carga de datos por fila, y ejemplos de un badge de color a una acción en línea.
* [Filterable Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
  : agrega un filtro, de principio a fin.
* [Placement](https://fleetbase.io/docs/extension-development/resource-views/placement)
  :
  `before`
  ,
  `after`
  ,
  `index`
  y
  `priority`
  en detalle.

[Visibility and Permissions

Cómo cada tipo de elemento maneja una verificación de permiso y visibilidad — oculto, mostrado deshabilitado o excluido — con ejemplos de restringir el acceso a elementos en función de las capacidades, el estado del registro y la configuración del usuario.](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)
[Custom Cells

Renderiza tu propio componente en cada celda de una columna registrada, desde tu propio motor — los argumentos que recibe, carga de datos por fila, y ejemplos de un badge de color a una acción en línea.](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells)