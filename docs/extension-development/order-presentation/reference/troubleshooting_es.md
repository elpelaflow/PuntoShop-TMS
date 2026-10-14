---
título: "Solución de problemas"
url: https://fleetbase.io/docs/extension-development/order-presentation/reference/troubleshooting
módulo: extension-development
---

Presentación del pedido

Referencia

# Solución de problemas

¿Por qué un perfil de presentación de pedido no se aplica, falta una sección o está vacía, un campo o acción sigue visible, o un valor persiste después de un cambio de tipo — y cómo solucionarlo.

# Solución de problemas

## El formulario estándar sigue visible

Verifique cada paso:
[coincidencia](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works#matching-a-profile-to-an-order):

| Verificación | Cómo |
|---|---|
| El nombre de la configuración del pedido especifica el perfil | Su `meta.presentation_profile` es exactamente igual al `id` de su perfil |
| El perfil está registrado | En la consola, `universe.getService('registry').getRegistry('fleet-ops:order-presentation', 'profiles')` lo lista |
| El perfil se registra antes de que se renderice la vista | Registre desde `setupExtension`. Un perfil registrado posteriormente aplicará la próxima vez que se renderice la vista |
| `isEnabled` devuelve `true` | Exactamente `true`: un valor verdadero como `1` o una cadena no vacía no cuenta |
| La vista admite perfiles | Los hosts que renderizan `Order::Form` o `Order::Details` con un bloque, como el portal del cliente, no utilizan perfiles |

## El formulario o la vista de detalles está vacío

El perfil se aplica, pero no tiene
`form.sections`
o
`details.sections`. Cuando se aplica un perfil, sus listas representan todo el diseño. Agregue ambos: liste las
[secciones estándar](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form#the-standard-layout)
para mantener una vista como estaba.

## Falta una sección

| Causa | Solución |
|---|---|
| No está en la lista | Las listas de secciones reemplazan el diseño: liste todas las secciones nativas que desee |
| Nombre incorrecto para la vista | `details` es una sección de formulario; `detail` es una sección de detalles |
| Su componente no se renderiza | Verifique el nombre y la ruta del `ExtensionComponent` y asegúrese de que su motor esté instalado |
| Falta un componente de otra extensión | Los espacios de registro no se renderizan para los pedidos con perfil; consulte [La vista de detalles](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view#registry-slots-arent-rendered) |

## Un campo sigue visible

| Causa | Solución |
|---|---|
| La clave es incorrecta | Use las claves en [Ocultar campos](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields#hiding-fields) |
| No es posible ocultarlo | El selector de tipo de pedido y los campos personalizados no se pueden ocultar |
| Está en su propia sección | Lea `@hiddenFields` en su sección |

## Un campo oculto aún tiene un valor

Ocultar no elimina los valores. Restaurelos en
[`prepare`](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation#preparing-drafts)
.

## Una acción sigue visible

| Causa | Solución |
|---|---|
| El ID es incorrecto | Use los IDs en [Acciones](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions#action-ids), escritos exactamente |
| Solo uno de una pareja está oculto | `assign-driver` y `unassign-driver` son separados: oculte ambos |
| No es una acción incorporada | `hidden.actions` solo oculta las propias de Fleet-Ops; pregunte a la extensión que la agrega, o verifique el perfil en la acción propia en `visibleWhen` |

## El pedido no se puede guardar

| Causa | Solución |
|---|---|
| No hay recogida y entrega | Fleet-Ops aún lo requiere (o dos puntos de parada). Mantenga la sección `route`, o configure los dos desde su propia sección |
| Una regla de validación devuelve `false` | Verifique sus reglas `setOrderValidationRule` y asegúrese de que devuelvan `true` para los pedidos que no son suyos |

## El tipo de pedido no se puede cambiar

Una vez guardado, un pedido con un perfil mantiene su tipo: el selector está deshabilitado. Esto es intencional.

[API de servicio

El servicio de Fleet-Ops de presentación de pedidos — busque el perfil para un pedido o configuración de pedido, lea sus secciones y campos ocultos y acciones, y prepare borradores — con cómo acceder a él desde su extensión.](https://fleetbase.io/docs/extension-development/order-presentation/reference/service)
[Introducción

Un ciclo de vida de pedido configurado le da a un tipo de pedido sus propias actividades — su propio inicio, finalización y cancelación, sin asignación, y solo las transiciones que permite su flujo — que Fleet-Ops hace cumplir a través de su API.](https://fleetbase.io/docs/extension-development/order-lifecycles)