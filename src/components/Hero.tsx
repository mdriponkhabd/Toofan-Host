import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Search,
  Globe,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  Flame,
  Check,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DomainCheckResult {
  domain: string;
  extension: string;
  available: boolean;
  priceBDT: number;
  priceUSD: number;
}

export const Hero: React.FC = () => {
  const { tlds, formatPrice, addToCart, cart, theme } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTLD, setSelectedTLD] = useState('.com');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DomainCheckResult[] | null>(null);
  const [addedDomains, setAddedDomains] = useState<string[]>([]);

  const isLight = theme === 'light';
  const popularTLDs = tlds.slice(0, 5);

  const cleanDomainInput = (input: string) => {
    return input
      .trim()
      .toLowerCase()
      .replace(/https?:\/\//, '')
      .replace(/www\./, '')
      .replace(/[^\w.-]/g, '');
  };

  const handleDomainSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = cleanDomainInput(searchTerm);
    if (!raw) return;

    let baseName = raw;
    let preferredExt = selectedTLD;

    const matchedExt = tlds.find((t) => raw.endsWith(t.extension));
    if (matchedExt) {
      baseName = raw.slice(0, -matchedExt.extension.length);
      preferredExt = matchedExt.extension;
    } else {
      baseName = baseName.replace(/\..*$/, '');
    }

    if (!baseName) return;

    setIsSearching(true);
    setSearchResults(null);

    setTimeout(() => {
      const topExtensions = [preferredExt, ...tlds.map((t) => t.extension).filter((e) => e !== preferredExt).slice(0, 4)];
      
      const results: DomainCheckResult[] = topExtensions.map((ext, idx) => {
        const tldInfo = tlds.find((t) => t.extension === ext) || tlds[0];
        const isAvailable = idx === 0 ? true : Math.random() > 0.18;
        return {
          domain: `${baseName}${ext}`,
          extension: ext,
          available: isAvailable,
          priceBDT: tldInfo.priceBDTYearly,
          priceUSD: tldInfo.priceUSDYearly,
        };
      });

      setSearchResults(results);
      setIsSearching(false);

      if (results[0]?.available) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#06b6d4', '#3b82f6', '#10b981'],
        });
      }
    }, 600);
  };

  const handleAddToCart = (result: DomainCheckResult) => {
    addToCart({
      id: `domain-${result.domain}-${Date.now()}`,
      type: 'domain',
      title: result.domain,
      subtitle: `Domain Registration (1 Year)`,
      price: result.priceBDT,
      currency: 'BDT',
      linkedDomain: result.domain,
    });

    setAddedDomains((prev) => [...prev, result.domain]);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 transition-colors">
      {/* Background ambient lighting - fresh, vibrant & bright */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-16 right-1/4 w-[450px] h-[450px] bg-blue-400/15 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-bold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-bounce" />
            <span>UNSTOPPABLE TOOFAN SPEED</span>
            <span className="w-1 h-1 rounded-full bg-cyan-500" />
            <span>Gen4 NVMe + LiteSpeed</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>99.99% Guaranteed Uptime SLA</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Build Faster With <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Toofan-Speed
            </span>{' '}
            Cloud & Domains.
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Ultra-low latency web hosting powered by pure Gen4 NVMe enterprise storage, 
            cPanel, automated SSL, and 2-5ms local BDIX connectivity.
          </p>
        </div>

        {/* DOMAIN SEARCH BOX - Clean, Luminous & Prominent */}
        <div id="domain-search" className="max-w-3xl mx-auto scroll-mt-28">
          <div className="relative p-2 rounded-2xl bg-gradient-to-r from-cyan-500/40 via-sky-400/30 to-blue-500/40 p-[2px] shadow-xl shadow-cyan-500/10">
            <div className="bg-white dark:bg-[#0b1220] rounded-[14px] p-3 sm:p-4 border border-slate-200 dark:border-slate-800">
              <form onSubmit={handleDomainSearch} className="flex flex-col sm:flex-row items-center gap-2">
                
                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter your dream domain (e.g. mybusiness, toofanshop)..."
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all font-semibold"
                  />
                </div>

                {/* TLD Extension Select Dropdown */}
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <div className="relative w-full sm:w-28">
                    <select
                      value={selectedTLD}
                      onChange={(e) => setSelectedTLD(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl px-3 py-3.5 text-cyan-700 dark:text-cyan-300 font-extrabold text-sm focus:outline-none focus:border-cyan-500 cursor-pointer appearance-none text-center"
                    >
                      {tlds.map((t) => (
                        <option key={t.extension} value={t.extension} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono">
                          {t.extension}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={isSearching || !searchTerm.trim()}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-cyan-500/30 disabled:opacity-50 cursor-pointer shrink-0 active:scale-95"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-current" />
                        <span>Search Domain</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Trending TLD Badges with Live Pricing */}
              <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular TLDs:</span>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {popularTLDs.map((tld) => (
                    <button
                      key={tld.extension}
                      type="button"
                      onClick={() => {
                        setSelectedTLD(tld.extension);
                        if (searchTerm.trim()) {
                          handleDomainSearch();
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        selectedTLD === tld.extension
                          ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 font-bold'
                          : 'bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span className="font-extrabold text-slate-900 dark:text-white">{tld.extension}</span>
                      <span className="text-cyan-700 dark:text-cyan-400 font-sans font-semibold">
                        {formatPrice(tld.priceBDTYearly, tld.priceUSDYearly)}/yr
                      </span>
                      {tld.badge && (
                        <span className="text-[9px] bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 px-1 rounded uppercase font-sans font-bold">
                          {tld.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Domain Search Results Card */}
          {searchResults && searchResults.length > 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-[#0d1424] border border-cyan-400/40 dark:border-cyan-500/30 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Domain Availability Results</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Instant registration with 100% DNS control
                </span>
              </div>

              <div className="space-y-2.5">
                {searchResults.map((item, idx) => {
                  const isAdded = addedDomains.includes(item.domain) || cart.some((c) => c.linkedDomain === item.domain);

                  return (
                    <div
                      key={item.domain}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                        idx === 0 && item.available
                          ? 'bg-cyan-50/70 dark:bg-cyan-950/30 border-cyan-400 dark:border-cyan-500/40 ring-1 ring-cyan-400/30'
                          : item.available
                          ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                          : 'bg-rose-50/60 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/30 opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.available ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                            <XCircle className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-base text-slate-900 dark:text-white tracking-wide">
                              {item.domain}
                            </span>
                            {idx === 0 && item.available && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40">
                                EXACT MATCH
                              </span>
                            )}
                          </div>
                          <span className={`text-xs font-semibold ${item.available ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                            {item.available ? 'Available for instant registration!' : 'Already taken - try another extension'}
                          </span>
                        </div>
                      </div>

                      {/* Pricing & Action */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <div className="text-base font-extrabold text-cyan-700 dark:text-cyan-300 font-heading">
                            {formatPrice(item.priceBDT, item.priceUSD)}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">per 1st year</div>
                        </div>

                        {item.available ? (
                          <button
                            type="button"
                            onClick={() => handleAddToCart(item)}
                            disabled={isAdded}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white cursor-default'
                                : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>In Cart ✓</span>
                              </>
                            ) : (
                              <>
                                <Zap className="w-3.5 h-3.5 fill-current" />
                                <span>Register Domain</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <a
                            href="https://whois.domaintools.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                          >
                            WHOIS Lookup
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Floating Quick Trust Highlights */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-200 dark:border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Pure Gen4 NVMe</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Up to 7,000 MB/s I/O</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Sub-5ms BDIX</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Local Bangladesh speed</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Free SSL & Backups</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">JetBackup automated</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">LiteSpeed Cache</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">6x faster than Apache</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
