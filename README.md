# FoundLoom — company website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Phosphor Icons

A multi-page company website for FoundLoom and its two products.

## Routes

| Route | What it is | Indexed |
|---|---|---|
| `/` | Company overview: hero, both products, what FoundLoom is for | Yes |
| `/products` | Catalogue: both products in full, plus a side-by-side comparison | Yes |
| `/pocketpair` | Full product page: problem, features, how it works, event folders, FAQ, waitlist | Yes |
| `/ai-inventory` | Full product page: features, product view, terminology, FAQ | Yes |
| `/about` | Company page: how we work, current status of both products, company FAQ | Yes |
| `/contact` | Validated contact form, a direct email, and what we can help with | Yes |
| `/privacy`, `/terms`, `/cookies` | Legal stubs awaiting your copy | No, `noindex` |
| anything else | Branded 404 with the site nav intact | No |

Every indexable route has its own title, description, canonical, Open Graph
tags, `<h1>` and structured data. Products are labelled by category
("Event networking", "AI model discovery"), never by index.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## Three things to do before launch

Everything below is a fact that was not confirmed, so the page shows a visible
yellow placeholder chip instead of inventing a value. Search the repo for `{{`
to find them all.

### 1. Connect the waitlist form

Until an endpoint is set, the form validates the address and then says plainly
that nothing is connected. It never shows a false success message.

```bash
cp .env.example .env.local
```

Two endpoints, both optional, both failing honestly when unset:

| Variable | Used by | Payload |
|---|---|---|
| `NEXT_PUBLIC_WAITLIST_ENDPOINT` | Waitlist form on `/pocketpair` | `{ email, product }` |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Contact form on `/contact` | `{ name, email, subject, message }` |

Formspree, a Google Apps Script web app, a Vercel function, or your own API
all work. Restart the dev server after editing `.env.local`; env vars are not
hot-reloaded.

### 2. Fill in the unconfirmed facts

All copy lives in **`lib/content.ts`**. Replace these strings:

| Placeholder | Where | What is needed |
|---|---|---|
| `{{storage_and_privacy}}` | PocketPair FAQ | How and where connections are stored |
| `{{launch_date}}` | PocketPair FAQ | When PocketPair opens |
| `{{pricing}}` | PocketPair FAQ | Whether it costs anything |
| `{{ai_inventory_audience}}` | AI Inventory section | Who AI Inventory is for. You said this was an assumption, so it is not asserted |
| `{{newsletter_details}}` | AI Inventory FAQ | What the weekly newsletter covers and when it sends |
| `{{about_foundloom}}` | FoundLoom FAQ | Who is behind FoundLoom |
| `{{contact_email}}` | `/contact` + FAQ | Your contact address |
| `{{privacy_copy}}` etc. | `app/privacy`, `app/terms`, `app/cookies` | Real legal text |

The FAQ structured data automatically **excludes** any question whose answer
still contains a placeholder, so Google never receives an unconfirmed claim.

### 3. Set the real domain

`site.url` in `lib/content.ts` is `https://foundloom.com`. It drives the
canonical tag, Open Graph URL, `robots.txt` and `sitemap.xml`.

---

## Drop in your real screenshots

The hero renders both product UIs in markup. To use real screenshots, save
them to `/public` and set either constant at the top of
`components/HeroVisual.tsx`:

```ts
const POCKETPAIR_SCREENSHOT: string | null = "/pocketpair.png";
const AI_INVENTORY_SCREENSHOT: string | null = "/ai-inventory.png";
```

Each one replaces only its own card, so you can supply one now and the other
later. The illustrated scene stays behind them. Update the matching `_ALT`
constants too.

## Drop in your logo

Save the file to `/public`, then set the constant at the top of
`components/Logo.tsx`:

```ts
const LOGO_SRC: string | null = "/logo.svg";
```

It appears in the nav and the footer. The favicon is separate: replace
`app/icon.svg` with your mark.

## Swap the hero photograph

The home page hero is a full-bleed photograph. One constant controls it,
in `components/Hero.tsx`:

```ts
const HERO_IMAGE = "/hero-clean.jpg";
```

Drop a file in `/public` and point the constant at it. Use something 1920px
wide or more; it is cropped to fill and centred, so keep the subject near
the middle of the frame. `/hero-clean-0.jpg` is already there as an
alternative if you prefer scenery to a room of people.

