---
title: "Conductores"
url: https://fleetbase.io/docs/api/fleetbase/drivers
module: api
---

# Conductores

Los conductores son trabajadores móviles que pueden ser asignados a vehículos y pedidos. Utilice los puntos finales de conductores para gestionar los perfiles de conductores, la autenticación, los dispositivos, la disponibilidad, el seguimiento y el contexto de la organización.

* [El objeto Driver](#el-objeto-driver)
* [Crear un conductor

  POST
  `/v1/drivers`](#crear-un-conductor)
* [Crear un conductor operativo

  POST
  `/v1/drivers`](#crear-un-conductor-operativo)
* [Consultar conductores

  GET
  `/v1/drivers`](#consultar-conductores)
* [Obtener un conductor

  GET
  `/v1/drivers/:id`](#obtener-un-conductor)
* [Actualizar un conductor

  PUT
  `/v1/drivers/:id`](#actualizar-un-conductor)
* [Actualizar un conductor sin contacto

  PUT
  `/v1/drivers/:id`](#actualizar-un-conductor-sin-contacto)
* [Cambiar la contraseña del conductor

  POST
  `/v1/drivers/:id/change-password`](#cambiar-la-contraseña-del-conductor)
* [Solicitar restablecimiento de contraseña del conductor

  POST
  `/v1/drivers/forgot-password`](#solicitar-restablecimiento-de-contraseña-del-conductor)
* [Restablecer la contraseña del conductor

  POST
  `/v1/drivers/reset-password`](#restablecer-la-contraseña-del-conductor)
* [Listar manifiestos de conductores

  GET
  `/v1/drivers/:id/manifests`](#listar-manifiestos-de-conductores)
* [Eliminar un conductor operativo

  DELETE
  `/v1/drivers/:id`](#eliminar-un-conductor-operativo)
* [Eliminar un conductor

  DELETE
  `/v1/drivers/:id`](#eliminar-un-conductor)
* [Rastrear un conductor

  PATCH
  `/v1/drivers/:id/track`](#rastrear-un-conductor)
* [Iniciar sesión del conductor

  POST
  `/v1/drivers/login`](#iniciar-sesión-del-conductor)
* [Solicitar SMS de inicio de sesión del conductor

  POST
  `/v1/drivers/login-with-sms`](#solicitar-sms-de-inicio-de-sesión-del-conductor)
* [Verificar el código de inicio de sesión del conductor

  POST
  `/v1/drivers/verify-code`](#verificar-el-código-de-inicio-de-sesión-del-conductor)
* [Registrar el dispositivo del conductor

  POST
  `/v1/drivers/:id/register-device`](#registrar-el-dispositivo-del-conductor)
* [Registrar dispositivo

  POST
  `/v1/drivers/register-device`](#registrar-dispositivo)
* [Cambiar la organización del conductor

  POST
  `/v1/drivers/:id/switch-organization`](#cambiar-la-organización-del-conductor)
* [Activar/Desactivar el conductor

  POST
  `/v1/drivers/:id/toggle-online`](#activar-desactivar-el-conductor)
* [Listar organizaciones del conductor

  GET
  `/v1/drivers/:id/organizations`](#listar-organizaciones-del-conductor)
* [Obtener la organización actual del conductor

  GET
  `/v1/drivers/:id/current-organization`](#obtener-la-organización-actual-del-conductor)
* [Simular la ruta del conductor

  POST
  `/v1/drivers/:id/simulate`](#simular-la-ruta-del-conductor)

## El objeto Driver

Un conductor representa a un operador de Fleet-Ops que puede recibir tareas, informar de la ubicación, registrar dispositivos y pertenecer a flotas, proveedores, vehículos y organizaciones.
`email` y `phone` son opcionales: un registro de conductor operativo puede no tener ninguno, en cuyo caso el conductor no puede iniciar sesión en Navigator hasta que se proporcionen las credenciales.
`user` y `company` son cadenas de ID públicas y siempre lo han sido: Navigator interpreta `driver.user` directamente en un nombre de canal de socket, por lo que ninguno de los dos se expande en un objeto. `vehicle`, `vendor` y `current_job` son objetos en la creación, actualización y recuperación, que los cargan. Las claves `vehicle_id`, `vendor_id` y `job_id` son identificadores aditivos junto con esos objetos, no como reemplazos. Los campos uuid internos y el token de autenticación nunca forman parte del contrato público.

Atributos

`id`

string

opcional

Identificador público del conductor.

`user`

string

opcional

ID de usuario público asociado al conductor. Siempre una cadena, nunca un objeto: Navigator lo utiliza directamente como identificador de participante de chat y como nombre de canal de socket.

`internal_id`

string

opcional

Identificador interno opcional.

`company`

string

opcional

ID de empresa público para la empresa actual del conductor.

`company_name`

string

opcional

Nombre de la empresa actual del conductor.

`name`

string

opcional

Nombre de visualización del conductor.

`email`

string

opcional

Dirección de correo electrónico del conductor.

`phone`

string

opcional

Número de teléfono del conductor.

`drivers_license_number`

string

opcional

Número de licencia del conductor.

`photo_url`

string

opcional

URL de la foto del conductor.

`avatar_url`

string

opcional

URL del avatar del conductor.

`vehicle`

object

opcional

Vehículo asignado. Se devuelve como un objeto en la creación, actualización y recuperación, que lo cargan. Leer
`vehicle_id`
para el identificador.

`current_job`

object

opcional

Pedido actual. Se devuelve como un objeto en la creación, actualización y recuperación, que lo cargan. Leer
`job_id`
para el identificador.

`vendor`

object

opcional

Proveedor asignado. Se devuelve como un objeto en la creación, actualización y recuperación, que lo cargan. Leer
`vendor_id`
para el identificador.

`fleets`

array of objects

opcional

Flotas a las que pertenece el conductor, cuando se carga.

`location`

object

opcional

Coordenadas actuales del conductor.

`heading`

integer

opcional

Dirección actual en grados.

`altitude`

integer

opcional

Altitud actual.

`speed`

integer

opcional

Velocidad actual.

`country`

string

opcional

Código de país actual.

`currency`

string

opcional

Moneda derivada del país del conductor.

`city`

string

opcional

Ciudad actual.

`online`

boolean

opcional

Indica si el conductor está en línea.

`status`

string

opcional

Estado de ciclo de vida del conductor.

`token`

string

opcional

Token de autenticación devuelto por los puntos finales de inicio de sesión del conductor.

`meta`

object

opcional

Metadatos adicionales del conductor.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez el conductor.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó el conductor.

`timezone`

string

opcional

Zona horaria de la cuenta de usuario del conductor.

`license_expiry`

date

opcional

Fecha de vencimiento de la licencia del conductor.

`vehicle_id`

string

opcional

ID público del vehículo asignado, o
`null`
.

`vendor_id`

string

opcional

ID público del proveedor asignado, o
`null`
.

`job_id`

string

opcional

ID público del pedido actual del conductor, o
`null`
.

`bearing`

number

opcional

Dirección actual.

`current_status`

string

opcional

Estado operativo libre, distinto del estado de ciclo de vida
`status`
.

`skills`

array of strings

opcional

Calificaciones o certificaciones que posee el conductor, utilizadas para la asignación del orquestador.

`max_travel_time`

integer

opcional

Tiempo máximo de conducción por ruta, en segundos.

`max_distance`

integer

opcional

Distancia máxima de conducción por ruta, en metros.

`time_window_start`

string

opcional

Hora de inicio de la jornada laboral predeterminada.

`time_window_end`

string

opcional

Hora de finalización de la jornada laboral predeterminada.

El objeto Driver

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1001",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "Alex Driver",
  "email": "alex.driver@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": null,
  "license_expiry": null,
  "vehicle_id": null,
  "vendor_id": null,
  "job_id": null,
  "photo_url": null,
  "avatar_url": null,
  "vehicle_avatar": null,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "heading": 0,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Singapore",
  "online": false,
  "current_status": null,
  "status": "active",
  "token": null,
  "skills": null,
  "max_travel_time": null,
  "max_distance": null,
  "time_window_start": null,
  "time_window_end": null,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

```json
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1001",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "country": "SG",
  "city": "Singapore",
  "current_status": "on_duty",
  "skills": ["hazmat"],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00",
  "time_window_end": "18:00",
  "meta": { "badge": "A12" },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1002",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "photo_url": null,
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/driver-icons/moto-driver.png",
  "vehicle_id": "vehicle_7YqM3KpL2n",
  "vendor_id": null,
  "job_id": null,
  "vehicle": {
    "id": "vehicle_7YqM3KpL2n",
    "plate_number": "ABC123",
    "make": "Toyota",
    "model": "Camry"
  },
  "vendor": null,
  "current_job": null,
  "location": {
    "type": "Point",
    "coordinates": [
      103.8198,
      1.3521
    ]
  },
  "heading": 0,
  "bearing": null,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Johor Bahru",
  "online": false,
  "current_status": "off_duty",
  "status": "available",
  "token": null,
  "skills": [
    "hazmat"
  ],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "meta": {
    "badge": "B34"
  },
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/drivers/:id`

## [Actualizar un conductor](#actualizar-un-conductor)

Actualiza los campos de la cuenta, la identidad, la asignación, el estado operativo, la ubicación, la foto, las restricciones del orquestador o los metadatos de un conductor.

`password`
no se acepta aquí intencionalmente. Para cambiar la contraseña, es necesario probar la existente y restablecerla requiere un código, ninguno de los cuales puede expresar un cliente general
`PUT`
— use
**Cambiar la contraseña del conductor**,
**Solicitar el restablecimiento de la contraseña del conductor**
y
**Restablecer la contraseña del conductor**
en su lugar.

Las entradas de relación utilizan identificadores públicos y se resuelven dentro de la organización autenticada. Enviar
`null`
borra la asignación.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del conductor.

`email`

string

opcional

Dirección de correo electrónico del conductor.

`phone`

string

opcional

Número de teléfono del conductor.

`timezone`

string

opcional

Zona horaria para la cuenta de usuario del conductor.

`internal_id`

string

opcional

El identificador que el sistema del operador utiliza para este conductor. Se puede consultar mediante
`?internal_id=`
, que es cómo un importador determina si ya existe un conductor.

`drivers_license_number`

string

opcional

Número de licencia del conductor. Se puede consultar mediante
`?drivers_license_number=`
.

`license_expiry`

date

opcional

Fecha en la que expira la licencia del conductor.

`photo`

string

opcional

ID de archivo, referencia de carga o entrada de archivo resoluble para la foto del conductor.

`country`

string

opcional

Código de país de dos letras.

`currency`

string

opcional

Código de moneda de tres letras.

`city`

string

opcional

Ciudad del conductor.

`online`

boolean

opcional

Por defecto:
`false`

Indica si el conductor está en línea.

`current_status`

string

opcional

Estado operativo libre, distinto del estado de ciclo de vida
`status`
.

`status`

enum

opcional

Estado de ciclo de vida del conductor.
`active`
se acepta y se almacena como
`available`
. Uno de
`active`
,
`available`
,
`inactive`
.

`location`

object

opcional

Punto resoluble utilizado como la ubicación actual del conductor.

`latitude`

number

opcional

Latitud decimal. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud decimal. Requerido con
`latitude`
.

`heading`

number

opcional

Dirección actual en grados.

`bearing`

number

opcional

Dirección actual.

`altitude`

number

opcional

Altitud actual.

`speed`

number

opcional

Velocidad actual.

`meta`

object

opcional

Metadatos adicionales del conductor.

`skills`

array of strings

opcional

Calificaciones o certificaciones que posee el conductor, utilizadas para la asignación del orquestador.

`max_travel_time`

integer

opcional

Tiempo máximo de conducción por ruta, en segundos.

`max_distance`

integer

opcional

Distancia máxima de conducción por ruta, en metros.

`time_window_start`

string

opcional

Hora de inicio de la jornada laboral predeterminada, como
`HH:MM`
.

`time_window_end`

string

opcional

Hora de finalización de la jornada laboral predeterminada, como
`HH:MM`
.

`vehicle`

string

opcional

ID público del vehículo (
`vehicle_...`
) para asignar al conductor. Enviar
`null`
para borrar. Debe pertenecer a la organización autenticada.

`vendor`

string

opcional

ID público del proveedor (
`vendor_...`
) para asignar al conductor. Enviar
`null`
para borrar.

`job`

string

opcional

ID público del trabajo (
`order_...`
) para asignar al conductor. Enviar
`null`
para borrar.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "John Doe",
  "email": "{{$randomEmail}}",
  "phone": "{{$randomPhoneNumber}}",
  "internal_id": "DRV-1002",
  "timezone": "Europe/Amsterdam",
  "city": "Johor Bahru",
  "current_status": "off_duty",
  "meta": { "badge": "B34" }
}'
```

Otros métodos para llamar a este endpoint

* OK

200

OK

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1002",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "photo_url": null,
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/driver-icons/moto-driver.png",
  "vehicle_id": "vehicle_7YqM3KpL2n",
  "vendor_id": null,
  "job_id": null,
  "vehicle": {
    "id": "vehicle_7YqM3KpL2n",
    "plate_number": "ABC123",
    "make": "Toyota",
    "model": "Camry"
  },
  "vendor": null,
  "current_job": null,
  "location": {
    "type": "Point",
    "coordinates": [
      103.8198,
      1.3521
    ]
  },
  "heading": 0,
  "bearing": null,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Johor Bahru",
  "online": false,
  "current_status": "off_duty",
  "status": "available",
  "token": null,
  "skills": [
    "hazmat"
  ],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "meta": {
    "badge": "B34"
  },
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/drivers/:id`

## [Actualizar un conductor sin modificar la información de contacto](#actualizar-un-conductor-sin-modificar-la-informacion-de-contacto)

Reenvía la dirección de correo electrónico y el número de teléfono actual del conductor sin modificar.

Se aplica la unicidad en la actualización en comparación con todas las demás cuentas de usuario en vivo, ignorando la propia dirección del conductor mediante UUID. Sin esta cláusula, esta solicitud fallaría contra la dirección del propio conductor — que es por qué existe.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "email": "{{created_driver_email}}",
  "phone": "{{created_driver_phone}}"
}'
```

POST
`/v1/drivers/:id/change-password`

## [Cambiar la contraseña del conductor](#cambiar-la-contraseña-del-conductor)

Cambia la contraseña de un conductor que ha iniciado sesión, probando la existente.

Un cambio de contraseña es una decisión de autorización, no una actualización de atributo, por lo que no puede expresarse mediante un cliente general
`PUT /drivers/:id`
— este endpoint no acepta una contraseña en absoluto. Cambiar la contraseña requiere probar la existente y restablecerla requiere un código, ninguno de los cuales puede expresar un cliente general
`PUT`
— use
**Cambiar la contraseña del conductor**,
**Solicitar el restablecimiento de la contraseña del conductor**
y
**Restablecer la contraseña del conductor**
en su lugar.

Las entradas de relación utilizan identificadores públicos y se resuelven dentro de la organización autenticada. Enviar
`null`
borra la asignación.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del conductor.

`email`

string

opcional

Dirección de correo electrónico del conductor.

`phone`

string

opcional

Número de teléfono del conductor.

`timezone`

string

opcional

Zona horaria para la cuenta de usuario del conductor.

`internal_id`

string

opcional

El identificador que el sistema del operador utiliza para este conductor. Se puede consultar mediante
`?internal_id=`
, que es cómo un importador determina si ya existe un conductor.

`drivers_license_number`

string

opcional

Número de licencia del conductor. Se puede consultar mediante
`?drivers_license_number=`
.

`license_expiry`

date

opcional

Fecha en la que expira la licencia del conductor.

`photo`

string

opcional

ID de archivo, referencia de carga o entrada de archivo resoluble para la foto del conductor.

`country`

string

opcional

Código de país de dos letras.

`currency`

string

opcional

Código de moneda de tres letras.

`city`

string

opcional

Ciudad del conductor.

`online`

boolean

opcional

Por defecto:
`false`

Indica si el conductor está en línea.

`current_status`

string

opcional

Estado operativo libre, distinto del estado de ciclo de vida
`status`
.

`status`

enum

opcional

Estado de ciclo de vida del conductor.
`active`
se acepta y se almacena como
`available`
. Uno de
`active`
,
`available`
,
`inactive`
.

`location`

object

opcional

Punto resoluble utilizado como la ubicación actual del conductor.

`latitude`

number

opcional

Latitud decimal. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud decimal. Requerido con
`latitude`
.

`heading`

number

opcional

Dirección actual en grados.

`bearing`

number

opcional

Dirección actual.

`altitude`

number

opcional

Altitud actual.

`speed`

number

opcional

Velocidad actual.

`meta`

object

opcional

Metadatos adicionales del conductor.

`skills`

array of strings

opcional

Calificaciones o certificaciones que posee el conductor, utilizadas para la asignación del orquestador.

`max_travel_time`

integer

opcional

Tiempo máximo de conducción por ruta, en segundos.

`max_distance`

integer

opcional

Distancia máxima de conducción por ruta, en metros.

`time_window_start`

string

opcional

Hora de inicio de la jornada laboral predeterminada, como
`HH:MM`
.

`time_window_end`

string

opcional

Hora de finalización de la jornada laboral predeterminada, como
`HH:MM`
.

`vehicle`

string

opcional

ID público del vehículo (
`vehicle_...`
) para asignar al conductor. Enviar
`null`
para borrar. Debe pertenecer a la organización autenticada.

`vendor`

string

opcional

ID público del proveedor (
`vendor_...`
) para asignar al conductor. Enviar
`null`
para borrar.

`job`

string

opcional

ID público del trabajo (
`order_...`
) para asignar al conductor. Enviar
`null`
para borrar.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "John Doe",
  "email": "{{$randomEmail}}",
  "phone": "{{$randomPhoneNumber}}",
  "internal_id": "DRV-1002",
  "timezone": "Europe/Amsterdam",
  "city": "Johor Bahru",
  "current_status": "off_duty",
  "meta": { "badge": "B34" }
}'
```

Otros métodos para llamar a este endpoint

* OK

200

OK

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1002",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "photo_url": null,
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/driver-icons/moto-driver.png",
  "vehicle_id": "vehicle_7YqM3KpL2n",
  "vendor_id": null,
  "job_id": null,
  "vehicle": {
    "id": "vehicle_7YqM3KpL2n",
    "plate_number": "ABC123",
    "make": "Toyota",
    "model": "Camry"
  },
  "vendor": null,
  "current_job": null,
  "location": {
    "type": "Point",
    "coordinates": [
      103.8198,
      1.3521
    ]
  },
  "heading": 0,
  "bearing": null,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Johor Bahru",
  "online": false,
  "current_status": "off_duty",
  "status": "available",
  "token": null,
  "skills": [
    "hazmat"
  ],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "meta": {
    "badge": "B34"
  },
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/drivers/:id`

## [Actualizar un conductor sin modificar la información de contacto (sin contacto)](#actualizar-un-conductor-sin-modificar-la-informacion-de-contacto)

Reenvía la dirección de correo electrónico y el número de teléfono actual del conductor sin modificar.

Se aplica la unicidad en la actualización en comparación con todas las demás cuentas de usuario en vivo, ignorando la propia dirección del conductor mediante UUID. Sin esta cláusula, esta solicitud fallaría contra la dirección del propio conductor — que es por qué existe.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "email": "{{created_driver_email}}",
  "phone": "{{created_driver_phone}}"
}'
```

POST
`/v1/drivers/:id/change-password`

## [Cambiar la contraseña del conductor](#cambiar-la-contraseña-del-conductor)

Cambia la contraseña de un conductor que ha iniciado sesión, probando la existente.

Un cambio de contraseña es una decisión de autorización, no una actualización de atributo, por lo que no puede expresarse mediante un cliente general
`PUT /drivers/:id`
— este endpoint no acepta una contraseña en absoluto. Cambiar la contraseña requiere probar la existente y restablecerla requiere un código, ninguno de los cuales puede expresar un cliente general
`PUT`
— use
**Cambiar la contraseña del conductor**,
**Solicitar el restablecimiento de la contraseña del conductor**
y
**Restablecer la contraseña del conductor**
en su lugar.

Las entradas de relación utilizan identificadores públicos y se resuelven dentro de la organización autenticada. Enviar
`null`
borra la asignación.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del conductor.

`email`

string

opcional

Dirección de correo electrónico del conductor.

`phone`

string

opcional

Número de teléfono del conductor.

`timezone`

string

opcional

Zona horaria para la cuenta de usuario del conductor.

`internal_id`

string

opcional

El identificador que el sistema del operador utiliza para este conductor. Se puede consultar mediante
`?internal_id=`
, que es cómo un importador determina si ya existe un conductor.

`drivers_license_number`

string

opcional

Número de licencia del conductor. Se puede consultar mediante
`?drivers_license_number=`
.

`license_expiry`

date

opcional

Fecha en la que expira la licencia del conductor.

`photo`

string

opcional

ID de archivo, referencia de carga o entrada de archivo resoluble para la foto del conductor.

`country`

string

opcional

Código de país de dos letras.

`currency`

string

opcional

Código de moneda de tres letras.

`city`

string

opcional

Ciudad del conductor.

`online`

boolean

opcional

Por defecto:
`false`

Indica si el conductor está en línea.

`current_status`

string

opcional

Estado operativo libre, distinto del estado de ciclo de vida
`status`
.

`status`

enum

opcional

Estado de ciclo de vida del conductor.
`active`
se acepta y se almacena como
`available`
. Uno de
`active`
,
`available`
,
`inactive`
.

`location`

object

opcional

Punto resoluble utilizado como la ubicación actual del conductor.

`latitude`

number

opcional

Latitud decimal. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud decimal. Requerido con
`latitude`
.

`heading`

number

opcional

Dirección actual en grados.

`bearing`

number

opcional

Dirección actual.

`altitude`

number

opcional

Altitud actual.

`speed`

number

opcional

Velocidad actual.

`meta`

object

opcional

Metadatos adicionales del conductor.

`skills`

array of strings

opcional

Calificaciones o certificaciones que posee el conductor, utilizadas para la asignación del orquestador.

`max_travel_time`

integer

opcional

Tiempo máximo de conducción por ruta, en segundos.

`max_distance`

integer

opcional

Distancia máxima de conducción por ruta, en metros.

`time_window_start`

string

opcional

Hora de inicio de la jornada laboral predeterminada, como
`HH:MM`
.

`time_window_end`

string

opcional

Hora de finalización de la jornada laboral predeterminada, como
`HH:MM`
.

`vehicle`

string

opcional

ID público del vehículo (
`vehicle_...`
) para asignar al conductor. Enviar
`null`
para borrar. Debe pertenecer a la organización autenticada.

`vendor`

string

opcional

ID público del proveedor (
`vendor_...`
) para asignar al conductor. Enviar
`null`
para borrar.

`job`

string

opcional

ID público del trabajo (
`order_...`
) para asignar al conductor. Enviar
`null`
para borrar.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "John Doe",
  "email": "{{$randomEmail}}",
  "phone": "{{$randomPhoneNumber}}",
  "internal_id": "DRV-1002",
  "timezone": "Europe/Amsterdam",
  "city": "Johor Bahru",
  "current_status": "off_duty",
  "meta": { "badge": "B34" }
}'
```

Otros métodos para llamar a este endpoint

* OK

200

OK

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal_id": "DRV-1002",
  "company": "company_6zV1KqN9pR",
  "company_name": "Fleetbase",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+15555550111",
  "timezone": "Asia/Singapore",
  "drivers_license_number": "S1234567A",
  "license_expiry": "2030-06-30",
  "photo_url": null,
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/driver-icons/moto-driver.png",
  "vehicle_id": "vehicle_7YqM3KpL2n",
  "vendor_id": null,
  "job_id": null,
  "vehicle": {
    "id": "vehicle_7YqM3KpL2n",
    "plate_number": "ABC123",
    "make": "Toyota",
    "model": "Camry"
  },
  "vendor": null,
  "current_job": null,
  "location": {
    "type": "Point",
    "coordinates": [
      103.8198,
      1.3521
    ]
  },
  "heading": 0,
  "bearing": null,
  "altitude": 0,
  "speed": 0,
  "country": "SG",
  "currency": "SGD",
  "city": "Johor Bahru",
  "online": false,
  "current_status": "off_duty",
  "status": "available",
  "token": null,
  "skills": [
    "hazmat"
  ],
  "max_travel_time": 28800,
  "max_distance": 250000,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "meta": {
    "badge": "B34"
  },
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/drivers/:id`

## [Actualizar un conductor sin modificar la información de contacto (sin contacto) (sin contacto)](#actualizar-un-conductor-sin-modificar-la-informacion-de-contacto-(sin-contacto))

Reenvía la dirección de correo electrónico y el número de teléfono actual del conductor sin modificar.

Se aplica la unicidad en la actualización en comparación con todas las demás cuentas de usuario en vivo, ignorando la propia dirección del conductor mediante UUID. Sin esta cláusula, esta solicitud fallaría contra la dirección del propio conductor — que es por qué existe.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "email": "{{created_driver_email}}",
  "phone": "{{created_driver_phone}}"
}'
```

POST
`/v1/drivers/:id/change-password`

## [Cambiar la contraseña del conductor](#cambiar-la-contraseña-del-conductor)

Cambia la contraseña de un conductor que ha iniciado sesión, probando la existente.

Un cambio de contraseña es una decisión de autorización, no una actualización de atributo, por lo que no puede expresarse mediante un cliente general
`PUT /drivers/:id`
— este endpoint no acepta una contraseña en absoluto. Cambiar la contraseña requiere probar la existente y restablecerla requiere un código, ninguno de los cuales puede expresar un cliente general
`PUT`
— use
**Cambiar la contraseña del conductor**,
**Solicitar el restablecimiento de la contraseña del conductor**
y
**Restablecer la contraseña del conductor**
en su lugar.

Las entradas de relación utilizan identificadores públicos y se resuelven dentro de la organización autenticada. Enviar
`null`
borra la asignación.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del conductor.

`email`

string

opcional

Dirección de correo electrónico del conductor.

`phone`

string

opcional

Número de teléfono del conductor.

`timezone`

string

opcional

Zona horaria para la cuenta de usuario del conductor.

`internal_id`

string

opcional

El identificador que el sistema del operador utiliza para este conductor. Se puede consultar mediante
`?internal_id=`
, que es cómo un importador determina si ya existe un conductor.

`drivers_license_number`

string

opcional

Número de licencia del conductor. Se puede consultar mediante
`?drivers_license_number=`
.

`license_expiry`

date

opcional

Fecha en la que expira la licencia del conductor.

`photo`

string

opcional

ID de archivo, referencia de carga o entrada de archivo resoluble para la foto del conductor.

`country`

string

opcional

Código de país de dos letras.

`currency`

string

opcional

Código de moneda de tres letras.

`city`

string

opcional

Ciudad del conductor.

`online`

boolean

opcional

Por defecto:
`false`

Indica si el conductor está en línea.

`current_status`

string

opcional

Estado operativo libre, distinto del estado de ciclo de vida
`status`
.

`status`

enum

opcional

Estado de ciclo de vida del conductor.
`active`
se acepta y se almacena como
`available`
. Uno de
`active`
,
`available`
,
`inactive`
.

`location`

object

opcional

Punto resoluble utilizado como la ubicación actual del conductor.

`latitude`

number

opcional

Latitud decimal. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud decimal. Requerido con
`latitude`
.

`heading`

number

opcional

Dirección actual en grados.

`bearing`

number

opcional

Dirección actual.

`altitude`

number

opcional

Altitud actual.

`speed`

number

opcional

Velocidad actual.

`meta`

object

opcional

Metadatos adicionales del conductor.

`skills`

array of strings

opcional

Calificaciones o certificaciones que posee el conductor, utilizadas para la asignación del orquestador.

`max_travel_time`

integer

opcional

Tiempo máximo de conducción por ruta, en segundos.

`max_distance`

integer

opcional

Distancia máxima de conducción por ruta, en metros.

`time_window_start`

string

opcional

Hora de inicio de la jornada laboral predeterminada, como
`HH:MM`
.

`time_window_end`

string

opcional

Hora de finalización de la jornada laboral predeterminada, como
`HH:MM`
.

`vehicle`

string

opcional

ID público del vehículo (
`vehicle_...`
) para asignar al conductor. Enviar
`null`
para borrar. Debe pertenecer a la organización autenticada.

`vendor`

string

opcional

ID público del proveedor (
`vendor_...`
) para asignar al conductor. Enviar
`null`
para borrar.

`job`

string

opcional

ID público del trabajo (
`order_...`
) para asignar al conductor. Enviar
`null`
para borrar.

PUT
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "John Doe",
  "email": "{{$randomEmail}}",
  "phone": "{{$randomPhoneNumber}}",
  "internal_id": "DRV-1002",
  "timezone": "Europe/Amsterdam",
  "city": "Johor Bahru",
  "current_status": "off_duty",
  "meta": { "badge": "B34" }
}'
```

Otros métodos para llamar a este endpoint

* OK

200

OK

```
{
  "id": "driver_A1b2C3d4E5",
  "user": "user_1A2b3C4d5E",
  "internal

`driver_password_reset_code`
es un código que se emite para este flujo específicamente: un código de inicio de sesión no funcionará, ya que el punto final coincide intencionalmente, así como el valor. La contraseña se restablece a la que ya está vigente, de modo que la ejecución sea repetible y las solicitudes de inicio de sesión del conductor sigan funcionando.

Parámetros del cuerpo

`identity`

string

obligatorio

La dirección de correo electrónico o el número de teléfono del conductor: el mismo que se utilizó para enviar el código.

`code`

string

obligatorio

El código de verificación enviado por
`POST /drivers/forgot-password`
.

`password`

string

obligatorio

La nueva contraseña. Debe tener al menos 8 caracteres.

POST
`/v1/drivers/reset-password`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/reset-password \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{driver_identity}}",
  "code": "{{driver_password_reset_code}}",
  "password": "{{driver_password}}"
}'
```

GET
`/v1/drivers/:id/manifests`

## [List Driver Manifests](#list-driver-manifests)

Enumera las rutas asignadas a un conductor, de la más reciente a la más antigua.

Una ruta es la secuencia de paradas de un conductor: una secuencia de paradas independiente de los pedidos, que puede abarcar varios pedidos, o ninguno que el conductor haya visto como un pedido.

Por defecto, se utiliza la ventana más reciente en lugar de todo el historial del conductor. Utilice
`status`
y
`on`
para refinar aún más la búsqueda.

Parámetros de consulta

`status`

string

opcional

Códigos de estado separados por comas, como
`pending,in_progress`
.

`on`

string

opcional

Solo los manifiestos programados para esta fecha, como
`YYYY-MM-DD`
.

`limit`

integer

opcional

Número máximo de manifiestos a devolver. Por defecto, es 30.

GET
`/v1/drivers/:id/manifests`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers/:id/manifests \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/drivers/:id`

## [Delete an Operational Driver](#delete-an-operational-driver)

Elimina el conductor sin credenciales creado por
**Create an Operational Driver**
.

DELETE
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/drivers/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

DELETE
`/v1/drivers/:id`

## [Delete a Driver](#delete-a-driver)

Utilice este punto final para eliminar un conductor.

DELETE
`/v1/drivers/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/drivers/:id \
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

PATCH
`/v1/drivers/:id/track`

## [Track Driver](#track-driver)

Parámetros del cuerpo

`latitude`

number

opcional

Latitud del conductor. Si se omite junto con
`longitude`
, Fleetbase devuelve el recurso del conductor actual sin actualizar la ubicación.

`longitude`

number

opcional

Longitud del conductor. Si se omite junto con
`latitude`
, Fleetbase devuelve el recurso del conductor actual sin actualizar la ubicación.

`altitude`

number

opcional

Altitud actual.

`heading`

number

opcional

Dirección actual en grados.

`speed`

number

opcional

Velocidad actual.

PATCH
`/v1/drivers/:id/track`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/drivers/:id/track \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/drivers/login`

## [Login Driver](#login-driver)

Autentica al conductor con correo electrónico/teléfono y contraseña.

Parámetros del cuerpo

`identity`

string

obligatorio

Dirección de correo electrónico o número de teléfono del conductor.

`password`

string

obligatorio

Contraseña de la cuenta del conductor.

POST
`/v1/drivers/login`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/login \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{driver_identity}}",
  "password": "{{driver_password}}"
}'
```

POST
`/v1/drivers/login-with-sms`

## [Request Driver Login SMS](#request-driver-login-sms)

Inicia la verificación de inicio de sesión del conductor mediante SMS.

Parámetros del cuerpo

`phone`

string

obligatorio

Número de teléfono del conductor al que se enviará el código de verificación.

POST
`/v1/drivers/login-with-sms`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/login-with-sms \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "phone": "{{driver_phone}}"
}'
```

POST
`/v1/drivers/verify-code`

## [Verify Driver Login Code](#verify-driver-login-code)

Verifica el código de inicio de sesión del conductor y devuelve un token de conductor.

Parámetros del cuerpo

`identity`

string

obligatorio

Dirección de correo electrónico o número de teléfono del conductor utilizado para la verificación.

`code`

string

obligatorio

Código de verificación enviado al conductor.

`for`

string

opcional

Por defecto:
`driver_login`

Propósito de la verificación. Por defecto, es
`driver_login`
.

POST
`/v1/drivers/verify-code`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/verify-code \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{driver_identity}}",
  "code": "{{verification_code}}"
}'
```

POST
`/v1/drivers/:id/register-device`

## [Register Driver Device](#register-driver-device)

Registra un token de dispositivo para un conductor específico.

Parámetros del cuerpo

`token`

string

obligatorio

Token de push del dispositivo para registrarse.

`platform`

string

obligatorio

Plataforma del dispositivo. También se puede proporcionar como
`os`
.

`os`

string

opcional

Alias para
`platform`
.

POST
`/v1/drivers/:id/register-device`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/register-device \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "token": "{{device_token}}",
  "platform": "ios"
}'
```

POST
`/v1/drivers/register-device`

## [Register Device](#register-device)

Registra el token de dispositivo del conductor a través de la ruta no-id.

Parámetros del cuerpo

`token`

string

obligatorio

Token de push para registrar.

`platform`

string

obligatorio

Plataforma del dispositivo. También se puede proporcionar como
`os`
.

`os`

string

opcional

Alias para
`platform`
.

POST
`/v1/drivers/register-device`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/register-device \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "token": "{{device_token}}",
  "platform": "ios"
}'
```

POST
`/v1/drivers/:id/switch-organization`

## [Switch Driver Organization](#switch-driver-organization)

Cambia la sesión del conductor a otra organización.

El conductor debe pertenecer a la organización de destino, y no debe estar en la organización actual: se rechaza cambiar a la organización actual. Un conductor creado a través de
`POST /drivers`
pertenece a una sola organización, por lo que este ejemplo utiliza una que pertenece a más de una.

Parámetros del cuerpo

`next`

string

obligatorio

ID de la organización a la que se debe cambiar la sesión del conductor.

POST
`/v1/drivers/:id/switch-organization`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/switch-organization \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "next": "{{secondary_organization_id}}"
}'
```

POST
`/v1/drivers/:id/toggle-online`

## [Toggle Driver Online](#toggle-driver-online)

Activa o desactiva el estado en línea del conductor.

Parámetros del cuerpo

`online`

boolean

opcional

Estado en línea para establecer. Si se omite, Fleetbase cambia el estado en línea actual del conductor.

POST
`/v1/drivers/:id/toggle-online`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/toggle-online \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "online": true
}'
```

GET
`/v1/drivers/:id/organizations`

## [List Driver Organizations](#list-driver-organizations)

Enumera las organizaciones a las que pertenece el conductor.

GET
`/v1/drivers/:id/organizations`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers/:id/organizations \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/drivers/:id/current-organization`

## [Get Driver Current Organization](#get-driver-current-organization)

Devuelve la organización actual del conductor.

GET
`/v1/drivers/:id/current-organization`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/drivers/:id/current-organization \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/drivers/:id/simulate`

## [Simulate Driver Route](#simulate-driver-route)

Simula la ruta del conductor entre dos puntos, o simula una ruta de pedido.

Parámetros del cuerpo

`start`

object

opcional

Punto de inicio para la ruta simulada. Obligatorio si
`order`
no se proporciona.

`end`

object

opcional

Punto final para la ruta simulada. Obligatorio si
`order`
no se proporciona.

`order`

string

opcional

ID del pedido para simular. Obligatorio si la acción es
`order`
.

`action`

string

opcional

Por defecto:
`drive`

Acción de simulación. Por defecto, es
`drive`
.

POST
`/v1/drivers/:id/simulate`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers/:id/simulate \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "start": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "end": {
    "latitude": 1.2903,
    "longitude": 103.8519
  }
}'
```