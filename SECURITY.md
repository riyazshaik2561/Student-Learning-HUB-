# Security notes and launch checklist

## Implemented controls

- bcrypt password hashing (cost 12)
- server-assigned student role on public registration
- server-side session authentication and role middleware
- SQLite-backed sessions, HttpOnly/SameSite cookies, Secure cookies in production
- production startup fails when `SESSION_SECRET` is absent or too short
- auth endpoint rate limit
- Helmet security headers and a restrictive script policy
- JSON body size cap and route-level field/range validation
- parameterized SQL statements and relational constraints
- admin-only role changes, academic records, alert management, and exports
- optional AI keys read only from server environment
- restricted SQL teaching parser does not execute arbitrary SQL or touch production DB

## Important caveats

- This is not a third-party security audit or penetration-test report.
- Review CSRF exposure and session strategy against your exact hosting/proxy setup before a high-risk production launch.
- Teacher-to-course/student assignment scope is not yet implemented; ClassPulse stays administrator-only.
- Account verification, password reset, email delivery, MFA, account lockout policy, and self-service account deletion are not included.
- Add automated authorization tests for all protected routes and cross-user resource access before institutional use.
- SQLite is suitable for small single-instance deployments; multi-instance deployments need shared database/session infrastructure.
- Do not log sensitive prompts, passwords, session IDs, or student data in infrastructure logs.
- Configure HTTPS, host-level firewalling, secret management, database backups, retention and deletion workflows, incident response, dependency scanning, and monitoring.

## Production operator checklist

- [ ] Strong `SESSION_SECRET` configured through secret manager.
- [ ] `NODE_ENV=production`, HTTPS, correct trusted proxy configuration.
- [ ] Bootstrap admin created with strong unique password; bootstrap variables removed after use.
- [ ] Persistent storage and tested backup/restore.
- [ ] Dependency audit and security review completed.
- [ ] Privacy notice and institutional data-use/legal basis reviewed.
- [ ] AI provider terms and student-data transfer reviewed if enabled.
- [ ] Teacher/institution scope added before granting teachers access to records.
- [ ] Accessibility and end-to-end workflows manually reviewed.
