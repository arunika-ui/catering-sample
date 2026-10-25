/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the only file you need to edit to re-brand this website.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Everything a visitor reads (name, contact details, menus, occasions,
 *  photos, colours) comes from here.
 *
 *  Values marked  ⚠ REPLACE  are sample content. Swap them for the real
 *  caterer's details before showing the site to the owner.
 *
 *  Text inside *asterisks* is rendered in italic accent type.
 *  Photos live in /public/images — see README.md for the full list.
 *  A missing photo shows a labelled placeholder, so nothing ever breaks.
 *
 *  Never add awards, numbers, press mentions or reviews that the business
 *  can't back up. Empty lists simply hide their section.
 */

export type Occasion = {
  id: string;
  title: string;
  /** Short line under the title */
  blurb: string;
  /** 2–4 specifics shown when the occasion is open */
  details: string[];
  image: string;
  alt: string;
};

export type Menu = {
  id: string;
  label: string;
  intro: string;
  image: string;
  alt: string;
  groups: { title: string; items: string[] }[];
};

export type Station = { name: string; note: string; image?: string; alt?: string };

export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  /** Controls the tile shape in the gallery grid */
  shape?: "tall" | "wide" | "big";
};

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Wedding, Chhatarpur · Google review" */
  context: string;
};

export const site = {
  /* ── Identity ─────────────────────────────────────────────── */
  name: "Saffron Table", // ⚠ REPLACE
  /** Shown under the logo in the footer and in search results */
  descriptor: "Wedding & event catering", // ⚠ REPLACE
  city: "Delhi NCR", // ⚠ REPLACE
  /** Leave empty ("") to hide. Only use a year the owner confirms. */
  establishedYear: "",

  /* ── Contact ──────────────────────────────────────────────── */
  phoneDisplay: "+91 98XXX XXXXX", // ⚠ REPLACE
  phoneHref: "+919800000000", // ⚠ REPLACE (digits only, with country code)
  /** WhatsApp number, digits only with country code, no + */
  whatsapp: "919800000000", // ⚠ REPLACE
  email: "hello@yourcaterer.in", // ⚠ REPLACE
  address: ["Kitchen & office address line 1", "New Delhi 110000"], // ⚠ REPLACE
  /** Google Maps link for the kitchen/office. Leave "" to hide. */
  mapUrl: "",
  /** Only add profiles that exist. Empty list hides the icons. */
  social: [
    // { label: "Instagram", href: "https://www.instagram.com/handle/" },
    // { label: "Facebook", href: "https://www.facebook.com/page/" },
    // { label: "WedMeGood", href: "https://www.wedmegood.com/profile/..." },
  ] as { label: string; href: string }[],

  /* ── Search & sharing ─────────────────────────────────────── */
  seo: {
    title: "Saffron Table — Wedding & Event Catering in Delhi NCR", // ⚠ REPLACE
    description:
      "Wedding, corporate and private event catering across Delhi NCR. Menus designed around your functions, live counters, full service staff and setup.", // ⚠ REPLACE
    /** Final website address, used for share previews */
    url: "https://www.example.com", // ⚠ REPLACE
  },

  /* ── Colours ──────────────────────────────────────────────── *
   * ink: dark text & dark sections · paper: page background
   * accent: highlights (keep it dark enough to read on paper)  */
  theme: {
    ink: "#1d1712",
    paper: "#f6f0e6",
    paperDeep: "#ebe1d0",
    accent: "#a5641f",
    accentLight: "#d9a35b",
  },

  /* ── Hero ─────────────────────────────────────────────────── */
  hero: {
    eyebrow: "Catering for weddings & celebrations",
    /** One string per line. *asterisks* = italic accent */
    title: ["The food your guests", "will *still talk about.*"],
    text: "From an intimate mehendi lunch to a reception for a thousand, we design the menu, run the counters and serve every plate — so you can be a guest at your own celebration.",
    image: "/images/hero.jpg",
    alt: "A long banquet table laid for a wedding dinner under a white marquee",
    /** Small facts in the strip at the bottom of the hero */
    strip: ["Weddings", "Corporate", "Private parties", "Live counters"],
  },

  /* ── Introduction ─────────────────────────────────────────── */
  intro: {
    eyebrow: "Our kitchen",
    statement:
      "Every celebration has its own *taste* — a family recipe, a city's street food, a dessert someone's grandmother made. We start there.",
    paragraphs: [
      "We are a full-service catering team based in Delhi NCR. Menus are designed function by function, cooked fresh for each event and served by our own staff — with crockery, counters, décor for the food and an on-site lead who stays until the last guest leaves.",
      "Whether you want a classic North Indian spread, a pan-Asian cocktail evening or a menu that mixes both, you'll taste it before you finalise it.",
    ],
    imageLarge: "/images/story-1.jpg",
    imageLargeAlt: "A brass thali of mithai garnished with marigolds",
    imageSmall: "/images/story-2.jpg",
    imageSmallAlt: "Fresh jalebi served with saffron rabri",
    /** Only add real, owner-confirmed numbers. Empty list hides the row. */
    stats: [
      // { value: "12+", label: "Years of catering" },
      // { value: "500+", label: "Events served" },
    ] as { value: string; label: string }[],
  },

  /* ── Occasions ────────────────────────────────────────────── */
  occasions: [
    {
      id: "weddings",
      title: "Weddings",
      blurb: "Mehendi to reception — a different menu and mood for every function.",
      details: [
        "Separate menus for each function, so nothing repeats",
        "Live counters, plated or buffet service",
        "Family-style meals for the wedding-house days",
      ],
      image: "/images/occasion-weddings.jpg",
      alt: "A seaside wedding mandap draped in marigold and rajnigandha strings",
    },
    {
      id: "sangeet",
      title: "Sangeet & cocktail evenings",
      blurb: "Food built for a party that never sits down.",
      details: [
        "Passed starters and small plates",
        "Grill, wok and chaat stations",
        "Late-night snacks for the dance floor",
      ],
      image: "/images/occasion-sangeet.jpg",
      alt: "A pink lounge set up for a sangeet under a striped canopy",
    },
    {
      id: "corporate",
      title: "Corporate events",
      blurb: "Annual days, offsites, launches and conferences — on schedule.",
      details: [
        "Working lunches to gala dinners",
        "Fixed timelines for breaks and sessions",
        "GST invoicing and a single point of contact",
      ],
      image: "/images/occasion-corporate.jpg",
      alt: "Banquet tables dressed in ivory and gold for an evening dinner",
    },
    {
      id: "private",
      title: "Home & private parties",
      blurb: "Birthdays, anniversaries, poojas — the kitchen comes to you.",
      details: [
        "Smaller guest counts welcome",
        "Satvik and Jain menus on request",
        "Staff, crockery and cleanup included",
      ],
      image: "/images/occasion-private.jpg",
      alt: "Round dinner tables beneath chandeliers and hanging greenery",
    },
    {
      id: "outdoor",
      title: "Farmhouse & outdoor",
      blurb: "Lawns, farmhouses and open-air venues, fully set up.",
      details: [
        "Field kitchen and counter setup",
        "Menus planned for the season and the weather",
        "Coordination with your venue and décorator",
      ],
      image: "/images/occasion-outdoor.jpg",
      alt: "A floral mandap and rows of seating on a garden lawn",
    },
  ] satisfies Occasion[],

  /* ── Menus ────────────────────────────────────────────────── *
   * Sample dishes. Replace with the caterer's real menu.       */
  menus: [
    {
      id: "indian",
      label: "Indian",
      intro: "Regional cooking done properly — slow dals, real tandoors, breads made to order.",
      image: "/images/menu-indian.jpg",
      alt: "A food table dressed with marigolds and serving platters",
      groups: [
        { title: "From the tandoor", items: ["Galouti kebab", "Paneer tikka achari", "Murgh malai tikka", "Tandoori jhinga"] },
        { title: "Curries & dals", items: ["Dal makhani", "Nalli nihari", "Paneer lababdar", "Rajasthani gatte ki sabzi"] },
        { title: "Rice & breads", items: ["Awadhi biryani", "Jeera pulao", "Butter naan & lachha paratha", "Missi roti"] },
      ],
    },
    {
      id: "global",
      label: "Global",
      intro: "Pan-Asian, Italian, Lebanese and Continental — cooked by chefs who specialise in them.",
      image: "/images/menu-global.jpg",
      alt: "Trays of canapés with tomato, mozzarella and olives",
      groups: [
        { title: "Pan-Asian", items: ["Crystal dimsum", "Thai green curry", "Hakka noodles", "Sushi display"] },
        { title: "Mediterranean", items: ["Mezze platter", "Falafel with tahini", "Chicken shawarma", "Fattoush"] },
        { title: "Italian", items: ["Wood-fired pizza", "Risotto ai funghi", "Penne arrabbiata", "Bruschetta"] },
      ],
    },
    {
      id: "desserts",
      label: "Desserts",
      intro: "Halwai classics alongside a patisserie table.",
      image: "/images/menu-desserts.jpg",
      alt: "A dessert counter with strawberry tarts, chocolates and fresh flowers",
      groups: [
        { title: "Halwai", items: ["Jalebi with rabri", "Moong dal halwa", "Shahi tukda", "Kesar kulfi"] },
        { title: "Patisserie", items: ["Tiramisu cups", "Baked cheesecake", "Chocolate mousse", "Macarons"] },
      ],
    },
    {
      id: "beverages",
      label: "Beverages",
      intro: "Welcome drinks, mocktail bars and a chai counter that runs all night.",
      image: "/images/menu-beverages.jpg",
      alt: "Tables set with glassware and white flowers under a garden marquee",
      groups: [
        { title: "Welcome", items: ["Aam panna", "Kokum sherbet", "Rose & litchi cooler", "Thandai"] },
        { title: "Through the night", items: ["Mocktail bar", "Masala chai counter", "Filter coffee", "Fresh juice station"] },
      ],
    },
  ] satisfies Menu[],
  /** Line under the menus. Leave "" to hide. */
  menuNote: "Satvik, Jain and vegan menus on request.", // ⚠ confirm with the caterer

  /* ── Live counters ────────────────────────────────────────── */
  stations: [
    { name: "Chaat", note: "Gol gappe, bhalla papdi, aloo tikki" },
    { name: "Tandoor & kebab", note: "Skewers off the coals, rumali roti" },
    { name: "Wok & noodles", note: "Tossed to order on high flame" },
    { name: "Dimsum bar", note: "Steamed in bamboo baskets" },
    { name: "Pasta", note: "Your choice of sauce, made in front of you" },
    { name: "Shawarma", note: "Rotisserie-carved, wrapped fresh" },
    { name: "Jalebi & rabri", note: "Fried fresh, served hot" },
  ] satisfies Station[],
  /** One photo shown beside the live counters list */
  stationsImage: "/images/stations.jpg",
  stationsImageAlt: "An outdoor buffet counter beneath paper lanterns",

  /* ── Gallery ──────────────────────────────────────────────── *
   * Categories are built automatically from the items below.   */
  gallery: [
    { src: "/images/gallery-01.jpg", alt: "Guests under a glass marquee as a couple takes their vows", category: "Weddings", shape: "big" },
    { src: "/images/menu-global.jpg", alt: "Trays of canapés", category: "Food" },
    { src: "/images/gallery-02.jpg", alt: "A temple-style mandap at dusk", category: "Weddings", shape: "tall" },
    { src: "/images/story-2.jpg", alt: "Jalebi with saffron rabri", category: "Food" },
    { src: "/images/occasion-sangeet.jpg", alt: "A sangeet lounge under a striped canopy", category: "Setups", shape: "wide" },
    { src: "/images/menu-desserts.jpg", alt: "A dessert counter with strawberry tarts", category: "Food" },
    { src: "/images/gallery-04.jpg", alt: "Ceremony seating facing a floral mandap", category: "Weddings" },
    { src: "/images/gallery-03.jpg", alt: "A floral swing set beside the sea", category: "Setups", shape: "tall" },
    { src: "/images/menu-indian.jpg", alt: "A food table dressed with marigolds", category: "Food" },
    { src: "/images/stations.jpg", alt: "An outdoor buffet beneath paper lanterns", category: "Setups", shape: "wide" },
    { src: "/images/story-1.jpg", alt: "A thali of mithai with marigolds", category: "Food" },
    { src: "/images/menu-beverages.jpg", alt: "Tables under a garden marquee", category: "Setups", shape: "wide" },
  ] satisfies GalleryItem[],

  galleryEyebrow: "Moments & setups", // use "From recent events" once these are the caterer's own photos
  /* ── How it works ─────────────────────────────────────────── *
   * Confirm each step matches how the caterer actually works. */
  process: [
    { title: "A first conversation", text: "Tell us the date, venue, guest count and the food you love. We'll ask about every function, not just the big one." },
    { title: "Menu & tasting", text: "We draft menus around your functions and your budget, then invite you to taste before anything is final." },
    { title: "A clear quote", text: "Per-plate pricing with staff, crockery, counters and setup spelled out — no surprises on the final bill." },
    { title: "On the day", text: "Our team arrives early, sets up, serves and clears. One event lead is your contact from first guest to last." },
  ],

  /* ── Reviews ──────────────────────────────────────────────── *
   * Paste real reviews only (Google, WedMeGood, Justdial…),
   * with the source in `context`. Empty list hides the section. */
  testimonials: [
    // { quote: "…", name: "First L.", context: "Wedding, Gurugram · Google review" },
  ] as Testimonial[],

  /* ── Where you cater ──────────────────────────────────────── */
  areas: ["Delhi", "Gurugram", "Noida", "Greater Noida", "Faridabad", "Ghaziabad"], // ⚠ REPLACE
  areasNote: "Destination and out-of-city events on request.",

  /* ── Enquiry form ─────────────────────────────────────────── */
  eventTypes: ["Wedding", "Pre-wedding / Sangeet", "Corporate event", "Birthday / Anniversary", "House party / Pooja", "Other"],
};

export type Site = typeof site;
