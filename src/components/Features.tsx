import React from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Database, BarChart3, Palette, Shield } from 'lucide-react';

const features = [
  {
    name: 'Batch Processing',
    description: 'Generate up to 500 QR codes from CSV in seconds.',
    icon: Layers,
    color: 'indigo',
    action: 'LAUNCH TOOL'
  },
  {
    name: 'Developer API',
    description: 'Seamlessly integrate generation into your own apps.',
    icon: Database,
    color: 'emerald',
    action: 'READ DOCS'
  },
  {
    name: 'Scan Analytics',
    description: 'Track unique scans, devices, and global locations.',
    icon: BarChart3,
    color: 'rose',
    action: 'VIEW DEMO'
  },
  {
    name: 'Visual Designs',
    description: 'Use templates to make high-end artistic QR codes.',
    icon: Palette,
    color: 'amber',
    action: 'BROWSE GALLERY'
  },
  {
    name: 'High Performance',
    description: 'Instant client-side rendering with zero waiting time.',
    icon: Zap,
    color: 'sky',
    action: 'TEST SPEED'
  },
  {
    name: 'Enterprise Security',
    description: 'SSO, custom domains, and strict privacy controls.',
    icon: Shield,
    color: 'purple',
    action: 'LEARN MORE'
  }
];

export default function Features() {

  const getColorClasses = (color: string) => {
    const classes: Record<string, string> = {
      indigo: 'bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20 icon-bg-indigo-500 icon-shadow-indigo-500/40 text-indigo-400 hover-text-indigo-300',
      emerald: 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 icon-bg-emerald-500 icon-shadow-emerald-500/40 text-emerald-400 hover-text-emerald-300',
      rose: 'bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20 icon-bg-rose-500 icon-shadow-rose-500/40 text-rose-400 hover-text-rose-300',
      amber: 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20 icon-bg-amber-500 icon-shadow-amber-500/40 text-amber-400 hover-text-amber-300',
      sky: 'bg-sky-500/10 border-sky-500/20 hover:bg-sky-500/20 icon-bg-sky-500 icon-shadow-sky-500/40 text-sky-400 hover-text-sky-300',
      purple: 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 icon-bg-purple-500 icon-shadow-purple-500/40 text-purple-400 hover-text-purple-300',
    };
    return classes[color] || classes.indigo;
  };

  return (
    <div id="features" className="py-24 bg-slate-950 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color).split(' ');
            const cardClass = `${colors[0]} border ${colors[1]} ${colors[2]} rounded-2xl p-6 flex flex-col justify-between transition-colors group h-48`;
            const iconBgClass = colors[3].replace('icon-bg-', 'bg-');
            const iconShadowClass = colors[4].replace('icon-shadow-', 'shadow-');
            const textClass = colors[5];
            const hoverTextClass = colors[6].replace('hover-text-', 'group-hover:text-');
            
            return (
              <motion.div 
                key={feature.name} 
                className={cardClass}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  <div className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center mb-4 shadow-lg ${iconShadowClass} text-white`}>
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-white leading-tight mb-2">{feature.name}</h3>
                  <p className="text-xs text-slate-300">{feature.description}</p>
                </div>
                <span className={`text-[10px] font-bold ${textClass} ${hoverTextClass} mt-4`}>{feature.action} &rarr;</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
