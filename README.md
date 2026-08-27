# @adenyrr/astro-sovereign-tty

[![npm version](https://img.shields.io/npm/v/%40adenyrr%2Fastro-sovereign-tty)](https://www.npmjs.com/package/@adenyrr/astro-sovereign-tty)
[![Pipeline](https://github.com/adenyrr/astro-sovereign-tty/actions/workflows/verify.yml/badge.svg?branch=main)](https://github.com/adenyrr/astro-sovereign-tty/actions/workflows/verify.yml)
[![Release v2.0.3](https://img.shields.io/badge/Release-v2.0.3-blue)](https://github.com/adenyrr/astro-sovereign-tty/releases/tag/v2.0.3)
[![Astro](https://img.shields.io/badge/Astro-6%20%7C%207-purple)](https://astro.build)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey)](LICENSE)

Shared visual chrome for Astro sites built around the adenyrr workstation shell.

This package provides a reusable global layout for website headers, footers, light/dark theme tokens, reading mode, ambient background, motion accents, and a coherent typography system. It is designed to be consumed by Astro applications that want a consistent brand layer without duplicating the same UI scaffolding across multiple sites.

<p align="center">
  <img src="https://raw.githubusercontent.com/adenyrr/astro-sovereign-tty/v2.0.3/preview.svg" alt="Apercu de @adenyrr/astro-sovereign-tty : le meme chrome workstation rendu en theme clair a gauche et en theme sombre a droite." width="1000" />
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
  locale: 'fr', // default; use `en` or override individual `labels`
  features: {
    readingMode: true,
  },
  appearance: {
    ambientBackground: true,
  },
  header: {
    show: true,
    brandName: 'adenyrr',
    brandHost: '@home',
    homeUrl: '/',
    hideOnScroll: 'mobile',
    basePath: '/',
    navigation: [
      { label: 'Blog', route: '/blog', enabled: true },
      { label: 'Projects', route: '/projects', enabled: true },
      { label: 'GitHub', url: 'https://github.com/adenyrr', external: true, enabled: true },
    ],
    socialLinks: [
      { label: 'GitHub', icon: 'github', url: 'https://github.com/adenyrr', enabled: true },
    ],
  },
  footer: {
    show: true,
    author: 'adenyrr',
    authorUrl: 'https://adenyrr.me',
    signatureCommand: 'whoami',
    note: 'Building systems that feel like a workspace.',
    navigationLabel: 'Navigation',
    connectLabel: 'Connect',
    backToTopLabel: 'Retour en haut',
    shellPrompt: 'adenyrr',
    branch: 'main',
  },
};
---

<html lang="fr">
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
- `@adenyrr/astro-sovereign-tty/i18n`
- `@adenyrr/astro-sovereign-tty/navigation`
- `@adenyrr/astro-sovereign-tty/safe-href`
- `@adenyrr/astro-sovereign-tty/styles.css`
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
- Configure Astro Fonts exactly as documented in [`docs/fonts.md`](docs/fonts.md), then place `Fonts` in `<head>` after `ThemeScript`.
- Keep `currentPath` aligned with the route you are rendering for correct active nav state.
- Use `SiteChromeConfig` instead of ad hoc object literals when building shared layouts.
- Respect `enabled` and feature flags to keep content and navigation context-aware.
- Keep reading content compatible with the 66-character measure and WCAG Text Spacing overrides.
- Prefer semantic markup and accessible labels for navigation and actions.
- Treat configurable links as untrusted input: the chrome applies the exported `safeHref()` guard.
- Keep the package on the supported Astro major versions to avoid mismatched rendering behavior.
- Enable Astro's native CSP using the autonomous baseline in [`docs/csp.md`](docs/csp.md).
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
| 2.x                          | 6.2+ / 7.x | `themes/adenyrr.css` | `themes/docu.css` | `themes/train.css` |

### Migrating from 1.x

Version 2 requires `ThemeScript`, explicit Astro Fonts configuration, and an intentional choice of optional CSS bridges. Follow the ordered [1.x to 2.0 migration guide](docs/migration-v2.md).

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

Current release: `v2.0.3`

Stable tags are published as the public scoped npm package `@adenyrr/astro-sovereign-tty`. The release pipeline expects a protected, masked `NPM_TOKEN` permitted to publish this package to `registry.npmjs.org`.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license. See [LICENSE](LICENSE) for the full text.

You may reuse, share, and adapt this work for non-commercial purposes only, provided you give appropriate credit to adenyrr and indicate any changes.
