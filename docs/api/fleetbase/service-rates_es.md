---
title: "Tarifas de Servicio"
url: https://fleetbase.io/docs/api/fleetbase/service-rates
module: api
---

# Tarifas de Servicio

Las tarifas de servicio definen las reglas de precios desde el proveedor para los servicios de entrega y logística. Utilice las tarifas de servicio para configurar cómo se calculan las cotizaciones en función de la distancia, el tiempo, las zonas, las áreas de servicio y los tipos de servicio.

* [El objeto Service Rate](#el-objeto-service-rate)
* [Crear una Tarifa de Servicio

  POST
  `/v1/service-rates`](#crear-una-tarifa-de-servicio)
* [Crear una Tarifa de Servicio con un Área de Servicio Vacía

  POST
  `/v1/service-rates`](#crear-una-tarifa-de-servicio-con-un-area-de-servicio-vacia)
* [Consultar Tarifas de Servicio

  GET
  `/v1/service-rates`](#consultar-tarifas-de-servicio)
* [Obtener una Tarifa de Servicio

  GET
  `/v1/service-rates/:id`](#obtener-una-tarifa-de-servicio)
* [Actualizar una Tarifa de Servicio

  PUT
  `/v1/service-rates/:id`](#actualizar-una-tarifa-de-servicio)
* [Eliminar una Tarifa de Servicio

  DELETE
  `/v1/service-rates/:id`](#eliminar-una-tarifa-de-servicio)

## El objeto Service Rate

Una tarifa de servicio define cómo Fleetbase cobra por un servicio dentro de un área o zona de servicio. Almacena el método de cálculo, los niveles de tarifas, el algoritmo, los cargos adicionales por hora pico, la moneda y las estimaciones de entrega.

Atributos

`id`

string

opcional

Identificador único de la tarifa de servicio.

`order_config`

string

opcional

Configuración del pedido asociada con la tarifa.

`service_area`

object

opcional

Área de servicio asociada con la tarifa.

`zone`

object

opcional

Zona asociada con la tarifa.

`service_name`

string

opcional

Nombre de visualización de la tarifa de servicio.

`service_type`

string

opcional

Tipo de servicio al que se aplica esta tarifa.

`base_fee`

currency

opcional

Tarifa base aplicada a la tarifa.

`rate_calculation_method`

string

opcional

Método utilizado para calcular la tarifa. Puede ser: `fixed_meter`, `fixed_rate`, `per_meter`, `per_drop`, `algo`, `parcel`.

`currency`

currency

opcional

Código de moneda de tres letras.

`duration_terms`

string

opcional

Términos de duración de entrega legibles por humanos.

`estimated_days`

integer

opcional

Duración estimada del servicio en días.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la tarifa de servicio.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la tarifa de servicio.

El
objeto Service Rate
```
{
  "id": "service_rate_8Qw2YxM3Nf",
  "order_config": "order_config_transport",
  "service_area": null,
  "zone": null,
  "service_name": "Entrega Estándar",
  "service_type": "delivery",
  "base_fee": 500,
  "rate_calculation_method": "fixed_rate",
  "rate_fees": [],
  "parcel_fees": [],
  "currency": "USD",
  "duration_terms": "1-2 días",
  "estimated_days": 2,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/service-rates`

## [Crear una Tarifa de Servicio](#crear-una-tarifa-de-servicio)

Crea una Tarifa de Servicio.

Parámetros del cuerpo

`service_name`

string

obligatorio

Nombre de visualización para la tarifa de servicio.

`service_type`

string

obligatorio

Tipo de servicio al que se aplica esta tarifa.

`service_area`

string

opcional

ID del área de servicio al que se aplica esta tarifa. Opcional — una cadena vacía o `null` se trata como ausente en lugar de un área de servicio no válida.

`zone`

string

opcional

ID de la zona al que se aplica esta tarifa. Opcional — una cadena vacía o `null` se trata como ausente en lugar de una zona no válida.

`rate_calculation_method`

enum

obligatorio

Método utilizado para calcular la tarifa. Puede ser: `fixed_meter`, `fixed_rate`, `per_meter`, `per_drop`, `algo`, `parcel`.

`currency`

currency

obligatorio

Código de moneda de tres letras.

`base_fee`

currency

opcional

Tarifa base aplicada a la tarifa.

`per_meter_unit`

enum

opcional

Unidad de distancia para tarifas `per_meter`. Puede ser: `km`, `m`, `ft`, `yd`, `mi`.

`per_meter_flat_rate_fee`

currency

opcional

Tarifa fija por unidad de distancia para tarifas `per_meter`.

`meter_fees`

array of objects

opcional

Niveles de tarifas de distancia para métodos `fixed_meter` o `fixed_rate`.

`algorithm`

string

opcional

Algoritmo computable utilizado cuando `rate_calculation_method` es `algo`.

`has_cod_fee`

boolean

opcional

Indica si la tarifa incluye una tarifa de entrega en el momento de la entrega.

`cod_calculation_method`

enum

opcional

Método de cálculo de la tarifa de entrega en el momento de la entrega. Puede ser: `percentage`, `flat`.

`cod_flat_fee`

currency

opcional

Tarifa fija de entrega en el momento de la entrega.

`cod_percent`

integer

opcional

Porcentaje de tarifa de entrega en el momento de la entrega.

`has_peak_hours_fee`

boolean

opcional

Indica si la tarifa incluye una tarifa por horas pico.

`peak_hours_calculation_method`

enum

opcional

Método de cálculo de la tarifa por horas pico. Puede ser: `percentage`, `flat`.

`peak_hours_flat_fee`

currency

opcional

Tarifa fija por horas pico.

`peak_hours_percent`

integer

opcional

Porcentaje de tarifa por horas pico.

`peak_hours_start`

string

opcional

Hora de inicio de las horas pico en formato `HH:mm`.

`peak_hours_end`

string

opcional

Hora de fin de las horas pico en formato `HH:mm`.

`duration_terms`

string

opcional

Términos de duración de entrega legibles por humanos.

`estimated_days`

integer

opcional

Duración estimada del servicio en días.

POST
`/v1/service-rates`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/service-rates \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "service_name": "Entrega de Comida",
    "service_type": "food_delivery",
    "rate_calculation_method": "per_meter",
    "currency": "USD",
    "base_fee": 10.00,
    "per_meter_unit": "km",
    "per_meter_flat_rate_fee": 25,
    "has_cod_fee": true,
    "cod_calculation_method": "percentage",
    "cod_flat_fee": 1.00,
    "cod_percent": 0,
    "has_peak_hours_fee": true,
    "peak_hours_calculation_method": "percentage",
    "peak_hours_flat_fee": 3.00,
    "peak_hours_percent": 0,
    "peak_hours_start": "17:00",
    "peak_hours_end": "18:45",
    "duration_terms": "Estándar",
    "estimated_days": 3
}'
```

POST
`/v1/service-rates`

## [Crear una Tarifa de Servicio con un Área de Servicio Vacío](#crear-una-tarifa-de-servicio-con-un-area-de-servicio-vacia)

Crea una tarifa de servicio enviando `service_area` y `zone` como cadenas vacías.

Ambos campos son opcionales, por lo que una cadena vacía se interpreta como ausente. Sin esto, se ejecuta la verificación `exists` contra el valor nulo y una cadena vacía se interpreta como "El área de servicio seleccionada no es válida" para un campo que el usuario simplemente dejó en blanco.

No sobrescribe `service_rate_id`; el objeto creado tiene ese identificador.

POST
`/v1/service-rates`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/service-rates \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "service_name": "Tarifa con Área de Servicio Vacía",
  "service_type": "food_delivery",
  "rate_calculation_method": "per_meter",
  "currency": "USD",
  "base_fee": 10.00,
  "per_meter_unit": "km",
  "per_meter_flat_rate_fee": 25,
  "service_area": "",
  "zone": "",
  "duration_terms": "Estándar",
  "estimated_days": 3
}'
```

GET
`/v1/service-rates`

## [Consultar Tarifas de Servicio](#consultar-tarifas-de-servicio)

Enumera todas las tarifas de servicio.

Parámetros de consulta

`limit`

integer

opcional

Número máximo de tarifas de servicio a devolver.

`offset`

integer

opcional

Número de tarifas de servicio a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de tarifa de servicio.

`service_area`

string

opcional

Filtra las tarifas de servicio por ID del área de servicio.

`zone`

string

opcional

Filtra las tarifas de servicio por ID de la zona.

`service_type`

string

opcional

Filtra las tarifas de servicio por tipo de servicio.

GET
`/v1/service-rates`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-rates?limit=25&offset=0&currency=USD \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/service-rates/:id`

## [Obtener una Tarifa de Servicio](#obtener-una-tarifa-de-servicio)

Obtiene una tarifa de servicio por ID.

GET
`/v1/service-rates/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-rates/:id \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/service-rates/:id`

## [Actualizar una Tarifa de Servicio](#actualizar-una-tarifa-de-servicio)

Actualiza una Tarifa de Servicio.

Parámetros del cuerpo

`service_name`

string

opcional

Nombre de visualización para la tarifa de servicio.

`service_type`

string

opcional

Tipo de servicio al que se aplica esta tarifa.

`service_area`

string

opcional

ID del área de servicio al que se aplica esta tarifa. Opcional — una cadena vacía o `null` se trata como ausente.

`zone`

string

opcional

ID de la zona al que se aplica esta tarifa. Opcional — una cadena vacía o `null` se trata como ausente.

`rate_calculation_method`

enum

opcional

Método utilizado para calcular la tarifa. Puede ser: `fixed_meter`, `fixed_rate`, `per_meter`, `per_drop`, `algo`, `parcel`.

`currency`

currency

opcional

Código de moneda de tres letras.

`base_fee`

currency

opcional

Tarifa base aplicada a la tarifa.

`per_meter_unit`

enum

opcional

Unidad de distancia para tarifas `per_meter`. Puede ser: `km`, `m`, `ft`, `yd`, `mi`.

`per_meter_flat_rate_fee`

currency

opcional

Tarifa fija por unidad de distancia para tarifas `per_meter`.

`meter_fees`

array of objects

opcional

Niveles de tarifas de distancia para métodos `fixed_meter` o `fixed_rate`.

`algorithm`

string

opcional

Algoritmo computable utilizado cuando `rate_calculation_method` es `algo`.

`has_cod_fee`

boolean

opcional

Indica si la tarifa incluye una tarifa de entrega en el momento de la entrega.

`cod_calculation_method`

enum

opcional

Método de cálculo de la tarifa de entrega en el momento de la entrega. Puede ser: `percentage`, `flat`.

`cod_flat_fee`

currency

opcional

Tarifa fija de entrega en el momento de la entrega.

`cod_percent`

integer

opcional

Porcentaje de tarifa de entrega en el momento de la entrega.

`has_peak_hours_fee`

boolean

opcional

Indica si la tarifa incluye una tarifa por horas pico.

`peak_hours_calculation_method`

enum

opcional

Método de cálculo de la tarifa por horas pico. Puede ser: `percentage`, `flat`.

`peak_hours_flat_fee`

currency

opcional

Tarifa fija por horas pico.

`peak_hours_percent`

integer

opcional

Porcentaje de tarifa por horas pico.

`peak_hours_start`

string

opcional

Hora de inicio de las horas pico en formato `HH:mm`.

`peak_hours_end`

string

opcional

Hora de fin de las horas pico en formato `HH:mm`.

`duration_terms`

string

opcional

Términos de duración de entrega legibles por humanos.

`estimated_days`

integer

opcional

Duración estimada del servicio en días.

PUT
`/v1/service-rates/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/service-rates/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "service_name": "Tarifa de Servicio Actualizada",
  "service_type": "food_delivery",
  "rate_calculation_method": "per_meter",
  "currency": "USD",
  "base_fee": 12.00,
  "per_meter_unit": "km",
  "per_meter_flat_rate_fee": 25,
  "has_cod_fee": true,
  "cod_calculation_method": "percentage",
  "cod_flat_fee": 1.00,
  "cod_percent": 0,
  "has_peak_hours_fee": true,
  "peak_hours_calculation_method": "percentage",
  "peak_hours_flat_fee": 3.00,
  "peak_hours_percent": 0,
  "peak_hours_start": "17:00",
  "peak_hours_end": "18:45",
  "duration_terms": "Rápido",
  "estimated_days": 2
}'
```

DELETE
`/v1/service-rates/:id`

## [Eliminar una Tarifa de Servicio](#eliminar-una-tarifa-de-servicio)

Elimina una Tarifa de Servicio.

DELETE
`/v1/service-rates/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/service-rates/:id \
  -H "Authorization: Bearer flb_live_…"
```

entero

opcional

Duración estimada del servicio en días.

PUT
`/v1/tarifas-de-servicio/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/tarifas-de-servicio/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "moneda": "SGD",
    "tarifa_base": 12.66,
    "dias_estimados": 6
}'
```

DELETE
`/v1/tarifas-de-servicio/:id`

## [Eliminar una tarifa de servicio](#eliminar-una-tarifa-de-servicio)

Eliminar una tarifa de servicio.

DELETE
`/v1/tarifas-de-servicio/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/tarifas-de-servicio/:id \
  -H "Authorization: Bearer flb_live_…"
```