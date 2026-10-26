export type Currency = 'BDT' | 'USD';
export type BillingCycle = 'monthly' | 'yearly' | 'biennial';
export type AppPage = 'home' | 'embroidery' | 'graphics' | 'admin';

export interface HostingSpecs {
  storage: string;
  bandwidth: string;
  websites: string;
  ram: string;
  cpu: string;
  cpanel: boolean;
  ssl: boolean;
  dailyBackup: boolean;
  litespeed: boolean;
  inodes: string;
  emails: string;
  subdomains: string;
}

export interface HostingPackage {
  id: string;
  name: string;
  category: 'cpanel' | 'bdix' | 'vps' | 'reseller';
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  priceBDTMonthly: number;
  priceBDTYearly: number;
  priceUSDMonthly: number;
  priceUSDYearly: number;
  discountPercent: number;
  freeDomainOnYearly: boolean;
  specs: HostingSpecs;
  features: string[];
  orderUrl?: string;
}

export interface DomainTLD {
  extension: string; // e.g. '.com'
  priceBDTYearly: number;
  priceUSDYearly: number;
  renewalBDTYearly: number;
  renewalUSDYearly: number;
  badge?: string;
  popular?: boolean;
}

export interface ServicePlan {
  id: string;
  category: 'embroidery' | 'graphics';
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  priceBDT: number;
  priceUSD: number;
  deliveryTime: string;
  revisions: string;
  formats: string[];
  features: string[];
  orderUrl?: string;
}

export interface ServerLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  pingMs: number;
  description: string;
}

export interface AdminSettings {
  loginUrl: string; // User can paste custom WHMCS/Client Area login URL
  signupUrl: string; // User can paste custom WHMCS/Client Area signup URL
  domainRegisterUrl?: string; // Custom domain registration portal URL
  domainTransferUrl?: string; // Custom domain transfer portal URL
  useDirectLinks: boolean; // if true, buttons directly open the above URLs; if false, opens interactive modal
  openInNewTab?: boolean; // if true (default), opens URLs in new tab (_blank), else in same tab (_self)
  brandName: string;
  supportPhone: string;
  supportWhatsApp: string;
  supportEmail: string;
  announcementText: string;
  showAnnouncement: boolean;
  usdToBdtRate: number;
  
  // Favicon & Logo Customization
  faviconUrl?: string; // Image URL or base64 data URI for browser tab icon
  logoUrl?: string; // Image URL or base64 data URI for site-wide logo
  logoSize?: 'sm' | 'md' | 'lg' | 'xl'; // Size of the logo across the site
  showLogoText?: boolean; // If false, only display the logo image without extra text name
  logoTextPrefix?: string; // e.g. "TOOFAN"
  logoTextSuffix?: string; // e.g. "HOST"

  // Comprehensive Footer Customization
  footerAboutText?: string;
  footerStatusText?: string;
  footerWebsiteUrl?: string;
  footerCopyrightText?: string;
  footerPaymentMethods?: string[];
  footerFacebookUrl?: string;
  footerTwitterUrl?: string;
  footerLinkedinUrl?: string;
  footerYoutubeUrl?: string;
  footerTelegramUrl?: string;

  // Admin Security Password
  adminPassword?: string; // Master password to access the admin dashboard
}

export interface CartItem {
  id: string;
  type: 'hosting' | 'domain' | 'service';
  title: string;
  subtitle: string;
  billingCycle?: BillingCycle;
  serverLocation?: string;
  linkedDomain?: string;
  price: number;
  currency: Currency;
  specsSummary?: string;
  serviceCategory?: 'embroidery' | 'graphics';
}

export interface CouponCode {
  code: string;
  discountPercentage: number;
  description: string;
}
