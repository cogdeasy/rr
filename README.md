# Rolls-Royce Group Performance & Transformation Platform

Operational platform for tracking Group performance, divisional delivery and the transformation programme
described in the Rolls-Royce Holdings plc 2026 Half Year Results (30 July 2026).

## Overview

The platform turns the half year priorities into working operational views rather than a static results summary:

1. **Group performance** — H1 2026 headline metrics, divisional results and the trading cash flow bridge
2. **Guidance & capital** — upgraded FY26 guidance, capital position, credit ratings and shareholder returns
3. **Civil Aerospace** — fleet, engine flying hours, order book and the time on wing durability programme
4. **MRO operations** — shop visit workflow across the Rolls-Royce and partner network (induct, advance, release)
5. **Defence** — programme portfolio, backlog, order cover and autonomy programmes
6. **Power Systems** — order pipeline from qualification to delivery, data centre power generation and BESS
7. **SMR & AMR** — European SMR tender pipeline and advanced modular reactor programmes
8. **Transformation** — four strategic pillars, initiatives with progress trails, and principal risks
9. **AiRR analytics** — workscope prediction, engine prognostics and FY26 guidance scenario modelling

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                Angular 17 single page app                 │
│  Group · Guidance · Civil Aerospace · MRO · Defence ·     │
│  Power Systems · Nuclear · Transformation · Analytics     │
├──────────────────────────────────────────────────────────┤
│              ASP.NET Core 8 Web API (REST)                │
│  Group · CivilAerospace · Defence · PowerSystems ·        │
│  Nuclear · Transformation · Analytics controllers         │
├──────────────────────────────────────────────────────────┤
│   In-memory domain services seeded from the H1 2026       │
│   half year results (no database required)                │
└──────────────────────────────────────────────────────────┘
```

## Tech Stack

- **Frontend**: Angular 17 (standalone components, inline templates, SCSS)
- **Backend**: ASP.NET Core 8 Web API (C#), in-memory data store
- **Design**: Rolls-Royce navy (#001233), platinum (#F5F5F7), silver (#C0C0C0) and gold (#B8860B)

## Getting Started

### Backend (.NET 8)

```bash
cd backend
dotnet restore
dotnet run
# API at http://localhost:5062
# Swagger at http://localhost:5062/swagger
```

### Frontend (Angular 17)

```bash
cd frontend
npm install
npm start
# App at http://localhost:4200
```

The frontend calls the API at `http://localhost:5062/api`, so start the backend first.

## API

| Area | Endpoints |
| --- | --- |
| Group | `GET /api/group/summary`, `/divisions`, `/divisions/{key}`, `/guidance`, `/capital` |
| Civil Aerospace | `GET /api/civil-aerospace/metrics`, `/programmes`, `/time-on-wing`, `/sites`, `/network-performance`, `/shop-visits` |
| Civil Aerospace (workflow) | `POST /api/civil-aerospace/shop-visits`, `PUT /shop-visits/{id}/status`, `DELETE /shop-visits/{id}` |
| Defence | `GET /api/defence/metrics`, `/programmes`, `/sector-breakdown` |
| Power Systems | `GET /api/power-systems/metrics`, `/orders`, `/bess-projects`, `/pipeline-summary`; `POST /orders`; `PUT /orders/{id}/advance` |
| Nuclear | `GET /api/nuclear/tenders`, `/programmes`, `/summary` |
| Transformation | `GET /api/transformation/pillars`, `/initiatives`, `/progress-summary`, `/risks`; `PUT /initiatives/{id}` |
| Analytics | `POST /api/analytics/workscope-prediction`, `/prognostics`, `/scenario` |

## Data

All figures are seeded from the 2026 Half Year Results: £11,279m underlying revenue, £2,534m underlying operating
profit (22.5% margin), £1,964m free cash flow, £2,136m net cash, and upgraded FY26 guidance of £4.7bn–£4.9bn
underlying operating profit and £3.8bn–£4.0bn free cash flow. The analytics models are illustrative and
deterministic; they are planning aids, not certified engineering or financial models.
