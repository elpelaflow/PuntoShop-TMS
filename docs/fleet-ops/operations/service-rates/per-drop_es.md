---
title: "Por entrega"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-drop
module: fleet-ops
---

Tarifas de servicio

# Por entrega

Fija el precio de un pedido según el número de paradas en la ruta. Define rangos mínimo/máximo y una tarifa fija para cada rango, ideal para entregas de múltiples paradas y en lote.

# Por entrega

**Por entrega**
establece la tarifa de servicio según
**el número de paradas**
en el pedido. Defines una tabla de niveles, donde cada nivel es un rango de conteo de paradas con una tarifa fija, y el nivel al que pertenece el conteo de paradas del pedido se cobra. (En la API, este método se identifica como
`per_drop`
.)

Utiliza esto para trabajos de entrega de múltiples paradas, entregas en lote y cualquier modelo de precios donde cada parada adicional es lo que realmente impulsa el costo. Si deseas un precio basado en la distancia, utiliza este en combinación con una
[Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
en lugar de eso.

![Formulario "Por entrega" — rangos mínimo/máximo y tabla de tarifas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-per-drop.6be959f9.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cómo funciona

1. El conteo de paradas del pedido es la recogida más todas las entregas y puntos intermedios.
2. Los niveles se revisan en orden. El primer nivel cuyo rango contenga el conteo de paradas gana.
3. Si el conteo de paradas excede el máximo de cualquier nivel, se utiliza el nivel con el máximo más alto como respaldo.
4. La tarifa del nivel correspondiente se añade a la
   **Tarifa base**
   para obtener la tarifa de servicio.

> **Tarifa de servicio = Tarifa base + la tarifa del nivel correspondiente**

Los niveles no tienen que ser consecutivos y puedes definirlos según tus necesidades. Cada nivel tiene un conteo mínimo de paradas, un conteo máximo de paradas y una tarifa en la moneda de la tarifa.

## Referencia de la API

| Campo | Requerido | Descripción |
|---|---|---|
| `rate_calculation_method` | Sí | Establecer en `per_drop`. |
| `rateFees[]` | Sí | La tabla de niveles. Cada fila tiene un `min` (límite inferior inclusivo), un `max` (límite superior inclusivo) y una `fee` en la moneda de la tarifa. |
| `base_fee` | Opcional | Se añade a la tarifa del nivel correspondiente. |
| `currency` | Sí | Moneda para todas las tarifas en la tarifa. |

Añade niveles desde el
**+ Añadir entrega**
en el formulario.

## Ejemplo práctico

> *"1–3 paradas: $10. 4–6 paradas: $15. 7+ paradas: $20."*

| Nivel | Paradas mín. | Paradas máx. | Tarifa |
|---|---|---|---|
| 1 | 1 | 3 | $10.00 |
| 2 | 4 | 6 | $15.00 |
| 3 | 7 | 99 | $20.00 |

Para un pedido con:

* **Recogida + 1 entrega**
  (2 paradas) → coincide con el nivel 1 → tarifa de servicio = Tarifa base + $10.
* **Recogida + 4 entregas**
  (5 paradas) → coincide con el nivel 2 → tarifa de servicio = Tarifa base + $15.
* **Recogida + 9 entregas**
  (10 paradas) → coincide con el nivel 3 → tarifa de servicio = Tarifa base + $20.

Si presentaras un pedido de 150 paradas (más allá del máximo del nivel más grande de 99), la tarifa del nivel 3 (el nivel con el máximo más alto) seguiría aplicándose como respaldo.

## Flujo de trabajo de configuración

Crea o abre una tarifa de servicio en
**Fleet-Ops → Operations → Service Rates**
.

Establece
**Rate Calculation Method**
en
**Per Drop-off**
.

Haz clic en
**+ Add Drop-off**
para añadir una fila de nivel. Establece el
**Min**
,
**Max**
y la
**Tarifa**
para ese rango.

Repite hasta que cubras cada conteo de entrega que quieras soportar. Establece el máximo del último nivel lo suficientemente alto para actuar como un "catch-all" (por ejemplo, 99 o 999).

*Opcional:*
Establece una
**Tarifa base**
que se añada a la tarifa del nivel correspondiente.

*Opcional:*
Configura
**Tarifas adicionales**
y
**Horas pico**
— estas tarifas adicionales se aplican además de la tarifa de servicio.

Guarda y prueba generando un presupuesto para un pedido de múltiples paradas. Consulta la sección
**Presupuesto**
en el detalle del pedido para ver el nivel correspondiente.

## Limitaciones

* **El conteo de paradas incluye la recogida.**
  Una "entrega con 3 entregas" es
  **4 paradas**
  , no 3. Define tus niveles en consecuencia.
* **No hay componente de distancia.**
  "Por entrega" ignora la distancia de la ruta por completo. Si necesitas tanto el conteo de paradas como el precio basado en la distancia, utiliza
  [Algoritmo](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  en lugar de eso.
* **El orden de los niveles importa.**
  Los niveles se evalúan en el orden en que se crean. No se deben superponer los rangos; el primero que coincida gana, y la superposición dará resultados impredecibles.

## Páginas relacionadas

* [Visión general de las tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — todos los métodos de cálculo y el alcance de las tarifas.
* [Tarifas basadas en algoritmos](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  — combina el conteo de paradas con la distancia, el tiempo o las tarifas de paquetes.
* [Presupuestos de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
  — cómo se calcula la tarifa en un pedido.