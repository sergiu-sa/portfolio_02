import { useEffect } from 'react';

const NAME = 'Sergiu Sarbu';
// Must stay identical to the <title> in index.html, or the home page flips
// from one to the other the moment React mounts.
const BASE = `${NAME} // Front-End Developer`;

// Keeps the tab and the search-result title in step with the route.
// Called with no argument on the home page, which falls back to BASE.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} // ${NAME}` : BASE;
  }, [title]);
}
