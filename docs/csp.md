# Content Security Policy

`@adenyrr/astro-sovereign-tty` is compatible with Astro's native CSP generation available in Astro 6 and 7. Enable it in every consumer's `astro.config.mjs`; the package cannot set response policy for a host application.

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
      ],
    },
  },
});
```

Astro adds hashes for the emitted scripts and styles. With this package, opt in to its inline-script hashes only when this configuration exists:

```astro
<ThemeScript csp />
```

Keep it in `<head>` before styles; do not replace hashes with `'unsafe-inline'`. Without Astro CSP, use `<ThemeScript />`; it deliberately emits no CSP warning.

Astro's default Shiki output uses inline style attributes. Sites rendering Markdown code should select Prism (`markdown: { syntaxHighlight: 'prism' }`) or a class-based highlighter when CSP is active.

Adapt only the directives required by the consumer's real resources. Prefer local assets and narrow origins. Server and CDN deployments should additionally send policy as an HTTP header so directives unavailable to a `<meta>` policy, such as `frame-ancestors`, can be enforced:

```text
frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests
```

After changing integrations or third-party resources, build and visit all routes while recording browser console messages. A blocked resource is a failed configuration, not an exception to silence globally.
