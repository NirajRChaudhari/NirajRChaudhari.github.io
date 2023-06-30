import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { atom, useAtom } from "jotai";
import * as THREE from "three";

export const CURRENT_SKILL_ATOM = atom(2);

export function Brain(props) {
  const { nodes, materials } = useGLTF("models/brain.glb");

  const [currentSkill] = useAtom(CURRENT_SKILL_ATOM);

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

  const whiteWireframeMaterial = useRef(
    new THREE.MeshBasicMaterial({
      color: 0x6c6c6c,
      wireframe: true,
    })
  );

  useEffect(() => {
    // console.log(currentSkill + "  " + indexPartMap[currentSkill]);

    // Update the material of each mesh
    Object.values(nodes).forEach((node) => {
      if (node.name === indexPartMap[currentSkill]) {
        node.material = materials[partMaterialMap[node.name]];
      } else {
        node.material = whiteWireframeMaterial.current;
      }
      node.material.needsUpdate = true; // Ensure material updates are reflected immediately
    });
  }, [currentSkill, materials, nodes]);

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model">
          <group name="brainpartsobjcleanermaterialmergergles">
            {Object.keys(nodes).map((nodeName) => (
              <mesh
                key={nodeName}
                name={nodeName}
                geometry={nodes[nodeName].geometry}
                material={nodes[nodeName].material}
              />
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/brain.glb");
