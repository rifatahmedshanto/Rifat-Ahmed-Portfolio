# Rifat Ahmed — Portfolio

A responsive, single-page portfolio built with plain HTML, CSS, and JavaScript
(no build step, no framework — just open `index.html`).

## File structure

Everything lives in one folder — no subfolders, so it's easy to drag-and-drop
into any host:

```
portfolio-flat/
├── index.html
├── style.css
├── script.js
├── README.md
├── rifat-ahmed-hero.jpg / .webp      (hero photo, used in the terminal avatar)
├── rifat-ahmed-about.jpg / .webp     (About section portrait)
├── rifat-ahmed-avatar.jpg            (spare small crop, not currently used)
├── cert-oop-java.jpg / .webp         (certificate preview thumbnail)
├── Rifat-Ahmed-CV.pdf
└── Rifat-Ahmed-OOP-Java-Certificate.pdf
```

## 1. Run it locally

No build tools needed. Either:
- Double-click `index.html`, or
- Serve it properly (recommended, avoids some browser file:// quirks):
  ```bash
  cd portfolio
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## 2. Make the contact form actually send email (2 minutes)

The form validates input and is wired to submit, but it needs a delivery
endpoint since this is a static site with no server of its own.

1. Go to **https://formspree.io** and sign up free.
2. Create a new form — Formspree gives you an endpoint that looks like
   `https://formspree.io/f/abcdwxyz`.
3. Open `script.js`, find this line near the top:
   ```js
   const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   and replace `YOUR_FORM_ID` with your real form ID.
4. Done — submissions will land in the inbox you signed up with
   (`rifatahmedshanto0@gmail.com`), no server required.

**Until you do this**, the form still validates properly, but instead of
sending automatically it opens the visitor's email app with the message
pre-filled to your address — so no message is ever silently lost.

Formspree's free tier includes spam filtering; the form also has a
honeypot field as a first line of defense against basic bots.

## 3. Swap in your own CV / certificates later

- CV: replace `Rifat-Ahmed-CV.pdf` with a new file of the same name, or
  change the path in `script.js` (`CV_FILE_PATH`).
- Certificates: duplicate the `.cert-card.cert-card-photo` block in the
  Certificates section of `index.html`, add a new preview image to the
  folder, and point `data-cert-img` / the View / Download links at the new
  files.

## 4. Add real projects

The Projects section currently shows a "Projects coming soon" empty state on
purpose — placeholder project cards with fake titles read poorly to
recruiters. When you have projects to show, `index.html` has a commented
template right above the empty state; duplicate it, fill in the details, and
delete the empty-state block.

## 5. Deploy it for free

Any static host works since there's no backend:
- **GitHub Pages**: push this folder to a repo, enable Pages in Settings.
- **Netlify** or **Vercel**: drag-and-drop the folder in their dashboard, or
  connect the GitHub repo for auto-deploys.
- **Cloudflare Pages**: same idea, also free.

After deploying, update these two lines in `index.html`'s `<head>` with your
real live URL (currently a placeholder):
```html
<link rel="canonical" href="https://rifatahmedshanto.dev/" />
<meta property="og:url" content="https://rifatahmedshanto.dev/" />
```

## What changed from the original

- Real photo added to the hero and About sections (optimized JPG + WebP)
- Custom animated "coding" illustration added beside the hero terminal —
  built as inline SVG/CSS rather than a hotlinked third-party Lottie file,
  so it can't go dead or add an external network dependency; swap in a real
  `<lottie-player>` embed later if you'd like (see note below)
- About section: placeholder bio replaced with real copy based on your CV
- Certificates section: rebuilt around your actual Java OOP certificate,
  with a click-to-zoom preview, View, and Download
- Download CV button wired to your real CV file
- Contact form made functional (see setup step above), plus basic spam
  protection
- Fixed a broken duplicated LinkedIn URL and removed a dead Twitter/X link
- Removed fake placeholder project cards; added an honest empty state
- Added SEO meta tags, Open Graph/Twitter cards, canonical URL, and
  JSON-LD structured data
- Compressed and added WebP versions of all new images for performance

### On the Lottie request specifically
You asked for a LottieFiles animation of a person coding. Publicly hosted
Lottie JSON URLs on lottiefiles.com are served from a system that requires
their JS player to resolve at click-time, so I couldn't verify a link would
still work by the time you open this site. Rather than risk a broken/blank
embed, I built an equivalent lightweight animated illustration directly in
the code (typing hands, appearing code lines, gentle float) that matches
your site's terminal aesthetic exactly and never depends on an external
service. If you'd still like a specific LottieFiles animation, grab its
"Lottie JSON URL" from the site's embed tab and swap it into
`.coding-illustration` in `index.html` using their `lottie-player` script.
