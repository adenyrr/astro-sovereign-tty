# Security policy

## Supported versions

Only the latest stable 2.x release receives security fixes. Consumers should update to the newest patch before reporting an issue.

## Reporting a vulnerability

Do not open a public issue. Use [GitHub private vulnerability reporting](https://github.com/adenyrr/astro-sovereign-tty/security/advisories/new) with:

- the affected version and consumer;
- a minimal reproduction or proof of concept;
- the expected impact;
- any suggested mitigation.

Do not include production credentials, personal data, or live exploit payloads. An acknowledgement is targeted within seven days. Disclosure is coordinated after a fix is available.

## Security boundaries

The package validates configurable links with `safeHref()`, but it is not a general-purpose HTML sanitizer. Consumers remain responsible for content sanitization, response headers, dependency updates, and deployment configuration. See [docs/csp.md](docs/csp.md) for the recommended CSP.
