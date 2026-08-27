# Migrating from 1.x to 2.0

Version 2 keeps the workstation chrome and the `styles.css` compatibility entry, but makes font delivery and early preference restoration explicit.

The public package is now named `@adenyrr/astro-sovereign-tty`. Replace imports from the former `@adenyrr/astro-ui` package while following the steps below.

## 1. Upgrade Astro and the package

Use Node 22.12 or later and Astro `^6.2.0 || ^7.0.0`, then install version 2:

```sh
npm install astro@^7.0.0 @adenyrr/astro-sovereign-tty@^2.0.0
```

Astro 6 consumers can retain their supported major by installing `astro@^6.2.0` instead.

## 2. Configure and render the fonts

Remove `@fontsource-variable/inclusive-sans`, `@fontsource-variable/inter`, and `@fontsource-variable/jetbrains-mono` from the consumer. Copy the exact Astro Fonts configuration from [fonts.md](fonts.md).

Render both head components before application styles:

```astro
---
import Fonts from '@adenyrr/astro-sovereign-tty/Fonts.astro';
import ThemeScript from '@adenyrr/astro-sovereign-tty/ThemeScript.astro';
---

<head>
  <ThemeScript />
  <Fonts />
  <meta name="color-scheme" content="light dark" />
</head>
```

`ThemeToggle` and `ReadingModeToggle` no longer perform first-paint initialization. `ThemeScript` is therefore required even when neither toggle is rendered.

## 3. Select styles and a site theme

Keep the autonomous default entry and load one static brand contract after it:

```astro
---
import '@adenyrr/astro-sovereign-tty/styles.css';
import '@adenyrr/astro-sovereign-tty/themes/adenyrr.css';
---
```

The default barrel no longer imports Tailwind, shadcn utilities, vaul compatibility, or print rules. Add only what the consumer uses:

```astro
---
import '@adenyrr/astro-sovereign-tty/tailwind.css'; // optional Tailwind peer required
import '@adenyrr/astro-sovereign-tty/compat.css'; // legacy vaul contract
import '@adenyrr/astro-sovereign-tty/print.css'; // explicit print behavior
---
```

Review [the Token API](tokens.md) before moving consumer overrides. Exported custom-property names are a SemVer contract.

## 4. Review the chrome configuration

The new keys are optional and preserve French defaults:

```ts
const config = {
  locale: 'fr',
  labels: { backToTop: 'Retour en haut' },
  header: {
    basePath: '/',
    hideOnScroll: 'mobile',
  },
};
```

- `locale` accepts `fr` or `en`; individual `labels` override the selected dictionary.
- `hideOnScroll` defaults to `mobile`, accepts `true` for every viewport, and `false` to disable hiding.
- `basePath` is normalized and removed from `currentPath` before active-route comparison.
- Configurable links now pass through `safeHref()`. Invalid or protocol-relative values are intentionally disabled; do not rely on `javascript:`, `data:`, control characters, `//host`, or backslash variants.

## 5. Enable CSP and validate

Copy the native Astro CSP baseline from [csp.md](csp.md), then build and exercise every route. At minimum run:

```sh
npm run verify
npm run build:playground
npm run test:a11y
npm audit --audit-level=high
npm run test:package
```

Consumer code remains responsible for its own content sanitization, external origins, response headers, and accessible page content.
