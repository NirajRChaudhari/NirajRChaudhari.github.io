/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 brain.glb -K -k
*/

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { atom, useAtom } from "jotai";
import * as THREE from "three";

export const currentSkillAtom = atom(2);

export function Brain(props) {
  const { nodes, materials } = useGLTF("models/brain.glb");

  const [currentSkill] = useAtom(currentSkillAtom);

  const partMaterialMap = {
    RedPart: "Material.001",
    GreenPart: "Material.002",
    BluePart: "Material.004",
    VioletPart: "Material.005",
    YellowPart: "Material.003",
    WhitePart: "material_0",
  };

  const indexPartMap = {
    0: "RedPart",
    1: "GreenPart",
    2: "BluePart",
    3: "VioletPart",
    4: "YellowPart",
    5: "WhitePart",
  };

  const whiteWireframeMaterial = useRef(
    new THREE.MeshBasicMaterial({
      color: 0x6c6c6c,
      wireframe: true,
    })
  );

  useEffect(() => {
    // Update the material of each mesh
    Object.values(nodes).forEach((node) => {
      if (node.name === indexPartMap[currentSkill]) {
        node.material = materials[partMaterialMap[node.name]];
      } else {
        node.material = whiteWireframeMaterial.current;
      }
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

// export function Brain(props) {
//   const { nodes, materials } = useGLTF("models/brain.glb");

//   const [currentSkill] = useAtom(currentSkillAtom);

//   const whiteWireframeMaterial = useRef(
//     new THREE.MeshBasicMaterial({
//       color: 0x6c6c6c,
//       wireframe: true,
//     })
//   );

//   return (
//     <group {...props} dispose={null}>
//       <group name="Scene">
//         <group name="Sketchfab_model">
//           <group name="brainpartsobjcleanermaterialmergergles">
//             <mesh
//               name="BluePart"
//               geometry={nodes.BluePart.geometry}
//               // material={materials["Material.004"]}
//               material={whiteWireframeMaterial.current}
//             />
//             <mesh
//               name="GreenPart"
//               geometry={nodes.GreenPart.geometry}
//               // material={materials["Material.002"]}
//               material={whiteWireframeMaterial.current}
//             />
//             <mesh
//               name="RedPart"
//               geometry={nodes.RedPart.geometry}
//               // material={materials["Material.001"]}
//               material={whiteWireframeMaterial.current}
//             />
//             <mesh
//               name="VioletPart"
//               geometry={nodes.VioletPart.geometry}
//               // material={materials["Material.005"]}
//               material={whiteWireframeMaterial.current}
//             />
//             <mesh
//               name="WhitePart"
//               geometry={nodes.WhitePart.geometry}
//               // material={materials.material_0}
//               material={whiteWireframeMaterial.current}
//             />
//             <mesh
//               name="YellowPart"
//               geometry={nodes.YellowPart.geometry}
//               // material={materials["Material.003"]}
//               material={whiteWireframeMaterial.current}
//             />
//           </group>
//         </group>
//       </group>
//     </group>
//   );
// }

useGLTF.preload("models/brain.glb");
