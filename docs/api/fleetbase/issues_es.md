---
title: "Problemas"
url: https://fleetbase.io/docs/api/fleetbase/issues
module: api
---

# Problemas

Los "Problemas" registran los problemas operativos informados en relación con los pedidos, los conductores, los vehículos u otros recursos. Utilice los "Problemas" para realizar un seguimiento de los incidentes, las excepciones y el estado de resolución durante la ejecución.

* [El objeto "Issue"](#el-objeto-issue)
* [Crear un "Issue"

  POST
  `/v1/issues`](#crear-un-issue)
* [Consultar "Issues"

  GET
  `/v1/issues`](#consultar-issues)
* [Obtener un "Issue"

  GET
  `/v1/issues/:id`](#obtener-un-issue)
* [Actualizar un "Issue"

  PUT
  `/v1/issues/:id`](#actualizar-un-issue)
* [Eliminar un "Issue"

  DELETE
  `/v1/issues/:id`](#eliminar-un-issue)

## El objeto "Issue"

Un "Issue" registra un problema operativo informado por un conductor o un vehículo. Incluye el texto del informe, la prioridad, la categoría, el tipo, el estado, la ubicación, el responsable, el informante y las marcas de tiempo de resolución.

Atributos

`id`

string

opcional

Identificador público del "Issue".

`asignado_a`

objeto

opcional

Usuario asignado al "Issue", cuando se carga.

`informado_por`

objeto

opcional

Usuario que informó el "Issue", cuando se carga.

`vehículo`

objeto

opcional

Vehículo asociado al "Issue", cuando se carga.

`conductor`

objeto

opcional

Conductor asociado al "Issue", cuando se carga.

`issue_id`

string

opcional

Identificador de "Issue" amigable para el usuario.

`título`

string

opcional

Título del "Issue".

`informe`

string

opcional

Texto del informe del "Issue".

`prioridad`

string

opcional

Prioridad del "Issue".

`meta`

objeto

opcional

Metadatos adicionales del "Issue".

`tipo`

string

opcional

Tipo de "Issue".

`categoría`

string

opcional

Categoría del "Issue".

`etiquetas`

array de strings

opcional

Etiquetas asociadas al "Issue".

`estado`

string

opcional

Estado del "Issue".

`ubicación`

objeto

opcional

Ubicación donde se informó el "Issue".

`resuelto_en`

timestamp

opcional

Marca de tiempo en la que se resolvió el "Issue".

`actualizado_en`

timestamp

opcional

Marca de tiempo en la que se actualizó por última vez el "Issue".

`creado_en`

timestamp

opcional

Marca de tiempo en la que se creó el "Issue".

El
objeto "Issue"

```
{
  "id": "issue_8Qw2YxM3Nf",
  "nombre_del_conductor": "Alex Driver",
  "nombre_del_vehículo": "ABC123",
  "issue_id": "ISS-1001",
  "título": null,
  "informe": "Neumático pinchado cerca de la ubicación de recogida.",
  "prioridad": "alta",
  "meta": {},
  "tipo": "vehículo",
  "categoría": "mantenimiento",
  "etiquetas": [],
  "estado": "abierto",
  "ubicación": {
    "latitud": 1.3521,
    "longitud": 103.8198
  },
  "resuelto_en": null,
  "actualizado_en": "2026-05-07T08:30:00.000000Z",
  "creado_en": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/issues`

## [Crear un "Issue"](#crear-un-issue)

Crear un "Issue"

Parámetros del cuerpo

`conductor`

string

obligatorio

ID del conductor que informa del "Issue".

`ubicación`

objeto

obligatorio

Ubicación donde se informó el "Issue".

`informe`

string

obligatorio

Texto del informe del "Issue" proporcionado por el llamador.

`categoría`

string

opcional

Categoría utilizada para clasificar el "Issue".

`tipo`

string

opcional

Tipo de "Issue".

`prioridad`

string

opcional

Nivel de prioridad para el "Issue".

POST
`/v1/issues`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/issues \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "conductor": "{{driver_id}}",
  "ubicación": {
    "latitud": 1.3521,
    "longitud": 103.8198
  },
  "informe": "Problema con la presión de los neumáticos del vehículo",
  "categoría": "vehículo",
  "tipo": "mantenimiento",
  "prioridad": "medio",
  "estado": "abierto"
}'
```

GET
`/v1/issues`

## [Consultar "Issues"](#consultar-issues)

Consultar "Issues"

Parámetros de consulta

`limite`

integer

opcional

Número máximo de "Issues" a devolver.

`offset`

integer

opcional

Número de "Issues" a omitir antes de devolver los resultados.

`ordenar`

string

opcional

Expresión de orden para la consulta de "Issues".

`conductor`

string

opcional

Filtra los "Issues" por ID de conductor.

`vehículo`

string

opcional

Filtra los "Issues" por ID de vehículo.

`estado`

string

opcional

Filtra los "Issues" por estado.

GET
`/v1/issues`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/issues?limite=25&offset=0&ordenar=creado_en \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/issues/:id`

## [Obtener un "Issue"](#obtener-un-issue)

Obtener un "Issue"

GET
`/v1/issues/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/issues/:id \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/issues/:id`

## [Actualizar un "Issue"](#actualizar-un-issue)

Actualizar un "Issue"

Parámetros del cuerpo

`informe`

string

obligatorio

Texto del informe del "Issue" proporcionado por el llamador.

`categoría`

string

opcional

Categoría utilizada para clasificar el "Issue".

`tipo`

string

opcional

Tipo de "Issue".

`prioridad`

string

opcional

Nivel de prioridad para el "Issue".

PUT
`/v1/issues/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/issues/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "informe": "Informe del problema actualizado",
  "categoría": "vehículo",
  "tipo": "mantenimiento",
  "prioridad": "alto",
  "estado": "resuelto"
}'
```

DELETE
`/v1/issues/:id`

## [Eliminar un "Issue"](#eliminar-un-issue)

Eliminar un "Issue"

DELETE
`/v1/issues/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/issues/:id \
  -H "Authorization: Bearer flb_live_…"
```