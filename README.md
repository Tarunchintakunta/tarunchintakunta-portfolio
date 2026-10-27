# tarunchintakunta-portfolio

Cinematic portfolio for Tarun Chintakunta. Next.js App Router, static pages, and the original scroll-choreographed WebGL home (Three.js 0.184 and Lenis).

## Pages

| Route | What |
|---|---|
| `/` | Scroll-choreographed WebGL home. Reduced motion and missing WebGL get a static version of the same copy. |
| `/work` | Project index. Filters: All, Now building, Products, Client sites, Research. Hash links such as `/work#research` open that filter. |
| `/work/[slug]` | Case study for every project, including research. |
| `/skills` | Tools used to ship the work. |
| `/about` | Services, process, background. `/about#skills` sends the browser to `/skills`. |
| `/contact` | Project enquiry. |

Old HTML paths redirect: `/work.html` to `/work`, and `/project?p=prime-dcx` to `/work/prime-dcx`.

## Editing projects

All work lives in `lib/projects.json`. Each object has `slug`, `title`, `kind` (`product`, `client`, or `research`), `status`, `year`, `role`, `summary`, `stack`, optional `live` / `repo` / `image`, and `chapters` (`[heading, paragraphs]`). The first two non-research entries are the wide cards on `/work`.

`scripts/check-projects.mjs` checks that file against `scripts/projects.snapshot.json` and checks that every image exists.

Screenshots are `public/assets/work/<name>.jpg`. Paths in the data are root-relative, for example `/assets/work/lofte.jpg`.

## Contact form

The contact form and the footer email field post to `https://formsubmit.co/ajax/tarunchintakunta@gmail.com`. No keys. The first submission sends a one-time activation email to that inbox; open the link once and later messages are delivered. If the request fails, the form offers a prefilled `mailto:` link.

## Running locally

```sh
npm install
npm run dev
npm run check:projects
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs and the sitemap use it. On Vercel the production host is picked up from `VERCEL_PROJECT_PRODUCTION_URL` when that variable is unset.

The home scene loads `model.glb` from the existing public asset host and decodes it with the Draco files in `public/draco/`. If that model is slow or unavailable, the page continues without it.
