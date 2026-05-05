import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Code2,
  Layers,
  PenTool,
  Zap,
  Box,
  Monitor,
  Cpu,
  Globe,
  Database,
  Sword,
  Shield,
  Star,
  LucideIcon
} from 'lucide-react';

interface SkillNode {
  id: string;
  label: string;
  Icon: LucideIcon;
  category: 'core' | 'engine' | 'tools' | 'design' | 'systems';
  level: number;
  angle: number;
  distance: number;
  parentId?: string;
}

const SKILLS: SkillNode[] = [
  // Core
  { id: 'core', label: 'SAHIL.GD', Icon: Gamepad2, category: 'core', level: 0, angle: 0, distance: 0 },

  // Engine branch (top-right)
  { id: 'engine-root', label: 'Engines', Icon: Box, category: 'engine', level: 1, angle: 345, distance: 110, parentId: 'core' },
  { id: 'unity', label: 'Unity 3D', Icon: Box, category: 'engine', level: 2, angle: 318, distance: 205, parentId: 'engine-root' },
  { id: 'unreal', label: 'Unreal 5', Icon: Monitor, category: 'engine', level: 2, angle: 355, distance: 225, parentId: 'engine-root' },
  { id: 'csharp', label: 'C#', Icon: Code2, category: 'engine', level: 3, angle: 298, distance: 315, parentId: 'unity' },
  { id: 'blueprint', label: 'Blueprint', Icon: Zap, category: 'engine', level: 3, angle: 352, distance: 330, parentId: 'unreal' },

  // Design branch (left)
  { id: 'design-root', label: 'Design', Icon: PenTool, category: 'design', level: 1, angle: 175, distance: 110, parentId: 'core' },
  { id: 'leveldesign', label: 'Level Design', Icon: Sword, category: 'design', level: 2, angle: 150, distance: 200, parentId: 'design-root' },
  { id: 'uiux', label: 'UI/UX', Icon: Monitor, category: 'design', level: 2, angle: 195, distance: 210, parentId: 'design-root' },
  { id: 'artstyle', label: 'Art Style', Icon: Layers, category: 'design', level: 2, angle: 222, distance: 185, parentId: 'design-root' },

  // Systems branch (bottom)
  { id: 'systems-root', label: 'Systems', Icon: Zap, category: 'systems', level: 1, angle: 265, distance: 120, parentId: 'core' },
  { id: 'physics', label: 'Physics', Icon: Shield, category: 'systems', level: 2, angle: 245, distance: 215, parentId: 'systems-root' },
  { id: 'backend', label: 'Backend', Icon: Database, category: 'systems', level: 2, angle: 278, distance: 235, parentId: 'systems-root' },
  { id: 'networking', label: 'Networking', Icon: Globe, category: 'systems', level: 2, angle: 302, distance: 190, parentId: 'systems-root' },

  // Tools branch (right)
  { id: 'tools-root', label: 'Tools', Icon: Cpu, category: 'tools', level: 1, angle: 85, distance: 130, parentId: 'core' },
  { id: 'maya', label: 'Maya', Icon: Box, category: 'tools', level: 2, angle: 63, distance: 225, parentId: 'tools-root' },
  { id: 'adobe', label: 'Adobe Suite', Icon: Star, category: 'tools', level: 2, angle: 93, distance: 250, parentId: 'tools-root' },
  { id: 'figma', label: 'Figma', Icon: PenTool, category: 'tools', level: 2, angle: 118, distance: 210, parentId: 'tools-root' },
];

