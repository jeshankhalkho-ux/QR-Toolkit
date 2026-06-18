/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import QRGenerator from './components/QRGenerator';
import Features from './components/Features';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

export type ViewState = 'generator' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('generator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 flex flex-col">
        {currentView === 'generator' ? (
          <>
            <Hero />
            <QRGenerator />
            <Features />
          </>
        ) : (
          <Dashboard />
        )}
      </main>
      <Footer />
    </div>
  );
}
