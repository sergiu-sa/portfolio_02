import ThemeToggle from './ThemeToggle.jsx';

export default function Chrome({ status = 'DECLASSIFIED' }) {
  return (
    <div className="chrome">
      <span>FED // FIELD TERMINAL</span>
      <span className="status">
        <span className="dot" aria-hidden="true">
          ●
        </span>
        {status}
      </span>
      <ThemeToggle />
    </div>
  );
}
