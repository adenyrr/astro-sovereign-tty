export type ChromeLocale = 'fr' | 'en';

export type BrandIconName = 'Github' | 'Gitlab' | 'Linkedin';
export type InterfaceIconName = 'Mail' | 'MessageCircle' | 'Rss';
export type ChromeIconName = BrandIconName | InterfaceIconName | (string & {});

export interface ChromeLabels {
  skipToContent: string;
  homeAriaLabel: string;
  primaryNavigation: string;
  mobileNavigation: string;
  footerNavigation: string;
  openMenu: string;
  closeMenu: string;
  menuHeading: string;
  themeToLight: string;
  themeToDark: string;
  readingModeOn: string;
  readingModeOff: string;
  rssFeed: string;
  branchUpToDate: string;
  backToTop: string;
  externalLink: string;
  unknownSocialLink: string;
}

export interface NavigationItem {
  label: string;
  route?: string;
  url?: string;
  enabled?: boolean;
  feature?: string;
  external?: boolean;
  active?: boolean;
}

export interface SocialLink {
  label: string;
  icon: ChromeIconName;
  url: string;
  enabled?: boolean;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface SiteChromeConfig {
  locale?: ChromeLocale;
  labels?: Partial<ChromeLabels>;
  features?: Record<string, boolean>;
  appearance?: {
    ambientBackground?: boolean;
  };
  header: {
    show: boolean;
    brandName: string;
    brandHost: string;
    homeUrl?: string;
    /** Deployment prefix removed before routes are compared. */
    basePath?: string;
    /** `mobile` hides below 820px, `true` everywhere, and `false` never. */
    hideOnScroll?: boolean | 'mobile';
    navigation: NavigationItem[];
    socialLinks: SocialLink[];
  };
  footer: {
    show: boolean;
    copyright?: string;
    author: string;
    authorUrl: string;
    signatureCommand: string;
    note: string;
    navigationLabel: string;
    connectLabel: string;
    backToTopLabel: string;
    shellPrompt: string;
    branch: string;
    poweredBy?: FooterLink[];
    rss?: boolean | string;
  };
}
