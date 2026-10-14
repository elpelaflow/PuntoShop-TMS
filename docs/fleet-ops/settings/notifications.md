---
title: "Notification Settings"
url: https://fleetbase.io/docs/fleet-ops/settings/notifications
module: fleet-ops
---

# Notification Settings

Pick who receives each Fleet-Ops notification — drivers, customers, operators, vendors, or any registered notifiable.

# Notification Settings

**Notification Settings**
answer one question per registered notification:
*who should receive it?*
For each notification that Fleet-Ops (or an installed extension) has registered with the platform, this page renders a single multi-select where you pick the
**notifiables**
— the parties who get the alert when that notification fires.

Channels (SMS / email / push), message templates, and trigger conditions live elsewhere:

* The
  **channel**
  each recipient gets the notification on is decided by their notifiable type (drivers get push to Navigator, customers get SMS, operators get email, etc.) and the platform-level mailer / SMS / push configuration.
* The
  **trigger**
  (when a notification fires) is wired into the corresponding domain event in code — you can't reconfigure it from this page.

Navigate to
**Fleet-Ops → Settings → Notifications**
.

![Fleet-Ops notification settings — list of registered notifications, each with a Notifiables multi-select](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-notification-settings.91c73402.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## How the Page Works

The page reads from a notifications registry — every notification that's been registered (by Fleet-Ops core or by an extension) shows up here automatically as one row:

| UI element | What it does |
| --- | --- |
| **Notification name** | The titleized identifier of the notification (e.g. *Order Dispatched* , *Order Completed* ). |
| **Description** | Short help text describing when the notification fires. |
| **Notifiables (multi-select)** | The parties that should receive this notification. Options are drawn from the registered notifiables in your instance. |

You don't add or remove notifications from this page — they're defined in code. You only choose
**who gets each one**
.

## Configuring Recipients

Navigate to
**Fleet-Ops → Settings → Notifications**
.

For the notification you want to configure, open the
**Notifiables**
multi-select.

Pick one or more notifiables — examples typically include:

* **Driver**
  — the driver assigned to the order
* **Customer**
  — the order's customer contact
* **Operator**
  — internal dispatch team
* **Vendor / facilitator**
  — the assigned vendor
* any custom notifiable registered by an extension

Click
**Save Changes**
. New notification events will respect the updated recipient list.

## Where Channels Are Decided

When a notification fires, Fleet-Ops dispatches it via the channels that make sense for each notifiable:

* A
  **driver**
  notifiable receives a push notification in the Navigator app
* A
  **customer**
  contact receives an SMS or email depending on what's on file
* An
  **operator**
  receives an email and / or in-console notification

For these channels to actually deliver, the
**platform-level**
services have to be configured:

* **Mail**
  —
  [Platform → System Setup → Mail](https://fleetbase.io/docs/platform/system-setup/mail)
* **SMS**
  — Twilio (or compatible) configured at the platform level
* **Push notifications**
  —
  [Platform → System Setup → Push Notifications](https://fleetbase.io/docs/platform/system-setup/push-notifications)
* **Webhooks**
  — registered in the
  [Developer Console → Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks)

## Adding Custom Notifications

If you need a notification Fleet-Ops doesn't ship, build it in an
[extension](https://fleetbase.io/docs/platform/extensions/managing-extensions)
and register it with the notifications registry. Once registered it appears on this page like any other notification, ready for recipients to be configured.

[Payments

Connect a Stripe Connect account so Fleet-Ops can charge customers for service quotes and surface settled transactions in the console.](https://fleetbase.io/docs/fleet-ops/settings/payments)
[Routing

Pick which routing service renders Fleet-Ops routes, which engine optimises stop order, and the distance unit used in the UI.](https://fleetbase.io/docs/fleet-ops/settings/routing)
