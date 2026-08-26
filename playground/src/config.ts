import type { SiteChromeConfig } from '../../src/types';

export const chromeConfig: SiteChromeConfig = {
  features: { blog: true },
  appearance: { ambientBackground: true },
  header: {
    show: true,
    brandName: 'adenyrr',
    brandHost: '@playground',
    navigation: [
      { label: 'home', route: '/' },
      { label: 'blog', route: '/blog' },
      { label: 'kitchen', route: '/kitchen-sink' },
    ],
    socialLinks: [
      { label: 'GitHub', icon: 'Github', url: 'https://github.com/adenyrr' },
      { label: 'Email', icon: 'Mail', url: 'mailto:test@example.com' },
    ],
  },
  footer: {
    show: true,
    author: 'adenyrr',
    authorUrl: '/',
    signatureCommand: 'echo ready',
    note: 'Playground autonome pour le chrome partagé.',
    navigationLabel: '~/navigation',
    connectLabel: '~/connect',
    backToTopLabel: 'Haut de page',
    shellPrompt: 'adenyrr@playground',
    branch: 'main',
    rss: '/rss.xml',
  },
};
