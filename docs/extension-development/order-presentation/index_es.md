---
title: "Introducción"
url: https://fleetbase.io/docs/extension-development/order-presentation
module: extension-development
---

Presentación de Pedidos

# Introducción

Los perfiles de presentación de pedidos permiten que tu extensión cree un formulario de pedido personalizado, una vista de detalles y acciones para su propio tipo de pedido dentro de Fleet-Ops — compuesto por las secciones propias de Fleet-Ops y las tuyas — mientras que todos los demás pedidos mantienen las pantallas estándar.

# Presentación de Pedidos

Fleet-Ops tiene
**un formulario de pedido**
y
**una vista de detalles de pedido**
, diseñados para entregas: un conductor, un vehículo, una ruta, la asignación, la confirmación de entrega. Todos los tipos de pedido los utilizan.

Algunos tipos de pedido no son entregas. Un préstamo de vehículo, un alquiler de equipo, una cita de servicio o la recogida de documentos aún se benefician de ser un pedido de Fleet-Ops, con números de seguimiento, un historial de actividad, comentarios, documentos, el mapa y la vista. Pero su formulario necesita campos diferentes, y su vista de detalles debe mostrar información diferente.

Un
**perfil de presentación de pedidos**
permite que tu extensión cree su propio formulario, vista de detalles y acciones para su tipo de pedido, sin duplicar las pantallas de Fleet-Ops.

## ¿Qué cambia un perfil?

### El formulario de pedido

![El formulario de pedido estándar junto con el mismo formulario para un perfil de alquiler: una sección de "Equipo" añadida, una referencia de alquiler y un depósito añadidos a los detalles, los campos de "conductor", "vehículo" y "asignación" ocultados, y el nombre de la ruta cambiado a "Entrega y recogida"](https://fleetbase.io/_next/static/media/form-standard-vs-profile.d3066928.svg)

En el lado izquierdo está el formulario que todos los tipos de pedido utilizan. En el lado derecho está el mismo formulario para un
**alquiler de equipo**
, con un perfil que:

* **añade una sección del propio motor de la extensión**
  (Equipo), y omite las secciones que no utiliza un alquiler;
* **añade campos**
  a la sección de detalles (Referencia de alquiler, Depósito);
* **oculta campos**
  que no son aplicables (conductor, vehículo, asignación, etc.);
* **renombra**
  la sección de la ruta a "Entrega y recogida", y oculta la ruta de múltiples entregas.

### La vista de detalles

![El formulario de detalles estándar junto con la misma vista para un perfil de alquiler: una sección de "Resumen de alquiler" primero, solo las secciones nativas relevantes, y las acciones relacionadas con la asignación eliminadas del menú](https://fleetbase.io/_next/static/media/details-standard-vs-profile.d1e1c5b4.svg)

El perfil puede mostrar la vista de detalles con su propio resumen, mantener solo las secciones nativas relevantes, y eliminar acciones como
**Asignar conductor**
del menú "…", y de la tabla de pedidos.

## ¿Qué puedes personalizar?

|  | Qué | Página |
| --- | --- | --- |
| **Secciones del formulario** | Qué secciones tiene el formulario de pedido, y en qué orden: las propias de Fleet-Ops y las tuyas | [Formulario de Pedido](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form) |
| **Campos del formulario** | Campos adicionales en la sección de detalles, campos ocultos, el título de la sección de la ruta | [Campos del Formulario](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields) |
| **Secciones de detalles** | Qué secciones tiene la vista de detalles, y en qué orden | [Vista de Detalles](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view) |
| **Acciones** | Qué acciones ofrecen la tabla de pedidos y el menú de detalles | [Acciones](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions) |
| **Borradores** | Qué ocurre cuando un usuario cambia un nuevo pedido a, o desde, tu tipo de pedido | [Borradores y Validación](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation) |

## Solo tu tipo de pedido cambia

Un perfil se aplica a un pedido solo cuando el
**configuración del pedido**
, su tipo de pedido, nombra el perfil. Todos los demás pedidos, y todos los demás tipos de pedido, mantienen el formulario y la vista de detalles estándar de Fleet-Ops exactamente como antes. Consulta
[Cómo funciona](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works)
.

## Presentación, no comportamiento

Un perfil cambia lo que muestra la consola
**mostrando**. No cambia lo que hace un pedido
**realizando**: sus estados, si puede ser asignado, o qué pasos puede realizar. Para ello, proporciona a la configuración del pedido un
[ciclo de vida configurado](https://fleetbase.io/docs/extension-development/order-lifecycles)
. La mayoría de los tipos de pedido con un perfil también tienen uno:

|  | Perfil de presentación de pedidos | Ciclo de vida configurado del pedido |
| --- | --- | --- |
| **Cambia** | El formulario, la vista de detalles y las acciones en la consola | Las actividades del pedido, la asignación y las transiciones permitidas |
| **Definido en** | El `extension.js` de tu extensión | La configuración del pedido (`meta.lifecycle`) |
| **Aplicado por** | La consola | La API |

## Requisitos

Los perfiles de presentación de pedidos y los ciclos de vida configurados necesitan
**Fleet-Ops 0.6.71**
o posterior.

## ¿Qué sigue?

Cómo funciona

Cómo se adapta un perfil a un pedido, y dónde se aplica.

[Cómo funciona →](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works)

Cómo empezar

Crea un perfil paso a paso: un tipo de pedido, campos ocultos, tus propias secciones.

[Cómo empezar →](https://fleetbase.io/docs/extension-development/order-presentation/getting-started)

Objeto de Perfil

Cada clave que puede tener un perfil.

[Objeto de Perfil →](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)

Receta: Crear un tipo de pedido

Una extensión completa de alquiler de equipo: ciclo de vida, perfil, secciones y validación.

[Crear un tipo de pedido →](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type)

[Vistas personalizadas

Combina columnas, acciones, botones y elementos de menú registrados en vistas que tú mismo renderizas — una tabla personalizada, un encabezado de página, un diálogo — y el contexto para pasar a los controladores.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views)
[Cómo funciona

Cómo Fleet-Ops adapta un perfil a un pedido — la configuración del pedido, el registro y isEnabled — dónde se aplica un perfil en la consola, y qué deja sin cambios.](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works)