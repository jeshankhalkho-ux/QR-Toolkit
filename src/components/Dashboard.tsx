import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Save, Search, Tag, MoreVertical, Edit2, Trash2, BarChart3, Database, Folder } from 'lucide-react';
import { SavedQRCode } from '../types';

export default function Dashboard() {
  const [qrs, setQrs] = useState<SavedQRCode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFolder, setActiveFolder] = useState<string>('all');
  
  useEffect(() => {
    const loaded = localStorage.getItem('qr_dashboard_items');
    if (loaded) {
      setQrs(JSON.parse(loaded));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = qrs.filter(qr => qr.id !== id);
    setQrs(updated);
    localStorage.setItem('qr_dashboard_items', JSON.stringify(updated));
  };

  const filteredQRs = qrs.filter(qr => {
    const matchesSearch = qr.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          qr.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFolder = activeFolder === 'all' || qr.tags.includes(activeFolder);
    return matchesSearch && matchesFolder;
  });

  const uniqueTags = Array.from(new Set(qrs.flatMap(qr => qr.tags)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar Folders/Tags */}
      <div className="w-full lg:w-64 shrink-0 space-y-6 lg:border-r lg:border-slate-800 lg:pr-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-3 lg:px-0">Collections</h2>
          <nav className="space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <button
              onClick={() => setActiveFolder('all')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${activeFolder === 'all' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Database className="w-4 h-4" />
              All QR Codes
            </button>
            {uniqueTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFolder(tag)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize whitespace-nowrap lg:whitespace-normal flex-shrink-0 ${activeFolder === tag ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <Folder className="w-4 h-4" />
                {tag} Codes
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Your Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage and track your generated QR codes.</p>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search QR codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-slate-700 rounded-xl leading-5 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:bg-slate-950 focus:border-sky-500 transition-colors sm:text-sm"
            />
          </div>
        </div>

        {qrs.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl p-12 bg-slate-900/50">
            <Database className="w-12 h-12 text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No QR codes yet</h3>
            <p className="text-slate-400 text-center max-w-sm">
              Create your first QR code using the generator and save it to your dashboard to track analytics and manage it later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredQRs.map((qr) => (
              <div key={qr.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors flex flex-col h-[320px]">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="truncate pr-4">
                    <h3 className="font-bold text-white truncate" title={qr.name}>{qr.name}</h3>
                    <p className="text-xs text-slate-500">{new Date(qr.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(qr.id)} className="text-slate-500 hover:text-rose-400 transition-colors p-1 bg-slate-950 rounded-md border border-slate-800" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-xl p-4 flex items-center justify-center mb-4 relative group">
                  <div className="absolute inset-0 bg-slate-900/80 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex rounded-xl">
                    <button onClick={() => { /* Real implementation would load QR to context */ }} className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                      <Edit2 className="w-3 h-3" /> Edit Settings
                    </button>
                  </div>
                  <div className="w-32 h-32">
                    <QRCodeCanvas
                      value={qr.data.value || ' '}
                      size={128}
                      style={{ width: '100%', height: '100%' }}
                      bgColor={qr.design.bgColor}
                      fgColor={qr.design.fgColor}
                      level={qr.design.errorCorrection}
                      includeMargin={qr.design.includeMargin}
                      imageSettings={qr.design.logoImage ? {
                        src: qr.design.logoImage,
                        height: 128 * 0.22,
                        width: 128 * 0.22,
                        excavate: true,
                      } : undefined}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <div className="bg-slate-950 rounded-lg p-2 flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1"><Tag className="w-3 h-3"/> Tag</span>
                    <div className="flex gap-1 mt-1 overflow-x-hidden">
                      {qr.tags.map(t => (
                        <span key={t} className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded capitalize">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-950 rounded-lg p-2 flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1"><BarChart3 className="w-3 h-3"/> Scans</span>
                    <span className="text-sm font-medium text-slate-300">{qr.scans} <span className="text-slate-600 text-[10px] font-medium uppercase">Total</span></span>
                  </div>
                </div>

              </div>
            ))}
            {filteredQRs.length === 0 && (
               <div className="col-span-full py-12 text-center text-slate-500">
                 No QR codes found in this category.
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
