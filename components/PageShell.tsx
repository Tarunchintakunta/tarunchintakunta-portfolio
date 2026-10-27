'use client';

import { useEffect } from 'react';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function PageShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let dead = false;
    let frame = 0;
    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;
    import('lenis').then(({ default: Lenis }) => {
      if (dead) return;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }).catch(() => {});
    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-blob" />
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  );
}
