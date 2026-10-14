---
Título: Plantillas de facturas
URL: https://fleetbase.io/docs/ledger/billing/invoice-templates
Módulo: ledger
---

# Plantillas de facturas

Cree plantillas de facturas reutilizables con interpolación de variables: número de factura, totales, detalles del cliente y referencias de pago.

# Plantillas de facturas

**Plantillas de facturas**
controle cómo se muestran las facturas en formato PDF y en el portal en línea. Las plantillas de Ledger utilizan el modelo `Template` de Fleetbase con el contexto `invoice` — son cuerpos HTML con interpolación de variables, que se editan mediante el componente **Template Builder**.

Vaya a
**Ledger → Facturación → Plantillas de facturas**
.

![Editor de plantilla de factura — componente de creación de plantillas con selector de variables y vista previa en vivo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-invoice-template-editor.542a0fd6.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Crear una plantilla

Vaya a
**Ledger → Facturación → Plantillas de facturas**
.

Haga clic en
**Nueva plantilla**
.

Ingrese un
**Nombre**
(por ejemplo, "Factura estándar", "Acuerdo de servicio").

Utilice el
**Template Builder**
para crear el cuerpo HTML. Inserta variables a través del selector de variables: se resuelven en tiempo de renderizado en función de la factura que está visualizando.

Haga clic en
**Vista previa**
en cualquier momento para ver la plantilla renderizada con datos de ejemplo, para que pueda ajustar el diseño.

Haga clic en
**Guardar**
.

## Variables de la plantilla

Las plantillas pueden referirse a cualquiera de estos espacios de nombres. Cada uno corresponde a campos en el modelo correspondiente.

### {invoice.\*}

* `{invoice.number}`
  ,
  `{invoice.status}`
  ,
  `{invoice.invoice_date}`
  ,
  `{invoice.due_date}`
  ,
  `{invoice.currency}`
* `{invoice.subtotal}`
  ,
  `{invoice.tax}`
  ,
  `{invoice.total_amount}`
  ,
  `{invoice.amount_paid}`
  ,
  `{invoice.balance}`
* `{invoice.notes}`
  ,
  `{invoice.terms}`
* `{invoice.formatted_total_amount}`
  ,
  `{invoice.formatted_balance}`
  ,
  `{invoice.formatted_due_date}`

### {transaction.\*}

* `{transaction.reference}`
  ,
  `{transaction.amount}`
  ,
  `{transaction.formatted_amount}`
  ,
  `{transaction.created_at}`

### {account.\*}

* `{account.name}`
  ,
  `{account.code}`
  ,
  `{account.type}`

### {wallet.\*}

* `{wallet.balance}`
  ,
  `{wallet.formatted_balance}`
  ,
  `{wallet.currency}`

El conjunto completo de variables registradas se define mediante el esquema de contexto del proveedor de servicios Ledger y es lo que ofrece el selector de variables del componente Template Builder.

## Establecer la plantilla predeterminada

Para aplicar automáticamente una plantilla a todas las nuevas facturas y para permitir la renderización en PDF sin selección de plantillas por factura:

Vaya a
**Ledger → Configuración → Factura**
.

Seleccione la plantilla predeterminada en el campo **Plantilla predeterminada** (`default_template_uuid`).

Guarde.

Si ni la factura ni la configuración tienen una plantilla, la descarga en PDF de una factura fallará hasta que se establezca una.

## Sobreescritura por factura

Al crear o editar una factura, el campo **Plantilla** le permite elegir una plantilla diferente para esa factura específica. Utilice esto si mantiene plantillas separadas para, por ejemplo, facturas estándar frente a notas de crédito.

## Vista previa de una plantilla

La forma más rápida de previsualizar una plantilla es directamente desde el editor de plantillas:

Abra la plantilla en
**Ledger → Facturación → Plantillas de facturas**
.

Haga clic en
**Vista previa**
en el editor de plantillas: la plantilla se renderiza con datos de ejemplo para que pueda ajustar el diseño, las variables y el estilo sin necesidad de una factura real.

Para previsualizar una factura real específica, abra la factura y haga clic en
**Vista previa**
allí: se renderiza utilizando el modelo de plantilla asignado a la factura (o la plantilla predeterminada).

## Plantillas predeterminadas y términos (se utilizan en la configuración de la factura, no en la plantilla)

Las cadenas predeterminadas de
`notes`
y
`terms`
se utilizan para completar automáticamente las nuevas facturas en la configuración de la **factura**, no en la plantilla:

* `default_notes`
* `default_terms`

Esté en
**Ledger → Configuración → Factura**
. Consulte [Configuración](https://fleetbase.io/docs/ledger/settings/overview).

## Contexto de factura Ledger-legacy

Las plantillas creadas antes de la normalización del contexto utilizan el tipo de contexto
`ledger-invoice`
en lugar de
`invoice`
. Ledger normaliza ambos de forma transparente al listar y renderizar, no se requiere ninguna migración.