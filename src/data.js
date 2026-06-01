// Bureau metadata
export const bureau = {
  fileNumber: '#023-001',
  recordId: 'POR2_AUG24FT',
  agent: 'S023',
  caseCode: '#FE07052003OSL050807',
  est: 'EST. MMXXIV',
};

// Subject portraits
export const subjectPhoto = '/assets/collage/face01.jpg';
export const idPhoto = '/assets/collage/face02.jpg';

export const subjectName = { full: 'SERGIU SARBU' };

// Subject record fields
export const subjectFields = [
  { k: 'NAME', v: 'SERGIU SARBU' },
  { k: 'RECORD ID', v: 'POR2_AUG24FT' },
  { k: 'PRONOUNS', v: 'HE/HIM' },
  { k: 'AGE', v: '22 / FINAL YEAR' },
  { k: 'STATION', v: 'OSLO, NO' },
  { k: 'DISCIPLINE', v: 'FED / DESIGNER' },
  { k: 'INSTITUTION', v: 'NOROFF' },
  { k: 'STATUS', v: 'ACTIVE' },
];

// Subject statement — the about-page bio
export const subjectStatement = [
  "I'm a front-end developer and creative explorer with a mind wired for problem-solving.",
  'My work usually starts with a feeling: curiosity, tension, or instinct. I build through trial and error, letting the process guide the result rather than forcing it into place.',
  "Creating something new, even when it's strange or unfinished, is where I feel most at home. When it feels honest, or unexpectedly useful, I know I'm headed in the right direction.",
];

// Evidence — the three brief-required projects.
// PLACEHOLDER: live / repo / commit URLs + brief/amendment copy.
export const evidence = [
  {
    id: 'atlas',
    ref: 'E-01',
    codename: 'ATLAS',
    project: 'CSS FRAMEWORKS',
    year: '2025',
    role: 'SOLO BUILD',
    status: 'LIVE',
    summary:
      'Responsive adventure-travel site on a CSS framework. Layout rebuilt for accessibility and contrast.',
    redact: ['adventure-travel'],
    tags: ['HTML', 'SASS', 'BOOTSTRAP'],
    heroImg: '/assets/projects/adventure_trails/home-min.png',
    plateImg: '/assets/projects/adventure_trails/atlas-fig1.webp',
    live: 'https://example.com',
    repo: 'https://github.com/your-handle/adventure-trails#readme',
    commit: 'https://github.com/your-handle/adventure-trails/commit/0000000',
    caption: 'Surveillance plate E-01 — landing view captured post-amendment.',
    exhibits: [
      {
        src: '/assets/projects/adventure_trails/atlas-fig2.webp',
        caption:
          'Itinerary view — the responsive grid holding under content load.',
      },
      {
        src: '/assets/projects/adventure_trails/atlas-fig3.webp',
        caption:
          'Editorial “about” section — the documented type scale in evidence.',
      },
      {
        src: '/assets/projects/adventure_trails/atlas-fig4.webp',
        caption: 'Mid-page modules — component spacing reconciled to the grid.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/adventure_trails/atlas-fig5.webp',
        label: 'ORIGINAL FILING',
      },
      after: {
        src: '/assets/projects/adventure_trails/atlas-fig1.webp',
        label: 'AMENDED',
      },
      caption: 'Before and after the accessibility + grid rebuild.',
    },
    brief: [
      'A multipage adventure-travel site built on a CSS framework, used as the proving ground for a component-driven layout system and a disciplined type scale.',
      'The original submission leaned on default framework spacing and shipped a handful of contrast failures. The rebuild replaces ad-hoc utilities with a documented grid and a tokenised colour set.',
    ],
    amendment:
      'Rebuilt the layout on a documented grid and raised every text/background pair to WCAG AA, fixing six contrast failures flagged in audit.',
  },
  {
    id: 'relay',
    ref: 'E-02',
    codename: 'RELAY',
    project: 'JAVASCRIPT FRAMEWORKS',
    year: '2025',
    role: 'SOLO BUILD',
    status: 'LIVE',
    summary:
      'React social client with a live API — feed, profiles and auth. State and routing refactored for clarity.',
    redact: ['social'],
    tags: ['REACT', 'API', 'ROUTER'],
    heroImg: '/assets/projects/linka/linka_feed_dark.png',
    plateImg: '/assets/projects/linka/linka_profile_dark.png',
    live: 'https://example.com',
    repo: 'https://github.com/your-handle/linka#readme',
    commit: 'https://github.com/your-handle/linka/commit/0000000',
    caption: 'Surveillance plate E-02 — profile view with live data feed.',
    exhibits: [
      {
        src: '/assets/projects/linka/linka_profile_dark.png',
        caption: 'Profile view backed by the live data feed.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/linka/linka_profile_dark.png',
        label: 'ORIGINAL FILING',
      },
      after: {
        src: '/assets/projects/linka/linka_feed_dark.png',
        label: 'AMENDED',
      },
      caption: 'Before and after the state + routing refactor.',
    },
    brief: [
      'A single-page React social client that reads from a live API — an authenticated feed, user profiles, and post interactions, with client-side routing throughout.',
      'The improvement pass extracted data-fetching into a reusable hook, added genuine loading / empty / error states, and removed prop-drilling in favour of scoped state.',
    ],
    amendment:
      'Refactored data fetching into a custom hook and added explicit loading, empty and error states the original build silently skipped.',
  },
  {
    id: 'gavel',
    ref: 'E-03',
    codename: 'GAVEL',
    project: 'SEMESTER PROJECT 2',
    year: '2025',
    role: 'SOLO BUILD',
    status: 'LIVE',
    featured: true,
    summary:
      'Full auction-house flow — listings, bids and credits. The flagship case on file.',
    redact: ['auction-house'],
    tags: ['JS', 'API', 'AUTH'],
    heroImg: '/assets/projects/aucto/e_aucto_catalog.jpg',
    plateImg: '/assets/projects/aucto/c_aucto.png',
    live: 'https://example.com',
    repo: 'https://github.com/your-handle/aucto#readme',
    commit: 'https://github.com/your-handle/aucto/commit/0000000',
    caption: 'Surveillance plate E-03 — listing detail with bid panel engaged.',
    exhibits: [
      {
        src: '/assets/projects/aucto/c_aucto.png',
        caption: 'Listing detail with the bid panel engaged.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/aucto/c_aucto.png',
        label: 'ORIGINAL FILING',
      },
      after: {
        src: '/assets/projects/aucto/e_aucto_catalog.jpg',
        label: 'AMENDED',
      },
      caption: 'Before and after the bidding-loop rework.',
    },
    brief: [
      'The flagship semester project: an end-to-end auction house covering listings, a live bidding flow, user credits, and a profile backed by an API and authentication.',
      'Refinement focused on the bidding loop — moving it to a single source of truth, reflecting bid updates instantly, and tightening the auth and credit-balance states.',
    ],
    amendment:
      'Reworked bidding into a single source of truth with optimistic updates, and hardened auth/credit handling to remove the stale-balance bug from the first release.',
  },
];

