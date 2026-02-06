export const metadata = {
  title: "Web Star OS — The Operating System for Ambitious Teams",
};

export default function DesignOne() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;700&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --ink: #0a0a0a;
          --paper: #f5f0e8;
          --rule: #1a1a1a;
          --accent: #c41200;
          --faded: #8a8478;
        }

        body { background: var(--paper); }

        .d1-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          font-family: 'Libre Baskerville', Georgia, serif;
          color: var(--ink);
          background: var(--paper);
          min-height: 100vh;
        }

        /* ── MASTHEAD ── */
        .d1-masthead {
          padding: 1.5rem 0 1rem;
          border-bottom: 4px double var(--ink);
        }
        .d1-masthead-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--faded);
          margin-bottom: 0.75rem;
        }
        .d1-logo-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: clamp(3rem, 7vw, 6rem);
          text-align: center;
          letter-spacing: -0.03em;
          line-height: 0.9;
          text-transform: uppercase;
        }
        .d1-logo-text span {
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .d1-sub-masthead {
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--faded);
          margin-top: 0.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--rule);
        }

        /* ── NAV BAR ── */
        .d1-nav {
          display: flex;
          justify-content: center;
          gap: 2rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--rule);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }
        .d1-nav a {
          color: var(--ink);
          text-decoration: none;
          transition: color 0.2s;
        }
        .d1-nav a:hover { color: var(--accent); }

        /* ── HERO GRID ── */
        .d1-hero {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 0;
          border-bottom: 2px solid var(--ink);
          min-height: 70vh;
        }
        .d1-hero-main {
          padding: 2.5rem 2.5rem 2.5rem 0;
          border-right: 1px solid var(--rule);
        }
        .d1-hero-kicker {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--accent);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .d1-hero-kicker::before {
          content: '';
          width: 40px;
          height: 1px;
          background: var(--accent);
        }
        .d1-hero-headline {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .d1-hero-headline em {
          font-style: italic;
          font-weight: 400;
        }
        .d1-hero-deck {
          font-size: 1.15rem;
          line-height: 1.7;
          max-width: 560px;
          color: #3a3632;
          margin-bottom: 2rem;
        }
        .d1-hero-deck .d1-drop-cap {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4.5rem;
          float: left;
          line-height: 0.75;
          margin-right: 0.15em;
          margin-top: 0.05em;
          font-weight: 900;
          color: var(--ink);
        }
        .d1-hero-byline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--faded);
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--rule);
        }

        /* ── SIDEBAR ── */
        .d1-hero-side {
          padding: 2.5rem 0 2.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .d1-sidebar-block {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--rule);
        }
        .d1-sidebar-block:last-child { border-bottom: none; }
        .d1-sidebar-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .d1-sidebar-stat {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 3.5rem;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .d1-sidebar-stat-note {
          font-size: 0.8rem;
          color: var(--faded);
          margin-top: 0.35rem;
          line-height: 1.5;
        }
        .d1-sidebar-quote {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 1.15rem;
          line-height: 1.55;
          position: relative;
          padding-left: 1.25rem;
        }
        .d1-sidebar-quote::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent);
        }
        .d1-sidebar-cite {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--faded);
          margin-top: 0.75rem;
          font-style: normal;
        }

        /* ── UI SPECIMEN ── */
        .d1-specimen {
          padding: 3rem 0;
          border-bottom: 2px solid var(--ink);
        }
        .d1-specimen-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--rule);
        }
        .d1-specimen-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 1.75rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .d1-specimen-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--faded);
        }
        .d1-mock-ui {
          background: var(--ink);
          border-radius: 4px;
          padding: 0;
          overflow: hidden;
          font-family: 'JetBrains Mono', monospace;
          color: #e8e4dc;
          position: relative;
        }
        .d1-mock-titlebar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          background: #151515;
          border-bottom: 1px solid #222;
        }
        .d1-mock-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #333;
        }
        .d1-mock-dot:first-child { background: #ff5f57; }
        .d1-mock-dot:nth-child(2) { background: #febc2e; }
        .d1-mock-dot:nth-child(3) { background: #28c840; }
        .d1-mock-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          min-height: 400px;
        }
        .d1-mock-sidebar-ui {
          border-right: 1px solid #222;
          padding: 1.25rem;
          font-size: 0.72rem;
        }
        .d1-mock-ws {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #666;
          margin-bottom: 1rem;
        }
        .d1-mock-nav-item {
          padding: 0.4rem 0.6rem;
          border-radius: 4px;
          margin-bottom: 2px;
          color: #888;
          cursor: default;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .d1-mock-nav-item.active {
          background: #1a1a1a;
          color: #fff;
        }
        .d1-mock-nav-item .d1-nav-icon {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          border: 1px solid #333;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.5rem;
        }
        .d1-mock-content {
          padding: 1.25rem;
        }
        .d1-mock-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #1a1a1a;
        }
        .d1-mock-content-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
        }
        .d1-mock-filter-bar {
          display: flex;
          gap: 0.75rem;
          font-size: 0.6rem;
          color: #555;
        }
        .d1-mock-filter-bar span { cursor: default; }
        .d1-mock-filter-bar span.active { color: #fff; }
        .d1-mock-task-row {
          display: grid;
          grid-template-columns: 18px 60px 1fr 80px 80px 60px;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #151515;
          font-size: 0.68rem;
          color: #888;
        }
        .d1-mock-task-check {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid #444;
        }
        .d1-mock-task-id { color: #555; }
        .d1-mock-task-name { color: #ddd; }
        .d1-mock-task-label {
          font-size: 0.55rem;
          padding: 2px 6px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .d1-label-bug { background: #3d1515; color: #ff6b6b; }
        .d1-label-feat { background: #152a3d; color: #6bb3ff; }
        .d1-label-imp { background: #2a3d15; color: #a8ff6b; }
        .d1-mock-task-priority { color: #666; }
        .d1-mock-task-assignee {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.5rem;
          color: #888;
        }

        /* ── FEATURES COLUMNS ── */
        .d1-features {
          padding: 3rem 0;
          border-bottom: 2px solid var(--ink);
        }
        .d1-features-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .d1-features-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 2.5rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .d1-features-rule {
          width: 60px;
          height: 3px;
          background: var(--accent);
          margin: 0 auto;
        }
        .d1-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .d1-feature-col {
          padding: 2rem;
          border-right: 1px solid var(--rule);
        }
        .d1-feature-col:last-child { border-right: none; }
        .d1-feature-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 4rem;
          line-height: 1;
          color: var(--paper);
          -webkit-text-stroke: 1.5px var(--ink);
          margin-bottom: 1rem;
        }
        .d1-feature-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .d1-feature-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #5a5650;
        }

        /* ── ROLES SECTION ── */
        .d1-roles {
          padding: 3rem 0;
          border-bottom: 2px solid var(--ink);
        }
        .d1-roles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        .d1-role-card {
          background: var(--ink);
          color: var(--paper);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .d1-role-card::before {
          content: attr(data-role);
          position: absolute;
          top: -15px;
          right: -10px;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 8rem;
          opacity: 0.05;
          line-height: 1;
          pointer-events: none;
        }
        .d1-role-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          background: var(--accent);
          color: #fff;
          padding: 4px 10px;
          display: inline-block;
          margin-bottom: 1.25rem;
        }
        .d1-role-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }
        .d1-role-desc {
          font-family: 'Libre Baskerville', Georgia, serif;
          font-size: 0.85rem;
          line-height: 1.7;
          opacity: 0.7;
        }

        /* ── FOOTER ── */
        .d1-footer {
          padding: 2rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--faded);
        }
        .d1-cta-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          background: var(--ink);
          color: var(--paper);
          border: none;
          padding: 1rem 2.5rem;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .d1-cta-btn:hover {
          background: var(--accent);
          color: #fff;
        }
        .d1-cta-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-top: 2rem;
        }
        .d1-cta-btn-ghost {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--ink);
          padding: 1rem 2.5rem;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .d1-cta-btn-ghost:hover {
          background: var(--ink);
          color: var(--paper);
        }

        /* ── COLUMN RULE DIVIDERS ── */
        .d1-col-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0.5rem 0;
        }
        .d1-col-divider::before,
        .d1-col-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--rule);
        }
        .d1-col-divider span {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 0.85rem;
        }

        /* ── TICKER ── */
        .d1-ticker {
          background: var(--ink);
          color: var(--paper);
          overflow: hidden;
          white-space: nowrap;
          padding: 0.6rem 0;
          border-bottom: 1px solid #333;
        }
        .d1-ticker-inner {
          display: inline-block;
          animation: d1-scroll 30s linear infinite;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }
        @keyframes d1-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .d1-ticker-sep {
          color: var(--accent);
          margin: 0 2rem;
        }

        @media (max-width: 900px) {
          .d1-hero { grid-template-columns: 1fr; }
          .d1-hero-main { border-right: none; padding-right: 0; border-bottom: 1px solid var(--rule); }
          .d1-hero-side { padding-left: 0; }
          .d1-features-grid, .d1-roles-grid { grid-template-columns: 1fr; }
          .d1-feature-col { border-right: none; border-bottom: 1px solid var(--rule); }
          .d1-mock-body { grid-template-columns: 1fr; }
          .d1-mock-sidebar-ui { display: none; }
        }
      `}</style>

      <div className="d1-wrap">
        {/* TICKER */}
        <div className="d1-ticker">
          <div className="d1-ticker-inner">
            <span>Workspaces</span><span className="d1-ticker-sep">/</span>
            <span>Projects</span><span className="d1-ticker-sep">/</span>
            <span>Tasks</span><span className="d1-ticker-sep">/</span>
            <span>Cycles</span><span className="d1-ticker-sep">/</span>
            <span>Labels</span><span className="d1-ticker-sep">/</span>
            <span>Role-Based Access</span><span className="d1-ticker-sep">/</span>
            <span>Customer Portal</span><span className="d1-ticker-sep">/</span>
            <span>Auto-Generated IDs</span><span className="d1-ticker-sep">/</span>
            <span>Workspaces</span><span className="d1-ticker-sep">/</span>
            <span>Projects</span><span className="d1-ticker-sep">/</span>
            <span>Tasks</span><span className="d1-ticker-sep">/</span>
            <span>Cycles</span><span className="d1-ticker-sep">/</span>
            <span>Labels</span><span className="d1-ticker-sep">/</span>
            <span>Role-Based Access</span><span className="d1-ticker-sep">/</span>
            <span>Customer Portal</span><span className="d1-ticker-sep">/</span>
            <span>Auto-Generated IDs</span><span className="d1-ticker-sep">/</span>
          </div>
        </div>

        {/* MASTHEAD */}
        <div className="d1-masthead">
          <div className="d1-masthead-top">
            <span>Vol. I &mdash; No. 1</span>
            <span>Project Management, Redefined</span>
            <span>Est. 2025</span>
          </div>
          <div className="d1-logo-text">
            Web Star <span>OS</span>
          </div>
          <div className="d1-sub-masthead">
            The Operating System for Teams Who Ship &mdash; Workspaces &bull; Projects &bull; Tasks &bull; Cycles &bull; Labels
          </div>
        </div>

        {/* NAV */}
        <nav className="d1-nav">
          <a href="#features">Features</a>
          <a href="#interface">Interface</a>
          <a href="#roles">Roles</a>
          <a href="#pricing">Pricing</a>
          <a href="#changelog">Changelog</a>
        </nav>

        {/* HERO */}
        <div className="d1-hero">
          <div className="d1-hero-main">
            <div className="d1-hero-kicker">Exclusive Report</div>
            <h1 className="d1-hero-headline">
              The End of<br />
              Scattered <em>Project</em><br />
              Management
            </h1>
            <p className="d1-hero-deck">
              <span className="d1-drop-cap">W</span>eb Star OS unifies workspaces, projects, tasks, sprints, and access control into a single, opinionated system. No more juggling five tools. No more context-switching. One workspace to rule your entire operation&mdash;from backlog grooming to customer feedback.
            </p>
            <div className="d1-cta-row">
              <a className="d1-cta-btn" href="#">Start Free Trial</a>
              <a className="d1-cta-btn-ghost" href="#">Read the Docs</a>
            </div>
            <div className="d1-hero-byline">
              Reporting by the Web Star team &bull; 6 min read
            </div>
          </div>

          <div className="d1-hero-side">
            <div className="d1-sidebar-block">
              <div className="d1-sidebar-label">Tasks Managed</div>
              <div className="d1-sidebar-stat">2.4M</div>
              <div className="d1-sidebar-stat-note">across 1,200+ teams in the first year</div>
            </div>
            <div className="d1-sidebar-block">
              <div className="d1-sidebar-label">Average Cycle Time</div>
              <div className="d1-sidebar-stat">-38%</div>
              <div className="d1-sidebar-stat-note">reduction in sprint completion time</div>
            </div>
            <div className="d1-sidebar-block">
              <div className="d1-sidebar-quote">
                &ldquo;We replaced Linear, Jira, and Notion with one tool. The auto-generated task IDs alone saved us hours.&rdquo;
                <div className="d1-sidebar-cite">&mdash; Sarah Chen, CTO at Modular</div>
              </div>
            </div>
          </div>
        </div>

        {/* UI SPECIMEN */}
        <div className="d1-specimen" id="interface">
          <div className="d1-specimen-header">
            <div className="d1-specimen-title">The Interface</div>
            <div className="d1-specimen-sub">Fig. 1 &mdash; Task Board View</div>
          </div>
          <div className="d1-mock-ui">
            <div className="d1-mock-titlebar">
              <div className="d1-mock-dot"></div>
              <div className="d1-mock-dot"></div>
              <div className="d1-mock-dot"></div>
            </div>
            <div className="d1-mock-body">
              <div className="d1-mock-sidebar-ui">
                <div className="d1-mock-ws">Acme Corp</div>
                <div className="d1-mock-nav-item"><span className="d1-nav-icon">#</span> Inbox</div>
                <div className="d1-mock-nav-item"><span className="d1-nav-icon">&bull;</span> My Issues</div>
                <div className="d1-mock-nav-item active"><span className="d1-nav-icon">&gt;</span> Projects</div>
                <div className="d1-mock-nav-item"><span className="d1-nav-icon">~</span> Cycles</div>
                <div className="d1-mock-nav-item"><span className="d1-nav-icon">@</span> Members</div>
                <div className="d1-mock-nav-item"><span className="d1-nav-icon">&amp;</span> Settings</div>
              </div>
              <div className="d1-mock-content">
                <div className="d1-mock-content-header">
                  <div className="d1-mock-content-title">Web Star Frontend &mdash; Sprint 14</div>
                  <div className="d1-mock-filter-bar">
                    <span className="active">All</span>
                    <span>In Progress</span>
                    <span>Review</span>
                    <span>Done</span>
                  </div>
                </div>
                {[
                  { id: "WS-142", name: "Implement drag-and-drop task reordering", label: "Feature", cls: "d1-label-feat", priority: "Urgent", assignee: "SC" },
                  { id: "WS-143", name: "Fix sidebar collapse state persistence", label: "Bug", cls: "d1-label-bug", priority: "High", assignee: "JL" },
                  { id: "WS-144", name: "Add keyboard shortcuts for task actions", label: "Improvement", cls: "d1-label-imp", priority: "Medium", assignee: "AK" },
                  { id: "WS-145", name: "Design customer portal feedback widget", label: "Feature", cls: "d1-label-feat", priority: "High", assignee: "MR" },
                  { id: "WS-146", name: "Optimize cycle burndown chart rendering", label: "Improvement", cls: "d1-label-imp", priority: "Medium", assignee: "DP" },
                  { id: "WS-147", name: "Role permission check on workspace invite", label: "Bug", cls: "d1-label-bug", priority: "Urgent", assignee: "SC" },
                  { id: "WS-148", name: "Auto-assign labels based on project template", label: "Feature", cls: "d1-label-feat", priority: "Low", assignee: "JL" },
                ].map((task) => (
                  <div key={task.id} className="d1-mock-task-row">
                    <div className="d1-mock-task-check"></div>
                    <div className="d1-mock-task-id">{task.id}</div>
                    <div className="d1-mock-task-name">{task.name}</div>
                    <div><span className={`d1-mock-task-label ${task.cls}`}>{task.label}</span></div>
                    <div className="d1-mock-task-priority">{task.priority}</div>
                    <div className="d1-mock-task-assignee">{task.assignee}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="d1-features" id="features">
          <div className="d1-features-header">
            <div className="d1-features-title">Six Pillars</div>
            <div className="d1-features-rule"></div>
          </div>
          <div className="d1-features-grid">
            {[
              { num: "01", name: "Workspaces", desc: "Isolated environments for each team, department, or client. Full data separation with shared billing." },
              { num: "02", name: "Projects", desc: "Group related work with custom views, statuses, and workflows. Every project gets its own ID prefix." },
              { num: "03", name: "Tasks", desc: "Auto-generated identifiers (WS-001), rich markdown, sub-tasks, relations, and activity history." },
              { num: "04", name: "Cycles", desc: "Time-boxed sprints with burndown charts, velocity tracking, and automatic rollover for unfinished work." },
              { num: "05", name: "Labels", desc: "Color-coded categorical tags with workspace-level and project-level scoping. Filter everything instantly." },
              { num: "06", name: "Access Control", desc: "Three roles\u2014Admin, Employee, Customer\u2014each with precisely scoped permissions. No over-sharing." },
            ].map((f) => (
              <div key={f.num} className="d1-feature-col">
                <div className="d1-feature-num">{f.num}</div>
                <div className="d1-feature-name">{f.name}</div>
                <div className="d1-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ROLES */}
        <div className="d1-roles" id="roles">
          <div className="d1-features-header">
            <div className="d1-features-title">Three Roles, Zero Ambiguity</div>
            <div className="d1-features-rule"></div>
          </div>
          <div className="d1-roles-grid">
            <div className="d1-role-card" data-role="A">
              <div className="d1-role-badge">Full Control</div>
              <div className="d1-role-name">Admin</div>
              <div className="d1-role-desc">Workspace configuration, billing, member management, and all project operations. The source of truth for your organization.</div>
            </div>
            <div className="d1-role-card" data-role="E">
              <div className="d1-role-badge">Build & Ship</div>
              <div className="d1-role-name">Employee</div>
              <div className="d1-role-desc">Full project access\u2014create tasks, manage cycles, apply labels, and track progress. Everything a maker needs, nothing they don't.</div>
            </div>
            <div className="d1-role-card" data-role="C">
              <div className="d1-role-badge">Portal Access</div>
              <div className="d1-role-name">Customer</div>
              <div className="d1-role-desc">Dedicated portal for submitting feedback, tracking support tickets, and viewing project updates. Transparent without being overwhelming.</div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="d1-footer">
          <span>&copy; 2025 Web Star OS. All rights reserved.</span>
          <a className="d1-cta-btn" href="#">Get Early Access &rarr;</a>
          <span>Made for teams who ship.</span>
        </div>
      </div>
    </>
  );
}
