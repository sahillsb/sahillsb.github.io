import { ExternalLink, Play, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  // ── Professional titles ───────────────────────────────────────────────────
  {
    title: 'FAUG Domination',
    category: 'FPS Multiplayer',
    description: 'FAU-G Domination is a fast-paced multiplayer mode built on tactical team combat — players compete to capture and hold strategic zones. Focused on map control, squad coordination, and smart positioning over pure aggression.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
    tags: ['Unity', 'Maya', 'Substance Painter', 'Photon', 'Playfab', 'Firestore'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.dotnine.faug',
    caseStudy: '#',
    badge: 'Shipped',
  },
  {
    title: 'Mumbai Megapolis Metaverse',
    category: 'VR Experience',
    description: 'A free-roam VR experience commissioned by the Government of Maharashtra. Bridges the gap between ongoing mega-projects in Mumbai and the public — giving citizens a real-time visual of what\'s under development.',
    image: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&q=80&w=1000',
    tags: ['Unity', 'Blender'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.tem.mumbaimetaverse',
    caseStudy: '#',
    badge: 'Shipped',
  },
  {
    title: 'Project X',
    category: 'Web3 Multiplayer',
    description: 'A dragon-rider deathmatch on the web where players earn coins redeemable as crypto via MetaMask wallet. Designed the core combat loop, reward economy, and multiplayer session flow.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000',
    tags: ['Unity', 'Blender', 'Figma'],
    playUrl: '#',
    caseStudy: '#',
    badge: 'Shipped',
  },
  // ── Self projects ─────────────────────────────────────────────────────────
  {
    title: 'Rapid',
    category: 'TPS Mobile',
    description: 'A tactical third-person shooter built for high manoeuvrability and skill-hungry strategies. Fast movement, sharp gunplay, and team-based combat — currently in active development.',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000',
    tags: ['Unity', 'Blender', 'Substance Painter'],
    playUrl: '#',
    caseStudy: '#',
    badge: 'In Dev',
  },
  {
    title: 'Coin Dash',
    category: 'Endless Runner',
    description: 'An endless runner where the player collects coins on the fly and spends them on cosmetic upgrades — hats, trails, and character skins. Clean loop with satisfying progression.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    tags: ['Unity', 'Photoshop'],
    playUrl: '#',
    caseStudy: '#',
    badge: 'Shipped',
  },
  {
    title: 'Parcel Stack',
    category: 'Casual Runner',
    description: 'A casual mobile game where the player loads parcels onto a stretching cart — the longer the stack, the higher the coin reward. Designed around satisfying physics and a simple escalating risk loop.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000',
    tags: ['Unity', 'Blender'],
    playUrl: '#',
    caseStudy: '#',
    badge: 'Shipped',
  },
];

const isActiveLink = (url: string) => url.trim() !== '' && url.trim() !== '#';

const badgeColors: Record<string, string> = {
  'Shipped': 'bg-indigo-600',
  'In Dev': 'bg-amber-600',
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden group hover:border-indigo-500 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-75 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 ${badgeColors[project.badge] ?? 'bg-slate-700'} text-[10px] font-black uppercase tracking-widest rounded-sm text-white`}>
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-0.5 ${project.badge === 'In Dev' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-green-500/20 text-green-400 border border-green-500/40'} text-[9px] font-black uppercase tracking-widest rounded-sm`}>
                    {project.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black uppercase italic mb-3 text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-5 text-sm leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] uppercase font-bold rounded-sm border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  {isActiveLink(project.playUrl) ? (
                    <a
                      href={project.playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                    >
                      <Play size={14} className="fill-current" />
                      Play / Download
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2 text-slate-700 text-xs font-black uppercase tracking-widest cursor-not-allowed"
                      title="Demo coming soon"
                    >
                      <Lock size={14} />
                      Play Demo
                    </span>
                  )}

                  {isActiveLink(project.caseStudy) ? (
                    <a
                      href={project.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                    >
                      <ExternalLink size={14} />
                      Case Study
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2 text-slate-700 text-xs font-black uppercase tracking-widest cursor-not-allowed"
                      title="Case study coming soon"
                    >
                      <Lock size={14} />
                      Case Study
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
