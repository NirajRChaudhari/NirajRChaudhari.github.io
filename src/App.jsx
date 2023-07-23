import { Scroll, ScrollControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { LoadingScreen } from "./components/LoadingScreen";
import { Menu } from "./components/Menu";
import { ScrollManager } from "./components/ScrollManager";
import { framerMotionConfig } from "./config";
import ReactGA from "react-ga4";

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  ReactGA.initialize("G-9Y0CE4KXZW");
  ReactGA.send({
    hitType: "pageview",
    page: "/",
  });

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
          <color attach="background" args={["#000000"]} />
          <Stars
            radius={100}
            depth={100}
            count={6000}
            factor={4}
            saturation={0}
          />
          <ScrollControls pages={6} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Suspense>
                {started && (
                  <Experience
                    section={section}
                    isMobile={isMobile}
                    menuOpened={menuOpened}
                  />
                )}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started && (
                <Interface
                  section={section}
                  setSection={setSection}
                  isMobile={isMobile}
                />
              )}
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}

export default App;