// Archive — additional projects beyond the brief's required three.
// PLACEHOLDER copy + links; real images from the project folders.
export const archive = [
  {
    id: 'rerun',
    ref: 'E-04',
    codename: 'RERUN',
    project: 'WORKFLOW (JS1)',
    year: '2024',
    role: 'SOLO BUILD',
    status: 'ARCHIVED',
    summary: 'Movie discovery & watchlist UI — an early build, kept on file.',
    tags: ['JS', 'API', 'CSS'],
    heroImg: '/assets/projects/square_eyes/new_home01.jpg',
    plateImg: '/assets/projects/square_eyes/new_home02.jpg',
    live: 'https://example.com',
    repo: 'https://github.com/your-handle/square-eyes#readme',
    commit: 'https://github.com/your-handle/square-eyes/commit/0000000',
    caption: 'Surveillance plate E-04 — discovery view.',
    exhibits: [
      {
        src: '/assets/projects/square_eyes/new_home01.jpg',
        caption: 'Discovery view — search and watchlist.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/square_eyes/new_home01.jpg',
        label: 'ORIGINAL FILING',
      },
      after: {
        src: '/assets/projects/square_eyes/new_home02.jpg',
        label: 'AMENDED',
      },
      caption: 'Before and after the retrospective tidy-up.',
    },
    brief: [
      'An early movie-discovery project, kept on file as a record of where the work started.',
      'Superseded by later builds; retained for the case timeline.',
    ],
    amendment:
      'Archived with a short retrospective note; not actively maintained.',
  },
  {
    id: 'vault',
    ref: 'E-05',
    codename: 'VAULT',
    project: 'CONCEPT BUILD',
    year: '2025',
    role: 'SOLO BUILD',
    status: 'LIVE',
    summary:
      'A kids’ banking concept — allowance, savings goals and a friendly ledger.',
    tags: ['REACT', 'UI', 'CONCEPT'],
    heroImg: '/assets/projects/kid_bank/kid_bank01.png',
    plateImg: '/assets/projects/kid_bank/kid_bank02.png',
    live: 'https://example.com',
    repo: 'https://github.com/your-handle/kid-bank#readme',
    commit: 'https://github.com/your-handle/kid-bank/commit/0000000',
    caption: 'Surveillance plate E-05 — dashboard concept.',
    exhibits: [
      {
        src: '/assets/projects/kid_bank/kid_bank01.png',
        caption: 'Dashboard concept — allowance and savings goals.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/kid_bank/kid_bank01.png',
        label: 'ORIGINAL FILING',
      },
      after: {
        src: '/assets/projects/kid_bank/kid_bank02.png',
        label: 'AMENDED',
      },
      caption: 'Before and after the clarity + contrast pass.',
    },
    brief: [
      'A concept build exploring a friendly, kid-safe banking interface.',
      'Focus on clarity, large targets, and a playful-but-trustworthy tone.',
    ],
    amendment:
      'Concept refined for clarity and contrast; flagged for future expansion.',
  },
];

