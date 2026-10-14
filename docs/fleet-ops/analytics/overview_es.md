---
título: "Visión general de análisis"
url: https://fleetbase.io/docs/fleet-ops/analytics/overview
módulo: fleet-ops
---

# Visión general de análisis

Cree informes personalizados utilizando el conjunto de datos de Fleet-Ops, utilizando una interfaz de usuario de creación de consultas: seleccione tablas, columnas, uniones, filtros y exportaciones.

# Visión general de análisis

La sección
**Análisis**
de Fleet-Ops le proporciona una interfaz de creación de consultas para el conjunto de datos de Fleet-Ops. Los informes se configuran visualmente: seleccione una tabla principal, seleccione columnas, agregue uniones a tablas relacionadas, aplique filtros y agregaciones, y ejecute la consulta para generar una tabla que pueda exportar.

![Creador de informes de Fleet-Ops — selector de tabla principal, columnas, uniones, condiciones y tabla de resultados](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-report-builder.b598ad5b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Gráficos, tarjetas de resumen y paneles predefinidos aún no están disponibles en Fleet-Ops: actualmente, el análisis se basa únicamente en
**informes basados en tablas**. La visualización está en la lista de prioridades.

## ¿Qué hay en el análisis?

| Sección | Propósito |
|---|---|
| [**Informes**](https://fleetbase.io/docs/fleet-ops/analytics/reports/overview) | Cree, ejecute, guarde y exporte informes utilizando el conjunto de datos de Fleet-Ops, utilizando la interfaz de creación de consultas visual |

## ¿En qué puede basarse un informe?

El esquema de informes de Fleet-Ops registra siete tablas contra las que puede crear informes:

| Tabla | Descripción |
|---|---|
| `orders` | Órdenes de entrega y servicios — estado, horarios programados y de finalización, totales, cliente, conductor, vehículo |
| `drivers` | Registros de conductores — asignaciones, estado en línea, ubicación, habilidades |
| `vehicles` | Registros de vehículos — marca/modelo, matrícula, capacidad, ubicación, propiedad |
| `places` | Ubicaciones guardadas utilizadas como direcciones de recogida, entrega y puntos intermedios |
| `contacts` | Clientes, proveedores y facilitadores |
| `vendors` | Transportistas de terceros e integrados |
| `fuel_reports` | Transacciones de combustible enviadas desde Navigator o la consola |

Cada tabla expone sus columnas, así como las relaciones con tablas relacionadas (por ejemplo, `orders` → `drivers`, `vehicles`, `customer contact`, `payload`), para que pueda unirlas al crear un informe.

## Acceder al análisis

Vaya a
**Fleet-Ops → Análisis → Informes**
en el panel lateral izquierdo.

## Frescura de los datos

Los informes se ejecutan contra la base de datos de Fleet-Ops en tiempo real. Cada ejecución de informe recupera el estado actual: no hay retraso ni sincronización de almacenes. Para operaciones muy grandes, las tablas individuales en el esquema establecen TTLs y límites de filas para mantener los tiempos de consulta razonables; consulte
[Informes](https://fleetbase.io/docs/fleet-ops/analytics/reports/overview)
para obtener más detalles.