// Climbing-hold shapes used as course nodes. Each is an irregular blob so the route looks hand-set.
const SHAPES = [
  "M50 6c18 0 38 10 42 28s-4 40-20 50-40 12-54 0S0 52 4 34 32 6 50 6Z",
  "M46 4c20-2 42 8 48 26 6 19-6 42-24 52S28 92 14 78 0 46 8 28 26 6 46 4Z",
  "M54 5c17 3 34 16 38 33 4 18-8 38-25 47s-40 8-52-6S2 46 9 29 37 2 54 5Z",
  "M50 8c22-1 40 12 42 32s-10 42-30 48-44-2-54-18S6 36 18 22 36 9 50 8Z",
];

export default function Hold({ variant = 0, size = 72 }: { variant?: number; size?: number }) {
  const d = SHAPES[variant % SHAPES.length];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden className="hold-shape">
      <path d={d} className="hold-ledge" transform="translate(0 6)" />
      <path d={d} className="hold-face" />
      <ellipse cx="38" cy="30" rx="14" ry="7" className="hold-shine" transform="rotate(-18 38 30)" />
      <circle cx="50" cy="50" r="6" className="hold-bolt" />
    </svg>
  );
}
