import { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, Code2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// ── UPDATE THESE with your real URLs ──────────────────────────────────────────
const RESUME_URL = '/resume.pdf';           // place resume.pdf in the public/ folder
const GITHUB_URL = 'https://github.com/sahilgamedesigner';
const LINKEDIN_URL = 'https://www.linkedin.com/in/sahil-bapardekar-5b1b8b210/';
// ─────────────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mission', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div
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
          </motion.div>

          {/* Desktop Nav */}
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
            <div className="flex items-center space-x-4 ml-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <Code2 size={18} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <Globe size={18} />
              </a>
              <div className="h-4 w-[1px] bg-slate-800" />
              <a
                href={RESUME_URL}
                download
                className="px-4 py-2 border border-indigo-500/50 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all"
              >
                Resume.pdf
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-slate-950 border-b border-slate-800"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-slate-300 hover:text-indigo-400 font-black text-sm uppercase tracking-widest italic border-b border-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex justify-center gap-6 text-slate-400">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <Globe size={20} />
              </a>
              <a
                href={RESUME_URL}
                download
                className="text-indigo-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
              >
                Resume
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
