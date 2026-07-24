# Rifat Ahmed — Portfolio (v2 Redesign)

Plain HTML/CSS/JS, no build step, no framework, no backend dependency beyond
an optional free form-delivery service for the contact form.

## ⚠️ About this handoff

Your uploaded ZIP arrived as a **0-byte file** on my end (upload didn't go
through), so I wasn't able to read any local edits you may have made. This
redesign is built on top of the last version I delivered to you. If you had
changed anything locally after downloading it, those specific changes aren't
reflected here — re-upload if so and I'll merge them in.

## Folder structure

```
portfolio-v2/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    │   ├── rifat-ahmed-hero.jpg / .webp
    │   ├── rifat-ahmed-about.jpg / .webp
    │   ├── rifat-ahmed-avatar.jpg          (spare crop, not currently referenced)
    │   └── cert-oop-java.jpg / .webp
    └── docs/
        ├── Rifat-Ahmed-CV.pdf
        └── Rifat-Ahmed-OOP-Java-Certificate.pdf
```

Run it the same way as before: open `index.html` directly, or serve it:
```bash
cd portfolio-v2
python3 -m http.server 8000
```

## Summary of every change made

### Visual design system
- Added layered gradient/shadow tokens (`--shadow-lg`, `--gradient-accent`,
  `--gradient-mesh`) and a dedicated glassmorphism surface token
  (`--glass-bg`, `--glass-border`, `--glass-blur`) used consistently across
  skill cards, project cards, certificate cards, the timeline, and the
  contact form — one consistent "premium glass" language instead of mixed
  flat/solid cards.
- Hero background lighting upgraded to a two-layer radial mesh plus a soft
  top light sweep, replacing the flatter dual-radial glow.
- All hover states now use the same easing curve and a shared elevated
  shadow (`--shadow-lg`) for consistency across sections.

### Section headers — "clean titles" requirement
- Removed every `// about`, `// skills`, `// education`, `// projects`,
  `// certificates`, `// contact` eyebrow label sitewide.
- Replaced with a single clean heading per section (`About`, `Skills`,
  `Education`, `Projects`, `Certificates`) plus a quiet gradient underline
  accent (`.section-title-solo`) instead of a text label — same visual
  anchor, no repeated slash-comment styling.
- Removed a leftover empty `<p class="eyebrow">` tag in the hero that was
  rendering nothing (dead markup from the original template).

### "Who Am I" / About section
- Removed the old photo + 3-paragraph bio + static `key: "value"` info list
  layout.
- Replaced the static info list with a **lightweight, coding-themed
  animation**: a small "profile.js" code-editor widget that types out a
  JS-object profile summary character-by-character the first time it
  scrolls into view, then swaps in syntax-highlighted colors (keywords,
  keys, strings). Pure vanilla JS/CSS — no animation library, no external
  file dependency, respects `prefers-reduced-motion` (shows the finished
  snippet instantly instead of animating).
- Kept a short, tightened bio paragraph and your photo alongside it, since
  recruiters still benefit from a quick human-readable intro — only the
  generic "static info card" pattern was removed, not your information.
- The same profile summary is included as visually-hidden text for screen
  readers, so removing the visible prose doesn't remove the content from
  accessibility tools.

### Skills section — accuracy fix
- The previous version listed **React, Node.js, Express.js, MongoDB, and
  Figma** — none of which appear on your CV. Left in, these would read as
  fabricated skills to a recruiter cross-checking your résumé.
- Replaced with three categories that match your actual CV: **Programming
  Languages** (Java, C/C++, JavaScript), **Web Development** (HTML5, CSS3,
  Responsive Design), **Data & Tools** (SQL & Database Mgmt, Git & GitHub,
  Video Editing).
- Cards upgraded to the glass treatment with a mouse-follow glow on hover.

### Education — corrected timeline
- Fixed the B.Sc. start year, which incorrectly read **2022 — Present**;
  now **2024 — Present** to match your CV.
- Replaced the leftover "Add year range / Add previous education" placeholder
  entry with your real **HSC (2023)** and **SSC (2021)** entries.
- Timeline redesigned with icon-in-circle markers (cap / book icons per
  stage), a soft gradient connecting line, and a glass content card that
  shifts slightly on hover.

### Certificates — fixed cropping, modern cards
- The certificate image was set to `object-fit: cover`, which crops
  anything that doesn't exactly match the card's aspect ratio. Changed to
  `object-fit: contain` on a padded neutral panel, so **the full certificate
  is always visible**, uncropped, regardless of its original proportions —
  this holds for any future certificates you add, not just the current one.
- Grid changed from a fixed 4-column layout to a responsive
  `auto-fit, minmax(280px, 1fr)` layout, so it adapts cleanly whether you
  have one certificate or ten.
- Cards now use the glass surface, a stronger hover lift/shadow, and a
  clearer "Preview full certificate" label on the zoom overlay.

### Projects
- Kept the honest "Projects coming soon → see my GitHub" empty state from
  the previous version (no fabricated project cards), now restyled with the
  same glass card language as the rest of the site.

### Responsive / layout fixes
- Added a large-desktop breakpoint (≥1400px) that widens the content
  container slightly, so the design doesn't feel narrow on big monitors.
- Reworked the tablet breakpoint (≤992px): About section stacks cleanly,
  certificate grid recenters, timeline markers and spacing scale down.
- Reworked the mobile breakpoint (≤720px): code widget font size and
  padding shrink so it never overflows a small screen; certificate actions
  and lightbox padding adjusted.
- Added a dedicated small-mobile breakpoint (≤420px) fixing section
  padding, hero padding, navbar padding, timeline marker sizing, and
  certificate action buttons stacking to full width so nothing is cramped
  on the smallest phones.
- Verified image `width`/`height` attributes are present everywhere to
  prevent layout shift while images load.

### Performance & code quality
- Reorganized flat files into `css/`, `js/`, and `assets/` — no more mixing
  markup, styles, scripts, and binary assets in one folder.
- Added `defer` to the script tag and a `rel="preload"` hint for the
  stylesheet, alongside the existing hero-image preload.
- Removed dead/unused CSS (`.section-eyebrow`, `.eyebrow`, the old
  `.config-list` rules, the old `.image-placeholder`/`.avatar-placeholder`
  rules from earlier revisions) so the stylesheet only contains selectors
  that are actually used.
- All functionality from before is preserved and untouched: dark/light
  theme toggle, sticky nav with active-section highlighting, mobile nav,
  keyboard-accessible search modal (`/` to open), scroll-reveal animations,
  animated skill bars, certificate lightbox, scroll-to-top button, contact
  form validation + Formspree submission + honeypot spam field, and the
  Download CV button wiring.

## Contact form reminder

Same as before — the form validates and is ready to send, but needs a
delivery endpoint since this is a static site with no server of its own.
Open `js/script.js`, find:
```js
const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```
and replace `YOUR_FORM_ID` with your real Formspree form ID (free at
https://formspree.io). Until then, submitting the form opens the visitor's
email client with the message pre-filled instead, so nothing is lost.

## Deploying

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages) —
drag-and-drop the whole `portfolio-v2` folder or connect it as a repo.