const CATEGORY_COLORS: Record<string, { border: string; text: string; lineHex: string; glow: string }> = {
  engine:  { border: '#3b82f6', text: '#60a5fa', lineHex: '#3b82f6', glow: 'rgba(59,130,246,0.35)' },
  tools:   { border: '#10b981', text: '#34d399', lineHex: '#10b981', glow: 'rgba(16,185,129,0.35)' },
  design:  { border: '#f43f5e', text: '#fb7185', lineHex: '#f43f5e', glow: 'rgba(244,63,94,0.35)' },
  systems: { border: '#f59e0b', text: '#fbbf24', lineHex: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
  core:    { border: '#6366f1', text: '#818cf8', lineHex: '#6366f1', glow: 'rgba(99,102,241,0.4)' },
};

const NODE_SIZES = { 0: 'w-20 h-20', 1: 'w-14 h-14', 2: 'w-10 h-10', 3: 'w-8 h-8' } as const;
const ICON_SIZES = { 0: 28, 1: 18, 2: 14, 3: 10 } as const;

const SkillTree = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [svgCenter, setSvgCenter] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure the container so SVG lines share the exact same origin as the CSS nodes
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSvgCenter({
          x: containerRef.current.offsetWidth / 2,
          y: containerRef.current.offsetHeight / 2,
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const nodePositions = useMemo(() => {
    return SKILLS.reduce((acc, skill) => {
      const rad = (skill.angle - 90) * (Math.PI / 180);
      acc[skill.id] = {
        x: skill.distance * Math.cos(rad),
        y: skill.distance * Math.sin(rad),
      };
      return acc;
    }, {} as Record<string, { x: number; y: number }>);
  }, []);

  return (
    <section id="skills" className="py-24 bg-slate-950 border-y border-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-500/20">
          Passive Ability Tree
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">
          Technical <span className="text-indigo-500">Mastery</span>
        </h2>
        <p className="text-slate-500 text-sm uppercase tracking-widest mt-4 italic">Branch into your specialization • Level 37 Designer</p>
      </div>

      <div className="relative h-[700px] w-full flex items-center justify-center select-none overflow-hidden">
        <div className="w-full h-full relative flex items-center justify-center">

          {/* ref container — SVG and nodes share this exact bounding box */}
          <div ref={containerRef} className="relative w-full h-full max-w-4xl">

            {/* SVG lines — origin measured from containerRef so it matches node CSS center */}
            {svgCenter.x > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <g transform={`translate(${svgCenter.x}, ${svgCenter.y})`}>
                  {SKILLS.map((skill) => {
                    if (!skill.parentId) return null;
                    const start = nodePositions[skill.parentId];
                    const end = nodePositions[skill.id];
                    const colors = CATEGORY_COLORS[skill.category];
                    return (
                      <motion.line
                        key={`${skill.parentId}-${skill.id}`}
                        x1={start.x} y1={start.y}
                        x2={end.x}   y2={end.y}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: skill.level * 0.1 }}
                        stroke={colors.lineHex}
                        strokeWidth="2"
                      />
                    );
                  })}
                </g>
              </svg>
            )}

            {/* Nodes — absolutely centered inside the same containerRef */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-0 h-0">
                {SKILLS.map((skill) => {
                  const pos = nodePositions[skill.id];
                  const colors = CATEGORY_COLORS[skill.category];
                  const isHovered = hoveredId === skill.id;
                  const isCore = skill.level === 0;

                  const borderColor = isHovered ? colors.border : isCore ? '#6366f1' : '#1e293b';
                  const iconColor  = isHovered ? colors.text  : isCore ? '#818cf8' : '#475569';
                  const boxShadow  = isHovered
                    ? `0 0 20px ${colors.glow}`
                    : isCore
                    ? '0 0 20px rgba(99,102,241,0.4)'
                    : '0 0 15px rgba(0,0,0,0.8)';

                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: skill.level * 0.1 }}
                      onMouseEnter={() => setHoveredId(skill.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`
                          relative rounded-full bg-slate-900 flex items-center justify-center z-10
                          transition-all duration-300
                          ${NODE_SIZES[skill.level as keyof typeof NODE_SIZES]}
                          ${isCore ? 'animate-[pulse_3s_infinite]' : ''}
                          ${isHovered ? 'scale-125' : ''}
                        `}
                        style={{ border: `2px solid ${borderColor}`, boxShadow }}
                      >
                        <div className="absolute inset-0.5 rounded-full border border-slate-800/50" />
                        <div style={{ color: iconColor }} className="transition-colors duration-300">
                          <skill.Icon size={ICON_SIZES[skill.level as keyof typeof ICON_SIZES]} />
                        </div>
                      </div>

                      <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-max text-center pointer-events-none">
                        <p
                          className="text-[7px] font-black uppercase tracking-widest leading-tight transition-colors duration-300"
                          style={{ color: isHovered ? colors.text : isCore ? '#818cf8' : '#475569' }}
                        >
                          {skill.label}
                        </p>
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
