(() => {
  const STORE_KEY = "lp_theme";
  const root = document.documentElement;
  const savedTheme = () => {
    try { return localStorage.getItem(STORE_KEY); }
    catch { return null; }
  };
  const saveTheme = (theme) => {
    try { localStorage.setItem(STORE_KEY, theme); }
    catch {}
  };
  const prefersDark = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function injectStyles() {
    if (document.getElementById("lp-game-shell-style")) return;
    const style = document.createElement("style");
    style.id = "lp-game-shell-style";
    style.textContent = `
      :root {
        color-scheme: light;
        --lp-shell-bg: #fbf8ff;
        --lp-shell-surface: #ffffff;
        --lp-shell-surface-2: #f7f7fc;
        --lp-shell-ink: #24164f;
        --lp-shell-muted: #625988;
        --lp-shell-border: rgba(31, 23, 71, .12);
        --lp-shell-accent: #6c5ce7;
        --lp-shell-focus: #f59e0b;
      }
      [data-theme="dark"] {
        color-scheme: dark;
        --lp-shell-bg: #0f1117;
        --lp-shell-surface: #1a1d2a;
        --lp-shell-surface-2: #232737;
        --lp-shell-ink: #f7f4ff;
        --lp-shell-muted: #c3bed7;
        --lp-shell-border: rgba(226, 232, 240, .14);
        --lp-shell-accent: #a99cff;
        --lp-shell-focus: #fbbf24;
      }
      .lp-shell-toggle,
      .lp-home-fab,
      .lp-journey-fab,
      .lp-journey-panel {
        position: fixed;
        z-index: 1000;
        border: 1px solid var(--lp-shell-border);
        background: color-mix(in srgb, var(--lp-shell-surface) 92%, transparent);
        color: var(--lp-shell-ink);
        box-shadow: 0 8px 24px rgba(31, 23, 71, .14);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        font: 800 14px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        text-decoration: none;
        min-height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
      }
      .lp-shell-toggle,
      .lp-home-fab {
        right: max(12px, env(safe-area-inset-right));
        border-radius: 999px;
      }
      .lp-shell-toggle { top: max(12px, env(safe-area-inset-top)); padding: 0 14px; cursor: pointer; }
      .lp-home-fab { top: calc(max(12px, env(safe-area-inset-top)) + 48px); padding: 0 15px; }
      .lp-journey-fab {
        left: max(12px, env(safe-area-inset-left));
        bottom: max(14px, env(safe-area-inset-bottom));
        border-radius: 999px;
        padding: 0 16px;
        cursor: pointer;
      }
      .lp-journey-panel {
        left: max(12px, env(safe-area-inset-left));
        bottom: calc(max(14px, env(safe-area-inset-bottom)) + 52px);
        width: min(360px, calc(100vw - 24px));
        display: none;
        align-items: stretch;
        justify-content: stretch;
        border-radius: 18px;
        padding: 14px;
      }
      .lp-journey-panel.open { display: block; }
      .lp-journey-title { margin: 0 0 4px; font: 900 18px/1.15 "Plus Jakarta Sans", system-ui, sans-serif; }
      .lp-journey-copy { margin: 0 0 12px; color: var(--lp-shell-muted); font: 750 13px/1.45 system-ui, sans-serif; }
      .lp-journey-progress { height: 9px; border-radius: 999px; background: var(--lp-shell-surface-2); overflow: hidden; border: 1px solid var(--lp-shell-border); margin: 8px 0 12px; }
      .lp-journey-progress span { display: block; height: 100%; width: var(--lp-progress, 0%); background: linear-gradient(90deg, #14b8a6, #f59e0b, #ec4899); border-radius: inherit; }
      .lp-journey-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .lp-journey-link {
        min-height: 38px;
        border-radius: 12px;
        border: 1px solid var(--lp-shell-border);
        background: var(--lp-shell-surface-2);
        color: var(--lp-shell-ink);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font: 900 13px/1 system-ui, sans-serif;
      }
      .lp-shell-toggle:hover,
      .lp-home-fab:hover,
      .lp-journey-fab:hover,
      .lp-journey-link:hover {
        border-color: color-mix(in srgb, var(--lp-shell-accent) 48%, var(--lp-shell-border));
        transform: translateY(-1px);
      }
      .lp-shell-toggle:focus-visible,
      .lp-home-fab:focus-visible,
      .lp-journey-fab:focus-visible,
      .lp-journey-link:focus-visible,
      button:focus-visible,
      a:focus-visible,
      input:focus-visible,
      select:focus-visible,
      textarea:focus-visible {
        outline: 3px solid var(--lp-shell-focus) !important;
        outline-offset: 3px !important;
      }
      button, a, input, select, textarea { -webkit-tap-highlight-color: transparent; }
      [data-theme="dark"] body {
        background: linear-gradient(135deg, #0f1117, #151824 54%, #10151a) !important;
        color: var(--lp-shell-ink) !important;
      }
      [data-theme="dark"] .lp-shell-toggle,
      [data-theme="dark"] .lp-home-fab,
      [data-theme="dark"] .lp-journey-fab,
      [data-theme="dark"] .lp-journey-panel {
        background: color-mix(in srgb, var(--lp-shell-surface) 92%, transparent);
        color: var(--lp-shell-ink);
        border-color: color-mix(in srgb, var(--lp-shell-accent) 36%, var(--lp-shell-border));
        box-shadow: 0 10px 28px rgba(0, 0, 0, .34);
      }
      [data-theme="dark"] header,
      [data-theme="dark"] main,
      [data-theme="dark"] .game,
      [data-theme="dark"] .panel,
      [data-theme="dark"] .card,
      [data-theme="dark"] .controls,
      [data-theme="dark"] .scoreboard,
      [data-theme="dark"] .stage,
      [data-theme="dark"] .wrap,
      [data-theme="dark"] .box,
      [data-theme="dark"] .board,
      [data-theme="dark"] .hud,
      [data-theme="dark"] .toolbar,
      [data-theme="dark"] .tools,
      [data-theme="dark"] .needs,
      [data-theme="dark"] .app,
      [data-theme="dark"] .screen,
      [data-theme="dark"] .modal,
      [data-theme="dark"] .lab-card,
      [data-theme="dark"] .lab-shell,
      [data-theme="dark"] .frame,
      [data-theme="dark"] .overlay .panel {
        background-color: var(--lp-shell-surface) !important;
        color: var(--lp-shell-ink) !important;
        border-color: var(--lp-shell-border) !important;
      }
      [data-theme="dark"] .pill,
      [data-theme="dark"] .tag,
      [data-theme="dark"] .diff,
      [data-theme="dark"] .diffbar,
      [data-theme="dark"] .bar,
      [data-theme="dark"] .hint,
      [data-theme="dark"] .help,
      [data-theme="dark"] .stat,
      [data-theme="dark"] .lab-stat,
      [data-theme="dark"] .lab-msg,
      [data-theme="dark"] .explainer,
      [data-theme="dark"] .cart,
      [data-theme="dark"] .need,
      [data-theme="dark"] .clue,
      [data-theme="dark"] .guess,
      [data-theme="dark"] .levels {
        background-color: var(--lp-shell-surface-2) !important;
        color: var(--lp-shell-ink) !important;
        border-color: var(--lp-shell-border) !important;
      }
      [data-theme="dark"] p,
      [data-theme="dark"] .sub,
      [data-theme="dark"] .note,
      [data-theme="dark"] small,
      [data-theme="dark"] label {
        color: var(--lp-shell-muted) !important;
      }
      [data-theme="dark"] input,
      [data-theme="dark"] select,
      [data-theme="dark"] textarea {
        background: var(--lp-shell-surface-2) !important;
        color: var(--lp-shell-ink) !important;
        border-color: var(--lp-shell-border) !important;
      }
      [data-theme="dark"] .answer:not(.correct):not(.wrong),
      [data-theme="dark"] .ans:not(.correct):not(.wrong),
      [data-theme="dark"] .tile:not(.used),
      [data-theme="dark"] .slot:not(.filled),
      [data-theme="dark"] .item:not(.incart),
      [data-theme="dark"] .food,
      [data-theme="dark"] .section,
      [data-theme="dark"] .key,
      [data-theme="dark"] .denom,
      [data-theme="dark"] .cat,
      [data-theme="dark"] .level,
      [data-theme="dark"] .cmdbtn,
      [data-theme="dark"] .lab-cell,
      [data-theme="dark"] .lab-swatch,
      [data-theme="dark"] .material,
      [data-theme="dark"] .row,
      [data-theme="dark"] .play:not(.fill) {
        background-color: var(--lp-shell-surface-2) !important;
        color: var(--lp-shell-ink) !important;
        border-color: var(--lp-shell-border) !important;
      }
      [data-theme="dark"] canvas,
      [data-theme="dark"] svg {
        border-color: var(--lp-shell-border) !important;
      }
      [data-theme="dark"] .correct,
      [data-theme="dark"] .good {
        color: #86efac !important;
      }
      [data-theme="dark"] .wrong,
      [data-theme="dark"] .bad {
        color: #fda4af !important;
      }
      @media (max-width: 560px) {
        .lp-shell-toggle { min-width: 40px; width: 40px; padding: 0; font-size: 0; }
        .lp-home-fab { min-width: 40px; width: 40px; padding: 0; font-size: 0; }
        .lp-journey-fab { min-width: 44px; height: 44px; padding: 0 12px; font-size: 0; }
        .lp-shell-toggle::before,
        .lp-home-fab::before,
        .lp-journey-fab::before { font-size: 16px; line-height: 1; }
        .lp-shell-toggle[aria-pressed="true"]::before { content: "☀️"; }
        .lp-shell-toggle[aria-pressed="false"]::before { content: "🌙"; }
        .lp-home-fab::before { content: "🏠"; }
        .lp-journey-fab::before { content: "🧭"; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: .01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setTheme(theme) {
    const dark = theme === "dark";
    root.toggleAttribute("data-theme", dark);
    if (dark) root.setAttribute("data-theme", "dark");
    const toggle = document.querySelector(".lp-shell-toggle");
    if (toggle) {
      toggle.textContent = dark ? "☀️ Light" : "🌙 Dark";
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0f1123" : (meta.dataset.lightColor || meta.content || "#7c5cff"));
  }

  function addControls() {
    if (!document.querySelector(".lp-shell-toggle")) {
      const btn = document.createElement("button");
      btn.className = "lp-shell-toggle";
      btn.type = "button";
      btn.setAttribute("aria-label", "Toggle dark mode");
      btn.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        saveTheme(next);
        setTheme(next);
      });
      document.body.appendChild(btn);
    }
    const onHome = location.pathname === "/" || /\/index\.html$/i.test(location.pathname) && location.pathname.split("/").length <= 2;
    if (!onHome && !document.querySelector(".lp-home-fab")) {
      const home = document.createElement("a");
      home.className = "lp-home-fab";
      home.href = "../";
      home.textContent = "🏠 Home";
      home.setAttribute("aria-label", "Back to Little Players home");
      document.body.appendChild(home);
    }
    if (!onHome && !document.querySelector(".lp-journey-fab")) addJourney();
  }

  function gameSlug() {
    return location.pathname.split("/").filter(Boolean).pop() || "";
  }

  function absoluteGameUrl(slug) {
    return new URL(`../${slug}/`, location.href).href;
  }

  function addJourney() {
    const fallback = [
      ["market-day","Market Day"],["budget-hero","Budget Hero"],["cross-the-road","Cross the Road Smart"],["healthy-plate","Healthy Plate"],
      ["hanuman-run","Hanuman Run"],["krishnas-cows","Krishna's Cows"],["arjunas-aim","Arjuna's Aim"],["word-scramble","Word Scramble"],
      ["spelling-bee","Spelling Bee"],["brain-quest","Brain Quest"],["math-blast","Math Blast"],["maze-runner","Maze Runner"],
      ["spirograph","Spirograph"],["doodle-pad","Doodle Pad"],["kaleidoscope-draw","Kaleidoscope Draw"],["animal-band","Animal Band"],
      ["dress-up","Dress Up"],["rhythm-garden","Rhythm Garden"],["nonogram","Nonogram"],["code-breaker","Code Breaker"],
      ["logic-bot","Logic Bot"],["cipher-school","Cipher School"],["circuit-logic","Circuit Logic"],["rocket-launch-lab","Rocket Launch Lab"],
      ["pendulum-painter","Pendulum Painter"],["mini-architect","Mini Architect"],["catapult-castle","Catapult Castle"],["marble-maze-makers","Marble Maze Makers"],["world-quiz","World Quiz"],
      ["star-map-navigator","Star Map Navigator"],["treasure-weigh-in","Treasure Weigh-In"],["mirror-maze","Mirror Maze"],["color-chemistry","Color Chemistry"]
    ].map(([slug,title]) => ({ slug, title }));
    const slug = gameSlug();
    const visitedKey = "lp_journey_seen";
    let seen = [];
    try { seen = JSON.parse(localStorage.getItem(visitedKey) || "[]"); } catch {}
    if (slug && !seen.includes(slug)) {
      seen.push(slug);
      try { localStorage.setItem(visitedKey, JSON.stringify(seen)); } catch {}
    }
    const panel = document.createElement("section");
    panel.className = "lp-journey-panel";
    panel.setAttribute("aria-live", "polite");
    const fab = document.createElement("button");
    fab.className = "lp-journey-fab";
    fab.type = "button";
    fab.textContent = "🧭 Journey";
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", "Open game journey");
    fab.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      fab.setAttribute("aria-expanded", String(open));
    });
    document.body.append(panel, fab);
    renderJourney(panel, fallback, slug, seen);
    fetch("../games.json")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data && Array.isArray(data.games)) renderJourney(panel, data.games, slug, seen);
      })
      .catch(() => {});
  }

  function renderJourney(panel, games, slug, seen) {
    const idx = Math.max(0, games.findIndex((g) => g.slug === slug));
    const current = games[idx] || { title: document.title.replace(" - Little Players", ""), slug };
    const next = games[(idx + 1) % games.length] || current;
    const prev = games[(idx - 1 + games.length) % games.length] || current;
    const pct = games.length ? Math.round((new Set(seen).size / games.length) * 100) : 0;
    panel.innerHTML = `<p class="lp-journey-title">${current.title}</p><p class="lp-journey-copy">Journey progress: ${new Set(seen).size}/${games.length} games explored.</p><div class="lp-journey-progress" style="--lp-progress:${pct}%"><span></span></div><div class="lp-journey-actions"><a class="lp-journey-link" href="${absoluteGameUrl(prev.slug)}">Previous</a><a class="lp-journey-link" href="${absoluteGameUrl(next.slug)}">Next game</a><a class="lp-journey-link" href="../">Game hub</a><a class="lp-journey-link" href="${absoluteGameUrl(slug)}">Restart</a></div>`;
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && !meta.dataset.lightColor) meta.dataset.lightColor = meta.content;
  const initial = savedTheme() || (prefersDark() ? "dark" : "light");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      injectStyles();
      addControls();
      setTheme(initial);
    });
  } else {
    injectStyles();
    addControls();
    setTheme(initial);
  }
})();
