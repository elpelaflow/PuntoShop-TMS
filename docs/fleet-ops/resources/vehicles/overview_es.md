---
Título: Vehículos
URL: https://fleetbase.io/docs/fleet-ops/resources/vehicles/overview
Módulo: fleet-ops
---

Vehículos

# Vehículos

Registre y gestione su flota de vehículos: detalles, asignaciones, capacidad, seguimiento y historial de mantenimiento.

# Vehículos

**Vehículos**
son activos de flota equipados para realizar tareas. Cada registro de vehículo almacena detalles físicos, especificaciones de capacidad, ubicación en tiempo real y enlaces al conductor, horarios de mantenimiento, dispositivos conectados, equipos directamente conectados y remolques actualmente conectados.

![Lista de vehículos — matrícula, marca y modelo, estado, indicador de conexión, conductor asignado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-vehicles-list.3ba9798b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

![Reproducción de la posición del vehículo — la ruta reciente del vehículo en el mapa en vivo con el control deslizante de la línea de tiempo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-vehicle-positions.3f9d43cb.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos del vehículo

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre de visualización del vehículo (por ejemplo, *Furgoneta 01*) |
| **ID interno** | Su ID de referencia externo para el vehículo |
| **Descripción** | Descripción de texto libre |
| **Marca / Modelo / Tipo de modelo / Año** | Información del fabricante |
| **Color** | Color del vehículo |
| **Acabado / Transmisión** | Nivel de acabado y tipo de transmisión |
| **Tipo de carrocería / Subtipo de carrocería / Clase / Tipo** | Clasificación del vehículo (por ejemplo, *Sedán / 4 puertas / Pasajero / coche*) |
| **Número de matrícula** | Matrícula |
| **VIN** | Número de identificación del vehículo |
| **Datos del VIN** | Información del VIN descodificada (del servicio de búsqueda de VIN) |
| **Nombre de llamada** | Nombre de llamada de radio o de despacho |
| **Número de serie** | Número de serie del fabricante, cuando corresponda |
| **Tipo de uso** | Comercial, personal, etc. |
| **Tipo de propiedad** | Propio, arrendado, financiado |
| **Tipo de combustible** | Gasolina, diésel, eléctrico, híbrido, etc. |
| **Unidad de volumen de combustible** | Unidad utilizada en los informes de combustible (litros, galones) |
| **Odómetro / Unidad del odómetro / Odómetro en la compra** | Kilometraje actual y de inicio con unidad |
| **Sistema de medición** | Métrico o imperial — determina la interpretación de la unidad en el registro |
| **Capacidad de carga** | Peso máximo de la carga ( `payload_capacity` ). La unidad sigue las unidades de peso del organismo que usted introduce. |
| **Volumen de la capacidad de carga** | Volumen máximo de la carga ( `payload_capacity_volume` ). La unidad sigue las dimensiones del organismo que usted establece. |
| **Estado de financiación / Número de préstamos / Primer pago del préstamo** | Detalles de financiación para vehículos arrendados o financiados |
| **Estado** | activo, inactivo, mantenimiento, sin conexión |
| **Conectado** | Si el vehículo está informando su ubicación actualmente |
| **Ubicación / Velocidad / Dirección / Altitud** | Posición GPS en tiempo real y datos de movimiento |
| **URL de avatar / Foto** | Foto o icono del vehículo |
| **Proveedor** | Transportista o proveedor al que pertenece el vehículo (opcional) |
| **Categoría / Garantía** | Registros de categoría y garantía vinculados |

## Estados del vehículo

| Estado | Significado |
|---|---|
| `active` | Disponible para asignación |
| `inactive` | No está actualmente en servicio |
| `maintenance` | En mantenimiento — excluido de Orchestrator |
| `offline` | No está informando su ubicación — puede estar fuera del área de servicio |

## Crear un vehículo

Navegue a
**Fleet-Ops → Recursos → Vehículos**
.

Haga clic en
**Nuevo vehículo**
.

Introduzca los detalles del vehículo: nombre, marca, modelo, año, número de matrícula y VIN.

Establezca
**`payload_capacity`**
(peso) y
**`payload_capacity_volume`**
si desea que Orchestrator aplique límites de carga. Utilice unidades consistentes con las que introduce las unidades de peso y dimensiones del organismo.

Asigne el vehículo a un
**Conductor**
si existe un conductor predeterminado para este vehículo.

Sube una foto o seleccione un icono de avatar.

Haga clic en
**Guardar**
.

## Panel de detalles del vehículo

Haga clic en cualquier fila de vehículo para abrir el panel de detalles, que incluye:

* **Resumen**
  — todos los atributos del vehículo y la asignación actual
* **Mapa**
  — posición actual en tiempo real
* **Posiciones**
  — historial de seguimiento GPS con reproducción de posición
* **Dispositivos**
  — GPS, escáner OBD-II, cámaras, sensores conectados
* **Remolques**
  — conexiones de activos remolcados activos, con controles de enganche y desenganche
* **Equipos**
  — equipos auxiliares conectados directamente al vehículo
* **Programas**
  — horarios de mantenimiento vinculados a este vehículo
* **Órdenes de trabajo**
  — órdenes de trabajo abiertas y completadas
* **Mantenimiento**
  — historial completo de mantenimiento
* **Inspecciones**
  — cada inspección registrada contra el vehículo, con su resultado y comprobaciones fallidas (ver
  [Inspecciones](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/overview)
  )

## Asignación de flota

Los vehículos pueden pertenecer a una o más
**Flotas**
. La pertenencia a la flota determina qué vehículos considera el Orchestrator al asignar órdenes a un grupo de trabajo específico.

Para añadir un vehículo a una flota:

1. Abra el registro de la flota →
   **Vehículos**
   tab → haga clic en
   **Añadir vehículo**
2. O abra el registro del vehículo →
   **Flotas**
   tab → haga clic en
   **Añadir a la flota**

## Páginas relacionadas

* [Capacidad y carga](https://fleetbase.io/docs/fleet-ops/resources/vehicles/capacity-and-payload)
  — configure límites de peso y volumen
* [Seguimiento](https://fleetbase.io/docs/fleet-ops/resources/vehicles/tracking)
  — posición en tiempo real e historial de posición
* [Remolques](https://fleetbase.io/docs/fleet-ops/resources/trailers/overview)
  — activos remolcados de primera clase e historial de conexión
* [Mantenimiento](https://fleetbase.io/docs/fleet-ops/maintenance/overview)
  — horarios y órdenes de trabajo
* [Inspecciones](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/overview)
  — inspecciones del vehículo y seguimiento de comprobaciones fallidas
* [Conectividad](https://fleetbase.io/docs/fleet-ops/connectivity/overview)
  — dispositivos y sensores de telemetría