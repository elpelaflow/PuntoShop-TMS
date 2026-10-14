---
title: "Configuraciones de Pedidos"
url: https://fleetbase.io/docs/api/fleetbase/order-configs
module: api
---

# Configuraciones de Pedidos

Una configuración de pedido define el flujo de actividad que sigue un pedido (creación → envío → en tránsito → completado, etc.). Cada empresa tiene al menos la configuración predeterminada del sistema `transport`; se pueden definir configuraciones personalizadas para otros modelos operativos. Utilice estos puntos finales de solo lectura para descubrir las configuraciones disponibles para el usuario autenticado y para controlar la interfaz de usuario, como los filtros de estado, las etiquetas de actividad y las líneas de tiempo de progreso.

* [El objeto OrderConfig](#the-orderconfig-object)
* [Consultar Configuraciones de Pedidos

  GET
  `/v1/order-configs`](#query-order-configs)
* [Obtener una Configuración de Pedido

  GET
  `/v1/order-configs`](#retrieve-an-order-config)

## El objeto OrderConfig

Una configuración de pedido define el grafo de actividad (máquina de estados) utilizado por los pedidos de este tipo. Los consumidores leen las configuraciones de pedido para renderizar los chips de filtro de estado, las etiquetas de actividad y la interfaz de usuario de progreso, basándose en la configuración canónica en lugar de codificarla directamente. El campo `flow` contiene el grafo completo y editable, incluyendo la lógica condicional, los hooks de eventos y los enlaces de actividades, para que las integraciones puedan mostrar y razonar sobre las transiciones de estado.

Atributos

`id`

string

opcional

Identificador público de la configuración de pedido. Prefijado
`order_config_`
.

`key`

string

opcional

Identificador corto (por ejemplo,
`transport`
). Estable para las configuraciones del sistema.

`name`

string

opcional

Nombre legible por humanos.

`namespace`

string

opcional

Identificador completo (por ejemplo,
`system:order-config:transport`
). Único por empresa.

`description`

string

opcional

Descripción libre.

`tags`

array de strings

opcional

Etiquetas libres.

`status`

string

opcional

Estado del ciclo de vida de la configuración. Las nuevas configuraciones tienen el valor predeterminado
`private`
; las configuraciones del sistema pueden ser
`active`
.

`version`

string

opcional

Versión de esquema en estilo SemVer (por ejemplo,
`0.0.1`
).

`flow`

object

opcional

El grafo de actividad como un objeto, con claves que corresponden a los códigos de actividad. Cada valor es un
**Actividad**
objeto — un nodo en la máquina de estados del pedido. Las actividades se vinculan a través de su propio
`activities`
campo (un array de códigos de actividades de hijo), formando un grafo dirigido desde
`created`
hasta un estado terminal (
`complete: true`
). Los códigos canónicos bien conocidos son
`created`
,
`dispatched`
,
`started`
,
`enroute`
,
`completed`
, y
`canceled`
.

El orden de los elementos clave refleja el orden en que se declaran las actividades en el JSON subyacente —
**no**
la progresión del grafo. Para recorrer el flujo, comience desde
`flow.created`
(o cualquier actividad que no tenga bordes entrantes) y siga el array
`activities`
de cada actividad. Trate el código
`code`
(y la clave) de cada actividad como un identificador estable; todo lo demás se puede editar a través del panel de control del operador.

`key`

string

opcional

Código de actividad canónico. Refleja la clave y el código de la actividad
`code`
.

`code`

string

opcional

Código de actividad canónico (por ejemplo,
`created`
,
`dispatched`
,
`started`
,
`enroute`
,
`completed`
,
`canceled`
). Utilice esto como un identificador estable al renderizar la interfaz de usuario.

`status`

string

opcional

Etiqueta legible por humanos para la actividad (por ejemplo,
`Driver Enroute`
).

`details`

string

opcional

Descripción detallada de lo que representa esta actividad.

`color`

string

opcional

Indicador de color hexadecimal para la interfaz de usuario de estado (por ejemplo,
`#1f2937`
).

`sequence`

integer

opcional

Indica el orden, utilizado por la interfaz de usuario del operador al organizar el grafo.

`complete`

boolean

opcional

`true`
para actividades terminales. El pedido se considera completo cuando llega a una actividad con
`complete: true`
. Se pueden tener múltiples actividades terminales (por ejemplo,
`completed`
,
`canceled`
).

`activities`

array de strings

opcional

Códigos de actividades de hijo — las actividades que son accesibles desde esta. Este es la lista de bordes del grafo; un array vacío indica un nodo terminal (hoja).

`pod_method`

string

opcional

Método de prueba de entrega requerido en esta actividad. Uno de
`scan`
,
`signature`
,
`photo`
, o
`null`
cuando no se ha configurado un POD.

`require_pod`

boolean

opcional

Si se debe capturar la prueba de entrega antes de que el pedido pueda avanzar a esta actividad.

`logic`

array de objetos

opcional

Puertas de lógica condicional evaluadas antes de que esta actividad se considere accesible. Cada puerta tiene:

* `type`
  (string) —
  `and`
  ,
  `or`
  ,
  `not`
  , o
  `if`
* `conditions`
  (array de objetos) — cada
  `\{ field, operator, value \}`
  , donde
  `operator`
  es uno de
  `exists`
  ,
  `in`
  /
  `has`
  ,
  `notIn`
  /
  `doesntHave`
  ,
  `contains`
  ,
  `beginsWith`
  ,
  `endsWith`
  , o una comparación estándar (
  `=`
  ,
  `!=`
  ,
  `<`
  ,
  `>`
  ,
  `<=`
  ,
  `>=`
  )
  La configuración de transporte predeterminada tiene un array
  `logic`
  vacío (sin enrutamiento).

`events`

array de strings

opcional

Nombres de eventos disparados cuando se entra en esta actividad (por ejemplo, hooks de notificación o webhook). La configuración de transporte predeterminada tiene un array
`events`
vacío.

`actions`

array de objetos

opcional

Acciones conectadas a esta actividad (reservadas para controladores gestionados por el editor). La configuración de transporte predeterminada tiene un array
`actions`
vacío.

`options`

array de objetos

opcional

Opciones de actividad expuestas a través de la interfaz de usuario del operador. La configuración de transporte predeterminada tiene un array
`options`
vacío.

`entities`

array de objetos

opcional

Entidades (parcels, paquetes, elementos de la línea) adjuntas específicamente a esta actividad. Normalmente, las configuraciones tienen entidades a nivel de OrderConfig en lugar de a nivel de actividad, por lo que esto suele ser
`[]`
.

`internalId`

string

opcional

UUID asignado por el editor de la configuración para identificar esta instancia de actividad. Estable a través de ediciones y no relacionado con el
`id`
público.

`created_at`

timestamp

opcional

Cuándo se creó la configuración.

`updated_at`

timestamp

opcional

Cuándo se actualizó por última vez la configuración.

El objeto
OrderConfig
```
{
  "id": "order_config_A1b2C3d4E5",
  "key": "transport",
  "name": "Transport",
  "namespace": "system:order-config:transport",
  "description": "Configuración predeterminada del pedido para el transporte",
  "tags": [
    "transport",
    "delivery"
  ],
  "status": "private",
  "version": "0.0.1",
  "flow": {
    "created": {
      "key": "created",
      "code": "created",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Pedido creado",
      "actions": [],
      "details": "Se ha creado un nuevo pedido.",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "dispatched"
      ],
      "internalId": "aac819a0-4d3f-4543-b7fa-e50804df83f1",
      "pod_method": "scan",
      "require_pod": false
    },
    "enroute": {
      "key": "enroute",
      "code": "enroute",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Conductor en ruta",
      "actions": [],
      "details": "El conductor está en ruta.",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "completed"
      ],
      "internalId": "5422a0c3-8683-4cc2-a4b5-4d064067cd4d",
      "pod_method": "scan",
      "require_pod": false
    },
    "started": {
      "key": "started",
      "code": "started",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Pedido iniciado",
      "actions": [],
      "details": "El pedido ha sido iniciado",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "enroute"
      ],
      "internalId": "b68fad7c-b09d-4161-a01c-a9a95e7f09a8",
      "pod_method": "scan",
      "require_pod": false
    },
    "completed": {
      "key": "completed",
      "code": "completed",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Pedido completado",
      "actions": [],
      "details": "El pedido ha sido completado.",
      "options": [],
      "complete": true,
      "entities": [],
      "sequence": 0,
      "activities": [],
      "internalId": "8406520c-3f61-447b-8a48-d225d0f062d6",
      "pod_method": "scan",
      "require_pod": false
    },
    "dispatched": {
      "key": "dispatched",
      "code": "dispatched",
      "color": "#1f2937",
      "logic": [],
      "events": [],
      "status": "Pedido enviado",
      "actions": [],
      "details": "El pedido ha sido enviado.",
      "options": [],
      "complete": false,
      "entities": [],
      "sequence": 0,
      "activities": [
        "started"
      ],
      "internalId": "152fa650-34d0-45d8-8b4f-e5820bde4277",
      "pod_method": "scan",
      "require_pod": false
    }
  },
  "created_at": "2026-04-01T10:00:00.000000Z",
  "updated_at": "2026-04-01T10:00:00.000000Z"
}
```

GET
`/v1/order-configs`

```
curl https://api.fleetbase.io/v1/order-configs \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```