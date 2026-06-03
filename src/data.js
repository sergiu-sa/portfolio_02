// Bureau metadata
export const bureau = {
  fileNumber: '#023-001',
  recordId: 'POR2_AUG24FT',
  agent: 'S023',
  caseCode: '#FE07052003OSL050807',
  est: 'EST. MMXXIV',
};

// Subject portraits
export const subjectPhoto = '/assets/collage/face07.webp'; // home brief, under the hero
export const recordPhoto = '/assets/collage/face04.webp'; // record page particulars
export const idPhoto = '/assets/collage/pass_card.webp'; // pass card only

export const subjectName = { full: 'SERGIU SARBU' };

// Subject record fields
export const subjectFields = [
  { k: 'NAME', v: 'SERGIU SARBU' },
  { k: 'RECORD ID', v: 'POR2_AUG24FT' },
  { k: 'PRONOUNS', v: 'HE/HIM' },
  { k: 'STANDING', v: 'GRADUATING 2026' },
  { k: 'STATION', v: 'OSLO, NO' },
  { k: 'DISCIPLINE', v: 'FED / DESIGNER', strike: 'DESIGNER' },
  { k: 'INSTITUTION', v: 'NOROFF' },
  { k: 'STATUS', v: 'ACTIVE' },
];

// Subject statement — the about-page bio
export const subjectStatement = [
  "I'm a front-end developer, a creative explorer, and an occasional chaos mechanic with a mind wired for problem-solving.",
  "Most of my work starts with a feeling. Curiosity, instinct, sometimes pressure. I build through trial and error and let the process lead, just to see where it goes. Design and development come with plenty of rules, and every so often it's worth forgetting them to find out what that turns up.",
  "I care about the technology, the function, and how a thing actually gets used. Design follows function: build it first, then make it work. I'd rather take something that already exists and make it better than reinvent it for its own sake, and everything should hold a purpose and stay intuitive, for the most technical user and the least.",
  "I just wrapped my front-end studies at Noroff, and now I'm exploring new stacks and new ways to build.",
];

