---
title: "Archivos"
url: https://fleetbase.io/docs/api/core/files
module: api
---

# Archivos

Esta sección describe cómo almacenar, recuperar, descargar, actualizar y asociar metadatos a archivos.

* [El objeto File](#el-objeto-file)
* [Subir un archivo

  POST
  `/v1/files`](#subir-un-archivo)
* [Subir un archivo Base64

  POST
  `/v1/files/base64`](#subir-un-archivo-base64)
* [Actualizar un archivo

  PUT
  `/v1/files/:id`](#actualizar-un-archivo)
* [Descargar un archivo

  GET
  `/v1/files/:id/download`](#descargar-un-archivo)
* [Consultar archivos

  GET
  `/v1/files`](#consultar-archivos)
* [Obtener un archivo

  GET
  `/v1/files/:id`](#obtener-un-archivo)
* [Eliminar un archivo

  DELETE
  `/v1/files/:id`](#eliminar-un-archivo)

## El objeto File

El objeto "File" representa un archivo cargado y los metadatos que Fleetbase almacena para él.

Atributos

`id`

string

opcional

Identificador público del archivo.

`url`

string

opcional

URL pública para el archivo almacenado.

`original_filename`

string

opcional

Nombre de archivo original almacenado en el registro del archivo.

`folder`

string

opcional

Carpeta de almacenamiento que contiene el archivo.

`content_type`

string

opcional

Tipo MIME del archivo.

`file_size`

integer

opcional

Tamaño del archivo en bytes.

`caption`

string

opcional

Descripción que se muestra junto con el archivo.

`type`

string

opcional

Tipo de archivo lógico almacenado en el registro del archivo.

`meta`

object

opcional

Metadatos arbitrarios almacenados junto con el archivo.

`updated_at`

timestamp

opcional

Fecha y hora en que se actualizó por última vez el registro del archivo.

`created_at`

timestamp

opcional

Fecha y hora en que se creó el registro del archivo.

El
objeto
File

```
{
  "id": "file_4WdX9o2",
  "url": "https://files.example.com/uploads/example.png",
  "original_filename": "example.png",
  "folder": "uploads",
  "content_type": "image/png",
  "file_size": 24576,
  "caption": "Prueba de entrega",
  "type": "attachment",
  "meta": {},
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z"
}
```

POST
`/v1/files`

## [Subir un archivo](#subir-un-archivo)

Carga un archivo multipart y crea un registro de archivo. La respuesta incluye la URL del archivo almacenado y los metadatos extraídos durante la carga.

Parámetros del cuerpo

`file`

string

obligatorio

Carga de archivo multipart. El archivo cargado puede tener hasta 100 MB y debe utilizar uno de los tipos MIME admitidos.

`resize`

enum

opcional

Preajuste opcional de redimensionamiento de imagen. Puede ser
`thumb`
,
`sm`
,
`md`
,
`lg`
,
`xl`
,
`2xl`
.

`resize_width`

integer

opcional

Ancho de redimensionamiento objetivo en píxeles. Debe estar entre 1 y 10000.

`resize_height`

integer

opcional

Altura de redimensionamiento objetivo en píxeles. Debe estar entre 1 y 10000.

`resize_mode`

enum

opcional

Modo de redimensionamiento utilizado al transformar la imagen. Puede ser
`fit`
,
`crop`
,
`stretch`
,
`contain`
.

`resize_quality`

integer

opcional

Calidad de salida de redimensionamiento desde 1 hasta 100.

`resize_format`

enum

opcional

Formato de imagen de salida para el archivo redimensionado. Puede ser
`jpg`
,
`jpeg`
,
`png`
,
`webp`
,
`gif`
,
`bmp`
,
`avif`
.

`resize_upscale`

boolean

opcional

Si las imágenes más pequeñas pueden ampliarse durante el redimensionamiento.

POST
`/v1/files`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/files \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/files/base64`

## [Subir un archivo Base64](#subir-un-archivo-base64)

Crea un archivo a partir de los datos codificados en Base64. Fleetbase almacena el archivo decodificado, crea un registro de archivo y, opcionalmente, lo asocia con un recurso.

Parámetros del cuerpo

`data`

string

obligatorio

Contenido del archivo codificado en Base64.

`file_name`

string

obligatorio

Nombre de archivo que se utilizará para almacenar el archivo decodificado.

`file_type`

string

opcional

Tipo de archivo lógico almacenado en el registro del archivo. Por defecto es
`image`
.

`content_type`

string

opcional

Tipo MIME almacenado en el registro del archivo. Por defecto es
`image/png`
.

`subject_uuid`

string

opcional

UUID de un recurso al que se puede asociar el archivo.

`subject_type`

string

opcional

Clase de modelo o tipo de sujeto para el recurso asociado.

`resize`

enum

opcional

Preajuste opcional de redimensionamiento de imagen. Puede ser
`thumb`
,
`sm`
,
`md`
,
`lg`
,
`xl`
,
`2xl`
.

`resize_width`

integer

opcional

Ancho de redimensionamiento objetivo en píxeles. Debe estar entre 1 y 10000.

`resize_height`

integer

opcional

Altura de redimensionamiento objetivo en píxeles. Debe estar entre 1 y 10000.

`resize_mode`

enum

opcional

Modo de redimensionamiento utilizado al transformar la imagen. Puede ser
`fit`
,
`crop`
,
`stretch`
,
`contain`
.

`resize_quality`

integer

opcional

Calidad de salida de redimensionamiento desde 1 hasta 100.

`resize_format`

enum

opcional

Formato de imagen de salida para el archivo redimensionado. Puede ser
`jpg`
,
`jpeg`
,
`png`
,
`webp`
,
`gif`
,
`bmp`
,
`avif`
.

`resize_upscale`

boolean

opcional

Si las imágenes más pequeñas pueden ampliarse durante el redimensionamiento.

POST
`/v1/files/base64`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/files/base64 \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "data": "{{base64_file_data}}",
  "file_name": "example.png",
  "file_type": "image",
  "content_type": "image/png",
  "path": "uploads"
}'
```

PUT
`/v1/files/:id`

## [Actualizar un archivo](#actualizar-un-archivo)

Actualiza la descripción, los metadatos o el nombre de archivo original de un registro de archivo. El archivo cargado no se reemplaza.

Parámetros del cuerpo

`caption`

string

opcional

Descripción que se muestra junto con el archivo.

`filename`

string

opcional

Nuevo nombre de archivo original que se almacenará en el registro del archivo.

`meta`

object

opcional

Metadatos arbitrarios almacenados en el registro del archivo.

PUT
`/v1/files/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/files/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "caption": "Descripción actualizada",
  "meta": {}
}'
```

GET
`/v1/files/:id/download`

## [Descargar un archivo](#descargar-un-archivo)

Descarga el contenido binario de un archivo por su ID. La API transmite el archivo almacenado utilizando su nombre de archivo original.

GET
`/v1/files/:id/download`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/files/:id/download \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/files`

## [Consultar archivos](#consultar-archivos)

Devuelve los archivos cargados para la organización actual. Utilice los parámetros de consulta para filtrar, ordenar y paginar el conjunto de resultados.

Parámetros de consulta

`limit`

string

opcional

Valor límite para esta solicitud de archivos.

`offset`

string

opcional

Valor de desplazamiento para esta solicitud de archivos.

`sort`

string

opcional

Valor de orden para esta solicitud de archivos.

GET
`/v1/files`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/files?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/files/:id`

## [Obtener un archivo](#obtener-un-archivo)

Obtiene un registro de archivo por su ID, incluyendo su URL, nombre de archivo original, tipo de contenido, tamaño, descripción y metadatos.

GET
`/v1/files/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/files/:id \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/files/:id`

## [Eliminar un archivo](#eliminar-un-archivo)

Elimina un registro de archivo por su ID. La respuesta devuelve un envoltorio de recurso eliminado para el archivo eliminado.

DELETE
`/v1/files/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/files/:id \
  -H "Authorization: Bearer flb_live_…"
```