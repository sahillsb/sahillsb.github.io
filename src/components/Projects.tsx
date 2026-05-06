import { useState, type SyntheticEvent } from 'react';
import { ExternalLink, Play, Lock, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Drop images into public/projects/ named as <key>_1.jpg ───────────────────
// e.g. public/projects/faug_1.jpg · mumbai_1.jpg · projectx_1.jpg etc.
// If the local image is missing, the card falls back to the Unsplash URL.
// ─────────────────────────────────────────────────────────────────────────────

const projects = [
  {
    key: 'faug',
    title: 'FAUG Domination',
    category: 'FPS Multiplayer',
    badge: 'Shipped',
    description: 'FAU-G Domination is a fast-paced multiplayer mode built on tactical team combat — players compete to capture and hold strategic zones. Focused on map control, squad coordination, and smart positioning over pure aggression.',
    tags: ['Unity', 'Maya', 'Substance Painter', 'Photon', 'Playfab', 'Firestore'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.dotnine.faug',
    caseStudy: '',
    fallback: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'mumbai',
    title: 'Mumbai Megapolis Metaverse',
    category: 'VR Experience',
    badge: 'Shipped',
    description: 'A free-roam VR experience commissioned by the Government of Maharashtra. Bridges the gap between ongoing mega-projects in Mumbai and the public — giving citizens a real-time visual of what\'s under development.',
    tags: ['Unity', 'Blender'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.tem.mumbaimetaverse',
    caseStudy: '',
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
    fallback: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'rapid',
    title: 'Rapid',
    category: 'TPS Mobile',
    badge: 'In Dev',
    description: 'A tactical third-person shooter built for high manoeuvrability and skill-hungry strategies. Fast movement, sharp gunplay, and team-based combat — currently in active development.',
    tags: ['Unity', 'Blender', 'Substance Painter'],
    playUrl: '',
    caseStudy: '',
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
    fallback: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000',
  },
];

type Project = typeof projects[0];

const isActive = (url: string) => url.trim() !== '';

const badgeCls: Record<string, string> = {
  Shipped: 'bg-green-500/15 text-green-400 border-green-500/40',
  'In Dev': 'bg-amber-500/15 text-amber-400 border-amber-500/40',
};

// Fallback when local image is missing
const onImgErr = (fallback: string) => (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = fallback;
};

// ── Project Modal ─────────────────────────────────────────────────────────────
const Modal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{ opacity: 0, scale: 0.92,    y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={`/projects/${project.key}_1.jpg`}
            alt={project.title}
            onError={onImgErr(project.fallback)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all rounded-sm"
          >
            <X size={14} />
          </button>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-indigo-600 text-[10px] font-black uppercase tracking-widest text-white rounded-sm">
              {project.category}
            </span>
            <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest border rounded-sm ${badgeCls[project.badge]}`}>
              {project.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-black uppercase italic text-white mb-3">{project.title}</h3>
          <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(t => (
              <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] uppercase font-bold rounded-sm border border-slate-700">{t}</span>
            ))}
          </div>
          <div className="flex gap-4">
            {isActive(project.playUrl) ? (
              <a href={project.playUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest transition-colors">
                <Play size={13} className="fill-current" /> Play / Download
              </a>
            ) : (
              <span className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-600 font-black text-xs uppercase tracking-widest cursor-not-allowed">
                <Lock size={13} /> Demo Coming Soon
              </span>
            )}
            {isActive(project.caseStudy) && (
              <a href={project.caseStudy} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-indigo-400 font-black text-xs uppercase tracking-widest transition-all">
                <ExternalLink size={13} /> Case Study
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ── Projects Section ──────────────────────────────────────────────────────────
const Projects = () => {
  const [modal, setModal] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Portfolio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase italic"
          >
            Current <span className="text-indigo-500">Missions</span>
          </motion.h2>
          <p className="text-slate-500 text-sm mt-3 italic">Click any project to view details</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.button
              key={project.key}
              type="button"
              onClick={() => setModal(project)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -4 }}
              className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden group hover:border-indigo-500 transition-all duration-300 shadow-xl text-left w-full"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`/projects/${project.key}_1.jpg`}
                  alt={project.title}
                  onError={onImgErr(project.fallback)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-sm">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded-sm ${badgeCls[project.badge]}`}>
                    {project.badge}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    View Details <ChevronRight size={12} />
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="text-lg font-black uppercase italic text-white group-hover:text-indigo-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.slice(0, 4).map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] uppercase font-bold rounded-sm border border-slate-700">{t}</span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 text-slate-600 text-[9px] uppercase font-bold">+{project.tags.length - 4}</span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && <Modal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
};

export default Projects;
