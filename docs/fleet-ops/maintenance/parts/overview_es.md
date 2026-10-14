---
título: "Piezas de repuesto"
url: https://fleetbase.io/docs/fleet-ops/maintenance/parts/overview
módulo: fleet-ops
---

Piezas de repuesto

# Piezas de repuesto

Realiza un seguimiento del inventario de piezas utilizadas en el mantenimiento de la flota: registra las piezas utilizadas en las órdenes de trabajo, gestiona la información de los proveedores y realiza un seguimiento de los costes.

# Piezas de repuesto

**Piezas de repuesto**
es la sección de gestión de inventario para componentes de mantenimiento. Realiza un seguimiento de las piezas disponibles para el mantenimiento de vehículos y equipos: filtros de aceite, pastillas de freno, correas, fluidos y cualquier otro artículo de consumo utilizado en las órdenes de trabajo.

![Lista de inventario de piezas — nombre de la pieza, SKU, proveedor, coste por unidad, cantidad](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-parts-list.22e41d1d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos de la pieza

| Campo | Descripción |
|---|---|
| `name` | Nombre de la pieza (por ejemplo, *Filtro de aceite – Toyota Hiace*) |
| `manufacturer` / `model` | Nombre del fabricante y modelo OEM |
| `sku` | Código de identificación de stock interno |
| `serial_number` | Número de serie, cuando corresponda |
| `barcode` | Código de barras para el escaneo |
| `description` | Descripción detallada de la pieza |
| `vendor_uuid` | Proveedor o proveedor que proporciona esta pieza |
| `warranty_uuid` | Registro de garantía asociado |
| `unit_cost` / `msrp` / `currency` | Coste por unidad, precio de venta minorista recomendado por el fabricante y moneda |
| `quantity_on_hand` | Nivel de stock actual |
| `reorder_point` | Umbral de alerta: cuando `quantity_on_hand` baja de este valor, la pieza se marca como `is_low_stock` y se puede activar una alerta de bajo stock. Se almacena en el JSON `specs`; por defecto, es de 5. |
| `asset_type` / `asset_uuid` | Enlace polimórfico al activo al que pertenece esta pieza (por ejemplo, un vehículo o un equipo) |
| `photo_uuid` | Referencia a una foto de la pieza subida |
| `status` / `type` | Campos de clasificación de libre formato |

![Panel de detalles de la pieza — SKU y tipo, fabricante y modelo, cantidad disponible con estado de stock, el activo al que está instalado y la información de precios](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-part-details.8d664f51.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Crear un registro de pieza

Navega a
**Fleet-Ops → Mantenimiento → Piezas**
.

Haz clic en
**Nueva pieza**
.

Introduce el
**Nombre**,
**Número de pieza**
y
**SKU**.

Establece el
**Proveedor**
y
**Coste por unidad**.

Opcionalmente, establece la
**Cantidad disponible**
si deseas realizar un seguimiento de los niveles de stock.

Haz clic en
**Guardar**.

## Utilizar piezas en las órdenes de trabajo

Al completar una orden de trabajo, el responsable puede registrar qué piezas se utilizaron:

1. En el detalle de la orden de trabajo, haz clic en
   **Añadir pieza**
2. Selecciona la pieza del inventario
3. Introduce la cantidad utilizada
4. El coste de la pieza se añade automáticamente al coste real de la orden de trabajo:
   **Coste real**

Las piezas utilizadas en las órdenes de trabajo completadas se registran en el historial de mantenimiento, proporcionando un registro completo de qué componentes se reemplazaron en cada vehículo a lo largo de su vida útil.

## Seguimiento de costes

Los costes de las piezas se incorporan al desglose de costes de la orden de trabajo:

```
Coste real de la orden de trabajo = Coste de la mano de obra + Coste de las piezas + Otros costes
```

Las piezas seleccionadas del inventario tienen su coste por unidad, que multiplicado por la cantidad, da el coste de la línea en el desglose de costes de la orden de trabajo.

## Gestión de proveedores

Cada pieza puede asociarse a un registro de
**Proveedor**
(proveedor) desde
**Fleet-Ops → Recursos → Proveedores**
. Esto te permite:

* Realizar un seguimiento de qué proveedor proporciona cada pieza
* Identificar al proveedor preferido para las reposiciones
* Referenciar la información de contacto del proveedor al realizar pedidos

## Importar piezas

Haz clic en
**Importar**
en la lista de piezas para cargar en masa tu inventario de piezas desde un archivo CSV. Esto es útil al poner en marcha un catálogo de piezas existente.

[Equipamiento

Realiza un seguimiento del equipo auxiliar que está sujeto a Vehículos o Remolques, con horarios de mantenimiento, órdenes de trabajo y cobertura de garantía.](https://fleetbase.io/docs/fleet-ops/maintenance/equipment/overview)
[Visión general de la conectividad

Conecta Fleet-Ops con hardware externo: módems de telemetría, dispositivos GPS, sensores IoT y proveedores de datos de terceros.](https://fleetbase.io/docs/fleet-ops/connectivity/overview)