import { motion } from 'framer-motion';

// ── Deterministic star field (no Math.random — stable across renders) ─────────
const STARS = Array.from({ length: 55 }, (_, i) => ({
  x:    ((i * 19 + 7)  % 100),
  y:    ((i * 23 + 13) % 100),
  size: (i % 4 === 0) ? 2 : 1,
  dur:  2.4 + (i % 6) * 0.55,
  del:  (i % 8) * 0.38,
}));

// ── Shooting stars ────────────────────────────────────────────────────────────
const SHOOTERS = [
  { sx: '12%', sy:  '8%', dur: 2.2, del:  1.5, pause: 9  },
  { sx: '48%', sy:  '4%', dur: 1.9, del:  4.8, pause: 13 },
  { sx: '72%', sy: '12%', dur: 2.6, del:  7.5, pause: 10 },
  { sx: '28%', sy: '22%', dur: 2.0, del: 11.0, pause: 16 },
  { sx: '85%', sy:  '7%', dur: 2.4, del:  3.2, pause: 11 },
  { sx: '60%', sy: '18%', dur: 1.7, del:  8.0, pause: 14 },
];

const Background = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">

    {/* Slow drifting gradient blobs */}
    <div
      className="absolute top-[15%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/7 blur-[160px]"
      style={{ animation: 'drift 20s ease-in-out infinite' }}
    />
    <div
      className="absolute bottom-[10%] right-[8%] w-[500px] h-[500px] rounded-full bg-purple-600/7 blur-[140px]"
      style={{ animation: 'drift 26s ease-in-out infinite reverse', animationDelay: '6s' }}
    />
    <div
      className="absolute top-[55%] left-[55%] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]"
      style={{ animation: 'drift 17s ease-in-out infinite', animationDelay: '11s' }}
    />

    {/* Breathing stars */}
    {STARS.map((s, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          left:      `${s.x}%`,
          top:       `${s.y}%`,
          width:     `${s.size}px`,
          height:    `${s.size}px`,
          animation: `breathe ${s.dur}s ${s.del}s ease-in-out infinite alternate`,
        }}
      />
    ))}

    {/* Shooting stars */}
    {SHOOTERS.map((s, i) => (
      <motion.div
        key={i}
        style={{
          position:   'absolute',
          left:       s.sx,
          top:        s.sy,
          width:      '80px',
          height:     '1.5px',
          background: 'linear-gradient(90deg, transparent 0%, #a78bfa 45%, #fff 55%, transparent 100%)',
          rotate:     -28,
          opacity:    0,
        }}
        animate={{
          x:       [0, 380],
          y:       [0, 190],
          opacity: [0, 0, 0.9, 0.9, 0],
        }}
        transition={{
          duration:    s.dur,
          delay:       s.del,
          repeat:      Infinity,
          repeatDelay: s.pause,
          ease:        'linear',
          times:       [0, 0.04, 0.12, 0.88, 1],
        }}
      />
    ))}
  </div>
);

export default Background;
