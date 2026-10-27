import type { Metadata } from 'next';
import { HomeGate } from '@/components/home/HomeGate';

export const metadata: Metadata = {
  title: { absolute: 'Tarun Chintakunta — Portfolio' },
  description: 'Tarun Chintakunta — creative engineer for the interactive web. Products, cinematic WebGL sites and AI tools, built end to end.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeGate />;
}
