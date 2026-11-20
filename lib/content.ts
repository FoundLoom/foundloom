/**
 * Single source of truth for every word on the page.
 *
 * PAGE ROLE
 * ---------
 * This is a FoundLoom company page carrying TWO products of equal weight:
 * PocketPair and AI Inventory. It is not a single-offer landing page.
 * PocketPair is presented first because its waitlist is the only
 * time-sensitive action on the page, not because it outranks AI Inventory.
 *
 * PLACEHOLDER POLICY
 * ------------------
 * Anything wrapped in {{double braces}} is a fact FoundLoom has not confirmed.
 * It renders as a visibly marked placeholder chip so it can never be mistaken
 * for a real claim. Replace the string and the chip styling disappears on its
 * own. Do not invent values here: no prices, no user counts, no testimonials.
 */

export const site = {
  name: "FoundLoom",
  url: "https://foundloom.com",
  title: "FoundLoom | Event Networking App and AI Model Directory",
  description:
    "FoundLoom builds two web tools: PocketPair, which saves the people you meet at events with the event attached, and AI Inventory, for comparing AI models.",
} as const;

/* ========================================================================
 * ROUTES — real pages, not anchors
 * ===================================================================== */

/** PocketPair waitlist, hosted externally. Every "join the waitlist" CTA uses it. */
export const pocketpairWaitlistUrl = "https://foundloom.framer.ai/";

export const routes = {
  home: "/",
  products: "/products",
  pocketpair: "/pocketpair",
  aiInventory: "/ai-inventory",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
} as const;

export type NavLink = {
  label: string;
  href: string;
  /** Extra path prefixes that should mark this link as the current section. */
  match?: readonly string[];
};

/**
 * Company navigation: Home, Products, About, Contact.
 *
 * Products is a plain link, not a dropdown. Tapping it goes straight to the
 * catalogue and the products are shown there, which is one decision for the
 * visitor instead of two and behaves identically on a phone and a mouse.
 */
export const nav: {
  links: readonly NavLink[];
  cta: { label: string; href: string };
} = {
  links: [
    { label: "Home", href: routes.home },
    {
      label: "Products",
      href: routes.products,
      match: [routes.products, routes.pocketpair, routes.aiInventory],
    },
    { label: "About", href: routes.about },
  ],
  cta: { label: "Contact", href: routes.contact },
};

/* ========================================================================
 * CONTACT
 * ===================================================================== */

export const contact = {
  eyebrow: "Contact",
  heading: "Tell us what you are working on.",
  body: "Questions about either product, press, partnerships, or something we have not thought of. One of us reads every message.",
  /** Not confirmed, so it renders as a marked placeholder, never as fact. */
  email: "foundloomlabs@gmail.com",
  responseNote: "1 to 2 hours",
  form: {
    name: "Your name",
    email: "Email address",
    subject: "What is this about?",
    subjects: [
      "PocketPair",
      "AI Inventory",
      "Press or partnerships",
      "Something else",
    ],
    message: "Message",
    submit: "Send message",
  },
} as const;

/* ========================================================================
 * COMPANY HERO
 * ===================================================================== */

export const hero = {
  /**
   * The pill above the headline. The reference design puts social proof here
   * — stacked member avatars and a head count. FoundLoom has no confirmable
   * user count and no real members to show, so this slot carries a product
   * status instead, which is true and equally time-sensitive.
   */
  kicker: {
    text: "PocketPair waitlist is now open",
    action: "Join us",
    href: routes.pocketpair,
  },
  headingLineOne: "Keep what matters.",
  /** Line two renders in the accent color. */
  headingLineTwo: "Find it again later.",
  /** One sentence under the headline. The headline is the brand line; this
   *  is where a visitor, and a search engine, learns what FoundLoom makes. */
  subheading:
    "Two focused web tools from FoundLoom: PocketPair, an event networking app that remembers where you met people, and AI Inventory, a directory for comparing AI models.",
  /* One filled CTA and one outlined. Different destinations for different
     people, so they never compete for the same conversion. */
  primaryCta: { label: "Join the waitlist", href: pocketpairWaitlistUrl },
  secondaryCta: { label: "Explore AI Inventory", href: routes.aiInventory },
  /**
   * The bar across the bottom of the hero. The reference fills this with
   * metrics — members, money invested, deals closed, years trading. Every
   * one of those would be invented here, so these four cells describe how
   * the products work instead. Each is confirmed: two products, one scan to
   * save a connection, one folder per event, one newsletter a week.
   *
   * If FoundLoom confirms real numbers later, they belong here. Until then
   * nothing in this bar counts anything.
   */
  facts: [
    { value: "Two", label: "Products, built in house" },
    { value: "One scan", label: "Saves a connection" },
    { value: "One folder", label: "For every event" },
    { value: "Weekly", label: "AI Inventory newsletter" },
  ],
} as const;

