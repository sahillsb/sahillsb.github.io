import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Code2, Layers, PenTool, Zap,
  Box, Monitor, Cpu, Globe, Database,
  Sword, Shield, Star, LucideIcon,
} from 'lucide-react';

// ── Fixed canvas — BOTH svg lines and DOM nodes use these exact constants ─────
const W  = 900;   // canvas width  (SVG and DOM share this)
const H  = 700;   // canvas height
const CX = W / 2; // 450 — horizontal center
const CY = H / 2; // 350 — vertical center

interface SkillNode {
  id: string; label: string; Icon: LucideIcon;
  category: 'core'|'engine'|'tools'|'design'|'systems';
  level: 0|1|2|3; angle: number; distance: number; description: string;
  parentId?: string;
}

// Balanced 4-branch layout: Engine↑  Tools→  Design↓  Systems←
const SKILLS: SkillNode[] = [
  { id:'core', label:'SAHIL.GD', Icon:Gamepad2, category:'core', level:0, angle:0,   distance:0,   description:'Game Designer · 3 yrs · 4 shipped titles' },
  // Engine (top, 0°)
  { id:'eng',       label:'Engines',   Icon:Box,     category:'engine', level:1, angle:0,   distance:130, parentId:'core', description:'Game engine expertise' },
  { id:'unity',     label:'Unity 3D',  Icon:Box,     category:'engine', level:2, angle:340, distance:240, parentId:'eng',  description:'Primary engine · 4 shipped titles' },
  { id:'unreal',    label:'Unreal 5',  Icon:Monitor, category:'engine', level:2, angle:20,  distance:240, parentId:'eng',  description:'High-fidelity worlds & VFX' },
  { id:'csharp',    label:'C#',        Icon:Code2,   category:'engine', level:3, angle:330, distance:350, parentId:'unity',   description:'Gameplay scripting & tools' },
  { id:'blueprint', label:'Blueprint', Icon:Zap,     category:'engine', level:3, angle:30,  distance:350, parentId:'unreal',  description:'Visual scripting in UE5' },
  // Tools (right, 90°)
  { id:'tools', label:'Tools',       Icon:Cpu,     category:'tools', level:1, angle:90,  distance:130, parentId:'core',  description:'Daily production software' },
  { id:'maya',  label:'Maya',        Icon:Box,     category:'tools', level:2, angle:70,  distance:240, parentId:'tools', description:'3D modeling & animation' },
  { id:'adobe', label:'Adobe Suite', Icon:Star,    category:'tools', level:2, angle:90,  distance:255, parentId:'tools', description:'Photoshop · Illustrator · Premiere' },
  { id:'figma', label:'Figma',       Icon:PenTool, category:'tools', level:2, angle:110, distance:240, parentId:'tools', description:'UI wireframing & handoff' },
  // Design (bottom, 180°)
  { id:'design', label:'Design',       Icon:PenTool, category:'design', level:1, angle:180, distance:130, parentId:'core',   description:'Creative & UX craft' },
  { id:'level',  label:'Level Design', Icon:Sword,   category:'design', level:2, angle:160, distance:240, parentId:'design', description:'Spatial flow & encounter design' },
  { id:'uiux',   label:'UI/UX',        Icon:Monitor, category:'design', level:2, angle:180, distance:255, parentId:'design', description:'Player interfaces & UX flows' },
  { id:'art',    label:'Art Style',    Icon:Layers,  category:'design', level:2, angle:200, distance:240, parentId:'design', description:'Visual direction & asset direction' },
  // Systems (left, 270°)
  { id:'sys',     label:'Systems',    Icon:Zap,      category:'systems', level:1, angle:270, distance:130, parentId:'core', description:'Technical systems knowledge' },
  { id:'physics', label:'Physics',    Icon:Shield,   category:'systems', level:2, angle:250, distance:240, parentId:'sys',  description:'Unity physics & collision' },
  { id:'backend', label:'Backend',    Icon:Database, category:'systems', level:2, angle:270, distance:255, parentId:'sys',  description:'Playfab · player data · live ops' },
  { id:'network', label:'Networking', Icon:Globe,    category:'systems', level:2, angle:290, distance:240, parentId:'sys',  description:'Photon PUN · multiplayer' },
];

const COL: Record<string, { border:string; text:string; line:string; glow:string }> = {
  engine:  { border:'#3b82f6', text:'#60a5fa', line:'#3b82f6', glow:'rgba(59,130,246,0.35)'  },
  tools:   { border:'#10b981', text:'#34d399', line:'#10b981', glow:'rgba(16,185,129,0.35)'  },
  design:  { border:'#f43f5e', text:'#fb7185', line:'#f43f5e', glow:'rgba(244,63,94,0.35)'   },
  systems: { border:'#f59e0b', text:'#fbbf24', line:'#f59e0b', glow:'rgba(245,158,11,0.35)'  },
  core:    { border:'#6366f1', text:'#818cf8', line:'#6366f1', glow:'rgba(99,102,241,0.4)'   },
};

// Diameter per level (px, in canvas space)
const DIAM = { 0:80, 1:56, 2:40, 3:32 } as const;
const ICON = { 0:28, 1:18, 2:14, 3:10 } as const;

