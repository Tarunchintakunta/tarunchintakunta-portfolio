import type { Metadata } from 'next';
import Link from 'next/link';
import { DisplayTitle } from '@/components/DisplayTitle';
import { PageShell } from '@/components/PageShell';
import { SkillColumns, Stats } from '@/components/SkillColumns';
import { skillsPageOrder } from '@/lib/skills';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Everything Tarun Chintakunta uses to get things shipped: TypeScript, React, Three.js, GLSL, AI tooling, and cloud infrastructure.',
  alternates: { canonical: '/skills' },
  openGraph: {
    title: 'Skills — Tarun Chintakunta',
    description: 'Frontend, graphics, backend, AI, infrastructure, and design.',
  },
};

export default function SkillsPage() {
  return (
    <PageShell>
      <section className="page-hero wrap">
        <div className="label"><span>( S )</span><span>[ skills ]</span></div>
        <DisplayTitle className="display">Everything I use to<br /><b>get things shipped</b></DisplayTitle>
        <hr className="hairline" style={{ marginTop: '4rem' }} />
      </section>
      <section className="section wrap">
        <SkillColumns order={skillsPageOrder} />
        <hr className="hairline" style={{ margin: '3rem 0' }} />
        <Stats />
      </section>
      <section className="cta wrap">
        <h2 className="display">Let’s build<br /><b>something good</b></h2>
        <Link className="btn btn-solid" href="/contact">Get in touch</Link>
      </section>
    </PageShell>
  );
}
