import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServicePlan } from '../types';
import {
  Palette,
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  ShoppingCart,
  Download,
  PenTool,
  Award,
  Check,
  ChevronRight,
  Home,
  Scissors,
  Server,
  Zap,
  Layout,
  Layers,
  Image as ImageIcon,
  FileCheck
} from 'lucide-react';

export const GraphicsPage: React.FC = () => {
  const {
    graphicsPlans,
    formatPrice,
    currency,
    addToCart,
    adminSettings,
    setCurrentPage,
    setIsAdminModalOpen
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'logo' | 'social' | 'ui'>('all');

  const portfolioItems = [
    {
      id: 1,
      title: 'FinTech App Vector Logo & Brandbook',
      type: 'logo',
      category: 'Logo & Brand Identity',
      tools: 'Adobe Illustrator, Figma',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
      description: 'Geometric modern monogram with dark-mode color palette and comprehensive typography guidelines.',
    },
    {
      id: 2,
      title: 'E-Commerce Growth Social Media Pack',
      type: 'social',
      category: 'Social Media & Ads',
      tools: 'Photoshop, Illustrator',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
      description: 'High-converting Facebook & Instagram carousel ads with bold typography and clear calls to action.',
    },
    {
      id: 3,
      title: 'SaaS Platform Dashboard UI/UX Design',
      type: 'ui',
      category: 'UI/UX Web & Mobile',
      tools: 'Figma Auto-Layout',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      description: 'Clean responsive dashboard interface with interactive prototyping and complete design system tokens.',
    },
    {
      id: 4,
      title: 'Organic Beverage Luxury Packaging',
      type: 'logo',
      category: 'Packaging & Print',
      tools: 'Illustrator 3D',
      image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80',
      description: 'Minimalist foil-stamped luxury bottle label and unboxing experience design for retail shelves.',
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
      id: `gfx-${plan.id}-${Date.now()}`,
      type: 'service',
      serviceCategory: 'graphics',
      title: `Graphics: ${plan.name}`,
      subtitle: `${plan.deliveryTime} Turnaround • ${plan.revisions}`,
      price: currency === 'BDT' ? plan.priceBDT : plan.priceUSD,
      currency: currency,
      specsSummary: plan.formats.slice(0, 3).join(', '),
    });
  };

  const handleWhatsAppOrder = (plan: ServicePlan) => {
    const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');
    const priceText = formatPrice(plan.priceBDT, plan.priceUSD);
    const msg = `Hello ToofanHost! I want to order the Graphics Design plan: "${plan.name}" (${priceText}). Please share the creative brief.`;
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
            <span className="text-slate-900 dark:text-white font-extrabold">Graphics Design</span>
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
              onClick={() => setCurrentPage('embroidery')}
              className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Scissors className="w-3 h-3" />
              <span>Embroidery Design</span>
            </button>
            <button
              className="px-3 py-1 rounded-lg bg-pink-600 text-white font-bold shadow-sm flex items-center gap-1"
            >
              <Palette className="w-3 h-3" />
              <span>Graphics Design</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-pink-500/10 via-slate-50 dark:via-[#070b14] to-slate-50 dark:to-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-500/15 border border-pink-300 dark:border-pink-500/30 text-pink-800 dark:text-pink-400 text-xs sm:text-sm font-extrabold mb-4 shadow-sm">
              <Palette className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span>CREATIVE GRAPHICS DESIGN & BRANDING SUITE</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Visuals That Build Authority &{' '}
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 dark:from-pink-400 dark:via-rose-300 dark:to-indigo-300 bg-clip-text text-transparent">
                Drive Scaled Sales
              </span>
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              From iconic vector logos and cohesive corporate identities to high-converting social media marketing kits and Figma UI/UX prototypes. Created by award-winning visual designers.
            </p>

            {/* Quick Guarantees Pill */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Clock className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                <span>24 - 48 Hours Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <RotateCcw className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Unlimited Creative Revisions</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Vector Files (.AI, .PSD, .SVG, .FIGMA)</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pricing-plans"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-pink-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>View Design Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');
                  window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent('Hello ToofanHost! I need custom Graphics Design and Brand Identity for my company.')}`, '_blank');
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
            Comprehensive Creative Services
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
            Everything your brand needs to look world-class across digital and physical touchpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-pink-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Logo & Visual Identity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Memorable logos, color schemes, typography systems, and full brand guideline manuals ready for trademarking.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Social Media & Ad Creatives
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Eye-stopping Facebook, Instagram, YouTube & TikTok post banners, story layouts, and high-CTR paid ad creatives.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-rose-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              UI/UX Web & Mobile Design
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modern Figma web landing pages, dashboard user interfaces, and mobile app wireframes with interactive prototypes.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0d1424] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Packaging & Print Collateral
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Business cards, corporate letterheads, brochures, flyers, product boxes, t-shirt prints, and trade show banners.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans Grid (Editable via Admin Panel) */}
      <section id="pricing-plans" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-500/10 border border-pink-300 dark:border-pink-500/20 text-pink-800 dark:text-pink-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT GRAPHICS PACKAGES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Choose Your Creative Package
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            All design packages include 100% commercial copyright ownership, raw vector source files, and unlimited revisions.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Prices shown in {currency}.</span>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-pink-600 dark:text-pink-400 underline font-semibold hover:text-pink-500"
            >
              (Edit pricing in Admin Panel)
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {graphicsPlans.map((plan) => {
            const isHighlight = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-gradient-to-b from-pink-500/10 via-white to-white dark:from-pink-950/30 dark:via-[#0e1628] dark:to-[#0e1628] border-2 border-pink-500 dark:border-pink-400 shadow-xl shadow-pink-500/15 scale-[1.02]'
                    : 'bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 hover:border-pink-500/40 shadow-sm'
                }`}
              >
                {/* Popular / Fast Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-pink-600 to-indigo-600 text-white text-[11px] font-extrabold tracking-wide uppercase shadow-sm whitespace-nowrap">
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
                      Package Price
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
                        {formatPrice(plan.priceBDT, plan.priceUSD)}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        / project
                      </span>
                    </div>
                  </div>

                  {/* Turnaround & Revisions spec */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
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
                        <Check className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Formats Tags */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Master Files:
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
                        ? 'bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-lg shadow-pink-500/25 hover:scale-[1.02]'
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

      {/* Portfolio Creative Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-500/10 text-pink-800 dark:text-pink-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CREATIVE PORTFOLIO</span>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
              Selected Works & Branding Samples
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">
              Custom-crafted design assets delivering quantifiable growth for startups and brands.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter('logo')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'logo'
                  ? 'bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Logos & Identity
            </button>
            <button
              onClick={() => setActiveFilter('social')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'social'
                  ? 'bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Social & Ad Banners
            </button>
            <button
              onClick={() => setActiveFilter('ui')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === 'ui'
                  ? 'bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              UI/UX & Web
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-[#0d1424] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:border-pink-500/50 transition-all duration-300"
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
                  <span className="font-bold text-pink-600 dark:text-pink-400">{item.tools}</span>
                  <span>100% Vector</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Workflow */}
      <section className="py-14 bg-white dark:bg-[#090f1d] border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
              Our 4-Step Creative Design Process
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Structured collaboration designed to deliver outstanding results without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-extrabold flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Creative Briefing</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You share your ideas, references, target audience, and preferred brand vibes.
              </p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Initial Concepts</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Our art directors create 3 to 5 unique design concepts and color directions.
              </p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-extrabold flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Unlimited Revisions</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                We polish typography, spacing, and colors until you are completely thrilled.
              </p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Final Handover</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Download all high-res vector files (.AI, .PSD, .SVG, .PNG, .PDF) ready for production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-700 text-white shadow-2xl">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">
              Have a Custom Project or Custom Budget?
            </h2>
            <p className="mt-3 text-pink-100 text-sm sm:text-base">
              Talk directly with our creative director on WhatsApp for instant pricing, custom scope, and free design advice.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');
                  window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent('Hello ToofanHost! I want to discuss a custom Graphics Design project.')}`, '_blank');
                }}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-lg hover:bg-slate-100 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Discussion</span>
              </button>
              <button
                onClick={() => setCurrentPage('home')}
                className="px-6 py-3.5 rounded-xl bg-pink-700/60 hover:bg-pink-700 text-white font-extrabold text-sm border border-pink-400/40 transition-all cursor-pointer flex items-center gap-2"
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
