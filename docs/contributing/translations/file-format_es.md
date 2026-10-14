---
title: "Formato de archivo"
url: https://fleetbase.io/docs/contributing/translations/file-format
module: contributing
---

Traducciones

# Formato de archivo

Estructura YAML, sintaxis de marcador de posición, pluralización y convenciones de traducción para los archivos de localización de Fleetbase.

# Formato de archivo

Los archivos de traducción son
**YAML**
. Esta página cubre la estructura, lo que hay que traducir (y lo que hay que dejar como está), y las convenciones que mantienen la consistencia de las traducciones en diferentes idiomas.

## Anatomía de un archivo de localización

Un archivo de localización es un mapa anidado con claves y valores. Las claves describen dónde se utiliza una cadena; los valores son las cadenas en sí.

```
# en-us.yaml
common:
  new: Nuevo
  create: Crear
  edit: Editar
  delete: Eliminar
  delete-selected-count: Eliminar {count} elementos seleccionados

orders:
  new-order: Nuevo pedido
  status:
    created: Creado
    dispatched: Enviado
    completed: Completado
```

La traducción equivalente en francés:

```
# fr-fr.yaml
common:
  new: Nouveau
  create: Créer
  edit: Modifier
  delete: Supprimer
  delete-selected-count: Supprimer {count} éléments sélectionnés

orders:
  new-order: Nouvelle commande
  status:
    created: Créé
    dispatched: Envoyé
    completed: Terminé
```

## Las dos reglas no negociables

1. **Traduce los valores, nunca las claves.**
   Las claves son cómo la aplicación busca la traducción. Cambiar una clave (
   `new`
   →
   `nouveau`
   ) rompe la búsqueda y la interfaz de usuario vuelve a la clave original.
2. **Preserva los marcadores de posición exactamente.**
   Cualquier cosa dentro de
   `{curly_braces}`
   es una variable de tiempo de ejecución. Deja el nombre, las comillas y la posición intactas (puedes moverlas dentro de la frase — ver más abajo).

## Marcadores de posición

Los marcadores de posición son tokens como
`{count}`
,
`{name}`
,
`{resource}`
. Se reemplazan en tiempo de ejecución con valores dinámicos.

### No traduzcas el nombre del marcador de posición

```
# en-us.yaml
delete-confirm: ¿Estás seguro de que quieres eliminar {count} elementos?

# ❌ INCORRECTO — el nombre del marcador de posición se ha traducido
delete-confirm: ¿Está seguro de que quiere eliminar {compte} elementos?

# ✅ CORRECTO — el nombre del marcador de posición se ha conservado
delete-confirm: ¿Está seguro de que quiere eliminar {count} elementos?
```

### Puedes mover los marcadores de posición dentro de la frase

El orden de las palabras varía según el idioma, eso está bien. El marcador de posición puede moverse:

```
# en-us.yaml — count viene después del verbo
deleted-count: Eliminados {count} elementos
```

```
# ja-jp.yaml — count viene antes del sustantivo en la estructura de la frase japonesa
deleted-count: '{count}件のアイテムを削除しました'
```

### Marcadores de posición múltiples

Cuando una cadena tiene múltiples marcadores de posición, todos deben estar presentes en la traducción:

```
# en-us.yaml
assigned-driver-to-order: Asignado {driver} al pedido {order_id}

# ✅ CORRECTO
assigned-driver-to-order: Conductor {driver} asignado al pedido {order_id}
```

## Lo que hay que traducir

