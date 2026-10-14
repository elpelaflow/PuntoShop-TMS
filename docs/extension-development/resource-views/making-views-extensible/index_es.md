---
title: "Visión general"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible
module: extension-development
---

Vistas de recursos

Hacer que sus vistas sean extensibles

# Visión general

Permita que otras extensiones agreguen columnas, acciones, botones y pestañas a las vistas de sus tablas y detalles del motor — ¿cómo hacerlo en cinco pasos, y una lista de verificación?

# Hacer que sus vistas sean extensibles

Las páginas anteriores tratan sobre agregar a
**las vistas de otros motores**. Esta sección trata sobre el otro lado: hacer que
**las vistas de su motor**
acepten adiciones, de la misma manera que Fleet-Ops, Ledger, IAM y los desarrolladores lo hacen.

Cuando sus vistas son extensibles, cualquier extensión puede registrar una columna en
`acme:shipment:table:columns`
, y su tabla de envíos la renderiza, sin modificar su motor.

## ¿Qué se necesita?

### Nombrar sus recursos

Elija los nombres de registro para cada recurso:
`<su-extensión>:<recurso>`. Si sus servicios de acción extienden
`ResourceActionService`
, ellos se encargan de los nombres.

[Nombrar y declarar →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring)

### Declarar sus registros

Cree los registros cuando su extensión se inicie, para que existan antes de que otros los registren.

[Nombrar y declarar →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring#declaring)

### Pasar `@registry` a sus plantillas

`Layout::Resource::Tabular`
y
`Layout::Resource::Panel`
combinan los elementos registrados para usted cuando se les proporciona un registro.

[Plantillas →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts)

### Aceptar filtros registrados

Construya los parámetros de consulta de sus controladores de índice con
`queryParamsFor()`
, para que las columnas filtrables que otros registren puedan filtrar.

[Parámetros de consulta e IDs →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids)

### Dar a sus elementos incorporados IDs estables

Otros colocan sus elementos antes y después de los suyos, por ID.

[Parámetros de consulta e IDs →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids#stable-ids)

Las vistas que no utilizan las plantillas de recursos, como una tabla construida a mano o un cuadro de diálogo, pueden combinar los elementos registrados por sí mismas; consulte
[Vistas personalizadas](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views)
.

## Lista de verificación

* Los servicios de acción extienden
  `ResourceActionService`
  , con
  `registryResource`
  establecido donde el nombre del modelo difiere del nombre del recurso
* Se llama a
  `declare('<extension>', [...resources])`
  en
  `setupExtension`
* Las tablas pasan
  `@registry="<extension>:<resource>:table"`
* Los paneles de detalles pasan
  `@registry="<extension>:<resource>:details"`
  , y los paneles laterales pasan
  `registry: this.detailsRegistry`
* Los controladores de índice construyen
  `queryParams`
  con
  `queryParamsFor()`
* Las columnas, acciones y botones incorporados tienen IDs estables, y el ID de la acción de eliminación es
  `delete`
* Sus registros y IDs incorporados están documentados, para que otros autores de extensiones puedan encontrarlos

[Desarrolladores

Cada registro de vista de recursos que los Desarrolladores declaran — los nombres de registro para cada tabla y vista de detalles, donde cada uno está conectado en la fuente de los Desarrolladores, y los IDs incorporados para colocar sus elementos.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/developers)
[Nombrar y declarar

Elija los nombres de registro de su motor a través de ResourceActionService, y declare cada registro para sus recursos en setupExtension.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring)