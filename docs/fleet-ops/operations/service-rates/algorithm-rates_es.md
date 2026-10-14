---
title: "Tasas basadas en algoritmos"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates
module: fleet-ops
---

Tasas de servicio

# Tasas basadas en algoritmos

Utilice una expresión matemática para calcular las tasas de servicio de forma dinámica: combine la distancia, el tiempo, los paradas, los paquetes y otras variables en una sola fórmula evaluada en el momento de la cotización.

# Tasas de servicio basadas en algoritmos

Cuando
`rate_calculation_method`
se establece en
**`algo`**
(o
`algorithm`
), la tasa se calcula evaluando una expresión matemática que usted proporcione. Esto permite crear modelos de precios que las tarifas fijas o por metro no pueden expresar: por ejemplo, "$3 base + $1.20/km, con un límite de $50" o "$0.05 por paquete-metro, más $2 por cada parada adicional".

La expresión se almacena en el campo
`algorithm`
de la tasa como una cadena. En el momento de la cotización, Fleet-Ops sustituye los valores en tiempo real en los marcadores como
`{distance_km}`
y
`{stops}`
, evalúa la expresión matemática y utiliza el resultado como la tarifa de servicio.

![Formulario de algoritmo — campo de fórmula con la lista de variables disponibles y ejemplos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-algorithm.bad31065.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cómo se evalúa una tasa basada en algoritmo

Cuando se genera una cotización utilizando una tasa basada en algoritmo:

1. Se resume el pedido en un conjunto de
   **variables**
   (distancia, tiempo, número de paradas, número de paquetes, etc. — vea a continuación)
2. Se reemplazan todos los marcadores
   `{variable}`
   en su fórmula con sus valores numéricos
3. Se resuelven cualquier llamada de función compatible (
   `max`
   ,
   `min`
   ,
   `ceil`
   ,
   `floor`
   ,
   `round`
   )
4. Se evalúa el resto de la expresión matemática
5. El resultado se redondea a 2 decimales (típico para las monedas) y se añade a la tarifa base de la cotización

Los resultados siempre son numéricos. Si la expresión no se puede evaluar (sintaxis incorrecta, variable desconocida, división por cero), la tasa vuelve a utilizar el valor predeterminado de la tasa (tarifa base, tarifas por paquete).

## Variables disponibles

Cada algoritmo tiene el mismo conjunto de variables disponibles, todas ellas pobladas automáticamente a partir del pedido al que se está cotizando:

| Variable | Tipo | Descripción |
|---|---|---|
| `{distance_m}`, `{distance}` | metros | Distancia total de la ruta en metros |
| `{distance_km}` | kilómetros | `distance_m / 1000` |
| `{distance_mi}` | millas | `distance_m / 1609.344` |
| `{time_s}`, `{time}` | segundos | Tiempo total de la ruta en segundos |
| `{time_min}` | minutos | `time_s / 60` |
| `{stops}` | entero | Número de paradas en la ruta (recogidas + entregas + puntos intermedios) |
| `{waypoints}` | entero | Número de puntos intermedios ( `stops - endpoints` ) |
| `{parcels}` | entero | Número de entidades de carga con `type = parcel` |
| `{entities}` | entero | Número total de entidades de carga (de cualquier tipo) |
| `{base_fee}` | decimal | El valor de la tarifa base de la tasa, útil para expresiones "algo" que se basan en una tarifa base |

Las variables personalizadas que usted proporcione en la tasa se combinan con este conjunto, por lo que también puede hacer referencia a sus propias claves, como
`{markup_factor}`
si las ha poblado.

## Funciones disponibles

El motor de expresiones admite estas funciones auxiliares:

| Función | Comportamiento |
|---|---|
| `max(a, b)` | Devuelve el valor más grande de dos valores |
| `min(a, b)` | Devuelve el valor más pequeño de dos valores |
| `ceil(x)` | Redondea hacia arriba al siguiente entero |
| `floor(x)` | Redondea hacia abajo al entero anterior |
| `round(x, p)` | Redondea `x` a `p` decimales |

Se admite la aritmética estándar (
`+`
,
`-`
,
`*`
,
`/`
,
`^`
, paréntesis) en todo momento.

## Ejemplos

### 1. Basado en la distancia con "floor"

> *"Cobrar $1.50 por kilómetro, con un mínimo de $5."*

```
max(5, 1.5 * {distance_km})
```

Para un pedido de 2 km:
`max(5, 1.5 * 2)`
=
`max(5, 3)`
=
**$5**
.
Para un pedido de 10 km:
`max(5, 1.5 * 10)`
=
`max(5, 15)`
=
**$15**
.

### 2. Distancia con límite

> *"$3 base + $1.20 por km, con un límite de $50."*

```
min(50, 3 + 1.2 * {distance_km})
```

Para un pedido de 5 km:
`min(50, 3 + 6)`
=
**$9**
.
Para un pedido de 100 km:
`min(50, 3 + 120)`
=
**$50**
(con límite).

### 3. Tarifa por paquete

> *"$5 por paquete."*

```
5 * {parcels}
```

Para un pedido con 12 paquetes:
**$60**
.

### 4. Servicio de mensajería con múltiples paradas

> *"$2 base + $0.80 por km + $1.50 por cada parada adicional después de la primera."*

```
2 + 0.8 * {distance_km} + 1.5 * {stops}
```

Para un pedido de 12 km con 3 paradas (recogida + 2 entregas, por lo que
`stops = 1`
):
`2 + 9.6 + 1.5`
=
**$13.10**
.

### 5. Tarifa basada en el tiempo con redondeo

> *"$1.25 por minuto de tiempo estimado de conducción, redondeado hacia arriba."*

```
ceil(1.25 * {time_min})
```

Para un viaje estimado de 23 minutos:
`ceil(28.75)`
=
**$29**
.

### 6. Modelo combinado

> *"Tarifa base de $4, más $0.50/km, más $1 por cada parada adicional después de la primera, con un límite de $80."*

```
min(80, 4 + 0.5 * {distance_km} + max(0, {stops} - 1))
```

## Flujo de trabajo de configuración

Cree o abra una tasa de servicio en
**Fleet-Ops → Operations → Service Rates**
.

Establezca
**Rate Calculation Method**
en
**Algorithm**
.

Ingrese la expresión matemática en el campo
**Algorithm**
. Utilice los nombres de las variables exactamente como se muestra arriba, entre llaves (por ejemplo,
`{distance_km}`
,
`{parcels}`
).

*Opcional:*
Establezca una
**Base Fee**
que se añadirá al resultado del algoritmo.

*Opcional:*
Configure
**COD Fees**
y
**Peak Hours**
— estas tarifas adicionales se aplican sobre el resultado del algoritmo.

Guarde y pruebe generando una cotización para un pedido de muestra. Consulte la sección
**Quote**
en el detalle del pedido para ver el importe calculado y la tasa que se ha aplicado.

## Validación de una expresión

Antes de guardar, Fleet-Ops puede validar que una expresión es
**calculable**
— ejecuta la expresión contra un conjunto de valores representativos para confirmar que el resultado es numérico. El validador evalúa su fórmula contra:

```
distance_m = 25000   stops    = 4   parcels  = 3   base_fee = 100
time_s     = 5400    waypoints = 2  entities = 5
```

Si la expresión devuelve un número para estos valores, es seguro guardarla. Si falla (sintaxis incorrecta, variable desconocida, división por cero), la validación fallará.

## Limitaciones

* **No hay condiciones más allá de
  `min`
  /
  `max`**
  — no hay operador
  `if`
  . Utilice
  `min`
  /
  `max`
  para expresar límites y redondeos.
* **No hay operaciones de cadena**
  — las tasas basadas en algoritmos son puramente numéricas.
* **No hay búsquedas externas**
  — las variables deben provenir del fixture del pedido: no puede extraer datos en tiempo real (tasas de FX, hora del día) en la expresión. Utilice tarifas por hora punta en lugar de eso.

## Páginas relacionadas

* [Tasas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — métodos de cálculo y ámbito de la tasa
* [Cotizaciones de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
  — cómo se convierte la tarifa calculada en una cotización para un pedido