The two gradients that keep dark type legible over the picture are
`.hero-photo-scrim` and `.hero-photo-fade` in `app/globals.css`. A much
darker photograph would need those inverted, and the headline switched to
white.

---

### The two products are not yet equal in depth

PocketPair runs about 3600px tall, AI Inventory about 1400px. That gap is not
a design choice, it is a shortage of confirmed facts: PocketPair has a stated
problem, a three-step flow and an event-folder model to show, and AI Inventory
has four features and a login wall. To close the gap, supply any of:

- the problem AI Inventory solves, in your words
- a three-step "how it works" for it
- what a model page actually shows
- a screenshot that gets past the login

---

## What is deliberately absent

- **No testimonials.** The six on the Framer page are template filler.
- **No logo strip, customer count or statistics.** Nothing confirmed.
- **No pricing or guarantee section.** Nothing confirmed.
- **No numbers in the hero facts bar.** The reference design fills that bar
  with metrics (members, money invested, deals closed, years trading). Every
  one would have been invented, so the four cells describe how the products
  work instead. Replace them in `hero.facts` once you have real figures.

Add them once you have real ones. Do not let a template reinstate them.

---

## Issues found on the current Framer page

Worth fixing there too, or at least not copying forward:

- The hero subheadline and FAQ still say **"Connectly"**, not PocketPair.
- The **"How it works" section is about a mindfulness app called Bloom** —
  mood selection, guided meditation, streaks. Leftover template text.
- The seven FAQ questions have **no answers**.
- Mock UI typos: "Congractulation", "20:41 AM", "Why Why", "People People".

All of these are corrected in this build.

---

## Motion

One easing curve throughout, `cubic-bezier(0.22, 1, 0.36, 1)`. Only
`transform` and `opacity` animate. **There is no scroll listener anywhere in
the project** — every scroll-driven effect uses `IntersectionObserver`.

| Effect | Where |
|---|---|
| Hero entrance, staggered line by line | `Hero.tsx` |
| Animated scroll cue | `Hero.tsx` + `.animate-cue` |
| Nav condenses once the page moves | `Nav.tsx`, via a 1px sentinel |
| Animated hamburger that morphs into a close icon | `Nav.tsx` |
| Full-height mobile panel, links staggered 60ms apart | `Nav.tsx` |
| Section reveals: rise 32px and fade, once only | `Reveal.tsx` |
| Card lift and arrow slide on hover | `ProductsOverview.tsx` and others |
| Pulsing status dot on live products | `.animate-pulse-dot` |
| Word-by-word tagline reveal | `TaglineReveal.tsx` |
| Seamless terminology marquee, pauses on hover and focus | `Marquee.tsx` |

### Reduce motion

The footer has a **Reduce motion** toggle, as the reference site does. It sets
`data-motion="reduced"` on `<html>`, which `globals.css` uses to collapse every
transition and animation, and the choice is remembered per browser.

The OS-level `prefers-reduced-motion` is honoured too, and the toggle can
override it in either direction (`data-motion="full"` is an explicit opt back
in).

---

## SEO

Each route is its own ranking target, which is the main reason this is a
multi-page site rather than one long page.

- Unique `<title>`, meta description and canonical on all five indexable pages
- Exactly one `<h1>` per page, with ordered heading levels beneath it
- `sitemap.xml` lists the five indexable routes and omits the `noindex` ones
- `robots.txt` points at the sitemap
- `googleBot` directives for large image previews and unlimited snippets
- Open Graph and Twitter cards per page, with a generated 1200x630 image
- Structured data as one `@graph` per page:
  `Organization` and `WebSite` site-wide, plus `SoftwareApplication` and
  `BreadcrumbList` on each product page, `AboutPage`, `ContactPage`, and
  `FAQPage` where questions exist
- Visible breadcrumbs matching the `BreadcrumbList` markup
- Statically prerendered; fonts self-hosted through `next/font` with `swap`

**Stated plainly: no markup guarantees a number one ranking.** The technical
layer here is as complete as it gets. Position after that comes down to
content depth, backlinks, domain age and competition, none of which live in
this repo. What actually moves the needle next:

1. **Verify the domain in Google Search Console** and submit `/sitemap.xml`.
2. **Answer the placeholders.** A page that says `{{launch_date}}` cannot rank
   for "when does PocketPair launch". Unanswered FAQ entries are also excluded
   from the `FAQPage` schema on purpose, so they win you nothing until filled.
