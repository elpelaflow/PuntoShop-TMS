---
title: "Overview"
url: https://fleetbase.io/docs/platform/getting-started/overview
module: platform
---

# Overview

What Fleetbase is, how it works, and who it's built for — a complete picture of the platform before you dive in.

# Overview

Fleetbase is an open-source
**Logistics and Supply Chain Operating System (LSOS)**
— a modular, API-first platform that gives logistics operators and software developers production-ready infrastructure they can deploy on their own terms, extend without limits, and own completely.

At its core, the platform provides the foundation every transportation logistics business needs: multi-tenant organization management, identity and access control, a real-time event bus, a REST API, and developer tools for managing integrations. On top of that foundation operates the pure TMS suite — Fleet-Ops for transport operations and fleet management, Ledger for financial accounting and invoicing, Valhalla & VROOM for routing and vehicle optimization, and Developers engine for integrations.

## Who Fleetbase Is For

Fleetbase is built for two types of people who are almost always working together:

**Operators**
are logistics businesses — courier companies, on-demand delivery platforms, freight carriers, field service providers, and enterprise supply chains. They need a platform that can be shaped to their exact operations, rather than forcing their operations to fit the software.

**Developers**
are the engineers who build and maintain logistics systems. They need a stable, well-architected API layer, an extensible UI framework, and the ability to add custom logic without fighting the platform.

Both groups get the same thing: full access to the source code, the ability to self-host on any infrastructure, and a platform designed to be extended rather than worked around.

## The Console

The Fleetbase Console is a web-based administration interface built with
**Ember.js**
. It is where operators manage their organisation day-to-day — dispatching orders, managing users, configuring integrations, and installing extensions.

The console is modular by design. Each extension registers its own routes, pages, and sidebar links into the console at runtime using the
**Universe Service**
— Fleetbase's central extensibility registry. When extensions like Fleet-Ops and Ledger load, their fully featured transport management and financial interfaces appear directly in the console. No redeployment required.

The console runs as a single Ember application, with each extension mounted as an
**Ember Engine**
— an isolated sub-application that shares core services (auth, data, notifications) but keeps its own routes and components completely separate.

## Core Modules & Engines

The platform ships with a set of dedicated engines that cover pure TMS operations:

### Fleet-Ops — Fleet Management & Transportation Management System (TMS)

### Ledger — Accounting & Invoicing Engine

### Valhalla & VROOM — Routing Engine & Route Optimization

### Developer Console — API & Integration Tools

## The Extension Marketplace

Beyond the first-party modules, Fleetbase has a community extension marketplace where developers can publish and discover extensions. Extensions can add new order types, integrate third-party services (maps, payments, SMS), add custom reporting, or build entirely new verticals on top of the Fleetbase platform.

You can browse and install extensions directly from within the Fleetbase Console under
**Extensions → Browse**
.

## Deployment Options

Fleetbase can be run anywhere you can run Docker.

Fleetbase Cloud

Self-Hosted

On-Premise

The fastest way to get started. Fleetbase Cloud is a fully managed, multi-tenant deployment maintained by the Fleetbase team. You get:

* Instant access — no infrastructure setup required
* Automatic updates and security patches
* Managed backups and uptime monitoring
* All first-party extensions available

[Start with Cloud Quickstart →](https://fleetbase.io/docs/platform/quickstart/cloud-quickstart)

Deploy Fleetbase on your own cloud account (AWS, GCP, Azure, DigitalOcean) using Docker Compose or Kubernetes. You get full control over:

* Where your data lives
* Which version you run
* What extensions are installed
* Infrastructure scaling decisions

[Deploy in Cloud →](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)

Run Fleetbase on your own hardware — in your data centre or on air-gapped infrastructure. Required services are MySQL, Redis, and S3-compatible object storage. No internet connection required after initial setup.

[Run Locally →](https://fleetbase.io/docs/platform/quickstart/running-locally)

## Next Steps

Understand the why

See how Fleetbase compares to building from scratch or using closed SaaS.

[Why Fleetbase →](https://fleetbase.io/docs/platform/getting-started/why-fleetbase)

Understand the architecture

Explore the technical stack — backend, frontend, real-time, and extensions.

[Architecture →](https://fleetbase.io/docs/platform/getting-started/architecture)

Get running now

Skip the reading and get Fleetbase running in under 10 minutes.

[Cloud Quickstart →](https://fleetbase.io/docs/platform/quickstart/cloud-quickstart)
