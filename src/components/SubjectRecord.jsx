import { subjectFields, recordPhoto } from '../data.js';
import { RedactBar, FieldValue, Annotation } from './primitives.jsx';

const HEIGHTS = [
  190, 186, 182, 178, 174, 170, 166, 162, 158, 154, 150, 146, 142,
];

export default function SubjectRecord() {
  return (
    <div className="record-particulars">
      {/* left — particulars */}
      <div>
        <dl className="fields">
          {subjectFields.map((f) => (
            <div className="field" key={f.k}>
              <dt className="k">{f.k}</dt>
              <dd className="v">
                <FieldValue value={f.v} strike={f.strike} />
              </dd>
            </div>
          ))}
        </dl>
        <div style={{ marginTop: 16 }}>
          <Annotation className="tight">
            subject cooperative
            <br />
            final-year, Noroff ✓
          </Annotation>
        </div>
      </div>

      {/* right — portrait */}
      <div>
        <div
          className="kicker"
          style={{ marginBottom: 10, textAlign: 'right' }}
        >
          PORTRAIT · FRONTAL
        </div>
        <div className="mugshot-wrap">
          <div className="heightbars left">
            {HEIGHTS.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          <div>
            <div className="mugshot" data-inspect>
              <div className="mugshot__inner">
                <img
                  src={recordPhoto}
                  alt="Subject portrait — frontal"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* eyes-bar — swipe to reveal; nudge --rb-* if it sits off the eyeline */}
              <RedactBar
                id="subject-eyes"
                style={{
                  '--rb-left': '11%',
                  '--rb-top': '31%',
                  '--rb-w': '78%',
                  '--rb-h': '14%',
                }}
              />
              <span className="corner tl" aria-hidden="true" />
              <span className="corner tr" aria-hidden="true" />
              <span className="corner bl" aria-hidden="true" />
              <span className="corner br" aria-hidden="true" />
              <span className="mug-crown" aria-hidden="true" />
            </div>
            <div className="mug-caption">FRONTAL · 01 · OSL · 28.05.26</div>
          </div>
          <div className="heightbars right">
            {HEIGHTS.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
