import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServicePlan } from '../types';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
  Layers,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  ShoppingCart,
  Download,
  Scissors,
  Award,
  Check,
  ChevronRight,
  Home,
  Palette,
  Server,
  Zap,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const EmbroideryPage: React.FC = () => {
  const {
    embroideryPlans,
    formatPrice,
    currency,
    addToCart,
    adminSettings,
    setCurrentPage,
    setIsAdminModalOpen
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'cap' | 'jacket' | '3d'>('all');

  const portfolioItems = [
    {
      id: 1,
      title: '3D Puff Streetwear Cap',
      type: '3d',
      category: 'Cap & 3D Foam',
      stitches: '8,450 Stitches',
      formats: '.DST, .EMB, .PES',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
      description: 'Clean satin caps with EVA foam tear-away calibration for curved baseball caps.',
    },
    {
      id: 2,
      title: 'Corporate Polo Left Chest',
      type: 'cap',
      category: 'Polo & Uniform',
      stitches: '6,200 Stitches',
      formats: '.DST, .EXP, .VP3',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
      description: 'Pique knit fabric pull-compensation to ensure razor-sharp lettering and zero distortion.',
    },
    {
      id: 3,
      title: 'Biker Vest Skull Jacket Back',
      type: 'jacket',
      category: 'Jacket Back',
      stitches: '48,000 Stitches',
      formats: '.DST, .EMB, .OFM',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
      description: 'High-density multi-tatami stitch pathing with vibrant color transitions and zero thread breaks.',
    },
    {
      id: 4,
      title: 'Vintage Merrowed Applique Patch',
      type: '3d',
      category: 'Embroidered Patch',
      stitches: '14,300 Stitches',
      formats: '.DST, .EMB, .AI Cut',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
      description: 'Laser cutting contour vectors, tackle twill outline, and thick merrowed edge satin borders.',
    },
  ];

  const filteredPortfolio =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeFilter);

  const handleOrderPlan = (plan: ServicePlan) => {
    // If admin set a custom direct link, open it
    if (plan.orderUrl && plan.orderUrl.trim() !== '') {
      window.open(plan.orderUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Otherwise add to cart & open cart drawer
    addToCart({
      id: `emb-${plan.id}-${Date.now()}`,
      type: 'service',
      serviceCategory: 'embroidery',
      title: `Embroidery: ${plan.name}`,
      subtitle: `${plan.deliveryTime} Turnaround • ${plan.revisions}`,
      price: currency === 'BDT' ? plan.priceBDT : plan.priceUSD,
      currency: currency,
      specsSummary: plan.formats.slice(0, 3).join(', '),
    });
  };

  const handleWhatsAppOrder = (plan: ServicePlan) => {
    const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');
    const priceText = formatPrice(plan.priceBDT, plan.priceUSD);
    const msg = `Hello ToofanHost! I want to order the Embroidery Digitizing plan: "${plan.name}" (${priceText}). Please guide me through uploading my artwork.`;
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* Top Breadcrumb & Page Switcher */}
      <div className="bg-white/80 dark:bg-[#090f1d]/80 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-cyan-700 dark:text-cyan-400 font-bold">Services</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-extrabold">Embroidery Design</span>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setCurrentPage('home')}
              className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Server className="w-3 h-3" />
              <span>Web Hosting</span>
            </button>
            <button
              className="px-3 py-1 rounded-lg bg-cyan-600 text-white font-bold shadow-sm flex items-center gap-1"
            >
              <Scissors className="w-3 h-3" />
              <span>Embroidery Design</span>
            </button>
            <button
              onClick={() => setCurrentPage('graphics')}
              className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Palette className="w-3 h-3" />
              <span>Graphics Design</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-cyan-500/10 via-slate-50 dark:via-[#070b14] to-slate-50 dark:to-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs sm:text-sm font-extrabold mb-4 shadow-sm">
              <Scissors className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>PREMIUM EMBROIDERY DIGITIZING & VECTOR CONVERSION</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Flawless Stitch-Outs with{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
                Toofan Precision
              </span>
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Industrial-grade machine embroidery digitizing for apparel brands, garment factories, streetwear labels, and custom embroidery shops. Zero thread breaks, perfect push-pull compensation, and under 2-4 hours delivery.
            </p>

            {/* Quick Guarantees Pill */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>2 - 4 Hours Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <RotateCcw className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Unlimited Free Revisions</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>All Formats (.DST, .EMB, .PES, .EXP)</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pricing-plans"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>View Pricing Plans</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');
                  window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent('Hello ToofanHost! I need custom Embroidery Digitizing for my design.')}`, '_blank');
                }}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Specialized Embroidery Digitizing Capabilities
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
            From miniature cap lettering to 50,000-stitch jacket backs and raised 3D foam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Cap & Left Chest Digitizing
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Curved center-out stitch sequences calibrated for 6-panel structured caps and stretchy polo fabrics without distortion.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              3D Puff & Raised Foam
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Capped satin ends and specialized underlay density to completely seal 2mm-3mm high-density EVA foam on hats and streetwear hoodies.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-sky-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Jacket Backs & Large Art
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Expansive 12x12 to 14x14 inch embroidery with balanced density tatami fills, smooth gradient shading, and zero fabric puckering.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Applique & Merrowed Patches
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Precise tackle-twill placement lines, laser cutting vector files (.AI/.EPS), and dense merrowed border stitch outlines.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans Grid (Editable via Admin Panel) */}
      <section id="pricing-plans" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT DIGITIZING PRICING</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Select Your Embroidery Package
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            All plans include unlimited free revisions, full vector production runsheet, and multi-machine format exports.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Prices shown in {currency}.</span>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-cyan-600 dark:text-cyan-400 underline font-semibold hover:text-cyan-500"
            >
              (Edit pricing in Admin Panel)
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {embroideryPlans.map((plan) => {
            const isHighlight = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-gradient-to-b from-cyan-500/10 via-white to-white dark:from-cyan-950/30 dark:via-[#0e1628] dark:to-[#0e1628] border-2 border-cyan-500 dark:border-cyan-400 shadow-xl shadow-cyan-500/15 scale-[1.02]'
                    : 'bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm'
                }`}
              >
                {/* Popular / Fast Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-[11px] font-extrabold tracking-wide uppercase shadow-sm whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mt-2">
                    <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Fixed Price
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
                        {formatPrice(plan.priceBDT, plan.priceUSD)}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        / design
                      </span>
                    </div>
                  </div>

                  {/* Turnaround & Revisions spec */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        Turnaround:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {plan.deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <RotateCcw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        Revisions:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {plan.revisions}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-5 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      What's Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Formats Tags */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Export Formats:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {plan.formats.map((fmt, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => handleOrderPlan(plan)}
                    className={`w-full py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isHighlight
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02]'
                        : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 shadow-sm'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Order Package</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppOrder(plan)}
                    className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Portfolio Stitch-Out Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>PRODUCTION SHOWCASE</span>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
              Recent Embroidery Stitch-Outs
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">
              Tested on industrial embroidery machines with Madeira rayon threads.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Designs
            </button>
            <button
              onClick={() => setActiveFilter('3d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === '3d'
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              3D Puff & Patches
            </button>
            <button
              onClick={() => setActiveFilter('cap')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'cap'
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Caps & Chest
            </button>
            <button
              onClick={() => setActiveFilter('jacket')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'jacket'
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Jacket Backs
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-[#0d1424] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{item.stitches}</span>
                  <span>{item.formats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Machine & Software Formats Compatibility */}
      <section className="py-14 bg-white dark:bg-[#090f1d] border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-6">
            100% Compatible with All Commercial & Home Embroidery Machines
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
            {['Tajima (.DST)', 'Barudan (.DSB)', 'Brother (.PES)', 'Melco (.EXP)', 'Wilcom (.EMB)', 'Janome (.JEF)', 'Husqvarna (.VP3)', 'Bernina (.ART)'].map(
              (brand, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>{brand}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700 text-white shadow-2xl">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">
              Need a Custom Bulk Quote or Urgent 1-Hour Rush?
            </h2>
            <p className="mt-3 text-cyan-100 text-sm sm:text-base">
              Send your logo, PNG, JPEG or sketch directly to our digitizing engineers on WhatsApp. We provide free stitch estimates in 10 minutes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');
                  window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent('Hello ToofanHost! I need an urgent embroidery quote for my logo.')}`, '_blank');
                }}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-lg hover:bg-slate-100 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Quote</span>
              </button>
              <button
                onClick={() => setCurrentPage('home')}
                className="px-6 py-3.5 rounded-xl bg-cyan-700/60 hover:bg-cyan-700 text-white font-extrabold text-sm border border-cyan-400/40 transition-all cursor-pointer flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Web Hosting</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
