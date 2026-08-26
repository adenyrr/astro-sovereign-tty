import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  build: { format: 'directory' },
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      algorithm: 'SHA-256',
      // Hash de la feuille injectée par le test WCAG Text Spacing.
      styleDirective: {
        hashes: ['sha256-lhOu7j3pLsbviUTPGREJG+h/fFqOdV6bULKHhABcmCo='],
      },
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self'",
      ],
    },
  },
  vite: { plugins: [tailwindcss()] },
});
