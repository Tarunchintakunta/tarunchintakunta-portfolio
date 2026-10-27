'use client';

import { useEffect, useRef } from 'react';

export function Reveal({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        el.classList.add('in');
        observer.disconnect();
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${className}`.trim()}>{children}</div>;
}
