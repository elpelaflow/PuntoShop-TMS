---
title: "Flotas"
url: https://fleetbase.io/docs/fleet-ops/resources/fleets/overview
module: fleet-ops
---

Flotas

# Flotas

Organice a los conductores y los vehículos en flotas con nombre: agrupe por zona, tipo de servicio o turno para una asignación y planificación optimizadas.

# Flotas

Una
**Flota**
es un grupo lógico de conductores y vehículos. Las flotas le permiten organizar su operación por ruta, área de servicio, tipo de servicio, horario o cualquier otra dimensión que tenga sentido para su negocio. El Orchestrator utiliza la pertenencia a la flota para determinar qué conductores y vehículos se consideran al asignar pedidos.

![Lista de flotas — nombre de la flota, indicador de color, número de conductores, número de vehículos y etiquetas de estado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-fleets-list.43a99ddb.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos de la flota

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre de la flota (p. ej., "Metro North", "Entrega Express") |
| **Color** | Codificación de color para la visualización en el mapa |
| **Tarea** | Etiqueta opcional que describe el propósito de la flota (p. ej., "Entrega el mismo día") |
| **Área de servicio** | Zona geográfica en la que opera esta flota |
| **Zona** | Subzona dentro del área de servicio |
| **Proveedor** | Transportista/proveedor que posee esta flota (opcional) |
| **Flota padre** | Flota padre para la organización jerárquica |
| **Estado** | Activa o inactiva |

## Métricas en tiempo real

Cada tarjeta de flota muestra los recuentos en tiempo real:

* **Conductores**
  — número total de conductores en la flota
* **Conductores en línea**
  — conductores actualmente activos en Navigator
* **Vehículos**
  — número total de vehículos en la flota
* **Vehículos en línea**
  — vehículos que están reportando su ubicación actualmente

## Crear una flota

Vaya a
**Flotas → Recursos → Flotas**
.

Haga clic en
**Nueva flota**
.

Establezca el
**Nombre**
,
**Color**
y, opcionalmente, la
**Tarea**
.

Establezca el
**Área de servicio**
y
**Zona**
para definir geográficamente la flota.

Haga clic en
**Guardar**
. Se crea la flota vacía: agregue conductores y vehículos a continuación.

## Agregar conductores a una flota

1. Abra el registro de la flota y haga clic en la pestaña
   **Conductores**
2. Haga clic en
   **Agregar conductor**
   y seleccione del listado de conductores
3. Los conductores pueden pertenecer a múltiples flotas

O desde el registro del conductor:

1. Abra
   **Flotas → Recursos → Conductores → [Conductor]**
2. Haga clic en la pestaña
   **Flotas** →
   **Agregar a la flota**

## Agregar vehículos a una flota

1. Abra el registro de la flota y haga clic en la pestaña
   **Vehículos**
2. Haga clic en
   **Agregar vehículo**
   y seleccione del listado de vehículos
3. Los vehículos pueden pertenecer a múltiples flotas

## Flotas jerárquicas

Las flotas admiten una jerarquía padre-hijo. Por ejemplo:

```
Flota Metropolitana
  ├─ Metro North
  ├─ Metro Central
  └─ Metro South
```

Establezca el campo
**Flota padre**
al crear una subflota. La flota padre muestra los recuentos agregados (conductores, vehículos) de todas las subflotas.

## Cómo se utilizan las flotas en la asignación

### Planificación optimizada

Cuando se ejecuta el Orchestrator, puede filtrar por flota. Solo los conductores y vehículos de la flota seleccionada se incluyen en la ejecución de optimización. Esto le permite realizar ejecuciones separadas para diferentes zonas operativas.

### Filtrado de la lista de pedidos

En la lista de pedidos, filtre por flota para ver solo los pedidos asignados a los conductores de esa flota.

### Calendario del programador

El programador se puede filtrar por flota para mostrar solo los conductores de la flota específica en el calendario de turnos.

## Casos de uso

| Tipo de flota | Ejemplo |
|---|---|
| **Geográfica** | "Flota Northside", "Flota CBD" |
| **Tipo de servicio** | "Flota de entrega el mismo día", "Flota programada", "Express" |
| **Basada en turnos** | "Flota de la mañana", "Flota de la noche" |
| **Tipo de vehículo** | "Flota de motocicletas", "Flota de vehículos refrigerados" |
| **Proveedor** | "Transportista A", "Subcontratista B" |