---
título: "Asignación de vehículos"
url: https://fleetbase.io/docs/fleet-ops/operations/orchestrator/vehicle-allocation
módulo: fleet-ops
---

Orchestrador

# Asignación de vehículos

Cómo el Orchestrador asigna vehículos a los pedidos: disponibilidad, proximidad de ubicación y asignación de conductor.

# Asignación de vehículos

La asignación de vehículos es lo que ocurre durante una fase que se ejecuta en el
`assign_vehicles`
modo (o en el modo legado
`allocate`) en el Orchestrador. El motor activo —
`greedy`
,
`vroom`
, o cualquier motor registrado en extensiones — evalúa cada vehículo disponible en relación con los pedidos en la reserva y produce una asignación de vehículo a pedido como parte de la salida de la fase.

## Cómo funciona la asignación de vehículos

Para cada pedido en el conjunto de entrada de la fase, el motor considera cada vehículo disponible:

1. **Verificación de disponibilidad**
   — el vehículo debe tener
   `status = activo`
   y
   `online = true`
2. **Vinculación al conductor**
   — si ya hay un conductor asignado al vehículo, el vehículo se asigna a ese conductor
3. **Ubicación**
   — la ubicación actual del vehículo es el punto de partida para los cálculos de distancia y tiempo
4. **Capacidad**
   — cuando la fase tiene
   *Respect Capacity*
   habilitado y los pedidos tienen datos de peso/volumen, la
   `payload_capacity`
   y
   `payload_capacity_volume`
   del vehículo se utilizan para hacer cumplir los límites de carga

## Atributos del vehículo utilizados en la asignación

| Atributo | Efecto en la asignación |
|---|---|
| `status` | Solo los vehículos con `status = activo` son elegibles |
| `online` | Solo los vehículos en línea se consideran |
| `location` | Punto de partida de la ruta para los cálculos de distancia/tiempo |
| `payload_capacity` | Carga máxima de peso — se aplica cuando los pedidos tienen valores de peso |
| `payload_capacity_volume` | Carga máxima de volumen — se aplica cuando los pedidos tienen valores de volumen |
| `vehicle_assigned_uuid` (conductor) | El vehículo se asigna previamente al conductor asignado |

## Asignación de vehículos a conductores

Para obtener resultados de asignación predecibles, vincule los vehículos a los conductores antes de ejecutar una fase:

1. Abra
   **Fleet-Ops → Recursos → Conductores**
2. Abra un registro de conductor y establezca su
   **Vehículo**
   en un vehículo específico
3. Las fases que afecten a este conductor asignarán al par conductor+vehículo

Si un conductor no tiene un vehículo asignado, una fase
`assign_drivers`
puede emparejarlo con un vehículo sin asignar en la misma ejecución, o la fase puede ejecutar una asignación solo para conductores sin hacer cumplir los límites de capacidad.

## Asignación basada en flotas

En la interfaz de Workbench, puede asignar la asignación de vehículos a una flota específica
**Flota**. Solo los vehículos que pertenezcan a la flota seleccionada se incluirán en el conjunto de recursos. Esto es útil para ejecutar pasadas de optimización separadas para diferentes zonas operativas o tipos de servicio.

## Estado del vehículo en línea

Los vehículos se vuelven "en línea" cuando su conductor asignado se vuelve en línea en la aplicación Navigator, o cuando un dispositivo de telemetría conectado informa que está activo. El panel de recursos del Orchestrador muestra:

* **Vehículos en línea**
  — disponibles para la asignación
* **Vehículos fuera de línea**
  — excluidos de la ejecución actual
* **Vehículos en uso**
  — ya asignados a un pedido activo (excluidos de nuevas asignaciones)

## Sobreescritura manual del vehículo

Incluso después de una ejecución del Orchestrador, las asignaciones de vehículos se pueden cambiar manualmente. En el panel de resultados de la Workbench, haga clic en un pedido asignado y utilice el
**Vehículo**
para seleccionar un vehículo diferente antes de confirmar. También puede reasignar el vehículo directamente en el panel de detalles del pedido.

## Próximos pasos

* [Asignación de carga y capacidad](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/payload-capacity-allocation)
  — configurar restricciones de peso y volumen
* [Configuración del Orchestrador](https://fleetbase.io/docs/fleet-ops/settings/orchestrator)
  — establecer el motor predeterminado y las restricciones de asignación globales