import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HostingPackage } from '../types';
import {
  Zap,
  Check,
  Server,
  Cloud,
  Layers,
  Sparkles,
  ArrowRight,
  HardDrive,
  Cpu,
  Shield,
  Edit3,
  Globe,
  Radio
} from 'lucide-react';

export const HostingPlansSection: React.FC = () => {
  const {
    packages,
    currency,
    formatPrice,
    openConfigModal,
    setIsAdminModalOpen
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'cpanel' | 'bdix' | 'vps' | 'reseller'>('cpanel');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const filteredPackages = packages.filter((pkg) => pkg.category === activeCategory);

  return (
    <section id="hosting-plans" className="py-20 relative bg-slate-100/70 dark:bg-[#060a14] border-t border-slate-200 dark:border-slate-800/80 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-400 text-xs font-bold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>CLOUD PERFORMANCE PLANS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            High-Speed Hosting For Any Scale
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            All plans include high-speed Gen4 NVMe, cPanel, automated JetBackup, and 24/7/365 WhatsApp engineering support.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-900/90 rounded-2xl border border-slate-300 dark:border-slate-800 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveCategory('cpanel')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'cpanel'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>NVMe cPanel</span>
            </button>

            <button
              onClick={() => setActiveCategory('bdix')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'bdix'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="font-extrabold text-xs bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                BD 🇧🇩
              </span>
              <span>BDIX Turbo (2ms)</span>
            </button>

            <button
              onClick={() => setActiveCategory('vps')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'vps'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
              }`}
            >
              <Cloud className="w-4 h-4" />
              <span>Cloud VPS</span>
            </button>

            <button
              onClick={() => setActiveCategory('reseller')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'reseller'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Reseller WHM</span>
            </button>
          </div>

          {/* Billing Cycle Switch: Monthly vs Yearly */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span
              onClick={() => setBillingCycle('monthly')}
              className={`text-sm font-semibold cursor-pointer transition-colors ${
                billingCycle === 'monthly' ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-900 transition-colors duration-200 ease-in-out focus:outline-none"
              aria-label="Toggle Billing Cycle"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-cyan-500 shadow-md ring-0 transition duration-200 ease-in-out ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>

            <div className="flex items-center gap-2">
              <span
                onClick={() => setBillingCycle('yearly')}
                className={`text-sm font-semibold cursor-pointer transition-colors ${
                  billingCycle === 'yearly' ? 'text-cyan-700 dark:text-cyan-300 font-bold' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Yearly Billing
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40">
                Save up to 30% + Free Domain 🎁
              </span>
            </div>
          </div>
        </div>

        {/* Package Cards Grid - Bright & Clean White */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const isYearly = billingCycle === 'yearly';
            const priceBDT = isYearly ? pkg.priceBDTYearly : pkg.priceBDTMonthly;
            const priceUSD = isYearly ? pkg.priceUSDYearly : pkg.priceUSDMonthly;
            const monthlyEquivalentBDT = isYearly ? Math.round(pkg.priceBDTYearly / 12) : pkg.priceBDTMonthly;
            const monthlyEquivalentUSD = isYearly ? (pkg.priceUSDYearly / 12).toFixed(2) : pkg.priceUSDMonthly.toFixed(2);

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] ${
                  pkg.isPopular
                    ? 'bg-white dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1220] border-2 border-cyan-500 shadow-xl shadow-cyan-500/10'
                    : 'bg-white dark:bg-[#0b101c] border border-slate-200 dark:border-slate-800 hover:border-cyan-400 shadow-md'
                }`}
              >
                {/* Popular or Custom Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Card Top: Title, Tagline, Price */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {pkg.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px] line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-3xl sm:text-4xl font-extrabold text-cyan-700 dark:text-cyan-300">
                        {currency === 'BDT' ? `৳${monthlyEquivalentBDT}` : `$${monthlyEquivalentUSD}`}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ month</span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        {isYearly ? (
                          <>Billed annually: <span className="text-slate-900 dark:text-slate-200 font-bold">{formatPrice(priceBDT, priceUSD)}</span></>
                        ) : (
                          <>Billed monthly: <span className="text-slate-900 dark:text-slate-200 font-bold">{formatPrice(priceBDT, priceUSD)}</span></>
                        )}
                      </span>
                      {pkg.discountPercent > 0 && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px] bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                          {pkg.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {isYearly && pkg.freeDomainOnYearly && (
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-300 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Includes Free .COM / .NET Domain!</span>
                      </div>
                    )}
                  </div>

                  {/* Spec Highlights Grid */}
                  <div className="mt-6 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                        <HardDrive className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        Storage:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{pkg.specs.storage}</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                        <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        Websites:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{pkg.specs.websites}</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                        <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        Bandwidth:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{pkg.specs.bandwidth}</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                        <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        RAM & CPU:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{pkg.specs.ram} ({pkg.specs.cpu})</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800/60">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                        <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        Inodes Limit:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{pkg.specs.inodes}</span>
                    </div>
                  </div>

                  {/* Bullet Features */}
                  <div className="mt-5 space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Included with Plan:
                    </div>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Order CTA */}
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => {
                      if (pkg.orderUrl && pkg.orderUrl.trim() !== '') {
                        window.open(pkg.orderUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        openConfigModal(pkg);
                      }
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white shadow-cyan-500/25'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>Order Now & Configure</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Need Custom Plan Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Need a Custom Dedicated Server or Enterprise Cluster?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Custom CPU, 128GB+ RAM, BDIX 10Gbps direct uplink, or custom cPanel/WHM configurations built to your exact specifications.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/8801700000000?text=Hello%20ToofanHost!%20I%20need%20a%20custom%20dedicated%20server%20or%20enterprise%20cluster.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all shrink-0 cursor-pointer"
          >
            Contact Enterprise Sales
          </a>
        </div>

      </div>
    </section>
  );
};
