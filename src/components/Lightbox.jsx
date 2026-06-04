import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* `index` is the open exhibit (null = closed). Esc closes, ← / → step through
   the set, focus is trapped and restored to the trigger on close. */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const dialogRef = useRef(null);
  const restoreRef = useRef(null);
  const open = index != null;
  const count = items.length;

  const go = useCallback(
    (dir) => onIndex((index + dir + count) % count),
    [index, count, onIndex],
  );

  useEffect(() => {
    if (open) restoreRef.current = document.activeElement;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const id = requestAnimationFrame(() => dialogRef.current?.focus());

    function onKey(e) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        // trap focus to the dialog's controls so Tab can't leave the modal
        const focusables = dialogRef.current?.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement;
        if (active === dialogRef.current) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      restoreRef.current?.focus?.();
    };
  }, [open, onClose, go]);

  if (!open) return null;
  const item = items[index];

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Exhibit ${index + 1} of ${count}`}
      aria-describedby={item.caption ? 'lightbox-cap' : undefined}
      ref={dialogRef}
      tabIndex={-1}
      onClick={onClose}
    >
      <div className="lightbox__top" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__idx">
          EXHIBIT {String(index + 1).padStart(2, '0')} /{' '}
          {String(count).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="lightbox__x"
          data-inspect
          onClick={onClose}
          aria-label="Close viewer"
        >
          CLOSE ✕
        </button>
      </div>

      <figure className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img
          className="lightbox__img"
          src={item.src}
          alt={item.caption || `Exhibit ${index + 1}`}
          decoding="async"
        />
        {item.caption && (
          <figcaption className="lightbox__cap" id="lightbox-cap">
            {item.caption}
          </figcaption>
        )}
      </figure>

      {count > 1 && (
        <>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            data-inspect
            aria-label="Previous exhibit"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            ←
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            data-inspect
            aria-label="Next exhibit"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            →
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
