import { motion } from 'framer-motion';
import { Mail, Globe, FileText, Zap } from 'lucide-react';

// ── UPDATE THESE ──────────────────────────────────────────────────────────────
const CONTACT_EMAIL  = 'sahilbapardekar01@gmail.com';
const LINKEDIN_URL   = 'https://www.linkedin.com/in/sahil-bapardekar-5b1b8b210/';
const RESUME_URL     = '/resume.pdf';
// ─────────────────────────────────────────────────────────────────────────────

const channels = [
  {
    Icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    hint: 'Expect a reply within 24 hrs',
    external: false,
  },
  {
    Icon: Globe,
    label: 'LinkedIn',
    value: 'sahil-bapardekar',
    href: LINKEDIN_URL,
    hint: 'Connect professionally',
    external: true,
  },
  {
    Icon: FileText,
    label: 'Resume',
    value: 'View & Download PDF',
    href: RESUME_URL,
    hint: 'Opens in a new tab',
    external: true,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 text-white overflow-hidden relative">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-indigo-500/20"
        >
          <Zap className="w-3 h-3" />
          Connection Initialized
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black uppercase italic mb-6"
        >
          Let's build the{' '}
          <span className="text-indigo-500">Next Big World</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 mb-16 max-w-xl mx-auto leading-relaxed"
        >
          Whether you're looking for a lead designer, a consultant for mechanics, or a prototype developer — I'm ready for the next quest.
        </motion.p>

        {/* Contact channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((ch, i) => (
            <motion.a
              key={ch.label}
              href={ch.href}
              target={ch.external ? '_blank' : undefined}
              rel={ch.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-4 p-8 bg-slate-900/50 border border-slate-800 hover:border-indigo-500 hover:bg-slate-900 transition-all group rounded-sm"
            >
              <div className="w-14 h-14 bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.25)] flex items-center justify-center text-indigo-400 transition-all">
                <ch.Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{ch.label}</p>
                <p className="text-white font-bold text-sm group-hover:text-indigo-400 transition-colors break-all">{ch.value}</p>
                <p className="text-[10px] text-slate-600 mt-1 italic">{ch.hint}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Available status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-slate-400 text-xs font-black uppercase tracking-widest">
            Currently open to full-time & freelance opportunities
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
