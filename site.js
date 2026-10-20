/* Shared behaviour + project data for the secondary pages. No build step. */

export const EMAIL = 'tarunchintakunta@gmail.com';
export const GITHUB = 'https://github.com/Tarunchintakunta';
// Zero-setup mail relay: first submission triggers a one-time activation email to EMAIL.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

/* ---------- projects ---------- */
export const PROJECTS = [
  {
    slug: 'streamlineos', title: 'StreamlineOS', kind: 'product', status: 'ongoing', year: '2025 — now',
    role: 'Founder · product & full-stack', live: 'https://www.streamlineos.in', image: 'assets/work/streamlineos.jpg',
    summary: 'One operating system for running a business: HR, payroll, CRM, projects, inventory, finance, workflows, helpdesk and AI. Built in India, priced in INR.',
    stack: ['Next.js', 'Node', 'NestJS', 'PostgreSQL · Neon', 'Cloudflare R2', 'Vercel', 'Gemini / OpenAI'],
    chapters: [
      ['The brief', ['Small and mid-size teams run on a patchwork: one tool for HR, another for CRM, spreadsheets for finance, chat threads for approvals. Nobody has one view of the business.', 'StreamlineOS replaces the patchwork with one system where every module shares the same people, permissions and data.']],
      ['What I built', [
        'Opt-in modules: HR, Projects, CRM, Chat, Calendar, Analytics, Recruitment, Accounting and Support. Turn on what you need; permissions follow modules.',
        'A visual workflow canvas that runs steps across modules with conditions and approvals, plus a full run audit log.',
        'An Approval Center for deals, leave requests and pay runs, so anything that needs a human lands in one queue.',
        '“Ask OS”: a cross-module AI assistant that drafts actions and waits for confirmation before writing anything.',
        'Multi-entity organizations with row-level isolation, role-based access, MFA, IP allow-listing, audit logs and encrypted storage.',
        'Integrations with Razorpay, Stripe, Gmail, Slack, GitHub and Outlook, plus webhooks and a public API.'
      ]],
      ['Status', ['Live. Free for up to 5 seats, six-month trial on paid plans. Self-hostable anywhere Node, PostgreSQL and an S3-compatible store run.']]
    ]
  },
  {
    slug: 'lofte-studios', title: 'Løfte Studios', kind: 'client', status: 'ongoing', year: '2026',
    role: 'Design & build', live: 'https://lofte-studios.vercel.app', repo: `${GITHUB}/lofte-studios`, image: 'assets/work/lofte.jpg',
    summary: 'Marketing site for a creative-production and digital-storytelling studio in Hyderabad. Scroll-driven motion, a typed content layer, and a launch checklist that refuses to ship placeholders.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'GSAP', 'Zod', 'Playwright'],
    chapters: [
      ['The brief', ['Løfte puts copy, video, visuals, audio, localization and strategy under one roof. The site had to read like the studio’s own work: editorial, moving, precise.']],
      ['What I built', [
        'Reveal-on-scroll blocks, a word-by-word statement animation, a horizontal scroll gallery, a pinned feature section and a step rail for the six-step method.',
        'Six capability cards, audience segments and a “one room” comparison of the usual handoff route against a single team.',
        'An enquiry form with validation that degrades safely when the mailbox is not configured yet.',
        'Content read from a typed seed, with a planned swap to Sanity CMS. Missing facts render as labelled placeholders, and the build fails while any placeholder is still on the launch checklist.',
        'Motion respects reduced-motion settings. Analytics load only when configured.'
      ]],
      ['Status', ['In preview while the studio finalises photography, facts and the enquiry inbox. Production domain next.']]
    ]
  },
  {
    slug: 'skylark-exim', title: 'Skylark Exim', kind: 'client', status: 'live', year: '2026',
    role: 'Creative development', live: 'https://skylark-site-rouge.vercel.app', repo: `${GITHUB}/skylark-exim-cinematic`, image: 'assets/work/skylark.jpg',
    summary: 'A single-page WebGL cinematic scroll for an Indian seafood exporter. Three.js scenes choreographed to the scrollbar with GSAP ScrollTrigger.',
    stack: ['Three.js', 'React Three Fiber', 'GSAP ScrollTrigger', 'TypeScript', 'Vercel'],
    chapters: [
      ['The brief', ['An exporter wanted a site that felt like the product, cold, clean and premium, rather than a catalogue with a hero image.']],
      ['What I built', [
        'One continuous scroll where each chapter is a 3D scene. Camera moves are bound to scroll position and the copy is choreographed on the same timeline.',
        'Iterated across four builds, tuning draw calls and texture budgets so it holds frame rate on mid-range laptops and phones.'
      ]],
      ['Status', ['Live.']]
    ]
  },
  {
    slug: 'prime-dcx', title: 'Prime DCX', kind: 'client', status: 'live', year: '2026',
    role: 'Creative development', live: 'https://prime-dcx.vercel.app', repo: `${GITHUB}/prime-dcx`, image: 'assets/work/primedcx.jpg',
    summary: '“The Market Engine”: a real-time WebGL trading site built on Blender-authored sets. Data-tunnel fly-throughs, a vault transition and a mobile reveal, all scrubbed by scroll.',
    stack: ['Three.js', 'Blender', 'GSAP', 'TypeScript', 'Vercel'],
    chapters: [
      ['The brief', ['A multi-asset trading brand (forex, crypto, indices, commodities, metals, CFDs) needed to explain a complex product as a sequence of chapters without losing the feeling of speed.']],
      ['What I built', [
        'Sets modelled and lit in Blender, exported as compressed GLB and driven in Three.js.',
        'Eleven chapters from Engine to Get started: a live-style ticker, simulated terminal and order-book previews, execution and risk controls, security, funding and the mobile app.',
        'Risk disclosures built into the structure rather than tucked into a footer.'
      ]],
      ['Status', ['Live.']]
    ]
  },
  {
    slug: 'vaivamm-capital', title: 'Vaivamm Capital Advisors', kind: 'client', status: 'live', year: '2026',
    role: 'Design & full-stack', live: 'https://vaivammcapital.com', image: 'assets/work/vaivamm.jpg',
    summary: 'Marketing site and client portal for a Hyderabad investment management and trading advisory firm: plans, process, demo booking and sign-in, on Next.js.',
    stack: ['Next.js', 'React', 'TypeScript', 'Turbopack', 'Vercel'],
    chapters: [
      ['The brief', ['A newly registered advisory firm needed to look established from day one: clear plans, a visible process, and a way for prospects to book a conversation without a phone call.']],
      ['What I built', [
        'A fast, server-rendered marketing site: hero with live-style portfolio chart, stat cards, trust strip, and a five-step “How we work” process from onboarding to tax documentation.',
        'Plan cards for each investment product with key features and detail pages, plus a FAQ and client stories section.',
        'Demo booking and client sign-in flows, so the site doubles as the front door to the client area.',
        'Deployed on Vercel with Next.js and Turbopack builds for quick iteration as the firm’s offering changes.'
      ]],
      ['Status', ['Live at vaivammcapital.com.']]
    ]
  },
  {
    slug: 'settleshort', title: 'SettleShort', kind: 'product', status: 'live', year: '2026',
    role: 'Design & full-stack', live: 'https://settleshort.vercel.app', repo: `${GITHUB}/settleshort`, image: 'assets/work/settleshort.jpg',
    summary: 'Receipt in. Settled out. One approve. AI reads receipts, PDFs and Slack messages, flags duplicates, and pays teammates through PayPal after a single human approval.',
    stack: ['Next.js', 'TypeScript', 'Claude / OpenAI vision', 'On-device OCR', 'PayPal Payouts', 'Postgres'],
    chapters: [
      ['The brief', ['Reimbursements are a chore: photos in chat, a spreadsheet, manual transfers, and nobody sure whether a receipt was already claimed.']],
      ['What I built', [
        'Capture by photo, PDF or a forwarded message like “I paid $84 for dinner for @sam @rita”.',
        'On-device OCR by default, Claude or OpenAI vision when a key is set. Every extracted field points at the receipt text it came from.',
        'Rule-based duplicate matching on amount, date and merchant. Look-alikes go to review with a one-line reason.',
        'AI reads, matches and drafts, but cannot pay. An admin approves the batch and types a confirmation word.',
        'PayPal payouts with webhook results, per-payout and per-batch limits, and idempotent batch IDs so a retry never pays anyone twice. Audit log and CSV export.'
      ]],
      ['Status', ['Live as a sandbox build: no real money moves. MIT licensed.']]
    ]
  },
  {
    slug: 'contextharbor', title: 'ContextHarbor', kind: 'product', status: 'in progress', year: '2026',
    role: 'Full-stack & desktop', repo: `${GITHUB}/ContextHarbor`,
    summary: 'A private meeting assistant for Windows and macOS. Short, cited answers from each client’s own documents during the call, with speech-to-text and retrieval running locally.',
    stack: ['Electron', 'Next.js', 'Node', 'Postgres', 'Cloudflare R2', 'whisper.cpp', 'Ollama', 'Deepgram', 'Claude'],
    chapters: [
      ['The brief', ['Consultants juggle many clients. The answer is usually in a document they cannot find mid-call.']],
      ['What I built', [
        'A web dashboard for login, admin invites and document upload.',
        'An API for auth, workspaces, document extraction, desktop sync and blob storage on Cloudflare R2.',
        'A desktop app with local speech-to-text, hybrid retrieval-augmented generation and a floating overlay that stays out of the way.'
      ]],
      ['Status', ['The core path works end to end, with 26 desktop tests. Code signing, email MFA and server-side streaming are next.']]
    ]
  },
  {
    slug: 'the-residence', title: 'The Residence', kind: 'client', status: 'shipped', year: '2026',
    role: 'Creative development', repo: `${GITHUB}/theresidence`,
    summary: 'Cinematic scroll site for a private retirement community. A 50-second dawn-to-night film scrubbed frame by frame on canvas.',
    stack: ['JavaScript', 'Canvas', 'Lenis'],
    chapters: [
      ['The brief', ['Show the place across a whole day, without a video player and without autoplay.']],
      ['What I built', [
        'The film split into frames and drawn to a canvas. Scroll position maps to time, smoothed with Lenis so the day moves at the reader’s pace.',
        'Copy appears at the hour it belongs to.'
      ]]
    ]
  },
  {
    slug: 'eventops', title: 'EventOps', kind: 'product', status: 'shipped', year: '2025',
    role: 'Full-stack', repo: `${GITHUB}/eventops-marketplace`,
    summary: 'All-in-one marketplace for booking reliable event contractors in India.',
    stack: ['Next.js 15', 'TypeScript', 'Postgres', 'Vercel'],
    chapters: [
      ['What I built', ['Contractor profiles, search and booking flow, and the admin side to keep listings reliable.']]
    ]
  },
  {
    slug: 'resume-job-matching', title: 'Resume ↔ Job Matching', kind: 'product', status: 'live', year: '2026',
    role: 'Full-stack & NLP', live: 'https://resume-job-matching.vercel.app', repo: `${GITHUB}/Resume_job_matching`, image: 'assets/work/resumematch.jpg',
    summary: 'Parses PDF and DOCX resumes and ranks candidates against job postings with NLP.',
    stack: ['FastAPI', 'React', 'MongoDB', 'Python NLP'],
    chapters: [
      ['What I built', ['Resume parsing for PDF and DOCX, skill and experience extraction, and a ranking model that scores every candidate against a posting.']]
    ]
  },
  { slug: 'zombie-container-detection', title: 'Zombie container detection', kind: 'research', status: 'research', year: '2026', role: 'Research', repo: `${GITHUB}/zombie-container-detection`,
    summary: 'Heuristic framework that detects idle Kubernetes containers from CPU and memory patterns.', stack: ['Python', 'Kubernetes'] },
  { slug: 'federated-fraud-detection', title: 'Federated fraud detection', kind: 'research', status: 'research', year: '2026', role: 'Research', repo: `${GITHUB}/federated-fraud-detection`,
    summary: 'Banks collaborate on fraud detection without sharing raw data.', stack: ['Python', 'Federated learning'] },
  { slug: 'zero-trust-simulator', title: 'Zero-trust simulator', kind: 'research', status: 'research', year: '2025', role: 'Research', repo: `${GITHUB}/Zero_trust_simulator`,
    summary: 'Generates synthetic user and device logs for hybrid-work setups, simulates attacks, and evaluates zero-trust policies.', stack: ['Python'] },
  { slug: 'decentralized-access-control', title: 'Decentralized cloud access control', kind: 'research', status: 'research', year: '2025', role: 'Research', repo: `${GITHUB}/Decentralized-Cloud-Resource-Access-Control`,
    summary: 'Blockchain smart contracts and FROST threshold cryptography for cloud resource access.', stack: ['Solidity', 'JavaScript', 'FROST'] },
  { slug: 'edge-fog-offloading', title: 'Edge-fog task offloading', kind: 'research', status: 'research', year: '2025', role: 'Research', repo: `${GITHUB}/edge-fog-task-offloading-system`,
    summary: 'Fuzzy-logic task offloading for Edge-Fog computing environments.', stack: ['Java'] }
];

