---
title: "Cotizaciones de servicios"
url: https://fleetbase.io/docs/api/fleetbase/service-quotes
module: api
---

# Cotizaciones de servicios

Las cotizaciones de servicios permiten estimar el precio de un movimiento antes de crear un pedido. Utilice las cotizaciones para estimar el coste de envío, seleccionar un tipo de servicio o un facilitador, y convertir los precios aceptados en un pedido.

* [Consultar cotizaciones de servicios

  GET
  `/v1/service-quotes`](#consultar-cotizaciones-de-servicios)
* [Obtener una cotización de servicios

  GET
  `/v1/service-quotes/:id`](#obtener-una-cotizacion-de-servicios)

GET
`/v1/service-quotes`

## [Consultar cotizaciones de servicios](#consultar-cotizaciones-de-servicios)

Este punto final se utiliza para obtener las cotizaciones de tarifas basadas en la ubicación del punto de recogida y la ubicación del punto de entrega, o el peso de la carga.

Para algunas cotizaciones, como las basadas en paquetes, es necesario incluir el peso de la carga para calcular el coste de la misma.

Parámetros de consulta

`payload`

string

opcional

ID del paquete o objeto de paquete asociado al recurso.

GET
`/v1/service-quotes`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-quotes?payload={{payload_id}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
[
  {
    "id": "<string>",
    "service_rate": "<string>",
    "request_id": "<string>",
    "amount": "<number>",
    "currency": "<string>",
    "created_at": "<string>",
    "updated_at": "<string>"
  }
]
```

GET
`/v1/service-quotes/:id`

## [Obtener una cotización de servicios](#obtener-una-cotizacion-de-servicios)

Obtiene una cotización de servicios por ID.

GET
`/v1/service-quotes/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-quotes/:id \
  -H "Authorization: Bearer flb_live_…"
```