import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '.astro/**',
      'dist/**',
      'node_modules/**',
      'playground/.astro/**',
      'playground/dist/**',
      'playwright-report/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts,astro}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^(e|_)$' },
      ],
    },
  },
  {
    files: ['**/*.astro', '**/*.astro/*.js', '**/*.astro/*.ts'],
    rules: {
      'no-var': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
);
