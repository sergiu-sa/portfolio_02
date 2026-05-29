import { Barcode } from './primitives.jsx'
import Scribble from './Scribble.jsx'
import SkullEmblem from './SkullEmblem.jsx'
import { idPhoto } from '../data.js'

function Field({ k, v, big }) {
  return (
    <div className={`agent-id__row ${big ? 'big' : ''}`}>
      <span className="k">{k}</span>
      <span className="v">{v}</span>
    </div>
  )
}

export default function AgentId() {
  return (
    <div className="agent-id">
      <span className="clip" aria-hidden="true" />
      <div className="hd">
        <span>PASS CARD</span>
        <span>EXCL. / FED</span>
      </div>

      <div className="agent-id__main">
        <div className="agent-id__photo photo">
          <div className="photo__inner">
            <img src={idPhoto} alt="" aria-hidden="true" />
          </div>
          <Scribble variant="crown" className="agent-id__crown" />
        </div>

        <div className="agent-id__data">
          <Field k="AGENT" v="S023" big />
          <Field k="ALIAS" v="“oltenkS”" />
          <Field k="ID" v="POR2_AUG24FT" />
          <Field k="STATION" v="OSLO, NO" />
          <Field k="CLEARANCE" v="FED / DESIGN" />
          <Field k="EXPIRES" v="JUN 2026" />
        </div>
        <SkullEmblem className="agent-id__emblem" />
      </div>

      <div className="agent-id__foot">
        <span className="agent-id__sym">✶ ⬡ ◎ ⌖ CE</span>
        <Barcode value="POR2_AUG24FT" height={20} unit={1.4} showText={false} />
      </div>

      <div className="agent-id__sign">
        <span className="agent-id__sign-k">SIGNATURE</span>
        <span className="agent-id__sign-img" role="img" aria-label="Signature: oltenkS">
          <img src="/assets/signature_raw.png" alt="" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}
