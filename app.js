// Little Players — homepage logic
// Loads games.json ({ categories, games }), renders grouped category
// sections with search + favorites, and remembers favorites in localStorage.

const STORE = { favs: "lp_favorites" };

const state = {
  categories: [],
  games: [],
  activeCategory: "all",
  favOnly: false,
  query: "",
};

// ---- localStorage helpers ----
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getFavs() { return load(STORE.favs, []); }
function isFav(slug) { return getFavs().includes(slug); }
function toggleFav(slug) {
  const favs = getFavs();
  const i = favs.indexOf(slug);
  if (i >= 0) favs.splice(i, 1); else favs.push(slug);
  save(STORE.favs, favs);
}

// ---- helpers ----
function catMeta(id) {
  return state.categories.find((c) => c.id === id) || { id, label: id, icon: "🎮", blurb: "" };
}

function matchesFilters(game) {
  const favOK = !state.favOnly || isFav(game.slug);
  const q = state.query.trim().toLowerCase();
  const text = `${game.title} ${game.description || ""} ${catMeta(game.category).label}`.toLowerCase();
  const queryOK = !q || text.includes(q);
  return favOK && queryOK;
}

// ---- rendering ----
function cardHTML(game) {
  const fav = isFav(game.slug);
  return `
    <a class="card" href="${game.url}" data-slug="${game.slug}"
       style="--card-color:${game.color || "#7c5cff"}">
      <button class="fav-btn" data-fav="${game.slug}" title="Favorite"
              aria-label="Toggle favorite">${fav ? "⭐" : "☆"}</button>
      <span class="icon">${game.icon || "🎮"}</span>
      <h3>${game.title}</h3>
      <p>${game.description || ""}</p>
      <div class="meta">
        <span class="tag">${catMeta(game.category).label}</span>
      </div>
    </a>`;
}

function renderCategories() {
  const chips = [{ id: "all", label: "All", icon: "🌈" }, ...state.categories];
  const wrap = document.getElementById("categoryFilters");
  wrap.innerHTML = chips
    .map(
      (c) =>
        `<button class="chip ${c.id === state.activeCategory ? "active" : ""}"
                 data-cat="${c.id}">${c.icon || ""} ${c.label}</button>`
    )
    .join("");
}

function visibleGames() {
  const order = new Map(state.categories.map((c, i) => [c.id, i]));
  return state.games
    .filter(
      (g) =>
        (state.activeCategory === "all" || g.category === state.activeCategory) &&
        matchesFilters(g)
    )
    .sort((a, b) => (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99));
}

function renderGrid() {
  const host = document.getElementById("sections");
  const games = visibleGames();
  host.innerHTML = games.length
    ? `<div class="grid">${games.map(cardHTML).join("")}</div>`
    : "";
  document.getElementById("emptyMsg").classList.toggle("hidden", games.length > 0);
}

function renderAll() {
  renderCategories();
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
  const chip = e.target.closest(".chip[data-cat]");
  if (chip) {
    state.activeCategory = chip.dataset.cat;
    renderAll();
    return;
  }
});

document.getElementById("favOnly").addEventListener("change", (e) => {
  state.favOnly = e.target.checked;
  renderGrid();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  state.query = e.target.value;
  renderGrid();
});

// ---- boot ----
fetch("games.json")
  .then((r) => r.json())
  .then((data) => {
    // Support both the new { categories, games } shape and a legacy array.
    if (Array.isArray(data)) {
      state.games = data;
      state.categories = [...new Set(data.map((g) => g.category))].map((id) => ({
        id, label: id, icon: "🎮", blurb: "",
      }));
    } else {
      state.categories = data.categories || [];
      state.games = data.games || [];
    }
    renderAll();
  })
  .catch((err) => {
    console.error("Could not load games.json", err);
    document.getElementById("sections").innerHTML =
      '<p class="empty">Oops — could not load the games list. 😕</p>';
  });
