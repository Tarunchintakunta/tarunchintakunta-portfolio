import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SkillColumns, Stats } from '@/components/SkillColumns';
import { STACK, SUBJECTS } from '@/lib/site';
import { homeSkillOrder } from '@/lib/skills';

export function HomeStatic() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-blob" />
      <SiteHeader />
      <main id="content">
        <section className="page-hero wrap">
          <div className="label"><span>( A )</span><span>[ 001 /004 ]</span></div>
          <h1 className="display">Creative engineer for<br /><b>the interactive web</b></h1>
          <p className="lede">I design and build fast, tactile interfaces — WebGL, shaders, motion systems and the product thinking that holds them together.</p>
          <Link className="btn" href="/contact">Get in touch</Link>
        </section>
        <section className="section wrap">
          <h2 className="h2">Interfaces that move<br />the way people<br /><b>expect them to</b></h2>
          <p className="lede" style={{ marginTop: '2rem' }}>{STACK.join('  ·  ')}</p>
          <h2 className="h2" style={{ marginTop: '4rem', textAlign: 'right' }}>Shipping products where<br />engineering and<br /><b>craft meet</b></h2>
        </section>
        <section className="section wrap">
          <p className="display" style={{ fontSize: 'max(2.5rem, 6vw)' }}>design · build · ship</p>
        </section>
        <section className="section wrap">
          <h2 className="h2">Everything I use to<br /><b>get things shipped</b></h2>
          <div style={{ marginTop: '2rem' }}><SkillColumns order={homeSkillOrder} limit={4} /></div>
          <Link className="btn" href="/about" style={{ marginTop: '2rem' }}>More about me</Link>
        </section>
        <section className="section wrap">
          <h2 className="h2">Every build is a mix of systems,<br />motion and taste</h2>
          <p className="label-sm" style={{ margin: '2rem 0' }}>How I work</p>
          <Stats />
        </section>
        <section className="section wrap">
          <h2 className="h2">Built from pixels up</h2>
          <p className="lede">From shader math to deploy pipelines — I like owning the whole path from idea to the thing people actually touch.</p>
          <h2 className="h2" style={{ marginTop: '3rem' }}>Available for<br /><b>new work</b></h2>
          <h2 className="display" style={{ marginTop: '4rem' }}>Let&apos;s build<br /><b>something good</b></h2>
        </section>
      </main>
      <SiteFooter subject={SUBJECTS.home} />
    </>
  );
}
