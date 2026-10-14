---
title: "Informes"
url: https://fleetbase.io/docs/fleet-ops/analytics/reports/overview
module: fleet-ops
---

Informes

# Informes

Cree, ejecute, guarde y exporte informes personalizados utilizando sus datos de Fleet-Ops, utilizando un constructor de informes visual — no se requieren SQL.

# Informes

La sección "Informes" es donde crea informes personalizados a partir de los datos de su operación Fleet-Ops. Elija una tabla principal (pedidos, conductores, vehículos, etc.), seleccione los campos que desea, agregue filtros y ordenamiento, importe campos de tablas relacionadas (opcionalmente) y ejecute el informe para ver el resultado. Guárdelo, ejecútelo cuando quiera y exporte a CSV o XLSX.

Los informes están basados en
**tablas**
— cada informe genera filas en una tabla. Los gráficos, tarjetas de resumen y paneles preconstruidos están en el plan, pero aún no están disponibles.

Navegue a
**Fleet-Ops → Analítica → Informes**
.

## Lista de Informes

Cuando abra "Informes", verá la lista de todos los informes guardados en su organización, con columnas para
**Título**
y
**ID**
. Desde aquí puede:

* Hacer clic en cualquier fila de informe para
  **verlo y ejecutarlo de nuevo**
* Hacer clic en
  **+ Nuevo**
  para crear un nuevo informe
* Utilizar el campo de búsqueda para encontrar un informe por título
* Utilizar el menú de acción
  **⋯**
  en cada fila para editar, duplicar o eliminar

