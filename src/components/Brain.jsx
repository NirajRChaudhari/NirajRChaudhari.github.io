import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { atom, useAtom } from "jotai";
import * as THREE from "three";

// This atom represents the current skill, initialized with a value of 2 an update to it will update the Brain 3D model
export const CURRENT_SKILL_ATOM = atom(2);

export function Brain(props) {
  const { nodes, materials } = useGLTF("models/brain.glb");

  const [currentSkill] = useAtom(CURRENT_SKILL_ATOM);

  // Skill Index to Brain Part Color Mapping
  const indexPartMap = {
    0: "RedPart",
    1: "GreenPart",
    2: "BluePart",
    3: "VioletPart",
    4: "YellowPart",
    5: "WhitePart",
  };

  const partMaterialMap = {
    RedPart: "RedMaterial",
    GreenPart: "GreenMaterial",
    BluePart: "BlueMaterial",
    VioletPart: "VioletMaterial",
    YellowPart: "YellowMaterial",
    WhitePart: "WhiteMaterial",
  };

  const whiteWireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x6c6c6c,
        wireframe: true,
      }),
    []
  );

  useEffect(() => {
    return () => whiteWireframeMaterial.dispose();
  }, [whiteWireframeMaterial]);

  const activePart = indexPartMap[currentSkill];

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model">
          <group name="brainpartsobjcleanermaterialmergergles">
            {Object.keys(nodes).map((nodeName) => {
              const node = nodes[nodeName];
              if (!node.geometry) return null;

              const material =
                nodeName === activePart
                  ? materials[partMaterialMap[nodeName]]
                  : whiteWireframeMaterial;

              return (
                <mesh
                  key={nodeName}
                  name={nodeName}
                  geometry={node.geometry}
                  material={material}
                />
              );
            })}
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/brain.glb");
