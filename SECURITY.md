# Security Policy

This project is a static, client-side-only website (HTML, CSS, and vanilla
JavaScript) with no server, database, authentication, user accounts, or data
collection. It has no backend attack surface — there are no API endpoints,
no cookies of consequence, and no user-submitted content processed at runtime.

That said, client-side issues (e.g. an XSS vector introduced by unsafely
inserting untrusted content into the DOM, a dependency confusion issue, or
a supply-chain concern in a linked third-party asset) are still worth
reporting.

## Reporting a Vulnerability

If you believe you've found a security issue in this repository:

1. **Do not** open a public GitHub issue for it.
2. Report it privately via **GitHub's "Report a vulnerability" feature**
   (repository **Security** tab → **Report a vulnerability**), if enabled for
   this repository.
3. If that option isn't available, contact the maintainer directly through
   the contact method listed on their GitHub profile, with a clear
   description of the issue and steps to reproduce it.

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce it (a minimal example is ideal)
- The browser/environment you tested in

## Response

This is a small, volunteer-maintained open-source project. We'll do our best
to acknowledge reports within a few days and to publish a fix promptly once a
report is confirmed. Since the site has no user data or backend, most
confirmed issues can be resolved with a straightforward code fix and a new
deployment, without any additional disclosure obligations to end users.

## Scope

In scope: the code in this repository (`index.html`, `styles.css`, `app.js`,
`i18n.js`, and files under `assets/`).

Out of scope: the GitHub Pages hosting platform itself, and third-party
services this page merely links to or loads fonts from (e.g. Google Fonts) —
please report those directly to their respective maintainers.