const SkillTree = () => {
  const [hov, setHov] = useState<string|null>(null);
  const [scale, setScale]   = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Responsive scale: shrink canvas on narrow viewports
  useEffect(() => {
    const upd = () => {
      const parent = wrapRef.current?.parentElement;
      if (parent) setScale(Math.min(1, (parent.offsetWidth - 32) / W));
    };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  // Node positions — all relative to (0,0) origin
  const pos = useMemo(() => SKILLS.reduce((acc, s) => {
    const r = (s.angle - 90) * (Math.PI / 180);
    acc[s.id] = { x: s.distance * Math.cos(r), y: s.distance * Math.sin(r) };
    return acc;
  }, {} as Record<string, {x:number;y:number}>), []);

  return (
    <section id="skills" className="py-24 relative z-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-500/20">
          Passive Ability Tree
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">
          Skill <span className="text-indigo-500">Tree</span>
        </h2>
        <p className="text-slate-500 text-sm uppercase tracking-widest mt-4 italic">
          Hover a node to inspect · Level 37 Designer
        </p>
      </div>

      {/* ── Canvas wrapper ─────────────────────────────────────────────────────
          wrapRef width = W*scale → centers the scaled canvas in the section.
          Inner canvas = fixed W×H → same coordinate space for svg AND dom.
      ───────────────────────────────────────────────────────────────────────── */}
      <div
        ref={wrapRef}
        style={{ width: W * scale, height: H * scale, margin: '0 auto', position: 'relative' }}
      >
        <div style={{
          width: W, height: H,
          position: 'absolute', top: 0, left: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}>

          {/* SVG lines — x = CX + pos.x,  y = CY + pos.y */}
          <svg
            width={W} height={H}
            style={{ position:'absolute', inset:0, overflow:'visible', pointerEvents:'none' }}
          >
            {SKILLS.map(s => {
              if (!s.parentId) return null;
              const p = pos[s.parentId], e = pos[s.id];
              return (
                <motion.line
                  key={`${s.parentId}-${s.id}`}
                  x1={CX + p.x} y1={CY + p.y}
                  x2={CX + e.x} y2={CY + e.y}
                  stroke={COL[s.category].line}
                  strokeWidth={s.level === 1 ? 1.5 : 1}
                  initial={{ opacity:0 }}
                  whileInView={{ opacity: s.level === 1 ? 0.5 : 0.35 }}
                  viewport={{ once:true }}
                  transition={{ duration:1, delay: s.level * 0.12 }}
                />
              );
            })}
          </svg>

          {/* DOM nodes — position: absolute, left = CX + pos.x, top = CY + pos.y */}
          {SKILLS.map(s => {
            const p    = pos[s.id];
            const col  = COL[s.category];
            const isH  = hov === s.id;
            const isC  = s.level === 0;
            const d    = DIAM[s.level];
            const ic   = ICON[s.level];

            const border = isH ? col.border : isC ? '#6366f1' : '#1e293b';
            const shadow = isH ? `0 0 22px ${col.glow}` : isC ? '0 0 20px rgba(99,102,241,0.4)' : 'none';
            const iconClr = isH ? col.text : isC ? '#818cf8' : '#475569';
            const lblClr  = isH ? col.text : isC ? '#818cf8' : '#475569';

            return (
              <motion.div
                key={s.id}
                style={{ position:'absolute', left: CX + p.x, top: CY + p.y, transform:'translate(-50%,-50%)', zIndex: isH ? 30 : 10 }}
                initial={{ scale:0, opacity:0 }}
                whileInView={{ scale:1, opacity:1 }}
                viewport={{ once:true }}
                transition={{ type:'spring', stiffness:260, damping:22, delay: s.level * 0.1 }}
                onMouseEnter={() => setHov(s.id)}
                onMouseLeave={() => setHov(null)}
              >
                {/* Circle */}
                <div
                  style={{
                    width: d, height: d,
                    borderRadius: '50%',
                    border: `2px solid ${border}`,
                    boxShadow: shadow,
                    background: '#0f172a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color .25s, box-shadow .25s',
                    transform: isH ? 'scale(1.2)' : 'scale(1)',
                  }}
                  className={isC ? 'animate-[pulse_3s_infinite]' : ''}
                >
                  <s.Icon size={ic} color={iconClr} style={{ transition:'color .25s' }} />
                </div>

                {/* Label + tooltip */}
                <div style={{
                  position:'absolute', top:'100%', left:'50%',
                  transform:'translateX(-50%)', marginTop: 8,
                  textAlign:'center', pointerEvents:'none', width:'max-content', maxWidth: 90,
                }}>
                  <p style={{
                    fontSize: 7, fontWeight:900, textTransform:'uppercase',
                    letterSpacing:'0.1em', color: lblClr, transition:'color .25s',
                  }}>
                    {s.label}
                  </p>

                  <AnimatePresence>
                    {isH && (
                      <motion.div
                        initial={{ opacity:0, y:4 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0 }}
                        transition={{ duration:.15 }}
                        style={{
                          marginTop:4,
                          background:'rgba(15,23,42,0.95)',
                          border:'1px solid #334155',
                          borderRadius:2,
                          padding:'4px 6px',
                          whiteSpace:'normal',
                          maxWidth: 110,
                        }}
                      >
                        <p style={{ fontSize:7.5, color:'#94a3b8', lineHeight:1.4 }}>
                          {s.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default SkillTree;
