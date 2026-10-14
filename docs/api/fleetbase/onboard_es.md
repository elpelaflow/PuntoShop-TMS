---
título: "Onboard"
url: https://fleetbase.io/docs/api/fleetbase/onboard
módulo: api
---

# Onboard

Los endpoints de "Onboard" permiten configurar la API inicial. Úselos cuando un flujo de trabajo necesita iniciar o verificar el contexto de la cuenta antes de consumir recursos operativos.

* [Obtener la configuración de "Onboard" para el conductor

  GET
  `/v1/onboard/driver-onboard-settings/:companyId`](#obtener-la-configuracion-de-onboard-para-el-conductor)

GET
`/v1/onboard/driver-onboard-settings/:companyId`

## [Obtener la configuración de "Onboard" para el conductor](#obtener-la-configuracion-de-onboard-para-el-conductor)

Devuelve la configuración de "Onboard" para una organización.

GET
`/v1/onboard/driver-onboard-settings/:companyId`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/onboard/driver-onboard-settings/:companyId \
  -H "Authorization: Bearer flb_live_…"
```