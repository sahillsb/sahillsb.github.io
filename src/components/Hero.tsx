import { motion } from 'framer-motion';
import {
  Gamepad2,
  Rocket,
  Sword,
  Trophy,
  Dna,
  Cpu,
  Zap,
  Shield,
  Activity,
  User,
  Crown
} from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden text-white py-20 z-10">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/20 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/20 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Brand & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-sm bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-sm">
            <Crown className="w-3 h-3 mr-2" />
            <span>Game Designer</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase italic leading-[0.9]">
            Architect of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Player Worlds
            </span>
          </h1>

          <p className="max-w-xl text-xl text-slate-400 mb-12 leading-relaxed font-medium">
            Crafting worlds that pull you in. Three years shipping real titles across Mobile, PC, and VR — from tactical shooters to immersive metaverses.
          </p>

          <div className="flex flex-wrap gap-6">
            <a
              href="#projects"
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm font-black uppercase tracking-[0.2em] italic transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center">
                View Projects
                <Rocket className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </a>
            <a
              href="#contact"
              className="px-10 py-5 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 text-slate-300 rounded-sm font-black uppercase tracking-[0.2em] italic transition-all flex items-center"
            >
              Establish Comms
            </a>
          </div>
        </motion.div>

        {/* Right: Character Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="perspective-1000"
        >
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 p-1 rounded-sm shadow-2xl relative">
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-indigo-500" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-indigo-500" />

            <div className="p-8 bg-slate-950/80 rounded-sm">
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 bg-indigo-600 rounded-sm flex items-center justify-center shadow-[0_0_25px_rgba(79,70,229,0.5)] border border-indigo-400/50 overflow-hidden group">
                      <User className="text-white w-10 h-10 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-indigo-400 italic">
                      L37
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-3xl leading-tight uppercase italic tracking-tighter">Sahil B.</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">Game Designer</p>
                    </div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Experience</p>
                  <p className="text-indigo-400 font-mono text-xl font-black">14,230 <span className="text-xs">XP</span></p>
                </div>
              </div>

              {/* Core Attributes */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: 'Creative', val: 94, icon: <Zap className="w-3 h-3" /> },
                  { label: 'Logical', val: 89, icon: <Cpu className="w-3 h-3" /> },
                  { label: 'Systemic', val: 96, icon: <Dna className="w-3 h-3" /> },
                ].map((attr) => (
                  <div key={attr.label} className="bg-slate-900/80 border border-slate-800 p-3 rounded-sm text-center group hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center justify-center gap-2 mb-1 text-indigo-400">
                      {attr.icon}
                      <span className="text-[10px] font-black uppercase italic">{attr.label}</span>
                    </div>
                    <p className="text-xl font-black text-white">{attr.val}</p>
                  </div>
                ))}
              </div>

              {/* Skill Masteries */}
              <div className="space-y-6 mb-10">
                {[
                  { label: 'Level Design & Flow', val: 95, color: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' },
                  { label: 'Planning & GDD', val: 90, color: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
                  { label: 'Narrative Integration', val: 85, color: 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' },
                  { label: 'C# Scripting', val: 50, color: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">{stat.label}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{stat.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.val}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-indigo-600/5 border border-indigo-500/20 p-4 rounded-sm flex items-center gap-4 group hover:bg-indigo-600/10 transition-all">
                  <div className="w-10 h-10 rounded bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Achievements</p>
                    <p className="text-white text-xs font-bold uppercase tracking-tighter">4 Shipped Titles</p>
                  </div>
                </div>
                <div className="bg-purple-600/5 border border-purple-500/20 p-4 rounded-sm flex items-center gap-4 group hover:bg-purple-600/10 transition-all">
                  <div className="w-10 h-10 rounded bg-slate-900 border border-purple-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Gamepad2 size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Target Platforms</p>
                    <p className="text-white text-xs font-bold uppercase tracking-tighter">Mobile, PC, VR</p>
                  </div>
                </div>
              </div>

              {/* Bottom Status */}
              <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-black uppercase italic tracking-[0.2em]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <Shield size={12} />
                    <span>Def: 420</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-pink-400">
                    <Sword size={12} />
                    <span>Atk: 1337</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-green-500">
                  <Activity size={12} />
                  <span>Status: Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
