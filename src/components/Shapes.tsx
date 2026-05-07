import { useEffect, useRef } from 'react';

// ── SVG shape primitives ──────────────────────────────────────────────────────
const f = (h: number, l: number, a: number) => `hsla(${h},65%,${l}%,${a})`;
const s = (h: number, a = 0.45)             => `hsla(${h},75%,70%,${a})`;

const Cube = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
    <path d="M50,10 L90,30 L50,50 L10,30 Z" fill={f(hue,22,0.82)} stroke={s(hue)} strokeWidth="0.8" />
    <path d="M10,30 L50,50 L50,90 L10,70 Z" fill={f(hue,16,0.70)} stroke={s(hue)} strokeWidth="0.8" />
    <path d="M90,30 L50,50 L50,90 L90,70 Z" fill={f(hue,12,0.60)} stroke={s(hue)} strokeWidth="0.8" />
  </svg>
);
const Sphere = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%' }}>
    <defs>
      <radialGradient id={`rg${hue}`} cx="38%" cy="35%" r="60%">
        <stop offset="0%"   stopColor={f(hue,30,0.85)} />
        <stop offset="100%" stopColor={f(hue,10,0.60)} />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="44" fill={`url(#rg${hue})`} stroke={s(hue)} strokeWidth="0.8" />
    <ellipse cx="38" cy="36" rx="14" ry="8" fill={f(hue,70,0.18)} transform="rotate(-20,38,36)" />
  </svg>
);
const Diamond = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
    <polygon points="50,5 95,50 50,50"  fill={f(hue,24,0.82)} stroke={s(hue)} strokeWidth="0.8" />
    <polygon points="50,5 5,50 50,50"   fill={f(hue,20,0.72)} stroke={s(hue)} strokeWidth="0.8" />
    <polygon points="5,50 50,95 50,50"  fill={f(hue,14,0.65)} stroke={s(hue)} strokeWidth="0.8" />
    <polygon points="95,50 50,95 50,50" fill={f(hue,10,0.55)} stroke={s(hue)} strokeWidth="0.8" />
  </svg>
);
const Triangle = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
    <polygon points="50,5 95,90 5,90" fill={f(hue,18,0.78)} stroke={s(hue)} strokeWidth="0.9" />
    <polygon points="50,22 80,80 20,80" fill="none" stroke={s(hue, 0.3)} strokeWidth="0.6" />
  </svg>
);

type ShapeComp = typeof Cube;

// ── Shape data — depth drives BOTH parallax strength AND perceived closeness ──
// Large size + high depth = close to screen (lots of movement)
// Small size + low depth = far from screen (barely moves)
const SHAPES: Array<{
  C: ShapeComp; x: number; y: number;
  size: number; depth: number;
  rot: boolean; fd: number; rd: number; dl: number; hue: number;
}> = [
  // ── CLOSE (large, heavy parallax) ─────────────────────────────────────────
  { C: Cube,     x:  6, y: 15, size: 88, depth: 1.20, rot:false, fd:12, rd: 0, dl: 0,   hue:245 },
  { C: Sphere,   x: 88, y: 72, size: 82, depth: 1.15, rot:false, fd:14, rd: 0, dl: 5.8, hue:260 },
  { C: Diamond,  x: 63, y: 86, size: 76, depth: 1.05, rot:true,  fd:11, rd:20, dl: 4.2, hue:225 },
  { C: Triangle, x: 42, y: 14, size: 70, depth: 0.95, rot:true,  fd:13, rd:24, dl: 2.6, hue:235 },

  // ── MID (medium size, moderate parallax) ──────────────────────────────────
  { C: Cube,     x: 82, y: 24, size: 55, depth: 0.62, rot:false, fd:16, rd: 0, dl: 3.1, hue:270 },
  { C: Sphere,   x: 28, y:  8, size: 58, depth: 0.58, rot:false, fd: 9, rd: 0, dl: 2.0, hue:255 },
  { C: Diamond,  x: 52, y:  5, size: 52, depth: 0.55, rot:true,  fd:10, rd:18, dl: 1.3, hue:330 },
  { C: Triangle, x: 91, y: 45, size: 48, depth: 0.50, rot:true,  fd:10, rd:22, dl: 7.4, hue:240 },

  // ── FAR (small, barely moves — background depth) ──────────────────────────
  { C: Cube,     x: 76, y: 65, size: 30, depth: 0.22, rot:false, fd:18, rd: 0, dl: 7.0, hue:250 },
  { C: Cube,     x: 15, y: 74, size: 26, depth: 0.18, rot:false, fd:11, rd: 0, dl: 9.2, hue:265 },
  { C: Sphere,   x:  3, y: 55, size: 34, depth: 0.20, rot:false, fd:10, rd: 0, dl: 8.1, hue:245 },
  { C: Diamond,  x: 12, y: 42, size: 28, depth: 0.16, rot:true,  fd:13, rd:30, dl:10.0, hue:235 },
  { C: Triangle, x: 35, y: 89, size: 32, depth: 0.24, rot:true,  fd:12, rd:26, dl: 5.1, hue:260 },
];

export default function Shapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };   // normalised -1 → +1
    const cur   = { x: 0, y: 0 };
    let t = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
    let raf: number;

    const tick = () => {
      t += 0.0006;
      // Always-on gentle idle drift on top of mouse parallax
      cur.x = lerp(cur.x, mouse.x + Math.sin(t)        * 0.12, 0.04);
      cur.y = lerp(cur.y, mouse.y + Math.cos(t * 0.78) * 0.09, 0.04);

      containerRef.current?.style.setProperty('--mx', cur.x.toString());
      containerRef.current?.style.setProperty('--my', cur.y.toString());

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
    // CSS vars --mx/--my set by RAF; each shape reads them with its own depth multiplier
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {SHAPES.map(({ C: Shape, x, y, size, depth, rot, fd, rd, dl, hue }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left:  `${x}%`,
            top:   `${y}%`,
            width:  size,
            height: size,
            // Parallax — each shape moves proportionally to its depth
            transform: `translate(calc(var(--mx,0) * ${(40 * depth).toFixed(1)}px), calc(var(--my,0) * ${(30 * depth).toFixed(1)}px))`,
          }}
        >
          {/* Float animation layer */}
          <div
            style={{
              width: '100%', height: '100%',
              animation: `shapeFloat ${fd}s ${dl}s ease-in-out infinite`,
              filter: `drop-shadow(0 0 ${Math.round(size * 0.08)}px hsla(${hue},70%,65%,0.22))`,
            }}
          >
            {rot ? (
              <div style={{ width:'100%', height:'100%', animation:`shapeRotate ${rd}s ${dl}s linear infinite` }}>
                <Shape hue={hue} />
              </div>
            ) : (
              <Shape hue={hue} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
