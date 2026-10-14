---
title: "Modificadores"
url: https://fleetbase.io/docs/ui/helpers/modifiers
module: ui
---

# Modificadores

Modificadores del módulo @fleetbase/ember-ui: set-height, set-width, imask, background-url, fallback-img-src, y más.

# Modificadores

Los modificadores aplican un comportamiento a un elemento. Se parecen a los helpers, pero se aplican al elemento en lugar de generar un valor:

```
<div {{set-height "400px"}}>Contenedor de altura fija</div>
```

El modificador se ejecuta al renderizar y se vuelve a ejecutar cuando cambian sus argumentos.

## Modificadores de dimensiones

### {{set-height value}}

Establece
`style.height`:

```
<div {{set-height "400px"}}>...</div>
<div {{set-height (concat this.computedHeight "px")}}>...</div>
```

### {{set-width value}}

Establece
`style.width`.

### {{set-max-height value}}

Establece
`style.maxHeight`.

### {{set-max-width value}}

Establece
`style.maxWidth`.

### {{set-z-index value}}

Establece
`style.zIndex`.

### {{set-container-dimensions}}

Establece el
`width`
y
`height`
del elemento a las dimensiones de su padre.

### {{constrain-view-section-width}}

Fija el ancho del elemento al ancho disponible de la sección de la vista, manejando el ajuste de tamaño responsivo.

### {{increase-height-by value}}

Aumenta la altura del elemento en la cantidad especificada.

### {{vertical-offset-by value}}

Desplaza el elemento verticalmente en la cantidad especificada.

### {{translate-x value}}

Establece
`style.transform = translateX(...)`.

## Modificadores de imagen

### {{background-url url}}

Establece
`style.backgroundImage = url(...)`:

```
<div class="hero" {{background-url @company.banner_url}}>...</div>
```

### {{fallback-img-src fallback}}

Establece
`src`
al valor de respaldo si la imagen original no se carga:

```
<img src={{@user.avatar_url}} {{fallback-img-src "/assets/placeholder.png"}} />
```

## Modificadores de entrada

### {{imask mask}}

Aplica una máscara de entrada [iMask](https://imask.js.org). La máscara puede ser un nombre de predefinido o un objeto de configuración:

```
<input type="text" {{imask "phone"}} />
<input type="text" {{imask (hash mask="00/00/0000")}} />
```

Predefinidos comunes:

| Predefinido | Patrón |
|---|---|
| `phone` | Formato de teléfono internacional |
| `currency` | Campo de moneda con separadores |
| `date` | Campo de fecha |
| `card` | Número de tarjeta de crédito con espacios |

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/modifiers/set-height.js` | Modificador |
| `addon/modifiers/set-width.js` | Modificador |
| `addon/modifiers/set-max-height.js` | Modificador |
| `addon/modifiers/set-max-width.js` | Modificador |
| `addon/modifiers/set-z-index.js` | Modificador |
| `addon/modifiers/set-container-dimensions.js` | Modificador |
| `addon/modifiers/constrain-view-section-width.js` | Modificador |
| `addon/modifiers/increase-height-by.js` | Modificador |
| `addon/modifiers/vertical-offset-by.js` | Modificador |
| `addon/modifiers/translate-x.js` | Modificador |
| `addon/modifiers/background-url.js` | Modificador |
| `addon/modifiers/fallback-img-src.js` | Modificador |
| `addon/modifiers/imask.js` | Modificador |