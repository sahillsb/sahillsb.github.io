import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Code2, Layers, PenTool, Zap,
  Box, Monitor, Cpu, Globe, Database,
  Sword, Shield, Star, LucideIcon
} from 'lucide-react';

interface SkillNode {
  id: string;
  label: string;
  Icon: LucideIcon;
  category: 'core' | 'engine' | 'tools' | 'design' | 'systems';
  level: number;
  angle: number;
  distance: number;
  description: string;
  parentId?: string;
}

// ── Geometric balanced layout — 4 branches at 0°/90°/180°/270° ──────────────
// angle 0 = top (north), 90 = right, 180 = bottom, 270 = left
const SKILLS: SkillNode[] = [
  // Core
  {
    id: 'core', label: 'SAHIL.GD', Icon: Gamepad2, category: 'core',
    level: 0, angle: 0, distance: 0,
    description: 'Game Designer · 3 yrs · 4 shipped titles',
  },

  // ── ENGINE (top, 0°) ──────────────────────────────────────────────────────
  { id: 'eng',       label: 'Engines',   Icon: Box,     category: 'engine', level: 1, angle: 0,   distance: 130, parentId: 'core', description: 'Game engine expertise' },
  { id: 'unity',     label: 'Unity 3D',  Icon: Box,     category: 'engine', level: 2, angle: 340, distance: 235, parentId: 'eng',  description: 'Primary engine — 4 shipped titles' },
  { id: 'unreal',    label: 'Unreal 5',  Icon: Monitor, category: 'engine', level: 2, angle: 20,  distance: 235, parentId: 'eng',  description: 'High-fidelity worlds & VFX' },
  { id: 'csharp',    label: 'C#',        Icon: Code2,   category: 'engine', level: 3, angle: 330, distance: 345, parentId: 'unity',   description: 'Gameplay scripting & systems' },
  { id: 'blueprint', label: 'Blueprint', Icon: Zap,     category: 'engine', level: 3, angle: 30,  distance: 345, parentId: 'unreal',  description: 'Visual scripting in UE5' },

  // ── TOOLS (right, 90°) ───────────────────────────────────────────────────
  { id: 'tools', label: 'Tools',       Icon: Cpu,     category: 'tools', level: 1, angle: 90,  distance: 130, parentId: 'core',  description: 'Daily production software' },
  { id: 'maya',  label: 'Maya',        Icon: Box,     category: 'tools', level: 2, angle: 70,  distance: 240, parentId: 'tools', description: '3D modeling & animation pipeline' },
  { id: 'adobe', label: 'Adobe Suite', Icon: Star,    category: 'tools', level: 2, angle: 90,  distance: 255, parentId: 'tools', description: 'Photoshop · Illustrator · Premiere' },
  { id: 'figma', label: 'Figma',       Icon: PenTool, category: 'tools', level: 2, angle: 110, distance: 240, parentId: 'tools', description: 'UI wireframing & design handoff' },

  // ── DESIGN (bottom, 180°) ────────────────────────────────────────────────
  { id: 'design', label: 'Design',       Icon: PenTool, category: 'design', level: 1, angle: 180, distance: 130, parentId: 'core',   description: 'Creative & UX craft' },
  { id: 'level',  label: 'Level Design', Icon: Sword,   category: 'design', level: 2, angle: 160, distance: 240, parentId: 'design', description: 'Spatial flow & encounter design' },
  { id: 'uiux',   label: 'UI/UX',        Icon: Monitor, category: 'design', level: 2, angle: 180, distance: 255, parentId: 'design', description: 'Player interfaces & UX flows' },
  { id: 'art',    label: 'Art Style',    Icon: Layers,  category: 'design', level: 2, angle: 200, distance: 240, parentId: 'design', description: 'Visual direction & asset pipeline' },

  // ── SYSTEMS (left, 270°) ─────────────────────────────────────────────────
  { id: 'sys',     label: 'Systems',    Icon: Zap,      category: 'systems', level: 1, angle: 270, distance: 130, parentId: 'core', description: 'Technical systems knowledge' },
  { id: 'physics', label: 'Physics',    Icon: Shield,   category: 'systems', level: 2, angle: 250, distance: 240, parentId: 'sys',  description: 'Unity physics & collision' },
  { id: 'backend', label: 'Backend',    Icon: Database, category: 'systems', level: 2, angle: 270, distance: 255, parentId: 'sys',  description: 'Playfab · player data · live ops' },
  { id: 'network', label: 'Networking', Icon: Globe,    category: 'systems', level: 2, angle: 290, distance: 240, parentId: 'sys',  description: 'Photon PUN · multiplayer sessions' },
];

