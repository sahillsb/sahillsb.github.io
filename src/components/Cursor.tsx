import { useEffect, useRef } from 'react';

const TAGS = new Set(['a', 'button', 'input', 'textarea', 'select']);

const isPointer = (el: Element | null, depth = 0): boolean => {
  if (!el || depth > 5 || el === document.body) return false;
  if (TAGS.has(el.tagName.toLowerCase()))                       return true;
  if (el.getAttribute('role') === 'button')                     return true;
  if ((el as HTMLElement).classList?.contains('cursor-pointer')) return true;
  return isPointer(el.parentElement, depth + 1);
};

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -300, y: -300 });
  const ringPos = useRef({ x: -300, y: -300 });
  const ringScl = useRef(1);
  const hovRef  = useRef(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      hovRef.current = isPointer(el);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let raf: number;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.10);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.10);
      ringScl.current   = lerp(ringScl.current, hovRef.current ? 1.7 : 1, 0.14);

      if (ringRef.current) {
        const { x, y } = ringPos.current;
        ringRef.current.style.transform = `translate(${x - 16}px,${y - 16}px) scale(${ringScl.current})`;
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
      {/* Inner dot — white + difference blend → inverts whatever is beneath */}
      <div
        ref={dotRef}
        style={{
          position:        'fixed',
          top: 0, left: 0,
          width: 10, height: 10,
          borderRadius:    '50%',
          backgroundColor: 'white',
          mixBlendMode:    'difference',
          pointerEvents:   'none',
          zIndex:          10001,
          willChange:      'transform',
        }}
      />
      {/* Outer ring — thick, white + difference blend */}
      <div
        ref={ringRef}
        style={{
          position:     'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          border:       '3.5px solid white',
          mixBlendMode: 'difference',
          pointerEvents:'none',
          zIndex:       10000,
          willChange:   'transform',
        }}
      />
    </>
  );
}
