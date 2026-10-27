'use client';

import { useState } from 'react';

export function Shot({ src, title, eager = false }: { src?: string; title: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className="shot-placeholder">{title}</div>;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- broken files must fall back to the title placeholder
    <img
      src={src}
      alt={`${title} — screenshot`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