const COLORS: Record<string, { border: string; text: string; line: string; glow: string }> = {
  engine:  { border: '#3b82f6', text: '#60a5fa', line: '#3b82f6', glow: 'rgba(59,130,246,0.35)' },
  tools:   { border: '#10b981', text: '#34d399', line: '#10b981', glow: 'rgba(16,185,129,0.35)' },
  design:  { border: '#f43f5e', text: '#fb7185', line: '#f43f5e', glow: 'rgba(244,63,94,0.35)'  },
  systems: { border: '#f59e0b', text: '#fbbf24', line: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
  core:    { border: '#6366f1', text: '#818cf8', line: '#6366f1', glow: 'rgba(99,102,241,0.4)'  },
};

const NODE_SIZE = { 0: 'w-20 h-20', 1: 'w-14 h-14', 2: 'w-10 h-10', 3: 'w-8 h-8' } as const;
const ICON_SIZE = { 0: 28, 1: 18, 2: 14, 3: 10 } as const;

const SkillTree = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [svgCenter, setSvgCenter] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSvgCenter({
          x: containerRef.current.offsetWidth  / 2,
          y: containerRef.current.offsetHeight / 2,
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const nodePos = useMemo(() => {
    return SKILLS.reduce((acc, s) => {
      const rad = (s.angle - 90) * (Math.PI / 180);
      acc[s.id] = { x: s.distance * Math.cos(rad), y: s.distance * Math.sin(rad) };
      return acc;
    }, {} as Record<string, { x: number; y: number }>);
  }, []);

  return (
    <section id="skills" className="py-24 bg-slate-950 border-y border-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-500/20">
          Passive Ability Tree
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">
          Skill <span className="text-indigo-500">Tree</span>
        </h2>
        <p className="text-slate-500 text-sm uppercase tracking-widest mt-4 italic">
          Hover a node to inspect • Level 37 Designer
        </p>
      </div>

      {/* Tree canvas */}
      <div className="relative h-[720px] w-full flex items-center justify-center select-none overflow-hidden">
        <div className="w-full h-full relative flex items-center justify-center">
          <div ref={containerRef} className="relative w-full h-full max-w-4xl">

            {/* SVG lines — translate uses measured pixel center so lines align exactly with nodes */}
            {svgCenter.x > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <g transform={`translate(${svgCenter.x},${svgCenter.y})`}>
                  {SKILLS.map((skill) => {
                    if (!skill.parentId) return null;
                    const s = nodePos[skill.parentId];
                    const e = nodePos[skill.id];
                    return (
                      <motion.line
                        key={`${skill.parentId}-${skill.id}`}
                        x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                        stroke={COLORS[skill.category].line}
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: skill.level * 0.12 }}
                      />
                    );
                  })}
                </g>
              </svg>
            )}

            {/* Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-0 h-0">
                {SKILLS.map((skill) => {
                  const pos   = nodePos[skill.id];
                  const col   = COLORS[skill.category];
                  const hov   = hoveredId === skill.id;
                  const isCore = skill.level === 0;
                  const isBottom = pos.y > 60;

                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: skill.level * 0.1 }}
                      onMouseEnter={() => setHoveredId(skill.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)' }}
                      className="flex flex-col items-center cursor-pointer"
                    >
                      {/* Node circle */}
                      <div
                        className={`
                          relative rounded-full bg-slate-900 flex items-center justify-center z-10
                          transition-all duration-300
                          ${NODE_SIZE[skill.level as keyof typeof NODE_SIZE]}
                          ${isCore ? 'animate-[pulse_3s_infinite]' : ''}
                          ${hov ? 'scale-125' : ''}
                        `}
                        style={{
                          border: `2px solid ${hov ? col.border : isCore ? '#6366f1' : '#1e293b'}`,
                          boxShadow: hov
                            ? `0 0 22px ${col.glow}`
                            : isCore
                            ? '0 0 20px rgba(99,102,241,0.4)'
                            : '0 0 12px rgba(0,0,0,0.8)',
                        }}
                      >
                        <div className="absolute inset-0.5 rounded-full border border-slate-800/40" />
                        <div
                          style={{ color: hov ? col.text : isCore ? '#818cf8' : '#475569' }}
                          className="transition-colors duration-300"
                        >
                          <skill.Icon size={ICON_SIZE[skill.level as keyof typeof ICON_SIZE]} />
                        </div>
                      </div>

                      {/* Label + tooltip */}
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max max-w-[90px] text-center pointer-events-none z-20">
                        <p
                          className="text-[7px] font-black uppercase tracking-widest leading-tight transition-colors duration-300"
                          style={{ color: hov ? col.text : isCore ? '#818cf8' : '#475569' }}
                        >
                          {skill.label}
                        </p>

                        <AnimatePresence>
                          {hov && (
                            <motion.div
                              initial={{ opacity: 0, y: isBottom ? 4 : -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="mt-1.5 bg-slate-900/95 border border-slate-700 px-2 py-1.5 rounded-sm backdrop-blur-sm whitespace-normal text-center"
                            >
                              <p className="text-[8px] text-slate-300 leading-snug">{skill.description}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillTree;
