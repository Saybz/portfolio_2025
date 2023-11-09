import { Canvas } from "@react-three/fiber";
import { Cube } from "./Cube";
import { Box } from "@react-three/drei";

const Scene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Cube /> */}
      <Box />
    </Canvas>
  );
};

export default Scene;
