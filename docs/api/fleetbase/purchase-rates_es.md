---
título: "Tasas de compra"
url: https://fleetbase.io/docs/api/fleetbase/purchase-rates
módulo: api
---

# Tasas de compra

Las tasas de compra registran el costo pagado para adquirir capacidad o servicios de transportistas, proveedores y proveedores integrados. Úselas para comparar los costos de compra con las tarifas de servicio que se ofrecen a los clientes.

* [El objeto "Tasa de compra"](#el-objeto-tasa-de-compra)
* [Crear una tasa de compra

  POST
  `/v1/purchase-rates`](#crear-una-tasa-de-compra)
* [Obtener una tasa de compra

  GET
  `/v1/purchase-rates/:id`](#obtener-una-tasa-de-compra)
* [Consultar tasas de compra

  GET
  `/v1/purchase-rates`](#consultar-tasas-de-compra)

## El objeto "Tasa de compra"

Un objeto "tasa de compra" registra una cotización de servicio y la vincula a un pedido, cliente, transacción, importe, moneda y estado.

Atributos

`id`

string

opcional

Identificador público de la tasa de compra.

`service_quote`

string

opcional

Cotización de servicio asociada a la compra.

`order`

string

opcional

Pedido asociado a la compra.

`customer`

string

opcional

Identificador de cliente o proveedor al que se asigna la compra.

`transaction`

string

opcional

Transacción asociada a la compra.

`amount`

moneda

opcional

Importe de la compra.

`currency`

moneda

opcional

Código de moneda de tres caracteres.

`status`

string

opcional

Estado de la tasa de compra.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la tasa de compra.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la tasa de compra.

El
objeto "Tasa de compra"

```
{
  "id": "purchase_rate_7YqM3KpL2n",
  "service_quote": "service_quote_6zV1KqN9pR",
  "order": "order_7YqM3KpL2n",
  "customer": "contact_6zV1KqN9pR",
  "transaction": null,
  "amount": 2500,
  "currency": "USD",
  "status": "created",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/purchase-rates`

## [Crear una tasa de compra](#crear-una-tasa-de-compra)

Solo los objetos "ServiceQuote" generados utilizando un objeto "Payload" pueden utilizarse para crear objetos "PurchaseRate".

Parámetros del cuerpo

`service_quote`

string

obligatorio

ID de la cotización de servicio para la compra.

`order`

string

opcional

ID de pedido existente al que se adjunta la tasa de compra. Si se omite, Fleetbase puede crear un pedido a partir de la cotización de servicio.

`customer`

string

opcional

ID de contacto o proveedor al que se asigna como cliente de compra.

`meta`

objeto

opcional

Metadatos adicionales de la tasa de compra.

POST
`/v1/purchase-rates`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/purchase-rates \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "service_quote": "{{service_quote_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "customer": "<string>",
  "order": "<string>",
  "service_quote": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/purchase-rates/:id`

## [Obtener una tasa de compra](#obtener-una-tasa-de-compra)

Este punto final le permite obtener un objeto "tasa de compra" para ver sus detalles.

GET
`/v1/purchase-rates/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/purchase-rates/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "customer": "<string>",
  "order": "<string>",
  "service_quote": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/purchase-rates`

## [Consultar tasas de compra](#consultar-tasas-de-compra)

Este punto final le permite consultar las tasas de compra que ha creado, y también proporciona resultados paginados de todas las tasas de compra en su Fleetbase.

Parámetros de consulta

`limit`

entero

opcional

Número máximo de tasas de compra a devolver.

`offset`

entero

opcional

Número de tasas de compra a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de la tasa de compra.

`service_quote`

string

opcional

Filtra las tasas de compra por ID de cotización de servicio.

`order`

string

opcional

Filtra las tasas de compra por ID de pedido.

`customer`

string

opcional

Filtra las tasas de compra por ID de cliente.

GET
`/v1/purchase-rates`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/purchase-rates?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```