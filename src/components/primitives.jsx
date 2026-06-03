import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';

export function Stamp({
  children,
  rotate = -7,
  solid = false,
  className = '',
}) {
  return (
    <span
      className={`stamp ${solid ? 'solid' : ''} ${className}`}
      style={{ '--rot': `${rotate}deg` }}
    >
      {children}
    </span>
  );
}

/* Declassification system */
const RedactionContext = createContext(null);

export function DeclassifyProvider({ children }) {
  const [map, setMap] = useState({}); // id -> revealed?

  const register = useCallback((id) => {
    setMap((m) => (id in m ? m : { ...m, [id]: false }));
  }, []);
  const unregister = useCallback((id) => {
    setMap((m) => {
      if (!(id in m)) return m;
      const next = { ...m };
      delete next[id];
      return next;
    });
  }, []);
  const setRevealed = useCallback((id, v) => {
    setMap((m) => ({ ...m, [id]: typeof v === 'function' ? v(m[id]) : v }));
  }, []);
  const revealAll = useCallback(() => {
    setMap((m) => Object.fromEntries(Object.keys(m).map((k) => [k, true])));
  }, []);
  const redactAll = useCallback(() => {
    setMap((m) => Object.fromEntries(Object.keys(m).map((k) => [k, false])));
  }, []);

  const ids = Object.keys(map);
  const total = ids.length;
  const revealed = ids.filter((k) => map[k]).length;

  const value = {
    map,
    register,
    unregister,
    setRevealed,
    revealAll,
    redactAll,
    total,
    revealed,
    allRevealed: total > 0 && revealed === total,
  };

  return (
    <RedactionContext.Provider value={value}>
      {children}
    </RedactionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- shared declassification hook lives with its primitives
export function useDeclassify() {
  return useContext(RedactionContext);
}

// Shared reveal state — context-backed inside a provider, local otherwise.
// Depend on the individual (stable) callbacks, not the whole context value:
// it's recreated on every state change, so keying the effect on it would
// churn registrations and reset reveal state on every DECLASSIFY ALL.
function useRedactionState(id) {
  const ctx = useContext(RedactionContext);
  const reactId = useId();
  const key = id || reactId;
  const [local, setLocal] = useState(false);

  const register = ctx?.register;
  const unregister = ctx?.unregister;
  const setRevealed = ctx?.setRevealed;

  useEffect(() => {
    if (!register || !unregister) return;
    register(key);
    return () => unregister(key);
  }, [register, unregister, key]);

  const revealed = ctx ? !!ctx.map[key] : local;
  const toggle = useCallback(() => {
    if (setRevealed) setRevealed(key, (v) => !v);
    else setLocal((v) => !v);
  }, [setRevealed, key]);

  return [revealed, toggle];
}

/* Roughens crisp bars into hand-painted marker strokes.
   Mount once in the app root; harmless to omit (bars stay crisp). */
export function MarkerFilter() {
  return (
    <svg
      className="marker-defs"
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
    >
      <filter id="marker-rough" x="-12%" y="-40%" width="124%" height="180%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.013 0.21"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="7"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

/* Inline redaction over text. variant: 'bar' wipes off (default), 'strike' stays legible. */
export function Redacted({ children, variant = 'bar', id }) {
  const [revealed, toggle] = useRedactionState(id);
  return (
    <span
      className={`redacted redacted--${variant} ${revealed ? 'is-revealed' : ''}`}
      data-redacted
      data-inspect
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      title={
        revealed
          ? 'Classified material — click to redact'
          : 'Classified — click to declassify'
      }
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <span className="redacted__text">{children}</span>
      <span className="redacted__bar" aria-hidden="true" />
    </span>
  );
}

/* Field value that strikes one word through in red (legible) when `strike` is set. */
export function FieldValue({ value, strike }) {
  if (!strike || !value.includes(strike)) return value;
  const [before, after] = value.split(strike);
  return (
    <>
      {before}
      <Redacted variant="strike">{strike}</Redacted>
      {after}
    </>
  );
}

/* Block-level marker bar for images/portraits; position via style/className. */
export function RedactBar({ id, label = '', className = '', style }) {
  const [revealed, toggle] = useRedactionState(id);
  return (
    <button
      type="button"
      className={`redact-bar ${revealed ? 'is-revealed' : ''} ${className}`}
      style={style}
      data-inspect
      aria-pressed={revealed}
      aria-label={revealed ? 'Re-redact' : 'Declassify'}
      title={revealed ? 'Click to redact' : 'Click to declassify'}
      onClick={toggle}
    >
      <span className="redact-bar__fill" aria-hidden="true">
        {label && <span className="redact-bar__label">{label}</span>}
      </span>
    </button>
  );
}

export function DeclassifyControl({ className = '' }) {
  const ctx = useDeclassify();
  if (!ctx || ctx.total === 0) return null;
  const { revealed, total, allRevealed, revealAll, redactAll } = ctx;
  return (
    <div
      className={`declassify-bar ${allRevealed ? 'is-clear' : ''} ${className}`}
    >
      <span className="declassify-bar__count" role="status" aria-live="polite">
        CLEARANCE · {String(revealed).padStart(2, '0')}/
        {String(total).padStart(2, '0')} DECLASSIFIED
      </span>
      <span className="declassify-bar__meter" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i < revealed ? 'on' : ''} />
        ))}
      </span>
      <button
        type="button"
        className="declassify-bar__btn"
        data-inspect
        onClick={allRevealed ? redactAll : revealAll}
      >
        {allRevealed ? 'RE-CLASSIFY' : 'DECLASSIFY ALL'}
      </button>
    </div>
  );
}

