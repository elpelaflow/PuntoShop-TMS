---
title: "Importar pedidos"
url: https://fleetbase.io/docs/fleet-ops/operations/orders/importing-orders
module: fleet-ops
---

Pedidos

# Importar pedidos

Importe varios pedidos a la vez desde una hoja de cálculo, incluyendo pedidos con múltiples puntos de recogida y entidades, utilizando el asistente de importación de pedidos.

# Importar pedidos

Para operaciones de gran volumen, no es práctico crear pedidos uno por uno en la consola. Fleet-Ops incluye un
**asistente de importación de pedidos**
que importa
`.xlsx`
o
`.csv`
y crea pedidos, puntos de recogida, entidades, clientes y conductores en un solo paso. Esta página describe el flujo de importación, la estructura de la hoja de cálculo y las reglas de agrupación de filas que permiten pedidos con múltiples destinos y elementos.

![Importar pedidos — modal de carga de archivo con área de arrastrar y soltar, tipos de archivo admitidos y lista de archivos en cola](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orders-import.fea7cd24.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cuándo utilizar la importación

* Importar un historial de pedidos de otro sistema
* Cargar el lote del día desde una hoja de cálculo de asignación mantenida externamente
* Exportaciones programadas desde una plataforma WMS, ERP o de comercio electrónico que genera una hoja de cálculo por línea

Para la integración automatizada continua, es preferible utilizar la
[API REST](https://fleetbase.io/docs/fleet-ops/operations/orders/managing-orders)
— la importación es ideal para cargas únicas o periódicas.

## Iniciar una importación

Vaya a
**Fleet-Ops → Operaciones → Orchestrator**
(o la lista de pedidos).

Haga clic en
**Importar pedidos**
. Se abrirá el modal de importación con un área para arrastrar y soltar archivos y una lista de archivos en cola.

Arrastre y suelte uno o más archivos. Los formatos admitidos son:
`.xlsx`
,
`.xls`
y
`.csv`
.

Haga clic en
**Iniciar carga**
. Los archivos se cargan, se analizan y se procesan para crear pedidos, puntos de recogida, entidades, clientes y conductores según sea necesario.

## Plantilla de hoja de cálculo

Descargue la plantilla estándar desde el modal de importación:
`Fleetbase_Order_Import_Template.xlsx`
y complete la hoja
**Import**
comenzando en la fila 2 (la fila 1 es el encabezado).

### Columnas requeridas

Se requieren tres columnas en cada fila:

| Columna requerida | Propósito |
| --- | --- |
| `Referencia del pedido *` | Una referencia compartida en todas las filas que pertenecen al mismo pedido. La primera fila que contiene una Referencia de Pedido específica define el pedido; las filas subsiguientes con la misma Referencia de Pedido **añaden puntos de recogida y entidades** al pedido. |
| `Nombre del punto de recogida *` | La etiqueta o nombre del negocio del punto de recogida |
| `Nombre del punto de entrega *` | La etiqueta o nombre del negocio del punto de entrega |

Los campos requeridos están marcados con un asterisco (
`*`
) en la fila de encabezado de la plantilla.

### Columnas opcionales

La plantilla incluye 44 columnas que cubren todo lo que puede transportar un pedido:

| Grupo | Columnas |
| --- | --- |
| **Metadatos del pedido** | `Tipo de pedido` , `Programado en` , `Notas` |
| **Ubicación de recogida** | `Nombre del punto de recogida *` , `Calle del punto de recogida` , `Ciudad del punto de recogida` , `Estado del punto de recogida` , `Código postal del punto de recogida` , `País del punto de recogida` , `Latitud del punto de recogida` , `Longitud del punto de recogida` |
| **Ubicación de entrega** | `Nombre del punto de entrega *` , `Calle del punto de entrega` , `Ciudad del punto de entrega` , `Estado del punto de entrega` , `Código postal del punto de entrega` , `País del punto de entrega` , `Latitud del punto de entrega` , `Longitud del punto de entrega` |
| **Resumen de la carga** | `Tipo de carga` , `Peso de la carga (kg)` , `Volumen de la carga (m³)` |
| **Cliente** | `Nombre del cliente` , `Correo electrónico del cliente` , `Teléfono del cliente` , `Tipo de cliente` |
| **Facilitador** | `Nombre del facilitador` , `Correo electrónico del facilitador` , `Tipo de facilitador` |
| **Conductor y vehículo** | `Placa del vehículo` , `Nombre del conductor` , `Correo electrónico del conductor` , `Teléfono del conductor` |
| **Entidad (nivel de artículo)** | `Nombre de la entidad` , `Tipo de entidad` , `SKU de la entidad` , `Descripción de la entidad` , `Peso de la entidad (kg)` , `Longitud de la entidad (cm)` , `Ancho de la entidad (cm)` , `Altura de la entidad (cm)` , `Valor declarado de la entidad` , `Moneda de la entidad` |

Pase el cursor sobre cualquier celda de encabezado en la hoja
**Import**
para ver una herramienta de ayuda que describe el campo.

Las columnas pueden aparecer en cualquier orden: el asistente de importación mapea automáticamente los encabezados a los campos de Fleet-Ops. Las columnas adicionales que el asistente no reconoce se ignoran, por lo que puede mantener sus propias convenciones de hoja de cálculo.

## Agrupación de filas — Un pedido en varias filas

La columna
**`Referencia del pedido`**
es el punto de anclaje que vincula las filas. El asistente utiliza esta columna para decidir si cada fila crea un nuevo pedido o extiende uno existente:

* **Primera ocurrencia de la Referencia del pedido**
  — crea el pedido. Los campos de nivel de pedido (recogida, entrega, cliente, facilitador, conductor, vehículo, programación) provienen de esta fila.
* **Ocurrencias subsiguientes de la misma Referencia del pedido**
  — añaden un punto de recogida y/o una entidad al pedido creado en la primera fila. Los campos de recogida/entrega definen un punto de recogida adicional; los campos de entidad definen un artículo adicional.

Esto significa que
**un solo pedido puede ocupar cualquier número de filas**
dependiendo de cuántos puntos de recogida y elementos tenga.

### Ejemplo — pedido con múltiples entidades

La misma Referencia del pedido
`ORD-001`
aparece en dos filas. La primera fila establece el pedido con una caja para portátil; la segunda fila añade un cargador para teléfono como segunda entidad:

```
Referencia del pedido | Nombre del punto de recogida | Nombre del punto de entrega | Nombre de la entidad | SKU de la entidad
─────────────────────────────────────────────────────────────────────
ORD-001   | Fleetbase HQ  | Customer A   | Laptop Box     | SKU-001
ORD-001   | Fleetbase HQ  | Customer A   | Phone Charger  | SKU-002
```

Resultado: un pedido de Fleetbase HQ → Customer A con dos entidades adjuntas.

### Ejemplo — pedido con múltiples puntos de recogida

La misma Referencia del pedido aparece en filas con
**diferentes ubicaciones de entrega**, que el asistente lee como puntos de recogida adicionales:

```
Referencia del pedido | Nombre del punto de recogida | Nombre del punto de entrega | Nombre de la entidad
────────────────────────────────────────────────────────────────
ORD-007   | Fleetbase HQ  | Customer A — North  | Package 1
ORD-007   | Fleetbase HQ  | Customer B — East   | Package 2
ORD-007   | Fleetbase HQ  | Customer C — South  | Package 3
```

Resultado: un pedido con múltiples puntos de recogida con tres paradas y tres entidades — cada entidad se dirige a su propio punto de recogida.

Puede combinar los patrones: múltiples entidades en un solo punto de recogida, múltiples puntos de recogida con uno o más elementos cada uno, todo bajo la misma Referencia del pedido.

## Consejos sobre los campos

* **Fechas y horas**
  — el formato ISO 8601 (
  `YYYY-MM-DD HH:MM`
  ) es el formato más fiable. El analizador acepta otros formatos, pero ISO elimina la ambigüedad. El campo
  `Programado en`
  en la primera fila del pedido establece la
  `fecha_programada`
  del pedido.
* **Códigos de país**
  — utilice los códigos ISO 3166-1 alfa-2 (
  `SG`
  ,
  `US`
  ,
  `GB`
  ).
* **Coordenadas**
  —
  `Latitud del punto de recogida`
  /
  `Longitud del punto de recogida`
  y
  `Latitud del punto de entrega`
  /
  `Longitud del punto de entrega`
  son opcionales. Si se proporcionan, el asistente las utiliza para fijar la ubicación con precisión; si no, el asistente las convierte geográficamente.
* **Tipo de pedido**
  — cadena libre que Fleet-Ops utiliza para hacer coincidir con una
  [Configuración de pedido](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
  . Los valores comunes son:
  `transporte`
  ,
  `entrega`
  ,
  `recogida`
  ,
  `múltiples_puntos`
  . Si no existe una configuración de pedido correspondiente, el pedido vuelve a la configuración de transporte predeterminada.
* **Cliente / facilitador / conductor**
  — si existe un contacto, proveedor o conductor con el correo electrónico o nombre proporcionados, la importación crea uno y lo vincula al pedido. Los registros existentes se hacen coincidir y se reutilizan.
* **Placa del vehículo**
  — cuando se proporciona, el asistente busca la placa correspondiente y la asigna. Si no se encuentra ninguna coincidencia, el pedido se crea sin un vehículo y puede ser asignado más tarde por el Orchestrator o manualmente.

## Después de la importación

Una vez que la importación ha finalizado:

* Se muestra un resumen del número de pedidos, puntos de recogida, entidades, clientes y conductores creados o actualizados.
* Los nuevos pedidos aparecen en
  **Operaciones → Pedidos**
  con el estado del sistema
  `creado`
  , listos para ser despachados manualmente o recogidos por el Orchestrator.
* Las filas que el asistente no pudo procesar se devuelven en un informe de errores para que pueda corregirlas e importarlas de nuevo.

La importación de pedidos funciona de forma idéntica a los pedidos creados en la consola, una vez que se han importado. Participan en
[Configuraciones de pedidos](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
, el
[Orchestrador](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
y el seguimiento.