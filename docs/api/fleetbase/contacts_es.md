---
title: "Contactos"
url: https://fleetbase.io/docs/api/fleetbase/contacts
module: api
---

# Contactos

Los contactos representan a clientes, destinatarios, remitentes y otras personas u organizaciones relacionadas con la actividad logística. Utilice los contactos para asociar información de identificación, detalles de comunicación y ubicaciones predeterminadas a las órdenes y los envíos.

* [El objeto Contacto](#el-objeto-contact)
* [Crear un Contacto

  POST
  `/v1/contacts`](#crear-un-contacto)
* [Consultar Contactos

  GET
  `/v1/contacts`](#consultar-contactos)
* [Obtener un Contacto

  GET
  `/v1/contacts/:id`](#obtener-un-contacto)
* [Actualizar un Contacto

  PUT
  `/v1/contacts/:id`](#actualizar-un-contacto)
* [Eliminar un Contacto

  DELETE
  `/v1/contacts/:id`](#eliminar-un-contacto)

## El objeto Contacto

Un contacto representa un perfil de persona o cliente utilizado por los recursos de FleetOps. Los contactos pueden tener ubicaciones, aparecer como clientes y contener detalles de contacto, fotos, tipo, slug y metadatos.

Atributos

`id`

string

opcional

Identificador único del contacto.

`customer_id`

string

opcional

Identificador del cliente, obtenido para contactos públicos.

`internal_id`

string

opcional

Identificador interno opcional.

`name`

string

opcional

Nombre de visualización del contacto.

`title`

string

opcional

Título del contacto.

`email`

string

opcional

Dirección de correo electrónico del contacto.

`phone`

string

opcional

Número de teléfono del contacto.

`photo_url`

string

opcional

URL de la foto del contacto.

`place`

object

opcional

Ubicación principal para el contacto, al cargarse.

`places`

array of objects

opcional

Ubicaciones asociadas con el contacto, al cargarse.

`user`

string

opcional

Identificador de usuario público asociado al contacto, cuando está presente.

`type`

string

opcional

Tipo de contacto.

`meta`

object

opcional

Metadatos adicionales del contacto.

`slug`

string

opcional

Slug de contacto, adecuado para URLs.

`updated_at`

timestamp

opcional

Marca de tiempo de la última actualización del contacto.

`created_at`

timestamp

opcional

Marca de tiempo de creación del contacto.

El
objeto
Contacto

```
{
  "id": "contact_6zV1KqN9pR",
  "customer_id": "customer_6zV1KqN9pR",
  "internal_id": "CUST-1001",
  "name": "John Doe",
  "title": "Mr",
  "email": "john@example.com",
  "phone": "+15639204264",
  "photo_url": null,
  "place": null,
  "places": [],
  "user": null,
  "type": "customer",
  "meta": {},
  "slug": "john-doe",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/contacts`

## [Crear un Contacto](#crear-un-contacto)

Crea un contacto para la empresa actual. Los contactos se utilizan como clientes, facilitadores, personal o cualquier otra persona identificable en los flujos de trabajo de FleetOps.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre de visualización del contacto.

`type`

string

obligatorio

Tipo de contacto, como
`customer`
,
`technician`
, o cualquier otro tipo definido por la aplicación.

`title`

string

opcional

Título opcional del contacto.

`email`

string

opcional

Dirección de correo electrónico del contacto.

`phone`

string

opcional

Número de teléfono del contacto.

`photo`

string

opcional

ID de archivo, referencia de carga o entrada de archivo resoluble para la foto del contacto.

`place`

string

opcional

ID de ubicación para utilizar como ubicación principal del contacto.

`meta`

object

opcional

Metadatos adicionales del contacto.

POST
`/v1/contacts`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/contacts \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "John Doe",
  "type": "customer",
  "title": "Mr",
  "email": "john@exampleco.com",
  "phone": "+1 563-920-4264"
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/contacts`

## [Consultar Contactos](#consultar-contactos)

Devuelve una lista paginada de contactos para la organización actual. Utilice filtros como
`query`
,
`limit`
,
`offset`
y
`sort`
para refinar y ordenar los resultados.

Parámetros de consulta

`query`

string

opcional

Término de búsqueda que coincide con los campos del contacto.

`limit`

integer

opcional

Número máximo de contactos a devolver.

`offset`

integer

opcional

Número de contactos a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de contacto.

`type`

string

opcional

Filtra los contactos por tipo de contacto.

GET
`/v1/contacts`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/contacts?query={{contact_name}}&limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/contacts/:id`

## [Obtener un Contacto](#obtener-un-contacto)

Obtener un Contacto.

GET
`/v1/contacts/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/contacts/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/contacts/:id`

## [Actualizar un Contacto](#actualizar-un-contacto)

Actualiza el perfil, el tipo, la ubicación principal, la foto o los metadatos de un contacto.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del contacto.

`type`

string

opcional

Tipo de contacto.

`title`

string

opcional

Título opcional del contacto.

`email`

string

opcional

Dirección de correo electrónico del contacto.

`phone`

string

opcional

Número de teléfono del contacto.

`photo`

string

opcional

ID de archivo, referencia de carga o entrada de archivo resoluble para la foto del contacto.

`place`

string

opcional

ID de ubicación para utilizar como ubicación principal del contacto.

`meta`

object

opcional

Metadatos adicionales del contacto.

PUT
`/v1/contacts/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/contacts/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Doe",
    "title": "Mr",
    "email": "john@exampleco.com",
    "phone": "563-920-4264",
    "meta": {
        "external_ref": "john-doe"
    }
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

DELETE
`/v1/contacts/:id`

## [Eliminar un Contacto](#eliminar-un-contacto)

Eliminar un Contacto.

DELETE
`/v1/contacts/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/contacts/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "deleted": "<boolean>",
  "id": "<string>"
}
```