---
title: "PhoneInput"
url: https://fleetbase.io/docs/ui/inputs/phone-input
module: ui
---

# PhoneInput

`<PhoneInput>` envuelve `intl-tel-input` para números de teléfono internacionales: detecta automáticamente el país del usuario, formatea a medida que se escribe y emite el formato E.164.

# `<PhoneInput>`

Campo de entrada para números de teléfono internacionales. Envuelve la
[`intl-tel-input`](https://github.com/jackocnr/intl-tel-input)
para proporcionar un selector de país, formato a medida que se escribe y emite el formato E.164 al introducir.

El país del usuario se detecta automáticamente a partir de su dirección IP mediante el servicio de geolocalización de Fleetbase (con Estados Unidos como opción predeterminada).

## Uso básico

```
<PhoneInput @value={{this.driver.phone}} @onInput={{fn (mut this.driver.phone)}} />
```

La
`@onInput`
callback recibe el número formateado en E.164 (por ejemplo,
`+15551234567`
)— esta es la forma canónica para almacenarlo.

## Dentro de un InputGroup

```
<InputGroup @name="Phone">
  <PhoneInput @value={{this.driver.phone}} @onInput={{fn (mut this.driver.phone)}} />
</InputGroup>
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@value` | string | Valor inicial (cualquier formato — la biblioteca lo analiza) |
| `@onInput` | `(e164, event)` | Se llama en cada pulsación de tecla con el número en E.164 |
| `@onInit` | `(iti)` | Se llama una vez con la instancia de `intl-tel-input` después de la inicialización — para un control más avanzado |
| `@onCountryChange` | función | Se llama cuando el usuario selecciona un país diferente |
| `@wrapperClass` | string | Clases adicionales en el envoltorio exterior |

## Geolocalización

El país inicial se determina por:

1. El valor de entrada actual (si incluye un código de país)
2. La dirección IP del usuario mediante
   `lookupUserIp`
   de
   `@fleetbase/ember-core`
3. Se vuelve a `us`
   si los anteriores fallan

Esto significa que la mayoría de los usuarios ven su propio país seleccionado de forma predeterminada, sin necesidad de realizar ninguna acción manual.

## Formato

El componente se configura con:

* `separateDialCode: true`
  — el código de país se muestra como una bandera/prefijo fuera del campo de entrada
* `formatAsYouType: true`
  — el campo de entrada se formatea a medida que el usuario escribe
* `utilsScript: '/assets/libphonenumber/utils.js'`
  — proporciona validación y formato

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/phone-input.hbs` | Plantilla |
| `addon/components/phone-input.js` | Clase — envuelve [`intl-tel-input`](https://github.com/jackocnr/intl-tel-input) |