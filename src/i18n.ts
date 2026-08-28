import type { ChromeLabels, ChromeLocale, SiteChromeConfig } from './types.js';

export const fr: Readonly<ChromeLabels> = Object.freeze({
  skipToContent: 'Aller au contenu principal',
  homeAriaLabel: '{brand} — accueil',
  primaryNavigation: 'Navigation principale',
  mobileNavigation: 'Navigation mobile',
  footerNavigation: 'Navigation du pied de page',
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  menuHeading: 'Navigation',
  themeToLight: 'Basculer vers le thème clair',
  themeToDark: 'Basculer vers le thème sombre',
  readingModeOn: 'Activer le mode lecture',
  readingModeOff: 'Désactiver le mode lecture',
  rssFeed: 'Flux RSS',
  branchUpToDate: 'Branche à jour',
  backToTop: 'Haut de page',
  externalLink: 'Ouvre dans un nouvel onglet',
  unknownSocialLink: 'Lien social',
});

export const en: Readonly<ChromeLabels> = Object.freeze({
  skipToContent: 'Skip to main content',
  homeAriaLabel: '{brand} — home',
  primaryNavigation: 'Primary navigation',
  mobileNavigation: 'Mobile navigation',
  footerNavigation: 'Footer navigation',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  menuHeading: 'Navigation',
  themeToLight: 'Switch to light theme',
  themeToDark: 'Switch to dark theme',
  readingModeOn: 'Enable reading mode',
  readingModeOff: 'Disable reading mode',
  rssFeed: 'RSS feed',
  branchUpToDate: 'Branch is up to date',
  backToTop: 'Back to top',
  externalLink: 'Opens in a new tab',
  unknownSocialLink: 'Social link',
});

export const chromeLabels: Readonly<Record<ChromeLocale, Readonly<ChromeLabels>>> = Object.freeze({
  fr,
  en,
});

export function resolveChromeLabels(
  config: Pick<SiteChromeConfig, 'locale' | 'labels'>,
): ChromeLabels {
  return { ...chromeLabels[config.locale ?? 'fr'], ...config.labels };
}