/* ========================================================================
 * PRODUCTS OVERVIEW — both products as cards, before either deep dive
 * ===================================================================== */

export const productsOverview = {
  eyebrow: "Our products",
  heading: "Built by us. Built to be used every day.",
  body: "Two tools, each doing one job properly. Pick the one you need, or use both.",
  cards: [
    {
      name: "PocketPair",
      category: "Event networking",
      status: "Waitlist now open",
      live: false,
      body: "Scan a QR when you meet someone at a conference or meetup. The connection is saved with the event attached, in that event's own folder.",
      points: ["One scan to save", "One folder per event", "Searchable over time"],
      href: routes.pocketpair,
      cta: "See how it works",
    },
    {
      name: "AI Inventory",
      category: "AI model discovery",
      status: "Available now",
      live: false,
      body: "Discover, compare and explore AI models and large language models, with AI news, plain language terminology, and a weekly newsletter.",
      points: ["Compare models", "AI news", "Weekly newsletter"],
      href: routes.aiInventory,
      cta: "See what is inside",
    },
  ],
  seeAll: { label: "Compare both products", href: routes.products },
} as const;

/* ========================================================================
 * PRODUCTS PAGE — the catalogue route, /products
 *
 * This page carries content that exists nowhere else on the site: the two
 * products described side by side, and an honest comparison of which one a
 * visitor actually needs. It deliberately does not repeat the FAQ, because
 * those answers already live on each product's own page and duplicating them
 * would make two of FoundLoom's pages compete for the same queries.
 * ===================================================================== */

export const productsPage = {
  eyebrow: "Our products",
  headingLineOne: "PocketPair and AI Inventory,",
  headingLineTwo: "side by side.",
  body: "FoundLoom builds focused web tools rather than one product that tries to do everything. Here is everything we have shipped and everything we are opening next, with enough detail to tell which one you need.",
  items: [
    {
      name: "PocketPair",
      category: "Event networking",
      status: "Waitlist now open",
      live: false,
      href: routes.pocketpair,
      cta: "Explore PocketPair",
      summary:
        "A QR scan networking tool for conferences, meetups and campus events. Scan someone's code when you meet them and the connection is saved with the event attached, in that event's own folder.",
      features: [
        {
          icon: "QrCode",
          title: "One scan to save",
          body: "The whole interaction happens while you are still talking. Nothing to type, nothing to tag afterwards.",
        },
        {
          icon: "FolderSimple",
          title: "One folder per event",
          body: "Everyone from a single gathering stays together, while search runs across your whole network at once.",
        },
        {
          icon: "ChartLineUp",
          title: "Context that survives",
          body: "Open a contact six months later and the event you met at is still sitting there with the name.",
        },
      ],
    },
    {
      name: "AI Inventory",
      category: "AI model discovery",
      status: "Available now",
      live: false,
      href: routes.aiInventory,
      cta: "See what is inside",
      summary:
        "A web app for discovering, comparing and exploring AI models and large language models, with AI news, plain language explanations of the terminology, and a weekly newsletter.",
      features: [
        {
          icon: "MagnifyingGlass",
          title: "Discover and compare",
          body: "Browse models side by side, so choosing between them is something you can see rather than guess at.",
        },
        {
          icon: "Newspaper",
          title: "News and terminology",
          body: "What changed this week in one place, and the jargon written out in plain language.",
        },
        {
          icon: "EnvelopeSimple",
          title: "Weekly newsletter",
          body: "The week collected into one email, for when you would rather not check a site at all.",
        },
      ],
    },
  ],
  comparison: {
    eyebrow: "Side by side",
    heading: "Which one you need",
    body: "The two products share nothing but the company that builds them. This is the short version of the difference.",
    columns: ["PocketPair", "AI Inventory"],
    rows: [
      {
        label: "What it does",
        values: [
          "Saves the people you meet, filed under the event where you met them",
          "Helps you discover and compare AI models and large language models",
        ],
      },
      {
        label: "Reach for it when",
        values: [
          "You are walking into a conference, meetup or campus event",
          "You are choosing between models, or catching up on what changed",
        ],
      },
      {
        label: "Status today",
        values: ["Waitlist now open", "Available now"],
      },
      {
        label: "How you get in",
        values: ["Join the waitlist for one email at launch", "Open the website, no waitlist"],
      },
      {
        label: "Needs the other one",
        values: ["No. Separate product, separate account", "No. Separate product, separate account"],
      },
    ],
  },
} as const;

