---
título: "Webhooks"
url: https://fleetbase.io/docs/api/ledger/webhooks
módulo: api
---

# Webhooks

Los webhooks reciben eventos de la pasarela de pago y los normalizan para su procesamiento en Ledger. Utilice este recurso para comprender la forma de llamada de retorno que Fleetbase espera de los controladores de pasarela configurados.

* [El objeto Webhook de la pasarela](#el-objeto-webhook-de-la-pasarela)
* [Gestionar el Webhook de la pasarela

  POST
  `/webhooks`](#gestionar-el-webhook-de-la-pasarela)

## El objeto Webhook de la pasarela

Un webhook de la pasarela es un evento entrante del proveedor que es manejado por un controlador de pasarela de pago de Ledger.

Atributos

`message`

cadena

opcional

Resultado del procesamiento devuelto al proveedor de la pasarela.

El
objeto Webhook de la pasarela
```
{
  "message": "Webhook recibido."
}
```

POST
`/webhooks`

## [Gestionar el Webhook de la pasarela](#gestionar-el-webhook-de-la-pasarela)

Recibe un webhook entrante de un controlador de pasarela de pago. Fleetbase verifica el evento de la pasarela, lo registra de forma idempotente y envía eventos de pago normalizados.

Parámetros del cuerpo

`company_uuid`

cadena

opcional

UUID de la organización utilizado para resolver la pasarela activa cuando el controlador de pasarela admite llamadas de retorno multi-organización.

`id`

cadena

opcional

Identificador del evento o transacción de la pasarela del proveedor.

`type`

cadena

opcional

Tipo de evento de la pasarela, como un evento de "pago completado" o "pago fallido".

`data`

objeto

opcional

Datos de webhook específicos del proveedor que se pasan al controlador de la pasarela para su análisis.

POST
`/webhooks`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/webhooks \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "company_uuid": "{{company_id}}",
  "id": "{{gateway_event_id}}",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {}
  }
}'
```