import { useState, useEffect, useRef } from 'react';
import Seal from './Seal.jsx';
import { requestForm } from '../data.js';

const pad = (n) => String(n).padStart(2, '0');
function today() {
  const d = new Date();
  return { d: pad(d.getDate()), m: pad(d.getMonth() + 1), y: d.getFullYear() };
}

const EMPTY = {
  name: '',
  email: '',
  org: '',
  type: '',
  priority: 'ROUTINE',
  statement: '',
  attest: false,
};

const REQUIRED = ['name', 'email', 'type', 'statement', 'attest'];
const LOG = [
  '> VALIDATING RECORD … OK',
  '> ASSIGNING CASE NUMBER …',
  '> ROUTING TO REVIEWING OFFICER …',
  '> REQUEST LOGGED.',
];
const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function newCaseNo() {
  return `FED-2026-${Math.floor(1000 + Math.random() * 9000)}`;
}

function encode(data) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');
}

function Field({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
}) {
  const filled = String(value).trim().length > 0;
  return (
    <div className={`req-field ${filled ? 'is-filled' : ''}`}>
      <label className="req-label" htmlFor={id}>
        {label}
      </label>
      <div className="req-input-wrap">
        <input
          id={id}
          name={name}
          className="req-input"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          required={required}
        />
        <span className="req-check" aria-hidden="true">
          ✓
        </span>
      </div>
    </div>
  );
}

