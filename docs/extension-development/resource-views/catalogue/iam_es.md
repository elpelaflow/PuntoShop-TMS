---
título: "IAM"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam
módulo: extension-development
---

Vistas de recursos

Catálogo de registros

# IAM

Cada registro de vistas de recursos IAM declara — los nombres de los registros para cada tabla y vista de detalles, donde se conecta a la fuente de IAM, y los identificadores incorporados para asignar sus elementos.

# Registros de IAM

IAM (
`@fleetbase/iam-engine`
, desde la versión 0.1.13) declara registros para
**4 recursos**. Cada nombre comienza con
`iam:`
y sigue el formato
`iam:<recurso>:<superficie>:<ranura>`
.

La tabla enumera cada recurso y el archivo de origen que lo conecta. Abra un recurso a continuación para obtener sus nombres de registro e identificadores incorporados.

| Recurso | Vista | Tabla | Detalles | Panel lateral |
|---|---|---|---|---|
| [`user`](#user) | Usuarios | `users.hbs` | `user-actions.js` | — |
| [`group`](#group) | Grupos | `index.hbs` | `group-actions.js` | — |
| [`role`](#role) | Roles | `index.hbs` | `role-actions.js` | — |
| [`policy`](#policy) | Políticas | `index.hbs` | `policy-actions.js` | — |

## Recursos

### user — Usuarios

### group — Grupos

### role — Roles

### policy — Políticas