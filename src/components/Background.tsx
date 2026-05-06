// ── Deterministic star field — no Math.random, stable across renders ──────────
const STARS = Array.from({ length: 55 }, (_, i) => ({
  x:    (i * 19 + 7)  % 100,
  y:    (i * 23 + 13) % 100,
  size: (i % 4 === 0) ? 2 : 1,
  dur:  2.4 + (i % 6) * 0.55,
  del:  (i % 8) * 0.38,
}));

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
  </div>
);

export default Background;
