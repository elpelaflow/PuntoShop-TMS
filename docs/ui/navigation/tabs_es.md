---
title: "Pestañas"
url: https://fleetbase.io/docs/ui/navigation/tabs
module: ui
---

# Pestañas

`<Tabs>` es el contenedor de pestañas ligero que proporciona un subcomponente `<Tab>` anidado. Cada `<Tab>` toma un `@title` y renderiza su contenido a través de Ember Wormhole en el área de contenido compartida.

# `<Tabs>`

`<Tabs>`
es el contenedor de pestañas ligero en
`@fleetbase/ember-ui`. Proporciona un subcomponente anidado
`<Tab>` — cada pestaña tiene un
`@title`
y renderiza su contenido en el área de pestañas compartida.

Para una barra de pestañas más rica, con iconos, insignias, pestañas que se pueden cerrar y un botón para añadir pestañas, utilice
[`<TabNavigation>`](https://fleetbase.io/docs/ui/navigation/tab-navigation).

## Uso básico

```
<Tabs as |Tab|>
  <Tab @title="Perfil">
    <p>Contenido del perfil</p>
  </Tab>
  <Tab @title="Seguridad">
    <p>Contenido de la seguridad</p>
  </Tab>
  <Tab @title="Notificaciones">
    <p>Contenido de las notificaciones</p>
  </Tab>
</Tabs>
```

La primera pestaña se activa automáticamente. Haga clic en cualquier pestaña para cambiar.

## Argumentos

### Contenedor `<Tabs>`

| Argumento | Tipo | Descripción |
|---|---|---|
| `@onClick` | `(tabName)` | Se llama cuando el usuario hace clic en una pestaña |
| `@onTabClick` | `(tabName)` | Alias de `@onClick` |
| `@onTabCreated` | `(tabName)` | Se llama cuando se registra cada `<Tab>` (una vez por pestaña al renderizar inicialmente) |
| `@tagContentClass` | string | Clases adicionales en el contenedor de contenido compartido |

### Subcomponente `<Tab>` anidado

| Argumento | Tipo | Descripción |
|---|---|---|
| `@title` | string | La etiqueta de la pestaña (también utilizada como el nombre interno de la pestaña — con guiones) |
| `@tabClass` | string | Clases adicionales en el elemento `<a>` de la pestaña |
| `@tabListItemClass` | string | Clases adicionales en el elemento `<li>` de la pestaña |
| `@tagPaneClass` | string | Clases adicionales en el panel de la pestaña |

Cualquier atributo adicional
`...attributes`
en un
`<Tab>`
se pasa al elemento del panel de la pestaña.

## Cómo funciona

`<Tabs>`
renderiza un
`<ul>`
de enlaces de pestañas, así como un área de contenido
`<div>`
vacío. Cada
`<Tab>`
se registra con el padre al crearse y (cuando está activa) utiliza
`<EmberWormhole>`
para renderizar su contenido en el área de contenido compartida.

El estado activo de la pestaña se rastrea en el padre. Al hacer clic en una pestaña, se actualiza el estado activo y se vuelve a renderizar el contenido.

## Ejemplos del mundo real

```
{{!-- Panel de configuración con tres pestañas --}}
<Tabs as |Tab|>
  <Tab @title="General">
    <InputGroup @name="Nombre de visualización" @value={{this.user.display_name}} />
    <InputGroup @name="Correo electrónico" @value={{this.user.email}} />
  </Tab>
  <Tab @title="Seguridad">
    <InputGroup @name="Contraseña actual" @type="password" />
    <InputGroup @name="Nueva contraseña" @type="password" />
  </Tab>
  <Tab @title="API">
    <ClickToReveal @value={{this.user.api_token}} @clickToCopy={{true}} />
  </Tab>
</Tabs>

{{!-- Con una función de devolución de llamada cuando se cambia de pestaña --}}
<Tabs @onTabClick={{this.recordTabSwitch}} as |Tab|>
  <Tab @title="Resumen"><OverviewPanel /></Tab>
  <Tab @title="Actividad"><ActivityLog @subjectId={{this.id}} /></Tab>
</Tabs>
```

## Cuándo utilizar cada uno

| Necesidad | Uso |
|---|---|
| Pestañas simples e incrustadas en un panel | `<Tabs>` |
| Pestañas impulsadas por la ruta ( `LinkTo` ) | [`<TabNavigation>`](https://fleetbase.io/docs/ui/navigation/tab-navigation) con `route` en cada pestaña |
| Pestañas con iconos / insignias / que se pueden cerrar / botón de añadir | [`<TabNavigation>`](https://fleetbase.io/docs/ui/navigation/tab-navigation) |

## Ver también

* [`<TabNavigation>`](https://fleetbase.io/docs/ui/navigation/tab-navigation)
  — barra de pestañas más rica

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/tabs.hbs` | Plantilla del contenedor |
| `addon/components/tabs.js` | Clase del contenedor |
| `addon/components/tabs/tab.hbs` | Plantilla del subcomponente de la pestaña |
| `addon/components/tabs/tab.js` | Clase del subcomponente de la pestaña |