// Little Players — homepage logic
// Loads games.json, renders category filters + cards, and remembers
// the child's preferences (favorites + recently played) in localStorage.

const STORE = {
  favs: "lp_favorites",
  recent: "lp_recent",
};

const state = {
  games: [],
  activeCategory: "all",
  favOnly: false,
};

// ---- localStorage helpers ----
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFavs() { return load(STORE.favs, []); }
function isFav(slug) { return getFavs().includes(slug); }
function toggleFav(slug) {
  const favs = getFavs();
  const i = favs.indexOf(slug);
  if (i >= 0) favs.splice(i, 1); else favs.push(slug);
  save(STORE.favs, favs);
}
function getRecent() { return load(STORE.recent, []); }
function pushRecent(slug) {
  let recent = getRecent().filter((s) => s !== slug);
  recent.unshift(slug);
  recent = recent.slice(0, 4);
  save(STORE.recent, recent);
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
        <span class="tag">${game.category}</span>
        <span class="tag">Ages ${game.ages || "all"}</span>
      </div>
    </a>`;
}

function renderCategories() {
  const cats = ["all", ...new Set(state.games.map((g) => g.category))];
  const wrap = document.getElementById("categoryFilters");
  wrap.innerHTML = cats
    .map(
      (c) =>
        `<button class="chip ${c === state.activeCategory ? "active" : ""}"
                 data-cat="${c}">${c === "all" ? "🌈 All" : c}</button>`
    )
    .join("");
}

function visibleGames() {
  return state.games.filter((g) => {
    const catOK = state.activeCategory === "all" || g.category === state.activeCategory;
    const favOK = !state.favOnly || isFav(g.slug);
    return catOK && favOK;
  });
}

function renderRecent() {
  const recentSlugs = getRecent();
  const section = document.getElementById("recentSection");
  const grid = document.getElementById("recentGrid");
  const games = recentSlugs
    .map((s) => state.games.find((g) => g.slug === s))
    .filter(Boolean);
  if (!games.length) { section.classList.add("hidden"); return; }
  section.classList.remove("hidden");
  grid.innerHTML = games.map(cardHTML).join("");
}

function renderGames() {
  const grid = document.getElementById("gameGrid");
  const games = visibleGames();
  grid.innerHTML = games.map(cardHTML).join("");
  document.getElementById("emptyMsg").classList.toggle("hidden", games.length > 0);
}

function renderAll() {
  renderCategories();
  renderRecent();
  renderGames();
}

// ---- events (delegated) ----
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
    renderAll();
    return;
  }
  const card = e.target.closest(".card");
  if (card) {
    pushRecent(card.dataset.slug); // remember before navigating
  }
});

document.getElementById("favOnly").addEventListener("change", (e) => {
  state.favOnly = e.target.checked;
  renderGames();
});

// ---- boot ----
fetch("games.json")
  .then((r) => r.json())
  .then((games) => {
    state.games = games;
    renderAll();
  })
  .catch((err) => {
    console.error("Could not load games.json", err);
    document.getElementById("gameGrid").innerHTML =
      '<p class="empty">Oops — could not load the games list. 😕</p>';
  });
