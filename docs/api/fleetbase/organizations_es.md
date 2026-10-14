---
título: "Organizaciones"
url: https://fleetbase.io/docs/api/fleetbase/organizations
módulo: api
---

# Organizaciones

Las organizaciones definen el contexto de la empresa para la actividad de la API. Utilice los puntos finales de organización para inspeccionar la cuenta asociada con el credencial actual.

* [Obtener la organización actual

  GET
  `/v1/organizations/current`](#obtener-la-organización-actual)
* [Listar organizaciones

  GET
  `/v1/organizations`](#listar-organizaciones)

GET
`/v1/organizations/current`

## [Obtener la organización actual](#obtener-la-organización-actual)

Devuelve la organización asociada con la clave de API en la solicitud. Úselo para confirmar a qué cuenta pertenece un credencial, y para obtener el ID de la organización para los puntos finales que se dirigen a una organización por ruta.

GET
`/v1/organizations/current`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/organizations/current \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/organizations`

## [Listar organizaciones](#listar-organizaciones)

Enumera las organizaciones disponibles para la incorporación de conductores y la selección de organizaciones.

Parámetros de consulta

`limit`

entero

opcional

Número máximo de organizaciones a devolver.

`with_driver_onboard`

booleano

opcional

Incluye datos de incorporación de conductores de la organización cuando estén disponibles.

GET
`/v1/organizations`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/organizations?limit=10&with_driver_onboard=false \
  -H "Authorization: Bearer flb_live_…"
```