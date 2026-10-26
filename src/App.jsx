import { lazy, Suspense, useEffect, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Menu } from "./components/Menu";
import ReactGA from "react-ga4";

/**
 * The 3D scene (three / fiber / drei / leva / framer-motion) lives in its own
 * async chunk, React.lazy'd below. Exact-copy of the original App canvas tree.
 * INVARIANT: the boot shell (this file, Menu, Cursor, LoadingSplash) must not
 * import fiber/drei/three/leva/framer-motion — a single static import would
 * pull the whole 3D chunk back into the first-parse path and silently undo
 * the code splitting in vite.config.js.
 */
const Scene = lazy(() => import("./components/Scene"));

// Module-level guard so React StrictMode's double effect invocation (dev only)
// doesn't initialize GA4 twice and send duplicate pageviews.
let analyticsInitialized = false;

// Static placeholder while the Scene chunk is fetched — visually identical to
// the start of the real LoadingScreen (0% progress, no fill).
const LoadingSplash = () => (
  <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-slate-200">
    <div className="text-4xl font-bold text-gray-700 opacity-40 md:text-9xl">
      Niraj Chaudhari
    </div>
  </div>
);

function App() {
  const [section, setSection] = useState(0);

  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  useEffect(() => {
    if (analyticsInitialized) return;
    analyticsInitialized = true;

    // Google Analytics Code (must be in an effect: App re-renders on every
    // section/menu/loaded change and would otherwise fire pageview spam)
    ReactGA.initialize("G-9Y0CE4KXZW");
    ReactGA.send({
      hitType: "pageview",
      page: "/",
    });
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingSplash />}>
        <Scene
          section={section}
          setSection={setSection}
          menuOpened={menuOpened}
          isMobile={isMobile}
          started={started}
          setStarted={setStarted}
        />
      </Suspense>
      <Menu
        onSectionChange={(nextSection) => {
          setSection(nextSection);
          setMenuOpened(false);
        }}
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
      />
      <Cursor />
    </>
  );
}

export default App;
