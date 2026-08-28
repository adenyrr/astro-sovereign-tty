# Contributing

Contributions must preserve the workstation/terminal identity, Apache-2.0 terms, keyboard operation, strong contrast, reduced-motion/transparency behavior, and local reading preferences.

## Development

Use Node 22.12.0 and install the locked dependencies:

```sh
npm ci
npm run verify
npm run build:playground
npx playwright test
npm audit --audit-level=high
npm run test:package
npm run test:tarball
git diff --check
```

Add focused unit or browser coverage with every behavior change. Do not weaken accessibility, security, contrast, or performance gates to make a change pass.

## Changes and reviews

- Keep commits focused and use Conventional Commit messages.
- Document public API, token, migration, CSP, and accessibility changes.
- Never commit credentials, generated browser reports, package archives, or registry configuration.
- Use the pull request template and wait for CODEOWNERS review.

Security reports follow [SECURITY.md](SECURITY.md), not the public contribution flow.
