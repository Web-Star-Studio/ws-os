export const metadata = {
  title: "Web Star OS — Câmara Escura",
};

export default function DesignTwo() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #0c0c0c;
          --fg: #e8e8e8;
          --dim: #5a5a5a;
          --faint: #1a1a1a;
          --accent: #c0392b;
          --rule: #222;
        }

        body { background: var(--bg); }

        .dk {
          font-family: 'Outfit', sans-serif;
          color: var(--fg);
          background: var(--bg);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .dk-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 2rem 4rem;
          border-bottom: 1px solid var(--rule);
          position: sticky; top: 0; z-index: 10; background: var(--bg);
        }
        .dk-logo {
          font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--fg);
        }
        .dk-logo-dot { color: var(--accent); }
        .dk-links { display: flex; gap: 2.5rem; }
        .dk-links a {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; font-weight: 400; color: var(--dim);
          text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;
          transition: color 0.25s;
        }
        .dk-links a:hover { color: var(--fg); }

        /* ── HERO ── */
        .dk-hero {
          padding: 10rem 4rem 8rem;
          border-bottom: 1px solid var(--rule);
        }
        .dk-hero-pre {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem;
          text-transform: uppercase; letter-spacing: 0.35em; color: var(--dim);
          margin-bottom: 3rem;
          display: flex; align-items: center; gap: 1rem;
        }
        .dk-hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
        }
        .dk-hero h1 {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 200;
          line-height: 1.2;
          letter-spacing: -0.02em;
          max-width: 700px;
          margin-bottom: 3rem;
        }
        .dk-hero h1 strong {
          font-weight: 700;
        }
        .dk-hero-desc {
          font-size: 1.05rem; line-height: 1.75; color: var(--dim);
          max-width: 480px; font-weight: 300;
          margin-bottom: 3.5rem;
        }
        .dk-hero-actions { display: flex; gap: 1rem; align-items: center; }
        .dk-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 0.9rem 2.2rem; text-decoration: none;
          transition: all 0.25s; cursor: pointer;
          border: 1px solid;
        }
        .dk-btn-fill {
          background: var(--fg); color: var(--bg); border-color: var(--fg);
        }
        .dk-btn-fill:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
        .dk-btn-ghost {
          background: transparent; color: var(--dim); border-color: var(--rule);
        }
        .dk-btn-ghost:hover { color: var(--fg); border-color: var(--dim); }

        /* ── METRICS ── */
        .dk-metrics {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid var(--rule);
        }
        .dk-metric {
          padding: 3.5rem 4rem;
          border-right: 1px solid var(--rule);
        }
        .dk-metric:last-child { border-right: none; }
        .dk-metric-val {
          font-size: 2.5rem; font-weight: 700; letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }
        .dk-metric-val span { color: var(--accent); }
        .dk-metric-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem;
          text-transform: uppercase; letter-spacing: 0.2em; color: var(--dim);
        }

        /* ── FEATURES ── */
        .dk-features {
          padding: 6rem 4rem;
          border-bottom: 1px solid var(--rule);
        }
        .dk-sec-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem;
          text-transform: uppercase; letter-spacing: 0.3em; color: var(--dim);
          margin-bottom: 4rem;
          display: flex; align-items: center; gap: 1rem;
        }
        .dk-sec-line { flex: 1; height: 1px; background: var(--rule); }
        .dk-feat-list {}
        .dk-feat-row {
          display: grid; grid-template-columns: 4rem 180px 1fr;
          gap: 1.5rem; padding: 1.75rem 0;
          border-bottom: 1px solid var(--faint);
          align-items: baseline;
        }
        .dk-feat-row:first-child { border-top: 1px solid var(--faint); }
        .dk-feat-idx {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem;
          color: var(--dim);
        }
        .dk-feat-name {
          font-size: 1.05rem; font-weight: 600; letter-spacing: 0.01em;
        }
        .dk-feat-desc {
          font-size: 0.9rem; font-weight: 300; line-height: 1.6; color: var(--dim);
        }

        /* ── ROLES ── */
        .dk-roles {
          padding: 6rem 4rem;
          border-bottom: 1px solid var(--rule);
        }
        .dk-roles-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
        }
        .dk-role {
          padding: 2.5rem;
          border: 1px solid var(--rule);
          display: flex; flex-direction: column; gap: 1.5rem;
        }
        .dk-role-head {
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .dk-role-title {
          font-size: 1.25rem; font-weight: 600;
        }
        .dk-role-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent);
        }
        .dk-role-text {
          font-size: 0.9rem; font-weight: 300; line-height: 1.65; color: var(--dim);
        }
        .dk-role-perms {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem;
          color: var(--dim); line-height: 2.2;
        }
        .dk-perm-dot {
          display: inline-block; width: 4px; height: 4px; border-radius: 50%;
          background: var(--accent); margin-right: 0.6rem;
          vertical-align: middle;
        }

        /* ── CTA ── */
        .dk-cta {
          padding: 8rem 4rem;
          border-bottom: 1px solid var(--rule);
        }
        .dk-cta h2 {
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 200; letter-spacing: -0.02em;
          margin-bottom: 1rem; line-height: 1.2;
        }
        .dk-cta h2 strong { font-weight: 700; }
        .dk-cta-sub {
          font-size: 0.9rem; color: var(--dim); font-weight: 300;
          margin-bottom: 3rem;
        }

        /* ── FOOTER ── */
        .dk-footer {
          padding: 2rem 4rem; display: flex; justify-content: space-between;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem;
          text-transform: uppercase; letter-spacing: 0.12em; color: var(--dim);
        }

        @media (max-width: 768px) {
          .dk-nav, .dk-hero, .dk-features, .dk-roles, .dk-cta, .dk-footer {
            padding-left: 2rem; padding-right: 2rem;
          }
          .dk-hero { padding-top: 6rem; padding-bottom: 5rem; }
          .dk-metrics { grid-template-columns: 1fr; }
          .dk-metric { border-right: none; border-bottom: 1px solid var(--rule); padding: 2.5rem 2rem; }
          .dk-metric:last-child { border-bottom: none; }
          .dk-feat-row { grid-template-columns: 3rem 1fr; }
          .dk-feat-desc { grid-column: 2; }
          .dk-roles-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dk">
        <nav className="dk-nav">
          <div className="dk-logo">Web Star<span className="dk-logo-dot"> .</span> OS</div>
          <div className="dk-links">
            <a href="#features">Recursos</a>
            <a href="#roles">Perfis</a>
            <a href="#pricing">Preços</a>
            <a href="#docs">Docs</a>
          </div>
        </nav>

        <div className="dk-hero">
          <div className="dk-hero-pre">
            <span className="dk-hero-dot"></span>
            Sistema de Gerenciamento de Projetos
          </div>
          <h1>
            Entregue com <strong>precisão.</strong><br />
            Construa com <strong>clareza.</strong>
          </h1>
          <div className="dk-hero-desc">
            Um sistema unificado para workspaces, projetos, tarefas, ciclos e labels.
            Controle de acesso baseado em perfis mantém seu time focado e seus clientes informados.
          </div>
          <div className="dk-hero-actions">
            <a className="dk-btn dk-btn-fill" href="#">Comece Agora</a>
            <a className="dk-btn dk-btn-ghost" href="#">Docs</a>
          </div>
        </div>

        <div className="dk-metrics">
          <div className="dk-metric">
            <div className="dk-metric-val"><span>+</span>38%</div>
            <div className="dk-metric-label">Melhoria média por sprint</div>
          </div>
          <div className="dk-metric">
            <div className="dk-metric-val">2.4<span>M</span></div>
            <div className="dk-metric-label">Tarefas gerenciadas</div>
          </div>
          <div className="dk-metric">
            <div className="dk-metric-val">06</div>
            <div className="dk-metric-label">Módulos principais</div>
          </div>
        </div>

        <div className="dk-features" id="features">
          <div className="dk-sec-label">
            Recursos
            <span className="dk-sec-line"></span>
            06
          </div>
          <div className="dk-feat-list">
            {[
              { num: "01", name: "Workspaces", desc: "Ambientes isolados para cada equipe. Configurações, membros, cobrança e separação completa de dados." },
              { num: "02", name: "Projetos", desc: "Agrupamentos lógicos com workflows e visualizações personalizadas. Prefixos de ID gerados automaticamente por projeto." },
              { num: "03", name: "Tarefas", desc: "IDs automáticos (WS-001), markdown rico, sub-tarefas, relações bidirecionais e histórico completo de atividades." },
              { num: "04", name: "Ciclos", desc: "Sprints com prazo definido, gráficos de burndown, rastreamento de velocidade e rollover automático de trabalho pendente." },
              { num: "05", name: "Labels", desc: "Tags hierárquicas com cores por workspace ou projeto. Filtragem instantânea entre projetos." },
              { num: "06", name: "Portal do Cliente", desc: "Interface externa para feedback, tickets de suporte e visibilidade de projetos. Separado das ferramentas internas." },
            ].map((f) => (
              <div key={f.num} className="dk-feat-row">
                <div className="dk-feat-idx">{f.num}</div>
                <div className="dk-feat-name">{f.name}</div>
                <div className="dk-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dk-roles" id="roles">
          <div className="dk-sec-label">
            Três Perfis
            <span className="dk-sec-line"></span>
          </div>
          <div className="dk-roles-grid">
            {[
              { tag: "Controle Total", title: "Admin", text: "Governança do workspace, cobrança, gestão de membros e autoridade operacional completa.", perms: ["Config. do workspace", "Gestão de membros", "Cobrança e faturas", "Todas as operações"] },
              { tag: "Construa & Entregue", title: "Funcionário", text: "Acesso completo ao projeto — crie tarefas, gerencie ciclos, aplique labels e entregue.", perms: ["Criar e editar tarefas", "Gerenciar ciclos", "Aplicar labels", "Visualizações de projeto"] },
              { tag: "Acesso ao Portal", title: "Cliente", text: "Portal dedicado para feedback, tickets de suporte e atualizações de projetos.", perms: ["Enviar feedback", "Acompanhar tickets", "Ver atualizações", "Painel do portal"] },
            ].map((r) => (
              <div key={r.title} className="dk-role">
                <div className="dk-role-head">
                  <div className="dk-role-title">{r.title}</div>
                  <div className="dk-role-tag">{r.tag}</div>
                </div>
                <div className="dk-role-text">{r.text}</div>
                <div className="dk-role-perms">
                  {r.perms.map((p) => (
                    <div key={p}><span className="dk-perm-dot"></span>{p}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dk-cta">
          <h2>Comece a <strong>construir</strong> hoje.</h2>
          <div className="dk-cta-sub">Grátis para equipes de até 5 — sem cartão de crédito</div>
          <a className="dk-btn dk-btn-fill" href="#">Comece Agora &rarr;</a>
        </div>

        <div className="dk-footer">
          <span>&copy; 2025 Web Star OS</span>
          <span>Projetado com precisão máxima</span>
        </div>
      </div>
    </>
  );
}
