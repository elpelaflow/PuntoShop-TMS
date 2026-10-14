---
título: "Referencia de la API"
url: https://fleetbase.io/docs/api
módulo: api
---

## Introducción

La API de Fleetbase está organizada según el estándar REST. Nuestra API utiliza URLs predecibles y orientadas a recursos, acepta cuerpos de solicitud codificados en JSON, devuelve respuestas codificadas en JSON y utiliza códigos de respuesta, autenticación y verbos HTTP estándar. Soportamos el intercambio de recursos entre orígenes, lo que le permite interactuar de forma segura con nuestra API desde una aplicación web del lado del cliente, pero nunca debe exponer su clave de API secreta en el código del lado del cliente de un sitio web público.

Para que la API sea lo más explorable posible, las cuentas tienen
**modo de prueba**
y
**modo de producción**.
Las claves de API. No hay un "interruptor" para cambiar entre modos; utilice la clave apropiada para realizar una transacción de prueba o de producción. Las solicitudes realizadas con credenciales de modo de prueba nunca llegan a los datos de producción y no generan ningún costo.

### URL base

```
https://api.fleetbase.io/v1
```

Todas las solicitudes a la API deben realizarse a través de HTTPS. Las llamadas realizadas a través de HTTP estándar fallarán. Las solicitudes a la API sin autenticación también fallarán.

## Autenticación

La API de Fleetbase utiliza claves de API para autenticar las solicitudes. Puede ver y administrar sus claves de API en la
[Consola de desarrolladores](https://fleetbase.io/docs/platform/developer-console/api-keys)
.

Las claves de API de modo de prueba tienen el prefijo
`flb_test_`
y las claves de API de modo de producción tienen el prefijo
`flb_live_`
. También puede crear claves de API restringidas para permisos granulares.

Para autenticarse, envíe su clave de API como un token Bearer en el
`Authorization`
header:

```
curl https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…"
```

Sus claves de API tienen muchos privilegios, así que manténgalas seguras. No comparta claves de API en áreas accesibles públicamente, como repositorios de GitHub, código del lado del cliente o hilos de chat.

## Errores

Fleetbase utiliza códigos de respuesta HTTP convencionales para indicar el éxito o el fracaso de una solicitud a la API:

| Rango de código | Significado |
|---|---|
| `2xx` | Éxito |
| `4xx` | Fallo debido a la información proporcionada (parámetro faltante, fallo de validación, etc.) |
| `5xx` | Error con los servidores de Fleetbase (raro) |

Cuando una solicitud falla, el cuerpo de la respuesta contiene un único
`error`
campo que describe lo que salió mal:

```
{
  "error": "El campo 'nombre' es obligatorio."
}
```

El valor de
`error`
es una cadena legible por humanos, adecuada para mostrar a sus usuarios finales. El código de estado HTTP indica la categoría de fallo, consulte la tabla a continuación.

### Códigos de estado comunes

| Estado | Significado |
|---|---|
| `200 OK` | La solicitud tuvo éxito |
| `201 Created` | Se ha creado un recurso |
| `204 No Content` | Éxito sin cuerpo de respuesta (por ejemplo, eliminar) |
| `400 Bad Request` | Solicitud mal formada — compruebe el cuerpo |
| `401 Unauthorized` | Clave de API faltante o inválida |
| `403 Forbidden` | La clave de API no otorga acceso a este recurso |
| `404 Not Found` | El recurso no existe |
| `422 Unprocessable Entity` | Fallo de validación |
| `429 Too Many Requests` | Se le está limitando la velocidad |
| `500 Server Error` | Algo ha fallado en nuestro lado |

## Paginación

Los endpoints de lista devuelven un array JSON de registros. La paginación se realiza en el
**lado de la solicitud**
— pase
`limit`
,
`offset`
, o
`page`
para controlar la porción de registros devueltos. La respuesta en sí no contiene metadatos de paginación; avance entre páginas emitiendo solicitudes de seguimiento con un
`offset`
(o
`page`
) más alto hasta que el array de respuesta sea más corto que
`limit`
.

```
# Paginación basada en offset
curl "https://api.fleetbase.io/v1/orders?limit=25&offset=50" \
  -H "Authorization: Bearer flb_live_…"

# O paginación basada en página — page * limit actúa como offset
curl "https://api.fleetbase.io/v1/orders?limit=25&page=3" \
  -H "Authorization: Bearer flb_live_…"
```

| Parámetro | Valor predeterminado | Descripción |
|---|---|---|
| `limit` | 25 | Número máximo de registros por respuesta. Máximo 100. |
| `offset` | 0 | Número de registros a omitir desde el principio del conjunto de resultados. |
| `page` | 1 | Número de página (en inglés). Equivalente a `offset = (page - 1) * limit` . |
| `sort` | `-created_at` | Campo de ordenación. Prefije con "-" para ordenación descendente. |

La paginación se completa cuando la respuesta devuelve menos de
`limit`
registros.

## Versiones

La versión actual de la API es
`v1`
. No introducimos cambios incompatibles con una versión de API publicada. Los cambios incompatibles se envían como una nueva versión (por ejemplo,
`v2`) — su integración seguirá utilizando
`v1`
hasta que elija actualizar.

La versión se incluye en la URL de la solicitud:

```
https://api.fleetbase.io/v1/orders
```

Las adiciones no incompatibles — nuevos endpoints, campos opcionales, propiedades de respuesta adicionales, nuevos tipos de eventos — se envían continuamente a la versión actual. Construya su cliente para que ignore los campos desconocidos para que así no se rompa.