export const allEvidence = [...evidence, ...archive];

export const evidenceById = Object.fromEntries(
  allEvidence.map((e) => [e.id, e]),
);

// Subject record — about page
export const favs = {
  sites: ['are.na', 'kottke', 'read.cv', 'siteinspire'],
  stack: ['react', 'typescript', 'vite', 'tailwind', 'gsap', 'three.js'],
  editor: 'helix · (under duress: vscode)',
  casual:
    'lo-fi web, hand-drawn ui, archive sites, brutalist menus, type specimens, weird cursors.',
};

// Fingertips — skills
// Capabilities — n = meter strength (STRONG 5 · WORKING 3 · LEARNING 2). Add more later.
export const skills = [
  { name: 'HTML5', level: 'STRONG', n: 5 },
  { name: 'CSS3', level: 'STRONG', n: 5 },
  { name: 'JavaScript', level: 'STRONG', n: 5 },
  { name: 'TypeScript', level: 'WORKING', n: 3 },
  { name: 'Tailwind CSS', level: 'WORKING', n: 3 },
  { name: 'Git', level: 'STRONG', n: 5 },
  { name: 'Figma', level: 'WORKING', n: 3 },
  { name: 'Three.js', level: 'LEARNING', n: 2 },
];

export const likes = [
  'terminals that don’t apologise',
  'type specimens',
  'websites that feel like rooms',
  'cmd-k everywhere',
  'libraries with one file',
  'lo-fi',
  'oslo in november',
];

export const dislikes = [
  'hero gradients',
  'sites that load like applications',
  '“let’s hop on a quick call”',
  'parallax (used badly)',
  'most carousels',
];

// Face collage — placeholder portraits
export const faces = Array.from(
  { length: 6 },
  (_, i) => `/assets/collage/face${String(i + 1).padStart(2, '0')}.jpg`,
);

// FD-258 ten-print card — one print for now. Add the real set of 10 here later.
export const fingerprints = ['/assets/fingerprints/print-01.png'];

// Surveillance photo array
export const photoArray = [
  {
    src: faces[2],
    x: 1,
    y: 6,
    w: 23,
    rot: -5,
    z: 2,
    tape: null,
    mark: { type: 'scribble', variant: 'circle' },
  },
  {
    src: faces[5],
    x: 21,
    y: 40,
    w: 27,
    rot: 3,
    z: 5,
    tape: 'top',
    mark: { type: 'redact' },
  },
  {
    src: faces[1],
    x: 40,
    y: 2,
    w: 26,
    rot: -3,
    z: 6,
    tape: 'x',
    mark: { type: 'scribble', variant: 'eyesx' },
  },
  {
    src: faces[3],
    x: 62,
    y: 30,
    w: 22,
    rot: 6,
    z: 3,
    tape: null,
    mark: { type: 'scribble', variant: 'star' },
  },
  { src: faces[4], x: 79, y: 5, w: 20, rot: -4, z: 2, tape: 'top', mark: null },
  {
    src: faces[0],
    x: 5,
    y: 52,
    w: 21,
    rot: 5,
    z: 4,
    tape: null,
    mark: { type: 'redact' },
  },
  {
    src: faces[2],
    x: 63,
    y: 60,
    w: 24,
    rot: -7,
    z: 4,
    tape: null,
    mark: { type: 'scribble', variant: 'squiggle' },
  },
];

// File a request — contact
export const requestForm = {
  formNo: 'FORM FED-S023',
  responseWindow: '48 HOURS',
  types: [
    'FREELANCE COMMISSION',
    'FULL-TIME POSITION',
    'COLLABORATION',
    'GENERAL INQUIRY',
  ],
  priorities: ['ROUTINE', 'PRIORITY', 'URGENT'],
};

// Broadcast intercept — prior portfolio. `frames` cross-fade behind the CRT.
export const priorCase = {
  channel: 'CH 02',
  ref: 'PRIOR PORTFOLIO',
  codename: 'TEST PATTERN',
  title: 'The Broadcast',
  year: '2025',
  blurb:
    'An earlier dossier on the same subject, a portfolio inspired by retro Cathode Ray Tube TV. Channels, static, games, a live camera... the works. Recovered from the archive and cleared for viewing.',
  url: 'https://portfoliosergiusarbu.netlify.app/',
  frames: ['/assets/projects/tv-portfolio/og-preview.png'],
};
