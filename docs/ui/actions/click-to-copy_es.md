---
título: "ClickToCopy"
url: https://fleetbase.io/docs/ui/actions/click-to-copy
módulo: ui
---

# ClickToCopy

`<ClickToCopy> envuelve cualquier valor con una interacción de copia al portapapeles con un solo clic. Al pasar el cursor, se muestra una подсказка; al hacer clic, se copia.

# `<ClickToCopy>`

Envuelve cualquier valor con una acción de copia al portapapeles con un solo clic. Pasar el cursor muestra una подсказка "Haga clic para copiar"; al hacer clic, copia el valor y la подсказка cambia a "¡Copiado!".

Se utiliza en cualquier lugar donde un usuario necesite copiar un ID, clave pública o token generado: IDs públicos generados automáticamente en tablas, claves de API en la configuración, referencias de transacciones de puerta de enlace en los registros de auditoría.

## Uso básico

```
<ClickToCopy @value={{this.order.public_id}} />
```

Esto renderiza el valor (o `N/A` si está vacío), y al hacer clic en el envoltorio, copia el valor al portapapeles.

## Visualización personalizada

Proporcione un bloque para renderizar algo diferente al valor sin procesar, pero aún así copie `@value` al hacer clic:

```
<ClickToCopy @value={{this.gateway.api_key}}>
  <FaIcon @icon="copy" class="mr-2" />
  Copiar clave de API
</ClickToCopy>
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@value` | string | El texto que se copia al portapapeles. Si está vacío, utiliza `N/A` para la visualización (cuando no hay bloque) |

Cualquier atributo adicional `...attributes` se pasa al `<div>` exterior.

## Comportamiento

El componente primero intenta `navigator.clipboard.writeText()`. Si esto no está disponible (navegadores más antiguos, contexto no seguro), utiliza un `<textarea>` oculto junto con `document.execCommand('copy')`. La подсказка "¡Copiado!" parpadea brevemente en caso de éxito.

## Ejemplos del mundo real

```
{{!-- Copiar un ID público generado --}}
<ClickToCopy @value={{order.public_id}}>
  <span class="font-mono">{{order.public_id}}</span>
</ClickToCopy>

{{!-- Dentro de una celda de tabla --}}
<td>
  <ClickToCopy @value={{row.id}}>
    {{row.id}}
  </ClickToCopy>
</td>

{{!-- Para valores sensibles, preferir ClickToReveal --}}
<ClickToReveal @value={{store.api_key}} />
```

## Ver también

* [`<ClickToReveal>`](https://fleetbase.io/docs/ui/actions/click-to-reveal) — extiende ClickToCopy con renderizado oculto por defecto para valores sensibles

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/click-to-copy.hbs` | Plantilla |
| `addon/components/click-to-copy.js` | Clase |