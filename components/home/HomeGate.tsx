'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { HomeStatic } from './HomeStatic';

const HomeStage = dynamic(() => import('./HomeStage'), { ssr: false });

function canWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function HomeGate() {
  const [mode, setMode] = useState<'pending' | 'static' | 'scene'>('pending');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMode(!reduce && canWebGL() ? 'scene' : 'static');
  }, []);

  if (mode === 'scene') return <HomeStage />;
  if (mode === 'static') return <HomeStatic />;
  return <div className="home-pending" />;
}