3. **Publish something that earns links.** Two product pages and an about page
   is a thin site in Google's eyes. Writing, changelogs or a blog is what
   turns a correct site into a ranking one.

---

## Deploy

### Vercel (recommended, zero config)

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Or push to GitHub and import the repo at vercel.com/new. Add
`NEXT_PUBLIC_WAITLIST_ENDPOINT` under Project Settings → Environment
Variables, then set your domain under Settings → Domains.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

Netlify auto-detects Next.js. Add the env var under Site settings →
Environment variables.

### Any Node host (Render, Railway, Fly, a VPS)

- Build command: `npm run build`
- Start command: `npm start`
- Node 20 or newer (built and tested on Node 24)
- Expose `PORT`; Next reads it automatically

### Static export

Not available as written. `app/opengraph-image.tsx` generates the social card
at request time. Delete it and add a static `public/og.png` if you need
`output: "export"`.

---

## Project structure

```
app/
  layout.tsx              Fonts, default metadata, Nav, Footer, skip link,
                          site-wide Organization + WebSite schema
  page.tsx                / — company overview
  products/page.tsx       Catalogue + CollectionPage/ItemList + Breadcrumb schema
  pocketpair/page.tsx     Product page + SoftwareApplication + Breadcrumb schema
  ai-inventory/page.tsx   Product page + SoftwareApplication + Breadcrumb schema
  about/page.tsx          AboutPage schema
  contact/page.tsx        ContactPage schema
  privacy|terms|cookies/  noindex legal stubs
  not-found.tsx           Branded 404
  globals.css             Design tokens, named text styles, animations
  icon.svg                Favicon
  opengraph-image.tsx     1200x630 social card
  robots.ts  sitemap.ts
components/
  Nav.tsx                 Floating pill, real routes, active page, mobile panel
  Logo.tsx                Logo slot, falls back to the wordmark
  Hero.tsx  HeroVisual.tsx        Home hero, both product mocks on the scene
  PageHero.tsx            Shared sub-page hero
  Breadcrumbs.tsx         Visible trail on every sub-page
  ProductsOverview.tsx    Both products as cards
  About.tsx               Company statement, `summary` variant for home
  PocketPairVisual.tsx    Product page hero UI
  Problem.tsx  Benefits.tsx  HowItWorks.tsx  EventFolders.tsx
  PocketPairCta.tsx       Waitlist block
  AiInventory.tsx         Features, product view, terminology marquee, CTA
  Marquee.tsx             Seamless scrolling strip
  TaglineReveal.tsx       Word-by-word reveal
  Faq.tsx                 Grouped; `only` filters to one product
  FinalCta.tsx  Footer.tsx  MotionToggle.tsx
  ContactForm.tsx
  Reveal.tsx  Icon.tsx  LegalPage.tsx
lib/
  content.ts              Every word on the site, plus the route table
  seo.ts                  Per-page metadata, breadcrumb and schema helpers
  motion.ts               Easing curve, variants, stagger
```

---

## Design system notes

Set in `app/globals.css`, applied everywhere:

- **Type.** Geist only; Geist Mono for numeric UI. Every size lands on the
  Tailwind scale through a named style (`heading-1`, `body-3`, `button-md`,
  `caption-4`). No loose size and weight pairs, no italics, no 900 weight.
- **Spacing.** Restricted to the token set, which maps onto Tailwind's
  `0, 0.5, 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24`. Nothing in between.
- **Radius.** Nested shapes follow `inner = outer − gap` where the gap is
  under 32px, e.g. `rounded-2xl` + `p-2` → `rounded-lg`.
- **Colour.** Flat only. Borders run all the way around a card, never one side.
- **Motion.** One curve, `cubic-bezier(0.22, 1, 0.36, 1)`. Only `transform`
  and `opacity` animate. Scroll reveals use IntersectionObserver; there is no
  scroll listener in the project. `prefers-reduced-motion` is respected.

**One deliberate deviation.** The design system asks for a black → `#666666`
gradient across the whole hero heading. The approved Pinterest reference's
defining trait is a solid accent-coloured second line, so line one carries the
gradient and line two carries the accent. Change it in `components/Hero.tsx`
if you would rather follow the system exactly.
