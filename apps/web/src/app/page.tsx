export const metadata = {
  title: "Web Star OS — Maximum Precision",
};

export default function Home() {
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

        .lp {
          font-family: 'Inter Tight', Helvetica, Arial, sans-serif;
          color: var(--black);
          background: var(--bg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .lp-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .lp-content { position: relative; z-index: 1; }

        /* ── TOPBAR ── */
        .lp-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 3rem; border-bottom: 2px solid var(--black);
        }
        .lp-logo { font-weight: 900; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .lp-logo .lp-r { color: var(--red); }
        .lp-nav {
          display: flex; gap: 2.5rem; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .lp-nav a {
          color: var(--black); text-decoration: none; position: relative;
        }
        .lp-nav a::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 2px; background: var(--red); transition: width 0.3s;
        }
        .lp-nav a:hover::after { width: 100%; }

        /* ── HERO — POSTER MAXIMALIST ── */
        .lp-hero {
          padding: 2rem 3rem 0;
          border-bottom: 2px solid var(--black);
          position: relative;
          overflow: hidden;
          min-height: 95vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .lp-hero-tag {
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.35em; color: var(--red);
          margin-bottom: 1rem;
        }
        .lp-hero-mega {
          font-weight: 900;
          font-size: clamp(5rem, 14vw, 13rem);
          line-height: 0.82;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .lp-hero-mega .lp-outline {
          color: transparent;
          -webkit-text-stroke: 3px var(--black);
        }
        .lp-hero-mega .lp-thin {
          font-weight: 100;
          font-style: italic;
        }
        .lp-hero-mega .lp-red-fill {
          color: var(--red);
        }

        .lp-hero-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          border-top: 2px solid var(--black);
          margin: 0 -3rem;
          padding: 0 3rem;
        }
        .lp-hero-col {
          padding: 2rem 2rem 2rem 0;
          border-right: 2px solid var(--black);
        }
        .lp-hero-col:last-child { border-right: none; padding-right: 0; padding-left: 2rem; }
        .lp-hero-col:nth-child(2) { padding-left: 2rem; }
        .lp-hero-col-label {
          font-family: 'DM Mono', monospace; font-size: 0.55rem;
          text-transform: uppercase; letter-spacing: 0.3em; color: var(--gray);
          margin-bottom: 0.75rem;
        }
        .lp-hero-col-text {
          font-size: 0.95rem; line-height: 1.6; font-weight: 300; color: #444;
        }
        .lp-hero-col-stat {
          font-weight: 900; font-size: 3.5rem; line-height: 1; letter-spacing: -0.04em;
        }
        .lp-hero-col-stat .lp-r { color: var(--red); }
        .lp-hero-col-stat-note {
          font-weight: 300; font-size: 0.75rem; color: var(--gray); margin-top: 0.25rem;
        }
        .lp-hero-cta-row { display: flex; gap: 1rem; margin-top: 1rem; }
        .lp-btn-primary {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: var(--red); color: #fff; border: 2px solid var(--red);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .lp-btn-primary:hover { background: var(--black); border-color: var(--black); }
        .lp-btn-outline {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: transparent; color: var(--black); border: 2px solid var(--black);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .lp-btn-outline:hover { background: var(--black); color: #fff; }

        /* ── MARQUEE ── */
        .lp-marquee {
          background: var(--black); color: var(--bg);
          padding: 0.75rem 0; overflow: hidden; white-space: nowrap;
          border-bottom: 2px solid var(--black);
        }
        .lp-marquee-inner { display: inline-block; animation: lpm 25s linear infinite; }
        @keyframes lpm { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .lp-marquee-text {
          font-weight: 900; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em;
        }
        .lp-marquee-dot { color: var(--red); margin: 0 2rem; }

        /* ── FEATURES — ASYMMETRIC ── */
        .lp-features {
          padding: 0 3rem; border-bottom: 2px solid var(--black);
        }
        .lp-features-header {
          padding: 3rem 0 2rem; border-bottom: 1px solid var(--light);
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .lp-section-title {
          font-weight: 900; font-size: 2.5rem; text-transform: uppercase; letter-spacing: -0.03em;
        }
        .lp-section-count {
          font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--gray);
          text-transform: uppercase; letter-spacing: 0.2em;
        }
        .lp-feat-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
        }
        .lp-feat-cell {
          padding: 2.5rem;
          border-bottom: 1px solid var(--light);
          border-right: 2px solid var(--black);
          transition: background 0.2s;
          position: relative;
        }
        .lp-feat-cell:nth-child(2n) { border-right: none; }
        .lp-feat-cell:nth-last-child(-n+2) { border-bottom: none; }
        .lp-feat-cell:hover { background: rgba(230,51,18,0.02); }
        .lp-feat-num {
          font-weight: 900; font-size: 4rem; line-height: 1;
          color: transparent; -webkit-text-stroke: 2px var(--light);
          position: absolute; top: 1.5rem; right: 1.5rem;
        }
        .lp-feat-cell:hover .lp-feat-num { -webkit-text-stroke: 2px var(--red); }
        .lp-feat-name {
          font-weight: 900; font-size: 1.15rem; text-transform: uppercase;
          letter-spacing: 0.04em; margin-bottom: 0.75rem;
        }
        .lp-feat-desc {
          font-weight: 300; font-size: 0.9rem; line-height: 1.7; color: #555; max-width: 400px;
        }

        /* ── ROLES — HORIZONTAL STRIP ── */
        .lp-roles {
          border-bottom: 2px solid var(--black);
        }
        .lp-roles-header {
          padding: 3rem 3rem 2rem; border-bottom: 2px solid var(--black);
        }
        .lp-roles-strip {
          display: grid; grid-template-columns: repeat(3, 1fr);
        }
        .lp-role-panel {
          padding: 3rem;
          border-right: 2px solid var(--black);
          position: relative;
          min-height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .lp-role-panel:last-child { border-right: none; }
        .lp-role-giant-letter {
          position: absolute; bottom: -20px; right: 20px;
          font-weight: 900; font-size: 14rem; line-height: 0.8;
          color: transparent; -webkit-text-stroke: 2px var(--light);
          pointer-events: none;
        }
        .lp-role-tag {
          font-family: 'DM Mono', monospace; font-size: 0.55rem;
          text-transform: uppercase; letter-spacing: 0.25em; color: var(--red);
          margin-bottom: 0.75rem;
        }
        .lp-role-title {
          font-weight: 900; font-size: 2rem; text-transform: uppercase;
          letter-spacing: -0.02em; margin-bottom: 1rem;
        }
        .lp-role-text { font-weight: 300; font-size: 0.9rem; line-height: 1.7; color: #555; }
        .lp-role-perms {
          margin-top: 1.5rem; font-family: 'DM Mono', monospace;
          font-size: 0.65rem; color: var(--gray); line-height: 2.2;
        }
        .lp-perm-check { color: var(--red); margin-right: 0.5rem; }

        /* ── CTA ── */
        .lp-cta {
          padding: 5rem 3rem;
          text-align: center;
          border-bottom: 2px solid var(--black);
          position: relative;
        }
        .lp-cta-mega {
          font-weight: 900; font-size: clamp(3rem, 8vw, 7rem);
          text-transform: uppercase; letter-spacing: -0.04em; line-height: 0.88;
          margin-bottom: 2rem;
        }
        .lp-cta-mega .lp-thin { font-weight: 100; font-style: italic; }
        .lp-cta-mega .lp-outline { color: transparent; -webkit-text-stroke: 2px var(--black); }
        .lp-cta-sub {
          font-weight: 300; font-size: 1rem; color: var(--gray); margin-bottom: 2.5rem;
        }

        /* ── FOOTER ── */
        .lp-footer {
          padding: 1.5rem 3rem; display: flex; justify-content: space-between;
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--gray);
        }

        @media (max-width: 900px) {
          .lp-hero-bottom, .lp-feat-grid, .lp-roles-strip { grid-template-columns: 1fr; }
          .lp-hero-col, .lp-feat-cell, .lp-role-panel { border-right: none !important; border-bottom: 1px solid var(--light); }
          .lp-role-giant-letter { font-size: 8rem; }
          .lp-topbar, .lp-features, .lp-roles-header, .lp-cta, .lp-footer { padding-left: 1.5rem; padding-right: 1.5rem; }
          .lp-hero { padding-left: 1.5rem; padding-right: 1.5rem; }
          .lp-hero-bottom { margin: 0 -1.5rem; padding: 0 1.5rem; }
        }
      `}</style>

      <div className="lp">
        <div className="lp-grid-bg"></div>
        <div className="lp-content">

          <div className="lp-topbar">
            <div className="lp-logo">Web Star <span className="lp-r">OS</span></div>
            <nav className="lp-nav">
              <a href="#features">Features</a>
              <a href="#roles">Roles</a>
              <a href="#pricing">Pricing</a>
              <a href="#docs">Docs</a>
            </nav>
          </div>

          {/* HERO — GIANT TYPE */}
          <div className="lp-hero">
            <div>
              <div className="lp-hero-tag">Project Management System / 2025</div>
              <h1 className="lp-hero-mega">
                <span className="lp-thin">Ship</span><br />
                <span className="lp-outline">With</span><br />
                <span className="lp-red-fill">Force</span>
              </h1>
            </div>
            <div className="lp-hero-bottom">
              <div className="lp-hero-col">
                <div className="lp-hero-col-label">About</div>
                <div className="lp-hero-col-text">
                  One unified system for workspaces, projects, tasks, cycles, and labels.
                  Role-based access keeps your team focused and customers informed.
                </div>
                <div className="lp-hero-cta-row">
                  <a className="lp-btn-primary" href="#">Get Started</a>
                  <a className="lp-btn-outline" href="#">Docs</a>
                </div>
              </div>
              <div className="lp-hero-col">
                <div className="lp-hero-col-label">Velocity Gain</div>
                <div className="lp-hero-col-stat"><span className="lp-r">+</span>38%</div>
                <div className="lp-hero-col-stat-note">average sprint improvement</div>
              </div>
              <div className="lp-hero-col">
                <div className="lp-hero-col-label">Tasks Managed</div>
                <div className="lp-hero-col-stat">2.4<span className="lp-r">M</span></div>
                <div className="lp-hero-col-stat-note">with auto-generated identifiers</div>
              </div>
            </div>
          </div>

          {/* MARQUEE */}
          <div className="lp-marquee">
            <div className="lp-marquee-inner">
              {[1,2].map((i) => (
                <span key={i}>
                  <span className="lp-marquee-text">Workspaces</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Projects</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Tasks</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Cycles</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Labels</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">RBAC</span><span className="lp-marquee-dot">&bull;</span>
                </span>
              ))}
            </div>
          </div>

          {/* FEATURES */}
          <div className="lp-features" id="features">
            <div className="lp-features-header">
              <div className="lp-section-title">Features</div>
              <div className="lp-section-count">06 Core Modules</div>
            </div>
            <div className="lp-feat-grid">
              {[
                { num: "01", name: "Workspaces", desc: "Isolated environments for each team. Independent settings, members, billing, and complete data separation." },
                { num: "02", name: "Projects", desc: "Logical groupings with custom workflows and views. Auto-generated task ID prefixes per project." },
                { num: "03", name: "Tasks", desc: "Auto-IDs (WS-001), rich markdown, sub-tasks, bidirectional relations, and full activity history." },
                { num: "04", name: "Cycles", desc: "Time-boxed sprints with burndown charts, velocity tracking, and automatic rollover of unfinished work." },
                { num: "05", name: "Labels", desc: "Hierarchical color-coded tags scoped to workspace or project. Instant cross-project filtering." },
                { num: "06", name: "Customer Portal", desc: "External-facing interface for feedback, support tickets, and project visibility. Separate from internal tools." },
              ].map((f) => (
                <div key={f.num} className="lp-feat-cell">
                  <div className="lp-feat-num">{f.num}</div>
                  <div className="lp-feat-name">{f.name}</div>
                  <div className="lp-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ROLES */}
          <div className="lp-roles" id="roles">
            <div className="lp-roles-header">
              <div className="lp-section-title">Three Roles</div>
            </div>
            <div className="lp-roles-strip">
              {[
                { letter: "A", tag: "Full Control", title: "Admin", text: "Workspace governance, billing, member management, and complete operational authority.", perms: ["Workspace settings", "Member management", "Billing & invoices", "All project operations"] },
                { letter: "E", tag: "Build & Ship", title: "Employee", text: "Full project access — create tasks, manage cycles, apply labels, and ship.", perms: ["Create & edit tasks", "Manage cycles", "Apply labels", "Project views"] },
                { letter: "C", tag: "Portal Access", title: "Customer", text: "Dedicated portal for feedback, support tickets, and project updates.", perms: ["Submit feedback", "Track tickets", "View updates", "Portal dashboard"] },
              ].map((r) => (
                <div key={r.letter} className="lp-role-panel">
                  <div className="lp-role-giant-letter">{r.letter}</div>
                  <div>
                    <div className="lp-role-tag">{r.tag}</div>
                    <div className="lp-role-title">{r.title}</div>
                    <div className="lp-role-text">{r.text}</div>
                  </div>
                  <div className="lp-role-perms">
                    {r.perms.map((p) => (
                      <div key={p}><span className="lp-perm-check">&check;</span>{p}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="lp-cta">
            <h2 className="lp-cta-mega">
              Start<br />
              <span className="lp-thin">Building</span><br />
              <span className="lp-outline">Today</span>
            </h2>
            <div className="lp-cta-sub">Free for teams up to 5 &mdash; no credit card required</div>
            <a className="lp-btn-primary" href="#">Get Started &rarr;</a>
          </div>

          <div className="lp-footer">
            <span>&copy; 2025 Web Star OS</span>
            <span>Designed with maximum precision</span>
          </div>
        </div>
      </div>
    </>
  );
}
