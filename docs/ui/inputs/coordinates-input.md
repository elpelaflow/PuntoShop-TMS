---
title: "CoordinatesInput"
url: https://fleetbase.io/docs/ui/inputs/coordinates-input
module: ui
---

# CoordinatesInput

<CoordinatesInput> renders side-by-side lat/lng fields with a map-picker dropdown that supports drag-to-place and address geocoding.

# <CoordinatesInput>

Lets a user enter or pick a geographic coordinate. Renders two text inputs (latitude and longitude) plus a "Select from map" dropdown that opens a Leaflet map with a draggable marker and an address-lookup field.

For binding directly to an Ember Data record, see the sibling
`<ModelCoordinatesInput>`
(same component, but updates
`record.location`
automatically).

## Basic Usage

```
<CoordinatesInput
  @latitude={{this.driver.lat}}
  @longitude={{this.driver.lng}}
  @onUpdate={{this.handleCoordsChange}}
/>
```

```
@action handleCoordsChange(lat, lng) {
  this.driver.lat = lat;
  this.driver.lng = lng;
}
```

## With Address Lookup

The map picker includes an address search field — type an address, click
**Lookup**
, and the marker jumps to the geocoded location.

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `@latitude` | number | Latitude in decimal degrees |
| `@longitude` | number | Longitude in decimal degrees |
| `@onUpdate` | `(lat, lng)` | Called when either coordinate changes |
| `@disabled` | boolean | Disable input and dropdown |
| `@renderInPlace` | boolean | Render the dropdown in DOM order (default: `true` ) |
| `@triggerClass` | string | Extra classes on the "Select from map" trigger |
| `@mapContainerClass` | string | Extra classes on the map container |
| `@leafletMapClass` | string | Extra classes on the Leaflet map |
| `@zoomControlClass` / `@zoomControlContainerClass` | string | Extra classes on the zoom buttons |

## Real-World Examples

```
<InputGroup @name="Pickup location">
  <CoordinatesInput
    @latitude={{this.location.lat}}
    @longitude={{this.location.lng}}
    @onUpdate={{this.handleCoordsChange}}
  />
</InputGroup>
```

## See Also

* `<ModelCoordinatesInput>`
  — same component, but bound to a Fleetbase model's
  `location`
  polygon

## Source

| File | Description |
| --- | --- |
| `addon/components/coordinates-input.hbs` | Template |
| `addon/components/coordinates-input.js` | Class — uses Leaflet via the `leaflet` service |
| `addon/components/model-coordinates-input.hbs` | Sibling — bound to a Fleetbase model's `location` |
| `addon/components/model-coordinates-input.js` |  |
