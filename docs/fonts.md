# Astro Fonts contract

Version 3 uses Astro's native Fonts API. The usual setup is one integration line; it supplies the configuration needed by `<Fonts />`.

```js
import { defineConfig } from 'astro/config';
import sovereignTty from '@adenyrr/astro-sovereign-tty/integration';

export default defineConfig({ integrations: [sovereignTty()] });
```

If a consumer needs to replace one of the three font families, do not register the integration. Copy and adapt the manual configuration below instead; the `--astro-ui-font-body`, `--astro-ui-font-code`, and `--astro-ui-font-reading` variables remain required by `<Fonts />`.

```js
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inclusive Sans',
      cssVariable: '--astro-ui-font-body',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--astro-ui-font-code',
      weights: ['100 800'],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      fallbacks: ['monospace'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Atkinson Hyperlegible Next',
      cssVariable: '--astro-ui-font-reading',
      weights: ['200 800'],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      fallbacks: ['sans-serif'],
    },
  ],
});
```

Place the components in this order in `<head>`:

```astro
<ThemeScript />
<Fonts />
<meta name="color-scheme" content="light dark" />
```

`Fonts` preloads only Inclusive Sans and JetBrains Mono. It exposes the local Atkinson WOFF2 URL in a meta element; the reading toggle creates its preload only on focus or pointer hover. The build therefore contains three WOFF2 files while keeping the optional reading font off the critical path.
