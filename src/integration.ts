import { fontProviders } from 'astro/config';
import type { AstroConfig, AstroIntegration } from 'astro';

const managedVariables = [
  '--astro-ui-font-body',
  '--astro-ui-font-code',
  '--astro-ui-font-reading',
] as const;

const sovereignFonts = [
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
] satisfies NonNullable<AstroConfig['fonts']>;

/**
 * Installs the default Astro Fonts contract used by `<Fonts />`.
 *
 * Consumers that supply any of the managed CSS variables themselves must use
 * their own `fonts` configuration instead of this integration.
 */
export default function sovereignTty(): AstroIntegration {
  return {
    name: '@adenyrr/astro-sovereign-tty',
    hooks: {
      'astro:config:setup': ({ config, updateConfig }) => {
        const configuredFonts = config.fonts ?? [];
        const collisions = configuredFonts
          .map((font) => font.cssVariable)
          .filter((cssVariable): cssVariable is string => Boolean(cssVariable))
          .filter((cssVariable) =>
            managedVariables.includes(cssVariable as (typeof managedVariables)[number]),
          );

        if (collisions.length) {
          throw new Error(
            `@adenyrr/astro-sovereign-tty cannot configure ${collisions.join(', ')} because it is already configured. Remove sovereignTty() and keep your custom Astro Fonts configuration.`,
          );
        }

        updateConfig({ fonts: [...configuredFonts, ...sovereignFonts] });
      },
    },
  };
}
