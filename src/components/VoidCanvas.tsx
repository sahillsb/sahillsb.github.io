import { useEffect, useRef } from 'react';

interface P { angle: number; radius: number; speed: number; size: number; hue: number }

const N   = 120;   // particle count
const MAX = 268;   // max orbit radius
const MIN = 155;   // min spawn radius

const spawn = (): P => ({
  angle:  Math.random() * Math.PI * 2,
  radius: MIN + Math.random() * (MAX - MIN),
  speed:  0.004 + Math.random() * 0.009,
  size:   0.6 + Math.random() * 1.5,
  hue:    215 + Math.random() * 120,   // blue → purple
});

export default function VoidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv  = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const S = 600;
    cv.width = cv.height = S;
    const cx = S / 2, cy = S / 2;

    const pts = Array.from({ length: N }, spawn);
    let raf: number;

    const frame = () => {
      ctx.clearRect(0, 0, S, S);

      // ── Black hole gradient ──────────────────────────────────────────────
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 148);
      g.addColorStop(0,    'rgba(0,0,0,1)');
      g.addColorStop(0.5,  'rgba(0,0,0,0.97)');
      g.addColorStop(0.72, 'rgba(8,3,22,0.68)');
      g.addColorStop(0.86, 'rgba(88,55,200,0.20)');
      g.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 148, 0, Math.PI * 2);
      ctx.fill();

      // ── Event horizon rings ──────────────────────────────────────────────
      const rings: [number, number, number][] = [
        [49, 0.45, 1.6],
        [57, 0.22, 1.0],
        [67, 0.10, 0.7],
      ];
      for (const [r, a, w] of rings) {
        ctx.strokeStyle = `rgba(99,102,241,${a})`;
        ctx.lineWidth   = w;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── Accretion disk (flat glow band) ──────────────────────────────────
      const disk = ctx.createLinearGradient(cx - 190, cy, cx + 190, cy);
      disk.addColorStop(0,    'rgba(139,92,246,0)');
      disk.addColorStop(0.3,  'rgba(139,92,246,0.05)');
      disk.addColorStop(0.5,  'rgba(167,85,247,0.14)');
      disk.addColorStop(0.7,  'rgba(139,92,246,0.05)');
      disk.addColorStop(1,    'rgba(139,92,246,0)');
      ctx.fillStyle = disk;
      ctx.fillRect(cx - 200, cy - 4, 400, 8);

      // ── Particles ────────────────────────────────────────────────────────
      for (const p of pts) {
        // Accelerate as they approach the void
        p.angle  += p.speed * (1 + ((MAX - p.radius) / MAX) * 2.2);
        p.radius -= 0.14 + (MAX - p.radius) * 0.00022;

        if (p.radius < 50) { Object.assign(p, spawn()); continue; }

        const opacity = Math.min(1, (p.radius - 50) / (MAX - 50)) * 0.88;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.3; // flat elliptical orbit

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},78%,72%,${opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        width:   'min(640px, 92vw)',
        height:  'min(640px, 92vw)',
        opacity: 0.62,
      }}
    />
  );
}
