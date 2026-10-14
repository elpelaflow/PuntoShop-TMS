---
title: "Ayudantes de permisos"
url: https://fleetbase.io/docs/ui/helpers/permissions
module: ui
---

# Ayudantes de permisos

Ayudantes para el renderizado condicional basado en los permisos de IAM (control de acceso), como "puede realizar", "no puede realizar", "puede eliminar", "puede escribir", etc.

# Ayudantes de permisos

Estos ayudantes envuelven
[`ember-can`](https://github.com/minutebase/ember-can)
para hacer que el control de permisos sea conciso en las plantillas. Son funciones puras: pasar argumentos obsoletos devuelve respuestas obsoletas, por lo que es mejor definir la cadena de la capacidad directamente en lugar de calcularla externamente.

Para el control de permisos a nivel de componente, es preferible utilizar el argumento incorporado
`@permission`
en
`<Button>`,
`<ContentPanel>`,
`<Toggle>`, etc. Utilice estos ayudantes cuando el propio componente no acepte
`@permission`
o cuando necesite controlar cualquier elemento.

## {{can-action ability}}

Devuelve `true` si el usuario actual tiene la capacidad:

```
{{#if (can-action "fleet-ops driver delete")}}
  <Button @type="danger" @text="Eliminar conductor" @onClick={{this.delete}} />
{{/if}}
```

## {{cannot-action ability}}

La negación:

```
{{#if (cannot-action "fleet-ops driver delete")}}
  <span class="text-gray-400">No tiene permiso para eliminar conductores</span>
{{/if}}
```

## {{can-delete subject}}

Facilidad para las capacidades de estilo "delete-<modelo>":

```
{{#if (can-delete @driver)}}
  <Button @type="danger" @icon="trash" @onClick={{fn this.delete @driver}} />
{{/if}}
```

## {{cannot-delete subject}}

La negación de
`can-delete`
.

## {{can-write subject}}

Facilidad para las capacidades de estilo "update-<modelo>":

```
{{#if (can-write @driver)}}
  <InputGroup @name="Name" @value={{@driver.name}} />
{{else}}
  <InputGroup @name="Name" @value={{@driver.name}} @disabled={{true}} />
{{/if}}
```

## {{cannot-write subject}}

La negación.

## {{get-write-permission subject}}

Devuelve la cadena de capacidad utilizada por
`can-write`
para un sujeto: útil para pasarlo al argumento
`@permission`
del componente:

```
<Button
  @text="Guardar"
  @permission={{get-write-permission @driver}}
  @onClick={{this.save}}
/>
```

## {{can-remove-chat-participant participant chat}}

Ayudante especializado para el control de permisos de la función de chat. Devuelve `true` si el usuario actual puede eliminar al participante especificado del chat.

## Ver también

* [`<Button @permission>`](https://fleetbase.io/docs/ui/actions/button)
  y similares: control de permisos declarativo en componentes
* El sistema de IAM y roles en la
  [documentación de la plataforma](https://fleetbase.io/docs/platform/identity-and-access)

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/helpers/can-action.js` | Ayudante |
| `addon/helpers/can-delete.js` | Ayudante |
| `addon/helpers/can-write.js` | Ayudante |
| `addon/helpers/cannot-action.js` | Ayudante |
| `addon/helpers/cannot-delete.js` | Ayudante |
| `addon/helpers/cannot-write.js` | Ayudante |
| `addon/helpers/get-write-permission.js` | Ayudante |
| `addon/helpers/can-remove-chat-participant.js` | Ayudante |