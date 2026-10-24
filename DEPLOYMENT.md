# Provider-neutral deployment guide

EdTech Nexus has no hosting-provider-specific deployment configuration. Run it anywhere that supports Node.js 20+ and persistent writable storage, or use Docker.

## Direct Node.js deployment

```bash
npm install
npm test
NODE_ENV=production npm start
```

Configure `PORT` and `SESSION_SECRET` through the hosting provider's environment settings. The secret must be random and at least 32 characters. Set `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` only when you need the first administrator; use a unique password of at least 14 characters, then remove both variables after the account is created.

## Docker deployment

The included `Dockerfile` and `docker-compose.yml` build the app and persist `/app/data` in a named volume. Configure production environment variables securely. Do not bake secrets into the image.

## Persistent storage

The app creates `data/nexus.sqlite` and `data/sessions.sqlite`. The runtime must be able to write to `data/`, and that directory must persist across restarts and deployments. An ephemeral filesystem can lose accounts, learning progress, and sessions. Back up the SQLite databases consistently and test restoration. Keep the deployment to a single application instance unless you deliberately migrate to a shared database/session architecture.

## HTTPS and reverse proxies

Terminate TLS at the hosting provider or trusted reverse proxy. The application enables secure session cookies in production and trusts one proxy hop. Confirm the provider's topology before changing proxy settings. Do not trust arbitrary client-supplied forwarded headers.

## Optional AI integration

Set `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` only if you have an approved OpenAI-compatible provider. These are optional; fallback educational guidance is available without a provider. Never expose AI credentials in frontend code or commit them to source control. Review provider privacy terms and costs before sending user-entered content.

## Pre-launch checklist

- [ ] Node.js 20+ runtime and persistent storage configured
- [ ] `SESSION_SECRET` set to a random value of 32+ characters
- [ ] First administrator account created securely, bootstrap variables removed
- [ ] HTTPS and secure cookies verified
- [ ] `npm test` passes on the target environment
- [ ] Registration, login, logout, quizzes, and saved progress tested after restart
- [ ] Backup and restore tested
- [ ] Privacy, access-control, and accessibility reviews completed

A static-only hosting service cannot execute this application's backend. Use a Node.js or container-capable host; no particular vendor is required.
