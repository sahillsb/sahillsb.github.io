import { useState, useEffect, type SyntheticEvent } from 'react';
import { ExternalLink, Play, Lock, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Images live in public/projects/<key>_N.ext ───────────────────────────────
// images[0] = thumbnail shown on card + first image in modal gallery
// ─────────────────────────────────────────────────────────────────────────────

const projects = [
  // ── Professional ─────────────────────────────────────────────────────────
  {
    key: 'faug',
    title: 'FAUG Domination',
    category: 'FPS Multiplayer',
    badge: 'Shipped',
    description: 'FAU-G Domination is a fast-paced multiplayer mode built on tactical team combat — players compete to capture and hold strategic zones. Focused on map control, squad coordination, and smart positioning over pure aggression.',
    tags: ['Unity', 'Maya', 'Substance Painter', 'Photon', 'Playfab', 'Firestore'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.dotnine.faug',
    caseStudy: '',
    images: ['faug_1.jpg','faug_2.jpg','faug_3.png','faug_4.png','faug_5.png'],
    fallback: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'mumbai',
    title: 'Mumbai Megapolis Metaverse',
    category: 'VR Experience',
    badge: 'Shipped',
    description: "A free-roam VR experience commissioned by the Government of Maharashtra. Bridges the gap between ongoing mega-projects in Mumbai and the public — giving citizens a real-time visual of what's under development.",
    tags: ['Unity', 'Blender'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.tem.mumbaimetaverse',
    caseStudy: '',
    images: ['mumbai_1.png','mumbai_2.png','mumbai_3.png','mumbai_4.png','mumbai_5.png'],
    fallback: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'projectx',
    title: 'Project X',
    category: 'Web3 Multiplayer',
    badge: 'Shipped',
    description: 'A dragon-rider deathmatch on the web where players earn coins redeemable as crypto via MetaMask wallet. Designed the core combat loop, reward economy, and multiplayer session flow.',
    tags: ['Unity', 'Blender', 'Figma'],
    playUrl: '',
    caseStudy: '',
    images: ['projectx_1.png'],
    fallback: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000',
  },
  // ── Self / Personal ───────────────────────────────────────────────────────
  {
    key: 'rapid',
    title: 'Rapid',
    category: 'TPS Mobile',
    badge: 'In Dev',
    description: 'A tactical third-person shooter built for high manoeuvrability and skill-hungry strategies. Fast movement, sharp gunplay, and team-based combat — currently in active development.',
    tags: ['Unity', 'Blender', 'Substance Painter'],
    playUrl: '',
    caseStudy: '',
    images: ['rapid_1.jpg','rapid_2.jpg','rapid_3.jpg','rapid_4.jpg','rapid_5.jpg'],
    fallback: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'coindash',
    title: 'Coin Dash',
    category: 'Endless Runner',
    badge: 'Shipped',
    description: 'An endless runner where the player collects coins on the fly and spends them on cosmetic upgrades — hats, trails, and character skins. Clean loop with satisfying progression.',
    tags: ['Unity', 'Photoshop'],
    playUrl: '',
    caseStudy: '',
    images: ['coindash_1.jpg','coindash_2.jpg','coindash_3.jpg','coindash_4.jpg','coindash_5.jpg','coindash_6.png'],
    fallback: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'parcelstack',
    title: 'Parcel Stack',
    category: 'Casual Runner',
    badge: 'Shipped',
    description: 'A casual mobile game where the player loads parcels onto a stretching cart — the longer the stack, the higher the coin reward. Designed around satisfying physics and a simple escalating risk loop.',
    tags: ['Unity', 'Blender'],
    playUrl: '',
    caseStudy: '',
    images: [],
    fallback: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000',
  },
  // ── Research & Creative ───────────────────────────────────────────────────
  {
    key: 'aiprototype',
    title: 'AI Prototype',
    category: 'NPC AI Research',
    badge: 'Research',
    description: 'An experimental Unity prototype exploring AI behavior systems — state machines, behavior trees, and dynamic NPC decision-making. Built to prototype AI patterns covering pathfinding, combat reactions, and adaptive difficulty for use in future game titles.',
    tags: ['Unity', 'C#', 'AI Behavior', 'State Machines'],
    playUrl: '',
    caseStudy: '',
    images: ['aiprototype_1.jpg','aiprototype_2.jpg','aiprototype_3.jpg'],
    fallback: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'art',
    title: 'Art & Design',
    category: 'Digital Art',
    badge: 'Personal',
    description: 'A collection of personal creative work — 3D character modeling and rigging, photo manipulation, and original concept designs. Visual exploration that directly informs game art direction, asset pipelines, and visual storytelling across projects.',
    tags: ['Blender', 'Photoshop', '3D Modeling', 'Concept Art', 'Character Rigging'],
    playUrl: '',
    caseStudy: '',
    images: ['art_1.jpg','art_2.jpg','art_3.png','art_4.png'],
    fallback: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1000',
  },
];

type Project = typeof projects[0];

const isActive = (url: string) => url.trim() !== '';

const badgeCls: Record<string, string> = {
  Shipped:  'bg-green-500/15 text-green-400 border-green-500/40',
  'In Dev': 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  Research: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
  Personal: 'bg-purple-500/15 text-purple-400 border-purple-500/40',
};

const thumbSrc = (project: Project) =>
  project.images.length > 0
    ? `/projects/${project.images[0]}`
    : project.fallback;

const onImgErr = (fallback: string) => (e: SyntheticEvent<HTMLImageElement>) => {
  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
};

// ── Gallery Modal ─────────────────────────────────────────────────────────────
const Modal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [idx, setIdx]           = useState(0);
  const [fullscreen, setFs]     = useState(false);

  const imgs = project.images.length > 0
    ? project.images.map(f => `/projects/${f}`)
    : [project.fallback];

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + imgs.length) % imgs.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % imgs.length); };

  // Keyboard: Esc closes fullscreen (or modal), arrows navigate in fullscreen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      { fullscreen ? setFs(false) : onClose(); }
      if (!fullscreen) return;
      if (e.key === 'ArrowLeft')   setIdx(i => (i - 1 + imgs.length) % imgs.length);
      if (e.key === 'ArrowRight')  setIdx(i => (i + 1) % imgs.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen, imgs.length, onClose]);

  return (
    <>
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{ opacity: 0, scale: 0.92,    y: 20 }}
          transition={{ duration: 0.22 }}
          onClick={e => e.stopPropagation()}
          className="bg-slate-900 border border-slate-700 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* ── Main image ── */}
          <div className="relative h-64 bg-slate-950 overflow-hidden">
            <img
              key={idx}
              src={imgs[idx]}
              alt={project.title}
              onError={onImgErr(project.fallback)}
              onClick={() => setFs(true)}
              className="w-full h-full object-cover cursor-zoom-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

            {/* Fullscreen expand */}
            <button type="button" onClick={e => { e.stopPropagation(); setFs(true); }}
              className="absolute top-3 right-12 w-8 h-8 bg-black/60 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white rounded-sm z-10 transition-colors"
              title="Fullscreen">
              <Maximize2 size={13} />
            </button>
            {/* Close */}
            <button type="button" onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/60 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white rounded-sm z-10 transition-colors">
              <X size={14} />
            </button>

            {/* Prev / Next */}
            {imgs.length > 1 && (
              <>
                <button type="button" onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/80 border border-slate-700 flex items-center justify-center text-white rounded-sm z-10 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button type="button" onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/80 border border-slate-700 flex items-center justify-center text-white rounded-sm z-10 transition-colors">
                  <ChevronRight size={16} />
                </button>
                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {imgs.map((_, i) => (
                    <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-white' : 'bg-white/35'}`} />
                  ))}
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] text-white/50 font-mono z-10">
                  {idx + 1} / {imgs.length}
                </div>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span className="px-2.5 py-1 bg-indigo-600 text-[9px] font-black uppercase tracking-widest text-white rounded-sm">
                {project.category}
              </span>
              <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest border rounded-sm ${badgeCls[project.badge] ?? ''}`}>
                {project.badge}
              </span>
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          {imgs.length > 1 && (
            <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-slate-950/60 scrollbar-hide">
              {imgs.map((img, i) => (
                <button key={i} type="button" onClick={e => { e.stopPropagation(); setIdx(i); }}
                  className={`flex-shrink-0 w-20 h-14 overflow-hidden rounded-sm border-2 transition-colors ${i === idx ? 'border-indigo-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" onError={onImgErr(project.fallback)} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* ── Info ── */}
          <div className="p-6">
            <h3 className="text-xl font-black uppercase text-white mb-2">{project.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(t => (
                <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] uppercase font-bold rounded-sm border border-slate-700">{t}</span>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              {isActive(project.playUrl) ? (
                <a href={project.playUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest transition-colors rounded-sm">
                  <Play size={12} className="fill-current" /> Play / Download
                </a>
              ) : (
                <span className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-600 font-black text-xs uppercase tracking-widest cursor-not-allowed rounded-sm">
                  <Lock size={12} /> Demo Coming Soon
                </span>
              )}
              {isActive(project.caseStudy) && (
                <a href={project.caseStudy} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-indigo-400 font-black text-xs uppercase tracking-widest transition-all rounded-sm">
                  <ExternalLink size={12} /> Case Study
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>

    {/* ── Fullscreen overlay — z-[60] sits above the modal (z-50) ── */}
    <AnimatePresence>
      {fullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
          onClick={() => setFs(false)}
        >
          <img
            src={imgs[idx]}
            alt={project.title}
            onError={onImgErr(project.fallback)}
            onClick={e => e.stopPropagation()}
            className="max-w-full max-h-full object-contain select-none"
            style={{ maxHeight: '100dvh', maxWidth: '100dvw' }}
          />

          {/* Close */}
          <button type="button" onClick={() => setFs(false)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white rounded-sm transition-colors">
            <X size={18} />
          </button>

          {/* Prev / Next */}
          {imgs.length > 1 && (
            <>
              <button type="button" onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white rounded-sm transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button type="button" onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white rounded-sm transition-colors">
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-sm font-mono tracking-widest">
                {idx + 1} / {imgs.length}
              </div>
              {/* Thumbnail strip */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/50 rounded-sm backdrop-blur-sm max-w-[90vw] overflow-x-auto">
                {imgs.map((img, i) => (
                  <button key={i} type="button" onClick={e => { e.stopPropagation(); setIdx(i); }}
                    className={`flex-shrink-0 w-14 h-10 overflow-hidden rounded-sm border-2 transition-colors ${i === idx ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="absolute top-5 left-5 text-white/40 text-xs uppercase tracking-widest font-bold">
            {project.title}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

// ── Projects Section ──────────────────────────────────────────────────────────
const Projects = () => {
  const [modal, setModal] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-14">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Portfolio</span>
          </motion.div>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-4xl md:text-5xl font-black uppercase">
            Current <span className="text-indigo-500">Missions</span>
          </motion.h2>
          <p className="text-slate-500 text-sm mt-3 italic">Click any project to view details & gallery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.button
              key={project.key}
              type="button"
              onClick={() => setModal(project)}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y:-4 }}
              className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden group hover:border-indigo-500 transition-all duration-300 shadow-xl text-left w-full"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={thumbSrc(project)}
                  alt={project.title}
                  onError={onImgErr(project.fallback)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2 py-0.5 bg-indigo-600 text-[9px] font-black uppercase tracking-widest text-white rounded-sm">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded-sm ${badgeCls[project.badge] ?? ''}`}>
                    {project.badge}
                  </span>
                </div>
                {/* Image count badge */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 text-[9px] text-white/70 font-mono rounded-sm">
                    {project.images.length} imgs
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-indigo-600/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest">
                    View Gallery
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="text-base font-black uppercase text-white group-hover:text-indigo-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[9px] uppercase font-bold rounded-sm border border-slate-700">{t}</span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-slate-600 text-[9px] font-bold px-1">+{project.tags.length - 4}</span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {modal && <Modal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
};

export default Projects;
