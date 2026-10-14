---
title: "Órdenes de trabajo"
url: https://fleetbase.io/docs/api/fleetbase/work-orders
module: api
---

# Órdenes de trabajo

Las órdenes de trabajo coordinan trabajos de mantenimiento o operativos, incluyendo el activo objetivo, el responsable, la prioridad, la lista de verificación, el presupuesto, la fecha límite y el estado de finalización.

* [El objeto de la orden de trabajo](#el-objeto-de-la-orden-de-trabajo)
* [Crear una orden de trabajo

  POST
  `/v1/work-orders`](#crear-una-orden-de-trabajo)
* [Consultar órdenes de trabajo

  GET
  `/v1/work-orders`](#consultar-órdenes-de-trabajo)
* [Obtener una orden de trabajo

  GET
  `/v1/work-orders`](#obtener-una-orden-de-trabajo)
* [Actualizar una orden de trabajo

  PUT
  `/v1/work-orders`](#actualizar-una-orden-de-trabajo)
* [Eliminar una orden de trabajo

  DELETE
  `/v1/work-orders`](#eliminar-una-orden-de-trabajo)
* [Enviar una orden de trabajo

  POST
  `/v1/work-orders/send`](#enviar-una-orden-de-trabajo)

## El objeto de la orden de trabajo

Una orden de trabajo es un envoltorio de tarea operativa utilizado para asignar y realizar un seguimiento del mantenimiento u otras tareas de la flota.

Atributos

`id`

string

opcional

Identificador público de la orden de trabajo.

`code`

string

opcional

Código de la orden de trabajo.

`subject`

string

opcional

Asunto de la orden de trabajo.

`category`

string

opcional

Categoría de la orden de trabajo.

`status`

string

opcional

Estado de la orden de trabajo.

`priority`

string

opcional

Prioridad de la orden de trabajo.

`target`

object

opcional

Recurso objetivo, cuando se carga.

`assignee`

object

opcional

Proveedor o contacto asignado, cuando se carga.

`checklist`

array

opcional

Elementos de la lista de verificación.

`meta`

object

opcional

Metadatos adicionales de la orden de trabajo.

El
objeto de la orden de trabajo

```
{
  "id": "work_order_6JpL9Qx2Vz",
  "code": "WO-AB12CD34",
  "subject": "Reemplazar neumático trasero",
  "category": "mantenimiento_correctivo",
  "status": "abierta",
  "priority": "alta",
  "target_name": "ABC123",
  "assignee_name": "Acme Parts",
  "completion_percentage": 0,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/work-orders`

## [Crear una orden de trabajo](#crear-una-orden-de-trabajo)

Crear una orden de trabajo.

Parámetros del cuerpo

`subject`

string

opcional

Asunto de la orden de trabajo.

`category`

string

opcional

Categoría de la orden de trabajo.

`status`

string

opcional

Estado de la orden de trabajo.

`priority`

string

opcional

Valor de prioridad.

`target_type`

string

opcional

Tipo de recurso objetivo, como
`fleet-ops:vehicle`
o
`fleet-ops:equipment`
.

`target`

string

opcional

ID público del recurso objetivo.

`assignee_type`

string

opcional

Tipo de recurso asignado, como
`fleet-ops:vendor`
o
`fleet-ops:contact`
.

`assignee`

string

opcional

ID público del asignado.

`checklist`

array

opcional

Elementos de la lista de verificación.

`meta`

object

opcional

Metadatos adicionales.

POST
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "subject": "Replace rear tire",
  "category": "corrective_maintenance",
  "status": "open",
  "priority": "high",
  "target_type": "fleet-ops:vehicle",
  "target": "{{vehicle_id}}",
  "assignee_type": "fleet-ops:vendor",
  "assignee": "{{vendor_id}}"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

GET
`/v1/work-orders`

## [Consultar órdenes de trabajo](#consultar-órdenes-de-trabajo)

Consultar órdenes de trabajo.

Parámetros de consulta

`query`

string

opcional

Consulta de búsqueda para las órdenes de trabajo.

`limit`

integer

opcional

Número máximo de registros a devolver.

`page`

integer

opcional

Número de página para los resultados paginados.

`sort`

string

opcional

Expresión de ordenación, como
`-created_at`
.

`category`

string

opcional

Filtrar por categoría de la orden de trabajo.

`status`

string

opcional

Filtrar por estado de la orden de trabajo.

`priority`

string

opcional

Filtrar por prioridad.

GET
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

GET
`/v1/work-orders`

## [Obtener una orden de trabajo](#obtener-una-orden-de-trabajo)

Obtener una orden de trabajo.

GET
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

PUT
`/v1/work-orders`

## [Actualizar una orden de trabajo](#actualizar-una-orden-de-trabajo)

Actualizar una orden de trabajo.

Parámetros del cuerpo

`subject`

string

opcional

Asunto de la orden de trabajo.

`category`

string

opcional

Categoría de la orden de trabajo.

`status`

string

opcional

Estado de la orden de trabajo.

`priority`

string

opcional

Valor de prioridad.

`target_type`

string

opcional

Tipo de recurso objetivo, como
`fleet-ops:vehicle`
o
`fleet-ops:equipment`
.

`target`

string

opcional

ID público del recurso objetivo.

`assignee_type`

string

opcional

Tipo de recurso asignado, como
`fleet-ops:vendor`
o
`fleet-ops:contact`
.

`assignee`

string

opcional

ID público del asignado.

`checklist`

array

opcional

Elementos de la lista de verificación.

`meta`

object

opcional

Metadatos adicionales.

PUT
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "in_progress"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

DELETE
`/v1/work-orders`

## [Eliminar una orden de trabajo](#eliminar-una-orden-de-trabajo)

Eliminar una orden de trabajo.

DELETE
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "deleted": true
}
```

POST
`/v1/work-orders/send`

## [Enviar una orden de trabajo](#enviar-una-orden-de-trabajo)

Enviar esta orden de trabajo al proveedor o contacto asignado.

POST
`/v1/work-orders/send`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/work-orders/send \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```