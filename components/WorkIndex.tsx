'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DisplayTitle } from './DisplayTitle';
import { Shot } from './Shot';
import { KIND_LABEL, projects, researchProjects, workProjects, type Project } from '@/lib/projects';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ongoing', label: 'Now building' },
  { id: 'product', label: 'Products' },
  { id: 'client', label: 'Client sites' },
  { id: 'research', label: 'Research' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

function isFilter(value: string): value is FilterId {
  return FILTERS.some((filter) => filter.id === value);
}

function matches(project: Project, filter: FilterId) {
  if (filter === 'all') return true;
  if (filter === 'ongoing') return project.status === 'ongoing' || project.status === 'in progress';
  return project.kind === filter;
}

export function WorkIndex() {
  const [filter, setFilter] = useState<FilterId>('all');

  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.slice(1);
      setFilter(isFilter(hash) ? hash : 'all');
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll('#work .reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [filter]);

  const cards = filter === 'research' ? [] : workProjects.filter((project) => matches(project, filter));

  return (
    <div id="work">
      <section className="page-hero wrap">
        <div className="label"><span>( W )</span><span>[ {String(projects.length).padStart(3, '0')} projects ]</span></div>
        <DisplayTitle className="display">Selected work,<br /><b>built end to end</b></DisplayTitle>
        <p className="lede">Products I own, sites I build for clients, and the research underneath. Every one of these I shipped from the first sketch to the deploy.</p>
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              className="filter"
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => {
                setFilter(item.id);
                const next = item.id === 'all' ? window.location.pathname : `#${item.id}`;
                window.history.replaceState(null, '', next);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <hr className="hairline" />
      </section>

      <section className="section wrap" style={{ paddingTop: '3rem' }}>
        <div className="work-grid" style={{ display: filter === 'research' ? 'none' : undefined }}>
          {cards.map((project) => {
            const wide = workProjects.findIndex((item) => item.slug === project.slug) < 2;
            const live = project.status === 'live' || project.status === 'ongoing';
            return (
              <Link
                key={project.slug}
                className={`work-card reveal${wide ? ' wide' : ''}`}
                href={`/work/${project.slug}`}
                data-kind={project.kind}
                data-status={project.status}
              >
                <div className="shot">
                  <span className={`badge${live ? ' live' : ''}`}><span className="dot" />{project.status}</span>
                  <Shot src={project.image} title={project.title} eager={wide} />
                </div>
                <div className="work-meta">
                  <h3 className="work-title">{project.title}</h3>
                  <span className="work-kind">{KIND_LABEL[project.kind]} · {project.year}</span>
                </div>
                <p className="work-summary">{project.summary}</p>
                <div className="tags">{project.stack.slice(0, 5).map((item) => <span className="tag" key={item}>{item}</span>)}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section wrap" id="research-section" style={{ display: filter === 'all' || filter === 'research' ? undefined : 'none' }}>
        <div className="section-head">
          <div className="label"><span>( R )</span><span>Research &amp; systems</span></div>
          <p className="body" style={{ margin: 0, maxWidth: '32rem' }}>Work from the MSc in Cloud Computing and after: Kubernetes, federated learning, zero trust, edge-fog scheduling. Source on GitHub.</p>
        </div>
        <div className="rows">
          {researchProjects.map((project, index) => (
            <div className="row reveal" key={project.slug} data-kind="research" data-status="research">
              <span className="row-idx">[ {String(index + 1).padStart(2, '0')} ]</span>
              <Link className="row-title" href={`/work/${project.slug}`}>{project.title}</Link>
              <span className="row-desc">{project.summary}</span>
              {project.repo ? (
                <a className="row-stack" href={project.repo} target="_blank" rel="noopener">{project.stack.join(' · ')} ↗</a>
              ) : (
                <span className="row-stack">{project.stack.join(' · ')}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="cta wrap">
        <h2 className="display">Have something<br /><b>like this in mind?</b></h2>
        <Link className="btn btn-solid" href="/contact">Start a project</Link>
      </section>
    </div>
  );
}
