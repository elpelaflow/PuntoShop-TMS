---
title: "Tarifa fija"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/fixed-rate
module: fleet-ops
---

Tarifas de servicio

# Tarifa fija

Establezca una tarifa fija por tramo de distancia — defina la distancia máxima que cubre y Fleet-Ops genera una tarifa por unidad, para que pueda fijar precios de 0–1, 1–2, 2–3 km de forma independiente.

# Tarifa fija

**Tarifa fija**
establece un precio a partir de una tabla de
**tramos de distancia**
— cada tramo cubre una unidad de distancia y tiene su propia tarifa fija. El tramo en el que se encuentra la distancia de la ruta determina la tarifa de servicio. (En la API, este método se identifica como
`fixed_meter`
; el valor antiguo
`fixed_rate`
también funciona.)

Utilice esto cuando su precio esté
**basado en tramos de distancia**
pero no sea lineal — por ejemplo, "cualquier entrega de menos de 5 km cuesta $5, cualquier entrega de menos de 10 km cuesta $8, cualquier entrega más allá cuesta $12". Los tramos son pasos de distancia completos, con un límite máximo que usted establece.

![Formulario de Tarifa Fija — distancia máxima, unidad y la tabla de distancia/tarifa generada automáticamente](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-fixed-rate.97c65f05.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Cómo funciona?

1. Establezca la
   **distancia máxima**
   que cubre y la
   **unidad de distancia máxima**
   (km o millas).
2. Fleet-Ops genera una fila en la tabla de tramos para cada paso completo de distancia desde 0 hasta su máximo. Cada fila cubre un tramo de 1 unidad (por ejemplo, 0–1, 1–2, 2–3...).
3. Establezca la tarifa para cada tramo individualmente.
4. En el momento de la cotización, la distancia de la ruta se compara con los tramos. El tramo más pequeño cuyo límite superior cubre la distancia de la orden gana. Si la distancia excede todos los tramos, se utiliza la tarifa del tramo más grande.
5. Se añade la tarifa del tramo correspondiente a la
   **tarifa base**
   para obtener la tarifa de servicio.

> **Tarifa de servicio = Tarifa base + la tarifa del tramo correspondiente**

Si cambia la distancia máxima, la tabla de tramos se actualiza automáticamente: se añaden nuevas filas para las distancias que ha añadido, y cualquier fila más allá del nuevo máximo se elimina.

## Referencia de la API

| Campo | Requerido | Descripción |
|---|---|---|
| `rate_calculation_method` | Sí | Establezca en `fixed_meter`. |
| `max_distance` | Sí | La distancia máxima que admite esta tarifa, en `max_distance_unit`. Debe ser al menos 1. |
| `max_distance_unit` | Sí | `km` o `mi`. |
| `base_fee` | Opcional | Se añade a la tarifa del tramo correspondiente. |
| `currency` | Sí | Moneda para todas las tarifas de la tarifa. |
| `rateFees[]` | Automático | La tabla de tramos — una entrada por unidad de distancia, cada una con una `distance` (el límite inferior del tramo) y una `fee`. Se genera automáticamente; edite las tarifas directamente en el formulario. |

## Ejemplo práctico

> *"Hasta 10 km: $5. Hasta 20 km: $8. Hasta 30 km: $12."*

| Distancia máxima | Unidad | Tramos |
|---|---|---|
| 30 | km | 0–10 km: $5 (tramos 0 a 9). 10–20 km: $8 (tramos 10 a 19). 20–30 km: $12 (tramos 20 a 29). |

Para una ruta de:

* **3 km**
  → coincide con el grupo 0–10 km → tarifa de servicio = Tarifa base + $5.
* **14 km**
  → coincide con el grupo 10–20 km → tarifa de servicio = Tarifa base + $8.
* **35 km**
  → excede el tramo más grande, se aplica al tramo 20–30 km → tarifa de servicio = Tarifa base + $12.

Dado que cada paso completo tiene su propia fila, también puede fijar diferentes precios para cada kilómetro individual si necesita una mayor granularidad — por ejemplo, una tarifa real por kilómetro en lugar de una basada en tramos.

## Flujo de trabajo de configuración

Cree o abra una tarifa de servicio en
**Fleet-Ops → Operaciones → Tarifas de servicio**
.

Establezca
**Método de cálculo de la tarifa**
en
**Tarifa fija**
.

Establezca la
**distancia máxima**
y la
**unidad de distancia máxima**
(km o millas). El formulario completará la tabla de tramos con una fila por unidad desde 0 hasta el máximo.

Establezca la
**tarifa**
para cada tramo. Los tramos que deben tener el mismo precio se pueden establecer con el mismo valor.

*Opcional:*
Establezca una
**tarifa base**
que se añade a la tarifa del tramo correspondiente.

*Opcional:*
Configure
**tarifas adicionales**
y
**horas punta**
— estas tarifas adicionales se aplican de la misma manera que cualquier tarifa.

Guarde y pruebe generando una cotización para un pedido de muestra. Consulte la sección
**Cotización**
en el detalle del pedido para ver el tramo correspondiente y el importe calculado.

## Limitaciones

* **Solo tramos completos.**
  Los tramos siempre tienen un ancho de 1 unidad y comienzan en números enteros. Si necesita tramos de media unidad, utilice una unidad más pequeña, o utilice
  [Tarifa por metro](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-meter)
  para una fijación de precios lineal.
* **No hay zonificación.**
  Los tramos se aplican globalmente a la tarifa. Si necesita diferentes precios de distancia en diferentes geografías, utilice
  [Distancia por zona](https://fleetbase.io/docs/fleet-ops/operations/service-rates/multi-zone-distance)
  en su lugar.
* **Reducir la distancia máxima es destructivo.**
  Los tramos más allá del nuevo máximo se eliminan automáticamente y no se pueden recuperar.

## Páginas relacionadas

* [Visión general de las tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — todos los métodos de cálculo y el alcance de la tarifa.
* [Por metro](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-meter)
  — fijación de precios lineal basada en la distancia.
* [Por entrega](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-drop)
  — fijación de precios por el número de paradas en la ruta. Ideal para la entrega de mensajería y lotes.