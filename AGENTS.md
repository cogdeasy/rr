# Agent Instructions — RR Group Performance & Transformation Platform

## Project Context
Platform for Rolls-Royce Group performance, divisional delivery and the transformation programme, seeded from the
2026 Half Year Results (30 July 2026).

## Tech Stack
- **Frontend**: Angular 17 (standalone components, SCSS, TypeScript) on `http://localhost:4200`
- **Backend**: ASP.NET Core 8 Web API (C#) on `http://localhost:5062`, Swagger at `http://localhost:5062/swagger`

## Branding
- Primary colour: Navy (#001233)
- Platinum background: (#F5F5F7)
- Silver accents: (#C0C0C0)
- Gold highlights: (#B8860B)
- Gradients use the `gradient-rr` / `gradient-hero` CSS classes
- Logo: ROLLS-ROYCE wordmark in the header component

## Frontend Conventions
- All components are standalone (no NgModules)
- Inline templates and styles in component `.ts` files
- Pages in `src/app/pages/`, layout components in `src/app/pages/layout/`
- Shared models in `src/app/shared/models/models.ts`
- Shared presentational components in `src/app/shared/components/ui.components.ts`
- API service in `src/app/shared/services/api.service.ts`
- Charts are CSS/SVG only — do not add a charting dependency

## Backend Conventions
- Controllers in `Controllers/`, domain models in `Models/`, DTOs in `DTOs/`, services in `Services/`
- Seed data in `Data/` (one seed class per domain, values traceable to the half year results)
- In-memory data store (no database required); services are registered as singletons

## Domain Language
- **LTSA**: Long-Term Service Agreement covering engine maintenance
- **Time on wing**: Cycles an engine stays installed between shop visits — target is >100% improvement by end 2027
- **AOG**: Aircraft on ground, effectively eliminated in H1 2026
- **Shop visit workscope**: Refurbishment, Performance, Major or FullOverhaul
- **Book to bill**: Order intake divided by revenue
- **BESS**: Battery Energy Storage System
- **SMR / AMR**: Small Modular Reactor / Advanced Modular Reactor

## Reporting Data
Figures must stay consistent with the 2026 Half Year Results. When adding data, cite the reported number rather
than inventing a plausible one; analytics models are explicitly illustrative.
