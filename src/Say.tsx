import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import React, { useRef } from "react";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    head: THREE.Mesh;
    ear: THREE.Mesh;
    eyes: THREE.Mesh;
    nose: THREE.Mesh;
    trouser: THREE.Mesh;
    body: THREE.Mesh;
    shirt: THREE.Mesh;
    Karmine_Corp_logosvg: THREE.Mesh;
    base_hair: THREE.Mesh;
    Cylinder001: THREE.Mesh;
    Cylinder001_1: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    NurbsPath: THREE.Mesh;
    head_backup: THREE.Mesh;
    base_hair001: THREE.Mesh;
  };
  materials: {
    skin: THREE.MeshStandardMaterial;
    Eyes: THREE.MeshStandardMaterial;
    pant: THREE.MeshStandardMaterial;
    shirt: THREE.MeshPhysicalMaterial;
    ["Karmine_Corp_logo.svg"]: THREE.MeshStandardMaterial;
    hair: THREE.MeshStandardMaterial;
    shoes: THREE.MeshStandardMaterial;
    Lace: THREE.MeshStandardMaterial;
    ["Inner Shoe"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  // const say = useRef<Mesh>(null!);
  const { nodes, materials } = useGLTF("/saymoji.gltf") as GLTFResult;

  // useFrame((state, delta) => {
  //   say.current.rotation.y += delta * 1;
  // });
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.head.geometry}
        material={materials.skin}
        position={[-0.06941043, 16.04407501, -0.30655]}
        rotation={[1.56139063, 0, 0]}
        scale={2.05152035}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ear.geometry}
        material={materials.skin}
        position={[2.28063297, 16.24105644, 0.02507015]}
        rotation={[-1.74631164, 0.17268349, -0.03564611]}
        scale={[0.34448963, 0.17570929, 0.49189928]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.eyes.geometry}
        material={materials.Eyes}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.nose.geometry}
        material={nodes.nose.material}
        position={[-0.02472818, 15.74908066, 2.17762399]}
        rotation={[0.05740661, 0, 0]}
        scale={[0.20529276, 0.20529278, 0.20529278]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trouser.geometry}
        material={materials.pant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body.geometry}
        material={materials.skin}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shirt.geometry}
        material={materials.shirt}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Karmine_Corp_logosvg.geometry}
        material={materials["Karmine_Corp_logo.svg"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.base_hair.geometry}
        material={materials.hair}
        position={[-0.06941043, 16.12133026, -0.33625185]}
        rotation={[1.56139063, 0, 0]}
        scale={2.05152035}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.head_backup.geometry}
        material={nodes.head_backup.material}
        position={[-0.06941043, 13.79614449, -0.30655]}
        rotation={[1.56139063, 0, 0]}
        scale={2.05152035}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.base_hair001.geometry}
        material={nodes.base_hair001.material}
        position={[-0.06941043, 13.87339973, -0.33625185]}
        rotation={[1.56139063, 0, 0]}
        scale={2.05152035}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials.pant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001_1.geometry}
        material={materials.skin}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_1.geometry}
        material={materials.shoes}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_2.geometry}
        material={materials.pant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.Lace}
        position={[-0.96088547, 1.18269897, 0]}
        scale={3.02781916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Inner Shoe"]}
        position={[-0.96088547, 2.87834549, -0.09579469]}
        scale={[2.63103676, 3.2128818, 2.63103676]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath.geometry}
        material={materials.pant}
        position={[-0.96106672, 1.88477635, 1.42681253]}
        rotation={[1.5129463, 0, 0]}
        scale={[0.23966806, 0.23155724, 0.26183161]}
      />
    </group>
  );
}

useGLTF.preload("/saymoji.gltf");
