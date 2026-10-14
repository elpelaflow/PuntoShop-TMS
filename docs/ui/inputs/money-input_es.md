---
título: "MoneyInput"
url: https://fleetbase.io/docs/ui/inputs/money-input
módulo: ui
---

# MoneyInput

`MoneyInput` es un campo de entrada de dinero que tiene en cuenta la moneda: formatea automáticamente según lo que el usuario escribe, utilizando AutoNumeric, y muestra el símbolo de la moneda a la izquierda. Opcional selector de moneda.

# <MoneyInput>

Un campo de entrada de dinero que tiene en cuenta la moneda. Formatea según lo que el usuario escribe utilizando
`AutoNumeric`
y muestra la moneda activa a la izquierda. Opcionalmente, permite al usuario seleccionar una moneda diferente a través de un menú desplegable integrado.

## Uso básico

```
<MoneyInput @value={{this.invoice.total}} @currency="USD" />
```

El símbolo de la moneda (
`$`
) se muestra a la izquierda, y el campo se formatea automáticamente (por ejemplo,
`1,234.56`
).

## Con selector de moneda

```
<MoneyInput
  @value={{this.amount}}
  @currency={{this.currency}}
  @canSelectCurrency={{true}}
  @onCurrencyChange={{fn (mut this.currency)}}
/>
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@value` | número | string | Valor del importe |
| `@currency` | string | Código ISO 4217 (por ejemplo, `USD`, `EUR`, `MNT`) |
| `@canSelectCurrency` | booleano | Mostrar el menú desplegable del selector de moneda |
| `@onCurrencyChange` | `(currency)` | Se llama cuando el usuario selecciona una moneda diferente |
| `@wrapperClass` | string | Clases adicionales en el envoltorio externo |

Cualquier atributo adicional
`...attributes`
se pasa al componente `<input>` subyacente.

## Dentro de un InputGroup

```
<InputGroup @name="Price">
  <MoneyInput @value={{this.product.price}} @currency={{this.store.currency}} />
</InputGroup>
```

## Convenciones de formato

El valor mostrado se formatea con el separador y el esquema decimal estándar de la moneda. El valor vinculado
`@value`
es el número sin formato: es lo que debe almacenar su modelo. Mantenga los valores monetarios como unidades menores de entero en el lado del servidor (céntimos para USD, etc.) y convierta si es necesario al mostrar.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/money-input.hbs` | Plantilla |
| `addon/components/money-input.js` | Clase |
| `addon/components/money-input/` | Componentes secundarios `CurrencyHandle` y relacionados |