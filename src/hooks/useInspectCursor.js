import { useEffect } from 'react';

// Custom "INSPECT" lens cursor.
// any [data-inspect] element. Fine-pointer devices only.
export function useInspectCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    const lens = document.createElement('div');
    lens.className = 'lens';
    lens.setAttribute('aria-hidden', 'true');
    lens.innerHTML = '<span class="lens__label">INSPECT</span>';
    document.body.appendChild(lens);
    document.body.classList.add('has-lens');

    let x = window.innerWidth / 2,
      y = window.innerHeight / 2;
    let lx = x,
      ly = y,
      raf = 0;

    function onMove(e) {
      x = e.clientX;
      y = e.clientY;
      const hit =
        e.target instanceof Element ? e.target.closest('[data-inspect]') : null;
      lens.classList.toggle('lens--active', !!hit);
      lens.style.opacity = '';
    }
    function onLeave(e) {
      if (!e.relatedTarget) lens.style.opacity = '0';
    }
    function loop() {
      lx += (x - lx) * 0.22;
      ly += (y - ly) * 0.22;
      lens.style.transform = `translate(${lx}px, ${ly}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseout', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
      lens.remove();
      document.body.classList.remove('has-lens');
    };
  }, []);
}
