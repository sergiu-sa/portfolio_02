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
  { k: 'DISCIPLINE', v: 'FED ' },
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
        caption:
          'The contact page, a validated form built with React Hook Form and Zod.',
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

// Archive — extra projects beyond the required three.
export const archive = [
  {
    id: 'filmood',
    ref: 'E-04',
    codename: 'FILMOOD',
    project: 'AGENCY 2',
    year: '2026',
    role: 'SOLO REBUILD',
    status: 'LIVE',
    summary:
      'A film picker that starts from a mood, not a catalogue. Pick a feeling and get matching films, solo or as a group vote.',
    tags: ['NEXT.JS', 'SUPABASE', 'REALTIME', 'TMDB'],
    heroImg: '/assets/projects/filmood/fig1.webp',
    plateImg: '/assets/projects/filmood/fig1.webp',
    live: 'https://filmood-pi.vercel.app/',
    repo: 'https://github.com/sergiu-sa/filmood',
    commit: 'https://github.com/sergiu-sa/filmood/commits/main/',
    caption:
      'Surveillance plate E-04. The dashboard: pick a mood, get a film, alone or with a group.',
    exhibits: [
      {
        src: '/assets/projects/filmood/fig2.webp',
        caption:
          'Film detail. Cast, Norwegian streaming providers, trailer and synopsis pulled from TMDB.',
      },
      {
        src: '/assets/projects/filmood/fig3.webp',
        caption:
          'Group results. Votes sort into Perfect Match, Strong Contenders and Not Tonight, with one top pick.',
      },
      {
        src: '/assets/projects/filmood/fig4.webp',
        caption:
          'The same flow on a phone, where the panels drop to a bottom sheet.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/filmood/amend1.webp',
        label: 'ORIGINAL',
      },
      after: {
        src: '/assets/projects/filmood/amend2.webp',
        label: 'REDESIGN',
      },
      caption:
        'The browse and discovery page, before and after the rebuild. The first version on the left, the reworked layout on the right.',
    },
    brief: [
      'Filmood is a film discovery app built on Next.js 16, React 19 and TypeScript, with Supabase for auth and data and TMDB for everything about the films. Instead of asking what genre you want, it asks how you want to feel. You pick one or more moods, it returns a curated list, and you can refine by runtime, language or excluded genres. Search covers titles, actors and directors, and every film opens to its cast, Norwegian streaming providers and trailer. Most of it works without an account; only the watchlist asks you to sign in.',
      'The group session is the bigger piece of engineering. One person creates a session and shares a six-character code, others join with just a nickname, and everyone picks their moods in private. The app merges those into one fifteen-film deck the group swipes through together, with live updates over Supabase Realtime and a short polling fallback for shaky connections. Votes are tallied into tiers and the app names a single top pick, so a table of people lands on something without anyone having to argue for it.',
    ],
    amendment:
      'Filmood began as a three-person team project in a separate repo. This is the personal rebuild, redone on my own and improved as I went: the group-session backend, the dashboard, the dual-theme design system and the tests. A later cleanup pass moved shared logic into helpers and hooks and dropped a large block of duplicated code.',
  },
  {
    id: 'holidaze',
    ref: 'E-05',
    codename: 'HOLIDAZE',
    project: 'PROJECT EXAM 2',
    year: '2026',
    role: 'SOLO BUILD',
    status: 'LIVE',
    summary:
      'An accommodation booking site on the Noroff API, styled as a printed travel magazine. Browse venues, book stays, list your own.',
    tags: ['TYPESCRIPT', 'REACT', 'ZOD', 'API'],
    heroImg: '/assets/projects/holidaze/fig1.webp',
    plateImg: '/assets/projects/holidaze/fig1.webp',
    live: 'https://holidaze-black.vercel.app/',
    repo: 'https://github.com/sergiu-sa/holidaze_pe',
    commit: 'https://github.com/sergiu-sa/holidaze_pe/commits/main/',
    caption:
      'Surveillance plate E-05. The cover: stay somewhere particular, booked direct.',
    exhibits: [
      {
        src: '/assets/projects/holidaze/fig2.webp',
        caption:
          'The collection. Filter venues by place, dates, guests and amenities, then book direct.',
      },
      {
        src: '/assets/projects/holidaze/fig3.webp',
        caption:
          'The profile. A venue manager tracks their bookings and lists, edits or removes their own venues.',
      },
      {
        src: '/assets/projects/holidaze/fig4.webp',
        caption: 'The same magazine on a phone: home, venues and profile.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/holidaze/amend2.webp',
        label: 'THE ATLAS',
      },
      after: {
        src: '/assets/projects/holidaze/amend1.webp',
        label: 'CORRESPONDENCE',
      },
      caption:
        'Two set-pieces around the booking core: the atlas plots the whole collection on a typographic world map, and the correspondence page styles the contact desk as a column of letters.',
    },
    brief: [
      'Holidaze is the front end for an accommodation booking site built against the Noroff API v2, my Project Exam 2. It serves three audiences from one interface: guests browse and search venues and check availability, customers book stays and manage their bookings and profile, and venue managers create, edit and delete their own venues and track the bookings on them. It is built in React 18 and TypeScript on Vite, with React Router for the routes and Tailwind for the styling. There is no state library; each feature owns a small hook over native fetch, with a sessionStorage cache and stale requests aborted.',
      'The look is editorial brutalism: a printed-page hero, a calendar that doubles as a layout grid, venue cards set like contact-sheet specimens. Three typefaces each do one job, there is no rounded corner anywhere, and cinnabar, lapis and saffron appear only as accents. Every Noroff response is validated with Zod before it reaches a component, and the same schemas generate the TypeScript types. Accessibility was held to the WCAG 2.1 AA floor: visible focus rings, real buttons inside the calendars, native dialogs for focus trapping, and prefers-reduced-motion collapsing every transition.',
    ],
    amendment:
      'This is the exam submission exactly as filed. Assessment feedback has not come back yet, so nothing has been changed since hand-in. The record sits sealed pending review; the commit history is the evidence of the work.',
  },
  {
    id: 'adventure',
    ref: 'E-06',
    codename: 'ADVENTURE',
    project: 'SEMESTER PROJECT 1',
    year: '2025',
    role: 'SOLO BUILD',
    status: 'LIVE',
    summary:
      'A site for a fictional extreme-hiking outfitter, hand-built in HTML, CSS and vanilla JavaScript. No framework, no build step.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT', 'A11Y'],
    heroImg: '/assets/projects/adventure_trails/FIG1_home.webp',
    plateImg: '/assets/projects/adventure_trails/FIG1_home.webp',
    live: 'https://adventuretrailshikes.netlify.app/',
    repo: 'https://github.com/sergiu-sa/adventure_trails_hikes',
    commit: 'https://github.com/sergiu-sa/adventure_trails_hikes/commits/main/',
    caption:
      'Surveillance plate E-06. The home hero: explore the world on foot, treks blended with cultural immersion.',
    exhibits: [
      {
        src: '/assets/projects/adventure_trails/FIG2_hikes.webp',
        caption:
          'The expeditions. Nine routes across six regions, each with distance, max altitude, days and a difficulty grade.',
      },
      {
        src: '/assets/projects/adventure_trails/FIG3_gallery.webp',
        caption:
          'The gallery. Eighteen captioned frames from the trail, filtered by category with a CSS-only control.',
      },
      {
        src: '/assets/projects/adventure_trails/fig4.webp',
        caption: 'The same site on a phone: home, about, hikes and contact.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/adventure_trails/amend1.webp',
        label: 'ORIGINAL',
      },
      after: {
        src: '/assets/projects/adventure_trails/FIG1_home.webp',
        label: 'REDESIGN',
      },
      caption:
        'The home page before and after the resit. The first version was a standard responsive build; the rebuild moved it to the editorial, cartographic system.',
    },
    brief: [
      'Adventure Trails Hikes is a site for a fictional extreme-hiking outfitter, my first semester project at Noroff. The original brief was HTML and CSS only. For the resit I rebuilt it: a full redesign plus vanilla JavaScript for the page loader, page transitions, a lightbox gallery, scroll progress and lazy-loading, with the hike and gallery filters done purely in CSS through sibling selectors. There is no framework and no build step, and the CSS is split into modular files for tokens, base, layout, components and utilities.',
      'The design is a cartographic system. A seven-colour palette taken from topographic maps gives every colour one job: forest green leads the actions, navy marks the featured expedition, and a single marker red is reserved for map pins, stamps, the hardest difficulty grade and error states. Type is Archivo Black for the numbered display headings, Geist for body and JetBrains Mono for spec sheets and coordinates. Accessibility was part of the brief: a skip link, visible focus rings, ARIA roles, a proper heading order, and prefers-reduced-motion collapsing the transitions.',
    ],
    amendment:
      'The original was an HTML and CSS submission in 2025. The resit, a run of commits from January to April 2026, is the version on file: the cartographic redesign and the JavaScript layer of loader, transitions, lightbox, and scroll and lazy-load behaviour. The before and after above is that change.',
  },
  {
    id: 'kidbank',
    ref: 'E-07',
    codename: 'KIDBANK',
    project: 'AGENCY 1',
    year: '2025',
    role: 'TEAM BUILD',
    status: 'LIVE',
    summary:
      'A money app for teenagers. Track a budget, earn from chores, save toward goals, and scan barcodes that block age-restricted buys.',
    tags: ['JAVASCRIPT', 'VITE', 'API', 'NETLIFY'],
    heroImg: '/assets/projects/kid_bank/fig1.webp',
    plateImg: '/assets/projects/kid_bank/fig1.webp',
    live: 'https://k1dbank.netlify.app/',
    repo: 'https://github.com/sergiu-sa/kid_bank_',
    commit: 'https://github.com/sergiu-sa/kid_bank_/commits/main/',
    caption:
      'Surveillance plate E-07. The dashboard: balance, recent moves, and where the month goes.',
    exhibits: [
      {
        src: '/assets/projects/kid_bank/fig2.webp',
        caption:
          'Three habits in one view: a spending budget, chores that pay out, and savings goals to stash toward.',
      },
      {
        src: '/assets/projects/kid_bank/fig3.webp',
        caption:
          'The in-app shop. Browse a store inside KidBank, where an age check gates what an underage account can buy.',
      },
      {
        src: '/assets/projects/kid_bank/fig4.webp',
        caption:
          'The same app on a phone: balance and activity, budgets and chores, savings and the shop.',
      },
    ],
    compare: {
      before: {
        src: '/assets/projects/kid_bank/amend1.webp',
        label: 'ORIGINAL',
      },
      after: {
        src: '/assets/projects/kid_bank/fig1.webp',
        label: 'REDESIGN',
      },
      caption:
        'The home dashboard before and after the rework: the original team build, then the version I carried on improving on my own.',
    },
    brief: [
      'KidBank is a money-management app for teenagers, built as a first-year Agency 1 team project. The idea is to teach money habits through real use: a balance and transaction history, a budget split across categories, chores that pay out when they are done, and savings goals to stash toward. It also has a barcode scanner. A teenager scans a product, the app looks it up on the Open Food Facts API, and age-restricted items are blocked before they can be bought.',
      'It is built in HTML, CSS and JavaScript on Vite, with Node on Netlify Functions handling the parts the browser cannot. My work on the team was the scanner and the shop: the barcode feature, a serverless proxy that gets around the API CORS limits, the navigation, the online-shop layout and the initial Vite setup. The scanner uses the native BarcodeDetector where it exists and falls back to a ZXing polyfill on Firefox and older Safari. The original team repo is gone now; the version on file is the one I kept extending on my own afterwards.',
    ],
    amendment:
      'This started as the Agency 1 team build. After the assignment I carried it forward on my own. The original team repo is no longer up, so every commit on this one, from June 2025 to May 2026, is mine, including the redesign in the before and after above.',
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
