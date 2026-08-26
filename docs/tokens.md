# Token API

The custom properties in `tokens.css` are a public SemVer API. Removing or renaming one is a breaking change. Value changes are reviewed for contrast, brand identity, and compatibility across light, dark, reading, forced-colors, and print contexts.

## Layered entry points

```css
/* Default, autonomous contract */
@import '@adenyrr/astro-ui/styles.css';

/* Optional consumer bridges */
@import '@adenyrr/astro-ui/tailwind.css'; /* requires optional Tailwind peer */
@import '@adenyrr/astro-ui/compat.css'; /* legacy vaul/mobile drawer only */
@import '@adenyrr/astro-ui/print.css'; /* explicit print support */
```

`styles.css` declares the ordered layers `astro-ui.tokens`, `astro-ui.base`, and `astro-ui.components`. The three underlying files are also exported for consumers that need to position each layer in a larger cascade.

## Stable groups

| Group      | Representative tokens                                                 | Purpose                                 |
| ---------- | --------------------------------------------------------------------- | --------------------------------------- |
| Layout     | `--header-height`, `--header-gap`, `--space-*`, `--radius-*`          | Chrome dimensions and rhythm            |
| Background | `--bg-0`, `--bg-1`, `--surface`, `--glass-*`                          | Page and workstation surfaces           |
| Text       | `--text-primary`, `--text-secondary`, `--text-muted`, `--link-color`  | Accessible foreground hierarchy         |
| Brand      | `--accent-*`, `--*-rgb`, `--brand-mark*`                              | Site identity and semantic accents      |
| Typography | `--font-ui`, `--font-body`, `--font-reading`, `--font-code`, `--fs-*` | Body, reading, code, and heading scales |
| Motion     | `--transition-*`                                                      | Shared interaction timing               |
| Effects    | `--shadow-*`, `--blob-*`, `--glint*`, `--grid-line`                   | Glass and ambient workstation treatment |

Override tokens after `styles.css`, preferably in a named site-theme file. Preserve text/background contrast of at least 4.5:1 and do not use accent color as the only state indicator.
