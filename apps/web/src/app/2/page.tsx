export const metadata = {
  title: "Web Star OS — System Online",
};

export default function DesignTwo() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #0a0a0a;
          --phosphor: #00ff88;
          --amber: #ffb800;
          --dim: #1a3a25;
          --dimmer: #0d1f14;
          --text: #00cc6e;
          --muted: #337a52;
          --glow: 0 0 20px rgba(0,255,136,0.15);
          --border: #0f2e1c;
        }

        body { background: var(--bg); }

        .d2-wrap {
          font-family: 'IBM Plex Mono', monospace;
          color: var(--text);
          background: var(--bg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* SCANLINES OVERLAY */
        .d2-wrap::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
          z-index: 9999;
        }

        /* CRT VIGNETTE */
        .d2-wrap::after {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
          z-index: 9998;
        }

        /* ── BOOT HEADER ── */
        .d2-boot {
          padding: 2rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.7rem;
          color: var(--muted);
          line-height: 1.8;
        }
        .d2-boot .d2-ok { color: var(--phosphor); }
        .d2-boot .d2-warn { color: var(--amber); }

        /* ── TOP BAR ── */
        .d2-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.7rem;
        }
        .d2-logo {
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 1rem;
          color: var(--phosphor);
          text-shadow: var(--glow);
          letter-spacing: 0.05em;
        }
        .d2-logo span { color: var(--amber); }
        .d2-topbar-links {
          display: flex;
          gap: 2rem;
          color: var(--muted);
        }
        .d2-topbar-links a {
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .d2-topbar-links a:hover {
          color: var(--phosphor);
          text-shadow: var(--glow);
        }
        .d2-status-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--phosphor);
          box-shadow: 0 0 8px var(--phosphor);
          margin-right: 0.5rem;
          animation: d2-pulse 2s ease-in-out infinite;
        }
        @keyframes d2-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── HERO ── */
        .d2-hero {
          padding: 6rem 2rem 4rem;
          max-width: 900px;
          position: relative;
        }
        .d2-hero-prompt {
          font-size: 0.7rem;
          color: var(--muted);
          margin-bottom: 1rem;
        }
        .d2-hero-prompt span { color: var(--phosphor); }
        .d2-hero h1 {
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.15;
          color: var(--phosphor);
          text-shadow: var(--glow);
          margin-bottom: 2rem;
        }
        .d2-hero h1 .d2-blink {
          animation: d2-blink 1s step-end infinite;
          color: var(--phosphor);
        }
        @keyframes d2-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .d2-hero-desc {
          font-size: 0.85rem;
          line-height: 1.8;
          color: var(--muted);
          max-width: 600px;
          margin-bottom: 3rem;
        }
        .d2-hero-desc code {
          color: var(--phosphor);
          background: var(--dimmer);
          padding: 1px 6px;
          border-radius: 2px;
        }
        .d2-cmd-input {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--dimmer);
          border: 1px solid var(--border);
          padding: 1rem 1.5rem;
          border-radius: 4px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.85rem;
          max-width: 500px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .d2-cmd-input:hover {
          border-color: var(--dim);
          box-shadow: var(--glow);
        }
        .d2-cmd-chevron { color: var(--phosphor); font-weight: 700; }
        .d2-cmd-text { color: #fff; }
        .d2-cmd-cursor {
          width: 8px;
          height: 18px;
          background: var(--phosphor);
          animation: d2-blink 1s step-end infinite;
        }
        .d2-cmd-hint {
          font-size: 0.6rem;
          color: var(--muted);
          margin-top: 0.75rem;
          padding-left: 0.5rem;
        }

        /* ── SYSTEM MAP ── */
        .d2-system {
          padding: 4rem 2rem;
          border-top: 1px solid var(--border);
        }
        .d2-section-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--muted);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .d2-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .d2-tree {
          font-size: 0.78rem;
          line-height: 2;
          padding-left: 1rem;
        }
        .d2-tree-branch { color: var(--muted); }
        .d2-tree-label { color: var(--phosphor); }
        .d2-tree-desc { color: var(--muted); opacity: 0.6; }
        .d2-tree-badge {
          display: inline-block;
          font-size: 0.55rem;
          padding: 1px 8px;
          border-radius: 2px;
          margin-left: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .d2-badge-core { background: var(--dimmer); color: var(--phosphor); border: 1px solid var(--dim); }
        .d2-badge-rbac { background: #1f1500; color: var(--amber); border: 1px solid #3a2800; }

        /* ── FEATURES GRID ── */
        .d2-features {
          padding: 4rem 2rem;
          border-top: 1px solid var(--border);
        }
        .d2-feat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }
        .d2-feat-cell {
          background: var(--bg);
          padding: 2rem;
          transition: background 0.3s;
        }
        .d2-feat-cell:hover {
          background: var(--dimmer);
        }
        .d2-feat-index {
          font-size: 0.55rem;
          color: var(--muted);
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
        }
        .d2-feat-name {
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--phosphor);
          text-shadow: 0 0 10px rgba(0,255,136,0.1);
          margin-bottom: 0.75rem;
        }
        .d2-feat-desc {
          font-size: 0.75rem;
          line-height: 1.7;
          color: var(--muted);
        }
        .d2-feat-cmd {
          margin-top: 1rem;
          font-size: 0.65rem;
          color: var(--dim);
        }
        .d2-feat-cmd span { color: var(--phosphor); opacity: 0.5; }

        /* ── LOG OUTPUT ── */
        .d2-log {
          padding: 4rem 2rem;
          border-top: 1px solid var(--border);
        }
        .d2-log-block {
          background: var(--dimmer);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 2rem;
          max-width: 800px;
          font-size: 0.72rem;
          line-height: 2.2;
        }
        .d2-log-line { color: var(--muted); }
        .d2-log-line .d2-ts {
          color: var(--muted);
          opacity: 0.4;
          margin-right: 1rem;
        }
        .d2-log-line .d2-level-info {
          color: var(--phosphor);
          margin-right: 0.5rem;
        }
        .d2-log-line .d2-level-warn {
          color: var(--amber);
          margin-right: 0.5rem;
        }
        .d2-log-line .d2-event { color: #ccc; }

        /* ── ACCESS MATRIX ── */
        .d2-access {
          padding: 4rem 2rem;
          border-top: 1px solid var(--border);
        }
        .d2-matrix {
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          max-width: 700px;
          font-size: 0.72rem;
        }
        .d2-matrix-head {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          background: var(--dimmer);
          padding: 0.75rem 1.5rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.6rem;
          border-bottom: 1px solid var(--border);
        }
        .d2-matrix-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 0.6rem 1.5rem;
          border-bottom: 1px solid var(--border);
          color: var(--muted);
        }
        .d2-matrix-row:last-child { border-bottom: none; }
        .d2-matrix-perm { color: var(--muted); }
        .d2-perm-yes { color: var(--phosphor); }
        .d2-perm-no { color: #442020; }
        .d2-perm-limited { color: var(--amber); }

        /* ── CTA ── */
        .d2-cta-section {
          padding: 6rem 2rem;
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .d2-cta-heading {
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 2rem;
          color: var(--phosphor);
          text-shadow: var(--glow);
          margin-bottom: 1rem;
        }
        .d2-cta-sub {
          font-size: 0.8rem;
          color: var(--muted);
          margin-bottom: 3rem;
        }
        .d2-cta-btn {
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--bg);
          background: var(--phosphor);
          border: none;
          padding: 1rem 3rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 0 30px rgba(0,255,136,0.2);
        }
        .d2-cta-btn:hover {
          box-shadow: 0 0 50px rgba(0,255,136,0.4);
          transform: translateY(-1px);
        }

        /* ── FOOTER ── */
        .d2-footer {
          padding: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          font-size: 0.6rem;
          color: var(--muted);
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .d2-feat-grid { grid-template-columns: 1fr; }
          .d2-matrix-head, .d2-matrix-row { grid-template-columns: 2fr 1fr 1fr 1fr; font-size: 0.6rem; }
        }
      `}</style>

      <div className="d2-wrap">
        {/* BOOT SEQUENCE */}
        <div className="d2-boot">
          <div><span className="d2-ok">[OK]</span> WebStarOS Kernel v1.0.0 loaded</div>
          <div><span className="d2-ok">[OK]</span> Initializing workspace engine...</div>
          <div><span className="d2-ok">[OK]</span> RBAC module mounted — 3 roles configured</div>
          <div><span className="d2-warn">[WARN]</span> No active session — authentication required</div>
          <div><span className="d2-ok">[OK]</span> System ready. Awaiting input.</div>
        </div>

        {/* TOP BAR */}
        <div className="d2-topbar">
          <div className="d2-logo">
            WebStar<span>::</span>OS
          </div>
          <div className="d2-topbar-links">
            <span><span className="d2-status-dot"></span>System Online</span>
            <a href="#features">Modules</a>
            <a href="#access">RBAC</a>
            <a href="#log">Activity</a>
          </div>
        </div>

        {/* HERO */}
        <div className="d2-hero">
          <div className="d2-hero-prompt">
            <span>webstar@os</span>:~/projects$
          </div>
          <h1>
            Project management
            <br />at machine speed<span className="d2-blink">_</span>
          </h1>
          <p className="d2-hero-desc">
            One unified system for <code>workspaces</code>, <code>projects</code>, <code>tasks</code>,
            <code>cycles</code>, and <code>labels</code>. Role-based access keeps your team focused
            and your customers informed. Every task gets an auto-generated identifier.
            No configuration needed. It just works.
          </p>
          <div className="d2-cmd-input">
            <span className="d2-cmd-chevron">&gt;</span>
            <span className="d2-cmd-text">webstar init --workspace &quot;Acme Corp&quot;</span>
            <div className="d2-cmd-cursor"></div>
          </div>
          <div className="d2-cmd-hint">Press Enter to initialize your workspace</div>
        </div>

        {/* SYSTEM TREE */}
        <div className="d2-system">
          <div className="d2-section-label">System Architecture</div>
          <div className="d2-tree">
            <div><span className="d2-tree-branch">.</span></div>
            <div><span className="d2-tree-branch">&boxvr;&boxh;&boxh; </span><span className="d2-tree-label">workspaces/</span> <span className="d2-tree-desc">— isolated team environments</span> <span className="d2-tree-badge d2-badge-core">core</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxvr;&boxh;&boxh; </span><span className="d2-tree-label">projects/</span> <span className="d2-tree-desc">— grouped work with custom workflows</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxv;   &boxvr;&boxh;&boxh; </span><span className="d2-tree-label">tasks/</span> <span className="d2-tree-desc">— auto-ID'd items (WS-001)</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxv;   &boxvr;&boxh;&boxh; </span><span className="d2-tree-label">labels/</span> <span className="d2-tree-desc">— color-coded tags</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxv;   &boxur;&boxh;&boxh; </span><span className="d2-tree-label">cycles/</span> <span className="d2-tree-desc">— time-boxed sprints</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxur;&boxh;&boxh; </span><span className="d2-tree-label">members/</span> <span className="d2-tree-desc">— team roster & invites</span></div>
            <div><span className="d2-tree-branch">&boxvr;&boxh;&boxh; </span><span className="d2-tree-label">rbac/</span> <span className="d2-tree-desc">— role-based access control</span> <span className="d2-tree-badge d2-badge-rbac">rbac</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxvr;&boxh;&boxh; </span><span className="d2-tree-label">admin</span> <span className="d2-tree-desc">— full workspace control</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxvr;&boxh;&boxh; </span><span className="d2-tree-label">employee</span> <span className="d2-tree-desc">— project-level operations</span></div>
            <div><span className="d2-tree-branch">&boxv;   &boxur;&boxh;&boxh; </span><span className="d2-tree-label">customer</span> <span className="d2-tree-desc">— portal: feedback & tickets</span></div>
            <div><span className="d2-tree-branch">&boxur;&boxh;&boxh; </span><span className="d2-tree-label">portal/</span> <span className="d2-tree-desc">— customer-facing interface</span></div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="d2-features" id="features">
          <div className="d2-section-label">Core Modules</div>
          <div className="d2-feat-grid">
            {[
              { idx: "0x01", name: "Workspaces", desc: "Isolated environments with independent settings, members, and billing. Each workspace is its own universe.", cmd: "ws create --name 'Acme'" },
              { idx: "0x02", name: "Projects", desc: "Organize work into logical groups. Custom statuses, views, and workflows per project. Auto-prefixed task IDs.", cmd: "ws project init --prefix ACM" },
              { idx: "0x03", name: "Tasks", desc: "Rich task objects with markdown, sub-tasks, relations, and full history. Every task auto-assigned a unique identifier.", cmd: "ws task new --title 'Fix auth'" },
              { idx: "0x04", name: "Cycles", desc: "Sprint planning with burndown charts, velocity tracking, and automatic rollover for incomplete work.", cmd: "ws cycle start --weeks 2" },
              { idx: "0x05", name: "Labels", desc: "Hierarchical tagging at workspace and project levels. Instant cross-project filtering and search.", cmd: "ws label add --name bug --color red" },
              { idx: "0x06", name: "Customer Portal", desc: "Dedicated interface for external stakeholders. Submit feedback, track tickets, view updates. No internal noise.", cmd: "ws portal enable --workspace" },
            ].map((f) => (
              <div key={f.idx} className="d2-feat-cell">
                <div className="d2-feat-index">{f.idx}</div>
                <div className="d2-feat-name">{f.name}</div>
                <div className="d2-feat-desc">{f.desc}</div>
                <div className="d2-feat-cmd"><span>$ </span>{f.cmd}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY LOG */}
        <div className="d2-log" id="log">
          <div className="d2-section-label">Live Activity Feed</div>
          <div className="d2-log-block">
            {[
              { ts: "14:32:01", level: "info", event: "Task WS-142 created by sarah@acme.co" },
              { ts: "14:32:04", level: "info", event: 'Label "bug" applied to WS-142' },
              { ts: "14:32:15", level: "info", event: "WS-142 assigned to jake@acme.co" },
              { ts: "14:33:22", level: "info", event: "Cycle 14 started — 12 tasks queued" },
              { ts: "14:35:01", level: "warn", event: "Customer portal: new feedback from client#089" },
              { ts: "14:35:44", level: "info", event: "Support ticket TK-023 auto-created from feedback" },
              { ts: "14:36:10", level: "info", event: "WS-139 status changed: In Review → Done" },
              { ts: "14:36:12", level: "info", event: "Cycle 14 burndown updated — 11 remaining" },
            ].map((l, i) => (
              <div key={i} className="d2-log-line">
                <span className="d2-ts">{l.ts}</span>
                <span className={l.level === "warn" ? "d2-level-warn" : "d2-level-info"}>
                  [{l.level.toUpperCase()}]
                </span>
                <span className="d2-event">{l.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACCESS MATRIX */}
        <div className="d2-access" id="access">
          <div className="d2-section-label">RBAC Permission Matrix</div>
          <div className="d2-matrix">
            <div className="d2-matrix-head">
              <span>Permission</span>
              <span>Admin</span>
              <span>Employee</span>
              <span>Customer</span>
            </div>
            {[
              { perm: "Workspace Settings", admin: "yes", emp: "no", cust: "no" },
              { perm: "Manage Members", admin: "yes", emp: "no", cust: "no" },
              { perm: "Create Projects", admin: "yes", emp: "yes", cust: "no" },
              { perm: "Create / Edit Tasks", admin: "yes", emp: "yes", cust: "no" },
              { perm: "Manage Cycles", admin: "yes", emp: "yes", cust: "no" },
              { perm: "Apply Labels", admin: "yes", emp: "yes", cust: "no" },
              { perm: "Submit Feedback", admin: "yes", emp: "yes", cust: "yes" },
              { perm: "View Portal Updates", admin: "yes", emp: "limited", cust: "yes" },
              { perm: "Billing & Invoices", admin: "yes", emp: "no", cust: "no" },
            ].map((row, i) => (
              <div key={i} className="d2-matrix-row">
                <span className="d2-matrix-perm">{row.perm}</span>
                <span className={`d2-perm-${row.admin}`}>{row.admin === "yes" ? "\u2713" : row.admin === "limited" ? "~" : "\u2717"}</span>
                <span className={`d2-perm-${row.emp}`}>{row.emp === "yes" ? "\u2713" : row.emp === "limited" ? "~" : "\u2717"}</span>
                <span className={`d2-perm-${row.cust}`}>{row.cust === "yes" ? "\u2713" : row.cust === "limited" ? "~" : "\u2717"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="d2-cta-section">
          <div className="d2-cta-heading">Ready to initialize?</div>
          <div className="d2-cta-sub">Free for teams up to 5. No credit card required.</div>
          <a className="d2-cta-btn" href="#">Deploy WebStar OS &rarr;</a>
        </div>

        {/* FOOTER */}
        <div className="d2-footer">
          <span>&copy; 2025 WebStar::OS</span>
          <span>PID 1 &bull; uptime 99.99%</span>
        </div>
      </div>
    </>
  );
}
