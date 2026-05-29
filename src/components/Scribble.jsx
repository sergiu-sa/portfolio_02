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
  halo: {
    viewBox: '0 0 130 54',
    paths: [
      'M18 30 C 44 10, 86 10, 112 30 C 86 48, 44 48, 18 30 Z',
      'M24 30 C 46 16, 84 16, 106 30',
    ],
  },
  circle: {
    viewBox: '0 0 120 120',
    paths: [
      'M62 12 C 104 14, 114 54, 100 84 C 86 114, 38 118, 20 90 C 4 66, 18 22, 62 12',
      'M58 18 C 96 18, 110 56, 96 84 C 82 110, 40 112, 26 88',
    ],
  },
  star: {
    viewBox: '0 0 100 100',
    paths: ['M50 8 L62 38 L94 39 L68 58 L78 90 L50 70 L22 90 L32 58 L6 39 L38 38 Z'],
  },
  horns: {
    viewBox: '0 0 130 70',
    paths: [
      'M40 64 C 24 40, 26 16, 46 8 C 34 26, 40 46, 52 60',
      'M90 64 C 106 40, 104 16, 84 8 C 96 26, 90 46, 78 60',
    ],
  },
  eyesx: {
    viewBox: '0 0 130 54',
    paths: ['M22 14 L46 40', 'M46 14 L22 40', 'M84 14 L108 40', 'M108 14 L84 40'],
  },
  arrow: {
    viewBox: '0 0 130 80',
    paths: ['M12 22 C 44 64, 76 64, 112 40', 'M112 40 L96 30', 'M112 40 L98 54'],
  },
  squiggle: {
    viewBox: '0 0 130 26',
    paths: ['M8 14 q 14 -12 28 0 t 28 0 t 28 0 t 28 0'],
  },
  skull: {
    viewBox: '0 0 100 124',
    paths: [
      'M24 44 C 18 16, 82 16, 76 44 C 79 68, 65 76, 63 88 L37 88 C 35 76, 21 68, 24 44 Z',
      'M30 50 a 8 7 0 1 0 0.1 0',
      'M62 50 a 8 7 0 1 0 0.1 0',
      'M50 60 L43 74 L57 74 Z',
      'M40 88 V100 M50 88 V102 M60 88 V100',
      'M30 24 L40 8 L50 20 L60 6 L70 20 L80 8 L86 26',
    ],
  },
}

export default function Scribble({ variant = 'crown', className = '', style }) {
  const v = VARIANTS[variant] || VARIANTS.crown
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
        <path key={i} d={d} opacity={i === 1 && (variant === 'crown' || variant === 'halo' || variant === 'circle') ? 0.65 : 1} />
      ))}
    </svg>
  )
}
