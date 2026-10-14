---
título: "Manifestos"
url: https://fleetbase.io/docs/api/fleetbase/manifests
módulo: api
---

# Manifestos

Los manifiestos son creados por el sistema de gestión de flotas: `POST /orchestrator/commit` los crea a partir de un plan. Esta sección está ordenada después de Orchestrator, por lo que se dirige a uno.
Un manifiesto es la ruta de un conductor: una secuencia de paradas sin necesidad de orden, que puede abarcar varias órdenes, o ninguna que el conductor haya considerado como una orden.
Estos puntos finales están destinados al conductor que ejecuta la ruta. Crear, cancelar y eliminar un manifiesto es una tarea de gestión de flotas y no forma parte de la API de consumo.

* [El objeto "Manifesto"](#el-objeto-manifesto)
* [Obtener un "Manifesto"

  GET
  `/v1/manifests/:id`](#obtener-un-manifesto)
* [Optimizar un "Manifesto"

  POST
  `/v1/manifests/:id/optimize`](#optimizar-un-manifesto)
* [Actualizar una parada de "Manifesto"

  PATCH
  `/v1/manifest-stops/:id`](#actualizar-una-parada-de-manifesto)

## El objeto "Manifesto"

Una ruta asignada a un conductor para un día, compuesta por paradas ordenadas.

El
objeto
"Manifesto"

```
{
  "id": "manifest_7KpQ2Rx9Vz",
  "status": "in_progress",
  "scheduled_date": "2026-08-23",
  "started_at": "2026-08-23T07:12:04.000000Z",
  "completed_at": null,
  "total_distance_m": 41200,
  "total_duration_s": 5400,
  "stop_count": 8,
  "completed_stops": 3,
  "pending_stops": 5,
  "driver_name": "Ron",
  "vehicle_name": "EAS-01",
  "notes": null,
  "updated_at": "2026-08-23T09:02:00.000000Z",
  "created_at": "2026-08-23T06:40:00.000000Z"
}
```

GET
`/v1/manifests/:id`

## [Obtener un "Manifesto"](#obtener-un-manifesto)

Obtiene un manifiesto con sus paradas, en el orden en que deben ser conducidas.

Cada parada tiene su lugar en línea: una ruta de veinte paradas es una solicitud, no veintiuno, junto con su estado, hora estimada y real de llegada, y la distancia y duración desde la parada anterior.

GET
`/v1/manifests/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/manifests/:id \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/manifests/:id/optimize`

## [Optimizar un "Manifesto"](#optimizar-un-manifesto)

Reordena las paradas que el conductor aún no ha realizado, priorizando las más cercanas.

Esta es la optimización del conductor, no la del orchestrator. El orchestrator asigna órdenes a una flota y crea manifiestos; esto reordena las paradas de un único manifiesto que ya está asignado.

Se trata de un algoritmo de vecino más cercano sobre distancias de carretera: desde la posición del conductor hasta la parada restante más cercana, y luego desde allí. Esto suele ser una mejora significativa con respecto a un orden arbitrario y no garantiza una solución óptima.

Las paradas completadas y omitidas conservan su posición: una ruta ya conducida no se vuelve a planificar. Un manifiesto con menos de tres paradas pendientes se devuelve sin cambios, ya que no hay orden que encontrar.

Enviar
`latitud`
y
`longitud`
para iniciar el recorrido desde la ubicación real del conductor. Sin ellas, comienza desde la primera parada pendiente.

Parámetros del cuerpo

`latitud`

número

opcional

La latitud actual del conductor. El recorrido comienza aquí cuando se proporcionan ambas coordenadas.

`longitud`

número

opcional

La longitud actual del conductor.

POST
`/v1/manifests/:id/optimize`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/manifests/:id/optimize \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "latitude": 1.3521,
  "longitude": 103.8198
}'
```

PATCH
`/v1/manifest-stops/:id`

## [Actualizar una parada de "Manifesto"](#actualizar-una-parada-de-manifesto)

Marca una parada en un manifiesto como llegada, completada o omitida.

Los cambios de estado se aplican a través de las transiciones del propio manifiesto, en lugar de escribir una columna, por lo que se registran las marcas de tiempo de llegada y finalización, y el manifiesto se completa automáticamente cuando se completa la última parada.

Cualquier otro estado se rechaza y no produce ningún cambio.

Parámetros del cuerpo

`status`

cadena

opcional

Uno de
`arrived`
,
`completed`
o
`skipped`
. Cualquier otro valor se rechaza.

`meta`

objeto

opcional

Metadatos arbitrarios para almacenar en la parada, como una nota dejada al llegar.

PATCH
`/v1/manifest-stops/:id`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/manifest-stops/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "arrived"
}'
```