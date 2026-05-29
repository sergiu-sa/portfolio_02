// Seal of the FED 
const CX = 120
const CY = 120
const TAU = Math.PI * 2

function star(cx, cy, outer, inner, points = 5) {
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = -Math.PI / 2 + (i * Math.PI) / points
    d += (i === 0 ? 'M' : 'L') + (cx + Math.cos(a) * r).toFixed(2) + ',' + (cy + Math.sin(a) * r).toFixed(2)
  }
  return d + 'Z'
}

const BEADS = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * TAU
  return { x: CX + Math.cos(a) * 87, y: CY + Math.sin(a) * 87 }
})

export default function Seal({ size = 92 }) {
  return (
    <svg
      className="seal"
      width={size}
      height={size}
      viewBox="0 0 240 240"
      role="img"
      aria-label="Seal of the Federal Bureau of Front-End Development — In Code We Trust"
      data-inspect
    >
      <defs>
        <path id="seal-top" d="M 20,120 A 100,100 0 0 1 220,120" />
        <path id="seal-bot" d="M 14,120 A 106,106 0 0 0 226,120" />
      </defs>

      {/* paper disc + twin rim */}
      <circle cx="120" cy="120" r="116" fill="var(--paper)" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="120" cy="120" r="110" fill="none" stroke="currentColor" strokeWidth="1" />

      {/* ring text */}
      <text className="seal__text" fontSize="9" letterSpacing="0.5" textAnchor="middle">
        <textPath href="#seal-top" startOffset="50%">FEDERAL BUREAU OF FRONT-END DEVELOPMENT</textPath>
      </text>
      <text className="seal__text" fontSize="9.4" letterSpacing="1.4" textAnchor="middle">
        <textPath href="#seal-bot" startOffset="50%">IN CODE WE TRUST</textPath>
      </text>

      {/* separators at 3 & 9 o'clock */}
      <g fill="currentColor">
        <rect x="15" y="116" width="8" height="8" transform="rotate(45 19 120)" />
        <rect x="217" y="116" width="8" height="8" transform="rotate(45 221 120)" />
      </g>

      {/* inner frame + beaded ring */}
      <circle cx="120" cy="120" r="92" fill="none" stroke="currentColor" strokeWidth="1" />
      <g fill="currentColor">
        {BEADS.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="1" />
        ))}
      </g>
      <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1" />

      {/* central device: scarlet star, the </> charge, FED */}
      <path d={star(120, 83, 9, 3.6)} fill="var(--red)" />
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M106,106 L95,121 L106,136" />
        <path d="M134,106 L145,121 L134,136" />
        <path d="M124,103 L116,139" />
      </g>
      <text
        x="120"
        y="170"
        fontSize="24"
        letterSpacing="1"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        FED
      </text>
    </svg>
  )
}
