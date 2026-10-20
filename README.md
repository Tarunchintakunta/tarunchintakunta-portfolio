# tarunchintakunta-portfolio

Interactive WebGL portfolio. Static files, no build step. Deployed on Vercel (`vercel.json` turns on clean URLs).

## Pages

| File | URL (prod) | What |
|---|---|---|
| `index.html` | `/` | Scroll-choreographed WebGL home (Three.js r0.184 + Lenis via CDN importmap) |
| `work.html` | `/work` | Project index with filters (Now building / Products / Client sites / Research) |
| `project.html?p=<slug>` | `/project?p=<slug>` | Case study page, rendered from `PROJECTS` in `site.js` |
| `about.html` | `/about` | Services, process, skills (`#skills`), background |
| `contact.html` | `/contact` | Enquiry form + direct email |

Shared styling for the secondary pages lives in `site.css`; data, footer, forms and reveals in `site.js`.

## Editing projects

Everything on `/work` and `/project` comes from the `PROJECTS` array at the top of `site.js`. Add an object with `slug`, `title`, `kind` (`product` | `client` | `research`), `status`, `year`, `role`, `summary`, `stack`, optional `live` / `repo` / `image`, and `chapters` (`[heading, [paragraphs]]`). The first two non-research entries render as the wide “now building” cards.

Screenshots go in `assets/work/<name>.jpg` (1440×900 crops, ~1200px wide is plenty).

## Contact form → email

Both the contact form and the footer email drop POST to `https://formsubmit.co/ajax/tarunchintakunta@gmail.com`. No account or keys needed. **The very first submission sends a one-time activation email to that inbox; click the link in it once and every later message is delivered.** If the request fails, the form falls back to a prefilled `mailto:` link.

## Running locally

Module scripts need http, not `file://`:

```sh
python3 -m http.server 8765
# open http://localhost:8765
```
