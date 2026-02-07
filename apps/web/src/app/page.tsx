export const metadata = {
  title: "Web Star OS — Precisão Máxima",
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
              <a href="#features">Recursos</a>
              <a href="#roles">Perfis</a>
              <a href="#pricing">Preços</a>
              <a href="#docs">Docs</a>
            </nav>
          </div>

          {/* HERO — GIANT TYPE */}
          <div className="lp-hero">
            <div>
              <div className="lp-hero-tag">Sistema de Gerenciamento de Projetos / 2025</div>
              <h1 className="lp-hero-mega">
                <span className="lp-thin">Entregue</span><br />
                <span className="lp-outline">Com</span><br />
                <span className="lp-red-fill">Força</span>
              </h1>
            </div>
            <div className="lp-hero-bottom">
              <div className="lp-hero-col">
                <div className="lp-hero-col-label">Sobre</div>
                <div className="lp-hero-col-text">
                  Um sistema unificado para workspaces, projetos, tarefas, ciclos e labels.
                  Controle de acesso baseado em perfis mantém seu time focado e seus clientes informados.
                </div>
                <div className="lp-hero-cta-row">
                  <a className="lp-btn-primary" href="#">Comece Agora</a>
                  <a className="lp-btn-outline" href="#">Docs</a>
                </div>
              </div>
              <div className="lp-hero-col">
                <div className="lp-hero-col-label">Ganho de Velocidade</div>
                <div className="lp-hero-col-stat"><span className="lp-r">+</span>38%</div>
                <div className="lp-hero-col-stat-note">melhoria média por sprint</div>
              </div>
              <div className="lp-hero-col">
                <div className="lp-hero-col-label">Tarefas Gerenciadas</div>
                <div className="lp-hero-col-stat">2.4<span className="lp-r">M</span></div>
                <div className="lp-hero-col-stat-note">com identificadores auto-gerados</div>
              </div>
            </div>
          </div>

          {/* MARQUEE */}
          <div className="lp-marquee">
            <div className="lp-marquee-inner">
              {[1,2].map((i) => (
                <span key={i}>
                  <span className="lp-marquee-text">Workspaces</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Projetos</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Tarefas</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Ciclos</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">Labels</span><span className="lp-marquee-dot">&bull;</span>
                  <span className="lp-marquee-text">RBAC</span><span className="lp-marquee-dot">&bull;</span>
                </span>
              ))}
            </div>
          </div>

          {/* FEATURES */}
          <div className="lp-features" id="features">
            <div className="lp-features-header">
              <div className="lp-section-title">Recursos</div>
              <div className="lp-section-count">06 Módulos Principais</div>
            </div>
            <div className="lp-feat-grid">
              {[
                { num: "01", name: "Workspaces", desc: "Ambientes isolados para cada equipe. Configurações, membros, cobrança e separação completa de dados." },
                { num: "02", name: "Projetos", desc: "Agrupamentos lógicos com workflows e visualizações personalizadas. Prefixos de ID gerados automaticamente por projeto." },
                { num: "03", name: "Tarefas", desc: "IDs automáticos (WS-001), markdown rico, sub-tarefas, relações bidirecionais e histórico completo de atividades." },
                { num: "04", name: "Ciclos", desc: "Sprints com prazo definido, gráficos de burndown, rastreamento de velocidade e rollover automático de trabalho pendente." },
                { num: "05", name: "Labels", desc: "Tags hierárquicas com cores por workspace ou projeto. Filtragem instantânea entre projetos." },
                { num: "06", name: "Portal do Cliente", desc: "Interface externa para feedback, tickets de suporte e visibilidade de projetos. Separado das ferramentas internas." },
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
              <div className="lp-section-title">Três Perfis</div>
            </div>
            <div className="lp-roles-strip">
              {[
                { letter: "A", tag: "Controle Total", title: "Admin", text: "Governança do workspace, cobrança, gestão de membros e autoridade operacional completa.", perms: ["Config. do workspace", "Gestão de membros", "Cobrança e faturas", "Todas as operações"] },
                { letter: "E", tag: "Construa & Entregue", title: "Funcionário", text: "Acesso completo ao projeto — crie tarefas, gerencie ciclos, aplique labels e entregue.", perms: ["Criar e editar tarefas", "Gerenciar ciclos", "Aplicar labels", "Visualizações de projeto"] },
                { letter: "C", tag: "Acesso ao Portal", title: "Cliente", text: "Portal dedicado para feedback, tickets de suporte e atualizações de projetos.", perms: ["Enviar feedback", "Acompanhar tickets", "Ver atualizações", "Painel do portal"] },
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
              Comece<br />
              <span className="lp-thin">A Construir</span><br />
              <span className="lp-outline">Hoje</span>
            </h2>
            <div className="lp-cta-sub">Grátis para equipes de até 5 &mdash; sem cartão de crédito</div>
            <a className="lp-btn-primary" href="#">Comece Agora &rarr;</a>
          </div>

          <div className="lp-footer">
            <span>&copy; 2025 Web Star OS</span>
            <span>Projetado com precisão máxima</span>
          </div>
        </div>
      </div>
    </>
  );
}
