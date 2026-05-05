import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Zap, CheckCircle } from 'lucide-react';

// ── UPDATE THESE with your real contact details ───────────────────────────────
const CONTACT_EMAIL = 'sahilbapardekar01@gmail.com';
const DISCORD_HANDLE = 'Sama';
// ─────────────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = 'Name required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
    if (!formData.message.trim()) e.message = 'Message required';
    return e;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-indigo-500/20">
              <Zap className="w-3 h-3" />
              Connection Initialized
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-6">
              Let's build the <br />
              <span className="text-indigo-500">Next Big World</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-md leading-relaxed">
              Whether you're looking for a lead designer, a consultant for mechanics, or a prototype developer, I'm ready for the next quest.
            </p>

            <div className="space-y-8">
              {/* Clickable email */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-500 group-hover:border-indigo-500 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Transmit Email</p>
                  <p className="text-white font-bold text-lg group-hover:text-indigo-400 transition-colors">{CONTACT_EMAIL}</p>
                </div>
              </a>

              {/* Discord (display only — no clickable protocol) */}
              <div className="flex items-center gap-6 group cursor-default">
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-500 group-hover:border-indigo-500 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Discord Handle</p>
                  <p className="text-white font-bold text-lg">{DISCORD_HANDLE}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-sm border border-slate-800 shadow-2xl"
          >
            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic text-white mb-2">Transmission Sent!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Your email client should have opened. If it didn't, contact me directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-slate-700 text-slate-400 text-xs font-black uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-400 transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              /* Form */
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 italic">
                      Player Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full bg-slate-950 border p-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 ${errors.name ? 'border-red-500' : 'border-slate-800'}`}
                      placeholder="E.g. Hideo Kojima"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 italic">
                      Return Signal (Email)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full bg-slate-950 border p-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 ${errors.email ? 'border-red-500' : 'border-slate-800'}`}
                      placeholder="hideo@kojimaproductions.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 italic">
                    Objective (Subject)
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="New Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 italic">
                    Briefing (Message)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`w-full bg-slate-950 border p-4 text-white focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-700 ${errors.message ? 'border-red-500' : 'border-slate-800'}`}
                    placeholder="Tell me about your vision..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] italic flex items-center justify-center group shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-colors"
                >
                  Send Transmission
                  <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
