---
title: "Canales de chat"
url: https://fleetbase.io/docs/api/core/chat-channels
module: api
---

# Canales de chat

Los canales de chat organizan las conversaciones entre usuarios y participantes dentro de una organización. Utilice los endpoints de canales de chat para crear salas, enviar mensajes, administrar participantes y registrar recibos de lectura.

* [El objeto Chat Channel](#el-objeto-chat-channel)
* [Listar participantes disponibles

  GET
  `/v1/chat-channels/available-participants`](#listar-participantes-disponibles)
* [Crear canal de chat

  POST
  `/v1/chat-channels`](#crear-canal-de-chat)
* [Enviar mensaje

  POST
  `/v1/chat-channels/:id/send-message`](#enviar-mensaje)
* [Crear recibo de lectura

  POST
  `/v1/chat-channels/read-message/:chatMessageId`](#crear-recibo-de-lectura)
* [Actualizar canal de chat

  PUT
  `/v1/chat-channels/:id`](#actualizar-canal-de-chat)
* [Consultar canales de chat

  GET
  `/v1/chat-channels`](#consultar-canales-de-chat)
* [Obtener canal de chat

  GET
  `/v1/chat-channels/:id`](#obtener-canal-de-chat)
* [Agregar participante

  POST
  `/v1/chat-channels/:id/add-participant`](#agregar-participante)
* [Eliminar participante

  DELETE
  `/v1/chat-channels/remove-participant/:participantId`](#eliminar-participante)
* [Eliminar mensaje

  DELETE
  `/v1/chat-channels/delete-message/:chatMessageId`](#eliminar-mensaje)
* [Eliminar canal de chat

  DELETE
  `/v1/chat-channels/:id`](#eliminar-canal-de-chat)

## El objeto Chat Channel

Un canal de chat agrupa a los participantes y mensajes para conversaciones dentro de una organización.

Atributos

`id`

string

opcional

Identificador público del canal de chat.

`created_by`

string

opcional

Identificador público del usuario que creó el canal.

`name`

string

opcional

Nombre del canal.

`title`

string

opcional

Título de visualización para el canal.

`last_message`

object

opcional

Último mensaje de chat para el canal, si está disponible.

`unread_count`

integer

opcional

Número de mensajes sin leer para el usuario actual de la sesión, cuando está disponible el contexto de la sesión.

`slug`

string

opcional

Slug de canal para URL.

`feed`

array of objects

opcional

Mensajes y entradas de feed devueltos para el canal.

`participants`

array of objects

opcional

Participantes en el canal de chat.

`meta`

object

opcional

Metadatos arbitrarios almacenados con el canal.

`updated_at`

timestamp

opcional

Hora en que se actualizó por última vez el canal.

`created_at`

timestamp

opcional

Hora en que se creó el canal.

`deleted_at`

timestamp

opcional

Hora en que se eliminó el canal, cuando se eliminó de forma suave.

El
objeto Chat Channel
```
{
  "id": "chat_channel_5VUl2v4",
  "created_by": "user_8xP2L1d",
  "name": "Actualizaciones de envío",
  "title": "Actualizaciones de envío",
  "last_message": null,
  "slug": "dispatch-updates",
  "feed": [],
  "participants": [],
  "meta": {},
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z",
  "deleted_at": null
}
```

GET
`/v1/chat-channels/available-participants`

## [Listar participantes disponibles](#listar-participantes-disponibles)

Lista los usuarios de la organización actual que se pueden agregar a un canal de chat. Cuando se proporciona un ID de canal, se excluyen los usuarios que ya participan en ese canal.

Parámetros de consulta

`channel`

string

opcional

Valor del canal para esta solicitud de chat channels.

GET
`/v1/chat-channels/available-participants`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/chat-channels/available-participants?channel={{chat_channel_id}} \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/chat-channels`

## [Crear canal de chat](#crear-canal-de-chat)

Crea un canal de chat para la organización actual. Incluya los ID de usuario de los participantes para agregarlos al canal inmediatamente después de su creación.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre del canal de chat.

`participants`

array of strings

opcional

ID de usuario público para agregarlos como participantes después de que se cree el canal.

POST
`/v1/chat-channels`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Dispatch",
  "participants": [
    "{{user_id}}"
  ]
}'
```

POST
`/v1/chat-channels/:id/send-message`

## [Enviar mensaje](#enviar-mensaje)

Envía un mensaje a un canal de chat como un participante existente en el canal. Se pueden incluir los ID de archivo para adjuntar archivos previamente subidos al mensaje.

Parámetros del cuerpo

`sender`

string

obligatorio

ID público del participante del chat que envía el mensaje.

`content`

string

opcional

Texto del mensaje para publicarlo en el canal.

`files`

array of strings

opcional

ID de archivo público para adjuntar a la solicitud.

POST
`/v1/chat-channels/:id/send-message`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels/:id/send-message \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "sender": "{{chat_participant_id}}",
  "content": "Hola desde la API de Fleetbase",
  "files": []
}'
```

POST
`/v1/chat-channels/read-message/:chatMessageId`

## [Crear recibo de lectura](#crear-recibo-de-lectura)

Marca un mensaje de chat como leído para un participante. Si ya existe un recibo para el mensaje y el participante, Fleetbase devuelve el recibo existente.

Parámetros del cuerpo

`participant`

string

obligatorio

ID público del participante del chat que leyó el mensaje.

POST
`/v1/chat-channels/read-message/:chatMessageId`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels/read-message/:chatMessageId \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "participant": "{{chat_participant_id}}"
}'
```

PUT
`/v1/chat-channels/:id`

## [Actualizar canal de chat](#actualizar-canal-de-chat)

Actualiza el nombre de un canal de chat. La respuesta devuelve el recurso del canal de chat actualizado.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre actualizado del canal.

PUT
`/v1/chat-channels/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/chat-channels/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Actualizaciones de envío"
}'
```

GET
`/v1/chat-channels`

## [Consultar canales de chat](#consultar-canales-de-chat)

Devuelve los canales de chat visibles para la organización actual. Utilice los parámetros de consulta para filtrar, ordenar y paginar el conjunto de resultados.

Parámetros de consulta

`limit`

string

opcional

Valor de límite para esta solicitud de chat channels.

`offset`

string

opcional

Valor de desplazamiento para esta solicitud de chat channels.

`sort`

string

opcional

Valor de orden para esta solicitud de chat channels.

GET
`/v1/chat-channels`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/chat-channels?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/chat-channels/:id`

## [Obtener canal de chat](#obtener-canal-de-chat)

Obtiene un canal de chat por ID, incluyendo sus participantes, feed y metadatos del último mensaje.

GET
`/v1/chat-channels/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/chat-channels/:id \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/chat-channels/:id/add-participant`

## [Agregar participante](#agregar-participante)

Agrega un usuario en la organización actual a un canal de chat existente. La respuesta devuelve el recurso del participante del chat creado.

Parámetros del cuerpo

`user`

string

obligatorio

ID público del usuario para agregarlo al canal de chat.

POST
`/v1/chat-channels/:id/add-participant`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels/:id/add-participant \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "user": "{{user_id}}"
}'
```

DELETE
`/v1/chat-channels/remove-participant/:participantId`

## [Eliminar participante](#eliminar-participante)

Elimina un participante de un canal de chat por ID de participante. El canal permanece activo para los participantes restantes.

DELETE
`/v1/chat-channels/remove-participant/:participantId`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/chat-channels/remove-participant/:participantId \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/chat-channels/delete-message/:chatMessageId`

## [Eliminar mensaje](#eliminar-mensaje)

Elimina un mensaje de chat por ID. Utilícelo cuando se debe eliminar un mensaje enviado previamente del feed del canal.

DELETE
`/v1/chat-channels/delete-message/:chatMessageId`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/chat-channels/delete-message/:chatMessageId \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/chat-channels/:id`

## [Eliminar canal de chat](#eliminar-canal-de-chat)

Elimina un canal de chat por ID. La respuesta devuelve un envelope de recurso eliminado para el canal eliminado.

DELETE
`/v1/chat-channels/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/chat-channels/:id \
  -H "Authorization: Bearer flb_live_…"
```