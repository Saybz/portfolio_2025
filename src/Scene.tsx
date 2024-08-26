import { Canvas, useFrame } from "@react-three/fiber";
import { Model } from "./Say";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Scene = () => {
  // const gltf = useLoader(GLTFLoader, "./saymoji.gltf");
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <Model position={[0, -14, 0]} scale={2.2} />
      {/* <primitive object={gltf.scene} position={[0, -2, 0]} scale={0.2} /> */}
    </Canvas>
  );
};

export default Scene;
