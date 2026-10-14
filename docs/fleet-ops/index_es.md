---
título: "Fleet-Ops"
url: https://fleetbase.io/docs/fleet-ops
módulo: fleet-ops
---

# Fleet-Ops

Fleet-Ops es la extensión principal de logística y gestión de flotas para la plataforma Fleetbase. Proporciona a los equipos de operaciones una consola de gestión completa para administrar pedidos, conductores, vehículos, remolques de primera calidad y rutas, además de una aplicación móvil para conductores (Navigator) que gestiona el seguimiento GPS en tiempo real, la navegación paso a paso y la captura de comprobantes de entrega.

![Orden multi-punto de Fleet-Ops mostrando una ruta optimizada a través de múltiples paradas con asignación de conductor y línea de tiempo de estado en vivo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-details-multi-stop.270a4b7a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Qué hace Fleet-Ops?

Fleet-Ops cubre todo el ciclo de vida de la entrega y las operaciones de la flota en un solo lugar:

| Capacidad | ¿Qué cubre? |
|---|---|
| **Gestión de pedidos** | Crear, asignar, enviar y rastrear entregas de principio a fin |
| **Mapa en vivo** | Posición en tiempo real de conductores y vehículos con superposición de rutas |
| **Aplicación para conductores (Navigator)** | Aplicación móvil para conductores: navegación, actualizaciones de estado, captura de comprobantes de entrega |
| **Gestión de flotas y conductores** | Organizar conductores y vehículos en flotas, realizar un seguimiento de la disponibilidad y el estado |
| **Gestión de remolques** | Gestionar activos remolqueables, conexiones con vehículos, equipos, mantenimiento, dispositivos y telemetría |
| **Orchestrador** | Planificador de múltiples fases: asignar vehículos, asignar conductores y optimizar rutas en secuencia |
| **Programador** | Programación de turnos para conductores y gestión de la línea de tiempo de pedidos |
| **Configuración de pedidos** | Tipos de pedidos personalizados con flujos de trabajo configurables y campos de entidades |
| **Tarifas y presupuestos** | Reglas de precios y presupuestos bajo demanda para pedidos |
| **Mantenimiento** | Programas de mantenimiento preventivo, órdenes de trabajo y inventario de piezas |
| **Telemetría y conectividad** | Integración de dispositivos, sensores y módems de telemetría |
| **Análisis** | Paneles de rendimiento de la flota y informes personalizados |

## Conceptos clave

Fleet-Ops está organizado en torno a algunas entidades principales:

* **Pedido**
  — Una tarea de entrega o servicio con una ubicación de recogida, un destino y elementos (entidades). Los pedidos se mueven a través de un ciclo de vida de estado configurable y se registran con un comprobante de entrega.
* **Conductor**
  — Una persona que ejecuta pedidos utilizando la aplicación Navigator. Los conductores tienen una ubicación en tiempo real, horarios de trabajo y restricciones de habilidades que utiliza el Orchestrator para la asignación.
* **Vehículo**
  — Un activo de la flota con capacidad, seguimiento de la ubicación e historial de mantenimiento.
* **Remolque**
  — Un activo remolqueable gestionado de forma independiente con conexiones de vehículos con fecha efectiva, equipos, mantenimiento y telemetría.
* **Flota**
  — Un grupo lógico de conductores y vehículos, normalmente delimitado a una ruta, una región o un tipo de servicio.
* **Configuración de pedidos**
  — Una plantilla que define un tipo de pedido personalizado: su flujo de actividad, los campos de entidad requeridos y el método de comprobante de entrega.

Consulte
[Conceptos clave](https://fleetbase.io/docs/fleet-ops/getting-started/core-concepts)
para una introducción completa.

## Cómo empezar

Comience a utilizarlo

Cree su primer pedido, asigne un conductor y envíe en menos de 10 minutos.

[Guía rápida →](https://fleetbase.io/docs/fleet-ops/getting-started/quickstart)

Comprenda lo básico

Aprenda sobre las entidades clave: pedidos, conductores, vehículos, flotas y configuraciones de pedidos.

[Conceptos clave →](https://fleetbase.io/docs/fleet-ops/getting-started/core-concepts)

Configure la aplicación para conductores

Instale Navigator y conecte a los conductores antes de su primer envío.

[Configuración de Navigator →](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)

Fleet-Ops viene preinstalado con cada instancia de Fleetbase, tanto en la nube como en modo autónomo. No es necesario una instalación separada. Si necesita configurar la plataforma Fleetbase, consulte
[Ejecución local](https://fleetbase.io/docs/platform/quickstart/running-locally)
o
[Implementación en la nube](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)
.