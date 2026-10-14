---
title: "Proveedores"
url: https://fleetbase.io/docs/api/fleetbase/vendors
module: api
---

# Proveedores

Los proveedores representan a proveedores de servicios externos, transportistas o socios que pueden apoyar la gestión de pedidos. Utilice los proveedores para modelar la capacidad de terceros, los datos de contacto y las relaciones de servicio.

* [El objeto Vendor](#el-objeto-vendor)
* [Crear un Proveedor

  POST
  `/v1/vendors`](#crear-un-proveedor)
* [Obtener un Proveedor

  GET
  `/v1/vendors/:id`](#obtener-un-proveedor)
* [Actualizar un Proveedor

  PUT
  `/v1/vendors/:id`](#actualizar-un-proveedor)
* [Consultar Proveedores

  GET
  `/v1/vendors`](#consultar-proveedores)
* [Eliminar un Proveedor

  DELETE
  `/v1/vendors/:id`](#eliminar-un-proveedor)

## El objeto Vendor

Un proveedor representa a una empresa o proveedor de terceros que puede asignarse a los recursos de FleetOps y facilitar los flujos de trabajo.

Atributos

`id`

string

opcional

Identificador del proveedor público.

`internal_id`

string

opcional

Identificador interno opcional.

`business_id`

string

opcional

Identificador de empresa asociado al proveedor.

`name`

string

opcional

Nombre de visualización del proveedor.

`email`

string

opcional

Dirección de correo electrónico del proveedor.

`phone`

string

opcional

Número de teléfono del proveedor.

`logo_url`

string

opcional

URL del logotipo del proveedor.

`photo_url`

string

opcional

URL de la foto del proveedor.

`place`

object

opcional

Ubicación principal del proveedor, cuando se carga.

`places`

array de objetos

opcional

Ubicaciones asociadas al proveedor, cuando se carga.

`personnels`

array de objetos

opcional

Contactos de personal asociados al proveedor, cuando se carga.

`country`

string

opcional

Código de país del proveedor.

`type`

string

opcional

Tipo de proveedor.

`meta`

object

opcional

Metadatos adicionales del proveedor.

`status`

string

opcional

Estado del ciclo de vida del proveedor.

`slug`

string

opcional

Slug de proveedor, fácil de usar en URL.

`website_url`

string

opcional

URL del sitio web del proveedor.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez el proveedor.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó el proveedor.

El
objeto
Vendor

```
{
  "id": "vendor_8Qw2YxM3Nf",
  "internal_id": "VEND-1001",
  "business_id": null,
  "name": "ABC Corporation",
  "email": "abc@example.com",
  "phone": "1234567890",
  "logo_url": null,
  "photo_url": null,
  "place": null,
  "places": [],
  "personnels": [],
  "country": null,
  "type": "Supplier",
  "meta": {},
  "status": "active",
  "slug": "abc-corporation",
  "website_url": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/vendors`

## [Crear un Proveedor](#crear-un-proveedor)

Crea un proveedor para la empresa actual. Los proveedores se pueden asignar a pedidos, vehículos, conductores, ubicaciones y flujos de trabajo de facilitación.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre de visualización del proveedor.

`type`

string

obligatorio

Tipo de proveedor.

`email`

string

opcional

Dirección de correo electrónico del proveedor.

`phone`

string

opcional

Número de teléfono del proveedor.

`address`

string

opcional

ID de ubicación para usar como dirección principal del proveedor.

`meta`

object

opcional

Metadatos adicionales del proveedor.

POST
`/v1/vendors`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/vendors \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "ABC Corporation",
  "type": "Supplier",
  "email": "abc@example.com",
  "phone": "1234567890"
}'
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/vendors/:id`

## [Obtener un Proveedor](#obtener-un-proveedor)

Este punto final le permite recuperar un objeto de proveedor para ver sus detalles.

GET
`/v1/vendors/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vendors/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/vendors/:id`

## [Actualizar un Proveedor](#actualizar-un-proveedor)

Actualiza el perfil, la dirección principal, el tipo, los campos de contacto o los metadatos del proveedor.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del proveedor.

`type`

string

opcional

Tipo de proveedor.

`email`

string

opcional

Dirección de correo electrónico del proveedor.

`phone`

string

opcional

Número de teléfono del proveedor.

`address`

string

opcional

ID de ubicación para usar como dirección principal del proveedor.

`meta`

object

opcional

Metadatos adicionales del proveedor.

PUT
`/v1/vendors/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/vendors/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "ABC Corporation",
    "type": "Supplier",
    "email": "abc@example.com",
    "phone": "1234567890"
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "internal_id": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

GET
`/v1/vendors`

## [Consultar Proveedores](#consultar-proveedores)

Devuelve los proveedores para la empresa actual. Utilice los parámetros de búsqueda, paginación y ordenación para reducir el conjunto de resultados.

Parámetros de consulta

`id`

string

opcional

Filtro de ID de proveedor utilizado en este ejemplo de solicitud.

`query`

string

opcional

Término de búsqueda que coincide con los campos del proveedor.

`limit`

integer

opcional

Número máximo de proveedores a devolver.

`offset`

integer

opcional

Número de proveedores a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de ordenación para la consulta de proveedores.

GET
`/v1/vendors`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vendors?id={{vendor_id}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

DELETE
`/v1/vendors/:id`

## [Eliminar un Proveedor](#eliminar-un-proveedor)

Utilice este punto final para eliminar un proveedor.

DELETE
`/v1/vendors/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/vendors/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "address": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```