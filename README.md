# 🎮 Little Players

A kid-friendly **game zone** homepage. Browse games by type, mark favorites, and
jump straight into any game.

- **Homepage** lives on the personal account → https://gauravs19.github.io/
- **Games** each live in their own repo under the **LittlePlayers** org →
  served at `https://littleplayers.github.io/<repo-name>/`

The homepage just links out to each game's URL, so the two can live in different
places — `games.json` is the only glue.

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
     "ages": "7-11",
     "icon": "🤖",
     "color": "#22c1a4",
     "description": "Guide the robot with code blocks."
   }
   ```

4. Commit & push — the new card appears automatically.

## Deploy

This repo is named `gauravs19.github.io`, so pushing to `main` publishes it at the
root: **https://gauravs19.github.io/**. Enable Pages in repo Settings if not already.

## Games

| Game | Type | Ages | Repo |
|------|------|------|------|
| 🧠 Brain Quest | learning | 6–10 | [LittlePlayers/brain-quest](https://github.com/LittlePlayers/brain-quest) |
