---
title: "Gestionar Órdenes"
url: https://fleetbase.io/docs/fleet-ops/operations/orders/managing-orders
module: fleet-ops
---

Órdenes

# Gestión de Órdenes

Cree, edite, asigne, envíe y gestione las órdenes desde la lista y las vistas de detalles de "Órdenes" de Fleet-Ops.

# Gestión de Órdenes

Esta página cubre las operaciones diarias para gestionar las órdenes en el panel de Fleet-Ops: crear nuevas órdenes, asignar conductores, enviarlas y gestionar excepciones.

## Crear una Orden

### Navegue a "Operaciones" → "Órdenes"

Haga clic en
**Fleet-Ops**
en la barra de navegación superior, luego en
**"Operaciones" → "Órdenes"**
en la barra lateral.

### Haga clic en "Nueva Orden"

Haga clic en
**"Nueva Orden"**
. Se abrirá el formulario de nueva orden.

![Formulario de nueva orden — selector de configuración de orden, cliente, recogida, entrega, programación y campos de entidad](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-create.8a3ff08a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Seleccione una Configuración de Orden

Elija la
**Configuración de Orden**
que coincida con el tipo de entrega. La configuración determina los pasos del flujo de trabajo, los campos de entidad requeridos y el método de comprobación de entrega.

### Establezca el cliente (opcional)

Seleccione o cree un
**Cliente**
de contacto. El cliente es el destinatario de la orden, utilizado para notificaciones y el acceso a la página de seguimiento.

### Introduzca la recogida y la entrega

Introduzca la dirección de
**Recogida**
(donde se originan los artículos) y la dirección de
**Entrega**
(destino de entrega principal). Puede:

* Escribir una dirección y seleccionar sugerencias del codificador de direcciones
* Seleccionar un Lugar guardado de su biblioteca de Lugares
* Marcar un punto en el mapa

Para órdenes con múltiples paradas, agregue
**Puntos de parada**
usando el botón
**"Añadir Punto de Parada"**
.

### Añada Entidades (opcional)

Haga clic en
**Añadir Entidad**
para adjuntar artículos a la orden. Cada entidad puede tener:

* Descripción y SKU/código de barras
* Cantidad
* Dimensiones (largo, ancho, alto) y peso
* Un punto de parada de destino (para entregas múltiples)
* Campos personalizados definidos por la Configuración de Orden

Cada entidad recibe automáticamente su propio número de seguimiento.

### Establezca la programación (opcional)

Haga clic en
**Programado**
y establezca la fecha y hora de recogida si la orden no debe enviarse inmediatamente.

### Añada notas y metadatos

Añada cualquier
**Nota**
visible para el conductor y los operadores, y un
**ID interno**
para la referencia cruzada con su sistema externo.

### Guardar

Haga clic en
**Guardar**
. La orden se crea con el estado
**`creada`**
. Si se han establecido una fecha y hora de programación, la orden permanece en
`creada`
hasta que la envíe.

## Asignar un Conductor

Para asignar un conductor manualmente:

Abra el detalle de la orden haciendo clic en la fila de la orden.

Haga clic en
**Asignar Conductor**
en el panel de detalles.

Seleccione un conductor de la lista de conductores disponibles. Opcionalmente, seleccione un vehículo.

Haga clic en
**Asignar**
. El conductor y el vehículo están ahora vinculados a la orden. El estado del sistema de la orden permanece
**`creada`**
hasta que se envía — la asignación por sí sola no cambia el estado del sistema.

Para la asignación masiva a través de múltiples órdenes, utilice el
[Orchestrador](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
.

## Enviar una Orden

Una vez que se ha asignado un conductor, envíe la orden a la aplicación Navigator del conductor:

Abra el detalle de la orden.

Haga clic en
**Enviar**
. Un cuadro de diálogo de confirmación muestra el nombre del conductor y el vehículo.

Confirme el envío. El estado de la orden pasa de
**`creada`**
a
**`enviada`**
y el conductor recibe una notificación push.

Puede enviar inmediatamente después de asignar un conductor, o mantener la orden en estado
`creada`
hasta que esté listo para enviarla al conductor.

## Editar una Orden

La edición de órdenes se divide en dos botones distintos en el panel de detalles:
**Editar**
y
**Editar Ruta**
. Se abren diferentes superficies porque afectan diferentes partes de la orden.

### Editar Detalles

Haga clic en
**Editar**
en el panel de detalles de la orden para abrir el formulario
**Editar Orden**
. Esta superficie cubre todo lo que no es la geometría de la ruta:

* Cliente y asignación de facilitador
* Asignación de conductor y vehículo
* Fecha/hora programada y ventana de tiempo
* Campos personalizados de la Configuración de Orden y campos de entidad
* Notas y ID interno
* Tasa de servicio / ajustes de pago

### Editar Ruta

Haga clic en
**Editar Ruta**
para abrir el
**Editor de Ruta de la Orden**
. Esta es una superficie basada en mapas para cambiar la recogida, la entrega y los puntos de parada de la orden, incluyendo la reordenación de paradas y la re-ejecución de la optimización.

![Editor de ruta de la orden — lista de recogida, entrega y puntos de parada con mapa para reordenar y editar paradas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-route-editor.827c67fa.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Desde el editor de ruta puede:

* Añadir, eliminar o reordenar puntos de parada
* Reemplazar la recogida o la entrega con una dirección o Lugar diferente
* Re-ejecutar
  **Optimización de Ruta**
  para calcular la secuencia de paradas óptima

![Optimización de la ruta de la orden — puntos de parada reordenados con polilínea optimizada en el mapa](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-route-optimization.9473d02a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Editar la ruta en una orden enviada o iniciada recalcula la ruta y puede requerir el re-envío. El conductor es notificado sobre los cambios de ruta.

## Acciones Masivas

Desde la lista de órdenes, seleccione múltiples órdenes utilizando las casillas, luego utilice el menú de acciones masivas para:

* **Asignar**
  — asignar todas las órdenes seleccionadas a un conductor a la vez
* **Enviar**
  — enviar todas las órdenes asignadas simultáneamente
* **Cancelar**
  — cancelar múltiples órdenes con una razón única
* **Exportar**
  — exportar las órdenes seleccionadas a CSV

## Cancelar una Orden

Abra el detalle de la orden y haga clic en
**Cancelar Orden**
. Introduzca una razón de cancelación opcional. El estado pasa a
**`cancelada`**
y:

* Se notifica al conductor (si ya se ha enviado)
* Se activa un evento de webhook de cancelación (
  `order.canceled`
  )
* La orden permanece en la lista para fines de auditoría

## Filtros y Búsqueda de Órdenes

Haga clic en el icono
**Filtros**
en la barra de herramientas de la lista de órdenes para abrir el panel de filtros completo. Aplique cualquier combinación, luego haga clic en
**Aplicar**
(o
**Borrar**
para restablecer).

| Filtro | ¿Qué coincide? |
|---|---|
| **ID** | Coincide con el ID público de la orden (por ejemplo, `order_qT4zTdE…`) |
| **ID Interno** | Coincide con su referencia `internal_id` |
| **ID de Payload** | Coincide con un UUID de Payload específico |
| **Conductor Asignado** | Órdenes asignadas a un conductor específico |
| **Recogida** | Órdenes con una dirección de recogida específica |
| **Entrega** | Órdenes con una dirección de entrega específica |
| **Cliente** | Órdenes para un contacto de cliente específico |
| **Vehículo Asignado** | Órdenes asignadas a un vehículo específico |
| **Facilitador** | Órdenes asociadas con un facilitador |
| **Programado a** | Filtra por la fecha y hora de `scheduled_at` |
| **Seguimiento** | Coincide con un número de seguimiento |
| **Tipo** | Filtra por la Configuración de Orden |
| **Estado** | Filtra por el estado del sistema — Creado, Enviado, Iniciado, Completado, Cancelado |
| **Creado** / **Actualizado** | Filtra por la fecha de creación / actualización (`created_at` / `updated_at`) |
| **Creado por** / **Actualizado por** | Filtra por el usuario que creó o actualizó la orden |
| **Sin Conductor Asignado** | Cambia para mostrar solo las órdenes que no tienen conductor asignado |

Utilice la barra de búsqueda en la parte superior del panel de filtros para realizar una búsqueda de texto libre en el ID de la orden, el nombre del cliente, el nombre del conductor y la dirección.

## Exportar Órdenes

Haga clic en
**Exportar**
en la lista de órdenes para descargar un CSV de todas las órdenes que coincidan con el filtro actual. Los exportados incluyen todos los campos de la orden, los detalles del cliente y el historial de estado.