---
título: "Ayudantes de formato"
url: https://fleetbase.io/docs/ui/helpers/formatting
módulo: ui
---

# Ayudantes de formato

Ayudantes para formatear bytes, monedas, fechas, duraciones, distancias, nombres de archivos y cadenas, así como para humanizar los datos.

# Ayudantes de formato

Estos ayudantes convierten los valores brutos en cadenas legibles para la visualización. Todos están disponibles globalmente en cualquier plantilla, sin necesidad de importación.

## `{{format-bytes value}}`

Formatea un recuento de bytes como un tamaño legible:

```
{{format-bytes 1024}}        {{!-- "1 KB" --}}
{{format-bytes 1048576}}     {{!-- "1 MB" --}}
{{format-bytes 1073741824}}  {{!-- "1 GB" --}}
```

## `{{format-currency amount currency}}`

Formatea una cantidad monetaria con el símbolo de la moneda y separadores apropiados para la localización:

```
{{format-currency 12500 "USD"}}   {{!-- "$125.00" --}}
{{format-currency 1234 "EUR"}}    {{!-- "€12.34" --}}
{{format-currency 50000 "MNT"}}   {{!-- "₮500" --}}
```

El primer argumento es en
**unidades monetarias menores**
(céntimos). El ayudante maneja el esquema decimal de cada moneda.

## `{{format-date-fns date format}}`

Formatea una fecha utilizando
[date-fns](https://date-fns.org)
tokens de formato:

```
{{format-date-fns @order.created_at "PPpp"}}        {{!-- "Jul 4, 2025 at 3:42 PM" --}}
{{format-date-fns @order.created_at "yyyy-MM-dd"}}  {{!-- "2025-07-04" --}}
{{format-date-fns @order.created_at "EEEE"}}        {{!-- "Friday" --}}
```

## `{{format-duration ms}}`

Formatea una duración en milisegundos como texto legible:

```
{{format-duration 5000}}      {{!-- "5 seconds" --}}
{{format-duration 90000}}     {{!-- "1 minute 30 seconds" --}}
{{format-duration 3600000}}   {{!-- "1 hour" --}}
```

## `{{format-milliseconds ms}}`

Variante de
`format-duration`
con precisión de milisegundos.

## `{{format-meters meters}}`

Formatea una distancia en metros con la unidad correcta (m vs km):

```
{{format-meters 250}}    {{!-- "250 m" --}}
{{format-meters 4500}}   {{!-- "4.5 km" --}}
```

## `{{smart-humanize value}}`

Humaniza cualquier cadena con unas pocas reglas adicionales: maneja snake\_case, kebab-case, camelCase y nombres de acrónimos conocidos:

```
{{smart-humanize "pickup_ready"}}       {{!-- "Pickup Ready" --}}
{{smart-humanize "createdAt"}}          {{!-- "Created At" --}}
{{smart-humanize "QR-code"}}            {{!-- "QR Code" --}}
```

Compara con
`{{safe-humanize}}`
(un ayudante más ligero) y el de Ember,
`{{humanize}}`.

## `{{truncate-filename filename maxLength?}}`

Truncada un nombre de archivo a una longitud máxima, conservando la extensión:

```
{{truncate-filename "very-long-document-name.pdf" 20}}   {{!-- "very-long-do…me.pdf" --}}
```

## `{{safe-humanize value}}`

Humaniza un valor de forma segura: devuelve una cadena vacía para null/undefined en lugar de generar un error:

```
{{safe-humanize @order.status}}
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/helpers/format-bytes.js` | Ayudante |
| `addon/helpers/format-currency.js` | Ayudante |
| `addon/helpers/format-date-fns.js` | Ayudante |
| `addon/helpers/format-duration.js` | Ayudante |
| `addon/helpers/format-milliseconds.js` | Ayudante |
| `addon/helpers/format-meters.js` | Ayudante |
| `addon/helpers/smart-humanize.js` | Ayudante |
| `addon/helpers/safe-humanize.js` | Ayudante |
| `addon/helpers/truncate-filename.js` | Ayudante |