# @adenyrr/astro-ui

[![Release v1.2.0](https://img.shields.io/badge/Release-v1.2.0-blue)](https://forge.massivedynamics.be/aboutme/astro-ui/-/releases/v1.2.0)
[![Astro](https://img.shields.io/badge/Astro-6%20%7C%207-purple)](https://astro.build)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey)](LICENSE)

Shared visual chrome for Astro sites built around the adenyrr workstation shell.

This package provides a reusable global layout for website headers, footers, light/dark theme tokens, reading mode, ambient background, motion accents, and a coherent typography system. It is designed to be consumed by Astro applications that want a consistent brand layer without duplicating the same UI scaffolding across multiple sites.

<p align="center">
  <img src="./preview.svg" alt="Apercu de @adenyrr/astro-ui : le meme chrome workstation rendu en theme clair a gauche et en theme sombre a droite." width="1000" />
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
- Astro `^6.0.0 || ^7.0.0`
- A project using Astro pages or layouts

## Installation

Install the package in your Astro app:

```bash
npm install @adenyrr/astro-ui
```

If your environment resolves packages via GitLab package registry, configure it first:

```bash
npm config set @adenyrr:registry https://gitlab.com/api/v4/packages/npm/
npm install @adenyrr/astro-ui
```

## Dependencies

This package declares the following runtime dependencies:

- `@fontsource-variable/inter`
- `@fontsource-variable/inclusive-sans`
- `@fontsource-variable/jetbrains-mono`
- `@lucide/astro`

Peer dependency:

- `astro`: `^6.0.0 || ^7.0.0`
- `tailwindcss`: `^4.1.18` (optional, only for `tailwind.css`)

Development dependencies used for validation:

- `@astrojs/check`
- `typescript`

## Usage

Import the global theme stylesheet once in your Astro layout or app root:

```astro
---
import '@adenyrr/astro-ui/styles.css';
import Header from '@adenyrr/astro-ui/Header.astro';
import Footer from '@adenyrr/astro-ui/Footer.astro';
import ThemeScript from '@adenyrr/astro-ui/ThemeScript.astro';
import type { SiteChromeConfig } from '@adenyrr/astro-ui';

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

- `@adenyrr/astro-ui`
- `@adenyrr/astro-ui/i18n`
- `@adenyrr/astro-ui/navigation`
- `@adenyrr/astro-ui/safe-href`
- `@adenyrr/astro-ui/styles.css`
- `@adenyrr/astro-ui/tokens.css`
- `@adenyrr/astro-ui/base.css`
- `@adenyrr/astro-ui/components.css`
- `@adenyrr/astro-ui/tailwind.css` (optional)
- `@adenyrr/astro-ui/compat.css` (legacy vaul styles)
- `@adenyrr/astro-ui/print.css` (opt-in)
- `@adenyrr/astro-ui/themes/adenyrr.css`
- `@adenyrr/astro-ui/themes/docu.css`
- `@adenyrr/astro-ui/themes/train.css`
- `@adenyrr/astro-ui/Header.astro`
- `@adenyrr/astro-ui/Footer.astro`
- `@adenyrr/astro-ui/ThemeToggle.astro`
- `@adenyrr/astro-ui/ThemeScript.astro`
- `@adenyrr/astro-ui/ReadingModeToggle.astro`
- `@adenyrr/astro-ui/AmbientBackground.astro`
- `@adenyrr/astro-ui/Animations.astro`

## Best practices

- Import the stylesheet once at the app root, not in every page component.
- Import Tailwind, vaul compatibility, and print contracts only where the consumer needs them; see [`docs/tokens.md`](docs/tokens.md).
- Keep `currentPath` aligned with the route you are rendering for correct active nav state.
- Use `SiteChromeConfig` instead of ad hoc object literals when building shared layouts.
- Respect `enabled` and feature flags to keep content and navigation context-aware.
- Keep reading content compatible with the 66-character measure and WCAG Text Spacing overrides.
- Prefer semantic markup and accessible labels for navigation and actions.
- Treat configurable links as untrusted input: the chrome applies the exported `safeHref()` guard.
- Keep the package on the supported Astro major versions to avoid mismatched rendering behavior.
- Enable Astro's native CSP using the autonomous baseline in [`docs/csp.md`](docs/csp.md).

### Site themes

Load one static brand contract after `styles.css`; no runtime class or JavaScript is required:

```astro
---
import '@adenyrr/astro-ui/styles.css';
import '@adenyrr/astro-ui/themes/train.css';
---
```

| astro-ui | Astro      | adenyrr.me           | docu              | training           |
| -------- | ---------- | -------------------- | ----------------- | ------------------ |
| 2.x      | 6.2+ / 7.x | `themes/adenyrr.css` | `themes/docu.css` | `themes/train.css` |

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/adenyrr/astro-sovereign-tty
cd astro-ui
npm install
npm run build
```

The project validates against Astro and TypeScript via:

```bash
npm run build
```

## Versioning and release

Current release: `v1.2.0`

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license. See [LICENSE](LICENSE) for the full text.

You may reuse, share, and adapt this work for non-commercial purposes only, provided you give appropriate credit to adenyrr and indicate any changes.
