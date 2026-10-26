import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  MessageCircle,
  ExternalLink,
  Layers,
  Clock,
  RotateCcw
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { adminSettings, setCurrentPage } = useApp();

  const handleInquire = (serviceMsg: string) => {
    const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(serviceMsg)}`, '_blank');
  };

  return (
    <section id="services-section" className="py-20 relative bg-slate-50 dark:bg-[#070b14] border-t border-slate-200 dark:border-slate-800/80 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-400 text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MORE THAN JUST HOSTING</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Creative & Apparel Design Services
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Power your brand with precision machine embroidery digitizing and high-converting graphic design. Click below to explore dedicated pages, plans, and portfolios.
          </p>
        </div>

        {/* 2 Services Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Embroidery Design */}
          <div className="group relative rounded-3xl p-8 bg-white dark:bg-[#0d1424] border-2 border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between">
            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-md">
                  <Scissors className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 uppercase tracking-wider">
                  PRECISION DIGITIZING
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Embroidery Design & Digitizing
              </h3>
              <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-3">
                Industrial digitizing, caps, patches & 3D puff
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Calibrated machine embroidery digitizing for apparel factories, streetwear brands, caps, and custom patches. Zero thread breaks and under 2-4 hours delivery.
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-8">
                {[
                  'Left Chest, Cap & 3D Foam Raised Digitizing',
                  'Jacket Backs & Complex Gradient Art',
                  'Tackle Twill Applique & Laser Patch Outlines',
                  'All Formats (.DST, .EMB, .PES, .EXP, .VP3)',
                  'Unlimited Free Revisions until 100% satisfied'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button Actions */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentPage('embroidery')}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>View Embroidery Page & Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleInquire('Hello ToofanHost! I am inquiring about Embroidery Design and Digitizing services.')}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Quick WhatsApp Inquiry</span>
              </button>
            </div>
          </div>

          {/* Card 2: Graphics Design */}
          <div className="group relative rounded-3xl p-8 bg-white dark:bg-[#0d1424] border-2 border-slate-200 dark:border-slate-800 hover:border-pink-500/60 transition-all duration-300 shadow-lg hover:shadow-pink-500/10 flex flex-col justify-between">
            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center shadow-md">
                  <Palette className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 dark:bg-pink-950/80 text-pink-800 dark:text-pink-400 border border-pink-200 dark:border-pink-800 uppercase tracking-wider">
                  PREMIUM CREATIVE
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                Graphics Design & Branding
              </h3>
              <p className="text-sm font-medium text-pink-700 dark:text-pink-400 mb-3">
                Modern logos, social media & Figma UI/UX
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Elevate your business with conversion-focused branding, vector logos, social media ad kits, and modern Figma web landing pages.
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-8">
                {[
                  'Custom Vector Logo & Complete Brand Guidelines',
                  'High-Converting Facebook & Instagram Ad Creatives',
                  'Modern Figma UI/UX Landing Pages & Dashboards',
                  'Print Collateral, Business Cards & Product Packaging',
                  'All Vector Master Files (.AI, .PSD, .SVG, .FIGMA)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button Actions */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentPage('graphics')}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>View Graphics Page & Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleInquire('Hello ToofanHost! I am inquiring about Graphics Design and Creative Branding services.')}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Quick WhatsApp Inquiry</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
