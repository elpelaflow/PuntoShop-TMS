---
title: "Facturas Públicas"
url: https://fleetbase.io/docs/api/ledger/public-invoices
module: api
---

# Facturas Públicas

Las facturas públicas permiten a los clientes visualizar y pagar las facturas sin iniciar sesión en Fleetbase. Utilice estos puntos finales para obtener los detalles de la factura, listar los gateways disponibles y iniciar o registrar el pago.

* [El objeto Factura Pública](#the-public-invoice-object)
* [Obtener Factura Pública

  GET
  `/public/invoices`](#get-public-invoice)
* [Listar Gateways de Factura Pública

  GET
  `/public/invoices/gateways`](#list-public-invoice-gateways)
* [Pagar Factura Pública

  POST
  `/public/invoices/pay`](#pay-public-invoice)

## El objeto Factura Pública

Una factura pública es la representación para el cliente de una factura de Ledger. Incluye los totales de la factura, las fechas, los artículos, los datos del cliente (si están disponibles) y el estado del pago.

Atributos

`id`

string

opcional

Identificador público de la factura.

`public_id`

string

opcional

Identificador público de la factura.

`customer`

object

opcional

Cliente asociado a la factura, cuando se carga.

`order`

object

opcional

Orden relacionado, cuando se carga.

`transaction`

object

opcional

Transacción relacionada, cuando se carga.

`template`

object

opcional

Plantilla de factura, cuando se carga.

`number`

string

opcional

Número de factura.

`status`

string

opcional

Estado de la factura.

`date`

date

opcional

Fecha de emisión de la factura.

`due_date`

date

opcional

Fecha de vencimiento de la factura.

`currency`

currency

opcional

Código de moneda de la factura.

`subtotal`

integer

opcional

Subtotal en la unidad de moneda más pequeña.

`tax`

integer

opcional

Importe del impuesto en la unidad de moneda más pequeña.

`total_amount`

integer

opcional

Importe total de la factura en la unidad de moneda más pequeña.

`amount_paid`

integer

opcional

Importe pagado en la unidad de moneda más pequeña.

`balance`

integer

opcional

Saldo restante en la unidad de moneda más pequeña.

`notes`

string

opcional

Notas de la factura.

`terms`

string

opcional

Términos de pago de la factura.

`items`

array of objects

opcional

Artículos de la factura.

`meta`

object

opcional

Metadatos arbitrarios almacenados con la factura.

`sent_at`

timestamp

opcional

Hora en la que se envió la factura.

`viewed_at`

timestamp

opcional

Hora en la que se visualizó la factura por primera vez públicamente.

`paid_at`

timestamp

opcional

Hora en la que se pagó la factura.

`created_at`

timestamp

opcional

Hora en la que se creó la factura.

`updated_at`

timestamp

opcional

Hora en la que se actualizó por última vez la factura.

El
objeto Factura Pública
```
{
  "id": "invoice_7fJ3kQ9",
  "public_id": "invoice_7fJ3kQ9",
  "customer": null,
  "order": null,
  "transaction": null,
  "template": null,
  "number": "INV-1007",
  "status": "sent",
  "date": "2026-05-07",
  "due_date": "2026-05-21",
  "currency": "USD",
  "subtotal": 12500,
  "tax": 0,
  "total_amount": 12500,
  "amount_paid": 0,
  "balance": 12500,
  "notes": "Gracias por su preferencia.",
  "terms": "Vencimiento a la recepción.",
  "items": [],
  "meta": {},
  "sent_at": "2026-05-07T09:30:00Z",
  "viewed_at": null,
  "paid_at": null,
  "created_at": "2026-05-07T09:30:00Z",
  "updated_at": "2026-05-07T09:30:00Z"
}
```

GET
`/public/invoices`

## [Obtener Factura Pública](#get-public-invoice)

Obtiene la vista pública de una factura mediante el ID público o UUID. Las facturas no pagadas no están disponibles a través de la URL de la factura pública.

GET
`/public/invoices`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/public/invoices \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/public/invoices/gateways`

## [Listar Gateways de Factura Pública](#list-public-invoice-gateways)

Lista los gateways de pago activos disponibles para una factura pública. Los credenciales y la configuración sensible del gateway nunca se devuelven.

GET
`/public/invoices/gateways`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/public/invoices/gateways \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/public/invoices/pay`

## [Pagar Factura Pública](#pay-public-invoice)

Inicia o registra el pago de una factura pública. Los gateways de Stripe devuelven una URL de pago, mientras que los gateways sin redirección registran el pago de la factura inmediatamente.

Parámetros del cuerpo

`gateway_id`

string

requerido

ID público del gateway de pago que se utilizará para el pago de la factura.

`reference`

string

opcional

Referencia de pago proporcionada por el cliente o nota.

POST
`/public/invoices/pay`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/public/invoices/pay \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "gateway_id": "{{gateway_id}}",
  "reference": "{{payment_reference}}"
}'
```