---
title: "Escenario"
url: https://fleetbase.io/docs/cli/extension-development/scaffold
module: cli
---

# Escenario

Genera una nueva extensión de Fleetbase a partir de la plantilla inicial utilizando `flb scaffold`.

# flb scaffold

Genera una nueva extensión de Fleetbase a partir de la
`starter-extension`
plantilla. La CLI clona la plantilla, solicita el nombre y los metadatos de tu extensión, y luego refactoriza los espacios de nombres, los nombres de los paquetes y los nombres de las clases para que estén listos para desarrollarse inmediatamente.

```
flb scaffold
```

Se te pedirá el nombre de la extensión, la descripción, el autor, la dirección de correo electrónico, las palabras clave, el espacio de nombres de PHP y la URL del repositorio. Pulsa Intro para aceptar los valores predeterminados.

## Opciones

| Opción | Descripción |
|---|---|
| `-p, --path <path>` | Donde crear el escenario (predeterminado: directorio actual) |
| `-n, --name <name>` | Nombre de la extensión |
| `-d, --description <description>` | Descripción |
| `-a, --author <author>` | Nombre del autor |
| `-e, --email <email>` | Dirección de correo electrónico del autor |
| `-k, --keywords <keywords>` | Palabras clave separadas por comas |
| `-n, --namespace <namespace>` | Espacio de nombres de PHP (precedido automáticamente con `Fleetbase\`) |
| `-r, --repo <repo>` | URL del repositorio (predeterminado: URL del repositorio de la plantilla inicial) |

Cualquier cosa que no especifiques se solicitará de forma interactiva.

## Ejemplo

```
flb scaffold \
  --name "Inspecciones de vehículos" \
  --description "Flujos de trabajo de inspección de vehículos antes y después del viaje" \
  --author "Acme Logistics" \
  --email "engineering@acme.com" \
  --keywords "flota, inspecciones, cumplimiento"
```

O simplemente ejecuta
`flb scaffold`
y responde a las preguntas.

## Qué se genera

La CLI clona la plantilla en un directorio con nombre kebab que lleva el nombre de tu extensión (por ejemplo,
`vehicle-inspections/`
). Si ya existe un directorio con ese nombre, se añade
`-1`
,
`-2`
, etc., hasta encontrar un nombre disponible.

A continuación, realiza las siguientes acciones:

1.  **Actualiza los manifiestos**
    —
    `extension.json`
    ,
    `package.json`
    y
    `composer.json`
    se actualizan con tu nombre, descripción, autor, palabras clave y los nombres de los paquetes calculados.
2.  **Renombra la clase del motor**
    —
    `addon/engine.js`
    reemplaza
    `StarterEngine`
    con tu clase
    `<Name>Engine`
    y registra el elemento de menú bajo tu nombre de visualización.
3.  **Renombra los archivos de PHP**
    —
    `StarterResourceController.php`
    se convierte en
    `<Name>ResourceController.php`
    , el proveedor de servicios se renombra y los archivos de configuración y rutas se actualizan.
4.  **Refactoriza los espacios de nombres**
    — todos los archivos de PHP en
    `server/`
    tienen sus
    `namespace`
    y
    `use`
    declaraciones actualizadas desde el espacio de nombres del
    `Fleetbase\Starter\…`
    a tu
    `Fleetbase\<YourName>\…`
    .

## Nombres calculados

Dados los inputs
`--author "Acme Logistics" --name "Inspecciones de vehículos"`, el generador produce:

| Activo | Valor |
|---|---|
| Directorio | `vehicle-inspections/` |
| Clase del motor | `VehicleInspectionsEngine` |
| Espacio de nombres de PHP | `Fleetbase\VehicleInspections` |
| Paquete npm | `@acme-logistics/vehicle-inspections-engine` |
| Paquete Composer | `acme-logistics/vehicle-inspections-api` |

El nombre del autor se normaliza: se eliminan los sufijos de empresa comunes (
`LLC`
,
`Pte Ltd`
,
`Inc`
,
`Corp`
,
`GmbH`
,
`Limited`
,
`Ltd`) antes de usarlos en los nombres de los paquetes.

## Próximos pasos

Una vez que el escenario haya finalizado:

```
cd vehicle-inspections

# Enlaza el complemento a tu consola de Fleetbase
cd ../fleetbase/console
pnpm link ../vehicle-inspections

# Enlaza el paquete de API a tu Fleetbase api
cd ../api
composer config repositories.local path ../vehicle-inspections/server
composer require acme-logistics/vehicle-inspections-api:dev-main
```

Para el flujo de trabajo completo de desarrollo (Ember serve, migraciones de Laravel, registro de servicios de Universe), consulta la
[Extension Development](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
.

## Solución de problemas

**`Error scaffolding extension: …`**
— normalmente debido a un fallo de red en
`git clone`
o a un problema de permisos al escribir en la ruta de destino.

**El nombre del directorio ya existe**
— el generador añade automáticamente un contador (
`-1`
,
`-2`
, …). Si quieres sobrescribir, elimina primero el directorio existente.

[Visión general

Construye, prueba, versiona, empaqueta y publica extensiones personalizadas de Fleetbase utilizando la CLI.](https://fleetbase.io/docs/cli/extension-development/overview)
[Incremento de versión

Incrementa la versión de tu extensión en todos los archivos de manifiesto utilizando `flb version-bump`.](https://fleetbase.io/docs/cli/extension-development/version-bump)