/* ========================================================================
 * COMPANY STATEMENT
 * ===================================================================== */

export const about = {
  eyebrow: "About FoundLoom",
  heading: "Small tools, built properly.",
  body: "FoundLoom builds focused web tools rather than one product that tries to do everything. Each one starts from a problem we kept running into, and stops once it solves it.",
  /** The real company story has to come from FoundLoom, so it is not invented. */
  story: "{{about_foundloom}}",
  points: [
    {
      icon: "Target",
      title: "One job each",
      body: "A product does the thing it is named after. No feature list padded out to look impressive.",
    },
    {
      icon: "Lightning",
      title: "Fast to pick up",
      body: "If a tool needs a tutorial before it is useful, the tool is wrong, not the person using it.",
    },
    {
      icon: "Compass",
      title: "Built in the open",
      body: "Products ship when they work. PocketPair runs a waitlist so the first group shapes it.",
    },
  ],
  /**
   * Current state of the company, stated only from what is confirmed: one
   * product available now, one opening to a waitlist. No dates, no
   * headcount, no funding, because none of that has been confirmed.
   */
  now: {
    eyebrow: "Where things stand",
    heading: "What we are working on right now",
    body: "Two products, at two different stages. This is the honest status of both, and it is the same status we would give you in an email.",
    items: [
      {
        name: "PocketPair",
        state: "Opening to a waitlist",
        body: "The waitlist is open and the first group will shape what ships. Joining costs nothing and gets you one email when it opens.",
        href: pocketpairWaitlistUrl,
        linkLabel: "Join the waitlist",
      },
      {
        name: "AI Inventory",
        state: "Available now",
        body: "The app is running and in use. It covers model discovery and comparison, AI news, terminology, and a weekly newsletter.",
        href: routes.aiInventory,
        linkLabel: "See what is inside",
      },
    ],
  },
} as const;

/* ========================================================================
 * CONTACT — what people actually write in about
 * ===================================================================== */

export const contactReasons = {
  eyebrow: "Before you write",
  heading: "What we can help with",
  body: "Four kinds of message reach us, and they all reach the same inbox. Saying which one yours is gets you a faster answer.",
  items: [
    {
      icon: "QrCode",
      title: "PocketPair",
      body: "Waitlist questions, how the event folders work, or anything about scanning and saving connections.",
    },
    {
      icon: "MagnifyingGlass",
      title: "AI Inventory",
      body: "The models we cover, the weekly newsletter, or a correction you have spotted.",
    },
    {
      icon: "Handshake",
      title: "Press and partnerships",
      body: "Writing about either product, running an event you think PocketPair belongs at, or working together.",
    },
    {
      icon: "PaperPlaneTilt",
      title: "Something else",
      body: "Feedback, an idea, a bug, or a question that does not fit any of the above. It still gets read.",
    },
  ],
} as const;

/* ========================================================================
 * PRODUCT — POCKETPAIR
 * ===================================================================== */

export const pocketpair = {
  eyebrow: "Event networking",
  name: "PocketPair",
  status: "Waitlist now open",
  heading: "The people you meet should not disappear.",
  body: "PocketPair is an event networking app for conferences, meetups and campus events. One QR scan saves who you met and where, and keeps every contact in that event's folder until you want to reconnect.",
  waitlistReassurance: "No spam. One email when PocketPair opens.",
} as const;

