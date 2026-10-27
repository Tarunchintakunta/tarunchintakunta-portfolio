'use client';

import { createElement, useEffect, useRef } from 'react';

function splitChars(el: HTMLElement) {
  if (!el.hasAttribute('aria-label')) {
    el.setAttribute('aria-label', (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim());
  }
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent || '') {
        if (ch === ' ') {
          frag.appendChild(document.createTextNode(' '));
          continue;
        }
        const mask = document.createElement('span');
        mask.className = 'char-mask';
        mask.setAttribute('aria-hidden', 'true');
        const char = document.createElement('span');
        char.className = 'hero-char';
        char.textContent = ch;
        mask.appendChild(char);
        frag.appendChild(mask);
      }
      (node as ChildNode).replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName !== 'BR') {
      [...node.childNodes].forEach(walk);
    }
  };
  [...el.childNodes].forEach(walk);
}

export function DisplayTitle({
  as = 'h1',
  className,
  children,
}: {
  as?: 'h1' | 'h2';
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!el.querySelector('.hero-char')) splitChars(el);
    const chars = [...el.querySelectorAll('.hero-char')];
    const timers: number[] = [];
    const start = window.setTimeout(() => {
      chars.forEach((char, index) => {
        timers.push(window.setTimeout(() => char.classList.add('revealed'), index * 22));
      });
    }, 120);
    return () => {
      window.clearTimeout(start);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return createElement(as, { ref, className }, children);
}
