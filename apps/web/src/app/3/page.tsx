export const metadata = {
  title: "Web Star OS — Índice",
};

export default function DesignThree() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;700;900&family=JetBrains+Mono:wght@300;400;500&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}

        :root {
          --bg: #f7f6f3;
          --fg: #1a1a1a;
          --dim: #8a8a8a;
          --rule: #d4d0c8;
          --accent: #b42318;
          --mono: 'JetBrains Mono', monospace;
          --sans: 'Libre Franklin', sans-serif;
        }

        body { background: var(--bg); }

        .ix {
          font-family: var(--sans);
          color: var(--fg);
          background: var(--bg);
          min-height: 100vh;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 3rem;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .ix-nav {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 2.5rem 0 2rem;
          border-bottom: 2px solid var(--fg);
          position: sticky; top: 0; z-index: 10; background: var(--bg);
        }
        .ix-logo {
          font-family: var(--mono); font-size: 0.7rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .ix-links { display: flex; gap: 2rem; }
        .ix-links a {
          font-family: var(--mono); font-size: 0.65rem; font-weight: 300;
          color: var(--dim); text-decoration: none; letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .ix-links a:hover { color: var(--fg); }

        /* ── HERO ── */
        .ix-hero {
          padding: 5rem 0 4rem;
          border-bottom: 1px solid var(--rule);
        }
        .ix-hero-row {
          display: grid; grid-template-columns: 200px 1fr; gap: 2rem;
          align-items: start;
        }
        .ix-hero-label {
          font-family: var(--mono); font-size: 0.6rem; font-weight: 400;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--dim);
          padding-top: 0.6rem;
        }
        .ix-hero h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .ix-hero-body {
          font-size: 0.9rem; line-height: 1.7; color: #555;
          font-weight: 300; max-width: 480px; margin-bottom: 2.5rem;
        }
        .ix-hero-cta {
          font-family: var(--mono); font-size: 0.65rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--bg); background: var(--fg);
          padding: 0.85rem 2rem; text-decoration: none;
          display: inline-block; transition: background 0.2s;
        }
        .ix-hero-cta:hover { background: var(--accent); }

        /* ── METRICS ROW ── */
        .ix-metrics {
          display: grid; grid-template-columns: 200px repeat(3, 1fr);
          gap: 2rem; padding: 2.5rem 0;
          border-bottom: 1px solid var(--rule);
          align-items: baseline;
        }
        .ix-metrics-label {
          font-family: var(--mono); font-size: 0.6rem; font-weight: 400;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--dim);
        }
        .ix-m {}
        .ix-m-val {
          font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }
        .ix-m-val span { color: var(--accent); }
        .ix-m-label {
          font-family: var(--mono); font-size: 0.55rem;
          color: var(--dim); letter-spacing: 0.02em;
        }

        /* ── FEATURES ── */
        .ix-features { padding: 3rem 0; }
        .ix-feat-row {
          display: grid; grid-template-columns: 200px 180px 1fr;
          gap: 2rem; padding: 1.25rem 0;
          border-bottom: 1px solid var(--rule);
          align-items: baseline;
        }
        .ix-feat-row:first-child {
          border-top: 1px solid var(--rule);
        }
        .ix-feat-idx {
          font-family: var(--mono); font-size: 0.6rem; color: var(--dim);
        }
        .ix-feat-idx:first-child .ix-feat-section-label {
          display: block;
        }
        .ix-feat-name {
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.01em;
        }
        .ix-feat-desc {
          font-size: 0.8rem; font-weight: 300; line-height: 1.55; color: var(--dim);
        }
        .ix-section-head {
          display: grid; grid-template-columns: 200px 1fr;
          gap: 2rem; padding: 0 0 1.5rem;
        }
        .ix-section-label {
          font-family: var(--mono); font-size: 0.6rem; font-weight: 400;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--dim);
        }
        .ix-section-title {
          font-size: 1.1rem; font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        /* ── ROLES ── */
        .ix-roles { padding: 3rem 0; }
        .ix-role-row {
          display: grid; grid-template-columns: 200px 140px 1fr 1fr;
          gap: 2rem; padding: 1.5rem 0;
          border-bottom: 1px solid var(--rule);
          align-items: start;
        }
        .ix-role-row:first-child { border-top: 1px solid var(--rule); }
        .ix-role-idx {
          font-family: var(--mono); font-size: 0.6rem; color: var(--dim);
        }
        .ix-role-title {
          font-size: 0.85rem; font-weight: 700;
        }
        .ix-role-tag {
          font-family: var(--mono); font-size: 0.5rem;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--accent); display: block; margin-top: 0.3rem;
        }
        .ix-role-text {
          font-size: 0.8rem; font-weight: 300; line-height: 1.55; color: var(--dim);
        }
        .ix-role-perms {
          font-family: var(--mono); font-size: 0.55rem;
          color: var(--dim); line-height: 2;
        }
        .ix-perm-dash { color: var(--accent); margin-right: 0.4rem; }

        /* ── CTA ── */
        .ix-cta {
          padding: 5rem 0;
          border-top: 2px solid var(--fg);
        }
        .ix-cta-row {
          display: grid; grid-template-columns: 200px 1fr; gap: 2rem;
          align-items: start;
        }
        .ix-cta h2 {
          font-size: 1.8rem; font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.15; margin-bottom: 1rem;
        }
        .ix-cta-sub {
          font-size: 0.8rem; color: var(--dim); font-weight: 300;
          margin-bottom: 2rem;
        }

        /* ── FOOTER ── */
        .ix-footer {
          padding: 2rem 0; display: flex; justify-content: space-between;
          border-top: 2px solid var(--fg);
          font-family: var(--mono); font-size: 0.55rem;
          letter-spacing: 0.05em; color: var(--dim);
        }

        @media (max-width: 768px) {
          .ix { padding: 0 1.5rem; }
          .ix-hero-row, .ix-metrics, .ix-section-head, .ix-cta-row {
            grid-template-columns: 1fr;
          }
          .ix-feat-row { grid-template-columns: 3rem 1fr; }
          .ix-feat-desc { grid-column: 2; }
          .ix-role-row { grid-template-columns: 1fr; }
          .ix-hero { padding: 3rem 0 2.5rem; }
        }
      `}</style>

      <div className="ix">
        <nav className="ix-nav">
          <div className="ix-logo">Web Star OS</div>
          <div className="ix-links">
            <a href="#features">Recursos</a>
            <a href="#roles">Perfis</a>
            <a href="#pricing">Preços</a>
            <a href="#docs">Docs</a>
          </div>
        </nav>

        <div className="ix-hero">
          <div className="ix-hero-row">
            <div className="ix-hero-label">Sobre</div>
            <div>
              <h1>Entregue projetos<br />com precisão absoluta.</h1>
              <div className="ix-hero-body">
                Um sistema unificado para workspaces, projetos, tarefas, ciclos e labels.
                Controle de acesso baseado em perfis mantém seu time focado e seus clientes informados.
              </div>
              <a className="ix-hero-cta" href="#">Comece Agora</a>
            </div>
          </div>
        </div>

        <div className="ix-metrics">
          <div className="ix-metrics-label">Números</div>
          <div className="ix-m">
            <div className="ix-m-val"><span>+</span>38%</div>
            <div className="ix-m-label">Melhoria por sprint</div>
          </div>
          <div className="ix-m">
            <div className="ix-m-val">2.4<span>M</span></div>
            <div className="ix-m-label">Tarefas gerenciadas</div>
          </div>
          <div className="ix-m">
            <div className="ix-m-val">06</div>
            <div className="ix-m-label">Módulos principais</div>
          </div>
        </div>

        <div className="ix-features" id="features">
          <div className="ix-section-head">
            <div className="ix-section-label">Recursos</div>
            <div className="ix-section-title">06 Módulos Principais</div>
          </div>
          {[
            { num: "01", name: "Workspaces", desc: "Ambientes isolados para cada equipe. Configurações, membros, cobrança e separação completa de dados." },
            { num: "02", name: "Projetos", desc: "Agrupamentos lógicos com workflows e visualizações personalizadas. Prefixos de ID gerados automaticamente por projeto." },
            { num: "03", name: "Tarefas", desc: "IDs automáticos (WS-001), markdown rico, sub-tarefas, relações bidirecionais e histórico completo de atividades." },
            { num: "04", name: "Ciclos", desc: "Sprints com prazo definido, gráficos de burndown, rastreamento de velocidade e rollover automático de trabalho pendente." },
            { num: "05", name: "Labels", desc: "Tags hierárquicas com cores por workspace ou projeto. Filtragem instantânea entre projetos." },
            { num: "06", name: "Portal do Cliente", desc: "Interface externa para feedback, tickets de suporte e visibilidade de projetos. Separado das ferramentas internas." },
          ].map((f) => (
            <div key={f.num} className="ix-feat-row">
              <div className="ix-feat-idx">{f.num}</div>
              <div className="ix-feat-name">{f.name}</div>
              <div className="ix-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="ix-roles" id="roles">
          <div className="ix-section-head">
            <div className="ix-section-label">Perfis</div>
            <div className="ix-section-title">Três Perfis de Acesso</div>
          </div>
          {[
            { idx: "A", tag: "Controle Total", title: "Admin", text: "Governança do workspace, cobrança, gestão de membros e autoridade operacional completa.", perms: ["Config. do workspace", "Gestão de membros", "Cobrança e faturas", "Todas as operações"] },
            { idx: "E", tag: "Construa & Entregue", title: "Funcionário", text: "Acesso completo ao projeto — crie tarefas, gerencie ciclos, aplique labels e entregue.", perms: ["Criar e editar tarefas", "Gerenciar ciclos", "Aplicar labels", "Visualizações de projeto"] },
            { idx: "C", tag: "Acesso ao Portal", title: "Cliente", text: "Portal dedicado para feedback, tickets de suporte e atualizações de projetos.", perms: ["Enviar feedback", "Acompanhar tickets", "Ver atualizações", "Painel do portal"] },
          ].map((r) => (
            <div key={r.idx} className="ix-role-row">
              <div className="ix-role-idx">{r.idx}</div>
              <div>
                <div className="ix-role-title">{r.title}</div>
                <span className="ix-role-tag">{r.tag}</span>
              </div>
              <div className="ix-role-text">{r.text}</div>
              <div className="ix-role-perms">
                {r.perms.map((p) => (
                  <div key={p}><span className="ix-perm-dash">&mdash;</span>{p}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ix-cta">
          <div className="ix-cta-row">
            <div className="ix-section-label">Começar</div>
            <div>
              <h2>Comece a construir hoje.</h2>
              <div className="ix-cta-sub">Grátis para equipes de até 5 — sem cartão de crédito</div>
              <a className="ix-hero-cta" href="#">Comece Agora &rarr;</a>
            </div>
          </div>
        </div>

        <div className="ix-footer">
          <span>&copy; 2025 Web Star OS</span>
          <span>Projetado com precisão máxima</span>
        </div>
      </div>
    </>
  );
}
