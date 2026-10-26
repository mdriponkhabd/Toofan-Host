import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Globe,
  Server,
  Cloud,
  ShoppingCart,
  LogIn,
  UserPlus,
  Menu,
  X,
  Gauge,
  ChevronDown,
  Briefcase,
  Palette,
  Scissors,
  Home,
  ArrowRightLeft,
  Tag
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    triggerAuthButtonClick,
    currency,
    setCurrency,
    theme,
    currentPage,
    setCurrentPage,
    adminSettings,
    openDomainTransferModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);
  const [hostingDropdownOpen, setHostingDropdownOpen] = useState(false);
  const [serversDropdownOpen, setServersDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const totalCartCount = cart.length;

  const navigateToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setDomainDropdownOpen(false);
    setServersDropdownOpen(false);
    setHostingDropdownOpen(false);
    setServicesDropdownOpen(false);

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenPage = (page: 'home' | 'embroidery' | 'graphics') => {
    setMobileMenuOpen(false);
    setDomainDropdownOpen(false);
    setServersDropdownOpen(false);
    setHostingDropdownOpen(false);
    setServicesDropdownOpen(false);
    setCurrentPage(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#070b14]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleOpenPage('home')}
          className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
          title={`${adminSettings.brandName || 'ToofanHost'} - http://toofanhost.com/`}
        >
          {/* Custom Image Logo or Animated Typhoon Icon */}
          {adminSettings.logoUrl ? (
            <div className={`relative flex items-center justify-center bg-white/95 dark:bg-white px-3 py-1 rounded-xl shadow-xs border border-slate-200/60 dark:border-white/20 transition-all group-hover:scale-[1.02] ${
              adminSettings.logoSize === 'sm' ? 'h-11 sm:h-12' :
              adminSettings.logoSize === 'md' ? 'h-13 sm:h-14' :
              adminSettings.logoSize === 'xl' ? 'h-16 sm:h-18' :
              'h-14 sm:h-16' /* lg default */
            }`}>
              <img
                src={adminSettings.logoUrl}
                alt={adminSettings.brandName || 'ToofanHost'}
                className={`w-auto object-contain transition-all ${
                  adminSettings.logoSize === 'sm' ? 'h-8 sm:h-9 max-h-10 max-w-[170px]' :
                  adminSettings.logoSize === 'md' ? 'h-10 sm:h-11 max-h-12 max-w-[210px]' :
                  adminSettings.logoSize === 'xl' ? 'h-13 sm:h-15 md:h-16 max-h-16 max-w-[320px]' :
                  'h-11 sm:h-13 md:h-14 max-h-14 sm:max-h-15 max-w-[260px]' /* lg default: big & bold */
                }`}
              />
            </div>
          ) : (
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300">
              <div className="w-full h-full bg-white dark:bg-[#090e1a] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 opacity-70 group-hover:scale-125 transition-transform duration-700" />
                <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400 fill-cyan-500/20 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          )}

          {/* Brand Text Name - Only displayed if showLogoText is enabled or if no logo image is set */}
          {(adminSettings.showLogoText || !adminSettings.logoUrl) && (
            <div>
              <div className="flex items-center gap-1">
                <span className="font-heading text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
                  {adminSettings.logoTextPrefix || 'TOOFAN'}
                </span>
                <span className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {adminSettings.logoTextSuffix || 'HOST'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="text-[11px] font-mono tracking-wider text-cyan-700 dark:text-cyan-400/80 font-semibold">
                  {adminSettings.footerWebsiteUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'toofanhost.com'}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </div>
          )}
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
          
          {/* Domains Dropdown with Submenus */}
          <div
            className="relative"
            onMouseEnter={() => setDomainDropdownOpen(true)}
            onMouseLeave={() => setDomainDropdownOpen(false)}
          >
            <button
              onClick={() => navigateToSection('domain-search')}
              className={`hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-2 cursor-pointer ${
                currentPage === 'home' ? 'text-slate-900 dark:text-white font-bold' : ''
              }`}
            >
              <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Domains</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200" />
            </button>

            {domainDropdownOpen && (
              <div className="absolute top-full -left-6 w-80 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Domain Services
                </div>

                {/* 1. Register a New Domain Sub menu */}
                <button
                  onClick={() => {
                    setDomainDropdownOpen(false);
                    navigateToSection('domain-search');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>Register a New Domain</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 font-mono">
                        Instant
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      Find and register your perfect .com, .bd or global domain name
                    </div>
                  </div>
                </button>

                {/* 2. Transfer Domains Sub menu */}
                <button
                  onClick={() => {
                    setDomainDropdownOpen(false);
                    openDomainTransferModal();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                      <span>Transfer Domains</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono">
                        +1 Yr Free
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      Transfer existing domain to ToofanHost easily & save on renewal
                    </div>
                  </div>
                </button>

                {/* 3. Domain Pricing Sub menu */}
                <button
                  onClick={() => {
                    setDomainDropdownOpen(false);
                    navigateToSection('domain-pricing');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                      <span>Domain Pricing</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-mono">
                        50+ TLDs
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      Check transparent registration, renewal & transfer prices
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Web Hosting with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHostingDropdownOpen(true)}
            onMouseLeave={() => setHostingDropdownOpen(false)}
          >
            <button
              onClick={() => navigateToSection('hosting-plans')}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
            >
              <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Web Hosting</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </button>

            {hostingDropdownOpen && (
              <div className="absolute top-full -left-4 w-72 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => navigateToSection('hosting-plans')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer"
                >
                  <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">NVMe cPanel (3 Plans)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Pure Gen4 NVMe, LiteSpeed speed</div>
                  </div>
                </button>
                <button
                  onClick={() => navigateToSection('hosting-plans')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer"
                >
                  <Gauge className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">BDIX Turbo (3 Plans) 🇧🇩</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">2-5ms low latency for BD visitors</div>
                  </div>
                </button>
                <button
                  onClick={() => navigateToSection('hosting-plans')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer"
                >
                  <Cloud className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">Cloud VPS (3 Plans) & Reseller (3 Plans)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Dedicated root server & WHM master</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* BDIX & Global Servers Dropdown (BD, Singapur, USA) */}
          <div
            className="relative"
            onMouseEnter={() => setServersDropdownOpen(true)}
            onMouseLeave={() => setServersDropdownOpen(false)}
          >
            <button
              onClick={() => navigateToSection('bdix-section')}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
            >
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700">
                BD 🇧🇩
              </span>
              <span>Servers</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </button>

            {serversDropdownOpen && (
              <div className="absolute top-full -left-6 w-80 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Datacenter Region
                </div>

                {/* 1. BD BDIX Server */}
                <button
                  onClick={() => {
                    setServersDropdownOpen(false);
                    navigateToSection('bdix-section');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <span className="text-2xl shrink-0 mt-0.5">🇧🇩</span>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                      <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        BD 🇧🇩 BDIX Server
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                        2ms Latency
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Direct Dhaka IX 10Gbps local exchange
                    </div>
                  </div>
                </button>

                {/* 2. Singapur Server */}
                <button
                  onClick={() => {
                    setServersDropdownOpen(false);
                    navigateToSection('speed-test');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <span className="text-2xl shrink-0 mt-0.5">🇸🇬</span>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                      <span className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        Singapur Server
                      </span>
                      <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950 px-1.5 py-0.5 rounded">
                        32ms Ping
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Low latency for South Asia & Asia-Pacific
                    </div>
                  </div>
                </button>

                {/* 3. USA Server */}
                <button
                  onClick={() => {
                    setServersDropdownOpen(false);
                    navigateToSection('speed-test');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <span className="text-2xl shrink-0 mt-0.5">🇺🇸</span>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                      <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        USA Server (Dallas)
                      </span>
                      <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                        Tier IV
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Massive high-throughput global backbone
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Services Dropdown - User explicitly requested Embroidery Design & Graphics Design separate pages! */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => navigateToSection('services-section')}
              className={`hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-2 cursor-pointer ${
                currentPage === 'embroidery' || currentPage === 'graphics' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : ''
              }`}
            >
              <Briefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full -left-10 w-80 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Creative & Apparel Services
                </div>

                {/* 1. Embroidery Design (Dedicated Page) */}
                <button
                  onClick={() => handleOpenPage('embroidery')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>Embroidery Design</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400">
                        NEW PAGE
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Industrial digitizing, caps, patches & 3D puff
                    </div>
                  </div>
                </button>

                {/* 2. Graphics Design (Dedicated Page) */}
                <button
                  onClick={() => handleOpenPage('graphics')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors flex items-center justify-between">
                      <span>Graphics Design</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-400">
                        NEW PAGE
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Creative branding, logos & visuals
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Actions: Cart, Login, Sign Up */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700/60 transition-all cursor-pointer shadow-sm"
            aria-label="View Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[11px] flex items-center justify-center shadow-md animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* LOGIN BUTTON */}
          {adminSettings.loginUrl && adminSettings.useDirectLinks !== false ? (
            <a
              href={
                adminSettings.loginUrl.startsWith('http://') || adminSettings.loginUrl.startsWith('https://') || adminSettings.loginUrl.startsWith('/') || adminSettings.loginUrl.startsWith('#')
                  ? adminSettings.loginUrl
                  : `https://${adminSettings.loginUrl}`
              }
              target={adminSettings.openInNewTab !== false ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
              title="Client Login"
            >
              <LogIn className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Login</span>
            </a>
          ) : (
            <button
              onClick={() => triggerAuthButtonClick('login')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
              title="Client Login"
            >
              <LogIn className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Login</span>
            </button>
          )}

          {/* SIGN UP BUTTON */}
          {adminSettings.signupUrl && adminSettings.useDirectLinks !== false ? (
            <a
              href={
                adminSettings.signupUrl.startsWith('http://') || adminSettings.signupUrl.startsWith('https://') || adminSettings.signupUrl.startsWith('/') || adminSettings.signupUrl.startsWith('#')
                  ? adminSettings.signupUrl
                  : `https://${adminSettings.signupUrl}`
              }
              target={adminSettings.openInNewTab !== false ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="relative group px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:via-sky-500 hover:to-indigo-500 shadow-md shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              title="Client Sign Up"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </a>
          ) : (
            <button
              onClick={() => triggerAuthButtonClick('signup')}
              className="relative group px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:via-sky-500 hover:to-indigo-500 shadow-md shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              title="Client Sign Up"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger & Cart */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-[#090f1d] border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {adminSettings.loginUrl && adminSettings.useDirectLinks !== false ? (
              <a
                href={
                  adminSettings.loginUrl.startsWith('http://') || adminSettings.loginUrl.startsWith('https://') || adminSettings.loginUrl.startsWith('/') || adminSettings.loginUrl.startsWith('#')
                    ? adminSettings.loginUrl
                    : `https://${adminSettings.loginUrl}`
                }
                target={adminSettings.openInNewTab !== false ? '_blank' : '_self'}
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-cyan-600" />
                <span>Login</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerAuthButtonClick('login');
                }}
                className="py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-cyan-600" />
                <span>Login</span>
              </button>
            )}

            {adminSettings.signupUrl && adminSettings.useDirectLinks !== false ? (
              <a
                href={
                  adminSettings.signupUrl.startsWith('http://') || adminSettings.signupUrl.startsWith('https://') || adminSettings.signupUrl.startsWith('/') || adminSettings.signupUrl.startsWith('#')
                    ? adminSettings.signupUrl
                    : `https://${adminSettings.signupUrl}`
                }
                target={adminSettings.openInNewTab !== false ? '_blank' : '_self'}
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 rounded-xl text-xs font-extrabold bg-cyan-600 text-white flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerAuthButtonClick('signup');
                }}
                className="py-2.5 rounded-xl text-xs font-extrabold bg-cyan-600 text-white flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            )}
          </div>

          <nav className="space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <button
              onClick={() => handleOpenPage('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 ${
                currentPage === 'home' ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 font-bold' : ''
              }`}
            >
              <Home className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Home</span>
            </button>

            {/* Domains in Mobile Menu */}
            <div className="pt-2 pb-1 border-t border-slate-200 dark:border-slate-800">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase">
                Domain Services:
              </div>

              {/* 1. Register a New Domain */}
              <button
                onClick={() => navigateToSection('domain-search')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Register a New Domain</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 font-mono">
                    Instant
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-6 mt-0.5">
                  Find and register your perfect .com, .bd or global domain name
                </div>
              </button>

              {/* 2. Transfer Domains */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDomainTransferModal();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Transfer Domains</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono">
                    +1 Yr Free
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-6 mt-0.5">
                  Transfer existing domain to ToofanHost easily & save on renewal
                </div>
              </button>

              {/* 3. Domain Pricing */}
              <button
                onClick={() => navigateToSection('domain-pricing')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Domain Pricing</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-mono">
                    50+ TLDs
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-6 mt-0.5">
                  Check transparent registration, renewal & transfer prices
                </div>
              </button>
            </div>

            <button
              onClick={() => navigateToSection('hosting-plans')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>NVMe cPanel Hosting</span>
            </button>

            {/* Services in Mobile Menu */}
            <div className="pt-2 pb-1 border-t border-slate-200 dark:border-slate-800">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase">
                Creative Design Pages:
              </div>
              
              {/* Embroidery Design page */}
              <button
                onClick={() => handleOpenPage('embroidery')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  currentPage === 'embroidery' ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-cyan-600" />
                    <span>Embroidery Design</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700">PAGE</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-6">
                  Industrial digitizing, caps, patches & 3D puff
                </div>
              </button>

              {/* Graphics Design page */}
              <button
                onClick={() => handleOpenPage('graphics')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  currentPage === 'graphics' ? 'bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-pink-600" />
                    <span>Graphics Design</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-700">PAGE</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-6">
                  Creative branding, logos & visuals
                </div>
              </button>
            </div>

            {/* Server Locations in Mobile Menu */}
            <div className="pt-2 pb-1 border-t border-slate-200 dark:border-slate-800">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase">
                Server Datacenters:
              </div>
              <button
                onClick={() => navigateToSection('bdix-section')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>🇧🇩</span>
                  <span>BD BDIX Server</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1 rounded">2ms Ping</span>
              </button>
              <button
                onClick={() => navigateToSection('speed-test')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>🇸🇬</span>
                  <span>Singapur Server</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-600 font-bold bg-cyan-50 px-1 rounded">32ms</span>
              </button>
              <button
                onClick={() => navigateToSection('speed-test')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>🇺🇸</span>
                  <span>USA Server (Dallas)</span>
                </div>
                <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-1 rounded">Global</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
