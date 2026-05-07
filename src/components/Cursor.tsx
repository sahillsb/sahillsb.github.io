import { useEffect, useRef, useState } from 'react';

const TAGS = new Set(['a', 'button', 'input', 'textarea', 'select']);

const isPointer = (el: Element | null, depth = 0): boolean => {
  if (!el || depth > 5 || el === document.body) return false;
  if (TAGS.has(el.tagName.toLowerCase()))                  return true;
  if (el.getAttribute('role') === 'button')                return true;
  if ((el as HTMLElement).classList?.contains('cursor-pointer')) return true;
  return isPointer(el.parentElement, depth + 1);
};

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const mouse    = useRef({ x: -300, y: -300 });
  const ringPos  = useRef({ x: -300, y: -300 });
  const ringScl  = useRef(1);
  const hovRef   = useRef(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    // Only activate on pointer devices (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly via direct style mutation (no React re-render)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      }

      // Hover detection
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const h  = isPointer(el);
      if (h !== hovRef.current) {
        hovRef.current = h;
        setHov(h);
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf: number;
    const tick = () => {
      // Lag the ring position
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.10);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.10);
      // Lag the ring scale
      ringScl.current   = lerp(ringScl.current, hovRef.current ? 1.65 : 1, 0.14);

      if (ringRef.current) {
        const { x, y } = ringPos.current;
        ringRef.current.style.transform =
          `translate(${x - 18}px,${y - 18}px) scale(${ringScl.current})`;
        ringRef.current.style.borderColor = hovRef.current
          ? 'rgba(165,180,252,0.75)'
          : 'rgba(99,102,241,0.45)';
      }

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
    <>
      {/* Inner dot — tracks exactly */}
      <div
        ref={dotRef}
        style={{
          position:        'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius:    '50%',
          backgroundColor: hov ? '#a5b4fc' : '#6366f1',
          pointerEvents:   'none',
          zIndex:          10001,
          transition:      'background-color .15s',
          willChange:      'transform',
        }}
      />
      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        style={{
          position:      'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius:  '50%',
          border:        '1.5px solid rgba(99,102,241,0.45)',
          pointerEvents: 'none',
          zIndex:        10000,
          willChange:    'transform',
        }}
      />
    </>
  );
}
