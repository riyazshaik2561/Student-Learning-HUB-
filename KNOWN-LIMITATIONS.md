# Known limitations — be transparent before launch

1. **Email verification and password reset:** UI/API flows are not included; configure an email service and recovery workflow before broad public signup.
2. **Teacher scope:** teacher roles exist, but institution/course/student assignments are not implemented. ClassPulse is intentionally administrator-only to avoid over-broad access.
3. **Academic thresholds:** starter deterministic rules (assessment below 50%, attendance below 75%) are illustrative and must be configured and reviewed by the institution before real use.
4. **Predictive ML:** no predictive machine-learning model exists; the app does not claim predictive accuracy.
5. **AI:** optional OpenAI-compatible Chat Completions integration; without configuration, local fallback text is returned and labeled. Human review is required for educationally consequential feedback.
6. **SQL lab:** supports a limited SELECT-oriented teaching subset over fixed sample data. It is not a full SQL database or general parser. SQL writes are not executed.
7. **Career catalogue:** role competency frameworks are illustrative, not verified live labor-market data. A tracked skill is not a certification or hiring probability.
8. **Accessibility:** common keyboard support, text scaling, contrast, theme, and reduced motion are implemented. A WCAG 2.2 AA audit with manual assistive-technology testing has not been certified.
9. **Database:** SQLite supports a single persistent instance. Multi-instance production requires a database/session-store migration.
10. **Operational controls:** no built-in billing, file uploads, MFA, email delivery, data-retention scheduler, or external error-monitoring provider is configured.
11. **Testing:** the included automated tests cover selected domain rules. They are not a substitute for end-to-end, load, security, and authorization testing in the deployment environment.
12. **Privacy/legal:** the operator must add applicable privacy notices, consent/legal basis, retention and deletion processes, institutional policies, and incident response before real student records are imported.
