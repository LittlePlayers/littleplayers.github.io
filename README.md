# 🎮 Little Players

A kid-friendly **game zone** — browse games by category, search, mark favorites, and
jump straight into any game. Many games quietly teach real skills (money, road safety,
healthy eating, words, numbers).

> **This is now a monorepo.** The homepage **and every game** live in this single
> `littleplayers.github.io` repo. Each game is a folder served at
> `https://littleplayers.github.io/<slug>/`. No more one-repo-per-game.

## Structure

```
littleplayers.github.io/
├── index.html / style.css / app.js   ← the landing page
├── games.json                        ← the single source of truth (registry)
├── build.js                          ← regenerates SEO blocks from games.json
├── market-day/index.html             ← each game is just a folder
├── hanuman-run/index.html
└── …
```

- `games.json` defines two things: the **categories** (order, label, icon, blurb) and
  the **games** (title, slug, url, category, icon, color, description). The homepage
  reads it and renders grouped category sections. Favorites are stored in `localStorage`.
- Each game is a **single self-contained `index.html`** (inline CSS/JS, no build, no CDN).

## Adding a new game

1. Create a folder `your-slug/` with a self-contained `index.html`
   (copy an existing game like `math-blast/index.html` for the house style:
   SEO head, Baloo 2 font, scoreboard pills, overlay, `← Back to Little Players` link).
2. Add one entry to the `games` array in `games.json`:

   ```json
   {
     "title": "Memory Match",
     "slug": "memory-match",
     "url": "https://littleplayers.github.io/memory-match/",
     "category": "brain",
     "icon": "🧩",
     "color": "#22c1a4",
     "description": "Flip and pair the cards from memory."
   }
   ```

   (If it's a brand-new category, add it to the `categories` array too.)
3. Run the build to refresh the SEO blocks, then commit & push:

   ```bash
   node build.js
   git add -A && git commit -m "Add Memory Match" && git push
   ```

The card appears automatically — `app.js` renders it from `games.json`.

## build.js

`games.json` is the **single source of truth**. `build.js` reads it and regenerates two
auto-generated regions in `index.html` (between `*:BEGIN`/`*:END` markers):

- the crawlable `<nav class="sr-only">` list of all games (SEO + no-JS fallback)
- the schema.org `ItemList` JSON-LD

Always run `node build.js` after editing `games.json` so the SEO stays in sync.
Don't hand-edit the marked regions.

## Deploy

This repo is named `littleplayers.github.io` (matching the org), so pushing to `main`
publishes at the org root: **https://littleplayers.github.io/**, and every game folder
is served at `https://littleplayers.github.io/<slug>/`. Enable Pages (Settings → Pages →
deploy from `main`) if not already.

## Games

| Game | Category | Path |
|------|----------|------|
| 🛒 Market Day | Life Skills | [/market-day/](https://littleplayers.github.io/market-day/) |
| 💰 Budget Hero | Life Skills | [/budget-hero/](https://littleplayers.github.io/budget-hero/) |
| 🚦 Cross the Road Smart | Life Skills | [/cross-the-road/](https://littleplayers.github.io/cross-the-road/) |
| 🥗 Healthy Plate | Life Skills | [/healthy-plate/](https://littleplayers.github.io/healthy-plate/) |
| 🚩 Hanuman Run | Indian Mythology | [/hanuman-run/](https://littleplayers.github.io/hanuman-run/) |
| 🪈 Krishna's Cows | Indian Mythology | [/krishnas-cows/](https://littleplayers.github.io/krishnas-cows/) |
| 🏹 Arjuna's Aim | Indian Mythology | [/arjunas-aim/](https://littleplayers.github.io/arjunas-aim/) |
| 🔠 Word Scramble | Words & Letters | [/word-scramble/](https://littleplayers.github.io/word-scramble/) |
| 🐝 Spelling Bee | Words & Letters | [/spelling-bee/](https://littleplayers.github.io/spelling-bee/) |
| 🧠 Brain Quest | Brain & Numbers | [/brain-quest/](https://littleplayers.github.io/brain-quest/) |
| ➗ Math Blast | Brain & Numbers | [/math-blast/](https://littleplayers.github.io/math-blast/) |
| 🧭 Maze Runner | Brain & Numbers | [/maze-runner/](https://littleplayers.github.io/maze-runner/) |
| 🌀 Spirograph | Creativity | [/spirograph/](https://littleplayers.github.io/spirograph/) |
| 🎨 Doodle Pad | Creativity | [/doodle-pad/](https://littleplayers.github.io/doodle-pad/) |
| 🔮 Kaleidoscope Draw | Creativity | [/kaleidoscope-draw/](https://littleplayers.github.io/kaleidoscope-draw/) |
| 🐸 Animal Band | Creativity | [/animal-band/](https://littleplayers.github.io/animal-band/) |
| 👗 Dress Up | Creativity | [/dress-up/](https://littleplayers.github.io/dress-up/) |
| 🧩 Nonogram | Logic & Strategy | [/nonogram/](https://littleplayers.github.io/nonogram/) |
| 🎯 Code Breaker | Logic & Strategy | [/code-breaker/](https://littleplayers.github.io/code-breaker/) |
| 🤖 Logic Bot | STEM & Code | [/logic-bot/](https://littleplayers.github.io/logic-bot/) |
| 🔐 Cipher School | STEM & Code | [/cipher-school/](https://littleplayers.github.io/cipher-school/) |
| 💡 Circuit Logic | STEM & Code | [/circuit-logic/](https://littleplayers.github.io/circuit-logic/) |
| 🗺️ World Quiz | Explore the World | [/world-quiz/](https://littleplayers.github.io/world-quiz/) |
