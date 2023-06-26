import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Office } from "./Office";
import { Projects } from "./Projects";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue(0);
  const cameraLookAtX = useMotionValue(0);

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(
        section === 0 ? "Typing" : section === 2 ? "Pointing" : "Standing"
      );
    }, 600);
  }, [section]);

  const characterGroup = useRef();

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    if (state.camera != undefined) {
      state.camera.position.x = cameraPositionX.get();
      state.camera.lookAt(cameraLookAtX.get(), 0, 0);
    }

    // const position = new THREE.Vector3();
    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }
    // console.log([position.x, position.y, position.z]);

    // const quaternion = new THREE.Quaternion();
    // characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion, "XYZ");

    // console.log([euler.x, euler.y, euler.z]);
  });

  return (
    <>
      <motion.group
        ref={characterGroup}
        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        // scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            x: 0,
            y: -1,
            z: 0,
            scale: 1.3 * officeScaleRatio,
            rotateX: 0,
            rotateY: Math.PI / 2 + 0.45,
            rotateZ: 0,
          },
          1: {
            y: isMobile ? -viewport.height + 0.4 : -viewport.height + 0.75,
            x: isMobile ? 0.3 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 4 : 0,
            rotateZ: 0,
            scale: isMobile ? 1.5 : 1,
          },
          2: {
            x: isMobile ? -1.6 : -5.5 * officeScaleRatio,
            y: isMobile ? -viewport.height * 2.5 : -viewport.height * 2 - 1,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scale: isMobile
              ? Math.min(1.45, 2.5 * officeScaleRatio)
              : Math.min(1.5, 4 * officeScaleRatio),
          },
          3: {
            y: isMobile ? -viewport.height * 2.75 : -viewport.height * 2.85,
            x: 0.24,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scale: 1 * officeScaleRatio,
          },
        }}
      >
        <Avatar animation={characterAnimation} wireframe={section === 1} />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[
          isMobile ? -0.25 : 1.5 * officeScaleRatio,
          isMobile ? -viewport.height / 6 : 2,
          3,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 6 : 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.4, 0.06, -0.15]}
        ></group>
      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[
          0,
          isMobile ? -viewport.height : -1.5 * officeScaleRatio,
          -10,
        ]}
        animate={{
          z: section === 1 ? 0 : -10,
          y:
            section === 1
              ? -viewport.height
              : isMobile
              ? -viewport.height
              : -1.5 * officeScaleRatio,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
      </motion.group>

      <group>
        <Projects
          section={section}
          officeScaleRatio={officeScaleRatio}
          isMobile={isMobile}
        />
        {section == 2 && (
          <directionalLight position={[-2, 0, 10]} intensity={1} />
        )}
      </group>
    </>
  );
};
