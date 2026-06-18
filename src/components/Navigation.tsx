import React from 'react';
import { QrCode, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewState } from '../App';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onViewChange('generator')}
      >
        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">Q</div>
        <span className="text-xl font-bold tracking-tight text-white hidden sm:block">QRCraft <span className="text-sky-500">Toolkit</span></span>
      </div>
      
      <div className="hidden sm:flex gap-8 text-sm font-medium text-slate-400">
        <button 
          onClick={() => onViewChange('generator')} 
          className={currentView === 'generator' ? 'text-sky-400' : 'hover:text-white transition-colors'}
        >
          Generator
        </button>
        {currentView === 'generator' && (
          <a href="#features" className="hover:text-white transition-colors">Features</a>
        )}
      </div>
      
      <div className="hidden sm:flex items-center">
        <button 
          onClick={() => onViewChange('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 ${currentView === 'dashboard' ? 'bg-sky-500 text-white' : 'bg-white text-slate-950'} text-sm font-bold rounded-full hover:bg-sky-400 hover:text-white transition-colors`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
      </div>

      <div className="flex items-center sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 sm:hidden flex flex-col gap-4 shadow-xl"
        >
          <button onClick={() => { onViewChange('generator'); setIsOpen(false); }} className={`text-left font-medium ${currentView === 'generator' ? 'text-sky-400' : 'text-slate-400'}`}>Generator</button>
          {currentView === 'generator' && <a href="#features" onClick={() => setIsOpen(false)} className="text-slate-400 font-medium hover:text-white">Features</a>}
          <button onClick={() => { onViewChange('dashboard'); setIsOpen(false); }} className={`flex items-center gap-2 self-start px-4 py-2 ${currentView === 'dashboard' ? 'bg-sky-500 text-white' : 'bg-white text-slate-950'} text-sm font-bold rounded-full hover:bg-sky-400 hover:text-white transition-colors`}>
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </motion.div>
      )}
    </nav>
  );
}
