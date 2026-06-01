import '@testing-library/jest-dom';

// jsdom lacks matchMedia; report reduced-motion = true so GSAP/scroll effects stay dormant.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: /prefers-reduced-motion/.test(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}