export const problem = {
  eyebrow: "The problem",
  heading: "You met forty people. You remember four.",
  body: "A conference ends and the names blur together. Was the person building the logistics tool at the Bengaluru summit, or the Mumbai meetup? The contact sits in your phone with no event, no context, and no reason to open it again. PocketPair attaches the where at the moment you scan, so the context is never something you have to remember.",
  before: {
    title: "Without PocketPair",
    items: [
      "A camera roll of business cards you never typed up",
      "Contacts saved as a first name and nothing else",
      "No way to tell which event someone came from",
      "A follow up message you never send because you cannot place them",
    ],
  },
  after: {
    title: "With PocketPair",
    items: [
      "One scan, saved before either of you leaves the room",
      "The event attached automatically, every time",
      "Every person from one gathering in a single folder",
      "A follow up that opens with where you actually met",
    ],
  },
} as const;

export const benefits = {
  eyebrow: "What PocketPair does",
  heading: "Built for the way you actually meet people",
  subheading:
    "Four things PocketPair does from the first scan onward, written for conferences, meetups and campus events.",
  items: [
    {
      icon: "QrCode",
      title: "Where you met, not just who",
      body: "The event is attached the instant you scan, so context is captured rather than remembered. Open a contact six months later and the gathering is still sitting right there with the name.",
    },
    {
      icon: "FolderSimple",
      title: "One folder per event",
      body: "Walk out of a tech summit with that entire room in a single place. Each event stays together as its own folder while your full network carries forward across all of them.",
    },
    {
      icon: "Handshake",
      title: "A thirty second hello still counts",
      body: "A familiar face, a quick exchange at the coffee table, a short conversation in a hallway. Save the connection while you are both still standing there, before the moment passes.",
    },
    {
      icon: "ChartLineUp",
      title: "Your network compounds",
      body: "One event becomes many. Look back across every gathering you have attended and watch the people you met turn into a lasting, searchable network rather than a list of strangers.",
    },
  ],
} as const;

export const howItWorks = {
  eyebrow: "How PocketPair works",
  heading: "Three steps, and the first one takes seconds",
  steps: [
    {
      index: "01",
      icon: "QrCode",
      title: "Scan",
      body: "Open PocketPair and scan their QR code. That is the whole interaction, done while you are still talking.",
    },
    {
      index: "02",
      icon: "FolderSimple",
      title: "Filed",
      body: "The connection lands in that event's folder automatically, with the event attached. Nothing to type, nothing to tag afterwards.",
    },
    {
      index: "03",
      icon: "PaperPlaneTilt",
      title: "Reconnect",
      body: "Open the event weeks later, recognise the face, and pick the conversation back up from where it actually started.",
    },
  ],
} as const;

export const folders = {
  eyebrow: "One folder per event",
  heading: "Your events, kept apart and kept together",
  body: "Every gathering becomes its own folder. The people inside stay grouped by where you met them, while search runs across the whole network at once.",
  /** Sample UI data. Indian metro events, matching PocketPair's stated audience. */
  events: [
    {
      name: "Bengaluru Tech Summit",
      venue: "KTPO, Whitefield",
      date: "14 Mar",
      people: 23,
      accent: true,
      contacts: [
        { name: "Aarav Menon", role: "Backend, logistics platform" },
        { name: "Stephanie Okafor", role: "Design lead, fintech" },
        { name: "Rohit Deshmukh", role: "Founder, warehouse robotics" },
      ],
    },
    {
      name: "Mumbai Product Meetup",
      venue: "Lower Parel",
      date: "02 Apr",
      people: 11,
      accent: false,
      contacts: [
        { name: "Anna Varghese", role: "PM, payments" },
        { name: "Imran Qureshi", role: "Growth, D2C brand" },
      ],
    },
    {
      name: "Delhi Campus Fest",
      venue: "IIT Delhi",
      date: "27 Apr",
      people: 17,
      accent: false,
      contacts: [
        { name: "Priya Nair", role: "Final year, CS" },
        { name: "Murthy Krishnan", role: "Robotics club lead" },
      ],
    },
  ],
} as const;

export const pocketpairCta = {
  heading: "Join the PocketPair waitlist",
  body: "Be in the first group to use it. One email when it opens, nothing else.",
  cta: "Join the waitlist",
} as const;

/* ========================================================================
 * B11 tagline reveal. Company level, sits between the two products.
 * ===================================================================== */

export const tagline = {
  text: "The things worth keeping are the easiest to lose. FoundLoom builds small tools that hold on to them for you.",
} as const;

