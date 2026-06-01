import { useEffect } from 'react';

// Subtle mouse-driven 3D tilt on the document.
// Disabled on touch and when reduced motion is requested; flattens once the
// user scrolls past the hero.
export function useParallax(ref, { max = 1.6, gateScroll = 460 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    function onMove(e) {
      if (window.scrollY > gateScroll) {
        tx = 0;
        ty = 0;
        return;
      }
      tx = (e.clientX / window.innerWidth - 0.5) * max * 2; // rotateY
      ty = -(e.clientY / window.innerHeight - 0.5) * max * 2; // rotateX
    }
    function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--rx', cx.toFixed(3) + 'deg');
      el.style.setProperty('--ry', cy.toFixed(3) + 'deg');
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref, max, gateScroll]);
}
