---
título: "Informes de combustible"
url: https://fleetbase.io/docs/fleet-ops/resources/fuel-reports/overview
módulo: fleet-ops
---

Informes de combustible

# Informes de combustible

Registre y supervise el consumo de combustible de la flota: rastree el volumen, el costo, las lecturas del odómetro y las ubicaciones de reabastecimiento para el análisis de costos y la detección de fraudes.

# Informes de combustible

**Informes de combustible**
son registros del consumo de combustible de la flota. Los conductores presentan informes cuando reabastecen, y los operadores pueden registrar informes desde el panel. Cada informe captura el volumen, el costo, la lectura del odómetro y la ubicación de la transacción de combustible. Los informes de combustible se utilizan para el seguimiento de costos, el análisis de consumo y la detección de anomalías.

![Lista de informes de combustible — conductor, vehículo, fecha, volumen, importe y estado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-fuel-reports-list.741111ed.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Campos del informe de combustible

| Campo | Descripción |
|---|---|
| **Conductor** | El conductor que realizó la compra de combustible |
| **Vehículo** | El vehículo que se reabasteció |
| **Presentado por** | El usuario que creó el informe (puede diferir del conductor) |
| **Volumen** | Volumen de combustible comprado (litros o galones) |
| **Unidad de medida** | litros o galones |
| **Importe** | Costo total de la compra de combustible |
| **Moneda** | Moneda del importe |
| **Odómetro** | Lectura actual del odómetro en el momento del reabastecimiento |
| **Ubicación** | Coordenadas GPS de la estación de combustible |
| **Informe** | Notas o detalles adicionales |
| **Estado** | pendiente, aprobado, rechazado |

## Estados del informe de combustible

| Estado | Significado |
|---|---|
| `pendiente` | Presentado, en espera de revisión por el operador |
| `aprobado` | Verificado y aceptado |
| `rechazado` | Señalado como inexacto o rechazado |

## Crear un informe de combustible

### Desde el panel

Navegue a
**Fleet-Ops → Recursos → Informes de combustible**
.

Haga clic en
**Nuevo informe de combustible**
.

Seleccione el
**Conductor**
y
**Vehículo**
.

Introduzca el
**Volumen**
,
**Unidad de medida**
y
**Importe**
.

Introduzca la
**Lectura del odómetro**
.

Establezca la ubicación introduciendo una dirección o utilizando el mapa.

Añada cualquier
**Nota**
sobre la transacción.

Haga clic en
**Guardar**
.

### Desde la aplicación Navigator

Los conductores pueden presentar y editar informes de combustible directamente desde la aplicación Navigator: no es necesario acceder al panel:

![Aplicación Navigator — pantalla para crear un informe de combustible con campos de volumen, costo y odómetro](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnavigator-app-create-fuel-report-screen.562e42d0.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El conductor abre
**Informes de combustible**
en Navigator y hace clic en
**Nuevo informe de combustible**
.

Navigator rellena automáticamente el conductor y la ubicación GPS actual del conductor. El conductor introduce el
**Volumen**
,
**Unidad de medida**
,
**Importe**
,
**Moneda**
y
**Lectura del odómetro**
; selecciona el
**Vehículo**
; y añade notas opcionales.

Al enviar, Fleet-Ops crea el informe de combustible con estado
`pendiente`
. Aparece en el panel para su aprobación por el operador.

Los conductores también pueden
**editar informes de combustible existentes**
que ya habían presentado desde la misma pantalla: por ejemplo, para corregir la lectura del odómetro después de tomar una foto más clara. El mismo registro está visible para los operadores en el panel.

## Revisar y aprobar informes

Los informes de combustible presentados por los conductores comienzan con estado
`pendiente`
. Los operadores revisan y, en su lugar, pueden:

* **Aprobar**
  — confirmar que el informe es preciso; se incluye en los cálculos de costos de combustible
* **Rechazar**
  — señalar el informe como inexacto con una razón

Los informes rechazados notifican al conductor y pueden ser resubidos con correcciones.

## Casos de uso para el análisis

Los informes de combustible permiten:

| Análisis | Cómo |
|---|---|
| **Costo por km** | Combinar los datos del odómetro con los datos de la distancia recorrida |
| **Anomalías de consumo** | Señalar una alta relación entre volumen y distancia (potencial fraude) |
| **Asignación de costos de la flota** | Desglosar los costos de combustible por vehículo o flota |
| **Seguimiento del presupuesto** | Comparar el gasto real en combustible con el presupuesto |
| **Planificación de intervalos de mantenimiento** | Utilizar las lecturas del odómetro para activar recordatorios de mantenimiento |

## Exportar datos de combustible

Haga clic en
**Exportar**
en la lista de informes de combustible para descargar un CSV de todos los informes. Filtre por rango de fechas, conductor o vehículo antes de exportar para informes de costos específicos.

[Problemas

Registre, rastree y resuelva los problemas operativos: fallas del vehículo, incidentes de los conductores, accidentes y excepciones de entrega, con seguimiento de prioridad y estado.](https://fleetbase.io/docs/fleet-ops/resources/issues/overview)
[Visión general del mantenimiento

Administre el mantenimiento de vehículos y equipos: horarios de mantenimiento preventivo, órdenes de trabajo, inventario de piezas e historial de mantenimiento.](https://fleetbase.io/docs/fleet-ops/maintenance/overview)