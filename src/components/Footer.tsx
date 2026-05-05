import { Heart, Mail, Code2, Globe } from 'lucide-react';

// ── UPDATE THESE with your real links ─────────────────────────────────────────
const EMAIL = 'sahilbapardekar01@gmail.com';
const GITHUB_URL = 'https://github.com/sahilgamedesigner';
const LINKEDIN_URL = 'https://www.linkedin.com/in/sahil-bapardekar-5b1b8b210/';
// ─────────────────────────────────────────────────────────────────────────────

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center rounded-sm">
              <span className="text-white font-black text-xs uppercase italic">S</span>
            </div>
            <span className="text-lg font-black italic tracking-tighter text-white uppercase">
              Sahil<span className="text-indigo-500">.GD</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
            <div className="flex items-center">
              <span>Mission Complete</span>
              <Heart className="w-3 h-3 mx-2 text-indigo-500 fill-current" />
              <span>{year} Sahil Bapardekar</span>
            </div>
            <p className="text-slate-600">All Worlds Reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="hover:text-indigo-400 transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-indigo-400 transition-colors"
            >
              <Code2 size={18} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-indigo-400 transition-colors"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 text-center">
          <p className="text-[9px] text-slate-700 uppercase tracking-[0.3em] font-black">
            Powered by React • Framer Motion • Tailwind CSS • Unreal Blueprints
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
