export const metadata = {
  title: "Web Star OS — Structured Velocity",
};

export default function DesignFive() {
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

        .d5 {
          font-family: 'Inter Tight', Helvetica, Arial, sans-serif;
          color: var(--black); background: var(--bg);
          min-height: 100vh; position: relative;
        }

        .d5-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .d5-content { position: relative; z-index: 1; }

        /* ── TOPBAR ── */
        .d5-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 3rem; border-bottom: 2px solid var(--black);
        }
        .d5-logo { font-weight: 900; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .d5-logo .d5-r { color: var(--red); }
        .d5-nav {
          display: flex; gap: 2.5rem; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .d5-nav a { color: var(--black); text-decoration: none; position: relative; }
        .d5-nav a::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 2px; background: var(--red); transition: width 0.3s;
        }
        .d5-nav a:hover::after { width: 100%; }

        /* ── HERO — STAGGERED ── */
        .d5-hero {
          padding: 0 3rem;
          border-bottom: 2px solid var(--black);
          display: grid;
          grid-template-columns: 3fr 2fr;
          min-height: 80vh;
        }
        .d5-hero-left {
          padding: 5rem 4rem 5rem 0;
          border-right: 2px solid var(--black);
          display: flex; flex-direction: column; justify-content: center;
        }
        .d5-hero-tag {
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.35em; color: var(--red);
          margin-bottom: 2rem;
        }
        .d5-hero-title {
          font-weight: 900; font-size: clamp(3rem, 5.5vw, 5rem);
          line-height: 0.92; letter-spacing: -0.04em; text-transform: uppercase;
          margin-bottom: 2rem;
        }
        .d5-hero-title .d5-thin { font-weight: 100; font-style: italic; }
        .d5-hero-title .d5-outline { color: transparent; -webkit-text-stroke: 2px var(--black); }
        .d5-hero-sub {
          font-size: 1rem; line-height: 1.7; font-weight: 300; max-width: 450px;
          color: #444; margin-bottom: 2.5rem;
        }
        .d5-hero-btns { display: flex; gap: 1rem; }
        .d5-btn-red {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: var(--red); color: #fff; border: 2px solid var(--red);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .d5-btn-red:hover { background: var(--black); border-color: var(--black); }
        .d5-btn-ghost {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: transparent; color: var(--black); border: 2px solid var(--black);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .d5-btn-ghost:hover { background: var(--black); color: #fff; }

        /* HERO RIGHT — STAGGERED CARDS */
        .d5-hero-right {
          padding: 4rem 0 4rem 4rem;
          display: flex; flex-direction: column; gap: 1rem;
          justify-content: center;
        }
        .d5-card {
          background: var(--black); color: var(--bg);
          padding: 1.5rem 2rem; display: flex; justify-content: space-between;
          align-items: center; transition: transform 0.2s;
        }
        .d5-card:hover { transform: translateX(-4px); }
        .d5-card:nth-child(2) { margin-left: 2rem; }
        .d5-card:nth-child(3) { margin-left: 4rem; }
        .d5-card:nth-child(4) { margin-left: 1rem; }
        .d5-card:nth-child(5) { margin-left: 3rem; }
        .d5-card-name {
          font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em;
        }
        .d5-card-num {
          font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--gray);
        }

        /* ── DIAGONAL DIVIDER ── */
        .d5-diag {
          height: 60px; background: var(--red); position: relative;
          clip-path: polygon(0 0, 100% 30%, 100% 100%, 0 70%);
          display: flex; align-items: center; justify-content: center;
        }
        .d5-diag-text {
          font-weight: 900; font-size: 0.75rem; text-transform: uppercase;
          letter-spacing: 0.2em; color: #fff;
        }

        /* ── FEATURES — ALTERNATING ── */
        .d5-features {
          padding: 0 3rem; border-bottom: 2px solid var(--black);
        }
        .d5-features-header {
          padding: 3rem 0 2rem; border-bottom: 1px solid var(--light);
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .d5-section-title {
          font-weight: 900; font-size: 2.5rem; text-transform: uppercase; letter-spacing: -0.03em;
        }
        .d5-section-count {
          font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--gray);
          text-transform: uppercase; letter-spacing: 0.2em;
        }
        .d5-feat-list {}
        .d5-feat-item {
          display: grid; grid-template-columns: 120px 1fr 1fr;
          gap: 0; border-bottom: 1px solid var(--light);
          transition: background 0.2s;
        }
        .d5-feat-item:last-child { border-bottom: none; }
        .d5-feat-item:hover { background: rgba(230,51,18,0.02); }
        .d5-feat-num-col {
          padding: 2.5rem 2rem 2.5rem 0; border-right: 2px solid var(--black);
          display: flex; align-items: start; justify-content: center;
        }
        .d5-feat-num {
          font-weight: 900; font-size: 3rem; line-height: 1;
          color: transparent; -webkit-text-stroke: 1.5px var(--light);
        }
        .d5-feat-item:hover .d5-feat-num { -webkit-text-stroke: 1.5px var(--red); }
        .d5-feat-name-col {
          padding: 2.5rem; border-right: 1px solid var(--light);
          display: flex; align-items: center;
        }
        .d5-feat-name {
          font-weight: 900; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.04em;
        }
        .d5-feat-desc-col { padding: 2.5rem; display: flex; align-items: center; }
        .d5-feat-desc { font-weight: 300; font-size: 0.9rem; line-height: 1.65; color: #555; }

        /* ── ROLES — OFFSET CARDS ── */
        .d5-roles {
          padding: 3rem; border-bottom: 2px solid var(--black);
        }
        .d5-roles-header { margin-bottom: 2rem; }
        .d5-roles-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
        }
        .d5-role-card {
          border: 2px solid var(--black); position: relative;
          transition: transform 0.2s;
        }
        .d5-role-card:nth-child(2) { margin-top: 2rem; }
        .d5-role-card:nth-child(3) { margin-top: 4rem; }
        .d5-role-card:hover { transform: translateY(-4px); }
        .d5-role-head {
          padding: 1.5rem 2rem; border-bottom: 2px solid var(--black);
          display: flex; justify-content: space-between; align-items: center;
        }
        .d5-role-head-red { background: var(--red); color: #fff; }
        .d5-role-head-black { background: var(--black); color: var(--bg); }
        .d5-role-head-white { background: var(--bg); color: var(--black); }
        .d5-role-title {
          font-weight: 900; font-size: 1.25rem; text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .d5-role-badge {
          font-family: 'DM Mono', monospace; font-size: 0.5rem;
          text-transform: uppercase; letter-spacing: 0.15em;
          border: 1px solid currentColor; padding: 0.25rem 0.6rem;
        }
        .d5-role-body { padding: 2rem; background: var(--bg); }
        .d5-role-desc { font-weight: 300; font-size: 0.85rem; line-height: 1.65; color: #555; margin-bottom: 1.25rem; }
        .d5-role-perms {
          font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--gray); line-height: 2.2;
        }
        .d5-pc { color: var(--red); margin-right: 0.5rem; }

        /* ── CTA ── */
        .d5-cta {
          display: grid; grid-template-columns: 1fr 1fr;
          border-bottom: 2px solid var(--black);
        }
        .d5-cta-left {
          padding: 5rem 4rem 5rem 3rem;
          border-right: 2px solid var(--black);
          display: flex; flex-direction: column; justify-content: center;
        }
        .d5-cta-title {
          font-weight: 900; font-size: clamp(2rem, 4vw, 3.5rem);
          text-transform: uppercase; letter-spacing: -0.03em; line-height: 0.95;
          margin-bottom: 2rem;
        }
        .d5-cta-title .d5-thin { font-weight: 100; font-style: italic; }
        .d5-cta-right {
          padding: 5rem 3rem 5rem 4rem; background: var(--black); color: var(--bg);
          display: flex; flex-direction: column; justify-content: center;
        }
        .d5-cta-list {
          list-style: none; font-weight: 300; font-size: 1rem; line-height: 2.5; color: var(--gray);
        }
        .d5-cta-list li::before { content: '\\2192'; color: var(--red); margin-right: 1rem; font-weight: 700; }
        .d5-cta-list-title {
          font-weight: 900; font-size: 1rem; text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 1rem; color: var(--bg);
        }

        /* ── FOOTER ── */
        .d5-footer {
          padding: 1.5rem 3rem; display: flex; justify-content: space-between;
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--gray);
        }

        @media (max-width: 900px) {
          .d5-hero, .d5-cta { grid-template-columns: 1fr; }
          .d5-hero-left { border-right: none; border-bottom: 2px solid var(--black); padding-right: 0; }
          .d5-hero-right { padding-left: 0; }
          .d5-card, .d5-card:nth-child(2), .d5-card:nth-child(3), .d5-card:nth-child(4), .d5-card:nth-child(5) { margin-left: 0; }
          .d5-feat-item { grid-template-columns: 80px 1fr; }
          .d5-feat-desc-col { grid-column: 1 / -1; padding-top: 0; }
          .d5-feat-name-col { border-right: none; }
          .d5-roles-grid { grid-template-columns: 1fr; }
          .d5-role-card, .d5-role-card:nth-child(2), .d5-role-card:nth-child(3) { margin-top: 0; }
          .d5-topbar, .d5-features, .d5-roles, .d5-cta-left, .d5-cta-right, .d5-footer { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
      `}</style>

      <div className="d5">
        <div className="d5-grid-bg"></div>
        <div className="d5-content">

          <div className="d5-topbar">
            <div className="d5-logo">Web Star <span className="d5-r">OS</span></div>
            <nav className="d5-nav">
              <a href="#features">Features</a>
              <a href="#roles">Roles</a>
              <a href="#pricing">Pricing</a>
              <a href="#docs">Docs</a>
            </nav>
          </div>

          {/* HERO */}
          <div className="d5-hero">
            <div className="d5-hero-left">
              <div className="d5-hero-tag">Project Management System / 2025</div>
              <h1 className="d5-hero-title">
                <span className="d5-thin">Structured</span><br />
                <span className="d5-outline">Velocity</span>
              </h1>
              <p className="d5-hero-sub">
                Workspaces, projects, tasks, cycles, and labels — unified in one system
                designed for teams that move fast without breaking structure.
              </p>
              <div className="d5-hero-btns">
                <a className="d5-btn-red" href="#">Get Started</a>
                <a className="d5-btn-ghost" href="#">Documentation</a>
              </div>
            </div>
            <div className="d5-hero-right">
              {[
                { name: "Workspaces", num: "01" },
                { name: "Projects", num: "02" },
                { name: "Tasks", num: "03" },
                { name: "Cycles", num: "04" },
                { name: "Labels", num: "05" },
                { name: "Customer Portal", num: "06" },
              ].map((c) => (
                <div key={c.num} className="d5-card">
                  <span className="d5-card-name">{c.name}</span>
                  <span className="d5-card-num">{c.num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DIAGONAL DIVIDER */}
          <div className="d5-diag">
            <span className="d5-diag-text">Free for teams up to 5 &mdash; no credit card</span>
          </div>

          {/* FEATURES */}
          <div className="d5-features" id="features">
            <div className="d5-features-header">
              <div className="d5-section-title">Features</div>
              <div className="d5-section-count">06 Core Modules</div>
            </div>
            <div className="d5-feat-list">
              {[
                { num: "01", name: "Workspaces", desc: "Isolated environments for each team. Independent settings, members, billing, and data." },
                { num: "02", name: "Projects", desc: "Custom workflows and views. Auto-generated task ID prefixes per project." },
                { num: "03", name: "Tasks", desc: "Auto-IDs (WS-001), rich markdown, sub-tasks, relations, and activity history." },
                { num: "04", name: "Cycles", desc: "Sprints with burndown charts, velocity tracking, and automatic rollover." },
                { num: "05", name: "Labels", desc: "Color-coded tags scoped to workspace or project. Cross-project filtering." },
                { num: "06", name: "Customer Portal", desc: "Feedback, support tickets, and project visibility for external stakeholders." },
              ].map((f) => (
                <div key={f.num} className="d5-feat-item">
                  <div className="d5-feat-num-col"><div className="d5-feat-num">{f.num}</div></div>
                  <div className="d5-feat-name-col"><div className="d5-feat-name">{f.name}</div></div>
                  <div className="d5-feat-desc-col"><div className="d5-feat-desc">{f.desc}</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* ROLES */}
          <div className="d5-roles" id="roles">
            <div className="d5-roles-header">
              <div className="d5-section-title">Three Roles</div>
            </div>
            <div className="d5-roles-grid">
              <div className="d5-role-card">
                <div className="d5-role-head d5-role-head-red">
                  <div className="d5-role-title">Admin</div>
                  <div className="d5-role-badge">Full Control</div>
                </div>
                <div className="d5-role-body">
                  <div className="d5-role-desc">Workspace governance, billing, members, and complete operational authority.</div>
                  <div className="d5-role-perms">
                    <div><span className="d5-pc">&check;</span>Workspace settings</div>
                    <div><span className="d5-pc">&check;</span>Member management</div>
                    <div><span className="d5-pc">&check;</span>Billing &amp; invoices</div>
                    <div><span className="d5-pc">&check;</span>All project operations</div>
                  </div>
                </div>
              </div>
              <div className="d5-role-card">
                <div className="d5-role-head d5-role-head-black">
                  <div className="d5-role-title">Employee</div>
                  <div className="d5-role-badge">Build &amp; Ship</div>
                </div>
                <div className="d5-role-body">
                  <div className="d5-role-desc">Project-scoped access. Create tasks, manage cycles, apply labels.</div>
                  <div className="d5-role-perms">
                    <div><span className="d5-pc">&check;</span>Create &amp; edit tasks</div>
                    <div><span className="d5-pc">&check;</span>Manage cycles</div>
                    <div><span className="d5-pc">&check;</span>Apply labels</div>
                    <div><span className="d5-pc">&check;</span>Project views</div>
                  </div>
                </div>
              </div>
              <div className="d5-role-card">
                <div className="d5-role-head d5-role-head-white">
                  <div className="d5-role-title">Customer</div>
                  <div className="d5-role-badge">Portal Access</div>
                </div>
                <div className="d5-role-body">
                  <div className="d5-role-desc">Dedicated portal for feedback, support tickets, and project updates.</div>
                  <div className="d5-role-perms">
                    <div><span className="d5-pc">&check;</span>Submit feedback</div>
                    <div><span className="d5-pc">&check;</span>Track tickets</div>
                    <div><span className="d5-pc">&check;</span>View updates</div>
                    <div><span className="d5-pc">&check;</span>Portal dashboard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="d5-cta">
            <div className="d5-cta-left">
              <h2 className="d5-cta-title">
                Start<br />
                <span className="d5-thin">Building</span><br />
                Today
              </h2>
              <div className="d5-hero-btns">
                <a className="d5-btn-red" href="#">Get Started</a>
                <a className="d5-btn-ghost" href="#">Docs</a>
              </div>
            </div>
            <div className="d5-cta-right">
              <div className="d5-cta-list-title">Why Web Star OS</div>
              <ul className="d5-cta-list">
                <li>Free for small teams</li>
                <li>No credit card required</li>
                <li>Setup in under 2 minutes</li>
                <li>Import from Linear, Jira, or Asana</li>
                <li>SOC 2 Type II compliant</li>
              </ul>
            </div>
          </div>

          <div className="d5-footer">
            <span>&copy; 2025 Web Star OS</span>
            <span>Velocity, structured</span>
          </div>
        </div>
      </div>
    </>
  );
}
