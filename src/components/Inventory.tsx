import { motion } from 'framer-motion';
import {
  Box,
  Cpu,
  Layers,
  Terminal,
  PenTool,
  Database,
  LucideIcon,
} from 'lucide-react';

interface Item {
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  Icon: LucideIcon;
  description: string;
}

const items: Item[] = [
  {
    name: 'Unity 3D',
    rarity: 'Legendary',
    Icon: Box,
    description: 'Primary engine for cross-platform game development — from mobile shooters to VR experiences.',
  },
  {
    name: 'Unreal Engine',
    rarity: 'Legendary',
    Icon: Layers,
    description: 'High-fidelity visuals and Blueprint scripting for AAA-quality immersive experiences.',
  },
  {
    name: 'Maya',
    rarity: 'Epic',
    Icon: PenTool,
    description: '3D modeling, rigging, and animation pipeline for game-ready character and environment assets.',
  },
  {
    name: 'Git',
    rarity: 'Epic',
    Icon: Terminal,
    description: 'Version control and team collaboration — the chronicle of every change across every project.',
  },
  {
    name: 'Playfab',
    rarity: 'Common',
    Icon: Database,
    description: 'Backend service for player economy, live ops, and session data management.',
  },
  {
    name: 'Slack',
    rarity: 'Common',
    Icon: Cpu,
    description: 'Team communication hub for async dev collaboration, sprint syncs, and fire-fighting.',
  },
];

const rarityColors = {
  Common:    'text-slate-400 border-slate-800 bg-slate-800/20',
  Rare:      'text-blue-400 border-blue-900/50 bg-blue-900/10',
  Epic:      'text-purple-400 border-purple-900/50 bg-purple-900/10',
  Legendary: 'text-orange-400 border-orange-900/50 bg-orange-900/10 shadow-[0_0_15px_rgba(251,146,60,0.15)]',
};

const Inventory = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-500/20">
            Player Inventory
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">
            Current <span className="text-indigo-500">Gear</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 border rounded-sm group relative overflow-hidden transition-all hover:scale-[1.02] ${rarityColors[item.rarity]}`}
            >
              <div className="flex items-start gap-5">
                <div className={`w-16 h-16 rounded border flex items-center justify-center bg-slate-900 shrink-0 group-hover:scale-110 transition-transform ${rarityColors[item.rarity].split(' ')[1]}`}>
                  <item.Icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black uppercase italic text-white tracking-wider">{item.name}</h3>
                    <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-current opacity-70">
                      {item.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    "{item.description}"
                  </p>
                </div>
              </div>
              <div className="absolute right-2 bottom-2 text-[10px] font-mono text-slate-800 opacity-20 group-hover:opacity-40 select-none">
                SLOT_{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inventory;
