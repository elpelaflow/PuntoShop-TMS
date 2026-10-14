---
título: "Contribuciones de código"
url: https://fleetbase.io/docs/contributing/code
módulo: contributing
---

# Contribuciones de código

Cómo enviar correcciones de errores, funciones y refactorizaciones a Fleetbase: ramificación, pruebas y convenciones de PR.

# Contribuciones de código

Esta página cubre la contribución
**de código**
a Fleetbase: correcciones de errores, funciones, refactorizaciones y mejoras en la plataforma principal y sus extensiones.

Para otros tipos de contribución, consulte
[Traducciones](https://fleetbase.io/docs/contributing/translations)
,
[Documentación](https://fleetbase.io/docs/contributing/documentation)
,
[Extensiones](https://fleetbase.io/docs/contributing/extensions)
, o
[Informar sobre problemas](https://fleetbase.io/docs/contributing/reporting-issues)
.

## Antes de empezar

* **Cree una discusión primero**
  para cambios no triviales. Un pequeño ajuste no requiere una, pero cualquier cosa que añada APIs, modifique el comportamiento o restructure el código debe ser acordada en
  [GitHub Discussions](https://github.com/elpelaflow/PuntoShop-TMS/discussions)
  antes de implementarla.
* **Encuentre un primer problema**
  : los problemas etiquetados
  [`good first issue`](https://github.com/elpelaflow/PuntoShop-TMS/labels/good%20first%20issue)
  están diseñados para principiantes.
* **Lea el README del repositorio correspondiente**
  — las convenciones de codificación y la configuración del desarrollo varían según el componente.

## Presentar una solicitud de extracción

### Ramifique y clone

Ramifique el repositorio en GitHub, y luego clone su ramificación:

```
git clone https://github.com/YOUR_USERNAME/fleetbase.git
cd PuntoShop-TMS
```

### Cree una rama

Ramifique desde
`main`
con un nombre descriptivo:

```
git checkout -b fix/order-status-not-updating
# o
git checkout -b feat/add-bulk-driver-import
```

Utilice los prefijos
`fix/`
,
`feat/`
,
`refactor/`
,
`docs/`
, o
`chore/`
para seguir las convenciones de commit.

### Realice sus cambios

Asegúrese de que sus cambios cumplan con las convenciones de codificación para el componente en el que está trabajando:

* **PHP / Laravel (API principal)**
  — estándar de codificación PSR-12, sugerencias de tipo, comentarios en métodos públicos
* **Ember.js (Console, extensiones)**
  — clases nativas, sin jQuery, siga los patrones existentes de componentes y servicios
* **React Native (aplicaciones móviles)**
  — componentes funcionales, hooks, sin componentes de clase
* **TypeScript (herramientas de desarrollador, este sitio)**
  — modo estricto, prefiera la composición sobre la herencia

### Ejecute pruebas

```
# Pruebas de PHP (desde el contenedor de la API)
docker compose exec application php artisan test

# Pruebas de Ember.js (desde el directorio de la consola)
cd console && pnpm test

# Pruebas de JavaScript / TypeScript
pnpm test
```

Todas las pruebas existentes deben pasar. Si está añadiendo una función, añada una prueba que la cubra.

### Abra la solicitud de extracción

Pulse su rama y abra una PR contra
`main`
del repositorio original. En la descripción de la PR:

* Referencie el problema que está resolviendo (por ejemplo,
  `Closes #1234`
  )
* Describa los cambios y por qué
* Indique cualquier cambio que pueda causar problemas
* Incluya capturas de pantalla para los cambios de interfaz de usuario
* Incluya una sección de plan de pruebas que enumere lo que ha verificado

## Convenciones de codificación

### Mensajes de commit

Siga
[Conventional Commits](https://www.conventionalcommits.org)
:

```
feat(orders): add bulk dispatch action
fix(map): correct vehicle marker rotation
refactor(iam): simplify policy evaluation
docs(api): document the webhook signature scheme
chore(deps): bump @fleetbase/sdk to 1.4.0
```

### Una cosa por PR

Una PR que corrige un error Y refactoriza tres archivos diferentes Y añade una función es imposible de revisar. Divídala.

### Pruebas

* Nuevo código → nuevas pruebas
* Corrección de errores → prueba de regresión que falla antes de la corrección y pasa después
* Refactor → las pruebas existentes deben seguir funcionando; añada nuevas si el comportamiento ha cambiado

### Rendimiento

Si su cambio afecta a una ruta de alto rendimiento (renderizar el mapa en vivo, consultas de listas, la línea de tiempo de la orden), incluya los números de antes/después en la descripción de la PR.

## Dónde se almacenan las contribuciones

Los diferentes cambios van a diferentes repositorios. El mapa completo de repositorios:

| Repositorio | Qué cubre |
|---|---|
| [`fleetbase/fleetbase`](https://github.com/elpelaflow/PuntoShop-TMS) | Plataforma principal — API, consola, IAM, consola de desarrollador |
| [`PuntoShop-TMS (Fleet-Ops)`](https://github.com/elpelaflow/PuntoShop-TMS) | Extensión Fleet-Ops |
| [`PuntoShop-TMS (Ledger)`](https://github.com/elpelaflow/PuntoShop-TMS) | Ledger (finanzas) |
| [`PuntoShop-TMS (IAM Engine)`](https://github.com/elpelaflow/PuntoShop-TMS) | Motor IAM |
| [`PuntoShop-TMS (Dev Engine)`](https://github.com/elpelaflow/PuntoShop-TMS) | Motor de la consola de desarrollador |
| [`Navigator App`](https://github.com/elpelaflow/PuntoShop-TMS) | Aplicación móvil Navigator para conductores |
| [`fleetbase/fleetbase-cli`](https://github.com/elpelaflow/PuntoShop-TMS-cli) | CLI de Fleetbase |
| [`PuntoShop-TMS (Ember UI)`](https://github.com/elpelaflow/PuntoShop-TMS) | Biblioteca de UI de Ember.js para la consola |

## Licencia

Al enviar una contribución, acepta que su código está licenciado bajo
[AGPL-3.0](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/LICENSE.md)
. Para preguntas sobre la licencia, consulte
[Licencias](https://fleetbase.io/docs/community/licensing)
.