export const KIND_LABEL = { product: 'Product', client: 'Client site', research: 'Research' };

/* ---------- small helpers ---------- */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const splitChars = (el) => {
  const walk = (node) => {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent) {
        if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
        const m = document.createElement('span'); m.className = 'char-mask';
        const c = document.createElement('span'); c.className = 'hero-char'; c.textContent = ch;
        m.appendChild(c); frag.appendChild(m);
      }
      node.replaceWith(frag);
    } else if (node.nodeType === 1 && node.tagName !== 'BR') {
      [...node.childNodes].forEach(walk);
    }
  };
  [...el.childNodes].forEach(walk);
};

/* ---------- boot: nav state, smooth scroll, reveals ---------- */
export function boot() {
  const here = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const target = (a.getAttribute('href') || '').replace(/\.html$/, '').replace(/#.*$/, '');
    if (target === here || (here === 'project' && target === 'work')) a.setAttribute('aria-current', 'page');
  });

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }).catch(() => {});
  }

  document.querySelectorAll('[data-chars]').forEach((el) => {
    splitChars(el);
    const chars = el.querySelectorAll('.hero-char');
    requestAnimationFrame(() => setTimeout(() => chars.forEach((c, i) => setTimeout(() => c.classList.add('revealed'), i * 22)), 120));
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  const foot = document.querySelector('.site-footer');
  if (foot && !foot.children.length) foot.innerHTML = footerHTML();
  document.querySelectorAll('form[data-mail]').forEach(wireForm);
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
}

/* ---------- footer (one source for every secondary page) ---------- */
function footerHTML() {
  return `<div class="glass-footer">
    <div class="footer-top">
      <div class="footer-left">
        <h2>Tarun Chintakunta</h2>
        <div class="footer-heading">Drop your email, I'll reply.</div>
        <form class="footer-input-group" data-mail data-subject="Email drop — portfolio" data-ok="Got it. I’ll reply within a day.">
          <input type="email" name="email" placeholder="your@email.com" class="footer-input" required aria-label="Your email">
          <input type="text" name="_honey" class="honey" tabindex="-1" autocomplete="off" aria-hidden="true">
          <button class="footer-submit" type="submit">Send</button>
        </form>
        <div class="form-status" role="status" aria-live="polite" style="font-size:0.85rem; margin-bottom:0.5rem;"></div>
        <div class="footer-subtext">Open to product engineering, creative development and WebGL-heavy builds.</div>
      </div>
      <div class="footer-right">
        <div class="footer-col"><div class="footer-col-title">Work</div><a href="work.html">Selected projects</a><a href="work.html#product">Products</a><a href="work.html#client">Client sites</a><a href="work.html#research">Research</a></div>
        <div class="footer-col"><div class="footer-col-title">Now building</div><a href="project.html?p=streamlineos">StreamlineOS</a><a href="project.html?p=lofte-studios">Løfte Studios</a><a href="project.html?p=contextharbor">ContextHarbor</a></div>
        <div class="footer-col"><div class="footer-col-title">Elsewhere</div><a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a><a href="https://www.streamlineos.in" target="_blank" rel="noopener">StreamlineOS</a></div>
        <div class="footer-col"><div class="footer-col-title">Contact</div><a href="mailto:${EMAIL}">${EMAIL}</a><a href="contact.html">Start a project</a><a href="about.html">About</a></div>
      </div>
    </div>
    <div class="footer-line"></div>
    <div class="footer-bottom">© <span data-year>2026</span> Tarun Chintakunta. All rights reserved.</div>
  </div>`;
}

/* ---------- contact / footer forms → FormSubmit → EMAIL ---------- */
function wireForm(form) {
  const status = form.querySelector('.form-status') || form.nextElementSibling?.matches('.form-status') && form.nextElementSibling || null;
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // bot
    delete data._honey;
    const subject = form.dataset.subject || 'New message from tarunchintakunta portfolio';
    const payload = { ...data, _subject: subject, _template: 'table', _captcha: 'false', _replyto: data.email || '' };
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    if (status) { status.textContent = ''; status.className = 'form-status'; }
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload)
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === 'false') throw new Error(json.message || `HTTP ${res.status}`);
      form.reset();
      if (status) { status.textContent = form.dataset.ok || 'Sent. I’ll reply from ' + EMAIL + ' within a day.'; status.className = 'form-status ok'; }
      if (btn) btn.textContent = 'Sent ✓';
      setTimeout(() => { if (btn) btn.textContent = original; }, 4000);
    } catch (err) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
      const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) {
        status.innerHTML = `Couldn’t send through the form. <a href="${mailto}">Open this as an email</a> or write to <a href="mailto:${EMAIL}">${EMAIL}</a>.`;
        status.className = 'form-status err';
      }
      if (btn) btn.textContent = original;
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

