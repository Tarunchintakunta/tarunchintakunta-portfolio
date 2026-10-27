'use client';

import Link from 'next/link';
import { EmailDrop } from './EmailDrop';
import { EMAIL, GITHUB, STREAMLINE_URL, SUBJECTS } from '@/lib/site';

function WorkFilterLink({ hash, children }: { hash: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/work#${hash}`}
      onClick={(event) => {
        if (window.location.pathname !== '/work') return;
        event.preventDefault();
        if (window.location.hash === `#${hash}`) return;
        window.location.hash = hash;
      }}
    >
      {children}
    </Link>
  );
}

export function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}

export function SiteFooter({ subject = SUBJECTS.footer }: { subject?: string }) {
  return (
    <footer className="site-footer">
      <div className="glass-footer">
        <div className="footer-top">
          <div className="footer-left">
            <h2>Tarun Chintakunta</h2>
            <div className="footer-heading">Drop your email, I&apos;ll reply.</div>
            <EmailDrop subject={subject} ok="Got it. I’ll reply within a day." />
            <div className="footer-subtext">Open to product engineering, creative development and WebGL-heavy builds.</div>
          </div>
          <div className="footer-right">
            <div className="footer-col">
              <div className="footer-col-title">Work</div>
              <Link href="/work">Selected projects</Link>
              <WorkFilterLink hash="product">Products</WorkFilterLink>
              <WorkFilterLink hash="client">Client sites</WorkFilterLink>
              <WorkFilterLink hash="research">Research</WorkFilterLink>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Now building</div>
              <Link href="/work/streamlineos">StreamlineOS</Link>
              <Link href="/work/lofte-studios">Løfte Studios</Link>
              <Link href="/work/contextharbor">ContextHarbor</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Elsewhere</div>
              <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
              <a href={STREAMLINE_URL} target="_blank" rel="noopener">StreamlineOS</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Contact</div>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <Link href="/contact">Start a project</Link>
              <Link href="/about">About</Link>
            </div>
          </div>
        </div>
        <div className="footer-line" />
        <div className="footer-bottom">© <Year /> Tarun Chintakunta. All rights reserved.</div>
      </div>
    </footer>
  );
}
