---
título: "Configuración del Orchestrator"
url: https://fleetbase.io/docs/fleet-ops/settings/orchestrator
módulo: fleet-ops
---

# Configuración del Orchestrator

Configure el motor Orchestrator predeterminado, los disparadores de asignación automática, las restricciones de asignación globales y la visualización de campos en la tarjeta de pedido.

# Configuración del Orchestrator

**Configuración del Orchestrator**
controla los valores predeterminados para
[Orchestrator](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
— que motor utilizan por defecto las nuevas fases, si los nuevos pedidos se asignan automáticamente, y las restricciones globales que se aplican en cada ejecución del Orchestrator.

Navegue a
**Fleet-Ops → Configuración → Orchestrator**
.

![Panel de configuración del Orchestrator — motor activo, interruptores de asignación automática, restricciones de asignación y campos de la tarjeta](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orchestrator-settings.e02fd0e4.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Configuración del motor

| Configuración | Descripción |
|---|---|
| **Motor activo** | El motor predeterminado utilizado al añadir una nueva fase en el Workbench. Los motores registrados en `OrchestrationEngineRegistry` aparecen en este menú desplegable, al menos `Greedy (incorporado)` y `VROOM` están disponibles de forma predeterminada; las extensiones pueden registrar más. |
| **Asignación automática al crear** | Cuando está habilitado, cada nuevo pedido se ejecuta a través de un paso automático del Orchestrator para la asignación. Útil para operaciones de alto volumen que desean una asignación sin intervención. |
| **Reasignación automática al completar** | Cuando está habilitado, completar un pedido desencadena un paso del Orchestrator para que el conductor afectado reequilibre su trabajo restante. Útil para operaciones en las que el plan necesita adaptarse a medida que se completan los pedidos. |

Ambos interruptores de asignación automática activan el motor activo utilizando una configuración de fase predeterminada. Para tener más control sobre lo que se ejecuta automáticamente, desactívelos y ejecute el Orchestrator manualmente desde el Workbench (o inicie una ejecución a través de la API en un horario).

## Restricciones de asignación

Estas restricciones se aplican globalmente a cada ejecución del Orchestrator y se respetan por todos los motores.

| Configuración | Descripción |
|---|---|
| **Tiempo máximo de viaje** | Tiempo máximo de conducción (en segundos) que el Orchestrator planificará en la ruta de un conductor. Los pedidos que excedan este límite se devolverán al grupo de pedidos no asignados. |
| **Equilibrar la carga de trabajo** | Intenta distribuir los pedidos de forma uniforme entre los conductores/vehículos disponibles, en lugar de asignar los más eficientes de forma prioritaria. Equivalente a habilitar la configuración predeterminada de *Equilibrar la carga de trabajo* por fase. |

Restricciones específicas del motor:
*respetar habilidades*,
*respetar capacidad*,
*regresar al depósito*
— se configuran por fase en el [Constructor de fases](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/workbench) del Workbench, no a nivel global aquí.

## Campos de la tarjeta de pedido

El Workbench de Orchestrator renderiza cada pedido como una tarjeta en el grupo de pedidos y en la vista del Plan. El
**Panel de campos de la tarjeta**
le permite elegir qué campos se muestran en esas tarjetas. Puede configurar:

* Un conjunto de campos
  **estándar**
  utilizado por defecto
* Una
  **configuración específica para cada pedido**
  — campos diferentes para cada tipo de pedido
* Un conjunto de campos
  **de metadatos**
  para mostrar campos personalizados

Reduzca los campos visibles a lo que realmente necesita ver sus despachadores en pantalla: menos campos por tarjeta significa que se pueden mostrar más pedidos en el Workbench a la vez.

## Aplicar la configuración

Haga clic en
**Guardar cambios**
después de editar. La configuración actualizada se aplicará a la siguiente ejecución del Orchestrator; las ejecuciones en curso no se verán afectadas.