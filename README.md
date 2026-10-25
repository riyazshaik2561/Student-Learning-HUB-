# EdTech Nexus — Portable Full-Stack Education Platform

EdTech Nexus is a full-stack educational web application. This package is designed to run on any compatible Node.js host, a local computer, or Docker-capable server. It does not require Netlify-specific functions, a hosted database account, or an external API to run its core features.

## What is included

- Responsive product site and authenticated workspace
- Student registration, login, and logout
- LearnBridge lessons, quizzes, scores, and progress history
- ClassPulse administrator-only academic records and rule-based alerts
- SkillPath skills, career guidance, and interview practice
- LabSim interactive Ohm's Law, sorting, and restricted SQL-learning tools
- CampusAccess accessibility preferences
- Learning Intelligence Hub recommendations and activity history
- Embedded SQLite database and SQLite-backed sessions
- Optional AI feedback integration; the app has fallback guidance if no AI provider is configured

## Run on any Node.js host

Requirements: Node.js 20 or newer, npm, and a writable persistent directory for application data.

1. Extract this ZIP.
2. Open a terminal in the extracted `edtech-nexus` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file by copying `.env.example`, then set a strong random `SESSION_SECRET` for production.
5. Start the application:

   ```bash
   npm start
   ```

6. Open `http://localhost:3000` (or the port assigned by your hosting provider).

The application serves both the frontend and API from the same origin. It creates the `data/` folder and SQLite files automatically. Keep this folder on persistent storage or user accounts and progress will be lost when an ephemeral server is replaced.

## Run with Docker

Docker is optional. From the project folder:

```bash
docker compose up --build -d
```

Then open `http://localhost:3000`. Docker Compose keeps application data in a named persistent volume. Configure secrets through the host environment or an untracked `.env` file; never commit real secrets.

To stop the service without deleting saved data:

```bash
docker compose down
```

## Production configuration

- `NODE_ENV=production`
- `SESSION_SECRET`: random secret with at least 32 characters
- `PORT`: set by the hosting provider, defaults to `3000`
- `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD`: optional first-run administrator creation; password must be at least 14 characters. Remove these variables after the administrator is created.
- `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`: optional OpenAI-compatible chat API. Core learning features do not require these values. AI provider usage may cost money and involves sending the submitted prompt to that provider.

Self-registration always creates a student account. Administrator privileges must be configured by the operator. Set `SESSION_SECRET` before using the app in production; the server intentionally refuses to start in production without a sufficiently long secret.

## Important hosting limitation

This is a full-stack application, not a static-only website. It requires a Node.js runtime and writable persistent storage for its local SQLite database and session store. It can run on any provider that supports those requirements. A static-only hosting service cannot run the backend merely by uploading the ZIP; use a compatible Node.js service or a container host. No specific hosting provider is required by this codebase.

SQLite is embedded locally and requires no separate database server or account. It is intended for a persistent single application instance. For multi-instance/high-scale deployments, a shared database and session store would require a deliberate migration.

## Commands

```bash
npm start   # start the app
npm run dev # development mode with auto-restart
npm test    # run automated tests
```

## Review before using real student data

Read `SECURITY.md`, `DEPLOYMENT.md`, and `docs/KNOWN-LIMITATIONS.md`. The application is a deployable codebase, not a compliance certification. Conduct security, privacy, backup/restore, and accessibility reviews before institutional use. ClassPulse thresholds are starter rules and not validated predictions; the SQL learning module is intentionally restricted and is not a production SQL console.


## Student-first five learning spaces

The landing page now provides direct entry points to five student spaces: LearnBridge (quiz-evidence-based strengths and focus areas plus a conversational tutor), the Academic Dashboard (student-owned attendance/mark records and a transparent planning estimate), SkillPath (career skills and roadmap), LabSim (programming/sorting, SQL, electrical/Ohm's Law, chemistry/pH, and physics/projectile-motion simulations), and StudyShelf (searchable lessons and study guides). The accessibility settings remain available separately in the workspace.

### AI configuration for launch

Live conversational AI requires an AI-compatible provider. Copy `.env.example` to `.env`, configure `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` using your provider's documented values, and keep the key on the server only. If no provider is configured or the provider fails, the app intentionally labels local fallback guidance; it does not represent that as live AI. Review `SECURITY.md` and `DEPLOYMENT.md`, set a strong `SESSION_SECRET`, use HTTPS, and configure persistent storage before public launch.

### Academic estimate

The student dashboard uses a transparent heuristic: when both types of records exist, 80% average recorded assessment percentage + 20% average attendance percentage; with assessment data only, it uses the assessment average. It is a planning estimate, not a validated prediction model, and should not be presented as a guaranteed exam score.


## Expanded LabSim catalogue

The LabSim catalogue now advertises nine learning labs: Ohm's Law, sorting visualizer, SQL practice, chemistry pH, projectile motion, binary search, digital logic gates, statistics, and matrix multiplication. The original five are implemented simulations; the four additional catalogue entries are a planned extension and must be implemented in `public/app.js` before being represented as fully working labs. Do not present unimplemented entries as production-ready.

## Conversational AI

LearnBridge includes a tutor prompt flow backed by the `/api/ai` service. Configure `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` in the server environment to enable a live OpenAI-compatible chat completion provider. Without provider credentials, the app uses a clearly labeled rules-based fallback. Never commit API keys into the ZIP or frontend.


## WEBSITE
==== Final LIVE WORKING WEBSITE URL ====
https://studtechgoat-dzcggycb.manus.space/
The website link will show complete working process 
