---
título: "Visión general de los pedidos"
url: https://fleetbase.io/docs/fleet-ops/operations/orders/overview
módulo: fleet-ops
---

Pedidos

# Visión general de los pedidos

Aprenda cómo funcionan los pedidos en Fleet-Ops: creación, estructura de la carga, asignación, envío y finalización.

# Visión general de los pedidos

Un
**pedido**
es la unidad de trabajo fundamental en Fleet-Ops. Representa una tarea de entrega, un trabajo de servicio o cualquier actividad enviada que su flota necesita completar. Los pedidos se crean en la consola (o a través de la API), se asignan a los conductores, se envían a la aplicación Navigator y se completan con la prueba de entrega.

![Lista de pedidos — pestañas de filtro de estado, barra de búsqueda, filas de pedido con insignias de estado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orders-list.285cf95b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Estructura del pedido

Cada pedido tiene:

* **Configuración del pedido**
  — el modelo que define el flujo de trabajo, los campos de la entidad y el método de prueba de entrega
* **Carga**
  — la ubicación de recogida, la ubicación de entrega, los artículos (entidades) y puntos de referencia opcionales
* **Conductor**
  — el conductor asignado para ejecutar el pedido
* **Vehículo**
  — el vehículo asignado al pedido
* **Estado**
  — la etapa actual del ciclo de vida
* **Número de seguimiento**
  — un identificador único (con código de barras y código QR) para el pedido
* **Prueba de entrega**
  — evidencia capturada cuando se completa el pedido

### Estructura de la carga

La carga adjunta a un pedido contiene:

| Componente | Descripción |
|---|---|
| **Recogida** | Ubicación de origen donde se recolectan los artículos |
| **Entrega** | Destino de entrega principal |
| **Devolución** | Dirección de devolución opcional al remitente si la entrega falla |
| **Entidades** | Artículos individuales que se transportan (cada uno con su propio número de seguimiento) |
| **Puntos de referencia** | Paradas intermedias para rutas de múltiples entregas |
| **Monto del pago en efectivo** | Dinero a cobrar al destinatario en la entrega |
| **Método de pago** | Términos de pago para el pedido |

### Entidades

Las entidades son los paquetes o artículos individuales dentro de una carga. Cada entidad admite:

* **Descripción**
  y
  **SKU/código de barras**
  para la identificación del artículo
* **Dimensiones**
  (longitud, ancho, altura) y
  **peso**
* **Sobreescritura de destino**
  — para pedidos con múltiples paradas, asignar un artículo específico a un punto de referencia específico
* **Campos personalizados**
  — definidos por la configuración del pedido
* **Seguimiento de la actividad**
  — cada entidad rastrea sus propias actividades (por ejemplo,
  *recogido*,
  *en tránsito*,
  *entregado*) definidas por el flujo de actividad del pedido
* **Adjuntar prueba**
  — foto o firma por artículo

## Lista de pedidos

La lista de pedidos (
**Operaciones → Pedidos**
) muestra todos los pedidos con:

* Pestañas de filtro de estado para los estados del sistema:
  **Todos, Creado, Enviado, Iniciado, Completado, Cancelado**
* Búsqueda por ID de pedido, cliente, conductor o dirección
* Ordenar por fecha, estado o conductor
* Acciones en lote (asignar, enviar, cancelar, exportar)

Haga clic en cualquier fila de pedido para abrir el panel de detalles.

## Panel de detalles del pedido

El panel de detalles del pedido muestra la información completa del pedido:

* Cliente y facilitador
* Mapa de recogida y entrega
* Conductor y vehículo asignados con la ubicación actual
* Cronología de la actividad (cada etapa de estado con la marca de tiempo)
* Lista de entidades con estados individuales
* Archivos de prueba de entrega (firmas, fotos)
* Presupuesto de servicio y detalles de la transacción
* Información de ruta y ETA

Desde el panel de detalles puede: editar el pedido, asignar/reasignar un conductor, enviarlo, cancelarlo o añadir notas.

## Páginas relacionadas

* [Ciclo de vida del pedido](https://fleetbase.io/docs/fleet-ops/operations/orders/order-lifecycle)
  — los cinco estados del sistema y cómo funciona el flujo de actividad dentro de ellos
* [Gestionar pedidos](https://fleetbase.io/docs/fleet-ops/operations/orders/managing-orders)
  — crear, editar, asignar y enviar
* [Programar pedidos](https://fleetbase.io/docs/fleet-ops/operations/orders/scheduling-orders)
  — programar para una fecha y hora específicas
* [Prueba de entrega](https://fleetbase.io/docs/fleet-ops/operations/orders/proof-of-delivery)
  — firma, foto y captura de código QR
* [Seguimiento](https://fleetbase.io/docs/fleet-ops/operations/orders/tracking)
  — mapa en vivo y seguimiento del ETA
* [Tablero Kanban](https://fleetbase.io/docs/fleet-ops/operations/orders/kanban-board)
  — vista de columna de estado visual