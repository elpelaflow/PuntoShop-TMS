---
title: "Migraciones"
url: https://fleetbase.io/docs/extension-development/backend/migrations
module: extension-development
---

# Migraciones

Define migraciones para tu extensión. Estas se encuentran en la carpeta `server/migrations/`, siguen las convenciones de UUID + public\_id de Fleetbase, y se cargan automáticamente a través del proveedor de servicios.

# Migraciones

Las migraciones definen el esquema que posee tu extensión. Fleetbase las carga automáticamente a través de tu
[proveedor de servicios](https://fleetbase.io/docs/extension-development/backend/service-provider)
(
`$this->loadMigrationsFrom(__DIR__ . '/../../migrations')`
), por lo que se ejecutan junto con las migraciones principales cuando alguien ejecuta
`php artisan migrate`
.

## Dónde se encuentran las migraciones

```
server/
└── migrations/
    └── 2026_01_15_000000_create_widgets_table.php
```

Nota: es un directorio plano
`migrations/`
en
`server/migrations/`
,
**no**
`server/database/migrations/`
. La ruta coincide con la convención estándar de Laravel utilizada en
`core-api`
y en todas las extensiones entregadas.

## Convención de nombres

Nombres de archivos de migraciones estándar de Laravel:
`YYYY_MM_DD_HHMMSS_<verbo>_<nombre_de_tabla>_table.php`
. Ejemplos:

* `2026_01_15_103000_create_widgets_table.php`
* `2026_01_18_142000_add_status_to_widgets_table.php`
* `2026_01_22_080000_add_foreign_keys_to_widgets_table.php`

Las claves foráneas deben incluirse en una migración separada que se ejecute después de la migración de creación:

```
return new class extends Migration {
    public function up(): void
    {
        Schema::table('my_extension_widgets', function (Blueprint $table) {
            $table->foreign('company_uuid')
                  ->references('uuid')->on('companies')
                  ->cascadeOnDelete();
            $table->foreign('created_by_uuid')
                  ->references('uuid')->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('my_extension_widgets', function (Blueprint $table) {
            $table->dropForeign(['company_uuid']);
            $table->dropForeign(['created_by_uuid']);
        });
    }
};
```

Referencia
`uuid`
(la convención de FB), no el entero
`id`
.

## Ejecución de migraciones

En una extensión de desarrollo, normalmente se ejecutan:

```
docker compose exec application php artisan migrate
```

Si has realizado cambios en el esquema durante la iteración local:

```
docker compose exec application php artisan migrate:fresh --seed
```

La consola expone un esquema reutilizable a través del
[`flb
CLI](https://fleetbase.io/docs/cli/extension-development/scaffold)
—
`flb scaffold`
genera un esquema inicial cuando creas un nuevo modelo.

## Modelos

Los modelos se encuentran en la carpeta
`server/src/Models/`
. Extiende
`Fleetbase\Models\Model`
(no el base
`Model`
de Laravel) — este extiende la generación de UUID, la generación de public\_id, las funciones de ayuda para soft-deletes y JSON, y el registro de actividad.

```
namespace MyOrg\MyExtension\Models;

use Fleetbase\Models\Model;
use Fleetbase\Traits\HasPublicId;
use Fleetbase\Traits\HasUuid;
use Fleetbase\Traits\TracksApiCredential;

class Widget extends Model
{
    use HasUuid;
    use HasPublicId;
    use TracksApiCredential;

    protected $table = 'my_extension_widgets';
    protected $publicIdType = 'widget';

    protected $fillable = ['name', 'description', 'meta', 'status', 'company_uuid', 'created_by_uuid'];

    protected $casts = [
        'meta' => 'array',
    ];
}
```

`$publicIdType`
es el prefijo del
`public_id`
generado (por ejemplo,
`widget_a1b2c3d4`
). Consulta las características en
`packages/core-api/src/Traits`
.

## Sandbox y consideraciones para entornos multi-tenant

Cada instalación de Fleetbase tiene dos bases de datos:
`production`
y
`sandbox`
— con el mismo esquema. El comando de consola
`MigrateSandbox`
maneja la sincronización de migraciones entre ambas. Por defecto, tus migraciones se ejecutan en ambas, lo cual es lo que quieres para datos multi-tenant.

## Fuentes

| Archivo | Descripción |
| --- | --- |
| `core-api/migrations/` | Migraciones del esquema principal — referencia de formas |
| `fleetops/server/migrations/` | Referencia de migraciones de extensiones |
| `ledger/server/migrations/` | Referencia de migraciones de extensiones |
| `src/Console/Commands/MigrateSandbox.php` | Ejecutor de migraciones para entornos sandbox |
| `src/Traits/HasUuid.php` | Característica de generación automática de UUID |
| `src/Traits/HasPublicId.php` | Característica para generar `public_id` |