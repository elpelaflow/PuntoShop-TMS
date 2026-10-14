---
title: "Configuración del mapa"
url: https://fleetbase.io/docs/fleet-ops/settings/map
module: fleet-ops
---

# Configuración del mapa

Seleccione el proveedor de mosaicos que Fleet-Ops utiliza para el mapa en vivo y las superposiciones de rutas.

# Configuración del mapa

**Configuración del mapa**
están diseñados para ser mínimas en Fleet-Ops: la única cosa que puede configurar aquí es qué
**proveedor de mapas**
genera los mosaicos para el mapa en vivo. Todo lo demás (vista predeterminada, comportamiento de los marcadores, agrupación, tema) se basa en los valores predeterminados del proveedor activo y en las opciones de Leaflet a nivel de página que utilizan los componentes de Fleet-Ops.

Vaya a
**Fleet-Ops → Configuración → Mapa**
.

![Panel de configuración del mapa — Menú desplegable del proveedor de mapas con Leaflet / Google Maps](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-map-settings.5ec1cfae.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Proveedor de mapas

La única configuración en esta página. El valor
`mapProvider`
selecciona la fuente de mosaicos que Fleet-Ops utiliza en todo el panel de control: el mapa en vivo, las superposiciones de rutas, las reproducciones de posición y los mapas de detalles de pedidos, todos obtenidos del proveedor activo.

| Proveedor | Valor | Notas |
|---|---|---|
| **Leaflet** | `leaflet` | Predeterminado. Utiliza la fuente de mosaicos de Leaflet configurada (normalmente OpenStreetMap o un servidor de mosaicos compatible con Leaflet). No se requiere clave de API para los mosaicos de OSM. |
| **Google Maps** | `google` | Se activa el servidor de mosaicos de Google. Requiere una clave de API de Google Maps configurada a nivel de la plataforma. |

Haga clic en
**Guardar cambios**
para conservar la selección. El cambio se aplica la próxima vez que se renderice una vista de mapa: no es necesario actualizar la página para nuevos envíos.

Las extensiones pueden registrar proveedores de mapas adicionales en tiempo de ejecución a través del
`fleet-ops:template:settings:map`
registro. Si su instancia tiene opciones adicionales en el menú desplegable, se han añadido por una extensión instalada.

## Ampliando la configuración del mapa

La página de configuración del mapa expone un punto de extensión en la clave de registro
`fleet-ops:template:settings:map`
. Las extensiones que necesiten exponer sus propias configuraciones relacionadas con mapas (superposiciones de mapas de calor, capas personalizadas, proveedores de mosaicos alternativos) registran un panel en esa clave y este se renderiza debajo del selector de proveedores. Consulte [Extensiones](https://fleetbase.io/docs/platform/extensions/managing-extensions) para el patrón de registro.