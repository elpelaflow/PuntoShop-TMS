---
title: "Ayudantes de verificación de tipos"
url: https://fleetbase.io/docs/ui/helpers/type-checking
module: ui
---

# Ayudantes de verificación de tipos

Ayudantes para inspeccionar y validar valores: `is-array`, `is-model`, `is-url`, `is-uuid`, `in-array`, `is-object-empty`, `is-dark-mode`, y más.

# Ayudantes de verificación de tipos

Estos ayudantes devuelven valores booleanos que describen la forma o el contenido de un valor. Son útiles en las secciones `{{#if}}` de las plantillas.

## `{{is-array value}}`

Devuelve `verdadero` si el valor es un array (array de Ember o array nativo):

```
{{#if (is-array @items)}}
  {{!-- seguro para iterar --}}
{{/if}}
```

## `{{is-bool-value value}}`

Devuelve `verdadero` si el valor es un booleano:

```
{{#if (is-bool-value @config.enabled)}}
  <Toggle @isToggled={{@config.enabled}} />
{{/if}}
```

## `{{is-model value}}`

Devuelve `verdadero` si el valor es una instancia del modelo de Ember Data:

```
{{#if (is-model @row)}}
  <Pill @resource={{@row}} />
{{/if}}
```

## `{{is-url value}}`

Devuelve `verdadero` si el valor se puede analizar como una URL válida:

```
{{#if (is-url @link)}}
  <a href={{@link}}>{{@link}}</a>
{{else}}
  <span>{{@link}}</span>
{{/if}}
```

## `{{is-uuid value}}`

Devuelve `verdadero` si el valor coincide con el formato UUID v1–v5:

```
{{#if (is-uuid @id)}}
  <ClickToCopy @value={{@id}} />
{{/if}}
```

## `{{in-array value array}}`

Devuelve `verdadero` si el valor está en el array:

```
{{#if (in-array "admin" @user.roles)}}
  <AdminPanel />
{{/if}}
```

## `{{is-object value}}`

Devuelve `verdadero` si el valor es un objeto simple:

```
{{#if (is-object @data)}}
  {{!-- iterar sobre las claves con each-in --}}
{{/if}}
```

## `{{is-object-empty value}}`

Devuelve `verdadero` si un objeto simple no tiene claves:

```
{{#if (is-object-empty @options)}}
  <span class="text-gray-400">No se han definido opciones</span>
{{/if}}
```

## `{{is-not-empty value}}`

Devuelve `verdadero` si el valor no es nulo/indefinido y (para cadenas/arrays) tiene una longitud:

```
{{#if (is-not-empty @results)}}
  <ResultsList @results={{@results}} />
{{/if}}
```

## `{{is-dark-mode}}`

Devuelve `verdadero` cuando la aplicación anfitriona está en modo oscuro — útil para controlar los estilos:

```
<img src={{if (is-dark-mode) "/logo-dark.svg" "/logo-light.svg"}} />
```

## `{{is-dd-item-visible}}`

Ayudante interno utilizado por los menús desplegables para determinar la visibilidad — normalmente no es necesario en el código de extensión.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/helpers/is-array.js` | Ayudante |
| `addon/helpers/is-bool-value.js` | Ayudante |
| `addon/helpers/is-dark-mode.js` | Ayudante |
| `addon/helpers/is-dd-item-visible.js` | Ayudante |
| `addon/helpers/is-model.js` | Ayudante |
| `addon/helpers/is-not-empty.js` | Ayudante |
| `addon/helpers/is-object-empty.js` | Ayudante |
| `addon/helpers/is-object.js` | Ayudante |
| `addon/helpers/is-url.js` | Ayudante |
| `addon/helpers/is-uuid.js` | Ayudante |
| `addon/helpers/in-array.js` | Ayudante |