export const metadata = {
  title: "Web Star OS — Redução",
};

export default function DesignOne() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Geist+Mono:wght@300;400&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #fff;
          --fg: #0a0a0a;
          --red: #d42b1e;
          --mid: #999;
          --rule: #e0e0e0;
        }

        body { background: var(--bg); }

        .r {
          font-family: 'Instrument Sans', 'Helvetica Neue', Helvetica, sans-serif;
          color: var(--fg);
          background: var(--bg);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .r-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 2rem 4rem;
          position: sticky; top: 0; z-index: 10; background: var(--bg);
        }
        .r-logo {
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .r-links { display: flex; gap: 2.5rem; }
        .r-links a {
          font-size: 0.75rem; font-weight: 500; color: var(--mid);
          text-decoration: none; text-transform: uppercase; letter-spacing: 0.08em;
          transition: color 0.2s;
        }
        .r-links a:hover { color: var(--fg); }

        /* ── RED RULE — the single decorative element ── */
        .r-rule {
          height: 3px; background: var(--red); margin: 0 4rem;
        }

        /* ── HERO ── */
        .r-hero {
          padding: 8rem 4rem 6rem;
          max-width: 720px;
        }
        .r-hero-label {
          font-family: 'Geist Mono', monospace; font-size: 0.65rem;
          text-transform: uppercase; letter-spacing: 0.3em; color: var(--mid);
          margin-bottom: 3rem;
        }
        .r-hero h1 {
          font-size: clamp(2.8rem, 5.5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin-bottom: 2.5rem;
        }
        .r-hero p {
          font-size: 1.05rem; line-height: 1.7; font-weight: 400;
          color: #555; max-width: 480px; margin-bottom: 3rem;
        }
        .r-hero-cta {
          display: inline-block; font-size: 0.75rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--bg); background: var(--fg);
          padding: 1rem 2.5rem; text-decoration: none;
          transition: background 0.2s;
        }
        .r-hero-cta:hover { background: var(--red); }

        /* ── STATS ── */
        .r-stats {
          display: flex; gap: 0; padding: 0 4rem;
          border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
        }
        .r-stat {
          flex: 1; padding: 3rem 0;
          border-right: 1px solid var(--rule);
        }
        .r-stat:last-child { border-right: none; }
        .r-stat-num {
          font-size: 2.5rem; font-weight: 700; letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }
        .r-stat-num span { color: var(--red); }
        .r-stat-label {
          font-family: 'Geist Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.2em; color: var(--mid);
        }
        .r-stat:nth-child(2), .r-stat:nth-child(3) { padding-left: 3rem; }

        /* ── FEATURES ── */
        .r-features { padding: 6rem 4rem; }
        .r-section-label {
          font-family: 'Geist Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.25em; color: var(--mid);
          margin-bottom: 4rem;
        }
        .r-feat-list { list-style: none; }
        .r-feat-item {
          display: grid; grid-template-columns: 3rem 1fr;
          gap: 2rem; padding: 2rem 0;
          border-bottom: 1px solid var(--rule);
          align-items: baseline;
        }
        .r-feat-item:first-child { border-top: 1px solid var(--rule); }
        .r-feat-num {
          font-family: 'Geist Mono', monospace; font-size: 0.65rem;
          color: var(--mid); padding-top: 0.15rem;
        }
        .r-feat-content {}
        .r-feat-name {
          font-size: 1.05rem; font-weight: 600; margin-bottom: 0.5rem;
        }
        .r-feat-desc {
          font-size: 0.85rem; line-height: 1.65; color: #666;
          max-width: 520px;
        }

        /* ── ROLES ── */
        .r-roles { padding: 6rem 4rem; }
        .r-roles-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem;
        }
        .r-role {}
        .r-role-tag {
          font-family: 'Geist Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.2em; color: var(--red);
          margin-bottom: 1rem;
        }
        .r-role-title {
          font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem;
        }
        .r-role-text {
          font-size: 0.85rem; line-height: 1.65; color: #666; margin-bottom: 1.25rem;
        }
        .r-role-perms {
          font-family: 'Geist Mono', monospace; font-size: 0.6rem;
          color: var(--mid); line-height: 2;
        }
        .r-check { color: var(--red); margin-right: 0.4rem; }

        /* ── CTA ── */
        .r-cta {
          padding: 8rem 4rem;
          border-top: 1px solid var(--rule);
        }
        .r-cta h2 {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700; letter-spacing: -0.03em;
          margin-bottom: 1.5rem; line-height: 1.1;
        }
        .r-cta-sub {
          font-size: 0.9rem; color: var(--mid); margin-bottom: 2.5rem;
        }

        /* ── FOOTER ── */
        .r-footer {
          padding: 2rem 4rem; display: flex; justify-content: space-between;
          border-top: 1px solid var(--rule);
          font-family: 'Geist Mono', monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.12em; color: var(--mid);
        }

        @media (max-width: 768px) {
          .r-nav, .r-hero, .r-stats, .r-features, .r-roles, .r-cta, .r-footer {
            padding-left: 2rem; padding-right: 2rem;
          }
          .r-hero { padding-top: 5rem; padding-bottom: 4rem; }
          .r-roles-grid { grid-template-columns: 1fr; gap: 3rem; }
          .r-stats { flex-direction: column; }
          .r-stat { border-right: none; border-bottom: 1px solid var(--rule); padding-left: 0 !important; }
          .r-stat:last-child { border-bottom: none; }
          .r-rule { margin: 0 2rem; }
        }
      `}</style>

      <div className="r">
        <nav className="r-nav">
          <div className="r-logo">Web Star OS</div>
          <div className="r-links">
            <a href="#features">Recursos</a>
            <a href="#roles">Perfis</a>
            <a href="#pricing">Preços</a>
            <a href="#docs">Docs</a>
          </div>
        </nav>

        <div className="r-rule"></div>

        <div className="r-hero">
          <div className="r-hero-label">Sistema de Gerenciamento de Projetos</div>
          <h1>Entregue projetos com precisão absoluta.</h1>
          <p>
            Um sistema unificado para workspaces, projetos, tarefas, ciclos e labels.
            Controle de acesso baseado em perfis mantém seu time focado e seus clientes informados.
          </p>
          <a className="r-hero-cta" href="#">Comece Agora</a>
        </div>

        <div className="r-stats">
          <div className="r-stat">
            <div className="r-stat-num"><span>+</span>38%</div>
            <div className="r-stat-label">Melhoria média por sprint</div>
          </div>
          <div className="r-stat">
            <div className="r-stat-num">2.4<span>M</span></div>
            <div className="r-stat-label">Tarefas gerenciadas</div>
          </div>
          <div className="r-stat">
            <div className="r-stat-num">06</div>
            <div className="r-stat-label">Módulos principais</div>
          </div>
        </div>

        <div className="r-features" id="features">
          <div className="r-section-label">Recursos — 06 Módulos</div>
          <ul className="r-feat-list">
            {[
              { num: "01", name: "Workspaces", desc: "Ambientes isolados para cada equipe. Configurações, membros, cobrança e separação completa de dados." },
              { num: "02", name: "Projetos", desc: "Agrupamentos lógicos com workflows e visualizações personalizadas. Prefixos de ID gerados automaticamente por projeto." },
              { num: "03", name: "Tarefas", desc: "IDs automáticos (WS-001), markdown rico, sub-tarefas, relações bidirecionais e histórico completo de atividades." },
              { num: "04", name: "Ciclos", desc: "Sprints com prazo definido, gráficos de burndown, rastreamento de velocidade e rollover automático de trabalho pendente." },
              { num: "05", name: "Labels", desc: "Tags hierárquicas com cores por workspace ou projeto. Filtragem instantânea entre projetos." },
              { num: "06", name: "Portal do Cliente", desc: "Interface externa para feedback, tickets de suporte e visibilidade de projetos. Separado das ferramentas internas." },
            ].map((f) => (
              <li key={f.num} className="r-feat-item">
                <div className="r-feat-num">{f.num}</div>
                <div className="r-feat-content">
                  <div className="r-feat-name">{f.name}</div>
                  <div className="r-feat-desc">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="r-roles" id="roles">
          <div className="r-section-label">Três Perfis</div>
          <div className="r-roles-grid">
            {[
              { tag: "Controle Total", title: "Admin", text: "Governança do workspace, cobrança, gestão de membros e autoridade operacional completa.", perms: ["Config. do workspace", "Gestão de membros", "Cobrança e faturas", "Todas as operações"] },
              { tag: "Construa & Entregue", title: "Funcionário", text: "Acesso completo ao projeto — crie tarefas, gerencie ciclos, aplique labels e entregue.", perms: ["Criar e editar tarefas", "Gerenciar ciclos", "Aplicar labels", "Visualizações de projeto"] },
              { tag: "Acesso ao Portal", title: "Cliente", text: "Portal dedicado para feedback, tickets de suporte e atualizações de projetos.", perms: ["Enviar feedback", "Acompanhar tickets", "Ver atualizações", "Painel do portal"] },
            ].map((r) => (
              <div key={r.title} className="r-role">
                <div className="r-role-tag">{r.tag}</div>
                <div className="r-role-title">{r.title}</div>
                <div className="r-role-text">{r.text}</div>
                <div className="r-role-perms">
                  {r.perms.map((p) => (
                    <div key={p}><span className="r-check">&check;</span>{p}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="r-cta">
          <h2>Comece a construir hoje.</h2>
          <div className="r-cta-sub">Grátis para equipes de até 5 — sem cartão de crédito</div>
          <a className="r-hero-cta" href="#">Comece Agora &rarr;</a>
        </div>

        <div className="r-footer">
          <span>&copy; 2025 Web Star OS</span>
          <span>Projetado com precisão máxima</span>
        </div>
      </div>
    </>
  );
}
