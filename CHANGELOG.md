# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Split the default CSS into `astro-ui.tokens`, `astro-ui.base`, and `astro-ui.components` layers; Tailwind, vaul compatibility, and print rules are now opt-in exports.
- Reduced the unminified default CSS source from 42,369 bytes to 35,334 bytes (−16.6%) by removing optional Tailwind and vaul rules from `styles.css`.
- Replaced bundled Fontsource packages with Astro Fonts: Inclusive Sans and JetBrains Mono are preloaded, while Atkinson Hyperlegible Next is fetched only on reading-mode intent.
- Raised the Astro peer requirement to `^6.2.0 || ^7.0.0` and made Lighthouse performance budgets release-blocking.

### Fixed

- Restored card shadows by defining the missing `--glint-under` token.
- Applied theme and reading preferences before ClientRouter paints the swapped page.
- Initialized statistic counters on pages that do not use ClientRouter.
- Aligned package metadata with the CC BY-NC 4.0 license and canonical Forge repository.

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

- Initial release of @adenyrr/astro-ui component library
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
- NPM package publication via GitLab registry

[1.0.0]: https://forge.massivedynamics.be/aboutme/astro-ui/-/releases/v1.0.0
[1.1.0]: https://forge.massivedynamics.be/aboutme/astro-ui/-/releases/v1.1.0
[1.2.0]: https://forge.massivedynamics.be/aboutme/astro-ui/-/releases/v1.2.0
