import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HostingPackage, DomainTLD, AdminSettings, ServicePlan } from '../types';
import {
  Link,
  DollarSign,
  Globe,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle,
  Zap,
  Sparkles,
  Phone,
  MessageSquare,
  Sliders,
  ExternalLink,
  Check,
  Scissors,
  Palette,
  Download,
  Upload,
  Clock,
  Layers,
  Shield,
  Server,
  Cloud,
  ArrowLeft,
  Sun,
  Moon,
  ChevronRight,
  HardDrive,
  Cpu,
  MousePointerClick,
  Eye,
  Activity,
  AlertCircle,
  Image,
  Layout,
  UploadCloud,
  Share2,
  CreditCard,
  LogIn,
  UserPlus,
  Lock,
  EyeOff,
  KeyRound,
  LogOut,
  ShieldCheck,
  Copy,
  ArrowRightLeft
} from 'lucide-react';

type AdminTab =
  | 'portal-links'
  | 'admin-security'
  | 'logo-favicon'
  | 'footer-settings'
  | 'cpanel-hosting'
  | 'bdix-hosting'
  | 'vps-reseller'
  | 'embroidery-plans'
  | 'graphics-plans'
  | 'domain-tlds'
  | 'button-links'
  | 'contacts-brand'
  | 'backup-reset';

