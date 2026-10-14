---
title: "Comentarios"
url: https://fleetbase.io/docs/api/core/comments
module: api
---

# Comentarios

Los comentarios se utilizan para añadir discusiones a los recursos de Fleetbase o para responder a comentarios existentes. Utilice los endpoints de comentarios para crear contextos enlazados alrededor de órdenes, archivos, registros operativos y otros modelos de temas.

* [El objeto "Comentario"](#el-objeto-comentario)
* [Crear Comentario

  POST
  `/v1/comments`](#crear-comentario)
* [Actualizar Comentario

  PUT
  `/v1/comments/:id`](#actualizar-comentario)
* [Consultar Comentarios

  GET
  `/v1/comments`](#consultar-comentarios)
* [Obtener Comentario

  GET
  `/v1/comments/:id`](#obtener-comentario)
* [Eliminar Comentario

  DELETE
  `/v1/comments/:id`](#eliminar-comentario)

## El objeto "Comentario"

Un objeto "Comentario" almacena el texto redactado contra un recurso de tema o como respuesta a otro comentario.

Atributos

`id`

string

opcional

Identificador público del comentario.

`content`

string

opcional

Cuerpo del comentario.

`tags`

array de strings

opcional

Etiquetas asociadas con el comentario.

`meta`

object

opcional

Metadatos arbitrarios almacenados con el comentario.

`author`

object

opcional

Usuario que redactó el comentario.

`replies`

array de objetos

opcional

Respuestas anidadas al comentario.

`editable`

boolean

opcional

Si el usuario de la sesión actual puede editar el comentario.

`updated_at`

timestamp

opcional

Hora en que se actualizó por última vez el comentario.

`created_at`

timestamp

opcional

Hora en que se creó el comentario.

`deleted_at`

timestamp

opcional

Hora en que se eliminó el comentario, cuando se eliminó de forma suave.

El
objeto
"Comentario"

```
{
  "id": "comment_8JVZr4q",
  "content": "Por favor, confirme el plazo de entrega.",
  "tags": [],
  "meta": {},
  "author": {
    "id": "user_8xP2L1d",
    "name": "Alex Rivera"
  },
  "replies": [],
  "editable": true,
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z",
  "deleted_at": null
}
```

POST
`/v1/comments`

## [Crear Comentario](#crear-comentario)

Crea un comentario en un recurso de tema o como respuesta a un comentario existente. Proporcione una referencia al tema o un ID de comentario padre con el contenido del comentario.

Parámetros del cuerpo

`content`

string

requerido

Cuerpo del comentario.

`subject`

object

opcional

Recurso de tema al que se añade el comentario. Proporcione este objeto cuando cree un comentario de nivel superior.

`id`

string

requerido

ID público del recurso de tema.

`type`

string

requerido

Tipo de mutación o tipo de recurso utilizado para resolver el modelo de tema.

`subject_id`

string

opcional

ID público del recurso de tema. Utilice con
`subject_type`
como alternativa a
`subject`
.

`subject_type`

string

opcional

Tipo de mutación o tipo de recurso utilizado para resolver el modelo de tema. Utilice con
`subject_id`
.

`parent`

string

opcional

ID público del comentario padre cuando se crea una respuesta.

POST
`/v1/comments`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/comments \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "content": "Ejemplo de comentario",
  "subject": {
    "id": "{{file_id}}",
    "type": "file"
  }
}'
```

PUT
`/v1/comments/:id`

## [Actualizar Comentario](#actualizar-comentario)

Actualiza el contenido de un comentario existente. El enlace al tema y al comentario padre no se modifican con este endpoint.

Parámetros del cuerpo

`content`

string

requerido

Cuerpo del comentario actualizado.

PUT
`/v1/comments/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/comments/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "content": "Comentario actualizado"
}'
```

GET
`/v1/comments`

## [Consultar Comentarios](#consultar-comentarios)

Devuelve los comentarios para la organización actual. Utilice los parámetros de consulta para filtrar, ordenar y paginar el conjunto de resultados.

Parámetros de consulta

`limit`

string

opcional

Valor de límite para esta solicitud de comentarios.

`offset`

string

opcional

Valor de desplazamiento para esta solicitud de comentarios.

`sort`

string

opcional

Valor de orden para esta solicitud de comentarios.

GET
`/v1/comments`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/comments?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/comments/:id`

## [Obtener Comentario](#obtener-comentario)

Obtiene un comentario por ID, incluyendo su autor y cualquier respuesta anidada devuelta por el recurso de la API.

GET
`/v1/comments/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/comments/:id \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/comments/:id`

## [Eliminar Comentario](#eliminar-comentario)

Elimina un comentario por ID. La respuesta devuelve un envoltorio de recurso eliminado para el comentario eliminado.

DELETE
`/v1/comments/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/comments/:id \
  -H "Authorization: Bearer flb_live_…"
```