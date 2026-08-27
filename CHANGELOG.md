# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-08-26

### Added

- Added `ThemeScript.astro` for pre-paint theme and reading preference restoration, including ClientRouter swaps.
- Added `Fonts.astro` and an Astro Fonts contract for Inclusive Sans, JetBrains Mono, and lazy Atkinson Hyperlegible Next delivery.
- Added French and English chrome dictionaries, partial label overrides, icon types, `safeHref()`, and navigation helpers as public exports.
- Added accessible hide-on-scroll header behavior with `true`, `false`, and `mobile` modes and measured outer height.
- Added static `adenyrr`, `docu`, and `train` brand themes plus an opt-in print stylesheet.
- Added CSP, accessibility, security, maintenance, token, font, and 1.x migration documentation.
- Added an eight-route playground and automated format, lint, type, unit, contrast, axe, packaging, security, and performance gates.

### Changed

- **Breaking:** renamed the public package from `@adenyrr/astro-ui` to the public scoped `@adenyrr/astro-sovereign-tty` package and moved its canonical metadata to GitHub.
- **Breaking:** require Astro `^6.2.0 || ^7.0.0`; consumers must configure native Astro Fonts and render `ThemeScript` and `Fonts` in `<head>`.
- Split the default CSS into `astro-ui.tokens`, `astro-ui.base`, and `astro-ui.components` layers; Tailwind, vaul compatibility, and print rules are now opt-in exports.
- Reduced the unminified default CSS source from 42,369 bytes to 35,334 bytes (−16.6%) by removing optional Tailwind and vaul rules from `styles.css`.
- Replaced bundled Fontsource packages with Astro Fonts: Inclusive Sans and JetBrains Mono are preloaded, while Atkinson Hyperlegible Next is fetched only on reading-mode intent.
- Raised the Astro peer requirement to `^6.2.0 || ^7.0.0` and made Lighthouse performance budgets release-blocking.
- Made `tailwindcss` an optional peer and kept `styles.css` autonomous from Tailwind and Fontsource.
- Completed reading mode with a 66ch measure, non-negative kerning, paragraph spacing, and Text Spacing safeguards.
- Treat exported token names as a public SemVer API.

### Fixed

- Restored card shadows by defining the missing `--glint-under` token.
- Applied theme and reading preferences before ClientRouter paints the swapped page.
- Initialized statistic counters on pages that do not use ClientRouter.
- Aligned package metadata with the CC BY-NC 4.0 license and canonical GitHub repository.
- Hardened the mobile drawer with `inert`, initial and trapped focus, Escape handling, focus restoration, and swap cleanup.
- Rejected unsafe configurable links, corrected segment-aware active navigation and `basePath` handling, and added a safe unknown-icon fallback.
- Preserved visible states in forced-colors, reduced-motion, reduced-transparency, Text Spacing, and print contexts.
- Invoked OSV-Scanner through the absolute binary path provided by its pinned container image.

### Security

- Added native Astro CSP guidance and playground enforcement without `unsafe-inline`.
- Added stable-tag-only publication gates, pinned security scanners, SBOM generation, package-content checks, and scheduled-only Renovate execution.
- Standardized GitLab configuration on `.yml`, verified Node jobs in `node:22.12.0-alpine`, and checksum-pinned Node 22.12.0 inside the Playwright image.

## [1.2.0] - 2026-08-22

### Fixed

- Made the mobile navigation drawer opaque and readable in both themes.
- Added backdrop and Escape-key closing while keeping focus and ARIA labels in sync.

## [1.1.0] - 2026-08-22

### Changed

- Updated the light theme palette to the new warm ink/brand tokens.
- Improved the mobile header menu so it behaves like a constrained drawer on phones.

### Added

- Release tag and package version for v1.1.0.

### Fixed

- Mobile navigation is now usable on narrow screens.

## [1.0.0] - 2026-08-22

### Added

- Initial release of the shared Astro component library
- TypeScript types for site configuration and navigation items
- Shared Astro workstation interface components:
  - Header component with site navigation
  - Footer component with branding
  - Theme toggle (light/dark mode)
  - Reading mode toggle
  - Ambient background effects
  - Animation components
  - Global styles with Tailwind CSS support
- Export of reusable components and styles for Astro projects
- Support for Astro 6.x and 7.x
- Public npm package publication

[1.0.0]: https://github.com/adenyrr/astro-sovereign-tty/releases/tag/v1.0.0
[1.1.0]: https://github.com/adenyrr/astro-sovereign-tty/releases/tag/v1.1.0
[1.2.0]: https://github.com/adenyrr/astro-sovereign-tty/releases/tag/v1.2.0
[2.0.0]: https://github.com/adenyrr/astro-sovereign-tty/releases/tag/v2.0.0
