---
title: "Órdenes"
url: https://fleetbase.io/docs/api/fleetbase/orders
module: api
---

# Órdenes

Las órdenes representan tareas que deben planificarse, asignarse, rastrearse y completarse. Utilice los puntos finales de órdenes para crear trabajos de entrega o servicio, asignar recursos, gestionar el estado, capturar la prueba de entrega y registrar la actividad.

* [El objeto Order](#el-objeto-order)
* [Crear una Orden

  POST
  `/v1/orders`](#crear-una-orden)
* [Crear una Orden utilizando el cuerpo completo

  POST
  `/v1/orders`](#crear-una-orden-utilizando-el-cuerpo-completo)
* [Crear una Orden utilizando el cuerpo

  POST
  `/v1/orders`](#crear-una-orden-utilizando-el-cuerpo)
* [Crear una Orden utilizando puntos de referencia y entidades con fotos

  POST
  `/v1/orders`](#crear-una-orden-utilizando-puntos-de-referencia-y-entidades-con-fotos)
* [Crear una Orden utilizando puntos de referencia y destinos de entidad

  POST
  `/v1/orders`](#crear-una-orden-utilizando-puntos-de-referencia-y-destinos-de-entidad)
* [Crear una Orden utilizando solo recogida y entrega

  POST
  `/v1/orders`](#crear-una-orden-utilizando-solo-recogida-y-entrega)
* [Crear una Orden utilizando solo puntos de referencia

  POST
  `/v1/orders`](#crear-una-orden-utilizando-solo-puntos-de-referencia)
* [Crear una Orden utilizando coordenadas

  POST
  `/v1/orders`](#crear-una-orden-utilizando-coordenadas)
* [Crear una Orden utilizando puntos GeoJSON

  POST
  `/v1/orders`](#crear-una-orden-utilizando-puntos-geojson)
* [Crear una Orden con relaciones vacías

  POST
  `/v1/orders`](#crear-una-orden-con-relaciones-vacias)
* [Consultar Órdenes

  GET
  `/v1/orders`](#consultar-órdenes)
* [Programar una Orden

  PATCH
  `/v1/orders/:id/schedule`](#programar-una-orden)
* [Asignar una Orden

  PATCH
  `/v1/orders/:id/dispatch`](#asignar-una-orden)
* [Iniciar una Orden

  POST
  `/v1/orders/:id/start`](#iniciar-una-orden)
* [Actualizar la Actividad de la Orden

  POST
  `/v1/orders/:id/update-activity`](#actualizar-la-actividad-de-la-orden)
* [Obtener la Próxima Actividad de la Orden

  GET
  `/v1/orders/:id/next-activity`](#obtener-la-próxima-actividad-de-la-orden)
* [Establecer el Destino de la Orden

  PATCH
  `/v1/orders/:id/set-destination/:placeId`](#establecer-el-destino-de-la-orden)
* [Capturar la Firma para la Orden

  POST
  `/v1/orders/:id/capture-signature/:subject-id`](#capturar-la-firma-para-la-orden)
* [Capturar el Código QR para la Orden

  POST
  `/v1/orders/:id/capture-qr/:subject-id`](#capturar-el-código-qr-para-la-orden)
* [Recuperar una Orden

  GET
  `/v1/orders`](#recuperar-una-orden)
* [Actualizar una Orden

  PUT
  `/v1/orders/:id`](#actualizar-una-orden)
* [Cancelar una Orden

  DELETE
  `/v1/orders/:id/cancel`](#cancelar-una-orden)
* [Eliminar una Orden

  DELETE
  `/v1/orders/:id`](#eliminar-una-orden)
* [Obtener la Distancia y el Tiempo de la Orden

  GET
  `/v1/orders/:id/distance-and-time`](#obtener-la-distancia-y-el-tiempo-de-la-orden)
* [Completar una Orden

  POST
  `/v1/orders/:id/complete`](#completar-una-orden)
* [Obtener el Rastreador de la Orden

  GET
  `/v1/orders/:id/tracker`](#obtener-el-rastreador-de-la-orden)
* [Obtener la ETA de la Orden

  GET
  `/v1/orders/:id/eta`](#obtener-la-eta-de-la-orden)
* [Listar Comentarios de la Orden

  GET
  `/v1/orders/:id/comments`](#listar-comentarios-de-la-orden)
* [Capturar una Foto para la Orden

  POST
  `/v1/orders/:id/capture-photo/:subjectId`](#capturar-una-foto-para-la-orden)
* [Listar Pruebas de la Orden

  GET
  `/v1/orders/:id/proofs/:subjectId`](#listar-pruebas-de-la-orden)
* [Obtener Campos de Entidad Editables

  GET
  `/v1/orders/:id/editable-entity-fields`](#obtener-campos-de-entidad-editables)

## El objeto Order

Un order representa un flujo de trabajo de entrega o servicio de FleetOps. Enlaza un payload, un cliente y facilitador opcionales, los recursos asignados de conductor y vehículo, los datos de seguimiento, la configuración de prueba de entrega y las marcas de tiempo de ciclo de vida.

Atributos

`id`

string

opcional

Identificador de orden público.

`internal_id`

string

opcional

Identificador interno opcional de la orden.

`order_config`

string

opcional

Identificador público de la configuración de la orden utilizada en el flujo de la orden.

`customer`

object

opcional

Recurso de contacto o proveedor cargado con la orden.

`payload`

object

opcional

Recurso de payload que contiene las paradas de recogida, entrega, retorno, puntos de referencia y entidades para la orden.

`facilitator`

object

opcional

Contacto, proveedor o proveedor integrado responsable de la orden.

`driver_assigned`

object

opcional

Conductor asignado a la orden.

`vehicle_assigned`

object

opcional

Vehículo asignado a la orden.

`tracking_number`

object

opcional

Recurso de número de seguimiento generado para la orden.

`tracking_statuses`

array of objects

opcional

Estados de seguimiento cargados con la orden.

`files`

array of objects

opcional

Archivos adjuntos a la orden.

`purchase_rate`

object

opcional

Tasa de compra adjunta a la orden, cuando esté presente.

`notes`

string

opcional

Notas de libre texto adjuntas a la orden.

`type`

string

opcional

Tipo de orden resuelto a partir de la configuración de la orden.

`status`

string

opcional

Estado de ciclo de vida actual de la orden.

`pod_method`

string

opcional

Método de prueba de entrega requerido para la orden.

`pod_required`

boolean

opcional

Si se requiere la prueba de entrega.

`dispatched`

boolean

opcional

Si la orden ha sido enviada.

`started`

boolean

opcional

Si la orden ha comenzado.

`adhoc`

boolean

opcional

Si la orden es ad hoc.

`adhoc_distance`

integer

opcional

Distancia ad hoc asignada en metros.

`distance`

integer

opcional

Distancia de ruta preliminar en metros.

`time`

integer

opcional

Duración de la ruta preliminar en segundos.

`tracker_data`

object

opcional

Datos de rastreo devueltos cuando se solicitan con
`with_tracker_data`
.

`eta`

object

opcional

Datos estimados de llegada devueltos cuando se solicitan con
`with_eta`
.

`meta`

object

opcional

Metadatos adicionales de la orden.

`dispatched_at`

timestamp

opcional

Marca de tiempo en la que se envió la orden.

`started_at`

timestamp

opcional

Marca de tiempo en la que comenzó la orden.

`scheduled_at`

timestamp

opcional

Marca de tiempo en la que se programó la orden.

`updated_at`

timestamp

opcional

Marca de tiempo en la que se actualizó la orden por última vez.

`created_at`

timestamp

opcional

Marca de tiempo en la que se creó la orden.

El
objeto Order
```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "customer": {
    "id": "contact_6zV1KqN9pR",
    "name": "Acme Receiving"
  },
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "pickup": {
      "id": "place_1A2b3C4d5E",
      "name": "Warehouse 7"
    },
    "dropoff": {
      "id": "place_9Z8y7X6w5V",
      "name": "Customer Dock"
    },
    "waypoints": [],
    "entities": []
  },
  "facilitator": null,
  "driver_assigned": null,
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001"
  },
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders`

## [Crear una Orden](#crear-una-orden)

Crea una nueva orden para la empresa actual. Proporcione un ID de payload existente, un payload en línea, una pareja de recogida/entrega o al menos dos puntos de referencia; Fleetbase crea o adjunta el payload antes de crear la orden.

Puede asignar un conductor, vehículo, facilitador, cliente, presupuesto de servicio o programar en el momento de la creación. Cuando
`dispatch`
es verdadero, Fleetbase envía la orden después de su creación, a menos que la orden pertenezca a un flujo integrado de proveedor.

Parámetros del cuerpo

`payload`

object

opcional

ID de payload existente o un objeto de payload en línea. Si se omite, proporcione
`pickup`
y
`dropoff`
, o proporcione al menos dos
`waypoints`
.

`pickup`

object

opcional

Datos de lugar de recogida o identificador de lugar para el payload.

`dropoff`

object

opcional

Datos de lugar de entrega o identificador de lugar para el payload.

`return`

object

opcional

Datos de lugar de devolución opcionales o identificador de lugar para el payload.

`waypoints`

array of objects

opcional

Puntos de ruta ordenados. Se requieren cuando no se proporciona una pareja de recogida/entrega. Se requieren al menos dos puntos de referencia cuando no se proporciona una pareja de recogida/entrega.

`entities`

array of objects

opcional

Entidades, paquetes o elementos adjuntos al payload.

`pickup`

object

opcional

Datos de lugar de recogida o dirección utilizada para crear el payload de la orden cuando
`payload`
no se proporciona.

`dropoff`

object

opcional

Datos de lugar de entrega o dirección utilizada para crear el payload de la orden cuando
`payload`
no se proporciona.

`return`

object

opcional

Datos de lugar de devolución opcionales o dirección utilizada cuando se crea el payload de la orden.

`waypoints`

array of objects

opcional

Puntos de ruta ordenados utilizados para crear el payload de la orden sin una pareja de recogida/entrega. Se requieren al menos dos puntos de referencia cuando no se proporciona una pareja de recogida/entrega.

`entities`

array of objects

opcional

Entidades, paquetes o elementos adjuntos al payload generado.

`type`

string

opcional

Clave de configuración de la orden. Fleetbase resuelve esto con
`order_config`
y almacena la clave resuelta como el tipo de orden.

`order_config`

string

opcional

Identificador de configuración de la orden utilizado para resolver el flujo de la orden.

`service_quote`

string

opcional

ID de presupuesto de servicio para comprar y adjuntar a la orden.

`purchase_rate`

string

opcional

ID de tasa de compra para adjuntar a la orden.

`driver`

string

opcional

ID de conductor para asignar a la orden. Fleetbase también asigna el vehículo del conductor cuando está disponible. Opcional — una cadena vacía o
`null`
se trata como ausente y deja la orden sin asignar. Un valor no vacío sigue estando sujeto a la validación del ID del conductor existente.

`vehicle`

string

opcional

ID de vehículo para asignar a la orden. Opcional — una cadena vacía o
`null`
se trata como ausente, y un ID que no coincida con ningún vehículo se ignora en lugar de rechazarse.

`facilitator`

string

opcional

Contacto, proveedor o proveedor integrado ID responsable de la orden.

`customer`

object

opcional

Recurso de contacto/proveedor existente o detalles de cliente utilizados para encontrar o crear un contacto de cliente.

`internal_id`

string

opcional

ID de cliente interno opcional.

`name`

string

opcional

```spanish
Nombre del cliente.

`title`

cadena

opcional

Título del cliente.

`email`

cadena

opcional

Dirección de correo electrónico del cliente utilizada al encontrar o crear el contacto del cliente.

`phone`

cadena

opcional

Número de teléfono del cliente.

`meta`

objeto

opcional

Metadatos adicionales del cliente.

`dispatch`

booleano

opcional

Cuando
`true`
, Fleetbase envía el pedido después de crearlo. Se omite el envío para los pedidos integrados con proveedores.

`adhoc`

booleano

opcional

Indica que el pedido es de uso ocasional.

`adhoc_distance`

número

opcional

Distancia de búsqueda para el envío de conductores cercanos.

`pod_required`

booleano

opcional

Si se requiere la prueba de entrega para completar el pedido.

`pod_method`

cadena

opcional

Método de prueba de entrega. Requerido cuando
`pod_required`
es verdadero.

`scheduled_at`

marca de tiempo

opcional

Fecha y hora en la que se debe programar el pedido.

`status`

cadena

opcional

Estado inicial del pedido. Por defecto a
`created`
cuando no se especifica.

`internal_id`

cadena

opcional

Identificador interno opcional para el pedido.

`meta`

objeto

opcional

Metadatos adicionales del pedido.

`notes`

cadena

opcional

Notas libres asociadas al pedido.

`time_window_start`

marca de tiempo

opcional

Hora más temprana en la que el pedido debe ser atendido por el coordinador.

`time_window_end`

marca de tiempo

opcional

Hora más tardía en la que el pedido debe ser atendido por el coordinador.

`required_skills`

array de cadenas

opcional

Habilidades requeridas para la asignación al coordinador.

`orchestrator_priority`

entero

opcional

Por defecto:
`50`

Prioridad del coordinador para la asignación. Fleetbase utiliza el valor predeterminado de
`50`
si no se especifica o es inválido.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": "Singapore 018971",
  "dropoff": "321 Orchard Rd, Singapore",
  "waypoints": [
      "10 Bayfront Avenue, Singapore 018956",
      "18 Marina Gardens Drive, Singapore 018953",
      "80 Mandai Lake Rd, Singapore 729826",
      "1 Beach Road, Singapore 189673"
  ],
  "dispatch": false,
  "driver": "{{driver_id}}",
  "facilitator": "{{vendor_id}}",
  "customer": "{{contact_id}}",
  "meta": {
      "Warehouse": "WAREHOUSE-123"
  },
  "notes": "Order notes"
}'
```

Otras formas de llamar a esto

* Crear un pedido utilizando el payload completo
* Crear un pedido utilizando solo Pickup Dropoff
* Crear un pedido utilizando solo Waypoints
* Crear un pedido utilizando Payload
* Crear un pedido utilizando Waypoints y Entity Destinations
* Crear un pedido utilizando Waypoints y Entities con Photos

201

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "customer": {
    "id": "contact_6zV1KqN9pR",
    "name": "Acme Receiving",
    "email": "receiving@example.com",
    "phone": "+15555550100",
    "type": "customer-contact",
    "customer_type": "customer-contact",
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_1A2b3C4d5E",
    "pickup": {
      "id": "place_1A2b3C4d5E",
      "name": "Marina Bay Sands",
      "location": {
        "latitude": 1.2834,
        "longitude": 103.8607
      },
      "address": "10 Bayfront Avenue, Singapore 018956",
      "type": "place",
      "meta": {},
      "updated_at": "2026-05-07T08:30:00.000000Z",
      "created_at": "2026-05-07T08:30:00.000000Z"
    },
    "dropoff": {
      "id": "place_9Z8y7X6w5V",
      "name": "321 Orchard Rd",
      "location": {
        "latitude": 1.3048,
        "longitude": 103.8318
      },
      "address": "321 Orchard Rd, Singapore",
      "type": "place",
      "meta": {},
      "updated_at": "2026-05-07T08:30:00.000000Z",
      "created_at": "2026-05-07T08:30:00.000000Z"
    },
    "return": null,
    "waypoints": [],
    "entities": [],
    "cod_amount": null,
    "cod_currency": null,
    "cod_payment_method": null,
    "payment_method": null,
    "meta": {},
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "facilitator": null,
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver",
    "email": "alex.driver@example.com",
    "phone": "+15555550111",
    "status": "active",
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "created",
    "status_code": "created",
    "qr_code": "https://api.fleetbase.io/qr/FB-1001",
    "barcode": "https://api.fleetbase.io/barcode/FB-1001",
    "url": "https://console.fleetbase.io/track-order/FB-1001",
    "type": "order",
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

## [Crear un pedido utilizando puntos de referencia y destinos de entidades](#create-an-order-using-waypoints-and-entity-destinations)

Crea un pedido utilizando la estructura de datos "waypoints" y "destinos de entidades".
Este ejemplo se basa en un ejemplo almacenado, por lo que la estructura se utiliza realmente: la CLI de Postman
ejecuta solicitudes, nunca ejemplos, por lo que estas estructuras no tenían ninguna cobertura.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "payload": {
        "waypoints": [
            "Singapore 018971",
            "321 Orchard Rd, Singapore"
        ],
        "entities": [
            {
                "destination": 0,
                "name": "Smart TV UltraHD 4K",
                "description": "Smart TV de alta definición de 65 pulgadas con colores vibrantes y diseño elegante.",
                "currency": "USD",
                "price": 1200.00
            },
            {
                "destination": 0,
                "name": "Auriculares inalámbricos Bluetooth",
                "description": "Auriculares con cancelación de ruido y batería de larga duración.",
                "currency": "USD",
                "price": 250.00
            },
            {
                "destination": 1,
                "name": "Reloj inteligente para el fitness",
                "description": "Reloj inteligente resistente al agua con monitor de frecuencia cardíaca y GPS.",
                "currency": "USD",
                "price": 199.99
            }
        ]
    },
    "meta": {
        "Almacén": "WAREHOUSE-123"
    },
    "notas": "Notas del pedido"
}'
```

POST
`/v1/orders`

## [Crear un pedido utilizando únicamente recogida y entrega](#create-an-order-using-only-pickup-dropoff)

Crea un pedido utilizando la estructura de datos "recogida y entrega".
Este ejemplo se basa en un ejemplo almacenado, por lo que la estructura se utiliza realmente: la CLI de Postman
ejecuta solicitudes, nunca ejemplos, por lo que estas estructuras no tenían ninguna cobertura.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": "Singapore 018971",
  "dropoff": "321 Orchard Rd, Singapore"
}'
```

POST
`/v1/orders`

## [Crear un pedido utilizando únicamente puntos de referencia](#create-an-order-using-only-waypoints)

Crea un pedido utilizando la estructura de datos "puntos de referencia".
Este ejemplo se basa en un ejemplo almacenado, por lo que la estructura se utiliza realmente: la CLI de Postman
ejecuta solicitudes, nunca ejemplos, por lo que estas estructuras no tenían ninguna cobertura.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "waypoints": [
      [1.3521, 103.8198],
      "10 Bayfront Avenue, Singapore 018956",
      "18 Marina Gardens Drive, Singapore 018953",
      "80 Mandai Lake Rd, Singapore 729826",
      "1 Beach Road, Singapore 189673",
      "Sentosa, Singapore"
  ]
}'
```

POST
`/v1/orders`

## [Crear un pedido utilizando coordenadas](#create-an-order-using-coordinates)

Crea un pedido con
`pickup`
y
`dropoff`
dados como objetos de coordenadas.

`Place::createFromMixed`
acepta un lugar como más que un ID público. Cuando el valor es
una pareja de coordenadas, se resuelve a través
`createFromCoordinates`
, por lo que no hay necesidad de realizar búsquedas de direcciones. La latitud y la longitud se leen a través de una lista de alias —
`lat`
,
`latitude`
,
`x`
,
`0`
y
`lon`
,
`lng`
,
`longitude`
,
`y`
,
`1`
— por lo que varias ortografías son equivalentes.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": {
    "latitude": 1.2830632,
    "longitude": 103.8579965
  },
  "dropoff": {
    "lat": 1.4043,
    "lng": 103.7930
  }
}'
```

POST
`/v1/orders`

## [Crear un pedido utilizando puntos GeoJSON](#create-an-order-using-geojson-points)

Crea un pedido con
`pickup`
y
`dropoff`
dados como objetos GeoJSON.

`Place::createFromMixed`
reconoce GeoJSON directamente, por lo que un cliente que ya tiene geometría GeoJSON no necesita convertirla. Tenga en cuenta que el orden de los ejes GeoJSON es
`[longitude, latitude]`
, lo contrario del formato de objeto de coordenadas.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": {
    "type": "Point",
    "coordinates": [103.8579965, 1.2830632]
  },
  "dropoff": {
    "type": "Point",
    "coordinates": [103.7930, 1.4043]
  }
}'
```

POST
`/v1/orders`

## [Crear un pedido con relaciones vacías](#create-an-order-with-empty-relationships)

Crea un pedido enviando
`driver`
y
`vehicle`
como cadenas vacías.

Una relación vacía significa "ninguno", no "inválido": Fleetbase ignora el campo y crea el pedido sin asignar, exactamente como si la clave no se hubiera incluido. Este es el comportamiento histórico, y es importante porque un cliente que serializa un menú desplegable sin seleccionar envía
`""`
en lugar de omitir la clave.

Los valores de solicitud de cadena vacía llegan a la API como null, y un null es una pregunta con una respuesta — "no hay ningún registro" — en lugar de una solicitud mal formada. Esta solicitud existe para que la respuesta permanezca con un código 2xx.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": "Singapore 018971",
  "dropoff": "321 Orchard Rd, Singapore",
  "driver": "",
  "vehicle": ""
}'
```

GET
`/v1/orders`

## [Consultar pedidos](#query-orders)

Devuelve los pedidos para la empresa actual. Utilice filtros como
`status`
,
`payload`
,
`customer`
,
`facilitator`
o
`nearby`
para reducir el conjunto de resultados.

Parámetros de consulta

`limit`

entero

opcional

Número máximo de pedidos a devolver.

`offset`

entero

opcional

Número de pedidos a omitir antes de devolver los resultados.

`sort`

cadena

opcional

Expresión de orden para la consulta de pedidos.

`status`

cadena

opcional

Filtra los pedidos por estado de ciclo de vida.

`payload`

cadena

opcional

Filtra los pedidos por ID de payload.

`pickup`

cadena

opcional

Filtra los pedidos por ID de lugar de recogida.

`dropoff`

cadena

opcional

Filtra los pedidos por ID de lugar de entrega.

`return`

cadena

opcional

Filtra los pedidos por ID de lugar de devolución.

`facilitator`

cadena

opcional

Filtra los pedidos por ID público o interno del facilitador.

`customer`

cadena

opcional

Filtra los pedidos por ID público o interno del cliente.

`entity`

cadena

opcional

Filtra los pedidos que contienen el ID público o interno de la entidad.

`entity_status`

cadena

opcional

Filtra los pedidos por código de estado de seguimiento de las entidades de payload.

`on`

fecha

opcional

Filtra los pedidos creados o programados en la fecha especificada.

`pod_required`

booleano

opcional

Cuando es verdadero, devuelve solo los pedidos que requieren prueba de entrega.

`dispatched`

booleano

opcional

Cuando es verdadero, devuelve solo los pedidos asignados.

`nearby`

cadena

opcional

Filtra los pedidos cercanos utilizando coordenadas, un ID de conductor o una cadena de dirección.

GET
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders?limit=25&offset=0&sort=created_at&status=created \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "order_7YqM3KpL2n",
    "internal_id": "ORD-1001",
    "order_config": "order_config_transport",
    "payload": {
      "id": "payload_x9Z2Lm8QpA",
      "waypoints": [],
      "entities": [],
      "meta": {}
    },
    "customer": null,
    "facilitator": null,
    "driver_assigned": null,
    "vehicle_assigned": null,
    "tracking_number": {
      "id": "tracking_3Nf8Qw2YxM",
      "tracking_number": "FB-1001",
      "status": "created",
      "status_code": "created",
      "type": "order"
    },
    "tracking_statuses": [],
    "files": [],
    "purchase_rate": null,
    "notes": "Deliver through receiving bay.",
    "type": "transport",
    "status": "created",
    "pod_method": null,
    "pod_required": false,
    "dispatched": false,
    "started": false,
    "adhoc": false,
    "adhoc_distance": 0,
    "distance": 0,
    "time": 0,
    "meta": {},
    "dispatched_at": null,
    "started_at": null,
    "scheduled_at": null,
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  }
]
```

PATCH
`/v1/orders/:id/schedule`

## [Programar un pedido](#schedule-an-order)

Programa un pedido para una fecha y hora específica. Fleetbase analiza la fecha y la hora utilizando la zona horaria proporcionada o la zona horaria de la empresa.

Parámetros del cuerpo

`date`

fecha

obligatorio

Fecha de programación en formato
`YYYY-MM-DD`
.

`time`

cadena

opcional

Hora opcional para combinar con
`date`
.

`timezone`

cadena

opcional

Zona horaria utilizada al analizar la fecha y la hora de programación. Por defecto, es la zona horaria de la empresa.

PATCH
`/v1/orders/:id/schedule`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/orders/:id/schedule \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-02-11",
    "time": "8am",
    "timezone": "Asia/Singapore"
}'
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "created",
    "status_code": "created",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": "2026-05-08T14:30:00.000000Z",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PATCH
`/v1/orders/:id/dispatch`

## [Dispatch an Order](#dispatch-an-order)

Envía un pedido a un conductor o a un conductor elegible asignado. La respuesta devuelve el pedido después de aplicar el estado de envío.

PATCH
`/v1/orders/:id/dispatch`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/orders/:id/dispatch \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "created",
    "status_code": "created",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": "2026-05-08T14:30:00.000000Z",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders/:id/start`

## [Start an Order](#start-an-order)

Inicia un pedido y lo pasa a un estado de ejecución activo. Úselo cuando un conductor o un coordinador comienzan la ejecución.

Parámetros del cuerpo

`skip_dispatch`

booleano

opcional

Inicia el pedido incluso si no se ha enviado.

`skipDispatch`

booleano

opcional

Alias camelCase para
`skip_dispatch`
.

`assign`

cadena

opcional

ID del conductor para asignar antes de iniciar un pedido ad hoc.

POST
`/v1/orders/:id/start`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/start \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "skip_dispatch": false
}'
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_1A2b3C4d5E",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "started",
    "status_code": "started",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "started",
  "pod_method": null,
  "pod_required": false,
  "dispatched": true,
  "started": true,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 4830,
  "time": 875,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": "2026-05-07T08:52:00.000000Z",
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:52:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders/:id/update-activity`

## [Update Order Activity](#update-order-activity)

Actualiza el estado de actividad actual para un pedido. La respuesta devuelve el pedido con la última actividad aplicada.

Parámetros del cuerpo

`activity`

objeto

opcional

Carga de actividad para aplicar al pedido. Fleetbase lo resuelve contra el flujo de configuración del pedido.

`proof`

objeto

opcional

Datos de prueba opcionales para adjuntar cuando se actualiza una entidad o un punto de paso.

`skip_dispatch`

booleano

opcional

Utiliza la primera actividad iniciada en lugar de enviar el pedido si la actividad enviada es
`dispatched`
.

`skipDispatch`

booleano

opcional

Alias camelCase para
`skip_dispatch`
.

POST
`/v1/orders/:id/update-activity`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/update-activity \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "activity": {{next_activity}},
    "skip_dispatch": false
}'
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_9Z8y7X6w5V",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "in_progress",
    "status_code": "in_progress",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "in_progress",
  "pod_method": null,
  "pod_required": false,
  "dispatched": true,
  "started": true,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 4830,
  "time": 875,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": "2026-05-07T08:52:00.000000Z",
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:55:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

GET
`/v1/orders/:id/next-activity`

## [Get Order Next Activity](#get-order-next-activity)

Devuelve la siguiente actividad de flujo de trabajo para un pedido. Úselo para determinar el siguiente paso operativo disponible para el conductor o el coordinador asignado.

GET
`/v1/orders/:id/next-activity`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/next-activity?waypoint={{current_waypoint_id}} \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "code": "started",
    "status": "Order started",
    "details": "The assigned driver has started the order.",
    "sequence": 2,
    "_resolved_status": "Order started",
    "_resolved_details": "The assigned driver has started the order."
  },
  {
    "code": "completed",
    "status": "Order completed",
    "details": "The order has been completed.",
    "sequence": 3,
    "require_pod": true,
    "pod_method": "signature",
    "_resolved_status": "Order completed",
    "_resolved_details": "The order has been completed."
  }
]
```

PATCH
`/v1/orders/:id/set-destination/:placeId`

## [Set Order Destination](#set-order-destination)

Establece el punto de destino o el lugar para un pedido. La respuesta devuelve el pedido actualizado después de cambiar el destino.

PATCH
`/v1/orders/:id/set-destination/:placeId`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/orders/:id/set-destination/:placeId \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_9Z8y7X6w5V",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "in_progress",
    "status_code": "in_progress",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "type": "transport",
  "status": "in_progress",
  "pod_method": null,
  "pod_required": false,
  "dispatched": true,
  "started": true,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 4830,
  "time": 875,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": "2026-05-07T08:52:00.000000Z",
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:58:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders/:id/capture-signature/:subject-id`

## [Capture Signature for Order](#capture-signature-for-order)

Captura una prueba de firma para un pedido o un sujeto de pedido. Úselo cuando un flujo de trabajo requiere una prueba de firma.

Parámetros del cuerpo

`signature`

cadena

obligatorio

Datos de imagen PNG base64. Fleetbase almacena la imagen y la enlaza al registro de prueba.

`remarks`

cadena

opcional

Comentarios almacenados en el registro de prueba.

`data`

objeto

opcional

Datos estructurados de prueba almacenados con el registro de prueba de firma.

`disk`

cadena

opcional

Disco de archivos utilizado para almacenar la imagen de la firma. Por defecto, es el disco de archivos configurado.

`cesta`

cadena

opcional

Cesta de almacenamiento utilizada para el archivo de firma generado.

POST
`/v1/pedidos/:id/capturar-firma/:id_tema`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/pedidos/:id/capturar-firma/:id_tema \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "firma": "{{firma_base64}}",
    "datos": []
}'
```

200

OK

```
{
  "id": "firma_8pQ3mN7xYa",
  "id_tema": "pedido_7YqM3KpL2n",
  "id_pedido": "pedido_7YqM3KpL2n",
  "url": "https://files.example.com/uploads/empresa_123/firmas/firma_8pQ3mN7xYa.png",
  "observaciones": "Verificado por Firma",
  "raw": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "datos": {
    "nombre_destinatario": "Alex Receptor"
  },
  "actualizado_en": "2026-05-07T09:10:00.000000Z",
  "creado_en": "2026-05-07T09:10:00.000000Z"
}
```

POST
`/v1/pedidos/:id/capturar-qr/:id_tema`

## [Capturar Código QR para Pedido](#capturar-codigo-qr-para-pedido)

Captura una prueba de código QR para un pedido o tema de pedido. La respuesta incluye los datos de prueba actualizados asociados con el pedido.

Parámetros del cuerpo

`codigo`

cadena

requerido

Valor del código QR a verificar. El código debe coincidir con el UUID del tema resuelto.

`datos`

objeto

opcional

Metadatos de prueba estructurados almacenados con la prueba QR.

`datos_raw`

objeto

opcional

Carga raw del payload almacenado en el registro de la prueba.

POST
`/v1/pedidos/:id/capturar-qr/:id_tema`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/pedidos/:id/capturar-qr/:id_tema \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "{{codigo_qr}}",
    "datos": [],
    "datos_raw": []
}'
```

200

OK

```
{
  "id": "firma_x9L2mN4pQr",
  "id_tema": "entidad_4Kp9Lm2QxZ",
  "id_pedido": "pedido_7YqM3KpL2n",
  "url": null,
  "observaciones": "Verificado por Escaneo de Código QR",
  "raw": "entidad-qr-scan-payload",
  "datos": {
    "scanner": "aplicación-conductor"
  },
  "actualizado_en": "2026-05-07T09:05:00.000000Z",
  "creado_en": "2026-05-07T09:05:00.000000Z"
}
```

GET
`/v1/pedidos`

## [Obtener un Pedido](#obtener-un-pedido)

Obtiene un solo pedido por ID. La respuesta incluye los campos públicos del pedido, así como los datos de carga, el seguimiento, la asignación, el cliente y el facilitador, cuando estén disponibles.

GET
`/v1/pedidos`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/pedidos \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "pedido_7YqM3KpL2n",
  "id_interno": "ORD-1001",
  "config_pedido": "config_pedido_transporte",
  "cliente": {
    "id": "contacto_6zV1KqN9pR",
    "nombre": "Acme Receiving",
    "tipo": "contacto-cliente"
  },
  "datos": {
    "id": "payload_x9Z2Lm8QpA",
    "recogida": {
      "id": "lugar_1A2b3C4d5E",
      "nombre": "Marina Bay Sands",
      "direccion": "10 Bayfront Avenue, Singapore 018956"
    },
    "entrega": {
      "id": "lugar_9Z8y7X6w5V",
      "nombre": "321 Orchard Rd",
      "direccion": "321 Orchard Rd, Singapore"
    },
    "devolucion": null,
    "puntos_ruta": [],
    "entidades": [],
    "meta": {}
  },
  "facilitador": null,
  "conductor_asignado": null,
  "vehiculo_asignado": null,
  "numero_de_seguimiento": {
    "id": "seguimiento_3Nf8Qw2YxM",
    "numero_de_seguimiento": "FB-1001",
    "estado": "creado",
    "codigo_estado": "creado",
    "tipo": "pedido"
  },
  "estados_de_seguimiento": [],
  "archivos": [],
  "tasa_de_compra": null,
  "notas": "Entregar en la zona de recepción.",
  "tipo": "transporte",
  "estado": "creado",
  "metodo_de_contenedor": null,
  "contenedor_requerido": false,
  "despachado": false,
  "comenzado": false,
  "ad_hoc": false,
  "distancia_ad_hoc": 0,
  "distancia": 0,
  "tiempo": 0,
  "meta": {},
  "despachado_en": null,
  "comenzado_en": null,
  "programado_en": null,
  "actualizado_en": "2026-05-07T08:30:00.000000Z",
  "creado_en": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/pedidos/:id`

## [Actualizar un Pedido](#actualizar-un-pedido)

Actualiza un pedido y devuelve el recurso de pedido actualizado. Puede actualizar los metadatos del pedido, las notas, el estado, los campos de asignación, los campos de programación, la configuración de prueba de entrega y los detalles del payload.

Parámetros del cuerpo

`payload`

objeto

opcional

ID de payload existente o datos de payload incorporados para reemplazar o actualizar el payload del pedido.

`recogida`

objeto

opcional

Datos de lugar de recogida o dirección de reemplazo para el payload del pedido.

`entrega`

objeto

opcional

Datos de lugar de entrega o dirección de reemplazo para el payload del pedido.

`devolucion`

objeto

opcional

Datos de lugar de devolución o dirección de reemplazo para el payload del pedido.

`puntos_ruta`

array de objetos

opcional

Lista de puntos de ruta de reemplazo. Cuando se envía vacío con los campos de ruta, los puntos de ruta existentes se eliminan.

`entidades`

array de objetos

opcional

Metadatos de prueba estructurados almacenados con la prueba QR.

`datos_raw`

objeto

opcional

Carga raw del payload almacenado en el registro de la prueba.

POST
`/v1/pedidos/:id`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/pedidos/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "{{codigo_qr}}",
    "datos": [],
    "datos_raw": []
}'
```

200

OK

```
{
  "id": "firma_x9L2mN4pQr",
  "id_tema": "entidad_4Kp9Lm2QxZ",
  "id_pedido": "pedido_7YqM3KpL2n",
  "url": null,
  "observaciones": "Verificado por Escaneo de Código QR",
  "raw": "entidad-qr-scan-payload",
  "datos": {
    "scanner": "aplicación-conductor"
  },
  "actualizado_en": "2026-05-07T09:05:00.000000Z",
  "creado_en": "2026-05-07T09:05:00.000000Z"
}
```

GET
`/v1/pedidos/:id/distancia-y-tiempo`

## [Obtener Distancia y Tiempo del Pedido](#obtener-distancia-y-tiempo-del-pedido)

Devuelve y actualiza la matriz de distancia/tiempo del pedido.

GET
`/v1/pedidos/:id/distancia-y-tiempo`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/pedidos/:id/distancia-y-tiempo \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "distancia": 4830,
  "tiempo": 875
}
```

POST
`/v1/pedidos/:id/completar`

## [Completar un Pedido](#completar-un-pedido)

Completar un pedido después de que se hayan completado todos los puntos de ruta.

POST
`/v1/pedidos/:id/completar`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/pedidos/:id/completar \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```json
{
  "id": "orden_7YqM3KpL2n",
  "id_interno": "ORD-1001",
  "configuración_de_la_orden": "order_config_transport",
  "datos": {
    "id": "payload_x9Z2Lm8QpA",
    "puntos_de_referencia": [],
    "entidades": [],
    "meta": {}
  },
  "cliente": null,
  "facilitador": null,
  "conductor_asignado": {
    "id": "conductor_A1b2C3d4E5",
    "nombre": "Alex Driver"
  },
  "vehículo_asignado": null,
  "número_de_seguimiento": {
    "id": "tracking_3Nf8Qw2YxM",
    "número_de_seguimiento": "FB-1001",
    "estado": "completado",
    "código_de_estado": "completado",
    "tipo": "orden"
  },
  "estados_de_seguimiento": [],
  "archivos": [],
  "tasa_de_compra": null,
  "notas": "Entregar a través del área de recepción.",
  "tipo": "transporte",
  "estado": "completado",
  "método_de_recibo": "firma",
  "requerido_de_recibo": true,
  "asignado": true,
  "iniciado": true,
  "ad_hoc": false,
  "distancia_ad_hoc": 0,
  "distancia": 4830,
  "tiempo": 875,
  "meta": {},
  "asignado_en": "2026-05-07T08:50:00.000000Z",
  "iniciado_en": "2026-05-07T08:52:00.000000Z",
  "programado_en": null,
  "actualizado_en": "2026-05-07T09:20:00.000000Z",
  "creado_en": "2026-05-07T08:30:00.000000Z"
}
```

```
GET
`/v1/orders/:id/tracker`

## [Obtener el seguimiento de la orden](#get-order-tracker)

Devuelve los datos de seguimiento públicos para una orden.

GET
`/v1/orders/:id/tracker`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/tracker \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "ubicación_actual_del_conductor": {
    "latitud": 1.2921,
    "longitud": 103.8502
  },
  "porcentaje_de_progreso": 42.5,
  "distancia_total": 4830,
  "distancia_completada": 2053,
  "tiempo_estimado_de_llegada_a_la_destinación_actual": 720,
  "tiempo_estimado_de_llegada": 1540,
  "tiempo_estimado_de_finalización": "2026-05-07T09:35:00.000000Z",
  "tiempo_estimado_de_finalización_formateado": "7 de mayo de 2026 09:35",
  "hora_de_inicio": "2026-05-07T08:52:00.000000Z",
  "hora_de_finalización": null,
  "destino_actual": {
    "id": "place_9Z8y7X6w5V",
    "nombre": "321 Orchard Rd"
  },
  "siguiente_destino": null,
  "primer_punto_de_referencia_completado": true,
  "último_punto_de_referencia_completado": false
}
```

```
GET
`/v1/orders/:id/eta`

## [Obtener el ETA de la orden](#get-order-eta)

Devuelve los datos ETA para una orden.

GET
`/v1/orders/:id/eta`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/eta \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "9b14b5c4-4669-4f1b-8d52-ef5d9317ad6b": 720,
  "2c44c9f7-4e50-463a-bd0f-f50ab6d2f5e1": 1540
}
```

```
GET
`/v1/orders/:id/comments`

## [Listar comentarios de la orden](#list-order-comments)

Lista los comentarios adjuntos a una orden.

GET
`/v1/orders/:id/comments`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/comments \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "comment_6gK2mN8pQa",
    "contenido": "El conductor debe utilizar la entrada de la zona de recepción.",
    "etiquetas": [],
    "meta": {},
    "autor": {
      "id": "user_4xK2mQ8pAa",
      "nombre": "Alex Dispatcher"
    },
    "respuestas": [],
    "editable": false,
    "actualizado_en": "2026-05-07T08:45:00.000000Z",
    "creado_en": "2026-05-07T08:45:00.000000Z",
    "eliminado_en": null
  }
]
```

```
POST
`/v1/orders/:id/capture-photo/:subjectId`

## [Capturar foto para la orden](#capture-photo-for-order)

Captura fotos de prueba para una orden o un objeto de la orden.

Parámetros del cuerpo

`fotos`

array de strings

requerido

Una o más imágenes cargadas o cadenas de imagen Base64. Cada elemento debe ser una imagen de un tamaño no mayor de 10 MB.

`comentarios`

string

opcional

Predeterminado:
`Verificado por foto`

Comentarios almacenados para cada registro de prueba.

`datos`

objeto

opcional

Metadatos estructurados de prueba almacenados para cada prueba de foto.

`disco`

string

opcional

Sistema de archivos en el que se almacenan las fotos de prueba. Por defecto, se utiliza el sistema de archivos.
```

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/capture-photo/:subjectId \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "fotos": [
    "{{proof_photo_base64}}"
  ],
  "comentarios": "Verificado por Foto",
  "datos": {}
}'
```

Otras formas de llamar a esta función

* OK

200

OK

```
{
  "ubicación_actual_del_conductor": {
    "latitud": 1.2921,
    "longitud": 103.8502
  },
  "porcentaje_de_progreso": 42.5,
  "distancia_total": 4830,
  "distancia_completada": 2053,
  "tiempo_estimado_de_llegada_a_la_destinación_actual": 720,
  "tiempo_estimado_de_llegada": 1540,
  "tiempo_estimado_de_finalización": "2026-05-07T09:35:00.000000Z",
  "tiempo_estimado_de_finalización_formateado": "7 de mayo de 2026 09:35",
  "hora_de_inicio": "2026-05-07T08:52:00.000000Z",
  "hora_de_finalización": null,
  "destino_actual": {
    "id": "place_9Z8y7X6w5V",
    "nombre": "321 Orchard Rd"
  },
  "siguiente_destino": null,
  "primer_punto_de_referencia_completado": true,
  "último_punto_de_referencia_completado": false
}
```

```
GET
`/v1/orders/:id/eta`

## [Obtener el ETA de la orden](#get-order-eta)

Devuelve los datos ETA para una orden.

GET
`/v1/orders/:id/eta`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/eta \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "9b14b5c4-4669-4f1b-8d52-ef5d9317ad6b": 720,
  "2c44c9f7-4e50-463a-bd0f-f50ab6d2f5e1": 1540
}
```

```
GET
`/v1/orders/:id/comments`

## [Listar comentarios de la orden](#list-order-comments)

Lista los comentarios adjuntos a una orden.

GET
`/v1/orders/:id/comments`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/comments \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "comment_6gK2mN8pQa",
    "contenido": "El conductor debe utilizar la entrada de la zona de recepción.",
    "etiquetas": [],
    "meta": {},
    "autor": {
      "id": "user_4xK2mQ8pAa",
      "nombre": "Alex Dispatcher"
    },
    "respuestas": [],
    "editable": false,
    "actualizado_en": "2026-05-07T08:45:00.000000Z",
    "creado_en": "2026-05-07T08:45:00.000000Z",
    "eliminado_en": null
  }
]
```

```
POST
`/v1/orders/:id/capture-photo/:subjectId`

## [Capturar foto para la orden](#capture-photo-for-order)

Captura fotos de prueba para una orden o un objeto de la orden.

Parámetros del cuerpo

`fotos`

array de strings

requerido

Una o más imágenes cargadas o cadenas de imagen Base64. Cada elemento debe ser una imagen de un tamaño no mayor de 10 MB.

`comentarios`

string

opcional

Predeterminado:
`Verificado por foto`

Comentarios almacenados para cada registro de prueba.

`datos`

objeto

opcional

Metadatos estructurados de prueba almacenados para cada prueba de foto.

`disco`

string

opcional

Sistema de archivos en el que se almacenan las fotos de prueba. Por defecto, se utiliza el sistema de archivos.
```

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/capture-photo/:subjectId \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "fotos": [
    "{{proof_photo_base64}}"
  ],
  "comentarios": "Verificado por Foto",
  "datos": {}
}'
```

Otras formas de llamar a esta función

* OK

200

OK

```
{
  "id": "proof_3Vq8mN2xLa",
  "subject_id": "order_7YqM3KpL2n",
  "order_id": "order_7YqM3KpL2n",
  "url": "https://files.example.com/uploads/company_123/photos/proof_3Vq8mN2xLa.png",
  "comentarios": "Verificado por Foto",
  "raw": "iVBORw0KGgoAAAANSUhEUgAA...",
  "datos": {
    "captured_by": "driver-app"
  },
  "actualizado_en": "2026-05-07T09:15:00.000000Z",
  "creado_en": "2026-05-07T09:15:00.000000Z"
}
```

```
GET
`/v1/orders/:id/proofs/:subjectId`

## [Listar pruebas de la orden](#list-order-proofs)

Lista los recursos de prueba de entrega para una orden o un objeto.

GET
`/v1/orders/:id/proofs/:subjectId`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/proofs/:subjectId \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "proof_8pQ3mN7xYa",
    "subject_id": "order_7YqM3KpL2n",
    "order_id": "order_7YqM3KpL2n",
    "url": "https://files.example.com/uploads/company_123/signatures/proof_8pQ3mN7xYa.png",
    "comentarios": "Verificado por Firma",
    "raw": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "datos": {
      "recipient_name": "Alex Receiver"
    },
    "actualizado_en": "2026-05-07T09:10:00.000000Z",
    "creado_en": "2026-05-07T09:10:00.000000Z"
  }
]
```

```
GET
`/v1/orders/:id/editable-entity-fields`

## [Obtener campos de entidad editable](#get-order-editable-entity-fields)

Devuelve los campos de entidad editable para una orden.

GET
`/v1/orders/:id/editable-entity-fields`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/editable-entity-fields \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "key": "peso",
    "etiqueta": "Peso",
    "tipo": "número"
  },
  {
    "key": "longitud",
    "etiqueta": "Longitud",
    "tipo": "número"
  }
]
```