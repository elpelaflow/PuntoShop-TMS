---
title: "Issues"
url: https://fleetbase.io/docs/fleet-ops/resources/issues/overview
module: fleet-ops
---

Issues

# Issues

Log, track, and resolve operational issues — vehicle faults, driver incidents, accidents, and delivery exceptions — with priority and status tracking.

# Issues

**Issues**
are operational incidents, faults, and exceptions that need to be tracked and resolved. Drivers can report issues from the Navigator app, and operators can log them from the console. Issues are linked to the driver, vehicle, or location involved and tracked through a resolution workflow.

![Issues list — issue title, category, priority badge, status, assigned to, and reported date](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-issues-list.1f633f00.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Issue Categories

| Category | Examples |
| --- | --- |
| **Mechanical** | Breakdown, flat tire, engine fault, warning light |
| **Accident** | Collision, near-miss, vehicle damage |
| **Behavioral** | Speeding, unsafe driving, customer complaint |
| **Traffic** | Traffic violation, parking fine |
| **Fuel** | Fuel discrepancy, suspected theft |
| **Maintenance** | Overdue service, parts failure |
| **Device** | GPS tracker offline, OBD-II disconnected |
| **Customer** | Failed delivery, access issue, wrong address |

## Issue Priority Levels

| Priority | Response expectation |
| --- | --- |
| **Low** | No immediate action required |
| **Medium** | Address within the working day |
| **High** | Address within the hour |
| **Critical** | Immediate response required — vehicle out of service |

## Issue Attributes

| Field | Description |
| --- | --- |
| **Title** | Short description of the issue |
| **Report** | Detailed description |
| **Category** | Type of issue (mechanical, behavioral, etc.) |
| **Priority** | low, medium, high, critical |
| **Driver** | Driver involved in the incident |
| **Vehicle** | Vehicle involved (if applicable) |
| **Location** | GPS coordinates where the issue occurred |
| **Tags** | Labels for filtering and categorization |
| **Reported By** | Who logged the issue (driver or operator) |
| **Assigned To** | Who is responsible for resolving it |
| **Status** | Current resolution stage |
| **Resolved At** | Timestamp when the issue was closed |

## Issue Statuses

`status`
is a free-form string — operators can use any value. Newly created issues default to
**`pending`**
if no status is supplied. Common values used in practice:

| Status | Meaning |
| --- | --- |
| `pending` | Default status when an issue is logged but not yet triaged |
| `assigned` | Assigned to a resolver |
| `in_progress` | Being actively worked on |
| `resolved` | Resolution applied, pending confirmation |
| `closed` | Fully resolved and closed |

The status setter dasherizes the input, so
`In Progress`
and
`in_progress`
are stored consistently.

## Creating an Issue

Navigate to
**Fleet-Ops → Resources → Issues**
.

Click
**+ New Issue**
.

Set the
**Title**
,
**Category**
, and
**Priority**
.

Write the
**Report**
— a detailed description of what happened.

Link the
**Driver**
and/or
**Vehicle**
involved.

Assign to an
**Assignee**
responsible for resolution.

Add
**Tags**
for grouping (e.g., "fleet-north", "urgent").

Click
**Save**
.

## Reporting Issues from the Navigator App

Drivers can report issues directly from the Navigator app — they don't need console access. The flow lives on the
**Issues**
screen and reaches it from the main Navigator menu:

![Navigator app — create issue screen with category, priority, and description](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnavigator-app-create-issue-screen.15553896.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

The driver opens
**Issues**
in Navigator and taps
**+ New Issue**
.

Navigator pre-fills the driver and the driver's current location (read live from the device's GPS). The driver picks the
**Category**
and
**Priority**
and writes the
**Report**
.

The driver can attach photo evidence captured directly from the camera, link the issue to the
**Vehicle**
they're driving, and tag it.

On submit, Fleet-Ops creates the issue with status
`pending`
. Operators receive a notification based on the issue's priority.

Drivers can also edit issues they've previously submitted (e.g. add follow-up photos or update the description) from the
**Issues**
screen. The same record is visible to operators in the console.

## Resolving Issues

1. Open an issue and click
   **Assign**
   to set a resolver
2. As work progresses, update the status through the workflow
3. When resolved, click
   **Resolve**
   and add resolution notes
4. Click
   **Close**
   to finalize

Resolved and closed issues remain in the list for reporting and audit purposes.

## Linked Inspections

An issue can be raised from a failed inspection, either with
**Create Issue**
on the inspection or automatically when the inspection form is set up to do so. The issue's details then show a
**Linked Inspection**
section. Click the inspection to open it and see the failed checks, photos, and who filed it. See
[Reviewing & Follow-up](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/reviewing-and-follow-up)
.

## Issue Reporting

Export issues from the list to CSV for reporting. Filter by date range, category, priority, driver, or vehicle to generate targeted reports on fleet incidents.
