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

function sectionHTML(cat, games) {
  const cards = games.map(cardHTML).join("");
  return `
    <section class="cat-section" data-cat="${cat.id}">
      <div class="cat-head">
        <h2><span class="cat-icon">${cat.icon || "🎮"}</span> ${cat.label}</h2>
        ${cat.blurb ? `<p class="cat-blurb">${cat.blurb}</p>` : ""}
      </div>
      <div class="grid">${cards}</div>
    </section>`;
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

function renderSections() {
  const host = document.getElementById("sections");
  const visibleCats =
    state.activeCategory === "all"
      ? state.categories
      : state.categories.filter((c) => c.id === state.activeCategory);

  let total = 0;
  const html = visibleCats
    .map((cat) => {
      const games = state.games.filter(
        (g) => g.category === cat.id && matchesFilters(g)
      );
      total += games.length;
      return games.length ? sectionHTML(cat, games) : "";
    })
    .join("");

  host.innerHTML = html;
  document.getElementById("emptyMsg").classList.toggle("hidden", total > 0);
}

function renderAll() {
  renderCategories();
  renderSections();
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
  renderSections();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  state.query = e.target.value;
  renderSections();
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
