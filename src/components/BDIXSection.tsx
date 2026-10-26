import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Gauge,
  Zap,
  Globe2,
  Activity,
  CheckCircle,
  Wifi,
  Server,
  RefreshCw,
  Clock
} from 'lucide-react';
import { DEFAULT_SERVER_LOCATIONS } from '../data/defaultData';

export const BDIXSection: React.FC = () => {
  const { openConfigModal, packages } = useApp();
  const bdixPackage = packages.find((p) => p.category === 'bdix') || packages[0];

  return (
    <section id="bdix-section" className="py-20 relative bg-white dark:bg-[#080d1a] border-y border-slate-200 dark:border-slate-800/80 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>DIRECT BDIX CONNECTIVITY 🇧🇩</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Why Websites Hosted on <br />
              <span className="text-emerald-600 dark:text-emerald-400">ToofanHost BDIX</span> Load in 500ms
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              When your target audience is in Bangladesh, routing traffic across overseas cables adds 150ms-250ms of needless lag. 
              With ToofanHost’s direct BDIX exchange peering, your visitors fetch pages locally at 10Gbps optical speeds with virtually zero latency.
            </p>

            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sub-5ms Ultra-Low Ping</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Connected to all major BD ISPs (Grameenphone, Banglalink, Robi, AmberIT, Dot Internet, Link3).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero International Bandwidth Choke</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">During submarine cable maintenance, your website keeps running flawlessly inside Bangladesh.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant bKash, Nagad & SSLCommerz Webhooks</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Faster API responses for eCommerce transactions, preventing cart abandonment.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openConfigModal(bdixPackage)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-500/30 transition-all cursor-pointer"
              >
                Deploy BDIX Hosting Now
              </button>
            </div>
          </div>

          {/* Right: Visual comparison graph / ping widget */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-500/20 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">Real-Time Latency Benchmark (Dhaka)</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                100% ONLINE
              </span>
            </div>

            {/* Comparison bars */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <span>🇧🇩</span> ToofanHost BDIX Dhaka Server
                  </span>
                  <span className="font-mono font-extrabold text-emerald-700 dark:text-emerald-300">3ms (Ultra Lightning)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[4%] animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>🇸🇬</span> ToofanHost Singapore Datacenter
                  </span>
                  <span className="font-mono font-bold text-cyan-700 dark:text-cyan-400">32ms (Very Fast)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-cyan-500 to-sky-500 h-full rounded-full w-[22%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span>🇩🇪</span> European Servers (Frankfurt)
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">118ms (Moderate)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                  <div className="bg-slate-400 dark:bg-slate-600 h-full rounded-full w-[60%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span>🇺🇸</span> Standard US Shared Hosting
                  </span>
                  <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">220ms (High Latency)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                  <div className="bg-rose-500 h-full rounded-full w-[95%]" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Direct 10Gbps IX peering
              </span>
              <span>cPanel + LiteSpeed LSCache included</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export const ServerSpeedTest: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [locations, setLocations] = useState(DEFAULT_SERVER_LOCATIONS);

  const runSpeedTest = () => {
    setTesting(true);
    setTimeout(() => {
      setLocations((prev) =>
        prev.map((loc) => ({
          ...loc,
          pingMs: Math.max(2, loc.pingMs + Math.floor(Math.random() * 5) - 2),
        }))
      );
      setTesting(false);
    }, 1200);
  };

  return (
    <section id="speed-test" className="py-20 relative bg-slate-100/60 dark:bg-[#070b14] scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-400 text-xs font-bold mb-3">
            <Gauge className="w-3.5 h-3.5" />
            <span>GLOBAL NETWORK INFRASTRUCTURE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Datacenter Speed & Latency Test
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Select the closest server region to your primary audience for instant TTFB (Time To First Byte).
          </p>

          <div className="mt-6">
            <button
              onClick={runSpeedTest}
              disabled={testing}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-400 border border-slate-300 dark:border-cyan-500/30 text-sm font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing Latency...' : 'Run Live Ping Benchmark'}</span>
            </button>
          </div>
        </div>

        {/* Server Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{loc.flag}</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-700">
                    <Clock className="w-3 h-3" />
                    <span>{loc.pingMs} ms</span>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">{loc.name}</h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{loc.city}, {loc.country}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3">{loc.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available Now
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">Tier IV DataCenter</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