/* ========================================================================
 * PRODUCT 02 — AI INVENTORY
 * ===================================================================== */

export const aiInventory = {
  eyebrow: "AI model discovery",
  name: "AI Inventory",
  status: "Available now",
  heading: "Find your way around AI models.",
  body: "A web app for discovering, comparing and exploring AI models and large language models. It carries AI news, plain language explanations of the terminology, and a weekly newsletter you can subscribe to.",
  items: [
    {
      icon: "MagnifyingGlass",
      title: "Discover and compare",
      body: "Browse AI models and large language models side by side, so the choice between them is something you can actually see rather than guess at.",
    },
    {
      icon: "Newspaper",
      title: "AI news",
      body: "What changed this week, in one place, without having to follow a dozen separate feeds to keep up.",
    },
    {
      icon: "BookOpen",
      title: "Terminology explained",
      body: "The jargon written out in plain language, so a term you have seen a hundred times stops being a term you skim past.",
    },
    {
      icon: "EnvelopeSimple",
      title: "Weekly newsletter",
      body: "A subscription that collects the week into one email, for when you would rather not check a site at all.",
    },
  ],
  cta: { label: "Visit AI Inventory", href: "https://ai-inventory-blond.vercel.app/" },
  /**
   * Audience is an assumption, not a confirmed fact: FoundLoom has not
   * verified who AI Inventory is for. Flagged rather than asserted.
   */
  audienceAssumption: "{{ai_inventory_audience}}",
  /** Sample UI data. Model and provider names are public, no metrics claimed. */
  sampleFilters: ["All", "Text", "Vision", "Audio", "Open weights"],
  sampleModels: [
    { name: "Claude", provider: "Anthropic", accent: true },
    { name: "GPT", provider: "OpenAI", accent: false },
    { name: "Gemini", provider: "Google", accent: false },
    { name: "Llama", provider: "Meta", accent: false },
  ],
  sampleTerms: ["Context window", "Tokenisation", "Fine tuning"],
  /** Scrolling strip. Public terminology, no claims about coverage. */
  marqueeTerms: [
    "Context window",
    "Tokenisation",
    "Fine tuning",
    "Inference",
    "Embeddings",
    "Multimodal",
    "Open weights",
    "Quantisation",
    "Retrieval",
    "Benchmarks",
  ],
} as const;

/* ========================================================================
 * FAQ — grouped by product
 * ===================================================================== */

export type FaqItem = {
  q: string;
  /** Segments render in order. Marked segments become placeholder chips. */
  a: Array<{ text: string; placeholder?: boolean }>;
};

export type FaqGroup = { title: string; items: FaqItem[] };

