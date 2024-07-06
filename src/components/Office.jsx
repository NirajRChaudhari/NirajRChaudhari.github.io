import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import React, { useEffect } from "react";

import * as THREE from "three";

export function Office(props) {
  const { section } = props;
  const { nodes, materials } = useGLTF("models/scene.gltf");
  const texture = useTexture("textures/baked_final.jpg");
  const textureVSCode = useVideoTexture("textures/ForgeryVideo.mp4");

  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  const textureMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
  });

  const textureGlassMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 0.42,
  });

  const textureOpacity = useMotionValue(0);
  const glassTextureOpacity = useMotionValue(0);

  useEffect(() => {
    animate(textureOpacity, section === 0 ? 1 : 0, {
      duration: 0.8,
    });
    animate(glassTextureOpacity, section === 0 ? 0.42 : 0, {
      duration: 0.8,
    });
  }, [section]);

  useFrame(() => {
    textureMaterial.opacity = textureOpacity.get();
    textureGlassMaterial.opacity = glassTextureOpacity.get();
  });

  return (
    <group {...props} dispose={null}>
      <motion.group
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0,
        }}
        name="OfficeChair"
      >
        <mesh
          name="office-chair"
          geometry={nodes["office-chair"].geometry}
          material={textureMaterial}
        />
      </motion.group>
      <group name="BookStack">
        <mesh
          name="Node-Mesh"
          geometry={nodes["Node-Mesh"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_1"
          geometry={nodes["Node-Mesh_1"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_2"
          geometry={nodes["Node-Mesh_2"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_3"
          geometry={nodes["Node-Mesh_3"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_4"
          geometry={nodes["Node-Mesh_4"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_5"
          geometry={nodes["Node-Mesh_5"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_6"
          geometry={nodes["Node-Mesh_6"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_7"
          geometry={nodes["Node-Mesh_7"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_8"
          geometry={nodes["Node-Mesh_8"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh_9"
          geometry={nodes["Node-Mesh_9"].geometry}
          material={textureMaterial}
        />
      </group>
      <group name="Desk">
        <mesh
          name="Plane001_Plane002_BlackWood001"
          geometry={nodes.Plane001_Plane002_BlackWood001.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Plane001_Plane002_BlackWood001_1"
          geometry={nodes.Plane001_Plane002_BlackWood001_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Plane001_Plane002_BlackWood001_2"
          geometry={nodes.Plane001_Plane002_BlackWood001_2.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Plane001_Plane002_BlackWood001_3"
          geometry={nodes.Plane001_Plane002_BlackWood001_3.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Plane001_Plane002_BlackWood001_4"
          geometry={nodes.Plane001_Plane002_BlackWood001_4.geometry}
          material={textureMaterial}
        />
      </group>
      <group name="SM_ShelfSM_Shelf1">
        <mesh
          name="SM_ShelfSM_Shelf1_1"
          geometry={nodes.SM_ShelfSM_Shelf1_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="SM_ShelfSM_Shelf1_1_1"
          geometry={nodes.SM_ShelfSM_Shelf1_1_1.geometry}
          material={textureMaterial}
        />
      </group>
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0,
        }}
        name="WawaRug"
        geometry={nodes.WawaRug.geometry}
        material={textureMaterial}
      />
      <group name="Keyboard">
        <mesh
          name="mesh425587018"
          geometry={nodes.mesh425587018.geometry}
          material={textureMaterial}
        />
        <mesh
          name="mesh425587018_1"
          geometry={nodes.mesh425587018_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="mesh425587018_2"
          geometry={nodes.mesh425587018_2.geometry}
          material={textureMaterial}
        />
        <mesh
          name="mesh425587018_3"
          geometry={nodes.mesh425587018_3.geometry}
          material={textureMaterial}
        />
      </group>
      <motion.group
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0,
        }}
        name="iMac"
      >
        <mesh
          name="iMac_1"
          geometry={nodes.iMac_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="iMac_1_1"
          geometry={nodes.iMac_1_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="iMac_1_2"
          geometry={nodes.iMac_1_2.geometry}
          material={textureMaterial}
        />
      </motion.group>
      <motion.group
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0,
        }}
        name="Houseplant"
      >
        <mesh
          name="Houseplant_7"
          geometry={nodes.Houseplant_7.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Houseplant_7_1"
          geometry={nodes.Houseplant_7_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Houseplant_7_2"
          geometry={nodes.Houseplant_7_2.geometry}
          material={textureMaterial}
        />
      </motion.group>
      <mesh name="Screen" geometry={nodes.Screen.geometry}>
        <meshBasicMaterial map={textureVSCode} toneMapped={false} />
      </mesh>
      <mesh
        name="Astronaut"
        geometry={nodes.Astronaut.geometry}
        material={textureMaterial}
      >
        <mesh
          name="Cube002"
          geometry={nodes.Cube002.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Cube003"
          geometry={nodes.Cube003.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Cube004"
          geometry={nodes.Cube004.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Sphere007"
          geometry={nodes.Sphere007.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Sphere008"
          geometry={nodes.Sphere008.geometry}
          material={textureMaterial}
        />
      </mesh>
      <group name="AndroidToy">
        <mesh
          name="Sphere001"
          geometry={nodes.Sphere001.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Sphere001_1"
          geometry={nodes.Sphere001_1.geometry}
          material={textureMaterial}
        />
      </group>
      <motion.group
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0,
        }}
        name="LavaLamp"
      >
        <mesh
          name="Node-Mesh002"
          geometry={nodes["Node-Mesh002"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh002_1"
          geometry={nodes["Node-Mesh002_1"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Node-Mesh002_2"
          geometry={nodes["Node-Mesh002_2"].geometry}
          material={textureMaterial}
        />
      </motion.group>
      <mesh
        name="TextName"
        geometry={nodes.TextName.geometry}
        material={textureMaterial}
      />
      <group name="Tablet">
        <mesh
          name="ChamferBox001_1"
          geometry={nodes.ChamferBox001_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="ChamferBox001_1_1"
          geometry={nodes.ChamferBox001_1_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="ChamferBox001_1_2"
          geometry={nodes.ChamferBox001_1_2.geometry}
          material={textureMaterial}
        />
        <mesh
          name="ChamferBox001_1_3"
          geometry={nodes.ChamferBox001_1_3.geometry}
          material={textureMaterial}
        />
      </group>
      <group name="WallTable">
        <mesh
          name="Cube-Mesh"
          geometry={nodes["Cube-Mesh"].geometry}
          material={textureMaterial}
        />
        <mesh
          name="Cube-Mesh_1"
          geometry={nodes["Cube-Mesh_1"].geometry}
          material={textureMaterial}
        />
      </group>
      <group name="Headphone">
        <mesh
          name="GooglepCube51_1"
          geometry={nodes.GooglepCube51_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="GooglepCube51_1_1"
          geometry={nodes.GooglepCube51_1_1.geometry}
          material={textureMaterial}
        />
        <mesh
          name="GooglepCube51_1_2"
          geometry={nodes.GooglepCube51_1_2.geometry}
          material={textureMaterial}
        />
      </group>
      <mesh
        name="Mouse"
        geometry={nodes.Mouse.geometry}
        material={textureMaterial}
      />
      <group name="Plane">
        <mesh
          name="Plane001"
          geometry={nodes.Plane001.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Plane001_1"
          geometry={nodes.Plane001_1.geometry}
          material={textureGlassMaterial}
        />
        <mesh
          name="Plane001_2"
          geometry={nodes.Plane001_2.geometry}
          material={textureMaterial}
        />
        <mesh
          name="Plane001_3"
          geometry={nodes.Plane001_3.geometry}
          material={textureMaterial}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/scene.gltf");
useTexture.preload("textures/baked_final.jpg");
