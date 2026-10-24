# Architecture

## Shape

A single deployable Node.js/Express application serves the static frontend and versionless `/api` routes. Domain boundaries are expressed as route groups and tables; the application is a modular monolith rather than six independently deployed services.

- `public/`: responsive product site and authenticated SPA, accessible HTML semantics, CSS design system, client-side interaction.
- `src/server.js`: HTTP entry point, session/auth middleware, route validation, role enforcement, event recording, deterministic recommendation rules, AI route, health check.
- `src/db.js`: SQLite schema, relational constraints, indexes, foreign keys.
- `src/ai.js`: optional OpenAI-compatible integration and explicit local fallback.
- `data/`: runtime database/session files; excluded from source control.
- `tests/`: deterministic tests for key domain rules.

## Data ownership

- Identity and role: `users`.
- Student goals and preferences: `profiles`.
- Assessment attempts: `quiz_attempts`; scores are calculated server-side using a lesson answer key.
- Practical activity: `lab_attempts`; only structured, bounded result summaries are accepted.
- Academic records/alerts: `academic_records`, `alerts`; writes are administrator-only until course/institution scoping is implemented.
- Career evidence: `skills`; provenance is recorded as self-reported or activity-supported.
- Hub: `events`, `recommendations`; recommendations are deduplicated for active statuses and maintain a lifecycle.

## Trust boundaries

Browser input is untrusted. The server resolves the current user from a session, hashes passwords with bcrypt, assigns `student` on public registration, enforces route roles, validates numeric ranges and request sizes, and uses parameterized SQL statements. Model output is displayed as text; it is not executed as code or SQL. The SQL lab runs a constrained client-side parser over a fixed in-memory dataset, not the production database.

## Session and persistence

Sessions use a SQLite-backed session store. In production, `SESSION_SECRET` is required and secure cookies are enabled. The host must provide persistent disk for both SQLite files. For a multi-instance deployment or large institution, move to PostgreSQL and a shared session store and re-test concurrency, backups, migrations, and authorization.

## AI provider contract

`askAI({system, prompt})` returns `{ mode, text }`. When configured, it calls an OpenAI-compatible Chat Completions endpoint with timeout and output limit. Failures fall back to deterministic educational guidance and are labeled `rules-based-fallback`. No custom-trained ML model is included.
