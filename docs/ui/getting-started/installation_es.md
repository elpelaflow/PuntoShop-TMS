---
título: "Instalación"
url: https://fleetbase.io/docs/ui/getting-started/installation
módulo: ui
---

# Instalación

`@fleetbase/ember-ui` se incluye automáticamente en todas las extensiones de Fleetbase — esta página explica qué se instala automáticamente y cómo añadirla manualmente si es necesario.

# Instalación

En casi todos los casos,
**no es necesario instalar
`@fleetbase/ember-ui`
manualmente**
. Cada extensión creada con
[`flb scaffold`](https://fleetbase.io/docs/cli/extension-development/scaffold)
ya incluye la biblioteca como dependencia, junto con el motor necesario para cargarla.

```
// package.json (fragmento de una extensión recién creada)
{
  "dependencies": {
    "@fleetbase/ember-ui": "^0.3.29",
    // …
  }
}
```

Después de crear la extensión,
`pnpm install`
(se ejecuta automáticamente en el entorno de la consola) descarga ember-ui y puedes utilizar cualquier componente inmediatamente.

## Añadirlo a una Extensión Existente

Si estás trabajando con una extensión más antigua, añade ember-ui mediante pnpm:

```
cd /ruta/a/tu/extensión
pnpm add @fleetbase/ember-ui
```

El sistema de extensiones de Ember fusiona automáticamente los componentes, helpers, modificadores y servicios de ember-ui en la aplicación anfitriona — no es necesario utilizar declaraciones de importación manual para los componentes individuales.

## Utilizar un Componente

Una vez que ember-ui es una dependencia, todos los componentes están disponibles
**entre corchetes**
en cualquier plantilla:

```
<Button @type="primary" @text="Guardar" @onClick={{this.save}} />
```

No es necesario
`import`
componentes en JavaScript — Ember los resuelve automáticamente a partir de la extensión.

## Utilizar un Helper

Los helpers también están disponibles globalmente en las plantillas:

```
{{format-currency 1500 "USD"}}    {{!-- $15.00 --}}
{{format-bytes 1024}}              {{!-- 1 KB --}}
{{is-uuid this.id}}                {{!-- true / false --}}
```

## Utilizar un Servicio

Los servicios se inyectan como cualquier servicio de Ember:

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MyComponent extends Component {
  @service modalsManager;
  @service sidebar;

  openModal() {
    this.modalsManager.show('my-modal-template', {
      title: 'Confirmar',
      body: '¿Estás seguro?',
      acceptButtonText: 'Sí',
    });
  }
}
```

## Utilizar un Modificador

Los modificadores se aplican a los elementos con
`{{modifier-name args}}`
:

```
<div {{set-height "400px"}}>
  Contenedor con una altura fija
</div>

<input {{imask "phone"}} type="text" />
```

## Verificar la Instalación

Una vez añadido, ejecuta
`pnpm install`
y inicia la consola:

```
cd /ruta/a/fleetbase/console
pnpm install
pnpm start
```

Abre cualquier plantilla de tu extensión y utiliza un componente:

```
<Spinner /> Cargando…
```

Si el componente se muestra, tu instalación está configurada correctamente.

## Actualización

Cuando se lanzan nuevas versiones de ember-ui:

```
pnpm update @fleetbase/ember-ui
```

Consulta las notas de la versión para conocer los cambios que puedan afectar — el paquete está en
`0.x`
y las APIs pueden evolucionar.

## Próximos Pasos

* [Conceptos básicos](https://fleetbase.io/docs/ui/getting-started/core-concepts)
  — componentes, helpers, modificadores y servicios explicados
* [Diseño](https://fleetbase.io/docs/ui/layout/overview)
  — estructura tus páginas
* [Formularios e Inputs](https://fleetbase.io/docs/ui/inputs/input-group)
  — crea formularios