---
title: "Por metro"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-meter
module: fleet-ops
---

Tarifas de servicio

# Por metro

Establezca una tarifa fija por unidad de distancia: metros, kilómetros, pies, yardas o millas. El modelo de precios más sencillo basado en la distancia lineal.

# Por metro

**Por metro**
establece la tarifa de servicio
**linealmente en función de la distancia**
. Usted establece una tarifa por unidad de distancia (por ejemplo, $0,80 por km), elige la unidad y Fleet-Ops la multiplica por la distancia real de la ruta en el momento de la cotización. (En la API, este método se identifica como
`per_meter`
.)

Utilice esto para tarifas de taxi o de entrega urbana, donde cada unidad adicional de distancia añade una cantidad predecible y constante. Si su curva de precios cambia a ciertas distancias, utilice
[Tarifa fija](https://fleetbase.io/docs/fleet-ops/operations/service-rates/fixed-rate)
en su lugar; si necesita que varíe por región, utilice
[Distancia por zona](https://fleetbase.io/docs/fleet-ops/operations/service-rates/multi-zone-distance)
.

![Formulario "Por metro" — tarifa fija por unidad y unidad de distancia](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-per-meter.528b8bc6.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Cómo funciona?

> **Tarifa de servicio = Tarifa base + (Tarifa por metro × distancia en la unidad seleccionada)**

En el momento de la cotización:

1. La distancia total de la ruta se convierte en la unidad que ha seleccionado (kilómetros, millas, metros, pies o yardas).
2. Esa distancia se multiplica por su tarifa por unidad.
3. El resultado se añade a la Tarifa base para obtener la tarifa de servicio.

La distancia
**no tiene límite**
— el precio sigue escalando linealmente, independientemente de la distancia. Si necesita un límite, utilice el
[método de algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
con una expresión
`min()`
.

## Referencia de la API

| Campo | Requerido | Descripción |
|---|---|---|
| `rate_calculation_method` | sí | Establezca en `per_meter`. |
| `per_meter_flat_rate_fee` | sí | La tarifa aplicada por unidad de distancia, en la moneda de la tarifa. |
| `per_meter_unit` | sí | La unidad en la que se aplica la tarifa. Puede ser: `m`, `km`, `ft`, `yd`, `mi`. |
| `base_fee` | opcional | Se añade a la tarifa basada en la distancia. Útil como tarifa de recogida o de inicio. |
| `currency` | sí | La moneda de la tarifa. |

## Ejemplos prácticos

### 1. Por kilómetro

> *"$2 de tarifa de recogida + $0,80 por km."*

| Configuración | Valor |
|---|---|
| Tarifa base | $2.00 |
| Tarifa por metro | $0.80 |
| Unidad de distancia | km |

Para una ruta de
**12 km**: 2 + (0.80 × 12) =
**$11.60**
.

Para una ruta de
**3 km**: 2 + (0.80 × 3) =
**$4.40**
.

### 2. Por milla

> *"$1.50 por milla, sin tarifa de recogida."*

| Configuración | Valor |
|---|---|
| Tarifa base | $0.00 |
| Tarifa por metro | $1.50 |
| Unidad de distancia | mi |

Para una ruta de
**8 millas**: 0 + (1.50 × 8) =
**$12.00**
.

### 3. Por metro (distancias muy cortas)

> *"$0,01 por metro — para entregas en interiores o en el campus."*

| Configuración | Valor |
|---|---|
| Tarifa por metro | $0.01 |
| Unidad de distancia | m |

Para una ruta de
**350 m**: 0.01 × 350 =
**$3.50**
.

## Flujo de trabajo de configuración

Cree o abra una tarifa de servicio en
**Fleet-Ops → Operations → Service Rates**
.

Establezca
**Rate Calculation Method**
en
**Per Meter**
.

Establezca la
**Per-Meter Rate Fee**
y
**Distance Unit**
. El formulario muestra la fórmula en tiempo real a medida que cambia.

*Opcional:*
Establezca una
**Tarifa base**
(la tarifa de inicio añadida antes del cálculo de la distancia).

*Opcional:*
Configure
**Tarifas de cobro en origen**
y
**Horas punta**
— estas tarifas adicionales se aplican además del resultado por metro.

Guarde y pruebe generando una cotización para un pedido de muestra. Consulte la sección
**Quote**
en el detalle del pedido para ver el importe calculado.

## Limitaciones

* **Sin niveles.**
  Una sola tarifa se aplica para cualquier distancia — no hay forma de expresar "la primera tarifa de 10 km a una tarifa, luego una tarifa diferente después". Utilice
  [Tarifa fija](https://fleetbase.io/docs/fleet-ops/operations/service-rates/fixed-rate)
  para precios basados en rangos o
  [Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  para expresiones en partes.
* **Sin conciencia geográfica.**
  La misma tarifa se aplica en todas las áreas donde se aplica la tarifa. Para tarifas diferentes en diferentes zonas, utilice
  [Distancia por zona](https://fleetbase.io/docs/fleet-ops/operations/service-rates/multi-zone-distance)
  .
* **Sin mínimo ni máximo.**
  Si necesita alguno, utilice
  [Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  con
  `max()`
  /
  `min()`
  .

## Páginas relacionadas

* [Visión general de las tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — todos los métodos de cálculo y la forma de definir la tarifa.
* [Tarifa fija](https://fleetbase.io/docs/fleet-ops/operations/service-rates/fixed-rate)
  — precios basados en rangos de distancia.
* [Distancia por zona](https://fleetbase.io/docs/fleet-ops/operations/service-rates/multi-zone-distance)
  — precios de distancia por zona geográfica.
* [Tarifas de algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  — fórmulas personalizadas para límites y tarifas combinadas.
* [Cotizaciones de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
  — cómo se convierte la tarifa calculada en una cotización para un pedido.