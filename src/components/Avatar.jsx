import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Avatar(props) {
  // Extracting props and setting up control options
  const { animation, wireframe } = props;
  const { headFollow, cursorFollow } = useControls({
    headFollow: false,
    cursorFollow: false,
  });

  const group = useRef();
  const { nodes, materials } = useGLTF("models/avatar.glb");

  // Loading animations
  const typingAnimation = useFBX("animations/Typing.fbx").animations;
  const standingAnimation = useFBX("animations/Standing Idle.fbx").animations;
  const fallingAnimation = useFBX("animations/Falling Idle.fbx").animations;
  const pointingAnimation = useFBX("animations/Pointing.fbx").animations;

  // Naming animations
  typingAnimation[0].name = "Typing";
  standingAnimation[0].name = "Standing";
  fallingAnimation[0].name = "Falling";
  pointingAnimation[0].name = "Pointing";

  // Setting up animations
  const { actions } = useAnimations(
    [
      typingAnimation[0],
      standingAnimation[0],
      fallingAnimation[0],
      pointingAnimation[0],
    ],
    group
  );

  // Frame-by-frame updates
  useFrame((state) => {
    if (headFollow) {
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Spine2").lookAt(target);
    }
  });

  // Handling animation changes
  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].reset().fadeOut(0.5);
    };
  }, [animation, actions]);

  // Handling wireframe changes
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material !== materials.Wolf3D_Hair) {
        material.wireframe = wireframe;
      }
    });
  }, [wireframe, materials]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          {/* Rendering skinned meshes */}
          {[
            "Wolf3D_Body",
            "Wolf3D_Outfit_Bottom",
            "Wolf3D_Outfit_Footwear",
            "Wolf3D_Outfit_Top",
            "Wolf3D_Hair",
            "Wolf3D_Glasses",
          ].map((name) => (
            <skinnedMesh
              key={name}
              name={name}
              frustumCulled={false}
              geometry={nodes[name].geometry}
              material={materials[name]}
              skeleton={nodes[name].skeleton}
            />
          ))}
          {/* Rendering eyes, head, and teeth */}
          {[
            { name: "EyeLeft", material: materials.Wolf3D_Eye },
            { name: "EyeRight", material: materials.Wolf3D_Eye },
            { name: "Wolf3D_Head", material: materials.Wolf3D_Skin },
            { name: "Wolf3D_Teeth", material: materials.Wolf3D_Teeth },
          ].map(({ name, material }) => (
            <skinnedMesh
              key={name}
              frustumCulled={false}
              name={name}
              geometry={nodes[name].geometry}
              material={material}
              skeleton={nodes[name].skeleton}
              morphTargetDictionary={nodes[name].morphTargetDictionary}
              morphTargetInfluences={nodes[name].morphTargetInfluences}
            />
          ))}
        </group>
      </group>
    </group>
  );
}

// Preloading assets
useGLTF.preload("models/avatar.glb");
useFBX.preload("animations/Typing.fbx");
useFBX.preload("animations/Standing Idle.fbx");
useFBX.preload("animations/Falling Idle.fbx");
useFBX.preload("animations/Pointing.fbx");
