---
title: "Proveedores"
url: https://fleetbase.io/docs/fleet-ops/resources/vendors/overview
module: fleet-ops
---

Proveedores

# Proveedores

Gestionar transportistas y proveedores externos: asignar conductores, configurar integraciones y enviar pedidos a plataformas de logística asociadas.

# Proveedores

**Proveedores**
son transportistas o proveedores externos en su red logística. A diferencia de los conductores y vehículos internos, un proveedor representa una empresa externa que proporciona sus propios conductores y flota. Los pedidos pueden asignarse a un proveedor, quien a su vez los envía utilizando sus propios recursos.

![Lista de proveedores — nombre del proveedor, tipo, número de conductores, indicador de estado e indicador de integración](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-vendors-list.f0752b10.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos del proveedor

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre de la empresa del proveedor |
| **Correo electrónico** | Correo electrónico de contacto |
| **Teléfono** | Número de teléfono de contacto |
| `website_url` | URL del sitio web del proveedor |
| **País** | País de operación principal |
| **ID de empresa** | Número de registro de la empresa |
| **Tipo** | Transportista, mensajero, socio, etc. |
| **Ubicación** | Dirección física/sede del proveedor |
| **Estado** | activo, inactivo, suspendido |
| **Notas** | Notas internas sobre el proveedor |

## Proveedor vs. Contacto

Los contactos representan a individuos (clientes, proveedores). Los proveedores representan empresas que ofrecen servicios de logística: pueden tener sus propios grupos de conductores y flota, y pueden integrarse con APIs externas.

## Crear un proveedor

Navegue a
**Fleet-Ops → Recursos → Proveedores**
.

Haga clic en
**+ Nuevo proveedor**
.

Ingrese el nombre del proveedor, los detalles de contacto y el tipo.

Asigne una
**Ubicación**
para la sede o centro de operaciones del proveedor.

Haga clic en
**Guardar**
.

## Asignar conductores y flotas a un proveedor

Los transportistas externos pueden tener sus propios conductores y vehículos registrados en Fleet-Ops:

1. Abra el registro del proveedor
2. Navegue a la pestaña
   **Conductores** → haga clic en
   **Añadir conductor**
3. Navegue a la pestaña
   **Flotas** → haga clic en
   **Añadir flota**

Los conductores y vehículos asignados al proveedor están incluidos en las ejecuciones de Orchestrator cuando se selecciona la flota del proveedor.

## Proveedores integrados

Para plataformas de logística externas (como Lalamove) conectadas a través de su API, Fleet-Ops utiliza un modelo separado llamado
**`IntegratedVendor`**
con su propio marco para añadir nuevos proveedores. Consulte
[Proveedores integrados](https://fleetbase.io/docs/fleet-ops/resources/vendors/integrated-vendors)
para la guía dedicada.

## Utilizar proveedores como facilitadores de pedidos

Al crear un pedido, puede asignar un proveedor como
**Facilitador**
— la entidad responsable de ejecutar la entrega. El rol de facilitador es independiente de la asignación de conductores: el proveedor es la empresa, el conductor es el individuo que ejecuta el trabajo.

Esto es útil para:

* Pedidos de transportistas externos donde el proveedor envía internamente
* Pedidos de proveedores integrados que se retransmiten a una plataforma asociada
* Subcontratar tipos específicos de pedidos a transportistas especializados

## Suborganizaciones

Si su instancia de Fleetbase forma parte de una configuración multiarrendatario, un proveedor puede asociarse con otra instancia de Fleetbase a través del campo
`connect_company_uuid`. Esto permite la retransmisión y el seguimiento de pedidos entre organizaciones.

## Páginas relacionadas

* [Proveedores integrados](https://fleetbase.io/docs/fleet-ops/resources/vendors/integrated-vendors)
  — conectar plataformas de logística externas (Lalamove, etc.) y añadir su propio proveedor a través del marco