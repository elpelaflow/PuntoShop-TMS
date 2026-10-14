---
title: "Dashboards & Widgets"
url: https://fleetbase.io/docs/platform/console-features/dashboards-and-widgets
module: platform
---

# Dashboards & Widgets

Build and customize dashboards with drag-and-drop widgets. Each user can maintain multiple dashboards per extension context.

# Dashboards & Widgets

The Fleetbase Console home screen is a fully customizable dashboard. Drag, resize, and arrange widgets to surface the metrics and views most relevant to your work. Extensions register their own widget types, and each user can create and manage multiple dashboards.

![Home dashboard — GridStack widget grid with stat cards, charts, and extension widgets](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-dashboard.a817083d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## The Dashboard Grid

The dashboard uses
**GridStack**
for layout. Widgets sit on a fluid grid and can be freely repositioned and resized by dragging.

In
**edit mode**
a trash icon appears on each widget allowing you to remove it. Drag any widget to reposition it. Drag the widget's edge or corner to resize it. Position and size changes are saved automatically.

## Switching Dashboards

If you have created multiple dashboards a
**dashboard selector**
appears at the top of the dashboard area. Click any name to switch to that dashboard.

To revert to the instance-wide shared layout, select
**Default Dashboard**
— this resets your active dashboard pointer to the system default.

![Dashboard selector — named dashboards list with the Default Dashboard option](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-dashboard-switch.828b5078.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Creating a Dashboard

Click
**New dashboard**
, enter a name, and confirm. The new dashboard becomes active immediately. Dashboards are per-user — other members of your organization manage their own independently.

## Deleting a Dashboard

Open the dashboard you want to remove and click
**Delete**
. This removes the dashboard record and all its widget placements. The Default Dashboard cannot be deleted.

## Adding Widgets

Click
**Add widget**
to open the Widget Panel. On a newly created empty dashboard the panel opens automatically.

![Widget Panel — right-side overlay with search field and scrollable widget card list](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-dashboard-add-widgets.578add1a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

The Widget Panel is a right-side overlay listing every widget type registered by installed extensions. Use the
**search field**
to filter by keyword. Click any widget card to add it to the current dashboard at a default position.

Widgets are provided by extensions. Installing a new extension makes its widget types available in the panel immediately.

## Extension Dashboards

Each extension hosts its own dashboard context independently of the home dashboard. For example, the Fleet-Ops extension has its own widget registry and dashboard area separate from the core console home. Navigate into an extension to find its own dashboard or overview panel.

The home dashboard runs under extension context
`core`
.

## Registering Widgets (Developers)

Extensions register widget types at startup via the Universe service. Each widget definition supplies a component path, name, description, and icon. Registered widgets appear in the Widget Panel for all users on the instance.

See
[Extending Fleetbase](https://fleetbase.io/docs/extending-fleetbase)
for details on building and registering custom widgets.
