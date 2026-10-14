---
title: "Per Drop-off"
url: https://fleetbase.io/docs/fleet-ops/operations/service-rates/per-drop
module: fleet-ops
---

Service Rates

# Per Drop-off

Price an order by the number of stops on the route. Define min/max ranges and a flat fee for each band — ideal for multi-stop courier and batch deliveries.

# Per Drop-off

**Per Drop-off**
sets the service fee by the
**number of stops**
on the order. You define a tier table — each tier is a range of stop counts with a flat fee — and the tier the order's stop count falls into is charged. (In the API this method is identified as
`per_drop`
.)

Use this for multi-stop courier work, batch deliveries, and any pricing model where each additional stop is what really drives cost. If you want distance-based pricing on top, layer this against an
[Algorithm](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
rate instead.

![Per Drop-off form — min/max ranges and fee table](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-rate-per-drop.6be959f9.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## How it works

1. The order's stop count is the pickup plus every dropoff and intermediate waypoint.
2. The tiers are checked in order. The first tier whose range contains the stop count wins.
3. If the stop count exceeds every tier's maximum, the tier with the highest maximum is used as the fallback.
4. The matched tier's fee is added to the
   **Base Fee**
   to produce the service fee.

> **Service fee = Base Fee + the matched tier's fee**

Tiers don't have to be contiguous and you can define as many as you like. Each tier has a minimum stop count, a maximum stop count, and a fee in the rate's currency.

## API reference

| Field | Required | Description |
| --- | --- | --- |
| `rate_calculation_method` | yes | Set to `per_drop` . |
| `rateFees[]` | yes | The tier table. Each row has a `min` (inclusive lower bound), a `max` (inclusive upper bound), and a `fee` in the rate's currency. |
| `base_fee` | optional | Added to the matched tier's fee. |
| `currency` | yes | Currency for all fees on the rate. |

Add tiers from the
**+ Add Drop-off**
button in the form.

## Worked example

> *"1–3 stops: $10. 4–6 stops: $15. 7+ stops: $20."*

| Tier | Min stops | Max stops | Fee |
| --- | --- | --- | --- |
| 1 | 1 | 3 | $10.00 |
| 2 | 4 | 6 | $15.00 |
| 3 | 7 | 99 | $20.00 |

For an order with:

* **Pickup + 1 dropoff**
  (2 stops) → matches Tier 1 → service fee = Base Fee + $10.
* **Pickup + 4 dropoffs**
  (5 stops) → matches Tier 2 → service fee = Base Fee + $15.
* **Pickup + 9 dropoffs**
  (10 stops) → matches Tier 3 → service fee = Base Fee + $20.

If you submitted a 150-stop order (beyond the largest tier's max of 99), the fee from Tier 3 — the tier with the highest maximum — would still apply as the fallback.

## Configuration workflow

Create or open a service rate in
**Fleet-Ops → Operations → Service Rates**
.

Set
**Rate Calculation Method**
to
**Per Drop-off**
.

Click
**+ Add Drop-off**
to add a tier row. Set the
**Min**
,
**Max**
, and
**Fee**
for that range.

Repeat until you've covered every drop count you want to support. Set the last tier's max high enough to act as a catch-all (e.g. 99 or 999).

*Optional:*
Set a
**Base Fee**
that adds on top of the matched tier's fee.

*Optional:*
Configure
**COD Fees**
and
**Peak Hours**
— these surcharges apply on top of the service fee.

Save and test by generating a quote for a sample multi-stop order. Check the
**Quote**
section on the order detail to see the matched tier.

## Limitations

* **Stop count includes pickup.**
  A "delivery with 3 dropoffs" is
  **4 stops**
  , not 3. Define your tiers accordingly.
* **No distance component.**
  Per Drop-off ignores route distance entirely. If you need both stop-count and distance pricing, use
  [Algorithm](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  with
  `{stops}`
  and
  `{distance_km}`
  in the same formula.
* **Tier order matters.**
  Tiers are evaluated in the order they were created. Don't overlap ranges — the first match wins and overlap will produce unpredictable results.

## Related Pages

* [Service Rates Overview](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — all calculation methods and rate scoping
* [Algorithm Rates](https://fleetbase.io/docs/fleet-ops/operations/service-rates/algorithm-rates)
  — combine stop count with distance, time, or parcel surcharges
* [Service Quotes](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
  — how the calculated rate becomes a quote on an order
