---
título: "Lugares"
url: https://fleetbase.io/docs/fleet-ops/resources/places/overview
módulo: fleet-ops
---

Lugares

# Lugares

Cree y gestione una biblioteca de ubicaciones guardadas: puntos de recogida, almacenes, centros de distribución y direcciones de entrega utilizadas en todos los pedidos.

# Lugares

**Lugares**
son ubicaciones guardadas en Fleet-Ops: direcciones reutilizables para puntos de recogida, almacenes, centros de distribución, direcciones de clientes y cualquier otra ubicación que su operación utilice con regularidad. Al crear pedidos, puede seleccionar desde su biblioteca de Lugares en lugar de introducir direcciones cada vez.

![Lista de Lugares — nombre del lugar, icono de tipo, dirección y contacto asociado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-places-list.0b02bba4.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos del Lugar

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre de visualización (por ejemplo, "Almacén Principal", "Oficina del Cliente") |
| **Tipo** | Categoría de la ubicación (ver tipos a continuación) |
| **Calle 1 / Calle 2** | Dirección de la calle |
| **Ciudad** | Ciudad |
| **Provincia / Estado** | Estado o provincia |
| **Código Postal** | Código postal o ZIP |
| **País** | País (código ISO) |
| **Barrio / Distrito** | Área sub-divisional dentro de la ciudad |
| **Edificio** | Nombre o número del edificio |
| **Código de Acceso de Seguridad** | Código de puerta o acceso para el conductor |
| **Teléfono** | Número de teléfono de contacto en esta ubicación |
| **Ubicación** | Coordenadas precisas (latitud, longitud) |

## Tipos de Lugares

| Tipo | Caso de uso |
|---|---|
| **Cliente** | Dirección de entrega para un cliente |
| **Proveedor** | Ubicación de recogida para un proveedor |
| **Almacén** | Almacenamiento interno y centro de distribución |
| **Centro** | Instalación de clasificación o transferencia |
| **Punto de Servicio** | Buzón o ubicación de servicio |
| **Centro de Devolución** | Destino para artículos devueltos |

## Crear un Lugar

Navegue a
**Fleet-Ops → Recursos → Lugares**
.

Haga clic en
**Nuevo Lugar**
.

Introduzca un
**Nombre**
y seleccione el
**Tipo**
.

Introduzca los detalles de la dirección. A medida que escriba, el geocodificador sugiere direcciones: seleccione una para completar automáticamente los campos y establecer las coordenadas.

Ajuste el icono en el mapa si la posición geocodificada necesita corrección.

Establezca el
**Código de Acceso de Seguridad**
si el conductor necesita un código para acceder.

Haga clic en
**Guardar**
. El lugar ahora está disponible para su selección al crear pedidos.

## Utilizar Lugares en Pedidos

Al crear el "payload" de un pedido, los campos
**Recogida**
y
**Entrega**
soportan la autocompletación desde su biblioteca de Lugares. Escriba el nombre o la dirección del lugar y seleccione de las sugerencias. Seleccionar un lugar guardado también carga automáticamente el número de teléfono de contacto y el código de acceso.

## Panel de Detalles del Lugar

Haga clic en cualquier lugar para abrir su panel de detalles:

* **Visión general**
  — detalles de la dirección y mapa
* **Pedidos**
  — pedidos que han utilizado este lugar como punto de recogida o entrega
* **Actividad**
  — actividad de entrega reciente en esta ubicación
* **Rendimiento**
  — tasa de éxito de la entrega y tiempo promedio en la ubicación
* **Documentos**
  — archivos adjuntos y notas para la ubicación
* **Reglas**
  — reglas automáticas para pedidos en esta ubicación (opcional)

![Panel de detalles del lugar — nombre y dirección, ciudad y país, coordenadas, un mapa de la ubicación y el icono del lugar](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-place-details.6adabab7.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## En el Mapa en Vivo

Los lugares aparecen como marcadores en el mapa en vivo cuando se habilita la visualización del mapa. Esto proporciona a los despachadores una referencia visual de todas las ubicaciones conocidas de recogida y entrega en el área operativa de la flota.

## Áreas de Servicio y Zonas

Los lugares no están definidos por Áreas de Servicio o Zonas: no hay una clave externa de un Lugar a una Área de Servicio, y la ubicación geográfica de un Lugar no se asocia automáticamente con las áreas delimitadas por polígonos definidas en otros lugares en Fleet-Ops. Las Áreas de Servicio y Zonas operan como un concepto de ámbito separado utilizado por las Tarifas de Servicio y el Orchestrator para filtrar rutas y precios; no indexan Lugares.

Consulte
[Tarifas de Servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
para ver cómo funcionan las Áreas de Servicio y Zonas para definir los precios.

## Importar Lugares

Haga clic en
**Importar**
en la lista de lugares para cargar en masa desde un archivo CSV. Descargue la plantilla, complete los datos de su ubicación y cargue. Fleet-Ops geocodifica cualquier dirección que no tenga coordenadas.