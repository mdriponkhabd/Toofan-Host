import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HostingPackage, DomainTLD, AdminSettings, ServicePlan } from '../types';
import {
  X,
  Settings,
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
  Shield
} from 'lucide-react';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
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
    currency
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'links' | 'packages' | 'embroidery' | 'graphics' | 'domains' | 'general'
  >('links');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Form states for general settings & linkups
  const [loginUrl, setLoginUrl] = useState(adminSettings.loginUrl);
  const [signupUrl, setSignupUrl] = useState(adminSettings.signupUrl);
  const [useDirectLinks, setUseDirectLinks] = useState(adminSettings.useDirectLinks);
  const [brandName, setBrandName] = useState(adminSettings.brandName);
  const [supportPhone, setSupportPhone] = useState(adminSettings.supportPhone);
  const [supportWhatsApp, setSupportWhatsApp] = useState(adminSettings.supportWhatsApp);
  const [supportEmail, setSupportEmail] = useState(adminSettings.supportEmail);
  const [announcementText, setAnnouncementText] = useState(adminSettings.announcementText);
  const [showAnnouncement, setShowAnnouncement] = useState(adminSettings.showAnnouncement);
  const [usdToBdtRate, setUsdToBdtRate] = useState(adminSettings.usdToBdtRate || 122);

  // Selected hosting package being edited
  const [hostingFilter, setHostingFilter] = useState<'all' | 'cpanel' | 'bdix' | 'vps' | 'reseller'>('all');
  const filteredPackages = hostingFilter === 'all' ? packages : packages.filter((p) => p.category === hostingFilter);
  const [editingPkgId, setEditingPkgId] = useState<string>(packages[0]?.id || '');
  const selectedPkg = packages.find((p) => p.id === editingPkgId) || filteredPackages[0] || packages[0];

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

  if (!isAdminModalOpen) return null;

  const showNotification = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => {
      setSaveSuccessNotice(null);
    }, 2500);
  };

  const handleSaveLinksAndGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings({
      ...adminSettings,
      loginUrl,
      signupUrl,
      useDirectLinks,
      brandName,
      supportPhone,
      supportWhatsApp,
      supportEmail,
      announcementText,
      showAnnouncement,
      usdToBdtRate,
    });
    showNotification('Settings & Button Linkup URLs updated successfully!');
  };

  // Hosting updates
  const handleUpdatePackageField = (field: keyof HostingPackage, value: any) => {
    if (!selectedPkg) return;
    const updated = {
      ...selectedPkg,
      [field]: value,
    };
    updatePackage(updated);
    showNotification(`Updated ${selectedPkg.name}!`);
  };

  const handleUpdatePackageSpecs = (specField: string, value: string) => {
    if (!selectedPkg) return;
    const updated: HostingPackage = {
      ...selectedPkg,
      specs: {
        ...selectedPkg.specs,
        [specField]: value,
      },
    };
    updatePackage(updated);
    showNotification(`Updated specs for ${selectedPkg.name}!`);
  };

  const handleAddNewPackage = () => {
    const newId = `pkg-${Date.now()}`;
    const newPkg: HostingPackage = {
      id: newId,
      name: 'Toofan Pro Tier',
      category: (hostingFilter === 'all' ? 'cpanel' : hostingFilter) as any,
      tagline: 'High speed performance hosting tier.',
      priceBDTMonthly: 450,
      priceBDTYearly: 4200,
      priceUSDMonthly: 3.80,
      priceUSDYearly: 36.00,
      discountPercent: 20,
      freeDomainOnYearly: true,
      specs: {
        storage: '25 GB NVMe',
        bandwidth: 'Unlimited',
        websites: '3 Websites',
        ram: '2 GB Dedicated RAM',
        cpu: '2 vCPU Cores',
        cpanel: true,
        ssl: true,
        dailyBackup: true,
        litespeed: true,
        inodes: '300,000 Inodes',
        emails: 'Unlimited',
        subdomains: 'Unlimited',
      },
      features: [
        'Gen4 Pure NVMe Storage',
        'LiteSpeed Web Server',
        'Free cPanel & AutoSSL',
        'Automated Daily Backup',
      ],
    };
    addPackage(newPkg);
    setEditingPkgId(newId);
    showNotification('New Hosting Package created!');
  };

  // Embroidery updates
  const handleUpdateEmbPlan = (field: keyof ServicePlan, value: any) => {
    if (!selectedEmbPlan) return;
    const updated = {
      ...selectedEmbPlan,
      [field]: value,
    };
    updateServicePlan(updated);
    showNotification(`Updated Embroidery Plan: ${selectedEmbPlan.name}`);
  };

  const handleAddEmbPlan = () => {
    const newId = `emb-${Date.now()}`;
    const newPlan: ServicePlan = {
      id: newId,
      category: 'embroidery',
      name: 'New Embroidery Service',
      tagline: 'Custom calibrated digitizing and stitch engineering.',
      badge: 'CUSTOM',
      priceBDT: 800,
      priceUSD: 7.00,
      deliveryTime: '4 - 6 Hours',
      revisions: 'Unlimited Revisions',
      formats: ['.DST', '.EMB', '.PES', '.EXP', '.PDF'],
      features: [
        'Precision stitch density compensation',
        'Clean vector outlines and color run-sheet',
        'Tested on industrial embroidery machines',
        'Unlimited free revisions',
      ],
    };
    addServicePlan(newPlan);
    setEditingEmbId(newId);
    showNotification('New Embroidery Plan added!');
  };

  // Graphics updates
  const handleUpdateGfxPlan = (field: keyof ServicePlan, value: any) => {
    if (!selectedGfxPlan) return;
    const updated = {
      ...selectedGfxPlan,
      [field]: value,
    };
    updateServicePlan(updated);
    showNotification(`Updated Graphics Plan: ${selectedGfxPlan.name}`);
  };

  const handleAddGfxPlan = () => {
    const newId = `gfx-${Date.now()}`;
    const newPlan: ServicePlan = {
      id: newId,
      category: 'graphics',
      name: 'Custom Creative Package',
      tagline: 'High-impact visuals and brand identity.',
      badge: 'CREATIVE',
      priceBDT: 2000,
      priceUSD: 18.00,
      deliveryTime: '24 - 48 Hours',
      revisions: 'Unlimited Revisions',
      formats: ['.AI', '.PSD', '.SVG', '.PNG', '.PDF'],
      features: [
        'Custom vector concepts and variations',
        'All raw vector files included',
        '100% commercial copyright ownership',
        'Dedicated senior graphic designer',
      ],
    };
    addServicePlan(newPlan);
    setEditingGfxId(newId);
    showNotification('New Graphics Plan added!');
  };

  // TLD updates
  const handleTLDPriceChange = (ext: string, field: keyof DomainTLD, value: any) => {
    const tld = tlds.find((t) => t.extension === ext);
    if (!tld) return;
    updateTLD({
      ...tld,
      [field]: value,
    });
    showNotification(`Updated pricing for ${ext}!`);
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

  // Export / Import Backup JSON
  const handleExportData = () => {
    const fullBackup = {
      adminSettings: {
        ...adminSettings,
        loginUrl,
        signupUrl,
        useDirectLinks,
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
    showNotification('Backup JSON exported successfully!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.packages) {
          localStorage.setItem('toofan_packages', JSON.stringify(parsed.packages));
        }
        if (parsed.tlds) {
          localStorage.setItem('toofan_tlds', JSON.stringify(parsed.tlds));
        }
        if (parsed.embroideryPlans) {
          localStorage.setItem('toofan_embroidery_plans', JSON.stringify(parsed.embroideryPlans));
        }
        if (parsed.graphicsPlans) {
          localStorage.setItem('toofan_graphics_plans', JSON.stringify(parsed.graphicsPlans));
        }
        if (parsed.adminSettings) {
          localStorage.setItem('toofan_admin_settings', JSON.stringify(parsed.adminSettings));
          setLoginUrl(parsed.adminSettings.loginUrl);
          setSignupUrl(parsed.adminSettings.signupUrl);
          setUseDirectLinks(parsed.adminSettings.useDirectLinks);
          updateAdminSettings(parsed.adminSettings);
        }
        showNotification('Data imported successfully! Reloading...');
        setTimeout(() => window.location.reload(), 1200);
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all hosting packages, embroidery & graphics plans, domain prices, and links to initial defaults?')) {
      resetToDefaults();
      setLoginUrl('http://toofanhost.com/clientarea.php');
      setSignupUrl('http://toofanhost.com/register.php');
      setUseDirectLinks(false);
      showNotification('Reset to factory defaults.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#090e1a] border border-slate-200 dark:border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-[#0c1424] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  ToofanHost Business Admin Panel
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-mono">
                  LIVE EDIT ALL
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Change prices and details for Hosting, Embroidery Design, Graphics Design, Domains, and URLs.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Notification */}
        {saveSuccessNotice && (
          <div className="bg-emerald-500 text-white font-bold text-xs py-2 px-4 text-center flex items-center justify-center gap-2 animate-in fade-in duration-150">
            <CheckCircle className="w-4 h-4" />
            <span>{saveSuccessNotice}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 sm:px-6 gap-1 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('links')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'links'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>1. Login & Sign Up Links</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'packages'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>2. Hosting Packages ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('embroidery')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'embroidery'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>3. Embroidery Plans ({embroideryPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('graphics')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'graphics'
                ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>4. Graphics Plans ({graphicsPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('domains')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'domains'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>5. Domain TLDs ({tlds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>6. General & Backup</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* TAB 1: LOGIN & SIGN UP BUTTON LINKUP */}
          {activeTab === 'links' && (
            <form onSubmit={handleSaveLinksAndGeneral} className="space-y-6">
              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-300 dark:border-cyan-500/30 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-cyan-800 dark:text-cyan-300">⚡ Client Portal Linkup Setup:</span>
                <p className="mt-1">
                  Enter your client portal, WHMCS, or custom billing URLs below. Whenever users click <strong>Login</strong> or <strong>Sign Up</strong>, they will be routed to these exact links.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Login Button URL */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                      <Link className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Login Button Target URL</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Where the Login button directs</p>
                    </div>
                  </div>

                  <input
                    type="url"
                    value={loginUrl}
                    onChange={(e) => setLoginUrl(e.target.value)}
                    placeholder="http://toofanhost.com/clientarea.php"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Example: <code className="text-cyan-600 dark:text-cyan-300 font-mono">http://toofanhost.com/clientarea.php</code>
                  </div>
                </div>

                {/* Sign Up Button URL */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Link className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Sign Up Button Target URL</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Where the Sign Up button directs</p>
                    </div>
                  </div>

                  <input
                    type="url"
                    value={signupUrl}
                    onChange={(e) => setSignupUrl(e.target.value)}
                    placeholder="http://toofanhost.com/register.php"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Example: <code className="text-cyan-600 dark:text-cyan-300 font-mono">http://toofanhost.com/register.php</code>
                  </div>
                </div>
              </div>

              {/* Action Mode Toggle */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Button Click Behavior</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose whether buttons directly navigate to the URLs in a new tab, or open the sleek modal dialog.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                    <input
                      type="radio"
                      name="directLinks"
                      checked={useDirectLinks}
                      onChange={() => setUseDirectLinks(true)}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>Direct Open External Link</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                    <input
                      type="radio"
                      name="directLinks"
                      checked={!useDirectLinks}
                      onChange={() => setUseDirectLinks(false)}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>Interactive Dialog Modal</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Link Settings</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: HOSTING PACKAGES & PRICES (ALL 12 PACKAGES) */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  {(['all', 'cpanel', 'bdix', 'vps', 'reseller'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setHostingFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                        hostingFilter === cat
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {cat === 'all' ? 'All Plans' : cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAddNewPackage}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Hosting Plan</span>
                </button>
              </div>

              {/* Package Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {filteredPackages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setEditingPkgId(p.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                      editingPkgId === p.id
                        ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-700 dark:text-cyan-400 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="ml-1.5 opacity-60 font-mono text-[10px]">
                      ৳{p.priceBDTMonthly}/m
                    </span>
                  </button>
                ))}
              </div>

              {selectedPkg && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-6">
                  {/* Top Info */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Editing: {selectedPkg.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                          {selectedPkg.category}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Package ID: <code className="font-mono text-cyan-600 dark:text-cyan-400">{selectedPkg.id}</code>
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete plan ${selectedPkg.name}?`)) {
                          deletePackage(selectedPkg.id);
                          showNotification('Package deleted.');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Plan</span>
                    </button>
                  </div>

                  {/* Plan Name & Tagline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Package Display Name
                      </label>
                      <input
                        type="text"
                        value={selectedPkg.name}
                        onChange={(e) => handleUpdatePackageField('name', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Badge Text (e.g. "HOT", "2ms ULTRA FAST")
                      </label>
                      <input
                        type="text"
                        value={selectedPkg.badge || ''}
                        onChange={(e) => handleUpdatePackageField('badge', e.target.value)}
                        placeholder="Leave blank for none"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tagline / Short Description
                    </label>
                    <input
                      type="text"
                      value={selectedPkg.tagline}
                      onChange={(e) => handleUpdatePackageField('tagline', e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Pricing Inputs (BDT & USD) */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Live Price Settings (BDT ৳ & USD $)</span>
                    </h5>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Price BDT / Month
                        </label>
                        <input
                          type="number"
                          value={selectedPkg.priceBDTMonthly}
                          onChange={(e) => handleUpdatePackageField('priceBDTMonthly', Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Price BDT / Year
                        </label>
                        <input
                          type="number"
                          value={selectedPkg.priceBDTYearly}
                          onChange={(e) => handleUpdatePackageField('priceBDTYearly', Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Price USD / Month ($)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={selectedPkg.priceUSDMonthly}
                          onChange={(e) => handleUpdatePackageField('priceUSDMonthly', Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Price USD / Year ($)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={selectedPkg.priceUSDYearly}
                          onChange={(e) => handleUpdatePackageField('priceUSDYearly', Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Server & Resource Specifications
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">NVMe Storage</label>
                        <input
                          type="text"
                          value={selectedPkg.specs.storage}
                          onChange={(e) => handleUpdatePackageSpecs('storage', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Bandwidth</label>
                        <input
                          type="text"
                          value={selectedPkg.specs.bandwidth}
                          onChange={(e) => handleUpdatePackageSpecs('bandwidth', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Websites Allowed</label>
                        <input
                          type="text"
                          value={selectedPkg.specs.websites}
                          onChange={(e) => handleUpdatePackageSpecs('websites', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">RAM</label>
                        <input
                          type="text"
                          value={selectedPkg.specs.ram}
                          onChange={(e) => handleUpdatePackageSpecs('ram', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">CPU Cores</label>
                        <input
                          type="text"
                          value={selectedPkg.specs.cpu}
                          onChange={(e) => handleUpdatePackageSpecs('cpu', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Inodes Limit</label>
                        <input
                          type="text"
                          value={selectedPkg.specs.inodes}
                          onChange={(e) => handleUpdatePackageSpecs('inodes', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Order URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Direct WHMCS Order Link (Optional override)
                    </label>
                    <input
                      type="url"
                      value={selectedPkg.orderUrl || ''}
                      onChange={(e) => handleUpdatePackageField('orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/cart.php?a=add&pid=1"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EMBROIDERY DESIGN PLANS & PRICING (USER REQUESTED) */}
          {activeTab === 'embroidery' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-300 dark:border-cyan-500/30 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-bold text-cyan-800 dark:text-cyan-300">
                    🧵 Embroidery Digitizing & Design Plans:
                  </span>
                  <p className="mt-0.5">
                    Configure names, prices in BDT/USD, turnaround times, formats, and WhatsApp order messages.
                  </p>
                </div>
                <button
                  onClick={handleAddEmbPlan}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Plan</span>
                </button>
              </div>

              {/* Plan Selection Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {embroideryPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setEditingEmbId(plan.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                      editingEmbId === plan.id
                        ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-700 dark:text-cyan-400 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span>{plan.name}</span>
                    <span className="ml-1.5 opacity-70 font-mono text-[10px]">৳{plan.priceBDT}</span>
                  </button>
                ))}
              </div>

              {selectedEmbPlan && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Plan: {selectedEmbPlan.name}
                    </h4>
                    <button
                      onClick={() => {
                        if (confirm(`Delete embroidery plan ${selectedEmbPlan.name}?`)) {
                          deleteServicePlan(selectedEmbPlan.id, 'embroidery');
                          showNotification('Embroidery plan deleted.');
                        }
                      }}
                      className="px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Plan Title
                      </label>
                      <input
                        type="text"
                        value={selectedEmbPlan.name}
                        onChange={(e) => handleUpdateEmbPlan('name', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Badge (e.g. "QUICK 2-4 HRS", "POPULAR")
                      </label>
                      <input
                        type="text"
                        value={selectedEmbPlan.badge || ''}
                        onChange={(e) => handleUpdateEmbPlan('badge', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tagline / Description
                    </label>
                    <input
                      type="text"
                      value={selectedEmbPlan.tagline}
                      onChange={(e) => handleUpdateEmbPlan('tagline', e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Pricing & Speed */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Price (BDT ৳)
                      </label>
                      <input
                        type="number"
                        value={selectedEmbPlan.priceBDT}
                        onChange={(e) => handleUpdateEmbPlan('priceBDT', Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Price (USD $)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={selectedEmbPlan.priceUSD}
                        onChange={(e) => handleUpdateEmbPlan('priceUSD', Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Turnaround Time
                      </label>
                      <input
                        type="text"
                        value={selectedEmbPlan.deliveryTime}
                        onChange={(e) => handleUpdateEmbPlan('deliveryTime', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Revisions Guarantee
                      </label>
                      <input
                        type="text"
                        value={selectedEmbPlan.revisions}
                        onChange={(e) => handleUpdateEmbPlan('revisions', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Custom Order URL override */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Direct Order URL (Optional override)
                    </label>
                    <input
                      type="url"
                      value={selectedEmbPlan.orderUrl || ''}
                      onChange={(e) => handleUpdateEmbPlan('orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/order-embroidery"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GRAPHICS DESIGN PLANS & PRICING (USER REQUESTED) */}
          {activeTab === 'graphics' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/20 border border-pink-300 dark:border-pink-500/30 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-bold text-pink-800 dark:text-pink-300">
                    🎨 Creative Graphics Design & Branding Packages:
                  </span>
                  <p className="mt-0.5">
                    Update prices in BDT/USD, delivery times, source formats, and inclusions for logos, social media, and UI/UX.
                  </p>
                </div>
                <button
                  onClick={handleAddGfxPlan}
                  className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Plan</span>
                </button>
              </div>

              {/* Plan Selection Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {graphicsPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setEditingGfxId(plan.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                      editingGfxId === plan.id
                        ? 'bg-pink-50 dark:bg-pink-950/60 border-pink-500 text-pink-700 dark:text-pink-400 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span>{plan.name}</span>
                    <span className="ml-1.5 opacity-70 font-mono text-[10px]">৳{plan.priceBDT}</span>
                  </button>
                ))}
              </div>

              {selectedGfxPlan && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Plan: {selectedGfxPlan.name}
                    </h4>
                    <button
                      onClick={() => {
                        if (confirm(`Delete graphics plan ${selectedGfxPlan.name}?`)) {
                          deleteServicePlan(selectedGfxPlan.id, 'graphics');
                          showNotification('Graphics plan deleted.');
                        }
                      }}
                      className="px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Package Title
                      </label>
                      <input
                        type="text"
                        value={selectedGfxPlan.name}
                        onChange={(e) => handleUpdateGfxPlan('name', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Badge (e.g. "BEST VALUE ⚡", "FIGMA PRO")
                      </label>
                      <input
                        type="text"
                        value={selectedGfxPlan.badge || ''}
                        onChange={(e) => handleUpdateGfxPlan('badge', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tagline / Description
                    </label>
                    <input
                      type="text"
                      value={selectedGfxPlan.tagline}
                      onChange={(e) => handleUpdateGfxPlan('tagline', e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Pricing & Speed */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Price (BDT ৳)
                      </label>
                      <input
                        type="number"
                        value={selectedGfxPlan.priceBDT}
                        onChange={(e) => handleUpdateGfxPlan('priceBDT', Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Price (USD $)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={selectedGfxPlan.priceUSD}
                        onChange={(e) => handleUpdateGfxPlan('priceUSD', Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Delivery Time
                      </label>
                      <input
                        type="text"
                        value={selectedGfxPlan.deliveryTime}
                        onChange={(e) => handleUpdateGfxPlan('deliveryTime', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Revisions Guarantee
                      </label>
                      <input
                        type="text"
                        value={selectedGfxPlan.revisions}
                        onChange={(e) => handleUpdateGfxPlan('revisions', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Custom Order URL override */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Direct Order URL (Optional override)
                    </label>
                    <input
                      type="url"
                      value={selectedGfxPlan.orderUrl || ''}
                      onChange={(e) => handleUpdateGfxPlan('orderUrl', e.target.value)}
                      placeholder="e.g. http://toofanhost.com/order-graphics"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DOMAIN TLD PRICES */}
          {activeTab === 'domains' && (
            <div className="space-y-6">
              {/* Add New TLD Form */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-cyan-600" />
                  <span>Add New Domain TLD Extension</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <input
                      type="text"
                      value={newTldExt}
                      onChange={(e) => setNewTldExt(e.target.value)}
                      placeholder="e.g. .app, .ai, .bd"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={newTldPriceBDT}
                      onChange={(e) => setNewTldPriceBDT(e.target.value)}
                      placeholder="BDT Price"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.5"
                      value={newTldPriceUSD}
                      onChange={(e) => setNewTldPriceUSD(e.target.value)}
                      placeholder="USD Price"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleAddNewTLD}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Extension</span>
                  </button>
                </div>
              </div>

              {/* TLD List Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Extension</th>
                      <th className="py-3 px-4">Register (BDT ৳)</th>
                      <th className="py-3 px-4">Register (USD $)</th>
                      <th className="py-3 px-4">Renewal (BDT ৳)</th>
                      <th className="py-3 px-4">Renewal (USD $)</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                    {tlds.map((tld) => (
                      <tr key={tld.extension} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                          {tld.extension}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={tld.priceBDTYearly}
                            onChange={(e) => handleTLDPriceChange(tld.extension, 'priceBDTYearly', Number(e.target.value))}
                            className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            step="0.5"
                            value={tld.priceUSDYearly}
                            onChange={(e) => handleTLDPriceChange(tld.extension, 'priceUSDYearly', Number(e.target.value))}
                            className="w-20 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={tld.renewalBDTYearly}
                            onChange={(e) => handleTLDPriceChange(tld.extension, 'renewalBDTYearly', Number(e.target.value))}
                            className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            step="0.5"
                            value={tld.renewalUSDYearly}
                            onChange={(e) => handleTLDPriceChange(tld.extension, 'renewalUSDYearly', Number(e.target.value))}
                            className="w-20 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-mono text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${tld.extension}?`)) {
                                deleteTLD(tld.extension);
                                showNotification(`Removed ${tld.extension}`);
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

          {/* TAB 6: GENERAL & BACKUP (BACKUP / EXPORT / IMPORT / RESET) */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Contact Information & Branding */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-500" />
                  <span>Support Contacts & Live Rate</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Support WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={supportWhatsApp}
                      onChange={(e) => setSupportWhatsApp(e.target.value)}
                      placeholder="+8801700000000"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Phone Hotline
                    </label>
                    <input
                      type="text"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      placeholder="+880 1700-000000"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      USD to BDT Rate (৳)
                    </label>
                    <input
                      type="number"
                      value={usdToBdtRate}
                      onChange={(e) => setUsdToBdtRate(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Top Announcement Bar Promo Text
                  </label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveLinksAndGeneral}
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Contact Settings</span>
                  </button>
                </div>
              </div>

              {/* Data Export & Backup Tools */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span>Full Database Backup & Restore</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Export all your customized hosting prices, embroidery and graphics design plans, domain pricing, and link settings to a single backup JSON file, or restore them anytime.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportData}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Full Data (JSON)</span>
                  </button>

                  <label className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-cyan-500" />
                    <span>Import Data (JSON)</span>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>

                  <button
                    onClick={handleResetDefaults}
                    className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ml-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#0c1424] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Changes persist immediately to local storage across all pages.</span>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold transition-colors cursor-pointer"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
