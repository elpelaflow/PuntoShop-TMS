---
título: "Desinstalar"
url: https://fleetbase.io/docs/cli/extensions/uninstall
módulo: cli
---

# Desinstalar

Elimine una extensión instalada de una instancia de Fleetbase en ejecución utilizando `flb uninstall`.

# flb uninstall

Elimine una extensión previamente instalada de una instancia de Fleetbase. La CLI ejecuta
`pnpm remove`
(en
`console/`) y
`composer remove`
(en
`api/`).

```
flb uninstall <nombreDelPaquete>
```

El nombre del paquete sigue las mismas formas que
[`flb install`](https://fleetbase.io/docs/cli/extensions/install)
— slug o ID de la extensión.

## Opciones

| Opción | Descripción |
| --- | --- |
| `[nombreDelPaquete]` | Slug o ID de la extensión a desinstalar |
| `-p, --path <ruta>` | Ruta a la instancia de Fleetbase (predeterminado: directorio actual) |

## Ejemplos

### Desde dentro de su directorio de Fleetbase

```
cd /ruta/a/fleetbase
flb uninstall fleetbase/flespi
```

### Desde cualquier lugar

```
flb uninstall fleetbase/flespi --path /ruta/a/fleetbase
```

## Qué sucede

La CLI llama al punto final de búsqueda del registro para resolver los nombres de los paquetes npm + composer.

Verifica que el directorio de destino contenga tanto
`console/`
como
`api/`
subdirectorios.

Ejecuta
`pnpm remove <paqueteNpm>`
dentro de
`console/`
.

Ejecuta
`composer remove <paqueteComposer>`
dentro de
`api/`
.

Después de desinstalar, reinicie sus contenedores:

```
docker compose restart
```

## Limpieza

`flb uninstall`
elimina los archivos del paquete, pero **no**:

* Elimina las tablas de la base de datos o revierte las migraciones creadas por la extensión
* Elimina la configuración, las claves secretas o las credenciales almacenadas
* Elimina los archivos subidos
* Revoca las claves de API o los webhooks que creó la extensión

Si la extensión proporciona un comando de limpieza (por ejemplo, un comando `artisan` o un botón "Restablecer" en la configuración), ejecútelo
**antes**
de desinstalar para que pueda limpiar su propio estado. De lo contrario, consulte la documentación de la extensión para eliminar manualmente cualquier artefacto restante.

## Solución de problemas

**`Ruta de instancia de Fleetbase inválida: …`**
— la
`--path`
(o el directorio actual) no contiene tanto
`console/`
como
`api/`
. Proporcione la ruta correcta.

**`La desinstalación falló: …`**
— falló el comando subyacente
`pnpm remove`
o
`composer remove`
. Verifique el error impreso.