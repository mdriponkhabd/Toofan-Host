import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HostingPlansSection } from './components/HostingPlansSection';
import { BDIXSection, ServerSpeedTest } from './components/BDIXSection';
import { DomainPricingTable } from './components/DomainPricingTable';
import { ServicesSection } from './components/ServicesSection';
import { WhyToofanSection } from './components/WhyToofanSection';
import { TestimonialsSection, FAQSection } from './components/TestimonialsSection';
import { EmbroideryPage } from './components/EmbroideryPage';
import { GraphicsPage } from './components/GraphicsPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ConfigurePlanModal } from './components/ConfigurePlanModal';
import { AuthModal } from './components/AuthModal';
import { DomainTransferModal } from './components/DomainTransferModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const AppContent: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();

  // Admin shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  // Also check if URL has '?admin=true' or '#admin'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentPage('admin');
      }
    };

    const checkIsAdmin = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      return path.includes('/admin') || path.endsWith('admin') || hash.includes('admin') || search.includes('admin');
    };

    if (checkIsAdmin()) {
      setCurrentPage('admin');
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentPage]);

  // If in Full-Page Admin Dashboard mode, render dedicated Admin view
  if (currentPage === 'admin') {
    return <AdminDashboardPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      {/* Navigation Bar with Login & Sign Up buttons & Page Switchers */}
      <Navbar />

      {/* Main Content: Render Active Page */}
      <main className="flex-1">
        {currentPage === 'embroidery' && <EmbroideryPage />}

        {currentPage === 'graphics' && <GraphicsPage />}

        {currentPage === 'home' && (
          <>
            {/* Hero Section with Storm Lightning Brand & Domain Search Box */}
            <Hero />

            {/* Hosting Packages with Monthly/Yearly switch and prices */}
            <HostingPlansSection />

            {/* BDIX Bangladesh Low Latency (2ms) Infrastructure */}
            <BDIXSection />

            {/* Domain Pricing & TLD Extension Table */}
            <DomainPricingTable />

            {/* Specialized Business Services: Embroidery Design & Graphics Design */}
            <ServicesSection />

            {/* Global Datacenter Speed & Latency Ping Tool */}
            <ServerSpeedTest />

            {/* Why ToofanHost Pillars */}
            <WhyToofanSection />

            {/* Client Testimonials */}
            <TestimonialsSection />

            {/* Frequently Asked Questions */}
            <FAQSection />
          </>
        )}
      </main>

      {/* Footer (Admin button removed per user request) */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <ConfigurePlanModal />
      <AuthModal />
      <DomainTransferModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
