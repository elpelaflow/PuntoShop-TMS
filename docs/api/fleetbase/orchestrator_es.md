---
title: "Orchestrador"
url: https://fleetbase.io/docs/api/fleetbase/orchestrator
module: api
---

# Orchestrador

Los endpoints de "Orchestrador" generan y confirman planes de asignación de recursos de FleetOps. Todos los identificadores de recursos aceptados y devueltos por la API consumible son IDs públicos.
`POST /orchestrator/run` admite la asignación de VROOM basada en la ruta, la asignación de VROOM basada únicamente en la capacidad, la asignación de capacidad nativa de Fleetbase, la asignación de conductores, la optimización de rutas y flujos de asignación previa en múltiples fases.
La asignación basada únicamente en la capacidad está destinada a clientes que necesitan determinar qué vehículos pueden transportar pedidos específicos según el peso, el volumen, el número de paletas, el número de paquetes, las habilidades y los límites de tareas, sin depender de las posiciones GPS de los vehículos. La asignación de capacidad de VROOM admite `vehicle_packing` para priorizar la utilización de menos vehículos completos.

* [Ejecutar Orchestrator

  POST
  `/v1/orchestrador/run`](#ejecutar-orchestrator)
* [Confirmar el Plan de Orchestrator

  POST
  `/v1/orchestrador/commit`](#confirmar-el-plan-de-orchestrator)

POST
`/v1/orchestrador/run`

## [Ejecutar Orchestrator](#ejecutar-orchestrator)

Ejecuta una fase de orquestación y devuelve un plan de asignación propuesto sin confirmar los cambios. Utilice
`options.engine`
para forzar un motor:
`greedy`
y
`capacity`
están integrados y no requieren ningún servicio externo, mientras que
`vroom`
requiere una instancia de VROOM accesible. Omitir
`options.engine`
utiliza el motor de orquestador configurado en la configuración de administración, que por defecto es
`greedy`.

Para la asignación de VROOM basada en la ruta, envíe
`options.engine: "vroom"`
y omita
`allocation_strategy`
o establezca en
`route_aware`. Los vehículos deben tener posiciones utilizables, ya que VROOM resolverá en función de las coordenadas de la ruta.

Para la asignación de VROO basada únicamente en la capacidad, envíe
`options.engine: "vroom"`
y
`options.allocation_strategy: "capacity_only"`. Este modo determina qué vehículos pueden transportar los pedidos seleccionados según el peso, el volumen, las paletas, los paquetes, las habilidades y los límites de tareas, sin requerir la ubicación de los vehículos. Utilice
`options.vehicle_packing: "minimize_vehicles"`
para favorecer a VROOM la utilización de vehículos factibles antes de abrir otro vehículo; utilice
`balanced`
o
`none`
para desactivar ese sesgo de empaquetado.

Para la asignación de capacidad nativa y determinista de Fleetbase, envíe
`options.engine: "capacity"`. Este motor nativo es útil como punto de referencia y línea base de depuración para la asignación basada únicamente en la capacidad sin VROOM.

La API consumible solo acepta y devuelve IDs públicos. Utilice
`order_ids`
,
`vehicle_ids`
,
`driver_ids`
,
`prior_assignments.*_id`
y los valores de respuesta
`*_id`
como IDs públicos. No envíe UUIDs internos.

POST
`/v1/orchestrador/run`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orchestrator/run \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "mode": "assign_vehicles",
  "order_ids": ["{{order_id}}"],
  "vehicle_ids": ["{{vehicle_id}}"],
  "driver_ids": [],
  "prior_assignments": [],
  "options": {
    "engine": "greedy",
    "allocation_strategy": "route_aware",
    "geometry": false,
    "respect_capacity": true,
    "respect_skills": true,
    "return_to_depot": false
  }
}'
```

Otras formas de llamar a esto

* Asignación de VROOM de una sola fase
* Asignación de VROOM basada únicamente en la capacidad
* Asignación de capacidad nativa
* Asignación previa en múltiples fases

200

OK

```
{
  "assignments": [
    {
      "order_id": "order_7YqM3KpL2n",
      "vehicle_id": "vehicle_Q1w2E3r4T5",
      "driver_id": null,
      "sequence": 1,
      "arrival": 1778918400,
      "duration": 900,
      "distance": 4200
    },
    {
      "order_id": "order_8AkN4LqP9x",
      "vehicle_id": "vehicle_A9s8D7f6G5",
      "driver_id": null,
      "sequence": 1,
      "arrival": 1778919300,
      "duration": 780,
      "distance": 3600
    }
  ],
  "unassigned": [],
  "summary": {
    "engine": "vroom",
    "allocation_strategy": "route_aware",
    "cost": 7800,
    "routes": 2,
    "unassigned": 0,
    "duration": 1680,
    "distance": 7800
  }
}
```

POST
`/v1/orchestrador/commit`

## [Confirmar el Plan de Orchestrator](#confirmar-el-plan-de-orchestrator)

Confirma un plan de orquestador propuesto creando manifiestos y aplicando asignaciones de vehículos y conductores a los pedidos. Los registros de asignación deben utilizar IDs de recursos públicos.

Este punto final es independiente del motor: confirme las asignaciones de VROOM basadas en la ruta, VROOM basadas únicamente en la capacidad, nativas y en múltiples fases. No envíe UUIDs internos ni IDs de base de datos.

Parámetros del cuerpo

`scheduled_date`

fecha

opcional

Fecha programada. Se establece en la fecha actual cuando se omite.

`assignments`

array de objetos

opcional

Registros de asignación propuestos para confirmar. Todos los IDs son IDs de recursos públicos.

`order_id`

string

opcional

ID de pedido público.

`vehicle_id`

string

opcional

ID de vehículo público.

`driver_id`

string

opcional

ID de conductor, cuando se asigna un conductor.

`sequence`

integer

opcional

Secuencia de parada para el pedido dentro de la ruta del vehículo.

`arrival`

integer

opcional

Hora de llegada estimada como un valor de marca de tiempo Unix.

`duration`

integer

opcional

Duración desde la parada anterior en segundos.

`distance`

integer

opcional

Distancia desde la parada anterior en metros.

`waypoint_sequence`

array de strings

opcional

Secuencia de puntos de parada opcional para actualizaciones de ruta de múltiples paradas.

POST
`/v1/orchestrador/commit`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orchestrador/commit \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "scheduled_date": "2026-05-16",
  "assignments": [
    {
      "order_id": "{{order_id}}",
      "vehicle_id": "{{vehicle_id}}",
      "driver_id": "{{driver_id}}",
      "sequence": 1,
      "arrival": 1778918400,
      "duration": 900,
      "distance": 4200
    }
  ]
}'
```

Otras formas de llamar a esto

* OK

200

OK

```
{
  "committed": [
    "order_7YqM3KpL2n"
  ],
  "failed": [],
  "manifests": [
    "manifest_P9qR8sT7uV"
  ]
}
```