---
title: "Instalación de la CLI"
url: https://fleetbase.io/docs/cli/getting-started/installation
module: cli
---

# Instalación de la CLI

Instale la CLI de Fleetbase de forma global a través de npm para que el comando `flb` esté disponible en todo el sistema.

# Instalación de la CLI

La CLI de Fleetbase se distribuye en npm como
`@fleetbase/cli`. Instálela globalmente para que el comando
`flb`
esté en su PATH.

## Con npm

```
npm install -g @fleetbase/cli
```

## Con pnpm

```
pnpm add -g @fleetbase/cli
```

## Con Yarn

```
yarn global add @fleetbase/cli
```

## Verificación

```
flb --version
```

Debería ver algo como:

```
@fleetbase/cli 0.0.6
```

## Obtener ayuda

Cada comando admite
`--help`:

```
flb --help
flb scaffold --help
flb install --help
```

El comando principal
`flb --help`
lista todos los comandos disponibles.

## Actualización

Para actualizar una instalación existente:

```
npm install -g @fleetbase/cli@latest
# o
pnpm add -g @fleetbase/cli@latest
```

## Desinstalación

```
npm uninstall -g @fleetbase/cli
# o
pnpm remove -g @fleetbase/cli
```

## Próximos pasos

* [Instalar Fleetbase](https://fleetbase.io/docs/cli/installation/overview)
  — instale una instancia de Fleetbase auto-hospedada utilizando el asistente
* [Buscar extensiones](https://fleetbase.io/docs/cli/extensions/search)
  — descubra extensiones en el registro
* [Crear una cuenta](https://fleetbase.io/docs/cli/account/register)
  — cree una cuenta de registro para publicar