import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ROLES = ['Game Designer', 'Level Designer', 'Systems Thinker', 'World Builder'];

const PARTICLES = [
  { x: 8,  y: 12, dur: 4.0, del: 0.0 }, { x: 92, y: 25, dur: 5.2, del: 0.4 },
  { x: 15, y: 75, dur: 3.8, del: 1.1 }, { x: 78, y: 55, dur: 4.6, del: 0.7 },
  { x: 42, y: 33, dur: 3.5, del: 1.8 }, { x: 60, y: 82, dur: 5.0, del: 0.2 },
  { x: 85, y: 18, dur: 4.2, del: 1.5 }, { x: 25, y: 90, dur: 3.9, del: 2.1 },
  { x: 55, y: 48, dur: 4.8, del: 0.9 }, { x: 70, y: 38, dur: 3.6, del: 1.3 },
  { x: 30, y: 60, dur: 5.3, del: 0.5 }, { x: 88, y: 70, dur: 4.1, del: 1.9 },
  { x: 48, y: 15, dur: 3.7, del: 0.8 }, { x: 12, y: 42, dur: 4.9, del: 2.4 },
  { x: 95, y: 85, dur: 4.4, del: 1.2 }, { x: 38, y: 95, dur: 3.4, del: 0.3 },
  { x: 65, y: 22, dur: 5.1, del: 1.7 }, { x: 20, y: 55, dur: 4.3, del: 0.6 },
];

const NameScreen = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 overflow-hidden">

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Drifting gradient blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/12 rounded-full blur-[130px]"
          style={{ animation: 'drift 14s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/12 rounded-full blur-[110px]"
          style={{ animation: 'drift 18s ease-in-out infinite reverse', animationDelay: '4s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[90px]"
          style={{ animation: 'drift 11s ease-in-out infinite', animationDelay: '7s' }}
        />
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:48px_48px] opacity-25" />
        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full bg-indigo-400/50"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `floatParticle ${p.dur}s ${p.del}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 border border-green-500/30 bg-green-500/8 rounded-sm"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-black uppercase tracking-[0.25em]">Available for work</span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="text-[13vw] md:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.85] mb-6">
            Sahil
          </h1>
          <h1 className="text-[13vw] md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.85] mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Bapardekar
            </span>
          </h1>
        </motion.div>

        {/* Cycling role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-14 h-8"
        >
          <div className="h-px w-12 bg-slate-700" />
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32 }}
              className="text-indigo-400 font-black uppercase tracking-[0.35em] text-sm min-w-[220px] text-center"
            >
              {ROLES[roleIdx]}
            </motion.span>
          </AnimatePresence>
          <div className="h-px w-12 bg-slate-700" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_30px_rgba(79,70,229,0.35)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)]"
          >
            View My Work
          </a>
          <a
            href="#about"
            className="px-10 py-4 border border-slate-700 hover:border-indigo-500 hover:text-indigo-400 text-slate-400 font-black uppercase tracking-[0.2em] text-sm transition-all"
          >
            About Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default NameScreen;
