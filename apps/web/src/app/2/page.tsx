export const metadata = {
  title: "Web Star OS — Precision in Darkness",
};

export default function DesignTwo() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,900&family=DM+Mono:wght@300;400;500&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #0b0b0b;
          --surface: #111;
          --card: #161616;
          --white: #eee;
          --dim: #777;
          --faint: #333;
          --red: #e63312;
          --grid-line: rgba(255,255,255,0.04);
        }

        body { background: var(--bg); }

        .d2 {
          font-family: 'Inter Tight', Helvetica, Arial, sans-serif;
          color: var(--white);
          background: var(--bg);
          min-height: 100vh;
          position: relative;
        }

        .d2-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }
        .d2-content { position: relative; z-index: 1; }

        /* ── TOPBAR ── */
        .d2-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 3rem;
          border-bottom: 1px solid var(--faint);
        }
        .d2-logo { font-weight: 900; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .d2-logo .d2-r { color: var(--red); }
        .d2-nav { display: flex; gap: 2.5rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; }
        .d2-nav a { color: var(--dim); text-decoration: none; transition: color 0.3s; }
        .d2-nav a:hover { color: var(--red); }

        /* ── HERO ── */
        .d2-hero {
          padding: 0 3rem;
          min-height: 88vh;
          display: grid; grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--faint);
        }
        .d2-hero-left {
          padding: 7rem 5rem 7rem 0;
          border-right: 1px solid var(--faint);
          display: flex; flex-direction: column; justify-content: center;
        }
        .d2-hero-tag {
          font-family: 'DM Mono', monospace; font-size: 0.6rem; text-transform: uppercase;
          letter-spacing: 0.35em; color: var(--red); margin-bottom: 2.5rem;
        }
        .d2-hero-title {
          font-weight: 900; font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.92; letter-spacing: -0.04em; text-transform: uppercase; margin-bottom: 2.5rem;
        }
        .d2-hero-title .d2-thin { font-weight: 100; font-style: italic; }
        .d2-hero-title .d2-outline { color: transparent; -webkit-text-stroke: 1.5px var(--white); }
        .d2-hero-sub {
          font-size: 1rem; line-height: 1.7; font-weight: 300; max-width: 420px; color: var(--dim);
          margin-bottom: 3rem;
        }
        .d2-hero-btns { display: flex; gap: 1rem; }
        .d2-btn-red {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: var(--red); color: #fff; border: 2px solid var(--red);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .d2-btn-red:hover { background: #fff; color: var(--bg); border-color: #fff; }
        .d2-btn-ghost {
          font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: transparent; color: var(--dim); border: 1px solid var(--faint);
          padding: 1rem 2.5rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .d2-btn-ghost:hover { border-color: var(--white); color: var(--white); }

        /* HERO RIGHT — STATS */
        .d2-hero-right {
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 3rem 0 3rem 5rem;
        }
        .d2-stat-block { padding: 2rem 0; border-bottom: 1px solid var(--faint); }
        .d2-stat-block:last-child { border-bottom: none; }
        .d2-stat-label {
          font-family: 'DM Mono', monospace; font-size: 0.55rem; text-transform: uppercase;
          letter-spacing: 0.3em; color: var(--dim); margin-bottom: 0.5rem;
        }
        .d2-stat-value { font-weight: 900; font-size: 4.5rem; line-height: 1; letter-spacing: -0.04em; }
        .d2-stat-value .d2-r { color: var(--red); }
        .d2-stat-note { font-weight: 300; font-size: 0.8rem; color: var(--dim); margin-top: 0.25rem; }

        /* ── BANNER ── */
        .d2-banner {
          background: var(--red); color: #fff;
          padding: 1.25rem 3rem; display: flex; justify-content: space-between; align-items: center;
          border-bottom: 1px solid var(--faint);
        }
        .d2-banner-text { font-weight: 900; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .d2-banner-btn {
          font-family: 'DM Mono', monospace; font-size: 0.65rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.15em;
          background: var(--bg); color: #fff; border: none; padding: 0.6rem 1.5rem;
          cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.2s;
        }
        .d2-banner-btn:hover { background: #222; }

        /* ── MOCK UI ── */
        .d2-ui-section {
          padding: 4rem 3rem;
          border-bottom: 1px solid var(--faint);
        }
        .d2-section-header {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: 2rem; border-bottom: 1px solid var(--faint); margin-bottom: 2.5rem;
        }
        .d2-section-title {
          font-weight: 900; font-size: 2.5rem; text-transform: uppercase; letter-spacing: -0.03em;
        }
        .d2-section-count {
          font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--dim);
          text-transform: uppercase; letter-spacing: 0.2em;
        }

        .d2-mock {
          background: var(--card); border: 1px solid var(--faint); border-radius: 6px; overflow: hidden;
          font-family: 'DM Mono', monospace; color: var(--dim); font-size: 0.72rem;
        }
        .d2-mock-bar {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 16px; background: var(--surface); border-bottom: 1px solid var(--faint);
        }
        .d2-mock-dot { width: 10px; height: 10px; border-radius: 50%; }
        .d2-dot-r { background: #ff5f57; }
        .d2-dot-y { background: #febc2e; }
        .d2-dot-g { background: #28c840; }
        .d2-mock-inner {
          display: grid; grid-template-columns: 200px 1fr; min-height: 380px;
        }
        .d2-mock-side {
          padding: 1.25rem; border-right: 1px solid var(--faint);
        }
        .d2-mock-ws {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.15em;
          color: var(--dim); opacity: 0.5; margin-bottom: 1.25rem;
        }
        .d2-mock-nav-item {
          padding: 0.4rem 0.6rem; border-radius: 4px; margin-bottom: 2px; color: #555;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .d2-mock-nav-item.active { background: var(--faint); color: var(--white); }
        .d2-mock-main { padding: 1.25rem; }
        .d2-mock-main-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--faint);
        }
        .d2-mock-main-title { font-size: 0.8rem; color: var(--white); }
        .d2-mock-filters { display: flex; gap: 1rem; font-size: 0.6rem; }
        .d2-mock-filters span.active { color: var(--white); }
        .d2-mock-row {
          display: grid; grid-template-columns: 16px 55px 1fr 70px 70px;
          align-items: center; gap: 0.75rem; padding: 0.45rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 0.68rem;
        }
        .d2-mock-check { width: 13px; height: 13px; border-radius: 50%; border: 1.5px solid var(--faint); }
        .d2-mock-id { color: #444; }
        .d2-mock-name { color: var(--white); opacity: 0.85; }
        .d2-mock-label {
          font-size: 0.52rem; padding: 2px 6px; border-radius: 3px;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .d2-lb-bug { background: #2a1010; color: #ff6b6b; }
        .d2-lb-feat { background: #0f1f2e; color: #6bb3ff; }
        .d2-lb-imp { background: #1a2a0f; color: #a8ff6b; }
        .d2-mock-pri { color: #555; }

        /* ── FEATURES ── */
        .d2-features {
          padding: 0 3rem; border-bottom: 1px solid var(--faint);
        }
        .d2-feat-rows {}
        .d2-feat-row {
          display: grid; grid-template-columns: 80px 200px 1fr; gap: 3rem;
          align-items: start; padding: 2.5rem 0;
          border-bottom: 1px solid var(--faint); transition: background 0.2s;
        }
        .d2-feat-row:last-child { border-bottom: none; }
        .d2-feat-row:hover { background: rgba(230,51,18,0.03); }
        .d2-feat-num {
          font-weight: 900; font-size: 2.5rem; line-height: 1;
          color: transparent; -webkit-text-stroke: 1.5px var(--faint);
        }
        .d2-feat-row:hover .d2-feat-num { -webkit-text-stroke: 1.5px var(--red); }
        .d2-feat-name {
          font-weight: 900; font-size: 1rem; text-transform: uppercase;
          letter-spacing: 0.06em; padding-top: 0.35rem;
        }
        .d2-feat-desc {
          font-weight: 300; font-size: 0.95rem; line-height: 1.7; color: var(--dim); padding-top: 0.35rem;
        }

        /* ── ROLES ── */
        .d2-roles {
          padding: 0 3rem; border-bottom: 1px solid var(--faint);
        }
        .d2-roles-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        .d2-role-col {
          padding: 3rem 2.5rem; border-right: 1px solid var(--faint); position: relative;
        }
        .d2-role-col:last-child { border-right: none; }
        .d2-role-letter {
          position: absolute; top: 1.5rem; right: 1.5rem;
          font-weight: 900; font-size: 8rem; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px var(--faint); pointer-events: none; opacity: 0.4;
        }
        .d2-role-tag {
          font-family: 'DM Mono', monospace; font-size: 0.55rem;
          text-transform: uppercase; letter-spacing: 0.25em; color: var(--red); margin-bottom: 1rem;
        }
        .d2-role-title {
          font-weight: 900; font-size: 1.75rem; text-transform: uppercase;
          letter-spacing: -0.01em; margin-bottom: 1rem;
        }
        .d2-role-text { font-weight: 300; font-size: 0.9rem; line-height: 1.7; color: var(--dim); }
        .d2-role-perms {
          margin-top: 1.5rem; font-family: 'DM Mono', monospace;
          font-size: 0.65rem; color: var(--dim); line-height: 2;
        }
        .d2-perm-check { color: var(--red); margin-right: 0.5rem; }

        /* ── CTA ── */
        .d2-cta {
          display: grid; grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--faint);
        }
        .d2-cta-left { padding: 6rem 4rem 6rem 3rem; border-right: 1px solid var(--faint); }
        .d2-cta-title {
          font-weight: 900; font-size: clamp(2rem, 4vw, 3.5rem);
          text-transform: uppercase; letter-spacing: -0.03em; line-height: 0.95; margin-bottom: 2rem;
        }
        .d2-cta-title .d2-thin { font-weight: 100; font-style: italic; }
        .d2-cta-right {
          padding: 6rem 3rem 6rem 4rem;
          display: flex; flex-direction: column; justify-content: center;
        }
        .d2-cta-list { list-style: none; font-weight: 300; font-size: 1rem; line-height: 2.5; color: var(--dim); }
        .d2-cta-list li::before { content: '\\2192'; color: var(--red); margin-right: 1rem; font-weight: 700; }

        /* ── FOOTER ── */
        .d2-footer {
          padding: 1.5rem 3rem; display: flex; justify-content: space-between;
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--dim); opacity: 0.5;
        }

        @media (max-width: 900px) {
          .d2-hero, .d2-cta { grid-template-columns: 1fr; }
          .d2-hero-left { border-right: none; border-bottom: 1px solid var(--faint); padding-right: 0; }
          .d2-roles-grid { grid-template-columns: 1fr; }
          .d2-role-col { border-right: none; border-bottom: 1px solid var(--faint); }
          .d2-feat-row { grid-template-columns: 60px 1fr; }
          .d2-feat-desc { grid-column: 1 / -1; }
          .d2-mock-inner { grid-template-columns: 1fr; }
          .d2-mock-side { display: none; }
          .d2-topbar, .d2-features, .d2-roles, .d2-cta-left, .d2-cta-right, .d2-footer, .d2-ui-section { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
      `}</style>

      <div className="d2">
        <div className="d2-grid-bg"></div>
        <div className="d2-content">

          <div className="d2-topbar">
            <div className="d2-logo">Web Star <span className="d2-r">OS</span></div>
            <nav className="d2-nav">
              <a href="#ui">Interface</a>
              <a href="#features">Features</a>
              <a href="#roles">Roles</a>
              <a href="#pricing">Pricing</a>
            </nav>
          </div>

          <div className="d2-hero">
            <div className="d2-hero-left">
              <div className="d2-hero-tag">Project Management System / 2025</div>
              <h1 className="d2-hero-title">
                <span className="d2-thin">Precision</span><br />
                In<br />
                <span className="d2-outline">Darkness</span>
              </h1>
              <p className="d2-hero-sub">
                Workspaces, projects, tasks, cycles, and labels — unified in one system
                built for focused execution. Three roles. Zero noise.
              </p>
              <div className="d2-hero-btns">
                <a className="d2-btn-red" href="#">Get Started</a>
                <a className="d2-btn-ghost" href="#">Documentation</a>
              </div>
            </div>
            <div className="d2-hero-right">
              <div className="d2-stat-block">
                <div className="d2-stat-label">Active Workspaces</div>
                <div className="d2-stat-value">1,247</div>
                <div className="d2-stat-note">organizations onboarded</div>
              </div>
              <div className="d2-stat-block">
                <div className="d2-stat-label">Cycle Velocity</div>
                <div className="d2-stat-value"><span className="d2-r">+</span>38%</div>
                <div className="d2-stat-note">average improvement</div>
              </div>
              <div className="d2-stat-block">
                <div className="d2-stat-label">Tasks Managed</div>
                <div className="d2-stat-value">2.4<span className="d2-r">M</span></div>
                <div className="d2-stat-note">with auto-generated identifiers</div>
              </div>
            </div>
          </div>

          <div className="d2-banner">
            <div className="d2-banner-text">Free for teams up to 5 &mdash; no credit card</div>
            <a className="d2-banner-btn" href="#">Start Now</a>
          </div>

          {/* UI MOCKUP */}
          <div className="d2-ui-section" id="ui">
            <div className="d2-section-header">
              <div className="d2-section-title">The Interface</div>
              <div className="d2-section-count">Task Board View</div>
            </div>
            <div className="d2-mock">
              <div className="d2-mock-bar">
                <div className="d2-mock-dot d2-dot-r"></div>
                <div className="d2-mock-dot d2-dot-y"></div>
                <div className="d2-mock-dot d2-dot-g"></div>
              </div>
              <div className="d2-mock-inner">
                <div className="d2-mock-side">
                  <div className="d2-mock-ws">Acme Corp</div>
                  <div className="d2-mock-nav-item"># Inbox</div>
                  <div className="d2-mock-nav-item">&bull; My Issues</div>
                  <div className="d2-mock-nav-item active">&gt; Projects</div>
                  <div className="d2-mock-nav-item">~ Cycles</div>
                  <div className="d2-mock-nav-item">@ Members</div>
                </div>
                <div className="d2-mock-main">
                  <div className="d2-mock-main-header">
                    <div className="d2-mock-main-title">Frontend &mdash; Sprint 14</div>
                    <div className="d2-mock-filters">
                      <span className="active">All</span>
                      <span>In Progress</span>
                      <span>Done</span>
                    </div>
                  </div>
                  {[
                    { id: "WS-142", name: "Implement drag-and-drop reordering", lb: "Feature", cls: "d2-lb-feat", pri: "Urgent" },
                    { id: "WS-143", name: "Fix sidebar collapse persistence", lb: "Bug", cls: "d2-lb-bug", pri: "High" },
                    { id: "WS-144", name: "Add keyboard shortcuts", lb: "Improvement", cls: "d2-lb-imp", pri: "Medium" },
                    { id: "WS-145", name: "Design customer portal widget", lb: "Feature", cls: "d2-lb-feat", pri: "High" },
                    { id: "WS-146", name: "Optimize burndown rendering", lb: "Improvement", cls: "d2-lb-imp", pri: "Medium" },
                    { id: "WS-147", name: "Role permission on workspace invite", lb: "Bug", cls: "d2-lb-bug", pri: "Urgent" },
                  ].map((t) => (
                    <div key={t.id} className="d2-mock-row">
                      <div className="d2-mock-check"></div>
                      <div className="d2-mock-id">{t.id}</div>
                      <div className="d2-mock-name">{t.name}</div>
                      <div><span className={`d2-mock-label ${t.cls}`}>{t.lb}</span></div>
                      <div className="d2-mock-pri">{t.pri}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="d2-features" id="features">
            <div className="d2-section-header">
              <div className="d2-section-title">Features</div>
              <div className="d2-section-count">06 Core Modules</div>
            </div>
            <div className="d2-feat-rows">
              {[
                { num: "01", name: "Workspaces", desc: "Isolated environments for each team. Independent settings, members, billing, and data separation." },
                { num: "02", name: "Projects", desc: "Logical groupings with custom workflows and views. Auto-generated task ID prefixes per project." },
                { num: "03", name: "Tasks", desc: "Auto-IDs (WS-001), rich markdown, sub-tasks, bidirectional relations, and complete activity history." },
                { num: "04", name: "Cycles", desc: "Time-boxed sprints with burndown charts, velocity tracking, and automatic rollover." },
                { num: "05", name: "Labels", desc: "Hierarchical color-coded tags scoped to workspace or project level. Cross-project filtering." },
                { num: "06", name: "Customer Portal", desc: "External-facing interface for feedback, support tickets, and project visibility." },
              ].map((f) => (
                <div key={f.num} className="d2-feat-row">
                  <div className="d2-feat-num">{f.num}</div>
                  <div className="d2-feat-name">{f.name}</div>
                  <div className="d2-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ROLES */}
          <div className="d2-roles" id="roles">
            <div className="d2-section-header">
              <div className="d2-section-title">Three Roles</div>
              <div className="d2-section-count">Role-Based Access</div>
            </div>
            <div className="d2-roles-grid">
              {[
                { letter: "A", tag: "Full Control", title: "Admin", text: "Workspace governance, billing, members, settings, and all operational control.", perms: ["Workspace settings", "Member management", "Billing & invoices", "All project operations"] },
                { letter: "E", tag: "Build & Ship", title: "Employee", text: "Project-scoped access. Create tasks, manage cycles, apply labels, track progress.", perms: ["Create & edit tasks", "Manage cycles", "Apply labels", "Project views"] },
                { letter: "C", tag: "Portal Access", title: "Customer", text: "Dedicated portal for external stakeholders. Feedback, tickets, and updates.", perms: ["Submit feedback", "Track tickets", "View updates", "Portal dashboard"] },
              ].map((r) => (
                <div key={r.letter} className="d2-role-col">
                  <div className="d2-role-letter">{r.letter}</div>
                  <div className="d2-role-tag">{r.tag}</div>
                  <div className="d2-role-title">{r.title}</div>
                  <div className="d2-role-text">{r.text}</div>
                  <div className="d2-role-perms">
                    {r.perms.map((p) => (
                      <div key={p}><span className="d2-perm-check">&check;</span>{p}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="d2-cta">
            <div className="d2-cta-left">
              <h2 className="d2-cta-title">Start<br /><span className="d2-thin">Building</span><br />Tonight</h2>
              <div className="d2-hero-btns">
                <a className="d2-btn-red" href="#">Get Started</a>
                <a className="d2-btn-ghost" href="#">Documentation</a>
              </div>
            </div>
            <div className="d2-cta-right">
              <ul className="d2-cta-list">
                <li>Free for small teams</li>
                <li>No credit card required</li>
                <li>Setup in under 2 minutes</li>
                <li>Import from Linear, Jira, or Asana</li>
                <li>SOC 2 Type II compliant</li>
              </ul>
            </div>
          </div>

          <div className="d2-footer">
            <span>&copy; 2025 Web Star OS</span>
            <span>Built for the dark</span>
          </div>
        </div>
      </div>
    </>
  );
}
