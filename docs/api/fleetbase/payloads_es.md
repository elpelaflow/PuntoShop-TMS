---
title: "Cargas"
url: https://fleetbase.io/docs/api/fleetbase/payloads
module: api
---

# Cargas

Las cargas describen lo que transporta un pedido y de dónde se recoge a dónde se entrega. Utilice los puntos finales de carga para gestionar el contenido del envío, los detalles de pago y las entidades asociadas a un pedido.

* [El objeto de carga](#el-objeto-de-carga)
* [Crear una carga

  POST
  `/v1/payloads`](#crear-una-carga)
* [Obtener una carga

  GET
  `/v1/payloads/:id`](#obtener-una-carga)
* [Consultar cargas

  GET
  `/v1/payloads`](#consultar-cargas)
* [Actualizar una carga

  PUT
  `/v1/payloads/:id`](#actualizar-una-carga)
* [Eliminar una carga

  DELETE
  `/v1/payloads/:id`](#eliminar-una-carga)

## El objeto de carga

Una carga describe lo que transporta un pedido y de dónde se recoge a dónde se entrega. Vincula el punto de recogida, el punto de entrega, la devolución, los puntos de referencia, las entidades, la configuración de pago en la entrega y los metadatos.

Atributos

`id`

string

opcional

Identificador público de la carga.

`current_waypoint`

string

opcional

ID público del punto de referencia actual, cuando se establece uno.

`pickup`

objeto

opcional

Lugar de recogida para la carga.

`dropoff`

objeto

opcional

Lugar de entrega para la carga.

`return`

objeto

opcional

Lugar de devolución para la carga.

`waypoints`

array de objetos

opcional

Lista ordenada de puntos de referencia para la carga.

`entities`

array de objetos

opcional

Recursos de entidades adjuntos a la carga.

`cod_amount`

currency

opcional

Monto de pago en la entrega.

`cod_currency`

currency

opcional

Código de moneda de tres letras para `cod_amount`.

`cod_payment_method`

string

opcional

Método de pago en la entrega.

`payment_method`

string

opcional

Método de pago asociado a la carga.

`meta`

objeto

opcional

Metadatos adicionales de la carga.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la carga.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la carga.

El
objeto de carga

```
{
  "id": "payload_x9Z2Lm8QpA",
  "current_waypoint": "place_1A2b3C4d5E",
  "pickup": {
    "id": "place_1A2b3C4d5E",
    "name": "Almacén 7"
  },
  "dropoff": {
    "id": "place_9Z8y7X6w5V",
    "name": "Dique del cliente"
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
}
```

POST
`/v1/payloads`

## [Crear una carga](#crear-una-carga)

Crea una carga que contenga los puntos finales de ruta y entidades opcionales. Proporcione puntos finales de recogida/entrega o una lista de puntos de referencia, y luego adjunte las entidades según sea necesario.

Parámetros del cuerpo

`pickup`

objeto

opcional

Datos del lugar de recogida, cadena de dirección o ID del lugar para la carga.

`dropoff`

objeto

opcional

Datos del lugar de entrega, cadena de dirección o ID del lugar para la carga.

`return`

objeto

opcional

Datos opcionales del lugar de devolución, cadena de dirección o ID del lugar para la carga.

`waypoints`

array de objetos

opcional

Lista ordenada de puntos de referencia para la carga.

`entities`

array de objetos

opcional

Entidades, paquetes o elementos adjuntos a la carga.

`type`

string

obligatorio

Tipo de carga. Es obligatorio al crear una carga.

`provider`

string

opcional

Identificador del proveedor asociado a la carga.

`cod_amount`

currency

opcional

Monto de pago en la entrega.

`cod_currency`

currency

opcional

Código de moneda de tres letras para `cod_amount`. Es obligatorio cuando se proporciona `cod_amount`.

`cod_payment_method`

enum

opcional

Método de pago en la entrega. Es obligatorio cuando se proporciona `cod_amount`. Uno de `card`, `check`, `cash`, `bank_transfer`.

`meta`

objeto

opcional

Metadatos adicionales de la carga.

POST
`/v1/payloads`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/payloads \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "pickup": {
    "street1": "10 Bayfront Avenue",
    "city": "Singapore",
    "postal_code": "018956",
    "country": "SG"
  },
  "dropoff": {
    "street1": "80 Mandai Lake Rd",
    "city": "Singapore",
    "postal_code": "729826",
    "country": "SG"
  },
  "type": "food_delivery"
}'
```

Otras formas de llamar a este método

* Crear una carga con múltiples puntos de referencia

201

OK

```
{
  "id": "payload_oz5R9Z6",
  "current_waypoint": null,
  "pickup": null,
  "dropoff": null,
  "return": null,
  "waypoints": [],
  "entities": [],
  "cod_amount": null,
  "cod_currency": null,
  "cod_payment_method": null,
  "meta": [],
  "updated_at": "2023-12-27T09:40:21.000000Z",
  "created_at": "2023-12-27T09:40:21.000000Z"
}
```

GET
`/v1/payloads/:id`

## [Obtener una carga](#obtener-una-carga)

Obtener una carga.

GET
`/v1/payloads/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/payloads/:id \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/payloads`

## [Consultar cargas](#consultar-cargas)

Devuelve las cargas para la empresa actual. Utilice los parámetros de paginación y ordenación para navegar por los registros de carga.

Parámetros de consulta

`limit`

integer

opcional

Número máximo de cargas a devolver.

`offset`

integer

opcional

Número de cargas a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de ordenación para la consulta de carga.

GET
`/v1/payloads`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/payloads?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/payloads/:id`

## [Actualizar una carga](#actualizar-una-carga)

Actualice los puntos finales de ruta, los puntos de referencia, las entidades, la configuración de pago en la entrega o los metadatos de la carga. La respuesta devuelve la carga actualizada con datos de ruta y entidad.

Parámetros del cuerpo

`pickup`

objeto

opcional

Datos de reemplazo del lugar de recogida, cadena de dirección o ID del lugar para la carga.

`dropoff`

objeto

opcional

Datos de reemplazo del lugar de entrega, cadena de dirección o ID del lugar para la carga.

`return`

objeto

opcional

Datos de reemplazo del lugar de devolución, cadena de dirección o ID del lugar para la carga.

`waypoints`

array de objetos

opcional

Lista de puntos de referencia de reemplazo. El envío de campos de punto de referencia sin puntos de referencia elimina los puntos de referencia existentes.

`entities`

array de objetos

opcional

Entidades, paquetes o elementos adjuntos a la carga.

`type`

string

obligatorio

Tipo de carga. Es obligatorio al crear una carga.

`provider`

string

opcional

Identificador del proveedor asociado a la carga.

`cod_amount`

currency

opcional

Monto de pago en la entrega.

`cod_currency`

currency

opcional

Código de moneda de tres letras para `cod_amount`. Es obligatorio cuando se proporciona `cod_amount`.

`cod_payment_method`

enum

opcional

Método de pago en la entrega. Es obligatorio cuando se proporciona `cod_amount`. Uno de `card`, `check`, `cash`, `bank_transfer`.

`meta`

objeto

opcional

Metadatos adicionales de la carga.

PUT
`/v1/payloads/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/payloads/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "pickup": {
        "street1": "10 Bayfront Avenue",
        "city": "Singapore",
        "postal_code": "018956",
        "country": "SG"
    },
    "dropoff": {
        "street1": "80 Mandai Lake Rd",
        "city": "Singapore",
        "postal_code": "729826",
        "country": "SG"
    },
    "entities": [
        {
            "name": "UltraHD 4K Smart TV",
            "description": "65-inch high-definition smart TV with vibrant colors and a sleek design.",
            "currency": "USD",
            "price": 1200.00
        },
        {
            "name": "Bluetooth Wireless Headphones",
            "description": "Noise-cancelling, over-ear headphones with long-lasting battery life.",
            "currency": "USD",
            "price": 250.00
        },
        {
            "name": "Smart Fitness Watch",
            "description": "Water-resistant fitness watch with heart rate monitor and GPS tracking.",
            "currency": "USD",
            "price": 199.99
        }
    ]
}'
```

DELETE
`/v1/payloads/:id`

## [Eliminar una carga](#eliminar-una-carga)

Elimina una carga.

DELETE
`/v1/payloads/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/payloads/:id \
  -H "Authorization: Bearer flb_live_…"
```