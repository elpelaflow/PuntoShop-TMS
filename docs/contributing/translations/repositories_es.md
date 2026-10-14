---
title: "Repositorios"
url: https://fleetbase.io/docs/contributing/translations/repositories
module: contributing
---

Traducciones

# Repositorios

Cada repositorio de Fleetbase que acepta contribuciones de traducción, con rutas y lo que cubre cada uno.

# Repositorios de traducción

Fleetbase está dividido en muchos repositorios, cada uno mantenido de forma independiente, con sus propios archivos de traducción. Para ofrecer una experiencia completa en un idioma, normalmente se contribuye a varios repositorios. Esta página es el mapa completo.

## Console + extensiones

Estas son las aplicaciones con las que interactúan los operadores a diario. La mayor parte del trabajo de traducción se realiza aquí.

| Repositorio | Ruta de traducción | Cubre |
|---|---|---|
| [`fleetbase/fleetbase`](https://github.com/elpelaflow/PuntoShop-TMS) | `console/translations/` | Shell de la consola — navegación principal, configuración, cuenta, autenticación, interfaz de usuario compartida, menús de navegación |
| `fleetops` | `translations/` | Fleet-Ops — pedidos, conductores, vehículos, flotas, gestión de envíos, mapa en vivo, mantenimiento |
| `ledger` | `translations/` | Ledger — facturas, pagos, carteras, contabilidad, informes |
| `iam-engine` | `translations/` | IAM — usuarios, roles, grupos, políticas, permisos |
| `dev-engine` | `translations/` | Consola de desarrollador — claves de API, webhooks, registros, eventos, entorno de pruebas |

## Aplicaciones móviles (React Native)

Las traducciones de las aplicaciones móviles siguen el mismo patrón — bifurcar, editar, PR — pero utilizan un formato de archivo ligeramente diferente (JSON en lugar de YAML en algunos casos). Consulte el
`translations/`
o
`i18n/`
directorio en el README de cada repositorio antes de comenzar.

| Repositorio | Cubre |
|---|---|
| `navigator-app` | Navigator — aplicación para conductores para completar entregas |

## ¿Qué pasa si mi repositorio no está listado?

Si mantienes una extensión de terceros de Fleetbase y quieres seguir las mismas convenciones de traducción, puedes añadir un
`translations/en-us.yaml`
a tu repositorio y dirigir a los colaboradores a esta guía. El cargador i18n de Fleetbase recoge automáticamente
`translations/<locale>.yaml`
de cualquier extensión registrada.

## ¿Por dónde empezar?

Si estás traduciendo desde cero, aquí tienes un orden lógico — por impacto:

### PuntoShop-TMS — Shell de la consola

La interfaz de usuario más visible. Todos los usuarios la ven, independientemente de las extensiones que utilicen.

### Fleet-Ops — Gestión de flotas

La extensión más grande en términos de número de cadenas. Se utiliza por todos los operadores que realizan entregas o gestión de flotas.

### IAM Engine — Usuarios y roles

Común en todas las implementaciones. Menor número de cadenas que Fleet-Ops, pero alta visibilidad.

### Cualquier extensión que utilice tu equipo

Ledger, Dev Console — elige lo que sea relevante para tu operación.

## Coordinación con otros traductores

Si estás trabajando en un idioma con traductores activos, coordina en
`#translations`
en
[Discord](https://fleetbase.io/docs/community/discord)
antes de comenzar un PR importante — esto evita que dos personas traduzcan el mismo archivo en paralelo.

Para un idioma completamente nuevo, simplemente crea un PR con tu trabajo — los mantenedores etiquetarán a cualquier otro colaborador que haya expresado interés.

## Envío

Una vez que tus cambios estén listos, consulta
[Enviar →](https://fleetbase.io/docs/contributing/translations/submitting)
para las convenciones del PR.