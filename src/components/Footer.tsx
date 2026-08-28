import { Heart, Gamepad2 } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-900 text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center rounded-sm">
              <Gamepad2 className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-black italic tracking-tighter text-white uppercase">
              Sahil<span className="text-indigo-500">.GD</span>
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-[10px] font-black uppercase tracking-widest italic text-right">
            <div className="flex items-center">
              <span>Mission Complete</span>
              <Heart className="w-3 h-3 mx-2 text-indigo-500 fill-current" />
              <span>{year} Sahil Bapardekar</span>
            </div>
            <p className="text-slate-600">All Worlds Reserved.</p>
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