/* ---------- work list ---------- */
export function renderWork(root) {
  const shown = PROJECTS.filter((p) => p.kind !== 'research');
  const research = PROJECTS.filter((p) => p.kind === 'research');
  const card = (p, i) => {
    const live = p.status === 'live' || p.status === 'ongoing';
    const wide = i < 2 ? ' wide' : '';
    const img = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.title)} — screenshot" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'shot-placeholder',textContent:'${esc(p.title).replace(/'/g, '')}'}))">`
      : `<div class="shot-placeholder">${esc(p.title)}</div>`;
    return `<a class="work-card reveal${wide}" href="project.html?p=${esc(p.slug)}" data-kind="${esc(p.kind)}" data-status="${esc(p.status)}">
      <div class="shot"><span class="badge${live ? ' live' : ''}"><span class="dot"></span>${esc(p.status)}</span>${img}</div>
      <div class="work-meta"><h3 class="work-title">${esc(p.title)}</h3><span class="work-kind">${esc(KIND_LABEL[p.kind])} · ${esc(p.year)}</span></div>
      <p class="work-summary">${esc(p.summary)}</p>
      <div class="tags">${p.stack.slice(0, 5).map((s) => `<span class="tag">${esc(s)}</span>`).join('')}</div>
    </a>`;
  };
  const row = (p, i) => `<a class="row reveal" href="${esc(p.repo || '#')}" target="_blank" rel="noopener" data-kind="research" data-status="research">
      <span class="row-idx">[ ${String(i + 1).padStart(2, '0')} ]</span>
      <span class="row-title">${esc(p.title)}</span>
      <span class="row-desc">${esc(p.summary)}</span>
      <span class="row-stack">${p.stack.map(esc).join(' · ')} ↗</span>
    </a>`;
  root.querySelector('#work-grid').innerHTML = shown.map(card).join('');
  root.querySelector('#research-rows').innerHTML = research.map(row).join('');
  root.querySelector('#work-count').textContent = String(PROJECTS.length).padStart(3, '0');

  const filters = root.querySelectorAll('.filter');
  const apply = (f) => {
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    root.querySelectorAll('[data-kind]').forEach((el) => {
      const hit = f === 'all' || el.dataset.kind === f || (f === 'ongoing' && (el.dataset.status === 'ongoing' || el.dataset.status === 'in progress'));
      el.classList.toggle('is-hidden', !hit);
      if (hit) el.classList.add('in');
    });
    const research = root.querySelector('#research-section');
    research.style.display = (f === 'all' || f === 'research') ? '' : 'none';
    const grid = root.querySelector('#work-grid');
    grid.style.display = f === 'research' ? 'none' : '';
  };
  filters.forEach((b) => b.addEventListener('click', () => { apply(b.dataset.filter); history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : `#${b.dataset.filter}`); }));
  const initial = location.hash.slice(1);
  apply([...filters].some((b) => b.dataset.filter === initial) ? initial : 'all');
}

