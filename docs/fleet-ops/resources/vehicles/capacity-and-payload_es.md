---
título: "Capacidad y Carga"
url: https://fleetbase.io/docs/fleet-ops/resources/vehicles/capacity-and-payload
módulo: fleet-ops
---

Vehículos

# Capacidad y Carga

Configure la capacidad de carga del vehículo: límites de peso y volumen utilizados por el Orchestrator para evitar sobrecargar durante la asignación de pedidos.

# Capacidad y Carga del Vehículo

Vehículo
**capacidad**
La configuración define la carga máxima que puede transportar un vehículo. Estos valores se utilizan por el Orchestrator al asignar pedidos: no asignará pedidos a un vehículo si hacerlo excediera la capacidad de peso o volumen del vehículo.

## Campos de Capacidad

| Campo | Columna de respaldo | Tipo | Descripción |
|---|---|---|---|
| **Capacidad de Carga** | `payload_capacity` | decimal(2) | El peso máximo que puede transportar el vehículo. La interpretación de la unidad depende de su operación: rellene consistentemente con las unidades de peso de la entidad que utilice. |
| **Capacidad de Carga (Volumen)** | `payload_capacity_volume` | decimal(3) | El volumen máximo de carga que puede transportar el vehículo. La misma convención: establezca las dimensiones de la entidad en unidades correspondientes. |

Ambos campos son opcionales. Si se dejan en blanco, el Orchestrator trata al vehículo como si tuviera capacidad ilimitada.

## Establecer la Capacidad del Vehículo

La capacidad se establece en el registro del vehículo:

1. Navegue a
   **Fleet-Ops → Recursos → Vehículos**
2. Abra un registro de vehículo y haga clic en
   **Editar**
3. Introduzca la
   **Capacidad de Carga**
   (peso) y/o
   **Capacidad de Carga (Volumen)**
4. Haga clic en
   **Guardar**

![Formulario de edición de vehículo, sección Capacidad y Dimensiones — capacidad de combustible, capacidad de carga y remolque, peso del vehículo, dimensiones, volumen de carga y capacidad de palets y paquetes](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-vehicle-edit-capacity.d7f61a0b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cómo la Capacidad Afecta al Orchestrator

Cuando el Orchestrator ejecuta una asignación por lotes, calcula la carga acumulada para cada ruta propuesta:

* Suma el peso de todas las entidades en todos los pedidos asignados a un vehículo
* Suma el volumen de todas las entidades (calculado a partir de las dimensiones si no se establecen directamente)
* Si alguna de estas sumas excede la capacidad del vehículo en cualquier punto de la ruta, la asignación se rechaza

Los pedidos que no pueden ajustarse a ningún vehículo disponible debido a las limitaciones de capacidad se devuelven al grupo de pedidos no asignados.

Para los vehículos sin capacidad establecida, las limitaciones de capacidad se ignoran por completo.

## Datos de Carga en los Pedidos

El cumplimiento de la capacidad solo funciona cuando los pedidos a los que se les asigna tienen datos de carga:

* **Peso de la entidad**
  — establezca los
  `valor_peso`
  y
  `unidad_peso`
  para cada entidad en la carga del pedido
* **Volumen de la entidad**
  — establezca
  `longitud_valor`
  ,
  `ancho_valor`
  ,
  `altura_valor`
  y sus unidades (Fleet-Ops calcula el volumen automáticamente a partir de las dimensiones)

Para introducir estos datos al crear pedidos: agregue entidades y rellene los campos de peso y dimensión.

A través de la API, establezca:

```
{
  "entities": [
    {
      "description": "Refrigerador",
      "weight_value": 65,
      "weight_unit": "kg",
      "length_value": 60,
      "width_value": 70,
      "height_value": 180,
      "length_unit": "cm"
    }
  ]
}
```

## Seguimiento de Capacidad Multiestación

Para las rutas con múltiples recogidas y entregas, el Orchestrator rastrea la carga acumulada en cada parada:

* La carga
  **aumenta**
  cuando el conductor recoge artículos
* La carga
  **disminuye**
  cuando el conductor entrega artículos
* La capacidad del vehículo no debe excederse en ningún punto de la ruta

Esto maneja correctamente los escenarios de centro-y-ramas, recogidas consolidadas y rutas de entrega parciales.

## Capacidad en el Workbench

Después de ejecutar la optimización en el Workbench del Orchestrator, el panel de resultados muestra la utilización por vehículo:

* Peso total asignado (vs. capacidad) con porcentaje
* Volumen total asignado (vs. capacidad) con porcentaje

Los vehículos que están cerca o en capacidad se resaltan. Puede arrastrar manualmente los pedidos a un vehículo diferente si desea rebalancear la carga antes de confirmar.

## Páginas Relacionadas

* [Orchestrator — Asignación de Carga y Capacidad](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/payload-capacity-allocation)
* [Configuración → Orchestrator](https://fleetbase.io/docs/fleet-ops/settings/orchestrator)
  — configure si el cumplimiento de la capacidad está activo