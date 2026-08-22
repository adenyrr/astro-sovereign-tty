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
  icon: string;
  url: string;
  enabled?: boolean;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface SiteChromeConfig {
  features?: Record<string, boolean>;
  appearance?: {
    ambientBackground?: boolean;
  };
  header: {
    show: boolean;
    brandName: string;
    brandHost: string;
    homeUrl?: string;
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
