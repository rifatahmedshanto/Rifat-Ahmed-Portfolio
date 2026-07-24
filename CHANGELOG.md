# Redesign changelog

Everything below was changed in this pass. Nothing in the contact form logic,
theme toggle, search, lightbox, CV download wiring, or nav/section IDs was
removed — all existing functionality still works exactly as before, just
faster and better organized.

## 1. Visual redesign
- Refined the color system: deeper, richer background tones, a slightly
  warmer gold accent and cooler teal secondary accent for better contrast,
  and a new `--shadow-glow` token used for a subtle premium glow on hover
  (terminal window, code window) instead of a flat lift.
- Buttons (`.btn-primary`, `#scrollTopBtn`) now use a soft gradient instead
  of a flat fill for a more premium feel; outline buttons now tint with a
  soft accent background on hover instead of just a border color change.
- Navbar and contact form glass effect (blur + saturation) tuned slightly
  stronger for a cleaner glassmorphism look in both dark and light themes.
- Education timeline connector line now fades from gold to teal to
  transparent instead of a flat gray bar.

## 2. Removed "// label" eyebrow tags, added clean section titles
- Every section (`About`, `Skills`, `Academic background`, `Things I've
  built`, `Certifications`, `Let's build something together`) no longer
  shows a `// about`, `// skills`, etc. text label above the heading.
- Replaced with a short two-color accent rule (`.section-kicker`) above each
  title — a purely visual cue, no more slash-prefixed labels anywhere.
- Nav links (`/about`, `/skills`, …) were also cleaned up to plain text
  (`About`, `Skills`, …) in the navbar and footer for the same reason.

## 3. About section rebuilt (old "Who Am I" bio removed)
- The old two-paragraph biography + large studio portrait layout is gone.
- Replaced with:
  - A short, two-sentence recruiter-friendly summary (kept factual content:
    university, focus areas, availability — nothing was invented).
  - A compact fact list (university, location, focus areas, availability)
    styled as small mono-font chips instead of a long paragraph.
  - A **lightweight coding-themed animation**: a `profile.js`-style code
    editor panel that types itself out character by character (name, role,
    university, stack, `openToWork: true`), pauses, fades, and loops. It's
    built with plain DOM + `setTimeout`/`IntersectionObserver` — no images,
    no external animation library, so it costs near-zero bytes and only
    starts animating once it scrolls into view. It also respects
    `prefers-reduced-motion` (renders fully typed, no animation, for users
    who've asked for reduced motion).
- The old About portrait image is no longer loaded on this section (removed
  page weight); it's still referenced once, appropriately, as the
  `og:image` / `twitter:image` / JSON-LD image for social link previews.

## 4. Academic background — updated to your real timeline
- **B.Sc. in Software Engineering** — corrected to **2024 — Present**
  (was previously 2022 — Present), Daffodil International University.
- Added **HSC 2023** as a real timeline entry (previously a "Add year
  range" placeholder).
- Added **SSC 2021** as a new timeline entry.
- All three now render in the existing animated vertical timeline component
  — no placeholder text remains in the Education section.

## 5. Certificates section — full visibility, modern cards
- Certificate thumbnails now use `object-fit: contain` on a neutral padded
  stage (light background box) instead of `cover` — the entire certificate,
  including edges/seals/signatures, is always fully visible and never
  cropped, regardless of the certificate's aspect ratio (matters especially
  if you add certificates with different proportions later).
- Card corner radius increased, hover lift + border-highlight + soft
  spotlight-follow glow refined for a more premium card feel.
- Grid changed to `repeat(auto-fit, minmax(320px, 1fr))` so it gracefully
  scales from 1 to many certificate cards as you add more, at any screen
  width, without manual breakpoint tuning.
- The lightbox preview (click-to-zoom) also switched to `object-fit:
  contain` so the full-size preview is never cropped either.
- Certificate source image re-exported at a larger 1100px width and higher
  quality (88%) specifically because it contains text — it needs to stay
  sharp and legible when zoomed, unlike a decorative photo.

## 6. Full responsive pass
- Added an intermediate `1080px` breakpoint to tighten grid gaps before the
  tablet layout kicks in, and a `1400px+` refinement that slightly widens
  the content column on very large screens.
- Added a `360px` breakpoint for very small phones (navbar padding, logo
  size) and refined the existing `480px` and `720px` breakpoints:
  - About section's fact grid collapses to one column on mobile.
  - Certificate thumbnail padding tightens on mobile so the (now
    letterboxed, uncropped) image keeps maximum size.
  - Contact form padding reduced on mobile so it doesn't feel oversized on
    narrow screens.
  - Hero buttons still stack full-width on mobile; other buttons (e.g.
    certificate View/Download) intentionally stay side-by-side rather than
    stacking, since they're small and read better as a pair.
- Verified with a local server that every asset resolves correctly at every
  breakpoint (no broken image paths after the folder reorganization).

## 7. Image & asset optimization
| File | Before | After | Change |
|---|---|---|---|
| Avatar photo (shown at 64px in the hero terminal) | `rifat-ahmed-hero.jpg` + `.webp`, a full 900×1150 portrait — **156 KB combined** | `rifat-ahmed-avatar.jpg` + `.webp`, a properly cropped **160×160** image sized for its actual on-screen use — **~12 KB combined** | ~13× smaller, same visual result |
| About/social-share portrait | 800×1000, 104 KB (jpg) / 34 KB (webp) | Re-encoded at the same 800×1000 with slightly better compression — 88 KB (jpg) / 46 KB (webp) | Trimmed, still print-sharp for social previews |
| Certificate image | 900×636, 72 KB (jpg) / 29 KB (webp) | Re-exported larger at 1100×777 for legibility when zoomed, 88% quality — 100 KB (jpg) / 53 KB (webp) | Intentionally larger for a *readable*, uncropped certificate (requirement #5 above) — the trade-off is worth it since this is the one image people will actually zoom into and read |
| **Total `assets/images/` payload** | **412 KB** | **300 KB** | **~27% lighter overall**, even after making the certificate bigger and clearer |

- `<link rel="preload">` in `<head>` now points at the small optimized
  avatar image (previously preloaded the oversized 900×1150 hero photo that
  was only ever displayed at 64px — a wasted preload).
- All images already had explicit `width`/`height` attributes and
  `loading="lazy"` on below-the-fold images; this was preserved and the
  certificate's dimensions were updated to match its new 1100×777 export.

## 8. Folder structure reorganized
```
Before                          After
portfolio/                      portfolio/
├── index.html                  ├── index.html
├── style.css        ─────►     ├── css/style.css
├── script.js        ─────►     ├── js/script.js
├── README.md                   ├── README.md
├── CHANGELOG.md (new)
└── assets/                     └── assets/
    ├── images/                     ├── images/   (re-optimized, see §7)
    └── docs/                       └── docs/     (unchanged)
```
- All `<link>`/`<script src>` paths in `index.html` updated accordingly;
  every reference was re-checked against the files on disk after the move
  (verified with a local server — every asset returns 200).

## 9. What was intentionally left untouched
- Contact form validation, honeypot spam protection, and the
  Formspree/mailto fallback logic — unchanged, still fully functional.
- Dark/light theme toggle and `localStorage` persistence — unchanged.
- Site search (`/` shortcut, keyboard navigation) — unchanged.
- Skills bars, skill data/percentages, and Projects "coming soon" empty
  state — unchanged (no fake project data was invented).
- SEO meta tags, Open Graph/Twitter cards, and JSON-LD structured data —
  unchanged, still valid and pointing at existing files.
- CV download wiring and certificate download/view links — unchanged.
