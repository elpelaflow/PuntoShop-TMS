---
título: "Configuración"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/configuration
módulo: extension-development
---

Ciclos de vida de los pedidos

# Configuración

Las claves `meta.lifecycle` (inicial, completado, cancelado, terminal, envío y transiciones estrictas), con sus valores predeterminados, y el formato del flujo, son los que definen un ciclo de vida.

# Configuración

Un ciclo de vida tiene dos partes, ambas en la configuración del pedido:

| Parte | Dónde | Define |
|---|---|---|
| **El flujo** | `flow` | Las actividades y qué actividades pueden seguir a otras |
| **El ciclo de vida** | `meta.lifecycle` | Qué actividades son especiales y las reglas |

## Claves del ciclo de vida

Propiedad

Tipo

`inicial
?`

cadena

`completado
?`

cadena

`cancelado
?`

cadena

`terminal
?`

cadena[]

`envío
?`

booleano

`transiciones_estrictas
?`

booleano

Una configuración tiene un ciclo de vida configurado tan pronto como
`meta.lifecycle`
es un objeto no vacío. Las claves que dejas en blanco toman su valor predeterminado.

### Ciclos de vida mínimos

```
// Punto de inicio propio, de lo contrario, las reglas del ciclo de vida de envío
{ "inicial": "solicitado" }

// Nunca enviado
{ "inicial": "solicitado", "envío": false }

// Nunca enviado, y solo las transiciones del flujo
{ "inicial": "solicitado", "envío": false, "transiciones_estrictas": true }
```

## El flujo

`flow`
es un objeto con claves que corresponden a las actividades. Cada actividad enumera las claves de las actividades que pueden seguirla:

```
{
    "solicitado": {
        "clave": "solicitado",
        "código": "solicitado",
        "estado": "Solicitado",
        "detalles": "Solicitud de alquiler",
        "color": "#6B7280",
        "secuencia": 0,
        "actividades": ["reservado", "cancelado"],
        "lógica": [],
        "eventos": [],
        "acciones": [],
        "entidades": [],
        "opciones": [],
        "completado": false,
        "requiere_pod": false,
        "método_pod": null
    },
    "reservado": { "…": "…" }
}
```

| Campo | Descripción |
|---|---|
| `clave` | La clave de la actividad en el flujo; otras actividades se refieren a ella en `actividades` |
| `código` | El código de estado que obtienen los pedidos en esta actividad. Las claves del ciclo de vida se refieren a las actividades por **código** |
| `estado` | La etiqueta que se muestra a los usuarios en la línea de tiempo, en el panel y en la página de seguimiento. Puede utilizar marcadores de posición como `{nombre_del_cliente}` |
| `detalles` | La descripción más larga registrada para la actividad |
| `color` | El color de la actividad en la consola |
| `secuencia` | Activa actividades que comparten un padre |
| `actividades` | Claves de las actividades que pueden seguir esta |
| `completado` | Si alcanzar esta actividad completa el pedido |
| `requiere_pod`, `método_pod` | Requiere prueba de entrega en esta actividad |
| `lógica`, `eventos`, `acciones`, `entidades`, `opciones` | Condiciones y efectos secundarios; consulte el editor de la configuración del pedido |

Mantén
`clave`
y
`código`
iguales a menos que tengas una razón para no hacerlo: el panel y el ciclo de vida utilizan códigos, y el flujo utiliza claves.

## Dónde se establece

La mayoría de las extensiones escriben ambas partes desde su código del servidor cuando instalan la configuración del pedido; consulte
[Definir un flujo](https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow)
. El editor de la configuración del pedido en
**Fleet-Ops → Operaciones → Configuración del pedido**
edita el flujo, pero no
`meta.lifecycle`
.

Mantén las claves
`meta`
que utilizan otras partes de Fleet-Ops (
`lifecycle`
,
`presentación_profile`
) cuando actualizas una configuración, y coloca tus propias configuraciones bajo una clave llamada después de tu extensión.

[Introducción

Una configuración de ciclo de vida de pedidos proporciona a un tipo de pedido sus propias actividades: su propio inicio, finalización y cancelación, sin envío, y solo las transiciones que permite su flujo, lo que se hace cumplir por la API de Fleet-Ops.](https://fleetbase.io/docs/extension-development/order-lifecycles)
[Qué cambia

Cómo se comporta la API y el panel de Fleet-Ops para una configuración de pedido con un ciclo de vida configurado: creación, envío, actualización de actividades, cancelación, el menú de detalles, el panel y el editor de flujo, y lo que sucede después del ciclo de vida de envío.](https://fleetbase.io/docs/extension-development/order-lifecycles/what-changes)