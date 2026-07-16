import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Rocket, FileText, Search, Download, X, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DocType = 'Elevator Pitch' | 'GDD' | 'Deconstruct';

const docs = [
  {
    key: 'ascenddefend',
    title: 'Ascend & Defend',
    subtitle: 'HYBRID CASUAL TOWER CLIMB + DECK BUILDER — ELEVATOR PITCH',
    type: 'Elevator Pitch' as DocType,
    genre: 'Hybrid Casual / Deck Builder',
    concept: 'A tower-climbing hybrid casual concept pitched around real-time deck combat. Players climb a monster-infested tower that doubles as a live leaderboard, battling with an evolving hero deck while managing a home base built from resources earned along the way.',
    coreLoop: [
      'Build Base & Train Troops — construct a village and prepare units to challenge the tower',
      'Combat & Card Collection — defeat enemies in real-time using strategy-driven deck-building',
      'Progression & Choices — climb the leaderboard, choosing where to spend limited resources',
      'Boss Fights & Upgrades — survive harder tower floors to unlock rare cards',
    ],
    systems: [
      'Dynamic Deck Evolution — hero cards level up and evolve into stronger variants based on playstyle',
      'Real-time combat (not turn-based) to differentiate from typical deck builders',
      'Guild system with Guild Wars for competitive resource battles',
      'Social base-invasion — players can raid bases built by others',
    ],
    extraHeading: 'Pitch Grounding',
    extra: [
      'Backed the genre choice with hybrid-casual market data (SensorTower downloads/revenue growth, 2019–2023)',
      'Free-to-play model: cosmetic skins, battle pass, premium card packs',
      'Daily/weekly challenges and seasonal events (new dungeon themes, limited cards) to drive retention',
    ],
    tags: ['Hybrid Casual', 'Deck Builder', 'Market Research', 'Monetization'],
    pdfUrl: '/docs/ascend-defend-pitch.pdf',
  },
  {
    key: 'quantumjackpot',
    title: 'Quantum Jackpot',
    subtitle: 'SCI-FI SLOT MACHINE — FULL GAME DESIGN DOCUMENT',
    type: 'GDD' as DocType,
    genre: 'Slot / Casino',
    concept: 'A high-volatility 3×3 slot set inside a futuristic quantum computing facility. Players charge a Reactor Overload meter by landing Energy Cell scatters — filling it triggers 8 free spins with a randomly drawn Quantum Core multiplier on every spin.',
    coreLoop: [
      'Base Game — match symbols across 5 fixed paylines for an immediate win',
      'Progression — each visible Energy Cell adds charge to the Reactor Overload Meter',
      'Feature Reward — Reactor Overload free spins deliver high-value wins with a random multiplier',
    ],
    systems: [
      '8-symbol paytable across 3 tiers plus Wild & Scatter, fully priced per payline',
      'Reactor Overload Meter — 10-segment charge bar with overcharge and cross-session reset rules',
      '2-tier jackpot (Fusion 100×, Quantum 500×) evaluated server-side on non-winning spins',
      '5 fixed paylines covering all rows plus both diagonals',
    ],
    extraHeading: 'Math, Tech & Ops',
    extra: [
      'RTP modeled to a 95.50% target (±0.10 tolerance) split across base game and feature contribution',
      'Full win-distribution table (No Win / Micro / Small / Feature) with explicit volatility targeting',
      'Documented front-end vs. back-end responsibility split, spin-response payload schema, and client state machine',
      'Development estimate: ~35 front-end days + ~31 back-end days (~10 weeks running in parallel)',
      'Complete art direction — color palette with hex values, sound design table across 15+ game events',
      'Responsible gambling provisions — reality check, auto-spin caps, non-persistent meter',
    ],
    tags: ['Slot Math', 'RTP Design', 'Systems Spec', 'Art Direction', 'Sound Design'],
    pdfUrl: '/docs/quantum-jackpot-gdd.pdf',
  },
  {
    key: 'sculpturemerge',
    title: 'Sculpture Merge',
    subtitle: 'MERGE-2 PUZZLE / WORLD-BUILDER — FULL GAME DESIGN DOCUMENT',
    type: 'GDD' as DocType,
    genre: 'Merge-2 Puzzle / World-Builder',
    concept: "Merge scrap metal into handcrafted sculptures, then place each one into a living themed world. The merge-puzzle micro-loop and the world-building meta-loop are bound together by the sculpture itself — the output of every level and the input to every world.",
    coreLoop: [
      'Enter Level — a themed board opens with a target sculpture silhouette',
      'Merge — combine matching-tier scrap pieces up through 5 tiers to reach the target',
      'Complete & Place — the finished sculpture is carried to the world map and placed',
      'World Fills & Unlocks — the world diorama updates and the next level unlocks',
    ],
    systems: [
      'Universal 5-tier merge structure reskinned per world (e.g. Iron Shard → Viking Longship)',
      '6 themed worlds × 4 chapters × 4 levels = 96 structured levels with a defined difficulty arc',
      '6 unique special-piece mechanics, one introduced per world (Magnetic, Locked, Fragile, Resonance, Echo, Catalyst)',
      'Star rating and Sculpture Collection meta-game tracking all 96 buildable pieces',
    ],
    extraHeading: 'Economy & Live Ops',
    extra: [
      'Dual currency economy (coins/gems) with 5 IAP tiers and opt-in rewarded-ad placements',
      'Live-ops calendar: 7-day login rewards, weekly World Rush & Forge Festival events, 9 seasonal 4-week events per year',
      'Full art direction per world (palette + lighting) and an SFX/music table covering every key animation beat',
    ],
    tags: ['Puzzle Systems', 'Meta Progression', 'Live Ops', 'Economy Design'],
    pdfUrl: '/docs/sculpture-merge-gdd.pdf',
  },
  {
    key: 'tileexplorer',
    title: 'Tile Explorer Deconstruct',
    subtitle: 'COMPETITIVE ANALYSIS OF A LIVE MAHJONG TRIPLE-MATCH GAME',
    type: 'Deconstruct' as DocType,
    genre: 'Competitive Analysis',
    concept: "A self-directed teardown of Tile Explorer by Oakever Games — a Mahjong-style triple-match tile puzzler. Breaks the shipped game down into its core loop, difficulty curve, monetization model, and ad strategy to extract what works, what doesn't, and why.",
    coreLoop: [
      'Tap accessible (unstacked) tiles to slot them into a 7-slot tray',
      'Landing 3 identical tiles clears them; filling the tray without a match fails the level',
      'Boosters (Undo, Instant Match, Reshuffle) mitigate dead-end tray states',
    ],
    systems: [
      'Difficulty curve mapped across 5 named bands, from Tutorial (Lv 1–10) to Expert/Endgame (Lv 500+)',
      'Linear level-number progression cross-cut with a scenery (themed world) layer and a separate ranked leaderboard mode',
      'Ad-first monetization — IAP functions as coin/booster support revenue, not the primary driver',
    ],
    extraHeading: 'Findings',
    extra: [
      'Rewarded-video placements are best-in-class — multiple opt-in touchpoints with high eCPM',
      'Interstitial-as-continue-mechanic on fail state is a clever conversion hook',
      'Flagged a critical trust risk: the No-Ads IAP does not fully remove ads per player reports',
      'Identified a missed subscription / battle-pass revenue opportunity given the game’s download scale',
      'Ad frequency (5–8 per session) exceeds typical casual-puzzle norms — likely driving negative store reviews',
    ],
    tags: ['Competitive Analysis', 'Monetization Audit', 'Ad Strategy', 'UX Critique'],
    pdfUrl: '/docs/tile-explorer-deconstruct.pdf',
  },
];

