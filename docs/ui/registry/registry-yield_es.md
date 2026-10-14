---
title: "RegistryYield"
url: https://fleetbase.io/docs/ui/registry/registry-yield
module: ui
---

# RegistryYield

El componente `<RegistryYield>` permite que otras extensiones (componentes o elementos de menú) contribuyan a una sección específica. Facilita la integración entre extensiones.

# <RegistryYield>

`<RegistryYield>`
es el mecanismo principal para que una extensión aporte elementos de interfaz de usuario a otra. Recorre los elementos en un registro específico (componentes o elementos de menú) y los renderiza para ti.

Esto es lo que permite la extensibilidad de Fleetbase: una extensión de pasarela de pago puede registrar un botón en la configuración de la pasarela de Ledger; una extensión de análisis puede registrar un gráfico en el panel de control de Fleet-Ops, etc. — sin que ninguna de las dos partes sepa que la otra existe en el momento de la compilación.

## Contribuciones de Componentes

```
<RegistryYield @registry="ledger:invoice-actions" as |Component context|>
  <Component @invoice={{this.invoice}} @context={{context}} />
</RegistryYield>
```

Otras extensiones registran sus componentes a través del servicio
`registry-service`
, y
`<RegistryYield>`
los resuelve y los renderiza.

## Contribuciones de Elementos de Menú

```
<RegistryYield @registry="fleet-ops:driver-row-actions" @type="menu" as |item|>
  <a {{on "click" item.onClick}} class="next-dd-item">
    {{#if item.icon}}<FaIcon @icon={{item.icon}} />{{/if}}
    {{item.label}}
  </a>
</RegistryYield>
```

Pasa
`@type="menu"`
(o
`buttons`
,
`menuItems`
,
`menu-item`
) cuando iteras elementos de menú en lugar de componentes.

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@registry` | string | La clave del registro desde la cual leer |
| `@type` | string | Opcional: `menu` , `menuItems` , `menu-item` , o `buttons` para leer elementos de menú en lugar de componentes |
| `@context` | any | Objeto de contexto que se devuelve como el segundo valor posicional a tu bloque |

## Bloque Renderizado

Para las contribuciones de componentes, el primer valor renderizado es una clase de componente resuelta — renderízala con
`<Component />`
. Para los elementos de menú, el primer renderizado es el descriptor del elemento de menú (con
`label`
,
`icon`
,
`onClick`
, etc.).

El segundo renderizado es el
`@context`
que pasaste — útil para pasar el estado a los componentes contribuidos.

## Cómo Funciona

`<RegistryYield>`
busca los elementos en este orden:

1. El nuevo
   `universe/menu-service`
   (para elementos de menú) o
   `universe/registry-service`
   (para componentes)
2. Si no se encuentra, utiliza el mecanismo legado
   `universe.getMenuItemsFromRegistry()`
   /
   `getRenderableComponentsFromRegistry()`

Los componentes del motor "lazy" (aquellos que provienen de otro motor Ember) se envuelven automáticamente con
`<LazyEngineComponent>`
para que se carguen bajo demanda.

## Ejemplo Práctico

```
{{!-- Dentro de una página de detalles de factura de Ledger --}}
<ContentPanel @title="Acciones" @open={{true}}>
  <:default>
    <Button @text="Editar" @onClick={{this.edit}} />

    {{!-- Otras extensiones pueden contribuir acciones adicionales aquí --}}
    <RegistryYield @registry="ledger:invoice-actions" @context={{this.invoice}} as |Action ctx|>
      <Action @invoice={{ctx}} />
    </RegistryYield>
  </:default>
</ContentPanel>
```

## Ver También

* [Visión general del registro de Universe](https://fleetbase.io/docs/ui/registry/overview)
  — registro de componentes y elementos de menú
* [Desarrollo de extensiones](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
  — guía completa para crear extensiones

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/registry-yield.hbs` | Plantilla |
| `addon/components/registry-yield.js` | Clase |
| `addon/services/universe/menu-service.js` | Servicio de respaldo para elementos de menú |
| `addon/services/universe/registry-service.js` | Servicio de respaldo para componentes |