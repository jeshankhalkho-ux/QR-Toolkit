import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Link, Type, Wifi, Mail, Contact2, MessageSquare, Download, Upload, Share2, Save } from 'lucide-react';
import { QRType, QRData, QRDesign, ErrorCorrectionLevel, SavedQRCode } from '../types';
import { classNames } from '../utils';

const TABS: { id: QRType; name: string; icon: React.FC<any> }[] = [
  { id: 'url', name: 'URL', icon: Link },
  { id: 'text', name: 'Text', icon: Type },
  { id: 'wifi', name: 'WiFi', icon: Wifi },
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'vcard', name: 'vCard', icon: Contact2 },
  { id: 'sms', name: 'SMS', icon: MessageSquare },
  { id: 'social', name: 'Social', icon: Share2 }
];

const inputClassName = "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors shadow-inner text-sm";
const labelClassName = "block text-xs uppercase tracking-widest text-slate-500 mb-2 font-bold";

const TEMPLATES = [
  { id: 'classic', name: 'Classic Dark', fgColor: '#0F172A', bgColor: '#ffffff' },
  { id: 'blue', name: 'Sky Blue', fgColor: '#0EA5E9', bgColor: '#ffffff' },
  { id: 'emerald', name: 'Emerald', fgColor: '#10B981', bgColor: '#ffffff' },
  { id: 'rose', name: 'Rose', fgColor: '#F43F5E', bgColor: '#ffffff' },
  { id: 'midnight', name: 'Midnight', fgColor: '#ffffff', bgColor: '#0F172A' },
  { id: 'sunset', name: 'Sunset', fgColor: '#4C1D95', bgColor: '#FDE047' },
];

