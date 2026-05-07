// Floating 3-D-ish geometric shapes — CSS animated, pointer-events-none
// Inspired by the NEONVOID hero background aesthetic

const fill  = (h: number, l: number, a: number) => `hsla(${h},65%,${l}%,${a})`;
const stroke = (h: number) => `hsla(${h},75%,70%,0.45)`;

// ── Isometric cube SVG (3 visible faces) ─────────────────────────────────────
const Cube = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
    {/* top face — lightest */}
    <path d="M50,10 L90,30 L50,50 L10,30 Z"
      fill={fill(hue,22,0.80)} stroke={stroke(hue)} strokeWidth="0.7" />
    {/* left face — medium */}
    <path d="M10,30 L50,50 L50,90 L10,70 Z"
      fill={fill(hue,16,0.70)} stroke={stroke(hue)} strokeWidth="0.7" />
    {/* right face — darkest */}
    <path d="M90,30 L50,50 L50,90 L90,70 Z"
      fill={fill(hue,12,0.60)} stroke={stroke(hue)} strokeWidth="0.7" />
  </svg>
);

// ── Sphere ────────────────────────────────────────────────────────────────────
const Sphere = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%' }}>
    <defs>
      <radialGradient id={`rg${hue}`} cx="38%" cy="35%" r="60%">
        <stop offset="0%"   stopColor={fill(hue,30,0.85)} />
        <stop offset="100%" stopColor={fill(hue,10,0.60)} />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="44"
      fill={`url(#rg${hue})`} stroke={stroke(hue)} strokeWidth="0.7" />
    {/* subtle highlight arc */}
    <ellipse cx="38" cy="36" rx="14" ry="8"
      fill={fill(hue,70,0.18)} transform="rotate(-20,38,36)" />
  </svg>
);

// ── Diamond (octahedron projection) ──────────────────────────────────────────
const Diamond = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
    {/* upper half */}
    <polygon points="50,5 95,50 50,50"
      fill={fill(hue,24,0.80)} stroke={stroke(hue)} strokeWidth="0.7" />
    <polygon points="50,5 5,50 50,50"
      fill={fill(hue,20,0.70)} stroke={stroke(hue)} strokeWidth="0.7" />
    {/* lower half */}
    <polygon points="5,50 50,95 50,50"
      fill={fill(hue,14,0.65)} stroke={stroke(hue)} strokeWidth="0.7" />
    <polygon points="95,50 50,95 50,50"
      fill={fill(hue,10,0.55)} stroke={stroke(hue)} strokeWidth="0.7" />
  </svg>
);

// ── Triangle / Pyramid ────────────────────────────────────────────────────────
const Triangle = ({ hue }: { hue: number }) => (
  <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
    {/* main face */}
    <polygon points="50,5 95,90 5,90"
      fill={fill(hue,18,0.75)} stroke={stroke(hue)} strokeWidth="0.8" />
    {/* inner edge highlight */}
    <polygon points="50,22 80,80 20,80"
      fill="none" stroke={stroke(hue)} strokeWidth="0.5" opacity="0.4" />
  </svg>
);

// ── Shape data ────────────────────────────────────────────────────────────────
const SHAPES = [
  // Cubes
  { C: Cube,     x:  7, y: 17, size: 58, rot: false, fd: 11, rd: 0,    dl: 0   },
  { C: Cube,     x: 83, y: 26, size: 44, rot: false, fd: 14, rd: 0,    dl: 3.2 },
  { C: Cube,     x: 76, y: 66, size: 52, rot: false, fd: 17, rd: 0,    dl: 7.1 },
  { C: Cube,     x: 16, y: 75, size: 38, rot: false, fd: 10, rd: 0,    dl: 9.4 },
  // Spheres
  { C: Sphere,   x: 29, y:  9, size: 50, rot: false, fd:  8, rd: 0,    dl: 2.1 },
  { C: Sphere,   x: 89, y: 74, size: 60, rot: false, fd: 13, rd: 0,    dl: 5.8 },
  { C: Sphere,   x:  4, y: 56, size: 42, rot: false, fd:  9, rd: 0,    dl: 8.3 },
  // Diamonds — slowly rotate
  { C: Diamond,  x: 53, y:  6, size: 42, rot: true,  fd:  9, rd: 22,   dl: 1.4 },
  { C: Diamond,  x: 13, y: 43, size: 34, rot: true,  fd: 12, rd: 28,   dl:10.2 },
  { C: Diamond,  x: 64, y: 88, size: 46, rot: true,  fd: 10, rd: 18,   dl: 4.7 },
  // Triangles — slowly rotate
  { C: Triangle, x: 43, y: 15, size: 50, rot: true,  fd: 12, rd: 20,   dl: 2.8 },
  { C: Triangle, x: 92, y: 46, size: 40, rot: true,  fd:  9, rd: 26,   dl: 7.6 },
  { C: Triangle, x: 36, y: 90, size: 44, rot: true,  fd: 11, rd: 24,   dl: 5.3 },
] as const;

// Hue palette — indigo/violet range with an accent
const HUES = [240, 255, 225, 270, 245, 260, 230, 330, 250, 220, 235, 265, 248];

export default function Shapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {SHAPES.map(({ C: Shape, x, y, size, rot, fd, rd, dl }, i) => {
        const hue = HUES[i % HUES.length];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top:  `${y}%`,
              width:  size,
              height: size,
              opacity: 0.9,
              animation: `shapeFloat ${fd}s ${dl}s ease-in-out infinite`,
              filter: `drop-shadow(0 0 6px hsla(${hue},70%,60%,0.25))`,
            }}
          >
            {rot ? (
              // Wrapper that spins
              <div style={{
                width: '100%', height: '100%',
                animation: `shapeRotate ${rd}s ${dl}s linear infinite`,
              }}>
                <Shape hue={hue} />
              </div>
            ) : (
              <Shape hue={hue} />
            )}
          </div>
        );
      })}
    </div>
  );
}
