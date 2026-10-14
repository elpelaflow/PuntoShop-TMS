---
title: "Fuel Reports"
url: https://fleetbase.io/docs/fleet-ops/resources/fuel-reports/overview
module: fleet-ops
---

Fuel Reports

# Fuel Reports

Record and monitor fleet fuel consumption — track volume, cost, odometer readings, and fuel-up locations for cost analysis and fraud detection.

# Fuel Reports

**Fuel Reports**
are records of fleet fuel consumption. Drivers submit reports when they fill up, and operators can log reports from the console. Each report captures the volume, cost, odometer reading, and location of the fuel transaction. Fuel reports are used for cost tracking, consumption analysis, and detecting anomalies.

![Fuel reports list — driver, vehicle, date, volume, amount, and status badge](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-fuel-reports-list.741111ed.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Fuel Report Fields

| Field | Description |
| --- | --- |
| **Driver** | The driver who reported the fuel purchase |
| **Vehicle** | The vehicle that was refuelled |
| **Reported By** | User who created the report (may differ from driver) |
| **Volume** | Fuel volume purchased (liters or gallons) |
| **Metric Unit** | liters or gallons |
| **Amount** | Total cost of the fuel purchase |
| **Currency** | Currency of the amount |
| **Odometer** | Current odometer reading at the time of fill-up |
| **Location** | GPS coordinates of the fuel station |
| **Report** | Notes or additional details |
| **Status** | pending, approved, rejected |

## Fuel Report Statuses

| Status | Meaning |
| --- | --- |
| `pending` | Submitted, awaiting operator review |
| `approved` | Verified and accepted |
| `rejected` | Flagged as inaccurate or rejected |

## Creating a Fuel Report

### From the Console

Navigate to
**Fleet-Ops → Resources → Fuel Reports**
.

Click
**+ New Fuel Report**
.

Select the
**Driver**
and
**Vehicle**
.

Enter the
**Volume**
,
**Metric Unit**
, and
**Amount**
.

Enter the
**Odometer**
reading.

Set the location by entering an address or using the map.

Add any
**Notes**
about the transaction.

Click
**Save**
.

### From the Navigator App

Drivers can submit and edit fuel reports directly from the Navigator app — no console access needed:

![Navigator app — create fuel report screen with volume, cost, and odometer fields](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnavigator-app-create-fuel-report-screen.562e42d0.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

The driver opens
**Fuel Reports**
in Navigator and taps
**+ New Fuel Report**
.

Navigator pre-fills the driver and the driver's current GPS location. The driver enters the
**Volume**
,
**Metric Unit**
,
**Amount**
,
**Currency**
, and
**Odometer**
reading; selects the
**Vehicle**
; and adds optional notes.

On submit, Fleet-Ops creates the fuel report with status
`pending`
. It appears in the console for operator approval.

Drivers can also
**edit existing fuel reports**
they previously submitted from the same screen — for example to correct an odometer reading after taking a clearer photo. The same record is visible to operators in the console.

## Reviewing and Approving Reports

Fuel reports submitted by drivers start in
`pending`
status. Operators review and either:

* **Approve**
  — confirm the report is accurate; it is included in fuel cost calculations
* **Reject**
  — flag the report as inaccurate with a reason

Rejected reports notify the driver and can be resubmitted with corrections.

## Analysis Use Cases

Fuel reports enable:

| Analysis | How |
| --- | --- |
| **Cost per km** | Combine odometer data with order distance data |
| **Consumption anomalies** | Flag high volume vs. distance ratio (potential fraud) |
| **Fleet cost allocation** | Break down fuel costs per vehicle or fleet |
| **Budget tracking** | Compare actual fuel spend vs. budget |
| **Service interval planning** | Use odometer readings to trigger maintenance reminders |

## Exporting Fuel Data

Click
**Export**
in the fuel reports list to download a CSV of all reports. Filter by date range, driver, or vehicle before exporting for targeted cost reports.

[Issues

Log, track, and resolve operational issues — vehicle faults, driver incidents, accidents, and delivery exceptions — with priority and status tracking.](https://fleetbase.io/docs/fleet-ops/resources/issues/overview)
[Maintenance Overview

Manage vehicle and equipment maintenance — preventive schedules, work orders, parts inventory, and maintenance history.](https://fleetbase.io/docs/fleet-ops/maintenance/overview)
