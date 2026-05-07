import { useState, useEffect } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from './icons';

// ── UPDATE THESE with your real URLs ──────────────────────────────────────────
const RESUME_URL  = '/resume.pdf';
const GITHUB_URL  = 'https://github.com/sahilgamedesigner';
const LINKEDIN_URL = 'https://www.linkedin.com/in/sahil-bapardekar-5b1b8b210/';
// ─────────────────────────────────────────────────────────────────────────────

const navLinks = [
  { name: 'About',    href: '#about'    },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills',   href: '#skills'   },
  { name: 'Contact',  href: '#contact'  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setMobileMenu]   = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileMenu(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center rounded-sm">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              Sahil<span className="text-indigo-500">.GD</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-indigo-400 font-black text-xs uppercase tracking-widest transition-colors italic"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-3 ml-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <LinkedinIcon size={17} />
              </a>
              <div className="h-4 w-px bg-slate-800" />
              {/* Resume: opens PDF in new tab (no download attr) */}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-indigo-500/50 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenu(prev => !prev)}
            aria-label="Toggle menu"
            className="md:hidden text-slate-400 hover:text-indigo-400 transition-colors p-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — AnimatePresence for clean enter/exit */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-slate-950 border-b border-slate-800 shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-3 py-4 text-slate-300 hover:text-indigo-400 font-black text-sm uppercase tracking-widest italic border-b border-slate-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-5 flex justify-center gap-6 text-slate-400">
                <a href={GITHUB_URL}   target="_blank" rel="noopener noreferrer" aria-label="GitHub"   className="hover:text-white transition-colors"><GithubIcon size={20} /></a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><LinkedinIcon size={20} /></a>
                <a href={RESUME_URL}   target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">Resume</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
