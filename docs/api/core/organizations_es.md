---
título: "Organizaciones"
url: https://fleetbase.io/docs/api/core/organizations
módulo: api
---

# Organizaciones

Las organizaciones exponen el contexto de la empresa asociado al credencial de la API actual. Utilice este recurso para confirmar a qué organización pertenece una solicitud.

* [El objeto de Organización](#el-objeto-de-organización)
* [Obtener la Organización actual

  GET
  `/v1/organizations/current`](#obtener-la-organización-actual)

## El objeto de Organización

Una organización es el contexto de la empresa asociado al credencial de la API actual.

Atributos

`id`

cadena

opcional

Identificador público de la organización.

`name`

cadena

opcional

Nombre de la organización.

`description`

cadena

opcional

Descripción de la organización.

`phone`

cadena

opcional

Número de teléfono de la organización.

`timezone`

cadena

opcional

Zona horaria predeterminada para la organización.

`country`

cadena

opcional

Código de país de la organización.

`currency`

moneda

opcional

Código de moneda predeterminado para la organización.

`logo_url`

cadena

opcional

URL del logotipo de la organización.

`backdrop_url`

cadena

opcional

URL de la imagen de fondo de la organización.

`branding`

objeto

opcional

Configuración de marca devueltas con la organización.

`options`

objeto

opcional

Valores de opción de la organización.

`owner`

objeto

opcional

Usuario propietario de la organización, cuando está incluido.

`slug`

cadena

opcional

Slug de organización amigable con URLs.

`status`

cadena

opcional

Estado de la organización.

`updated_at`

marca de tiempo

opcional

Hora en que se actualizó por última vez la organización.

`created_at`

marca de tiempo

opcional

Hora en que se creó la organización.

El
objeto
de Organización

```
{
  "id": "org_9W2KxA1",
  "name": "Acme Logistics",
  "description": "Operaciones logísticas regionales",
  "phone": "+15555550100",
  "timezone": "America/New_York",
  "country": "US",
  "currency": "USD",
  "logo_url": "https://files.example.com/logos/acme.png",
  "backdrop_url": null,
  "branding": {},
  "options": {},
  "owner": null,
  "slug": "acme-logistics",
  "status": "active",
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z"
}
```

GET
`/v1/organizations/current`

## [Obtener la Organización actual](#obtener-la-organización-actual)

Devuelve la organización asociada al credencial de la API.

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