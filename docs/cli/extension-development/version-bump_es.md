---
title: "Aumento de la versión"
url: https://fleetbase.io/docs/cli/extension-development/version-bump
module: cli
---

# Aumento de la versión

Aumente la versión de su extensión en todos los archivos de manifiesto utilizando `flb version-bump`.

# flb version-bump

Aumente la versión de su extensión en
**todos los tres archivos de manifiesto**
en un solo paso:

* `extension.json`
* `package.json`
* `composer.json`

Internamente, la CLI utiliza
`semver.inc()`
, por lo que obtiene identificadores de pre-versión correctos y aumentos según SemVer.

```
flb version-bump --patch     # Predeterminado — aumenta de 1.2.3 a 1.2.4
flb version-bump --minor     # De 1.2.3 a 1.3.0
flb version-bump --major     # De 1.2.3 a 2.0.0
flb version-bump --pre-release rc   # De 1.2.3 a 1.2.4-rc.0
```

Si no se especifica ninguna opción,
`--patch`
se utiliza.

## Opciones

| Opción | Descripción |
|---|---|
| `-p, --path <ruta>` | Ruta al directorio de la extensión (predeterminado: directorio actual) |
| `--major` | Aumenta la versión principal (de `1.2.3` a `2.0.0`) |
| `--minor` | Aumenta la versión secundaria (de `1.2.3` a `1.3.0`) |
| `--patch` | Aumenta la versión de parche (de `1.2.3` a `1.2.4`) — la predeterminada |
| `--pre-release [identificador]` | Agrega una etiqueta de pre-versión (por ejemplo, `rc`, `beta`, `alpha`) |

## Ejemplos

### Versión de parche

```
flb version-bump --patch
```

```
Actualiza extension.json a la versión 1.2.4
Actualiza package.json a la versión 1.2.4
Actualiza composer.json a la versión 1.2.4
```

### Versión secundaria

```
flb version-bump --minor
```

### Versión principal

```
flb version-bump --major
```

### Candidato a versión

```
flb version-bump --patch --pre-release rc
```

Esto produce algo como
`1.2.4-rc.0`
. Los aumentos posteriores con el mismo identificador producen
`1.2.4-rc.1`
,
`1.2.4-rc.2`
, etc.

### Directorio diferente

```
flb version-bump --minor --path ./extensions/vehicle-inspections
```

## Comportamiento

* La CLI lee cada manifiesto, incrementa la versión y la escribe de nuevo. Otros campos permanecen sin cambios.
* Los archivos que no existen o que no tienen el
  `version`
  campo se omiten silenciosamente, por lo que un proyecto que carece de uno de los tres manifiestos aún incrementa los otros.
* Una cadena de versión inválida (una
  `semver.inc()`
  no puede analizar) se registra como un error para ese archivo específico y se omite:

  ```
  Versión inválida en package.json: foo-bar
  ```

## Cuándo ejecutar esto

* **Antes de agrupar**
  — el nombre del archivo del paquete incluye la versión, así que incremente primero si desea un nuevo nombre de paquete
* **Antes de publicar**
  — npm rechaza la publicación de la misma versión dos veces, así que incremente antes de cada
  `flb publish`

## Estrategia de versionado

Siga SemVer:

* **Mayor**
  — cambios incompatibles (claves de configuración renombradas, API eliminadas, cambios de esquema que requieren migraciones)
* **Menor**
  — características compatibles hacia atrás
* **Parche**
  — correcciones de errores
* **Pre-versión**
  —
  `-rc.X`
  ,
  `-beta.X`
  para pruebas antes de una versión estable

## Solución de problemas

**Versiones desincronizadas**
— si
`extension.json`
dice
`1.2.0`
,
`package.json`
dice
`1.1.5`
, y
`composer.json`
dice
`1.2.0`
,
`flb version-bump --patch`
incrementa cada uno de sus valores actuales, dejándolos aún desincronizados. Para solucionar esto, establezca primero la misma versión base en los tres archivos, y luego incremente.

**Archivo de manifiesto faltante**
— si ha eliminado intencionalmente uno de los tres manifiestos, la CLI lo omite. No se necesita ninguna acción.