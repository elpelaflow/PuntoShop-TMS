---
título: "Configuración de campos personalizados"
url: https://fleetbase.io/docs/fleet-ops/settings/custom-fields
módulo: fleet-ops
---

# Configuración de campos personalizados

Defina campos estructurados adicionales para cualquier recurso de Fleet-Ops: conductores, vehículos, contactos, proveedores, lugares, entidades, flotas, incidencias y informes de combustible.

# Configuración de campos personalizados

**Campos personalizados**
le permiten adjuntar datos estructurados adicionales a los recursos de Fleet-Ops sin necesidad de crear una extensión. Los campos se definen en el Administrador de Campos Personalizados y se muestran directamente en la vista de detalles del recurso correspondiente.

Navegue a
**Fleet-Ops → Configuración → Campos personalizados**
.

![Administrador de Campos Personalizados — pestañas del tema de los recursos en la parte superior, grupos de campos y campos debajo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-fields-settings.3d8100f1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Recursos (Temas) compatibles

Los campos personalizados se organizan por
**tema**
— el tipo de recurso al que se aplican los campos. El Administrador de Campos Personalizados ofrece los siguientes temas de forma predeterminada:

| Tema | Tipo de recurso | Dónde aparecen los campos |
|---|---|---|
| **Conductor** | `fleet-ops:driver` | Panel de detalles del conductor |
| **Vehículo** | `fleet-ops:vehicle` | Panel de detalles del vehículo |
| **Contacto** | `fleet-ops:contact` | Panel de detalles del contacto |
| **Proveedor** | `fleet-ops:vendor` | Panel de detalles del proveedor |
| **Lugar** | `fleet-ops:place` | Panel de detalles del lugar |
| **Entidad** | `fleet-ops:entity` | En cada entidad en el payload del pedido |
| **Flota** | `fleet-ops:fleet` | Panel de detalles de la flota |
| **Incidencia** | `fleet-ops:issue` | Panel de detalles de la incidencia y el formulario de incidencias de Navigator |
| **Informe de combustible** | `fleet-ops:fuel-report` | Panel de detalles del informe de combustible y el formulario de informes de combustible de Navigator |

Los campos personalizados específicos del pedido (campos específicos del tipo de pedido de una configuración de pedido) se encuentran en el
[Editor de la configuración de pedidos](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
, no aquí. El
**tema de Entidad**
anterior se refiere a los campos en los elementos
*dentro*
de un payload, que se aplican a todos los tipos de pedidos.

## Crear campos personalizados

En el Administrador de Campos Personalizados, seleccione la
**pestaña del tema**
(por ejemplo, "Conductor") para el recurso al que desea aplicar los campos.

Haga clic en
**+ Nuevo grupo**
. Los grupos de campos son secciones nombradas que se muestran en la vista de detalles del recurso (por ejemplo,
*Contacto de emergencia*
,
*Cumplimiento*
).

Establezca el tamaño de la
**celda**
—
`1`
,
`2`
o
`3`
columnas — controla cuántos campos pueden aparecer uno al lado del otro dentro del grupo.

Dentro del grupo, haga clic en
**+ Nuevo campo**
para agregar un campo personalizado.

Configure las propiedades del campo:

* **Etiqueta del campo**
  — nombre de visualización que se muestra en la IU
* **Tipo de campo**
  — consulte la tabla a continuación
* **Opciones**
  — para los tipos
  `Seleccionar`
  y
  `Radio Button`
  , la lista de opciones
* **Requerido**
  — si el campo debe tener un valor
* **Editable**
  — si el campo se puede modificar después de crear el registro
* **Rango de columnas**
  — cuántas de las columnas de la cuadrícula del grupo utiliza este campo (1 / 2 / 3)

Guarde. El campo está disponible inmediatamente para todos los registros de ese tema.

## Tipos de campos

| Tipo | Para |
|---|---|
| **Entrada** | Texto de una sola línea corto — nombres, códigos, identificadores |
| **Entrada de teléfono** | Números de teléfono con selector de código de país |
| **Entrada de dinero** | Cantidades de moneda |
| **Entrada de fecha y hora** | Selector combinado de fecha + hora |
| **Selector de fecha** | Solo fecha (sin hora) |
| **Radio Button** | Selección única renderizada como radio inline |
| **Seleccionar** | Selección única renderizada como desplegable |
| **Subir archivo** | Adjuntar un documento o imagen |

## Acceso a la API

Los valores de los campos personalizados se devuelven en las respuestas de la API junto con los campos propios del recurso. Cada respuesta incluye un
`custom_field_values`
array que contiene los pares estructurados
`clave`
/
`valor`:

```
{
  "id": "driver_dnid32",
  "name": "Alex Tan",
  "custom_field_values": [
    { "key": "emergency_contact_name", "value": "Sarah Tan" },
    { "key": "emergency_contact_phone", "value": "+6598765432" }
  ]
}
```

Al crear o actualizar un registro, envíe el mismo
`custom_field_values`
array; Fleet-Ops guarda cada entrada en el campo correspondiente según la definición.

Para obtener más detalles y una receta de ejemplo, consulte
[Configurar campos personalizados](https://fleetbase.io/docs/platform/recipes/configure-custom-fields)
.