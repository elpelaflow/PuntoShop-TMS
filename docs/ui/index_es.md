---
título: "Interfaz de usuario de Fleetbase"
url: https://fleetbase.io/docs/ui
módulo: ui
---

# Interfaz de usuario de Fleetbase

**`@fleetbase/ember-ui`**
es la biblioteca de componentes oficial para la Consola de Fleetbase. Es un complemento de Ember.js central que viene con cada extensión y proporciona los componentes, ayudantes, modificadores y servicios que necesita para crear una interfaz de usuario que se vea y funcione como una característica nativa de Fleetbase.

Cuando crea una nueva extensión con
[`flb scaffold`](https://fleetbase.io/docs/cli/extension-development/scaffold)
,
`@fleetbase/ember-ui`
ya está declarado como dependencia: no necesita instalarlo manualmente.

**Solo para la Consola.**
Esta biblioteca está diseñada para crear
**interfaces dentro de la Consola de Fleetbase y las extensiones**.

## ¿Qué incluye?

| Categoría | ¿Qué cubre? |
|---|---|
| **Componentes** | Más de 200 componentes de interfaz de usuario reutilizables: botones, campos de entrada, modales, tablas, diseños, calendarios, editores |
| **Ayudantes** | Ayudantes de plantilla: `format-currency`, `format-bytes`, `is-uuid`, comprobación de permisos, acceso a `dot-prop` |
| **Modificadores** | Modificadores de elementos: `set-height`, `imask`, `background-url`, restricciones de dimensiones |
| **Servicios** | Servicios inyectables: `modals-manager`, `sidebar`, `dashboard`, `template-builder`, `resource-context-panel`, `leaflet` |

## ¿Con qué lo utiliza?

Las extensiones utilizan ember-ui para renderizar toda la superficie de una característica de Fleetbase:

* **Páginas de la Consola**
  — vistas de lista, vistas de detalle, paneles de configuración
* **Modales**
  — cuadros de diálogo de confirmación, formularios de edición, asistentes paso a paso
* **Formularios**
  — grupos de entrada, validación, selección de modelos, carga de archivos
* **Tablas**
  — cuadrículas de recursos ordenables, filtrables y paginadas
* **Editores**
  — editores de informes y plantillas con arrastrar y soltar
* **Paneles de control**
  — widgets de KPI, gráficos, fuentes de actividad

## Ejemplo rápido

Un formulario de Fleetbase típico creado con componentes de ember-ui:

```
<ContentPanel @title="Detalles del conductor" @open={{true}}>
  <InputGroup @name="Nombre" @value={{@driver.name}} @required={{true}} />

  <InputGroup @name="Teléfono">
    <PhoneInput @value={{@driver.phone}} />
  </InputGroup>

  <InputGroup @name="Vehículo">
    <ModelSelect
      @modelName="vehicle"
      @selectedModel={{@driver.vehicle}}
      @onChange={{fn (mut @driver.vehicle)}}
    />
  </InputGroup>

  <div class="flex justify-end">
    <Button
      @type="primary"
      @icon="save"
      @text="Guardar"
      @onClick={{this.saveDriver}}
    />
  </div>
</ContentPanel>
```

## Explore la biblioteca

Comience

Instale ember-ui en una extensión e importe su primer componente.

[Instalación →](https://fleetbase.io/docs/ui/getting-started/installation)

Formularios e entradas

Cree formularios con InputGroup, Select, ModelSelect, FileUpload y más.

[Entradas →](https://fleetbase.io/docs/ui/inputs/input-group)

Diseño

Estructure sus páginas con ContentPanel, Overlay, Drawer y ResourceTabular.

[Diseño →](https://fleetbase.io/docs/ui/layout/overview)