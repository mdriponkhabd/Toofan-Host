import React from 'react';
import {
  Zap,
  ShieldCheck,
  Server,
  Cpu,
  RotateCcw,
  Headphones,
  Award,
  Layers,
  Lock,
  Flame
} from 'lucide-react';

export const WhyToofanSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: '100% Gen4 NVMe Storage',
      desc: 'No traditional mechanical HDDs or slow SATA SSDs. Everything runs on ultra-fast PCIe 4.0 NVMe drives delivering 7000+ MB/s read speeds.',
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-500" />,
      title: 'LiteSpeed Enterprise Web Server',
      desc: 'Up to 6x faster than Apache and 3x faster than Nginx with built-in LSCache for WordPress, OpenCart, and custom web applications.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Imunify360 AI Security & DDoS',
      desc: 'Multi-layer machine learning defense that proactively cleans malware, blocks brute-force attacks, and prevents Web Application Firewall (WAF) exploits.',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Automated Daily JetBackup',
      desc: 'Rest easy with automatic offsite snapshots. Restore individual files, databases, cron jobs, or full cPanel accounts with just 1 click.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: 'Dedicated Isolated Cloud Resources',
      desc: 'CloudLinux OS guarantees your allotted RAM, CPU, and I/O limits are 100% dedicated to your site—neighboring tenants never slow you down.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: '24/7 Bangla & English Tech Support',
      desc: 'Real hosting engineers available around the clock via WhatsApp, live ticket, and direct phone. Average response time under 4 minutes.',
    },
  ];

  return (
    <section id="features" className="py-20 relative bg-white dark:bg-[#070b14] border-t border-slate-200 dark:border-slate-800 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-400 text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>UNBEATABLE INFRASTRUCTURE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Thousands Choose ToofanHost
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Built from the ground up for speed addicts, web designers, e-commerce founders, and developers who refuse to compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-900/80 transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 shadow-sm">
                {feat.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
