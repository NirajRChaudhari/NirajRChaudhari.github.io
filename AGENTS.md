# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

A 3D interactive personal portfolio for Niraj Chaudhari, deployed to GitHub Pages
(https://nirajrchaudhari.github.io/) and Netlify (https://niraj-profile.netlify.app/)
— see Deployment below. It is a single-page app where scrolling moves
a 3D camera/avatar through six scenes, with HTML overlays rendered on top of a
fullscreen React Three Fiber `<Canvas>`.

Tech stack:

- React 18 + Vite 8 (rolldown-based build; `package.json` name is the starter template, `r3f-vite-starter`)
- React Three Fiber (`@react-three/fiber`) + `@react-three/drei` + Three.js
- `framer-motion` and `framer-motion-3d` for 2D/3D animation
- GSAP for scroll jumps, Jotai for state shared between 3D and HTML, Leva (hidden) for debug controls
- Tailwind CSS 4 (via `@tailwindcss/postcss`; `src/index.css` uses `@import "tailwindcss"`, no config file) + a few colocated CSS files; assets served from `public/`
- Code splitting: `App.jsx` is a thin async shell (157 kB first-parse, 52 kB gzip — was 2,373 kB / 719 kB single bundle before the Oct 2026 split) that `React.lazy`-loads the entire 3D stack in `src/components/Scene.jsx`; `vite.config.js` names the library chunks. See the code-splitting gotchas below — it is easy to silently undo the split.

## Commands

```bash
npm install        # node_modules was cleanly reinstalled during the Oct 2026 stack modernization
npm run dev        # Vite dev server
npm run build      # production build -> dist/
npm run preview    # preview built output
```

- There are **no tests, no linter, and no formatter configured**. Verify changes with `npm run build` and by running `npm run dev` in a browser.
- Node 22 is used in CI (`.github/workflows/deploy.yml`) and Netlify; local Node 22+ works (Vite 8 requires Node ^20.19 or >=22.12).
- **`framer-motion@11.18.2` and `framer-motion-3d@11.11.11` are exact-pinned as a pair.** `framer-motion-3d` >=11.11.12 hard-pins `@react-three/fiber@8.2.2` exactly in peerDependencies (and no fiber-9 release exists), which breaks `npm install` against fiber 8.18. Bump these two together only; moving to R3F v9/React 19 requires replacing `framer-motion-3d` wholesale (no compatible release exists as of Oct 2026).

## Mental model: how the app is structured

Entry chain: `index.html` → `src/main.jsx` → `src/App.jsx` → `React.lazy(() => import("./components/Scene.jsx"))`.

The boot shell in `App.jsx` (no 3D-stack imports — see gotchas) holds the shared state (`section` 0–5, `started`, `menuOpened`) and renders:

- `<Suspense fallback={<LoadingSplash />}>` around the lazy `Scene`. `LoadingSplash` is a static placeholder visually identical to `LoadingScreen` at 0% progress (slate-200 bg, gray "Niraj Chaudhari" title), shown while the 3D chunk + library chunks download.
- `Menu` (hamburger nav) and `Cursor` (custom cursor) — the only synchronous components.
- The Google Analytics effect (`react-ga4`, StrictMode-guarded).

`src/components/Scene.jsx` is the lazy chunk holding the whole 3D world:

- `LoadingScreen` — fullscreen load progress ("Niraj Chaudhari" text fill); `started` becomes `true` after `useProgress()` reaches 100%, and the rest of the app only renders once started.
- `<Canvas>` with `<Stars>` and `<ScrollControls pages={6} damping={0.1}>`, containing two layers:
  - `<Scroll>` (3D): `ScrollManager` + `Experience` (avatar, office, brain, project models).
  - `<Scroll html>` (DOM): `Interface`, which renders the six sections in order.
- `MotionConfig` + `<Leva hidden />`.

`Scene` mounts BEFORE `started` flips on purpose: the asset loads that flip `started` (drei `useProgress` → 100% → `setStarted`) only begin once the Scene chunk's static imports have run (module-level `useGLTF.preload` etc.). Gating the lazy `Scene` itself on `started` would deadlock the boot.

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
| 4     | Projects   | `ProjectsSection.jsx`                      | `Projects.jsx` (laptop/mobile + video texture) + avatar `Pointing` animation |
| 5     | Contact    | `ContactSection.jsx` (Formspree form)     | avatar `Standing` animation                      |

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
- Global CSS: `src/index.css` (uses `@import "tailwindcss"`; Tailwind 4 has no config file), `src/assets/fonts.css` (Gotham woff2, applied to body), `src/components/sections/CommonStyle.css`.
- Mobile detection is `window.innerWidth < 768`, computed once in `App.jsx` and passed as `isMobile`; components branch with `isMobile ? ... : ...` ternaries. 3D scaling uses `officeScaleRatio` derived from viewport width in `Experience.jsx`.
- Default animation spring config comes from `framerMotionConfig` in `src/config.js` (applied via `MotionConfig`).
- Google Analytics (`react-ga4`, property `G-9Y0CE4KXZW`) is initialized in `App.jsx`.
- Git normalizes line endings via `.gitattributes` (`* text=auto`).

## Gotchas and invariants

- **Changing sections requires coordinated edits.** The count 6 is hardcoded in several places: `ScrollControls pages={6}` (`Scene.jsx`), the `Menu.jsx` buttons, the `Interface.jsx` order, `curSection > 5` clamp in `Experience.jsx`, and `curSection < 5` in `ScrollManager.jsx`. Adding/reordering/removing a section means updating all of these plus every `section == N` gate.
- **Code splitting (Oct 2026) — do not re-tangle it.** `App.jsx`, `Menu.jsx`, `Cursor.jsx`, and the `LoadingSplash` placeholder are the only synchronous code and must never import `three`, `@react-three/*`, `framer-motion(-3d)`, or `leva`; a single static import pulls the whole 3D chunk back into the entry's `modulepreload` set and silently undoes the 157 kB (52 kB gzip) first-parse win. Named chunks: `Scene` (app 3D), `three`, `r3f`, `drei`, `motion`, `three-stdlib`, `libs-ui` (gsap/jotai/leva/carousel/timeline), `hls`, `react-kernel` (react/react-dom/scheduler — the only eager one).
- **`vite.config.js` chunk groups have two non-obvious traps** (both bit during the first split, both empirically verified):
  - Groups must set `includeDependenciesRecursively: false` (exception: `react-kernel`). Default group behavior sweeps the matched package's whole dependency closure into the chunk — fiber's recursion captured `react-dom`, which made the entry chunk statically import the r3f chunk and the boot preload set grew to ~2.2 MB again.
  - `output.strictExecutionOrder: true` is required. Without it, the react↔react-dom↔scheduler cycle spanning the entry / `react-kernel` / `Scene` chunks executes module bodies out of order and hard-crashes at boot with `TypeError: g is not a function` (react-kernel chunk, headless Chrome verified). `experimental.onDemandWrapping` alone does NOT cover this cycle — the crash returns.
  - `strictExecutionOrder` splits the entry into an extra content chunk whose name Vite derives from `basename(cwd)` (`NirajRChaudhari.github.io` locally, `repo` on Netlify builds) — with different names, the chunk hashes differ and the two hosts would stop matching. `output.chunkFileNames` / `output.assetFileNames` in `vite.config.js` normalize that cwd-derived name to `app-root` so both hosts serve byte-identical, identically-named files; any new emitted-artifact name must not depend on the build machine's path.
  - Verify any chunking change by checking the `<link rel="modulepreload">` set in `dist/index.html`: it must stay `rolldown-runtime-*`, the entry facade, and `react-kernel-*` only. Smoke-test via `npm run preview -- --port 4173` + headless Chrome (`--virtual-time-budget` screenshots cap around 12–26s; larger budgets hang on the WebGL rAF loop).
- **Commented-out code is intentional — do not delete or enable it without being asked.** Examples: the avatar `position` comment in `Experience.jsx` (prevents avatar repositioning in Skills), the GSAP jump block in `ScrollManager.jsx` (2↔3 section transition), the "Driving Simulator" project entry in `Projects.jsx`, and the analytics `<script>` blocks in `index.html`.
- `src/components/Background.jsx` is dead code (never imported in `App.jsx`). Leave it alone unless explicitly asked.
- `public/models/old_scene.gltf` and `public/models/university.glb` were removed as unused (Oct 2026 code-splitting/dead-weight pass). `public/textures/OpenCvDriving.mp4` IS intentional dead weight — it backs the commented-out "Driving Simulator" project entry in Projects.jsx; don't delete the video unless that disabled project is being intentionally retired.
- The scroll trigger threshold `0.015` in `ScrollManager.jsx` controls section jump sensitivity on wheel scroll; it exists so sections don't jump automatically.
- `Office.jsx` builds custom `MeshStandardMaterial`s from a single baked texture (`textures/baked_final.jpg`); meshes reference node names from `models/scene.gltf`. Don't rename meshes without updating the GLTF expectations.
- Project screens use `useVideoTexture` with mp4s in `public/textures/` — video files are large; prefer not to add more without reason.
- `blender/` contains local `.blend` source files that are **gitignored** (`.gitignore` has `*.blend`, `*.blend1`); exported glTF/glb models live in `public/models/`.
- `README.md` is empty and `Readme.txt` only contains the live URL; user-facing docs are not a priority here.

## Deployment

- **Two hosts, intentionally kept in sync — both build the same push to `main`, never update one without the other:**
  1. GitHub Pages (`https://nirajrchaudhari.github.io/`) — push to `main` triggers `.github/workflows/deploy.yml`: Node 22, `npm install`, `npm run build`, then deploy `dist/`.
  2. Netlify (`https://niraj-profile.netlify.app/`) — site is linked to this repo in Netlify and auto-deploys on push to `main`. Build settings are version-controlled in `netlify.toml` (`npm run build`, publish `dist/`, `NODE_VERSION=22` matching the Pages workflow); the TOML takes precedence over the Netlify UI.
- There is no per-host release step; a single `git push origin main` updates both. If only one host updates, the other likely failed its build — check the GitHub Actions run and the Netlify dashboard.
- Verify sync: each host's `index.html` references a hashed bundle (`/assets/index-<hash>.js`, `index-<hash>.css`). The hashes must match across both hosts. (Verified 2026-10-25: both served `index-b6be668f.js` / `index-0943ccdd.css`.)
- `vite.config.js` intentionally has no `base` — the site is served at the domain root (repo named `NirajRChaudhari.github.io`; Netlify serves root too). Combined with relative asset URLs (no leading slash), the same artifacts work on both hosts and any subpath.
- Do not commit `dist/` or `node_modules/` (gitignored). `blender/` stays local.
- `.specstory/` is local tooling metadata (project info file is gitignored); ignore it.
