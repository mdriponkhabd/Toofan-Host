import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, ArrowRight, Check } from 'lucide-react';

export const DomainPricingTable: React.FC = () => {
  const { tlds, formatPrice, addToCart, cart } = useApp();

  const handleRegister = (tld: typeof tlds[0]) => {
    const domainExample = `mybrand${tld.extension}`;
    addToCart({
      id: `domain-${domainExample}-${Date.now()}`,
      type: 'domain',
      title: domainExample,
      subtitle: `Domain Registration (${tld.extension}) - 1 Year`,
      price: tld.priceBDTYearly,
      currency: 'BDT',
      linkedDomain: domainExample,
    });
  };

  return (
    <section id="domain-pricing" className="py-20 relative bg-slate-50 dark:bg-[#060a14] border-t border-slate-200 dark:border-slate-800/80 transition-colors scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-400 text-xs font-bold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>TRANSPARENT DOMAIN PRICING</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Domain Extensions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            No surprise price hikes. Full DNS management, WHOIS privacy protection, email forwarding, and 24/7 support included.
          </p>
        </div>

        {/* Pricing Table - Clean White */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/80 text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Domain Extension</th>
                <th className="py-4 px-6">1st Year Registration</th>
                <th className="py-4 px-6">Annual Renewal</th>
                <th className="py-4 px-6">Features Included</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-sm">
              {tlds.map((tld) => {
                const inCart = cart.some((c) => c.linkedDomain?.endsWith(tld.extension));

                return (
                  <tr key={tld.extension} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-lg font-bold text-slate-900 dark:text-white font-mono">
                          {tld.extension}
                        </span>
                        {tld.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30">
                            {tld.badge}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-cyan-700 dark:text-cyan-300 font-mono text-base">
                        {formatPrice(tld.priceBDTYearly, tld.priceUSDYearly)}
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-sans font-normal"> / year</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold">
                        {formatPrice(tld.renewalBDTYearly, tld.renewalUSDYearly)}
                        <span className="text-slate-500 dark:text-slate-400 font-sans font-normal"> / year</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Free DNS Control
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> WHOIS Privacy
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleRegister(tld)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                          inCart
                            ? 'bg-emerald-600 text-white'
                            : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-sm'
                        }`}
                      >
                        {inCart ? 'Added ✓' : 'Register Now'}
                        {!inCart && <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
