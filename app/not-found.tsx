import Link from 'next/link';
import { PageShell } from '@/components/PageShell';

export default function NotFound() {
  return (
    <PageShell>
      <section className="page-hero wrap">
        <div className="label"><span>( 404 )</span><span>Missing</span></div>
        <h1 className="display">This page<br /><b>isn’t here</b></h1>
        <p className="lede">The link may be old. The work, and the front page, are still up.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          <Link className="btn btn-solid" href="/work">Selected work</Link>
          <Link className="btn" href="/">Home</Link>
        </div>
      </section>
    </PageShell>
  );
}
