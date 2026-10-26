import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ArrowRightLeft,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
  Info,
  Lock,
  Globe
} from 'lucide-react';

export const DomainTransferModal: React.FC = () => {
  const {
    isDomainTransferModalOpen,
    closeDomainTransferModal,
    tlds,
    formatPrice,
    addToCart,
    adminSettings,
  } = useApp();

  const [domainName, setDomainName] = useState('');
  const [selectedTLD, setSelectedTLD] = useState('.com');
  const [eppCode, setEppCode] = useState('');
  const [transferStatus, setTransferStatus] = useState<'idle' | 'checking' | 'ready'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isDomainTransferModalOpen) return null;

  const currentTld = tlds.find((t) => t.extension === selectedTLD) || tlds[0];
  const transferPriceBDT = currentTld?.renewalBDTYearly || currentTld?.priceBDTYearly || 1450;
  const transferPriceUSD = currentTld?.renewalUSDYearly || currentTld?.priceUSDYearly || 12.99;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const clean = domainName
      .trim()
      .toLowerCase()
      .replace(/https?:\/\//, '')
      .replace(/www\./, '')
      .replace(/[^\w.-]/g, '');

    if (!clean) {
      setErrorMessage('Please enter a valid domain name to transfer.');
      return;
    }

    setTransferStatus('checking');
    setTimeout(() => {
      setTransferStatus('ready');
    }, 500);
  };

  const handleAddToCartTransfer = () => {
    const clean = domainName
      .trim()
      .toLowerCase()
      .replace(/https?:\/\//, '')
      .replace(/www\./, '')
      .replace(/[^\w.-]/g, '');

    const fullDomain = clean.includes('.') ? clean : `${clean}${selectedTLD}`;

    addToCart({
      id: `transfer-${fullDomain}-${Date.now()}`,
      type: 'domain',
      title: `Transfer: ${fullDomain}`,
      subtitle: `Domain Transfer + 1-Yr Renewal Extension (${selectedTLD})`,
      price: transferPriceBDT,
      currency: 'BDT',
      linkedDomain: fullDomain,
      specsSummary: eppCode ? `EPP Code: ${eppCode}` : 'EPP Code will be provided before final transfer',
    });

    closeDomainTransferModal();
    setDomainName('');
    setEppCode('');
    setTransferStatus('idle');
  };

  const directTransferUrl = adminSettings.domainTransferUrl || 'http://toofanhost.com/cart.php?a=add&domain=transfer';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#0c1220] rounded-3xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-6 text-white relative">
          <button
            onClick={closeDomainTransferModal}
            className="absolute top-5 right-5 p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md">
              <ArrowRightLeft className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Zero Downtime Migration</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                Transfer Domains to ToofanHost
              </h3>
            </div>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-emerald-50/90 leading-relaxed">
            Move your existing domain away from expensive registrars. Includes a free 1-year renewal extension and full DNS management!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Domain Name to Transfer
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Globe className="w-4 h-4 text-cyan-500" />
                  </div>
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => {
                      setDomainName(e.target.value);
                      if (transferStatus !== 'idle') setTransferStatus('idle');
                    }}
                    placeholder="e.g. mycompany or mycompany.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                </div>
                <select
                  value={selectedTLD}
                  onChange={(e) => setSelectedTLD(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-mono font-bold text-sm cursor-pointer"
                >
                  {tlds.map((tld) => (
                    <option key={tld.extension} value={tld.extension}>
                      {tld.extension}
                    </option>
                  ))}
                </select>
              </div>
              {errorMessage && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5">{errorMessage}</p>
              )}
            </div>

            {/* EPP / Auth Code (Optional at initiation) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>EPP / Auth-Code (Optional)</span>
                </label>
                <span className="text-[11px] text-slate-400">Can also provide after ordering</span>
              </div>
              <input
                type="text"
                value={eppCode}
                onChange={(e) => setEppCode(e.target.value)}
                placeholder="Authorization code from your current registrar..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Price Preview & Benefits */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Transfer & Renewal Fee:</div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Includes 1 Year Extension</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
                    {formatPrice(transferPriceBDT, transferPriceUSD)}
                  </div>
                  <div className="text-[11px] text-slate-400">Fixed rate</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Free WHOIS Privacy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Zero Website Downtime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Full DNS & Nameserver Mgmt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>24/7 Dedicated Support</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCartTransfer}
                disabled={!domainName.trim()}
                className="flex-1 py-3 px-5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-md shadow-emerald-500/20 text-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Add Transfer to Cart ({formatPrice(transferPriceBDT, transferPriceUSD)})</span>
              </button>

              {/* Direct WHMCS Link if configured */}
              {adminSettings.domainTransferUrl && (
                <a
                  href={directTransferUrl}
                  target={adminSettings.openInNewTab !== false ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </form>

          {/* Simple step explanation */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-300">Quick Transfer Tip:</span> Ensure your domain is unlocked at your current registrar and you have request the authorization code (EPP key).
          </div>
        </div>
      </div>
    </div>
  );
};
