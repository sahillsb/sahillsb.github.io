import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Code2, Layers, PenTool, Zap,
  Box, Monitor, Cpu, Globe, Database,
  Sword, Shield, Star, LucideIcon,
} from 'lucide-react';

// ── All node positions are hardcoded SVG coords — zero drift possible ─────────
// viewBox 0 0 900 720 · centre (450, 360)
// Engine ↑  Tools →  Design ↓  Systems ← — all 3 leaf-nodes per branch

interface N {
  id: string; label: string; desc: string;
  Icon: LucideIcon; cat: Cat;
  lv: 0|1|2; x: number; y: number; r: number; pid?: string;
}
type Cat = 'core'|'engine'|'tools'|'design'|'systems';

const NODES: N[] = [
  // Core
  { id:'core',    label:'SAHIL.GD',    desc:'Game Designer · 3 yrs · 4 shipped',
    Icon:Gamepad2, cat:'core',    lv:0, x:450, y:360, r:42 },

  // ── Engine (top) ── 3 symmetric leaf nodes off the root ──────────────────
  { id:'eng',     label:'Engines',     desc:'Game engine expertise',
    Icon:Box,      cat:'engine',  lv:1, x:450, y:225, r:28, pid:'core'   },
  { id:'unity',   label:'Unity 3D',    desc:'Primary engine · 4 shipped titles',
    Icon:Box,      cat:'engine',  lv:2, x:338, y:90,  r:20, pid:'eng'    },
  { id:'csharp',  label:'C#',          desc:'Gameplay scripting & tools',
    Icon:Code2,    cat:'engine',  lv:2, x:450, y:58,  r:20, pid:'eng'    },
  { id:'unreal',  label:'Unreal 5',    desc:'High-fidelity worlds & VFX',
    Icon:Monitor,  cat:'engine',  lv:2, x:562, y:90,  r:20, pid:'eng'    },

  // ── Tools (right) ────────────────────────────────────────────────────────
  { id:'tools',   label:'Tools',       desc:'Daily production software',
    Icon:Cpu,      cat:'tools',   lv:1, x:582, y:360, r:28, pid:'core'   },
  { id:'maya',    label:'Maya',        desc:'3D modeling & animation',
    Icon:Box,      cat:'tools',   lv:2, x:712, y:255, r:20, pid:'tools'  },
  { id:'adobe',   label:'Adobe Suite', desc:'Photoshop · Illustrator · Premiere',
    Icon:Star,     cat:'tools',   lv:2, x:742, y:360, r:20, pid:'tools'  },
  { id:'figma',   label:'Figma',       desc:'UI wireframing & handoff',
    Icon:PenTool,  cat:'tools',   lv:2, x:712, y:465, r:20, pid:'tools'  },

  // ── Design (bottom) ──────────────────────────────────────────────────────
  { id:'design',  label:'Design',      desc:'Creative & UX craft',
    Icon:PenTool,  cat:'design',  lv:1, x:450, y:495, r:28, pid:'core'   },
  { id:'level',   label:'Level Design',desc:'Spatial flow & encounter design',
    Icon:Sword,    cat:'design',  lv:2, x:338, y:612, r:20, pid:'design' },
  { id:'uiux',    label:'UI / UX',     desc:'Player interfaces & UX flows',
    Icon:Monitor,  cat:'design',  lv:2, x:450, y:652, r:20, pid:'design' },
  { id:'art',     label:'Art Style',   desc:'Visual direction & asset pipeline',
    Icon:Layers,   cat:'design',  lv:2, x:562, y:612, r:20, pid:'design' },

  // ── Systems (left) ───────────────────────────────────────────────────────
  { id:'sys',     label:'Systems',     desc:'Technical systems knowledge',
    Icon:Zap,      cat:'systems', lv:1, x:318, y:360, r:28, pid:'core'   },
  { id:'physics', label:'Physics',     desc:'Unity physics & collision',
    Icon:Shield,   cat:'systems', lv:2, x:188, y:255, r:20, pid:'sys'    },
  { id:'backend', label:'Backend',     desc:'Playfab · player data · live ops',
    Icon:Database, cat:'systems', lv:2, x:158, y:360, r:20, pid:'sys'    },
  { id:'network', label:'Networking',  desc:'Photon PUN · multiplayer',
    Icon:Globe,    cat:'systems', lv:2, x:188, y:465, r:20, pid:'sys'    },
];

const MAP = Object.fromEntries(NODES.map(n => [n.id, n]));

const C: Record<Cat, { border:string; text:string; glow:string; line:string }> = {
  core:    { border:'#6366f1', text:'#a5b4fc', glow:'rgba(99,102,241,0.6)',   line:'#6366f1' },
  engine:  { border:'#3b82f6', text:'#93c5fd', glow:'rgba(59,130,246,0.45)',  line:'#3b82f6' },
  tools:   { border:'#10b981', text:'#6ee7b7', glow:'rgba(16,185,129,0.45)',  line:'#10b981' },
  design:  { border:'#f43f5e', text:'#fda4af', glow:'rgba(244,63,94,0.45)',   line:'#f43f5e' },
  systems: { border:'#f59e0b', text:'#fcd34d', glow:'rgba(245,158,11,0.45)',  line:'#f59e0b' },
};

const ICON_S: Record<number, number> = { 0:30, 1:18, 2:14 };