/* ---------- project detail ---------- */
export function renderProject(root) {
  const slug = new URLSearchParams(location.search).get('p');
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx < 0) { location.replace('work.html'); return; }
  const p = PROJECTS[idx];
  const next = PROJECTS.filter((q) => q.kind !== 'research')[(PROJECTS.filter((q) => q.kind !== 'research').findIndex((q) => q.slug === slug) + 1) % PROJECTS.filter((q) => q.kind !== 'research').length];
  document.title = `${p.title} — Tarun Chintakunta`;
  const meta = document.querySelector('meta[name="description"]'); if (meta) meta.content = p.summary;

  root.querySelector('#p-index').textContent = `[ ${String(idx + 1).padStart(3, '0')} / ${String(PROJECTS.length).padStart(3, '0')} ]`;
  root.querySelector('#p-kind').textContent = `${KIND_LABEL[p.kind]} · ${p.status}`;
  root.querySelector('#p-title').textContent = p.title;
  root.querySelector('#p-summary').textContent = p.summary;
  root.querySelector('#p-shot').innerHTML = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)} — screenshot" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'shot-placeholder',textContent:'${esc(p.title).replace(/'/g, '')}'}))">`
    : `<div class="shot-placeholder">${esc(p.title)}</div>`;
  root.querySelector('#p-role').textContent = p.role;
  root.querySelector('#p-year').textContent = p.year;
  root.querySelector('#p-stack').innerHTML = p.stack.map(esc).join('<br>');
  const links = [];
  if (p.live) links.push(`<a href="${esc(p.live)}" target="_blank" rel="noopener">Visit site ↗</a>`);
  if (p.repo) links.push(`<a href="${esc(p.repo)}" target="_blank" rel="noopener">Source on GitHub ↗</a>`);
  root.querySelector('#p-links').innerHTML = links.join('') || '<span style="opacity:.5">Private</span>';
  root.querySelector('#p-chapters').innerHTML = (p.chapters || []).map(([h, items]) => `
    <section class="chapter reveal">
      <h2 class="h3">${esc(h)}</h2>
      <div class="body">${items.length > 1 && h === 'What I built' ? `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : items.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
    </section>`).join('');
  const nx = root.querySelector('#p-next');
  nx.href = `project.html?p=${esc(next.slug)}`;
  nx.querySelector('.h2').textContent = next.title;
  root.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}
