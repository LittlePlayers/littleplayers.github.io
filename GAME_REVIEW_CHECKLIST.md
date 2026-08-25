# Little Players Game Review Checklist

Use this checklist before publishing new games or changing shared UX. The goal is one product-feel across old standalone games and newer lab games.

## Reference Lens

- Nielsen Norman Group heuristics: immediate feedback, familiar language, undo/restart, consistency, error prevention, recognition over recall, and focused screens.
- WCAG 2.2: visible focus, touch targets, pointer alternatives to dragging, predictable repeated help/navigation, and no hidden focused controls.
- Game Accessibility Guidelines: inclusive controls, readable presentation, adjustable/replayable challenge, and avoid excluding players through motor, audio, visual, or cognitive assumptions.
- MDN Web Audio guidance: audio should start from user interaction, avoid surprise autoplay, and keep user control obvious.

## Global Acceptance Checks

- Route: page returns `200` locally and from the intended deployed path.
- Identity: title, game goal, category, and icon match the homepage card.
- Shell: dark toggle, one visible `Game hub` return, and Journey drawer appear consistently.
- First action: player can understand the next action within 5 seconds.
- Feedback: every tap/click has visible response; success and failure explain what changed.
- Journey: stage/level/round progress is visible and next/restart are available.
- Controls: every core action has a touch-first control; keyboard support is optional and never required.
- Mobile copy: visible instructions must lead with tap, swipe, drag, sliders, or on-screen buttons; keyboard shortcuts belong only as optional helpers.
- Orientation: wide canvas games offer an optional widescreen playfield; portrait users are never forced to use keyboard controls.
- Accessibility: game is playable without color alone; audio games have visible pattern feedback; drag-heavy games have click/tap alternatives.
- Performance: no console errors, no blank canvas/SVG, no horizontal overflow at 390px mobile and 1280px desktop.
- Theme: dark mode does not create low-contrast text, invisible borders, or mismatched white panels.
- Polish: copy is kid-friendly, concise, and uses the same tone as the rest of Little Players.

## One-by-One Tracker

| Game | URL | Review Focus | Status |
| --- | --- | --- | --- |
| Market Day | `/market-day/` | Money loop, cart clarity, change feedback, old-shell consistency | Pending manual play |
| Budget Hero | `/budget-hero/` | Need/want clarity, budget status, error prevention | Pending manual play |
| Cross the Road Smart | `/cross-the-road/` | Timing, safety feedback, tap/swipe controls | Pending manual play |
| Healthy Plate | `/healthy-plate/` | Food group recognition, balanced meal scoring | Pending manual play |
| Hanuman Run | `/hanuman-run/` | Runner responsiveness, obstacle readability, myth tone | Pending manual play |
| Krishna's Cows | `/krishnas-cows/` | Herding controls, goal clarity, stage pacing | Pending manual play |
| Arjuna's Aim | `/arjunas-aim/` | Angle/power physics, wind readability, hit feedback | Pending manual play |
| Word Scramble | `/word-scramble/` | Letter controls, hints, timer stress, spelling feedback | Pending manual play |
| Spelling Bee | `/spelling-bee/` | Audio fallback, repeat word, input affordance | Pending manual play |
| Brain Quest | `/brain-quest/` | Question clarity, answer feedback, difficulty ramp | Pending manual play |
| Math Blast | `/math-blast/` | Math input speed, difficulty, large answer buttons | Pending manual play |
| Maze Runner | `/maze-runner/` | D-pad/swipe navigation, collision clarity, restart | Pending manual play |
| Spirograph | `/spirograph/` | Slider feedback, save art, canvas visibility | Pending manual play |
| Doodle Pad | `/doodle-pad/` | Drawing tools, erase/clear, mobile canvas behavior | Pending manual play |
| Kaleidoscope Draw | `/kaleidoscope-draw/` | Mirrored drawing clarity, controls, save/reset | Pending manual play |
| Animal Band | `/animal-band/` | Audio starts on tap, recording/playback clarity | Pending manual play |
| Dress Up | `/dress-up/` | Outfit alignment, stage goals, save image | Pending manual play |
| Rhythm Garden | `/rhythm-garden/` | Audio + visual pattern, memory ramp, no autoplay | Smoke passed |
| Pendulum Painter | `/pendulum-painter/` | Motion art feedback, target setup, sliders | Smoke passed |
| Nonogram | `/nonogram/` | Grid clues, mark/fill controls, mistake recovery | Pending manual play |
| Code Breaker | `/code-breaker/` | Clue interpretation, guesses, color alternatives | Pending manual play |
| Logic Bot | `/logic-bot/` | Command queue, loops, run/reset clarity | Pending manual play |
| Cipher School | `/cipher-school/` | Shift controls, hint quality, text readability | Pending manual play |
| Circuit Logic | `/circuit-logic/` | Gate logic clarity, switches, instant bulb feedback | Pending manual play |
| Rocket Launch Lab | `/rocket-launch-lab/` | Projectile physics, sliders, stage progression | Smoke passed |
| Catapult Castle | `/catapult-castle/` | Angle/force/mass clarity, safe target feedback | Smoke passed |
| Marble Maze Makers | `/marble-maze-makers/` | Co-op turns, part placement, marble simulation | Smoke passed |
| World Quiz | `/world-quiz/` | Geography content, image loading, answer feedback | Pending manual play |
| Treasure Weigh-In | `/treasure-weigh-in/` | Weighing UX, prompt replacement risk, strategy clarity | Pending manual play |
| Mirror Maze | `/mirror-maze/` | Beam trace, mirror rotation, level ramp | Pending manual play |
| Mini Architect | `/mini-architect/` | Stability rules, material clarity, stage depth | Pending manual play |
| Star Map Navigator | `/star-map-navigator/` | Coordinates, compass buttons, goal state | Pending manual play |
| Color Chemistry | `/color-chemistry/` | Color mixing, hints, medals, stage ramp | Smoke passed |

## Manual Play Script Per Game

1. Open the game from the homepage card, then from its direct URL.
2. Toggle dark mode, open Journey, use Previous/Next, then return.
3. Complete the first level or intentionally fail once.
4. Use reset/undo/hint/replay where available.
5. Repeat on mobile width, checking that controls remain visible and touchable.
6. Record whether the game feels like a Little Players journey: clear goal, playful feedback, stage progress, and a reason to continue.

## Drift Triggers

- A game has no stage, round, level, score, medal, or journey state.
- A game uses a one-off layout that ignores shared shell controls.
- A game asks children to use keyboard controls before offering a visible touch control.
- Audio, canvas, SVG, or images fail silently.
- Mobile layout requires horizontal scrolling.
- Instructions are long, hidden, or inconsistent with the homepage promise.
- Dark mode leaves bright white panels or unreadable text.
