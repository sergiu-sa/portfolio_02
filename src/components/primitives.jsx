import { useState } from 'react'

export function Stamp({ children, rotate = -7, solid = false, className = '' }) {
  return (
    <span
      className={`stamp ${solid ? 'solid' : ''} ${className}`}
      style={{ '--rot': `${rotate}deg` }}
    >
      {children}
    </span>
  )
}

export function Redacted({ children }) {
  const [revealed, setRevealed] = useState(false)
  const toggle = () => setRevealed((v) => !v)
  return (
    <span
      className={`redacted ${revealed ? 'is-revealed' : ''}`}
      data-redacted
      data-inspect
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      title={revealed ? 'Classified material — click to redact' : 'Classified — click to declassify'}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
    >
      <span className="redacted__text">{children}</span>
      <span className="redacted__bar" aria-hidden="true" />
    </span>
  )
}

export function Annotation({ children, className = '', style }) {
  return (
    <span className={`annotation ${className}`} style={style} aria-hidden="true">
      {children}
    </span>
  )
}

// Code128-B 
const CODE128B = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141',
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112',
]
const START_B = 104
const STOP = 106

function encode128(value) {
  const codes = []
  for (const ch of value) {
    const v = ch.charCodeAt(0) - 32
    codes.push(v >= 0 && v < 95 ? v : 0)
  }
  let sum = START_B
  codes.forEach((v, i) => { sum += v * (i + 1) })
  const seq = [START_B, ...codes, sum % 103, STOP]

  const bars = []
  let x = 0
  for (const code of seq) {
    const pattern = CODE128B[code]
    for (let i = 0; i < pattern.length; i++) {
      const w = Number(pattern[i])
      if (i % 2 === 0) bars.push({ x, w })
      x += w
    }
  }
  return { bars, modules: x }
}

export function Barcode({ value = 'FED-S023', height = 40, unit = 2, quiet = 10, showText = true }) {
  const { bars, modules } = encode128(value)
  const total = modules + quiet * 2
  return (
    <div className="barcode" role="img" aria-label={`Barcode encoding ${value}`}>
      <svg
        className="barcode__bars"
        width={total * unit}
        height={height}
        viewBox={`0 0 ${total} ${height}`}
        preserveAspectRatio="none"
      >
        <rect width={total} height={height} fill="var(--paper)" />
        {bars.map((b, i) => (
          <rect key={i} x={b.x + quiet} y="0" width={b.w} height={height} fill="var(--ink)" />
        ))}
      </svg>
      {showText && <span className="barcode-label">{value}</span>}
    </div>
  )
}
