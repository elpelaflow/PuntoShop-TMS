---
title: "Fleet-Ops"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops
module: extension-development
---

Resource Views

Registry Catalogue

# Fleet-Ops

Every resource view registry Fleet-Ops declares — the registry names for each table and details view, where each is wired in the Fleet-Ops source, and the built-in ids to place your items against.

# Fleet-Ops Registries

Fleet-Ops (
`@fleetbase/fleetops-engine`
, from 0.6.71) declares registries for
**25 resources**
. Every name starts with
`fleet-ops:`
and follows
`fleet-ops:<resource>:<surface>:<slot>`
.

The table lists each resource and the source file that wires it up. Open a resource below for its registry names and built-in ids.

| Resource | View | Table | Details | Side panel |
| --- | --- | --- | --- | --- |
| [`order`](#order) | Orders | `index.hbs` | `details.hbs` | `order-actions.js` |
| [`service-rate`](#service-rate) | Service rates | `index.hbs` | `details.hbs` | `service-rate-actions.js` |
| [`driver`](#driver) | Drivers | `index.hbs` | `details.hbs` | `driver-actions.js` |
| [`vehicle`](#vehicle) | Vehicles | `index.hbs` | `details.hbs` | `vehicle-actions.js` |
| [`trailer`](#trailer) | Trailers | `index.hbs` | `details.hbs` | `trailer-actions.js` |
| [`fleet`](#fleet) | Fleets | `index.hbs` | `details.hbs` | `fleet-actions.js` |
| [`place`](#place) | Places | `index.hbs` | `details.hbs` | `place-actions.js` |
| [`contact`](#contact) | Contacts | `index.hbs` | `details.hbs` | `contact-actions.js` |
| [`customer`](#customer) | Customers | `customers.hbs` · `contacts.hbs` | `details.hbs` | `customer-actions.js` |
| [`vendor`](#vendor) | Vendors | `index.hbs` | `details.hbs` | `vendor-actions.js` |
| [`integrated-vendor`](#integrated-vendor) | Integrated vendors | `integrated.hbs` | — | — |
| [`issue`](#issue) | Issues | `index.hbs` | `details.hbs` | `issue-actions.js` |
| [`fuel-report`](#fuel-report) | Fuel reports | `index.hbs` | `details.hbs` | `fuel-report-actions.js` |
| [`fuel-transaction`](#fuel-transaction) | Fuel transactions | `index.hbs` | — | — |
| [`device`](#device) | Devices | `index.hbs` | `details.hbs` | `device-actions.js` |
| [`sensor`](#sensor) | Sensors | `index.hbs` | `details.hbs` | `sensor-actions.js` |
| [`device-event`](#device-event) | Device events | `index.hbs` | — | — |
| [`equipment`](#equipment) | Equipment | `index.hbs` | `details.hbs` | `equipment-actions.js` |
| [`part`](#part) | Parts | `index.hbs` | `details.hbs` | `part-actions.js` |
| [`maintenance`](#maintenance) | Maintenance | `index.hbs` | `details.hbs` | `maintenance-actions.js` |
| [`schedule`](#schedule) | Maintenance schedules | `index.hbs` | `details.hbs` | `maintenance-schedule-actions.js` |
| [`work-order`](#work-order) | Work orders | `index.hbs` | `details.hbs` | `work-order-actions.js` |
| [`inspection-form`](#inspection-form) | Inspection forms | `index.hbs` | `details.hbs` | `inspection-form-actions.js` |
| [`inspection-submission`](#inspection-submission) | Inspections | `index.hbs` | `details.hbs` | `inspection-submission-actions.js` |
| [`report`](#report) | Reports | `index.hbs` | `details.hbs` | — |

## Resources

### order — Orders

### service-rate — Service rates

### driver — Drivers

### vehicle — Vehicles

### trailer — Trailers

### fleet — Fleets

### place — Places

### contact — Contacts

### customer — Customers

### vendor — Vendors

### integrated-vendor — Integrated vendors

### issue — Issues

### fuel-report — Fuel reports

### fuel-transaction — Fuel transactions

### device — Devices

### sensor — Sensors

### device-event — Device events

### equipment — Equipment

### part — Parts

### maintenance — Maintenance

### schedule — Maintenance schedules

### work-order — Work orders

### inspection-form — Inspection forms

### inspection-submission — Inspections

### report — Reports

[Overview

Every resource view registry the built-in engines declare — one page per engine, with each resource's registry names, built-in ids and a link to the source that wires it.](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
[Ledger

Every resource view registry Ledger declares — the registry names for each table and details view, where each is wired in the Ledger source, and the built-in ids to place your items against.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/ledger)
