---
title: "Inspecciones"
url: https://fleetbase.io/docs/api/fleetbase/inspecciones
module: api
---

# Inspecciones

Las inspecciones son los informes de inspección del vehículo del conductor, que se completan antes o después de un viaje, utilizando un formulario proporcionado por la organización.
Estos puntos finales están destinados a que el conductor complete la inspección: leer los formularios disponibles, completarlos y ver los resultados. Si se detecta algún problema, se puede generar una incidencia y un pedido de trabajo, dependiendo de cómo esté configurado el formulario. Ambos se registran en la solicitud.
La creación y publicación de formularios, así como la revisión y resolución de las solicitudes, son funciones de gestión de flotas y no forman parte de la API de consumo. Para utilizar estas funciones, se necesita al menos un formulario publicado en la organización, que debe ser proporcionado por el usuario.

* [El objeto "Inspección"](#el-objeto-inspeccion)
* [Listar formularios de inspección

  GET
  `/v1/inspection-forms`](#listar-formularios-de-inspeccion)
* [Obtener un formulario de inspección

  GET
  `/v1/inspection-forms/:id`](#obtener-un-formulario-de-inspeccion)
* [Enviar una inspección

  POST
  `/v1/inspections`](#enviar-una-inspeccion)
* [Listar inspecciones

  GET
  `/v1/inspections`](#listar-inspecciones)
* [Obtener una inspección

  GET
  `/v1/inspections/:id`](#obtener-una-inspeccion)
* [Listar inspecciones de vehículos

  GET
  `/v1/vehicles/:id/inspections`](#listar-inspecciones-de-vehiculos)

## El objeto "Inspección"

Una inspección es un informe completado contra un formulario de inspección publicado: el vehículo y el conductor para los que se completó, las respuestas del conductor a cada campo del formulario, los resultados de "aprobado/rechazado" derivados de las respuestas, las fotos y la firma adjuntas, y cualquier incidencia o pedido de trabajo que se haya generado a partir de los elementos fallidos.

Atributos

`id`

string

opcional

Identificador público de la inspección.

`form`

object

opcional

El formulario de inspección contra el que se completó el informe, cuando se carga.

`vehicle`

object

opcional

El vehículo que se inspeccionó, cuando se carga.

`driver`

object

opcional

El conductor que completó la inspección, cuando se carga.

`issue`

object

opcional

La incidencia que se ha generado a partir de los elementos fallidos, cuando el formulario lo solicita y se detecta algún fallo.

`work_order`

object

opcional

El pedido de trabajo que se ha abierto a partir de los elementos fallidos, cuando el formulario lo solicita y se detecta algún fallo.

`answers`

array de objetos

opcional

Las respuestas del conductor a cada campo del formulario: el
`field`
(el nombre del campo), que es el mismo que el formulario le asignó, junto con el
`name`,
`label`
y
`type`
del campo, y el
`value`.
Un valor de
`pass-fail`
es un objeto con
`passed`,
`not_applicable`,
`severity`,
`comments`,
`photos`
y
`unsafe`.
Un valor de foto o firma se convierte en
`\{ id, url, filename, content_type \}`
en lugar de la base64 que se envió.

`files`

array de objetos

opcional

Las fotos y firmas adjuntas a la inspección, independientemente de cómo se hayan enviado: dentro del cuerpo de la solicitud, o en la sección de fotos del panel de la consola.

`item_results`

array de objetos

opcional

Un resultado por cada respuesta
`pass-fail`,
derivado de las
`answers`:
`item_key`,
`label`,
`category`,
`status`
(
`passed`,
`failed`
o
`not_applicable`),
`severity`,
`passed`,
`comments`
y
`photos`.
Esto es lo que se utiliza para crear incidencias, pedidos de trabajo e historial del vehículo.

`type`

string

opcional

Tipo de inspección, extraído del formulario:
`dvir`,
`pre_trip`,
`post_trip`, o un tipo personalizado.

`status`

string

opcional

Estado del ciclo de vida:
`submitted`,
`needs_review`
o
`resolved`.

`result`

string

opcional

`passed`
si todos los elementos han pasado, en caso contrario
`failed`.

`source`

string

opcional

Cómo se completó:
`navigator`
para la aplicación del conductor,
`public_link`
para un enlace tokenizado.

`odometer`

number

opcional

Lectura del odómetro en el momento de la inspección.

`engine_hours`

number

opcional

Horas del motor en el momento de la inspección.

`total_items`

integer

opcional

Número de resultados de elementos.

`failed_items`

integer

opcional

Número de resultados de elementos que no han pasado.

`location`

object

opcional

Dónde se completó la inspección.

`signature`

object

opcional

La firma del conductor, tal como la captura la aplicación.

`attachments`

array

opcional

Archivos adicionales adjuntos a la inspección.

`has_failures`

boolean

opcional

Si algún elemento ha fallado.

`started_at`

timestamp

opcional

Cuándo comenzó el conductor la inspección.

`submitted_at`

timestamp

opcional

Cuándo se completó la inspección.

`resolved_at`

timestamp

opcional

Cuándo se resolvieron los elementos fallidos desde la consola, si es así.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la inspección.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la inspección.

El objeto "Inspección"

```
{
  "id": "inspection_submission_4Mnp8Qx2Vz",
  "form": {
    "id": "inspection_form_9Kd2Lm7Aq1",
    "name": "Pre-trip DVIR",
    "type": "dvir"
  },
  "vehicle": {
    "id": "vehicle_7Hx3Pq9Rt2",
    "plate_number": "TRK-7"
  },
  "driver": {
    "id": "driver_2Fb8Nc4Wm6",
    "name": "Dana Driver"
  },
  "issue": null,
  "work_order": null,
  "answers": [
    {
      "field": "custom_field_9f61c8b7a6",
      "name": "brakes",
      "label": "Brakes",
      "type": "pass-fail",
      "value": {
        "passed": true,
        "not_applicable": false,
        "severity": null,
        "comments": null,
        "photos": [],
        "unsafe": false
      }
    },
    {
      "field": "custom_field_8a521d9f3b",
      "name": "odometer",
      "label": "Odometer",
      "type": "number",
      "value": 120400
    },
    {
      "field": "custom_field_bc085e1a7d",
      "name": "signature",
      "label": "Sign here",
      "type": "signature",
      "value": {
        "id": "file_5Qw8Zt2Nb7",
        "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
        "filename": "lq8w1c0v9xk3.png",
        "content_type": "image/png"
      }
    }
  ],
  "files": [
    {
      "id": "file_5Qw8Zt2Nb7",
      "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
      "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
      "original_filename": "lq8w1c0v9xk3.png",
      "content_type": "image/png",
      "type": "inspection_signature",
      "caption": null,
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "item_results": [
    {
      "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
      "item_key": "brakes",
      "label": "Brakes",
      "category": "Safety",
      "status": "passed",
      "severity": null,
      "passed": true,
      "comments": null,
      "photos": [],
      "meta": {},
      "submission_id": "inspection_submission_4Mnp8Qx2Vz",
      "updated_at": "2026-09-09T07:30:00.000000Z",
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "type": "dvir",
  "status": "submitted",
  "result": "passed",
  "source": "navigator",
  "odometer": 120400,
  "engine_hours": null,
  "total_items": 1,
  "failed_items": 0,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "signature": {},
  "attachments": [],
  "meta": {},
  "form_name": "Pre-trip DVIR",
  "vehicle_name": "Truck 7",
  "driver_name": "Dana Driver",
  "has_failures": false,
  "started_at": "2026-09-09T07:10:00.000000Z",
  "submitted_at": "2026-09-09T07:30:00.000000Z",
  "resolved_at": null,
  "updated_at": "2026-09-09T07:30:00.000000Z",
  "created_at": "2026-09-09T07:30:00.000000Z"
}
```

GET
`/v1/inspection-forms`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/inspection-forms?vehicle={{vehicle_id}} \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```json
[
  {
    "id": "inspection_form_9Kd2Lm7Aq1",
    "name": "Pre-trip DVIR",
    "description": "Daily vehicle inspection report, filed before the first run.",
    "type": "dvir",
    "status": "published",
    "items": [],
    "grouped_fields": [
      {
        "id": "category_4Tn6Ry8Wz3",
        "name": "Safety",
        "description": null,
        "order": 1,
        "meta": {
          "grid_size": 2
        },
        "fields": [
          {
            "id": "custom_field_9f61c8b7a6",
            "name": "brakes",
            "label": "Brakes",
            "description": null,
            "help_text": "Check the pedal travel.",
            "type": "pass-fail",
            "component": "pass-fail",
            "required": true,
            "editable": true,
            "options": [],
            "order": 1,
            "meta": {
              "severity": "critical",
              "require_comment_on_fail": true,
              "require_photo_on_fail": true,
              "unsafe_on_fail": true
            }
          },
          {
            "id": "custom_field_8a521d9f3b",
            "name": "odometer",
            "label": "Odometer",
            "description": null,
            "help_text": null,
            "type": "number",
            "component": "number",
            "required": false,
            "editable": true,
            "options": [],
            "order": 2,
            "meta": {
              "unit": "km",
              "role": "odometer"
            }
          }
        ]
      }
    ],
    "settings": {
      "create_issue_on_failure": true,
      "create_work_order_on_failure": false
    },
    "meta": {},
    "subject_name": null,
    "item_count": 2,
    "is_published": true,
    "published_at": "2026-09-01T00:00:00.000000Z",
    "updated_at": "2026-09-01T00:00:00.000000Z",
    "created_at": "2026-08-28T00:00:00.000000Z"
  }
]
```

GET
`/v1/inspection-forms/:id`

## [Retrieve an Inspection Form](#retrieve-an-inspection-form)

Obtiene un formulario de inspección publicado con su estructura y
`settings`
.

Un formulario se agrupa en campos de tipo.
`grouped_fields`
es lo que el conductor ve: una entrada por grupo, en el orden en que el constructor lo dispuso, cada uno con un
`name`
, un
`meta.grid_size`
y sus
`fields`
. Un campo tiene un
`id`
, un
`name`
, una
`label`
, un
`type`
—
`pass-fail`
,
`input`
,
`textarea`
,
`number`
,
`select`
,
`radio-button`
,
`boolean`
,
`date-picker`
,
`date-time-input`
,
`file-upload`
o
`signature`
— más
`required`
,
`options`
y
`meta`
.

Un campo
`pass-fail`
tiene su
`meta`
que dice qué pasa si falla: la severidad predeterminada, si se requiere una foto o un comentario, si el defecto impide que el vehículo circule (
`unsafe_on_fail`
) y cualquier
`instructions`
. Un campo de
`number`
tiene su
`meta`
que puede nombrar su
`unit`
y su
`role`
, como
`odometer`
.

El primer intento es una lista de verificación plana
`items`
que todavía se responde, de solo lectura, para los formularios que no se han reconstruido; un formulario construido a partir de campos responde a ambos, y
`grouped_fields`
es el que se debe mostrar.

Un formulario que no está publicado — un borrador, o uno que se ha archivado — devuelve 404, lo mismo que uno que no existe: para un conductor, un formulario que no se puede completar no está disponible.

GET
`/v1/inspection-forms/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/inspection-forms/:id \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "inspection_form_9Kd2Lm7Aq1",
  "name": "Pre-trip DVIR",
  "description": "Daily vehicle inspection report, filed before the first run.",
  "type": "dvir",
  "status": "published",
  "items": [],
  "grouped_fields": [
    {
      "id": "category_4Tn6Ry8Wz3",
      "name": "Safety",
      "description": null,
      "order": 1,
      "meta": {
        "grid_size": 2
      },
      "fields": [
        {
          "id": "custom_field_9f61c8b7a6",
          "name": "brakes",
          "label": "Brakes",
          "description": null,
          "help_text": "Check the pedal travel.",
          "type": "pass-fail",
          "component": "pass-fail",
          "required": true,
          "editable": true,
          "options": [],
          "order": 1,
          "meta": {
            "severity": "critical",
            "require_comment_on_fail": true,
            "require_photo_on_fail": true,
            "unsafe_on_fail": true
          }
        },
        {
          "id": "custom_field_8a521d9f3b",
          "name": "odometer",
          "label": "Odometer",
          "description": null,
          "help_text": null,
          "type": "number",
          "component": "number",
          "required": false,
          "editable": true,
          "options": [],
          "order": 2,
          "meta": {
            "unit": "km",
            "role": "odometer"
          }
        }
      ]
    }
  ],
  "settings": {
    "create_issue_on_failure": true,
    "create_work_order_on_failure": false
  },
  "meta": {},
  "subject_name": null,
  "item_count": 2,
  "is_published": true,
  "published_at": "2026-09-01T00:00:00.000000Z",
  "updated_at": "2026-09-01T00:00:00.000000Z",
  "created_at": "2026-08-28T00:00:00.000000Z"
}
```

POST
`/v1/inspections`

## [Submit an Inspection](#submit-an-inspection)

Envía una inspección contra un formulario publicado, como lo hace la aplicación para el conductor al finalizar una inspección.

Un formulario construido a partir de campos se responde con
`answers`
: una entrada por campo que el conductor ha respondido, nombrando el campo por el
`id`
que el formulario leído le dio, con un
`value`
y, opcionalmente, un
`value_type`
.
`custom_field_values`
es el nombre anterior para esto y todavía se acepta. Una respuesta
`pass-fail`
es un objeto —
`passed`
,
`not_applicable`
,
`severity`
,
`comments`
,
`photos`
y
`unsafe`
; un medidor es un número, una firma o una foto es una imagen o URL codificada en base64. El servidor almacena cada foto y firma como un archivo y responde con
`file:`
referencias resueltas, y refleja cada
`pass-fail`
respuesta en una fila de
`item_results`
, que es lo que se utilizan para crear problemas, órdenes de trabajo e historial del vehículo.

La primera versión es una lista de verificación plana
`items`
que todavía se responde, de solo lectura, para los formularios que no se han reconstruido; un formulario construido a partir de campos responde a ambos, y
`grouped_fields`
es el que se debe mostrar.

Un formulario que no está publicado — un borrador, o uno que se ha archivado — devuelve 404, lo mismo que uno que no existe: para un conductor, un formulario que no se puede completar no está disponible.

POST
`/v1/inspections`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/inspections \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "inspection_form_9Kd2Lm7Aq1",
  "name": "Pre-trip DVIR",
  "description": "Daily vehicle inspection report, filed before the first run.",
  "type": "dvir",
  "status": "published",
  "items": [],
  "grouped_fields": [
    {
      "id": "category_4Tn6Ry8Wz3",
      "name": "Safety",
      "description": null,
      "order": 1,
      "meta": {
        "grid_size": 2
      },
      "fields": [
        {
          "id": "custom_field_9f61c8b7a6",
          "name": "brakes",
          "label": "Brakes",
          "description": null,
          "help_text": "Check the pedal travel.",
          "type": "pass-fail",
          "component": "pass-fail",
          "required": true,
          "editable": true,
          "options": [],
          "order": 1,
          "meta": {
            "severity": "critical",
            "require_comment_on_fail": true,
            "require_photo_on_fail": true,
            "unsafe_on_fail": true
          }
        },
        {
          "id": "custom_field_8a521d9f3b",
          "name": "odometer",
          "label": "Odometer",
          "description": null,
          "help_text": null,
          "type": "number",
          "component": "number",
          "required": false,
          "editable": true,
          "options": [],
          "order": 2,
          "meta": {
            "unit": "km",
            "role": "odometer"
          }
        }
      ]
    }
  ],
  "settings": {
    "create_issue_on_failure": true,
    "create_work_order_on_failure": false
  },
  "meta": {},
  "subject_name": null,
  "item_count": 2,
  "is_published": true,
  "published_at": "2026-09-01T00:00:00.000000Z",
  "updated_at": "2026-09-01T00:00:00.000000Z",
  "created_at": "2026-08-28T00:00:00.000000Z"
}
```

El cuerpo de la solicitud

`inspection_form`

cadena

obligatorio

ID del formulario de inspección publicado contra el que se está enviando.

`driver`

cadena

obligatorio

ID del conductor que está realizando la inspección.

`vehicle`

cadena

opcional

ID del vehículo que se está inspeccionando. Por defecto, es el vehículo al que está asignado el conductor.

`started_at`

marca de tiempo

opcional

La hora en que el conductor comenzó la inspección. Por defecto, es la hora en que se envía.

`odometer`

entero

opcional

La lectura del odómetro en el momento de la inspección.

`engine_hours`

entero

opcional

Las horas del motor en el momento de la inspección.

`answers`

arreglo de objetos

opcional

El cuerpo para enviar: una entrada por campo que el conductor ha respondido, nombrando el campo por el
`id`
que el formulario leído le dio, con un
`value`
y, opcionalmente, un
`value_type`
.
`custom_field_values`
se acepta como el nombre anterior para este campo.
`pass-fail`
una respuesta es un objeto —
`passed`
,
`not_applicable`
,
`severity`
,
`comments`
,
`photos`
y
`unsafe`
; un medidor es un número; una firma o una foto es una imagen o URL codificada en base64. Todo lo demás toma su valor simple.

`value_type`

cadena

opcional

Cómo almacenar el valor —
`object`
,
`number`
,
`boolean`
,
`text`
o
`file`
. Derivado del tipo propio del campo cuando se omite.

`item_results`

arreglo de objetos

opcional

El cuerpo anterior, mantenido para versiones de servidor más antiguas y el enlace público tokenizado: una entrada por elemento de la lista de verificación, nombrando el elemento por una
`item_key`
en lugar de nombrar un campo del formulario. Preferir
`answers`
; esto es requerido solo cuando no se envía.

`item_key`

cadena

opcional

La clave del elemento del formulario.

`label`

cadena

obligatorio

La etiqueta del elemento, tal como se muestra al conductor.

`category`

cadena

opcional

La categoría del elemento en el formulario.

`passed`

booleano

obligatorio

Si el elemento pasó.

`status`

cadena

opcional

`passed`
o
`failed`
. Derivado de
`passed`
cuando se omite.

`severity`

cadena

opcional

La severidad de un fallo —
`low`
,
`medium`
,
`high`
o
`critical`
. Establece la prioridad del problema y la orden de trabajo que se crea.

`comments`

cadena

opcional

Los comentarios del conductor sobre el elemento.

`photos`

arreglo

opcional

Fotos del elemento, cada una es una imagen codificada en base64 o una URL.

`location`

objeto

opcional

La ubicación desde la que se realizó la inspección, como
`latitude`
y
`longitude`
.

`signature`

objeto

opcional

La firma del conductor, como la capturada por la aplicación.

`attachments`

arreglo

opcional

Archivos adicionales adjuntos a la inspección.

```spanish
JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/inspections \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: {{$guid}}" \
  -H "Accept: application/json" \
  -d '{
  "inspection_form": "{{inspection_form_id}}",
  "driver": "{{driver_id}}",
  "vehicle": "{{vehicle_id}}",
  "started_at": "2026-09-09T07:10:00Z",
  "odometer": 120400,
  "engine_hours": 3100,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "answers": [
    {
      "field": "{{inspection_pass_fail_field_id}}",
      "value_type": "object",
      "value": {
        "passed": false,
        "not_applicable": false,
        "severity": "critical",
        "comments": "El pedal es blando.",
        "photos": ["{{proof_photo_base64}}"],
        "unsafe": true
      }
    },
    {
      "field": "{{inspection_number_field_id}}",
      "value_type": "number",
      "value": 120400
    }
  ],
  "item_results": [
    {
      "item_key": "brakes",
      "label": "Frenos",
      "category": "Seguridad",
      "passed": false,
      "severity": "critical",
      "comments": "El pedal es blando.",
      "photos": ["{{proof_photo_base64}}"]
    },
    {
      "item_key": "lights",
      "label": "Luces",
      "category": "Seguridad",
      "passed": true
    }
  ]
}'
```

Otras formas de llamar a esta función

* Creación
* Contenido no procesable

201

OK

```
{
  "id": "inspection_submission_4Mnp8Qx2Vz",
  "form": {
    "id": "inspection_form_9Kd2Lm7Aq1",
    "name": "Inspección pre-viaje",
    "type": "dvir"
  },
  "vehicle": {
    "id": "vehicle_7Hx3Pq9Rt2",
    "plate_number": "TRK-7"
  },
  "driver": {
    "id": "driver_2Fb8Nc4Wm6",
    "name": "Dana Driver"
  },
  "issue": {
    "id": "issue_3Vb7Kd1Pq8",
    "status": "pendiente",
    "priority": "crítico"
  },
  "work_order": null,
  "answers": [
    {
      "field": "{{inspection_pass_fail_field_id}}",
      "name": "frenos",
      "label": "Frenos",
      "type": "pass-fail",
      "value": {
        "passed": false,
        "not_applicable": false,
        "severity": "critical",
        "comments": "El pedal es blando.",
        "photos": [
          {
            "id": "file_5Qw8Zt2Nb7",
            "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
            "filename": "lq8w1c0v9xk3.png",
            "content_type": "image/png"
          }
        ],
        "unsafe": true
      }
    },
    {
      "field": "{{inspection_number_field_id}}",
      "name": "odómetro",
      "label": "Odómetro",
      "type": "number",
      "value": 120400
    }
  ],
  "files": [
    {
      "id": "file_5Qw8Zt2Nb7",
      "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
      "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
      "original_filename": "lq8w1c0v9xk3.png",
      "content_type": "image/png",
      "type": "foto_de_inspección",
      "caption": null,
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "item_results": [
    {
      "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
      "item_key": "brakes",
      "label": "Frenos",
      "category": "Seguridad",
      "status": "fallido",
      "severity": "crítico",
      "passed": false,
      "comments": "El pedal es blando.",
      "photos": [
        {
          "id": "file_5Qw8Zt2Nb7",
          "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
          "filename": "lq8w1c0v9xk3.png",
          "content_type": "image/png"
        }
      ],
      "meta": {
        "not_applicable": false,
        "unsafe": true
      },
      "submission_id": "inspection_submission_4Mnp8Qx2Vz",
      "updated_at": "2026-09-09T07:30:00.000000Z",
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "type": "dvir",
  "status": "enviado",
  "result": "fallido",
  "source": "navegador",
  "odometer": 120400,
  "engine_hours": 3100,
  "total_items": 1,
  "failed_items": 1,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "signature": {},
  "attachments": [],
  "meta": {
    "unsafe": true
  },
  "form_name": "Inspección pre-viaje",
  "vehicle_name": "Camión 7",
  "driver_name": "Dana Driver",
  "has_failures": true,
  "started_at": "2026-09-09T07:10:00.000000Z",
  "submitted_at": "2026-09-09T07:30:00.000000Z",
  "resolved_at": null,
  "updated_at": "2026-09-09T07:30:00.000000Z",
  "created_at": "2026-09-09T07:30:00.000000Z"
}
```

```
GET
`/v1/inspections`

curl https://api.fleetbase.io/v1/inspections?driver={{driver_id}} \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "inspection_submission_4Mnp8Qx2Vz",
    "form": {
      "id": "inspection_form_9Kd2Lm7Aq1",
      "name": "Inspección pre-viaje",
      "type": "dvir"
    },
    "vehicle": {
      "id": "vehicle_7Hx3Pq9Rt2",
      "plate_number": "TRK-7"
    },
    "driver": {
      "id": "driver_2Fb8Nc4Wm6",
      "name": "Dana Driver"
    },
    "issue": {
      "id": "issue_3Vb7Kd1Pq8",
      "status": "pendiente",
      "priority": "crítico"
    },
    "work_order": null,
    "answers": [
      {
        "field": "custom_field_9f61c8b7a6",
        "name": "frenos",
        "label": "Frenos",
        "type": "pass-fail",
        "value": {
          "passed": false,
          "not_applicable": false,
          "severity": "critical",
          "comments": "El pedal es blando.",
          "photos": [
            {
              "id": "file_5Qw8Zt2Nb7",
              "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
              "filename": "lq8w1c0v9xk3.png",
              "content_type": "image/png"
            }
          ],
          "unsafe": true
        }
      },
      {
        "field": "custom_field_8a521d9f3b",
        "name": "odómetro",
        "label": "Odómetro",
        "type": "number",
        "value": 120400
      }
    ],
    "files": [
      {
        "id": "file_5Qw8Zt2Nb7",
        "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
        "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
        "original_filename": "lq8w1c0v9xk3.png",
        "content_type": "image/png",
        "type": "inspection_photo",
        "caption": null,
        "created_at": "2026-09-09T07:30:00.000000Z"
      }
    ],
    "item_results": [
      {
        "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
        "item_key": "brakes",
        "label": "Frenos",
        "category": "Seguridad",
        "status": "fallido",
        "severity": "crítico",
        "passed": false,
        "comments": "El pedal es blando.",
        "photos": [
          {
            "id": "file_5Qw8Zt2Nb7",
            "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
            "filename": "lq8w1c0v9xk3.png",
            "content_type": "image/png"
          }
        ],
        "meta": {
          "not_applicable": false,
          "unsafe": true
        },
        "submission_id": "inspection_submission_4Mnp8Qx2Vz",
        "updated_at": "2026-09-09T07:30:00.000000Z",
        "created_at": "2026-09-09T07:30:00.000000Z"
      }
    ],
    "type": "dvir",
    "status": "enviado",
    "result": "fallido",
    "source": "navegador",
    "odometer": 120400,
    "engine_hours": 3100,
    "total_items": 1,
    "failed_items": 1,
    "location": {
      "latitude": 1.3521,
      "longitude": 103.8198
    },
    "signature": {},
    "attachments": [],
    "meta": {
      "unsafe": true
    },
    "form_name": "Inspección pre-viaje",
    "vehicle_name": "Camión 7",
    "driver_name": "Dana Driver",
    "has_failures": true,
    "started_at": "2026-09-09T07:10:00.000000Z",
    "submitted_at": "2026-09-09T07:30:00.000000Z",
    "resolved_at": null,
    "updated_at": "2026-09-09T07:30:00.000000Z",
    "created_at": "2026-09-09T07:30:00.000000Z"
  }
]
```

```
GET
`/v1/inspections`

curl https://api.fleetbase.io/v1/inspections?driver={{driver_id}} \
  -H "Authorization: Bearer flb_live_…"
```

200

OK
```

```
{
  "id": "entrega_de_inspección_4Mnp8Qx2Vz",
  "formulario": {
    "id": "formulario_de_inspección_9Kd2Lm7Aq1",
    "nombre": "Inspección pre-viaje",
    "tipo": "dvir"
  },
  "vehículo": {
    "id": "vehículo_7Hx3Pq9Rt2",
    "número_de_placa": "TRK-7"
  },
  "conductor": {
    "id": "conductor_2Fb8Nc4Wm6",
    "nombre": "Dana Driver"
  },
  "problema": {
    "id": "problema_3Vb7Kd1Pq8",
    "estado": "pendiente",
    "prioridad": "crítico"
  },
  "orden_de_trabajo": null,
  "respuestas": [
    {
      "campo": "campo_personal_9f61c8b7a6",
      "nombre": "frenos",
      "etiqueta": "Frenos",
      "tipo": "aprobado/rechazado",
      "valor": {
        "aprobado": false,
        "no_aplicable": false,
        "gravedad": "crítico",
        "comentarios": "El pedal está blando.",
        "fotos": [
          {
            "id": "archivo_5Qw8Zt2Nb7",
            "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
            "nombre_de_archivo": "lq8w1c0v9xk3.png",
            "tipo_de_contenido": "image/png"
          }
        ],
        "riesgoso": true
      }
    },
    {
      "campo": "campo_personal_8a521d9f3b",
      "nombre": "odómetro",
      "etiqueta": "Odómetro",
      "tipo": "número",
      "valor": 120400
    }
  ],
  "archivos": [
    {
      "id": "archivo_5Qw8Zt2Nb7",
      "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
      "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
      "nombre_de_archivo_original": "lq8w1c0v9xk3.png",
      "tipo_de_contenido": "image/png",
      "tipo": "foto_de_inspección",
      "leyenda": null,
      "fecha_creación": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "resultados_de_elementos": [
    {
      "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
      "clave_de_elemento": "brakes",
      "etiqueta": "Brakes",
      "categoría": "Seguridad",
      "estado": "fallido",
      "gravedad": "crítico",
      "aprobado": false,
      "comentarios": "El pedal está blando.",
      "fotos": [
        {
          "id": "archivo_5Qw8Zt2Nb7",
          "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
          "nombre_de_archivo": "lq8w1c0v9xk3.png",
          "tipo_de_contenido": "image/png"
        }
      ],
      "meta": {
        "no_aplicable": false,
        "riesgoso": true
      },
      "id_de_presentación": "inspection_submission_4Mnp8Qx2Vz",
      "fecha_actualización": "2026-09-09T07:30:00.000000Z",
      "fecha_creación": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "tipo": "dvir",
  "estado": "presentado",
  "resultado": "fallido",
  "fuente": "navigator",
  "odómetro": 120400,
  "horas_de_motor": 3100,
  "total_elementos": 1,
  "elementos_fallidos": 1,
  "ubicación": {
    "latitud": 1.3521,
    "longitud": 103.8198
  },
  "firma": {},
  "adjuntos": [],
  "meta": {
    "riesgoso": true
  },
  "nombre_del_formulario": "Pre-trip DVIR",
  "nombre_del_vehículo": "Truck 7",
  "nombre_del_conductor": "Dana Driver",
  "tiene_fallos": true,
  "inicio": "2026-09-09T07:10:00.000000Z",
  "presentación": "2026-09-09T07:30:00.000000Z",
  "resolución": null,
  "actualización": "2026-09-09T07:30:00.000000Z",
  "creación": "2026-09-09T07:30:00.000000Z"
}
```