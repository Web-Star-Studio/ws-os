export const metadata = {
  title: "Web Star OS — Systematic Project Management",
};

export default function DesignOne() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,900&family=DM+Mono:wght@300;400;500&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --white: #fafafa;
          --black: #111;
          --red: #e63312;
          --grid-line: rgba(0,0,0,0.06);
          --gray: #888;
          --light-gray: #eee;
        }

        body { background: var(--white); }

        .d1-wrap {
          font-family: 'Inter Tight', Helvetica, Arial, sans-serif;
          color: var(--black);
          background: var(--white);
          min-height: 100vh;
          position: relative;
        }

        /* ── GRID BACKGROUND ── */
        .d1-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
          z-index: 0;
        }

        .d1-content { position: relative; z-index: 1; }

        /* ── TOPBAR ── */
        .d1-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
          border-bottom: 2px solid var(--black);
        }
        .d1-logo {
          font-weight: 900;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .d1-logo .d1-red { color: var(--red); }
        .d1-nav {
          display: flex;
          gap: 2.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .d1-nav a {
          color: var(--black);
          text-decoration: none;
          position: relative;
        }
        .d1-nav a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--red);
          transition: width 0.3s;
        }
        .d1-nav a:hover::after { width: 100%; }

        /* ── HERO ── */
        .d1-hero {
          padding: 0 3rem;
          min-height: 85vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 2px solid var(--black);
        }
        .d1-hero-left {
          padding: 6rem 4rem 6rem 0;
          border-right: 2px solid var(--black);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .d1-hero-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          color: var(--red);
          margin-bottom: 2rem;
        }
        .d1-hero-title {
          font-weight: 900;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
        }
        .d1-hero-title .d1-thin {
          font-weight: 100;
          font-style: italic;
        }
        .d1-hero-title .d1-outline {
          color: transparent;
          -webkit-text-stroke: 2px var(--black);
        }
        .d1-hero-sub {
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 300;
          max-width: 420px;
          color: #444;
        }
        .d1-hero-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem 0 3rem 4rem;
        }
        .d1-hero-stat-block {
          padding: 2rem 0;
          border-bottom: 1px solid var(--light-gray);
        }
        .d1-hero-stat-block:last-child { border-bottom: none; }
        .d1-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--gray);
          margin-bottom: 0.5rem;
        }
        .d1-stat-value {
          font-weight: 900;
          font-size: 4rem;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .d1-stat-value .d1-red { color: var(--red); }
        .d1-stat-note {
          font-weight: 300;
          font-size: 0.8rem;
          color: var(--gray);
          margin-top: 0.25rem;
        }

        /* ── RED BANNER ── */
        .d1-banner {
          background: var(--red);
          color: #fff;
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid var(--black);
        }
        .d1-banner-text {
          font-weight: 900;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .d1-banner-btn {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: var(--black);
          color: #fff;
          border: none;
          padding: 0.75rem 2rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s;
        }
        .d1-banner-btn:hover { background: #333; }

        /* ── FEATURES ── */
        .d1-features {
          padding: 0 3rem;
          border-bottom: 2px solid var(--black);
        }
        .d1-features-header {
          padding: 3rem 0 2rem;
          border-bottom: 1px solid var(--light-gray);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .d1-section-title {
          font-weight: 900;
          font-size: 2.5rem;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }
        .d1-section-count {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }
        .d1-feat-rows {
          display: grid;
          grid-template-columns: 1fr;
        }
        .d1-feat-row {
          display: grid;
          grid-template-columns: 80px 200px 1fr;
          gap: 3rem;
          align-items: start;
          padding: 2.5rem 0;
          border-bottom: 1px solid var(--light-gray);
          transition: background 0.2s;
        }
        .d1-feat-row:hover {
          background: rgba(230,51,18,0.02);
        }
        .d1-feat-num {
          font-weight: 900;
          font-size: 2.5rem;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--black);
        }
        .d1-feat-row:hover .d1-feat-num {
          -webkit-text-stroke: 1.5px var(--red);
          color: transparent;
        }
        .d1-feat-name {
          font-weight: 900;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding-top: 0.35rem;
        }
        .d1-feat-desc {
          font-weight: 300;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #555;
          padding-top: 0.35rem;
        }

        /* ── ROLES SECTION ── */
        .d1-roles {
          padding: 0 3rem;
          border-bottom: 2px solid var(--black);
        }
        .d1-roles-header {
          padding: 3rem 0 2rem;
          border-bottom: 1px solid var(--light-gray);
        }
        .d1-roles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .d1-role-col {
          padding: 3rem 2.5rem;
          border-right: 2px solid var(--black);
          position: relative;
        }
        .d1-role-col:last-child { border-right: none; }
        .d1-role-letter {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-weight: 900;
          font-size: 8rem;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px var(--light-gray);
          pointer-events: none;
        }
        .d1-role-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--red);
          margin-bottom: 1rem;
        }
        .d1-role-title {
          font-weight: 900;
          font-size: 1.75rem;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-bottom: 1rem;
        }
        .d1-role-text {
          font-weight: 300;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #555;
        }
        .d1-role-perms {
          margin-top: 1.5rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--gray);
          line-height: 2;
        }
        .d1-role-perm-check { color: var(--red); margin-right: 0.5rem; }

        /* ── CTA ── */
        .d1-cta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 2px solid var(--black);
        }
        .d1-cta-left {
          padding: 6rem 4rem 6rem 3rem;
          border-right: 2px solid var(--black);
        }
        .d1-cta-title {
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3.5rem);
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.95;
          margin-bottom: 2rem;
        }
        .d1-cta-title .d1-thin { font-weight: 100; font-style: italic; }
        .d1-cta-buttons {
          display: flex;
          gap: 1rem;
        }
        .d1-btn-primary {
          font-family: 'Inter Tight', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          background: var(--red);
          color: #fff;
          border: 2px solid var(--red);
          padding: 1rem 2.5rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }
        .d1-btn-primary:hover { background: var(--black); border-color: var(--black); }
        .d1-btn-outline {
          font-family: 'Inter Tight', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          background: transparent;
          color: var(--black);
          border: 2px solid var(--black);
          padding: 1rem 2.5rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }
        .d1-btn-outline:hover { background: var(--black); color: #fff; }
        .d1-cta-right {
          padding: 6rem 3rem 6rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .d1-cta-list {
          list-style: none;
          font-weight: 300;
          font-size: 1rem;
          line-height: 2.5;
          color: #555;
        }
        .d1-cta-list li::before {
          content: '\\2192';
          color: var(--red);
          margin-right: 1rem;
          font-weight: 700;
        }

        /* ── FOOTER ── */
        .d1-footer {
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--gray);
        }

        @media (max-width: 900px) {
          .d1-hero, .d1-cta { grid-template-columns: 1fr; }
          .d1-hero-left { border-right: none; border-bottom: 2px solid var(--black); padding-right: 0; }
          .d1-roles-grid { grid-template-columns: 1fr; }
          .d1-role-col { border-right: none; border-bottom: 1px solid var(--light-gray); }
          .d1-feat-row { grid-template-columns: 60px 1fr; }
          .d1-feat-desc { grid-column: 1 / -1; }
          .d1-topbar, .d1-features, .d1-roles, .d1-cta-left, .d1-cta-right, .d1-footer { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
      `}</style>

      <div className="d1-wrap">
        <div className="d1-grid-bg"></div>
        <div className="d1-content">

          {/* TOPBAR */}
          <div className="d1-topbar">
            <div className="d1-logo">Web Star <span className="d1-red">OS</span></div>
            <nav className="d1-nav">
              <a href="#features">Features</a>
              <a href="#roles">Roles</a>
              <a href="#pricing">Pricing</a>
              <a href="#docs">Docs</a>
            </nav>
          </div>

          {/* HERO */}
          <div className="d1-hero">
            <div className="d1-hero-left">
              <div className="d1-hero-tag">Project Management System / 2025</div>
              <h1 className="d1-hero-title">
                <span className="d1-thin">Systematic</span><br />
                Project<br />
                <span className="d1-outline">Management</span>
              </h1>
              <p className="d1-hero-sub">
                Workspaces, projects, tasks, cycles, and labels — unified in one precise system.
                Three roles. Zero ambiguity. Every task identified.
              </p>
            </div>
            <div className="d1-hero-right">
              <div className="d1-hero-stat-block">
                <div className="d1-stat-label">Active Workspaces</div>
                <div className="d1-stat-value">1,247</div>
                <div className="d1-stat-note">organizations onboarded</div>
              </div>
              <div className="d1-hero-stat-block">
                <div className="d1-stat-label">Cycle Velocity</div>
                <div className="d1-stat-value"><span className="d1-red">+</span>38%</div>
                <div className="d1-stat-note">average improvement</div>
              </div>
              <div className="d1-hero-stat-block">
                <div className="d1-stat-label">Tasks Managed</div>
                <div className="d1-stat-value">2.4<span className="d1-red">M</span></div>
                <div className="d1-stat-note">with auto-generated identifiers</div>
              </div>
            </div>
          </div>

          {/* RED BANNER */}
          <div className="d1-banner">
            <div className="d1-banner-text">Free for teams up to 5 members &mdash; no credit card required</div>
            <a className="d1-banner-btn" href="#">Start Now</a>
          </div>

          {/* FEATURES */}
          <div className="d1-features" id="features">
            <div className="d1-features-header">
              <div className="d1-section-title">Features</div>
              <div className="d1-section-count">06 Core Modules</div>
            </div>
            <div className="d1-feat-rows">
              {[
                { num: "01", name: "Workspaces", desc: "Isolated environments for each team or department. Independent settings, members, billing, and data. Complete separation with shared infrastructure." },
                { num: "02", name: "Projects", desc: "Logical groupings with custom workflows, statuses, and views. Each project gets a unique prefix for auto-generated task identifiers." },
                { num: "03", name: "Tasks", desc: "First-class objects with auto-IDs (WS-001), rich markdown, sub-tasks, bidirectional relations, and complete activity history." },
                { num: "04", name: "Cycles", desc: "Time-boxed sprints with burndown visualization, velocity tracking, and automatic rollover for unfinished work items." },
                { num: "05", name: "Labels", desc: "Hierarchical color-coded tags scoped to workspace or project level. Instant cross-project filtering and bulk operations." },
                { num: "06", name: "Customer Portal", desc: "External-facing interface for feedback submission, support tickets, and project visibility. Separate from internal workflows." },
              ].map((f) => (
                <div key={f.num} className="d1-feat-row">
                  <div className="d1-feat-num">{f.num}</div>
                  <div className="d1-feat-name">{f.name}</div>
                  <div className="d1-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ROLES */}
          <div className="d1-roles" id="roles">
            <div className="d1-roles-header">
              <div className="d1-section-title">Three Roles</div>
            </div>
            <div className="d1-roles-grid">
              <div className="d1-role-col">
                <div className="d1-role-letter">A</div>
                <div className="d1-role-tag">Full Control</div>
                <div className="d1-role-title">Admin</div>
                <div className="d1-role-text">Complete workspace authority. Billing, members, settings, and all operational control.</div>
                <div className="d1-role-perms">
                  <div><span className="d1-role-perm-check">&check;</span>Workspace settings</div>
                  <div><span className="d1-role-perm-check">&check;</span>Member management</div>
                  <div><span className="d1-role-perm-check">&check;</span>Billing &amp; invoices</div>
                  <div><span className="d1-role-perm-check">&check;</span>All project operations</div>
                </div>
              </div>
              <div className="d1-role-col">
                <div className="d1-role-letter">E</div>
                <div className="d1-role-tag">Build &amp; Ship</div>
                <div className="d1-role-title">Employee</div>
                <div className="d1-role-text">Project-scoped access. Create tasks, manage cycles, apply labels, track progress.</div>
                <div className="d1-role-perms">
                  <div><span className="d1-role-perm-check">&check;</span>Create &amp; edit tasks</div>
                  <div><span className="d1-role-perm-check">&check;</span>Manage cycles</div>
                  <div><span className="d1-role-perm-check">&check;</span>Apply labels</div>
                  <div><span className="d1-role-perm-check">&check;</span>Project views</div>
                </div>
              </div>
              <div className="d1-role-col">
                <div className="d1-role-letter">C</div>
                <div className="d1-role-tag">Portal Access</div>
                <div className="d1-role-title">Customer</div>
                <div className="d1-role-text">Dedicated portal for external stakeholders. Feedback, tickets, and updates.</div>
                <div className="d1-role-perms">
                  <div><span className="d1-role-perm-check">&check;</span>Submit feedback</div>
                  <div><span className="d1-role-perm-check">&check;</span>Track tickets</div>
                  <div><span className="d1-role-perm-check">&check;</span>View updates</div>
                  <div><span className="d1-role-perm-check">&check;</span>Portal dashboard</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="d1-cta">
            <div className="d1-cta-left">
              <h2 className="d1-cta-title">
                Start<br />
                <span className="d1-thin">Building</span><br />
                Today
              </h2>
              <div className="d1-cta-buttons">
                <a className="d1-btn-primary" href="#">Get Started</a>
                <a className="d1-btn-outline" href="#">Documentation</a>
              </div>
            </div>
            <div className="d1-cta-right">
              <ul className="d1-cta-list">
                <li>Free for small teams</li>
                <li>No credit card required</li>
                <li>Setup in under 2 minutes</li>
                <li>Import from Linear, Jira, or Asana</li>
                <li>SOC 2 Type II compliant</li>
              </ul>
            </div>
          </div>

          {/* FOOTER */}
          <div className="d1-footer">
            <span>&copy; 2025 Web Star OS</span>
            <span>Designed with precision</span>
          </div>
        </div>
      </div>
    </>
  );
}
