---
title: "Distancia por zonas"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/multi-zone-distance
module: fleet-ops
---

Tarifas de servicio

# Distancia por zonas

Establezca tarifas de distancia diferentes en diferentes regiones — defina una tarifa por zona o área de servicio, establezca una tarifa de respaldo para segmentos no coincidentes, y Fleet-Ops divide la ruta en ellas en el momento de la cotización.

# Distancia por zonas

**Distancia por zonas**
divide la distancia de la ruta en
**reglas geográficas**
— cada regla cubre una Zona o Área de Servicio y tiene su propia tarifa por distancia. La parte de la ruta dentro de la geografía de cada regla se cobra con la tarifa de esa regla; una regla de
**respaldo opcional**
recoge cualquier distancia que no caiga dentro de cada geografía definida. (En la API, este método se identifica como
`multi_zone_distance`
.)

Esto permite crear modelos de precios como:

* *"Zona Downtown de Singapur: $2.00/km. Área de servicio de Singapur: $1.25/km."*
* *"Dentro del área de servicio: $1.20/km. En cualquier otro lugar: $3.00/km."*
* *"Zona A y Zona B con precios separados, con Zona A teniendo prioridad donde se superponen."*

Si solo necesita una tarifa en todas partes, utilice
[Por metro](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-meter)
en su lugar. Para precios basados en
**distancia**
en lugar de
**geografía**, utilice
[Tarifa fija](https://fleetbase.io/docs/fleet-ops/operations/service-rates/fixed-rate)
.

![Formulario de distancia por zonas — reglas geográficas con prioridad y fila de respaldo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-multi-zone-distance.b3f7b9b1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

![Vista detallada de la tabla de reglas con etiquetas de regla, selección de geografía, prioridad y tarifa por unidad](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-multi-zone-distance-details.04bb2339.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Cómo funciona?

Una tarifa de distancia por zonas es una lista de
**reglas geográficas**. Cada regla es una de:

* Una
  **regla de zona**
  — se aplica a la parte de la ruta que atraviesa una zona elegida
  [Zona](https://fleetbase.io/docs/fleet-ops/resources/places/overview)
  .
* Una
  **regla de área de servicio**
  — se aplica a la parte de la ruta que atraviesa un área de servicio elegida.
* Una
  **regla de respaldo**
  — se aplica a cualquier parte de la ruta que no esté dentro de las geologías de ninguna regla.

En el momento de la cotización:

1. Fleet-Ops clasifica las reglas por prioridad (la más alta primero). Donde hay superposiciones, la regla de mayor prioridad gana.
2. Fleet-Ops recorre la ruta y, para cada segmento, comprueba qué geología de la regla aplica.
3. Se suman las distancias dentro de la geología de cada regla. Cualquier distancia que no esté dentro de una geología definida se aplica a la regla de respaldo, si la ha definido.
4. La tarifa de cada regla es
   **su distancia × su tarifa**
   (en la unidad de distancia de esa regla).
5. Se suman todas las tarifas de las reglas y se añaden a la
   **Tarifa base**
   para obtener la tarifa de servicio.

Los elementos de la cotización incluyen una entrada por regla que contribuye a la distancia, etiquetada con el nombre de la zona o el área de servicio, para que los clientes y los despachadores puedan ver exactamente cómo se ha calculado el total.

**Información importante.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando sus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | --- | --- |
| Zona Downtown de Singapur | Zona | Zona Downtown de Singapur | 10 | $2.00 | km |
| Singapur | Área de servicio | Área de servicio de Singapur | 5 | $1.25 | km |

Considere una ruta con cuatro puntos de referencia que comienzan y terminan dentro del área de servicio de Singapur, pero atraviesa la zona Downtown de Singapur en el medio. La regla de zona gana dentro del límite de la zona porque tiene una prioridad más alta; la regla del área de servicio cobra todo lo demás.

Para un pedido cuya distancia de ruta se desglosa de la siguiente manera
**12.41 km dentro de Downtown**
y
**15.99 km dentro del área de servicio de Singapur**
:

| Segmento | Regla coincidente | Distancia | Tarifa | Elemento de la línea |
| --- | --- | --- | --- | --- |
| Segmento Downtown | Zona Downtown de Singapur | 12.41 km | $2.00 | **$24.81** |
| Segmento Singapur | Singapur | 15.99 km | $1.25 | **$19.98** |
| **Subtotal** |  |  |  | **$44.79** |
| Tarifa base |  |  |  | **$2.00** |
| **Total** |  |  |  | **$46.79** |

El desglose de la cotización muestra una fila para cada regla que contribuye a la distancia, con la distancia y la tarifa por unidad, lo que permite a los clientes y a los despachadores ver exactamente cómo se ha calculado el total.

**Necesitas saber.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando tus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | --- | --- |
| Zona Downtown de Singapur | Zona | Zona Downtown de Singapur | 10 | $2.00 | km |
| Singapur | Área de servicio | Área de servicio de Singapur | 5 | $1.25 | km |

Considere una ruta con cuatro puntos de referencia que comienzan y terminan dentro del área de servicio de Singapur, pero atraviesa la zona Downtown de Singapur en el medio. La regla de zona gana dentro del límite de la zona porque tiene una prioridad más alta; la regla del área de servicio cobra todo lo demás.

Para un pedido cuya distancia de ruta se desglosa de la siguiente manera
**12.41 km dentro de Downtown**
y
**15.99 km dentro del área de servicio de Singapur**
:

| Segmento | Regla coincidente | Distancia | Tarifa | Elemento de la línea |
| --- | --- | --- | --- | --- |
| Segmento Downtown | Zona Downtown de Singapur | 12.41 km | $2.00 | **$24.81** |
| Segmento Singapur | Singapur | 15.99 km | $1.25 | **$19.98** |
| **Subtotal** |  |  |  | **$44.79** |
| Tarifa base |  |  |  | **$2.00** |
| **Total** |  |  |  | **$46.79** |

El desglose de la cotización muestra una fila para cada regla que contribuye a la distancia, con la distancia y la tarifa por unidad, lo que permite a los clientes y a los despachadores ver exactamente cómo se ha calculado el total.

**Necesitas saber.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando tus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | --- | --- |
| Zona Downtown de Singapur | Zona | Zona Downtown de Singapur | 10 | $2.00 | km |
| Singapur | Área de servicio | Área de servicio de Singapur | 5 | $1.25 | km |

Considere una ruta con cuatro puntos de referencia que comienzan y terminan dentro del área de servicio de Singapur, pero atraviesa la zona Downtown de Singapur en el medio. La regla de zona gana dentro del límite de la zona porque tiene una prioridad más alta; la regla del área de servicio cobra todo lo demás.

Para un pedido cuya distancia de ruta se desglosa de la siguiente manera
**12.41 km dentro de Downtown**
y
**15.99 km dentro del área de servicio de Singapur**
:

| Segmento | Regla coincidente | Distancia | Tarifa | Elemento de la línea |
| --- | --- | --- | --- | --- |
| Segmento Downtown | Zona Downtown de Singapur | 12.41 km | $2.00 | **$24.81** |
| Segmento Singapur | Singapur | 15.99 km | $1.25 | **$19.98** |
| **Subtotal** |  |  |  | **$44.79** |
| Tarifa base |  |  |  | **$2.00** |
| **Total** |  |  |  | **$46.79** |

El desglose de la cotización muestra una fila para cada regla que contribuye a la distancia, con la distancia y la tarifa por unidad, lo que permite a los clientes y a los despachadores ver exactamente cómo se ha calculado el total.

**Necesitas saber.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando tus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | --- | --- |
| Zona Downtown de Singapur | Zona | Zona Downtown de Singapur | 10 | $2.00 | km |
| Singapur | Área de servicio | Área de servicio de Singapur | 5 | $1.25 | km |

Considere una ruta con cuatro puntos de referencia que comienzan y terminan dentro del área de servicio de Singapur, pero atraviesa la zona Downtown de Singapur en el medio. La regla de zona gana dentro del límite de la zona porque tiene una prioridad más alta; la regla del área de servicio cobra todo lo demás.

Para un pedido cuya distancia de ruta se desglosa de la siguiente manera
**12.41 km dentro de Downtown**
y
**15.99 km dentro del área de servicio de Singapur**
:

| Segmento | Regla coincidente | Distancia | Tarifa | Elemento de la línea |
| --- | --- | --- | --- | --- |
| Segmento Downtown | Zona Downtown de Singapur | 12.41 km | $2.00 | **$24.81** |
| Segmento Singapur | Singapur | 15.99 km | $1.25 | **$19.98** |
| **Subtotal** |  |  |  | **$44.79** |
| Tarifa base |  |  |  | **$2.00** |
| **Total** |  |  |  | **$46.79** |

El desglose de la cotización muestra una fila para cada regla que contribuye a la distancia, con la distancia y la tarifa por unidad, lo que permite a los clientes y a los despachadores ver exactamente cómo se ha calculado el total.

**Necesitas saber.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando tus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | --- | --- |
| Zona Downtown de Singapur | Zona | Zona Downtown de Singapur | 10 | $2.00 | km |
| Singapur | Área de servicio | Área de servicio de Singapur | 5 | $1.25 | km |

Considere una ruta con cuatro puntos de referencia que comienzan y terminan dentro del área de servicio de Singapur, pero atraviesa la zona Downtown de Singapur en el medio. La regla de zona gana dentro del límite de la zona porque tiene una prioridad más alta; la regla del área de servicio cobra todo lo demás.

Para un pedido cuya distancia de ruta se desglosa de la siguiente manera
**12.41 km dentro de Downtown**
y
**15.99 km dentro del área de servicio de Singapur**
:

| Segmento | Regla coincidente | Distancia | Tarifa | Elemento de la línea |
| --- | --- | --- | --- | --- |
| Segmento Downtown | Zona Downtown de Singapur | 12.41 km | $2.00 | **$24.81** |
| Segmento Singapur | Singapur | 15.99 km | $1.25 | **$19.98** |
| **Subtotal** |  |  |  | **$44.79** |
| Tarifa base |  |  |  | **$2.00** |
| **Total** |  |  |  | **$46.79** |

El desglose de la cotización muestra una fila para cada regla que contribuye a la distancia, con la distancia y la tarifa por unidad, lo que permite a los clientes y a los despachadores ver exactamente cómo se ha calculado el total.

**Necesitas saber.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando tus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | --- | --- |
| Zona Downtown de Singapur | Zona | Zona Downtown de Singapur | 10 | $2.00 | km |
| Singapur | Área de servicio | Área de servicio de Singapur | 5 | $1.25 | km |

Considere una ruta con cuatro puntos de referencia que comienzan y terminan dentro del área de servicio de Singapur, pero atraviesa la zona Downtown de Singapur en el medio. La regla de zona gana dentro del límite de la zona porque tiene una prioridad más alta; la regla del área de servicio cobra todo lo demás.

Para un pedido cuya distancia de ruta se desglosa de la siguiente manera
**12.41 km dentro de Downtown**
y
**15.99 km dentro del área de servicio de Singapur**
:

| Segmento | Regla coincidente | Distancia | Tarifa | Elemento de la línea |
| --- | --- | --- | --- | --- |
| Segmento Downtown | Zona Downtown de Singapur | 12.41 km | $2.00 | **$24.81** |
| Segmento Singapur | Singapur | 15.99 km | $1.25 | **$19.98** |
| **Subtotal** |  |  |  | **$44.79** |
| Tarifa base |  |  |  | **$2.00** |
| **Total** |  |  |  | **$46.79** |

El desglose de la cotización muestra una fila para cada regla que contribuye a la distancia, con la distancia y la tarifa por unidad, lo que permite a los clientes y a los despachadores ver exactamente cómo se ha calculado el total.

**Necesitas saber.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando tus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | --- | --- |
| Zona Downtown de Singapur | Zona | Zona Downtown de Singapur | 10 | $2.00 | km |
| Singapur | Área de servicio | Área de servicio de Singapur | 5 | $1.25 | km |

Considere una ruta con cuatro puntos de referencia que comienzan y terminan dentro del área de servicio de Singapur, pero atraviesa la zona Downtown de Singapur en el medio. La regla de zona gana dentro del límite de la zona porque tiene una prioridad más alta; la regla del área de servicio cobra todo lo demás.

Para un pedido cuya distancia de ruta se desglosa de la siguiente manera
**12.41 km dentro de Downtown**
y
**15.99 km dentro del área de servicio de Singapur**
:

| Segmento | Regla coincidente | Distancia | Tarifa | Elemento de la línea |
| --- | --- | --- | --- | --- |
| Segmento Downtown | Zona Downtown de Singapur | 12.41 km | $2.00 | **$24.81** |
| Segmento Singapur | Singapur | 15.99 km | $1.25 | **$19.98** |
| **Subtotal** |  |  |  | **$44.79** |
| Tarifa base |  |  |  | **$2.00** |
| **Total** |  |  |  | **$46.79** |

El desglose de la cotización muestra una fila para cada regla que contribuye a la distancia, con la distancia y la tarifa por unidad, lo que permite a los clientes y a los despachadores ver exactamente cómo se ha calculado el total.

**Necesitas saber.**
Fleet-Ops determina automáticamente qué segmentos están dentro de cada geología — siempre y cuando tus zonas y áreas de servicio tengan límites precisos dibujados en el mapa, la división se realiza en el momento de la cotización. No es necesario dividir manualmente el pedido o asignar distancias a las zonas de antemano.

## Configuraciones

Cada fila de la tabla de reglas tiene la siguiente configuración:

| Configuración | Requerido | Descripción |
| --- | --- | --- |
| **Etiqueta** | opcional | Un nombre legible para el usuario para la regla (por ejemplo, "Downtown", "Fallback rural"). Se muestra en los elementos de la línea de cotización si no está disponible el nombre de la zona o el área de servicio. |
| **Tipo de geografía** | sí | Elija **Zona** o **Área de servicio** (o **Regla de respaldo** para distancias de ruta no coincidentes). |
| **Geografía** | condicional | La zona o el área de servicio específica a la que se aplica esta regla. Requerido para las reglas de zona o área de servicio. |
| **Prioridad** | opcional | Un número entero. Cuando hay superposiciones, la prioridad más alta gana. Por defecto, es 0. |
| **Tarifa** | sí | La tarifa por distancia para esta regla, en la moneda de la tarifa de servicio. |
| **Unidad** | sí | La unidad de distancia en la que se expresa la tarifa (km, millas, metros, pies o yardas). Cada regla puede utilizar una unidad diferente. |

Una tarifa puede tener
**una regla de respaldo**
. Si desea una tarifa plana para distancias fuera de la zona, establezca la tarifa de la regla de respaldo; si prefiere rechazar los pedidos fuera de la zona, omita la regla de respaldo y esa distancia se cobrará en $0.

## Ejemplo de uso

> *"Tarifa de zona de Singapur: $2.00 de tarifa base, Zona Downtown de Singapur: $2.00/km, Área de servicio de Singapur: $1.25/km en cualquier otro lugar."*

Esta es la configuración que se muestra en las capturas de pantalla anteriores — una tarifa de servicio llamada "Tarifa de zona de Singapur" con una regla de zona para el centro y una regla de área de servicio para el resto de Singapur.

| Etiqueta | Tipo de geografía | Geografía | Prioridad | Tarifa | Unidad |
| --- | --- | --- | --- | ---

* [Resumen de tarifas de servicios](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — todos los métodos de cálculo y la definición de las tarifas
* [Áreas y zonas de servicios](https://fleetbase.io/docs/fleet-ops/resources/places/overview)
  — cómo definir las geografías utilizadas por las reglas de múltiples zonas
* [Por metro](https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-meter)
  — precios basados en la distancia lineal, con una sola tarifa
* [Tarifas basadas en algoritmos](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  — combinar con otras tarifas en una expresión personalizada
* [Presupuestos de servicios](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
  — cómo la tarifa calculada se convierte en un presupuesto en un pedido