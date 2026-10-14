---
title: "Tarifa por Paquete"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/parcel
module: fleet-ops
---

Tarifas de Servicio

# Tarifa por Paquete

Precio por paquete basado en su tamaño y peso — defina umbrales para cada categoría (pequeño, mediano, grande, extra grande), y Fleet-Ops calcula la tarifa correcta para cada paquete en el pedido.

# Tarifa por Paquete

**Tarifa por Paquete**
establece la tarifa de servicio en función del
**número y las características físicas de los paquetes**
en el pedido. Usted define una tabla de categorías, donde cada categoría tiene umbrales de longitud, anchura, altura y peso, además de una tarifa — y cada paquete en el pedido se compara con la tabla y se aplica la tarifa correspondiente. (En la API, este método se identifica como
`parcel`
.)

Utilice esto para la entrega de paquetes y comercio electrónico, donde el precio depende de las características físicas, no de la distancia de la ruta. Si desea combinar la tarifa por paquete con la distancia, utilice
[Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
con
`{parcels}`
, o establezca una tarifa por paquete junto con una tarifa por distancia en diferentes servicios.

![Formulario de Tarifa por Paquete — categorías de tamaño con longitud, anchura, altura, peso y tarifa](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-parcel.543542f0.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Cómo funciona?

Una tarifa por paquete es una tabla de
**categorías de tamaño**. Cada categoría define una longitud, anchura, altura y peso máximos que debe tener un paquete, además de la tarifa que se aplica cuando se cumple.

En el momento de la cotización, para
**cada paquete**
en el pedido:

1. Se obtienen las dimensiones y el peso del paquete.
2. Se comprueban las categorías en orden. La primera categoría en la que cabe el paquete se considera la correcta.
3. Si el paquete excede los umbrales de cada categoría, se asigna a la
   **categoría más grande**
   (con la tarifa más alta) como alternativa.
4. Se añade la tarifa de la categoría asignada al total del paquete.

Una vez que se ha determinado el precio de cada paquete, se añade el total del paquete a la
**Tarifa Base**:

> **Tarifa de servicio = Tarifa Base + suma de la tarifa de la categoría correspondiente a cada paquete**

Las líneas de la cotización incluyen una entrada por paquete, etiquetada con la categoría correspondiente (por ejemplo,
*"Tarifa para paquete mediano"*
), para que pueda ver exactamente cómo se ha calculado el total.

## Referencia de la API

Cuando cambie a
**Tarifa por Paquete**, Fleet-Ops crea la tabla con cuatro categorías predeterminadas (Pequeño, Mediano, Grande y Extra Grande), que puede editar. Cada categoría admite los siguientes campos:

| Campo | Requerido | Descripción |
|---|---|---|
| `size` | Sí | Etiqueta de categoría de tamaño — `small` , `medium` , `large` , `x-large` . Se utiliza en las líneas de la cotización. |
| `length` / `width` / `height` | Sí | Las dimensiones máximas para esta categoría, en `dimensions_unit` . Un paquete debe caber en todas las tres para que coincida. |
| `dimensions_unit` | Sí | Unidad para las dimensiones. Puede ser: `cm` , `in` , `ft` , `mm` , `m` , `yd` . |
| `weight` | Sí | Peso máximo para esta categoría, en `weight_unit` . |
| `weight_unit` | Sí | Unidad para el peso. Puede ser: `g` , `oz` , `lb` , `kg` . |
| `fee` | Sí | La tarifa que se aplica a cada paquete que coincide con esta categoría, en la moneda de la tarifa. |
| `currency` | Sí | Moneda para la tarifa. |

Las tarifas predeterminadas que Fleet-Ops crea:

| Tamaño | Longitud × Anchura × Altura | Peso | Tarifa |
|---|---|---|---|
| Pequeño | 34 × 18 × 10 cm | 2 kg | $0.00 |
| Mediano | 34 × 32 × 10 cm | 4 kg | $0.00 |
| Grande | 34 × 32 × 18 cm | 8 kg | $0.00 |
| Extra Grande | 34 × 32 × 34 cm | 13 kg | $0.00 |

Establezca las tarifas para que coincidan con su precio y ajuste los umbrales de dimensiones o peso según sea necesario.

## Ejemplo práctico

> *"Pequeño: $3. Mediano: $5. Grande: $8. Extra Grande: $14."*

Con los umbrales de tamaño predeterminados, un pedido que contenga:

* 2 paquetes pequeños (cada uno dentro de 34 × 18 × 10 cm y con un peso inferior a 2 kg)
* 1 paquete mediano (dentro de 34 × 32 × 10 cm y con un peso inferior a 4 kg)
* 1 paquete grande (dentro de 34 × 32 × 18 cm y con un peso inferior a 8 kg)

Se cotizará de la siguiente manera:

| Paquete | Categoría correspondiente | Tarifa |
|---|---|---|
| Paquete 1 | Pequeño | $3.00 |
| Paquete 2 | Pequeño | $3.00 |
| Paquete 3 | Mediano | $5.00 |
| Paquete 4 | Grande | $8.00 |
| **Subtotal** |  | **$19.00** |

Además de la
**Tarifa Base**, lo que hace que el total sea
**$21.00**
.

Un paquete con dimensiones de 50 × 40 × 40 cm y un peso de 20 kg — que excede los umbrales de cada categoría — se asignará a la categoría más grande (Extra Grande) y se cobrará $14.00.

## Flujo de trabajo de configuración

Cree o abra una tarifa de servicio en
**Fleet-Ops → Operations → Service Rates**
.

Establezca el
**Método de cálculo de la tarifa**
en
**Tarifa por Paquete**. El formulario creará la tabla con cuatro categorías de tamaño predeterminadas.

Para cada categoría (Pequeño, Mediano, Grande y Extra Grande), establezca los umbrales de
**Longitud**,
**Anchura**,
**Altura**
y
**Peso**, la
**Unidad de dimensión**
y
**Unidad de peso**, y la
**Tarifa adicional**.

*Opcional:*
Establezca una
**Tarifa Base**
que se aplica una vez por pedido (independientemente de las tarifas por paquete).

*Opcional:*
Configure
**Tarifas por Horas Pico**
y
**Tarifas por Distancia** — estas tarifas adicionales se aplican además de la tarifa por paquete.

Guarde y pruebe generando una cotización para un pedido que contenga una combinación de tamaños de paquetes. Verifique que cada paquete se asigne a la categoría correcta.

## Limitaciones

* **Solo paquetes**. Solo los artículos de la carga que estén marcados como paquetes se cotizan con la tarifa por paquete. Los demás artículos de la carga contribuyen con $0 a la tarifa por paquete — aún pueden cotizarse mediante otros métodos de tarifa.
* **Las tres dimensiones deben encajar**. Un paquete solo coincide con una categoría si su longitud,
  **y**
  su anchura y altura están dentro de los umbrales de la categoría. Si alguna de las dimensiones excede el umbral de la categoría, el paquete pasa a la siguiente categoría.
* **El orden de las categorías es importante**. Las categorías deben definirse de la más pequeña a la más grande. Las categorías en un orden incorrecto darán lugar a resultados inesperados.
* **No hay componente de distancia**. Las tarifas por paquete ignoran la distancia de la ruta por completo. Combine con
  [Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  si necesita ambos.
* **No hay peso volumétrico**. El método de búsqueda utiliza dimensiones y peso literales de forma independiente — no se calcula el peso volumétrico. Si necesita esto, utilice
  [Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  .

## Páginas relacionadas

* [Visión general de Tarifas de Servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — todos los métodos de cálculo y el alcance de las tarifas.
* [Tarifas de Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  — combine el número de paquetes con la distancia, el tiempo o las tarifas por parada.
* [Cotizaciones de Servicio](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
  — cómo se calcula la tarifa en una cotización.