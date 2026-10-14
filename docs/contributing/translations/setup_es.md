---
title: "Configuración"
url: https://fleetbase.io/docs/contributing/translations/setup
module: contributing
---

Traducciones

# Configuración

Cree, clone y prepare su entorno para contribuir con las traducciones de Fleetbase.

# Configuración

Esta página cubre la configuración práctica antes de traducir cualquier cosa. Ninguna de ellas es específica de Fleetbase: si ya ha contribuido a un proyecto de GitHub, revise y pase de largo.

## Requisitos previos

Necesitará:

* Una
  **cuenta de GitHub**
* **Git**
  instalado localmente
* Un
  **editor de texto**
  que gestione bien los archivos YAML (VS Code, Sublime, Vim, cualquier cosa con resaltado de sintaxis)
* *(Opcional)*
  Una forma de ejecutar Fleetbase localmente para previsualizar su traducción en contexto: consulte
  [Auto-hospedaje](https://fleetbase.io/docs/platform/system-setup)
  si desea seguir este camino.

No es necesario ejecutar Fleetbase localmente para contribuir: puede traducir directamente los archivos YAML y confiar en que los mantenedores verifiquen la renderización durante la revisión. Sin embargo, ejecutarlo localmente proporciona un feedback más rápido, especialmente para idiomas que cambian el tamaño de la interfaz de usuario (palabras alemanas largas, árabe RTL, CJK denso).

## Paso 1 — Identifique el repositorio

Decida qué desea traducir:

| Si desea traducir... | Cree una copia de este repositorio |
| --- | --- |
| **La consola** (navegación, configuración, autenticación) | [`elpelaflow/PuntoShop-TMS`](https://github.com/elpelaflow/PuntoShop-TMS) |
| **Fleet-Ops** (gestión de flotas) | `fleetops` |
| **Ledger** (interfaz de finanzas) | `ledger` |
| **IAM** (usuarios, roles, políticas) | `iam-engine` |
| **Developer Console** (claves API, webhooks) | `dev-engine` |

Mapa completo de repositorios con rutas de traducción:
[Repositorios →](https://fleetbase.io/docs/contributing/translations/repositories)
.

Puede contribuir a un solo repositorio a la vez. Muchos traductores comienzan con la consola (la más orientada al usuario) y luego amplían desde allí.

## Paso 2 — Cree una copia y clone

En GitHub, haga clic en
**Crear copia**
del repositorio que haya elegido. Luego, clone su copia localmente:

```
git clone https://github.com/YOUR_USERNAME/<repo-name>.git
cd <repo-name>
```

Agregue el repositorio remoto "upstream" para poder obtener las últimas actualizaciones:

```
git remote add upstream https://github.com/elpelaflow/PuntoShop-TMS.git
git fetch upstream
```

## Paso 3 — Encuentre los archivos de traducción

Los archivos de traducción se encuentran en uno de dos caminos, dependiendo del repositorio:

* **Principal
  `elpelaflow/PuntoShop-TMS`
  repositorio**
  →
  `console/translations/`
* **Para cualquier otra extensión**
  →
  `translations/`
  (en la raíz del repositorio)

Dentro, verá un archivo YAML por cada idioma:

```
translations/
├── en-us.yaml      # idioma base — nunca traduzca directamente
├── ar.yaml         # Árabe
├── de-de.yaml      # Alemán
├── es-es.yaml      # Español (España)
├── es-mx.yaml      # Español (México)
├── fr-fr.yaml      # Francés (Francia)
├── hi.yaml         # Hindi
├── ja-jp.yaml      # Japonés
├── ko-kr.yaml      # Coreano
├── mn.yaml         # Mongolia
├── pt-br.yaml      # Portugués (Brasil)
├── ru.yaml         # Ruso
├── th.yaml         # Tailandés
├── vi.yaml         # Vietnamita
├── zh-cn.yaml      # Chino (Simplificado)
└── zh-hk.yaml      # Chino (Tradicional, Hong Kong)
```

La lista exacta varía según el repositorio. Algunas extensiones tienen menos idiomas que la consola. Esto es normal: comience a rellenarlos.

## Paso 4 — Cree su archivo de idioma

### Agregar un nuevo idioma

```
# desde el directorio translations/
cp en-us.yaml es-mx.yaml      # ejemplo: Español mexicano
```

Utilice el formato estándar
[Etiqueta de idioma BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag)
:
`<idioma>-<región>`
(por ejemplo,
`pt-br`
,
`es-mx`
,
`zh-cn`
). En minúsculas, con guiones.

Para idiomas con poca variación regional, puede omitir la región (por ejemplo,
`ar`
,
`hi`
,
`vi`
,
`mn`
).

### Actualizar un idioma existente

Abra el archivo de idioma existente y comparelo con
`en-us.yaml`
lado a lado. Utilice una herramienta de comparación para encontrar las claves que están presentes en
`en-us`
pero que faltan o están obsoletas en su idioma:

```
# comparación aproximada — solo listar las claves
yq 'paths | map(.) | join(".")' en-us.yaml > /tmp/en.keys
yq 'paths | map(.) | join(".")' es-mx.yaml > /tmp/es.keys
diff /tmp/en.keys /tmp/es.keys
```

(Esto requiere
`yq`
—
`brew install yq`
o
`apt install yq`
. El comando exacto varía según la versión de
`yq`
).

## Paso 5 — Cree una rama de trabajo

```
git checkout -b translations/es-mx-update
# o
git checkout -b translations/add-vietnamese
```

Ahora está listo para traducir. Siga
[Formato de archivo →](https://fleetbase.io/docs/contributing/translations/file-format)
para aprender sobre las convenciones de YAML, los marcadores de posición y las reglas.