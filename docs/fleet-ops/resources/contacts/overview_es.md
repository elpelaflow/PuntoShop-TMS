---
title: "Contactos"
url: https://fleetbase.io/docs/fleet-ops/resources/contacts/overview
module: fleet-ops
---

Contactos

# Contactos

Gestiona a las personas y empresas con las que tu operación trabaja: clientes, proveedores y facilitadores, con ubicaciones vinculadas y campos personalizados.

# Contactos

**Contactos**
son las personas y empresas con las que tu operación logística interactúa. Son los clientes que reciben entregas, los proveedores que realizan recogidas y los facilitadores que coordinan las operaciones. Los contactos están vinculados a Lugares (su ubicación física) y pueden asignarse a pedidos en el rol de cliente o facilitador.

![Lista de contactos — nombre, tipo, correo electrónico, teléfono y ubicación vinculada](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-contacts-list.ade3aedd.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tipos de Contacto

| Tipo | Rol |
|---|---|
| **Cliente** | Recibe una entrega — vinculado a la ubicación de entrega |
| **Proveedor** | Origen de los artículos — vinculado a la ubicación de recogida |
| **Facilitador** | Coordina o gestiona el pedido en nombre de un cliente |
| **Contacto** | Contacto general sin estar vinculado a un rol específico |

## Atributos del Contacto

| Campo | Descripción |
|---|---|
| `nombre` | Nombre completo o nombre de la empresa |
| `título` | Cargo o etiqueta de rol |
| `email` | Dirección de correo electrónico — utilizada para notificaciones de pedidos |
| `teléfono` | Número de teléfono — utilizado para notificaciones SMS |
| `tipo` | cliente, proveedor, facilitador, contacto |
| `notas` | Notas de texto libre sobre el contacto |
| `place_uuid` | Registro de Lugar vinculado (dirección física) |
| `photo_uuid` | Foto de perfil o logotipo |
| `internal_id` | ID de referencia externo para el contacto |
| `meta` | Campos personalizados específicos para tu operación |

## Crear un Contacto

Navega a
**Fleet-Ops → Recursos → Contactos**
.

Haz clic en
**Nuevo Contacto**
.

Introduce el nombre, el teléfono y el correo electrónico del contacto.

Selecciona el
**Tipo**
(cliente, proveedor, facilitador o contacto).

Vincula un
**Lugar**
— la dirección física del contacto. Selecciona de los lugares existentes o introduce uno nuevo.

Haz clic en
**Guardar**
.

## Utilizar Contactos en Pedidos

Al crear un pedido, puedes asignar un contacto como:

* **Cliente**
  — el destinatario. Se utilizan el número de teléfono y el correo electrónico del cliente para las notificaciones de entrega.
* **Facilitador**
  — el coordinador. Si se establece un facilitador, este recibe notificaciones operativas en lugar del cliente.

La ubicación vinculada del contacto se puede utilizar directamente como la dirección de recogida o entrega al crear el conjunto de datos del pedido.

## Sección de Clientes

La barra lateral tiene una subsección dedicada
**Clientes**
dentro de Contactos que filtra para mostrar solo los contactos de tipo
**cliente**
. Esta es una vista de conveniencia para las operaciones centradas en la gestión de clientes.

## Campos Personalizados

Se pueden adjuntar datos adicionales específicos para tu operación a los contactos utilizando
**Campos Personalizados**
. Navega a
**Fleet-Ops → Configuración → Campos Personalizados → Contactos**
para definir campos como número de cuenta, nivel de fidelidad o tipo de contrato.

## Importar Contactos

Haz clic en
**Importar**
en la lista de contactos para importar en masa desde un archivo CSV. Descarga la plantilla, completa tus datos y súbelo. Fleet-Ops crea todos los registros de contacto con sus lugares vinculados.

## Notificaciones

Cuando un contacto se vincula a un pedido como cliente, recibe:

* **Notificación de envío**
  — cuando el pedido se envía al conductor
* **Notificación en tránsito**
  — cuando el conductor está en camino
* **Notificación de finalización**
  — cuando la entrega se confirma con prueba

Los canales de notificación (SMS, correo electrónico, push) y las plantillas de mensajes se configuran en
**Fleet-Ops → Configuración → Notificaciones**
.

[Proveedores Integrados

Conéctate a plataformas de logística externas (Lalamove y otras) utilizando el marco de Proveedores Integrados, y aprende a registrar tu propio proveedor.](https://fleetbase.io/docs/fleet-ops/resources/vendors/integrated-vendors)
[Lugares

Crea y gestiona una biblioteca de ubicaciones guardadas — puntos de recogida, almacenes, centros y direcciones de entrega utilizadas en los pedidos.](https://fleetbase.io/docs/fleet-ops/resources/places/overview)