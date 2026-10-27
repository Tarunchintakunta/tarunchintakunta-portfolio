'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AboutHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (window.location.hash === '#skills') router.replace('/skills');
  }, [router]);
  return null;
}
