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
    base_hair001: THREE.Mesh;
    hair_lvl_2: THREE.Mesh;
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

export function Say(props: JSX.IntrinsicElements["group"]) {
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
        position={[-0.001, 6.993, 0.013]}
        rotation={[1.561, 0, 0]}
        scale={0.189}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ear.geometry}
        material={materials.skin}
        position={[0.215, 7.011, 0.043]}
        rotation={[-1.746, 0.173, -0.036]}
        scale={[0.032, 0.016, 0.045]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.eyes.geometry}
        material={materials.Eyes}
        position={[0.005, 5.518, 0.041]}
        scale={0.092}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body.geometry}
        material={materials.skin}
        position={[0.005, 5.518, 0.041]}
        scale={0.092}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shirt.geometry}
        material={materials.shirt}
        position={[0.005, 5.518, 0.041]}
        scale={0.092}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Karmine_Corp_logosvg.geometry}
        material={materials["Karmine_Corp_logo.svg"]}
        position={[0.005, 5.518, 0.041]}
        scale={0.092}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hair_lvl_2.geometry}
        material={materials.hair}
        position={[0.004, 7.213, 0.144]}
        rotation={[0.152, 0.038, -1.588]}
        scale={-0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.base_hair.geometry}
        material={materials.hair}
        position={[-0.001, 7, 0.01]}
        rotation={[1.561, 0, 0]}
        scale={0.189}
      />
      <group position={[0.005, 5.518, 0.041]} scale={0.092}>
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
          position={[-0.961, 1.183, 0]}
          scale={3.028}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials["Inner Shoe"]}
          position={[-0.961, 2.878, -0.096]}
          scale={[2.631, 3.213, 2.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NurbsPath.geometry}
          material={materials.pant}
          position={[-0.961, 1.885, 1.427]}
          rotation={[1.513, 0, 0]}
          scale={[0.24, 0.232, 0.262]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trouser.geometry}
        material={materials.pant}
        position={[0.005, 5.518, 0.041]}
        scale={0.092}
      />
      <group position={[0.005, 5.518, 0.041]} scale={0.092}>
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
      </group>
    </group>
  );
}

useGLTF.preload("/saymoji.gltf");
