import { motion } from 'framer-motion';
import { Gamepad2, Layers, Zap, Target } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Shipped Titles',   value: '4'  },
  { label: 'Studio Roles',     value: '2'  },
  { label: 'Platforms',        value: '3'  },
];

const interests = [
  { icon: <Gamepad2 size={14} />, text: 'Competitive multiplayer design & live ops' },
  { icon: <Layers size={14} />,   text: 'VR/XR spatial mechanics & immersion' },
  { icon: <Zap size={14} />,      text: 'Game economy & reward loop architecture' },
  { icon: <Target size={14} />,   text: 'Feel-first prototyping & rapid iteration' },
];

const About = () => {
  return (
    <section id="about" className="py-24 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm italic">Player Profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">
            About <span className="text-indigo-500">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-slate-200 text-lg leading-relaxed">
              I'm Sahil — a game designer from Pune with three years of experience building games that actually ship. My work spans competitive multiplayer FPS design, government-commissioned VR experiences, and experimental web3 gaming.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I believe in the feel-first principle: every mechanic should be satisfying before it's balanced, intuitive before it's deep. I spend as much time studying what makes great games great as I do designing them — from the Spelunky rope to the Dark Souls bonfire, design lives in the details.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Currently at Dot9 Games working on FAU-G Domination — handling weapon systems, level progression, balancing, and Playfab backend. When I'm not at the desk, I'm prototyping side projects that push my limits as a designer.
            </p>
          </motion.div>

          {/* Stats + interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-slate-950/60 border border-slate-800 p-5 rounded-sm hover:border-indigo-500/50 transition-colors"
                >
                  <p className="text-3xl font-black text-indigo-400 mb-1">{s.value}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Currently exploring */}
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">Currently Exploring</p>
              <div className="space-y-3">
                {interests.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors group"
                  >
                    <div className="w-7 h-7 bg-slate-800 border border-slate-700 rounded-sm flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
