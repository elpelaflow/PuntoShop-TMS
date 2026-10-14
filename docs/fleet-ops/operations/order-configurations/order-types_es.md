---
title: Tipos de Pedidos
url: https://fleetbase.io/docs/fleet-ops/operations/order-configurations/order-types
module: fleet-ops
---

Configuración de Pedidos

# Tipos de Pedidos

Cree y gestione tipos de pedidos personalizados: defina los campos de entidad, restricciones y categorías de servicios por cada configuración de pedido.

# Tipos de Pedidos

**Tipos de Pedidos**
se refieren a las diferentes categorías de pedidos que maneja su operación, cada una respaldada por una
**Configuración de Pedido**. Un tipo de pedido determina qué datos se recopilan en cada entrega, qué campos aparecen en cada artículo y cómo los conductores ejecutan el flujo de trabajo.

## ¿Qué define un Tipo de Pedido?

Cada Configuración de Pedido define un tipo de pedido a través de:

1. **Definiciones de entidad**
   — plantillas de campos que se completan automáticamente al agregar artículos a los pedidos de este tipo
2. **Etiquetas**
   — para categorizar y filtrar
3. **Flujo de actividades**
   — las actividades que realiza el conductor, incluyendo la configuración de POD por actividad (definida para cada actividad, no en la configuración en sí)

## Definiciones de Entidad

Las definiciones de entidad especifican qué datos deben completarse para cada artículo (entidad) agregado a un pedido de este tipo. Configure estas opciones dentro del editor de la Configuración de Pedido.

### Campos de Entidad Disponibles

Estos campos existen en el modelo de Entidad y se pueden usar como plantillas en las definiciones de entidad de una Configuración de Pedido:

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | Texto | Nombre del artículo |
| `description` | Texto | Descripción del artículo (por ejemplo, "Laptop") |
| `internal_id` | Texto | ID de referencia externo para el artículo |
| `sku` | Texto | Identificador de Stock Keeping Unit |
| `barcode` | Texto | Valor del código de barras (utilizado por la POD "scan") |
| `qr_code` | Texto | Valor del código QR (utilizado por la POD "scan") |
| `weight` / `weight_unit` | Número + Unidad | Peso en kg, lb, etc. |
| `length` / `width` / `height` / `dimensions_unit` | Número + Unidad | Dimensiones físicas |
| `declared_value` / `currency` | Número + Código | Valor declarado del artículo |
| `price` / `sale_price` | Número | Precio por artículo |
| `photo_uuid` | Archivo | Referencia a una foto subida del artículo |
| `customer_uuid` | Contacto | Destinatario para este artículo específico (entrega múltiple) |
| `destination_uuid` | Punto de destino | Punto de destino específico para este artículo (entrega múltiple) |
| `meta` | JSON | Campos personalizados específicos para su operación |

Puede marcar los campos como
**obligatorios**
o
**opcionales**
por tipo de pedido. Los campos obligatorios deben completarse antes de que se pueda guardar un pedido.

### Campos de Entidad Personalizados

Además de los campos estándar, cada definición de entidad puede incluir campos personalizados creados a través de
**Fleet-Ops → Settings → Custom Fields**. Por ejemplo, una operación de logística de cadena de frío podría agregar:

* Requisito de temperatura (seleccionar: ambiente, refrigerado, congelado)
* Indicador de frágil (interruptor)
* Instrucciones de manejo (texto)

## ¿Qué se envía por defecto?

Fleet-Ops viene con un
**único tipo de pedido incorporado: Transport**, creado automáticamente como una
`core_service`
configuración en cada nueva empresa. Por defecto, no tiene plantillas de entidad; usted agrega los campos que necesita su operación.

Patrones comunes que los clientes construyen sobre Transport (o como configuraciones separadas):

### Entrega Estándar

* **Recogida → Entrega**
  ruta
* Plantilla de entidad:
  `description`
  ,
  `weight`
  , dimensiones opcional
* POD:
  `signature`
  establecido en la actividad de entrega,
  `require_pod: true`

### Recogida y Entrega (P&D)

* El conductor recoge en un proveedor y entrega a un cliente
* Plantilla de entidad:
  `description`
  ,
  `barcode`
* POD:
  `signature`
  en la actividad de entrega

### Devolución al remitente (RTS)

* El conductor recoge un artículo no entregado del cliente y lo devuelve al origen
* Plantilla de entidad:
  `internal_id`
  (referencia al pedido original), motivo en
  `meta`
* POD:
  `photo`
  en la actividad de recogida

### Entrega por varios destinos

* Una sola recogida, múltiples entregas
* Plantilla de entidad: cada entidad establece
  `destination_uuid`
  a un punto de destino específico
* POD:
  `signature`
  en la actividad de entrega de cada punto de destino

## Crear un Tipo de Pedido Personalizado

Los tipos de pedido se crean creando una nueva
**Configuración de Pedido**. Navegue a
**Fleet-Ops → Operations → Order Configurations → + New Configuration**
.

![Diálogo para crear una nueva configuración de pedido — nombre de la configuración, descripción y etiquetas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-config-create.dfad23c9.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

En la sección de definiciones de entidad, agregue los campos que necesita que los conductores recopilen y marque cuáles son obligatorios. Guarde la configuración; esto la hace disponible inmediatamente cuando cree nuevos pedidos.

## Filtrar Pedidos por Tipo

En la lista de Pedidos, use el filtro
**Order Config**
para mostrar solo los pedidos de un tipo específico. Esto es útil para separar los pedidos del día para los pedidos programados, o los express de los estándar.

En la API, los pedidos incluyen el campo
`type`
(la clave de espacio de nombres de su Configuración de Pedido) para filtrar y ordenar.