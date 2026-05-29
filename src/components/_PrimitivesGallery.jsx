// TEMPORARY — Phase 03 primitives preview. 
// before real pages consume them in Phases 04–06.
import { Stamp, Redacted, Annotation, Barcode } from './primitives.jsx'
import Scribble from './Scribble.jsx'
import Seal from './Seal.jsx'
import SkullEmblem from './SkullEmblem.jsx'
import { Motto } from './Motto.jsx'
import Plate from './Plate.jsx'
import { evidence, subjectPhoto } from '../data.js'

const cell = { border: '1px solid var(--hair-2)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }
const label = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)' }

export default function PrimitivesGallery() {
  return (
    <section className="sheet" aria-label="Primitives preview (temporary)">
      <p className="kicker">FED // PRIMITIVES TOOLKIT — TEMP PREVIEW</p>
      <hr className="rule" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginTop: '18px' }}>
        <div style={cell}>
          <span style={label}>Stamp</span>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Stamp>DECLASSIFIED</Stamp>
            <Stamp solid rotate={4}>RECEIVED</Stamp>
          </div>
        </div>

        <div style={cell}>
          <span style={label}>Redacted (hover / click)</span>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px' }}>
            Subject is <Redacted>SERGIU D. KANE</Redacted> — last seen in <Redacted>OSLO, NO</Redacted>.
          </p>
        </div>

        <div style={cell}>
          <span style={label}>Annotation</span>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px' }}>
            Inspect this <Annotation>look here!</Annotation>
          </p>
        </div>

        <div style={cell}>
          <span style={label}>Barcode (scannable · Code128)</span>
          <Barcode value="FED-S023" />
        </div>

        <div style={cell}>
          <span style={label}>Scribble (over photo)</span>
          <div style={{ position: 'relative', width: '160px', aspectRatio: '1', overflow: 'hidden', border: '1px solid var(--ink)' }}>
            <img src={subjectPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
            <Scribble variant="crown" style={{ position: 'absolute', top: '-10px', left: '30%', width: '90px' }} />
            <Scribble variant="circle" style={{ position: 'absolute', inset: '10% 20% 20% 20%', width: 'auto', height: '80%' }} />
          </div>
        </div>

        <div style={cell}>
          <span style={label}>Seal (hover-magnify)</span>
          <Seal />
        </div>

        <div style={cell}>
          <span style={label}>SkullEmblem</span>
          <SkullEmblem />
        </div>

        <div style={cell}>
          <span style={label}>Motto</span>
          <Motto />
          <Motto short />
        </div>
      </div>

      <div style={{ marginTop: '22px' }}>
        <span style={label}>Plate (annotated surveillance)</span>
        <div style={{ marginTop: '10px' }}>
          <Plate item={evidence[0]} />
        </div>
      </div>
    </section>
  )
}
