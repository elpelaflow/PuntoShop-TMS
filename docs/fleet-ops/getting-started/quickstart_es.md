---
Título: Guía de inicio rápido
URL: https://fleetbase.io/docs/fleet-ops/getting-started/quickstart
Módulo: fleet-ops
---

# Guía de inicio rápido

Comience a utilizar Fleet-Ops en minutos: cree su primer pedido, asigne un conductor y envíelo.

# Guía de inicio rápido

Esta guía le guiará en la creación de su primer pedido en Fleet-Ops, en la asignación a un conductor y en el envío a la aplicación Navigator. Asume que Fleet-Ops está instalado y que tiene al menos una cuenta de conductor configurada.

## Requisitos previos

* Al menos un conductor creado en
  **Fleet-Ops → Recursos → Conductores**
* La aplicación Navigator instalada en el teléfono del conductor (ver
  [Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
  )

## Paso 1: Abrir Fleet-Ops

Haga clic en
**Fleet-Ops**
en la barra de navegación superior de la consola Fleetbase. Se abrirá el panel de control de Fleet-Ops, mostrando el mapa en vivo y la barra lateral de operaciones.

![Panel principal de Fleet-Ops con mapa en vivo y navegación de barra lateral](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orders-map.80724e10.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Paso 2: Crear un nuevo pedido

### Abrir la lista de pedidos

En la barra lateral izquierda, haga clic en
**Operaciones → Pedidos**
. Esto muestra todos los pedidos existentes con su estado actual.

### Hacer clic en "Nuevo pedido"

Haga clic en el botón
**+ Nuevo pedido**
en la esquina superior derecha. Se abrirá el formulario de nuevo pedido.

![Formulario de nuevo pedido: selector de configuración de pedido, cliente, recogida, entrega, programación y campos de entidad](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-create.8a3ff08a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Seleccionar una configuración de pedido

Elija una
**Configuración de pedido**
en el menú desplegable. La configuración de pedido determina los pasos del flujo de trabajo, los campos de la entidad y el método de prueba de entrega para este pedido. Para una entrega básica, seleccione la configuración predeterminada
**Entrega**.

### Establecer la recogida y la entrega

Introduzca la
**Dirección de recogida**
(donde el conductor recoge el artículo) y la
**Dirección de entrega**
(donde se entrega). Puede escribir una dirección para la geolocalización, o seleccionar un lugar guardado.

### Añadir entidades (opcional)

Las entidades son los artículos individuales que se entregan. Haga clic en
**Añadir entidad**
para adjuntar un artículo con una descripción, código de barras, dimensiones y peso. Cada entidad tiene su propio número de seguimiento.

### Guardar el pedido

Haga clic en
**Guardar**
. El pedido se crea con el estado del sistema
**`creado`**
y aparece en la lista de pedidos.

## Paso 3: Asignar un conductor

### Abrir el detalle del pedido

Haga clic en la fila del pedido en la lista para abrir el panel de detalle del pedido.

### Asignar conductor y vehículo

En el panel de detalle, haga clic en
**Asignar conductor**
. Seleccione un conductor de la lista de conductores disponibles. Opcionalmente, asigne un vehículo.

El conductor y el vehículo están ahora vinculados al pedido. El estado del sistema del pedido permanece
**`creado`**
hasta que lo envía, pero la asignación por sí sola no cambia el estado del sistema.

## Paso 4: Enviar

### Enviar el pedido

Con el detalle del pedido abierto, haga clic en
**Enviar**
. Esto envía el pedido a la aplicación Navigator del conductor.

El estado del pedido cambia a
**enviado**
.

### El conductor acepta en la aplicación Navigator

El conductor recibe una notificación push en la aplicación Navigator. Cuando lo acepta y comienza el pedido, el estado cambia a
**comenzado**
y su ubicación en vivo aparece en el mapa.

## Paso 5: Rastrear el progreso

Abra
**Operaciones → Pedidos**
y haga clic en el pedido, o haga clic en el marcador del conductor en el mapa en vivo. El panel de detalle del pedido muestra:

* La ubicación actual del conductor y el tiempo estimado de llegada
* Historial de actividad (cada transición de estado con la marca de tiempo)
* Prueba de entrega cuando se captura

![Panel de detalle del pedido: línea de tiempo de actividad que muestra cada evento del ciclo de vida con marcas de tiempo y la ubicación en vivo del conductor](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-track-order.aa9cff9f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El pedido pasa al estado
**`completado`**
cuando el conductor activa la actividad que tiene la
`completado`
establecida en el flujo de actividad de la
[configuración del pedido](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
— normalmente la actividad que captura la prueba de entrega (firma, foto o escaneo de código QR) y marca el pedido como entregado en la aplicación Navigator.

## Próximos pasos

* [Conceptos básicos](https://fleetbase.io/docs/fleet-ops/getting-started/core-concepts)
  — comprenda cómo se relacionan los pedidos, los conductores, los vehículos y las flotas
* [Configuraciones de pedido](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
  — personalice los tipos de pedido y los flujos de trabajo
* [Orchestrador](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
  — automatice la asignación por lotes y la optimización de rutas
* [Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
  — guía completa de configuración de la aplicación para el conductor