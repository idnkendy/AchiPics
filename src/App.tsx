/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Homepage } from './components/home/Homepage';
import { AppHeader } from './components/layout/AppHeader';
import { NavigationBar } from './components/layout/NavigationBar';
import { ImageGenerator } from './components/tools/ImageGenerator';
import { FloorPlan } from './components/tools/FloorPlan';
import { Renovation } from './components/tools/Renovation';
import { ViewSync } from './components/tools/ViewSync';
import { ImageEditor } from './components/tools/ImageEditor';
import { ExtendedToolsDashboard } from './components/tools/ExtendedToolsDashboard';
import { PublicPricing } from './components/pages/PublicPricing';
import { PaymentPage } from './components/pages/PaymentPage';
import { AuthPage } from './components/pages/AuthPage';
import { HistoryPanel } from './components/pages/HistoryPanel';
import { UserProfile } from './components/pages/UserProfile';
import { ContactPage } from './components/pages/ContactPage';
import { TermsPage } from './components/pages/TermsPage';

const AppContent: React.FC = () => {
  const { activeRoute, activeMainTool, activeExtendedTool } = useApp();

  // 1. Standalone pages
  if (activeRoute === '/') {
    return <Homepage />;
  }

  if (activeRoute === '/auth') {
    return <AuthPage />;
  }

  if (activeRoute === '/pricing') {
    return <PublicPricing />;
  }

  if (activeRoute === '/payment') {
    return <PaymentPage />;
  }

  if (activeRoute === '/contacts') {
    return <ContactPage />;
  }

  if (activeRoute === '/terms-of-service') {
    return <TermsPage />;
  }

  // 2. Workspace pages with AppHeader (64px) + NavigationBar (48px)
  return (
    <div className="min-h-screen flex flex-col bg-[#0E1726] text-[#F1ECE2] transition-colors">
      <AppHeader />
      <NavigationBar />

      {/* Main workspace container with 112px top offset for header + subnav */}
      <main className="pt-[112px] flex-1 flex flex-col">
        {activeRoute === '/history' ? (
          <HistoryPanel />
        ) : activeRoute === '/profile' ? (
          <UserProfile />
        ) : activeExtendedTool ? (
          <ExtendedToolsDashboard />
        ) : (
          <>
            {activeMainTool === 'render' && <ImageGenerator />}
            {activeMainTool === 'floorplan' && <FloorPlan />}
            {activeMainTool === 'renovation' && <Renovation />}
            {activeMainTool === 'viewsync' && <ViewSync />}
            {activeMainTool === 'editor' && <ImageEditor />}
          </>
        )}
      </main>
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
