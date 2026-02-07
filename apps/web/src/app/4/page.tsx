export const metadata = {
  title: "Web Star OS — Maximum Precision",
};

export default function DesignFour() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,900&family=DM+Mono:wght@300;400;500&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #fafafa;
          --black: #111;
          --red: #e63312;
          --gray: #888;
          --light: #eee;
          --faint: #f5f5f5;
          --grid-line: rgba(0,0,0,0.06);
        }

        body { background: var(--bg); }

        .d4 {
          font-family: 'Inter Tight', Helvetica, Arial, sans-serif;
          color: var(--black);
          background: var(--bg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .d4-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .d4-content { position: relative; z-index: 1; }

        /* ── TOPBAR ── */
        .d4-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 3rem; border-bottom: 2px solid var(--black);
        }
        .d4-logo { font-weight: 900; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .d4-logo .d4-r { color: var(--red); }
        .d4-nav {
          display: flex; gap: 2.5rem; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .d4-nav a {
          color: var(--black); text-decoration: none; position: relative;
        }
        .d4-nav a::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 2px; background: var(--red); transition: width 0.3s;
        }
        .d4-nav a:hover::after { width: 100%; }

        /* ── HERO — POSTER MAXIMALIST ── */
        .d4-hero {
          padding: 2rem 3rem 0;
          border-bottom: 2px solid var(--black);
          position: relative;
          overflow: hidden;
          min-height: 95vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .d4-hero-tag {
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.35em; color: var(--red);
          margin-bottom: 1rem;
        }
        .d4-hero-mega {
          font-weight: 900;
          font-size: clamp(5rem, 14vw, 13rem);
          line-height: 0.82;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .d4-hero-mega .d4-outline {
          color: transparent;
          -webkit-text-stroke: 3px var(--black);
        }
        .d4-hero-mega .d4-thin {
          font-weight: 100;
          font-style: italic;
        }
        .d4-hero-mega .d4-red-fill {
          color: var(--red);
        }

        .d4-hero-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          border-top: 2px solid var(--black);
          margin: 0 -3rem;
          padding: 0 3rem;
        }
        .d4-hero-col {
          padding: 2rem 2rem 2rem 0;
          border-right: 2px solid var(--black);
        }
        .d4-hero-col:last-child { border-right: none; padding-right: 0; padding-left: 2rem; }
        .d4-hero-col:nth-child(2) { padding-left: 2rem; }
        .d4-hero-col-label {
          font-family: 'DM Mono', monospace; font-size: 0.55rem;
          text-transform: uppercase; letter-spacing: 0.3em; color: var(--gray);
          margin-bottom: 0.75rem;
        }
        .d4-hero-col-text {
          font-size: 0.95rem; line-height: 1.6; font-weight: 300; color: #444;
        }
        .d4-hero-col-stat {
          font-weight: 900; font-size: 3.5rem; line-height: 1; letter-spacing: -0.04em;
        }
        .d4-hero-col-stat .d4-r { color: var(--red); }
        .d4-hero-col-stat-note {
          font-weight: 300; font-size: 0.75rem; color: var(--gray); margin-top: 0.25rem;
        }
        .d4-hero-cta-row { display: flex; gap: 1rem; margin-top: 1rem; }
        .d4-btn-primary {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: var(--red); color: #fff; border: 2px solid var(--red);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .d4-btn-primary:hover { background: var(--black); border-color: var(--black); }
        .d4-btn-outline {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: transparent; color: var(--black); border: 2px solid var(--black);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .d4-btn-outline:hover { background: var(--black); color: #fff; }

        /* ── MARQUEE ── */
        .d4-marquee {
          background: var(--black); color: var(--bg);
          padding: 0.75rem 0; overflow: hidden; white-space: nowrap;
          border-bottom: 2px solid var(--black);
        }
        .d4-marquee-inner { display: inline-block; animation: d4m 25s linear infinite; }
        @keyframes d4m { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .d4-marquee-text {
          font-weight: 900; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em;
        }
        .d4-marquee-dot { color: var(--red); margin: 0 2rem; }

        /* ── FEATURES — ASYMMETRIC ── */
        .d4-features {
          padding: 0 3rem; border-bottom: 2px solid var(--black);
        }
        .d4-features-header {
          padding: 3rem 0 2rem; border-bottom: 1px solid var(--light);
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .d4-section-title {
          font-weight: 900; font-size: 2.5rem; text-transform: uppercase; letter-spacing: -0.03em;
        }
        .d4-section-count {
          font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--gray);
          text-transform: uppercase; letter-spacing: 0.2em;
        }
        .d4-feat-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
        }
        .d4-feat-cell {
          padding: 2.5rem;
          border-bottom: 1px solid var(--light);
          border-right: 2px solid var(--black);
          transition: background 0.2s;
          position: relative;
        }
        .d4-feat-cell:nth-child(2n) { border-right: none; }
        .d4-feat-cell:nth-last-child(-n+2) { border-bottom: none; }
        .d4-feat-cell:hover { background: rgba(230,51,18,0.02); }
        .d4-feat-num {
          font-weight: 900; font-size: 4rem; line-height: 1;
          color: transparent; -webkit-text-stroke: 2px var(--light);
          position: absolute; top: 1.5rem; right: 1.5rem;
        }
        .d4-feat-cell:hover .d4-feat-num { -webkit-text-stroke: 2px var(--red); }
        .d4-feat-name {
          font-weight: 900; font-size: 1.15rem; text-transform: uppercase;
          letter-spacing: 0.04em; margin-bottom: 0.75rem;
        }
        .d4-feat-desc {
          font-weight: 300; font-size: 0.9rem; line-height: 1.7; color: #555; max-width: 400px;
        }

        /* ── ROLES — HORIZONTAL STRIP ── */
        .d4-roles {
          border-bottom: 2px solid var(--black);
        }
        .d4-roles-header {
          padding: 3rem 3rem 2rem; border-bottom: 2px solid var(--black);
        }
        .d4-roles-strip {
          display: grid; grid-template-columns: repeat(3, 1fr);
        }
        .d4-role-panel {
          padding: 3rem;
          border-right: 2px solid var(--black);
          position: relative;
          min-height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .d4-role-panel:last-child { border-right: none; }
        .d4-role-giant-letter {
          position: absolute; bottom: -20px; right: 20px;
          font-weight: 900; font-size: 14rem; line-height: 0.8;
          color: transparent; -webkit-text-stroke: 2px var(--light);
          pointer-events: none;
        }
        .d4-role-tag {
          font-family: 'DM Mono', monospace; font-size: 0.55rem;
          text-transform: uppercase; letter-spacing: 0.25em; color: var(--red);
          margin-bottom: 0.75rem;
        }
        .d4-role-title {
          font-weight: 900; font-size: 2rem; text-transform: uppercase;
          letter-spacing: -0.02em; margin-bottom: 1rem;
        }
        .d4-role-text { font-weight: 300; font-size: 0.9rem; line-height: 1.7; color: #555; }
        .d4-role-perms {
          margin-top: 1.5rem; font-family: 'DM Mono', monospace;
          font-size: 0.65rem; color: var(--gray); line-height: 2.2;
        }
        .d4-perm-check { color: var(--red); margin-right: 0.5rem; }

        /* ── CTA ── */
        .d4-cta {
          padding: 5rem 3rem;
          text-align: center;
          border-bottom: 2px solid var(--black);
          position: relative;
        }
        .d4-cta-mega {
          font-weight: 900; font-size: clamp(3rem, 8vw, 7rem);
          text-transform: uppercase; letter-spacing: -0.04em; line-height: 0.88;
          margin-bottom: 2rem;
        }
        .d4-cta-mega .d4-thin { font-weight: 100; font-style: italic; }
        .d4-cta-mega .d4-outline { color: transparent; -webkit-text-stroke: 2px var(--black); }
        .d4-cta-sub {
          font-weight: 300; font-size: 1rem; color: var(--gray); margin-bottom: 2.5rem;
        }

        /* ── FOOTER ── */
        .d4-footer {
          padding: 1.5rem 3rem; display: flex; justify-content: space-between;
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--gray);
        }

        @media (max-width: 900px) {
          .d4-hero-bottom, .d4-feat-grid, .d4-roles-strip { grid-template-columns: 1fr; }
          .d4-hero-col, .d4-feat-cell, .d4-role-panel { border-right: none !important; border-bottom: 1px solid var(--light); }
          .d4-role-giant-letter { font-size: 8rem; }
          .d4-topbar, .d4-features, .d4-roles-header, .d4-cta, .d4-footer { padding-left: 1.5rem; padding-right: 1.5rem; }
          .d4-hero { padding-left: 1.5rem; padding-right: 1.5rem; }
          .d4-hero-bottom { margin: 0 -1.5rem; padding: 0 1.5rem; }
        }
      `}</style>

      <div className="d4">
        <div className="d4-grid-bg"></div>
        <div className="d4-content">

          <div className="d4-topbar">
            <div className="d4-logo">Web Star <span className="d4-r">OS</span></div>
            <nav className="d4-nav">
              <a href="#features">Features</a>
              <a href="#roles">Roles</a>
              <a href="#pricing">Pricing</a>
              <a href="#docs">Docs</a>
            </nav>
          </div>

          {/* HERO — GIANT TYPE */}
          <div className="d4-hero">
            <div>
              <div className="d4-hero-tag">Project Management System / 2025</div>
              <h1 className="d4-hero-mega">
                <span className="d4-thin">Ship</span><br />
                <span className="d4-outline">With</span><br />
                <span className="d4-red-fill">Force</span>
              </h1>
            </div>
            <div className="d4-hero-bottom">
              <div className="d4-hero-col">
                <div className="d4-hero-col-label">About</div>
                <div className="d4-hero-col-text">
                  One unified system for workspaces, projects, tasks, cycles, and labels.
                  Role-based access keeps your team focused and customers informed.
                </div>
                <div className="d4-hero-cta-row">
                  <a className="d4-btn-primary" href="#">Get Started</a>
                  <a className="d4-btn-outline" href="#">Docs</a>
                </div>
              </div>
              <div className="d4-hero-col">
                <div className="d4-hero-col-label">Velocity Gain</div>
                <div className="d4-hero-col-stat"><span className="d4-r">+</span>38%</div>
                <div className="d4-hero-col-stat-note">average sprint improvement</div>
              </div>
              <div className="d4-hero-col">
                <div className="d4-hero-col-label">Tasks Managed</div>
                <div className="d4-hero-col-stat">2.4<span className="d4-r">M</span></div>
                <div className="d4-hero-col-stat-note">with auto-generated identifiers</div>
              </div>
            </div>
          </div>

          {/* MARQUEE */}
          <div className="d4-marquee">
            <div className="d4-marquee-inner">
              {[1,2].map((i) => (
                <span key={i}>
                  <span className="d4-marquee-text">Workspaces</span><span className="d4-marquee-dot">&bull;</span>
                  <span className="d4-marquee-text">Projects</span><span className="d4-marquee-dot">&bull;</span>
                  <span className="d4-marquee-text">Tasks</span><span className="d4-marquee-dot">&bull;</span>
                  <span className="d4-marquee-text">Cycles</span><span className="d4-marquee-dot">&bull;</span>
                  <span className="d4-marquee-text">Labels</span><span className="d4-marquee-dot">&bull;</span>
                  <span className="d4-marquee-text">RBAC</span><span className="d4-marquee-dot">&bull;</span>
                </span>
              ))}
            </div>
          </div>

          {/* FEATURES */}
          <div className="d4-features" id="features">
            <div className="d4-features-header">
              <div className="d4-section-title">Features</div>
              <div className="d4-section-count">06 Core Modules</div>
            </div>
            <div className="d4-feat-grid">
              {[
                { num: "01", name: "Workspaces", desc: "Isolated environments for each team. Independent settings, members, billing, and complete data separation." },
                { num: "02", name: "Projects", desc: "Logical groupings with custom workflows and views. Auto-generated task ID prefixes per project." },
                { num: "03", name: "Tasks", desc: "Auto-IDs (WS-001), rich markdown, sub-tasks, bidirectional relations, and full activity history." },
                { num: "04", name: "Cycles", desc: "Time-boxed sprints with burndown charts, velocity tracking, and automatic rollover of unfinished work." },
                { num: "05", name: "Labels", desc: "Hierarchical color-coded tags scoped to workspace or project. Instant cross-project filtering." },
                { num: "06", name: "Customer Portal", desc: "External-facing interface for feedback, support tickets, and project visibility. Separate from internal tools." },
              ].map((f) => (
                <div key={f.num} className="d4-feat-cell">
                  <div className="d4-feat-num">{f.num}</div>
                  <div className="d4-feat-name">{f.name}</div>
                  <div className="d4-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ROLES */}
          <div className="d4-roles" id="roles">
            <div className="d4-roles-header">
              <div className="d4-section-title">Three Roles</div>
            </div>
            <div className="d4-roles-strip">
              {[
                { letter: "A", tag: "Full Control", title: "Admin", text: "Workspace governance, billing, member management, and complete operational authority.", perms: ["Workspace settings", "Member management", "Billing & invoices", "All project operations"] },
                { letter: "E", tag: "Build & Ship", title: "Employee", text: "Full project access — create tasks, manage cycles, apply labels, and ship.", perms: ["Create & edit tasks", "Manage cycles", "Apply labels", "Project views"] },
                { letter: "C", tag: "Portal Access", title: "Customer", text: "Dedicated portal for feedback, support tickets, and project updates.", perms: ["Submit feedback", "Track tickets", "View updates", "Portal dashboard"] },
              ].map((r) => (
                <div key={r.letter} className="d4-role-panel">
                  <div className="d4-role-giant-letter">{r.letter}</div>
                  <div>
                    <div className="d4-role-tag">{r.tag}</div>
                    <div className="d4-role-title">{r.title}</div>
                    <div className="d4-role-text">{r.text}</div>
                  </div>
                  <div className="d4-role-perms">
                    {r.perms.map((p) => (
                      <div key={p}><span className="d4-perm-check">&check;</span>{p}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="d4-cta">
            <h2 className="d4-cta-mega">
              Start<br />
              <span className="d4-thin">Building</span><br />
              <span className="d4-outline">Today</span>
            </h2>
            <div className="d4-cta-sub">Free for teams up to 5 &mdash; no credit card required</div>
            <a className="d4-btn-primary" href="#">Get Started &rarr;</a>
          </div>

          <div className="d4-footer">
            <span>&copy; 2025 Web Star OS</span>
            <span>Designed with maximum precision</span>
          </div>
        </div>
      </div>
    </>
  );
}
