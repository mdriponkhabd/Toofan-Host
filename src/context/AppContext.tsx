import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, doc, setDoc, onSnapshot } from '../firebase';
import { getDocFromServer } from 'firebase/firestore';
import {
  HostingPackage,
  DomainTLD,
  AdminSettings,
  Currency,
  CartItem,
  CouponCode,
  AppPage,
  ServicePlan,
} from '../types';
import {
  DEFAULT_ADMIN_SETTINGS,
  DEFAULT_HOSTING_PACKAGES,
  DEFAULT_TLDS,
  DEFAULT_COUPONS,
  DEFAULT_EMBROIDERY_PLANS,
  DEFAULT_GRAPHICS_PLANS,
} from '../data/defaultData';

interface AppContextType {
  // Navigation & Page State
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;

  // Currency & Settings
  currency: Currency;
  setCurrency: (c: Currency) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  adminSettings: AdminSettings;
  updateAdminSettings: (settings: AdminSettings) => void;

  // Packages & TLDs
  packages: HostingPackage[];
  updatePackage: (pkg: HostingPackage) => void;
  addPackage: (pkg: HostingPackage) => void;
  deletePackage: (id: string) => void;
  tlds: DomainTLD[];
  updateTLD: (tld: DomainTLD) => void;
  addTLD: (tld: DomainTLD) => void;
  deleteTLD: (extension: string) => void;

  // Services: Embroidery & Graphics Plans
  embroideryPlans: ServicePlan[];
  graphicsPlans: ServicePlan[];
  updateServicePlan: (plan: ServicePlan) => void;
  addServicePlan: (plan: ServicePlan) => void;
  deleteServicePlan: (id: string, category: 'embroidery' | 'graphics') => void;

  resetToDefaults: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Modals
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  triggerAuthButtonClick: (type: 'login' | 'signup') => void;

  isDomainTransferModalOpen: boolean;
  setIsDomainTransferModalOpen: (open: boolean) => void;
  openDomainTransferModal: () => void;
  closeDomainTransferModal: () => void;

  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;

  isConfigModalOpen: boolean;
  selectedPackageForConfig: HostingPackage | null;
  openConfigModal: (pkg: HostingPackage) => void;
  closeConfigModal: () => void;

  // Coupons
  activeCoupon: CouponCode | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Helpers
  formatPrice: (bdt: number, usd: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getPageFromUrl = (): AppPage => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    // Direct /admin or #admin or ?admin
    if (path.includes('/admin') || path === 'admin' || hash.includes('admin') || search.includes('admin')) {
      return 'admin';
    }
    if (path.includes('/embroidery') || hash.includes('embroidery') || search.includes('embroidery')) {
      return 'embroidery';
    }
    if (path.includes('/graphics') || hash.includes('graphics') || search.includes('graphics')) {
      return 'graphics';
    }
    const savedPage = localStorage.getItem('toofan_active_page');
    if (savedPage === 'embroidery' || savedPage === 'graphics' || savedPage === 'admin') {
      return savedPage as AppPage;
    }
    return 'home';
  };

  // Page routing
  const [currentPage, setCurrentPageState] = useState<AppPage>(() => getPageFromUrl());