Los informes están diseñados para su organización — cada operador con los permisos adecuados [IAM](https://fleetbase.io/docs/platform/identity-and-access/users) ve la misma lista.

## Crear un Informe

Haga clic en
**+ Nuevo**
. Se abrirá el Constructor de Informes con dos pestañas principales:
**Configuración**
(donde compone la consulta) y
**Vista previa**
(donde aparecen los resultados una vez que haga clic en "Ejecutar").

![Constructor de Informes Fleet-Ops — Pestaña de Configuración con selector de Tabla Primaria, columnas, columnas calculadas, agrupación, ordenamiento, límite, uniones y condiciones](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-report-builder.b598ad5b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Paso 1 — Asigne un título al informe

En la parte superior de la página, complete:

* **Título**
  — lo que verá en la lista de informes (obligatorio)
* **Descripción**
  — una descripción opcional que explique qué muestra el informe
* **Etiquetas**
  — etiquetas opcionales para agrupar informes (por ejemplo,
  *finanzas*
  ,
  *diario*
  ,
  *rendimiento del conductor*)

### Paso 2 — Elija la Tabla Primaria

La
**Tabla Primaria**
es el tipo de datos que se utilizará en el informe. Una fila en el resultado equivale a:

| Elija esto... | ...si desea un informe donde cada fila sea | Ejemplos |
|---|---|---|
| **Pedidos** | Un pedido de entrega/servicio | "Todos los pedidos completados este mes con su conductor y distancia" |
| **Conductores** | Un conductor | "Número total de pedidos por conductor, por semana" |
| **Vehículos** | Un vehículo | "Utilización del vehículo por matrícula" |
| **Lugares** | Una ubicación guardada | "Volumen de recogida por almacén" |
| **Contactos** | Un cliente/proveedor/facilitador | "Pedidos por cliente, gasto total" |
| **Proveedores** | Un transportista de terceros | "Pedidos del proveedor enviados esta semana" |
| **Informes de combustible** | Una transacción de combustible | "Costo del combustible por vehículo por mes" |

El selector muestra una breve descripción debajo de cada opción para ayudarle a elegir. Elegir la tabla primaria también desbloquea el
**selector de columnas**
y
**uniones disponibles**
para los siguientes pasos.

### Paso 3 — Elija las columnas que desea

En el menú desplegable
**Seleccionar columnas**,
seleccione los campos que deben aparecer como columnas en su informe. Busque por nombre, marque las casillas junto a los campos que desea.

Las columnas se agrupan por tabla. Si ha añadido uniones (Paso 6 a continuación), también se muestran las columnas de las tablas unidas para que pueda combinarlas — por ejemplo, mostrar el ID del pedido + nombre del conductor + matrícula del vehículo en una sola fila, aunque provienen de tres tablas diferentes.

### Paso 4 — Añada columnas calculadas (opcional)

Cuando desee
**conteo, suma, promedio, mínimo o máximo**
en lugar de filas, añádelas en la sección
**Columnas calculadas**. Cada tabla en el esquema tiene columnas calculadas predefinidas — por ejemplo, la tabla
*Pedidos*
tiene
*Número total de pedidos*,
*Distancia total*,
*Distancia promedio*
y
*Tiempo total*
incorporados.

También puede crear su propia columna calculada seleccionando cualquier campo de agregación en la tabla y eligiendo uno de:

* **CONTA**
  — número de filas
* **SUMA**
  — valor total en las filas
* **AVG**
  — valor promedio en las filas
* **MIN**
  — valor mínimo
* **MAX**
  — valor máximo

Las columnas calculadas son más útiles cuando se combinan con
**Agrupar**
(paso siguiente) — de esta forma puede obtener
*Número total de pedidos por conductor*,
*Distancia total por día*, etc.

### Paso 5 — Agrupe, ordene, limite

Tres controles pequeños pero importantes:

| Control | Propósito | Ejemplo |
|---|---|---|
| **Agrupar** | Agrupe las filas por una o más columnas. Las columnas calculadas se calculan *por grupo*. | Agrupe por "conductor" para obtener una fila por conductor en lugar de una fila por pedido |
| **Ordenar** | Ordene las filas del resultado. Añada múltiples ordenaciones en orden de prioridad. | Ordene por "Número total de pedidos" en orden descendente para ver a los conductores de mayor rendimiento primero |
| **Limitar** | Limite el número de filas devueltas. El valor predeterminado es 100; el máximo varía según la tabla. | Establezca en 10 para "los 10 conductores con más pedidos" |

### Paso 6 — Uniones (opcional)

Las uniones le permiten incluir campos de
**tablas relacionadas**. El esquema sabe sobre las relaciones existentes de forma predeterminada — un conductor tiene un vehículo actual, un pedido tiene un cliente, un lugar puede tener un contacto padre — por lo que cuando añada una unión, la condición de unión se completa automáticamente.

Solo necesita uniones cuando quiera mostrar campos de una
*diferente*
tabla que su tabla primaria. Si está informando sobre pedidos y solo quiere campos de pedidos, omita este paso.

Para añadir una unión:

1. Haga clic en
   **+ Añadir unión**
   debajo de "Uniones"
2. Elija la relación del menú desplegable (por ejemplo,
   *Conductor*
   en la tabla de pedidos)
3. Elija el tipo de unión:
   * **Izquierda**
     — todas las filas de la tabla primaria, más filas unidas donde existan (el más común)
   * **Interna**
     — solo las filas donde ambas tablas coincidan
   * **Derecha**
     — todas las filas de la tabla unida, más filas primarias coincidentes
   * **Completa**
     — todas las filas de ambas tablas, coincidentes donde sea posible
4. La condición de unión se completa automáticamente a partir de la relación; puede superponerla si es necesario

Una vez que se ha añadido una unión, las columnas de la tabla unida se muestran en el selector de columnas.

### Paso 7 — Condiciones (filtros)

La sección
**Condiciones**
es donde puede filtrar qué filas incluye el informe. Cada condición tiene tres partes:

* **Columna**
  — qué campo probar
* **Operador**
  — cómo compararlo
* **Valor**
  — qué comparar

Los operadores disponibles son:

| Operador | Significado | Ejemplo |
|---|---|---|
| `=` , `!=` | Igual / no igual | `estado = "completado"` |
| `>` , `>=` , `<` , `<=` | Comparación numérica o de fecha | `fecha_creación >= "2026-01-01"` |
| `LIKE` , `NOT LIKE` | Coincidencia de patrón de texto | `nombre_cliente LIKE "Acme%"` |
| `IN` , `NOT IN` | El valor está en una lista | `estado IN ("enviado", "comenzado")` |
| `ES NULL` , `NO ES NULL` | El campo está vacío / no está vacío | `conductor_asignado IS NOT NULL` |

Añada múltiples condiciones y combínelas con
**AND**
o
**OR**
mediante el menú desplegable de lógica junto a cada fila. El tipo de entrada cambia en función del campo que elija — los textos tienen una entrada de texto, las fechas tienen un selector de fecha, los booleanos tienen un interruptor y los números tienen una entrada numérica.

### Paso 8 — Ejecutar y revisar

Haga clic en
**Ejecutar consulta**
(en la barra de herramientas o en la parte superior de la página). El constructor cambia a la pestaña
**Vista previa**
y muestra el resultado como una tabla paginada.

Si la consulta tiene problemas, se mostrarán en línea encima de la configuración como bloques de error en rojo (que deben corregirse) o en amarillo (que vale la pena comprobar). Los problemas comunes son:

* *"No se ha seleccionado ninguna tabla principal"*
  — seleccione una en el Paso 2
* *"No se han seleccionado ninguna columna"*
  — seleccione al menos un campo en Seleccionar columnas
* *"Falta la condición de unión"*
  — configure la unión antes de ejecutar

### Paso 9 — Guardar el informe

Haga clic en
**Guardar informe**
en la barra de herramientas. El informe aparece inmediatamente en la lista y puede abrirse, volver a ejecutarlo, editarlo o exportarlo en cualquier momento. Los informes guardados conservan toda su configuración — tabla principal, columnas, uniones, condiciones, orden, límite, incluso título y etiquetas — para que al volver a ejecutar, no tenga que volver a configurarlo.

## Volver a ejecutar un informe guardado

Haga clic en cualquier informe de la lista para abrirlo. Llegará al mismo constructor que utilizó para crearlo, con la configuración guardada aplicada. Haga clic en
**Ejecutar consulta**
para volver a ejecutar — el resultado reflejará el
*estado actual*
de sus datos de Fleet-Ops, por lo que un informe que guardó el mes pasado recogerá nuevos pedidos, conductores, etc., cada vez que lo ejecute.

También puede modificar la configuración y guardarla como nueva (lo que crea una copia) o
**Guardar como**
(lo que actualiza el informe).

## Exportar resultados

Después de ejecutar un informe, utilice la acción
**Exportar**
para descargar el resultado. Los formatos comunes son
**CSV**
y
**XLSX**
; los formatos disponibles dependen de los exportadores instalados en la plataforma. Los archivos de exportación incluyen exactamente las columnas que se muestran en la pestaña "Vista previa" — sin extras, sin campos faltantes — por lo que lo que ve es lo que obtiene.

Los archivos CSV funcionan bien con Excel, Google Sheets, Numbers y cualquier herramienta de BI (Power BI, Tableau, Looker, Metabase). Simplemente abra el archivo o importarlo directamente.

## Consejos

* **Empiece con algo sencillo.**
  Elija una tabla principal, añada 3–4 columnas y ejecute. Luego, construya a partir de ahí. Es mucho más fácil añadir complejidad que depurar un informe de 20 columnas que no funciona.
* **Utilice el límite mientras itere.**
  Baje el límite a 10–20 filas durante la configuración para que las ejecuciones sean rápidas. Aumente a su valor objetivo real justo antes de guardar.
* **Las etiquetas ayudan mucho cuando tiene muchos informes.**
  Etiquetar por equipo, ritmo o propósito (
  `diario*
  ,
  `cumplimiento*
  ,
  `rendimiento del conductor*
  ) facilita la gestión de la lista.
* **Las columnas calculadas + Agrupar es donde está el valor.**
  "Mostrarme una fila por conductor, con su número total de pedidos y distancia promedio, ordenado por número total de pedidos en orden descendente" es una configuración de 30 segundos que antes requería exportar e importar en Excel.

Aquí hay algunos ejemplos de operaciones de informes comunes, con los controles utilizados:

### Los 10 principales conductores según el número de pedidos completados este mes

* **Tabla principal:**
  Conductores
* **Relaciones:**
  Agregar una relación a
  **Pedidos**
  (la relación de la tabla de conductores a pedidos)
* **Columnas:**
  Nombre del conductor
* **Columnas calculadas:**
  *COUNT*
  de ID de pedido — llamarlo "Pedidos completados"
* **Condiciones:**
  `status = "completed"`
  ,
  `created_at >= "2026-05-01"`
* **Agrupación:**
  Nombre del conductor
* **Ordenación:**
  Pedidos completados, de forma descendente
* **Límite:**
  10

### Gasto en combustible por vehículo, mensual

* **Tabla principal:**
  Informes de combustible
* **Relaciones:**
  Vehículo
* **Columnas:**
  Número de matrícula, marca/modelo del vehículo
* **Columnas calculadas:**
  *SUM*
  de importe → "Gasto total en combustible"
* **Condiciones:**
  `created_at >= "2026-05-01"`
  ,
  `created_at < "2026-06-01"`
* **Agrupación:**
  Número de matrícula
* **Ordenación:**
  Gasto total en combustible, de forma descendente

### Clientes sin pedidos en los últimos 90 días

* **Tabla principal:**
  Contactos
* **Relaciones:**
  Pedidos (unión izquierda, para que los clientes con cero pedidos aún aparezcan)
* **Columnas:**
  Nombre del cliente, correo electrónico, teléfono
* **Columnas calculadas:**
  *COUNT*
  de ID de pedido → "Pedidos en el período"
* **Condiciones:**
  `created_at >= "<90 días atrás>"`
  *con lógica OR*
  `id IS NULL`
* **Agrupación:**
  Nombre del cliente, correo electrónico, teléfono
* **Ordenación:**
  Pedidos en el período, de forma ascendente
* **Límite:**
  100

### Pedidos pendientes de envío

* **Tabla principal:**
  Pedidos
* **Columnas:**
  ID de pedido, cliente, recogida, entrega, programado para
* **Condiciones:**
  `status = "created"`
  ,
  `scheduled_at <= "<ahora>"`
* **Ordenación:**
  Programado para, de forma ascendente

## Permisos

El acceso a los informes está controlado por su rol de IAM:

* **Ejecutar / ver / exportar**
  — los operadores con acceso de lectura a una tabla pueden ejecutar informes sobre ella
* **Crear / guardar / editar**
  — los operadores con acceso de escritura al recurso de informes
* **Eliminar**
  — los operadores con acceso de eliminación al recurso de informes

El selector de tablas solo muestra las tablas para las que tiene acceso de lectura su rol — si un colega puede ver una tabla que usted no puede, se trata de una diferencia en los permisos de IAM, no de una característica faltante. Consulte
[Identidad y acceso](https://fleetbase.io/docs/platform/identity-and-access/users)
para el modelo de roles y políticas.

## Lo que está por venir

El Report Builder se ampliará en las próximas versiones:

* **Gráficos**
  — visualizaciones de barras, líneas y gráficos de pastel sobre los resultados del informe
* **Tarjetas de resumen**
  — tarjetas de KPI con un solo número (total de pedidos hoy, tasa de cumplimiento, etc.)
* **Paneles**
  — diseños de múltiples informes fijos en las páginas de inicio, que se actualizan periódicamente

Mientras tanto, puede crear visualizaciones equivalentes exportando informes a CSV / XLSX y creando gráficos en Excel, Sheets o cualquier herramienta de BI.