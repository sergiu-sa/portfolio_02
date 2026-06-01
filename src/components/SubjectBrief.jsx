import { Link } from 'react-router-dom';
import { Redacted } from './primitives.jsx';
import { subjectPhoto, subjectName } from '../data.js';

const FIELDS = [
  { k: 'RECORD ID', v: 'POR2_AUG24FT' },
  { k: 'STATION', v: 'OSLO, NO' },
  { k: 'DISCIPLINE', v: 'FED / DESIGNER' },
  { k: 'STATUS', v: 'ACTIVE · JUN 2026' },
];

export default function SubjectBrief() {
  return (
    <div className="brief">
      <div className="brief__mug" data-inspect>
        <img src={subjectPhoto} alt="Subject portrait on file" />
      </div>
      <div className="brief__fields">
        <div className="brief__f">
          <b>Name</b>
          <Redacted>{subjectName.full}</Redacted>
        </div>
        {FIELDS.map((f) => (
          <div className="brief__f" key={f.k}>
            <b>{f.k}</b>
            {f.v}
          </div>
        ))}
      </div>
      <Link className="btn btn--ghost" to="/record">
        OPEN FULL RECORD <span className="arrow">→</span>
      </Link>
    </div>
  );
}
