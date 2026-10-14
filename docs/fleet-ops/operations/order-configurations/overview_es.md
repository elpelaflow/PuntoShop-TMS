---
title: "Configuraciones de Pedidos"
url: https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview
module: fleet-ops
---

Configuraciones de Pedidos

# Configuraciones de Pedidos

Las configuraciones de pedidos definen tipos de pedidos personalizados con sus propios flujos de trabajo, campos de entidad, métodos de comprobación de entrega (POD) y pasos de actividad.

# Configuraciones de Pedidos

Una
**Configuración de Pedido**
(Config. de Pedido) es una plantilla que define cómo funciona un tipo de pedido específico en Fleet-Ops. Cada pedido que cree debe basarse en una Config. de Pedido, ya que determina el ciclo de vida del pedido, los campos de datos recopilados para cada artículo y qué comprobación de entrega es necesaria.

Esto le permite utilizar diferentes tipos de servicios desde la misma instancia de Fleet-Ops. Un mensajero podría tener una configuración para entregas del mismo día (requiere firma), otra para la entrega de documentos (requiere foto) y una tercera para devoluciones (no se requiere POD). Cada configuración tiene su propio flujo de trabajo y campos.

![Gestor de configuración de pedido — lista de configuraciones con estado, espacio de nombres y botones de acción](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-config-details.7b86ae6a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Qué contiene una Config. de Pedido

| Componente | Propósito |
|---|---|
| **Nombre** | Nombre que se muestra en la consola |
| **Espacio de nombres y clave** | Identificadores únicos utilizados por la API y el sistema (por ejemplo, `system:order-config:transport`) |
| **Descripción** | Descripción de texto libre para los operadores |
| **Estado** | `privado` o `público` — controla la visibilidad de la configuración |
| **Versión** | Cadena de versión para la configuración (por ejemplo, `0.0.1`) |
| **Flujo de actividad** | El gráfico de actividades a través del cual deben pasar los conductores; cada actividad tiene su propio conjunto de configuraciones, transiciones, lógica y eventos. Consulte [Flujos de actividad](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows) |
| **Definiciones de entidad** | Plantillas de campos para cada artículo (entidad) creado en estos tipos de pedidos. Consulte [Tipos de pedidos](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/order-types) |
| **Etiquetas** | Etiquetas de formato libre para la organización y el filtrado |
| **Campos personalizados** | Campos personalizados a nivel de pedido, adjuntos por separado y renderizados junto con los campos integrados |

Los métodos de comprobación de entrega (POD) y la configuración de comprobación de entrega se almacenan en las actividades individuales dentro del flujo de actividad, no en la configuración en sí.

## Gestión de Configuraciones de Pedidos

Navegue a
**Fleet-Ops → Operaciones → Configuraciones de Pedidos**
.

La lista muestra todas las configuraciones existentes con su nombre, clave de espacio de nombres, versión y estado (activo/inactivo). Desde aquí puede:

* **Crear**
  una nueva configuración
* **Editar**
  el flujo y los campos de una configuración existente
* **Duplicar**
  una configuración existente como punto de partida
* **Activar/desactivar**
  configuraciones para controlar qué tipos están disponibles al crear pedidos
* **Eliminar**
  configuraciones que ya no son necesarias (solo si no están referenciadas por ningún pedido)

## Creación de una Nueva Configuración de Pedido

Haga clic en
**Nueva Configuración**
.

Establezca el
**Nombre**
(por ejemplo, "Entrega del mismo día") y
**Descripción**
.

La
**Clave de espacio de nombres**
se genera automáticamente a partir del nombre (por ejemplo,
`same-day-delivery`
) — este es el identificador de la API para la configuración.

Configure el
**Flujo de actividad**
— el gráfico de actividades a través del cual deben pasar los conductores, incluyendo la configuración de comprobación de entrega por actividad (
`scan`
,
`signature`
, o
`photo`
). Consulte
[Flujos de actividad](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
.

Añada
**Definiciones de entidad**
— campos requeridos para cada artículo en este tipo de pedido. Consulte
[Tipos de pedidos](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/order-types)
.

Haga clic en
**Guardar**
. La configuración ahora está disponible para su selección al crear pedidos.

## La Configuración de Servicio Principal

Fleet-Ops viene con
**una configuración de servicio principal integrada**
:
**Transporte**
. Cada nueva empresa recibe una configuración de Transporte creada automáticamente con
`core_service: 1`
establecido, de modo que una instancia "out-of-the-box" siempre tiene una configuración de pedido utilizable disponible inmediatamente.

| Campo | Valor |
|---|---|
| **Nombre** | Transporte |
| **Clave** | `transport` |
| **Espacio de nombres** | `system:order-config:transport` |
| **Flujo predeterminado** | `creado → enviado → iniciado → en tránsito → completado` |
| **Entidades predeterminadas** | Ninguna — las entidades se añaden por pedido |

Las configuraciones de servicio principal están protegidas: no se pueden eliminar (la API rechaza la eliminación cuando
`core_service === 1`
). Puede duplicarlas, editarlas o crear nuevas configuraciones a partir de cero — por ejemplo
*Recogida y Entrega*,
*Devoluciones*
o
*Mensajero Multiadresado*
son patrones comunes que los clientes crean en la plataforma.

## Configuraciones de Pedido y la API

Al crear pedidos a través de la API consumible, haga referencia a la configuración de pedido utilizando su
**`public_id`**
(por ejemplo,
`config_dnid32`
) utilizando el
`order_config`
campo. También puede pasar
`type`
que coincida con la clave o el espacio de nombres de la configuración para volver a una configuración cuando no se proporciona
`order_config`.

```
{
  "order_config": "config_dnid32",
  "payload": {
    "pickup":  { ... },
    "dropoff": { ... }
  }
}
```

**La API consumible nunca acepta ni devuelve
`uuid`
valores**
— cada registro se hace referencia mediante su
`public_id`
(por ejemplo,
`order_5sk3lf`
,
`driver_tt2x9q`
,
`vehicle_3hk912`
). Las columnas internas
`uuid`
son privadas de la base de datos. A lo largo de la documentación, cuando un ejemplo de API muestra un campo como
`order_config`
,
`driver`
, o
`vehicle`
, proporcione el valor correspondiente
`public_id`
.

## Páginas relacionadas

* [Tipos de pedidos](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/order-types)
  — definir campos y requisitos de entidad por tipo de pedido
* [Flujos de actividad](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
  — configurar el flujo de trabajo paso a paso del conductor