import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DisplayTitle } from '@/components/DisplayTitle';
import { PageShell } from '@/components/PageShell';
import { Shot } from '@/components/Shot';
import { getProject, KIND_LABEL, nextIn, projectNumber, projects, researchProjects, workProjects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — Tarun Chintakunta`, description: project.summary },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const list = project.kind === 'research' ? researchProjects : workProjects;
  const next = nextIn(list, project.slug);
  const total = String(projects.length).padStart(3, '0');

  return (
    <PageShell>
      <section className="page-hero project-hero wrap">
        <div className="label">
          <span>{KIND_LABEL[project.kind]} · {project.status}</span>
          <span>[ {projectNumber(project.slug)} / {total} ]</span>
        </div>
        <DisplayTitle className="display">{project.title}</DisplayTitle>
        <p className="lede">{project.summary}</p>
        <Link className="link-arrow" href="/work" style={{ display: 'inline-flex', marginTop: '2rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          ← All work
        </Link>
      </section>

      <section className="wrap">
        <div className="project-shot">
          <Shot src={project.image} title={project.title} eager />
        </div>
      </section>

      <section className="section wrap">
        <div className="meta-grid">
          <div><div className="label-sm">Role</div><div className="val">{project.role}</div></div>
          <div><div className="label-sm">Year</div><div className="val">{project.year}</div></div>
          <div><div className="label-sm">Stack</div><div className="val">{project.stack.map((item) => <div key={item}>{item}</div>)}</div></div>
          <div>
            <div className="label-sm">Links</div>
            <div className="val">
              {project.live ? <a href={project.live} target="_blank" rel="noopener">Visit site ↗</a> : null}
              {project.repo ? <a href={project.repo} target="_blank" rel="noopener">Source on GitHub ↗</a> : null}
              {!project.live && !project.repo ? <span style={{ opacity: 0.5 }}>Private</span> : null}
            </div>
          </div>
        </div>
      </section>

      {(project.chapters || []).map(([heading, items]) => (
        <section className="chapter wrap" key={heading}>
          <h2 className="h3">{heading}</h2>
          <div className="body">
            {heading === 'What I built' && items.length > 1 ? (
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            ) : items.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
      ))}

      {next ? (
        <section className="wrap">
          <Link className="next-project" href={`/work/${next.slug}`}>
            <div className="label-sm">{project.kind === 'research' ? 'Next research →' : 'Next project →'}</div>
            <h2 className="h2">{next.title}</h2>
          </Link>
        </section>
      ) : null}

      <section className="cta wrap">
        <h2 className="display">Want one<br /><b>of your own?</b></h2>
        <Link className="btn btn-solid" href="/contact">Start a project</Link>
      </section>
    </PageShell>
  );
}
