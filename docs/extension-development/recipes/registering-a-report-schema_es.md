---
Título: "Registro de un Esquema de Informe"
URL: https://fleetbase.io/docs/extension-development/recipes/registering-a-report-schema
Módulo: extension-development
---

# Registro de un Esquema de Informe

Permita que las tablas de su extensión estén disponibles en el constructor de informes de la plataforma, registrando un `ReportSchema`. Los usuarios podrán entonces crear informes personalizados basados en sus datos a través de la interfaz de usuario estándar de informes.

# Registro de un Esquema de Informe

La plataforma incluye un constructor de informes genérico que permite a los usuarios crear informes CSV/XLSX a partir de cualquier fuente de datos registrada como un
**esquema de informe**. Fleet-Ops registra esquemas para pedidos, conductores, vehículos y otros; su extensión puede registrar esquemas para sus propias tablas de la misma manera.

## ¿Qué proporciona un Esquema de Informe?

Para cada tabla, el esquema declara:

* Las
  **columnas**
  que los usuarios pueden seleccionar, con etiquetas, descripciones, tipos y banderas por columna (
  `searchable`
  ,
  `filterable`
  ,
  `sortable`
  ,
  `aggregatable`
  )
* **Relaciones**
  — conexiones a tablas relacionadas que el constructor de informes puede ofrecer como extensiones
* **Transformadores**
  — funciones que convierten los valores de las columnas en texto de fácil lectura
* **Permisos**
  — metadatos de extensión y categoría utilizados para filtrar la interfaz de usuario del constructor de informes

La plataforma, a continuación, genera SQL, aplica los filtros/columnas seleccionados por el usuario, pagina y exporta.

## 1. Implementar ReportSchema

Cree una clase que implemente
`Fleetbase\Support\Reporting\Contracts\ReportSchema`:

```
<?php
// server/src/Support/Reporting/MyExtensionReportSchema.php

namespace MyOrg\MyExtension\Support\Reporting;

use Fleetbase\Support\Reporting\Contracts\ReportSchema;
use Fleetbase\Support\Reporting\ReportSchemaRegistry;
use Fleetbase\Support\Reporting\Schema\Column;
use Fleetbase\Support\Reporting\Schema\Relationship;
use Fleetbase\Support\Reporting\Schema\Table;

class MyExtensionReportSchema implements ReportSchema
{
    public function registerReportSchema(ReportSchemaRegistry $registry): void
    {
        $registry->registerTable($this->createWidgetsTable());
    }

    protected function createWidgetsTable(): Table
    {
        return Table::make('my_extension_widgets')
            ->label('Widgets')
            ->description('Custom widgets created by My Extension')
            ->category('My Extension')
            ->extension('my-extension')
            ->excludeColumns(['uuid', 'deleted_at'])
            ->maxRows(50000)
            ->cacheTtl(3600)
            ->columns([
                Column::make('public_id', 'string')
                    ->label('Widget ID')
                    ->description('User-facing widget identifier')
                    ->searchable()
                    ->filterable()
                    ->sortable(),

                Column::make('name', 'string')
                    ->label('Name')
                    ->searchable()
                    ->filterable()
                    ->sortable(),

                Column::make('status', 'string')
                    ->label('Status')
                    ->filterable()
                    ->sortable()
                    ->aggregatable()
                    ->transformer(fn ($value) => ucfirst($value)),

                Column::make('created_at', 'datetime')
                    ->label('Created')
                    ->filterable()
                    ->sortable(),
            ])
            ->relationships([
                Relationship::belongsTo('company', 'companies', 'company_uuid', 'uuid')
                    ->label('Organization'),
                Relationship::belongsTo('createdBy', 'users', 'created_by_uuid', 'uuid')
                    ->label('Created By'),
            ]);
    }
}
```

### Tipos de Columnas

| Tipo | Uso para |
| --- | --- |
| `'string'` | Campos de texto, IDs, estados |
| `'integer'` / `'decimal'` | Números — se utilizan para obtener agregaciones de suma/promedio |
| `'boolean'` | Sí/no — se utilizan para obtener agregaciones de conteo |
| `'datetime'` / `'date'` | Campos de tiempo — se utilizan para filtros de fecha y agrupamiento |
| `'currency'` | Valores monetarios — se formatean con la moneda de la organización |
| `'json'` | Campos estructurados — se aplanan a rutas de notación de puntos |

### Banderas de Columnas

| Bandera | Efecto |
| --- | --- |
| `searchable()` | La búsqueda de texto se aplica a esta columna |
| `filterable()` | La columna aparece en la interfaz de usuario de filtrado |
| `sortable()` | El usuario puede ordenar el informe por esta columna |
| `aggregatable()` | Disponible para COUNT/SUM/AVG/MIN/MAX |
| `transformer($fn)` | Aplica una función de devolución de llamada a cada valor antes de mostrarlo |

## 2. Registrar un ReportSchemaServiceProvider

Siga el patrón de Fleet-Ops: un proveedor mínimo que llama a
`ReportSchemaRegistry::registerTable(...)`
una vez que el registro se ha resuelto:

```
<?php
// server/src/Providers/ReportSchemaServiceProvider.php

namespace MyOrg\MyExtension\Providers;

use Fleetbase\Support\Reporting\ReportSchemaRegistry;
use Illuminate\Support\ServiceProvider;
use MyOrg\MyExtension\Support\Reporting\MyExtensionReportSchema;

class ReportSchemaServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->callAfterResolving(ReportSchemaRegistry::class, function (ReportSchemaRegistry $registry) {
            (new MyExtensionReportSchema())->registerReportSchema($registry);
        });
    }
}
```

## 3. Conéctelo en su proveedor principal

```
// server/src/Providers/MyExtensionServiceProvider.php

public function register()
{
    $this->app->register(CoreServiceProvider::class);
    $this->app->register(ReportSchemaServiceProvider::class);
}
```

Eso es todo en el lado del servidor:
`callAfterResolving`
retrasar el registro hasta que realmente se solicite el registro, evitando problemas de orden de inicio.

## 4. Verifique en la interfaz de usuario

Reinicie la API y abra el constructor de informes de la plataforma. Su tabla aparecerá bajo la
`category`
que haya definido, con las columnas que haya declarado como opciones de selección. Cree un informe, ejecútelo y exporte.

## Referencia

* `fleetops/server/src/Support/Reporting/FleetOpsReportSchema.php`
  — Implementación de referencia completa, incluyendo 7 tablas con relaciones y transformadores
* `fleetops/server/src/Providers/ReportSchemaServiceProvider.php`
  — Proveedor mínimo
* `core-api/src/Support/Reporting/`
  —
  `Table`
  ,
  `Column`
  ,
  `Relationship`
  clases y el propio registro