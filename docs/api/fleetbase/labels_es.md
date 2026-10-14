---
título: "Etiquetas"
url: https://fleetbase.io/docs/api/fleetbase/labels
módulo: api
---

# Etiquetas

Las etiquetas generan etiquetas imprimibles para los recursos de Fleetbase. Utilice los puntos finales de etiquetas para convertir los datos del transportista, el pedido, la carga o la entidad en una salida de etiqueta para los flujos de trabajo de cumplimiento.

* [Generar etiqueta

  GET
  `/v1/labels/:id`](#generar-etiqueta)

GET
`/v1/labels/:id`

## [Generar etiqueta](#generar-etiqueta)

Genera una etiqueta en formato PDF, texto o base64 para un ID de pedido, punto de referencia o entidad.

Parámetros de consulta

`format`

cadena

opcional

Formato de salida para la etiqueta generada.

GET
`/v1/labels/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/labels/:id?format=stream&type=order \
  -H "Authorization: Bearer flb_live_…"
```