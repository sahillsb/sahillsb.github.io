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
    concept: 'A tower-climbing hybrid casual concept pitched around real-time deck combat. Players climb a monster-infested tower that doubles as a live leaderboard, battling with an evolving hero deck while managing a home base built from resources earned along the way.',
    tags: ['Hybrid Casual', 'Deck Builder', 'Market Research', 'Monetization'],
    pdfUrl: '/docs/ascend-defend-pitch.pdf',
  },
  {
    key: 'quantumjackpot',
    title: 'Quantum Jackpot',
    subtitle: 'SCI-FI SLOT MACHINE — FULL GAME DESIGN DOCUMENT',
    type: 'GDD' as DocType,
    concept: 'A high-volatility 3×3 slot set inside a futuristic quantum computing facility. Players charge a Reactor Overload meter by landing Energy Cell scatters — filling it triggers 8 free spins with a randomly drawn Quantum Core multiplier on every spin.',
    tags: ['Slot Math', 'RTP Design', 'Systems Spec', 'Art Direction', 'Sound Design'],
    pdfUrl: '/docs/quantum-jackpot-gdd.pdf',
  },
  {
    key: 'sculpturemerge',
    title: 'Sculpture Merge',
    subtitle: 'MERGE-2 PUZZLE / WORLD-BUILDER — FULL GAME DESIGN DOCUMENT',
    type: 'GDD' as DocType,
    concept: "Merge scrap metal into handcrafted sculptures, then place each one into a living themed world. The merge-puzzle micro-loop and the world-building meta-loop are bound together by the sculpture itself — the output of every level and the input to every world.",
    tags: ['Puzzle Systems', 'Meta Progression', 'Live Ops', 'Economy Design'],
    pdfUrl: '/docs/sculpture-merge-gdd.pdf',
  },
  {
    key: 'tileexplorer',
    title: 'Tile Explorer Deconstruct',
    subtitle: 'COMPETITIVE ANALYSIS OF A LIVE MAHJONG TRIPLE-MATCH GAME',
    type: 'Deconstruct' as DocType,
    concept: "A self-directed teardown of Tile Explorer by Oakever Games — a Mahjong-style triple-match tile puzzler. Breaks the shipped game down into its core loop, difficulty curve, monetization model, and ad strategy to extract what works, what doesn't, and why.",
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

// ── PDF Viewer Modal ──────────────────────────────────────────────────────────
const Modal = ({ doc, onClose }: { doc: Doc; onClose: () => void }) => {
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
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#0f0f0f] border border-slate-800 rounded-sm w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: '90vh' }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-slate-800 flex-shrink-0">
            <div className="min-w-0">
              <span className={`inline-block px-2 py-0.5 mb-1 text-[9px] font-black uppercase tracking-widest border rounded-sm ${typeStyle[doc.type].badge}`}>
                {doc.type}
              </span>
              <h2 className="text-base sm:text-xl font-black uppercase text-white tracking-wide truncate">
                {doc.title}
              </h2>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 truncate">
                {doc.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a href={doc.pdfUrl} download target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest transition-colors rounded-sm">
                <Download size={12} /> <span className="hidden sm:inline">Download</span>
              </a>
              <button type="button" onClick={onClose}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-white transition-colors">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* PDF viewer — native browser renderer, scrolls through every page */}
          <iframe
            src={doc.pdfUrl}
            title={doc.title}
            className="w-full flex-1 bg-slate-950"
          />
        </motion.div>
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
          <p className="text-slate-500 text-sm mt-3 italic">Pitches, full GDDs, and a competitive teardown — click any entry to read the full document</p>
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
