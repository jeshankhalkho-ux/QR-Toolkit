import React from 'react';
import { QrCode, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="h-10 px-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 bg-slate-900/80 py-4 sm:py-0">
      <div className="flex gap-4">
        <span>&copy; {new Date().getFullYear()} QRCraft Enterprise</span>
        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Systems Operational</span>
      </div>
      <div className="flex gap-6 uppercase tracking-widest font-bold mt-2 sm:mt-0">
        <a href="#" className="hover:text-white">Privacy</a>
        <a href="#" className="hover:text-white">Terms</a>
        <a href="#" className="hover:text-white">v2.4.0</a>
      </div>
    </footer>
  );
}
