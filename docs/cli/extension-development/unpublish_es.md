---
title: "Despublicar"
url: https://fleetbase.io/docs/cli/extension-development/unpublish
module: cli
---

# Despublicar

Elimina una extensión publicada del Registro de Extensiones de Fleetbase utilizando `flb unpublish`.

# flb unpublish

Elimina una extensión publicada (o una versión específica de ella) del registro. Internamente, esto ejecuta
`npm unpublish --force`
.

```
flb unpublish @yourcompany/yourext-engine          # Despublica todas las versiones
flb unpublish @yourcompany/yourext-engine@1.2.3    # Despublica una versión específica
```

## Opciones

| Opción | Descripción |
| --- | --- |
| `[packageName]` | Nombre del paquete para despublicar (con un sufijo opcional `@version`) |
| `-r, --registry <url>` | URL del registro (predeterminado: `https://registry.fleetbase.io`) |

## Autenticación

Al igual que con
[`flb publish`](https://fleetbase.io/docs/cli/extension-development/publish), despublicar requiere que hayas iniciado sesión en el registro: consulta
[`flb login`](https://fleetbase.io/docs/cli/account/login)
o
[`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth).

Solo puedes despublicar paquetes que poseas.

## Ejemplos

### Despublicar una versión específica

```
flb unpublish @acme/vehicle-inspections-engine@1.2.0
```

### Despublicar todas las versiones

```
flb unpublish @acme/vehicle-inspections-engine
```

Esto elimina el paquete completo del registro.

### Registro auto-alojado

```
flb unpublish @acme/vehicle-inspections-engine@1.2.0 --registry https://registry.mycompany.com
```

Despublicar afecta a todas las instancias de Fleetbase que tengan esta extensión instalada. Las futuras llamadas a
`flb install`
fallarán, y las ejecuciones de
`pnpm install`
/
`composer require`
en instancias existentes no podrán obtener el paquete.

La mayoría de los registros públicos (incluido npm) imponen una ventana de 72 horas después de la publicación durante la cual se permite la despublicación, después de lo cual se restringe para evitar daños en el ecosistema. Verifica la política del registro antes de confiar en la despublicación.

## Cuándo usar esto

* **Inmediatamente después de una publicación fallida**
  — has publicado una versión defectuosa, la has detectado en cuestión de minutos y quieres retirarla antes de que alguien la instale
* **Incidente de seguridad**
  — una versión publicada contiene credenciales expuestas o una vulnerabilidad crítica

Para el ciclo normal de versiones (desacreditar una versión antigua, reemplazarla con una nueva),
**no despubliques — publica una versión más nueva en su lugar**
.

## Alternativas a la despublicación

* **Desacredita**
  la versión defectuosa con
  `npm deprecate <pkg>@<version> "message"`
  — mantiene la versión instalable pero añade una advertencia
* **Publica una versión corregida**
  — incrementa con
  `flb version-bump --patch`
  y
  `flb publish`
  . La mayoría de los gestores de paquetes prefieren la versión más alta válida de todos modos
* **Elimina en la interfaz de usuario del registro**
  — algunos registros auto-alojados permiten a los administradores marcar una versión como retirada sin eliminarla

## Solución de problemas

**`Error: 403 Forbidden`**
— no posees el paquete, o ha expirado la ventana de despublicación del registro.

**`Error: 404 Not Found`**
— el nombre del paquete o la versión no existen en el registro.