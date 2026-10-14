---
título: "Cómo funciona"
url: https://fleetbase.io/docs/extension-development/order-presentation/how-it-works
módulo: extension-development
---

Presentación de pedidos

# Cómo funciona

Cómo Fleet-Ops asigna un perfil de presentación a un pedido — la configuración del pedido, el registro y isEnabled — donde un perfil se aplica en la consola, y lo que deja sin cambios.

# Cómo funciona

## Asignar un perfil a un pedido

![Cómo se aplica un perfil: la configuración del pedido del pedido nombra un perfil en meta.presentation_profile; Fleet-Ops encuentra el perfil registrado con ese ID; si isEnabled devuelve true, el perfil se aplica, de lo contrario se utiliza la vista predeterminada](https://fleetbase.io/_next/static/media/how-a-profile-applies.acd01b37.svg)

Cada vez que Fleet-Ops renderiza un formulario, una vista de detalles o acciones de un pedido, solicita al
`order-presentation`
servicio el perfil del pedido:

1.  **Lee la configuración del pedido.**
    Cada pedido tiene uno: es el tipo del pedido, como Transporte o Alquiler de equipos.
2.  **Lee
    `meta.presentation_profile`
    de esa configuración.**
    Si no hay valor, no se aplica ningún perfil.
3.  **Busca un perfil registrado con ese
    `id`**,
    en el
    `fleet-ops:order-presentation`
    registro, en la sección
    `profiles`
    . Tu extensión lo ha registrado desde
    `setupExtension`
    .
4.  **Llama al
    `isEnabled(orderConfig)`
    del perfil, si existe.**
    El perfil solo se aplica si esto devuelve exactamente
    `true`
    .

Si cualquier paso falla, el pedido utiliza la presentación estándar de Fleet-Ops.

Dos partes trabajan juntas, y ambas son tuyas:

| Parte | Dónde vive | Define |
|---|---|---|
| **El perfil** | Tu extensión `addon/extension.js` | Cómo se ven el formulario, los detalles y las acciones |
| **La configuración del pedido** | La base de datos, normalmente creada por el código del servidor de tu extensión | `meta.presentation_profile`: qué perfil utiliza para sus pedidos |

## Dónde se aplica un perfil

| Dónde | Qué controla el perfil |
|---|---|
| **Operaciones → Pedidos → Nuevo** | Secciones del formulario, campos del formulario, campos ocultos, título de la ruta, `prepare` y `release` |
| **El panel lateral de creación y edición** | La misma que la página de nuevo pedido |
| **Editar detalles** , en el menú "…" de un pedido | Abre el formulario perfilado en un panel lateral, en lugar del diálogo de edición estándar |
| **La vista de detalles del pedido** | Secciones de detalles |
| **La tabla de pedidos** | Acciones ocultas en el menú "…" de cada fila |
| **El menú "…" de los detalles del pedido** | Acciones ocultas |

## Qué deja sin cambios un perfil

*   **Pedidos cuya configuración no nombra el perfil.**
    Se renderizan exactamente como antes.
*   **Vistas que disponen el diseño del formulario por sí mismas.**
    Un host que renderiza
    `Order::Form`
    o
    `Order::Details`
    con un bloque, como el formulario de pedido del portal del cliente, elige su propio diseño; los perfiles no se aplican allí.
*   **Lo que hace un pedido.**
    Los estados, el envío y las transiciones permitidas provienen de la configuración del pedido y
    [lifecycle](https://fleetbase.io/docs/extension-development/order-lifecycles)
    , no del perfil.
*   **Pestañas de detalles**
    registradas para los pedidos, como la pestaña Factura de Ledger, aún aparecen.

**Un perfil reemplaza todo el diseño del formulario y los detalles.**
Para un pedido perfilado, Fleet-Ops no renderiza los espacios de registro que utilizan las extensiones para inyectar componentes en el formulario y la vista de detalles estándar (
`fleet-ops:component:order:form:*`
y
`fleet-ops:component:order:details:*`
). Los componentes que otras extensiones registran allí no aparecen en tu tipo de pedido.

## Cuando se busca el perfil

No hay almacenamiento en caché: el perfil se busca cada vez que se renderiza un formulario, una vista de detalles o un menú de acciones, y
`isEnabled`
se llama cada vez. Esto significa:

*   un perfil que tu extensión registra más tarde, o un
    `isEnabled`
    resultado que cambia, tiene efecto la próxima vez que se renderiza la vista;
*   `isEnabled`
    debe ser rápido, y leer el estado que ya ha cargado tu extensión, en lugar de obtenerlo.

## Un perfil es un objeto simple

Un perfil no tiene ninguna clase que extender. Es un objeto con un
`id`
y las partes que quieres cambiar. Consulta
[Profile Object](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)
.

**Siempre proporciona tanto
`form.sections`
como
`details.sections`**.
Cuando se aplica un perfil, sus listas de secciones son todo el diseño: no hay respaldo a la vista predeterminada. Un perfil sin
`form.sections`
muestra un formulario de pedido vacío, y uno sin
`details.sections`
una vista de detalles vacía. Para mantener una vista como estándar, enumera las secciones estándar; consulta
[The Order Form](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form#the-standard-layout)
.

Todo lo demás es opcional: no
`hidden`
oculta nada, y no
`prepare`
hace nada.

[Introduction

Los perfiles de presentación de pedidos permiten que tu extensión proporcione a un tipo de pedido específico una forma de pedido, una vista de detalles y acciones personalizadas en Fleet-Ops, compuestas a partir de las secciones y las tuyas, mientras que todos los demás pedidos utilizan las pantallas estándar.](https://fleetbase.io/docs/extension-development/order-presentation)
[Getting Started

Construye un primer perfil de presentación de pedidos paso a paso: una configuración de pedido que lo nombra, un perfil que mantiene el diseño estándar, luego campos ocultos, tus propias secciones de formulario y detalles, y acciones ocultas.](https://fleetbase.io/docs/extension-development/order-presentation/getting-started)