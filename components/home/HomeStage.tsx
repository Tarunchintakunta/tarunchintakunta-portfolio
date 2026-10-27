'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SkillColumns } from '@/components/SkillColumns';
import { SUBJECTS } from '@/lib/site';
import { homeSkillOrder } from '@/lib/skills';
import { mountHomeScene } from './mount-scene';
import './home.css';

export default function HomeStage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountHomeScene(root);
  }, []);

  return (
    <div ref={rootRef} className="home-root" id="content" role="main">
      <div className="home-scroll" aria-hidden="true" />

      <div id="preloader" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 9999, pointerEvents: 'none', transition: 'opacity 1s ease' }}>
        <div style={{ position: 'absolute', top: '2.5rem', left: '3.125rem', color: '#000', fontWeight: 200, fontSize: '4rem', letterSpacing: '-0.02em', lineHeight: 1 }}>
          [ &nbsp;
          <div style={{ height: '4rem', overflow: 'hidden', position: 'relative', width: '6.5rem', display: 'inline-block', verticalAlign: 'top' }}>
            <div id="odometer-numbers" style={{ position: 'absolute', top: 0, left: 0, width: '100%', transition: 'transform 0.05s linear', textAlign: 'center' }} />
          </div>
          &nbsp; / 100 ]
        </div>
      </div>

      <div className="hero-logo preload-hidden reveal-anim from-top">Tarun&nbsp;C.</div>
      <h1 className="hero-title" id="animated-hero-title">
        Creative engineer for<br />
        <span className="hero-subtitle">the interactive web</span>
      </h1>

      <nav className="hero-nav preload-hidden reveal-anim from-top" aria-label="Primary">
        <Link href="/work">work <span className="nav-arrow">↗</span></Link>
        <Link href="/skills">skills <span className="nav-arrow">↗</span></Link>
        <Link href="/about">about <span className="nav-arrow">↗</span></Link>
        <Link href="/contact">contact <span className="nav-arrow">↗</span></Link>
      </nav>

      <div className="hero-info-block preload-hidden reveal-anim from-bottom">
        <div className="hi-top"><span>( A )</span><span>[ 001 /004 ]</span></div>
        <div className="hi-text">I design and build fast, tactile interfaces — WebGL, shaders, motion systems and the product thinking that holds them together.</div>
        <Link href="/contact" className="hi-btn">GET IN TOUCH</Link>
      </div>

      <div className="scroll-content-wrapper">
        <div className="scroll-title-container" id="scroll-title">
          <h3 className="animated-title flow-title">Interfaces that move<br />the way people<br /><span style={{ fontWeight: 500 }}>expect them to</span></h3>
        </div>
        <div className="clients-container">
          <div className="clients-subtitle">STACK</div>
          <div className="clients-line" />
          <div className="marquee-container">
            <div className="marquee-content" id="marquee-content" />
          </div>
        </div>
        <div className="feature-container" style={{ alignItems: 'flex-end', padding: '0 3.125rem', boxSizing: 'border-box' }}>
          <h3 className="feature-title animated-title flow-title" style={{ textAlign: 'right' }}>
            Shipping products where<br />engineering and<br /><span style={{ fontWeight: 500 }}>craft meet</span>
          </h3>
        </div>
      </div>

      <div className="phase4-container" id="phase4-container">
        <div className="split-feature-container">
          <div className="hi-top" style={{ width: '100%', minWidth: '15rem', maxWidth: '20rem', marginBottom: 0 }}>
            <span>( B )</span><span>[ 002 /004 ]</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="split-top" style={{ textAlign: 'left', display: 'inline-block' }}>
              <h3 className="feature-title animated-title" id="phase4-title" style={{ textAlign: 'left', marginTop: 0 }}>
                Everything I use to<br /><span style={{ fontWeight: 500 }}>get things shipped</span>
              </h3>
              <div className="clients-line" style={{ margin: '3rem 0', width: '100%' }} />
            </div>
            <div className="split-bottom">
              <SkillColumns order={homeSkillOrder} limit={4} />
              <Link href="/about" className="hi-btn" style={{ marginTop: '2rem', textTransform: 'uppercase' }}>More about me</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="words-container">
        <div className="flying-word" id="word1" />
        <div className="flying-word" id="word2" />
        <div className="flying-word" id="word3" />
      </div>

      <div className="glass-container" id="glass-container">
        <div id="glass-gradient" className="glass-gradient-wrapper">
          <div className="glass-gradient-img" />
          <div className="gradient-content">
            <div className="gc-top-left animated-title" id="phase3-title">Every build is a mix of systems,<br />motion and taste</div>
            <div className="gc-bottom">
              <div className="gc-bottom-left">How I work</div>
              <div className="gc-bottom-right">
                <div className="stat-col stat-col-tall">
                  <div className="stat-num">40+</div>
                  <div className="stat-desc">products shipped<br /><span className="stat-sub">*web, mobile, internal</span></div>
                  <div className="stat-btn" aria-hidden="true">→</div>
                </div>
                <div className="stat-col">
                  <div className="stat-num">60fps</div>
                  <div className="stat-desc">the only acceptable<br />frame budget</div>
                  <div className="stat-btn" aria-hidden="true">→</div>
                </div>
                <div className="stat-col">
                  <div className="stat-num">2+</div>
                  <div className="stat-desc">years building<br /><span className="stat-sub">*and still counting</span></div>
                  <div className="stat-btn" aria-hidden="true">→</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="phase5-container" id="phase5-container">
        <div className="hi-top phase5-label-right"><span>( C )</span><span>[ 003 /004 ]</span></div>
        <h3 className="feature-title phase5-title-left animated-title" id="phase5-title-1">Built from pixels up</h3>
        <div className="hi-text phase5-desc-left">From shader math to deploy pipelines — I like owning the whole path from idea to the thing people actually touch.</div>
        <h3 className="feature-title phase5-title-right animated-title" id="phase5-title-2">Available for<br /><span style={{ fontWeight: 500 }}>new work</span></h3>
      </div>

      <div className="phase6-container" id="phase6-container">
        <h3 className="phase6-title animated-title" id="phase6-title">Let&apos;s build<br /><span style={{ fontWeight: 400 }}>something good</span></h3>
      </div>

      <div className="phase6-footer-wrapper" id="phase6-footer">
        <SiteFooter subject={SUBJECTS.home} />
      </div>
    </div>
  );
}
