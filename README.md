# @adenyrr/astro-sovereign-tty

[![npm version](https://img.shields.io/npm/v/%40adenyrr%2Fastro-sovereign-tty)](https://www.npmjs.com/package/@adenyrr/astro-sovereign-tty)
[![Pipeline](https://github.com/adenyrr/astro-sovereign-tty/actions/workflows/verify.yml/badge.svg?branch=main)](https://github.com/adenyrr/astro-sovereign-tty/actions/workflows/verify.yml)
[![Release v3.0.1](https://img.shields.io/badge/Release-v3.0.1-blue)](https://github.com/adenyrr/astro-sovereign-tty/releases/tag/v3.0.1)
[![Astro](https://img.shields.io/badge/Astro-6%20%7C%207-purple)](https://astro.build)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue)](LICENSE)

Shared terminal-inspired visual chrome for Astro sites.

This package provides reusable headers, footers, light/dark tokens, reading mode, ambient backgrounds, motion accents, and typography for Astro applications. Named themes remain optional presets.

<p align="center">
  <img src="https://raw.githubusercontent.com/adenyrr/astro-sovereign-tty/v3.0.1/preview.svg" alt="Preview of @adenyrr/astro-sovereign-tty: terminal chrome rendered in light and dark themes." width="1000" />
</p>

## Features

- Shared workstation-style header and footer chrome
- Light and dark theme support via CSS variables and `light-dark()`
- Binary reading mode: Inclusive Sans normally, Atkinson Hyperlegible Next on demand
- Ambient background and subtle motion treatment
- Layered design tokens and global styling with no required Tailwind runtime
- Mobile drawer navigation with accessible interaction patterns
- Type-safe configuration via `SiteChromeConfig`

## Requirements

- Node.js `>= 22.12.0`
- Astro `^6.2.0 || ^7.0.0`
- A project using Astro pages or layouts

## Installation

Install the package in your Astro app:

```bash
npm install @adenyrr/astro-sovereign-tty
```

## Dependencies

The only runtime dependency is `@lucide/astro`. Font files are resolved and self-hosted by each consumer through Astro Fonts.

Peer dependency:

- `astro`: `^6.2.0 || ^7.0.0`
- `tailwindcss`: `^4.1.18` (optional, only for `tailwind.css`)

Development dependencies used for validation:

- `@astrojs/check`
- `typescript`

## Usage

Add the font integration once to `astro.config.mjs`. It supplies the Astro Fonts configuration required by `<Fonts />`:

```js
import { defineConfig } from 'astro/config';
import sovereignTty from '@adenyrr/astro-sovereign-tty/integration';

export default defineConfig({ integrations: [sovereignTty()] });
```

Import the global theme stylesheet once in your Astro layout or app root:

```astro
---
import '@adenyrr/astro-sovereign-tty/styles.css';
import Header from '@adenyrr/astro-sovereign-tty/Header.astro';
import Footer from '@adenyrr/astro-sovereign-tty/Footer.astro';
import Fonts from '@adenyrr/astro-sovereign-tty/Fonts.astro';
import ThemeScript from '@adenyrr/astro-sovereign-tty/ThemeScript.astro';
import type { SiteChromeConfig } from '@adenyrr/astro-sovereign-tty';

const config: SiteChromeConfig = {
  locale: 'en', // default; use `fr` or override individual `labels`
  features: {
    readingMode: true,
  },
  appearance: {
    ambientBackground: true,
  },
  header: {
    show: true,
    brandName: 'Example',
    brandHost: '@site',
    homeUrl: '/',
    hideOnScroll: true,
    basePath: '/',
    navigation: [
      { label: 'Blog', route: '/blog', enabled: true },
      { label: 'Projects', route: '/projects', enabled: true },
      { label: 'GitHub', url: 'https://github.com/example', external: true, enabled: true },
    ],
    socialLinks: [
      { label: 'GitHub', icon: 'Github', url: 'https://github.com/example', enabled: true },
    ],
  },
  footer: {
    show: true,
    author: 'Example',
    authorUrl: 'https://example.com',
    signatureCommand: 'whoami',
    note: 'Building systems that feel like a workspace.',
    navigationLabel: 'Navigation',
    connectLabel: 'Connect',
    backToTopLabel: 'Back to top',
    shellPrompt: 'example',
    branch: 'main',
  },
};
---

<html lang="en">
  <head>
    <ThemeScript />
    <Fonts />
    <meta name="color-scheme" content="light dark" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <Header config={config} currentPath={Astro.url.pathname} />
    <main id="main">
      <slot />
    </main>
    <Footer config={config} />
  </body>
</html>
```

### Available exports

The package exposes the following entry points:

- `@adenyrr/astro-sovereign-tty`
- `@adenyrr/astro-sovereign-tty/integration`
- `@adenyrr/astro-sovereign-tty/i18n`
- `@adenyrr/astro-sovereign-tty/navigation`
- `@adenyrr/astro-sovereign-tty/safe-href`
- `@adenyrr/astro-sovereign-tty/csp`
- `@adenyrr/astro-sovereign-tty/package.json`
- `@adenyrr/astro-sovereign-tty/styles.css`
- `@adenyrr/astro-sovereign-tty/global.css` (deprecated alias)
- `@adenyrr/astro-sovereign-tty/tokens.css`
- `@adenyrr/astro-sovereign-tty/base.css`
- `@adenyrr/astro-sovereign-tty/components.css`
- `@adenyrr/astro-sovereign-tty/tailwind.css` (optional)
- `@adenyrr/astro-sovereign-tty/compat.css` (legacy vaul styles)
- `@adenyrr/astro-sovereign-tty/print.css` (opt-in)
- `@adenyrr/astro-sovereign-tty/themes/adenyrr.css`
- `@adenyrr/astro-sovereign-tty/themes/docu.css`
- `@adenyrr/astro-sovereign-tty/themes/train.css`
- `@adenyrr/astro-sovereign-tty/Header.astro`
- `@adenyrr/astro-sovereign-tty/Footer.astro`
- `@adenyrr/astro-sovereign-tty/ThemeToggle.astro`
- `@adenyrr/astro-sovereign-tty/ThemeScript.astro`
- `@adenyrr/astro-sovereign-tty/Fonts.astro`
- `@adenyrr/astro-sovereign-tty/ReadingModeToggle.astro`
- `@adenyrr/astro-sovereign-tty/AmbientBackground.astro`
- `@adenyrr/astro-sovereign-tty/Animations.astro`

## Best practices

- Import the stylesheet once at the app root, not in every page component.
- Import Tailwind, vaul compatibility, and print contracts only where the consumer needs them; see [`docs/tokens.md`](docs/tokens.md).
- Add `sovereignTty()` before rendering `Fonts`; use the manual configuration in [`docs/fonts.md`](docs/fonts.md) only when replacing one of its fonts.
- Keep `currentPath` aligned with the route you are rendering for correct active nav state.
- Use `SiteChromeConfig` instead of ad hoc object literals when building shared layouts.
- Respect `enabled` and feature flags to keep content and navigation context-aware.
- Keep reading content compatible with the 66-character measure and WCAG Text Spacing overrides.
- Prefer semantic markup and accessible labels for navigation and actions.
- Treat configurable links as untrusted input: the chrome applies the exported `safeHref()` guard.
- Keep the package on the supported Astro major versions to avoid mismatched rendering behavior.
- With Astro CSP enabled, use `<ThemeScript csp />`; without CSP, the default `<ThemeScript />` is intentionally silent.
- Follow the tested WCAG contract and consumer responsibilities in [`docs/accessibility.md`](docs/accessibility.md).

### Site themes

Load one static brand contract after `styles.css`; no runtime class or JavaScript is required:

```astro
---
import '@adenyrr/astro-sovereign-tty/styles.css';
import '@adenyrr/astro-sovereign-tty/themes/train.css';
---
```

| @adenyrr/astro-sovereign-tty | Astro      | adenyrr.me           | docu              | training           |
| ---------------------------- | ---------- | -------------------- | ----------------- | ------------------ |
| 3.x                          | 6.2+ / 7.x | `themes/adenyrr.css` | `themes/docu.css` | `themes/train.css` |

### Migrating from 1.x and 2.x

Version 3 adds the font integration and makes CSP hashing explicit. Follow the [v3 migration guide](docs/migration-v2.md).

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/adenyrr/astro-sovereign-tty.git
cd astro-sovereign-tty
npm install
npm run verify
```

The project validates against Astro and TypeScript via:

```bash
npm run verify
```

## Versioning and release

Current release: `v3.0.1`

Stable tags are published as the public scoped npm package `@adenyrr/astro-sovereign-tty`. The release pipeline expects a protected, masked `NPM_TOKEN` permitted to publish this package to `registry.npmjs.org`.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Public API stability

Every entry point listed above, exported TypeScript type, component prop, and token documented in [`docs/tokens.md`](docs/tokens.md) is a SemVer contract. Removing or changing one incompatibly requires a new major version. Named themes are optional presets, not a required identity layer.
