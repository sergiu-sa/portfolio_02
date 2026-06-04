// Hand-drawn marker scribbles to graffiti over photos

const VARIANTS = {
  crown: {
    viewBox: '0 0 120 72',
    paths: [
      'M10 62 L27 22 L45 47 L60 16 L75 47 L93 22 L110 62',
      'M13 59 L28 27 L46 49 L60 21 L74 49 L92 27 L107 59',
      'M13 62 Q 60 74 107 62',
    ],
  },
  circle: {
    viewBox: '0 0 120 120',
    paths: [
      'M62 12 C 104 14, 114 54, 100 84 C 86 114, 38 118, 20 90 C 4 66, 18 22, 62 12',
      'M58 18 C 96 18, 110 56, 96 84 C 82 110, 40 112, 26 88',
    ],
  },
};

export default function Scribble({ variant = 'crown', className = '', style }) {
  const v = VARIANTS[variant] || VARIANTS.crown;
  return (
    <svg
      className={`scribble ${className}`}
      viewBox={v.viewBox}
      style={style}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {v.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          opacity={
            i === 1 && (variant === 'crown' || variant === 'circle') ? 0.65 : 1
          }
        />
      ))}
    </svg>
  );
}
