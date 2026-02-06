export const metadata = {
  title: "Web Star OS — Break the Grid",
};

export default function DesignFive() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=Inconsolata:wght@300;400;700&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #e8e4dc;
          --black: #0a0a0a;
          --white: #fafaf8;
          --red: #ff2d2d;
          --blue: #2d4bff;
          --yellow: #ffe14d;
          --green: #00e87b;
        }

        body { background: var(--bg); }

        .d5-wrap {
          font-family: 'Syne', sans-serif;
          color: var(--black);
          background: var(--bg);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* ── NOISE TEXTURE ── */
        .d5-wrap::before {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.04;
          pointer-events: none;
          z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        /* ── NAV BAR ── */
        .d5-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
          border-bottom: 3px solid var(--black);
          position: relative;
          z-index: 100;
          background: var(--bg);
        }
        .d5-nav-logo {
          font-family: 'Anton', Impact, sans-serif;
          font-size: 1.8rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .d5-nav-logo .d5-red { color: var(--red); }
        .d5-nav-right {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .d5-nav-link {
          font-family: 'Inconsolata', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--black);
          text-decoration: none;
          transition: color 0.2s;
        }
        .d5-nav-link:hover { color: var(--red); }
        .d5-nav-btn {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: var(--black);
          color: var(--bg);
          border: 3px solid var(--black);
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }
        .d5-nav-btn:hover { background: var(--red); border-color: var(--red); color: #fff; }

        /* ── HERO ── */
        .d5-hero {
          min-height: 90vh;
          position: relative;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-bottom: 3px solid var(--black);
        }

        /* FLOATING LABELS */
        .d5-float-label {
          position: absolute;
          font-family: 'Inconsolata', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.4rem 0.8rem;
          border: 2px solid var(--black);
          background: var(--bg);
          z-index: 10;
        }
        .d5-fl-1 { top: 8%; right: 8%; transform: rotate(12deg); background: var(--yellow); }
        .d5-fl-2 { top: 25%; right: 15%; transform: rotate(-5deg); background: var(--green); }
        .d5-fl-3 { bottom: 20%; right: 5%; transform: rotate(8deg); background: var(--red); color: #fff; }
        .d5-fl-4 { bottom: 10%; right: 20%; transform: rotate(-3deg); background: var(--blue); color: #fff; }
        .d5-fl-5 { top: 15%; right: 35%; transform: rotate(-8deg); }

        .d5-hero-overline {
          font-family: 'Inconsolata', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .d5-hero-overline::before {
          content: '';
          width: 50px;
          height: 3px;
          background: var(--red);
        }

        .d5-hero-title {
          font-family: 'Anton', Impact, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          text-transform: uppercase;
          line-height: 0.85;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
          max-width: 900px;
        }
        .d5-hero-title .d5-serif {
          font-family: 'Instrument Serif', Georgia, serif;
          font-weight: 400;
          font-style: italic;
          text-transform: none;
        }
        .d5-hero-title .d5-stroke {
          color: transparent;
          -webkit-text-stroke: 3px var(--black);
        }
        .d5-hero-title .d5-highlight {
          background: var(--yellow);
          padding: 0 0.15em;
          display: inline;
        }

        .d5-hero-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 500px;
          font-weight: 400;
          color: #444;
          margin-bottom: 2.5rem;
        }

        .d5-hero-btns {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .d5-btn-big {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: var(--red);
          color: #fff;
          border: 3px solid var(--black);
          padding: 1.1rem 2.5rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.15s;
          box-shadow: 5px 5px 0 var(--black);
        }
        .d5-btn-big:hover {
          box-shadow: 2px 2px 0 var(--black);
          transform: translate(3px, 3px);
        }
        .d5-btn-outline {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: transparent;
          color: var(--black);
          border: 3px solid var(--black);
          padding: 1.1rem 2.5rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.15s;
          box-shadow: 5px 5px 0 var(--black);
        }
        .d5-btn-outline:hover {
          background: var(--black);
          color: var(--bg);
          box-shadow: 2px 2px 0 var(--black);
          transform: translate(3px, 3px);
        }

        /* ── MARQUEE ── */
        .d5-marquee {
          background: var(--black);
          color: var(--bg);
          padding: 1rem 0;
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 3px solid var(--black);
        }
        .d5-marquee-inner {
          display: inline-block;
          animation: d5-scroll 20s linear infinite;
        }
        @keyframes d5-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .d5-marquee-text {
          font-family: 'Anton', Impact, sans-serif;
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .d5-marquee-star {
          display: inline-block;
          color: var(--red);
          margin: 0 2rem;
          font-size: 1.5rem;
        }

        /* ── FEATURES COLLAGE ── */
        .d5-features {
          padding: 4rem 3rem;
          border-bottom: 3px solid var(--black);
          position: relative;
        }
        .d5-features-title {
          font-family: 'Anton', Impact, sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          text-transform: uppercase;
          margin-bottom: 3rem;
          display: flex;
          align-items: baseline;
          gap: 1rem;
        }
        .d5-features-title .d5-count {
          font-family: 'Inconsolata', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          background: var(--red);
          color: #fff;
          padding: 0.3rem 0.7rem;
          vertical-align: super;
        }

        .d5-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 3px solid var(--black);
        }
        .d5-feat-item {
          padding: 2.5rem;
          border-right: 3px solid var(--black);
          border-bottom: 3px solid var(--black);
          position: relative;
          transition: background 0.2s;
        }
        .d5-feat-item:nth-child(3n) { border-right: none; }
        .d5-feat-item:nth-child(n+4) { border-bottom: none; }
        .d5-feat-item:hover { background: var(--white); }

        .d5-feat-num {
          font-family: 'Anton', Impact, sans-serif;
          font-size: 3.5rem;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 2px var(--black);
          margin-bottom: 1rem;
        }
        .d5-feat-item:hover .d5-feat-num {
          -webkit-text-stroke: 2px var(--red);
        }
        .d5-feat-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.75rem;
        }
        .d5-feat-tag {
          display: inline-block;
          font-family: 'Inconsolata', monospace;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 0.25rem 0.6rem;
          border: 2px solid var(--black);
          margin-bottom: 1rem;
        }
        .d5-feat-desc {
          font-size: 0.85rem;
          line-height: 1.65;
          color: #555;
        }

        /* ── ROLES SECTION ── */
        .d5-roles {
          padding: 4rem 3rem;
          border-bottom: 3px solid var(--black);
        }
        .d5-roles-header {
          margin-bottom: 3rem;
        }
        .d5-roles-title {
          font-family: 'Anton', Impact, sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .d5-roles-sub {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 1.2rem;
          color: #666;
        }

        .d5-roles-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .d5-role-card {
          border: 3px solid var(--black);
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .d5-role-card:hover {
          transform: rotate(-1deg) scale(1.02);
        }
        .d5-role-card:nth-child(1) { transform: rotate(-1.5deg); }
        .d5-role-card:nth-child(2) { transform: rotate(0.5deg); }
        .d5-role-card:nth-child(3) { transform: rotate(1deg); }
        .d5-role-card:nth-child(1):hover { transform: rotate(-2.5deg) scale(1.02); }
        .d5-role-card:nth-child(2):hover { transform: rotate(1.5deg) scale(1.02); }
        .d5-role-card:nth-child(3):hover { transform: rotate(0deg) scale(1.02); }

        .d5-role-header {
          padding: 1.5rem 2rem;
          border-bottom: 3px solid var(--black);
          font-family: 'Anton', Impact, sans-serif;
          font-size: 1.5rem;
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .d5-role-header-tag {
          font-family: 'Inconsolata', monospace;
          font-size: 0.55rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border: 2px solid var(--black);
        }
        .d5-rc-admin .d5-role-header { background: var(--yellow); }
        .d5-rc-employee .d5-role-header { background: var(--green); }
        .d5-rc-customer .d5-role-header { background: var(--blue); color: #fff; }
        .d5-rc-customer .d5-role-header-tag { border-color: #fff; color: #fff; }

        .d5-role-body {
          padding: 2rem;
          background: var(--white);
        }
        .d5-role-desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #444;
          margin-bottom: 1.5rem;
        }
        .d5-role-perms {
          font-family: 'Inconsolata', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          line-height: 2.2;
        }
        .d5-role-perms .d5-check { color: var(--red); margin-right: 0.5rem; }

        /* ── CTA ── */
        .d5-cta {
          padding: 6rem 3rem;
          text-align: center;
          position: relative;
          border-bottom: 3px solid var(--black);
        }
        .d5-cta-title {
          font-family: 'Anton', Impact, sans-serif;
          font-size: clamp(3rem, 8vw, 7rem);
          text-transform: uppercase;
          line-height: 0.9;
          margin-bottom: 2rem;
        }
        .d5-cta-title .d5-serif {
          font-family: 'Instrument Serif', Georgia, serif;
          font-weight: 400;
          font-style: italic;
          text-transform: none;
        }
        .d5-cta-desc {
          font-size: 1rem;
          color: #555;
          margin-bottom: 2.5rem;
        }

        /* ── FOOTER ── */
        .d5-footer {
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          font-family: 'Inconsolata', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #888;
        }

        @media (max-width: 900px) {
          .d5-feat-grid, .d5-roles-strip { grid-template-columns: 1fr; }
          .d5-feat-item { border-right: none !important; border-bottom: 3px solid var(--black) !important; }
          .d5-feat-item:last-child { border-bottom: none !important; }
          .d5-float-label { display: none; }
          .d5-role-card, .d5-role-card:nth-child(1), .d5-role-card:nth-child(2), .d5-role-card:nth-child(3) { transform: none; }
        }
      `}</style>

      <div className="d5-wrap">
        {/* NAV */}
        <nav className="d5-nav">
          <div className="d5-nav-logo">WS<span className="d5-red">/</span>OS</div>
          <div className="d5-nav-right">
            <a className="d5-nav-link" href="#features">Features</a>
            <a className="d5-nav-link" href="#roles">Roles</a>
            <a className="d5-nav-link" href="#pricing">Pricing</a>
            <a className="d5-nav-btn" href="#">Get Access</a>
          </div>
        </nav>

        {/* HERO */}
        <div className="d5-hero">
          <div className="d5-float-label d5-fl-1">Workspaces</div>
          <div className="d5-float-label d5-fl-2">Cycles</div>
          <div className="d5-float-label d5-fl-3">RBAC</div>
          <div className="d5-float-label d5-fl-4">Auto-IDs</div>
          <div className="d5-float-label d5-fl-5">Labels</div>

          <div className="d5-hero-overline">Project Management OS</div>
          <h1 className="d5-hero-title">
            <span className="d5-stroke">Break</span><br />
            The <span className="d5-serif">Grid</span><br />
            <span className="d5-highlight">Ship</span> Fast
          </h1>
          <p className="d5-hero-desc">
            Web Star OS unifies your entire project workflow. Workspaces, tasks, sprints,
            labels, and role-based access in one opinionated system.
          </p>
          <div className="d5-hero-btns">
            <a className="d5-btn-big" href="#">Start Free &rarr;</a>
            <a className="d5-btn-outline" href="#">Read Docs</a>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="d5-marquee">
          <div className="d5-marquee-inner">
            <span className="d5-marquee-text">Workspaces</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Projects</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Tasks</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Cycles</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Labels</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Access Control</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Workspaces</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Projects</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Tasks</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Cycles</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Labels</span><span className="d5-marquee-star">&starf;</span>
            <span className="d5-marquee-text">Access Control</span><span className="d5-marquee-star">&starf;</span>
          </div>
        </div>

        {/* FEATURES */}
        <div className="d5-features" id="features">
          <div className="d5-features-title">
            Core Modules <span className="d5-count">06</span>
          </div>
          <div className="d5-feat-grid">
            {[
              { num: "01", name: "Workspaces", tag: "Core", desc: "Isolated team environments with independent settings, members, and billing." },
              { num: "02", name: "Projects", tag: "Core", desc: "Grouped work with custom workflows and auto-prefixed task identifiers." },
              { num: "03", name: "Tasks", tag: "Core", desc: "Auto-ID'd items (WS-001) with markdown, sub-tasks, and full history." },
              { num: "04", name: "Cycles", tag: "Sprint", desc: "Time-boxed sprints with burndown charts and velocity tracking." },
              { num: "05", name: "Labels", tag: "Organize", desc: "Color-coded tags scoped at workspace or project level." },
              { num: "06", name: "Portal", tag: "External", desc: "Customer-facing interface for feedback and support tickets." },
            ].map((f) => (
              <div key={f.num} className="d5-feat-item">
                <div className="d5-feat-num">{f.num}</div>
                <div className="d5-feat-tag">{f.tag}</div>
                <div className="d5-feat-name">{f.name}</div>
                <div className="d5-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ROLES */}
        <div className="d5-roles" id="roles">
          <div className="d5-roles-header">
            <div className="d5-roles-title">Three Roles</div>
            <div className="d5-roles-sub">Zero ambiguity, maximum clarity</div>
          </div>
          <div className="d5-roles-strip">
            <div className="d5-role-card d5-rc-admin">
              <div className="d5-role-header">
                Admin
                <span className="d5-role-header-tag">Full Control</span>
              </div>
              <div className="d5-role-body">
                <div className="d5-role-desc">
                  Workspace governance, billing, member management, and complete operational authority.
                </div>
                <div className="d5-role-perms">
                  <div><span className="d5-check">&rarr;</span> Workspace settings</div>
                  <div><span className="d5-check">&rarr;</span> Member management</div>
                  <div><span className="d5-check">&rarr;</span> Billing &amp; invoices</div>
                  <div><span className="d5-check">&rarr;</span> All project operations</div>
                </div>
              </div>
            </div>
            <div className="d5-role-card d5-rc-employee">
              <div className="d5-role-header">
                Employee
                <span className="d5-role-header-tag">Build &amp; Ship</span>
              </div>
              <div className="d5-role-body">
                <div className="d5-role-desc">
                  Full project access — create tasks, manage cycles, apply labels, and ship.
                </div>
                <div className="d5-role-perms">
                  <div><span className="d5-check">&rarr;</span> Create &amp; edit tasks</div>
                  <div><span className="d5-check">&rarr;</span> Manage cycles</div>
                  <div><span className="d5-check">&rarr;</span> Apply labels</div>
                  <div><span className="d5-check">&rarr;</span> Project views</div>
                </div>
              </div>
            </div>
            <div className="d5-role-card d5-rc-customer">
              <div className="d5-role-header">
                Customer
                <span className="d5-role-header-tag">Portal</span>
              </div>
              <div className="d5-role-body">
                <div className="d5-role-desc">
                  Dedicated portal for feedback, support tickets, and project visibility.
                </div>
                <div className="d5-role-perms">
                  <div><span className="d5-check">&rarr;</span> Submit feedback</div>
                  <div><span className="d5-check">&rarr;</span> Track tickets</div>
                  <div><span className="d5-check">&rarr;</span> View updates</div>
                  <div><span className="d5-check">&rarr;</span> Portal dashboard</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="d5-cta">
          <h2 className="d5-cta-title">
            Stop<br />
            <span className="d5-serif">Juggling</span><br />
            Tools
          </h2>
          <p className="d5-cta-desc">Free for teams up to 5. No credit card. Start in seconds.</p>
          <a className="d5-btn-big" href="#">Get Started Now &rarr;</a>
        </div>

        {/* FOOTER */}
        <div className="d5-footer">
          <span>&copy; 2025 WS/OS</span>
          <span>Built different.</span>
        </div>
      </div>
    </>
  );
}
