import Seal from './Seal.jsx';
import AgentId from './AgentId.jsx';
import { Redacted } from './primitives.jsx';
import { bureau, subjectName } from '../data.js';

export default function Hero() {
  return (
    <>
      <div className="hero-top">
        <div className="hero-id">
          <Seal size={92} />
          <div>
            <div className="agency-name">
              Federal Bureau of
              <br />
              Front-End Development
            </div>
            <div className="agency-sub">{bureau.est} · OSLO STATION</div>
          </div>
        </div>
        <div className="hero-id-pin">
          <AgentId />
        </div>
      </div>

      <div
        className="hero-kicker"
        style={{ marginTop: 'clamp(22px,4vh,42px)' }}
      >
        SUBJECT DOSSIER · CASE {bureau.fileNumber}
      </div>

      <h1 className="hero-title">
        Front-End
        <br />
        Developer
      </h1>

      <div className="hero-sub">
        <span className="hero-name">
          <span className="hero-name__label">SUBJECT</span>
          <Redacted>{subjectName.full}</Redacted>
        </span>
        <span>· OSLO, NO</span>
        <span>· FED</span>
        <span>· STATUS: ACTIVE</span>
      </div>

      <div className="hero-foot">
        <span className="scroll-cue">
          SCROLL TO INSPECT <span className="arr">↓</span>
        </span>
        <div className="status-badge">
          <span className="status-badge__dot" aria-hidden="true" />
          <span>ACTIVE</span>
          <span className="status-badge__id">S023</span>
        </div>
      </div>
    </>
  );
}
