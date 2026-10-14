---
title: "Equipamiento"
url: https://fleetbase.io/docs/fleet-ops/maintenance/equipment/overview
module: fleet-ops
---

Equipamiento

# Equipamiento

Realice un seguimiento del equipamiento auxiliar asociado a vehículos o remolques, con programas de mantenimiento, órdenes de trabajo y cobertura de garantía.

# Equipamiento

**Equipamiento**
Realice un seguimiento de las herramientas auxiliares, componentes montados y equipos proporcionados que requieren sus propios programas de mantenimiento y órdenes de trabajo. El equipamiento puede asociarse a un vehículo, remolque o conductor y participa en el mismo flujo de trabajo de mantenimiento que estos recursos. Las unidades transportables como camiones refrigerados, remolques, plataformas y chasis son de primera categoría
[Remolques](https://fleetbase.io/docs/fleet-ops/resources/trailers/overview)
, no equipamiento.

![Lista de equipamiento — nombre, categoría, vehículo asignado, estado, próxima fecha de mantenimiento](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-equipment-list.87d5fbc1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Qué cubre el equipamiento?

El equipamiento en Fleet-Ops incluye:

* **Accesorios**
  — elevadores, puertas de carga, grúas, bombas y rampas
* **Herramientas**
  — carros de entrega, transpaletas, escáneres
* **Equipamiento motorizado**
  — generadores, unidades de refrigeración

Cualquier cosa que:

1. Tiene sus propios intervalos de servicio (independientemente del vehículo)
2. Requiere órdenes de trabajo para reparaciones e inspecciones
3. Tiene una garantía que debe ser rastreada

## Atributos del equipamiento

| Campo | Descripción |
|---|---|
| **Nombre** | Identificador del equipamiento (p. ej., "Transpaleta 12") |
| **Categoría** | Tipo de equipamiento |
| **Descripción** | Descripción detallada |
| **Número de serie** | Número de serie del fabricante |
| **Estado** | activo, inactivo, mantenimiento, retirado |
| **Recurso asociado** | Vehículo, remolque o conductor al que está actualmente asociado o se ha asignado el equipamiento |

![Panel de detalles del equipamiento — código, tipo y número de serie, fabricante y modelo, el vehículo al que está equipado, y precio de compra y depreciación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-equipment-details.031b79dd.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Creación de equipamiento

Navegue a
**Fleet-Ops → Mantenimiento → Equipamiento**
.

Haga clic en
**Nuevo equipamiento**
.

Ingrese el
**Nombre**,
**Categoría**
y
**Descripción**.

Establezca el
**Número de serie**
para la identificación.

Asigne a un
**Vehículo**,
**Remolque**
o
**Conductor**
si el equipamiento está actualmente asociado o asignado.

Haga clic en
**Guardar**.

## Mantenimiento del equipamiento

El equipamiento participa en el mismo flujo de trabajo de mantenimiento que los vehículos:

* Cree
  **Programas de mantenimiento**
  para el equipamiento (p. ej., servicio de la unidad de refrigeración cada 500 horas)
* Se generan
  **Órdenes de trabajo**
  cuando se alcanzan los umbrales
* Se registra la
  **Historial de mantenimiento**
  para registrar todos los servicios realizados

Acceda a estos desde las pestañas del panel de detalles del equipamiento:
**Programas**,
**Órdenes de trabajo**,
**Mantenimiento**.

## Seguimiento de la garantía

El equipamiento puede tener un
**Registro de garantía**
que rastrea:

* Proveedor de la garantía y número de póliza
* Fechas de inicio y fin de la cobertura
* Componentes cubiertos
* Historial de reclamaciones de garantía

Cuando una garantía está a punto de expirar, Fleet-Ops puede configurarse para enviar una notificación de recordatorio.