| Tipo | Traducir | Ejemplo |
| --- | --- | --- |
| **Etiquetas y botones de la interfaz de usuario** | ✅ Sí | `Guardar` , `Cancelar` , `Eliminar` |
| **Encabezados y títulos** | ✅ Sí | `Nuevo pedido` , `Configuración del conductor` |
| **Texto de ayuda y descripciones** | ✅ Sí | `Seleccione el vehículo asignado a este conductor` |
| **Mensajes de error y éxito** | ✅ Sí | `Pedido creado correctamente` |
| **Fechas y horas simples** | ✅ Sí | `Hoy` , `Ayer` , `mañana` |
| **Nombres de marcador de posición** ( `{count}` ) | ❌ No | Deja `{count}` , `{driver}` , etc. tal como están |
| **Nombres de marca** | ❌ No | `Fleetbase` , `Fleet-Ops` , `Ledger` , `Navigator` |
| **Términos técnicos sin equivalente local** | ❌ No (generalmente) | `API` , `webhook` , `OAuth` , `JWT` — ver [Glosario](https://fleetbase.io/docs/contributing/translations/glossary) |
| **Etiquetas HTML dentro de las cadenas** | ❌ No cambiar la estructura | `<b>` , `<a>` , `<br>` — conserva tal como está, traduce el texto dentro |
| **Formato Markdown** | ❌ No cambiar la estructura | `**negrita**` , `[enlace](...)` — conserva la sintaxis, traduce el texto visible |

## Pluralización

Algunos archivos de localización utilizan claves de pluralización. La convención sigue el patrón existente del idioma —
**no se deben introducir nuevos estilos de pluralización**
si el archivo ya los utiliza.

Si una clave tiene múltiples variantes de plural en
`en-us.yaml`
:

```
# en-us.yaml
items-count:
  one: '{count} item'
  other: '{count} items'
```

Proporcione todas ellas en su localización, incluso si el idioma solo tiene una forma (puede usar el mismo valor para
`one`
y
`other`
):

```
# ja-jp.yaml — el japonés no tiene distinción de plurales
items-count:
  one: '{count}件のアイテム'
  other: '{count}件のアイテム'
```

Si un idioma tiene más formas de plural que el inglés (ruso, polaco, árabe), coincida con lo que hay en el archivo de localización. Si el archivo aún no tiene esas formas,
**no las añada**
— cree un problema para que los mantenedores puedan ampliar el esquema.

## Idiomas RTL

Para los idiomas de izquierda a derecha (árabe, hebreo, persa, urdu), el archivo YAML es el mismo — traduzca los valores normalmente. La consola gestiona el renderizado direccional en tiempo de ejecución mediante propiedades lógicas CSS.

El contenido numérico y en latín permanece en su dirección natural. Los nombres de marca como
`Fleetbase`
permanecen en latín.

## Comillas y escape

YAML es sensible al espacio en blanco. Algunas reglas:

* **Comillas simples**
  cuando el valor contiene un carácter, un hash o comienza con un carácter especial:
  `'New: order created'`
  ,
  `'#123 received'`
* **Pipe
  `|`**
  para cadenas multilínea (conserva los saltos de línea):

  ```
  long-message: |
    First line.
    Second line.
  ```
* **Mayor que
  `>`**
  para cadenas multilínea que deben plegarse en una sola línea:

  ```
  long-message: >
    This is a long sentence
    that will be rendered as one line.
  ```
* **Escape los caracteres especiales**
  dentro de las cadenas entre comillas dobles:
  `"Save ""Draft"""`
  . Las cadenas entre comillas simples necesitan
  `''`
  para una comilla:
  `'L''Étranger'`
  .

## Caracteres y acentos

Se requiere la codificación UTF-8 (la mayoría de los editores lo hacen automáticamente). Los caracteres acentuados, los caracteres CJK, los scripts RTL, los emojis — todo está bien. Guarde la codificación de su archivo de editor como UTF-8 (sin BOM).

## Comillas y comillas invertidas

Use comillas ASCII estándar (
`'`
`"`
) dentro de YAML, no comillas invertidas (
`'`
`"`
`"`
`"`
) — las comillas invertidas pueden romper el analizador YAML dependiendo del contexto. La salida renderizada gestiona la tipografía automáticamente.

## Cadenas vacías

No deje una clave con un valor vacío:

```
# ❌ INCORRECTO — la interfaz de usuario no mostrará nada
title: ''

# ✅ O elimine la clave (vuelve a la versión en inglés)
title: Mon titre
```

Si no sabe cómo traducir una clave,
**déjela ausente**
en lugar de dejarla vacía — Fleetbase vuelve a la versión en inglés.

## Comprobaciones de validez antes de confirmar

* Todas las claves siguen siendo
  `en-us.yaml`
* Todas las
  `{placeholders}`
  se conservan con los nombres originales
* No se han traducido claves, solo valores
* Se conserva la estructura HTML/Markdown
* El archivo se guarda como UTF-8
* No hay valores vacíos

Continúe con
[Repositorios →](https://fleetbase.io/docs/contributing/translations/repositories)