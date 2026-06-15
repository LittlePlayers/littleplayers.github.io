# 🎮 Little Players

A kid-friendly **game zone** homepage. Browse games by type, mark favorites, and
jump straight into any game.

Everything lives under the **LittlePlayers** org:
- **Homepage** (this repo, `littleplayers.github.io`) → https://littleplayers.github.io/
- **Games** each live in their own repo → served at `https://littleplayers.github.io/<repo-name>/`

The homepage just links out to each game's URL — `games.json` is the only glue.

## How it works

- `index.html` / `style.css` / `app.js` — the landing page (category browser + preferences).
- `games.json` — the **registry** of all games. The homepage reads this file and
  renders a card per entry. Preferences (favorites, recently played) are stored in
  the browser via `localStorage`.

## Adding a new game

1. Create a new repo under the **LittlePlayers** org (e.g. `code-the-robot`) with an `index.html`.
2. Enable **GitHub Pages** on that repo (Settings → Pages → deploy from `main`).
   It will be served at `https://littleplayers.github.io/<repo-name>/`.
3. Add one entry to `games.json` here:

   ```json
   {
     "title": "Code the Robot",
     "slug": "code-the-robot",
     "url": "https://littleplayers.github.io/code-the-robot/",
     "category": "coding",
     "icon": "🤖",
     "color": "#22c1a4",
     "description": "Guide the robot with code blocks."
   }
   ```

4. Commit & push — the new card appears automatically.

## Deploy

This repo is named `littleplayers.github.io` (matching the org), so pushing to `main`
publishes it at the org root: **https://littleplayers.github.io/**. Enable Pages in
repo Settings if not already.

## Games

| Game | Genre | Repo |
|------|-------|------|
| 🧠 Brain Quest | learning | [LittlePlayers/brain-quest](https://github.com/LittlePlayers/brain-quest) |
| 🔠 Word Scramble | word | [LittlePlayers/word-scramble](https://github.com/LittlePlayers/word-scramble) |
| ➗ Math Blast | math | [LittlePlayers/math-blast](https://github.com/LittlePlayers/math-blast) |
| 🐝 Spelling Bee | word | [LittlePlayers/spelling-bee](https://github.com/LittlePlayers/spelling-bee) |
| 🌀 Maze Runner | puzzle | [LittlePlayers/maze-runner](https://github.com/LittlePlayers/maze-runner) |
| 🌀 Spirograph | creativity | [LittlePlayers/spirograph](https://github.com/LittlePlayers/spirograph) |
| 🎨 Doodle Pad | creativity | [LittlePlayers/doodle-pad](https://github.com/LittlePlayers/doodle-pad) |
| 🔮 Kaleidoscope Draw | creativity | [LittlePlayers/kaleidoscope-draw](https://github.com/LittlePlayers/kaleidoscope-draw) |
| 🐸 Animal Band | creativity | [LittlePlayers/animal-band](https://github.com/LittlePlayers/animal-band) |
| 👗 Dress Up | creativity | [LittlePlayers/dress-up](https://github.com/LittlePlayers/dress-up) |
| 🐒 Hanuman Run | arcade | [LittlePlayers/hanuman-run](https://github.com/LittlePlayers/hanuman-run) |
