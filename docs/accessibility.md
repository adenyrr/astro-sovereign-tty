# Accessibility contract

Version 2 is designed and continuously tested against the WCAG 2.2 Level AA requirements relevant to shared chrome. This is a component-level guarantee, not a conformance claim for a complete consumer site: page content, integrations, routing, and deployment remain the consumer's responsibility.

## Automated guarantees

- Every playground route is scanned with axe in light and dark themes on desktop Chromium, Pixel 7 Chromium, and iPhone 14 WebKit.
- All shipped theme foreground/background pairs meet a 4.5:1 contrast floor; the checker includes a deliberately failing fixture.
- The skip link, initial drawer focus, focus loop, Escape closing, `inert` content, and trigger-focus restoration are browser-tested.
- Active navigation and focus remain distinguishable in forced-colors mode without color alone.
- Theme and reading preferences are applied before styles and restored across ClientRouter swaps.
- Reduced motion removes non-essential transitions and animated scrolling. Reduced transparency receives opaque surfaces.
- Reading mode uses Atkinson Hyperlegible Next, a 66-character measure, non-negative letter spacing, and paragraph rhythm.
- WCAG Text Spacing overrides do not create horizontal page overflow.
- Print rules remove decorative chrome only when the consumer opts into `print.css`.

## Consumer responsibilities

- Keep a unique, focusable `main#main` target for the skip link.
- Supply meaningful navigation labels and document language; use `locale` and `labels` for chrome strings.
- Preserve heading order, alternative text, form names, landmarks, keyboard access, and visible focus in page content.
- Do not override public tokens with combinations below the documented contrast floor.
- Test real routes with content expansion, browser zoom, Text Spacing, forced colors, reduced motion/transparency, and print output.
- Re-run axe and manual keyboard checks after adding third-party widgets or changing the responsive layout.

Report security issues through [SECURITY.md](../SECURITY.md). Accessibility regressions may be filed in the project issue tracker with the route, browser, viewport, input method, expected behavior, and a minimal reproduction.
