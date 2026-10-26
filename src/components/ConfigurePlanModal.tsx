import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Zap,
  Globe,
  Server,
  Calendar,
  CheckCircle2,
  Shield,
  ArrowRight,
  HardDrive,
  Cpu
} from 'lucide-react';
import { DEFAULT_SERVER_LOCATIONS } from '../data/defaultData';
import confetti from 'canvas-confetti';

export const ConfigurePlanModal: React.FC = () => {
  const {
    isConfigModalOpen,
    closeConfigModal,
    selectedPackageForConfig,
    currency,
    formatPrice,
    addToCart,
    tlds
  } = useApp();

  const [domainOption, setDomainOption] = useState<'new' | 'transfer' | 'own'>('new');
  const [domainName, setDomainName] = useState('');
  const [selectedTLD, setSelectedTLD] = useState('.com');
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_SERVER_LOCATIONS[0].id);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  if (!isConfigModalOpen || !selectedPackageForConfig) return null;

  const pkg = selectedPackageForConfig;
  const isYearly = billingCycle === 'yearly';

  // Base plan price
  const basePlanPriceBDT = isYearly ? pkg.priceBDTYearly : pkg.priceBDTMonthly;
  const basePlanPriceUSD = isYearly ? pkg.priceUSDYearly : pkg.priceUSDMonthly;

  // Domain price (free on yearly if package qualifies and user chose qualifying TLD!)
  const chosenTLDInfo = tlds.find((t) => t.extension === selectedTLD) || tlds[0];
  const isDomainFree = isYearly && pkg.freeDomainOnYearly && ['.com', '.net', '.xyz'].includes(selectedTLD) && domainOption === 'new';
  
  const domainPriceBDT = domainOption === 'new' ? (isDomainFree ? 0 : chosenTLDInfo.priceBDTYearly) : 0;
  const domainPriceUSD = domainOption === 'new' ? (isDomainFree ? 0 : chosenTLDInfo.priceUSDYearly) : 0;

  const totalBDT = basePlanPriceBDT + domainPriceBDT;
  const totalUSD = basePlanPriceUSD + domainPriceUSD;

  const handleFinishConfig = (e: React.FormEvent) => {
    e.preventDefault();

    const fullDomain = domainName.trim()
      ? domainName.includes('.') ? domainName : `${domainName}${selectedTLD}`
      : 'yourbrand.com';

    const locationName = DEFAULT_SERVER_LOCATIONS.find((l) => l.id === selectedLocation)?.name || 'Singapore';

    addToCart({
      id: `pkg-${pkg.id}-${Date.now()}`,
      type: 'hosting',
      title: `${pkg.name} (${billingCycle === 'yearly' ? 'Annual Plan' : 'Monthly Plan'})`,
      subtitle: `Server: ${locationName} • Domain: ${fullDomain}`,
      billingCycle,
      serverLocation: locationName,
      linkedDomain: fullDomain,
      price: currency === 'BDT' ? totalBDT : totalUSD,
      currency,
      specsSummary: `${pkg.specs.storage} • ${pkg.specs.websites} • ${pkg.specs.ram}`,
    });

    closeConfigModal();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeConfigModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-200 dark:border-cyan-500/30">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
              CONFIGURE YOUR HOSTING
            </span>
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
              {pkg.name}
            </h2>
          </div>
        </div>

        <form onSubmit={handleFinishConfig} className="space-y-6">
          
          {/* Step 1: Domain Selection */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Step 1: Choose Your Website Domain</span>
            </label>

            {/* Radio Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-xs">
              <button
                type="button"
                onClick={() => setDomainOption('new')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  domainOption === 'new'
                    ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400'
                }`}
              >
                1. Register New Domain
              </button>
              <button
                type="button"
                onClick={() => setDomainOption('transfer')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  domainOption === 'transfer'
                    ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400'
                }`}
              >
                2. Transfer Domain
              </button>
              <button
                type="button"
                onClick={() => setDomainOption('own')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  domainOption === 'own'
                    ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400'
                }`}
              >
                3. I Already Own A Domain
              </button>
            </div>

            {/* Input field */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="e.g. mycompanyname"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                required
              />

              {domainOption === 'new' && (
                <select
                  value={selectedTLD}
                  onChange={(e) => setSelectedTLD(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                >
                  {tlds.map((t) => (
                    <option key={t.extension} value={t.extension}>
                      {t.extension} {isYearly && pkg.freeDomainOnYearly && ['.com', '.net', '.xyz'].includes(t.extension) ? '(FREE)' : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {isDomainFree && (
              <p className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Free 1-year domain included with this annual hosting package!</span>
              </p>
            )}
          </div>

          {/* Step 2: Choose Server Location */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Step 2: Choose Server Location</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {DEFAULT_SERVER_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedLocation === loc.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{loc.flag}</span>
                    <div>
                      <div className="font-bold text-white">{loc.name}</div>
                      <div className="text-[10px] text-slate-400">{loc.city}</div>
                    </div>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold text-xs">{loc.pingMs}ms</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Billing Cycle */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Step 3: Choose Billing Cycle</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setBillingCycle('monthly')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-cyan-500/20 border-cyan-400 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold text-white mb-1">1 Month Billing</div>
                <div className="text-base font-extrabold text-cyan-300">
                  {formatPrice(pkg.priceBDTMonthly, pkg.priceUSDMonthly)}/mo
                </div>
                <div className="text-[11px] text-slate-400">Regular monthly renewal</div>
              </div>

              <div
                onClick={() => setBillingCycle('yearly')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                  billingCycle === 'yearly'
                    ? 'bg-cyan-500/20 border-cyan-400 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <span className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-bl">
                  RECOMMENDED
                </span>
                <div className="text-xs font-bold text-white mb-1">12 Months (1 Year)</div>
                <div className="text-base font-extrabold text-cyan-300">
                  {formatPrice(pkg.priceBDTYearly, pkg.priceUSDYearly)}/yr
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  {pkg.discountPercent}% OFF + Free Domain!
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary & Checkout Button */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Total Due Today:</div>
              <div className="text-2xl font-extrabold text-cyan-400 font-heading">
                {formatPrice(totalBDT, totalUSD)}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={closeConfigModal}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <span>Continue to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
