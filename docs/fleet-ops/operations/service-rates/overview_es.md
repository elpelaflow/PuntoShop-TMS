---
title: "Tarifas de Servicio"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview
module: fleet-ops
---

Tarifas de Servicio

# Tarifas de Servicio

Defina las reglas de precios y las estructuras de tarifas utilizadas para calcular los costos de los pedidos: tarifas fijas, basadas en la distancia, en el peso, en zonas y cargos adicionales.

# Tarifas de Servicio

**Tarifas de Servicio**
definen las reglas de precios que utiliza Fleet-Ops para calcular el costo de un pedido. Las tarifas pueden ser tarifas fijas, basadas en la distancia, en el peso o en zonas. Permiten aplicar cargos adicionales por entrega en el momento de la entrega, durante las horas pico y por el tamaño del paquete. Cuando un pedido coincide con una tarifa de servicio, Fleet-Ops genera una
**Cotización de Servicio**
con el importe calculado.

![Lista de tarifas de servicio — nombre de la tarifa, tipo de servicio, tarifa base y alcance](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-list.c371ff1f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Métodos de Cálculo de Tarifas

El campo `rate_calculation_method` en una tarifa de servicio acepta uno de los seis valores. Cada uno tiene su propia página detallada que cubre la fórmula, los campos de configuración, ejemplos prácticos y limitaciones:

| Valor | Método | Cómo funciona |
|---|---|---|
| `por_metro` | [Por metro](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-meter) | Una tarifa fija por unidad de distancia: kilómetros, millas, metros, pies o yardas |
| `fijo_por_metro` | [Tarifa fija](https://fleetbase.io/docs/fleet-ops/operations/service-rates/fixed-rate) | Precios por tramos de distancia: una tarifa fija por cada tramo de 1 unidad de distancia, hasta la distancia máxima soportada. El alias "fixed_rate" se acepta como alias antiguo. |
| `por_entrega` | [Por entrega](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-drop) | Basado en el número de paradas en el pedido: define rangos de paradas, cada uno con una tarifa fija |
| `distancia_multi_zona` | [Distancia en múltiples zonas](https://fleetbase.io/docs/fleet-ops/operations/service-rates/multi-zone-distance) | Tarifas por distancia diferentes por zona o área de servicio, con una opción de respaldo para distancias fuera de cualquier zona |
| `paquete` | [Tarifa por paquete](https://fleetbase.io/docs/fleet-ops/operations/service-rates/parcel) | Precios por paquete: tamaños de paquetes que coinciden con las dimensiones y el peso de cada paquete |
| `algoritmo` (alias: `algoritmo`) | [Tarifas basadas en algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates) | Una expresión matemática personalizada que se resuelve en el momento de la cotización, combinando distancia, tiempo, paradas, paquetes y otras variables |

Los precios basados en zonas y en la configuración del pedido son
**alcances**
que se aplican a
*cualquier*
método: consulte
[Alcance de tarifas](#rate-scoping)
a continuación. (Nota: esto es diferente de
`multi_zone_distance`, que utiliza las zonas como entrada de precios en lugar de como alcance).

## Componentes de Tarifas

Cada tarifa de servicio tiene los siguientes campos configurables:

### Tarifa Base

La tarifa inicial aplicada antes de calcular cualquier distancia o peso.

### Componente de Distancia

* **Tarifa por metro**
  — tarifa por unidad de distancia
* **Unidad por metro**
  — km, milla, metro o pie
* **Máxima distancia**
  — límite máximo más allá del cual no se aplica ningún cargo adicional por distancia

### Cargo por Entrega en el Momento de la Entrega (COD)

Se aplica cuando el pedido tiene un cargo a cobrar al destinatario:

* **Tarifa COD fija**
  — tarifa fija por pedido COD
* **Porcentaje de COD**
  — porcentaje del importe COD

### Cargo Adicional por Horas Pico

Cargo adicional durante los períodos de alta demanda:

* **Hora de inicio/fin**
  — cuándo se aplican las horas pico
* **Tarifa pico fija**
  o
  **porcentaje de pico**
  — el importe del cargo adicional

### Tarifas por Distancia en Rangos (Tarifa Fija)

Para las tarifas
[Tarifa fija](https://fleetbase.io/docs/fleet-ops/operations/service-rates/fixed-rate)
, Fleet-Ops genera una fila por cada unidad de distancia hasta la distancia máxima soportada. Cada fila tiene su propia tarifa fija y el pedido se cobra con la tarifa del rango en el que se encuentra su distancia.

### Tarifas por Parada (Por Entrega)

Para las tarifas
[Por Entrega](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-drop)
, define una tabla de niveles con rangos de conteo de paradas mínimos/máximos. La tarifa de cada fila se aplica cuando el conteo de paradas del pedido cae dentro de ese rango.

### Reglas Geográficas (Distancia en Múltiples Zonas)

Para las tarifas
[Distancia en Múltiples Zonas](https://fleetbase.io/docs/fleet-ops/operations/service-rates/multi-zone-distance)
, defines una lista de reglas donde cada regla se aplica a una zona o área de servicio y tiene su propia tarifa por distancia. Las reglas se pueden asignar una prioridad (para la resolución de conflictos) y una regla se puede marcar como la de respaldo (para distancias fuera de cualquier geografía definida).

### Tarifas por Paquete (Tarifa por Paquete)

Para las tarifas
[Tarifa por Paquete](https://fleetbase.io/docs/fleet-ops/operations/service-rates/parcel)
, defines rangos de tamaño: cada uno con una longitud, anchura, altura y peso máximos, más una tarifa. Cada paquete en el pedido se corresponde con el rango más pequeño en el que cabe y se cobra la tarifa de ese rango.

## Creación de una Tarifa de Servicio

Navega a
**Fleet-Ops → Operaciones → Tarifas de Servicio**
.

Haz clic en
**Nueva Tarifa**
.

Establece el
**Nombre de la Tarifa**
(etiqueta de texto libre, por ejemplo,
*Servicio Express de Día*
) y
**Tipo de Servicio**
(grupo de texto libre, por ejemplo,
*entrega*
,
*transporte*
,
*paquete*
). El tipo de servicio no es una lista desplegable: utiliza la taxonomía que mejor se adapte a tu operación.

Selecciona el
**Método de Cálculo de Tarifas**
de las opciones anteriores.

Establece la
**Tarifa Base**
y configura los componentes de distancia/peso/volumen según sea necesario.

Establece la
**Moneda**
para esta tarifa.

Configura los cargos adicionales opcionales: tarifa COD, horas pico, tarifas por paquete.

Establece el
**Alcance**
de la tarifa:

* **Zona**
  — se aplica solo a pedidos dentro de una zona específica
* **Zona**
  — se aplica solo a pedidos dentro de una zona específica
* **Configuración del pedido**
  — se aplica solo a un tipo de pedido específico

Haz clic en
**Guardar**
. La tarifa ahora está activa y se aplicará a nuevos pedidos.

![Detalles de la tarifa de servicio — nombre, tipo de servicio, método de cálculo y componentes de tarifa](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-details.ca897ee3.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Alcance de Tarifas

Las tarifas se aplican a los pedidos según su alcance. Pueden existir varias tarifas para el mismo tipo de servicio: la tarifa más específica prevalece:

1. Tarifa basada en la zona (la más específica)
2. Tarifa basada en la zona
3. Tarifa basada en la configuración del pedido
4. Tarifa global (sin alcance)

Si varias tarifas coinciden, el cliente puede elegir cuál aplicar, o se utiliza la primera tarifa automáticamente, según tu configuración.

## Términos de Duración

Las tarifas pueden incluir
**Términos de Duración**
— el plazo de entrega esperado para este tipo de servicio (por ejemplo, "Mismo Día", "Siguiente Día Laboral", "2–3 Días"). Esto se muestra en las cotizaciones de servicio como el plazo de entrega estimado.

## A través de la API

Las tarifas de servicio se pueden leer a través de la API pública:

```
GET /v1/service-rates
```

Filtradas por zona, zona o configuración del pedido para obtener las tarifas aplicables para una combinación de origen/destino dada.

## Páginas Relacionadas

* [Cotizaciones de Servicio](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
  — cómo se generan las cotizaciones a partir de las tarifas de servicio
* [Zonas y Zonas](https://fleetbase.io/docs/fleet-ops/resources/places/overview)
  — definir el alcance de las tarifas geográficamente