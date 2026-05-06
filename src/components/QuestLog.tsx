import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Flag, Star } from 'lucide-react';

const quests = [
  {
    type: 'Main Quest',
    title: 'Junior Game Designer @ Dot9 Games',
    date: 'Dec 2023 – Present',
    description: 'Working on FAUG Domination — handling level progression, game balancing, mechanics design, and research. Also responsible for weapon systems, weapon skins, and accessories pipeline, plus Playfab backend integration.',
    icon: <Star className="text-yellow-500" />,
    status: 'In Progress',
  },
  {
    type: 'Main Quest',
    title: 'Game Designer @ Acentria Technologies',
    date: 'Feb 2023 – Nov 2023',
    description: 'Designed and shipped a web-based MetaMask multiplayer game. Handled combat loop design, reward economy, and multiplayer session flow. Also conducted research for a separate web-based game concept.',
    icon: <CheckCircle2 className="text-green-500" />,
    status: 'Completed',
  },
  {
    type: 'Tutorial',
    title: 'B.Sc. in Gaming @ Ajeenkya D.Y. Patil College, Pune',
    date: 'Aug 2020 – Jun 2023',
    description: 'Studied the full game development pipeline — from pre-production and GDD writing through to updates and live ops. Graduated with a strong foundation in game design theory and practical Unity development.',
    icon: <Flag className="text-blue-500" />,
    status: 'Completed',
  },
  {
    type: 'Tutorial',
    title: 'Junior College (10+2) Computer Science @ D.Y. Patil College, Belapur',
    date: 'Aug 2018 – Mar 2020',
    description: 'Completed Science stream with Computer Science. Learned foundational programming concepts that laid the groundwork for a career in game development.',
    icon: <Circle className="text-slate-500" />,
    status: 'Completed',
  },
];

const QuestLog = () => {
  return (
    <section id="journey" className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm italic">Journal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white">
            Quest <span className="text-indigo-500">Log</span>
          </h2>
        </div>

        <div className="space-y-8 relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-800" />

          {quests.map((quest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-3 top-1 -translate-x-1/2 w-6 h-6 bg-slate-900 border-2 border-slate-700 rounded-full z-10 group-hover:border-indigo-500 transition-colors flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-700 group-hover:bg-indigo-500 rounded-full transition-colors" />
              </div>

              <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-sm group-hover:border-indigo-500/50 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded border border-slate-800 group-hover:scale-110 transition-transform shrink-0">
                      {quest.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic block">{quest.type}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{quest.title}</h3>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-slate-500">{quest.date}</span>
                    <div className={`mt-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm inline-block ${quest.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {quest.status}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  {quest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestLog;
