import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export function Cube() {
  const mesh = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.25;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}
