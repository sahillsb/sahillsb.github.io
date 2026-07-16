import { useState, useEffect, type SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Play, Lock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  // ── Professional ─────────────────────────────────────────────────────────
  {
    key: 'faug',
    title: 'FAUG Domination',
    subtitle: 'TACTICAL TEAM-BASED ZONE CAPTURE FPS FOR MOBILE',
    category: 'FPS Multiplayer',
    badge: 'Shipped' as const,
    studio: 'Dot9 Games',
    genre: 'FPS / Multiplayer',
    platform: 'Android / iOS',
    engine: 'Unity',
    description: 'FAU-G Domination is a fast-paced multiplayer mode built on tactical team combat — players compete to capture and hold strategic zones. Focused on map control, squad coordination, and smart positioning over pure aggression.',
    highlights: [
      'Published on Google Play Store with millions of downloads',
      "Part of the FAUG franchise — India's top mobile FPS title",
      'Real-time multiplayer with Photon networking at scale',
    ],
    contributions: [
      'Designing fun interactive and competitive Level Design',
      'Multiplayer session flow and matchmaking UX',
      'Combat balancing and level design',
      'Asset integration with Maya & Substance Painter',
    ],
    features: [
      'Team-based deathmatch',
      'Real-time multiplayer via Photon',
      'Tactical combat mechanics',
      'Dynamic respawn and spawn protection',
    ],
    tags: ['Unity', 'Maya', 'Substance Painter', 'Photon', 'Playfab', 'Firestore'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.dotnine.faug',
    caseStudy: '',
    images: ['faug_1.jpg', 'faug_2.jpg', 'faug_3.png', 'faug_4.png', 'faug_5.png'],
    fallback: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'mumbai',
    title: 'Mumbai Megapolis Metaverse',
    subtitle: 'GOVERNMENT-COMMISSIONED CIVIC VR EXPERIENCE',
    category: 'VR Experience',
    badge: 'Shipped' as const,
    studio: 'Dot9 Games',
    genre: 'VR / Simulation',
    platform: 'Android / iOS (Google Cardboard)',
    engine: 'Unity',
    description: "A free-roam VR experience commissioned by the Government of Maharashtra. Bridges the gap between ongoing mega-projects in Mumbai and the public — giving citizens a real-time visual of what's under development.",
    highlights: [
      'Commissioned by the Government of Maharashtra',
      'Featured at infrastructure and civic exhibitions across Mumbai',
      'One of the first government VR civic-tech projects in India',
    ],
    contributions: [
      'VR experience design and interaction flow',
      '3D environment modeling and scene composition',
      'Interactive information point placement and UX',
      'Mobile VR optimization for low-end hardware',
    ],
    features: [
      'Free-roam VR environment',
      'Real-time infrastructure project visualization',
      'Interactive information hotspots',
      'Mobile VR compatibility (Google Cardboard)',
    ],
    tags: ['Unity', 'Blender'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.tem.mumbaimetaverse',
    caseStudy: '',
    images: ['mumbai_1.png', 'mumbai_2.png', 'mumbai_3.png', 'mumbai_4.png', 'mumbai_5.png'],
    fallback: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'projectx',
    title: 'Project X',
    subtitle: 'WEB3 DRAGON-RIDER DEATHMATCH WITH CRYPTO REWARDS',
    category: 'Web3 Multiplayer',
    badge: 'Shipped' as const,
    studio: 'Confidential (NDA)',
    genre: 'Web3 / Multiplayer',
    platform: 'PC (Web / WebGL)',
    engine: 'Unity (WebGL)',
    description: 'A dragon-rider deathmatch on the web where players earn coins redeemable as crypto via MetaMask wallet. Designed the core combat loop, reward economy, and multiplayer session flow.',
    highlights: [
      'Blockchain-integrated play-to-earn reward system',
      'Dragon-rider aerial deathmatch combat',
      'MetaMask wallet integration for crypto withdrawals',
    ],
    contributions: [
      'Core combat loop and aerial movement design',
      'Reward economy and coin-to-crypto conversion flow',
      'Multiplayer session management design',
      'UI/UX design in Figma',
    ],
    features: [
      'Dragon-rider aerial deathmatch',
      'MetaMask wallet integration',
      'Play-to-earn crypto reward system',
      'Real-time multiplayer combat',
    ],
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
    subtitle: 'SKILL-HUNGRY TPS BUILT FOR HIGH MANOEUVRABILITY',
    category: 'TPS Mobile',
    badge: 'In Dev' as const,
    studio: 'Indie / Personal',
    genre: 'TPS / Action',
    platform: 'Android / iOS',
    engine: 'Unity',
    description: 'A tactical third-person shooter built for high manoeuvrability and skill-hungry strategies. Fast movement, sharp gunplay, and team-based combat — currently in active development.',
    highlights: [
      'Inspired by high-skill-ceiling competitive mobile shooters',
      'Focus on movement mechanics and positional play',
      'Currently in active development with a playable build',
    ],
    contributions: [
      'Game design and creative direction',
      '3D character and weapon modeling',
      'Movement system and combat mechanic design',
      'Level design and map prototyping',
    ],
    features: [
      'High-maneuverability movement system',
      'Skill-based gunplay mechanics',
      'Team-based tactical combat',
      'Custom weapon and character assets',
    ],
    tags: ['Unity', 'Blender', 'Substance Painter'],
    playUrl: '',
    caseStudy: '',
    images: ['rapid_1.jpg', 'rapid_2.jpg', 'rapid_3.jpg', 'rapid_4.jpg', 'rapid_5.jpg', 'rapid_6.mp4'],
    fallback: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'coindash',
    title: 'Coin Dash',
    subtitle: 'ENDLESS RUNNER WITH COSMETIC UPGRADE PROGRESSION',
    category: 'Endless Runner',
    badge: 'Shipped' as const,
    studio: 'Personal',
    genre: 'Casual / Endless Runner',
    platform: 'Android',
    engine: 'Unity',
    description: 'An endless runner where the player collects coins on the fly and spends them on cosmetic upgrades — hats, trails, and character skins. Clean loop with satisfying progression.',
    highlights: [
      'Complete mobile game with shipped build',
      'Cosmetic upgrade economy (hats, trails, skins)',
      'Escalating difficulty with performance-based coin rewards',
    ],
    contributions: [
      'Full game design and production',
      '2D art and character illustrations',
      'Cosmetic upgrade system and shop design',
      'Difficulty curve and progression tuning',
    ],
    features: [
      'Endless runner core loop',
      'Collectible coin mechanics',
      'Cosmetic upgrade shop (hats, trails, skins)',
      'Escalating difficulty system',
    ],
    tags: ['Unity', 'Photoshop'],
    playUrl: '',
    caseStudy: '',
    images: ['coindash_1.jpg', 'coindash_2.jpg', 'coindash_3.jpg', 'coindash_4.jpg', 'coindash_5.jpg', 'coindash_6.png', 'coindash_7.mp4'],
    fallback: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'parcelstack',
    title: 'Parcel Stack',
    subtitle: 'PHYSICS-BASED HYPER-CASUAL STACKING RUNNER',
    category: 'Casual Runner',
    badge: 'Shipped' as const,
    studio: 'Personal',
    genre: 'Hyper-Casual',
    platform: 'Android / iOS',
    engine: 'Unity',
    description: 'A casual mobile game where the player loads parcels onto a stretching cart — the longer the stack, the higher the coin reward. Designed around satisfying physics and a simple escalating risk loop.',
    highlights: [
      'Satisfying physics-based stacking mechanic',
      'Simple one-tap controls with escalating risk/reward',
      'Shipped as part of hyper-casual game portfolio',
    ],
    contributions: [
      'Core stacking mechanic and physics tuning',
      '3D asset modeling for parcels and environment',
      'Level progression and difficulty curve design',
      'Monetization loop design',
    ],
    features: [
      'Physics-based parcel stacking',
      'Escalating risk/reward loop',
      'Simple one-tap controls',
      'Coin reward system',
    ],
    tags: ['Unity', 'Blender'],
    playUrl: '',
    caseStudy: '',
    images: ['parcelstack_1.png', 'parcelstack_2.png', 'parcelstack_3.png', 'parcelstack_4.png', 'parcelstack_5.png', 'parcelstack_6.mp4'],
    fallback: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000',
  },
  // ── Research ──────────────────────────────────────────────────────────────
  {
    key: 'aiprototype',
    title: 'AI Prototype',
    subtitle: 'NPC BEHAVIOR RESEARCH USING STATE MACHINES & BEHAVIOR TREES',
    category: 'NPC AI Research',
    badge: 'Research' as const,
    studio: 'Research / Personal',
    genre: 'AI Research / Prototype',
    platform: 'PC (Windows)',
    engine: 'Unity',
    description: 'An experimental Unity prototype exploring AI behavior systems — state machines, behavior trees, and dynamic NPC decision-making. Built to prototype AI patterns covering pathfinding, combat reactions, and adaptive difficulty for use in future game titles.',
    highlights: [
      'State machine and behavior tree architecture research',
      'Dynamic NPC combat and pathfinding experiments',
      'Adaptive difficulty system prototyping',
    ],
    contributions: [
      'AI architecture design and system documentation',
      'State machine implementation in Unity C#',
      'Behavior tree integration and node design',
      'Pathfinding and obstacle avoidance testing',
    ],
    features: [
      'Finite state machine NPC AI',
      'Behavior tree decision systems',
      'A* and NavMesh pathfinding',
      'Adaptive difficulty scaling',
    ],
    tags: ['Unity', 'C#', 'AI Behavior', 'State Machines'],
    playUrl: '',
    caseStudy: '',
    images: ['aiprototype_1.jpg', 'aiprototype_2.jpg', 'aiprototype_3.jpg'],
    fallback: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1000',
  },
  // ── Creative ──────────────────────────────────────────────────────────────
  {
    key: 'art2d',
    title: '2D Art',
    subtitle: 'DIGITAL ILLUSTRATION, CHARACTER DESIGN & PHOTO MANIPULATION',
    category: 'Digital Art',
    badge: 'Personal' as const,
    studio: 'Personal',
    genre: 'Digital Art / Illustration',
    platform: '–',
    engine: 'Photoshop',
    description: 'A collection of 2D digital artworks including character design, landscape painting, and photo manipulation. These works explore visual storytelling and develop foundational art skills directly applied to game UI, concept art, and marketing materials.',
    highlights: [
      'Original character design and concept art',
      'Landscape painting for environment reference and world-building',
      'Photo manipulation and compositing for promotional assets',
    ],
    contributions: [
      'Character concept design and illustration',
      'Landscape and environment painting',
      'Photo manipulation and digital compositing',
      'Style exploration for game art direction',
    ],
    features: [
      'Character concept design',
      'Environment / landscape illustration',
      'Photo manipulation & compositing',
      'Digital painting & stylization',
    ],
    tags: ['Photoshop', 'Digital Illustration', 'Concept Art', 'Photo Manipulation'],
    playUrl: '',
    caseStudy: '',
    images: ['art2d_1.jpg', 'art2d_2.jpg', 'art2d_3.jpg', 'art2d_4.jpg'],
    fallback: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    key: 'art3d',
    title: '3D Art',
    subtitle: '3D MODELING, RIGGING & GAME-READY ASSET CREATION',
    category: '3D Art & Modeling',
    badge: 'Personal' as const,
    studio: 'Personal',
    genre: '3D Art / Game Assets',
    platform: '–',
    engine: 'Blender / Maya',
    description: 'A portfolio of 3D modeling work spanning game-ready weapons, characters, and mechanical designs. Created for use in shipped game projects and as standalone showcases of technical modeling, UV unwrapping, PBR texturing, and character rigging skill.',
    highlights: [
      'Spiderman character model with full deformation rig',
      'Game-ready weapon assets used in shipped titles (M416, P1911, SSG Scout)',
      'Hard-surface mechanical and robot character designs',
    ],
    contributions: [
      'High-poly & low-poly modeling pipeline',
      'UV unwrapping and PBR texture baking',
      'Character rigging and weight painting',
      'Asset optimization for real-time game engines',
    ],
    features: [
      'Game-ready weapon models',
      'Character modeling & rigging',
      'Hard-surface mechanical design',
      'PBR texturing pipeline',
    ],
    tags: ['Blender', 'Maya', 'Substance Painter', '3D Modeling', 'Character Rigging'],
    playUrl: '',
    caseStudy: '',
    images: ['art3d_1.png', 'art3d_2.png', 'art3d_3.png', 'art3d_4.png', 'art3d_5.png', 'art3d_6.png', 'art3d_7.png'],
    fallback: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
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

const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

// Renders an image or a video thumbnail with a play badge
const MediaThumb = ({ src, fallback, className }: { src: string; fallback: string; className: string }) => {
  if (isVideo(src)) {
    return (
      <div className="relative w-full h-full">
        <video src={src} className={className} muted preload="metadata" playsInline />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-9 h-9 rounded-full bg-black/60 border border-white/40 flex items-center justify-center">
            <Play size={14} className="text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
    );
  }
  return <img src={src} alt="" onError={onImgErr(fallback)} className={className} />;
};

const Bullet = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-sm text-white/90">
    <span className="w-2 h-2 mt-[5px] bg-cyan-400 flex-shrink-0" />
    {text}
  </li>
);

// ── Gallery Modal ─────────────────────────────────────────────────────────────
const Modal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [fsIdx, setFsIdx] = useState<number | null>(null);

  const imgs = project.images.length > 0
    ? project.images.map(f => `/projects/${f}`)
    : [project.fallback];

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFsIdx(i => i === null ? 0 : (i - 1 + imgs.length) % imgs.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFsIdx(i => i === null ? 0 : (i + 1) % imgs.length);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fsIdx !== null) { setFsIdx(null); }
        else { onClose(); }
        return;
      }
      if (fsIdx === null) return;
      if (e.key === 'ArrowLeft')  setFsIdx(i => i === null ? null : (i - 1 + imgs.length) % imgs.length);
      if (e.key === 'ArrowRight') setFsIdx(i => i === null ? null : (i + 1) % imgs.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fsIdx, imgs.length, onClose]);

  return createPortal(
    <>
      <AnimatePresence>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 overflow-y-auto"
        >
          <div className="flex justify-center min-h-full items-start pt-20 pb-10 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0f0f0f] border border-slate-800 rounded-sm max-w-5xl w-full shadow-2xl flex flex-col md:flex-row overflow-hidden"
              style={{ maxHeight: '85vh' }}
            >
              {/* ── Left column: hero + all text ── */}
              <div className="flex-1 min-w-0 flex flex-col overflow-y-auto scrollbar-hide">

                {/* Hero — always use the first non-video frame */}
                <div className="relative h-52 sm:h-64 flex-shrink-0 overflow-hidden">
                  <img
                    src={imgs.find(s => !isVideo(s)) ?? project.fallback}
                    alt={project.title}
                    onError={onImgErr(project.fallback)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wider leading-none mb-2">
                      {project.title}
                    </h2>
                    <p className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      {project.subtitle}
                    </p>
                  </div>
                  {/* Close — mobile only */}
                  <button type="button" onClick={onClose}
                    className="md:hidden absolute top-4 right-4 w-9 h-9 bg-black/60 border border-slate-600 rounded-full flex items-center justify-center text-white z-10">
                    <X size={15} />
                  </button>
                </div>

                {/* Text content */}
                <div className="p-6 md:p-8 space-y-7">

                  <section>
                    <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">About the Game</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                  </section>

                  <section>
                    <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">Project Details</h3>
                    <ul className="space-y-2.5">
                      {project.studio && (
                        <li className="flex items-start gap-3 text-sm">
                          <span className="w-2 h-2 mt-[5px] bg-cyan-400 flex-shrink-0" />
                          <span><strong className="text-white">Studio:</strong>{' '}
                            <span className="text-slate-300">{project.studio}</span></span>
                        </li>
                      )}
                      <li className="flex items-start gap-3 text-sm">
                        <span className="w-2 h-2 mt-[5px] bg-cyan-400 flex-shrink-0" />
                        <span><strong className="text-white">Genre:</strong>{' '}
                          <span className="text-slate-300">{project.genre}</span></span>
                      </li>
                      {project.platform && project.platform !== '–' && (
                        <li className="flex items-start gap-3 text-sm">
                          <span className="w-2 h-2 mt-[5px] bg-cyan-400 flex-shrink-0" />
                          <span><strong className="text-white">Platform:</strong>{' '}
                            <span className="text-slate-300">{project.platform}</span></span>
                        </li>
                      )}
                      {project.engine && project.engine !== '–' && (
                        <li className="flex items-start gap-3 text-sm">
                          <span className="w-2 h-2 mt-[5px] bg-cyan-400 flex-shrink-0" />
                          <span><strong className="text-white">Engine:</strong>{' '}
                            <span className="text-slate-300">{project.engine}</span></span>
                        </li>
                      )}
                    </ul>
                  </section>

                  {project.highlights.length > 0 && (
                    <section>
                      <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">Project Highlights</h3>
                      <ul className="space-y-2.5">
                        {project.highlights.map((h, i) => <Bullet key={i} text={h} />)}
                      </ul>
                    </section>
                  )}

                  {project.contributions.length > 0 && (
                    <section>
                      <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">My Contributions</h3>
                      <ul className="space-y-2.5">
                        {project.contributions.map((c, i) => <Bullet key={i} text={c} />)}
                      </ul>
                    </section>
                  )}

                  {project.features.length > 0 && (
                    <section>
                      <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">Features</h3>
                      <ul className="space-y-2.5">
                        {project.features.map((f, i) => <Bullet key={i} text={f} />)}
                      </ul>
                    </section>
                  )}

                  <section>
                    <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-3">Tools & Tech</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(t => (
                        <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-[9px] uppercase font-bold rounded-sm border border-slate-700">{t}</span>
                      ))}
                    </div>
                  </section>

                  {/* Mobile-only image gallery (hidden on desktop — desktop uses right column) */}
                  {imgs.length > 1 && (
                    <div className="md:hidden">
                      <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-3">Gallery</h3>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {imgs.map((img, i) => (
                          <button key={i} type="button" onClick={() => setFsIdx(i)}
                            className="flex-shrink-0 w-36 aspect-video rounded-sm overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                            <MediaThumb src={img} fallback={project.fallback}
                              className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap pb-2">
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
              </div>

              {/* ── Right column: close button + stacked gallery images (desktop only) ── */}
              <div className="hidden md:flex md:flex-col relative md:w-56 lg:w-64 flex-shrink-0 border-l border-slate-800 overflow-y-auto scrollbar-hide bg-[#0a0a0a]">

                {/* Close button — sticky at the top */}
                <div className="sticky top-0 z-10 flex justify-end p-3 bg-[#0a0a0a]/80 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-9 h-9 bg-black/60 border border-slate-600 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Images stacked vertically */}
                <div className="flex flex-col gap-2 px-2 pb-2">
                  {imgs.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFsIdx(i)}
                      className="block w-full group rounded-sm overflow-hidden flex-shrink-0 border border-slate-800/60 hover:border-indigo-500/50 transition-colors duration-200"
                    >
                      <MediaThumb src={img} fallback={project.fallback}
                        className="w-full aspect-[4/3] object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Fullscreen overlay ── */}
      <AnimatePresence>
        {fsIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
            onClick={() => setFsIdx(null)}
          >
            {isVideo(imgs[fsIdx]) ? (
              <video
                src={imgs[fsIdx]}
                onClick={e => e.stopPropagation()}
                controls autoPlay playsInline
                className="max-w-full max-h-full"
                style={{ maxHeight: '100dvh', maxWidth: '100dvw' }}
              />
            ) : (
              <img
                src={imgs[fsIdx]}
                alt={project.title}
                onError={onImgErr(project.fallback)}
                onClick={e => e.stopPropagation()}
                className="max-w-full max-h-full object-contain select-none"
                style={{ maxHeight: '100dvh', maxWidth: '100dvw' }}
              />
            )}

            <button type="button" onClick={() => setFsIdx(null)}
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white rounded-sm transition-colors">
              <X size={18} />
            </button>

            {imgs.length > 1 && (
              <>
                <button type="button" onClick={prevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white rounded-sm transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button type="button" onClick={nextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white rounded-sm transition-colors">
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-sm font-mono tracking-widest">
                  {fsIdx + 1} / {imgs.length}
                </div>
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/50 rounded-sm backdrop-blur-sm max-w-[90vw] overflow-x-auto">
                  {imgs.map((img, i) => (
                    <button key={i} type="button" onClick={e => { e.stopPropagation(); setFsIdx(i); }}
                      className={`flex-shrink-0 w-14 h-10 overflow-hidden rounded-sm border-2 transition-colors ${i === fsIdx ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                      <MediaThumb src={img} fallback={project.fallback} className="w-full h-full object-cover" />
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
    </>,
    document.body
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
                {project.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 text-[9px] text-white/70 font-mono rounded-sm">
                    {project.images.length} imgs
                  </div>
                )}
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
