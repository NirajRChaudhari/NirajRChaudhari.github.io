import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls, Stars } from "@react-three/drei";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "../config";
import { Experience } from "./Experience";
import { Interface } from "./Interface";
import { LoadingScreen } from "./LoadingScreen";
import { ScrollManager } from "./ScrollManager";

/**
 * The entire 3D scene (Canvas + drei ScrollControls + the React Three Fiber
 * ecosystem: three, fiber, drei, leva, framer-motion-3d). Loaded as its own
 * async chunk from App.jsx so the initial parse stays tiny. Mounts BEFORE
 * `started` on purpose: the asset loads that flip `started` happen inside the
 * Experience/Interface subtrees below.
 */
const Scene = (props) => {
  const { section, setSection, menuOpened, isMobile, started, setStarted } =
    props;

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
        <Leva hidden />
      </MotionConfig>
    </>
  );
};

export default Scene;
