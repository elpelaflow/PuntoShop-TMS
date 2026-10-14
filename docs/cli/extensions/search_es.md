---
title: "Buscar"
url: https://fleetbase.io/docs/cli/extensions/search
module: cli
---

# Buscar

Explora el Registro de Extensiones de Fleetbase desde la línea de comandos con `flb search`.

# flb search

Explora y filtra el Registro de Extensiones de Fleetbase desde tu terminal. Úsalo para descubrir las extensiones disponibles antes de instalar una.

![salida de flb search — extensiones coincidentes con las columnas nombre, versión y precio](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fextensions-cli-search.1f07c9b8.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

```
flb search                       # Listar todo
flb search flespi                # Filtrar por consulta
flb search --category logistics  # Filtrar por categoría
flb search --free                # Mostrar solo extensiones gratuitas
```

La consulta (argumento posicional) coincide con el nombre de la extensión, el slug, el subtítulo, la descripción y las etiquetas.

## Opciones

| Opción | Descripción |
|---|---|
| `[consulta]` | Término de búsqueda libre — coincide con nombre, slug, subtítulo, descripción, etiquetas |
| `-c, --category <categoría>` | Filtrar por nombre o slug de la categoría |
| `-f, --free` | Mostrar solo extensiones gratuitas (sin costo) |
| `--json` | Mostrar JSON sin formato (útil para scripts) |
| `--simple` | Una extensión por línea: `slug<TAB>nombre<TAB>vVERSION<TAB>precio` |
| `-h, --host <host>` | Host de la API (predeterminado: `https://api.fleetbase.io`) |

## Modos de salida

### Predeterminado (formateado)

```
flb search flespi
```

```
🔍 Buscando extensiones de Fleetbase...

Se encontraron 1 extensión:

Flespi Telematics v1.0.0  Gratis  ↓ 320  [Telemática]
  fleetbase/flespi  por Fleetbase
  Integración de puerta de enlace telemática y dispositivos GPS IoT.
  Instalar: flb install fleetbase/flespi  o flb install ext_xxx
─────────────────────────────────────────────
Use flb install fleetbase/<slug> o flb install <extension_id> para instalar una extensión.
Use flb search --json para una salida legible por máquina.
```

Cada entrada muestra:

* Nombre, versión, precio (en verde si es gratuito, en amarillo si es de pago), número de instalaciones, categoría
* Slug y editor
* Subtítulo (si está presente)
* Dos comandos de instalación: por slug o por ID de extensión

### JSON

```
flb search flespi --json
```

Devuelve el array JSON sin formato del registro, adecuado para pasar a
`jq`
:

```
flb search --json | jq '.[].slug'
```

### Simple (separado por tabulaciones)

```
flb search --simple
```

```
fleetbase/flespi	Flespi	v1.0.0	gratis
fleetbase/navigator	Navigator	v1.1.0	gratis
```

Útil para scripts de shell que necesitan iterar sobre los slugs de extensión.

## Ejemplos

### Encontrar extensiones de telemática gratuitas

```
flb search --category telematics --free
```

### Buscar un paquete específico

```
flb search flespi
```

### Pasar a un script

```
flb search --simple | awk -F'\t' '{ print $1 }'
```

### Contra un registro autohospedado

```
flb search --host registry.mycompany.com
```

## Lógica de filtrado

Los filtros se componen:
`--query foo --category bar --free`
devuelven extensiones que coinciden con todas las tres.

La coincidencia de la consulta es insensible a mayúsculas y minúsculas en estos campos:

* `name`
* `slug`
* `subtitle`
* `description`
* `tags`
  (array)

La coincidencia de la categoría es insensible a mayúsculas y minúsculas tanto con el nombre como con el slug de la categoría.

## Autenticación

`flb search`
**no**
requiere autenticación — la lista de extensiones del registro es pública.

## Solución de problemas

**`No se encontraron extensiones.`**
— el registro devolvió una lista vacía. Verifica que tu
`--host`
sea accesible.

**`La búsqueda falló: 500 …`**
— el registro devolvió un error. Inténtalo de nuevo o verifica el estado del registro.

**`La búsqueda falló: No se recibió respuesta del servidor`**
— tu red o
`--host`
no es accesible.