type Doc = typeof docs[0];

const typeStyle: Record<DocType, { badge: string; icon: LucideIcon; iconWrap: string }> = {
  'Elevator Pitch': { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/40', icon: Rocket,   iconWrap: 'text-purple-400' },
  GDD:              { badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40',       icon: FileText, iconWrap: 'text-cyan-400' },
  Deconstruct:      { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/40',    icon: Search,   iconWrap: 'text-amber-400' },
};

const Bullet = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-sm text-white/90">
    <span className="w-2 h-2 mt-[5px] bg-cyan-400 flex-shrink-0" />
    {text}
  </li>
);

// ── Detail Modal ─────────────────────────────────────────────────────────────
const Modal = ({ doc, onClose }: { doc: Doc; onClose: () => void }) => {
  const { icon: Icon } = typeStyle[doc.type];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
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
            className="bg-[#0f0f0f] border border-slate-800 rounded-sm max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '85vh' }}
          >
            {/* Hero */}
            <div className="relative h-40 sm:h-48 flex-shrink-0 overflow-hidden bg-slate-950 flex items-center justify-center">
              <Icon size={72} className={`${typeStyle[doc.type].iconWrap} opacity-20`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className={`inline-block px-2 py-0.5 mb-2 text-[9px] font-black uppercase tracking-widest border rounded-sm ${typeStyle[doc.type].badge}`}>
                  {doc.type}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wider leading-none mb-2">
                  {doc.title}
                </h2>
                <p className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {doc.subtitle}
                </p>
              </div>
              <button type="button" onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 border border-slate-600 rounded-full flex items-center justify-center text-white z-10">
                <X size={15} />
              </button>
            </div>

            {/* Text content */}
            <div className="p-6 md:p-8 space-y-7 overflow-y-auto scrollbar-hide">

              <section>
                <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">Concept</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{doc.concept}</p>
              </section>

              <section>
                <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">Core Loop</h3>
                <ul className="space-y-2.5">
                  {doc.coreLoop.map((c, i) => <Bullet key={i} text={c} />)}
                </ul>
              </section>

              <section>
                <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">Key Systems</h3>
                <ul className="space-y-2.5">
                  {doc.systems.map((s, i) => <Bullet key={i} text={s} />)}
                </ul>
              </section>

              <section>
                <h3 className="text-base font-black uppercase text-cyan-400 tracking-wider mb-3">{doc.extraHeading}</h3>
                <ul className="space-y-2.5">
                  {doc.extra.map((e, i) => <Bullet key={i} text={e} />)}
                </ul>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-3">Genre & Focus</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[doc.genre, ...doc.tags].map(t => (
                    <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-[9px] uppercase font-bold rounded-sm border border-slate-700">{t}</span>
                  ))}
                </div>
              </section>

              <div className="pb-2">
                <a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest transition-colors rounded-sm">
                  <Download size={12} /> Download Full {doc.type === 'Deconstruct' ? 'Breakdown' : 'Document'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

// ── Design Docs Section ───────────────────────────────────────────────────────
const DesignDocs = () => {
  const [modal, setModal] = useState<Doc | null>(null);

  return (
    <section id="design-docs" className="py-24 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-14">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Archive</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase">
            Design <span className="text-indigo-500">Vault</span>
          </motion.h2>
          <p className="text-slate-500 text-sm mt-3 italic">Pitches, full GDDs, and a competitive teardown — click any entry to read the breakdown</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {docs.map((doc, i) => {
            const { icon: Icon, iconWrap, badge } = typeStyle[doc.type];
            return (
              <motion.button
                key={doc.key}
                type="button"
                onClick={() => setModal(doc)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden group hover:border-indigo-500 transition-all duration-300 shadow-xl text-left w-full flex flex-col"
              >
                {/* Icon hero */}
                <div className="relative h-32 overflow-hidden bg-slate-950 flex items-center justify-center">
                  <Icon size={44} className={`${iconWrap} opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500`} />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded-sm ${badge}`}>
                      {doc.type}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-indigo-600/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest">
                      Read Doc
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-black uppercase text-white group-hover:text-indigo-400 transition-colors mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">{doc.concept}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {doc.tags.slice(0, 2).map(t => (
                      <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[9px] uppercase font-bold rounded-sm border border-slate-700">{t}</span>
                    ))}
                    {doc.tags.length > 2 && (
                      <span className="text-slate-600 text-[9px] font-bold px-1">+{doc.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {modal && <Modal doc={modal} onClose={() => setModal(null)} />}
    </section>
  );
};

export default DesignDocs;
