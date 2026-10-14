---
title: "Clientes"
url: https://fleetbase.io/docs/api/fleetbase/customers
module: api
---

# Clientes

Los endpoints de clientes proporcionan la autenticación con correo electrónico/contraseña + código de verificación y la gestión de pedidos a nivel de cliente para FleetOps. Todos los flujos de autenticación se dirigen a una única empresa de Fleetbase resuelta a partir de su credencial de API `flb_live_…`; además, las solicitudes por cliente requieren el "Customer-Token" devuelto al registrarse/iniciar sesión.

* [El objeto "Customer"](#el-objeto-customer)
* [Solicitar el código de creación de cliente

  POST
  `/v1/customers/request-creation-code`](#solicitar-el-codigo-de-creacion-de-cliente)
* [Crear un cliente

  POST
  `/v1/customers`](#crear-un-cliente)
* [Iniciar sesión en el cliente

  POST
  `/v1/customers/login`](#iniciar-sesion-en-el-cliente)
* [Solicitar el SMS de inicio de sesión del cliente

  POST
  `/v1/customers/login-with-sms`](#solicitar-el-sms-de-inicio-de-sesion-del-cliente)
* [Verificar el código de inicio de sesión del cliente

  POST
  `/v1/customers/verify-code`](#verificar-el-codigo-de-inicio-de-sesion-del-cliente)
* [Olvidé la contraseña del cliente

  POST
  `/v1/customers/forgot-password`](#olvide-la-contraseña-del-cliente)
* [Restablecer la contraseña del cliente

  POST
  `/v1/customers/reset-password`](#restablecer-la-contraseña-del-cliente)
* [Obtener el cliente autenticado

  GET
  `/v1/customers/me`](#obtener-el-cliente-autenticado)
* [Actualizar el cliente autenticado

  PUT
  `/v1/customers/me`](#actualizar-el-cliente-autenticado)
* [Cerrar sesión del cliente

  POST
  `/v1/customers/logout`](#cerrar-sesion-del-cliente)
* [Cerrar sesión de todas las sesiones del cliente

  POST
  `/v1/customers/logout-all`](#cerrar-sesion-de-todas-las-sesiones-del-cliente)
* [Registrar el dispositivo del cliente

  POST
  `/v1/customers/register-device`](#registrar-el-dispositivo-del-cliente)
* [Listar los lugares del cliente

  GET
  `/v1/customers/places`](#listar-los-lugares-del-cliente)
* [Listar los pedidos del cliente

  GET
  `/v1/customers/orders`](#listar-los-pedidos-del-cliente)
* [Crear un pedido para el cliente

  POST
  `/v1/customers/orders`](#crear-un-pedido-para-el-cliente)
* [Obtener un pedido del cliente

  GET
  `/v1/customers/orders`](#obtener-un-pedido-del-cliente)

## El objeto "Customer"

Un cliente es un contacto de Fleet-Ops de tipo "customer" que está vinculado a un usuario para la autenticación. Se devuelve en todos los endpoints `/v1/customers/...`. El campo "token" solo está presente en las respuestas de registro, inicio de sesión y verificación de código; guárdelo en el lado del cliente y envíelo en las solicitudes posteriores mediante el encabezado "Customer-Token".

Atributos

`id`

string

opcional

Identificador público del cliente. Prefijado
`customer_`
en la API pública.

`internal_id`

string

opcional

Identificador interno opcional.

`name`

string

opcional

Nombre de visualización del cliente.

`title`

string

opcional

Título opcional.

`email`

string

opcional

Dirección de correo electrónico del cliente.

`phone`

string

opcional

Número de teléfono del cliente (formato E.164).

`photo_url`

string

opcional

URL de la foto del cliente.

`address`

string

opcional

Dirección predeterminada derivada del lugar vinculado, cuando se establece.

`addresses`

array de objetos

opcional

Direcciones de lugar guardadas, cuando se carga la relación
`places`
.

`token`

string

opcional

Token personal de Sanctum devuelto al registrarse/iniciar sesión/verificar el código. Envíelo en las solicitudes autenticadas como el encabezado
`Customer-Token`
.

`orders_count`

integer

opcional

Número de pedidos no eliminados vinculados a este cliente.

`company`

object

opcional

Proyección pública segura de la empresa del cliente. Contiene el ID público, el nombre y la moneda de transacción resuelta de la empresa (con respaldo a través de
`companies.currency`
→ ledger
`base_currency`
→
`"USD"`, el país y el número de teléfono. Útil para los portales que necesitan renderizar etiquetas de moneda e información de contacto sin realizar una solicitud separada.

`meta`

object

opcional

Metadatos de formato libre almacenados en la columna
`meta`
del contacto. La API no escribe en este campo; es de propiedad del cliente.

`slug`

string

opcional

Slug URL-friendly.

`created_at`

timestamp

opcional

Cuando se creó el cliente.

`updated_at`

timestamp

opcional

Cuando se actualizó por última vez el cliente.

El objeto
`Customer`

```
{
  "id": "customer_A1b2C3d4E5",
  "internal_id": null,
  "name": "Jane Customer",
  "title": null,
  "email": "jane@example.com",
  "phone": "+15555550111",
  "photo_url": null,
  "address": null,
  "addresses": [],
  "token": "1|f4Wd3jY9aB...",
  "orders_count": 0,
  "company": {
    "id": "company_6zV1KqN9pR",
    "name": "ACME Logistics",
    "currency": "USD",
    "country": "US",
    "phone": "+1-555-0100"
  },
  "meta": {},
  "slug": "jane-customer",
  "created_at": "2026-05-21T10:00:00.000000Z",
  "updated_at": "2026-05-21T10:00:00.000000Z"
}
```

POST
`/v1/customers/request-creation-code`

## [Solicitar el código de creación de cliente](#solicitar-el-codigo-de-creacion-de-cliente)

Envía un correo electrónico o SMS de verificación para iniciar el registro de un cliente. Es necesario antes de llamar a
`Crear un cliente`
. Opcionalmente, incluya
`name`
y
`phone`
para que el correo electrónico de verificación salude al cliente por su nombre y la fila de usuario pendiente se pre-ponga con valores reales.

Parámetros del cuerpo

`identity`

string

requerido

Dirección de correo electrónico o número de teléfono para el que se solicita el código de verificación.

`mode`

string

requerido

Canal para enviar el código. Puede ser
`email`
o
`sms`
.

`name`

string

opcional

Nombre de visualización del cliente. Cuando se proporciona, el correo electrónico de verificación saluda al cliente por su nombre y el registro de usuario pendiente se pre-ponga con este valor (evita un marcador "Cliente Pendiente").

`phone`

string

opcional

Número de teléfono (formato E.164 recomendado). Se pre-ponga en la fila de usuario pendiente junto con la identidad de correo electrónico.

POST
`/v1/customers/request-creation-code`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/request-creation-code \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "mode": "email",
  "name": "{{customer_name}}",
  "phone": "{{customer_phone}}"
}'
```

POST
`/v1/customers`

## [Crear un cliente](#crear-un-cliente)

Crea una cuenta de cliente (Contacto + Usuario vinculado) después de verificar el código de
`Solicitar el código de creación de cliente`
. Devuelve el cliente con un token de Sanctum
`token`
— guárdelo en el lado del cliente y envíelo como el encabezado
`Customer-Token`
en las solicitudes autenticadas.

Parámetros del cuerpo

`identity`

string

requerido

Correo electrónico o número de teléfono para el que se solicitó el código de verificación.

`code`

string

requerido

Código de verificación recibido por correo electrónico o SMS.

`name`

string

requerido

Nombre de visualización del cliente.

`password`

string

requerido

Contraseña de la cuenta (mínimo 8 caracteres).

`email`

string

opcional

Dirección de correo electrónico, si es diferente de la identidad. Debe ser único dentro de la empresa.

`phone`

string

opcional

Número de teléfono (formato E.164 recomendado). Debe ser único dentro de la empresa.

`title`

string

opcional

Título opcional.

`photo`

string

opcional

Puede ser el ID público de un archivo o una URI de datos codificada en base64.

`place`

string|object

opcional

Dirección de lugar predeterminada derivada del lugar vinculado, cuando se establece. Puede ser el ID público de un lugar existente en esta empresa (
`place_…`
), o un objeto de lugar inline utilizando los campos estándar de Place:
`name`
,
`street1`
,
`street2`
,
`city`
,
`province`
,
`postal_code`
,
`neighborhood`
,
`district`
,
`building`
,
`country`
,
`phone`
,
`meta`
. Cuando se proporciona, el controlador crea el lugar con el nuevo cliente como
`owner_uuid`
y lo establece como
`place_uuid`
en el contacto.

`meta`

object

opcional

Metadatos de formato libre almacenados en la columna
`meta`
del contacto. La API no escribe en este campo; es de propiedad del cliente.

POST
`/v1/customers`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "code": "{{verification_code}}",
  "name": "Jane Customer",
  "password": "{{customer_password}}",
  "phone": "{{$randomPhoneNumber}}",
  "place": {
    "name": "Home",
    "street1": "123 Main Street",
    "city": "Kingston",
    "province": "Kingston",
    "postal_code": "00000",
    "country": "JM"
  }
}'
```

POST
`/v1/customers/login`

## [Iniciar sesión en el cliente](#iniciar-sesion-en-el-cliente)

Autentica al cliente con correo electrónico/teléfono + contraseña. Devuelve el cliente con un token de Sanctum
`token`
para usar como
`Customer-Token`
.

Parámetros del cuerpo

`identity`

string

requerido

Dirección de correo electrónico o número de teléfono.

`password`

string

requerido

Contraseña de la cuenta.

POST
`/v1/customers/login`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/login \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "password": "{{customer_password}}"
}'
```

POST
`/v1/customers/login-with-sms`

## [Solicitar el SMS de inicio de sesión del cliente](#solicitar-el-sms-de-inicio-de-sesion-del-cliente)

Inicia el inicio de sesión sin contraseña mediante el envío de un código de verificación al número de teléfono del cliente. Se recurre al correo electrónico si la entrega por SMS falla y hay una dirección de correo electrónico en el archivo.

Parámetros del cuerpo

`phone`

string

requerido

Número de teléfono del cliente (formato E.164 recomendado). También se puede utilizar
`identity`
.

POST
`/v1/customers/login-with-sms`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/login-with-sms \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "phone": "{{customer_phone}}"
}'
```

POST
`/v1/customers/verify-code`

## [Verificar el código de inicio de sesión del cliente](#verificar-el-codigo-de-inicio-de-sesion-del-cliente)

Verifica el código SMS/correo electrónico de
`Solicitar el SMS de inicio de sesión del cliente`
y devuelve el cliente con un token de Sanctum
`token`
. Si
`for`
es
`fleetops_create_customer`
este proxy a
`Crear un cliente`
.

Parámetros del cuerpo

`identity`

string

requerido

Correo electrónico o número de teléfono para el que se solicitó el código.

`code`

string

requerido

Código de verificación recibido por SMS o correo electrónico.

`for`

string

opcional

Código de verificación. Por defecto es
`fleetops_customer_login`
. Establecerlo en
`fleetops_create_customer`
para completar un flujo de registro que comenzó con
`Solicitar el código de creación de cliente`
.

POST
`/v1/customers/verify-code`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

GET
`/v1/customers/orders`

## [List Customer Orders](#list-customer-orders)

Lists orders owned by the authenticated customer (scoped to
`orders.customer_uuid`
).

Query parameters

`limit`

integer

optional

Tamaño de la página.

`offset`

integer

optional

Desplazamiento de la página.

`status`

string

optional

Filtra por el estado del pedido (por ejemplo,
`created`
,
`dispatched`
,
`completed`
).

`query`

string

optional

Búsqueda de texto libre en los campos del pedido.

GET
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}" \
  -d '{
  "type": "transport",
  "scheduled_at": "2026-05-25T10:00:00Z",
  "notes": "Handle with care.",
  "pickup": {
    "name": "Pickup",
    "street1": "4169 N State RD 7",
    "city": "Lauderdale Lakes",
    "province": "FL",
    "postal_code": "33319",
    "country": "US"
  },
  "dropoff": {
    "name": "Dropoff",
    "city": "Kingston",
    "country": "JM"
  },
  "entities": [
    {
      "name": "Wireless Headphones",
      "description": "Electronics",
      "weight": 2.5,
      "weight_unit": "lb",
      "declared_value": 150,
      "currency": "USD"
    }
  ]
}'
```

GET
`/v1/customers/orders`

## [Retrieve a Customer Order](#retrieve-a-customer-order)

Obtiene el pedido del cliente.

Body parameters

`id`

string

required

El ID del pedido.

`status`

string

optional

El estado del pedido.

`query`

string

optional

Búsqueda de texto libre en los campos del pedido.

POST
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}" \
  -d '{
  "id": "12345",
  "status": "completed",
  "query": "electronics"
}'
```

GET
`/v1/customers/places`

## [List Customer Places](#list-customer-places)

Lista los lugares guardados por el cliente autenticado (direcciones de entrega, etc.).

Parámetros de consulta

`limit`

integer

opcional

Tamaño de la página.

`offset`

integer

opcional

Desplazamiento de la página.

`query`

string

opcional

Búsqueda de texto libre en los campos del lugar.

GET
`/v1/customers/places`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/places \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

GET
`/v1/customers/orders`

## [List Customer Orders](#list-customer-orders)

Lista los pedidos propiedad del cliente autenticado (con ámbito a
`orders.customer_uuid`
).

Parámetros de consulta

`limit`

integer

opcional

Tamaño de la página.

`offset`

integer

opcional

Desplazamiento de la página.

`status`

string

opcional

Filtra por el estado del pedido (por ejemplo,
`created`
,
`dispatched`
,
`completed`
).

`query`

string

opcional

Búsqueda de texto libre en los campos del pedido.

GET
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

POST
`/v1/customers/orders`

## [Create a Customer Order](#create-a-customer-order)

Crea un pedido en nombre del cliente autenticado. Acepta la forma de pedido de Fleet-Ops canónica — los mismos campos que
`POST /v1/orders`
aceptaría desde un operador. El UUID del cliente se adjunta automáticamente como
`orders.customer_uuid`
; cualquier campo de cliente proporcionado en el cliente se ignora.
`status`
se fuerza a
`created`
(los clientes no pueden autorizar). El pedido llega a la empresa resuelta a partir del token de API.

Parámetros del cuerpo

`type`

string

opcional

Clave de configuración del pedido (por ejemplo,
`transport`
,
`freight`
). Si se omite, se utiliza la configuración de pedido predeterminada de la empresa.

`order_config`

string

opcional

ID público de la configuración de pedido explícita, anula
`type`
.

`scheduled_at`

timestamp

opcional

Marca de tiempo de programación solicitada (ISO 8601).

`notes`

string

opcional

Notas de libre texto / instrucciones especiales de manejo.

`internal_id`

string

opcional

Identificador opcional proporcionado por el llamante.

`meta`

object

opcional

Metadatos libres de formato almacenados en la columna
`meta`
del pedido.

`service_quote`

string

opcional

ID público de la cita de servicio (uuid o
`sqte_…`
) devuelto por
`GET /v1/service-quotes`
. Cuando se proporciona, el controlador resuelve la cita mediante
`ServiceQuote::resolveFromRequest`
y la consume mediante
`$order->purchaseServiceQuote()`
para bloquear el precio en la tasa de compra del pedido (mismo comportamiento que
`OrderController::create`
).

`payload`

string|object

opcional

Ya sea un ID público de Payload, o un objeto inline con
`\{ pickup, dropoff, return, waypoints, entities \}`
. El controlador refleja el código de creación de Payload de
`OrderController::create`
— los subobjetos de Place aceptan ya sea un ID público o la forma estándar de Place; las entidades aceptan la forma estándar de objeto Entity:
`name`
,
`description`
,
`weight`
,
`weight_unit`
,
`declared_value`
,
`currency`
,
`meta`
. El controlador delega a
`Payload::setEntities`
para que los pedidos creados por el cliente sean indistinguibles de los creados por el operador en el nivel de datos.

POST
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}" \
  -d '{
  "type": "transport",
  "scheduled_at": "2026-05-25T10:00:00Z",
  "notes": "Handle with care.",
  "pickup": {
    "name": "Pickup",
    "street1": "4169 N State RD 7",
    "city": "Lauderdale Lakes",
    "province": "FL",
    "postal_code": "33319",
    "country": "US"
  },
  "dropoff": {
    "name": "Dropoff",
    "city": "Kingston",
    "country": "JM"
  },
  "entities": [
    {
      "name": "Wireless Headphones",
      "description": "Electronics",
      "weight": 2.5,
      "weight_unit": "lb",
      "declared_value": 150,
      "currency": "USD"
    }
  ]
}'
```

GET
`/v1/customers/orders`

## [Retrieve a Customer Order](#retrieve-a-customer-order)

Obtiene un solo pedido por ID, ID público o número de seguimiento. Devuelve 404 si el pedido no pertenece al cliente autenticado.

GET
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```