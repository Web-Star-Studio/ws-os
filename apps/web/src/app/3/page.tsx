export const metadata = {
  title: "Web Star OS — Technical Blueprint",
};

export default function DesignThree() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #f4f6f8;
          --white: #fff;
          --black: #0f1419;
          --blue: #1d4ed8;
          --blue-light: #dbeafe;
          --blue-dim: #93c5fd;
          --gray: #64748b;
          --light: #e2e8f0;
          --faint: #f1f5f9;
        }

        body { background: var(--bg); }

        .d3 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          color: var(--black);
          background: var(--bg);
          min-height: 100vh;
          position: relative;
        }

        /* DOT GRID BG */
        .d3-dot-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .d3-content { position: relative; z-index: 1; }

        /* ── TOPBAR ── */
        .d3-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 3rem; background: var(--white);
          border-bottom: 1px solid var(--light);
        }
        .d3-logo {
          font-weight: 700; font-size: 0.9rem; letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .d3-logo-mark {
          width: 24px; height: 24px; background: var(--blue); border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 0.6rem; font-weight: 700;
        }
        .d3-nav {
          display: flex; gap: 2rem; font-size: 0.75rem; font-weight: 500;
        }
        .d3-nav a {
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .d3-nav a:hover { color: var(--blue); }
        .d3-nav-btn {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 600;
          background: var(--blue); color: #fff; border: none; border-radius: 6px;
          padding: 0.55rem 1.25rem; cursor: pointer; text-decoration: none;
          transition: background 0.2s;
        }
        .d3-nav-btn:hover { background: #1e40af; }

        /* ── HERO ── */
        .d3-hero {
          padding: 5rem 3rem 4rem; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
        }
        .d3-hero-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.25em;
          color: var(--blue); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .d3-hero-tag::before {
          content: ''; width: 32px; height: 2px; background: var(--blue);
        }
        .d3-hero-title {
          font-weight: 700; font-size: clamp(2.5rem, 4.5vw, 3.75rem);
          line-height: 1.05; letter-spacing: -0.035em; margin-bottom: 1.5rem;
        }
        .d3-hero-title .d3-light { font-weight: 300; color: var(--gray); }
        .d3-hero-sub {
          font-size: 1.05rem; line-height: 1.7; font-weight: 400; color: var(--gray);
          max-width: 440px; margin-bottom: 2rem;
        }
        .d3-hero-btns { display: flex; gap: 0.75rem; }
        .d3-btn-blue {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600;
          background: var(--blue); color: #fff; border: 2px solid var(--blue);
          border-radius: 6px; padding: 0.85rem 2rem; cursor: pointer;
          text-decoration: none; display: inline-block; transition: all 0.2s;
        }
        .d3-btn-blue:hover { background: #1e40af; border-color: #1e40af; }
        .d3-btn-outline {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600;
          background: var(--white); color: var(--black); border: 2px solid var(--light);
          border-radius: 6px; padding: 0.85rem 2rem; cursor: pointer;
          text-decoration: none; display: inline-block; transition: all 0.2s;
        }
        .d3-btn-outline:hover { border-color: var(--blue); color: var(--blue); }

        /* HERO RIGHT — BLUEPRINT CARD */
        .d3-blueprint {
          background: var(--white); border: 1px solid var(--light); border-radius: 12px;
          padding: 2.5rem; position: relative; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }
        .d3-blueprint::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--blue);
        }
        .d3-bp-title {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.2em; color: var(--blue);
          margin-bottom: 1.5rem;
        }
        .d3-bp-tree {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; line-height: 2;
          color: var(--gray);
        }
        .d3-bp-hl { color: var(--blue); font-weight: 600; }
        .d3-bp-dim { opacity: 0.5; }
        .d3-bp-badge {
          display: inline-block; font-size: 0.52rem; padding: 1px 6px;
          border-radius: 4px; margin-left: 0.5rem; text-transform: uppercase;
          letter-spacing: 0.08em; font-weight: 600;
        }
        .d3-badge-core { background: var(--blue-light); color: var(--blue); }
        .d3-badge-rbac { background: #fef3c7; color: #92400e; }

        /* ── STATS ROW ── */
        .d3-stats {
          max-width: 1200px; margin: 0 auto; padding: 0 3rem 3rem;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
        }
        .d3-stat-card {
          background: var(--white); border: 1px solid var(--light); border-radius: 10px;
          padding: 1.75rem; text-align: center;
        }
        .d3-stat-val {
          font-weight: 700; font-size: 2.5rem; letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.35rem;
        }
        .d3-stat-val .d3-bl { color: var(--blue); }
        .d3-stat-lbl {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.55rem;
          text-transform: uppercase; letter-spacing: 0.2em; color: var(--gray);
        }

        /* ── FEATURES ── */
        .d3-features {
          max-width: 1200px; margin: 0 auto; padding: 3rem;
        }
        .d3-section-header {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: 1.5rem; border-bottom: 1px solid var(--light); margin-bottom: 0;
        }
        .d3-section-title { font-weight: 700; font-size: 1.75rem; letter-spacing: -0.02em; }
        .d3-section-count {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.2em; color: var(--gray);
        }
        .d3-feat-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem;
        }
        .d3-feat-card {
          background: var(--white); border: 1px solid var(--light); border-radius: 10px;
          padding: 2rem; transition: all 0.2s; position: relative; overflow: hidden;
        }
        .d3-feat-card:hover { border-color: var(--blue-dim); box-shadow: 0 4px 16px rgba(29,78,216,0.06); }
        .d3-feat-card::before {
          content: attr(data-num); position: absolute; top: -10px; right: 10px;
          font-weight: 700; font-size: 5rem; line-height: 1;
          color: var(--faint); pointer-events: none;
        }
        .d3-feat-card:hover::before { color: var(--blue-light); }
        .d3-feat-icon {
          width: 36px; height: 36px; background: var(--blue-light); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; font-weight: 600;
          color: var(--blue); margin-bottom: 1.25rem;
        }
        .d3-feat-name {
          font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; letter-spacing: -0.01em;
        }
        .d3-feat-desc { font-size: 0.85rem; line-height: 1.65; color: var(--gray); }

        /* ── ROLES ── */
        .d3-roles {
          max-width: 1200px; margin: 0 auto; padding: 3rem;
        }
        .d3-roles-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem;
        }
        .d3-role-card {
          background: var(--white); border: 1px solid var(--light); border-radius: 10px;
          overflow: hidden; transition: all 0.2s;
        }
        .d3-role-card:hover { border-color: var(--blue-dim); }
        .d3-role-header {
          padding: 1.25rem 1.75rem; border-bottom: 1px solid var(--light);
          display: flex; justify-content: space-between; align-items: center;
        }
        .d3-role-title { font-weight: 700; font-size: 1.1rem; letter-spacing: -0.01em; }
        .d3-role-badge {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.52rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          background: var(--blue-light); color: var(--blue); padding: 4px 10px; border-radius: 4px;
        }
        .d3-role-body { padding: 1.75rem; }
        .d3-role-desc { font-size: 0.85rem; line-height: 1.65; color: var(--gray); margin-bottom: 1.25rem; }
        .d3-role-perms {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem; color: var(--gray); line-height: 2.2;
        }
        .d3-role-check { color: var(--blue); margin-right: 0.5rem; }

        /* ── CTA ── */
        .d3-cta {
          max-width: 1200px; margin: 2rem auto 3rem; padding: 0 3rem;
        }
        .d3-cta-inner {
          background: var(--black); color: #fff; border-radius: 16px;
          padding: 4rem; display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; align-items: center; position: relative; overflow: hidden;
        }
        .d3-cta-inner::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--blue);
        }
        .d3-cta-title {
          font-weight: 700; font-size: clamp(2rem, 3.5vw, 2.75rem);
          letter-spacing: -0.03em; line-height: 1.1;
        }
        .d3-cta-title .d3-light { font-weight: 300; color: var(--gray); }
        .d3-cta-right-inner { display: flex; flex-direction: column; gap: 1.5rem; }
        .d3-cta-desc { font-size: 0.9rem; line-height: 1.65; color: var(--gray); }
        .d3-btn-white {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600;
          background: #fff; color: var(--black); border: none; border-radius: 6px;
          padding: 0.85rem 2rem; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s; align-self: flex-start;
        }
        .d3-btn-white:hover { background: var(--blue-light); color: var(--blue); }

        /* ── FOOTER ── */
        .d3-footer {
          max-width: 1200px; margin: 0 auto; padding: 1.5rem 3rem;
          display: flex; justify-content: space-between;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--gray);
        }

        @media (max-width: 900px) {
          .d3-hero, .d3-cta-inner { grid-template-columns: 1fr; }
          .d3-feat-grid, .d3-roles-grid, .d3-stats { grid-template-columns: 1fr; }
          .d3-hero, .d3-features, .d3-roles, .d3-cta { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
      `}</style>

      <div className="d3">
        <div className="d3-dot-bg"></div>
        <div className="d3-content">

          <div className="d3-topbar">
            <div className="d3-logo">
              <span className="d3-logo-mark">W</span>
              Web Star OS
            </div>
            <nav className="d3-nav">
              <a href="#features">Features</a>
              <a href="#roles">Roles</a>
              <a href="#pricing">Pricing</a>
              <a className="d3-nav-btn" href="#">Get Started</a>
            </nav>
          </div>

          <div className="d3-hero">
            <div>
              <div className="d3-hero-tag">Technical Blueprint / 2025</div>
              <h1 className="d3-hero-title">
                Project Management,<br />
                <span className="d3-light">Engineered.</span>
              </h1>
              <p className="d3-hero-sub">
                Workspaces, projects, tasks, cycles, and labels — architectured into
                one precise system. Three roles. Auto-generated identifiers. Zero ambiguity.
              </p>
              <div className="d3-hero-btns">
                <a className="d3-btn-blue" href="#">Start Building</a>
                <a className="d3-btn-outline" href="#">Read the Docs</a>
              </div>
            </div>
            <div className="d3-blueprint">
              <div className="d3-bp-title">System Architecture</div>
              <div className="d3-bp-tree">
                <div><span className="d3-bp-dim">.</span></div>
                <div><span className="d3-bp-dim">\u251C\u2500\u2500 </span><span className="d3-bp-hl">workspaces/</span> <span className="d3-bp-badge d3-badge-core">core</span></div>
                <div><span className="d3-bp-dim">\u2502   \u251C\u2500\u2500 </span><span className="d3-bp-hl">projects/</span></div>
                <div><span className="d3-bp-dim">\u2502   \u2502   \u251C\u2500\u2500 </span>tasks/ <span className="d3-bp-dim">auto-ID (WS-001)</span></div>
                <div><span className="d3-bp-dim">\u2502   \u2502   \u251C\u2500\u2500 </span>labels/ <span className="d3-bp-dim">color-coded</span></div>
                <div><span className="d3-bp-dim">\u2502   \u2502   \u2514\u2500\u2500 </span>cycles/ <span className="d3-bp-dim">sprints</span></div>
                <div><span className="d3-bp-dim">\u2502   \u2514\u2500\u2500 </span>members/</div>
                <div><span className="d3-bp-dim">\u251C\u2500\u2500 </span><span className="d3-bp-hl">rbac/</span> <span className="d3-bp-badge d3-badge-rbac">rbac</span></div>
                <div><span className="d3-bp-dim">\u2502   \u251C\u2500\u2500 </span>admin</div>
                <div><span className="d3-bp-dim">\u2502   \u251C\u2500\u2500 </span>employee</div>
                <div><span className="d3-bp-dim">\u2502   \u2514\u2500\u2500 </span>customer</div>
                <div><span className="d3-bp-dim">\u2514\u2500\u2500 </span><span className="d3-bp-hl">portal/</span> <span className="d3-bp-dim">customer-facing</span></div>
              </div>
            </div>
          </div>

          <div className="d3-stats">
            {[
              { val: "1,247", label: "Workspaces" },
              { val: "+38%", label: "Velocity Gain", hl: true },
              { val: "2.4M", label: "Tasks Managed" },
              { val: "99.99%", label: "Uptime" },
            ].map((s) => (
              <div key={s.label} className="d3-stat-card">
                <div className="d3-stat-val">{s.hl ? <><span className="d3-bl">+</span>38%</> : s.val}</div>
                <div className="d3-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="d3-features" id="features">
            <div className="d3-section-header">
              <div className="d3-section-title">Core Modules</div>
              <div className="d3-section-count">06 Features</div>
            </div>
            <div className="d3-feat-grid">
              {[
                { icon: "W", num: "01", name: "Workspaces", desc: "Isolated environments for each team. Independent settings, members, and billing." },
                { icon: "P", num: "02", name: "Projects", desc: "Grouped work with custom workflows. Auto-prefixed task identifiers per project." },
                { icon: "T", num: "03", name: "Tasks", desc: "Auto-IDs (WS-001), markdown, sub-tasks, relations, and activity history." },
                { icon: "C", num: "04", name: "Cycles", desc: "Time-boxed sprints with burndown charts, velocity tracking, and rollover." },
                { icon: "L", num: "05", name: "Labels", desc: "Color-coded tags scoped to workspace or project. Instant cross-project filtering." },
                { icon: "\u2726", num: "06", name: "Portal", desc: "Customer-facing interface for feedback, tickets, and project visibility." },
              ].map((f) => (
                <div key={f.num} className="d3-feat-card" data-num={f.num}>
                  <div className="d3-feat-icon">{f.icon}</div>
                  <div className="d3-feat-name">{f.name}</div>
                  <div className="d3-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="d3-roles" id="roles">
            <div className="d3-section-header">
              <div className="d3-section-title">Access Control</div>
              <div className="d3-section-count">03 Roles</div>
            </div>
            <div className="d3-roles-grid">
              {[
                { title: "Admin", badge: "Full Control", desc: "Workspace governance, billing, members, and all operational authority.", perms: ["Workspace settings", "Member management", "Billing & invoices", "All project operations"] },
                { title: "Employee", badge: "Build & Ship", desc: "Project-scoped access. Create tasks, manage cycles, apply labels.", perms: ["Create & edit tasks", "Manage cycles", "Apply labels", "Project views"] },
                { title: "Customer", badge: "Portal", desc: "Dedicated portal for feedback, support tickets, and project updates.", perms: ["Submit feedback", "Track tickets", "View updates", "Portal dashboard"] },
              ].map((r) => (
                <div key={r.title} className="d3-role-card">
                  <div className="d3-role-header">
                    <div className="d3-role-title">{r.title}</div>
                    <div className="d3-role-badge">{r.badge}</div>
                  </div>
                  <div className="d3-role-body">
                    <div className="d3-role-desc">{r.desc}</div>
                    <div className="d3-role-perms">
                      {r.perms.map((p) => (
                        <div key={p}><span className="d3-role-check">&check;</span>{p}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d3-cta">
            <div className="d3-cta-inner">
              <h2 className="d3-cta-title">
                Start Building<br /><span className="d3-light">Today.</span>
              </h2>
              <div className="d3-cta-right-inner">
                <div className="d3-cta-desc">
                  Free for teams up to 5. No credit card required.
                  Setup in under 2 minutes. Import from Linear, Jira, or Asana.
                </div>
                <a className="d3-btn-white" href="#">Get Started Free &rarr;</a>
              </div>
            </div>
          </div>

          <div className="d3-footer">
            <span>&copy; 2025 Web Star OS</span>
            <span>Engineered with care</span>
          </div>
        </div>
      </div>
    </>
  );
}