export default function SkillTree() {
  const [hov, setHov]     = useState<string|null>(null);
  const [tip, setTip]     = useState({ x: 0, y: 0 });

  return (
    <section id="skills" className="py-24 relative z-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-500/20">
          Passive Ability Tree
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">
          Skill <span className="text-indigo-500">Tree</span>
        </h2>
        <p className="text-slate-500 text-sm uppercase tracking-widest mt-3 italic">
          Hover to inspect · Level 37 Designer
        </p>
      </div>

      {/* SVG — pure coordinate space, no DOM/SVG mixing */}
      <div className="max-w-4xl mx-auto px-4">
        <svg
          viewBox="0 0 900 720"
          preserveAspectRatio="xMidYMid meet"
          style={{ width:'100%', height:'auto', overflow:'visible' }}
        >
          <defs>
            {NODES.map(n => {
              if (!n.pid) return null;
              const p = MAP[n.pid];
              return (
                <linearGradient
                  key={`lg-${n.id}`} id={`lg-${n.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={p.x} y1={p.y} x2={n.x} y2={n.y}
                >
                  <stop offset="0%"   stopColor={C[p.cat].line} stopOpacity="0.7"/>
                  <stop offset="100%" stopColor={C[n.cat].line} stopOpacity="0.35"/>
                </linearGradient>
              );
            })}
          </defs>

          {/* Lines */}
          {NODES.map(n => {
            if (!n.pid) return null;
            const p = MAP[n.pid];
            return (
              <motion.line
                key={`l-${n.id}`}
                x1={p.x} y1={p.y} x2={n.x} y2={n.y}
                stroke={`url(#lg-${n.id})`}
                strokeWidth={n.lv === 1 ? 1.8 : 1.2}
                strokeLinecap="round"
                initial={{ opacity:0 }}
                whileInView={{ opacity:1 }}
                viewport={{ once:true }}
                transition={{ duration:0.9, delay: n.lv * 0.12 }}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map(n => {
            const col  = C[n.cat];
            const isH  = hov === n.id;
            const isC  = n.lv === 0;
            const fo   = n.r - (isC ? 8 : 5);

            return (
              <motion.g
                key={n.id}
                style={{ transformBox:'fill-box', transformOrigin:'center', cursor:'pointer' }}
                initial={{ opacity:0, scale:0 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                whileHover={{ scale: 1.3 }}
                transition={{ type:'spring', stiffness:220, damping:22, delay: n.lv * 0.09 }}
                onMouseEnter={(e) => {
                  setHov(n.id);
                  setTip({ x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHov(null)}
              >
                {/* Pulse ring — core always, others on hover */}
                {(isC || isH) && (
                  <motion.circle
                    cx={n.x} cy={n.y} r={n.r + (isC ? 8 : 6)}
                    fill="none" stroke={col.border} strokeWidth="1"
                    animate={isC
                      ? { opacity:[0.2,0.5,0.2], r:[n.r+5, n.r+10, n.r+5] }
                      : { opacity:[0.4, 0.7, 0.4] }}
                    transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
                  />
                )}

                {/* Body */}
                <circle cx={n.x} cy={n.y} r={n.r}
                  fill={isH ? '#0f172a' : '#080d1a'}
                  stroke={isH ? col.border : isC ? '#6366f1' : '#1e293b'}
                  strokeWidth={isH || isC ? 2 : 1.5}
                  style={{ filter: isH
                    ? `drop-shadow(0 0 12px ${col.glow})`
                    : isC ? 'drop-shadow(0 0 16px rgba(99,102,241,0.55))' : 'none' }}
                />
                <circle cx={n.x} cy={n.y} r={n.r - 5}
                  fill="none" stroke={isH ? col.border : '#1e293b'}
                  strokeWidth="0.5" opacity={isH ? 0.4 : 0.15} />

                {/* Icon */}
                <foreignObject x={n.x - fo} y={n.y - fo} width={fo*2} height={fo*2} style={{ overflow:'visible', pointerEvents:'none' }}>
                  <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <n.Icon size={ICON_S[n.lv]} color={isH ? col.text : isC ? '#818cf8' : '#334155'} />
                  </div>
                </foreignObject>

                {/* Label */}
                <text x={n.x} y={n.y + n.r + 14} textAnchor="middle"
                  fontSize="7" fontWeight="800" letterSpacing="0.8"
                  fill={isH ? col.text : isC ? '#818cf8' : '#374151'}
                  style={{ fontFamily:'inherit' }}>
                  {n.label.toUpperCase()}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* ── HTML tooltip — large, readable, rendered outside SVG ─────────────── */}
      <AnimatePresence>
        {hov && MAP[hov] && (
          <motion.div
            key={hov}
            initial={{ opacity:0, scale:0.82, y:6 }}
            animate={{ opacity:1, scale:1,    y:0 }}
            exit={{ opacity:0, scale:0.88, y:4 }}
            transition={{ duration:0.15 }}
            style={{
              position: 'fixed',
              left: tip.x + 18,
              top:  tip.y - 72,
              pointerEvents: 'none',
              zIndex: 500,
              transformOrigin: 'bottom left',
            }}
            className="bg-slate-900/96 border border-slate-600/40 rounded-sm px-4 py-3 shadow-2xl backdrop-blur-md max-w-[210px]"
          >
            <p className="font-black uppercase tracking-wider text-sm mb-1.5" style={{ color: C[MAP[hov].cat].text }}>
              {MAP[hov].label}
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">{MAP[hov].desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