export default function RequestForm() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | processing | filed | failed
  const [logShown, setLogShown] = useState(0);
  const [caseInfo, setCaseInfo] = useState(null);
  const panelRef = useRef(null);

  // move focus into the panel
  useEffect(() => {
    if (phase === 'processing' || phase === 'filed' || phase === 'failed') {
      panelRef.current?.focus();
    }
  }, [phase]);

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const completed = REQUIRED.filter((k) =>
    k === 'attest' ? form.attest : String(form[k]).trim(),
  ).length;
  const cleared = completed === REQUIRED.length;
  const recd = today();

  const fileCase = () => {
    setCaseInfo({
      caseNo: newCaseNo(),
      name: form.name.trim(),
      priority: form.priority,
    });
    setPhase('filed');
  };

  // Submitting POSTs the encoded form to Netlify, plays the in-fiction
  // processing log, then lands on the receipt or the transmission-failed state.
  useEffect(() => {
    if (phase !== 'processing') return;
    let cancelled = false;
    let logDone = REDUCED; // reduced-motion has no log to wait for
    let settled = null; // 'ok' | 'fail'
    let to;

    const finish = () => {
      if (cancelled || !logDone || settled === null) return;
      if (settled === 'ok') fileCase();
      else setPhase('failed');
    };

    const body = encode({
      'form-name': 'contact',
      'bot-field': '', // sent empty so Netlify runs its server-side honeypot check
      name: form.name,
      email: form.email,
      org: form.org,
      type: form.type,
      priority: form.priority,
      statement: form.statement,
      attest: form.attest ? 'yes' : 'no',
    });
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then((r) => {
        settled = r.ok ? 'ok' : 'fail';
      })
      .catch(() => {
        settled = 'fail';
      })
      .finally(finish);

    if (REDUCED)
      return () => {
        cancelled = true;
      };

    let i = 0;
    setLogShown(0);
    const id = setInterval(() => {
      i += 1;
      setLogShown(i);
      if (i >= LOG.length) {
        clearInterval(id);
        to = setTimeout(() => {
          logDone = true;
          finish();
        }, 480);
      }
    }, 430);
    return () => {
      cancelled = true;
      clearInterval(id);
      clearTimeout(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function onSubmit(e) {
    e.preventDefault();
    if (!cleared) {
      setError(
        'FIELD INCOMPLETE — RECORD REJECTED. COMPLETE ALL MANDATORY FIELDS (*).',
      );
      // focus the first incomplete field
      const firstEmpty = REQUIRED.find((k) =>
        k === 'attest' ? !form.attest : !String(form[k]).trim(),
      );
      if (firstEmpty) {
        e.currentTarget.querySelector(`[name="${firstEmpty}"]`)?.focus();
      }
      return;
    }
    setError('');

    const trap = e.currentTarget.elements['bot-field'];
    if (trap && trap.value) {
      fileCase();
      return;
    }
    setPhase('processing');
  }

  if (phase === 'processing') {
    return (
      <div
        className="req-processing"
        role="status"
        aria-live="polite"
        ref={panelRef}
        tabIndex={-1}
      >
        <span className="req-processing__bar" aria-hidden="true" />
        <div className="kicker" style={{ marginBottom: 14 }}>
          PROCESSING REQUEST
        </div>
        <pre className="req-processing__log">
          {LOG.slice(0, logShown).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          <span className="req-processing__cursor">▌</span>
        </pre>
      </div>
    );
  }

  if (phase === 'filed') {
    return (
      <div className="receipt" role="status" ref={panelRef} tabIndex={-1}>
        <div className="receipt__stamp">RECEIVED</div>
        <div className="kicker">REQUEST FILED · LOGGED</div>
        <h2 className="receipt__case">CASE #{caseInfo.caseNo} OPENED</h2>
        <p className="receipt__line">
          Filed by {caseInfo.name} · priority {caseInfo.priority}. A reviewing
          officer will respond within {requestForm.responseWindow}.
        </p>
        <p className="motto" style={{ marginBottom: 22 }}>
          IN CODE WE TRUST — EVERYTHING ELSE WE INSPECT
        </p>
        <button
          className="btn btn--ghost"
          onClick={() => {
            setPhase('idle');
            setForm(EMPTY);
          }}
        >
          FILE ANOTHER <span className="arrow">→</span>
        </button>
      </div>
    );
  }

  if (phase === 'failed') {
    return (
      <div className="req-fail" role="status" ref={panelRef} tabIndex={-1}>
        <div className="kicker">TRANSMISSION FAILED</div>
        <h2 className="receipt__case">LINE DROPPED</h2>
        <p className="receipt__line">
          The bureau did not log your request. Try again, or reach the desk
          directly at{' '}
          <a className="req-fail__link" href={requestForm.channels[0].href}>
            {requestForm.channels[0].handle}
          </a>
          .
        </p>
        <button className="btn btn--ghost" onClick={() => setPhase('idle')}>
          TRY AGAIN <span className="arrow">→</span>
        </button>
      </div>
    );
  }

  return (
    <div className="req-jacket">
      <form
        className="reqform"
        name="contact"
        method="POST"
        onSubmit={onSubmit}
        noValidate
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="req-hp" aria-hidden="true">
          <label>
            Leave this field empty
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        {form.priority === 'URGENT' && (
          <span className="urgent-flag" role="status">
            URGENT
          </span>
        )}
        <div className="form-watermark" aria-hidden="true">
          <Seal size={420} />
        </div>

        <div className="form-strip">
          <span>{requestForm.formNo} · REV. C</span>
          <span>FOR OFFICIAL USE ONLY · PAGE 1/1</span>
        </div>

        <div className="clearance" aria-hidden="true">
          <span className="clearance__label">CLEARANCE</span>
          <span className="clearance__bar">
            {REQUIRED.map((_, i) => (
              <span key={i} className={i < completed ? 'on' : ''} />
            ))}
          </span>
          <span className={`clearance__status ${cleared ? 'is-cleared' : ''}`}>
            {cleared
              ? '● CLEARED FOR SUBMISSION'
              : `${completed} OF ${REQUIRED.length} · PENDING`}
          </span>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {cleared
            ? 'Cleared for submission.'
            : `${completed} of ${REQUIRED.length} required fields complete.`}
        </p>

        <div className="form-section">
          <div className="form-section__head">SECTION A · APPLICANT</div>
          <div className="reqform__grid">
            <Field
              id="req-name"
              name="name"
              label="APPLICANT *"
              value={form.name}
              onChange={set('name')}
              placeholder="Full name"
              required
            />
            <Field
              id="req-email"
              name="email"
              label="RETURN ADDRESS *"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              required
            />
            <Field
              id="req-org"
              name="org"
              label="ORGANISATION"
              value={form.org}
              onChange={set('org')}
              placeholder="Optional"
            />
            <fieldset className="req-field req-fieldset">
              <legend className="req-label">PRIORITY</legend>
              <div className="req-radios">
                {requestForm.priorities.map((p) => (
                  <label className="req-radio" key={p}>
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={form.priority === p}
                      onChange={set('priority')}
                    />
                    <span className="req-box" aria-hidden="true" />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="form-section">
          <fieldset className="req-fieldset">
            <legend className="form-section__head">
              SECTION B · NATURE OF REQUEST *
            </legend>
            <div className="req-radios req-radios--stack">
              {requestForm.types.map((t) => (
                <label className="req-radio" key={t}>
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={form.type === t}
                    onChange={set('type')}
                  />
                  <span className="req-box" aria-hidden="true" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="form-section">
          <label className="form-section__head" htmlFor="req-statement">
            SECTION C · STATEMENT OF REQUEST *
          </label>
          <textarea
            id="req-statement"
            name="statement"
            className="req-textarea"
            rows={5}
            value={form.statement}
            onChange={set('statement')}
            placeholder="Describe the nature of your request for the record."
            required
          />
        </div>

        <div className="form-section">
          <div className="form-section__head">SECTION D · DECLARATION</div>
          <label className="req-attest">
            <input
              type="checkbox"
              name="attest"
              checked={form.attest}
              onChange={set('attest')}
              required
            />
            <span className="req-box" aria-hidden="true" />I attest the above is
            true and free of console errors. *
          </label>
        </div>

        {error && (
          <p className="req-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`btn req-submit ${cleared ? 'is-armed' : ''}`}
        >
          FILE REQUEST <span className="arrow">→</span>
        </button>
      </form>

      <aside className="official-margin" aria-label="For official use only">
        <div className="official-margin__head">
          FOR OFFICIAL
          <br />
          USE ONLY
        </div>

        <div className="margin-box margin-box--recd">
          <span className="margin-box__label">DATE REC'D</span>
          <span className="margin-box__date">
            <span>{recd.d}</span> / <span>{recd.m}</span> /{' '}
            <span>{recd.y}</span>
          </span>
        </div>

        <div className="margin-box">
          <span className="margin-box__label">ROUTE TO</span>
          <span className="margin-officer">
            AGENT {requestForm.officer.id}
            <em>"{requestForm.officer.alias}" · REVIEWING</em>
          </span>
        </div>

        <div className="margin-box">
          <span className="margin-box__label">CLEARANCE LEGEND</span>
          <dl className="margin-legend">
            {requestForm.clearanceLegend.map(([k, v]) => (
              <div className="margin-legend__row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}
