---
título: "Qué cambios"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/what-changes
módulo: extension-development
---

Ciclos de vida de los pedidos

# Qué cambios

Cómo funcionan la API y el panel de control de Fleet-Ops para una configuración de pedido con un ciclo de vida definido: creación, envío, actualización de actividades, cancelación, el menú de detalles, el tablero y el editor de flujo, y lo que ocurre después del envío.

# Qué cambios

El ciclo de vida se aplica a través de la API interna de Fleet-Ops, que utiliza el panel de control (`/int/v1/orders`), y también a través del propio panel de control.

**La API REST pública ( `/v1/orders` ) y la aplicación Navigator siguen el ciclo de vida de envío.**
No leen
`meta.lifecycle`: un pedido creado a través de
`/v1/orders`
comienza en
`created`
, y los puntos finales
`dispatch`
y
`update-activity`
no aplican las reglas del ciclo de vida. Cree y mueva pedidos con un ciclo de vida definido desde el panel de control o su extensión. Consulte
[Cuándo usar uno](https://fleetbase.io/docs/extension-development/order-lifecycles#when-to-use-one)
.

## En la API

### Crear un pedido

|  | Sin ciclo de vida | Con ciclo de vida |
| --- | --- | --- |
| **Estado** | `created` , o el `status` enviado | El código `initial`. Un `status` enviado se ignora |
| **Primer estado de seguimiento** | `CREATED` , "Pedido creado" | La actividad `initial`: su código como código de seguimiento ( `REQUESTED` ), su `status` y texto de `details` |
| **Envío** | Enviado a menos que se envíe `dispatched: false` | Con `dispatch: false` : guardado con `dispatched` y `adhoc` false, y nunca enviado, independientemente de lo que se haya enviado |

### Enviar

Con
`dispatch: false`
:

* **Enviar**
  (
  `PATCH /int/v1/orders/dispatch`
  ) devuelve un error: "Los pedidos de este tipo no se envían."
* **Enviar en masa**
  (
  `POST /int/v1/orders/bulk-dispatch`
  ) marca estos pedidos como fallidos y envía los demás.

### Actualizar la actividad

Con
`strict_transitions: true`
,
**Actualizar la actividad**
(
`PATCH /int/v1/orders/update-activity/{id}`
) solo acepta una actividad que sea:

1. en el flujo de la configuración;
2. listada en las actividades actuales
   `activities`
   ;
3. no después de una actividad terminal.

Cualquier otra cosa se rechaza con un
`422`
: "Esta actividad no es el siguiente paso permitido para el pedido."

Cuando la actividad se acepta, la API la utiliza
**tal como lo define el flujo**, no como lo envió la solicitud, por lo que un cliente no puede cambiar la etiqueta de una actividad, su requisito de prueba de entrega o si completa el pedido.

Sin
`strict_transitions`
, cualquier actividad se acepta, como en el ciclo de vida de envío.

### Cancelar y completar

* **Cancelar**
  mueve el pedido a la actividad
  `canceled`
  , y establece su estado en ese código, como
  `cancelled`
  .
* La actividad
  `completed`
  es la que completa el pedido.

## En el panel de control

### El menú de detalles del pedido

**Editar detalles**,
**Actualizar la actividad**
y
**Cancelar el pedido**
se desactivan una vez que el pedido se ha cerrado: su estado es uno de
`terminal`
, o los códigos
`completed`
o
`canceled`
.

### El tablero

Cuando se filtra el tablero de pedidos para mostrar la configuración, sus columnas corresponden a las actividades del flujo:

* comenzando en
  `initial`
  y siguiendo las flechas del flujo, de forma amplia;
* con las etiquetas de `status` de cada actividad;
* seguidas de cualquier actividad que el usuario no alcance, mediante
  `sequence`
  ;
* más una columna para cualquier estado del pedido que no esté en el flujo, para que ningún pedido desaparezca.

No se añaden columnas de envío. Una tarjeta solo se puede arrastrar a una de las siguientes actividades del pedido.

### El editor de la configuración del pedido

En
**Fleet-Ops → Operaciones → Order Config**
, para una configuración con un ciclo de vida:

* `created`
  ,
  `dispatched`
  y
  `started`
  no se fuerzan al flujo;
* la actividad
  `initial`
  es la raíz: se pueden añadir actividades después de ella, pero no se pueden eliminar;
* restablecer el flujo restaura el flujo guardado de la configuración, no el flujo de envío predeterminado.

## Qué sigue asumiendo el ciclo de vida de envío

* La API REST pública y la aplicación Navigator (anteriormente mencionadas).
* El filtro de estado "Activo" de la lista de pedidos.
* Los pedidos activos en el mapa en vivo.
* Métricas y recuentos del panel.

Consulte
[Referencia del servidor](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference#limitations)
.

[Configuración

Las claves de `meta.lifecycle` — initial, completed, canceled, terminal, dispatch y strict_transitions — con valores predeterminados, y el formato del flujo de actividades, funcionan con un ciclo de vida.](https://fleetbase.io/docs/extension-development/order-lifecycles/configuration)
[Definir un flujo

Defina el flujo y el ciclo de vida de un tipo de pedido en PHP, instale la configuración del pedido para cada organización, y actualícela de forma segura en las versiones posteriores de su extensión.](https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow)