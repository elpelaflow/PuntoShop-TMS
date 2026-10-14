---
title: "DateTimeInput"
url: https://fleetbase.io/docs/ui/inputs/date-time-input
module: ui
---

# DateTimeInput

<DateTimeInput> is a combined HTML date + time picker. Renders side-by-side native inputs and emits a JavaScript Date on change.

# <DateTimeInput>

A simple combined date + time input. Renders two side-by-side native HTML inputs (
`<input type="date">`
and
`<input type="time">`
) and emits a
`Date`
instance whenever either changes.

For a calendar-style picker, use
[`<DatePicker>`](https://fleetbase.io/docs/ui/inputs/date-picker)
.

## Basic Usage

```
<DateTimeInput
  @value={{this.scheduled_at}}
  @onUpdate={{this.handleScheduleChange}}
/>
```

```
@action handleScheduleChange(date, formatted) {
  this.scheduled_at = date;          // a JavaScript Date
  // formatted is "yyyy-MM-dd HH:mm"
}
```

## Min / Max

```
<DateTimeInput
  @value={{this.scheduled_at}}
  @minDate="2025-01-01"
  @maxDate="2025-12-31"
  @minTime="06:00"
  @maxTime="22:00"
  @onUpdate={{this.handleScheduleChange}}
/>
```

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `@value` | Date | Initial value as a JavaScript `Date` |
| `@minDate` | string | Minimum date ( `yyyy-MM-dd` ) |
| `@maxDate` | string | Maximum date |
| `@minTime` | string | Minimum time ( `HH:mm` ) |
| `@maxTime` | string | Maximum time |
| `@onUpdate` | `(date, formatted)` | Called with both a `Date` and a `"yyyy-MM-dd HH:mm"` string |

## Source

| File | Description |
| --- | --- |
| `addon/components/date-time-input.hbs` | Template |
| `addon/components/date-time-input.js` | Class |
