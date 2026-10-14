---
title: "Descripción general del Orchestrator"
url: https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview
module: fleet-ops
---

Orchestrator

# Descripción general del Orchestrator

Un planificador de múltiples fases que convierte una lista de pedidos no asignados en un plan viable — secuenciando las fases de asignación de vehículos, asignación de conductores y optimización de rutas.

# Descripción general del Orchestrator

El
**Orchestrator**
es el planificador automatizado que Fleet-Ops utiliza para convertir una lista de pedidos no asignados en un plan de asignación viable. En lugar de utilizar una única línea de flujo fija, puedes crear
**fases**
en el Workbench del Orchestrator y secuenciarlas — por ejemplo:
* Asignar vehículos → Optimizar rutas → Asignar conductores
. Cada fase utiliza un motor configurable para procesar un conjunto de pedidos. El resultado es un plan propuesto que puedes revisar, ajustar y confirmar cuando estés listo.

![Workbench del Orchestrator — plan de múltiples fases con tres fases secuenciadas: Asignar vehículos → Optimizar rutas → Asignar vehículos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orchestrator-phases.fe955c7f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cuándo utilizar el Orchestrator

El Orchestrator está diseñado para cualquier tarea de planificación que normalmente realizarías manualmente:

* Despachar un lote de entregas de más de 50 vehículos a través de 10 conductores
* Reordenar las paradas en la lista de un conductor después de que se añadan nuevos pedidos urgentes a media jornada
* Optimizar la ruta sin cambiar las asignaciones de conductores/vehículos
* Asignar vehículos a los pedidos según su capacidad, y luego asignar conductores en una fase separada
* Ejecutar una única fase (por ejemplo, solo la optimización de rutas) sobre una asignación existente

Para asignaciones únicas y específicas, la asignación manual desde el panel de detalles del pedido es más sencilla y rápida.

## Fases

La unidad de trabajo en el Orchestrator es una
**fase**. Cada fase declara un
**modo** — lo que se optimiza — y un
**motor** — la estrategia utilizada para calcularlo. Las fases se ejecutan en el orden en que las añades en el constructor de fases del Workbench. La salida de cada fase se convierte en la entrada para la siguiente, por lo que un proceso de múltiples fases puede construir un plan completo de forma progresiva.

### Modos disponibles

| Modo | Qué hace |
|---|---|
| `assign_vehicles` | Asigna los pedidos a los vehículos en función de la capacidad, la ubicación y las restricciones |
| `assign_drivers` | Asigna conductores a vehículos o pedidos (normalmente utilizando horarios y habilidades) |
| `optimize_routes` | Reordena las paradas en la ruta de cada conductor/vehículo para minimizar la distancia o el tiempo |
| `allocate` | Modo único de pasada: asigna tanto el conductor como el vehículo a cada pedido de una sola vez |

Puedes ejecutar una sola fase por sí sola — por ejemplo, solo
`optimize_routes`
para reordenar un plan existente — o apilar varias en una línea de flujo de múltiples fases. Un patrón común es
`assign_vehicles → assign_drivers → optimize_routes`, pero cualquier combinación es válida.

### Motores disponibles

Los motores son estrategias plugables para calcular una fase. Dos vienen con Fleet-Ops:

| ID del motor | Nombre | Notas |
|---|---|---|
| `greedy` | Greedy (incorporado) | Asignación rápida y sencilla; predecible |
| `vroom` | VROOM | Optimización de alta calidad para restricciones complejas: ventanas de tiempo, capacidad, múltiples paradas |

Ambos motores admiten todos los modos enumerados anteriormente.
**No existe ningún motor que
*solo*
realice la secuenciación de rutas o
*solo*
realice la asignación de conductores**
— tanto VROOM como el algoritmo greedy incorporado pueden manejar las tres. El modo es el objetivo de la fase; el motor es cómo lo logras.

Se pueden registrar motores adicionales con el
`OrchestrationEngineRegistry`, por lo que una instancia autoalojada puede exponer más opciones en el menú desplegable del motor.

## Configuración de la fase

Cada fase tiene sus propias configuraciones, por lo que diferentes fases en la misma ejecución pueden utilizar diferentes reglas:

| Configuración | Significado |
|---|---|
| **Etiqueta** | Nombre de texto libre que se muestra en la pestaña de la fase (por ejemplo, *Asignar pedidos*) |
| **Modo** | Uno de los cuatro modos anteriores |
| **Motor** | La estrategia utilizada para esta fase |
| **Estados de los pedidos** | Los estados de los pedidos que considera la fase — normalmente `creado`, puede incluir `despachado` o `comenzado` para la reprogramación |
| **Equilibrar la carga de trabajo** | Intenta igualar las paradas/pedidos entre los conductores |
| **Respetar las habilidades** | Respetar los requisitos de habilidades en los pedidos y las habilidades en los conductores |
| **Respetar la capacidad** | Respetar la capacidad del vehículo (peso, volumen) al asignar |
| **Regresar al depósito** | Añade una etapa final para que cada conductor regrese a su depósito |
| **Confirmar automáticamente** | Confirma los cambios de esta fase inmediatamente antes de que se ejecute la siguiente fase |

## Restricciones que el Orchestrator respeta

En todas las fases, el Orchestrator tiene en cuenta:

### Restricciones de los pedidos

* **Habilidades requeridas**
  — el pedido requiere un conductor con certificaciones específicas
* **Ventana de tiempo de inicio/fin**
  — hora de recogida y hora de entrega más temprana
* **Programado para**
  — no despachar antes de esta hora
* **Prioridad del Orchestrator**
  (0–100) — los pedidos de mayor prioridad se asignan primero

### Restricciones del conductor

* **Habilidades**
  — array de certificaciones que tiene el conductor
* **Ventana de tiempo de trabajo**
  — los horarios de inicio y fin disponibles para el conductor para el día
* **Estado en línea**
  — solo considerar conductores en línea/disponibles
* **Tiempo máximo de viaje**
  — límite global desde la configuración del Orchestrator

### Restricciones del vehículo

* **Capacidad de peso**
  — carga máxima en kg
* **Capacidad de volumen**
  — carga máxima en m³
* **Ubicación actual**
  — se utiliza como punto de partida de la ruta

## Flujo de trabajo

1. Abre
   **Operaciones → Orchestrator**
   para entrar en el Workbench
2. La lista de pedidos no asignados en el lado izquierdo muestra todos los pedidos no asignados
3. Abre el
   **Constructor de fases**
   y añade una o más fases — establece el modo, el motor y las opciones para cada fase
4. Haz clic en
   **Ejecutar fase(s)**
   — las fases se ejecutan en secuencia y producen un plan propuesto
5. Revisa el plan en el mapa y en el panel de recursos; arrastra para anular las asignaciones individuales si es necesario
6. Haz clic en
   **Confirmar**
   — se crean los manifiestos y se asignan los conductores y los pedidos