  const setCurrentPage = (page: AppPage) => {
    setCurrentPageState(page);
    localStorage.setItem('toofan_active_page', page);
    if (typeof window !== 'undefined') {
      if (page === 'admin') {
        window.history.pushState(null, '', '/admin');
      } else if (page === 'home') {
        window.history.pushState(null, '', '/');
      } else {
        window.history.pushState(null, '', `/${page}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const detected = getPageFromUrl();
      setCurrentPageState(detected);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Load from localStorage or defaults
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('toofan_currency');
    return (saved as Currency) || 'BDT';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('toofan_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('toofan_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('toofan_admin_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_ADMIN_SETTINGS,
          ...parsed,
          useDirectLinks: parsed.useDirectLinks !== undefined ? parsed.useDirectLinks : true,
          openInNewTab: parsed.openInNewTab !== undefined ? parsed.openInNewTab : true,
          logoUrl: parsed.logoUrl || DEFAULT_ADMIN_SETTINGS.logoUrl,
          faviconUrl: parsed.faviconUrl || DEFAULT_ADMIN_SETTINGS.faviconUrl,
          logoSize: parsed.logoSize || 'lg',
          showLogoText: parsed.showLogoText ?? false,
          showAnnouncement: false,
          adminPassword:
            (!parsed.adminPassword || parsed.adminPassword === 'toofanadmin2026')
              ? 'Saif@2000@'
              : parsed.adminPassword,
        };
      }
      return DEFAULT_ADMIN_SETTINGS;
    } catch {
      return DEFAULT_ADMIN_SETTINGS;
    }
  });

  // Dynamically update browser tab favicon if customized
  useEffect(() => {
    if (adminSettings.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = adminSettings.faviconUrl;
    }
  }, [adminSettings.faviconUrl]);

  const [packages, setPackages] = useState<HostingPackage[]>(() => {
    try {
      const saved = localStorage.getItem('toofan_packages');
      if (saved) {
        const parsed: HostingPackage[] = JSON.parse(saved);
        const bdixCount = parsed.filter((p) => p.category === 'bdix').length;
        const vpsCount = parsed.filter((p) => p.category === 'vps').length;
        const resellerCount = parsed.filter((p) => p.category === 'reseller').length;
        if (bdixCount < 3 || vpsCount < 3 || resellerCount < 3) {
          return DEFAULT_HOSTING_PACKAGES;
        }
        return parsed;
      }
      return DEFAULT_HOSTING_PACKAGES;
    } catch {
      return DEFAULT_HOSTING_PACKAGES;
    }
  });

  const [tlds, setTlds] = useState<DomainTLD[]>(() => {
    try {
      const saved = localStorage.getItem('toofan_tlds');
      return saved ? JSON.parse(saved) : DEFAULT_TLDS;
    } catch {
      return DEFAULT_TLDS;
    }
  });

  const [embroideryPlans, setEmbroideryPlans] = useState<ServicePlan[]>(() => {
    try {
      const saved = localStorage.getItem('toofan_embroidery_plans');
      return saved ? JSON.parse(saved) : DEFAULT_EMBROIDERY_PLANS;
    } catch {
      return DEFAULT_EMBROIDERY_PLANS;
    }
  });

  const [graphicsPlans, setGraphicsPlans] = useState<ServicePlan[]>(() => {
    try {
      const saved = localStorage.getItem('toofan_graphics_plans');
      return saved ? JSON.parse(saved) : DEFAULT_GRAPHICS_PLANS;
    } catch {
      return DEFAULT_GRAPHICS_PLANS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('toofan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isDomainTransferModalOpen, setIsDomainTransferModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedPackageForConfig, setSelectedPackageForConfig] = useState<HostingPackage | null>(null);
  const [activeCoupon, setActiveCoupon] = useState<CouponCode | null>(null);

  const openDomainTransferModal = () => setIsDomainTransferModalOpen(true);
  const closeDomainTransferModal = () => setIsDomainTransferModalOpen(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('toofan_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('toofan_admin_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  useEffect(() => {
    localStorage.setItem('toofan_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('toofan_tlds', JSON.stringify(tlds));
  }, [tlds]);

  useEffect(() => {
    localStorage.setItem('toofan_embroidery_plans', JSON.stringify(embroideryPlans));
  }, [embroideryPlans]);

  useEffect(() => {
    localStorage.setItem('toofan_graphics_plans', JSON.stringify(graphicsPlans));
  }, [graphicsPlans]);

  useEffect(() => {
    localStorage.setItem('toofan_cart', JSON.stringify(cart));
  }, [cart]);

  // Real-time synchronization with Cloud Firestore (Global updates for visitors worldwide)
  useEffect(() => {
    // Connection health check per directive
    try {
      getDocFromServer(doc(db, 'settings', 'global')).catch(() => {});
    } catch {
      // ignore offline fallback
    }

    // 1. Global Website Settings & Links
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (snap) => {
      if (snap.exists()) {
        const remoteData = snap.data() as Partial<AdminSettings>;
        setAdminSettings((prev) => ({
          ...DEFAULT_ADMIN_SETTINGS,
          ...prev,
          ...remoteData,
          adminPassword: remoteData.adminPassword || prev.adminPassword || 'Saif@2000@',
        }));
      } else {
        // First run: save local/default settings to cloud database
        setDoc(doc(db, 'settings', 'global'), adminSettings).catch(() => {});
      }
    }, (err) => {
      console.warn('Firestore settings listener:', err);
    });

    // 2. Hosting Packages
    const unsubPackages = onSnapshot(doc(db, 'content', 'packages'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.list) && data.list.length > 0) {
          setPackages(data.list);
        }
      } else {
        setDoc(doc(db, 'content', 'packages'), { list: packages }).catch(() => {});
      }
    }, (err) => {
      console.warn('Firestore packages listener:', err);
    });

    // 3. Domain TLDs
    const unsubTlds = onSnapshot(doc(db, 'content', 'tlds'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.list) && data.list.length > 0) {
          setTlds(data.list);
        }
      } else {
        setDoc(doc(db, 'content', 'tlds'), { list: tlds }).catch(() => {});
      }
    }, (err) => {
      console.warn('Firestore TLDs listener:', err);
    });

    // 4. Creative Services (Embroidery & Graphics Plans)
    const unsubServices = onSnapshot(doc(db, 'content', 'services'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.embroidery)) {
          setEmbroideryPlans(data.embroidery);
        }
        if (Array.isArray(data.graphics)) {
          setGraphicsPlans(data.graphics);
        }
      } else {
        setDoc(doc(db, 'content', 'services'), {
          embroidery: embroideryPlans,
          graphics: graphicsPlans,
        }).catch(() => {});
      }
    }, (err) => {
      console.warn('Firestore services listener:', err);
    });

    return () => {
      unsubSettings();
      unsubPackages();
      unsubTlds();
      unsubServices();
    };
  }, []);

  // Package mutations
  const updatePackage = (updated: HostingPackage) => {
    setPackages((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      localStorage.setItem('toofan_packages', JSON.stringify(next));
      setDoc(doc(db, 'content', 'packages'), { list: next }).catch((e) => console.error(e));
      return next;
    });
  };

  const addPackage = (newPkg: HostingPackage) => {
    setPackages((prev) => {
      const next = [...prev, newPkg];
      localStorage.setItem('toofan_packages', JSON.stringify(next));
      setDoc(doc(db, 'content', 'packages'), { list: next }).catch((e) => console.error(e));
      return next;
    });
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem('toofan_packages', JSON.stringify(next));
      setDoc(doc(db, 'content', 'packages'), { list: next }).catch((e) => console.error(e));
      return next;
    });
  };

  // TLD mutations
  const updateTLD = (updated: DomainTLD) => {
    setTlds((prev) => {
      const next = prev.map((t) => (t.extension === updated.extension ? updated : t));
      localStorage.setItem('toofan_tlds', JSON.stringify(next));
      setDoc(doc(db, 'content', 'tlds'), { list: next }).catch((e) => console.error(e));
      return next;
    });
  };

  const addTLD = (newTld: DomainTLD) => {
    setTlds((prev) => {
      const exists = prev.some((t) => t.extension.toLowerCase() === newTld.extension.toLowerCase());
      const next = exists
        ? prev.map((t) => (t.extension.toLowerCase() === newTld.extension.toLowerCase() ? newTld : t))
        : [...prev, newTld];
      localStorage.setItem('toofan_tlds', JSON.stringify(next));
      setDoc(doc(db, 'content', 'tlds'), { list: next }).catch((e) => console.error(e));
      return next;
    });
  };

  const deleteTLD = (ext: string) => {
    setTlds((prev) => {
      const next = prev.filter((t) => t.extension.toLowerCase() !== ext.toLowerCase());
      localStorage.setItem('toofan_tlds', JSON.stringify(next));
      setDoc(doc(db, 'content', 'tlds'), { list: next }).catch((e) => console.error(e));
      return next;
    });
  };

  // Service plans mutations (Embroidery & Graphics)
  const updateServicePlan = (updated: ServicePlan) => {
    if (updated.category === 'embroidery') {
      setEmbroideryPlans((prev) => {
        const next = prev.map((p) => (p.id === updated.id ? updated : p));
        localStorage.setItem('toofan_embroidery_plans', JSON.stringify(next));
        setDoc(doc(db, 'content', 'services'), {
          embroidery: next,
          graphics: graphicsPlans,
        }).catch((e) => console.error(e));
        return next;
      });
    } else {
      setGraphicsPlans((prev) => {
        const next = prev.map((p) => (p.id === updated.id ? updated : p));
        localStorage.setItem('toofan_graphics_plans', JSON.stringify(next));
        setDoc(doc(db, 'content', 'services'), {
          embroidery: embroideryPlans,
          graphics: next,
        }).catch((e) => console.error(e));
        return next;
      });
    }
  };

  const addServicePlan = (newPlan: ServicePlan) => {
    if (newPlan.category === 'embroidery') {
      setEmbroideryPlans((prev) => {
        const next = [...prev, newPlan];
        localStorage.setItem('toofan_embroidery_plans', JSON.stringify(next));
        setDoc(doc(db, 'content', 'services'), {
          embroidery: next,
          graphics: graphicsPlans,
        }).catch((e) => console.error(e));
        return next;
      });
    } else {
      setGraphicsPlans((prev) => {
        const next = [...prev, newPlan];
        localStorage.setItem('toofan_graphics_plans', JSON.stringify(next));
        setDoc(doc(db, 'content', 'services'), {
          embroidery: embroideryPlans,
          graphics: next,
        }).catch((e) => console.error(e));
        return next;
      });
    }
  };

  const deleteServicePlan = (id: string, category: 'embroidery' | 'graphics') => {
    if (category === 'embroidery') {
      setEmbroideryPlans((prev) => {
        const next = prev.filter((p) => p.id !== id);
        localStorage.setItem('toofan_embroidery_plans', JSON.stringify(next));
        setDoc(doc(db, 'content', 'services'), {
          embroidery: next,
          graphics: graphicsPlans,
        }).catch((e) => console.error(e));
        return next;
      });
    } else {
      setGraphicsPlans((prev) => {
        const next = prev.filter((p) => p.id !== id);
        localStorage.setItem('toofan_graphics_plans', JSON.stringify(next));
        setDoc(doc(db, 'content', 'services'), {
          embroidery: embroideryPlans,
          graphics: next,
        }).catch((e) => console.error(e));
        return next;
      });
    }
  };

  const updateAdminSettings = (newSettings: AdminSettings) => {
    setAdminSettings(newSettings);
    localStorage.setItem('toofan_admin_settings', JSON.stringify(newSettings));
    setDoc(doc(db, 'settings', 'global'), newSettings).catch((err) => {
      console.error('Failed to sync settings to Firestore:', err);
    });
  };

  const resetToDefaults = () => {
    setPackages(DEFAULT_HOSTING_PACKAGES);
    setTlds(DEFAULT_TLDS);
    setAdminSettings(DEFAULT_ADMIN_SETTINGS);
    setEmbroideryPlans(DEFAULT_EMBROIDERY_PLANS);
    setGraphicsPlans(DEFAULT_GRAPHICS_PLANS);
    localStorage.removeItem('toofan_packages');
    localStorage.removeItem('toofan_tlds');
    localStorage.removeItem('toofan_admin_settings');
    localStorage.removeItem('toofan_embroidery_plans');
    localStorage.removeItem('toofan_graphics_plans');

    // Reset cloud Firestore documents to defaults
    setDoc(doc(db, 'settings', 'global'), DEFAULT_ADMIN_SETTINGS).catch(() => {});
    setDoc(doc(db, 'content', 'packages'), { list: DEFAULT_HOSTING_PACKAGES }).catch(() => {});
    setDoc(doc(db, 'content', 'tlds'), { list: DEFAULT_TLDS }).catch(() => {});
    setDoc(doc(db, 'content', 'services'), {
      embroidery: DEFAULT_EMBROIDERY_PLANS,
      graphics: DEFAULT_GRAPHICS_PLANS,
    }).catch(() => {});
  };

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Auth Handling (Supports direct linkup or interactive modal)
  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const triggerAuthButtonClick = (type: 'login' | 'signup') => {
    const rawUrl = type === 'login' ? adminSettings.loginUrl : adminSettings.signupUrl;
    const targetUrl = rawUrl?.trim();
    
    // If direct link mode is active (default true) and a valid url exists, navigate/open!
    if (adminSettings.useDirectLinks !== false && targetUrl && targetUrl !== '') {
      const formattedUrl = targetUrl.startsWith('http://') || targetUrl.startsWith('https://') || targetUrl.startsWith('/') || targetUrl.startsWith('#')
        ? targetUrl
        : `https://${targetUrl}`;

      if (adminSettings.openInNewTab !== false) {
        window.open(formattedUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = formattedUrl;
      }
      return;
    }

    // Otherwise open the interactive auth modal
    openAuthModal(type === 'login' ? 'login' : 'register');
  };

  // Config modal
  const openConfigModal = (pkg: HostingPackage) => {
    setSelectedPackageForConfig(pkg);
    setIsConfigModalOpen(true);
  };

  const closeConfigModal = () => {
    setIsConfigModalOpen(false);
    setSelectedPackageForConfig(null);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const found = DEFAULT_COUPONS.find(
      (c) => c.code.toLowerCase() === code.trim().toLowerCase()
    );
    if (found) {
      setActiveCoupon(found);
      return { success: true, message: `Coupon ${found.code} applied! ${found.discountPercentage}% discount active.` };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try "TOOFAN30"' };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  // Price formatter helper
  const formatPrice = (bdt: number, usd: number) => {
    if (currency === 'BDT') {
      return `৳${Math.round(bdt).toLocaleString('en-US')}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currency,
        setCurrency,
        theme,
        setTheme,
        toggleTheme,
        adminSettings,
        updateAdminSettings,
        packages,
        updatePackage,
        addPackage,
        deletePackage,
        tlds,
        updateTLD,
        addTLD,
        deleteTLD,
        embroideryPlans,
        graphicsPlans,
        updateServicePlan,
        addServicePlan,
        deleteServicePlan,
        resetToDefaults,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        triggerAuthButtonClick,
        isDomainTransferModalOpen,
        setIsDomainTransferModalOpen,
        openDomainTransferModal,
        closeDomainTransferModal,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isConfigModalOpen,
        selectedPackageForConfig,
        openConfigModal,
        closeConfigModal,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
