---
title: "Cartera"
url: https://fleetbase.io/docs/api/ledger/wallet
module: api
---

# Cartera

Los endpoints de "Cartera" exponen el saldo y el historial de transacciones del usuario autenticado. Utilice las carteras para obtener los fondos actuales, inspeccionar la actividad del registro y iniciar depósitos a través de una puerta de enlace configurada.

* [El objeto "Cartera"](#el-objeto-cartera)
* [Obtener Cartera

  GET
  `/v1/wallet`](#obtener-cartera)
* [Obtener el Saldo de la Cartera

  GET
  `/v1/wallet/balance`](#obtener-el-saldo-de-la-cartera)
* [Listar Transacciones de la Cartera

  GET
  `/v1/wallet/transactions`](#listar-transacciones-de-la-cartera)
* [Depositar en la Cartera

  POST
  `/v1/wallet/topup`](#depositar-en-la-cartera)

## El objeto "Cartera"

Una cartera rastrea el saldo para el usuario autenticado. Ledger almacena los valores monetarios en la unidad de moneda más pequeña.

Atributos

`id`

string

opcional

Identificador público de la cartera.

`subject_uuid`

string

opcional

UUID del modelo que posee la cartera.

`subject_type`

string

opcional

Clase de modelo que posee la cartera.

`subject`

object

opcional

Cartera propietaria cargada, cuando está incluida.

`name`

string

opcional

Nombre de la cartera.

`description`

string

opcional

Descripción de la cartera.

`type`

string

opcional

Tipo de cartera.

`balance`

integer

opcional

Saldo de la cartera en la unidad de moneda más pequeña.

`formatted_balance`

string

opcional

Saldo de la cartera legible para humanos.

`currency`

currency

opcional

Código de moneda de la cartera.

`status`

string

opcional

Estado de la cartera.

`is_frozen`

boolean

opcional

Si la actividad de la cartera está congelada.

`meta`

object

opcional

Metadatos arbitrarios almacenados con la cartera.

`created_at`

timestamp

opcional

Hora en que se creó la cartera.

`updated_at`

timestamp

opcional

Hora en que se actualizó por última vez la cartera.

El
objeto
"Cartera"

```
{
  "id": "wallet_2Tn8Qk1",
  "subject_uuid": "9c6292e4-9d7b-4ab4-94a1-3f4a11c1cf25",
  "subject_type": "Fleetbase\\Models\\User",
  "subject": null,
  "name": "Cartera predeterminada",
  "description": null,
  "type": "predeterminada",
  "balance": 5000,
  "formatted_balance": "50.00",
  "currency": "USD",
  "status": "activa",
  "is_frozen": false,
  "meta": {},
  "created_at": "2026-05-07T09:30:00Z",
  "updated_at": "2026-05-07T09:30:00Z"
}
```

GET
`/v1/wallet`

## [Obtener Cartera](#obtener-cartera)

Obtiene la cartera del usuario autenticado.  Proporcione la moneda para elegir la moneda de la cartera cuando Fleetbase necesite provisionarla.

Parámetros de consulta

`currency`

currency

opcional

Código de moneda de tres caracteres para los valores monetarios.

GET
`/v1/wallet`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/wallet?currency=USD \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/wallet/balance`

## [Obtener el Saldo de la Cartera](#obtener-el-saldo-de-la-cartera)

Devuelve el saldo de la cartera del usuario autenticado. Fleetbase provisiona una cartera automáticamente cuando no existe una.

Parámetros de consulta

`currency`

currency

opcional

Código de moneda de tres caracteres para los valores monetarios.

GET
`/v1/wallet/balance`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/wallet/balance?currency=USD \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/wallet/transactions`

## [Listar Transacciones de la Cartera](#listar-transacciones-de-la-cartera)

Enumera las transacciones para la cartera del usuario autenticado. Los resultados se pueden filtrar por tipo de transacción, dirección, estado y rango de fecha de creación.

Parámetros de consulta

`type`

enum

opcional

Clasificación utilizada para agrupar o procesar el recurso. Uno de
`customer`
,
`vendor`
,
`driver`
.

`direction`

enum

opcional

Valor de dirección para esta solicitud de cartera. Uno de
`credit`
,
`debit`
.

`status`

enum

opcional

Estado de ciclo de vida para aplicar al recurso. Uno de
`active`
,
`inactive`
.

`date_from`

timestamp

opcional

Valor de fecha de inicio para esta solicitud de cartera.

`date_to`

timestamp

opcional

Valor de fecha de fin para esta solicitud de cartera.

`limit`

string

opcional

Valor de límite para esta solicitud de cartera.

GET
`/v1/wallet/transactions`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/wallet/transactions?type=&direction=&status=&date_from=&date_to=&limit=25 \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/wallet/topup`

## [Depositar en la Cartera](#depositar-en-la-cartera)

Deposita en la cartera del usuario autenticado a través de una puerta de enlace de pago configurada. Los montos se envían en la unidad de moneda más pequeña.

Parámetros del cuerpo

`gateway`

string

obligatorio

ID público o UUID de la puerta de enlace de pago para cobrar.

`amount`

integer

obligatorio

Monto del depósito en la unidad de moneda más pequeña. Debe ser de al menos 100.

`payment_method_token`

string

opcional

Token de método de pago de la puerta de enlace, como un token de Stripe
`pm_`
.

`customer_id`

string

opcional

ID del cliente de la puerta de enlace.

`description`

string

opcional

Descripción almacenada con el depósito. La longitud máxima es de 500 caracteres.

POST
`/v1/wallet/topup`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/wallet/topup \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "gateway": "{{gateway_id}}",
  "amount": 1000,
  "payment_method_token": "{{payment_method_token}}",
  "customer_id": "{{gateway_customer_id}}",
  "description": "Depósito en la cartera"
}'
```