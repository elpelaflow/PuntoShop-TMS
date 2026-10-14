---
title: "Vehículos"
url: https://fleetbase.io/docs/api/fleetbase/vehicles
module: api
---

# Vehículos

Los vehículos representan los activos de la flota que se pueden rastrear, asignar y utilizar para cumplir con los pedidos. Utilice los puntos finales de vehículos para administrar los detalles de registro, el estado de asignación, la ubicación en tiempo real y el estado operativo.

* [El objeto `Vehicle`](#el-objeto-vehicle)
* [Crear un vehículo

  POST
  `/v1/vehicles`](#crear-un-vehiculo)
* [Consultar vehículos

  GET
  `/v1/vehicles`](#consultar-vehiculos)
* [Obtener un vehículo

  GET
  `/v1/vehicles/:id`](#obtener-un-vehiculo)
* [Expandir un vehículo

  GET
  `/v1/vehicles/:id?with[]=vendor&with[]=not_a_relation`](#expandir-un-vehiculo)
* [Expandir un objeto escalar del vehículo

  GET
  `/v1/vehicles/:id?with=vendor`](#expandir-un-objeto-escalar-del-vehiculo)
* [Actualizar un vehículo

  PUT
  `/v1/vehicles/:id`](#actualizar-un-vehiculo)
* [Eliminar un vehículo

  DELETE
  `/v1/vehicles/:id`](#eliminar-un-vehiculo)
* [Rastrear un vehículo

  PATCH
  `/v1/vehicles/:id/track`](#rastrear-un-vehiculo)

## El objeto `Vehicle`

Un vehículo representa un activo rastreable utilizado para la asignación de operaciones de flota, la planificación de rutas y la planificación de capacidad. Almacena la identidad del vehículo, el estado, la asignación, la posición actual, la capacidad, las dimensiones, las especificaciones del motor y regulatorias, la financiación, las restricciones del coordinador y los metadatos.
Cada relación aparece dos veces, y las dos son claves separadas. `<name>_id` es el ID público del recurso relacionado y siempre está presente. `<name>` es el objeto anidado y solo se devuelve cuando la relación se solicitó a través de `?with=`; nunca es una cadena. Las columnas internas de UUID nunca forman parte del contrato público.

Atributos

`id`

string

opcional

Identificador público del vehículo.

`internal_id`

string

opcional

Identificador interno opcional.

`photo_url`

string

opcional

URL de la foto del vehículo.

`avatar_url`

string

opcional

URL del avatar del vehículo.

`name`

string

opcional

Nombre de visualización del vehículo.

`description`

string

opcional

Descripción del vehículo.

`driver`

object

opcional

El conductor asignado, que solo se devuelve cuando se solicita a través de
`with=driver`
. Nunca es una cadena — consulte
`driver_id`
para el identificador.

`devices`

array of objects

opcional

Dispositivos del vehículo, cuando se cargan.

`make`

string

opcional

Fabricante del vehículo.

`model`

string

opcional

Modelo del vehículo.

`model_type`

string

opcional

Tipo de modelo del vehículo.

`year`

integer

opcional

Año del modelo.

`trim`

string

opcional

Trims del vehículo.

`type`

string

opcional

Tipo de vehículo.

`class`

string

opcional

Clase del vehículo.

`color`

string

opcional

Color del vehículo.

`serial_number`

string

opcional

Número de serie del vehículo.

`plate_number`

string

opcional

Número de matrícula.

`call_sign`

string

opcional

Número de llamada del vehículo.

`fuel_card_number`

string

opcional

Número de tarjeta de combustible asignado al vehículo.

`vin`

string

opcional

Número de identificación del vehículo.

`vin_data`

object

opcional

Datos VIN decodificados.

`specs`

object

opcional

Datos de especificaciones del vehículo.

`details`

object

opcional

Datos adicionales de detalles del vehículo.

`status`

enum

opcional

Estado operativo del vehículo.
`active`
se acepta en la entrada y se almacena como
`available`
. Uno de
`active`
,
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`reserved`
,
`retired`
,
`staging`
,
`on_route`
,
`idle`
,
`cleaning`
,
`awaiting_parts`
,
`inspection_due`
,
`inspection_failed`
,
`accident`
,
`compliance_hold`
,
`stolen`
,
`operational`
,
`decommissioned`
.

`online`

boolean

opcional

Si el vehículo está en línea.

`slug`

string

opcional

Slug de vehículo para URL.

`financing_status`

string

opcional

Estado de financiación del vehículo.

`measurement_system`

string

opcional

Sistema de medición utilizado para las métricas del vehículo.

`odometer`

number

opcional

Lectura actual del odómetro.

`odometer_unit`

string

opcional

Unidad para las lecturas del odómetro.

`fuel_type`

string

opcional

Tipo de combustible del vehículo.

`payload_capacity`

number

opcional

Capacidad de carga.

`towing_capacity`

number

opcional

Capacidad de remolque.

`seating_capacity`

integer

opcional

Capacidad de asientos.

`weight`

number

opcional

Peso del vehículo.

`length`

number

opcional

Longitud del vehículo.

`width`

number

opcional

Ancho del vehículo.

`height`

number

opcional

Altura del vehículo.

`currency`

currency

opcional

Moneda para los campos financieros del vehículo.

`acquisition_cost`

currency

opcional

Costo de adquisición.

`current_value`

currency

opcional

Valor actual del vehículo.

`purchased_at`

timestamp

opcional

Marca de tiempo de compra.

`lease_expires_at`

timestamp

opcional

Marca de tiempo de expiración del arrendamiento.

`deleted_at`

timestamp

opcional

Marca de tiempo de eliminación cuando se elimina de forma suave.

`updated_at`

timestamp

opcional

Marca de tiempo en la que se actualizó por última vez el vehículo.

`created_at`

timestamp

opcional

Marca de tiempo en la que se creó el vehículo.

`location`

object

opcional

Coordenadas actuales del vehículo.

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

`telematics`

object

opcional

Datos de telemetría.

`notes`

string

opcional

Notas del vehículo.

`meta`

object

opcional

Datos adicionales del vehículo.

`driver_id`

string

opcional

ID público del conductor asignado, o
`null`
. Siempre presente.

`vendor_id`

string

opcional

ID público del proveedor asignado, o
`null`
. Siempre presente.

`category_id`

string

opcional

ID público de la categoría asignada, o
`null`
. Siempre presente.

`warranty_id`

string

opcional

ID público de la garantía asignada, o
`null`
. Siempre presente.

`photo_id`

string

opcional

ID público del archivo de foto del vehículo, o
`null`
. Siempre presente.
`photo_url`
es una URL de conveniencia, y
`avatar_url`
es un activo de visualización separado que no es una referencia de archivo.

`vendor`

object

opcional

El proveedor asignado, que solo se devuelve cuando se solicita a través de
`with=vendor`
. Nunca es una cadena — consulte
`vendor_id`
para el identificador.

`category`

object

opcional

La categoría asignada, que solo se devuelve cuando se solicita a través de
`with=category`
.

`warranty`

object

opcional

La garantía asignada, que solo se devuelve cuando se solicita a través de
`with=warranty`
.

`photo`

object

opcional

El archivo de foto del vehículo, que solo se devuelve cuando se solicita a través de
`with=photo`
.

`skills`

array of strings

opcional

Capacidades que ofrece el vehículo para la asignación del coordinador.

`payload_capacity_volume`

number

opcional

Capacidad de volumen de carga utilizada para la asignación del coordinador.

`payload_capacity_pallets`

integer

opcional

Capacidad de paletas utilizada para la asignación del coordinador.

`payload_capacity_parcels`

integer

opcional

Capacidad de paquetes utilizada para la asignación del coordinador.

`max_tasks`

integer

opcional

Número máximo de tareas para la asignación del coordinador.

`time_window_start`

string

opcional

Hora más temprana en la que el vehículo está disponible.

`time_window_end`

string

opcional

Hora más tardía en la que el vehículo está disponible.

`return_to_depot`

boolean

opcional

Si el vehículo debe regresar al depósito después de la tarea asignada.

`fuel_volume_unit`

string

opcional

Unidad para los volúmenes de combustible.

`odometer_at_purchase`

number

opcional

Lectura del odómetro en el momento de la compra.

`transmission`

string

opcional

Tipo de transmisión.

`body_type`

string

opcional

Tipo de carrocería del vehículo.

`body_sub_type`

string

opcional

Subtipo de carrocería del vehículo.

`usage_type`

string

opcional

Cómo se utiliza el vehículo.

`ownership_type`

string

opcional

Cómo se posee el vehículo.

`cargo_volume`

number

opcional

Volumen de carga.

`passenger_volume`

number

opcional

Volumen de pasajeros.

`interior_volume`

number

opcional

Volumen interior total.

`ground_clearance`

number

opcional

Altura libre.

`bed_length`

number

opcional

Longitud de la cama.

`fuel_capacity`

number

opcional

Capacidad del tanque de combustible.

`emission_standard`

string

opcional

Estándar de emisiones que cumple el vehículo.

`dpf_equipped`

boolean

opcional

Si está equipado con un filtro de partículas diésel.

`scr_equipped`

boolean

opcional

Si está equipado con reducción selectiva catalítica.

`gvwr`

number

opcional

Peso bruto del vehículo.

`gcwr`

number

opcional

Peso combinado del vehículo.

`engine_number`

string

opcional

Número de motor.

`engine_make`

string

opcional

Fabricante del motor.

`engine_model`

string

opcional

Modelo del motor.

`engine_family`

string

opcional

Familia del motor.

`engine_configuration`

string

opcional

Configuración del motor.

`engine_size`

number

opcional

Tamaño del motor.

`engine_displacement`

number

opcional

Desplazamiento del motor.

`cylinder_arrangement`

string

opcional

Disposición del cilindro.

`number_of_cylinders`

integer

opcional

Número de cilindros.

`horsepower`

number

opcional

Caballos de fuerza del motor.

`horsepower_rpm`

integer

opcional

RPM en los que se produce la potencia máxima.

`torque`

number

opcional

Par del motor.

`torque_rpm`

integer

opcional

RPM en los que se produce el par máximo.

`estimated_service_life_distance`

integer

opcional

Vida útil estimada expresada en distancia.

`estimated_service_life_distance_unit`

string

opcional

Unidad para la vida útil estimada de la distancia.

`estimated_service_life_months`

integer

opcional

Vida útil estimada expresada en meses.

`financing_status`

string

opcional

Estado de financiación del vehículo.

`insurance_value`

currency

opcional

Valor asegurado.

`depreciation_rate`

number

opcional

Tasa de depreciación.

`loan_amount`

number

opcional

Monto del préstamo.

`loan_number_of_payments`

integer

opcional

Número de pagos del préstamo.

`loan_first_payment`

date

opcional

Fecha del primer pago del préstamo.

```json
{
  "id": "vehicle_7YqM3KpL2n",
  "internal_id": "VEH-1001",
  "photo_url": null,
  "avatar_url": null,
  "name": "ABC123",
  "description": null,
  "driver": null,
  "make": "Toyota",
  "model": "Camry",
  "year": 2023,
  "trim": "SE",
  "type": "sedan",
  "plate_number": "ABC123",
  "vin": "1GCGSBEA0G1111111",
  "status": "operational",
  "online": false,
  "payload_capacity": 500,
  "fuel_card_number": "FC-1001",
  "driver_id": null,
  "vendor_id": "vendor_5Nq8Tz1Wm4",
  "category_id": null,
  "warranty_id": null,
  "photo_id": null,
  "skills": [
    "tail_lift"
  ],
  "max_tasks": 40,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "return_to_depot": true,
  "location": {
    "latitude": 40.7484,
    "longitude": -73.9857
  },
  "heading": 0,
  "altitude": 0,
  "speed": 0,
  "notes": null,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/vehicles`

## Crear un vehículo {#create-a-vehicle}

Crea un vehículo para la organización actual.

Se aceptan todos los campos válidos para el registro del vehículo: identidad y descripción, odómetro y medición, carrocería, capacidad y dimensiones, ciclo de vida y financiación, especificaciones reglamentarias y del motor, estructura
`specs`
/
`details`
/
`meta`
, restricciones del orquestador y las relaciones con el proveedor, conductor, categoría y garantía.

Las relaciones utilizan identificadores públicos (
`vendor_...`
,
`driver_...`
,
`category_...`
,
`warranty_...`
) y se resuelven dentro de la organización autenticada; el identificador público de otra organización se rechaza exactamente como si no existiera. Los valores gestionados por el servidor (
`vin_data`
,
`telematics`
, el slug generado y todas las columnas uuid internas) no se aceptan como entrada.

Parámetros del cuerpo

`internal_id`

cadena

opcional

El identificador que utiliza el propio sistema del operador para este vehículo. Se puede consultar mediante
`?internal_id=`
.

`name`

cadena

opcional

Nombre de visualización del vehículo.

`description`

cadena

opcional

Descripción libre del vehículo.

`make`

cadena

opcional

Fabricante del vehículo.

`model`

cadena

opcional

Modelo del vehículo.

`model_type`

cadena

opcional

Tipo o familia de variantes del modelo del vehículo.

`year`

entero

opcional

Año del modelo del vehículo.

`trim`

cadena

opcional

Variante o acabado del vehículo.

`color`

cadena

opcional

Color del vehículo.

`type`

cadena

opcional

Tipo de vehículo.

`class`

cadena

opcional

Clase del vehículo.

`plate_number`

cadena

opcional

Número de matrícula del vehículo. Se puede consultar mediante
`?plate_number=`
.

`vin`

cadena

opcional

Número de identificación del vehículo. Actualizarlo vuelve a ejecutar el análisis del VIN. Se puede consultar mediante
`?vin=`
.

`serial_number`

cadena

opcional

Número de serie del vehículo.

`call_sign`

cadena

opcional

Número de llamada del vehículo.

`fuel_card_number`

cadena

opcional

Número de tarjeta de combustible asignado al vehículo.

`odometer`

número

opcional

Lectura actual del odómetro. Debe ser cero o superior.

`odometer_unit`

cadena

opcional

Unidad para las lecturas del odómetro, por ejemplo
`km`
o
`mi`
.

`odometer_at_purchase`

número

opcional

Lectura del odómetro en el momento de la compra.

`measurement_system`

cadena

opcional

Sistema de medición utilizado para las métricas del vehículo, por ejemplo
`metric`
o
`imperial`
.

`fuel_type`

cadena

opcional

Tipo de combustible del vehículo.

`fuel_volume_unit`

cadena

opcional

Unidad para los volúmenes de combustible, por ejemplo
`l`
o
`gal`
.

`online`

booleano

opcional

Predeterminado a
`false`

Indica si el vehículo está en línea. Al crear, se establece en
`false`
; al actualizar, permanece así a menos que se especifique.

`status`

enum

opcional

Estado operativo del vehículo.
`active`
se acepta y se almacena como
`available`
. Uno de
`active`
,
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`reserved`
,
`retired`
,
`staging`
,
`on_route`
,
`idle`
,
`cleaning`
,
`awaiting_parts`
,
`inspection_due`
,
`inspection_failed`
,
`accident`
,
`compliance_hold`
,
`stolen`
,
`operational`
,
`decommissioned`
.

`transmission`

cadena

opcional

Tipo de transmisión.

`body_type`

cadena

opcional

Tipo de carrocería del vehículo.

`body_sub_type`

cadena

opcional

Subtipo de carrocería del vehículo.

`usage_type`

cadena

opcional

Cómo se utiliza el vehículo, por ejemplo
`commercial`
.

`ownership_type`

cadena

opcional

Cómo se posee el vehículo, por ejemplo
`owned`
o
`leased`
.

`cargo_volume`

número

opcional

Volumen de carga.

`passenger_volume`

número

opcional

Volumen de pasajeros.

`interior_volume`

número

opcional

Volumen interior total.

`weight`

número

opcional

Peso del vehículo.

`width`

número

opcional

Ancho del vehículo.

`length`

número

opcional

Longitud del vehículo.

`height`

número

opcional

Altura del vehículo.

`towing_capacity`

número

opcional

Capacidad de remolque.

`payload_capacity`

número

opcional

Capacidad de carga.

`seating_capacity`

entero

opcional

Capacidad de asientos.

`ground_clearance`

número

opcional

Altura libre.

`bed_length`

número

opcional

Longitud de la cama.

`fuel_capacity`

número

opcional

Capacidad del tanque de combustible.

`financing_status`

cadena

opcional

Estado de financiación del vehículo.

`loan_number_of_payments`

entero

opcional

Número de pagos del préstamo.

`loan_first_payment`

fecha

opcional

Fecha del primer pago del préstamo.

`loan_amount`

número

opcional

Principal del préstamo.

`estimated_service_life_distance_unit`

cadena

opcional

Unidad para la vida útil estimada de la distancia.

`estimated_service_life_distance`

entero

opcional

Vida útil estimada expresada en distancia.

`estimated_service_life_months`

entero

opcional

Vida útil estimada expresada en meses.

`insurance_value`

número

opcional

Valor asegurado.

`depreciation_rate`

número

opcional

Tasa de depreciación.

`current_value`

número

opcional

Valor actual del vehículo.

`acquisition_cost`

número

opcional

Costo de adquisición.

`currency`

cadena

opcional

Código de moneda de tres caracteres para los campos monetarios del vehículo.

`purchased_at`

marca de tiempo

opcional

Fecha de compra del vehículo.

`lease_expires_at`

marca de tiempo

opcional

Fecha de vencimiento del arrendamiento del vehículo.

`emission_standard`

cadena

opcional

Estándar de emisiones que cumple el vehículo, por ejemplo
`euro6`
.

`dpf_equipped`

booleano

opcional

Indica si se ha instalado un filtro de partículas diésel.

`scr_equipped`

booleano

opcional

Indica si se ha instalado un reductor catalítico selectivo.

`gvwr`

número

opcional

Valor de peso bruto del vehículo.

`gcwr`

número

opcional

Valor de peso combinado del vehículo.

`engine_number`

cadena

opcional

Número del motor.

`engine_model`

cadena

opcional

Modelo del motor.

`engine_make`

cadena

opcional

Fabricante del motor.

`engine_family`

cadena

opcional

Familia del motor.

`engine_configuration`

cadena

opcional

Configuración del motor.

`engine_displacement`

número

opcional

Desplazamiento del motor.

`engine_size`

número

opcional

Tamaño del motor.

`horsepower`

número

opcional

Caballos de fuerza del motor.

`horsepower_rpm`

entero

opcional

RPM en los que se produce la potencia máxima.

`torque`

número

opcional

Par del motor.

`torque_rpm`

entero

opcional

RPM en los que se produce el par máximo.

`number_of_cylinders`

entero

opcional

Número de cilindros.

`cylinder_arrangement`

cadena

opcional

Disposición de los cilindros, por ejemplo
`I4`
o
`V6`
.

`specs`

objeto

opcional

Datos de especificaciones estructuradas del vehículo.

`details`

objeto

opcional

Datos adicionales estructurados del vehículo.

`notes`

cadena

opcional

Notas de texto libre sobre el vehículo.

`meta`

objeto

opcional

Datos adicionales del vehículo.

`skills`

array de cadenas

opcional

Habilidades que ofrece el vehículo para la asignación del orquestador, por ejemplo
`tail_lift`
.

`payload_capacity_volume`

número

opcional

Capacidad de volumen de carga utilizada para la asignación del orquestador.

`payload_capacity_pallets`

entero

opcional

Capacidad de paletas utilizada para la asignación del orquestador.

`payload_capacity_parcels`

entero

opcional

Capacidad de paquetes utilizada para la asignación del orquestador.

`max_tasks`

entero

opcional

Número máximo de tareas concurrentes para la asignación del orquestador.

`time_window_start`

cadena

opcional

Hora más temprana del día en la que está disponible el vehículo, como
`HH:MM`
.

`time_window_end`

cadena

opcional

Hora más tardía del día en la que está disponible el vehículo, como
`HH:MM`
.

`return_to_depot`

booleano

opcional

Indica si el vehículo debe regresar al depósito después de la tarea asignada.

`vendor`

cadena

opcional

Identificador público del proveedor (
`vendor_...`
). Envía
`null`
para restablecer. Debe pertenecer a la organización autenticada.

`driver`

cadena

opcional

Identificador público del conductor (
`driver_...`
) para asignar este vehículo. Envía un valor vacío para desasignar el conductor actual. Debe pertenecer a la organización autenticada.

`category`

cadena

opcional

Identificador público de la categoría (
`category_...`
). Envía
`null`
para restablecer.

`warranty`

cadena

opcional

Identificador público de la garantía (
`warranty_...`
). Envía
`null`
para restablecer.

`photo`

cadena

opcional

Identificador público de archivo (
`file_...`
) para usar como foto del vehículo.

`location`

objeto

opcional

Punto resoluble utilizado como la ubicación actual del vehículo.

`latitude`

número

opcional

Latitud decimal. Requerido con
`longitude`
.

`longitude`

número

opcional

Longitud decimal. Requerido con
`latitude`
.

`altitude`

número

opcional

Altitud actual.

`heading`

número

opcional

Dirección actual en grados.

`speed`

número

opcional

Velocidad actual.

```

```
curl https://api.fleetbase.io/v1/vehicles/:id?with=vendor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "vehicle_7YqM3KpL2n",
  "internal_id": "VEH-1001",
  "name": "Depot Van",
  "vin": "1GCGSBEA0G1111111",
  "photo_url": "https://s3.ap-southeast-1.amazonaws.com/flb-assets/static/vehicle-placeholder.png",
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/vehicle-icons/mini_bus.svg",
  "make": "Toyota",
  "model": "Camry",
  "year": "2023",
  "trim": "SE",
  "type": "sedan",
  "plate_number": "ABC123",
  "fuel_card_number": "FC-1001",
  "status": "available",
  "online": false,
  "odometer": 41000,
  "odometer_unit": "km",
  "currency": "SGD",
  "purchased_at": "2026-01-02T00:00:00.000000Z",
  "location": {
    "type": "Point",
    "coordinates": [
      -73.9857,
      40.7484
    ]
  },
  "driver_id": null,
  "vendor_id": "vendor_5Nq8Tz1Wm4",
  "vendor": {
    "id": "vendor_5Nq8Tz1Wm4",
    "name": "Acme Logistics"
  },
  "category_id": null,
  "warranty_id": null,
  "photo_id": null,
  "specs": {
    "doors": 4
  },
  "details": {
    "liftgate": true
  },
  "notes": "City route pool",
  "meta": {
    "depot": "north"
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

```
curl https://api.fleetbase.io/v1/vehicles/:id?with=vendor?with=vendor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

PUT
`/v1/vehicles/:id`

## [Actualizar un vehículo](#actualizar-un-vehículo)

Actualiza cualquier campo válido del vehículo. Actualizar el VIN vuelve a ejecutar la decodificación del VIN.

Una actualización parcial solo afecta a los campos que se envían: omitiendo
`online`
no afecta al estado en línea del vehículo, sino que lo pone en modo offline. Los campos de relación utilizan identificadores públicos y se resuelven dentro de la organización autenticada; enviar
`null`
elimina la asignación, y enviar un
`driver`
vacío desasigna al conductor actual.

Parámetros del cuerpo

`internal_id`

string

opcional

El identificador que utiliza el propio sistema del operador para este vehículo. Se puede consultar mediante
`?internal_id=`
.

`name`

string

opcional

Nombre de visualización del vehículo.

`description`

string

opcional

Descripción libre del vehículo.

`make`

string

opcional

Fabricante del vehículo.

`model`

string

opcional

Modelo del vehículo.

`model_type`

string

opcional

Tipo de modelo o familia de variantes del vehículo.

`year`

integer

opcional

Año del modelo del vehículo.

`trim`

string

opcional

Trim o variante del vehículo.

`color`

string

opcional

Color del vehículo.

`type`

string

opcional

Tipo de vehículo.

`class`

string

opcional

Clase del vehículo.

`plate_number`

string

opcional

Número de matrícula del vehículo. Se puede consultar mediante
`?plate_number=`
.

`vin`

string

opcional

Número de identificación del vehículo. Actualizarlo vuelve a ejecutar la decodificación del VIN. Se puede consultar mediante
`?vin=`
.

`serial_number`

string

opcional

Número de serie del vehículo.

`call_sign`

string

opcional

Número de llamada del vehículo.

`fuel_card_number`

string

opcional

Número de tarjeta de combustible asignado al vehículo.

`odometer`

number

opcional

Lectura actual del odómetro. Debe ser cero o superior.

`odometer_unit`

string

opcional

Unidad para las lecturas del odómetro, por ejemplo
`km`
o
`mi`
.

`odometer_at_purchase`

number

opcional

Lectura del odómetro en el momento de la compra.

`measurement_system`

string

opcional

Sistema de medición utilizado para las métricas del vehículo, por ejemplo
`metric`
o
`imperial`
.

`fuel_type`

string

opcional

Tipo de combustible del vehículo.

`fuel_volume_unit`

string

opcional

Unidad para los volúmenes de combustible, por ejemplo
`l`
o
`gal`
.

`online`

boolean

opcional

Por defecto:
`false`

Indica si el vehículo está en línea. Al crear, se establece en
`false`
; al actualizar, permanece en ese estado a menos que se envíe.

`status`

enum

opcional

Estado operativo del vehículo.
`active`
se acepta y se almacena como
`available`
. Uno de
`active`
,
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`reserved`
,
`retired`
,
`staging`
,
`on_route`
,
`idle`
,
`cleaning`
,
`awaiting_parts`
,
`inspection_due`
,
`inspection_failed`
,
`accident`
,
`compliance_hold`
,
`stolen`
,
`operational`
,
`decommissioned`
.

`transmission`

string

opcional

Tipo de transmisión.

`body_type`

string

opcional

Tipo de carrocería del vehículo.

`body_sub_type`

string

opcional

Subtipo de carrocería del vehículo.

`usage_type`

string

opcional

Cómo se utiliza el vehículo, por ejemplo
`commercial`
.

`ownership_type`

string

opcional

Cómo se posee el vehículo, por ejemplo
`owned`
o
`leased`
.

`cargo_volume`

number

opcional

Volumen de carga.

`passenger_volume`

number

opcional

Volumen de pasajeros.

`interior_volume`

number

opcional

Volumen interior total.

`weight`

number

opcional

Peso del vehículo.

`width`

number

opcional

Ancho del vehículo.

`length`

number

opcional

Longitud del vehículo.

`height`

number

opcional

Altura del vehículo.

`towing_capacity`

number

opcional

Capacidad de remolque.

`payload_capacity`

number

opcional

Capacidad de carga.

`seating_capacity`

integer

opcional

Capacidad de asientos.

`ground_clearance`

number

opcional

Altura libre.

`bed_length`

number

opcional

Longitud de la cama.

`fuel_capacity`

number

opcional

Capacidad del tanque de combustible.

`financing_status`

string

opcional

Estado de financiación del vehículo.

`loan_number_of_payments`

integer

opcional

Número de pagos del préstamo.

`loan_first_payment`

date

opcional

Fecha del primer pago del préstamo.

`loan_amount`

number

opcional

Principal del préstamo.

`estimated_service_life_distance_unit`

string

opcional

Unidad para la distancia de la vida útil estimada.

`estimated_service_life_distance`

integer

opcional

Vida útil estimada expresada en distancia.

`estimated_service_life_months`

integer

opcional

Vida útil estimada expresada en meses.

`insurance_value`

number

opcional

Valor asegurado.

`depreciation_rate`

number

opcional

Tasa de depreciación.

`current_value`

number

opcional

Valor actual del vehículo.

`acquisition_cost`

number

opcional

Costo de adquisición.

`currency`

string

opcional

Código de moneda de tres caracteres para los campos monetarios del vehículo.

`purchased_at`

timestamp

opcional

Fecha de compra del vehículo.

`lease_expires_at`

timestamp

opcional

Fecha de vencimiento del arrendamiento del vehículo.

`emission_standard`

string

opcional

Estándar de emisiones que cumple el vehículo, por ejemplo
`euro6`
.

`dpf_equipped`

boolean

opcional

Indica si se ha instalado un filtro de partículas diésel.

`scr_equipped`

boolean

opcional

Indica si se ha instalado un reductor catalítico selectivo.

`gvwr`

number

opcional

Peso bruto del vehículo.

`gcwr`

number

opcional

Peso bruto combinado.

`engine_number`

string

opcional

Número de motor.

`engine_model`

string

opcional

Modelo del motor.

`engine_make`

string

opcional

Fabricante del motor.

`engine_family`

string

opcional

Familia del motor.

`engine_configuration`

string

opcional

Configuración del motor.

`engine_displacement`

number

opcional

Desplazamiento del motor.

`engine_size`

number

opcional

Tamaño del motor.

`horsepower`

number

opcional

Caballos de fuerza del motor.

`horsepower_rpm`

integer

opcional

RPM en los que se alcanza el máximo de caballos de fuerza.

`torque`

number

opcional

Par del motor.

`torque_rpm`

integer

opcional

RPM en los que se alcanza el máximo de par.

`number_of_cylinders`

integer

opcional

Número de cilindros.

`cylinder_arrangement`

string

opcional

Disposición de los cilindros, por ejemplo
`I4`
o
`V6`
.

`specs`

object

opcional

Datos de especificaciones del vehículo estructurados.

`details`

object

opcional

Datos de detalles adicionales del vehículo estructurados.

`notes`

string

opcional

Notas de texto libre sobre el vehículo.

`meta`

object

opcional

Metadatos adicionales del vehículo.

`skills`

array of strings

opcional

Habilidades que ofrece el vehículo para la asignación del orquestador, por ejemplo
`tail_lift`
.

`payload_capacity_volume`

number

opcional

Capacidad de volumen de carga utilizada para la asignación del orquestador.

`payload_capacity_pallets`

integer

opcional

Capacidad de paletas utilizada para la asignación del orquestador.

`payload_capacity_parcels`

integer

opcional

Capacidad de paquetes utilizada para la asignación del orquestador.

`max_tasks`

integer

opcional

Número máximo de tareas para la asignación del orquestador.

`time_window_start`

string

opcional

Hora de inicio más temprana en que el vehículo está disponible, como
`HH:MM`
.

`time_window_end`

string

opcional

Hora de finalización más tardía en que el vehículo está disponible, como
`HH:MM`
.

`return_to_depot`

boolean

opcional

Indica si el vehículo debe regresar al depósito después de la tarea asignada.

`vendor`

string

opcional

ID público del proveedor (
`vendor_...`
). Se envía
`null`
para eliminarlo. Debe pertenecer a la organización autenticada.

`driver`

string

opcional

ID público del conductor (
`driver_...`
) para asignar este vehículo. Se envía un valor vacío para desasignar al conductor actual. Debe pertenecer a la organización autenticada.

`category`

string

opcional

ID público de la categoría (
`category_...`
). Se envía
`null`
para eliminarlo.

`warranty`

string

opcional

ID público de la garantía (
`warranty_...`
). Se envía
`null`
para eliminarlo.

`photo`

string

opcional

ID de archivo (
`file_...`
) para usar como foto del vehículo.

`location`

object

opcional

Punto resoluble utilizado como la ubicación actual del vehículo.

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

```

Longitud del vehículo. Si se omite junto con
`latitud`, Fleetbase devuelve el recurso del vehículo actual sin actualizar la ubicación.

`altitud`

número

opcional

Altitud actual.

`azimut`

número

opcional

Azimut actual en grados.

`velocidad`

número

opcional

Velocidad actual.

PATCH
`/v1/vehículos/:id/seguimiento`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/vehículos/:id/seguimiento \
  -H "Authorization: Bearer flb_live_…"
```