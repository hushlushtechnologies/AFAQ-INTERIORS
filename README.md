<div align="center">

# Afaq Al Manzel Interiors

**A premium marketing website for a Dubai-based interior design & turnkey solutions company.**

Cinematic motion · editorial typography · built to industry standards

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=fff)
![Motion](https://img.shields.io/badge/Motion-Framer-0055FF?logo=framer&logoColor=fff)

</div>

---

## Table of contents

1. [Overview](#overview)
2. [Tech stack](#tech-stack)
3. [Getting started](#getting-started)
4. [Environment variables](#environment-variables)
5. [Project structure](#project-structure)
6. [Pages & routes](#pages--routes)
7. [Editing content](#editing-content)
8. [Design system](#design-system)
9. [Motion system](#motion-system)
10. [Reusable components](#reusable-components)
11. [Contact form & email (Resend)](#contact-form--email-resend)
12. [Fonts](#fonts)
13. [Images & media](#images--media)
14. [Accessibility](#accessibility)
15. [Performance & SEO](#performance--seo)
16. [Deployment](#deployment)
17. [Troubleshooting](#troubleshooting)
18. [Pre-launch checklist](#pre-launch-checklist)
19. [Credits](#credits)

---

## Overview

A fully static, motion-rich marketing site built from a Figma design. Every section is driven by **typed content files**, so copy, images and services can be updated without touching component code.

**Highlights**

- 🎬 **Cinematic preloader**: crest reveal, letter-by-letter tagline, live progress, two-layer curtain lift (once per session)
- 🧭 **Scroll-driven storytelling**: parallax, self-drawing grid lines, word-by-word text reveals, gold timeline fills
- 🖼️ **Interactive media**: draggable before/after sliders, filterable photo & video galleries, lightboxes
- 📨 **Production-ready contact form**: server-side validation, country-aware phone checks, spam honeypot, email delivery via Resend
- ♿ **Accessible by default**: semantic HTML, keyboard support, screen-reader labels, full `prefers-reduced-motion` support
- ⚡ **Fast**: Server Components first, `next/image`, `next/font`, pre-built static routes

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) |
| UI | React 19 + TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) with `@theme` design tokens |
| Animation | [Motion](https://motion.dev) (`motion/react`) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Forms | React 19 `useActionState` + Server Actions |
| Validation | [Zod](https://zod.dev) v4 |
| Phone numbers | [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) |
| Email | [Resend](https://resend.com) |
| Utilities | `clsx` + `tailwind-merge` (`cn()` helper) |

---

## Getting started

### Requirements

- **Node.js 20+** (LTS recommended)
- **npm** (ships with Node)

### Install & run

```powershell
# 1. Install dependencies
npm install

# 2. Create your environment file (see below)
#    → create .env.local in the project root

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000**.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimized production build (also type-checks) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

> 💡 Always run `npm run build` before deploying. Some errors (TypeScript, pre-rendering rules) only appear at build time.

---

## Environment variables

Create **`.env.local`** in the project root. It is git-ignored and must never be committed.

```bash
# Resend: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Where enquiries are delivered
CONTACT_TO_EMAIL=info@afaqalmanzelinteriors.com

# Sender: must use a domain verified in Resend
CONTACT_FROM_EMAIL="Afaq Website <website@afaqalmanzelinteriors.com>"
```

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Production | Without it, dev logs enquiries to the terminal; production shows a friendly error |
| `CONTACT_TO_EMAIL` | Recommended | Falls back to `site.email` |
| `CONTACT_FROM_EMAIL` | After domain verification | Falls back to Resend's test sender `onboarding@resend.dev` |

> ⚠️ After editing `.env.local`, **restart** `npm run dev`. Env files are only read at startup.
> 🔐 Never paste the full API key in chats, issues or screenshots. If exposed, revoke it in Resend and create a new one.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx               # Fonts, metadata, SmoothScroll, IntroProvider, Navbar, Footer
│  ├─ template.tsx             # Page-enter transition
│  ├─ globals.css              # Tailwind v4 @theme tokens + custom utilities
│  ├─ page.tsx                 # Home
│  ├─ not-found.tsx            # Branded 404
│  ├─ about/page.tsx
│  ├─ careers/page.tsx
│  ├─ contact/
│  │  ├─ page.tsx
│  │  └─ actions.ts            # Server Action: validation + email
│  ├─ gallery/page.tsx
│  ├─ services/[slug]/page.tsx # One dynamic route for every service
│  ├─ terms/page.tsx
│  └─ privacy/page.tsx
│
├─ components/
│  ├─ layout/                  # Navbar, MenuOverlay, Footer, Preloader, backdrops
│  ├─ motion/                  # Reusable animation primitives (see Motion system)
│  ├─ ui/                      # Button, Container, icons, lightboxes, PlusMinus…
│  └─ sections/
│     ├─ about/ services/ work/ why/ products/ signature/ process/ values/ faq/
│     ├─ about-page/ careers/ contact/ gallery/ legal/ service-page/
│     └─ shared/               # HeroSlider, SplitHeader
│
├─ content/                    # ✏️ All site copy, images & data live here
│  ├─ site.ts                  # Contact details, socials, map links
│  ├─ navigation.ts            # Menu, services list, footer columns, legal links
│  ├─ hero.ts  about.ts  services.ts  work.ts  why.ts  products.ts
│  ├─ signature.ts  process.ts  values.ts  faq.ts
│  ├─ about-page.ts  careers.ts  contact.ts  gallery.ts  legal.ts
│  └─ service-pages.ts         # Every service page, section by section
│
└─ lib/
   ├─ motion.ts                # Easing curves, durations, shared variants
   ├─ utils.ts                 # cn() class helper
   └─ useMediaQuery.ts

public/
├─ images/                     # Organised by page/section
└─ videos/
```

---

## Pages & routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Dark hero slider + 10 sections |
| `/about` | About Us | Editorial hero, shape bands, story, vision & mission, materials, approach |
| `/services/[slug]` | Service pages | `interior-design`, `design-build`, `renovation-fit-out`, `furnishing`, `mep`, `property-transformation` |
| `/gallery` | Gallery | Split hero + marquee, filterable photo gallery, video gallery, before & after |
| `/careers` | Careers | Animated wire-globe hero, culture, open roles, FAQ |
| `/contact` | Contact | Grid layout, enquiry form, info row, map, FAQ |
| `/terms` `/privacy` | Legal | Shared `LegalPage` template with reading-progress bar |
| _anything else_ | 404 | Branded not-found page |

Service pages are **pre-built at deploy time** via `generateStaticParams`. Unknown slugs return the 404 page.

---

## Editing content

All content lives in **`src/content/`**. Components read from these files, so most updates are pure data edits.

### Common tasks

<details>
<summary><b>Change phone, email, address or socials</b></summary>

Edit **`src/content/site.ts`**. The footer, contact page, FAQ, legal pages and WhatsApp button all update automatically.

</details>

<details>
<summary><b>Add or edit a service page</b></summary>

Edit **`src/content/service-pages.ts`**. Each entry chooses a hero style and optional sections:

```ts
"my-service": {
  hero: "grid",                // "grid" (title + categories + wide photo) or "slider"
  slug: "my-service",
  eyebrow: "My Service",
  // …hero fields…
  spaces?:      { … },         // Index + alternating solution blocks
  styles?:      { … },         // Collages, banner, cards
  beforeAfter?: { … },         // Draggable comparison sliders
  details?:     { … },         // Square-grid accordion
}
```

Add the slug to `services` in `navigation.ts` so it appears in the menu and footer.

**Slider hero options:** `heroLayout: "center" | "bottom"`, `heroTheme: "light" | "dark"`, and an optional `secondaryCta`.

</details>

<details>
<summary><b>Add gallery projects or videos</b></summary>

Edit **`src/content/gallery.ts`**:

- `designGallery.projects`: photo projects (first image = card cover; more images enable the 1/N badge & viewer arrows)
- `videoGallery.projects`: video projects (`images[0]` = poster, `video` = MP4 path)

Filter options (Category / Location / Type) are generated automatically from your data.

</details>

<details>
<summary><b>Add a job opening</b></summary>

Add an item to `careers.roles.items` in **`src/content/careers.ts`**. The grid, dots and rails adjust automatically.

</details>

<details>
<summary><b>Edit FAQs</b></summary>

- Home: `src/content/faq.ts`
- Careers: `careers.faq`
- Contact: `contact.faq`

Each page also outputs **FAQPage structured data** for Google from the same list.

</details>

<details>
<summary><b>Update Terms or Privacy</b></summary>

Edit **`src/content/legal.ts`**. Sections support paragraphs, bullet `list`s and a `contact` block. Remember to update the `updated` date.

</details>

---

## Design system

Tokens are defined once in **`src/app/globals.css`** under `@theme` and become Tailwind classes automatically.

### Colours

| Token | Value | Usage |
|---|---|---|
| `background` | `#100402` | Dark sections, overlays |
| `ivory` | `#f4efe8` | Light section backgrounds |
| `ink` | `#100402` | Text on light backgrounds |
| `cream` | `#f7efe7` | Headlines on dark backgrounds |
| `accent` | `#dd6550` | Primary buttons, links, highlights |
| `terracotta` | `#b56545` | Secondary: grid lines, dots, titles, circles |
| `gold` | `#ebb811` | Bullets, dark-section titles, timeline |
| `peach` | `#eed3be` | Footer bottom bar |

Use them as `bg-ivory`, `text-accent`, `border-terracotta/30`, and so on.

### Typography

| Variable | Role | Class |
|---|---|---|
| `--font-heading` | Display serif (**GT Super Display** per Figma) | `font-display` |
| `--font-body` | Body sans | `font-sans` |
| `--font-handwriting` | Script accents | `font-script` |

### Custom utilities

| Class | Purpose |
|---|---|
| `btn-accent` | Figma coral button: fill + top glow + fading 0.5px gradient border |
| `bg-gold-glow` | Gold surface with highlight |
| `border-hairline` | 0.5px border |
| `link-underline` | Animated underline on hover/focus |

### Layout grid

- Content container: **1280px** max (`Container`)
- Many sections use a **4-column grid** (320px cells at desktop) with `ColumnLines` and `Rail`
- Square-cell sections use the `--cell` CSS variable

---

## Motion system

Shared easing and timing live in **`src/lib/motion.ts`**. Reusable primitives live in **`src/components/motion/`**.

| Component | Effect |
|---|---|
| `LineReveal` | Headlines rise line-by-line from a mask (optional animated underline) |
| `Reveal` | Fade-up on scroll |
| `ImageReveal` | Curtain clip-reveal + zoom-out |
| `ParallaxImage` | Image moves at its own scroll speed |
| `ScrollRevealText` | Paragraph darkens word-by-word with scroll |
| `ScrollArrow` | Dashed arrow that draws itself on scroll |
| `ScrollLine` / `ColumnLines` | Vertical grid lines that grow with scroll |
| `Rail` | Full-width horizontal line that draws on view |
| `GridBackdrop` | Repeating square-grid background |
| `StepDots` | "n of total" position dots |
| `ShapeBand` | Rounded-shape bands that slide horizontally |
| `SparkleDivider` | Line + twinkling sparkles |
| `WriteOn` | Handwriting-style text reveal |
| `Float` | Group parallax without clipping |
| `ScrollProgress` | Reading-progress bar |

### Intro gating

The preloader exposes `useIntroReady()`. Above-the-fold animations wait for the curtain to lift before playing:

```tsx
const ready = useIntroReady();
const show = (reduce || inView) && ready;
```

> 🧪 To replay the intro: open a private window, or run `sessionStorage.removeItem("afaq-intro")` in the console and reload.

### Reduced motion

Every animated component respects `prefers-reduced-motion`. Parallax, autoplay, marquees and reveals are disabled or simplified.

---

## Reusable components

| Component | Location | Used for |
|---|---|---|
| `HeroSlider` | `sections/shared` | Home + slider service heroes (`theme`, `layout`) |
| `SplitHeader` | `sections/shared` | Heading left / copy + CTAs right |
| `MediaGallery` | `sections/gallery` | Photo **or** video gallery with filters & Load more |
| `ServiceSpaces` | `sections/service-page` | Index + alternating A/B blocks, light/dark bands |
| `ServiceStyles` | `sections/service-page` | Collages → banner → cards |
| `ServiceBeforeAfter` | `sections/service-page` | Draggable comparison sliders |
| `Materials` | `sections/about-page` | Square-grid accordion |
| `ValuesSection` | `sections/values` | Gold scroll-fill timeline |
| `FaqSection` | `sections/faq` | Accordion + FAQPage schema |
| `LegalPage` | `sections/legal` | Terms / Privacy template |
| `ImageLightbox` / `VideoLightbox` | `ui` | Full-screen viewers (portal, keyboard, swipe) |
| `CopyEmailButton` | `ui` | Copy-to-clipboard with mailto fallback |

---

## Contact form & email (Resend)

**Flow:** `ContactForm` → Server Action `src/app/contact/actions.ts` → Zod + phone validation → Resend → client inbox.

- ✅ Field-level errors shown inline; values kept on error
- 🌍 Phone validated per selected country (default 🇦🇪 UAE); emailed in international format
- 🛡️ Hidden honeypot field blocks bots
- 💬 Success / failure shown in an animated modal
- ↩️ Reply-To is the visitor's email, so the client can reply directly

### Verify the sending domain

1. Resend → **Domains → Add Domain** → enter the client's domain
2. Add the shown **MX + TXT (SPF, DKIM)** records at the DNS provider
   - Enter the Name as shown (e.g. `send`), **not** with the domain appended
   - Cloudflare: set records to **DNS only** (grey cloud)
3. Click **Verify** (usually minutes, up to 48h)
4. Set `CONTACT_FROM_EMAIL` to an address on that domain and restart

> Until verified, Resend's test sender can only deliver to **your own Resend account email**.

---

## Fonts

Fonts are loaded with `next/font` in **`src/app/layout.tsx`**.

The design uses **GT Super Display** (Grilli Type). To install it:

1. Obtain the **real font file** (from the designer or the Grilli Type trial). Do not create it manually.
2. Place it in `src/app/fonts/`, keeping its original extension
3. Load it:

```tsx
import localFont from "next/font/local";

const heading = localFont({
  src: [{ path: "./fonts/GT-Super-Display-Regular.otf", weight: "400", style: "normal" }],
  variable: "--font-heading",
  display: "swap",
});
```

> ⚖️ **Licensing:** "GT Super Ds **Trial**" is for design/development only. Purchase a **web licence** from [grillitype.com](https://www.grillitype.com) before launch and use the licensed `.woff2`.

---

## Images & media

| Guideline | Recommendation |
|---|---|
| Hero / full-width photos | ≥ 2400px wide |
| Section photos | ≥ 1600px wide |
| Format | JPG or WebP (Next.js serves optimised versions automatically) |
| Videos | MP4 (H.264), ideally < 10–15 MB each |
| Before/After pairs | Same camera angle **and** same crop |
| Alt text | Describe the space, not "image of…"; decorative images use `alt=""` |

Paths in content files are relative to `public/`, e.g. `/images/gallery/projects/p01.jpg`.

---

## Accessibility

- Semantic landmarks, one `<h1>` per page, ordered headings
- Every interactive element is keyboard reachable with visible focus
- Dialogs (menu, lightboxes, form modal) trap scroll, close on <kbd>Esc</kbd>, and are labelled
- Sliders and carousels expose ARIA roles & values; arrow-key support
- Screen-reader announcements for filter results, form status and clipboard copy
- Full `prefers-reduced-motion` support

---

## Performance & SEO

- Server Components by default; only interactive parts ship JavaScript
- Static pre-rendering for every route (including all service pages)
- `next/image` with responsive `sizes`; `priority` only on above-the-fold images
- `next/font` self-hosting (no layout shift)
- Per-page `metadata` (title template: `%s | Afaq Interiors`)
- FAQPage structured data on Home, Careers and Contact
- 404 pages are automatically `noindex`

---

## Deployment

Recommended: **[Vercel](https://vercel.com)**.

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add environment variables (**Settings → Environment Variables**):
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
4. Deploy, then **redeploy** after any env-var change
5. Add the custom domain in **Settings → Domains**

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `new Date()` while prerendering | With Cache Components on, wrap time-dependent values in a `"use cache"` server function (see `CurrentYear.tsx`) |
| `dynamicParams` not compatible with `cacheComponents` | Remove the export; rely on `notFound()` for unknown slugs |
| `Can't resolve 'next/font/local/target.css'` / "end of data reached unexpectedly" | The font file is empty or invalid. Use a real font file with its original extension |
| `localFont is not defined` | Add `import localFont from "next/font/local";` |
| Images or headings not appearing | Ensure the element observed with `useInView` is **not** the one being clipped; use an outer wrapper |
| Utility class has no effect | `@utility` / custom classes must be outside `@theme`; prefer `@layer components` for plain classes |
| Form: "domain is not verified" | Remove `CONTACT_FROM_EMAIL` until the domain is verified in Resend |
| Env change not applied | Fully stop and restart `npm run dev`; check for duplicate keys in other `.env*` files |
| Navbar icon hard to see | Add the route to `DARK_HERO_ROUTES` in `Navbar.tsx` for white icons |

---

## Pre-launch checklist

- [ ] Replace placeholder font with licensed **GT Super Display** (web licence)
- [ ] Confirm body font name from Figma
- [ ] Confirm the correct **domain, email, phone and address** in `site.ts`
- [ ] Add real **social media** links
- [ ] Verify the sending domain in **Resend** and set production env vars
- [ ] Set the **real-estate service** link on Property Transformation
- [ ] Replace all **placeholder content** (search the codebase for `Placeholder`)
- [ ] Replace placeholder **gallery projects, videos and before/after** details
- [ ] Final copy review (company name **Afaq Al Manzel**, not Al Khaleej)
- [ ] Legal review of Terms & Privacy
- [ ] Run `npm run build` with zero errors
- [ ] Lighthouse check (Performance, Accessibility, SEO)
- [ ] Test on mobile Safari, Chrome, and with reduced motion enabled

---

## Credits

Designed & developed by **Hush Lush Technologies** for **Afaq Al Manzel Interiors**, Dubai, UAE.

<sub>© Afaq Al Manzel Interiors. All rights reserved.</sub>