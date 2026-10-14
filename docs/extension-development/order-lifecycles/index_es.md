---
título: "Introducción"
url: https://fleetbase.io/docs/extension-development/order-lifecycles
módulo: extension-development
---

Ciclos de vida de los pedidos

# Introducción

Un ciclo de vida de pedido configurado le da a un tipo de pedido sus propias actividades: su inicio, finalización y cancelación, sin asignación, y solo las transiciones que permite su flujo, todo ello garantizado por la API de Fleet-Ops.

# Ciclos de vida de los pedidos

Cada pedido de Fleet-Ops sigue el
**ciclo de vida por defecto**
: se crea, se asigna a un conductor, se inicia y luego se completa o cancela. El flujo de un pedido configurado puede añadir pasos, pero
`creado`,
`asignado`
y
`iniciado`
siempre están presentes, y un pedido puede moverse a cualquier actividad.

Un pedido configurado puede reemplazarlo con
**su propio ciclo de vida**, que se define en su
`meta.lifecycle`:

![Un flujo de alquiler: Solicitado, Reservado, Con el cliente, Extendido, Devuelto y Completado, con Cancelado accesible desde Solicitado y Reservado; Solicitado es la actividad inicial, Completado y Cancelado son terminales](https://fleetbase.io/_next/static/media/rental-flow.2576e38c.svg)

```
{
    "initial": "requested",
    "completed": "completed",
    "canceled": "cancelled",
    "terminal": ["completed", "cancelled"],
    "dispatch": false,
    "strict_transitions": true
}
```

Con este ciclo de vida, los pedidos del config:

* **comienzan en "Solicitado"**, no en "Creado";
* **nunca se asignan**, por lo que nunca tienen un conductor ni acceden a la aplicación Navigator;
* **solo se mueven a lo largo de las flechas del flujo**: desde "Solicitado", solo a "Reservado" o "Cancelado";
* **se cierran**
  una vez que llegan a "Completado" o "Cancelado".

La API garantiza todo esto. Los configs sin
`meta.lifecycle`
mantienen el ciclo de vida por defecto.

## Cuándo usar uno

Utilice un ciclo de vida configurado para tipos de pedidos
**gestionados desde el panel**
: alquileres, préstamos, citas, cobros, aprobaciones. Su equipo, o su extensión, los mueve a lo largo de Fleet-Ops.

No utilice uno para pedidos
**que un conductor realiza en la aplicación Navigator**
. Navigator conoce el ciclo de vida por defecto: espera
`creado`,
`asignado`
y
`iniciado`, y ofrece los siguientes pasos para el conductor a partir de ellos. Un tipo de pedido que necesita conductores debe mantener el ciclo de vida por defecto y añadir sus propios pasos al flujo.

## Con un Perfil de Presentación

Un ciclo de vida cambia lo que un pedido
**hace**. Un
[perfil de presentación de pedidos](https://fleetbase.io/docs/extension-development/order-presentation)
cambia lo que el panel
**muestra**
para él: su formulario, vista de detalles y acciones. La mayoría de los tipos de pedido con uno tienen el otro.

## Páginas en esta sección

| Página | Cubre |
|---|---|
| [Configuración](https://fleetbase.io/docs/extension-development/order-lifecycles/configuration) | Las claves `meta.lifecycle` y el formato del flujo |
| [Qué cambia](https://fleetbase.io/docs/extension-development/order-lifecycles/what-changes) | Cómo se comportan la API y el panel para un ciclo de vida configurado |
| [Definir un flujo](https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow) | Un flujo completo en PHP e instalación del config de pedido |
| [Mover pedidos](https://fleetbase.io/docs/extension-development/order-lifecycles/moving-orders) | Avanzar un pedido desde el panel, tu motor y tu servidor |
| [Referencia del servidor](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference) | Métodos de `OrderConfig` y limitaciones actuales |

Los ciclos de vida configurados requieren
**Fleet-Ops 0.6.71**
o posterior.

[Solución de problemas
¿Por qué un perfil de presentación de pedidos no se aplica, falta o está vacío una sección, un campo o una acción sigue mostrando, o un valor persiste después de un cambio de tipo — y cómo solucionarlo.](https://fleetbase.io/docs/extension-development/order-presentation/reference/troubleshooting)
[Configuración

Las claves `meta.lifecycle` — inicial, completado, cancelado, terminal, asignado y strict\_transitions — con valores predeterminados, y el formato del flujo con el que funciona un ciclo de vida.](https://fleetbase.io/docs/extension-development/order-lifecycles/configuration)