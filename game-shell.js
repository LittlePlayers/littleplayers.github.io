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
      .lp-wide-fab,
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
        top: max(12px, env(safe-area-inset-top));
        border-radius: 999px;
        padding: 0 16px;
        cursor: pointer;
      }
      .lp-wide-fab {
        right: max(12px, env(safe-area-inset-right));
        bottom: max(14px, env(safe-area-inset-bottom));
        border-radius: 999px;
        padding: 0 16px;
        cursor: pointer;
      }
      .lp-journey-panel {
        left: max(12px, env(safe-area-inset-left));
        top: calc(max(12px, env(safe-area-inset-top)) + 52px);
        width: min(360px, calc(100vw - 24px));
        max-height: min(72vh, 620px);
        overflow: auto;
        display: none;
        align-items: stretch;
        justify-content: stretch;
        border-radius: 18px;
        padding: 14px;
      }
      .lp-journey-panel.open { display: block; }
      .lp-journey-title { margin: 0 0 4px; font: 900 18px/1.15 "Plus Jakarta Sans", system-ui, sans-serif; }
      .lp-journey-copy { margin: 0 0 12px; color: var(--lp-shell-muted); font: 750 13px/1.45 system-ui, sans-serif; }
      .lp-how-card {
        display: grid;
        gap: 8px;
        margin: 10px 0 12px;
        padding: 12px;
        border-radius: 14px;
        border: 1px solid var(--lp-shell-border);
        background: var(--lp-shell-surface-2);
      }
      .lp-how-card h3 {
        margin: 0;
        color: var(--lp-shell-ink);
        font: 900 14px/1.15 "Plus Jakarta Sans", system-ui, sans-serif;
      }
      .lp-how-card p {
        margin: 0;
        color: var(--lp-shell-muted);
        font: 750 12.5px/1.45 system-ui, sans-serif;
      }
      .lp-how-card b { color: var(--lp-shell-ink); }
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
      .lp-wide-fab:hover,
      .lp-journey-link:hover {
        border-color: color-mix(in srgb, var(--lp-shell-accent) 48%, var(--lp-shell-border));
        transform: translateY(-1px);
      }
      .lp-shell-toggle:focus-visible,
      .lp-home-fab:focus-visible,
      .lp-journey-fab:focus-visible,
      .lp-wide-fab:focus-visible,
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
      .back { display: none !important; }
      body.lp-wide-mode {
        min-height: 100vh;
        overflow-x: hidden;
      }
      body.lp-wide-mode canvas {
        width: min(100%, calc((100vh - 138px) * 2.15)) !important;
        max-width: calc(100vw - 18px) !important;
        max-height: calc(100vh - 138px) !important;
        height: auto !important;
        object-fit: contain;
      }
      .frame:fullscreen,
      .stage:fullscreen,
      .game:fullscreen,
      canvas:fullscreen {
        width: 100vw !important;
        height: 100vh !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        border-radius: 0 !important;
        background: var(--lp-shell-bg) !important;
        display: grid !important;
        place-items: center !important;
        padding: clamp(8px, 2vw, 18px) !important;
      }
      .frame:fullscreen canvas,
      .stage:fullscreen canvas,
      .game:fullscreen canvas,
      canvas:fullscreen {
        width: min(100vw, calc(100vh * 2.35)) !important;
        max-width: 100vw !important;
        max-height: 100vh !important;
        height: auto !important;
        object-fit: contain;
      }
      [data-theme="dark"] body {
        background: linear-gradient(135deg, #0f1117, #151824 54%, #10151a) !important;
        color: var(--lp-shell-ink) !important;
      }
      [data-theme="dark"] .lp-shell-toggle,
      [data-theme="dark"] .lp-home-fab,
      [data-theme="dark"] .lp-journey-fab,
      [data-theme="dark"] .lp-wide-fab,
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
        .lp-wide-fab { min-width: 44px; height: 44px; padding: 0 12px; font-size: 0; }
        .lp-shell-toggle::before,
        .lp-home-fab::before,
        .lp-journey-fab::before,
        .lp-wide-fab::before { font-size: 16px; line-height: 1; }
        .lp-shell-toggle[aria-pressed="true"]::before { content: "☀️"; }
        .lp-shell-toggle[aria-pressed="false"]::before { content: "🌙"; }
        .lp-home-fab::before { content: "🏠"; }
        .lp-journey-fab::before { content: "🧭"; }
        .lp-wide-fab::before { content: "↔"; }
      }
      @media (orientation: landscape) and (max-height: 560px) {
        .lp-shell-toggle,
        .lp-home-fab,
        .lp-journey-fab,
        .lp-wide-fab {
          min-height: 36px;
          box-shadow: 0 6px 18px rgba(31, 23, 71, .16);
        }
        .lp-home-fab { top: calc(max(8px, env(safe-area-inset-top)) + 42px); }
        .lp-shell-toggle { top: max(8px, env(safe-area-inset-top)); }
        .lp-journey-fab { top: max(8px, env(safe-area-inset-top)); }
        .lp-journey-panel { top: calc(max(8px, env(safe-area-inset-top)) + 44px); }
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
      home.textContent = "🏠 Game hub";
      home.setAttribute("aria-label", "Back to game hub");
      document.body.appendChild(home);
    }
    if (!onHome && !document.querySelector(".lp-journey-fab")) addJourney();
    if (!onHome && !document.querySelector(".lp-wide-fab")) addWideMode();
  }

  function gameSlug() {
    return location.pathname.split("/").filter(Boolean).pop() || "";
  }

  function absoluteGameUrl(slug) {
    return new URL(`../${slug}/`, location.href).href;
  }

  const HOW_TO = {
    "market-day": ["Add the basket total, choose coins and notes, then give the exact change.", "Tap money buttons to add or remove value. Use the checkout button when your change matches.", "Start with the largest money value, then finish with smaller coins."],
    "budget-hero": ["Buy the needed items while staying inside the budget.", "Tap items to add them to your basket and watch the remaining money.", "Needs come first. Wants are only safe when money is left."],
    "cross-the-road": ["Cross only when the road is safe.", "Use the on-screen controls or swipe to move. Wait for green and check traffic before crossing.", "Rushing costs lives; patient moves score better."],
    "healthy-plate": ["Build a balanced meal from the right food groups.", "Tap or drag foods into the plate, then check your meal.", "Mix colors and groups instead of filling the plate with one food type."],
    "hanuman-run": ["Run as far as you can while avoiding obstacles.", "Tap jump, duck, or use the visible controls. In wide mode the playfield has more room.", "Look ahead, then move early."],
    "krishnas-cows": ["Guide every cow safely home before time runs out.", "Use the on-screen D-pad and flute controls to move and herd.", "Bring scattered cows together before heading home."],
    "arjunas-aim": ["Set angle and power to hit the target.", "Adjust sliders, read wind, then tap shoot.", "Small changes matter. Use your last shot as a clue."],
    "word-scramble": ["Unscramble the letters before the timer ends.", "Tap letters into the answer slots, then submit or clear.", "Look for common starts, endings and short vowel patterns."],
    "spelling-bee": ["Listen to the word and spell it correctly.", "Tap letters or type if a keyboard is available. Use repeat and hint when stuck.", "Sound out the word before choosing letters."],
    "brain-quest": ["Answer quick puzzles and learning challenges.", "Tap the answer that best matches the question.", "Read the full question; some rounds reward careful thinking."],
    "math-blast": ["Solve math rounds quickly and accurately.", "Tap the answer or use the on-screen number options.", "Accuracy beats speed when the clock is tight."],
    "maze-runner": ["Reach the flag before time runs out.", "Swipe or use on-screen arrows to move through the maze.", "Trace a route with your eyes before moving."],
    "spirograph": ["Tune the gears to draw spiral art.", "Move sliders and buttons to change the pattern, then save your favorite result.", "Try one control at a time so you can see what changed."],
    "doodle-pad": ["Create your own drawing with brushes, colors and stamps.", "Tap tools, choose a color, then draw directly on the canvas.", "Use bigger strokes first, then decorate with small details."],
    "kaleidoscope-draw": ["Draw mirrored patterns that repeat around the center.", "Choose a color, then drag on the canvas to make symmetrical art.", "Slow curves create the cleanest shapes."],
    "animal-band": ["Make a tiny song with animal sounds.", "Tap animals to play sounds, record a pattern, then play it back.", "Repeat a simple beat first, then add extra taps."],
    "dress-up": ["Create a character with outfits and accessories.", "Tap clothing, hair and accessory options to swap the look.", "Pick one theme, then tune colors and details."],
    "rhythm-garden": ["Listen, remember and repeat musical patterns through the full song journey.", "Tap the garden pads in the same order you hear them.", "Count the beat in your head before tapping back."],
    "bubble-pop-calm": ["Pop soft bubbles and grow a calm soundscape.", "Tap bubbles freely, switch sound textures and use Breathe whenever you want.", "There is no fail state and no tap limit."],
    "pendulum-painter": ["Explore pendulum motion and turn swings into art.", "Adjust length, arc and rhythm controls, then watch the painter move.", "Longer swings feel slower; shorter swings change direction faster."],
    "nonogram": ["Use number clues to reveal the hidden picture.", "Tap cells to fill or mark them, then compare each row and column with its clues.", "Solve the rows with the biggest clue numbers first."],
    "code-breaker": ["Crack the secret color code using feedback clues.", "Tap colors into a guess, submit it, then use the clue dots to improve.", "Change one or two colors at a time so clues stay readable."],
    "logic-bot": ["Program the robot to collect stars and reach the goal.", "Tap command buttons to build a path, then run it.", "Use loops when you see repeated moves."],
    "cipher-school": ["Find the shift that decodes the secret message.", "Turn the dial or use controls until the message becomes readable.", "Common short words are good clues."],
    "circuit-logic": ["Make the bulb match the target output.", "Tap switches and gates, then press check.", "Test one input at a time to understand the gate."],
    "rocket-launch-lab": ["Launch and land across changing gravity worlds.", "Adjust angle, thrust and fuel, then tap launch.", "Use smooth middle power before trying dramatic launches."],
    "catapult-castle": ["Land soft practice shots on the target.", "Set force, angle and mass, then fire.", "Higher angle gives arc; more force sends the shot farther."],
    "marble-maze-makers": ["Build a path that guides the marble to the goal.", "Place ramps, gates and bumpers, then run the marble test.", "If the marble gets stuck, fix one obstacle at a time."],
    "world-quiz": ["Answer geography questions about flags, capitals and continents.", "Tap the answer choice before moving to the next round.", "Use elimination when two answers look close."],
    "star-map-navigator": ["Fly by coordinates and compass directions to collect stars.", "Tap direction controls and coordinate choices to move around the map.", "Check both axis directions before committing a move."],
    "treasure-weigh-in": ["Find the treasure with the odd weight using the balance scale.", "Tap treasures, choose left pan or right pan, compare, then guess the odd one.", "Balance groups first, then narrow down the suspect."],
    "mirror-maze": ["Rotate mirrors to guide the beam into the crystal.", "Tap mirrors to flip them and watch the light path update.", "Work backward from the crystal when the beam misses."],
    "color-chemistry": ["Mix drops to match the target potion color.", "Tap color drops, tint and shade controls, then compare with the target.", "Add small amounts near the end for a cleaner match."],
    "mini-architect": ["Build a stable tower with smart supports.", "Tap materials and place pieces, then test the structure.", "Wide bases and triangles make stronger builds."]
  };

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function howToFor(slug, current) {
    const custom = HOW_TO[slug];
    if (custom) return custom;
    return [
      current.description || "Play through the challenge and complete the goal.",
      "Use the on-screen buttons, taps, swipes or sliders shown in the game.",
      "Try again after each round and use what changed as your clue."
    ];
  }

  function hasPageInstructions(panel) {
    const ownedByShell = ".lp-journey-panel, .lp-journey-fab, .lp-home-fab, .lp-wide-fab, .lp-shell-toggle";
    const headings = Array.from(document.body.querySelectorAll("h1, h2, h3, h4, b, strong, summary, [aria-label]"))
      .filter((node) => !node.closest(ownedByShell))
      .map((node) => `${node.getAttribute("aria-label") || ""} ${node.textContent || ""}`)
      .join(" ");
    if (/\b(how to play|instructions?|rules?|controls?|tips?|guide)\b/i.test(headings)) return true;

    const instructionBlocks = Array.from(document.body.querySelectorAll(
      "aside, details, [data-how-to], .how-to, .instructions, .rules, .help, .hint, .tip, .tips, .guide, .tutorial, .explainer, .note"
    ))
      .filter((node) => node !== panel && !panel.contains(node) && !node.closest(ownedByShell))
      .map((node) => `${node.getAttribute("aria-label") || ""} ${node.textContent || ""}`)
      .join(" ");
    return /\b(tap|swipe|drag|press|choose|match|solve|collect|avoid|use|goal|tip|hint|rules?|controls?)\b/i.test(instructionBlocks);
  }

  function addJourney() {
    const fallback = [
      ["market-day","Market Day"],["budget-hero","Budget Hero"],["cross-the-road","Cross the Road Smart"],["healthy-plate","Healthy Plate"],
      ["hanuman-run","Hanuman Run"],["krishnas-cows","Krishna's Cows"],["arjunas-aim","Arjuna's Aim"],["word-scramble","Word Scramble"],
      ["spelling-bee","Spelling Bee"],["brain-quest","Brain Quest"],["math-blast","Math Blast"],["maze-runner","Maze Runner"],
      ["spirograph","Spirograph"],["doodle-pad","Doodle Pad"],["kaleidoscope-draw","Kaleidoscope Draw"],["animal-band","Animal Band"],
      ["dress-up","Dress Up"],["rhythm-garden","Rhythm Garden"],["bubble-pop-calm","Bubble Pop Calm"],["nonogram","Nonogram"],["code-breaker","Code Breaker"],
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
    let journeyGames = fallback;
    const refreshJourney = () => renderJourney(panel, journeyGames, slug, seen);
    const syncNativeInstructions = () => {
      if (hasPageInstructions(panel)) {
        const card = panel.querySelector(".lp-how-card");
        if (card) card.remove();
      }
    };
    const observer = new MutationObserver(syncNativeInstructions);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    renderJourney(panel, fallback, slug, seen);
    window.setTimeout(() => { refreshJourney(); syncNativeInstructions(); }, 0);
    window.setTimeout(() => { refreshJourney(); syncNativeInstructions(); }, 300);
    window.setTimeout(syncNativeInstructions, 900);
    fetch("../games.json")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data && Array.isArray(data.games)) {
          journeyGames = data.games;
          refreshJourney();
        }
      })
      .catch(() => {});
  }

  function renderJourney(panel, games, slug, seen) {
    const idx = Math.max(0, games.findIndex((g) => g.slug === slug));
    const current = games[idx] || { title: document.title.replace(" - Little Players", ""), slug };
    const next = games[(idx + 1) % games.length] || current;
    const prev = games[(idx - 1 + games.length) % games.length] || current;
    const pct = games.length ? Math.round((new Set(seen).size / games.length) * 100) : 0;
    const howTo = howToFor(slug, current);
    const howCard = hasPageInstructions(panel) ? "" : `<section class="lp-how-card" aria-label="How to play"><h3>How to play</h3><p><b>Goal:</b> ${escapeHTML(howTo[0])}</p><p><b>Controls:</b> ${escapeHTML(howTo[1])}</p><p><b>Tip:</b> ${escapeHTML(howTo[2])}</p></section>`;
    panel.innerHTML = `<p class="lp-journey-title">${escapeHTML(current.title)}</p><p class="lp-journey-copy">Journey progress: ${new Set(seen).size}/${games.length} games explored.</p>${howCard}<div class="lp-journey-progress" style="--lp-progress:${pct}%"><span></span></div><div class="lp-journey-actions"><a class="lp-journey-link" href="${absoluteGameUrl(prev.slug)}">Previous</a><a class="lp-journey-link" href="${absoluteGameUrl(next.slug)}">Next game</a><a class="lp-journey-link" href="../">Game hub</a><a class="lp-journey-link" href="${absoluteGameUrl(slug)}">Restart</a></div>`;
  }

  function addWideMode() {
    const canvas = Array.from(document.querySelectorAll("canvas")).find((item) => {
      const name = `${item.id || ""} ${item.className || ""}`;
      const style = getComputedStyle(item);
      const box = item.getBoundingClientRect();
      return !/(confetti|particle|spark|fx)/i.test(name)
        && style.position !== "fixed"
        && box.width >= 120
        && box.height >= 100;
    });
    if (!canvas) return;
    const isWideGame = (canvas.width || canvas.clientWidth || 0) >= (canvas.height || canvas.clientHeight || 0);
    if (!isWideGame) return;
    const btn = document.createElement("button");
    btn.className = "lp-wide-fab";
    btn.type = "button";
    btn.textContent = "↔ Widescreen";
    btn.setAttribute("aria-label", "Toggle widescreen playfield");
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => toggleWideMode(btn));
    document.body.appendChild(btn);
    document.addEventListener("fullscreenchange", () => {
      const active = Boolean(document.fullscreenElement) || document.body.classList.contains("lp-wide-mode");
      updateWideButton(btn, active);
    });
  }

  async function toggleWideMode(btn) {
    const active = document.body.classList.toggle("lp-wide-mode");
    updateWideButton(btn, active);
    const target = document.querySelector(".frame, .stage, .game, canvas");
    try {
      if (active && target && target.requestFullscreen && !document.fullscreenElement) await target.requestFullscreen();
      if (!active && document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
    } catch {}
    window.dispatchEvent(new Event("resize"));
  }

  function updateWideButton(btn, active) {
    btn.textContent = active ? "↙ Exit wide" : "↔ Widescreen";
    btn.setAttribute("aria-pressed", String(active));
    btn.setAttribute("title", active ? "Exit widescreen playfield" : "Open a larger playfield");
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
