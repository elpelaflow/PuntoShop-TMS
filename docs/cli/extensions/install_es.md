---
title: "Instalar"
url: https://fleetbase.io/docs/cli/extensions/install
module: cli
---

# Instalar

Instale una extensión en una instancia de Fleetbase en ejecución utilizando `flb install`.

# flb install

Instale una extensión de Fleetbase en una instancia de Fleetbase auto-hospedada en ejecución. La CLI busca los nombres de los paquetes npm y Composer para la extensión y ejecuta tanto
`pnpm install`
(en
`console/`)
como
`composer require`
(en
`api/`).

```
flb install <nombre_del_paquete>
```

El nombre del paquete puede ser:

* Un
  **slug**
  en el formato
  `fleetbase/<slug>`
  (por ejemplo,
  `fleetbase/flespi`)
* Un
  **ID de extensión**
  (por ejemplo,
  `ext_a1b2c3d4`)

Ambos formatos provienen de
[`flb search`](https://fleetbase.io/docs/cli/extensions/search).

## Opciones

| Opción | Descripción |
|---|---|
| `[nombre_del_paquete]` | Slug o ID de la extensión a instalar |
| `-p, --path <ruta>` | Ruta a la instancia de Fleetbase (predeterminado: directorio actual) |

## Ejemplos

### Desde dentro de tu directorio de Fleetbase

```
cd /path/to/fleetbase
flb install fleetbase/flespi
```

### Desde cualquier lugar

```
flb install fleetbase/flespi --path /path/to/fleetbase
```

### Utilizando un ID de extensión

```
flb install ext_a1b2c3d4 --path /path/to/fleetbase
```

## Qué sucede

La CLI llama al punto final de búsqueda del registro para resolver los nombres de los paquetes npm + composer de la extensión.

Verifica que el directorio de destino contenga tanto
`console/`
como
`api/`. Si no, la instalación falla.

Ejecuta
`pnpm install <paquete_npm>`
dentro de
`console/`
para agregar el complemento.

Ejecuta
`composer require <paquete_composer>`
dentro de
`api/`
para agregar el paquete del lado del servidor.

Después de que la instalación se complete, debe
**reiniciar sus contenedores**
para que se cargue el nuevo código:

```
docker compose restart
```

…y ejecutar cualquier migración pendiente que proporcione la extensión:

```
docker compose exec application php artisan migrate
```

Algunas extensiones también requieren un paso de configuración/sembrado: consulte la documentación de la extensión.

## Autenticación

Para extensiones
**públicas y gratuitas**, no se requiere autenticación.

Para extensiones
**de pago**
o
**privadas**, necesita un token de registro configurado en la instancia a través de
[`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)
antes de instalar. Si no, tanto
`pnpm install`
como
`composer require`
fallarán con un error 401 del registro.

## Resolución de rutas

`--path`
acepta un
`~`
-abreviatura del directorio de inicio (por ejemplo,
`--path ~/projects/fleetbase`). Se resuelve a una ruta absoluta antes de verificar
`console/`
y
`api/`.

## Solución de problemas

**`Ruta de instancia de Fleetbase inválida: …`**
— la
`--path`
(o el directorio actual) no contiene tanto
`console/`
como
`api/`. Proporcione la ruta correcta.

**`Datos de paquete inválidos recibidos del registro`**
— el registro devolvió datos malformados para ese nombre de paquete. Verifique el slug o ID a través de
`flb search`.

**`La instalación falló: …`**
— falló el subproceso
`pnpm install`
o
`composer require`. Verifique el error impreso para dependencias faltantes o problemas de autenticación.

## Siguientes pasos

* [Desinstalar](https://fleetbase.io/docs/cli/extensions/uninstall)
  — eliminar una extensión instalada
* [Buscar](https://fleetbase.io/docs/cli/extensions/search)
  — descubrir extensiones