export const faq: { eyebrow: string; heading: string; groups: FaqGroup[] } = {
  eyebrow: "FAQ",
  heading: "Questions about both products",
  groups: [
    {
      title: "PocketPair",
      items: [
        {
          q: "What is PocketPair?",
          a: [
            {
              text: "PocketPair is a QR scan networking tool from FoundLoom. When you meet someone at an event, you scan their QR code and the connection is saved to your network with that event attached, so you always know where the two of you met.",
            },
          ],
        },
        {
          q: "What happens when I scan someone's QR code?",
          a: [
            {
              text: "The connection is saved to your growing network and the event is attached to it automatically. There is nothing to type in and nothing to tag afterwards.",
            },
          ],
        },
        {
          q: "Where are my connections saved?",
          a: [
            {
              text: "Your connections are kept in your PocketPair network, organised into one folder per event. Specifics on storage, data handling and privacy: ",
            },
            { text: "{{storage_and_privacy}}", placeholder: true },
          ],
        },
        {
          q: "Can I see everyone I met at one event?",
          a: [
            {
              text: "Yes. Each event has its own folder, so you can open a tech summit, a campus event or a community meetup and see everyone you connected with there in one place.",
            },
          ],
        },
        {
          q: "Does the event stay attached to each connection?",
          a: [
            {
              text: "Yes. The event is attached at the moment you scan and stays with that connection, which is what lets you look back later and place the person.",
            },
          ],
        },
        {
          q: "How do I reconnect with someone later?",
          a: [
            {
              text: "Open the event folder, find the person, and you have the connection plus the context of where you met. You can also search and browse across every event you have attended.",
            },
          ],
        },
        {
          q: "Who can I connect with at an event?",
          a: [
            {
              text: "Anyone else at the event using PocketPair. A quick hello is enough. The point is to save brief conversations while you are both still in the room, not only the long ones.",
            },
          ],
        },
        {
          q: "What kinds of events is PocketPair for?",
          a: [
            {
              text: "Anywhere you meet a lot of people in a short time: conferences, tech summits, community meetups and campus events. Each one becomes its own folder, so the contacts from one event never blur into the next.",
            },
          ],
        },
        {
          q: "Is PocketPair a digital business card app?",
          a: [
            {
              text: "It starts the same way, with a QR scan, but the focus is different. A digital business card is about handing over your details. PocketPair is about what you keep afterwards: every contact is saved with the event attached and filed in that event's folder, so you can still place the person months later.",
            },
          ],
        },
        {
          q: "When does PocketPair launch, and will it cost anything?",
          a: [
            { text: "Launch timing: " },
            { text: "{{launch_date}}", placeholder: true },
            { text: " Pricing: " },
            { text: "{{pricing}}", placeholder: true },
            {
              text: " Joining the waitlist is free and gets you one email when PocketPair opens.",
            },
          ],
        },
      ],
    },
    {
      title: "AI Inventory",
      items: [
        {
          q: "What is AI Inventory?",
          a: [
            {
              text: "AI Inventory is a web app for discovering, comparing and exploring AI models and large language models. Alongside the models it carries AI news, plain language explanations of AI terminology, and a weekly newsletter.",
            },
          ],
        },
        {
          q: "Is AI Inventory inventory management software?",
          a: [
            {
              text: "No. AI Inventory is an inventory of AI models, not a stock or warehouse tool. It is a web app for discovering and comparing AI models and large language models. If you are looking for software to track stock levels, this is not that.",
            },
          ],
        },
        {
          q: "What does the weekly newsletter cover?",
          a: [
            { text: "It collects the week into one email. Exact contents and sending schedule: " },
            { text: "{{newsletter_details}}", placeholder: true },
          ],
        },
        {
          q: "Is AI Inventory related to PocketPair?",
          a: [
            {
              text: "Only in that FoundLoom builds both. They are separate products with separate accounts and separate purposes. Using one does not require the other.",
            },
          ],
        },
      ],
    },
    {
      title: "FoundLoom",
      items: [
        {
          q: "What does FoundLoom make?",
          a: [
            {
              text: "Two web tools. PocketPair is an event networking app: scan a QR code when you meet someone and the contact is saved with the event attached. AI Inventory is a web app for discovering and comparing AI models and large language models. They are separate products with separate accounts.",
            },
          ],
        },
        {
          q: "Who is behind FoundLoom?",
          a: [
            { text: "" },
            { text: "{{about_foundloom}}", placeholder: true },
          ],
        },
        {
          q: "How do I get in touch?",
          a: [
            { text: "Use the form on the Contact page and say which product it is about. A direct email address: " },
            { text: "foundloomlabs@gmail.com" },
          ],
        },
      ],
    },
  ],
};

/* ========================================================================
 * FINAL CTA — one action per product
 * ===================================================================== */

export const finalCta = {
  heading: "Two products, pick the one you need",
  body: "PocketPair opens to its waitlist first. AI Inventory is available now. Not sure which, or here about something else? Get in touch.",
  cards: [
    {
      name: "PocketPair",
      body: "Save the people you meet at events, filed under the event where you met them.",
      kind: "waitlist" as const,
    },
    {
      name: "AI Inventory",
      body: "Discover and compare AI models, follow the news, and subscribe to the weekly email.",
      kind: "link" as const,
    },
  ],
} as const;

/**
 * Footer. Deliberately short: three columns of the links people actually
 * reach for, not a sitemap. Everything removed from here is one click away
 * on the page it belongs to.
 */
export const footer = {
  tagline: "Small tools for people who meet a lot of people, and for people keeping up with AI.",
  columns: [
    {
      title: "Products",
      links: [
        { label: "PocketPair", href: routes.pocketpair },
        { label: "AI Inventory", href: routes.aiInventory },
        { label: "Compare both", href: routes.products },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: routes.about },
        { label: "Contact", href: routes.contact },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: routes.privacy },
        { label: "Terms", href: routes.terms },
        { label: "Cookies", href: routes.cookies },
      ],
    },
  ],
} as const;
