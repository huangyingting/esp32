'use client';

import React, { useEffect } from 'react';
import { initEsp32App } from '../ui/app';

export default function Esp32App({ lang }: { lang?: string }) {
  useEffect(() => {
    document.documentElement.classList.add('is-loading');
    const isRtl = lang === 'ar' || lang === 'he';
    document.documentElement.classList.toggle('is-rtl', isRtl);
    if (lang) {
      document.documentElement.lang = lang;
    }
    initEsp32App(lang);
  }, [lang]);

  return (
    <>
      <div className="loader" id="loader" role="status" aria-live="polite">
        <div className="loader-inner">
          <svg className="loader-logo" viewBox="0 0 88 70" aria-hidden="true">
            <g>
              <path className="waves" d="M32.5 48.9a16 16 0 0 1 23 0M22.4 39.2a30 30 0 0 1 43.2 0M12.4 29.4a44 44 0 0 1 63.2 0" />
              <circle className="dot" cx="44" cy="60" r="6" />
            </g>
          </svg>
          <p className="loader-title">Learn <span>ESP32</span></p>
          <div className="loader-track" aria-hidden="true"><span className="loader-fill"></span><span className="loader-shine"></span></div>
          <p className="loader-step">Loading</p>
        </div>
      </div>

      <div id="app" className="artboard" inert={true}>
        <svg className="scenery" id="scenery" aria-hidden="true"></svg>

        {/* Sidebar */}
        <nav className="sidebar" aria-label="Main" data-i18n-attr="aria-label">
          <ul className="side-nav">
            <li className="is-active">
              <a href="#" data-nav="home" title="Home" data-i18n-attr="title">
                <svg viewBox="0 0 32 32" className="fill" aria-hidden="true"><path d="M16 4.2 3.6 15.1c-.7.6-.3 1.7.6 1.7H6v9.4c0 1 .8 1.8 1.8 1.8h5.4v-7.3h5.6V28h5.4c1 0 1.8-.8 1.8-1.8v-9.4h1.8c.9 0 1.3-1.1.6-1.7z" /></svg>
                <span className="side-label" data-i18n="">Home</span>
              </a>
            </li>
            <li>
              <a href="#" data-nav="lessons" title="Lessons" data-i18n-attr="title">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 9.2C13.4 7.3 9.6 6.6 5 6.8v17.6c4.6-.2 8.4.5 11 2.4 2.6-1.9 6.4-2.6 11-2.4V6.8c-4.6-.2-8.4.5-11 2.4zM16 9.2v17.6" /><path d="M3 9.4v17.4c5-.4 9.6.2 13 2.2 3.4-2 8-2.6 13-2.2V9.4" /></svg>
                <span className="side-label" data-i18n="">Lessons</span>
              </a>
            </li>
            <li>
              <a href="#" data-nav="parts" title="Components" data-i18n-attr="title">
                <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8.5" y="8.5" width="15" height="15" rx="1.6" /><rect x="12.2" y="12.2" width="7.6" height="7.6" rx=".8" /><path d="M14.6 14.4v3.2h3M12.5 4v4.5M16 4v4.5M19.5 4v4.5M12.5 23.5V28M16 23.5V28M19.5 23.5V28M4 12.5h4.5M4 16h4.5M4 19.5h4.5M23.5 12.5H28M23.5 16H28M23.5 19.5H28" /></svg>
                <span className="side-label" data-i18n="">Components</span>
              </a>
            </li>
            <li>
              <a href="#" data-nav="reference" title="Reference: controls and shortcuts" data-i18n-attr="title">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8.5 3.8h10.2l6 6v17a1.5 1.5 0 0 1-1.5 1.5H8.5A1.5 1.5 0 0 1 7 26.8V5.3a1.5 1.5 0 0 1 1.5-1.5z" /><path d="M18.5 4v6h6M11.2 15.5h9.6M11.2 19.4h9.6M11.2 23.3h6.4" /></svg>
                <span className="side-label" data-i18n="">Reference</span>
              </a>
            </li>
            <li>
              <a href="#" data-nav="settings" title="Settings" data-i18n-attr="title">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18.1 4.3h-4.2l-.7 3.3a9.2 9.2 0 0 0-2.5 1.4l-3.2-1.1-2.1 3.6 2.5 2.2a9.4 9.4 0 0 0 0 2.9l-2.5 2.2 2.1 3.6 3.2-1.1c.8.6 1.6 1.1 2.5 1.4l.7 3.3h4.2l.7-3.3c.9-.3 1.7-.8 2.5-1.4l3.2 1.1 2.1-3.6-2.5-2.2a9.4 9.4 0 0 0 0-2.9l2.5-2.2-2.1-3.6-3.2 1.1a9.2 9.2 0 0 0-2.5-1.4z" /><circle cx="16" cy="16" r="4.2" /></svg>
                <span className="side-label" data-i18n="">Settings</span>
              </a>
            </li>
            <li>
              <a href="#" data-nav="language" title="Language" data-i18n-attr="title">
                <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11.5" /><path d="M4.5 16h23M6.2 10h19.6M6.2 22h19.6M16 4.5c-3.3 3.1-5 7-5 11.5s1.7 8.4 5 11.5c3.3-3.1 5-7 5-11.5s-1.7-8.4-5-11.5z" /></svg>
                <span className="side-label" data-i18n="">Language</span>
              </a>
            </li>
          </ul>
          <svg className="side-desert" viewBox="0 0 104 220" aria-hidden="true">
            <clipPath id="desert-clip"><path d="M10 0h94v210H34q-24 0-24-24z" /></clipPath>
            <g clipPath="url(#desert-clip)">
              <path className="hill" d="M56 150c10-24 38-28 48-12v72H56z" />
              <path className="cactus" d="M80 76v122M84.5 140h3.5a5 5 0 0 0 5-5v-16M75.5 157H73a5 5 0 0 1-5-5v-11" />
              <path className="cactus-shade" d="M82.6 82v112" />
              <path className="sand" d="M10 194c30-17 66-14 94 4v12H10z" />
            </g>
          </svg>
          <a className="credit credit-side" href="https://x.com/DilumSanjaya" target="_blank" rel="noopener noreferrer" title="Designed by x.com/DilumSanjaya" data-i18n-attr="title">
            <span className="credit-text"><small data-i18n="">Designed by</small><b>x.com/DilumSanjaya</b></span>
            <span className="credit-rule" aria-hidden="true"></span>
            <svg className="credit-x" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" /></svg>
          </a>
        </nav>
        <aside className="flyout" id="flyout" aria-live="polite"></aside>

        {/* Brand */}
        <header className="brand">
          <svg className="brand-logo" viewBox="0 0 88 70" aria-hidden="true">
            <g>
              <path className="waves" d="M32.5 48.9a16 16 0 0 1 23 0M22.4 39.2a30 30 0 0 1 43.2 0M12.4 29.4a44 44 0 0 1 63.2 0" />
              <circle className="dot" cx="44" cy="60" r="6" />
            </g>
          </svg>
          <div className="brand-text">
            <h1>Learn <span>ESP32</span></h1>
            <p><span data-i18n="">Explore</span> <i>·</i> <span data-i18n="">Build</span> <i>·</i> <span data-i18n="">Connect</span> <i>·</i> <span data-i18n="">Create</span></p>
          </div>
        </header>

        {/* Stage: three.js board + callouts */}
        <main className="stage" id="stage">
          <canvas id="board-canvas" aria-label="Interactive 3D view. Drag or use WASD to pan, Q and E to rotate, scroll to zoom." data-i18n-attr="aria-label"></canvas>
          <svg className="leaders" id="leaders" aria-hidden="true"></svg>
          <div className="rig" id="rig"></div>
          <div className="tags" id="tags"></div>
          <svg className="insp-lines" id="insp-lines" aria-hidden="true"></svg>
          <div className="inspector" id="inspector" role="dialog" aria-label="Part inspector" data-i18n-attr="aria-label"></div>
          <div className="tip" id="tip" aria-hidden="true"><b></b><span></span></div>

          <div className="viewbar" id="viewbar" role="toolbar" aria-label="3D view" data-i18n-attr="aria-label">
            <p className="view-hint" data-i18n="">Drag or WASD to pan · Q / E to rotate · Scroll to zoom</p>
            <button data-view="left" title="Turn left (Q)" aria-label="Turn left" data-i18n-attr="title aria-label">
              <svg viewBox="0 0 24 24"><path d="M4.5 10.5A8 8 0 1 1 6 17" /><path d="M4 5v5.8h5.8" /></svg>
            </button>
            <button data-view="right" title="Turn right (E)" aria-label="Turn right" data-i18n-attr="title aria-label">
              <svg viewBox="0 0 24 24"><path d="M19.5 10.5A8 8 0 1 0 18 17" /><path d="M20 5v5.8h-5.8" /></svg>
            </button>
            <span className="viewbar-sep"></span>
            <button data-view="out" title="Zoom out (−)" aria-label="Zoom out" data-i18n-attr="title aria-label">
              <svg viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
            </button>
            <button data-view="in" title="Zoom in (+)" aria-label="Zoom in" data-i18n-attr="title aria-label">
              <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
            </button>
            <span className="viewbar-sep sch-sep"></span>
            <button data-view="schematic" className="sch-toggle" title="Hide the schematic" aria-label="Schematic" aria-pressed="true" data-i18n-attr="aria-label">
              <svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><path d="M6.5 12h2.2l1.3-2.6 2 5.2 2-5.2 1.3 2.6h2.2" /></svg>
            </button>
            <span className="viewbar-sep"></span>
            <button data-view="reset" className="compass" title="Reset view (R)" aria-label="Reset view" data-i18n-attr="title aria-label">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><g className="compass-needle"><path d="M12 5.2 14.2 12h-4.4z" className="fill" /><path d="M12 18.8 9.8 12h4.4z" /></g></svg>
            </button>
          </div>

          <section className="schematic-card" id="schematic-card" aria-label="Schematic" data-i18n-attr="aria-label">
            <header className="sch-head">
              <button className="sch-grip" type="button" title="Drag to resize" data-i18n-attr="title">
                <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 6.5 6.5 1.5M1.5 10.5 10.5 1.5" /></svg>
              </button>
              <h2 data-i18n="">Schematic</h2>
              <button className="sch-close" type="button" title="Hide the schematic" aria-label="Hide the schematic" data-i18n-attr="title aria-label">
                <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" /></svg>
              </button>
            </header>
            <div className="sch-view schematic"></div>
            <div className="sch-notes"></div>
          </section>
        </main>

        {/* Top-right status */}
        <section className="status" aria-label="Progress" data-i18n-attr="aria-label">
          <div className="progress-card">
            <svg viewBox="0 0 40 40" className="progress-icon" aria-hidden="true"><path d="M20 10.6c-3.3-2.4-8.2-3.2-14-3v21.2c5.8-.2 10.7.6 14 3 3.3-2.4 8.2-3.2 14-3V7.6c-5.8-.2-10.7.6-14 3zM20 10.6v21.2" /><path d="M3 11v21c6.3-.5 12.6.2 17 2.6 4.4-2.4 10.7-3.1 17-2.6V11" /></svg>
            <div className="progress-body">
              <span className="progress-label" data-i18n="">Basics</span>
              <div className="progress-row">
                <span className="progress-track" role="progressbar" aria-label="Progress" data-i18n-attr="aria-label" aria-valuemin={0} aria-valuemax={20} aria-valuenow={0}><span className="progress-fill" id="progress-fill"></span></span>
                <span className="progress-count" id="progress-count">0/20</span>
              </div>
            </div>
          </div>
          <time className="clock" id="clock">
            <span id="clock-date">APR 24, 2025</span>
            <span id="clock-time">14:32:18</span>
          </time>
          <svg className="status-cactus" viewBox="0 0 30 50" aria-hidden="true">
            <path className="cactus" d="M15 47V9M18 30h2.5a3.5 3.5 0 0 0 3.5-3.5v-9M12 36H9.5A3.5 3.5 0 0 1 6 32.5V25" />
            <path className="cactus-shade" d="M16.6 12v33" />
          </svg>
        </section>

        {/* Right info panel */}
        <section className="info-card" aria-label="Lesson information" data-i18n-attr="aria-label">
          <div className="tabs" role="tablist" aria-label="Lesson information" data-i18n-attr="aria-label">
            <button role="tab" aria-selected="true" className="is-active" data-i18n="">Overview</button>
            <button role="tab" aria-selected="false" data-i18n="">Pinout</button>
            <button role="tab" aria-selected="false" data-i18n="">Example</button>
            <button role="tab" aria-selected="false" data-i18n="">Specifications</button>
          </div>
          <div className="info-body" role="tabpanel">
            <button className="expand" aria-label="Expand panel">
              <svg viewBox="0 0 24 24"><path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" /><circle cx="12" cy="12" r="1.3" className="fill" /></svg>
            </button>
            <div className="info-content"></div>
          </div>
        </section>

        {/* Code card */}
        <section className="code-card" aria-label="Try it yourself" data-i18n-attr="aria-label" data-state="idle">
          <header>
            <h2 data-i18n="">Try it yourself</h2>
            <div className="code-actions">
              <button className="btn-ghost btn-expand" aria-label="Expand code" title="Expand code" aria-expanded="false">
                <svg viewBox="0 0 24 24"><path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" /><circle cx="12" cy="12" r="1.3" className="fill" /></svg>
              </button>
              <button className="btn-ghost btn-copy" aria-label="Copy code" title="Copy code" data-i18n-attr="aria-label title">
                <svg viewBox="0 0 24 24"><rect x="8" y="8" width="11.5" height="12.5" rx="1.6" /><path d="M15.5 5.2V4.8c0-.9-.7-1.6-1.6-1.6H6.1c-.9 0-1.6.7-1.6 1.6v9.6c0 .9.7 1.6 1.6 1.6h.4" /></svg>
              </button>
              <button className="btn-run" aria-label="Run sketch" title="Run sketch (Space)">
                <svg viewBox="0 0 24 24"><path d="M7.5 4.8v14.4L19 12z" className="fill" /></svg>
              </button>
            </div>
          </header>
          <div className="code-wrap">
            <pre className="code"><code></code></pre>
            <div className="console">
              <div className="console-grip" role="separator" aria-orientation="horizontal" aria-label="Resize serial monitor" data-i18n-attr="aria-label" tabIndex={-1}></div>
              <div className="console-head">
                <span className="console-dot"></span>
                <span className="console-title" data-i18n="">Serial monitor</span>
                <span className="console-status">Stopped</span>
                <button className="console-close" aria-label="Stop sketch" data-i18n-attr="aria-label">
                  <svg viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17" /></svg>
                </button>
              </div>
              <div className="console-lines" aria-live="polite"></div>
            </div>
          </div>
        </section>

        {/* Lessons */}
        <section className="lessons" aria-label="Lessons" data-i18n-attr="aria-label">
          <h2 data-i18n="">Lessons</h2>
          <div className="lesson-list" id="lesson-list" role="group" aria-label="Lessons" data-i18n-attr="aria-label"></div>
        </section>

        {/* Footer */}
        <footer className="app-foot">
          <a className="credit credit-row" href="https://x.com/DilumSanjaya" target="_blank" rel="noopener noreferrer" title="Designed by x.com/DilumSanjaya" data-i18n-attr="title">
            <svg className="credit-x" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" /></svg>
            <span className="credit-rule" aria-hidden="true"></span>
            <span className="credit-text"><small data-i18n="">Designed by</small><b>x.com/DilumSanjaya</b></span>
          </a>
        </footer>
      </div>
    </>
  );
}
