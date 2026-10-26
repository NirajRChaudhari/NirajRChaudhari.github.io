import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The api codeSplitting groups split the three.js ecosystem into named,
    // cache-stable chunks. The app is architected so these are ONLY reachable
    // through the lazy `Scene` chunk (src/App.jsx → React.lazy Scene.jsx) —
    // never statically — so they are deferred past first paint and cost zero
    // first-parse time.
    //
    // includeDependenciesRecursively:false is essential here: a group's
    // default behavior sweeps the matched package's whole dependency closure
    // into the same chunk, which pulled react-dom (a dependency of fiber's
    // subtree) into the r3f chunk and made the entry chunk static-import the
    // entire three.js ecosystem again (verified 2026-10-26: index.html
    // modulepreload listed three/r3f, booting ~2.2 MB). With recursion off,
    // each group contains exactly its own package; react/react-dom/scheduler
    // live in "react-kernel" (boot-critical, cache-stable) and every other
    // async-only dependency (gsap, jotai, leva, carousels, drei helpers) is
    // handled by rolldown's default affinity into the lazy Scene graph.
    //
    // `chunkSizeWarningLimit` is raised because the only chunk currently above
    // 500 kB is an async, lazy-loaded chunk; a regression back to a single
    // ~2.4 MB first-parse bundle would still trip this limit.
    chunkSizeWarningLimit: 1250,
    rolldownOptions: {
      output: {
        // React's internals are order-sensitive (cyclic side effects between
        // react / react-dom / scheduler). Splitting them into their own chunk
        // without this produces "TypeError: g is not a function" at runtime
        // (verified 2026-10-26 in headless Chrome); strictExecutionOrder keeps
        // module bodies executing in source order, at a small size cost.
        strictExecutionOrder: true,
        codeSplitting: {
          groups: [
            {
              name: "three",
              test: /node_modules[\\/](three)[\\/]/,
              priority: 40,
              includeDependenciesRecursively: false,
            },
            {
              name: "drei",
              test: /node_modules[\\/]@react-three[\\/]drei[\\/]/,
              priority: 38,
              includeDependenciesRecursively: false,
            },
            {
              // drei's big helper library (OrbitControls etc., tree-shaken to
              // the parts ScrollControls/Stars actually use)
              name: "three-stdlib",
              test: /node_modules[\\/]three-stdlib[\\/]/,
              priority: 36,
              includeDependenciesRecursively: false,
            },
            {
              name: "r3f",
              test: /node_modules[\\/]@react-three[\\/]fiber[\\/]/,
              priority: 34,
              includeDependenciesRecursively: false,
            },
            {
              // drei dependency; ~unused but reachable through tied exports
              name: "react-spring",
              test: /node_modules[\\/]@react-spring[\\/]/,
              priority: 32,
              includeDependenciesRecursively: false,
            },
            {
              name: "motion",
              test: /node_modules[\\/](framer-motion|framer-motion-3d)[\\/]/,
              priority: 30,
              includeDependenciesRecursively: false,
            },
            {
              // Async-only UI-side libraries (carousel, timelines, animation
              // engine, state) — stable across app edits.
              name: "libs-ui",
              test: /node_modules[\\/](gsap|jotai|leva|react-responsive-carousel|react-vertical-timeline-component)[\\/]/,
              priority: 28,
              includeDependenciesRecursively: false,
            },
            {
              // drei carries hls.js for stream-capable video textures; the
              // mp4-only app doesn't need it at parse time — kept with the
              // other async library chunks.
              name: "hls",
              test: /node_modules[\\/]hls\.js[\\/]/,
              priority: 27,
              includeDependenciesRecursively: false,
            },
            {
              name: "motion",
              test: /node_modules[\\/](framer-motion|framer-motion-3d)[\\/]/,
              priority: 20,
              includeDependenciesRecursively: false,
            },
            {
              name: "react-kernel",
              // Boot-critical and stable: react, react-dom, scheduler (+ any
              // closure like nested copies). App edits don't invalidate it.
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
