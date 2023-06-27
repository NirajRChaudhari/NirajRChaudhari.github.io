import * as THREE from "three";
import { Image, Text, useVideoTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { Vector3 } from "three";
import React, { useRef, useEffect } from "react";

import { useGLTF } from "@react-three/drei";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";

export const projects = [
  {
    title: "Wawatmos",
    model: "mobile",
    url: "https://r3f-wawatmos-final.vercel.app/",
    videoUrl: "textures/running_girl.mp4",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "3D Avatar",
    model: "laptop",
    url: "https://www.youtube.com/watch?v=pGMKIyALcK0",
    videoUrl: "textures/vscode_flip.mp4",
    description: "Learn how to use ReadyPlayerMe to create a 3D avatar",
  },

  {
    title: "Portfolio Baking",
    model: "mobile",
    url: "https://www.youtube.com/watch?v=YkHqpqJgLKw",
    videoUrl: "textures/running_girl.mp4",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
];

const Laptop = (props) => {
  const { project } = props;

  const laptopRef = useRef();

  const { nodes, materials } = useGLTF("models/laptop.glb");

  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    laptopRef.current.rotation.x = THREE.MathUtils.lerp(
      laptopRef.current.rotation.x,
      Math.cos(t / 8) / 10 + 0.3,
      0.2
    );
    laptopRef.current.rotation.y = THREE.MathUtils.lerp(
      laptopRef.current.rotation.y,
      Math.sin(t / 4) / 10,
      0.2
    );
    laptopRef.current.rotation.z = THREE.MathUtils.lerp(
      laptopRef.current.rotation.z,
      Math.sin(t / 4) / 10,
      0.2
    );
    laptopRef.current.position.y = -0.55;
    // laptopRef.current.position.y = THREE.MathUtils.lerp(
    //   laptopRef.current.position.y,
    //   (-2 + Math.sin(t / 2)) / 3,
    //   0.1
    // );
  });

  const textureVSCode = useVideoTexture(project.videoUrl);
  return (
    <group ref={laptopRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="screenflip">
          <group name="BodyScreen">
            <mesh
              name="Cube008"
              geometry={nodes.Cube008.geometry}
              material={materials.aluminium}
            />
            <mesh
              name="Cube008_1"
              geometry={nodes.Cube008_1.geometry}
              material={materials["matte.001"]}
            />
          </group>
          <mesh
            name="Screen"
            geometry={nodes.Screen.geometry}
            material={materials["matte.001"]}
          >
            <meshBasicMaterial map={textureVSCode} toneMapped={false} />
          </mesh>
        </group>
        <mesh
          name="keyboard"
          geometry={nodes.keyboard.geometry}
          material={materials.keys}
        />
        <group name="base">
          <mesh
            name="Cube002"
            geometry={nodes.Cube002.geometry}
            material={materials.aluminium}
          />
          <mesh
            name="Cube002_1"
            geometry={nodes.Cube002_1.geometry}
            material={materials.trackpad}
          />
        </group>
        <mesh
          name="touchbar"
          geometry={nodes.touchbar.geometry}
          material={materials.touchbar}
        />
      </group>
    </group>
  );
};

const LaptopWithText = ({ project }) => {
  const laptopRef = useRef();
  const textRef1 = useRef();
  const textRef2 = useRef();

  useFrame(() => {
    const laptop = laptopRef.current;
    const text1 = textRef1.current;
    const text2 = textRef2.current;

    // Calculate the relative position
    const relativePosition = new Vector3();
    relativePosition.subVectors(
      laptop.getWorldPosition(new Vector3()),
      text1.getWorldPosition(new Vector3())
    );

    // Update the position of the Text components based on the relative position
    text1.position.copy(relativePosition).add(new Vector3(0, -7, 0));
    text2.position.copy(relativePosition).add(new Vector3(0, -8, 0));
  });

  return (
    <group>
      <group ref={laptopRef}>
        <Laptop project={project} />
      </group>
      <group>
        <Text
          ref={textRef1}
          maxWidth={8}
          anchorX="center"
          anchorY="top"
          fontSize={0.6}
          position={[0, 0, 0]} // Position can be set to [0, 0, 0] as it will be updated dynamically
        >
          {project.title.toUpperCase()}
        </Text>
        <Text
          ref={textRef2}
          maxWidth={12}
          anchorX="center"
          anchorY="center"
          fontSize={0.4}
          position={[0, 0, 0]} // Position can be set to [0, 0, 0] as it will be updated dynamically
        >
          {project.description}
        </Text>
      </group>
    </group>
  );
};

const Mobile = (props) => {
  const { project } = props;

  const mobileRef = useRef();

  const { nodes, materials } = useGLTF("models/mobile.gltf");

  // Create and load the video texture
  const textureVSCode = useVideoTexture(project.videoUrl);

  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mobileRef.current.rotation.x = THREE.MathUtils.lerp(
      mobileRef.current.rotation.x,
      Math.cos(t / 4) / 10 + 0.1,
      0.5
    );
    mobileRef.current.rotation.y = THREE.MathUtils.lerp(
      mobileRef.current.rotation.y,
      Math.sin(t / 2) / 2,
      0.5
    );
    mobileRef.current.rotation.z = THREE.MathUtils.lerp(
      mobileRef.current.rotation.z,
      Math.sin(t / 2) / 10,
      0.5
    );
    // laptopRef.current.position.y = THREE.MathUtils.lerp(
    //   laptopRef.current.position.y,
    //   (-2 + Math.sin(t / 2)) / 3,
    //   0.1
    // );
  });

  return (
    <group ref={mobileRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model">
          <group name="Mobile" scale={3.489}>
            <group
              name="RootNode"
              position={[0, -0.008, -0.222]}
              scale={15.002}
            >
              <group name="mesh001">
                <mesh
                  name="mesh001_buton_0"
                  geometry={nodes.mesh001_buton_0.geometry}
                  material={materials.Button}
                />
              </group>
              <group name="mesh002">
                <mesh
                  name="mesh002___FUNDO_SIN_CARD_21_0"
                  geometry={nodes.mesh002___FUNDO_SIN_CARD_21_0.geometry}
                  material={materials.FUNDO_SIN_CARD_21}
                />
              </group>
              <group name="mesh003">
                <mesh
                  name="mesh003_frame_0"
                  geometry={nodes.mesh003_frame_0.geometry}
                  material={materials.Material}
                />
              </group>
              <group name="mesh007">
                <mesh
                  name="mesh007_screen_0"
                  geometry={nodes.mesh007_screen_0.geometry}
                >
                  <meshBasicMaterial map={textureVSCode} toneMapped={false} />
                </mesh>
              </group>
              <group name="mesh009">
                <mesh
                  name="mesh009_cam_0001"
                  geometry={nodes.mesh009_cam_0001.geometry}
                  material={materials.FUNDO_SIN_CARD_21}
                />
              </group>
              <group name="mesh010" />
              <group name="mesh012">
                <mesh
                  name="mesh012_frame_0"
                  geometry={nodes.mesh012_frame_0.geometry}
                  material={nodes.mesh012_frame_0.material}
                />
              </group>
              <group name="mesh013" />
              <group name="mesh015" />
              <group name="mesh018">
                <mesh
                  name="mesh018_back_0"
                  geometry={nodes.mesh018_back_0.geometry}
                  material={materials.Material}
                />
              </group>
              <group name="mesh020">
                <mesh
                  name="mesh020_island_0"
                  geometry={nodes.mesh020_island_0.geometry}
                  material={materials.glass}
                />
              </group>
              <group name="mesh022">
                <mesh
                  name="mesh022_back_gl_0"
                  geometry={nodes.mesh022_back_gl_0.geometry}
                  material={materials.back_gl}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

const MobileWithText = ({ project }) => {
  const mobileRef = useRef();
  const textRef1 = useRef();
  const textRef2 = useRef();

  useFrame(() => {
    const mobile = mobileRef.current;
    const text1 = textRef1.current;
    const text2 = textRef2.current;

    // Calculate the relative position
    const relativePosition = new Vector3();
    relativePosition.subVectors(
      mobile.getWorldPosition(new Vector3()),
      text1.getWorldPosition(new Vector3())
    );

    // Update the position of the Text components based on the relative position
    text1.position.copy(relativePosition).add(new Vector3(0, -7, 0));
    text2.position.copy(relativePosition).add(new Vector3(0, -7.5, 0));
  });

  return (
    <group>
      <group ref={mobileRef}>
        <Mobile project={project} />
      </group>
      <group>
        <Text
          ref={textRef1}
          maxWidth={8}
          anchorX="center"
          anchorY="top"
          fontSize={0.5}
          position={[0, 0, 0]} // Position can be set to [0, 0, 0] as it will be updated dynamically
        >
          {project.title.toUpperCase()}
        </Text>
        <Text
          ref={textRef2}
          maxWidth={10}
          anchorX="center"
          anchorY="top"
          fontSize={0.3}
          position={[0, 0, 0]} // Position can be set to [0, 0, 0] as it will be updated dynamically
        >
          {project.description}
        </Text>
      </group>
    </group>
  );
};

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = (props) => {
  let { section, officeScaleRatio, isMobile } = props;
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  const projectSectionNo = 5;

  return (
    <group position-y={-viewport.height * 5 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            scale: (() => {
              if (section === projectSectionNo && currentProject === index) {
                if (project.model === "laptop") {
                  return Math.min(0.65, 0.8 * officeScaleRatio);
                } else if (project.model === "mobile") {
                  if (isMobile) {
                    return Math.min(1.2, 1.2 * officeScaleRatio);
                  } else {
                    return Math.min(0.9, 0.9 * officeScaleRatio);
                  }
                }
              } else {
                return project.model === "laptop" ? 0 : 0;
              }
            })(),
            x:
              currentProject === index ? 0 + (index - currentProject) * 2.5 : 6,
            y: (() => {
              if (project.model === "laptop") {
                return -1;
              } else if (project.model === "mobile") {
                return -1;
              }
            })(),
            z: -2,
            rotateX: (() => {
              if (currentProject === index) {
                if (project.model === "laptop") {
                  return -Math.PI / 10;
                } else if (project.model === "mobile") {
                  return -Math.PI / 10;
                }
              } else {
                return -Math.PI / 2;
              }
            })(),
            rotateZ: 0,
          }}
          transition={{
            scale: {
              duration: 4,
              ease: "easeOut",
            },
            rotate: {
              duration: 4,
              ease: "easeIn",
            },
          }}
        >
          {project.model === "laptop" ? (
            <LaptopWithText project={project} />
          ) : project.model == "mobile" ? (
            <MobileWithText project={project} />
          ) : null}
        </motion.group>
      ))}
    </group>
  );
};

useGLTF.preload("models/laptop.glb");
useGLTF.preload("models/mobile.gltf");
