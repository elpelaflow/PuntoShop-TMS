---
título: "Spacer"
url: https://fleetbase.io/docs/ui/layout/spacer
módulo: ui
---

# Spacer

`<Spacer>` inserta una caja vacía de tamaño fijo entre los elementos de diseño. Cualquier propiedad de dimensión CSS que pase (altura, ancho, relleno, margen, etc.) se aplica directamente.

# `<Spacer>`

Una utilidad sencilla para añadir una cantidad fija de espacio vacío entre los elementos. Cada argumento que pase se aplica directamente al estilo en línea del elemento, por lo que cualquier nombre de propiedad CSS válido se traduce.

## Uso básico

```
<Spacer @height="20px" />
<Spacer @width="100%" @height="1px" />     {{!-- línea divisoria horizontal --}}
<Spacer @marginTop="2rem" />
```

## Cómo funciona

Internamente, el componente itera sobre cada
`@`
-argumento y lo asigna al atributo
`style`
del elemento, después de convertir el nombre de la clave a formato "camelCase". Por lo tanto:

| Argumento | Resultado |
|---|---|
| `@height="40px"` | `style.height = "40px"` |
| `@padding-top="1rem"` | `style.paddingTop = "1rem"` |
| `@marginTop="2rem"` | `style.marginTop = "2rem"` |

Solo se aplican los valores de cadena y numéricos; los booleanos y las funciones se ignoran.

## Ejemplos del mundo real

```
{{!-- Espaciado vertical estándar entre secciones de formulario --}}
<ContentPanel @title="Paso 1" @open={{true}}>{{!-- ... --}}</ContentPanel>
<Spacer @height="1rem" />
<ContentPanel @title="Paso 2" @open={{true}}>{{!-- ... --}}</ContentPanel>

{{!-- Línea horizontal mediante spacer --}}
<Spacer @height="1px" @width="100%" @backgroundColor="rgba(0,0,0,0.1)" />

{{!-- Relleno en la parte inferior de la página --}}
<Spacer @height="400px" />
```

## Cuándo usarlo

Utilice `<Spacer>` cuando necesite una cantidad específica de espacio y no desee añadir una clase CSS. Para patrones de espaciado repetidos, utilice las clases de utilidad de Tailwind (
`mt-4`
,
`space-y-2`
, etc.).

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/spacer.hbs` | Plantilla |
| `addon/components/spacer.js` | Clase |