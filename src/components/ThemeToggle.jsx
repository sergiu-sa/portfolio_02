import { useRef, useState } from 'react';

// Light switch in the chrome bar. Flips the page background between the dark and the light
function currentTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);
  const lockRef = useRef(0);

  function toggle() {
    // one flip per press
    const now = Date.now();
    if (now - lockRef.current < 600) return;
    lockRef.current = now;

    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if (next === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try {
      localStorage.setItem('fed-theme', next);
    } catch {
      // storage blocked
    }
    setTheme(next);
  }

  const lit = theme === 'light';
  return (
    <button
      type="button"
      className={`tswitch ${lit ? 'tswitch--on' : ''}`}
      onClick={toggle}
      aria-pressed={lit}
      aria-label={
        lit
          ? 'Turn the lights off (dark theme)'
          : 'Turn the lights on (light theme)'
      }
      title={lit ? 'Lights on' : 'Lights off'}
    >
      <span className="tswitch__paddle" aria-hidden="true" />
    </button>
  );
}
