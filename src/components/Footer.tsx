import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Globe,
  Server,
  Shield,
  Heart,
  Settings,
  Mail,
  Phone,
  MessageSquare,
  Lock,
  ExternalLink,
  Scissors,
  Palette
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { adminSettings, setIsAdminModalOpen, triggerAuthButtonClick, setCurrentPage } = useApp();

  return (
    <footer className="bg-slate-900 dark:bg-[#050811] border-t border-slate-800 text-slate-300 dark:text-slate-400 text-xs relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {adminSettings.logoUrl ? (
                <div className={`flex items-center bg-white/95 px-3.5 py-1.5 rounded-xl shadow-sm ${
                  adminSettings.logoSize === 'sm' ? 'h-11' :
                  adminSettings.logoSize === 'md' ? 'h-13' :
                  adminSettings.logoSize === 'xl' ? 'h-16' :
                  'h-14' /* lg default */
                }`}>
                  <img
                    src={adminSettings.logoUrl}
                    alt={adminSettings.brandName || 'ToofanHost'}
                    className={`w-auto object-contain ${
                      adminSettings.logoSize === 'sm' ? 'h-8 max-h-9 max-w-[170px]' :
                      adminSettings.logoSize === 'md' ? 'h-9 max-h-11 max-w-[200px]' :
                      adminSettings.logoSize === 'xl' ? 'h-12 max-h-14 max-w-[280px]' :
                      'h-10 sm:h-11 max-h-12 max-w-[240px]' /* lg default */
                    }`}
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full bg-[#090e1a] rounded-[10px] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              )}
              {(adminSettings.showLogoText || !adminSettings.logoUrl) && (
                <div>
                  <span className="font-heading text-xl font-extrabold text-white">
                    {adminSettings.logoTextPrefix || 'TOOFAN'}<span className="text-cyan-400">{adminSettings.logoTextSuffix || 'HOST'}</span>
                  </span>
                  <span className="block text-[11px] font-mono text-cyan-400/80 -mt-0.5">
                    {adminSettings.footerWebsiteUrl || 'http://toofanhost.com/'}
                  </span>
                </div>
              )}
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {adminSettings.footerAboutText || 
                "ToofanHost is Bangladesh's next-generation cloud infrastructure & creative design platform. Delivering Gen4 NVMe cPanel hosting, 2ms BDIX connectivity, precision embroidery digitizing, and world-class graphic branding."
              }
            </p>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{adminSettings.footerStatusText || 'All Systems Operational (99.99% SLA)'}</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {adminSettings.footerFacebookUrl && (
                <a
                  href={adminSettings.footerFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                  title="Facebook"
                >
                  <span className="text-xs font-bold font-mono">f</span>
                </a>
              )}
              {adminSettings.footerTwitterUrl && (
                <a
                  href={adminSettings.footerTwitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                  title="Twitter / X"
                >
                  <span className="text-xs font-bold font-mono">𝕏</span>
                </a>
              )}
              {adminSettings.footerLinkedinUrl && (
                <a
                  href={adminSettings.footerLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                  title="LinkedIn"
                >
                  <span className="text-xs font-bold font-mono">in</span>
                </a>
              )}
              {adminSettings.footerYoutubeUrl && (
                <a
                  href={adminSettings.footerYoutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                  title="YouTube"
                >
                  <span className="text-xs font-bold font-mono">▶</span>
                </a>
              )}
              {adminSettings.footerTelegramUrl && (
                <a
                  href={adminSettings.footerTelegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                  title="Telegram"
                >
                  <span className="text-xs font-bold font-mono">✈</span>
                </a>
              )}
            </div>
          </div>

          {/* Web Hosting Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Web Hosting</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setTimeout(() => document.getElementById('hosting-plans')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  cPanel NVMe Hosting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setTimeout(() => document.getElementById('bdix-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  BDIX Turbo Hosting 🇧🇩
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setTimeout(() => document.getElementById('hosting-plans')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Cloud KVM VPS
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setTimeout(() => document.getElementById('hosting-plans')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  cPanel Reseller WHM
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setTimeout(() => document.getElementById('domain-search')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Domain Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Creative Design Pages */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Creative Design</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage('embroidery')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Embroidery Digitizing Page</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('embroidery')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Cap & Left Chest Digitizing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('embroidery')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  3D Puff & Applique Patches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('graphics')}
                  className="hover:text-pink-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Palette className="w-3.5 h-3.5 text-pink-400" />
                  <span>Graphics Design Page</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('graphics')}
                  className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                >
                  Logo & Complete Brand Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('graphics')}
                  className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                >
                  UI/UX Web & Mobile Design
                </button>
              </li>
            </ul>
          </div>

          {/* Client Portal & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Client Portal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => triggerAuthButtonClick('login')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <span>Client Login</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => triggerAuthButtonClick('signup')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <span>Create Account</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${adminSettings.supportWhatsApp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>WhatsApp: {adminSettings.supportWhatsApp}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${adminSettings.supportPhone}`} className="hover:text-cyan-400 transition-colors">
                  {adminSettings.supportPhone}
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
                  title="Admin Control Panel (Password Protected)"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500 hover:text-cyan-400" />
                  <span>Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment logos and copyright bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-400 text-xs">
            {adminSettings.footerCopyrightText || (
              <>
                © {new Date().getFullYear()} <strong className="text-white">{adminSettings.brandName || 'ToofanHost'}</strong> ({adminSettings.footerWebsiteUrl || 'http://toofanhost.com/'}). All rights reserved.
              </>
            )}
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
            <span className="text-slate-400 text-xs mr-2 font-sans">Payment Methods:</span>
            {(adminSettings.footerPaymentMethods && adminSettings.footerPaymentMethods.length > 0
              ? adminSettings.footerPaymentMethods
              : ['bKash', 'Nagad', 'Rocket', 'Visa / Master']
            ).map((method, idx) => {
              const lower = method.toLowerCase();
              let badgeStyle = 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80';
              if (lower.includes('bkash')) badgeStyle = 'bg-pink-950/80 text-pink-300 border-pink-800/80';
              else if (lower.includes('nagad')) badgeStyle = 'bg-orange-950/80 text-orange-300 border-orange-800/80';
              else if (lower.includes('rocket')) badgeStyle = 'bg-purple-950/80 text-purple-300 border-purple-800/80';
              else if (lower.includes('visa') || lower.includes('master')) badgeStyle = 'bg-blue-950/80 text-blue-300 border-blue-800/80';
              else if (lower.includes('upay')) badgeStyle = 'bg-amber-950/80 text-amber-300 border-amber-800/80';

              return (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded border font-bold ${badgeStyle}`}
                >
                  {method}
                </span>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};
