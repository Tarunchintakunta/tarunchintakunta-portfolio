'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link className="site-logo" href="/">Tarun&nbsp;C.</Link>
      <nav className="site-nav" aria-label="Primary">
        {NAV.map((item) => {
          const current = pathname === item.href || (item.href === '/work' && pathname.startsWith('/work/'));
          return (
            <Link key={item.href} href={item.href} aria-current={current ? 'page' : undefined}>
              {item.label} <span className="nav-arrow">↗</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