export default function QRGenerator() {
  const [activeTab, setActiveTab] = useState<QRType>('url');
  
  // Data State
  const [data, setData] = useState<QRData>({
    type: 'url',
    value: 'https://example.com',
    raw: { url: 'https://example.com' }
  });

  // Design State
  const [design, setDesign] = useState<QRDesign>({
    fgColor: '#0F172A', // Slate 900
    bgColor: '#ffffff',
    logoImage: null,
    includeMargin: true,
    size: 1024,
    errorCorrection: 'M'
  });

  const [saveStatus, setSaveStatus] = useState<string>('');

  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let result = '';
    const { raw, type } = data;
    
    switch(type) {
      case 'url':
        result = raw.url || '';
        break;
      case 'text':
        result = raw.text || '';
        break;
      case 'wifi':
        result = `WIFI:T:${raw.encryption || 'WPA'};S:${raw.ssid || ''};P:${raw.password || ''};;`;
        break;
      case 'email':
        result = `mailto:${raw.email || ''}?subject=${encodeURIComponent(raw.subject || '')}&body=${encodeURIComponent(raw.body || '')}`;
        break;
      case 'sms':
        result = `smsto:${raw.phone || ''}:${raw.message || ''}`;
        break;
      case 'vcard':
        result = `BEGIN:VCARD\nVERSION:3.0\nN:${raw.lastName || ''};${raw.firstName || ''}\nFN:${raw.firstName || ''} ${raw.lastName || ''}\nORG:${raw.organization || ''}\nTITLE:${raw.title || ''}\nTEL:${raw.phone || ''}\nEMAIL:${raw.email || ''}\nURL:${raw.url || ''}\nEND:VCARD`;
        break;
      case 'social':
        result = raw.platformUrl || '';
        break;
    }
    
    setData(prev => ({ ...prev, value: result }));
  }, [data.raw, data.type]);

  const handleRawChange = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      raw: { ...prev.raw, [field]: value }
    }));
  };

  const handleTabChange = (tab: QRType) => {
    setActiveTab(tab);
    setData(prev => ({ ...prev, type: tab }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDesign(prev => ({ ...prev, logoImage: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
      // Recommend H or Q when logo is added
      if (design.errorCorrection === 'L' || design.errorCorrection === 'M') {
        setDesign(prev => ({ ...prev, errorCorrection: 'H' }));
      }
    }
  };

  const downloadQR = (format: 'png' | 'svg') => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    if (format === 'png') {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `qrcode-pro-${Date.now()}.png`;
      a.href = url;
      a.click();
    }
  };

  const saveToDashboard = () => {
    const existingStr = localStorage.getItem('qr_dashboard_items');
    const existing: SavedQRCode[] = existingStr ? JSON.parse(existingStr) : [];
    
    // Give it a generic name based on tab and date
    const typeLabel = TABS.find(t => t.id === data.type)?.name || 'Custom';
    
    const newQR: SavedQRCode = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      name: `${typeLabel} QR Code`,
      data: { ...data },
      design: { ...design },
      tags: [data.type],
      scans: 0
    };

    localStorage.setItem('qr_dashboard_items', JSON.stringify([newQR, ...existing]));
    
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Editor */}
        <section className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col">
            
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-semibold text-white">Create QR Code</h2>
            <div className="flex gap-2 p-1 bg-slate-950 rounded-lg overflow-x-auto w-full sm:w-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={classNames(
                    activeTab === tab.id
                      ? 'bg-slate-800 text-white font-medium'
                      : 'text-slate-500 hover:text-white font-medium',
                    'px-3 py-1.5 flex items-center text-xs rounded-md transition-colors whitespace-nowrap'
                  )}
                >
                  <tab.icon className="mr-1.5 h-3.5 w-3.5" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="mb-8">
            <div className="space-y-4">
              {activeTab === 'url' && (
                <div>
                  <label className={labelClassName}>Website URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={data.raw.url || ''}
                    onChange={(e) => handleRawChange('url', e.target.value)}
                    className={inputClassName}
                  />
                </div>
              )}

              {activeTab === 'text' && (
                <div>
                  <label className={labelClassName}>Raw Text</label>
                  <textarea
                    rows={4}
                    placeholder="Enter your text here..."
                    value={data.raw.text || ''}
                    onChange={(e) => handleRawChange('text', e.target.value)}
                    className={`${inputClassName} resize-none`}
                  />
                </div>
              )}

              {activeTab === 'wifi' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>Network Name (SSID)</label>
                    <input
                      type="text"
                      placeholder="MyHomeNetwork"
                      value={data.raw.ssid || ''}
                      onChange={(e) => handleRawChange('ssid', e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Password</label>
                    <input
                      type="text"
                      placeholder="SecretPassword123"
                      value={data.raw.password || ''}
                      onChange={(e) => handleRawChange('password', e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Encryption</label>
                    <select
                      value={data.raw.encryption || 'WPA'}
                      onChange={(e) => handleRawChange('encryption', e.target.value)}
                      className={inputClassName}
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>Email Address</label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      value={data.raw.email || ''}
                      onChange={(e) => handleRawChange('email', e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Subject</label>
                    <input
                      type="text"
                      placeholder="Inquiry"
                      value={data.raw.subject || ''}
                      onChange={(e) => handleRawChange('subject', e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Body Message</label>
                    <textarea
                      rows={3}
                      placeholder="Hello there..."
                      value={data.raw.body || ''}
                      onChange={(e) => handleRawChange('body', e.target.value)}
                      className={`${inputClassName} resize-none`}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'sms' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1234567890"
                      value={data.raw.phone || ''}
                      onChange={(e) => handleRawChange('phone', e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Message</label>
                    <textarea
                      rows={3}
                      placeholder="Message content..."
                      value={data.raw.message || ''}
                      onChange={(e) => handleRawChange('message', e.target.value)}
                      className={`${inputClassName} resize-none`}
                    />
                  </div>
                </div>
              )}

               {activeTab === 'social' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>Platform Profile Link</label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/yourprofile"
                      value={data.raw.platformUrl || ''}
                      onChange={(e) => handleRawChange('platformUrl', e.target.value)}
                      className={inputClassName}
                    />
                    <p className="text-xs text-slate-500 mt-2">Works with Instagram, Twitter, LinkedIn, Youtube, etc.</p>
                  </div>
                </div>
              )}

              {activeTab === 'vcard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClassName}>First Name</label>
                    <input type="text" value={data.raw.firstName || ''} onChange={(e) => handleRawChange('firstName', e.target.value)} className={inputClassName} />
                  </div>
                  <div>
                    <label className={labelClassName}>Last Name</label>
                    <input type="text" value={data.raw.lastName || ''} onChange={(e) => handleRawChange('lastName', e.target.value)} className={inputClassName} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClassName}>Organization</label>
                    <input type="text" value={data.raw.organization || ''} onChange={(e) => handleRawChange('organization', e.target.value)} className={inputClassName} />
                  </div>
                  <div>
                    <label className={labelClassName}>Title</label>
                    <input type="text" value={data.raw.title || ''} onChange={(e) => handleRawChange('title', e.target.value)} className={inputClassName} />
                  </div>
                  <div>
                    <label className={labelClassName}>Phone</label>
                    <input type="tel" value={data.raw.phone || ''} onChange={(e) => handleRawChange('phone', e.target.value)} className={inputClassName} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClassName}>Email</label>
                    <input type="email" value={data.raw.email || ''} onChange={(e) => handleRawChange('email', e.target.value)} className={inputClassName} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-6">
            <div className="space-y-4">
              <h3 className={labelClassName}>Design Templates</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setDesign(prev => ({ ...prev, fgColor: template.fgColor, bgColor: template.bgColor }))}
                    className={classNames(
                      design.fgColor.toLowerCase() === template.fgColor.toLowerCase() && design.bgColor.toLowerCase() === template.bgColor.toLowerCase()
                        ? 'border-sky-500 ring-1 ring-sky-500 bg-slate-800'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700',
                      'border rounded-xl p-3 flex flex-col items-center gap-2 transition-all'
                    )}
                  >
                    <div className="w-full h-12 rounded-lg border border-slate-700/50 flex overflow-hidden">
                      <div className="flex-1" style={{ backgroundColor: template.bgColor }} />
                      <div className="flex-1" style={{ backgroundColor: template.fgColor }} />
                    </div>
                    <span className="text-xs font-medium text-slate-300">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <div className="space-y-4">
                <h3 className={labelClassName}>Custom Colors</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Foreground Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={design.fgColor}
                      onChange={(e) => setDesign(prev => ({ ...prev, fgColor: e.target.value }))}
                      className="h-10 w-10 p-1 border border-slate-700 bg-slate-950 rounded-lg cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={design.fgColor}
                      onChange={(e) => setDesign(prev => ({ ...prev, fgColor: e.target.value }))}
                      className={`${inputClassName} !w-32 uppercase`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={design.bgColor}
                      onChange={(e) => setDesign(prev => ({ ...prev, bgColor: e.target.value }))}
                      className="h-10 w-10 p-1 border border-slate-700 bg-slate-950 rounded-lg cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={design.bgColor}
                      onChange={(e) => setDesign(prev => ({ ...prev, bgColor: e.target.value }))}
                      className={`${inputClassName} !w-32 uppercase`}
                    />
                  </div>
                </div>
              </div>
            </div>

             <div className="space-y-4">
              <h3 className={labelClassName}>Data Correction</h3>
              <div className="flex gap-2 mb-2">
                {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map(level => {
                  const labels = { L: '7% (L)', M: '15% (M)', Q: '25% (Q)', H: '30% (H)' };
                  return (
                    <button
                      key={level}
                      onClick={() => setDesign(prev => ({ ...prev, errorCorrection: level }))}
                      className={classNames(
                        design.errorCorrection === level 
                          ? 'border-sky-500/50 text-sky-400 font-bold bg-sky-500/5' 
                          : 'border-slate-800 text-slate-400 hover:border-slate-600 bg-slate-950',
                        'flex-1 py-2 border rounded-lg text-xs transition-colors'
                      )}
                    >
                      {labels[level]}
                    </button>
                  );
                })}
              </div>
              <div className="p-4 bg-sky-500/5 rounded-xl border border-sky-500/10 text-xs text-slate-400">
                {design.errorCorrection === 'H' || design.errorCorrection === 'Q' 
                  ? 'High error correction recommended when embedding custom logos.'
                  : 'Lower error correction creates a simpler pattern. Not recommended with logos.'}
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-2">
              <h3 className={labelClassName}>Brand Logo</h3>
              <div className="flex items-center gap-4">
                {design.logoImage ? (
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <img src={design.logoImage} alt="Logo" className="w-10 h-10 object-contain rounded" />
                      <button 
                        onClick={() => setDesign(prev => ({ ...prev, logoImage: null }))}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold px-3 py-1 bg-rose-500/10 rounded-md transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-800 bg-slate-950/50 rounded-xl hover:border-sky-500/50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-slate-500" />
                    <span className="text-xs font-bold text-slate-400">Upload Logo (PNG, JPG)</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
          
          <div className="mt-auto grid grid-cols-2 gap-4">
             <button 
              onClick={saveToDashboard}
              className="py-4 border border-slate-700 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors tracking-widest text-sm flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saveStatus ? saveStatus : 'SAVE DRAFT'}
            </button>
            <button 
              onClick={() => downloadQR('png')}
              className="py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-xl shadow-sky-500/20 transition-transform active:scale-[0.98] uppercase tracking-widest text-sm text-center"
            >
              Download
            </button>
          </div>
        </section>

        {/* Right Column: Preview Card */}
        <section className="col-span-1 lg:col-span-4 bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-between h-full min-h-[400px]">
          <div className="w-full flex justify-between items-center mb-6 text-slate-950">
            <span className="text-[10px] font-black uppercase tracking-tighter">Live Preview</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>
          
          <div className="relative bg-slate-50 p-6 md:p-8 rounded-3xl border-4 border-slate-100 flex items-center justify-center mb-8 w-full aspect-square" ref={qrRef}>
            <QRCodeCanvas
              value={data.value || ' '}
              size={design.size}
              style={{ width: '100%', height: '100%', maxWidth: '240px', maxHeight: '240px' }}
              bgColor={design.bgColor}
              fgColor={design.fgColor}
              level={design.errorCorrection}
              includeMargin={design.includeMargin}
              imageSettings={design.logoImage ? {
                src: design.logoImage,
                height: design.size * 0.22,
                width: design.size * 0.22,
                excavate: true,
              } : undefined}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mt-auto">
            <button 
              onClick={() => downloadQR('png')} 
              className="py-3 border-2 border-slate-100 text-slate-900 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-4 h-4"/>
              PNG
            </button>
            <button 
              onClick={() => downloadQR('png')} 
              className="py-3 bg-slate-950 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <Download className="w-4 h-4"/>
              HD Export
            </button>
          </div>
        </section>
        
      </div>
    </div>
  );
}