// Evidence — the three brief-required projects shown on the home page.
export const evidence = [
  {
    id: 'aucto',
    ref: 'E-01',
    codename: 'AUCTO',
    project: 'SEMESTER PROJECT 2',
    year: '2026',
    role: 'SOLO BUILD',
    status: 'LIVE',
    featured: true,
    summary:
      'A brutalist online auction platform. Browse live lots, place bids, list your own. The products lead, not the chrome.',
    redact: ['auction'],
    tags: ['TYPESCRIPT', 'TAILWIND', 'API', 'AUTH'],
    heroImg: '/assets/projects/aucto/fig1.webp',
    plateImg: '/assets/projects/aucto/fig1.webp',
    live: 'https://auctohouse.netlify.app/',
    repo: 'https://github.com/sergiu-sa/auction_house_sp2',
    commit: 'https://github.com/sergiu-sa/auction_house_sp2/pull/116',
    caption: "Surveillance plate E-01. Home hero, tonight's most-watched lots.",
    exhibits: [
      {
        src: '/assets/projects/aucto/fig2.webp',
        caption:
          'Listing detail. The compact bento layout that holds short descriptions without leaving gaps.',
      },
      {
        src: '/assets/projects/aucto/fig3.webp',
        caption: 'Catalog. Category filters, sort and the live lot grid.',
      },
      {
        src: '/assets/projects/aucto/fig4.webp',
        caption: 'The same flow on mobile: home, listing and profile.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/aucto/amend_1.webp',
        label: 'SIGN IN',
      },
      after: {
        src: '/assets/projects/aucto/amend_2.webp',
        label: 'REGISTER',
      },
      caption:
        'The access gate. Guests browse and watch freely; bidding or listing needs a verified @stud.noroff.no account.',
    },
    brief: [
      'Aucto is a full auction house built in plain TypeScript, with no framework and no router. Eight pages, each its own Vite entry, each mounting its own DOM. Guests browse, search and filter the live lots. A verified account unlocks bidding, listing and a profile, and every request runs through a single typed API client that handles auth and errors in one place.',
      'The look is deliberately mechanical: a bento grid, 3px borders, a neutral palette, Cormorant headings over Source Sans. The point was to let the items carry the visual weight instead of wrapping them in decoration. It was built against real API data from day one, so the layout had to handle messy content rather than tidy mockups. Short descriptions kept leaving gaps, which is why the listing page became a tighter bento.',
    ],
    amendment:
      'Filter logic lived in three places at once, so I pulled it into self-contained components that talk through events. The listing layout was rebuilt and a profile-dropdown bug fixed. Full trail is in the GitHub issues.',
  },
  {
    id: 'linka',
    ref: 'E-02',
    codename: 'LINKA',
    project: 'CSS FRAMEWORKS',
    year: '2025',
    role: 'SOLO REBUILD',
    status: 'LIVE',
    summary:
      'A social feed on the Noroff API. Editorial single-column layout, a 3D star intro, reading-mode posts, dark and light themes.',
    redact: ['social'],
    tags: ['TYPESCRIPT', 'TAILWIND', 'THREE.JS', 'API'],
    heroImg: '/assets/projects/linka/fig1.webp',
    plateImg: '/assets/projects/linka/fig1.webp',
    live: 'https://linka-social.netlify.app/',
    repo: 'https://github.com/sergiu-sa/linka-social-media',
    commit:
      'https://github.com/sergiu-sa/linka-social-media/pulls?q=is%3Apr+is%3Aclosed',
    caption:
      'Surveillance plate E-02. The intro star, drag to spin it, click to break it.',
    exhibits: [
      {
        src: '/assets/projects/linka/fig2.webp',
        caption:
          'The feed. Constellation console hero, composer rail and single-column editorial posts.',
      },
      {
        src: '/assets/projects/linka/fig3.webp',
        caption:
          'Profile in dark mode. Full-bleed banner, stats and tabbed posts and media.',
      },
      {
        src: '/assets/projects/linka/fig4.webp',
        caption: 'The same screens on mobile, in dark and light.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/linka/amend1.webp',
        label: 'ORIGINAL FILING',
      },
      after: {
        src: '/assets/projects/linka/amend2.webp',
        label: 'AMENDED',
      },
      caption: 'The profile page, before and after the redesign.',
    },
    brief: [
      'LINKA is a social feed built on the Noroff Social API in TypeScript and Tailwind CSS v4. It started as a group project for the CSS Frameworks course. I took it over afterwards and rebuilt the styling from scratch on my own, so the editorial look, the theme system and the layout are mine.',
      'The design is a single orange accent on slate. A 3D star greets you on the intro page: drag it and it spins, click it and it breaks apart. Posts open in a reading-mode modal instead of expanding inline, search runs on the server and returns people and posts in parallel, and a custom router guards the protected routes. Dark and light themes share one source of truth, so a toggle recolors the 3D mesh and the background live.',
    ],
    amendment:
      'The styling was rebuilt solo after the group submission, including the editorial theme, dark and light modes, the reading-mode modal and server-side search. Full trail is in pull requests 2 to 6.',
  },
  {
    id: 'ecom',
    ref: 'E-03',
    codename: 'ECOM',
    project: 'JAVASCRIPT FRAMEWORKS',
    year: '2026',
    role: 'SOLO BUILD',
    status: 'LIVE',
    summary:
      'An online store on the Noroff API. Search products, add to cart, and run a full checkout. Built on Next.js and React.',
    redact: ['checkout'],
    tags: ['NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'API'],
    heroImg: '/assets/projects/e-com_shop/fig1.webp',
    plateImg: '/assets/projects/e-com_shop/fig1.webp',
    live: 'https://js-frameworks-ca-online-shop.vercel.app/',
    repo: 'https://github.com/sergiu-sa/js_frameworks_ca_online_shop',
    commit: 'https://github.com/sergiu-sa/js_frameworks_ca_online_shop/pull/1',
    caption: 'Surveillance plate E-03. The storefront and product grid.',
    exhibits: [
      {
        src: '/assets/projects/e-com_shop/fig2.webp',
        caption:
          'The cart. Quantity controls, an order summary and state kept in localStorage.',
      },
      {
        src: '/assets/projects/e-com_shop/fig3.webp',
        caption: 'The contact page, a validated form built with React Hook Form and Zod.',
      },
      {
        src: '/assets/projects/e-com_shop/fig4.webp',
        caption: 'The same store across mobile, tablet and desktop.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/e-com_shop/amend1.webp',
        label: 'HOME',
      },
      after: {
        src: '/assets/projects/e-com_shop/amend2.webp',
        label: 'PRODUCT',
      },
      caption: 'Two key views, the storefront and a product detail page.',
    },
    brief: [
      'eCom Store is an online shop built with Next.js and TypeScript that reads its catalogue from the Noroff Online Shop API. You can browse the product grid, search with a debounced live filter, open a product for its price, rating and reviews, fill a cart, and run a checkout from shipping details through to a confirmation screen. The cart lives in React context with a reducer and persists to localStorage, so it survives a refresh.',
      'The look is warm editorial commerce, plenty of whitespace and a single accent for the actions. Pages fetch on the server and hand the interactive parts to client components, search is memoised and debounced, and every list has a loading skeleton and an empty state. The contact form validates with React Hook Form and Zod.',
    ],
    amendment:
      'The build was tightened in one pass: clearer loading and empty states, cart persistence, accessible focus rings and labels, and a cleaner component split. The work is in pull request 1.',
  },
];

// Archive — extra projects beyond the required three. Scaffold content.
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
  sites: ['siteinspire', 'awwwards', 'coolors', 'squoosh'],
  editor: 'vs code, happiest in the terminal',
  casual:
    'retro interfaces, lo-fi web, brutalist menus, terminal everything, and the occasional deep rabbit hole.',
};

