import { useEffect, useRef } from 'react';

// ── Three depth layers — close stars move most with mouse, far ones least ─────
const L1 = Array.from({ length: 22 }, (_, i) => ({  // closest — biggest parallax
  x: (i * 41 + 9)  % 108 - 4,
  y: (i * 47 + 13) % 112 - 6,
  s: 2 + (i % 3 === 0 ? 1 : 0),
  d: 2.0 + (i % 5) * 0.5,
  dl: (i % 6) * 0.38,
}));
const L2 = Array.from({ length: 38 }, (_, i) => ({  // mid
  x: (i * 27 + 17) % 106 - 3,
  y: (i * 33 + 11) % 110 - 5,
  s: 1,
  d: 2.8 + (i % 6) * 0.35,
  dl: (i % 9) * 0.28,
}));
const L3 = Array.from({ length: 55 }, (_, i) => ({  // farthest — least parallax
  x: (i * 19 + 7)  % 100,
  y: (i * 23 + 13) % 100,
  s: 1,
  d: 3.6 + (i % 5) * 0.45,
  dl: (i % 11) * 0.22,
}));

const Background = () => {
  const l1  = useRef<HTMLDivElement>(null);
  const l2  = useRef<HTMLDivElement>(null);
  const l3  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mx = { x: 0.5, y: 0.5 };           // normalised mouse 0–1
    const cur = { x: 0, y: 0 };              // current smoothed offset (px)
    let t = 0;
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    const onMove = (e: MouseEvent) => {
      mx.x = e.clientX / window.innerWidth;
      mx.y = e.clientY / window.innerHeight;
    };

    let raf: number;
    const tick = () => {
      t += 0.0007;
      // Idle drift (always active — overlays on top of mouse parallax)
      const idleX = Math.sin(t)        * 7;
      const idleY = Math.cos(t * 0.71) * 5;

      const tX = (mx.x - 0.5) * 32 + idleX;
      const tY = (mx.y - 0.5) * 22 + idleY;

      cur.x = lerp(cur.x, tX, 0.04);
      cur.y = lerp(cur.y, tY, 0.04);

      if (l1.current) l1.current.style.transform = `translate(${cur.x * 1.5}px,${cur.y * 1.5}px)`;
      if (l2.current) l2.current.style.transform = `translate(${cur.x * 0.8}px,${cur.y * 0.8}px)`;
      if (l3.current) l3.current.style.transform = `translate(${cur.x * 0.3}px,${cur.y * 0.3}px)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">

      {/* Galaxy core — tilted elongated milky-way glow (pure CSS, no parallax) */}
      <div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 950, height: 380,
          background: 'radial-gradient(ellipse at center, rgba(67,56,202,0.13) 0%, rgba(67,56,202,0.05) 55%, transparent 75%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%) rotate(-18deg)',
          filter: 'blur(38px)',
        }}
      />
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600, height: 220,
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-40%, -60%) rotate(-22deg)',
          filter: 'blur(28px)',
        }}
      />

      {/* Slow drifting blobs */}
      <div className="absolute top-[14%] left-[8%]  w-[520px] h-[520px] rounded-full bg-indigo-700/7 blur-[150px]"
        style={{ animation: 'drift 22s ease-in-out infinite' }} />
      <div className="absolute bottom-[8%] right-[6%]  w-[460px] h-[460px] rounded-full bg-purple-700/7 blur-[130px]"
        style={{ animation: 'drift 28s ease-in-out infinite reverse', animationDelay: '8s' }} />
      <div className="absolute top-[55%] left-[60%] w-[360px] h-[360px] rounded-full bg-blue-700/5 blur-[110px]"
        style={{ animation: 'drift 18s ease-in-out infinite', animationDelay: '12s' }} />

      {/* ── Parallax star layers ── */}

      {/* L1 — close, moves most */}
      <div ref={l1} className="absolute will-change-transform" style={{ inset: '-30px' }}>
        {L1.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left:`${s.x}%`, top:`${s.y}%`, width:`${s.s}px`, height:`${s.s}px`,
              animation:`breathe ${s.d}s ${s.dl}s ease-in-out infinite alternate` }} />
        ))}
      </div>

      {/* L2 — mid */}
      <div ref={l2} className="absolute will-change-transform opacity-60" style={{ inset: '-30px' }}>
        {L2.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left:`${s.x}%`, top:`${s.y}%`, width:`${s.s}px`, height:`${s.s}px`,
              animation:`breathe ${s.d}s ${s.dl}s ease-in-out infinite alternate` }} />
        ))}
      </div>

      {/* L3 — far, moves least */}
      <div ref={l3} className="absolute will-change-transform opacity-35" style={{ inset: '-30px' }}>
        {L3.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left:`${s.x}%`, top:`${s.y}%`, width:`${s.s}px`, height:`${s.s}px`,
              animation:`breathe ${s.d}s ${s.dl}s ease-in-out infinite alternate` }} />
        ))}
      </div>
    </div>
  );
};

export default Background;
