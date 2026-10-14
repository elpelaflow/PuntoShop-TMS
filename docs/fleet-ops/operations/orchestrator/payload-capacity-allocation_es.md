---
título: "Asignación de capacidad y carga útil"
url: https://fleetbase.io/docs/fleet-ops/operations/orchestrator/payload-capacity-allocation
módulo: fleet-ops
---

Orchestrador

# Asignación de capacidad y carga útil

Cómo el Orchestrador utiliza el peso, el volumen y los datos de las entidades para hacer cumplir las restricciones de capacidad del vehículo durante la asignación.

# Asignación de capacidad y carga útil

El Orchestrador utiliza
**capacidad de carga**
para garantizar que los pedidos se asignen solo a vehículos con capacidad de carga suficiente. Esto evita sobrecargar los vehículos y garantiza que las entregas sean físicamente factibles.

## Cómo funciona la asignación de capacidad

Cuando un pedido tiene entidades con valores de peso o volumen, el Orchestrador suma el peso y el volumen totales de todas las entidades en el pedido. Luego, el pedido se asigna a vehículos donde:

```
sum(pesos de las entidades) ≤ capacidad_de_carga_del_vehículo
sum(volúmenes de las entidades) ≤ capacidad_de_carga_del_vehículo
```

Para una ruta con múltiples pedidos asignados al mismo vehículo, la carga acumulada de todos los pedidos debe permanecer dentro de la capacidad.

## Establecimiento de datos de carga útil en los pedidos

La asignación de capacidad solo se aplica cuando las entidades tienen datos de peso y/o volumen. Para poblar esto:

1. Al crear un pedido, agregue entidades con
   **Peso**
   (en kg) y
   **Dimensiones**
   (longitud × ancho × altura en cm o m)
2. El sistema calcula automáticamente el volumen a partir de las dimensiones
3. O, establezca
   `valor_de_peso`
   ,
   `valor_de_altura`
   ,
   `valor_de_ancho`
   ,
   `valor_de_longitud`
   directamente a través de la API

## Establecimiento de la capacidad del vehículo

Establezca la capacidad de un vehículo en
**Fleet-Ops → Recursos → Vehículos → [Vehículo] → Editar**:

| Campo | Unidad | Descripción |
|---|---|---|
| `capacidad_de_carga` | decimal(2) | Peso máximo que puede transportar el vehículo — la unidad es la que se establece de forma consistente con las unidades de peso de las entidades |
| `capacidad_de_carga_volumen` | decimal(3) | Volumen máximo de carga que puede transportar el vehículo — la unidad sigue las dimensiones de la entidad que se establece |

Si estos campos están en blanco, el Orchestrator trata al vehículo como si tuviera capacidad ilimitada.

## Comportamiento de asignación

| Escenario | Comportamiento del Orchestrador |
|---|---|
| El pedido no tiene datos de peso/volumen | Se ignoran las restricciones de capacidad para este pedido |
| El vehículo no tiene capacidad establecida | Se puede asignar el pedido al vehículo sin restricciones |
| El pedido excede la capacidad de un solo vehículo | Se marca el pedido como no asignable en los resultados |
| Múltiples pedidos encajan dentro de la capacidad | Se agrupan en la misma ruta del vehículo |
| Órdenes con capacidad y sin capacidad | Se priorizan las órdenes con capacidad para los vehículos con restricciones |

## Prioridad y capacidad

Los pedidos tienen un campo
**Prioridad del Orchestrador**
(de 0 a 100, donde 100 es el más alto). Cuando el Orchestrador no puede ajustar todos los pedidos dentro de las restricciones de capacidad, se asignan primero los pedidos de mayor prioridad. Los pedidos de menor prioridad que no encajan se devuelven al grupo de pedidos no asignados.

Establezca la prioridad de un pedido en el formulario de creación, o a través de la API con el campo
`prioridad_del_orchestrador`.

## Rutas con múltiples capacidades

Para escenarios complejos en los que un conductor recoge varias cosas antes de hacer entregas (hub-and-spoke, entregas consolidadas), el Orchestrador rastrea la carga acumulada en cada parada:

* La carga
  **aumenta**
  en las paradas de recogida
* La carga
  **disminuye**
  en las paradas de entrega
* La capacidad del vehículo nunca debe excederse en ningún momento de la ruta

El motor VROOM maneja esto de forma nativa. El motor Greedy utiliza un enfoque más simple de "bin packing".

## Informes de capacidad

Después de una ejecución del Orchestrador, el panel de resultados muestra la utilización por conductor:

* Peso total asignado vs. capacidad del vehículo
* Volumen total asignado vs. capacidad del vehículo
* Porcentaje de utilización

Esto ayuda a identificar vehículos subutilizados o sobreutilizados y a ajustar la asignación de flotas.

## Configuración

La aplicación de la capacidad se establece
**por fase**
en el "Phase Builder" del Orchestrador Workbench: active la opción
**Respetar la capacidad**
en la fase para habilitar las comprobaciones de peso y volumen para esa fase.

Los ajustes globales del Orchestrador (motor activo, banderas de asignación automática, tiempo máximo de viaje, equilibrio de la carga) se encuentran en
[Orchestrator Settings](https://fleetbase.io/docs/fleet-ops/settings/orchestrator)
.