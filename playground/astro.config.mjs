import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: { format: 'directory' },
  markdown: { syntaxHighlight: false },
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
  security: {
    csp: {
      algorithm: 'SHA-256',
      // Hash for the stylesheet injected by the WCAG Text Spacing test.
      styleDirective: {
        hashes: ['sha256-lhOu7j3pLsbviUTPGREJG+h/fFqOdV6bULKHhABcmCo='],
      },
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
