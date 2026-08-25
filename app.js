// Little Players homepage logic.
// Loads games.json ({ categories, games }), renders category filters and cards,
// and remembers favorites in localStorage.

const STORE = { favs: "lp_favorites" };
const FEATURED_SLUGS = [
  "hanuman-run",
  "rhythm-garden",
  "bubble-pop-calm",
  "rocket-launch-lab",
  "treasure-weigh-in",
  "color-chemistry",
];
const DEFAULT_LIBRARY_LIMIT = 12;

// ---- localStorage helpers ----
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch {}
}

const state = {
  categories: [],
  games: [],
  categoryLabels: new Map(),
  categoryOrder: new Map(),
  favs: new Set(load(STORE.favs, [])),
  activeCategory: "all",
  favOnly: false,
  query: "",
  expanded: false,
};

const els = {
  categoryFilters: document.getElementById("categoryFilters"),
  sections: document.getElementById("sections"),
  featuredRail: document.getElementById("featuredRail"),
  featuredTitle: document.getElementById("featuredTitle"),
  featuredSummary: document.getElementById("featuredSummary"),
  categoryOverview: document.getElementById("categoryOverview"),
  bottomCategoryNav: document.getElementById("bottomCategoryNav"),
  totalGamesStat: document.getElementById("totalGamesStat"),
  libraryTitle: document.getElementById("libraryTitle"),
  showAllBtn: document.getElementById("showAllBtn"),
  emptyMsg: document.getElementById("emptyMsg"),
  resultsSummary: document.getElementById("resultsSummary"),
  favOnly: document.getElementById("favOnly"),
  searchInput: document.getElementById("searchInput"),
  searchClear: document.getElementById("searchClear"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
};

function isFav(slug) {
  return state.favs.has(slug);
}

function toggleFav(slug) {
  if (state.favs.has(slug)) state.favs.delete(slug);
  else state.favs.add(slug);
  save(STORE.favs, [...state.favs]);
}

function categoryShortLabel(category) {
  const labels = {
    "life-skills": "Skills",
    mythology: "Story",
    words: "Words",
    brain: "Brain",
    creativity: "Create",
    logic: "Logic",
    stem: "STEM",
    explore: "Explore",
  };
  return labels[category.id] || category.label;
}

// ---- helpers ----
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function gameHref(game) {
  return game.slug ? `${game.slug}/` : game.url;
}

function matchesFilters(game) {
  const favOK = !state.favOnly || isFav(game.slug);
  const q = state.query.trim().toLowerCase();
  const queryOK = !q || game.searchText.includes(q);
  return favOK && queryOK;
}

// ---- rendering ----
function hexToRgba(hex, alpha) {
  let c = String(hex).replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  if (!/^[0-9a-f]{6}$/i.test(c)) c = "6c5ce7";
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

function cardHTML(game, index, extraClass = "") {
  const fav = isFav(game.slug);
  const color = game.color || "#6c5ce7";
  const glow = hexToRgba(color, 0.35);
  const slug = escapeAttr(game.slug);
  const category = state.categoryLabels.get(game.category) || game.category;

  return `
    <a class="card ${escapeAttr(extraClass)}" href="${escapeAttr(gameHref(game))}" data-slug="${slug}"
       style="--card-color:${escapeAttr(color)}; --card-color-glow:${escapeAttr(glow)}; --card-index:${index};">
      <button class="fav-btn ${fav ? "active" : ""}" data-fav="${slug}" title="Favorite"
              aria-label="${fav ? "Remove from favorites" : "Add to favorites"}">${fav ? "&#11088;" : "&#9734;"}</button>
      <span class="icon">${game.icon ? escapeHtml(game.icon) : "&#127918;"}</span>
      <h3>${escapeHtml(game.title)}</h3>
      <p>${escapeHtml(game.description)}</p>
      <div class="meta">
        <span class="tag">${escapeHtml(category)}</span>
        <span class="play-chip" aria-hidden="true">Play</span>
      </div>
    </a>`;
}

function renderCategories() {
  const chips = [{ id: "all", label: "All", icon: "&#127752;" }, ...state.categories];
  const chipHtml = chips
    .map((c) => {
      const icon = c.icon === "&#127752;" ? c.icon : escapeHtml(c.icon || "");
      const active = c.id === state.activeCategory;
      return `<button class="chip ${c.id === state.activeCategory ? "active" : ""}"
                 data-cat="${escapeAttr(c.id)}"
                 aria-pressed="${String(active)}">${icon} ${escapeHtml(c.label)}</button>`;
    })
    .join("");
  els.categoryFilters.innerHTML = chipHtml;
  if (els.bottomCategoryNav) {
    els.bottomCategoryNav.innerHTML = chips
      .map((c) => {
        const icon = c.icon === "&#127752;" ? c.icon : escapeHtml(c.icon || "");
        const label = c.id === "all" ? "All" : categoryShortLabel(c);
        const active = c.id === state.activeCategory;
        return `<button class="tab-btn ${active ? "active" : ""}" data-cat="${escapeAttr(c.id)}"
                  aria-pressed="${String(active)}"><span>${icon}</span><b>${escapeHtml(label)}</b></button>`;
      })
      .join("");
  }
}

function visibleGames() {
  return state.games
    .filter(
      (g) =>
        (state.activeCategory === "all" || g.category === state.activeCategory) &&
        matchesFilters(g)
    )
    .sort((a, b) => (state.categoryOrder.get(a.category) ?? 99) - (state.categoryOrder.get(b.category) ?? 99));
}

function renderGrid() {
  const games = visibleGames();
  const activeLabel = state.activeCategory === "all"
    ? "All games"
    : state.categoryLabels.get(state.activeCategory) || state.activeCategory;
  const condensed = !state.expanded && !state.query.trim() && !state.favOnly;
  const shown = condensed ? games.slice(0, DEFAULT_LIBRARY_LIMIT) : games;
  els.sections.innerHTML = games.length
    ? `<div class="grid">${shown.map((game, index) => cardHTML(game, index)).join("")}</div>`
    : "";
  els.emptyMsg.classList.toggle("hidden", games.length > 0);
  if (els.libraryTitle) els.libraryTitle.textContent = activeLabel;
  els.resultsSummary.textContent = condensed && shown.length < games.length
    ? `Showing ${shown.length} of ${games.length} games`
    : `${games.length} ${games.length === 1 ? "game" : "games"}`;
  els.searchClear.classList.toggle("hidden", !state.query.trim());
  if (els.showAllBtn) {
    els.showAllBtn.classList.toggle("hidden", !condensed || shown.length >= games.length);
    els.showAllBtn.textContent = `Show all ${games.length} games`;
  }
}

function renderFeatured() {
  const favs = state.games.filter((game) => isFav(game.slug));
  const categoryGames = state.activeCategory === "all"
    ? []
    : state.games.filter((game) => game.category === state.activeCategory);
  const featured = (favs.length ? favs : categoryGames.length ? categoryGames : FEATURED_SLUGS.map((slug) => state.games.find((game) => game.slug === slug)).filter(Boolean)).slice(0, 8);
  if (els.featuredTitle) els.featuredTitle.textContent = favs.length ? "Your favorites" : state.activeCategory === "all" ? "Featured games" : `${state.categoryLabels.get(state.activeCategory)} picks`;
  if (els.featuredSummary) els.featuredSummary.textContent = `${featured.length} quick-start ${featured.length === 1 ? "game" : "games"}`;
  if (els.featuredRail) els.featuredRail.innerHTML = featured.map((game, index) => cardHTML(game, index, "rail-card")).join("");
}

function renderCategoryOverview() {
  if (!els.categoryOverview) return;
  els.categoryOverview.innerHTML = state.categories.map((category) => {
    const count = state.games.filter((game) => game.category === category.id).length;
    const active = category.id === state.activeCategory;
    return `<button class="category-tile ${active ? "active" : ""}" data-cat="${escapeAttr(category.id)}">
      <span class="category-icon">${escapeHtml(category.icon || "")}</span>
      <span><b>${escapeHtml(category.label)}</b><small>${count} ${count === 1 ? "game" : "games"}</small></span>
    </button>`;
  }).join("");
}

function renderAll() {
  renderCategories();
  renderFeatured();
  renderCategoryOverview();
  renderGrid();
}

// ---- events ----
document.addEventListener("click", (e) => {
  const fav = e.target.closest("[data-fav]");
  if (fav) {
    e.preventDefault();
    toggleFav(fav.dataset.fav);
    renderAll();
    return;
  }

  const chip = e.target.closest("[data-cat]");
  if (chip) {
    state.activeCategory = chip.dataset.cat;
    state.expanded = false;
    renderAll();
    if (chip.classList.contains("category-tile")) {
      document.querySelector(".library-block")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

// ---- Theme Toggle ----
function applyTheme(dark) {
  if (dark) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (els.themeToggleBtn) els.themeToggleBtn.textContent = "\u2600\uFE0F Light";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (els.themeToggleBtn) els.themeToggleBtn.textContent = "\uD83C\uDF19 Dark";
  }
}

let isDark = document.documentElement.getAttribute("data-theme") === "dark";
applyTheme(isDark);

if (els.themeToggleBtn) {
  els.themeToggleBtn.addEventListener("click", () => {
    isDark = !isDark;
    applyTheme(isDark);
    save("lp_theme", isDark ? "dark" : "light");
  });
}

els.favOnly.addEventListener("change", (e) => {
  state.favOnly = e.target.checked;
  state.expanded = false;
  renderAll();
});

let searchRaf = null;
els.searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  state.expanded = false;
  if (searchRaf) cancelAnimationFrame(searchRaf);
  searchRaf = requestAnimationFrame(renderAll);
});

els.searchClear.addEventListener("click", () => {
  els.searchInput.value = "";
  state.query = "";
  els.searchInput.focus();
  state.expanded = false;
  renderAll();
});

if (els.showAllBtn) {
  els.showAllBtn.addEventListener("click", () => {
    state.expanded = true;
    renderGrid();
  });
}

// ---- boot ----
fetch("games.json?v=20260825-bubble")
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then((data) => {
    // Support both the new { categories, games } shape and a legacy array.
    if (Array.isArray(data)) {
      state.games = data;
      state.categories = [...new Set(data.map((g) => g.category))].map((id) => ({
        id, label: id, icon: "", blurb: "",
      }));
    } else {
      state.categories = data.categories || [];
      state.games = data.games || [];
    }

    state.categoryLabels = new Map(state.categories.map((c) => [c.id, c.label]));
    state.categoryOrder = new Map(state.categories.map((c, i) => [c.id, i]));
    state.games = state.games.map((game) => ({
      ...game,
      searchText: `${game.title || ""} ${game.description || ""} ${state.categoryLabels.get(game.category) || ""}`.toLowerCase(),
    }));
    if (els.totalGamesStat) els.totalGamesStat.textContent = `${state.games.length} games`;

    renderAll();
  })
  .catch((err) => {
    console.error("Could not load games.json", err);
    els.sections.innerHTML =
      '<p class="empty">Oops &mdash; could not load the games list.</p>';
  });