export function DisclosureStamp({ rotate = 6 }) {
  const ctx = useDeclassify();
  if (!ctx || !ctx.allRevealed) return null;
  return (
    <span
      className="full-disclosure"
      style={{ '--rot': `${rotate}deg` }}
      aria-hidden="true"
    >
      FULL DISCLOSURE
    </span>
  );
}

export function Annotation({ children, className = '', style }) {
  return (
    <span
      className={`annotation ${className}`}
      style={style}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

// Code128-B — a real, scannable linear barcode; `value` resolves on a phone camera.
// Self-contained: the 107-pattern table + checksum live here.
const CODE128B = [
  '212222',
  '222122',
  '222221',
  '121223',
  '121322',
  '131222',
  '122213',
  '122312',
  '132212',
  '221213',
  '221312',
  '231212',
  '112232',
  '122132',
  '122231',
  '113222',
  '123122',
  '123221',
  '223211',
  '221132',
  '221231',
  '213212',
  '223112',
  '312131',
  '311222',
  '321122',
  '321221',
  '312212',
  '322112',
  '322211',
  '212123',
  '212321',
  '232121',
  '111323',
  '131123',
  '131321',
  '112313',
  '132113',
  '132311',
  '211313',
  '231113',
  '231311',
  '112133',
  '112331',
  '132131',
  '113123',
  '113321',
  '133121',
  '313121',
  '211331',
  '231131',
  '213113',
  '213311',
  '213131',
  '311123',
  '311321',
  '331121',
  '312113',
  '312311',
  '332111',
  '314111',
  '221411',
  '431111',
  '111224',
  '111422',
  '121124',
  '121421',
  '141122',
  '141221',
  '112214',
  '112412',
  '122114',
  '122411',
  '142112',
  '142211',
  '241211',
  '221114',
  '413111',
  '241112',
  '134111',
  '111242',
  '121142',
  '121241',
  '114212',
  '124112',
  '124211',
  '411212',
  '421112',
  '421211',
  '212141',
  '214121',
  '412121',
  '111143',
  '111341',
  '131141',
  '114113',
  '114311',
  '411113',
  '411311',
  '113141',
  '114131',
  '311141',
  '411131',
  '211412',
  '211214',
  '211232',
  '2331112',
];
const START_B = 104;
const STOP = 106;

function encode128(value) {
  const codes = [];
  for (const ch of value) {
    const v = ch.charCodeAt(0) - 32;
    codes.push(v >= 0 && v < 95 ? v : 0); // out-of-range → space
  }
  let sum = START_B;
  codes.forEach((v, i) => {
    sum += v * (i + 1);
  });
  const seq = [START_B, ...codes, sum % 103, STOP];

  const bars = [];
  let x = 0;
  for (const code of seq) {
    const pattern = CODE128B[code];
    for (let i = 0; i < pattern.length; i++) {
      const w = Number(pattern[i]);
      if (i % 2 === 0) bars.push({ x, w }); // even index = bar (ink), odd = space
      x += w;
    }
  }
  return { bars, modules: x };
}

export function Barcode({
  value = 'FED-S023',
  height = 40,
  unit = 2,
  quiet = 10,
  showText = true,
}) {
  const { bars, modules } = encode128(value);
  const total = modules + quiet * 2;
  return (
    <div
      className="barcode"
      role="img"
      aria-label={`Barcode encoding ${value}`}
    >
      <svg
        className="barcode__bars"
        width={total * unit}
        height={height}
        viewBox={`0 0 ${total} ${height}`}
        preserveAspectRatio="none"
      >
        <rect width={total} height={height} fill="var(--paper)" />
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x + quiet}
            y="0"
            width={b.w}
            height={height}
            fill="var(--ink)"
          />
        ))}
      </svg>
      {showText && <span className="barcode-label">{value}</span>}
    </div>
  );
}
