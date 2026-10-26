import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Zap } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { adminSettings } = useApp();

  const cleanNum = adminSettings.supportWhatsApp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Floating tooltip */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 border border-emerald-500/30 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap pointer-events-none">
        <span className="font-bold text-emerald-400">Need instant hosting help?</span> Chat with us!
      </div>

      <a
        href={`https://wa.me/${cleanNum}?text=Hello%20ToofanHost!%20I%20have%20a%20question%20about%20domain%20and%20hosting.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ToofanHost Support on WhatsApp"
        className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer relative"
      >
        <MessageSquare className="w-7 h-7 fill-slate-950" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-900" />
      </a>
    </div>
  );
};
