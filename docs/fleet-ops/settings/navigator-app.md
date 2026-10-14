---
title: "Navigator App Settings"
url: https://fleetbase.io/docs/fleet-ops/settings/navigator-app
module: fleet-ops
---

# Navigator App Settings

Configure Navigator app behaviour — entity-field editing per Order Configuration and driver self-onboarding from the app.

# Navigator App Settings

**Navigator App Settings**
control two operation-specific behaviours of the Navigator driver mobile app: which entity fields drivers are allowed to edit per Order Configuration, and whether drivers can onboard themselves from the app.

Navigate to
**Fleet-Ops → Settings → Navigator App**
.

![Navigator app settings panel — entity field editing settings and driver onboard settings](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-navigator-app-settings.c6a620e6.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Entity Field Editing

The
**Entity Field Editing Settings**
panel controls which fields on a payload's entities the driver can edit from inside the Navigator app, scoped per
[Order Configuration](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
.

Pick the Order Configuration you want to configure from the
**Select order config**
dropdown.

Toggle
**Enable driver to edit entity fields**
. When off, all entity fields are read-only in Navigator for orders of this config.

When the toggle is on, check the individual fields drivers should be able to edit (description, weight, dimensions, custom fields, etc.).

Click
**Save changes**
. The new setting applies the next time a driver opens an order of this config in Navigator.

The setting is stored per Order Configuration so different order types can grant different levels of driver autonomy — for example a courier flow might lock everything, while a maintenance flow lets drivers update notes and weights inline.

## Driver Onboarding from the App

The
**Driver Onboard Settings**
panel controls whether new drivers can register themselves from inside the Navigator app, without being pre-created by an operator in the console.

| Setting | Description |
| --- | --- |
| **Enable driver onboard from app** | Master toggle — when on, the Navigator login screen exposes a *Sign up* flow |
| **Select onboard method** | The verification path used during sign-up |
| **Require driver to upload onboard documents** | When on, the sign-up flow blocks completion until the driver uploads the documents you require |
| **Required onboard documents** | Free-text list of document names the driver must upload (e.g. *Driver's License* , *Insurance Certificate* ) |

When self-registration is off, drivers must exist in
**Fleet-Ops → Resources → Drivers**
before they can log in.

Other Navigator app behaviours — GPS broadcast frequency, push notifications, locale, and order acceptance mode — are managed by the platform's general system-setup pages or by the driver's device permissions, not by these Fleet-Ops Navigator app settings.

## Saving Settings

Each panel has its own
**Save changes**
button. Updates apply the next time Navigator connects to the server.
