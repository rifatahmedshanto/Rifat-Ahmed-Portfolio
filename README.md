# Rifat Ahmed — Portfolio

A responsive, single-page portfolio built with plain HTML, CSS, and JavaScript
(no build step, no framework — just open `index.html`).

## File structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── rifat-ahmed-avatar.jpg / .webp    (small avatar used in the hero terminal)
    │   ├── rifat-ahmed-about.jpg / .webp     (portrait, used for social-share meta tags)
    │   └── cert-oop-java.jpg / .webp         (certificate preview image)
    └── docs/
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
3. Open `js/script.js`, find this line near the top:
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

- CV: replace `assets/docs/Rifat-Ahmed-CV.pdf` with a new file of the same
  name, or change the path in `js/script.js` (`CV_FILE_PATH`).
- Certificates: duplicate the `.cert-card.cert-card-photo` block in the
  Certificates section of `index.html`, add a new preview image to
  `assets/images/`, and point `data-cert-img` / the View / Download links at
  the new files. The certificate thumbnail uses `object-fit: contain` on a
  padded card, so any certificate image — portrait or landscape — will
  display in full, never cropped.

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

## What changed in this redesign

See `CHANGELOG.md` in this folder for the full, detailed list of every
change made in this pass (visual redesign, responsive fixes, About section
rebuild, Education timeline update, Certificates rework, performance and
asset optimization, and folder reorganization).