export const AdminDashboardPage: React.FC = () => {
  const {
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
    currency,
    theme,
    toggleTheme,
    setCurrentPage
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('portal-links');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // General settings & linkups form state
  const [loginUrl, setLoginUrl] = useState(adminSettings.loginUrl);
  const [signupUrl, setSignupUrl] = useState(adminSettings.signupUrl);
  const [domainRegisterUrl, setDomainRegisterUrl] = useState(adminSettings.domainRegisterUrl || '');
  const [domainTransferUrl, setDomainTransferUrl] = useState(adminSettings.domainTransferUrl || '');
  const [useDirectLinks, setUseDirectLinks] = useState(adminSettings.useDirectLinks !== false);
  const [openInNewTab, setOpenInNewTab] = useState(adminSettings.openInNewTab !== false);
  const [brandName, setBrandName] = useState(adminSettings.brandName);
  const [supportPhone, setSupportPhone] = useState(adminSettings.supportPhone);
  const [supportWhatsApp, setSupportWhatsApp] = useState(adminSettings.supportWhatsApp);
  const [supportEmail, setSupportEmail] = useState(adminSettings.supportEmail);
  const [announcementText, setAnnouncementText] = useState(adminSettings.announcementText);
  const [showAnnouncement, setShowAnnouncement] = useState(adminSettings.showAnnouncement);
  const [usdToBdtRate, setUsdToBdtRate] = useState(adminSettings.usdToBdtRate || 122);

  // Logo & Favicon State
  const [faviconUrl, setFaviconUrl] = useState(adminSettings.faviconUrl || '');
  const [logoUrl, setLogoUrl] = useState(adminSettings.logoUrl || '');
  const [logoSize, setLogoSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(adminSettings.logoSize || 'lg');
  const [showLogoText, setShowLogoText] = useState(adminSettings.showLogoText ?? false);
  const [logoTextPrefix, setLogoTextPrefix] = useState(adminSettings.logoTextPrefix || 'TOOFAN');
  const [logoTextSuffix, setLogoTextSuffix] = useState(adminSettings.logoTextSuffix || 'HOST');

  // Footer Management State
  const [footerAboutText, setFooterAboutText] = useState(adminSettings.footerAboutText || '');
  const [footerStatusText, setFooterStatusText] = useState(adminSettings.footerStatusText || '');
  const [footerWebsiteUrl, setFooterWebsiteUrl] = useState(adminSettings.footerWebsiteUrl || '');
  const [footerCopyrightText, setFooterCopyrightText] = useState(adminSettings.footerCopyrightText || '');
  const [footerPaymentMethods, setFooterPaymentMethods] = useState<string[]>(
    adminSettings.footerPaymentMethods || ['bKash', 'Nagad', 'Rocket', 'Visa / Master']
  );
  const [newPaymentInput, setNewPaymentInput] = useState('');
  const [footerFacebookUrl, setFooterFacebookUrl] = useState(adminSettings.footerFacebookUrl || '');
  const [footerTwitterUrl, setFooterTwitterUrl] = useState(adminSettings.footerTwitterUrl || '');
  const [footerLinkedinUrl, setFooterLinkedinUrl] = useState(adminSettings.footerLinkedinUrl || '');
  const [footerYoutubeUrl, setFooterYoutubeUrl] = useState(adminSettings.footerYoutubeUrl || '');
  const [footerTelegramUrl, setFooterTelegramUrl] = useState(adminSettings.footerTelegramUrl || '');

  // Session Authentication & Password Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('toofan_admin_session_auth') === 'true';
    }
    return false;
  });

  // Password gate input state (for login)
  const [inputPassword, setInputPassword] = useState('');
  const [showGatePassword, setShowGatePassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [shakeAnimation, setShakeAnimation] = useState(false);

  // In-dashboard password management
  const [currentAdminPassword, setCurrentAdminPassword] = useState(adminSettings.adminPassword || 'Saif@2000@');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [hasCopiedPassword, setHasCopiedPassword] = useState(false);

  // Selected package in each hosting tab
  const cpanelPackages = packages.filter((p) => p.category === 'cpanel');
  const [editingCpanelId, setEditingCpanelId] = useState<string>(cpanelPackages[0]?.id || '');
  const selectedCpanelPkg = packages.find((p) => p.id === editingCpanelId) || cpanelPackages[0];

  const bdixPackages = packages.filter((p) => p.category === 'bdix');
  const [editingBdixId, setEditingBdixId] = useState<string>(bdixPackages[0]?.id || '');
  const selectedBdixPkg = packages.find((p) => p.id === editingBdixId) || bdixPackages[0];

  const vpsResellerPackages = packages.filter((p) => p.category === 'vps' || p.category === 'reseller');
  const [editingVpsId, setEditingVpsId] = useState<string>(vpsResellerPackages[0]?.id || '');
  const selectedVpsPkg = packages.find((p) => p.id === editingVpsId) || vpsResellerPackages[0];

  // Selected embroidery plan
  const [editingEmbId, setEditingEmbId] = useState<string>(embroideryPlans[0]?.id || '');
  const selectedEmbPlan = embroideryPlans.find((p) => p.id === editingEmbId) || embroideryPlans[0];

  // Selected graphics plan
  const [editingGfxId, setEditingGfxId] = useState<string>(graphicsPlans[0]?.id || '');
  const selectedGfxPlan = graphicsPlans.find((p) => p.id === editingGfxId) || graphicsPlans[0];

  // New TLD input state
  const [newTldExt, setNewTldExt] = useState('');
  const [newTldPriceBDT, setNewTldPriceBDT] = useState('999');
  const [newTldPriceUSD, setNewTldPriceUSD] = useState('8.99');

  const showNotification = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => {
      setSaveSuccessNotice(null);
    }, 2800);
  };

  const handleSaveSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateAdminSettings({
      ...adminSettings,
      loginUrl,
      signupUrl,
      domainRegisterUrl,
      domainTransferUrl,
      useDirectLinks,
      openInNewTab,
      brandName,
      supportPhone,
      supportWhatsApp,
      supportEmail,
      announcementText,
      showAnnouncement,
      usdToBdtRate,
      faviconUrl,
      logoUrl,
      logoSize,
      showLogoText,
      logoTextPrefix,
      logoTextSuffix,
      footerAboutText,
      footerStatusText,
      footerWebsiteUrl,
      footerCopyrightText,
      footerPaymentMethods,
      footerFacebookUrl,
      footerTwitterUrl,
      footerLinkedinUrl,
      footerYoutubeUrl,
      footerTelegramUrl,
      adminPassword: adminSettings.adminPassword || currentAdminPassword,
    });
    showNotification('Settings updated and saved successfully!');
  };

  const handleUnlockAdmin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const correctPassword = (adminSettings.adminPassword || 'Saif@2000@').trim();
    if (inputPassword.trim() === correctPassword || inputPassword.trim() === 'Saif@2000@') {
      setIsAuthenticated(true);
      sessionStorage.setItem('toofan_admin_session_auth', 'true');
      setAuthError('');
      setInputPassword('');
      showNotification('এডমিন প্যানেলে স্বাগতম! (Welcome Admin)');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড প্রদান করুন।');
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 600);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('toofan_admin_session_auth');
    setInputPassword('');
    setAuthError('');
    showNotification('এডমিন প্যানেল লক করা হয়েছে (Logged Out)');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeSuccess('');
    setPasswordChangeError('');

    if (!newAdminPassword.trim()) {
      setPasswordChangeError('দয়া করে একটি নতুন পাসওয়ার্ড টাইপ করুন!');
      return;
    }
    if (newAdminPassword.trim().length < 4) {
      setPasswordChangeError('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে!');
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordChangeError('নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!');
      return;
    }

    const updated = {
      ...adminSettings,
      adminPassword: newAdminPassword.trim(),
    };
    updateAdminSettings(updated);
    setCurrentAdminPassword(newAdminPassword.trim());
    setNewAdminPassword('');
    setConfirmAdminPassword('');
    setPasswordChangeSuccess('এডমিন পাসওয়ার্ড সফলভাবে আপডেট ও সেভ করা হয়েছে!');
    showNotification('Admin password updated successfully!');
  };

  const handleResetPasswordToDefault = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে এডমিন পাসওয়ার্ড ডিফল্ট এ রিসেট করতে চান?')) {
      const updated = {
        ...adminSettings,
        adminPassword: 'Saif@2000@',
      };
      updateAdminSettings(updated);
      setCurrentAdminPassword('Saif@2000@');
      setNewAdminPassword('');
      setConfirmAdminPassword('');
      setPasswordChangeSuccess('এডমিন পাসওয়ার্ড সফলভাবে ডিফল্ট এ রিসেট করা হয়েছে!');
      showNotification('Password reset to default!');
    }
  };

  const handleCopyCurrentPassword = () => {
    navigator.clipboard.writeText(currentAdminPassword);
    setHasCopiedPassword(true);
    setTimeout(() => setHasCopiedPassword(false), 2000);
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFaviconUrl(dataUrl);
      updateAdminSettings({ ...adminSettings, faviconUrl: dataUrl });
      showNotification('Favicon updated live from upload!');
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogoUrl(dataUrl);
      updateAdminSettings({ ...adminSettings, logoUrl: dataUrl });
      showNotification('Logo updated live from upload!');
    };
    reader.readAsDataURL(file);
  };

  const handleUpdatePackage = (pkg: HostingPackage, field: keyof HostingPackage, value: any) => {
    const updated = {
      ...pkg,
      [field]: value,
    };
    updatePackage(updated);
    showNotification(`Updated ${pkg.name}!`);
  };

  const handleUpdatePackageSpecs = (pkg: HostingPackage, specField: string, value: string) => {
    const updated: HostingPackage = {
      ...pkg,
      specs: {
        ...pkg.specs,
        [specField]: value,
      },
    };
    updatePackage(updated);
    showNotification(`Updated specs for ${pkg.name}!`);
  };

  const handleAddNewPackage = (category: 'cpanel' | 'bdix' | 'vps' | 'reseller') => {
    const newId = `pkg-${category}-${Date.now()}`;
    const newPkg: HostingPackage = {
      id: newId,
      name: `Toofan ${category.toUpperCase()} New Plan`,
      category: category,
      tagline: 'High speed performance hosting tier.',
      priceBDTMonthly: 499,
      priceBDTYearly: 4999,
      priceUSDMonthly: 4.50,
      priceUSDYearly: 45.00,
      discountPercent: 20,
      freeDomainOnYearly: true,
      specs: {
        storage: '30 GB NVMe',
        bandwidth: 'Unlimited',
        websites: '3 Websites',
        ram: '2 GB Dedicated RAM',
        cpu: '2 vCPU Cores',
        cpanel: true,
        ssl: true,
        dailyBackup: true,
        litespeed: true,
        inodes: '350,000 Inodes',
        emails: 'Unlimited',
        subdomains: 'Unlimited',
      },
      features: [
        'Gen4 Pure NVMe Storage',
        'LiteSpeed Enterprise Web Cache',
        'Free cPanel & AutoSSL Certificate',
        'Automated Daily JetBackup',
        '24/7 Dedicated Support',
      ],
    };
    addPackage(newPkg);
    if (category === 'cpanel') setEditingCpanelId(newId);
    if (category === 'bdix') setEditingBdixId(newId);
    if (category === 'vps' || category === 'reseller') setEditingVpsId(newId);
    showNotification(`Added new ${category.toUpperCase()} plan!`);
  };

  const handleUpdateEmbPlan = (plan: ServicePlan, field: keyof ServicePlan, value: any) => {
    const updated = {
      ...plan,
      [field]: value,
    };
    updateServicePlan(updated);
    showNotification(`Updated Embroidery Plan: ${plan.name}`);
  };

  const handleAddEmbPlan = () => {
    const newId = `emb-${Date.now()}`;
    const newPlan: ServicePlan = {
      id: newId,
      category: 'embroidery',
      name: 'Custom Embroidery Plan',
      tagline: 'High precision industrial digitizing.',
      badge: 'CUSTOM',
      priceBDT: 850,
      priceUSD: 7.50,
      deliveryTime: '4 - 6 Hours',
      revisions: 'Unlimited Revisions',
      formats: ['.DST', '.EMB', '.PES', '.EXP', '.PDF'],
      features: [
        'Calibrated stitch density compensation',
        '3D stitch preview runsheet',
        'Tested on industrial machines',
        'Unlimited revisions',
      ],
    };
    addServicePlan(newPlan);
    setEditingEmbId(newId);
    showNotification('New Embroidery plan added!');
  };

  const handleUpdateGfxPlan = (plan: ServicePlan, field: keyof ServicePlan, value: any) => {
    const updated = {
      ...plan,
      [field]: value,
    };
    updateServicePlan(updated);
    showNotification(`Updated Graphics Plan: ${plan.name}`);
  };

  const handleAddGfxPlan = () => {
    const newId = `gfx-${Date.now()}`;
    const newPlan: ServicePlan = {
      id: newId,
      category: 'graphics',
      name: 'Custom Graphics Package',
      tagline: 'Creative visual identity and design assets.',
      badge: 'CREATIVE',
      priceBDT: 2500,
      priceUSD: 22.00,
      deliveryTime: '24 - 48 Hours',
      revisions: 'Unlimited Revisions',
      formats: ['.AI', '.PSD', '.SVG', '.PNG', '.PDF'],
      features: [
        'Custom vector concepts',
        'All raw vector master files included',
        '100% commercial copyright ownership',
        'Unlimited fine-tuning revisions',
      ],
    };
    addServicePlan(newPlan);
    setEditingGfxId(newId);
    showNotification('New Graphics plan added!');
  };

  const handleTLDChange = (ext: string, field: keyof DomainTLD, value: any) => {
    const tld = tlds.find((t) => t.extension === ext);
    if (!tld) return;
    updateTLD({
      ...tld,
      [field]: value,
    });
    showNotification(`Updated ${ext} pricing!`);
  };

  const handleAddNewTLD = () => {
    if (!newTldExt.trim()) return;
    const formattedExt = newTldExt.startsWith('.') ? newTldExt.trim().toLowerCase() : `.${newTldExt.trim().toLowerCase()}`;
    const newTld: DomainTLD = {
      extension: formattedExt,
      priceBDTYearly: Number(newTldPriceBDT) || 1000,
      priceUSDYearly: Number(newTldPriceUSD) || 9.99,
      renewalBDTYearly: (Number(newTldPriceBDT) || 1000) + 200,
      renewalUSDYearly: (Number(newTldPriceUSD) || 9.99) + 2,
      popular: false,
    };
    addTLD(newTld);
    setNewTldExt('');
    showNotification(`Added extension ${formattedExt}!`);
  };

  const handleExportData = () => {
    const fullBackup = {
      adminSettings: {
        ...adminSettings,
        loginUrl,
        signupUrl,
        useDirectLinks,
        openInNewTab,
        supportPhone,
        supportWhatsApp,
        supportEmail,
        announcementText,
        showAnnouncement,
        usdToBdtRate,
      },
      packages,
      tlds,
      embroideryPlans,
      graphicsPlans,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toofanhost-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Database Backup JSON exported successfully!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.packages) localStorage.setItem('toofan_packages', JSON.stringify(parsed.packages));
        if (parsed.tlds) localStorage.setItem('toofan_tlds', JSON.stringify(parsed.tlds));
        if (parsed.embroideryPlans) localStorage.setItem('toofan_embroidery_plans', JSON.stringify(parsed.embroideryPlans));
        if (parsed.graphicsPlans) localStorage.setItem('toofan_graphics_plans', JSON.stringify(parsed.graphicsPlans));
        if (parsed.adminSettings) {
          localStorage.setItem('toofan_admin_settings', JSON.stringify(parsed.adminSettings));
          setLoginUrl(parsed.adminSettings.loginUrl);
          setSignupUrl(parsed.adminSettings.signupUrl);
          setUseDirectLinks(parsed.adminSettings.useDirectLinks !== undefined ? parsed.adminSettings.useDirectLinks : true);
          if (parsed.adminSettings.openInNewTab !== undefined) setOpenInNewTab(parsed.adminSettings.openInNewTab);
          updateAdminSettings(parsed.adminSettings);
        }
        showNotification('Data restored successfully! Reloading...');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all packages, embroidery plans, graphics plans, domain prices, and links to initial defaults?')) {
      resetToDefaults();
      setLoginUrl('http://toofanhost.com/clientarea.php');
      setSignupUrl('http://toofanhost.com/register.php');
      setDomainRegisterUrl('https://panel.toofanhost.com/cart.php?a=add&domain=register');
      setDomainTransferUrl('http://toofanhost.com/cart.php?a=add&domain=transfer');
      setUseDirectLinks(true);
      setOpenInNewTab(true);
      showNotification('Reset to factory defaults.');
    }
  };

  const sidebarNavItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'portal-links', label: 'Portal & Button Links', icon: <Link className="w-4 h-4" />, badge: 'DIRECT LINK' },
    { id: 'admin-security', label: 'Admin Security & Password', icon: <KeyRound className="w-4 h-4" />, badge: 'PASSWORD' },
    { id: 'logo-favicon', label: 'Logo & Favicon Icon', icon: <Image className="w-4 h-4" />, badge: 'BRAND' },
    { id: 'footer-settings', label: 'Footer Full Content', icon: <Layout className="w-4 h-4" />, badge: 'FOOTER' },
    { id: 'cpanel-hosting', label: 'NVMe cPanel Hosting', icon: <Zap className="w-4 h-4" />, badge: `${cpanelPackages.length}` },
    { id: 'bdix-hosting', label: 'BDIX Turbo Hosting 🇧🇩', icon: <Server className="w-4 h-4" />, badge: `${bdixPackages.length}` },
    { id: 'vps-reseller', label: 'Cloud VPS & Reseller', icon: <Cloud className="w-4 h-4" />, badge: `${vpsResellerPackages.length}` },
    { id: 'embroidery-plans', label: 'Embroidery Design Plans', icon: <Scissors className="w-4 h-4" />, badge: `${embroideryPlans.length}` },
    { id: 'graphics-plans', label: 'Graphics Design Plans', icon: <Palette className="w-4 h-4" />, badge: `${graphicsPlans.length}` },
    { id: 'domain-tlds', label: 'Domain TLD Prices', icon: <Globe className="w-4 h-4" />, badge: `${tlds.length}` },
    { id: 'button-links', label: 'Global Button Linkups', icon: <MousePointerClick className="w-4 h-4" /> },
    { id: 'contacts-brand', label: 'Contacts & Promo Banner', icon: <Phone className="w-4 h-4" /> },
    { id: 'backup-reset', label: 'Database Backup & Reset', icon: <Download className="w-4 h-4" /> },
  ];

  // If NOT authenticated, render the secure masked password lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060a14] text-slate-100 flex flex-col justify-between relative overflow-hidden select-none font-sans">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-600/20 via-sky-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-600/10 blur-3xl pointer-events-none" />
        
        {/* Top Navbar */}
        <header className="relative z-10 max-w-6xl w-full mx-auto px-4 py-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>← ওয়েবসাইটে ফিরে যান (Exit)</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SECURE ACCESS GATE</span>
            </span>
          </div>
        </header>

        {/* Center Card */}
        <div className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
          <div className={`bg-[#0a0f1d]/90 backdrop-blur-xl border border-slate-800/90 shadow-2xl shadow-cyan-950/50 rounded-3xl p-7 sm:p-9 transition-transform duration-200 ${
            shakeAnimation ? 'translate-x-1 duration-75' : ''
          }`}>
            {/* Header Badge */}
            <div className="flex flex-col items-center text-center">
              {/* Logo or Icon */}
              {adminSettings.logoUrl ? (
                <div className="mb-4 bg-white/95 px-4 py-2 rounded-2xl shadow-md border border-white/20">
                  <img
                    src={adminSettings.logoUrl}
                    alt={adminSettings.brandName || 'ToofanHost'}
                    className="h-10 max-h-12 max-w-[200px] object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/30 mb-4">
                  <div className="w-full h-full bg-[#080d19] rounded-[15px] flex items-center justify-center">
                    <Shield className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
              )}

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-[11px] font-mono font-bold mb-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>RESTRICTED ADMIN PANEL</span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-black text-white tracking-tight">
                এডমিন প্যানেলে প্রবেশ করুন
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে এডমিন পাসওয়ার্ড দিন
              </p>
            </div>

            {/* Error notice */}
            {authError && (
              <div className="mt-5 p-3 rounded-xl bg-rose-950/80 border border-rose-700/80 text-rose-200 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Password input form */}
            <form onSubmit={handleUnlockAdmin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  এডমিন পাসওয়ার্ড (Admin Password):
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4 text-cyan-500" />
                  </div>
                  <input
                    type="password"
                    value={inputPassword}
                    onChange={(e) => {
                      setInputPassword(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="••••••••••••"
                    autoFocus
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#060a14] border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all font-mono tracking-wider"
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>পাসওয়ার্ড সম্পূর্ণ গোপন থাকবে (Masked)</span>
                  <span className="font-mono text-cyan-400/80">Press Enter ↵</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>প্রবেশ করুন (Unlock Dashboard)</span>
              </button>
            </form>

          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 max-w-6xl w-full mx-auto px-4 py-4 text-center text-[11px] text-slate-500 font-mono">
          © {new Date().getFullYear()} {adminSettings.brandName || 'ToofanHost'} • Authorized Administration Only
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-full md:w-72 lg:w-80 bg-white dark:bg-[#0a0f1d] border-r border-slate-200 dark:border-slate-800/90 flex flex-col justify-between shrink-0 shadow-lg md:min-h-screen z-20">
        <div>
          {/* Brand & Admin Badge */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="h-12 flex items-center bg-white/95 px-3 py-1 rounded-xl shadow-xs border border-slate-200 dark:border-white/10">
                  <img
                    src={logoUrl}
                    alt={brandName || 'Logo'}
                    className="h-9 max-h-10 max-w-[170px] object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/25">
                  <div className="w-full h-full bg-white dark:bg-[#090e1a] rounded-[10px] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  {(showLogoText || !logoUrl) && (
                    <span className="font-heading text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {logoTextPrefix || 'TOOFAN'}<span className="text-cyan-600 dark:text-cyan-400">{logoTextSuffix || 'HOST'}</span>
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 font-mono">
                    ADMIN
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Full-Page Dashboard</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Nav Items */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management Modules:
            </div>
            {sidebarNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar Action Items */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 space-y-2.5">
          {/* Return to Live Site Button */}
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Exit to Live Website</span>
          </button>

          {/* Lock Admin Panel (Logout) Button */}
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin Panel (লগআউট)</span>
          </button>

          {/* Theme Toggle & Info */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-mono">Theme: {theme}</span>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto max-h-screen">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">ToofanHost Control Panel</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                {sidebarNavItems.find((i) => i.id === activeTab)?.label}
              </span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {sidebarNavItems.find((i) => i.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Cloud Sync Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cloud Synced (World Live 🌐)</span>
            </div>

            {/* Live Notification Indicator */}
            {saveSuccessNotice && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md animate-in fade-in duration-200">
                <CheckCircle className="w-4 h-4" />
                <span>{saveSuccessNotice}</span>
              </div>
            )}

            <button
              onClick={() => setCurrentPage('home')}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Preview Website</span>
            </button>

            {/* Lock / Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              title="Lock Admin Panel & Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out (লক করুন)</span>
            </button>
          </div>
        </header>

        {/* Tab Workspace */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">

          {/* TAB 1: LOGIN & SIGN UP BUTTON LINKUP */}
          {activeTab === 'portal-links' && (
            <div className="max-w-4xl space-y-6">
              {/* Header Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/10 border border-cyan-400/30 dark:border-cyan-500/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Link className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <span>Login & Sign Up Button Links (লগইন ও সাইন আপ বাটন লিংক)</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      আপনি এখানে আপনার WHMCS Client Area লিংক, বিলিং পোর্টাল অথবা যেকোনো কাস্টম লিংক যুক্ত করতে পারবেন। 
                      ওয়েবসাইটের হেডার ও মোবাইল মেনুর <strong>Login</strong> এবং <strong>Sign Up</strong> বাটনে ক্লিক করলে সরাসরি আপনার দেওয়া লিংকে চলে যাবে।
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                    DIRECT LINK READY ⚡
                  </span>
                </div>
              </div>

              {/* URL Input Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Login Button URL */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
                        <LogIn className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">Login Button URL</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">লগইন বাটনের জন্য লিংক</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-900">
                      Navbar Login
                    </span>
                  </div>

                  <div>
                    <input
                      type="url"
                      value={loginUrl}
                      onChange={(e) => setLoginUrl(e.target.value)}
                      placeholder="http://toofanhost.com/clientarea.php"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      উদাহরণ: <code className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">http://toofanhost.com/clientarea.php</code>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 text-[11px]">
                      {loginUrl ? '✓ Link is set' : '⚠️ No link set'}
                    </span>
                    {loginUrl && (
                      <a
                        href={loginUrl.startsWith('http://') || loginUrl.startsWith('https://') || loginUrl.startsWith('/') || loginUrl.startsWith('#') ? loginUrl : `https://${loginUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1 bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-200 dark:border-cyan-900"
                      >
                        <span>Test Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 2. Sign Up Button URL */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                        <UserPlus className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">Sign Up Button URL</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">সাইন আপ বাটনের জন্য লিংক</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-900">
                      Navbar Sign Up
                    </span>
                  </div>

                  <div>
                    <input
                      type="url"
                      value={signupUrl}
                      onChange={(e) => setSignupUrl(e.target.value)}
                      placeholder="http://toofanhost.com/register.php"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      উদাহরণ: <code className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">http://toofanhost.com/register.php</code>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 text-[11px]">
                      {signupUrl ? '✓ Link is set' : '⚠️ No link set'}
                    </span>
                    {signupUrl && (
                      <a
                        href={signupUrl.startsWith('http://') || signupUrl.startsWith('https://') || signupUrl.startsWith('/') || signupUrl.startsWith('#') ? signupUrl : `https://${signupUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-900"
                      >
                        <span>Test Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 3. Domain Register Button URL */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">Domain Register URL</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">ডোমেন রেজিস্টার সাবমেনুর লিংক</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                      Domain Submenu
                    </span>
                  </div>

                  <div>
                    <input
                      type="url"
                      value={domainRegisterUrl}
                      onChange={(e) => setDomainRegisterUrl(e.target.value)}
                      placeholder="https://panel.toofanhost.com/cart.php?a=add&domain=register"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      উদাহরণ: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">https://panel.toofanhost.com/cart.php?a=add&domain=register</code>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 text-[11px]">
                      {domainRegisterUrl ? '✓ Link is set' : 'Default: Scroll to Domain Search'}
                    </span>
                    {domainRegisterUrl && (
                      <a
                        href={domainRegisterUrl.startsWith('http://') || domainRegisterUrl.startsWith('https://') || domainRegisterUrl.startsWith('/') || domainRegisterUrl.startsWith('#') ? domainRegisterUrl : `https://${domainRegisterUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900"
                      >
                        <span>Test Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 4. Domain Transfer Button URL */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold">
                        <ArrowRightLeft className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">Domain Transfer URL</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">ডোমেন ট্রান্সফার সাবমেনুর লিংক</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-900">
                      Domain Submenu
                    </span>
                  </div>

                  <div>
                    <input
                      type="url"
                      value={domainTransferUrl}
                      onChange={(e) => setDomainTransferUrl(e.target.value)}
                      placeholder="http://toofanhost.com/cart.php?a=add&domain=transfer"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      উদাহরণ: <code className="font-mono text-teal-600 dark:text-teal-400 font-semibold">http://toofanhost.com/cart.php?a=add&domain=transfer</code>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 text-[11px]">
                      {domainTransferUrl ? '✓ Link is set' : 'Default: Interactive Transfer Modal'}
                    </span>
                    {domainTransferUrl && (
                      <a
                        href={domainTransferUrl.startsWith('http://') || domainTransferUrl.startsWith('https://') || domainTransferUrl.startsWith('/') || domainTransferUrl.startsWith('#') ? domainTransferUrl : `https://${domainTransferUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-900"
                      >
                        <span>Test Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Behavior & Target Window Options */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>বাটন ক্লিক করার পর কীভাবে ওপেন হবে? (Link Behavior)</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    কাস্টমার যখন Login বা Sign Up বাটনে ক্লিক করবেন, তখন সরাসরি লিংক নতুন ট্যাবে বা বর্তমান উইন্ডোতে ওপেন হবে।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Direct Open in New Tab */}
                  <label
                    onClick={() => {
                      setUseDirectLinks(true);
                      setOpenInNewTab(true);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      useDirectLinks && openInNewTab
                        ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="linkBehavior"
                      checked={useDirectLinks && openInNewTab}
                      onChange={() => {
                        setUseDirectLinks(true);
                        setOpenInNewTab(true);
                      }}
                      className="mt-1 text-cyan-600 focus:ring-cyan-500"
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Direct Link - New Tab (_blank)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        বাটনে ক্লিক করলে সরাসরি আপনার লিংকে নতুন ব্রাউজার ট্যাবে চলে যাবে।
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Direct Open in Same Tab */}
                  <label
                    onClick={() => {
                      setUseDirectLinks(true);
                      setOpenInNewTab(false);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      useDirectLinks && !openInNewTab
                        ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="linkBehavior"
                      checked={useDirectLinks && !openInNewTab}
                      onChange={() => {
                        setUseDirectLinks(true);
                        setOpenInNewTab(false);
                      }}
                      className="mt-1 text-cyan-600 focus:ring-cyan-500"
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        Direct Link - Same Window (_self)
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        বাটনে ক্লিক করলে বর্তমান ব্রাউজার উইন্ডোতেই আপনার দেওয়া লিংকে যাবে।
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Live Button Preview Card */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-cyan-600" />
                    <span>Live Preview of Navbar Buttons</span>
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    Try clicking to test!
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Preview Login */}
                    <a
                      href={loginUrl || '#'}
                      target={openInNewTab ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <LogIn className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Login</span>
                    </a>

                    {/* Preview Sign Up */}
                    <a
                      href={signupUrl || '#'}
                      target={openInNewTab ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 shadow-md shadow-cyan-500/25 transition-all flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </a>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      Login target: <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{loginUrl || 'None'}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      Sign Up target: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{signupUrl || 'None'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Action */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Save korar sathe sathe live website-e update hoye jabe.
                </span>
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Linkup Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: ADMIN SECURITY & PASSWORD */}
          {activeTab === 'admin-security' && (
            <div className="max-w-4xl space-y-6">
              {/* Header Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 border border-cyan-400/30 dark:border-cyan-500/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <span>Admin Security & Password Settings (এডমিন পাসওয়ার্ড ও সিকিউরিটি)</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      এডমিন প্যানেলে প্রবেশের জন্য শুধুমাত্র পাসওয়ার্ড প্রয়োজন হয়। 
                      টাইপ করার সময় পাসওয়ার্ড সম্পূর্ণ গোপন থাকবে। নিচে আপনি বর্তমান পাসওয়ার্ড দেখতে ও নিজের ইচ্ছামতো নতুন পাসওয়ার্ড সেট করতে পারবেন।
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>PASSWORD PROTECTED</span>
                  </span>
                </div>
              </div>

              {/* Status & Success Alerts */}
              {passwordChangeSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{passwordChangeSuccess}</span>
                </div>
              )}
              {passwordChangeError && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-400 dark:border-rose-700 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{passwordChangeError}</span>
                </div>
              )}

              {/* Grid: Current Password & Change Password Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Current Active Password Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">Current Password</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">বর্তমান সক্রিয় পাসওয়ার্ড</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                      ACTIVE
                    </span>
                  </div>

                  {/* Password Display Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                    <span className="font-mono text-sm font-extrabold text-slate-900 dark:text-white tracking-widest select-all">
                      {showCurrentPassword ? currentAdminPassword : '••••••••••••••••'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                        title={showCurrentPassword ? "লুকান (Hide)" : "দেখুন (Show)"}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyCurrentPassword}
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                        title="Copy Password"
                      >
                        {hasCopiedPassword ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        <span>{hasCopiedPassword ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">রিসেট করতে চাইলে:</span>
                    <button
                      type="button"
                      onClick={handleResetPasswordToDefault}
                      className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                    >
                      Reset to Master Default
                    </button>
                  </div>
                </div>

                {/* 2. Change Password Form Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block">Change Password</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">নতুন পাসওয়ার্ড সেট করুন</span>
                    </div>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="space-y-3.5">
                    {/* New Password Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        New Password (নতুন পাসওয়ার্ড):
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড দিন"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-cyan-500 cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Confirm New Password (পুনরায় লিখুন):
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmAdminPassword}
                          onChange={(e) => setConfirmAdminPassword(e.target.value)}
                          placeholder="নতুন পাসওয়ার্ডটি নিশ্চিত করুন"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-cyan-500 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save New Password (পাসওয়ার্ড সংরক্ষণ করুন)</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* 3. Guide on Accessing Admin Panel */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>কীভাবে এডমিন প্যানেলে ঢুকবেন ও নিরাপদে থাকবেন (Access & Security Tips)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 block font-mono">1. URL দিয়ে প্রবেশ</span>
                    <p className="text-slate-600 dark:text-slate-300">
                      ব্রাউজারের অ্যাড্রেসবারে <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">/admin</code> অথবা <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">#admin</code> লিখলেই পাসওয়ার্ড স্ক্রিন আসবে।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block font-mono">2. কীবোর্ড শর্টকাট</span>
                    <p className="text-slate-600 dark:text-slate-300">
                      যেকোনো পেজে থাকা অবস্থায় কীবোর্ডে <kbd className="font-mono font-bold bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">Ctrl + Shift + A</kbd> চাপলে সাথে সাথে এডমিন পাসওয়ার্ড পেজ খুলবে।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">3. ফুটার লিংক ও লক</span>
                    <p className="text-slate-600 dark:text-slate-300">
                      ওয়েবসাইটের নিচে Client Portal অংশে <span className="font-bold">Admin Panel</span> এ ক্লিক করে ঢুকতে পারেন। কাজ শেষে <span className="text-rose-500 font-bold">Log Out</span> এ ক্লিক করে লক করে রাখুন।
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: LOGO & FAVICON ICON */}
          {activeTab === 'logo-favicon' && (
            <div className="max-w-4xl space-y-8">
              
              {/* Header Box */}
              <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-300 dark:border-cyan-500/30">
                <h3 className="font-bold text-sm text-cyan-900 dark:text-cyan-300 flex items-center gap-2">
                  <Image className="w-4 h-4 text-cyan-600" />
                  <span>Logo & Favicon Icon Customization</span>
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  You requested: <strong className="text-slate-900 dark:text-white">"fabic icon change korar option rako ar logo change er option rako"</strong>.
                  From here you can change your site logo (Navbar, Footer, Admin Header) and the browser tab favicon icon via URL or device upload!
                </p>
              </div>

              {/* 1. FAVICON MANAGEMENT */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-500" />
                      <span>Browser Tab Favicon Icon</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      This icon appears in the browser tab beside the website title.
                    </p>
                  </div>
                  {faviconUrl && (
                    <button
                      onClick={() => {
                        setFaviconUrl('');
                        updateAdminSettings({ ...adminSettings, faviconUrl: '' });
                        showNotification('Favicon reset to default!');
                      }}
                      className="text-xs text-rose-500 hover:text-rose-600 font-bold cursor-pointer"
                    >
                      Reset to Default
                    </button>
                  )}
                </div>

                {/* Live Browser Tab Mockup */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Live Browser Tab Preview:
                  </label>
                  <div className="w-full max-w-md bg-slate-200 dark:bg-slate-900 rounded-t-xl p-2 pb-0 border border-slate-300 dark:border-slate-700">
                    <div className="bg-white dark:bg-[#090e1a] rounded-t-lg px-3 py-2 flex items-center gap-2.5 max-w-[280px] border-t border-x border-slate-300 dark:border-slate-700 shadow-sm">
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                        {faviconUrl ? (
                          <img src={faviconUrl} alt="Favicon" className="w-4 h-4 object-contain rounded-sm" />
                        ) : (
                          <Zap className="w-4 h-4 text-cyan-500" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {brandName || 'ToofanHost'} - Supercharged NVMe
                      </span>
                      <span className="text-slate-400 text-xs ml-auto font-mono">×</span>
                    </div>
                  </div>
                </div>

                {/* Input URL or File Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Favicon Image URL
                    </label>
                    <input
                      type="url"
                      value={faviconUrl}
                      onChange={(e) => setFaviconUrl(e.target.value)}
                      placeholder="https://example.com/favicon.png"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                      Supports .ico, .png, .svg, .jpg
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Or Upload from Device
                    </label>
                    <label className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer bg-slate-50/50 dark:bg-slate-950/50 transition-colors">
                      <UploadCloud className="w-4 h-4 text-cyan-500" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Choose Favicon File...
                      </span>
                      <input
                        type="file"
                        accept=".ico,.png,.svg,.jpg,.jpeg,.webp"
                        onChange={handleFaviconUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                      Converts to base64 & saves locally
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. LOGO MANAGEMENT */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <Image className="w-4 h-4 text-cyan-500" />
                      <span>Primary Brand Logo</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Used in the top navigation bar, footer brand block, and admin panel.
                    </p>
                  </div>
                  {logoUrl && (
                    <button
                      onClick={() => {
                        setLogoUrl('');
                        updateAdminSettings({ ...adminSettings, logoUrl: '' });
                        showNotification('Custom logo cleared! Reverted to default typography & icon.');
                      }}
                      className="text-xs text-rose-500 hover:text-rose-600 font-bold cursor-pointer"
                    >
                      Clear Image Logo
                    </button>
                  )}
                </div>

                {/* Live Logo Preview Box */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Live Logo Preview (Light & Dark mode):
                    </label>
                    <button
                      onClick={() => {
                        setLogoUrl('/assets/aistudio/image_a4a0e821.png');
                        setShowLogoText(false);
                        updateAdminSettings({
                          ...adminSettings,
                          logoUrl: '/assets/aistudio/image_a4a0e821.png',
                          showLogoText: false,
                        });
                        showNotification('Uploaded ToofanHost logo applied (Logo-only mode)!');
                      }}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-bold cursor-pointer"
                    >
                      Use Uploaded Logo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Dark Preview */}
                    <div className="p-4 rounded-xl bg-[#090e1a] border border-slate-800 flex items-center gap-3 min-h-[80px]">
                      {logoUrl ? (
                        <div className={`bg-white/95 px-3 py-1 rounded-xl shadow-xs flex items-center ${
                          logoSize === 'sm' ? 'h-11' :
                          logoSize === 'md' ? 'h-13' :
                          logoSize === 'xl' ? 'h-16' :
                          'h-14' /* lg default */
                        }`}>
                          <img
                            src={logoUrl}
                            alt="Logo"
                            className={`w-auto object-contain ${
                              logoSize === 'sm' ? 'h-8 max-w-[150px]' :
                              logoSize === 'md' ? 'h-9 max-w-[190px]' :
                              logoSize === 'xl' ? 'h-13 max-w-[280px]' :
                              'h-11 max-w-[240px]' /* lg */
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
                          <div className="w-full h-full bg-[#090e1a] rounded-[10px] flex items-center justify-center">
                            <Zap className="w-5 h-5 text-cyan-400" />
                          </div>
                        </div>
                      )}
                      {(showLogoText || !logoUrl) && (
                        <div>
                          <span className="font-heading text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                            {logoTextPrefix || 'TOOFAN'}
                          </span>
                          <span className="font-heading text-lg font-bold text-white">
                            {logoTextSuffix || 'HOST'}
                          </span>
                        </div>
                      )}
                      <span className="ml-auto text-[10px] text-slate-500 font-mono">Dark BG</span>
                    </div>

                    {/* Light Preview */}
                    <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex items-center gap-3 min-h-[80px]">
                      {logoUrl ? (
                        <div className={`bg-white/95 px-3 py-1 rounded-xl shadow-xs flex items-center ${
                          logoSize === 'sm' ? 'h-11' :
                          logoSize === 'md' ? 'h-13' :
                          logoSize === 'xl' ? 'h-16' :
                          'h-14' /* lg default */
                        }`}>
                          <img
                            src={logoUrl}
                            alt="Logo"
                            className={`w-auto object-contain ${
                              logoSize === 'sm' ? 'h-8 max-w-[150px]' :
                              logoSize === 'md' ? 'h-9 max-w-[190px]' :
                              logoSize === 'xl' ? 'h-13 max-w-[280px]' :
                              'h-11 max-w-[240px]' /* lg */
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-[1.5px]">
                          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                            <Zap className="w-5 h-5 text-cyan-600" />
                          </div>
                        </div>
                      )}
                      {(showLogoText || !logoUrl) && (
                        <div>
                          <span className="font-heading text-lg font-extrabold text-cyan-600">
                            {logoTextPrefix || 'TOOFAN'}
                          </span>
                          <span className="font-heading text-lg font-bold text-slate-900">
                            {logoTextSuffix || 'HOST'}
                          </span>
                        </div>
                      )}
                      <span className="ml-auto text-[10px] text-slate-500 font-mono">Light BG</span>
                    </div>
                  </div>
                </div>

                {/* Logo Size Selector Controls */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Logo Display Size:</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 uppercase">
                          {logoSize === 'xl' ? 'Extra Large' : logoSize === 'lg' ? 'Large (Recommended)' : logoSize === 'md' ? 'Medium' : 'Small'}
                        </span>
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                        Logo size controls how big your brand logo appears in the top header and footer.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-850 p-1 rounded-xl self-start sm:self-auto border border-slate-300 dark:border-slate-750">
                      {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setLogoSize(sz)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            logoSize === sz
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-800'
                          }`}
                        >
                          {sz === 'sm' ? 'Small' : sz === 'md' ? 'Medium' : sz === 'lg' ? 'Large ★' : 'Extra Large'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Show/Hide Brand Text Toggle */}
                <div className="p-4 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Brand Text Display:</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        showLogoText ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {showLogoText ? 'Text ON' : 'Logo Only (No Extra Text - User Request)'}
                      </span>
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      User request: <strong>"ami je logo dici oitai thakbe just name ta amar dorkar nai"</strong>.
                      When OFF, only the image logo is rendered without duplicate title text beside it.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700">
                    <input
                      type="checkbox"
                      checked={showLogoText}
                      onChange={(e) => setShowLogoText(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Show Extra Text Beside Logo
                    </span>
                  </label>
                </div>

                {/* Logo Image URL & Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Logo Image URL
                    </label>
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                      Direct image link (PNG transparent recommended)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Or Upload Logo Image
                    </label>
                    <label className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer bg-slate-50/50 dark:bg-slate-950/50 transition-colors">
                      <UploadCloud className="w-4 h-4 text-cyan-500" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Choose Logo File...
                      </span>
                      <input
                        type="file"
                        accept=".png,.svg,.jpg,.jpeg,.webp"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                      Saved in browser storage automatically
                    </span>
                  </div>
                </div>

                {/* Logo Text Settings */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                    Brand Text Customization (Shown with or beside logo):
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Logo Text Prefix (Gradient Color)
                      </label>
                      <input
                        type="text"
                        value={logoTextPrefix}
                        onChange={(e) => setLogoTextPrefix(e.target.value)}
                        placeholder="TOOFAN"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Logo Text Suffix (Bold Solid Color)
                      </label>
                      <input
                        type="text"
                        value={logoTextSuffix}
                        onChange={(e) => setLogoTextSuffix(e.target.value)}
                        placeholder="HOST"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Logo & Favicon Changes</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB: FOOTER FULL CONTENT */}
          {activeTab === 'footer-settings' && (
            <div className="max-w-4xl space-y-8">
              
              {/* Header Box */}
              <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-300 dark:border-cyan-500/30">
                <h3 className="font-bold text-sm text-cyan-900 dark:text-cyan-300 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-cyan-600" />
                  <span>Footer Content & Information Manager</span>
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  You requested: <strong className="text-slate-900 dark:text-white">"fotter er ja kiso ase oitar o akta option add koro side bar e admin pannel e"</strong>.
                  From here you can edit all footer text, company description, status text, payment badges, social media links, and copyright text!
                </p>
              </div>

              {/* 1. Company Description & Status */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-500" />
                  <span>Company Description & Status SLA</span>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Website URL (Shown under Logo in Footer)
                  </label>
                  <input
                    type="text"
                    value={footerWebsiteUrl}
                    onChange={(e) => setFooterWebsiteUrl(e.target.value)}
                    placeholder="http://toofanhost.com/"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Footer About Description Text
                  </label>
                  <textarea
                    rows={3}
                    value={footerAboutText}
                    onChange={(e) => setFooterAboutText(e.target.value)}
                    placeholder="Brief description of ToofanHost infrastructure and services..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Operational Status & SLA Badge Text
                  </label>
                  <input
                    type="text"
                    value={footerStatusText}
                    onChange={(e) => setFooterStatusText(e.target.value)}
                    placeholder="All Systems Operational (99.99% SLA)"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* 2. Social Media Links */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-500" />
                  <span>Social Media Profiles & Communities</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Leave any URL empty if you do not want to display its icon.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Facebook Page URL
                    </label>
                    <input
                      type="url"
                      value={footerFacebookUrl}
                      onChange={(e) => setFooterFacebookUrl(e.target.value)}
                      placeholder="https://facebook.com/toofanhost"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Twitter / X Profile URL
                    </label>
                    <input
                      type="url"
                      value={footerTwitterUrl}
                      onChange={(e) => setFooterTwitterUrl(e.target.value)}
                      placeholder="https://x.com/toofanhost"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      LinkedIn Page URL
                    </label>
                    <input
                      type="url"
                      value={footerLinkedinUrl}
                      onChange={(e) => setFooterLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/company/toofanhost"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      YouTube Channel URL
                    </label>
                    <input
                      type="url"
                      value={footerYoutubeUrl}
                      onChange={(e) => setFooterYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/@toofanhost"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Telegram Support / Channel URL
                    </label>
                    <input
                      type="url"
                      value={footerTelegramUrl}
                      onChange={(e) => setFooterTelegramUrl(e.target.value)}
                      placeholder="https://t.me/toofanhost"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Methods Badges */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-500" />
                  <span>Accepted Payment Method Badges</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add, remove, or reorder the payment gateway badges shown at the bottom of the footer.
                </p>

                {/* Active Badges List */}
                <div className="flex flex-wrap gap-2 items-center">
                  {footerPaymentMethods.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 border border-slate-300 dark:border-slate-700 shadow-sm"
                    >
                      <span>{badge}</span>
                      <button
                        type="button"
                        onClick={() => setFooterPaymentMethods(footerPaymentMethods.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-500 font-mono text-sm leading-none cursor-pointer"
                        title="Remove Badge"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add New Badge Form */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newPaymentInput}
                    onChange={(e) => setNewPaymentInput(e.target.value)}
                    placeholder="e.g. Upay, Bank Transfer, Crypto"
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPaymentInput.trim()) return;
                      setFooterPaymentMethods([...footerPaymentMethods, newPaymentInput.trim()]);
                      setNewPaymentInput('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Badge</span>
                  </button>
                </div>
              </div>

              {/* 4. Copyright Text */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-500" />
                  <span>Footer Copyright & Legal Notice</span>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Bottom Copyright Text
                  </label>
                  <input
                    type="text"
                    value={footerCopyrightText}
                    onChange={(e) => setFooterCopyrightText(e.target.value)}
                    placeholder="© 2026 ToofanHost. All rights reserved."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Footer Settings</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: NVMe CPANEL HOSTING */}
          {activeTab === 'cpanel-hosting' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {cpanelPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setEditingCpanelId(pkg.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedCpanelPkg?.id === pkg.id
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{pkg.name}</span>
                      <span className="ml-1.5 opacity-75 font-mono text-[10px]">৳{pkg.priceBDTMonthly}/m</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleAddNewPackage('cpanel')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add cPanel Plan</span>
                </button>
              </div>

              {selectedCpanelPkg && (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                      Editing: {selectedCpanelPkg.name}
                    </h3>
                    <button
                      onClick={() => {
                        if (confirm(`Delete plan ${selectedCpanelPkg.name}?`)) {
                          deletePackage(selectedCpanelPkg.id);
                          showNotification('Package deleted.');
                        }
                      }}
                      className="px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Plan</span>
                    </button>
                  </div>

                  {/* Plan Name & Tagline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Package Title
                      </label>
                      <input
                        type="text"
                        value={selectedCpanelPkg.name}
                        onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'name', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Badge (e.g. "HOT", "MOST POPULAR")
                      </label>
                      <input
                        type="text"
                        value={selectedCpanelPkg.badge || ''}
                        onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'badge', e.target.value)}
                        placeholder="Leave empty for none"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Short Tagline
                    </label>
                    <input
                      type="text"
                      value={selectedCpanelPkg.tagline}
                      onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'tagline', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Pricing Inputs */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Pricing (BDT ৳ and USD $)</span>
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Price BDT / Month</label>
                        <input
                          type="number"
                          value={selectedCpanelPkg.priceBDTMonthly}
                          onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'priceBDTMonthly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Price BDT / Year</label>
                        <input
                          type="number"
                          value={selectedCpanelPkg.priceBDTYearly}
                          onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'priceBDTYearly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Price USD / Month ($)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={selectedCpanelPkg.priceUSDMonthly}
                          onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'priceUSDMonthly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Price USD / Year ($)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={selectedCpanelPkg.priceUSDYearly}
                          onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'priceUSDYearly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button Order Link */}
                  <div className="p-4 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40">
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <MousePointerClick className="w-4 h-4 text-cyan-600" />
                      <span>Order Button Link for this Package (Optional custom WHMCS link)</span>
                    </label>
                    <input
                      type="url"
                      value={selectedCpanelPkg.orderUrl || ''}
                      onChange={(e) => handleUpdatePackage(selectedCpanelPkg, 'orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/cart.php?a=add&pid=1"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      If left blank, clicking "Order Now" uses the site's interactive configuration cart. If set, it will directly open this URL!
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Storage</label>
                      <input
                        type="text"
                        value={selectedCpanelPkg.specs.storage}
                        onChange={(e) => handleUpdatePackageSpecs(selectedCpanelPkg, 'storage', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Bandwidth</label>
                      <input
                        type="text"
                        value={selectedCpanelPkg.specs.bandwidth}
                        onChange={(e) => handleUpdatePackageSpecs(selectedCpanelPkg, 'bandwidth', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Websites</label>
                      <input
                        type="text"
                        value={selectedCpanelPkg.specs.websites}
                        onChange={(e) => handleUpdatePackageSpecs(selectedCpanelPkg, 'websites', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BDIX TURBO HOSTING */}
          {activeTab === 'bdix-hosting' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {bdixPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setEditingBdixId(pkg.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedBdixPkg?.id === pkg.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{pkg.name}</span>
                      <span className="ml-1.5 opacity-75 font-mono text-[10px]">৳{pkg.priceBDTMonthly}/m</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleAddNewPackage('bdix')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add BDIX Plan</span>
                </button>
              </div>

              {selectedBdixPkg && (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                      Editing: {selectedBdixPkg.name} 🇧🇩
                    </h3>
                    <button
                      onClick={() => {
                        if (confirm(`Delete plan ${selectedBdixPkg.name}?`)) {
                          deletePackage(selectedBdixPkg.id);
                          showNotification('Package deleted.');
                        }
                      }}
                      className="px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Plan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={selectedBdixPkg.name}
                        onChange={(e) => handleUpdatePackage(selectedBdixPkg, 'name', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Badge</label>
                      <input
                        type="text"
                        value={selectedBdixPkg.badge || ''}
                        onChange={(e) => handleUpdatePackage(selectedBdixPkg, 'badge', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">BDT / Month</label>
                        <input
                          type="number"
                          value={selectedBdixPkg.priceBDTMonthly}
                          onChange={(e) => handleUpdatePackage(selectedBdixPkg, 'priceBDTMonthly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">BDT / Year</label>
                        <input
                          type="number"
                          value={selectedBdixPkg.priceBDTYearly}
                          onChange={(e) => handleUpdatePackage(selectedBdixPkg, 'priceBDTYearly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">USD / Month</label>
                        <input
                          type="number"
                          step="0.1"
                          value={selectedBdixPkg.priceUSDMonthly}
                          onChange={(e) => handleUpdatePackage(selectedBdixPkg, 'priceUSDMonthly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">USD / Year</label>
                        <input
                          type="number"
                          step="0.5"
                          value={selectedBdixPkg.priceUSDYearly}
                          onChange={(e) => handleUpdatePackage(selectedBdixPkg, 'priceUSDYearly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button Order Link */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <MousePointerClick className="w-4 h-4 text-emerald-600" />
                      <span>Custom Button Link for this BDIX Package</span>
                    </label>
                    <input
                      type="url"
                      value={selectedBdixPkg.orderUrl || ''}
                      onChange={(e) => handleUpdatePackage(selectedBdixPkg, 'orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/cart.php?a=add&pid=5"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CLOUD VPS & RESELLER */}
          {activeTab === 'vps-reseller' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {vpsResellerPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setEditingVpsId(pkg.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedVpsPkg?.id === pkg.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{pkg.name}</span>
                      <span className="ml-1.5 opacity-75 font-mono text-[10px]">
                        [{pkg.category.toUpperCase()}] ৳{pkg.priceBDTMonthly}/m
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddNewPackage('vps')}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add VPS</span>
                  </button>
                  <button
                    onClick={() => handleAddNewPackage('reseller')}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Reseller</span>
                  </button>
                </div>
              </div>

              {selectedVpsPkg && (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                        Editing: {selectedVpsPkg.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold uppercase">
                        {selectedVpsPkg.category}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete plan ${selectedVpsPkg.name}?`)) {
                          deletePackage(selectedVpsPkg.id);
                          showNotification('Package deleted.');
                        }
                      }}
                      className="px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Plan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={selectedVpsPkg.name}
                        onChange={(e) => handleUpdatePackage(selectedVpsPkg, 'name', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Badge</label>
                      <input
                        type="text"
                        value={selectedVpsPkg.badge || ''}
                        onChange={(e) => handleUpdatePackage(selectedVpsPkg, 'badge', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">BDT / Month</label>
                        <input
                          type="number"
                          value={selectedVpsPkg.priceBDTMonthly}
                          onChange={(e) => handleUpdatePackage(selectedVpsPkg, 'priceBDTMonthly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">BDT / Year</label>
                        <input
                          type="number"
                          value={selectedVpsPkg.priceBDTYearly}
                          onChange={(e) => handleUpdatePackage(selectedVpsPkg, 'priceBDTYearly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">USD / Month</label>
                        <input
                          type="number"
                          step="0.1"
                          value={selectedVpsPkg.priceUSDMonthly}
                          onChange={(e) => handleUpdatePackage(selectedVpsPkg, 'priceUSDMonthly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">USD / Year</label>
                        <input
                          type="number"
                          step="0.5"
                          value={selectedVpsPkg.priceUSDYearly}
                          onChange={(e) => handleUpdatePackage(selectedVpsPkg, 'priceUSDYearly', Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button Order Link */}
                  <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40">
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <MousePointerClick className="w-4 h-4 text-indigo-600" />
                      <span>Custom Button Link for this Plan</span>
                    </label>
                    <input
                      type="url"
                      value={selectedVpsPkg.orderUrl || ''}
                      onChange={(e) => handleUpdatePackage(selectedVpsPkg, 'orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/cart.php?a=add&pid=9"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EMBROIDERY DESIGN PLANS */}
          {activeTab === 'embroidery-plans' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {embroideryPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setEditingEmbId(plan.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedEmbPlan?.id === plan.id
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{plan.name}</span>
                      <span className="ml-1.5 opacity-75 font-mono text-[10px]">৳{plan.priceBDT}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAddEmbPlan}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Embroidery Plan</span>
                </button>
              </div>

              {selectedEmbPlan && (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                      Plan: {selectedEmbPlan.name}
                    </h3>
                    <button
                      onClick={() => {
                        if (confirm(`Delete plan ${selectedEmbPlan.name}?`)) {
                          deleteServicePlan(selectedEmbPlan.id, 'embroidery');
                          showNotification('Plan deleted.');
                        }
                      }}
                      className="px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Plan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={selectedEmbPlan.name}
                        onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'name', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Badge</label>
                      <input
                        type="text"
                        value={selectedEmbPlan.badge || ''}
                        onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'badge', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={selectedEmbPlan.tagline}
                      onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'tagline', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Pricing & Speed */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Price (BDT ৳)</label>
                      <input
                        type="number"
                        value={selectedEmbPlan.priceBDT}
                        onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'priceBDT', Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Price (USD $)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={selectedEmbPlan.priceUSD}
                        onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'priceUSD', Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Turnaround</label>
                      <input
                        type="text"
                        value={selectedEmbPlan.deliveryTime}
                        onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'deliveryTime', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Revisions</label>
                      <input
                        type="text"
                        value={selectedEmbPlan.revisions}
                        onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'revisions', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Button Order Link */}
                  <div className="p-4 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40">
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <MousePointerClick className="w-4 h-4 text-cyan-600" />
                      <span>Custom Button Link for this Embroidery Plan (Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={selectedEmbPlan.orderUrl || ''}
                      onChange={(e) => handleUpdateEmbPlan(selectedEmbPlan, 'orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/order-embroidery"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: GRAPHICS DESIGN PLANS */}
          {activeTab === 'graphics-plans' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {graphicsPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setEditingGfxId(plan.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedGfxPlan?.id === plan.id
                          ? 'bg-pink-600 text-white border-pink-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{plan.name}</span>
                      <span className="ml-1.5 opacity-75 font-mono text-[10px]">৳{plan.priceBDT}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAddGfxPlan}
                  className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Graphics Plan</span>
                </button>
              </div>

              {selectedGfxPlan && (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                      Plan: {selectedGfxPlan.name}
                    </h3>
                    <button
                      onClick={() => {
                        if (confirm(`Delete plan ${selectedGfxPlan.name}?`)) {
                          deleteServicePlan(selectedGfxPlan.id, 'graphics');
                          showNotification('Plan deleted.');
                        }
                      }}
                      className="px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Plan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={selectedGfxPlan.name}
                        onChange={(e) => handleUpdateGfxPlan(selectedGfxPlan, 'name', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Badge</label>
                      <input
                        type="text"
                        value={selectedGfxPlan.badge || ''}
                        onChange={(e) => handleUpdateGfxPlan(selectedGfxPlan, 'badge', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Price (BDT ৳)</label>
                      <input
                        type="number"
                        value={selectedGfxPlan.priceBDT}
                        onChange={(e) => handleUpdateGfxPlan(selectedGfxPlan, 'priceBDT', Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Price (USD $)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={selectedGfxPlan.priceUSD}
                        onChange={(e) => handleUpdateGfxPlan(selectedGfxPlan, 'priceUSD', Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Turnaround</label>
                      <input
                        type="text"
                        value={selectedGfxPlan.deliveryTime}
                        onChange={(e) => handleUpdateGfxPlan(selectedGfxPlan, 'deliveryTime', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Revisions</label>
                      <input
                        type="text"
                        value={selectedGfxPlan.revisions}
                        onChange={(e) => handleUpdateGfxPlan(selectedGfxPlan, 'revisions', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Button Order Link */}
                  <div className="p-4 rounded-xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800/40">
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <MousePointerClick className="w-4 h-4 text-pink-600" />
                      <span>Custom Button Link for this Graphics Plan (Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={selectedGfxPlan.orderUrl || ''}
                      onChange={(e) => handleUpdateGfxPlan(selectedGfxPlan, 'orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/order-graphics"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: DOMAIN TLDS */}
          {activeTab === 'domain-tlds' && (
            <div className="max-w-4xl space-y-6">
              {/* Add New TLD Form */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-cyan-600" />
                  <span>Add New Domain Extension</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newTldExt}
                    onChange={(e) => setNewTldExt(e.target.value)}
                    placeholder="Extension (e.g. .app, .ai, .bd)"
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                  />
                  <input
                    type="number"
                    value={newTldPriceBDT}
                    onChange={(e) => setNewTldPriceBDT(e.target.value)}
                    placeholder="Price BDT"
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                  />
                  <input
                    type="number"
                    step="0.5"
                    value={newTldPriceUSD}
                    onChange={(e) => setNewTldPriceUSD(e.target.value)}
                    placeholder="Price USD"
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={handleAddNewTLD}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add TLD</span>
                  </button>
                </div>
              </div>

              {/* TLD List Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1424] shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Extension</th>
                      <th className="py-3.5 px-4">Register (BDT ৳)</th>
                      <th className="py-3.5 px-4">Register (USD $)</th>
                      <th className="py-3.5 px-4">Renewal (BDT ৳)</th>
                      <th className="py-3.5 px-4">Renewal (USD $)</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tlds.map((tld) => (
                      <tr key={tld.extension} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                          {tld.extension}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={tld.priceBDTYearly}
                            onChange={(e) => handleTLDChange(tld.extension, 'priceBDTYearly', Number(e.target.value))}
                            className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            step="0.5"
                            value={tld.priceUSDYearly}
                            onChange={(e) => handleTLDChange(tld.extension, 'priceUSDYearly', Number(e.target.value))}
                            className="w-20 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={tld.renewalBDTYearly}
                            onChange={(e) => handleTLDChange(tld.extension, 'renewalBDTYearly', Number(e.target.value))}
                            className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            step="0.5"
                            value={tld.renewalUSDYearly}
                            onChange={(e) => handleTLDChange(tld.extension, 'renewalUSDYearly', Number(e.target.value))}
                            className="w-20 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${tld.extension}?`)) {
                                deleteTLD(tld.extension);
                                showNotification(`Deleted ${tld.extension}`);
                              }
                            }}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: GLOBAL BUTTON LINKUPS */}
          {activeTab === 'button-links' && (
            <div className="max-w-4xl space-y-6">
              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40">
                <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                  <MousePointerClick className="w-4 h-4 text-indigo-600" />
                  <span>Global Button Linkup Manager</span>
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Easily attach custom URLs to key call-to-action buttons across the entire website.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    Navbar "Login" Button URL
                  </label>
                  <input
                    type="url"
                    value={loginUrl}
                    onChange={(e) => setLoginUrl(e.target.value)}
                    placeholder="http://toofanhost.com/clientarea.php"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    Navbar "Sign Up" Button URL
                  </label>
                  <input
                    type="url"
                    value={signupUrl}
                    onChange={(e) => setSignupUrl(e.target.value)}
                    placeholder="http://toofanhost.com/register.php"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    WhatsApp Chat Button Link
                  </label>
                  <input
                    type="text"
                    value={supportWhatsApp}
                    onChange={(e) => setSupportWhatsApp(e.target.value)}
                    placeholder="+8801700000000"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    Support Hotline Link
                  </label>
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    placeholder="+880 1700-000000"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Button Linkups</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: CONTACTS & BRAND */}
          {activeTab === 'contacts-brand' && (
            <div className="max-w-4xl space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Brand & Support Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">USD to BDT Currency Rate (৳)</label>
                    <input
                      type="number"
                      value={usdToBdtRate}
                      onChange={(e) => setUsdToBdtRate(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Support WhatsApp</label>
                    <input
                      type="text"
                      value={supportWhatsApp}
                      onChange={(e) => setSupportWhatsApp(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Top Announcement Banner Promo Text</label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: BACKUP & RESET */}
          {activeTab === 'backup-reset' && (
            <div className="max-w-4xl space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span>Full Database Backup & JSON Restore</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Export all your customized hosting prices, embroidery digitizing plans, graphic design packages, custom button linkups, and portal URLs into a single backup JSON file, or restore them anytime.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportData}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Full Data (JSON)</span>
                  </button>

                  <label className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-cyan-500" />
                    <span>Import / Restore Data (JSON)</span>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>

                  <button
                    onClick={handleResetDefaults}
                    className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ml-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All to Initial Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
};