// Fingertips — skills. n = meter strength (STRONG 5 · WORKING 3 · LEARNING 2).
export const skills = [
  { name: 'HTML5', level: 'STRONG', n: 5 },
  { name: 'CSS3 / Sass', level: 'STRONG', n: 5 },
  { name: 'JavaScript', level: 'WORKING', n: 3 },
  { name: 'Git & GitHub', level: 'STRONG', n: 5 },
  { name: 'TypeScript', level: 'WORKING', n: 3 },
  { name: 'Tailwind CSS', level: 'WORKING', n: 3 },
  { name: 'Figma', level: 'WORKING', n: 4 },
  { name: 'REST APIs', level: 'WORKING', n: 3 },
  { name: 'React', level: 'LEARNING', n: 2 },
  { name: 'Three.js', level: 'LEARNING', n: 2 },
  { name: 'Testing (Vitest / Playwright)', level: 'LEARNING', n: 2 },
];

// One honest line under the Capabilities header.
export const skillsNote =
  'Plenty of these are still leveling up. Paired with the right tools and a sharp eye, the builds ship clean.';

export const likes = [
  'the ideation rabbit hole',
  'getting lost in a build',
  'responsive, everywhere',
  'interfaces with a purpose',
  'improving what already exists',
  'branding a product into a persona',
];

export const dislikes = [
  'decoration over function',
  'effort spent on nothing',
  'layouts that break on mobile',
  '“let’s hop on a quick call”',
];

// Handwritten margin scrawl in the dislikes column.
export const dislikesNote = 'effort with no purpose is just noise';

// Face collage — the surveillance set
export const faces = Array.from(
  { length: 7 },
  (_, i) => `/assets/collage/face${String(i + 1).padStart(2, '0')}.webp`,
);

// FD-258 ten-print card — one rolled thumb and one finger, repeated across the ten cells.
export const fingerprints = {
  thumb: '/assets/fingerprints/fingerprint.png',
  finger: '/assets/fingerprints/tumbprint.png',
};

// Surveillance photo array
export const photoArray = [
  {
    src: faces[0],
    x: 1,
    y: 6,
    w: 23,
    rot: -5,
    z: 2,
    tape: null,
    mark: { type: 'scribble', variant: 'circle' },
  },
  {
    src: faces[1],
    x: 21,
    y: 40,
    w: 27,
    rot: 3,
    z: 5,
    tape: 'top',
    mark: { type: 'redact' },
  },
  {
    src: faces[2],
    x: 40,
    y: 2,
    w: 26,
    rot: -3,
    z: 6,
    tape: 'x',
    mark: null,
  },
  {
    src: faces[3],
    x: 62,
    y: 30,
    w: 22,
    rot: 6,
    z: 3,
    tape: null,
    mark: null,
  },
  { src: faces[4], x: 79, y: 5, w: 20, rot: -4, z: 2, tape: 'top', mark: null },
  {
    src: faces[5],
    x: 5,
    y: 52,
    w: 21,
    rot: 5,
    z: 4,
    tape: null,
    mark: { type: 'redact' },
  },
  {
    src: faces[6],
    x: 63,
    y: 60,
    w: 24,
    rot: -7,
    z: 4,
    tape: null,
    mark: { type: 'crown' },
  },
];

// File a request — contact.
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
  // reviewing officer the form routes to (shown in the official-use margin)
  officer: { id: 'S023', alias: 'oltenkS' },
  clearanceLegend: [
    ['ROUTINE', 'reviewed in sequence'],
    ['PRIORITY', 'flagged for next cycle'],
    ['URGENT', 'same-day eyes'],
  ],
  // DIRECT LINES
  channels: [
    {
      code: 'CH-01',
      label: 'EMAIL',
      handle: 'sergiudsarbu@gmail.com',
      href: 'mailto:sergiudsarbu@gmail.com',
    },
    {
      code: 'CH-02',
      label: 'GITHUB',
      handle: '@sergiu-sa',
      href: 'https://github.com/sergiu-sa',
    },
    {
      code: 'CH-03',
      label: 'LINKEDIN',
      handle: '/in/sergiu-sarbu',
      href: 'https://www.linkedin.com/in/sergiu-sarbu-39154226a',
    },
  ],
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
  frames: ['/assets/projects/tv-portfolio/og-preview.webp'],
};
