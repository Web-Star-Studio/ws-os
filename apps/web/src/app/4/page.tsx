export const metadata = {
  title: "Web Star OS — Command Your Universe",
};

export default function DesignFour() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Outfit:wght@100;200;300;400;600;700;800&family=Azeret+Mono:wght@300;400;500&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #09090b;
          --surface: #111113;
          --gold: #c9a84c;
          --gold-dim: #8a7234;
          --gold-bright: #e8d48b;
          --text: #e8e6e0;
          --muted: #6b6860;
          --border: #1f1f22;
          --glow-gold: 0 0 60px rgba(201,168,76,0.08);
        }

        body { background: var(--bg); }

        .d4-wrap {
          font-family: 'Outfit', sans-serif;
          color: var(--text);
          background: var(--bg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* FILM GRAIN */
        .d4-grain {
          position: fixed;
          inset: 0;
          opacity: 0.035;
          pointer-events: none;
          z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        /* ── NAV ── */
        .d4-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 4rem;
          position: relative;
          z-index: 10;
        }
        .d4-nav-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: 0.04em;
          color: var(--gold);
        }
        .d4-nav-links {
          display: flex;
          gap: 3rem;
          align-items: center;
        }
        .d4-nav-links a {
          font-size: 0.7rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s;
        }
        .d4-nav-links a:hover { color: var(--gold); }
        .d4-nav-cta {
          font-family: 'Azeret Mono', monospace;
          font-size: 0.6rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--bg) !important;
          background: var(--gold);
          padding: 0.6rem 1.5rem;
          text-decoration: none;
          transition: all 0.3s;
        }
        .d4-nav-cta:hover {
          background: var(--gold-bright);
        }

        /* ── HERO ── */
        .d4-hero {
          padding: 8rem 4rem 6rem;
          text-align: center;
          position: relative;
        }
        .d4-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, var(--gold-dim));
        }
        .d4-hero-overline {
          font-family: 'Azeret Mono', monospace;
          font-size: 0.6rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.45em;
          color: var(--gold);
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }
        .d4-hero-overline::before,
        .d4-hero-overline::after {
          content: '';
          width: 40px;
          height: 1px;
          background: var(--gold-dim);
        }
        .d4-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(3rem, 8vw, 7rem);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 2.5rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .d4-hero-title em {
          font-style: italic;
          color: var(--gold);
        }
        .d4-hero-subtitle {
          font-weight: 200;
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--muted);
          max-width: 550px;
          margin: 0 auto 3.5rem;
        }
        .d4-hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }
        .d4-btn-gold {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          background: var(--gold);
          color: var(--bg);
          border: 1px solid var(--gold);
          padding: 1.1rem 3rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
          box-shadow: var(--glow-gold);
        }
        .d4-btn-gold:hover {
          background: var(--gold-bright);
          box-shadow: 0 0 80px rgba(201,168,76,0.15);
        }
        .d4-btn-ghost {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          background: transparent;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 1.1rem 3rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
        }
        .d4-btn-ghost:hover {
          border-color: var(--gold-dim);
          color: var(--gold);
        }

        /* ── DIVIDER ── */
        .d4-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 3rem 4rem;
        }
        .d4-divider::before,
        .d4-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .d4-divider-diamond {
          width: 8px;
          height: 8px;
          background: var(--gold-dim);
          transform: rotate(45deg);
        }

        /* ── FEATURES ── */
        .d4-features {
          padding: 2rem 4rem 4rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          max-width: 1200px;
          margin: 0 auto;
        }
        .d4-feat-card {
          background: var(--bg);
          padding: 3.5rem;
          text-align: center;
          transition: all 0.4s;
          position: relative;
        }
        .d4-feat-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s;
        }
        .d4-feat-card:hover::after { width: 60%; }
        .d4-feat-card:hover { background: var(--surface); }
        .d4-feat-icon {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          font-size: 3rem;
          color: var(--gold);
          margin-bottom: 1.5rem;
          line-height: 1;
        }
        .d4-feat-title {
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .d4-feat-text {
          font-weight: 200;
          font-size: 0.85rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* ── SHOWCASE ── */
        .d4-showcase {
          padding: 6rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .d4-showcase-text {}
        .d4-showcase-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 0.55rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }
        .d4-showcase-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: 2.8rem;
          line-height: 1.15;
          margin-bottom: 1.5rem;
        }
        .d4-showcase-heading em { color: var(--gold); font-style: italic; }
        .d4-showcase-desc {
          font-weight: 200;
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--muted);
        }
        .d4-showcase-visual {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2.5rem;
          position: relative;
        }
        .d4-showcase-visual::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 2rem;
          right: 2rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
        }
        .d4-role-item {
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .d4-role-item:last-child { border-bottom: none; }
        .d4-role-info {}
        .d4-role-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600;
          font-size: 1.4rem;
          margin-bottom: 0.25rem;
        }
        .d4-role-scope {
          font-size: 0.7rem;
          font-weight: 200;
          color: var(--muted);
        }
        .d4-role-badge {
          font-family: 'Azeret Mono', monospace;
          font-size: 0.55rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--gold);
          border: 1px solid var(--gold-dim);
          padding: 0.35rem 0.9rem;
        }

        /* ── TESTIMONIAL ── */
        .d4-testimonial {
          padding: 6rem 4rem;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .d4-quote-mark {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 5rem;
          color: var(--gold-dim);
          line-height: 0.5;
          margin-bottom: 1.5rem;
        }
        .d4-quote-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          font-size: 1.75rem;
          line-height: 1.55;
          color: var(--text);
          margin-bottom: 2rem;
        }
        .d4-quote-author {
          font-family: 'Azeret Mono', monospace;
          font-size: 0.6rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--gold-dim);
        }

        /* ── CTA ── */
        .d4-cta {
          padding: 8rem 4rem;
          text-align: center;
          position: relative;
        }
        .d4-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, var(--gold-dim));
        }
        .d4-cta-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .d4-cta-heading em { color: var(--gold); font-style: italic; }
        .d4-cta-desc {
          font-weight: 200;
          font-size: 0.95rem;
          color: var(--muted);
          margin-bottom: 3rem;
        }

        /* ── FOOTER ── */
        .d4-footer {
          border-top: 1px solid var(--border);
          padding: 2rem 4rem;
          display: flex;
          justify-content: space-between;
          font-family: 'Azeret Mono', monospace;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          opacity: 0.5;
        }

        @media (max-width: 900px) {
          .d4-features { grid-template-columns: 1fr; }
          .d4-showcase { grid-template-columns: 1fr; gap: 3rem; }
          .d4-nav, .d4-hero, .d4-showcase, .d4-testimonial, .d4-cta, .d4-footer { padding-left: 2rem; padding-right: 2rem; }
        }
      `}</style>

      <div className="d4-wrap">
        <div className="d4-grain"></div>

        {/* NAV */}
        <nav className="d4-nav">
          <div className="d4-nav-logo">Web Star OS</div>
          <div className="d4-nav-links">
            <a href="#features">Features</a>
            <a href="#roles">Roles</a>
            <a href="#testimonial">Reviews</a>
            <a href="#" className="d4-nav-cta">Early Access</a>
          </div>
        </nav>

        {/* HERO */}
        <div className="d4-hero">
          <div className="d4-hero-overline">Project Management</div>
          <h1 className="d4-hero-title">
            Command Your<br /><em>Entire Universe</em>
          </h1>
          <p className="d4-hero-subtitle">
            One system for workspaces, projects, tasks, sprints, and access control.
            Designed for teams that refuse to compromise.
          </p>
          <div className="d4-hero-actions">
            <a className="d4-btn-gold" href="#">Begin Your Trial</a>
            <a className="d4-btn-ghost" href="#">Watch the Film</a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="d4-divider"><div className="d4-divider-diamond"></div></div>

        {/* FEATURES */}
        <div className="d4-features" id="features">
          {[
            { icon: "W", title: "Workspaces", text: "Isolated environments for every team. Independent settings, members, and complete data separation." },
            { icon: "P", title: "Projects", text: "Grouped work with custom workflows and views. Every project generates its own task ID prefix." },
            { icon: "T", title: "Tasks", text: "Auto-identified items with rich content, sub-tasks, relations, and complete activity history." },
            { icon: "C", title: "Cycles", text: "Time-boxed sprints with burndown charts, velocity tracking, and automatic rollover." },
            { icon: "L", title: "Labels", text: "Hierarchical color-coded tags scoped at workspace or project level. Filter everything." },
            { icon: "\u2726", title: "Portal", text: "Customer-facing interface for feedback, tickets, and visibility. Separate from internal tools." },
          ].map((f) => (
            <div key={f.title} className="d4-feat-card">
              <div className="d4-feat-icon">{f.icon}</div>
              <div className="d4-feat-title">{f.title}</div>
              <div className="d4-feat-text">{f.text}</div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="d4-divider"><div className="d4-divider-diamond"></div></div>

        {/* ROLES SHOWCASE */}
        <div className="d4-showcase" id="roles">
          <div className="d4-showcase-text">
            <div className="d4-showcase-label">Access Control</div>
            <h2 className="d4-showcase-heading">
              Three Roles.<br /><em>Absolute Clarity.</em>
            </h2>
            <p className="d4-showcase-desc">
              Every member knows exactly what they can do. Admins govern. Employees build.
              Customers interact through a dedicated portal. No grey areas.
            </p>
          </div>
          <div className="d4-showcase-visual">
            <div className="d4-role-item">
              <div className="d4-role-info">
                <div className="d4-role-name">Admin</div>
                <div className="d4-role-scope">Workspace governance, billing, members</div>
              </div>
              <div className="d4-role-badge">Full Access</div>
            </div>
            <div className="d4-role-item">
              <div className="d4-role-info">
                <div className="d4-role-name">Employee</div>
                <div className="d4-role-scope">Projects, tasks, cycles, labels</div>
              </div>
              <div className="d4-role-badge">Build</div>
            </div>
            <div className="d4-role-item">
              <div className="d4-role-info">
                <div className="d4-role-name">Customer</div>
                <div className="d4-role-scope">Portal, feedback, support tickets</div>
              </div>
              <div className="d4-role-badge">Portal</div>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL */}
        <div className="d4-divider"><div className="d4-divider-diamond"></div></div>
        <div className="d4-testimonial" id="testimonial">
          <div className="d4-quote-mark">&ldquo;</div>
          <p className="d4-quote-text">
            We consolidated three separate tools into Web Star OS overnight.
            The customer portal alone transformed how we handle feedback.
          </p>
          <div className="d4-quote-author">Sarah Chen &mdash; CTO, Modular Systems</div>
        </div>

        {/* CTA */}
        <div className="d4-divider"><div className="d4-divider-diamond"></div></div>
        <div className="d4-cta">
          <h2 className="d4-cta-heading">
            Your Team Deserves<br /><em>Better Tools</em>
          </h2>
          <p className="d4-cta-desc">Free for teams up to five. No credit card. Setup in minutes.</p>
          <a className="d4-btn-gold" href="#">Start Your Free Trial &rarr;</a>
        </div>

        {/* FOOTER */}
        <div className="d4-footer">
          <span>&copy; 2025 Web Star OS</span>
          <span>Crafted with intention</span>
        </div>
      </div>
    </>
  );
}
