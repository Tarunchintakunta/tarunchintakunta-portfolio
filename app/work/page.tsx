import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { WorkIndex } from '@/components/WorkIndex';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected work by Tarun Chintakunta: StreamlineOS, Løfte Studios, Skylark Exim, Prime DCX, SettleShort and more. Products, client sites and research.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work — Tarun Chintakunta',
    description: 'Products, WebGL client sites and AI tools, built end to end.',
  },
};

export default function WorkPage() {
  return (
    <PageShell>
      <WorkIndex />
    </PageShell>
  );
}
