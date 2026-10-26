# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

A 3D interactive personal portfolio for Niraj Chaudhari, deployed to GitHub Pages
(https://nirajrchaudhari.github.io/) and Netlify (https://niraj-profile.netlify.app/)
— see Deployment below. It is a single-page app where scrolling moves
a 3D camera/avatar through six scenes, with HTML overlays rendered on top of a
fullscreen React Three Fiber `<Canvas>`.

Tech stack:

- React 18 + Vite 4 (`package.json` name is the starter template, `r3f-vite-starter`)
- React Three Fiber (`@react-three/fiber`) + `@react-three/drei` + Three.js
- `framer-motion` and `framer-motion-3d` for 2D/3D animation
- GSAP for scroll jumps, Jotai for state shared between 3D and HTML, Leva (hidden) for debug controls
- Tailwind CSS + a few colocated CSS files; assets served from `public/`

## Commands

```bash
npm install        # deps are already vendored in node_modules locally
npm run dev        # Vite dev server
npm run build      # production build -> dist/
npm run preview    # preview built output
```

- There are **no tests, no linter, and no formatter configured**. Verify changes with `npm run build` and by running `npm run dev` in a browser.
- Node 18 is used in CI (`.github/workflows/deploy.yml`); newer local Node also works.

## Mental model: how the app is structured

Entry chain: `index.html` → `src/main.jsx` → `src/App.jsx`.

`App.jsx` composes:

- `LoadingScreen` — fullscreen load progress ("Niraj Chaudhari" text fill); `started` becomes `true` after `useProgress()` reaches 100%, and the rest of the app only renders once started.
- `<Canvas>` with `<Stars>` and `<ScrollControls pages={6} damping={0.1}>`, containing two layers:
  - `<Scroll>` (3D): `ScrollManager` + `Experience` (avatar, office, brain, project models).
  - `<Scroll html>` (DOM): `Interface`, which renders the six sections in order.
- `Menu` (hamburger nav) and `Cursor` (custom cursor) outside the canvas, plus `<Leva hidden />`.

### The `section` state drives everything

`section` is a number 0–5 held in `App.jsx`, passed down to everything. `ScrollManager`
listens to scroll position and calls `onSectionChange`; `Experience` also derives it
per-frame. Two synced mechanisms animate on it:

- 3D: components wrapped in conditions like `{section == N && (...)}` or `framer-motion-3d` variants keyed by `"" + section`.
- HTML: each section's content renders only when `{section == N}` (wrapped in `AnimatePresence`).

| Index | Section    | HTML overlay (`src/components/sections/`) | 3D scene (`src/components/`)                    |
| ----- | ---------- | ----------------------------------------- | ------------------------------------------------ |
| 0     | About      | `AboutSection.jsx` + `ProfileKeywords`    | `Office.jsx` + avatar typing                     |
| 1     | Skills     | `SkillsSection.jsx` (carousel)            | `Brain.jsx` (highlighted by `CURRENT_SKILL_ATOM`) |
| 2     | Experience | `ExperienceSection.jsx` (timeline)        | avatar `Standing` animation                      |
| 3     | Education  | `EducationSection.jsx` (timeline)         | avatar `Standing` animation                      |
| 4     | Projects   | `ProjectsSection.jsx`                      | `Projects.jsx` (laptop/mobile + video texture)   |
| 5     | Contact    | `ContactSection.jsx` (Formspree form)     | avatar `Pointing` animation                      |

### State bridging 3D ↔ HTML (Jotai)

DOM components can't directly talk to 3D components, so shared state uses Jotai atoms:

- `CURRENT_SKILL_ATOM` (`src/components/Brain.jsx`) — carousel index in `SkillsSection` recolors the 3D brain.
- `currentProjectAtom` (`src/components/sections/Projects.jsx`) — "Previous/Next" buttons in `ProjectsSection` move the 3D laptop/mobile models.

Follow this pattern (define atom next to the 3D component, `useAtom` in both places) if
you add cross-layer interactions.

## Conventions

- Component files are PascalCase `.jsx`; 3D scene pieces live in `src/components/`, HTML overlay sections in `src/components/sections/`.
- Asset URLs are **relative without a leading slash** (`"models/avatar.glb"`, `"textures/ForgeryVideo.mp4"`) because assets live in `public/`. Follow this exactly or GitHub Pages deployment breaks.
- Preload 3D assets at the bottom of the module (`useGLTF.preload`, `useFBX.preload`, `useTexture.preload`).
- Styling is Tailwind utility classes inline. Purple is the theme accent (`purple-500/600/700`; timeline cards use `#663399`). The `sectionHeading` class (in `CommonStyle.css`) adds the purple glow to headings.
- Global CSS: `src/index.css` (Tailwind directives), `src/assets/fonts.css` (Gotham woff2, applied to body), `src/components/sections/CommonStyle.css`.
- Mobile detection is `window.innerWidth < 768`, computed once in `App.jsx` and passed as `isMobile`; components branch with `isMobile ? ... : ...` ternaries. 3D scaling uses `officeScaleRatio` derived from viewport width in `Experience.jsx`.
- Default animation spring config comes from `framerMotionConfig` in `src/config.js` (applied via `MotionConfig`).
- Google Analytics (`react-ga4`, property `G-9Y0CE4KXZW`) is initialized in `App.jsx`.
- Git normalizes line endings via `.gitattributes` (`* text=auto`).

## Gotchas and invariants

- **Changing sections requires coordinated edits.** The count 6 is hardcoded in several places: `ScrollControls pages={6}` (`App.jsx`), the `Menu.jsx` buttons, the `Interface.jsx` order, `curSection > 5` clamp in `Experience.jsx`, and `curSection < 5` in `ScrollManager.jsx`. Adding/reordering/removing a section means updating all of these plus every `section == N` gate.
- **Commented-out code is intentional — do not delete or enable it without being asked.** Examples: the avatar `position` comment in `Experience.jsx` (prevents avatar repositioning in Skills), the GSAP jump block in `ScrollManager.jsx` (2↔3 section transition), the "Driving Simulator" project entry in `Projects.jsx`, and the analytics `<script>` blocks in `index.html`.
- `src/components/Background.jsx` is dead code (never imported in `App.jsx`). Leave it alone unless explicitly asked.
- The scroll trigger threshold `0.015` in `ScrollManager.jsx` controls section jump sensitivity on wheel scroll; it exists so sections don't jump automatically.
- `Office.jsx` builds custom `MeshStandardMaterial`s from a single baked texture (`textures/baked_final.jpg`); meshes reference node names from `models/scene.gltf`. Don't rename meshes without updating the GLTF expectations.
- Project screens use `useVideoTexture` with mp4s in `public/textures/` — video files are large; prefer not to add more without reason.
- `blender/` contains local `.blend` source files that are **gitignored** (`.gitignore` has `*.blend`, `*.blend1`); exported glTF/glb models live in `public/models/`.
- `README.md` is empty and `Readme.txt` only contains the live URL; user-facing docs are not a priority here.

## Deployment

- **Two hosts, intentionally kept in sync — both build the same push to `main`, never update one without the other:**
  1. GitHub Pages (`https://nirajrchaudhari.github.io/`) — push to `main` triggers `.github/workflows/deploy.yml`: Node 18, `npm install`, `npm run build`, then deploy `dist/`.
  2. Netlify (`https://niraj-profile.netlify.app/`) — site is linked to this repo in Netlify and auto-deploys on push to `main`. Build settings are version-controlled in `netlify.toml` (`npm run build`, publish `dist/`, `NODE_VERSION=18` matching the Pages workflow); the TOML takes precedence over the Netlify UI.
- There is no per-host release step; a single `git push origin main` updates both. If only one host updates, the other likely failed its build — check the GitHub Actions run and the Netlify dashboard.
- Verify sync: each host's `index.html` references a hashed bundle (`/assets/index-<hash>.js`, `index-<hash>.css`). The hashes must match across both hosts. (Verified 2026-10-25: both served `index-b6be668f.js` / `index-0943ccdd.css`.)
- `vite.config.js` intentionally has no `base` — the site is served at the domain root (repo named `NirajRChaudhari.github.io`; Netlify serves root too). Combined with relative asset URLs (no leading slash), the same artifacts work on both hosts and any subpath.
- Do not commit `dist/` or `node_modules/` (gitignored). `blender/` stays local.
- `.specstory/` is local tooling metadata (project info file is gitignored); ignore it.
