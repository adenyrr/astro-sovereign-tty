# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
