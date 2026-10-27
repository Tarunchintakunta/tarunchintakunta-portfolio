import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { DisplayTitle } from '@/components/DisplayTitle';
import { PageShell } from '@/components/PageShell';
import { EMAIL, GITHUB } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Tarun Chintakunta. Product engineering, cinematic WebGL sites and AI integration. Replies within a day.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — Tarun Chintakunta', description: 'Tell me about the project. I reply within a day.' },
};

const faqs = [
  ['What should I include?', 'What you’re building, who it’s for, any references you like, and a rough budget or deadline if you have one. A link to an existing site or deck helps a lot.'],
  ['How long does a site take?', 'A landing page: two to three weeks. A cinematic WebGL site: four to eight weeks depending on how many scenes. A web app: scoped per project, usually in phases so something ships early.'],
  ['Do you work with agencies and studios?', 'Yes. I take white-label creative development for studios that need WebGL, motion or AI features on a project.'],
  ['Who owns the code?', 'You do. Every project ends with a handover: the repository, the hosting, the domain and a written walkthrough.'],
];

const nextSteps = [
  'I reply within a day with a few questions.',
  'A 30-minute call to understand the goal and the constraints.',
  'A written scope with a fixed price and a timeline.',
  'Kickoff. You get a live preview URL from the first week.',
];

export default function ContactPage() {
  return (
    <PageShell>
      <section className="page-hero wrap">
        <div className="label"><span>( C )</span><span>[ contact ]</span></div>
        <DisplayTitle className="display">Tell me about<br /><b>the project</b></DisplayTitle>
        <p className="lede">A few lines is enough. I read everything myself and reply within a day, usually with a couple of questions and a time for a call.</p>
        <hr className="hairline" style={{ marginTop: '4rem' }} />
      </section>

      <section className="section wrap" style={{ paddingTop: '3rem' }}>
        <div className="split split-contact">
          <ContactForm />
          <aside className="contact-aside">
            <div>
              <div className="label-sm" style={{ marginBottom: '0.75rem' }}>Email</div>
              <a className="big" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div>
              <div className="label-sm" style={{ marginBottom: '0.75rem' }}>Elsewhere</div>
              <a className="link-arrow" href={GITHUB} target="_blank" rel="noopener">GitHub ↗</a>
            </div>
            <div>
              <div className="label-sm" style={{ marginBottom: '0.75rem' }}>Availability</div>
              <p className="body" style={{ margin: 0 }}>Taking on new client work. Remote, working with teams in India, Europe and the US.</p>
            </div>
            <div>
              <div className="label-sm" style={{ marginBottom: '1rem' }}>What happens next</div>
              <div className="rows">
                {nextSteps.map((step, index) => (
                  <div className="row" key={step} style={{ gridTemplateColumns: '3rem minmax(0, 1fr)' }}>
                    <span className="row-idx">{String(index + 1).padStart(2, '0')}</span>
                    <span className="row-desc">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="label" style={{ maxWidth: '20rem' }}><span>( F )</span><span>Before you write</span></div>
          <div className="faq">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
