import type { Metadata } from 'next';
import Link from 'next/link';
import { AboutHashRedirect } from '@/components/AboutHashRedirect';
import { DisplayTitle } from '@/components/DisplayTitle';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { SkillColumns } from '@/components/SkillColumns';
import { GITHUB } from '@/lib/site';
import { skillsPageOrder } from '@/lib/skills';

export const metadata: Metadata = {
  title: 'About',
  description: 'Tarun Chintakunta is a full-stack engineer and creative developer. MSc Cloud Computing. Builds AI-powered products and WebGL-heavy sites end to end, from the model call to the deploy.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About — Tarun Chintakunta', description: 'Full-stack engineer who ships the whole thing.' },
};

const services = [
  ['Product engineering', 'Full products on Next.js, Node and Postgres: auth, billing, workflows, approvals, audit logs, multi-tenant data. The unglamorous parts done properly.'],
  ['Cinematic web', 'Three.js scenes, GLSL shaders and GSAP timelines choreographed to the scrollbar. Sites that feel like film and still hold 60fps on a laptop.'],
  ['AI that ships', 'Claude and OpenAI in production: extraction, RAG over private documents, drafting with a human approval step, evals so it stays honest. Local models when privacy demands it.'],
  ['Cloud & infra', 'Vercel, Railway, Neon, Cloudflare R2, Docker, Kubernetes. Deploy pipelines, observability and the cost discipline that comes from an MSc in Cloud Computing.'],
];

const steps = [
  ['Scope in a week', 'A short call, then a written scope with the pages, features, stack and a fixed price. No surprises later.'],
  ['Build in the open', 'A live preview URL from day one and a demo every week. You see real screens, not slides.'],
  ['Ship properly', 'Performance budgets, accessibility basics, analytics only when configured, and a launch checklist that refuses to ship placeholders.'],
  ['Stay around', 'Documentation, a handover walkthrough, and a support window after launch. The site is yours, including the source.'],
];

export default function AboutPage() {
  return (
    <PageShell>
      <AboutHashRedirect />
      <section className="page-hero wrap">
        <div className="label"><span>( A )</span><span>[ about ]</span></div>
        <DisplayTitle className="display">Full-stack engineer<br />who ships <b>the whole thing</b></DisplayTitle>
        <p className="lede">I’m Tarun Chintakunta. I build AI-powered products and WebGL-heavy sites end to end: from the model call to the deploy, from shader math to the payment webhook. One person, the whole path.</p>
        <hr className="hairline" style={{ marginTop: '4rem' }} />
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="label" style={{ maxWidth: '20rem' }}><span>( 01 )</span><span>What I do</span></div>
          <div className="services">
            {services.map(([title, body], index) => (
              <Reveal className="glass service" key={title}>
                <span className="idx">[ {String(index + 1).padStart(2, '0')} ]</span>
                <h3 className="h3">{title.includes(' ') ? <>{title.split(' ').slice(0, -1).join(' ')} <b>{title.split(' ').slice(-1)}</b></> : <b>{title}</b>}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="label" style={{ maxWidth: '20rem' }}><span>( 02 )</span><span>How I work</span></div>
          <div className="steps">
            {steps.map(([title, body], index) => (
              <Reveal className="step" key={title}>
                <div className="num">{String(index + 1).padStart(2, '0')}</div>
                <div><h3 className="h3">{title}</h3><p>{body}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="skills">
        <div className="split">
          <div className="label" style={{ maxWidth: '20rem' }}><span>( 03 )</span><span>Everything I use</span></div>
          <div>
            <SkillColumns order={skillsPageOrder} limit={4} />
            <Link className="btn" href="/skills" style={{ marginTop: '1.5rem' }}>All skills</Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="label" style={{ maxWidth: '20rem' }}><span>( 04 )</span><span>Background</span></div>
          <div className="rows timeline">
            <div className="row"><span className="row-idx">Now</span><span className="row-title">Founder, StreamlineOS · freelance creative developer</span><span className="row-stack">Products · Client sites</span></div>
            <div className="row"><span className="row-idx">MSc</span><span className="row-title">Cloud Computing, National College of Ireland</span><span className="row-stack">Dublin</span></div>
            <div className="row"><span className="row-idx">Research</span><span className="row-title">Kubernetes zombie containers · federated fraud detection · zero-trust simulation · edge-fog offloading</span><span className="row-stack">Python · Java</span></div>
            <div className="row"><span className="row-idx">Open source</span><span className="row-title">SettleShort, ContextHarbor and 70+ public repos</span><span className="row-stack"><a href={GITHUB} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>GitHub ↗</a></span></div>
          </div>
        </div>
      </section>

      <section className="cta wrap">
        <h2 className="display">Let’s build<br /><b>something good</b></h2>
        <Link className="btn btn-solid" href="/contact">Get in touch</Link>
      </section>
    </PageShell>
  );
}
